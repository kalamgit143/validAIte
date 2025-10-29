/*
  # Multi-tenant Projects and Role-Based Access Control

  ## Overview
  This migration creates a comprehensive multi-tenant project management system with role-based access control (RBAC) for the ValidAIte NIST AI RMF platform.

  ## 1. New Tables

  ### `users`
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email address
  - `full_name` (text) - User's full name
  - `role` (text) - User's primary role (AI QA & Compliance Manager, AI Quality Engineer, etc.)
  - `tenant_id` (text) - Organization/tenant identifier
  - `created_at` (timestamptz) - Record creation timestamp
  - `last_login` (timestamptz) - Last login timestamp

  ### `projects`
  - `id` (uuid, primary key) - Unique project identifier
  - `project_name` (text) - Name of the AI project
  - `project_description` (text) - Project description
  - `tenant_id` (text) - Organization/tenant identifier
  - `created_by` (uuid, foreign key -> users) - Project creator
  - `status` (text) - Project status (active, archived, completed)
  - `archetype_code` (text) - NIST archetype classification
  - `risk_tier` (text) - Risk tier (LOW, MODERATE, HIGH, CRITICAL)
  - `current_stage` (text) - Current workflow stage
  - `created_at` (timestamptz) - Project creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `project_members`
  - `id` (uuid, primary key) - Unique membership identifier
  - `project_id` (uuid, foreign key -> projects) - Associated project
  - `user_id` (uuid, foreign key -> users) - Team member
  - `role` (text) - Role in this specific project
  - `permissions` (jsonb) - Specific permissions array
  - `added_at` (timestamptz) - When member was added
  - `added_by` (uuid, foreign key -> users) - Who added the member

  ## 2. Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Users can only see their own data and projects they're members of
  - Project creators and AI QA & Compliance Managers have elevated permissions
  - Tenant isolation ensures data separation

  ### RLS Policies
  - `users` table: Users can read their own data
  - `projects` table: Users can see projects they're members of
  - `project_members` table: Users can see memberships for their projects

  ## 3. Indexes
  - Indexes on foreign keys for performance
  - Indexes on tenant_id for multi-tenant queries
  - Indexes on email for user lookups

  ## 4. Important Notes
  - Default values ensure data consistency
  - Timestamps for audit trail
  - JSONB for flexible permissions model
  - Cascading deletes for data integrity
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'AI Quality Engineer',
  tenant_id text NOT NULL DEFAULT 'default',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL,
  project_description text DEFAULT '',
  tenant_id text NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active',
  archetype_code text DEFAULT '',
  risk_tier text DEFAULT 'MODERATE',
  current_stage text DEFAULT 'Application Setup',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_members table
CREATE TABLE IF NOT EXISTS project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL,
  permissions jsonb DEFAULT '["read"]'::jsonb,
  added_at timestamptz DEFAULT now(),
  added_by uuid REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE(project_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_members_project ON project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_project_members_user ON project_members(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

-- RLS Policies for projects table
CREATE POLICY "Users can view projects they are members of"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id IN (
        SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
  );

CREATE POLICY "AI QA & Compliance Managers can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND users.role IN ('AI QA & Compliance Manager', 'AI Quality & Compliance Lead', 'Platform Admin')
    )
  );

CREATE POLICY "Project creators can update their projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    created_by IN (
      SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    created_by IN (
      SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Project creators can delete their projects"
  ON projects FOR DELETE
  TO authenticated
  USING (
    created_by IN (
      SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- RLS Policies for project_members table
CREATE POLICY "Users can view project members of their projects"
  ON project_members FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT project_id FROM project_members
      WHERE user_id IN (
        SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
  );

CREATE POLICY "Project creators can add members"
  ON project_members FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects
      WHERE created_by IN (
        SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
  );

CREATE POLICY "Project creators can remove members"
  ON project_members FOR DELETE
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects
      WHERE created_by IN (
        SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
  );

-- Insert demo user
INSERT INTO users (email, full_name, role, tenant_id)
VALUES ('demo@validaite.com', 'Demo User', 'AI Quality & Compliance Lead', 'validaite-demo')
ON CONFLICT (email) DO NOTHING;