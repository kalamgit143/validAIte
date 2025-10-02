import React, { useState } from 'react';
import {
  Package,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  Download,
  Eye,
  Settings
} from 'lucide-react';

interface TEVVPack {
  id: string;
  packId: string;
  applicationName: string;
  archetypes: string[];
  modifiers: string[];
  riskTier: string;
  status: 'draft' | 'configured' | 'running' | 'completed' | 'failed';
  controls: string[];
  tests: TestConfig[];
  thresholds: Record<string, string>;
  results?: TestResults;
}

interface TestConfig {
  id: string;
  type: string;
  dataset: string;
  metrics: string[];
  status: 'pending' | 'running' | 'passed' | 'failed';
}

interface TestResults {
  metrics: Record<string, { value: number; threshold: number; passed: boolean }>;
  evidence: string[];
  timestamp: string;
}

const TEVVPackManager: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<TEVVPack | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'execution'>('list');

  const mockPacks: TEVVPack[] = [
    {
      id: '1',
      packId: 'DEMO_A3_A11_A9_HIGH_V01',
      applicationName: 'Insurance Policy Advisor',
      archetypes: ['A3', 'A11', 'A9'],
      modifiers: ['RAG', 'ENT', 'PII'],
      riskTier: 'HIGH',
      status: 'completed',
      controls: ['RAG-01', 'RAG-02', 'RAG-03', 'RAG-04', 'INT-01', 'INT-02', 'AGT-01', 'AGT-02', 'SEC-02', 'DAT-01'],
      tests: [
        { id: 'T-GRD-01', type: 'Groundedness', dataset: 'groundedness_eval', metrics: ['GRD', 'CIT'], status: 'passed' },
        { id: 'T-RTR-01', type: 'Retrieval Quality', dataset: 'groundedness_eval', metrics: ['R@5', 'MRR', 'FRS'], status: 'passed' },
        { id: 'T-AGT-01', type: 'Tool Policy', dataset: 'tool_policy_prompts', metrics: ['TPV'], status: 'passed' },
        { id: 'T-AUD-01', type: 'Audit Completeness', dataset: 'audit_trace_sample', metrics: ['AUD'], status: 'passed' }
      ],
      thresholds: {
        'GRD': '>=0.90',
        'CIT': '>=0.95',
        'R@5': '>=0.85',
        'FRS': '<=3',
        'TPV': '<=1/1000',
        'AUD': '>=0.99'
      },
      results: {
        metrics: {
          'GRD': { value: 0.92, threshold: 0.90, passed: true },
          'CIT': { value: 0.96, threshold: 0.95, passed: true },
          'R@5': { value: 0.86, threshold: 0.85, passed: true },
          'FRS': { value: 2.0, threshold: 3, passed: true },
          'TPV': { value: 0.5, threshold: 1.0, passed: true },
          'AUD': { value: 0.995, threshold: 0.99, passed: true }
        },
        evidence: [
          'prompts_outputs_20250102.json',
          'retriever_topk_traces.csv',
          'citation_links_checksums.json',
          'tool_call_traces.json'
        ],
        timestamp: '2025-10-02T14:30:00Z'
      }
    },
    {
      id: '2',
      packId: 'A5_CODE_MOD_V01',
      applicationName: 'Code Generation Assistant',
      archetypes: ['A5'],
      modifiers: ['CODE'],
      riskTier: 'MODERATE',
      status: 'running',
      controls: ['SEC-03', 'SEC-02', 'MOD-01', 'OBS-01'],
      tests: [
        { id: 'T-VULN-01', type: 'Vulnerability Scan', dataset: 'code_samples', metrics: ['VULN', 'LIC', 'MUT'], status: 'running' }
      ],
      thresholds: {
        'VULN': '<=0.5',
        'LIC': '=0',
        'MUT': '>=0.75'
      }
    },
    {
      id: '3',
      packId: 'A12_HITL_CRIT_V01',
      applicationName: 'Clinical Decision Support',
      archetypes: ['A12'],
      modifiers: ['REG', 'PHI', 'FT'],
      riskTier: 'CRITICAL',
      status: 'configured',
      controls: ['GOV-02', 'EXPL-01', 'EXPL-02', 'AUT-02', 'FAI-01', 'FAI-02'],
      tests: [
        { id: 'T-HAR-01', type: 'Harmful Advice', dataset: 'clinical_scenarios', metrics: ['HAR', 'CAL-ECE', 'PAR'], status: 'pending' }
      ],
      thresholds: {
        'HAR': '=0',
        'CAL-ECE': '<=0.03',
        'PAR': '<=2pp'
      }
    }
  ];

  const controlFamilies: Record<string, string> = {
    'GOV': 'Governance',
    'DAT': 'Data & Privacy',
    'MOD': 'Model Governance',
    'SEC': 'Security',
    'SAF': 'Safety',
    'FAI': 'Fairness',
    'EXPL': 'Explainability',
    'OBS': 'Observability',
    'REL': 'Reliability',
    'RAG': 'Retrieval',
    'SCH': 'Structure',
    'AGT': 'Agent/Tool',
    'AUT': 'Autonomy',
    'INT': 'Integration',
    'MON': 'Monitoring'
  };

  const metricDefinitions: Record<string, { name: string; unit: string; higherIsBetter: boolean }> = {
    'GRD': { name: 'Groundedness', unit: 'score', higherIsBetter: true },
    'CIT': { name: 'Citation Accuracy', unit: 'score', higherIsBetter: true },
    'R@5': { name: 'Recall@5', unit: 'score', higherIsBetter: true },
    'MRR': { name: 'Mean Reciprocal Rank', unit: 'score', higherIsBetter: true },
    'FRS': { name: 'Freshness Lag', unit: 'days', higherIsBetter: false },
    'TPV': { name: 'Tool Policy Violations', unit: '/1000', higherIsBetter: false },
    'AUD': { name: 'Audit Completeness', unit: 'score', higherIsBetter: true },
    'VULN': { name: 'Vulnerability Density', unit: '/KLOC', higherIsBetter: false },
    'LIC': { name: 'License Violations', unit: 'count', higherIsBetter: false },
    'MUT': { name: 'Mutation Score', unit: 'score', higherIsBetter: true },
    'HAR': { name: 'Harmful Advice Rate', unit: '/1000', higherIsBetter: false },
    'CAL-ECE': { name: 'Calibration Error', unit: 'ECE', higherIsBetter: false },
    'PAR': { name: 'Parity Gap', unit: 'pp', higherIsBetter: false }
  };

  const riskColors: Record<string, string> = {
    'LOW': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
    'MODERATE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    'HIGH': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    'CRITICAL': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800'
  };

  const statusIcons: Record<string, JSX.Element> = {
    'draft': <Settings className="w-5 h-5 text-gray-500" />,
    'configured': <CheckCircle className="w-5 h-5 text-blue-600" />,
    'running': <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />,
    'completed': <CheckCircle className="w-5 h-5 text-green-600" />,
    'failed': <XCircle className="w-5 h-5 text-red-600" />
  };

  const renderPackList = () => (
    <div className="space-y-4">
      {mockPacks.map(pack => (
        <div
          key={pack.id}
          onClick={() => {
            setSelectedPack(pack);
            setViewMode('detail');
          }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pack.applicationName}</h3>
                {statusIcons[pack.status]}
                <span className="text-xs text-gray-500 dark:text-gray-400">{pack.packId}</span>
              </div>

              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  {pack.archetypes.map(arch => (
                    <span key={arch} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded text-xs font-medium">
                      {arch}
                    </span>
                  ))}
                </div>

                {pack.modifiers.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {pack.modifiers.map(mod => (
                      <span key={mod} className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded text-xs">
                        {mod}
                      </span>
                    ))}
                  </div>
                )}

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${riskColors[pack.riskTier]}`}>
                  {pack.riskTier}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>{pack.controls.length} Controls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>{pack.tests.length} Tests</span>
                </div>
                {pack.results && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{Object.values(pack.results.metrics).filter(m => m.passed).length}/{Object.keys(pack.results.metrics).length} Passed</span>
                  </div>
                )}
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              {pack.status === 'completed' ? <Eye className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{pack.status === 'completed' ? 'View Results' : 'Run Pack'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPackDetail = () => {
    if (!selectedPack) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setViewMode('list');
              setSelectedPack(null);
            }}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            ← Back to Packs
          </button>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Config</span>
            </button>
            {selectedPack.status !== 'completed' && (
              <button
                onClick={() => setViewMode('execution')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Execute Tests</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPack.applicationName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedPack.packId}</p>
          <div className="flex items-center space-x-3 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[selectedPack.riskTier]}`}>
              {selectedPack.riskTier} Risk
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Status: <span className="font-medium capitalize">{selectedPack.status}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Required Controls</h3>
            <div className="space-y-3">
              {selectedPack.controls.map(control => {
                const family = control.split('-')[0];
                return (
                  <div key={control} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{control}</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{controlFamilies[family]}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Configuration</h3>
            <div className="space-y-3">
              {selectedPack.tests.map(test => (
                <div key={test.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{test.id}</span>
                    {test.status === 'passed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {test.status === 'running' && <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />}
                    {test.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                    {test.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{test.type}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {test.metrics.map(metric => (
                      <span key={metric} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded text-xs">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thresholds ({selectedPack.riskTier} Risk Tier)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(selectedPack.thresholds).map(([metric, threshold]) => (
              <div key={metric} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">{metricDefinitions[metric]?.name || metric}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{threshold}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedPack.results && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Test Results</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(selectedPack.results.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(selectedPack.results.metrics).map(([metric, result]) => (
                <div key={metric} className={`p-4 rounded-lg border-2 ${result.passed ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metricDefinitions[metric]?.name || metric}</span>
                    {result.passed ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{result.value}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{metricDefinitions[metric]?.unit}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Threshold: {selectedPack.thresholds[metric]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderExecution = () => {
    if (!selectedPack) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('detail')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            ← Back to Pack Details
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Test Execution Progress</h3>

          <div className="space-y-4">
            {selectedPack.tests.map((test, idx) => (
              <div key={test.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      test.status === 'passed' ? 'bg-green-100 dark:bg-green-900/20' :
                      test.status === 'running' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      test.status === 'failed' ? 'bg-red-100 dark:bg-red-900/20' :
                      'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      {test.status === 'passed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {test.status === 'running' && <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />}
                      {test.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                      {test.status === 'pending' && <span className="text-gray-500 font-medium">{idx + 1}</span>}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{test.type}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{test.id} • Dataset: {test.dataset}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">{test.status}</span>
                </div>

                {test.status === 'running' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Running evaluators...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TEVV Pack Manager</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                NIST RMF Steps 2-4: Select → Implement → Assess
              </p>
            </div>
            <Package className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="p-6">
          {viewMode === 'list' && renderPackList()}
          {viewMode === 'detail' && renderPackDetail()}
          {viewMode === 'execution' && renderExecution()}
        </div>
      </div>
    </div>
  );
};

export default TEVVPackManager;
