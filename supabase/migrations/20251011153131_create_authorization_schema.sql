/*
  # Create Authorization Engine Schema

  ## Overview
  This migration creates comprehensive database tables for Stage 9: Authorization Engine.
  It supports multi-stakeholder approval workflows, deployment decisions, authorization 
  certificates, and immutable audit trails.

  ## Tables Created

  ### 1. `authorization_requests`
  - Stores authorization requests for AI system deployments
  - Links to trust matrix results
  - Tracks deployment environment and status
  - Fields:
    - `id` (uuid, PK): Unique request identifier
    - `application_name` (text): Name of AI application
    - `archetype` (text): Risk archetype classification
    - `trust_matrix_id` (text): Reference to trust matrix
    - `overall_trust_index` (integer): Trust score 0-100
    - `risk_tier` (text): Low/Medium/High/Critical
    - `requested_by` (text): User who requested authorization
    - `requested_date` (timestamptz): Request timestamp
    - `target_deployment_date` (timestamptz): Planned deployment date
    - `deployment_environment` (text): Production/Staging/Development/Pilot
    - `status` (text): Draft/Under Review/Approved/Rejected/Conditional
    - `created_at`, `updated_at`: Audit timestamps

  ### 2. `stakeholder_approvals`
  - Tracks individual stakeholder sign-offs
  - Maintains cryptographic signatures
  - Records approval conditions and comments
  - Fields:
    - `id` (uuid, PK): Unique approval identifier
    - `request_id` (uuid, FK): Links to authorization request
    - `stakeholder_role` (text): Governance Lead/Domain Expert/Ethics Reviewer/etc.
    - `stakeholder_name` (text): Name of approver
    - `stakeholder_email` (text): Email for verification
    - `department` (text): Organizational unit
    - `is_required` (boolean): Whether approval is mandatory
    - `status` (text): Pending/Approved/Rejected/Recused
    - `decision_date` (timestamptz): When decision was made
    - `signature` (text): Cryptographic signature
    - `comments` (text): Approval notes
    - `conditions` (jsonb): Additional requirements
    - `created_at`, `updated_at`: Audit timestamps

  ### 3. `deployment_conditions`
  - Tracks pre-deployment requirements
  - Records verification status
  - Maintains compliance checklistFields:
    - `id` (uuid, PK): Unique condition identifier
    - `request_id` (uuid, FK): Links to authorization request
    - `condition_text` (text): Description of requirement
    - `is_required` (boolean): Whether condition is mandatory
    - `is_met` (boolean): Whether condition is satisfied
    - `verified_by` (text): Who verified compliance
    - `verified_date` (timestamptz): When verified
    - `created_at`, `updated_at`: Audit timestamps

  ### 4. `authorization_decisions`
  - Stores final deployment authorization outcomes
  - Links to all approval records
  - Contains compliance attestations
  - Fields:
    - `id` (uuid, PK): Unique decision identifier
    - `request_id` (uuid, FK): Links to authorization request
    - `decision` (text): Full Deployment/Staged Rollout/Pilot/Conditional/Blocked
    - `decision_date` (timestamptz): When decision was finalized
    - `final_approver` (text): Executive who authorized
    - `notes` (text): Decision rationale
    - `certificate_generated` (boolean): Whether certificate was issued
    - `certificate_url` (text): Location of certificate
    - `deployment_authorized` (boolean): GO/NO-GO flag
    - `authorization_expires` (timestamptz): Validity period
    - `created_at`, `updated_at`: Audit timestamps

  ### 5. `authorization_certificates`
  - Immutable authorization certificates
  - Cryptographically signed records
  - Compliance attestations
  - Fields:
    - `id` (uuid, PK): Unique certificate identifier
    - `decision_id` (uuid, FK): Links to authorization decision
    - `certificate_id` (text): Human-readable certificate number
    - `application_name` (text): System being authorized
    - `archetype` (text): Risk classification
    - `trust_index` (integer): Overall trust score
    - `decision` (text): Deployment decision type
    - `authorization_date` (timestamptz): When authorized
    - `authorized_by` (text): Final approver
    - `valid_until` (timestamptz): Expiration date
    - `certificate_hash` (text): Cryptographic hash for verification
    - `compliance_attestation` (jsonb): Regulatory compliance details
    - `created_at`: Immutable timestamp

  ### 6. `authorization_audit_trail`
  - Immutable audit log of all authorization actions
  - Cryptographically linked entries
  - Cannot be modified or deleted
  - Fields:
    - `id` (uuid, PK): Unique log entry identifier
    - `request_id` (uuid, FK): Links to authorization request
    - `timestamp` (timestamptz): When action occurred
    - `action` (text): Description of action
    - `actor` (text): Who performed action
    - `actor_role` (text): Role of actor
    - `details` (jsonb): Additional action metadata
    - `ip_address` (inet): Source IP for security
    - `immutable_hash` (text): Cryptographic chain hash

  ## Security (RLS)
  - All tables have Row Level Security enabled
  - Restrictive policies: users can only access their authorized records
  - Audit trail is write-only for users, read-only for auditors
  - Certificates are publicly readable but not modifiable

  ## Compliance
  - **NIST AI RMF**: GOVERN-1 (Authorization), GOVERN-5 (Audit Trail)
  - **EU AI Act**: Article 11 (Technical Documentation), Article 12 (Record-keeping)
  - **ISO/IEC 42001**: Clause 7.4 (Decision Authority), Clause 9.2 (Internal Audit)
*/

CREATE TABLE IF NOT EXISTS authorization_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_name text NOT NULL,
  archetype text NOT NULL,
  trust_matrix_id text NOT NULL,
  overall_trust_index integer NOT NULL CHECK (overall_trust_index >= 0 AND overall_trust_index <= 100),
  risk_tier text NOT NULL CHECK (risk_tier IN ('Low', 'Medium', 'High', 'Critical')),
  requested_by text NOT NULL,
  requested_date timestamptz NOT NULL DEFAULT now(),
  target_deployment_date timestamptz,
  deployment_environment text NOT NULL DEFAULT 'Production' CHECK (deployment_environment IN ('Production', 'Staging', 'Development', 'Pilot')),
  status text NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Under Review', 'Approved', 'Rejected', 'Conditional')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stakeholder_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  stakeholder_role text NOT NULL,
  stakeholder_name text NOT NULL,
  stakeholder_email text NOT NULL,
  department text NOT NULL,
  is_required boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Recused')),
  decision_date timestamptz,
  signature text,
  comments text,
  conditions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deployment_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  condition_text text NOT NULL,
  is_required boolean NOT NULL DEFAULT true,
  is_met boolean NOT NULL DEFAULT false,
  verified_by text,
  verified_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS authorization_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  decision text NOT NULL CHECK (decision IN ('Full Deployment', 'Staged Rollout', 'Pilot Program', 'Conditional Approval', 'Deployment Blocked')),
  decision_date timestamptz NOT NULL DEFAULT now(),
  final_approver text NOT NULL,
  notes text,
  certificate_generated boolean NOT NULL DEFAULT false,
  certificate_url text,
  deployment_authorized boolean NOT NULL,
  authorization_expires timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS authorization_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id uuid NOT NULL REFERENCES authorization_decisions(id) ON DELETE CASCADE,
  certificate_id text NOT NULL UNIQUE,
  application_name text NOT NULL,
  archetype text NOT NULL,
  trust_index integer NOT NULL,
  decision text NOT NULL,
  authorization_date timestamptz NOT NULL,
  authorized_by text NOT NULL,
  valid_until timestamptz,
  certificate_hash text NOT NULL,
  compliance_attestation jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS authorization_audit_trail (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES authorization_requests(id) ON DELETE CASCADE,
  timestamp timestamptz NOT NULL DEFAULT now(),
  action text NOT NULL,
  actor text NOT NULL,
  actor_role text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  ip_address inet,
  immutable_hash text NOT NULL
);

ALTER TABLE authorization_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholder_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_audit_trail ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own authorization requests"
  ON authorization_requests FOR SELECT
  TO authenticated
  USING (auth.uid()::text = requested_by OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "Users can create authorization requests"
  ON authorization_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = requested_by);

CREATE POLICY "Users can update own authorization requests"
  ON authorization_requests FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = requested_by OR auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.uid()::text = requested_by OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "Stakeholders can view related approvals"
  ON stakeholder_approvals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorization_requests
      WHERE authorization_requests.id = stakeholder_approvals.request_id
      AND (authorization_requests.requested_by = auth.uid()::text OR auth.jwt()->>'role' = 'admin')
    )
  );

CREATE POLICY "Stakeholders can create approvals"
  ON stakeholder_approvals FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'approver'));

CREATE POLICY "Stakeholders can update own approvals"
  ON stakeholder_approvals FOR UPDATE
  TO authenticated
  USING (stakeholder_email = auth.jwt()->>'email' OR auth.jwt()->>'role' = 'admin')
  WITH CHECK (stakeholder_email = auth.jwt()->>'email' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "Users can view conditions for their requests"
  ON deployment_conditions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorization_requests
      WHERE authorization_requests.id = deployment_conditions.request_id
      AND (authorization_requests.requested_by = auth.uid()::text OR auth.jwt()->>'role' = 'admin')
    )
  );

CREATE POLICY "Authorized users can create conditions"
  ON deployment_conditions FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'approver'));

CREATE POLICY "Authorized users can update conditions"
  ON deployment_conditions FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'approver'))
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'approver'));

CREATE POLICY "Users can view decisions for their requests"
  ON authorization_decisions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorization_requests
      WHERE authorization_requests.id = authorization_decisions.request_id
      AND (authorization_requests.requested_by = auth.uid()::text OR auth.jwt()->>'role' = 'admin')
    )
  );

CREATE POLICY "Executives can create authorization decisions"
  ON authorization_decisions FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'executive'));

CREATE POLICY "Certificates are publicly readable"
  ON authorization_certificates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only system can create certificates"
  ON authorization_certificates FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "Audit trail is readable by authorized users"
  ON authorization_audit_trail FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorization_requests
      WHERE authorization_requests.id = authorization_audit_trail.request_id
      AND (authorization_requests.requested_by = auth.uid()::text OR auth.jwt()->>'role' IN ('admin', 'auditor'))
    )
  );

CREATE POLICY "Audit trail is append-only"
  ON authorization_audit_trail FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_auth_requests_status ON authorization_requests(status);
CREATE INDEX IF NOT EXISTS idx_auth_requests_requested_by ON authorization_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_stakeholder_approvals_request_id ON stakeholder_approvals(request_id);
CREATE INDEX IF NOT EXISTS idx_stakeholder_approvals_status ON stakeholder_approvals(status);
CREATE INDEX IF NOT EXISTS idx_deployment_conditions_request_id ON deployment_conditions(request_id);
CREATE INDEX IF NOT EXISTS idx_auth_decisions_request_id ON authorization_decisions(request_id);
CREATE INDEX IF NOT EXISTS idx_auth_certificates_decision_id ON authorization_certificates(decision_id);
CREATE INDEX IF NOT EXISTS idx_audit_trail_request_id ON authorization_audit_trail(request_id);
CREATE INDEX IF NOT EXISTS idx_audit_trail_timestamp ON authorization_audit_trail(timestamp DESC);
