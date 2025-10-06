import React, { useState } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  FileCheck,
  Target,
  Activity,
  Lock
} from 'lucide-react';

interface GateCheck {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'pending';
  details: string;
}

const AuthorizationEngine: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState('insurance_policy_advisor');

  const applications = [
    { id: 'insurance_policy_advisor', name: 'Insurance Policy Advisor (A3+A11+A9)', archetype: 'A3', riskTier: 'HIGH' },
    { id: 'code_assistant', name: 'Code Generation Assistant (A5)', archetype: 'A5', riskTier: 'HIGH' },
    { id: 'customer_support', name: 'Customer Support Bot (A2)', archetype: 'A2', riskTier: 'MODERATE' }
  ];

  const gateChecks: GateCheck[] = [
    {
      id: 'controls',
      name: 'All Required Controls Implemented',
      status: 'pass',
      details: '10/10 controls from ACC fully implemented and verified'
    },
    {
      id: 'tests',
      name: 'All Required Tests Executed',
      status: 'pass',
      details: '5/5 TEVV tests executed successfully with valid results'
    },
    {
      id: 'metrics',
      name: 'All Metrics Meet Thresholds',
      status: 'pass',
      details: 'GRD: 0.92≥0.90 ✓, CIT: 0.96≥0.95 ✓, R@5: 0.87≥0.85 ✓, FRS: 2.1≤3 ✓'
    },
    {
      id: 'blockers',
      name: 'No Blockers Present',
      status: 'pass',
      details: 'No policy violations, residency issues, or critical findings detected'
    }
  ];

  const authorizationDecision = {
    decision: 'authorized' as const,
    timestamp: '2024-01-15T14:30:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    approver: 'Risk Owner - Sarah Chen',
    monitoringPlan: [
      'Groundedness p50 ≥ 0.90',
      'Freshness lag ≤ 3 days',
      'Retrieval drift < 10%',
      'Incident rate = 0'
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'fail':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'fail':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const allChecksPassed = gateChecks.every(check => check.status === 'pass');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span>Authorization Engine</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Machine-checkable authorization decisions for AI system deployment
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Application
        </label>
        <select
          value={selectedApplication}
          onChange={(e) => setSelectedApplication(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {applications.map(app => (
            <option key={app.id} value={app.id}>{app.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Archetype</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">A3</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Tier</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600">HIGH</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Gate Status</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {gateChecks.filter(c => c.status === 'pass').length}/{gateChecks.length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-600" />
          <span>Authorization Gate Checks</span>
        </h2>
        <div className="space-y-4">
          {gateChecks.map(check => (
            <div
              key={check.id}
              className={`p-4 rounded-lg border-2 ${
                check.status === 'pass'
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : check.status === 'fail'
                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                  : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3 flex-1">
                  {getStatusIcon(check.status)}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {check.name}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(check.status)}`}>
                  {check.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                {check.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Lock className="w-6 h-6 text-blue-600" />
          <span>Authorization Logic</span>
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm mb-4">
          <div className="text-gray-700 dark:text-gray-300">
            <div className="mb-2">
              <span className="text-blue-600 dark:text-blue-400">IF</span> all_required_controls_implemented <span className="text-blue-600 dark:text-blue-400">AND</span>
            </div>
            <div className="mb-2 ml-4">
              all_required_tests_executed <span className="text-blue-600 dark:text-blue-400">AND</span>
            </div>
            <div className="mb-2 ml-4">
              all_metrics_pass_thresholds <span className="text-blue-600 dark:text-blue-400">AND</span>
            </div>
            <div className="mb-2 ml-4">
              no_blockers_present
            </div>
            <div className="mt-3">
              <span className="text-green-600 dark:text-green-400">THEN</span> Authorize(time_bound) <span className="text-blue-600 dark:text-blue-400">WITH</span> MonitoringPlan
            </div>
            <div className="mt-1">
              <span className="text-red-600 dark:text-red-400">ELSE</span> Remediate → Re-assess
            </div>
          </div>
        </div>
      </div>

      {allChecksPassed && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-green-300 dark:border-green-700 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AUTHORIZED
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                System authorized for production deployment with monitoring plan
              </p>
            </div>
            <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-lg">
              ✓ APPROVED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authorization Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Decision:</span>
                  <span className="font-semibold text-green-600">AUTHORIZED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Timestamp:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(authorizationDecision.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(authorizationDecision.validUntil).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Approver:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {authorizationDecision.approver}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Monitoring Plan</h3>
              <div className="space-y-2">
                {authorizationDecision.monitoringPlan.map((requirement, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizationEngine;
