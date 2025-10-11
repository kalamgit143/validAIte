export interface Stakeholder {
  role: StakeholderRole;
  name: string;
  email: string;
  department: string;
  required: boolean;
}

export type StakeholderRole =
  | 'Governance Lead'
  | 'Domain Expert'
  | 'Ethics Reviewer'
  | 'Security Officer'
  | 'Compliance Officer'
  | 'Technical Lead';

export interface StakeholderApproval {
  stakeholder: Stakeholder;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Recused';
  decision_date?: string;
  signature?: string;
  comments?: string;
  conditions?: string[];
}

export type DeploymentDecision =
  | 'Full Deployment'
  | 'Staged Rollout'
  | 'Pilot Program'
  | 'Conditional Approval'
  | 'Deployment Blocked';

export interface DeploymentCondition {
  id: string;
  condition: string;
  required: boolean;
  met: boolean;
  verified_by?: string;
  verified_date?: string;
}

export interface AuthorizationRequest {
  id: string;
  application_name: string;
  archetype: string;
  trust_matrix_id: string;
  overall_trust_index: number;
  risk_tier: string;
  requested_by: string;
  requested_date: string;
  target_deployment_date?: string;
  deployment_environment: 'Production' | 'Staging' | 'Development' | 'Pilot';
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Conditional';
}

export interface AuthorizationDecision {
  id: string;
  request_id: string;
  decision: DeploymentDecision;
  decision_date: string;
  final_approver: string;
  stakeholder_approvals: StakeholderApproval[];
  conditions: DeploymentCondition[];
  notes: string;
  certificate_generated: boolean;
  certificate_url?: string;
  deployment_authorized: boolean;
  authorization_expires?: string;
}

export interface AuthorizationCertificate {
  certificate_id: string;
  application_name: string;
  archetype: string;
  trust_index: number;
  decision: DeploymentDecision;
  authorization_date: string;
  authorized_by: string;
  stakeholders: StakeholderApproval[];
  conditions: DeploymentCondition[];
  valid_until?: string;
  certificate_hash: string;
  compliance_attestation: ComplianceAttestation;
}

export interface ComplianceAttestation {
  nist_rmf_compliant: boolean;
  eu_ai_act_compliant: boolean;
  gdpr_compliant: boolean;
  industry_standards: string[];
  attestation_statement: string;
  attested_by: string;
  attestation_date: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actor_role: string;
  details: Record<string, any>;
  ip_address?: string;
  immutable_hash: string;
}

export interface AuthorizationWorkflow {
  request: AuthorizationRequest;
  decision?: AuthorizationDecision;
  audit_trail: AuditLogEntry[];
  current_stage: 'Request' | 'Review' | 'Decision' | 'Complete';
}
