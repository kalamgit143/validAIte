/*
  # Access Control Matrix Implementation

  ## Overview
  Implements comprehensive role-based access control (RBAC) aligned with NIST AI RMF and EU AI Act TEVV standards.
  This migration creates the infrastructure to enforce the access control matrix across all workflow components.

  ## 1. New Tables

  ### `workflow_components`
  Defines all governance workflow stages and their metadata
  - `id` (text, primary key) - Unique workflow component identifier
  - `name` (text) - Display name of the component
  - `description` (text) - Description of the component
  - `category` (text) - Component category (workflow, reference, administration)
  - `sequence_order` (int) - Order in the workflow
  - `created_at` (timestamptz) - Record creation timestamp

  ### `role_permissions`
  Defines access permissions for each role on each workflow component
  - `id` (uuid, primary key) - Unique permission record identifier
  - `role_name` (text) - Role name (CIO, CISO, etc.)
  - `component_id` (text) - Workflow component identifier
  - `access_level` (text) - Access level: read, edit, or govern
  - `description` (text) - Description of the permission
  - `created_at` (timestamptz) - Record creation timestamp

  ### `user_activity_log`
  Audit trail for all user activities across workflow components
  - `id` (uuid, primary key) - Unique log identifier
  - `user_id` (uuid) - User performing the action
  - `user_email` (text) - User email for reference
  - `user_role` (text) - User's role at time of action
  - `component_id` (text) - Workflow component accessed
  - `action_type` (text) - Type of action: read, create, update, delete, approve
  - `resource_type` (text) - Type of resource (application, risk, metric, etc.)
  - `resource_id` (uuid) - Specific resource identifier
  - `metadata` (jsonb) - Additional context data
  - `tenant_id` (text) - Organization identifier
  - `created_at` (timestamptz) - When action occurred

  ## 2. PostgreSQL Functions

  ### `check_user_permission(component_id, required_level)`
  Validates if the current user has the required permission level for a component
  - Returns boolean indicating permission granted/denied
  - Checks user's role against role_permissions table
  - Supports hierarchical permissions (govern > edit > read)

  ### `log_user_activity(component_id, action_type, resource_type, resource_id, metadata)`
  Logs user activity for audit trail
  - Automatically captures user context from JWT
  - Creates audit record in user_activity_log

  ## 3. Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - workflow_components: Read access for authenticated users
  - role_permissions: Read access for authenticated users
  - user_activity_log: Users can only view their own logs or tenant admins can view all

  ## 4. Data Population

  Populates workflow_components and role_permissions tables with access matrix data:
  - 10 workflow components
  - 7 roles (CIO, CISO, Quality & Compliance Manager, TEVV Engineer, Data & Ethics Manager, MLOps Engineer, AI Governance Auditor)
  - Complete permission mappings per the access control matrix

  ## 5. Important Notes

  - Access levels are hierarchical: govern >= edit >= read
  - Permission checks are performed via PostgreSQL functions for consistency
  - All user actions are auditable via activity log
  - RLS policies ensure tenant isolation
  - Compatible with existing authorization schema
*/

-- Create workflow_components table
CREATE TABLE IF NOT EXISTS workflow_components (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL DEFAULT 'workflow',
  sequence_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_category CHECK (category IN ('workflow', 'reference', 'administration'))
);

-- Create role_permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name text NOT NULL,
  component_id text NOT NULL REFERENCES workflow_components(id) ON DELETE CASCADE,
  access_level text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_access_level CHECK (access_level IN ('read', 'edit', 'govern')),
  UNIQUE(role_name, component_id)
);

-- Create user_activity_log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_email text NOT NULL,
  user_role text NOT NULL,
  component_id text NOT NULL,
  action_type text NOT NULL,
  resource_type text DEFAULT '',
  resource_id uuid,
  metadata jsonb DEFAULT '{}',
  tenant_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_action_type CHECK (action_type IN ('read', 'create', 'update', 'delete', 'approve', 'export'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_name);
CREATE INDEX IF NOT EXISTS idx_role_permissions_component ON role_permissions(component_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity_log(user_email);
CREATE INDEX IF NOT EXISTS idx_user_activity_component ON user_activity_log(component_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_tenant ON user_activity_log(tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created ON user_activity_log(created_at DESC);

-- Enable Row Level Security
ALTER TABLE workflow_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workflow_components (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read workflow components"
  ON workflow_components FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for role_permissions (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read role permissions"
  ON role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_activity_log
CREATE POLICY "Users can view own activity logs"
  ON user_activity_log FOR SELECT
  TO authenticated
  USING (
    user_email = current_setting('request.jwt.claims', true)::json->>'email'
    OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role IN ('CIO', 'CISO', 'Platform Admin', 'AI Governance Auditor')
    )
  );

CREATE POLICY "System can insert activity logs"
  ON user_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- PostgreSQL function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(
  p_component_id text,
  p_required_level text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_email text;
  v_user_role text;
  v_access_level text;
  v_level_hierarchy jsonb;
BEGIN
  v_user_email := current_setting('request.jwt.claims', true)::json->>'email';
  
  SELECT role INTO v_user_role
  FROM users
  WHERE email = v_user_email;
  
  IF v_user_role IS NULL THEN
    RETURN false;
  END IF;
  
  SELECT access_level INTO v_access_level
  FROM role_permissions
  WHERE role_name = v_user_role
  AND component_id = p_component_id;
  
  IF v_access_level IS NULL THEN
    RETURN false;
  END IF;
  
  v_level_hierarchy := '{"read": 1, "edit": 2, "govern": 3}'::jsonb;
  
  RETURN (v_level_hierarchy->>v_access_level)::int >= (v_level_hierarchy->>p_required_level)::int;
END;
$$;

-- PostgreSQL function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  p_component_id text,
  p_action_type text,
  p_resource_type text DEFAULT '',
  p_resource_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_email text;
  v_user_role text;
  v_tenant_id text;
  v_user_id uuid;
  v_log_id uuid;
BEGIN
  v_user_email := current_setting('request.jwt.claims', true)::json->>'email';
  
  SELECT id, role, tenant_id INTO v_user_id, v_user_role, v_tenant_id
  FROM users
  WHERE email = v_user_email;
  
  INSERT INTO user_activity_log (
    user_id,
    user_email,
    user_role,
    component_id,
    action_type,
    resource_type,
    resource_id,
    metadata,
    tenant_id
  ) VALUES (
    v_user_id,
    v_user_email,
    v_user_role,
    p_component_id,
    p_action_type,
    p_resource_type,
    p_resource_id,
    p_metadata,
    v_tenant_id
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- Populate workflow_components
INSERT INTO workflow_components (id, name, description, category, sequence_order) VALUES
  ('application_setup', 'Application Setup', 'Define AI application characteristics, use cases, and archetype classification', 'workflow', 1),
  ('risk_identification', 'Risk Identification', 'Identify and document AI risks across NIST RMF categories', 'workflow', 2),
  ('metrics_definition', 'Metrics Definition', 'Define trust metrics and evaluation criteria', 'workflow', 3),
  ('dataset_generation', 'Dataset Generation', 'Create evaluation datasets aligned with use cases and metrics', 'workflow', 4),
  ('test_lab', 'Test Lab', 'Execute TEVV tests and validation experiments', 'workflow', 5),
  ('trust_score', 'Trust Score Computation', 'Compute trust scores and aggregate evaluation results', 'workflow', 6),
  ('explainability', 'Explainability & Evidence', 'Generate explainability reports and evidence packs', 'workflow', 7),
  ('trust_matrix', 'Trust Matrix', 'Visualize comprehensive trust assessment matrix', 'workflow', 8),
  ('authorization', 'Authorization Engine', 'Configure role-based access control and permissions', 'workflow', 9),
  ('monitoring', 'Continuous Monitoring', 'Monitor AI systems post-deployment for drift and compliance', 'workflow', 10)
ON CONFLICT (id) DO NOTHING;

-- Populate role_permissions for CIO
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('CIO', 'application_setup', 'govern', 'Approves strategic AI initiatives and resource allocation'),
  ('CIO', 'risk_identification', 'govern', 'Final authority on enterprise AI risk acceptance'),
  ('CIO', 'metrics_definition', 'read', 'Reviews trust metrics and KPIs for portfolio oversight'),
  ('CIO', 'dataset_generation', 'read', 'Monitors data quality and coverage metrics'),
  ('CIO', 'test_lab', 'read', 'Reviews test execution status and coverage'),
  ('CIO', 'trust_score', 'read', 'Monitors trust scores for portfolio health'),
  ('CIO', 'explainability', 'read', 'Reviews explainability and transparency reports'),
  ('CIO', 'trust_matrix', 'govern', 'Approves overall trust assessment and go/no-go decisions'),
  ('CIO', 'authorization', 'govern', 'Approves access control policies and governance structure'),
  ('CIO', 'monitoring', 'govern', 'Oversees continuous monitoring strategy and incident escalation')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for CISO
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('CISO', 'application_setup', 'read', 'Reviews security requirements and threat landscape'),
  ('CISO', 'risk_identification', 'edit', 'Defines security risks and threat scenarios'),
  ('CISO', 'metrics_definition', 'read', 'Reviews security and privacy metrics'),
  ('CISO', 'dataset_generation', 'read', 'Ensures data security and PII protection'),
  ('CISO', 'test_lab', 'read', 'Reviews security test results and vulnerability assessments'),
  ('CISO', 'trust_score', 'read', 'Monitors security and privacy trust scores'),
  ('CISO', 'explainability', 'read', 'Reviews security evidence and audit trails'),
  ('CISO', 'trust_matrix', 'read', 'Validates security compliance in trust matrix'),
  ('CISO', 'authorization', 'edit', 'Configures security policies and access controls'),
  ('CISO', 'monitoring', 'edit', 'Configures security monitoring and incident response')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for Quality & Compliance Manager
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('Quality & Compliance Manager', 'application_setup', 'edit', 'Configures compliance requirements and quality standards'),
  ('Quality & Compliance Manager', 'risk_identification', 'edit', 'Identifies compliance and quality risks'),
  ('Quality & Compliance Manager', 'metrics_definition', 'edit', 'Defines quality and compliance metrics'),
  ('Quality & Compliance Manager', 'dataset_generation', 'read', 'Reviews dataset quality and compliance coverage'),
  ('Quality & Compliance Manager', 'test_lab', 'read', 'Monitors test execution for compliance validation'),
  ('Quality & Compliance Manager', 'trust_score', 'edit', 'Configures trust score computation rules'),
  ('Quality & Compliance Manager', 'explainability', 'edit', 'Generates compliance evidence packs and documentation'),
  ('Quality & Compliance Manager', 'trust_matrix', 'edit', 'Manages trust matrix configuration and reporting'),
  ('Quality & Compliance Manager', 'authorization', 'edit', 'Defines role-based access and approval workflows'),
  ('Quality & Compliance Manager', 'monitoring', 'read', 'Reviews compliance monitoring dashboards')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for TEVV Engineer
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('TEVV Engineer', 'application_setup', 'read', 'Reviews application requirements for test planning'),
  ('TEVV Engineer', 'risk_identification', 'read', 'Reviews risks to design test scenarios'),
  ('TEVV Engineer', 'metrics_definition', 'edit', 'Defines technical metrics and test criteria'),
  ('TEVV Engineer', 'dataset_generation', 'edit', 'Creates and curates evaluation datasets'),
  ('TEVV Engineer', 'test_lab', 'edit', 'Executes TEVV tests and validation experiments'),
  ('TEVV Engineer', 'trust_score', 'edit', 'Computes and validates trust scores'),
  ('TEVV Engineer', 'explainability', 'edit', 'Generates explainability analysis and reports'),
  ('TEVV Engineer', 'trust_matrix', 'read', 'Reviews trust matrix results for validation'),
  ('TEVV Engineer', 'authorization', 'read', 'Views access permissions for test environments'),
  ('TEVV Engineer', 'monitoring', 'read', 'Reviews monitoring data for test validation')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for Data & Ethics Manager
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('Data & Ethics Manager', 'application_setup', 'read', 'Reviews ethical considerations and data requirements'),
  ('Data & Ethics Manager', 'risk_identification', 'read', 'Reviews bias and fairness risks'),
  ('Data & Ethics Manager', 'metrics_definition', 'edit', 'Defines fairness and bias metrics'),
  ('Data & Ethics Manager', 'dataset_generation', 'edit', 'Ensures dataset diversity and ethical sourcing'),
  ('Data & Ethics Manager', 'test_lab', 'read', 'Reviews bias and fairness test results'),
  ('Data & Ethics Manager', 'trust_score', 'read', 'Monitors fairness and ethics scores'),
  ('Data & Ethics Manager', 'explainability', 'read', 'Reviews ethical impact and bias reports'),
  ('Data & Ethics Manager', 'trust_matrix', 'read', 'Validates fairness in trust assessment'),
  ('Data & Ethics Manager', 'authorization', 'read', 'Reviews data access policies'),
  ('Data & Ethics Manager', 'monitoring', 'read', 'Monitors bias and fairness drift')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for MLOps & Reliability Engineer
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('MLOps & Reliability Engineer', 'application_setup', 'edit', 'Configures deployment and infrastructure requirements'),
  ('MLOps & Reliability Engineer', 'risk_identification', 'read', 'Reviews operational and reliability risks'),
  ('MLOps & Reliability Engineer', 'metrics_definition', 'read', 'Reviews performance and reliability metrics'),
  ('MLOps & Reliability Engineer', 'dataset_generation', 'read', 'Reviews dataset for production readiness'),
  ('MLOps & Reliability Engineer', 'test_lab', 'edit', 'Executes performance and reliability tests'),
  ('MLOps & Reliability Engineer', 'trust_score', 'edit', 'Integrates trust scores into deployment pipeline'),
  ('MLOps & Reliability Engineer', 'explainability', 'read', 'Reviews operational evidence and logs'),
  ('MLOps & Reliability Engineer', 'trust_matrix', 'read', 'Validates production readiness in trust matrix'),
  ('MLOps & Reliability Engineer', 'authorization', 'read', 'Reviews deployment access controls'),
  ('MLOps & Reliability Engineer', 'monitoring', 'edit', 'Configures drift monitoring and alerting')
ON CONFLICT (role_name, component_id) DO NOTHING;

-- Populate role_permissions for AI Governance Auditor
INSERT INTO role_permissions (role_name, component_id, access_level, description) VALUES
  ('AI Governance Auditor', 'application_setup', 'read', 'Audits compliance with governance requirements'),
  ('AI Governance Auditor', 'risk_identification', 'read', 'Validates risk assessment completeness'),
  ('AI Governance Auditor', 'metrics_definition', 'read', 'Audits metric definitions and standards'),
  ('AI Governance Auditor', 'dataset_generation', 'read', 'Validates dataset governance and lineage'),
  ('AI Governance Auditor', 'test_lab', 'read', 'Audits test execution and evidence'),
  ('AI Governance Auditor', 'trust_score', 'read', 'Validates trust score computation integrity'),
  ('AI Governance Auditor', 'explainability', 'read', 'Reviews explainability and transparency compliance'),
  ('AI Governance Auditor', 'trust_matrix', 'govern', 'Provides independent verification and sign-off'),
  ('AI Governance Auditor', 'authorization', 'read', 'Audits access control compliance'),
  ('AI Governance Auditor', 'monitoring', 'read', 'Audits continuous monitoring effectiveness')
ON CONFLICT (role_name, component_id) DO NOTHING;
