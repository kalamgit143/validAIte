/*
  # Application Setup Schema for ValidAIte Platform

  ## Overview
  Complete schema for Stage 0: Application Information & Setup
  Stores all essential information about GenAI applications being evaluated

  ## Tables Created

  ### 1. applications
  Core application information and metadata
  - Basic info: name, description, domain, organization
  - Owners: business and technical contacts
  - Environment and sensitivity settings
  - Risk context and modifiers
  - Status tracking

  ### 2. application_technical_details
  Technical configuration for UI/API interfaces
  - Frontend/backend stack information
  - LLM provider and model details
  - RAG configuration (embedding, vector DB)
  - API endpoints and authentication
  - UI selectors for automated testing
  - Integration tools

  ### 3. application_use_cases
  Functional use case catalog for each application
  - Use case title and description
  - Expected behavior definitions
  - Risk associations
  - Data sources and SME ownership
  - Priority and evaluation scope

  ### 4. application_files
  File uploads and attachments
  - Knowledge base documents
  - API collections
  - UI locator maps
  - Use case spreadsheets

  ## Security
  - Row Level Security enabled on all tables
  - Users can only access their own tenant's data
  - Authenticated access required for all operations
*/

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL,
  created_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Section 1: Basic Application Information
  application_name text NOT NULL,
  application_description text DEFAULT '',
  domain text DEFAULT 'general',
  organization text DEFAULT '',
  business_owner text DEFAULT '',
  tech_owner text DEFAULT '',
  deployment_environment text DEFAULT 'staging',
  data_sensitivity text[] DEFAULT '{}',
  autonomy_level text DEFAULT 'advisory',
  modifiers text[] DEFAULT '{}',
  risk_context_notes text DEFAULT '',
  
  -- Section 5: System Metadata
  version text DEFAULT 'v1.0',
  status text DEFAULT 'draft',
  
  CONSTRAINT valid_deployment_environment CHECK (deployment_environment IN ('staging', 'production', 'cloud', 'on-prem')),
  CONSTRAINT valid_autonomy_level CHECK (autonomy_level IN ('advisory', 'decisioning', 'action-taking')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'submitted', 'approved', 'archived'))
);

-- Application Technical Details table
CREATE TABLE IF NOT EXISTS application_technical_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Section 2: Technical Details (UI/API)
  interface_type text DEFAULT 'hybrid',
  frontend_tech_stack text DEFAULT '',
  backend_tech_stack text DEFAULT '',
  llm_provider text DEFAULT '',
  llm_model_name text DEFAULT '',
  embedding_provider text DEFAULT '',
  vector_db text DEFAULT '',
  retrieval_mechanism text DEFAULT '',
  api_endpoints jsonb DEFAULT '[]',
  auth_method text DEFAULT 'api-key',
  auth_token text DEFAULT '',
  ui_url text DEFAULT '',
  ui_input_selector text DEFAULT '',
  ui_output_selector text DEFAULT '',
  integration_tools text[] DEFAULT '{}',
  deployment_logs_api text DEFAULT '',
  
  CONSTRAINT valid_interface_type CHECK (interface_type IN ('ui', 'api', 'hybrid')),
  CONSTRAINT valid_auth_method CHECK (auth_method IN ('api-key', 'bearer-token', 'oauth2'))
);

-- Application Use Cases table
CREATE TABLE IF NOT EXISTS application_use_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Section 3: Functional Use Case Catalog
  use_case_id text NOT NULL,
  use_case_title text NOT NULL,
  use_case_description text DEFAULT '',
  expected_behavior text DEFAULT '',
  risk_association text[] DEFAULT '{}',
  data_source text DEFAULT '',
  sme_owner text DEFAULT '',
  priority text DEFAULT 'medium',
  evaluation_scope text[] DEFAULT '{}',
  
  CONSTRAINT valid_priority CHECK (priority IN ('high', 'medium', 'low')),
  CONSTRAINT unique_use_case_per_app UNIQUE (application_id, use_case_id)
);

-- Application Files table
CREATE TABLE IF NOT EXISTS application_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Section 4: File Upload & Integrations
  file_type text NOT NULL,
  file_name text NOT NULL,
  file_size bigint DEFAULT 0,
  file_path text NOT NULL,
  file_url text DEFAULT '',
  mime_type text DEFAULT '',
  
  CONSTRAINT valid_file_type CHECK (file_type IN ('knowledge_base', 'api_collection', 'ui_map', 'use_case_sheet'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_tenant ON applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tech_details_app ON application_technical_details(application_id);
CREATE INDEX IF NOT EXISTS idx_use_cases_app ON application_use_cases(application_id);
CREATE INDEX IF NOT EXISTS idx_use_cases_priority ON application_use_cases(priority);
CREATE INDEX IF NOT EXISTS idx_files_app ON application_files(application_id);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_technical_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications
CREATE POLICY "Users can view own tenant applications"
  ON applications FOR SELECT
  TO authenticated
  USING (tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text));

CREATE POLICY "Users can insert own tenant applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text));

CREATE POLICY "Users can update own tenant applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text))
  WITH CHECK (tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text));

CREATE POLICY "Users can delete own tenant applications"
  ON applications FOR DELETE
  TO authenticated
  USING (tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text));

-- RLS Policies for application_technical_details
CREATE POLICY "Users can view own tenant technical details"
  ON application_technical_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_technical_details.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can insert own tenant technical details"
  ON application_technical_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_technical_details.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can update own tenant technical details"
  ON application_technical_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_technical_details.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_technical_details.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can delete own tenant technical details"
  ON application_technical_details FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_technical_details.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

-- RLS Policies for application_use_cases (same pattern)
CREATE POLICY "Users can view own tenant use cases"
  ON application_use_cases FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_use_cases.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can insert own tenant use cases"
  ON application_use_cases FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_use_cases.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can update own tenant use cases"
  ON application_use_cases FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_use_cases.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_use_cases.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can delete own tenant use cases"
  ON application_use_cases FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_use_cases.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

-- RLS Policies for application_files (same pattern)
CREATE POLICY "Users can view own tenant files"
  ON application_files FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_files.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can insert own tenant files"
  ON application_files FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_files.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

CREATE POLICY "Users can delete own tenant files"
  ON application_files FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_files.application_id
      AND applications.tenant_id::text = (SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text)
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technical_details_updated_at BEFORE UPDATE ON application_technical_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_use_cases_updated_at BEFORE UPDATE ON application_use_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
