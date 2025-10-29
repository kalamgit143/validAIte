/*
  # Restrict Project Creation to Quality & Compliance Manager Only

  ## Overview
  Updates the RLS policy to allow only Quality & Compliance Manager role to create projects.

  ## Changes
  - Drops existing "Project creators can create projects" policy
  - Creates new policy that allows only Quality & Compliance Manager role to create projects

  ## Important Notes
  - CISO and Platform Admin can no longer create projects
  - Only Quality & Compliance Manager has project creation permission
  - No data is modified, only security policies
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Project creators can create projects" ON projects;

-- Create updated policy with only Quality & Compliance Manager
CREATE POLICY "Quality & Compliance Manager can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role = 'Quality & Compliance Manager'
    )
  );