/*
  # Enforce Access Control on Existing Tables (Fixed)

  ## Overview
  Updates RLS policies on existing workflow tables to enforce the access control matrix.
  Integrates permission checking using the check_user_permission() function.

  ## Tables Updated
  - applications
  - application_technical_details
  - application_use_cases

  ## Access Control Enforcement
  - SELECT: Requires 'read' or higher permission
  - INSERT: Requires 'edit' or higher permission
  - UPDATE: Requires 'edit' or higher permission
  - DELETE: Requires 'edit' or higher permission

  ## Important Notes
  - Policies use check_user_permission() function for validation
  - Tenant isolation is maintained
  - Backward compatible with existing data
  - Platform Admin has override capabilities
*/

-- Drop existing policies for applications table
DROP POLICY IF EXISTS "Users can view applications in their tenant" ON applications;
DROP POLICY IF EXISTS "Users can insert applications" ON applications;
DROP POLICY IF EXISTS "Users can update applications" ON applications;
DROP POLICY IF EXISTS "Users can delete applications" ON applications;

-- Create new policies with access control enforcement for applications
CREATE POLICY "Users with read access can view applications"
  ON applications FOR SELECT
  TO authenticated
  USING (
    check_user_permission('application_setup', 'read')
    AND tenant_id::text IN (
      SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Users with edit access can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (
    check_user_permission('application_setup', 'edit')
    AND tenant_id::text IN (
      SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Users with edit access can update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    check_user_permission('application_setup', 'edit')
    AND tenant_id::text IN (
      SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    check_user_permission('application_setup', 'edit')
    AND tenant_id::text IN (
      SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Users with edit access can delete applications"
  ON applications FOR DELETE
  TO authenticated
  USING (
    check_user_permission('application_setup', 'edit')
    AND tenant_id::text IN (
      SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Update policies for application_technical_details
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'application_technical_details') THEN
    DROP POLICY IF EXISTS "Users can view technical details" ON application_technical_details;
    DROP POLICY IF EXISTS "Users can insert technical details" ON application_technical_details;
    DROP POLICY IF EXISTS "Users can update technical details" ON application_technical_details;
    DROP POLICY IF EXISTS "Users can delete technical details" ON application_technical_details;
    DROP POLICY IF EXISTS "Users with edit access can modify technical details" ON application_technical_details;

    CREATE POLICY "Users with read access can view technical details"
      ON application_technical_details FOR SELECT
      TO authenticated
      USING (
        check_user_permission('application_setup', 'read')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      );

    CREATE POLICY "Users with edit access can modify technical details"
      ON application_technical_details FOR ALL
      TO authenticated
      USING (
        check_user_permission('application_setup', 'edit')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      )
      WITH CHECK (
        check_user_permission('application_setup', 'edit')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      );
  END IF;
END $$;

-- Update policies for application_use_cases
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'application_use_cases') THEN
    DROP POLICY IF EXISTS "Users can view use cases" ON application_use_cases;
    DROP POLICY IF EXISTS "Users can insert use cases" ON application_use_cases;
    DROP POLICY IF EXISTS "Users can update use cases" ON application_use_cases;
    DROP POLICY IF EXISTS "Users can delete use cases" ON application_use_cases;
    DROP POLICY IF EXISTS "Users with edit access can modify use cases" ON application_use_cases;

    CREATE POLICY "Users with read access can view use cases"
      ON application_use_cases FOR SELECT
      TO authenticated
      USING (
        check_user_permission('application_setup', 'read')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      );

    CREATE POLICY "Users with edit access can modify use cases"
      ON application_use_cases FOR ALL
      TO authenticated
      USING (
        check_user_permission('application_setup', 'edit')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      )
      WITH CHECK (
        check_user_permission('application_setup', 'edit')
        AND application_id IN (
          SELECT id FROM applications WHERE tenant_id::text IN (
            SELECT tenant_id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
          )
        )
      );
  END IF;
END $$;

-- Create helper function for component-based access with admin override
CREATE OR REPLACE FUNCTION check_user_access_with_override(
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
BEGIN
  v_user_email := current_setting('request.jwt.claims', true)::json->>'email';
  
  SELECT role INTO v_user_role
  FROM users
  WHERE email = v_user_email;
  
  IF v_user_role IN ('Platform Admin') THEN
    RETURN true;
  END IF;
  
  RETURN check_user_permission(p_component_id, p_required_level);
END;
$$;

-- Create trigger function to auto-log activities
CREATE OR REPLACE FUNCTION auto_log_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_component_id text;
  v_action_type text;
  v_resource_type text;
BEGIN
  v_resource_type := TG_TABLE_NAME;
  
  CASE TG_TABLE_NAME
    WHEN 'applications', 'application_technical_details', 'application_use_cases' THEN
      v_component_id := 'application_setup';
    ELSE
      v_component_id := 'unknown';
  END CASE;
  
  CASE TG_OP
    WHEN 'INSERT' THEN
      v_action_type := 'create';
    WHEN 'UPDATE' THEN
      v_action_type := 'update';
    WHEN 'DELETE' THEN
      v_action_type := 'delete';
  END CASE;
  
  PERFORM log_user_activity(
    v_component_id,
    v_action_type,
    v_resource_type,
    COALESCE(NEW.id, OLD.id),
    '{}'::jsonb
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add activity logging triggers to key tables
DO $$
BEGIN
  DROP TRIGGER IF EXISTS log_applications_activity ON applications;
  CREATE TRIGGER log_applications_activity
    AFTER INSERT OR UPDATE OR DELETE ON applications
    FOR EACH ROW EXECUTE FUNCTION auto_log_activity();

  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'application_technical_details') THEN
    DROP TRIGGER IF EXISTS log_technical_details_activity ON application_technical_details;
    CREATE TRIGGER log_technical_details_activity
      AFTER INSERT OR UPDATE OR DELETE ON application_technical_details
      FOR EACH ROW EXECUTE FUNCTION auto_log_activity();
  END IF;

  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'application_use_cases') THEN
    DROP TRIGGER IF EXISTS log_use_cases_activity ON application_use_cases;
    CREATE TRIGGER log_use_cases_activity
      AFTER INSERT OR UPDATE OR DELETE ON application_use_cases
      FOR EACH ROW EXECUTE FUNCTION auto_log_activity();
  END IF;
END $$;
