import React, { useState, useMemo } from 'react';
import {
  Shield,
  Download,
  CheckCircle,
  TrendingUp,
  BarChart3,
  FileText,
  AlertCircle,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Brain,
  Eye,
  Plus,
  Activity
} from 'lucide-react';
import {
  TrustMatrixRow,
  ApplicationTrustReport,
  createTrustMatrixRow,
  createApplicationTrustReport,
  generateHeatmapData,
  generateTrendData,
  exportTrustMatrix,
  exportTrustReport,
  exportAuditBundle,
  getTrustIndexColor,
  getRiskTierColor,
  getOutcomeColor,
  getHeatmapColor
} from '../utils/trustMatrix';

const TrustMatrix: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'matrix' | 'explainability'>('matrix');
  const [activeExplainTab, setActiveExplainTab] = useState('explanations');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockTestResults = [
    {
      test_case_id: 'TC-001',
      use_case: 'Policy Premium Inquiry',
      risk: 'Hallucination',
      metric: 'Faithfulness Score',
      score: 0.83,
      threshold: 0.8,
      status: 'Pass',
      timestamp: new Date().toISOString()
    },
    {
      test_case_id: 'TC-002',
      use_case: 'Policy Premium Inquiry',
      risk: 'KB Drift',
      metric: 'Freshness Index',
      score: 0.92,
      threshold: 0.9,
      status: 'Pass',
      timestamp: new Date().toISOString()
    },
    {
      test_case_id: 'TC-003',
      use_case: 'Coverage Details',
      risk: 'Hallucination',
      metric: 'Groundedness Score',
      score: 0.91,
      threshold: 0.85,
      status: 'Pass',
      timestamp: new Date().toISOString()
    }
  ];

  const mockEvidencePackages = [
    {
      id: 'evidence-001',
      test_case_id: 'TC-001',
      human_review: { decision: 'Accept', reviewer: 'Jane Doe', notes: 'Approved', timestamp: new Date().toISOString() }
    },
    {
      id: 'evidence-002',
      test_case_id: 'TC-002',
      human_review: { decision: 'Accept', reviewer: 'John Smith', notes: 'Good', timestamp: new Date().toISOString() }
    },
    {
      id: 'evidence-003',
      test_case_id: 'TC-003',
      human_review: { decision: 'Accept', reviewer: 'Jane Doe', notes: 'Excellent', timestamp: new Date().toISOString() }
    }
  ];

  const mockAppInfo = {
    application: 'Insurance Policy Assistant',
    archetype: 'A2-RAG-ENT-PII'
  };

  const explanationMethods = [
    {
      id: 'lime',
      name: 'LIME (Local Interpretable Model-agnostic Explanations)',
      description: 'Explains individual predictions by learning local surrogate models',
      type: 'local',
      status: 'active',
      applications: ['Customer Support Bot', 'Content Generator'],
      lastRun: '2024-01-15T10:30:00Z',
      accuracy: 87,
      interpretability: 92
    },
    {
      id: 'shap',
      name: 'SHAP (SHapley Additive exPlanations)',
      description: 'Unified framework for interpreting model predictions',
      type: 'both',
      status: 'active',
      applications: ['All Applications'],
      lastRun: '2024-01-15T09:45:00Z',
      accuracy: 94,
      interpretability: 89
    },
    {
      id: 'attention',
      name: 'Attention Visualization',
      description: 'Visualizes attention weights in transformer models',
      type: 'local',
      status: 'configured',
      applications: ['Content Generator'],
      lastRun: '2024-01-14T16:20:00Z',
      accuracy: 91,
      interpretability: 95
    }
  ];

  const recentExplanations = [
    {
      id: 'exp_001',
      traceId: 'trace_001',
      application: 'Customer Support Bot',
      prompt: 'How do I reset my password?',
      response: 'To reset your password, please follow these steps...',
      method: 'SHAP',
      timestamp: '2024-01-15T10:30:00Z',
      confidence: 0.89,
      keyFactors: [
        { feature: 'password', importance: 0.45, type: 'positive' },
        { feature: 'reset', importance: 0.32, type: 'positive' },
        { feature: 'account', importance: 0.18, type: 'positive' },
        { feature: 'help', importance: 0.12, type: 'positive' },
        { feature: 'login', importance: 0.08, type: 'positive' }
      ],
      explanation: 'The model focused primarily on password-related terms and help-seeking language to generate appropriate support instructions.'
    }
  ];

  const explainabilityMetrics = [
    {
      name: 'Explanation Methods',
      value: explanationMethods.length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Avg Interpretability',
      value: '92%',
      change: '+3%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Explanations Generated',
      value: '1.2K',
      change: '+15%',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'User Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      color: 'yellow'
    }
  ];

  const [matrixRows, setMatrixRows] = useState<TrustMatrixRow[]>([]);
  const [trustReport, setTrustReport] = useState<ApplicationTrustReport | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [filterRisk, setFilterRisk] = useState<string>('All');
  const [filterMetric, setFilterMetric] = useState<string>('All');
  const [filterOutcome, setFilterOutcome] = useState<string>('All');

  React.useEffect(() => {
    const rows = mockTestResults.map((result, idx) => {
      const evidence = mockEvidencePackages.find(e => e.test_case_id === result.test_case_id);
      return createTrustMatrixRow(result, evidence);
    });

    setMatrixRows(rows);

    const report = createApplicationTrustReport(rows, mockAppInfo.application, mockAppInfo.archetype);
    setTrustReport(report);
  }, []);

  const heatmapData = useMemo(() => generateHeatmapData(matrixRows), [matrixRows]);
  const trendData = useMemo(() => generateTrendData(), []);

  const filteredRows = useMemo(() => {
    return matrixRows.filter(row => {
      if (filterRisk !== 'All' && row.risk !== filterRisk) return false;
      if (filterMetric !== 'All' && row.metric !== filterMetric) return false;
      if (filterOutcome !== 'All' && row.final_outcome !== filterOutcome) return false;
      return true;
    });
  }, [matrixRows, filterRisk, filterMetric, filterOutcome]);

  const uniqueRisks = useMemo(() => Array.from(new Set(matrixRows.map(r => r.risk))), [matrixRows]);
  const uniqueMetrics = useMemo(() => Array.from(new Set(matrixRows.map(r => r.metric))), [matrixRows]);

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const downloadMatrix = () => {
    const data = exportTrustMatrix(matrixRows);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-matrix-${mockAppInfo.archetype}.json`;
    a.click();
  };

  const downloadReport = () => {
    if (!trustReport) return;
    const data = exportTrustReport(trustReport);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-report-${mockAppInfo.archetype}.json`;
    a.click();
  };

  const downloadAuditBundle = () => {
    if (!trustReport) return;
    const data = exportAuditBundle(matrixRows, trustReport, mockEvidencePackages);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-bundle-${mockAppInfo.archetype}.json`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'configured': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'local': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'global': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'both': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 0.3) return 'bg-red-500';
    if (importance >= 0.2) return 'bg-yellow-500';
    if (importance >= 0.1) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  if (!trustReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">Generating Trust Matrix...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Trust Matrix & Evidence
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Unified 360° trust view with explainability evidence and human-in-the-loop validation
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveMainTab('matrix')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeMainTab === 'matrix'
                ? 'text-cyan-600 dark:text-cyan-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Trust Matrix View</span>
            </div>
            {activeMainTab === 'matrix' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveMainTab('explainability')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeMainTab === 'explainability'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Explainability & Evidence</span>
            </div>
            {activeMainTab === 'explainability' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"></div>
            )}
          </button>
        </div>
      </div>

      {/* Trust Matrix Tab */}
      {activeMainTab === 'matrix' && (
        <>
          {/* Trust Gauge & Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Overall Trust Gauge */}
            <div className="md:col-span-2 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-xl border-2 border-cyan-200 dark:border-cyan-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-cyan-900 dark:text-cyan-100 text-lg">Overall Trust Index</h3>
                  <p className="text-sm text-cyan-700 dark:text-cyan-400">{mockAppInfo.application}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${getRiskTierColor(trustReport.risk_tier)}`}>
                  {trustReport.risk_tier} Risk
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(trustReport.overall_trust_index / 100) * 351.86} 351.86`}
                      className={trustReport.overall_trust_index >= 80 ? 'text-green-500' : trustReport.overall_trust_index >= 60 ? 'text-yellow-500' : 'text-red-500'}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getTrustIndexColor(trustReport.overall_trust_index)}`}>
                        {trustReport.overall_trust_index}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">/ 100</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Pass Rate</span>
                    <span className="font-bold text-green-700 dark:text-green-400">{trustReport.pass_rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${trustReport.pass_rate}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Acceptance Rate</span>
                    <span className="font-bold text-blue-700 dark:text-blue-400">{trustReport.acceptance_rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${trustReport.acceptance_rate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Test Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-cyan-600" />
                <span>Test Summary</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Tests</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{trustReport.total_tests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Use Cases</span>
                  <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{trustReport.use_cases.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Archetype</span>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{trustReport.archetype}</span>
                </div>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-cyan-600" />
                <span>Compliance</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${
                    trustReport.compliance_summary.status === 'Compliant'
                      ? 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500'
                      : trustReport.compliance_summary.status === 'Partial'
                      ? 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500'
                      : 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500'
                  }`}>
                    {trustReport.compliance_summary.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>✓ NIST RMF Covered</div>
                  <div>✓ EU AI Act Articles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className={`rounded-xl border-2 p-6 ${
            trustReport.overall_trust_index >= 80
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : trustReport.overall_trust_index >= 60
              ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800'
              : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
                trustReport.overall_trust_index >= 80
                  ? 'text-green-600'
                  : trustReport.overall_trust_index >= 60
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`} />
              <div className="flex-1">
                <h4 className={`font-bold mb-1 ${
                  trustReport.overall_trust_index >= 80
                    ? 'text-green-900 dark:text-green-100'
                    : trustReport.overall_trust_index >= 60
                    ? 'text-yellow-900 dark:text-yellow-100'
                    : 'text-red-900 dark:text-red-100'
                }`}>
                  Deployment Recommendation
                </h4>
                <p className={`text-sm ${
                  trustReport.overall_trust_index >= 80
                    ? 'text-green-700 dark:text-green-300'
                    : trustReport.overall_trust_index >= 60
                    ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {trustReport.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-wrap">
            <button
              onClick={downloadMatrix}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Export Matrix (JSON)</span>
            </button>

            <button
              onClick={downloadReport}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>Export Report (PDF)</span>
            </button>

            <button
              onClick={downloadAuditBundle}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Award className="w-5 h-5" />
              <span>Download Audit Bundle</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3 flex-wrap">
            <select
              value={filterRisk}
              onChange={e => setFilterRisk(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="All">All Risks</option>
              {uniqueRisks.map(risk => (
                <option key={risk} value={risk}>{risk}</option>
              ))}
            </select>

            <select
              value={filterMetric}
              onChange={e => setFilterMetric(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="All">All Metrics</option>
              {uniqueMetrics.map(metric => (
                <option key={metric} value={metric}>{metric}</option>
              ))}
            </select>

            <select
              value={filterOutcome}
              onChange={e => setFilterOutcome(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="All">All Outcomes</option>
              <option value="Trusted">Trusted</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Trust Matrix Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-cyan-600" />
                <span>Unified Trust Matrix ({filteredRows.length} rows)</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Use Case</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Risk</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Metric</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Threshold</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Decision</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Final Outcome</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRows.map(row => (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">{row.use_case}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{row.risk}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{row.metric}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{row.score.toFixed(3)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{row.threshold}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            row.status === 'Pass'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{row.human_decision}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getOutcomeColor(row.final_outcome)}`}>
                            {row.final_outcome}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleRowExpansion(row.id)}
                            className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                          >
                            {expandedRows.has(row.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.has(row.id) && (
                        <tr>
                          <td colSpan={9} className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Test Case ID</div>
                                <div className="font-mono text-cyan-600 dark:text-cyan-400">{row.test_case_id}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Evidence Link</div>
                                <div className="font-mono text-blue-600 dark:text-blue-400 text-xs">{row.evidence_link}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Timestamp</div>
                                <div className="text-gray-600 dark:text-gray-400">{new Date(row.timestamp).toLocaleString()}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Completion Message */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Trust Matrix Complete</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  All stages unified • Trust Index: {trustReport.overall_trust_index} • {trustReport.use_cases.length} use cases validated
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700 dark:text-green-300 mb-1">Generated</div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {new Date(trustReport.generated_date).toLocaleString()}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Explainability & Evidence Tab */}
      {activeMainTab === 'explainability' && (
        <>
          {/* Explainability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {explainabilityMetrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' :
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sub tabs for Explainability */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8 px-6">
                {['explanations', 'methods'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveExplainTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeExplainTab === tab
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanations List */}
            {activeExplainTab === 'explanations' && (
              <div className="p-6">
                <div className="space-y-4">
                  {recentExplanations.map(explanation => (
                    <div key={explanation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-medium rounded">
                              {explanation.method}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{explanation.application}</span>
                          </div>
                          <div className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded mb-2">
                            {explanation.prompt}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Confidence</div>
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{(explanation.confidence * 100).toFixed(0)}%</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Factors</div>
                        <div className="space-y-2">
                          {explanation.keyFactors.map((factor, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{factor.feature}</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{(factor.importance * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${getImportanceColor(factor.importance)}`}
                                    style={{ width: `${factor.importance * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10 p-3 rounded">
                        <Eye className="w-4 h-4 inline mr-2 text-blue-600" />
                        {explanation.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Methods List */}
            {activeExplainTab === 'methods' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {explanationMethods.map(method => (
                    <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{method.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(method.status)}`}>
                          {method.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Type</span>
                          <span className={`px-2 py-1 rounded ${getTypeColor(method.type)}`}>{method.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                          <span className="font-bold text-gray-900 dark:text-white">{method.accuracy}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Interpretability</span>
                          <span className="font-bold text-gray-900 dark:text-white">{method.interpretability}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrustMatrix;
