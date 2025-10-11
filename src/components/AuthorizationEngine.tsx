import React, { useState, useMemo } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileCheck,
  AlertTriangle,
  Users,
  Lock,
  Unlock,
  Award,
  FileText,
  ClipboardCheck
} from 'lucide-react';
import {
  StakeholderApproval,
  AuthorizationRequest,
  AuthorizationDecision,
  DeploymentDecision,
  DeploymentCondition,
  AuditLogEntry,
  AuthorizationCertificate
} from '../types/authorization';
import {
  getDefaultStakeholders,
  initializeStakeholderApprovals,
  createAuthorizationRequest,
  determineRecommendedDecision,
  generateDeploymentConditions,
  calculateApprovalProgress,
  approveStakeholder,
  rejectStakeholder,
  createAuthorizationDecision,
  generateAuthorizationCertificate,
  createAuditLogEntry,
  exportAuthorizationCertificate,
  exportAuditTrail,
  getDecisionColor,
  getStatusColor,
  getRoleIcon
} from '../utils/authorization';

const AuthorizationEngine: React.FC = () => {
  const mockTrustMatrixData = {
    id: 'TM-2025-001',
    application_name: 'Insurance Policy Assistant',
    archetype: 'A2-RAG-ENT-PII',
    overall_trust_index: 85,
    risk_tier: 'Low',
    pass_rate: 100.0,
    total_tests: 3,
    failed_tests: 0
  };

  const [authRequest, setAuthRequest] = useState<AuthorizationRequest>(
    createAuthorizationRequest(
      mockTrustMatrixData.application_name,
      mockTrustMatrixData.archetype,
      mockTrustMatrixData.id,
      mockTrustMatrixData.overall_trust_index,
      mockTrustMatrixData.risk_tier,
      'System Administrator'
    )
  );

  const stakeholders = useMemo(() => getDefaultStakeholders(), []);
  const [approvals, setApprovals] = useState<StakeholderApproval[]>(
    initializeStakeholderApprovals(stakeholders)
  );

  const recommendedDecision = useMemo(
    () =>
      determineRecommendedDecision(
        mockTrustMatrixData.overall_trust_index,
        mockTrustMatrixData.risk_tier,
        mockTrustMatrixData.pass_rate
      ),
    []
  );

  const [selectedDecision, setSelectedDecision] = useState<DeploymentDecision>(recommendedDecision);
  const [conditions, setConditions] = useState<DeploymentCondition[]>(
    generateDeploymentConditions(
      mockTrustMatrixData.overall_trust_index,
      mockTrustMatrixData.risk_tier,
      mockTrustMatrixData.failed_tests
    )
  );

  const [notes, setNotes] = useState<string>('');
  const [auditTrail, setAuditTrail] = useState<AuditLogEntry[]>([
    createAuditLogEntry(
      'Authorization Request Created',
      'System Administrator',
      'Admin',
      { request_id: authRequest.id }
    )
  ]);

  const [finalDecision, setFinalDecision] = useState<AuthorizationDecision | null>(null);
  const [certificate, setCertificate] = useState<AuthorizationCertificate | null>(null);

  const approvalProgress = useMemo(() => calculateApprovalProgress(approvals), [approvals]);

  const handleApprove = (index: number) => {
    const approval = approvals[index];
    const updated = approveStakeholder(approval, approval.stakeholder.name);
    const newApprovals = [...approvals];
    newApprovals[index] = updated;
    setApprovals(newApprovals);

    const auditEntry = createAuditLogEntry(
      'Stakeholder Approved',
      approval.stakeholder.name,
      approval.stakeholder.role,
      { stakeholder: approval.stakeholder.role, decision: 'Approved' }
    );
    setAuditTrail([...auditTrail, auditEntry]);
  };

  const handleReject = (index: number, reason: string) => {
    const approval = approvals[index];
    const updated = rejectStakeholder(approval, approval.stakeholder.name, reason);
    const newApprovals = [...approvals];
    newApprovals[index] = updated;
    setApprovals(newApprovals);

    const auditEntry = createAuditLogEntry(
      'Stakeholder Rejected',
      approval.stakeholder.name,
      approval.stakeholder.role,
      { stakeholder: approval.stakeholder.role, decision: 'Rejected', reason }
    );
    setAuditTrail([...auditTrail, auditEntry]);
  };

  const handleToggleCondition = (conditionId: string) => {
    const updated = conditions.map(c =>
      c.id === conditionId
        ? {
            ...c,
            met: !c.met,
            verified_by: !c.met ? 'System Administrator' : undefined,
            verified_date: !c.met ? new Date().toISOString() : undefined
          }
        : c
    );
    setConditions(updated);
  };

  const handleFinalizeDecision = () => {
    const decision = createAuthorizationDecision(
      authRequest,
      selectedDecision,
      'Chief AI Officer',
      approvals,
      conditions,
      notes
    );

    setFinalDecision(decision);

    const cert = generateAuthorizationCertificate(authRequest, decision, 'Chief AI Officer');
    setCertificate(cert);

    const auditEntry = createAuditLogEntry(
      'Authorization Decision Finalized',
      'Chief AI Officer',
      'Executive',
      {
        decision: selectedDecision,
        deployment_authorized: decision.deployment_authorized
      }
    );
    setAuditTrail([...auditTrail, auditEntry]);
  };

  const downloadCertificate = () => {
    if (!certificate) return;
    const data = exportAuthorizationCertificate(certificate);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `authorization-certificate-${certificate.certificate_id}.json`;
    a.click();
  };

  const downloadAuditTrail = () => {
    const data = exportAuditTrail(auditTrail);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${authRequest.id}.json`;
    a.click();
  };

  const canFinalize =
    approvalProgress.canProceed &&
    conditions.filter(c => c.required).every(c => c.met) &&
    !finalDecision;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Authorization Engine
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stage 9: Formal deployment authorization with multi-stakeholder approval
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-xl border-2 border-cyan-200 dark:border-cyan-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-cyan-900 dark:text-cyan-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-600" />
            <span>Trust Matrix Summary</span>
          </h3>
          <span className="px-3 py-1 rounded-lg text-sm font-bold border border-cyan-500 text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/20">
            {mockTrustMatrixData.id}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-cyan-700 dark:text-cyan-400 mb-1">Application</div>
            <div className="font-bold text-cyan-900 dark:text-cyan-100">
              {mockTrustMatrixData.application_name}
            </div>
          </div>
          <div>
            <div className="text-xs text-cyan-700 dark:text-cyan-400 mb-1">Trust Index</div>
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {mockTrustMatrixData.overall_trust_index}
            </div>
          </div>
          <div>
            <div className="text-xs text-cyan-700 dark:text-cyan-400 mb-1">Risk Tier</div>
            <div className="font-bold text-green-700 dark:text-green-400">
              {mockTrustMatrixData.risk_tier}
            </div>
          </div>
          <div>
            <div className="text-xs text-cyan-700 dark:text-cyan-400 mb-1">Pass Rate</div>
            <div className="font-bold text-green-700 dark:text-green-400">
              {mockTrustMatrixData.pass_rate}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <ClipboardCheck className="w-5 h-5 text-purple-600" />
          <span>Recommended Deployment Decision</span>
        </h3>

        <div className="flex items-center space-x-4">
          <span className={`px-4 py-2 rounded-lg text-sm font-bold border ${getDecisionColor(recommendedDecision)}`}>
            {recommendedDecision}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Based on Trust Index: {mockTrustMatrixData.overall_trust_index}, Pass Rate:{' '}
            {mockTrustMatrixData.pass_rate}%
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Stakeholder Approvals</span>
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {approvalProgress.requiredApproved} / {approvalProgress.required} Required Approved
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Approval Progress</span>
              <span>
                {approvalProgress.approved} / {approvalProgress.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                style={{
                  width: `${(approvalProgress.approved / approvalProgress.total) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {approvals.map((approval, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getRoleIcon(approval.stakeholder.role)}</span>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{approval.stakeholder.name}</span>
                        {approval.stakeholder.required && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                            Required
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {approval.stakeholder.role} • {approval.stakeholder.department}
                      </div>
                    </div>
                  </div>

                  <div className="ml-11 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(approval.status)}`}>
                        {approval.status}
                      </span>
                      {approval.decision_date && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(approval.decision_date).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {approval.comments && (
                      <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/50 rounded p-2">
                        {approval.comments}
                      </div>
                    )}

                    {approval.signature && (
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                        Signature: {approval.signature}
                      </div>
                    )}
                  </div>
                </div>

                {approval.status === 'Pending' && !finalDecision && (
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleApprove(index)}
                      className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() =>
                        handleReject(index, 'Insufficient evidence or concerns identified')
                      }
                      className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}

                {approval.status === 'Approved' && (
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                )}

                {approval.status === 'Rejected' && (
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>Deployment Conditions</span>
          </h3>
        </div>

        <div className="p-6 space-y-3">
          {conditions.map(condition => (
            <div
              key={condition.id}
              className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={condition.met}
                onChange={() => handleToggleCondition(condition.id)}
                disabled={finalDecision !== null}
                className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="font-medium text-gray-900 dark:text-white">{condition.condition}</div>
                  {condition.required && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                      Required
                    </span>
                  )}
                </div>
                {condition.met && condition.verified_by && (
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Verified by {condition.verified_by} on{' '}
                    {new Date(condition.verified_date!).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!finalDecision && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <span>Final Deployment Decision</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Decision
              </label>
              <select
                value={selectedDecision}
                onChange={e => setSelectedDecision(e.target.value as DeploymentDecision)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Full Deployment">Full Deployment</option>
                <option value="Staged Rollout">Staged Rollout</option>
                <option value="Pilot Program">Pilot Program</option>
                <option value="Conditional Approval">Conditional Approval</option>
                <option value="Deployment Blocked">Deployment Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Authorization Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={4}
                placeholder="Enter any additional notes, conditions, or requirements..."
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={handleFinalizeDecision}
              disabled={!canFinalize}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                canFinalize
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Unlock className="w-6 h-6" />
              <span>Finalize Authorization Decision</span>
            </button>

            {!canFinalize && (
              <div className="text-sm text-red-600 dark:text-red-400 text-center">
                {!approvalProgress.canProceed &&
                  'All required stakeholders must approve before finalizing'}
                {approvalProgress.canProceed &&
                  !conditions.filter(c => c.required).every(c => c.met) &&
                  'All required conditions must be met before finalizing'}
              </div>
            )}
          </div>
        </div>
      )}

      {finalDecision && certificate && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border-2 border-green-200 dark:border-green-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center space-x-2">
              <Award className="w-6 h-6 text-green-600" />
              <span>Authorization Certificate Issued</span>
            </h3>
            <span className="px-3 py-1 rounded-lg text-sm font-bold border border-green-500 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20">
              {certificate.certificate_id}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-green-700 dark:text-green-400 mb-1">Decision</div>
              <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${getDecisionColor(finalDecision.decision)}`}>
                {finalDecision.decision}
              </span>
            </div>
            <div>
              <div className="text-xs text-green-700 dark:text-green-400 mb-1">Deployment Authorized</div>
              <div className="font-bold text-lg">
                {finalDecision.deployment_authorized ? (
                  <span className="text-green-700 dark:text-green-400">YES</span>
                ) : (
                  <span className="text-red-700 dark:text-red-400">NO</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-green-700 dark:text-green-400 mb-1">Authorized By</div>
              <div className="font-bold text-green-900 dark:text-green-100">{certificate.authorized_by}</div>
            </div>
            <div>
              <div className="text-xs text-green-700 dark:text-green-400 mb-1">Valid Until</div>
              <div className="font-bold text-green-900 dark:text-green-100">
                {certificate.valid_until
                  ? new Date(certificate.valid_until).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadCertificate}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Certificate</span>
            </button>

            <button
              onClick={downloadAuditTrail}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <FileCheck className="w-5 h-5" />
              <span>Download Audit Trail</span>
            </button>
          </div>
        </div>
      )}

      {finalDecision && (
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
          <div className="flex items-center space-x-3">
            <FileCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h4 className="font-bold text-purple-900 dark:text-purple-100 text-lg">
                Authorization Complete
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {finalDecision.deployment_authorized
                  ? 'System authorized for deployment. Proceed to Stage 10: Continuous Monitoring'
                  : 'Deployment not authorized. Review conditions and resubmit.'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Finalized</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              {new Date(finalDecision.decision_date).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizationEngine;
