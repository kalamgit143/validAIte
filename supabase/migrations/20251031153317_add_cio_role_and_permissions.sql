/*
  # Add CIO Role and Permissions

  ## Overview
  Adds Chief Information Officer (CIO) role to the ValidAIte platform with appropriate access permissions aligned with NIST RMF standards.

  ## 1. Changes
  
  ### Role Addition
  - Adds CIO as a valid role option in the system
  - CIO has strategic oversight and governance capabilities
  
  ### RLS Policy Updates
  - Updates project creation policy to include CIO
  - CIO can create and oversee projects (strategic level)
  - CIO can view all projects within their tenant (oversight)
  
  ## 2. CIO Responsibilities (NIST RMF Context)
  - Strategic AI governance and oversight
  - Enterprise AI portfolio management
  - Resource allocation and ROI assessment
  - Cross-functional AI initiative coordination
  - Executive reporting and stakeholder communication
  - AI program risk oversight
  - Technology roadmap alignment
  
  ## 3. Access Level
  - Read access: All projects within tenant
  - Create access: New projects (strategic initiatives)
  - Update access: Own created projects
  - Delete access: Own created projects
  
  ## 4. Important Notes
  - CIO role complements CISO (security) and Quality & Compliance Manager (operational)
  - CIO focuses on strategic oversight while CISO focuses on security
  - No data is modified, only security policies are updated
*/

-- Drop existing project creation policy
DROP POLICY IF EXISTS "Project creators can create projects" ON projects;

-- Create updated policy with CIO included
CREATE POLICY "Project creators can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role IN ('CIO', 'CISO', 'Quality & Compliance Manager', 'Platform Admin')
    )
  );

-- Drop existing project view policy  
DROP POLICY IF EXISTS "Users can view projects they are members of" ON projects;

-- Create updated policy allowing CIO to view all projects in their tenant
CREATE POLICY "Users can view projects they are members of or CIO can view all"
  ON projects FOR SELECT
  TO authenticated
  USING (
    -- Regular users: view projects they're members of
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id IN (
        SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
    OR
    -- CIO: view all projects in their tenant
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role = 'CIO'
      AND users.tenant_id = projects.tenant_id
    )
  );
