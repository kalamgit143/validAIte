/*
  # Update RLS Policies for New Role Names

  ## Overview
  Updates the RLS policies to recognize the new role naming convention including CISO role.

  ## Changes
  - Updates the "AI QA & Compliance Managers can create projects" policy to include:
    - CISO
    - Quality & Compliance Manager
    - Platform Admin

  ## Important Notes
  - Drops existing policy and recreates it with updated role names
  - No data is modified, only security policies
*/

-- Drop the old policy
DROP POLICY IF EXISTS "AI QA & Compliance Managers can create projects" ON projects;

-- Create updated policy with new role names
CREATE POLICY "Project creators can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role IN ('CISO', 'Quality & Compliance Manager', 'Platform Admin')
    )
  );