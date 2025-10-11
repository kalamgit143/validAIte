import {
  Stakeholder,
  StakeholderApproval,
  AuthorizationRequest,
  AuthorizationDecision,
  AuthorizationCertificate,
  DeploymentDecision,
  DeploymentCondition,
  AuditLogEntry,
  ComplianceAttestation
} from '../types/authorization';

export function getDefaultStakeholders(): Stakeholder[] {
  return [
    {
      role: 'Governance Lead',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'AI Governance',
      required: true
    },
    {
      role: 'Domain Expert',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      department: 'Business Domain',
      required: true
    },
    {
      role: 'Ethics Reviewer',
      name: 'Dr. Aisha Patel',
      email: 'aisha.patel@company.com',
      department: 'Ethics & Compliance',
      required: true
    },
    {
      role: 'Security Officer',
      name: 'James Rodriguez',
      email: 'james.rodriguez@company.com',
      department: 'Information Security',
      required: true
    },
    {
      role: 'Compliance Officer',
      name: 'Emily Thompson',
      email: 'emily.thompson@company.com',
      department: 'Legal & Compliance',
      required: false
    },
    {
      role: 'Technical Lead',
      name: 'David Kim',
      email: 'david.kim@company.com',
      department: 'Engineering',
      required: false
    }
  ];
}

export function initializeStakeholderApprovals(stakeholders: Stakeholder[]): StakeholderApproval[] {
  return stakeholders.map(stakeholder => ({
    stakeholder,
    status: 'Pending',
    decision_date: undefined,
    signature: undefined,
    comments: undefined,
    conditions: []
  }));
}

export function createAuthorizationRequest(
  applicationName: string,
  archetype: string,
  trustMatrixId: string,
  overallTrustIndex: number,
  riskTier: string,
  requestedBy: string
): AuthorizationRequest {
  return {
    id: `AUTH-REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    application_name: applicationName,
    archetype,
    trust_matrix_id: trustMatrixId,
    overall_trust_index: overallTrustIndex,
    risk_tier: riskTier,
    requested_by: requestedBy,
    requested_date: new Date().toISOString(),
    target_deployment_date: undefined,
    deployment_environment: 'Production',
    status: 'Draft'
  };
}

export function determineRecommendedDecision(
  trustIndex: number,
  riskTier: string,
  passRate: number
): DeploymentDecision {
  if (trustIndex >= 85 && passRate >= 90) {
    return 'Full Deployment';
  } else if (trustIndex >= 75 && passRate >= 80) {
    return 'Staged Rollout';
  } else if (trustIndex >= 65 && passRate >= 70) {
    return 'Pilot Program';
  } else if (trustIndex >= 55) {
    return 'Conditional Approval';
  } else {
    return 'Deployment Blocked';
  }
}

export function generateDeploymentConditions(
  trustIndex: number,
  riskTier: string,
  failedTests: number
): DeploymentCondition[] {
  const conditions: DeploymentCondition[] = [];

  if (trustIndex < 80) {
    conditions.push({
      id: `COND-${Date.now()}-1`,
      condition: 'Complete additional testing for metrics below threshold',
      required: true,
      met: false
    });
  }

  if (riskTier === 'High' || riskTier === 'Critical') {
    conditions.push({
      id: `COND-${Date.now()}-2`,
      condition: 'Implement enhanced monitoring and alerting',
      required: true,
      met: false
    });
  }

  if (failedTests > 0) {
    conditions.push({
      id: `COND-${Date.now()}-3`,
      condition: `Remediate ${failedTests} failed test case(s) before deployment`,
      required: true,
      met: false
    });
  }

  conditions.push({
    id: `COND-${Date.now()}-4`,
    condition: 'Set up continuous monitoring dashboard',
    required: true,
    met: false
  });

  conditions.push({
    id: `COND-${Date.now()}-5`,
    condition: 'Schedule post-deployment review within 30 days',
    required: true,
    met: false
  });

  return conditions;
}

export function calculateApprovalProgress(approvals: StakeholderApproval[]): {
  total: number;
  required: number;
  approved: number;
  rejected: number;
  pending: number;
  requiredApproved: number;
  canProceed: boolean;
} {
  const total = approvals.length;
  const required = approvals.filter(a => a.stakeholder.required).length;
  const approved = approvals.filter(a => a.status === 'Approved').length;
  const rejected = approvals.filter(a => a.status === 'Rejected').length;
  const pending = approvals.filter(a => a.status === 'Pending').length;
  const requiredApproved = approvals.filter(
    a => a.stakeholder.required && a.status === 'Approved'
  ).length;

  const canProceed = requiredApproved === required && rejected === 0;

  return {
    total,
    required,
    approved,
    rejected,
    pending,
    requiredApproved,
    canProceed
  };
}

export function approveStakeholder(
  approval: StakeholderApproval,
  approverName: string,
  comments?: string,
  conditions?: string[]
): StakeholderApproval {
  return {
    ...approval,
    status: 'Approved',
    decision_date: new Date().toISOString(),
    signature: generateSignature(approverName),
    comments: comments || `Approved by ${approverName}`,
    conditions: conditions || []
  };
}

export function rejectStakeholder(
  approval: StakeholderApproval,
  approverName: string,
  reason: string
): StakeholderApproval {
  return {
    ...approval,
    status: 'Rejected',
    decision_date: new Date().toISOString(),
    signature: generateSignature(approverName),
    comments: reason
  };
}

export function generateSignature(name: string): string {
  const timestamp = new Date().getTime();
  const hash = btoa(`${name}-${timestamp}`);
  return `SIG-${hash.substring(0, 16)}`;
}

export function createAuthorizationDecision(
  request: AuthorizationRequest,
  decision: DeploymentDecision,
  approver: string,
  approvals: StakeholderApproval[],
  conditions: DeploymentCondition[],
  notes: string
): AuthorizationDecision {
  const deploymentAuthorized =
    decision !== 'Deployment Blocked' &&
    calculateApprovalProgress(approvals).canProceed;

  return {
    id: `AUTH-DEC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    request_id: request.id,
    decision,
    decision_date: new Date().toISOString(),
    final_approver: approver,
    stakeholder_approvals: approvals,
    conditions,
    notes,
    certificate_generated: false,
    deployment_authorized: deploymentAuthorized,
    authorization_expires: deploymentAuthorized
      ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      : undefined
  };
}

export function generateComplianceAttestation(
  trustIndex: number,
  approver: string
): ComplianceAttestation {
  return {
    nist_rmf_compliant: trustIndex >= 70,
    eu_ai_act_compliant: trustIndex >= 75,
    gdpr_compliant: true,
    industry_standards: ['ISO/IEC 42001', 'IEEE 7000', 'NIST AI RMF'],
    attestation_statement:
      'I hereby attest that this AI system has undergone comprehensive validation and meets all applicable regulatory requirements and industry standards for trustworthy AI deployment.',
    attested_by: approver,
    attestation_date: new Date().toISOString()
  };
}

export function generateAuthorizationCertificate(
  request: AuthorizationRequest,
  decision: AuthorizationDecision,
  approver: string
): AuthorizationCertificate {
  const certificateData = {
    certificate_id: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    application_name: request.application_name,
    archetype: request.archetype,
    trust_index: request.overall_trust_index,
    decision: decision.decision,
    authorization_date: decision.decision_date,
    authorized_by: approver,
    stakeholders: decision.stakeholder_approvals,
    conditions: decision.conditions,
    valid_until: decision.authorization_expires,
    certificate_hash: '',
    compliance_attestation: generateComplianceAttestation(request.overall_trust_index, approver)
  };

  certificateData.certificate_hash = generateCertificateHash(certificateData);

  return certificateData;
}

export function generateCertificateHash(certificate: any): string {
  const dataString = JSON.stringify({
    id: certificate.certificate_id,
    app: certificate.application_name,
    trust: certificate.trust_index,
    date: certificate.authorization_date,
    approver: certificate.authorized_by
  });

  return btoa(dataString).substring(0, 32);
}

export function createAuditLogEntry(
  action: string,
  actor: string,
  actorRole: string,
  details: Record<string, any>
): AuditLogEntry {
  const entry = {
    id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    action,
    actor,
    actor_role: actorRole,
    details,
    ip_address: '192.168.1.1',
    immutable_hash: ''
  };

  entry.immutable_hash = generateAuditHash(entry);

  return entry;
}

export function generateAuditHash(entry: any): string {
  const dataString = JSON.stringify({
    timestamp: entry.timestamp,
    action: entry.action,
    actor: entry.actor,
    details: entry.details
  });

  return btoa(dataString).substring(0, 32);
}

export function exportAuthorizationCertificate(certificate: AuthorizationCertificate): string {
  return JSON.stringify(certificate, null, 2);
}

export function exportAuditTrail(entries: AuditLogEntry[]): string {
  return JSON.stringify(entries, null, 2);
}

export function getDecisionColor(decision: DeploymentDecision): string {
  switch (decision) {
    case 'Full Deployment':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Staged Rollout':
      return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
    case 'Pilot Program':
      return 'text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/20 border-cyan-500';
    case 'Conditional Approval':
      return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500';
    case 'Deployment Blocked':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
    default:
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Approved':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
    case 'Rejected':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
    case 'Pending':
      return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
    case 'Recused':
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    default:
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
  }
}

export function getRoleIcon(role: string): string {
  switch (role) {
    case 'Governance Lead':
      return '👔';
    case 'Domain Expert':
      return '🎯';
    case 'Ethics Reviewer':
      return '⚖️';
    case 'Security Officer':
      return '🔒';
    case 'Compliance Officer':
      return '📋';
    case 'Technical Lead':
      return '⚙️';
    default:
      return '👤';
  }
}
