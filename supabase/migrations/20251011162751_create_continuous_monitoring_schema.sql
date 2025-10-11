/*
  # Create Continuous Monitoring Schema

  ## Overview
  This migration creates comprehensive database tables for Stage 10: Continuous Monitoring.
  It supports real-time monitoring streams, drift detection, incident management, and
  automated response actions for deployed AI systems.

  ## Tables Created

  ### 1. `monitoring_streams`
  - Tracks active real-time monitoring streams
  - Links to authorized applications
  - Monitors metrics, drift, bias, performance, and security
  - Fields:
    - `id` (uuid, PK): Unique stream identifier
    - `name` (text): Monitor name
    - `type` (text): drift_monitoring/bias_monitoring/safety_monitoring/etc.
    - `application_name` (text): Application being monitored
    - `archetype` (text): Application archetype
    - `status` (text): active/paused/stopped
    - `threshold` (numeric): Alert threshold value
    - `current_value` (numeric): Latest metric value
    - `alert_count` (integer): Number of alerts triggered
    - `last_alert` (timestamptz): When last alert occurred
    - `monitoring_frequency` (text): How often to check (e.g., "30 seconds")
    - `alert_channels` (jsonb): Array of alert channels (email, slack, etc.)
    - `escalation_policy` (text): Governance escalation protocol
    - `business_impact` (text): Business impact description
    - `risk_traceability` (jsonb): Array of risk IDs from risk register
    - `created_at`, `updated_at`: Audit timestamps

  ### 2. `monitoring_metrics`
  - Time-series data for monitored metrics
  - Enables trend analysis and visualization
  - Fields:
    - `id` (uuid, PK): Unique metric record
    - `stream_id` (uuid, FK): Links to monitoring stream
    - `timestamp` (timestamptz): When metric was recorded
    - `metric_name` (text): Name of metric (e.g., "bias_score", "accuracy")
    - `metric_value` (numeric): Metric value
    - `threshold` (numeric): Threshold at time of measurement
    - `status` (text): healthy/warning/critical
    - `metadata` (jsonb): Additional context

  ### 3. `incidents`
  - Tracks security, bias, drift, and performance incidents
  - Links to monitoring streams and affected applications
  - Maintains incident response workflow
  - Fields:
    - `id` (uuid, PK): Unique incident identifier
    - `stream_id` (uuid, FK): Source monitoring stream
    - `title` (text): Incident title
    - `severity` (text): critical/high/medium/low
    - `status` (text): investigating/resolved/mitigated
    - `detected_at` (timestamptz): Detection timestamp
    - `resolved_at` (timestamptz): Resolution timestamp
    - `affected_applications` (jsonb): Array of affected apps
    - `response_team` (text): Team handling incident
    - `governance_escalation` (text): Executives notified
    - `risk_traceability` (jsonb): Risk register links
    - `business_impact` (text): Business impact description
    - `regulatory_implications` (text): Compliance concerns
    - `actions` (jsonb): Array of response actions taken
    - `mitigation_strategy` (text): How risk was mitigated
    - `resolution` (text): Final resolution
    - `created_at`, `updated_at`: Audit timestamps

  ### 4. `automated_responses`
  - Automated mitigation actions
  - Triggered by monitoring thresholds
  - Tracks effectiveness over time
  - Fields:
    - `id` (uuid, PK): Unique response identifier
    - `name` (text): Response name
    - `trigger_condition` (text): When to activate
    - `actions` (jsonb): Array of automated actions
    - `status` (text): active/inactive/testing
    - `last_triggered` (timestamptz): Last activation time
    - `effectiveness_score` (integer): 0-100 effectiveness rating
    - `application_name` (text): Target application
    - `created_at`, `updated_at`: Audit timestamps

  ### 5. `infrastructure_health`
  - Infrastructure and system health monitoring
  - Tracks CPU, memory, network, storage
  - Multi-region support
  - Fields:
    - `id` (uuid, PK): Unique health record
    - `component_name` (text): Infrastructure component
    - `status` (text): healthy/warning/critical/degraded
    - `cpu_usage` (integer): CPU percentage
    - `memory_usage` (integer): Memory percentage
    - `network_usage` (integer): Network percentage
    - `storage_usage` (integer): Storage percentage
    - `instance_count` (integer): Number of instances
    - `region` (text): Cloud region
    - `last_health_check` (timestamptz): Last check time
    - `created_at`, `updated_at`: Audit timestamps

  ### 6. `alert_notifications`
  - Log of all alerts sent
  - Tracks delivery status
  - Enables alert audit trail
  - Fields:
    - `id` (uuid, PK): Unique notification identifier
    - `stream_id` (uuid, FK): Source monitoring stream
    - `incident_id` (uuid, FK): Related incident (if any)
    - `alert_type` (text): bias/drift/security/performance
    - `severity` (text): critical/high/medium/low
    - `channel` (text): email/slack/sms/webhook
    - `recipient` (text): Who received alert
    - `message` (text): Alert message content
    - `delivery_status` (text): sent/delivered/failed
    - `sent_at` (timestamptz): When alert was sent
    - `created_at`: Audit timestamp

  ## Security (RLS)
  - All tables have Row Level Security enabled
  - Monitoring team can view all streams
  - Users can view their application's monitoring data
  - Incidents visible to response teams and executives
  - Infrastructure health visible to ops team

  ## Compliance
  - **NIST AI RMF**: MEASURE-2 (Continuous Monitoring), MANAGE-4 (Incident Response)
  - **EU AI Act**: Article 61 (Post-Market Monitoring)
  - **ISO/IEC 42001**: Clause 8.1 (Operational Planning), Clause 10 (Improvement)
*/

CREATE TABLE IF NOT EXISTS monitoring_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('drift_monitoring', 'bias_monitoring', 'safety_monitoring', 'performance_monitoring', 'content_monitoring', 'security_monitoring')),
  application_name text NOT NULL,
  archetype text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'stopped')),
  threshold numeric NOT NULL,
  current_value numeric NOT NULL DEFAULT 0,
  alert_count integer NOT NULL DEFAULT 0,
  last_alert timestamptz,
  monitoring_frequency text NOT NULL,
  alert_channels jsonb NOT NULL DEFAULT '[]'::jsonb,
  escalation_policy text NOT NULL,
  business_impact text NOT NULL,
  risk_traceability jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monitoring_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id uuid NOT NULL REFERENCES monitoring_streams(id) ON DELETE CASCADE,
  timestamp timestamptz NOT NULL DEFAULT now(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  threshold numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('healthy', 'warning', 'critical')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id uuid REFERENCES monitoring_streams(id) ON DELETE SET NULL,
  title text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  status text NOT NULL DEFAULT 'investigating' CHECK (status IN ('investigating', 'resolved', 'mitigated', 'acknowledged')),
  detected_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  affected_applications jsonb NOT NULL DEFAULT '[]'::jsonb,
  response_team text,
  governance_escalation text,
  risk_traceability jsonb NOT NULL DEFAULT '[]'::jsonb,
  business_impact text NOT NULL,
  regulatory_implications text,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  mitigation_strategy text,
  resolution text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS automated_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  trigger_condition text NOT NULL,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'testing')),
  last_triggered timestamptz,
  effectiveness_score integer DEFAULT 0 CHECK (effectiveness_score >= 0 AND effectiveness_score <= 100),
  application_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS infrastructure_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  component_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('healthy', 'warning', 'critical', 'degraded')),
  cpu_usage integer NOT NULL CHECK (cpu_usage >= 0 AND cpu_usage <= 100),
  memory_usage integer NOT NULL CHECK (memory_usage >= 0 AND memory_usage <= 100),
  network_usage integer NOT NULL CHECK (network_usage >= 0 AND network_usage <= 100),
  storage_usage integer NOT NULL CHECK (storage_usage >= 0 AND storage_usage <= 100),
  instance_count integer NOT NULL DEFAULT 1,
  region text NOT NULL,
  last_health_check timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alert_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id uuid REFERENCES monitoring_streams(id) ON DELETE SET NULL,
  incident_id uuid REFERENCES incidents(id) ON DELETE SET NULL,
  alert_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  channel text NOT NULL CHECK (channel IN ('email', 'slack', 'sms', 'webhook')),
  recipient text NOT NULL,
  message text NOT NULL,
  delivery_status text NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'delivered', 'failed', 'pending')),
  sent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE monitoring_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE automated_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE infrastructure_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Monitoring team can view all streams"
  ON monitoring_streams FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops'));

CREATE POLICY "Monitoring team can create streams"
  ON monitoring_streams FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring'));

CREATE POLICY "Monitoring team can update streams"
  ON monitoring_streams FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring'))
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring'));

CREATE POLICY "Monitoring team can view metrics"
  ON monitoring_metrics FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops', 'auditor'));

CREATE POLICY "System can insert metrics"
  ON monitoring_metrics FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring', 'system'));

CREATE POLICY "Response teams can view incidents"
  ON incidents FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops', 'security', 'compliance', 'executive'));

CREATE POLICY "Monitoring team can create incidents"
  ON incidents FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring', 'system'));

CREATE POLICY "Response teams can update incidents"
  ON incidents FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops', 'security'))
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops', 'security'));

CREATE POLICY "Monitoring team can view automated responses"
  ON automated_responses FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops'));

CREATE POLICY "Monitoring team can manage automated responses"
  ON automated_responses FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring'))
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring'));

CREATE POLICY "Ops team can view infrastructure health"
  ON infrastructure_health FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops'));

CREATE POLICY "System can record infrastructure health"
  ON infrastructure_health FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'system'));

CREATE POLICY "Alert notifications are visible to monitoring team"
  ON alert_notifications FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'monitoring', 'ops', 'auditor'));

CREATE POLICY "System can send alerts"
  ON alert_notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' IN ('admin', 'monitoring', 'system'));

CREATE INDEX IF NOT EXISTS idx_monitoring_streams_application ON monitoring_streams(application_name);
CREATE INDEX IF NOT EXISTS idx_monitoring_streams_status ON monitoring_streams(status);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_stream_id ON monitoring_metrics(stream_id);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_timestamp ON monitoring_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON incidents(severity);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_detected_at ON incidents(detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_automated_responses_application ON automated_responses(application_name);
CREATE INDEX IF NOT EXISTS idx_infrastructure_health_status ON infrastructure_health(status);
CREATE INDEX IF NOT EXISTS idx_alert_notifications_stream_id ON alert_notifications(stream_id);
CREATE INDEX IF NOT EXISTS idx_alert_notifications_sent_at ON alert_notifications(sent_at DESC);
