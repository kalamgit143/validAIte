import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSearch,
  Shield,
  Cog,
  TestTube,
  FileCheck,
  Activity
} from 'lucide-react';

interface RMFPhase {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  actions: RMFAction[];
  outputs: string[];
}

interface RMFAction {
  name: string;
  completed: boolean;
  timestamp?: string;
}

const RMFWorkflow: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('categorize');

  const phases: RMFPhase[] = [
    {
      id: 'categorize',
      name: '1. Categorize',
      description: 'Classify AI system and determine risk tier',
      icon: <FileSearch className="w-6 h-6" />,
      status: 'completed',
      actions: [
        { name: 'Ingest VAM manifest', completed: true, timestamp: '2025-10-02 14:15' },
        { name: 'Run ADM classifier', completed: true, timestamp: '2025-10-02 14:16' },
        { name: 'Determine archetype mix', completed: true, timestamp: '2025-10-02 14:16' },
        { name: 'Compute risk tier', completed: true, timestamp: '2025-10-02 14:16' },
        { name: 'Generate decision trace', completed: true, timestamp: '2025-10-02 14:16' }
      ],
      outputs: [
        'Primary Archetype: A3 (RAG Knowledge Assistant)',
        'Mixture: A11 (30%), A9 (20%)',
        'Modifiers: RAG, ENT, PII',
        'Risk Tier: HIGH',
        'Confidence: 0.62'
      ]
    },
    {
      id: 'select',
      name: '2. Select',
      description: 'Choose controls and TEVV requirements',
      icon: <Shield className="w-6 h-6" />,
      status: 'completed',
      actions: [
        { name: 'Resolve control profile (ACC)', completed: true, timestamp: '2025-10-02 14:17' },
        { name: 'Assemble TEVV packs', completed: true, timestamp: '2025-10-02 14:17' },
        { name: 'Map regulatory requirements', completed: true, timestamp: '2025-10-02 14:17' },
        { name: 'Set risk-tier thresholds', completed: true, timestamp: '2025-10-02 14:17' }
      ],
      outputs: [
        'Controls: RAG-01, RAG-02, RAG-03, RAG-04, INT-01, INT-02, AGT-01, AGT-02',
        'TEVV Pack: DEMO_A3_A11_A9_HIGH_V01',
        'Tests: Groundedness, Citation, Retrieval Quality, Tool Policy, Audit',
        'Thresholds: GRD≥0.90, CIT≥0.95, R@5≥0.85, FRS≤3d, TPV≤1/1k, AUD≥0.99'
      ]
    },
    {
      id: 'implement',
      name: '3. Implement',
      description: 'Configure controls and instrumentation',
      icon: <Cog className="w-6 h-6" />,
      status: 'completed',
      actions: [
        { name: 'Configure guardrails', completed: true, timestamp: '2025-10-02 14:20' },
        { name: 'Enable OpenTelemetry spans', completed: true, timestamp: '2025-10-02 14:20' },
        { name: 'Set up audit trails', completed: true, timestamp: '2025-10-02 14:21' },
        { name: 'Configure data minimization', completed: true, timestamp: '2025-10-02 14:21' },
        { name: 'Set tool scopes & policies', completed: true, timestamp: '2025-10-02 14:22' }
      ],
      outputs: [
        'SSO/SCIM enabled',
        'Audit trails configured',
        'Tool registry with scopes defined',
        'OpenTelemetry instrumented',
        'Evidence sinks connected'
      ]
    },
    {
      id: 'assess',
      name: '4. Assess',
      description: 'Execute TEVV tests and collect evidence',
      icon: <TestTube className="w-6 h-6" />,
      status: 'completed',
      actions: [
        { name: 'Run groundedness tests', completed: true, timestamp: '2025-10-02 14:25' },
        { name: 'Run retrieval quality tests', completed: true, timestamp: '2025-10-02 14:26' },
        { name: 'Run tool policy tests', completed: true, timestamp: '2025-10-02 14:27' },
        { name: 'Run audit completeness', completed: true, timestamp: '2025-10-02 14:28' },
        { name: 'Compile evidence pack', completed: true, timestamp: '2025-10-02 14:30' }
      ],
      outputs: [
        'GRD: 0.92 (PASS)',
        'CIT: 0.96 (PASS)',
        'R@5: 0.86 (PASS)',
        'FRS: 2.0 days (PASS)',
        'TPV: 0.5/1000 (PASS)',
        'AUD: 0.995 (PASS)',
        'Evidence: 4 artifact bundles signed'
      ]
    },
    {
      id: 'authorize',
      name: '5. Authorize',
      description: 'Make go/no-go authorization decision',
      icon: <FileCheck className="w-6 h-6" />,
      status: 'completed',
      actions: [
        { name: 'Evaluate authorization rule', completed: true, timestamp: '2025-10-02 14:32' },
        { name: 'Check for blockers', completed: true, timestamp: '2025-10-02 14:32' },
        { name: 'Review exceptions', completed: true, timestamp: '2025-10-02 14:33' },
        { name: 'Sign authorization record', completed: true, timestamp: '2025-10-02 14:35' }
      ],
      outputs: [
        'Decision: AUTHORIZED (HIGH)',
        'All required metrics: PASS',
        'Blockers: None',
        'Valid until: 2026-01-02 (90 days)',
        'Monitoring plan: Activated'
      ]
    },
    {
      id: 'monitor',
      name: '6. Monitor',
      description: 'Continuous monitoring and drift detection',
      icon: <Activity className="w-6 h-6" />,
      status: 'in_progress',
      actions: [
        { name: 'Track retrieval drift', completed: true },
        { name: 'Monitor freshness lag', completed: true },
        { name: 'Watch for incidents', completed: true },
        { name: 'Track metric SLOs', completed: true },
        { name: 'Trigger re-classification', completed: false }
      ],
      outputs: [
        'Retrieval drift: 4.2% (OK)',
        'Freshness lag: 1.8 days (OK)',
        'Incidents: 0',
        'SLO compliance: 100%',
        'Next re-assessment: 2025-11-02'
      ]
    }
  ];

  const getStatusColor = (status: RMFPhase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-500';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-500';
      case 'pending':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-400';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-500';
    }
  };

  const getStatusIcon = (status: RMFPhase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NIST RMF Workflow</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                End-to-end risk management framework execution for GenAI systems
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Application</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Insurance Policy Advisor</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative">
                {index < phases.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -mb-4"></div>
                )}

                <div
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    expandedPhase === phase.id
                      ? getStatusColor(phase.status).replace('bg-', 'border-').split(' ')[0]
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      expandedPhase === phase.id
                        ? getStatusColor(phase.status)
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          expandedPhase === phase.id
                            ? 'bg-white dark:bg-gray-800 shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {phase.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{phase.name}</h3>
                          <p className="text-sm opacity-80">{phase.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(phase.status)}
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            expandedPhase === phase.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedPhase === phase.id && (
                    <div className="border-t border-current opacity-20">
                      <div className="p-6 bg-white dark:bg-gray-800 space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Actions</h4>
                          <div className="space-y-2">
                            {phase.actions.map((action, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  {action.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{action.name}</span>
                                </div>
                                {action.timestamp && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{action.timestamp}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Outputs</h4>
                          <div className="space-y-2">
                            {phase.outputs.map((output, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                              >
                                <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{output}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5/6</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phases Complete</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">20 min</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Duration</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6/6</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Metrics Passing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMFWorkflow;
