import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Settings,
  ArrowRight,
  ArrowLeft,
  Database,
  Activity,
  Brain,
  Shield,
  Target,
  Lock,
  Zap,
  FileText,
  Save,
  Filter,
  Calendar,
  RefreshCw,
  Award,
  Gauge,
  Play,
  Upload,
  Plus
} from 'lucide-react';

interface FairnessAssessmentProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const FairnessAssessment: React.FC<FairnessAssessmentProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showRunModal, setShowRunModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedFairnessMetric, setSelectedFairnessMetric] = useState('');
  const [fairnessThreshold, setFairnessThreshold] = useState(0.05);

  // Mock Application Profile from Stage 1
  const applicationProfile = {
    name: 'Healthcare Triage Assistant',
    type: 'LLM+RAG',
    domain: 'Healthcare',
    environment: 'Production',
    businessCriticality: 'Mission Critical',
    euAiActClass: 'High Risk',
    oversightLevel: 'Human-in-the-Loop'
  };

  // Mock input from Step 3: Trust Benchmarking
  const inputFromTrustBenchmarking = {
    benchmarkResults: [
      {
        id: 'BENCH001',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR001',
        riskName: 'Hallucination',
        metricId: 'faithfulness_score',
        metricName: 'Faithfulness Score',
        score: 0.72,
        threshold: 0.80,
        benchmark: 0.85,
        status: 'FAIL',
        benchmarkedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'BENCH002',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR002',
        riskName: 'Medical Accuracy',
        metricId: 'medical_accuracy_score',
        metricName: 'Medical Accuracy Score',
        score: 0.91,
        threshold: 0.85,
        benchmark: 0.88,
        status: 'PASS',
        benchmarkedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'BENCH003',
        useCaseId: 'UC2',
        useCaseName: 'Symptom Documentation',
        riskId: 'RR003',
        riskName: 'Privacy Leakage',
        metricId: 'pii_exposure_rate',
        metricName: 'PII Exposure Rate',
        score: 0.01,
        threshold: 0.02,
        benchmark: 0.015,
        status: 'PASS',
        benchmarkedAt: '2024-01-15T11:00:00Z'
      },
      {
        id: 'BENCH004',
        useCaseId: 'UC3',
        useCaseName: 'Treatment Recommendation',
        riskId: 'RR004',
        riskName: 'Bias/Fairness',
        metricId: 'demographic_parity_gap',
        metricName: 'Demographic Parity Gap',
        score: 0.08,
        threshold: 0.05,
        benchmark: 0.04,
        status: 'FAIL',
        benchmarkedAt: '2024-01-15T11:30:00Z'
      }
    ]
  };

  // Fairness Metrics Library
  const fairnessMetrics = [
    {
      id: 'demographic_parity',
      name: 'Demographic Parity Gap',
      description: 'Measures difference in positive prediction rates across groups',
      formula: '|P(Ŷ=1|A=a) - P(Ŷ=1|A=b)|',
      threshold: 0.05,
      scale: '0.0 - 1.0 (lower is better)',
      category: 'group_fairness',
      applicableRisks: ['bias_fairness', 'discrimination']
    },
    {
      id: 'equalized_odds',
      name: 'Equalized Odds',
      description: 'Measures difference in true positive and false positive rates across groups',
      formula: '|TPR_a - TPR_b| + |FPR_a - FPR_b|',
      threshold: 0.05,
      scale: '0.0 - 1.0 (lower is better)',
      category: 'group_fairness',
      applicableRisks: ['bias_fairness', 'discrimination']
    },
    {
      id: 'predictive_parity',
      name: 'Predictive Parity',
      description: 'Measures difference in positive predictive values across groups',
      formula: '|PPV_a - PPV_b|',
      threshold: 0.05,
      scale: '0.0 - 1.0 (lower is better)',
      category: 'group_fairness',
      applicableRisks: ['bias_fairness']
    },
    {
      id: 'group_accuracy_diff',
      name: 'Group Accuracy Difference',
      description: 'Measures difference in accuracy across demographic groups',
      formula: '|Accuracy_a - Accuracy_b|',
      threshold: 0.03,
      scale: '0.0 - 1.0 (lower is better)',
      category: 'performance_fairness',
      applicableRisks: ['bias_fairness', 'performance_disparity']
    },
    {
      id: 'individual_fairness',
      name: 'Individual Fairness',
      description: 'Similar individuals should receive similar outcomes',
      formula: 'Distance(outcome_i, outcome_j) / Distance(feature_i, feature_j)',
      threshold: 1.2,
      scale: '0.0+ (closer to 1.0 is better)',
      category: 'individual_fairness',
      applicableRisks: ['individual_discrimination']
    }
  ];

  // Dataset Templates by Domain
  const datasetTemplates = {
    'Healthcare': [
      {
        id: 'healthcare_demographics',
        name: 'Healthcare Demographics Dataset',
        description: 'Patient demographics with medical outcomes',
        attributes: ['Gender', 'Age Group', 'Ethnicity', 'Insurance Type', 'Geographic Region'],
        sampleSize: 1000,
        format: 'CSV with demographic columns'
      },
      {
        id: 'medical_fairness',
        name: 'Medical Fairness Test Set',
        description: 'Curated medical scenarios across demographics',
        attributes: ['Gender', 'Age Group', 'Ethnicity', 'Socioeconomic Status'],
        sampleSize: 500,
        format: 'JSON with medical cases'
      }
    ],
    'Financial': [
      {
        id: 'lending_demographics',
        name: 'Fair Lending Dataset',
        description: 'Credit applications across demographic groups',
        attributes: ['Gender', 'Age Group', 'Ethnicity', 'Income Level', 'Geographic Region'],
        sampleSize: 2000,
        format: 'CSV with financial data'
      }
    ],
    'Insurance': [
      {
        id: 'insurance_demographics',
        name: 'Insurance Fairness Dataset',
        description: 'Insurance quotes across customer demographics',
        attributes: ['Gender', 'Age Group', 'Marital Status', 'Location', 'Vehicle Type'],
        sampleSize: 1500,
        format: 'CSV with insurance data'
      }
    ]
  };

  // Fairness Assessment State
  const [fairnessResults, setFairnessResults] = useState<any[]>([
    {
      id: 'FAIR001',
      useCaseId: 'UC3',
      useCaseName: 'Treatment Recommendation',
      riskId: 'RR004',
      riskName: 'Bias/Fairness',
      metricId: 'demographic_parity_gap',
      metricName: 'Demographic Parity Gap',
      threshold: 0.05,
      biasGap: 0.08,
      status: 'FAIL',
      observation: 'Treatment recommendations show bias toward certain demographic groups',
      demographicBreakdown: {
        'Gender': { 'Male': 0.85, 'Female': 0.77, 'gap': 0.08 },
        'Age Group': { '18-35': 0.82, '36-65': 0.80, '65+': 0.78, 'gap': 0.04 },
        'Ethnicity': { 'White': 0.83, 'Hispanic': 0.79, 'Black': 0.76, 'Asian': 0.81, 'gap': 0.07 }
      },
      assessedAt: '2024-01-15T12:00:00Z',
      assessedBy: 'Ethics Review Board',
      dataset: 'Medical Fairness Test Set',
      sampleSize: 500
    }
  ]);

  // Filter to bias/fairness risks from benchmarking
  const biasRisks = inputFromTrustBenchmarking.benchmarkResults.filter(result => 
    result.riskName.toLowerCase().includes('bias') || 
    result.riskName.toLowerCase().includes('fairness') ||
    result.metricId.includes('parity') ||
    result.metricId.includes('fairness')
  );

  const selectedMetricData = biasRisks.find(result => result.id === selectedMetric);
  const selectedFairnessResult = fairnessResults.find(result => result.id === selectedMetric);

  const handleRunFairnessAssessment = () => {
    if (!selectedMetric || !selectedDataset || !selectedFairnessMetric) {
      alert('Please select metric, dataset, and fairness metric before running assessment');
      return;
    }

    // Simulate fairness assessment execution
    const newResult = {
      id: `FAIR${String(fairnessResults.length + 1).padStart(3, '0')}`,
      useCaseId: selectedMetricData?.useCaseId || '',
      useCaseName: selectedMetricData?.useCaseName || '',
      riskId: selectedMetricData?.riskId || '',
      riskName: selectedMetricData?.riskName || '',
      metricId: selectedFairnessMetric,
      metricName: fairnessMetrics.find(m => m.id === selectedFairnessMetric)?.name || '',
      threshold: fairnessThreshold,
      biasGap: Math.random() * 0.15, // Simulated result
      status: Math.random() > 0.5 ? 'PASS' : 'FAIL',
      observation: 'Fairness assessment completed with demographic analysis',
      assessedAt: new Date().toISOString(),
      assessedBy: currentUser?.name || 'Current User',
      dataset: selectedDataset,
      sampleSize: 500
    };

    setFairnessResults(prev => [...prev, newResult]);
    setShowRunModal(false);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const canCreate = canPerformAction ? canPerformAction('Trust Metrics Engine', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Trust Metrics Engine', 'E') : true;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'FAIL': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return <CheckCircle className="w-4 h-4" />;
      case 'WARNING': return <AlertTriangle className="w-4 h-4" />;
      case 'FAIL': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getFairnessCounts = () => {
    return {
      total: fairnessResults.length,
      pass: fairnessResults.filter(r => r.status === 'PASS').length,
      warning: fairnessResults.filter(r => r.status === 'WARNING').length,
      fail: fairnessResults.filter(r => r.status === 'FAIL').length
    };
  };

  const counts = getFairnessCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Fairness Assessment</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>Input to Explainability Engine</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Detect and measure bias, unfair treatment, and ethical risks</p>
        </div>
      </div>

      {/* Application Profile Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Application Profile</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Application:</span>
            <div className="text-blue-900 dark:text-blue-100 font-semibold">{applicationProfile.name}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Type:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.type}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Domain:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.domain}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Environment:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.environment}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Criticality:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.businessCriticality}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">EU AI Act:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.euAiActClass}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Oversight:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.oversightLevel}</div>
          </div>
        </div>
      </div>

      {/* Input from Step 3: Trust Benchmarking */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Input from Trust Benchmarking</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benchmark Results</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Metrics Benchmarked: {inputFromTrustBenchmarking.benchmarkResults.length}</div>
              <div>Bias/Fairness Risks: {biasRisks.length}</div>
              <div>Ready for Fairness Assessment: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status Distribution</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Pass: {inputFromTrustBenchmarking.benchmarkResults.filter(r => r.status === 'PASS').length}</div>
              <div>Fail: {inputFromTrustBenchmarking.benchmarkResults.filter(r => r.status === 'FAIL').length}</div>
              <div>Needs Fairness Check: {biasRisks.length}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bias Risks Identified</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {biasRisks.map(risk => (
                <div key={risk.id}>• {risk.riskName}</div>
              ))}
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Assessment</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Benchmarks complete</div>
              <div>✓ Bias risks identified</div>
              <div>✓ Ready for fairness testing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Bias/Fairness Risks */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Bias/Fairness Risks</span>
            </h3>
            
            <div className="space-y-4">
              {biasRisks.map((risk) => {
                const isSelected = selectedMetric === risk.id;
                const hasAssessment = fairnessResults.some(fr => fr.riskId === risk.riskId);
                
                return (
                  <button
                    key={risk.id}
                    onClick={() => setSelectedMetric(risk.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : hasAssessment
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{risk.riskName}</span>
                      <div className="flex items-center space-x-1">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(risk.status)}`}>
                          {risk.status}
                        </div>
                        {hasAssessment && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Use Case: {risk.useCaseName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Metric: {risk.metricName}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>Score: {risk.score.toFixed(3)}</span>
                      <span>Threshold: {risk.threshold.toFixed(2)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fairness Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Fairness Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 dark:text-green-400">{counts.pass}</div>
                  <div className="text-green-600 dark:text-green-400">Fair</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div className="font-bold text-yellow-600 dark:text-yellow-400">{counts.warning}</div>
                  <div className="text-yellow-600 dark:text-yellow-400">Warning</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="font-bold text-red-600 dark:text-red-400">{counts.fail}</div>
                  <div className="text-red-600 dark:text-red-400">Biased</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Fairness Assessment Results */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedMetric && selectedMetricData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Fairness Assessment: {selectedMetricData.riskName}
                  </h3>
                  <button 
                    onClick={() => setShowRunModal(true)}
                    disabled={!canCreate}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Run Fairness Assessment</span>
                  </button>
                </div>

                {/* Risk Context */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Risk Context</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Use Case</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.useCaseName}</div>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Risk</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.riskName}</div>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Current Score</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.score.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Benchmark Status</span>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedMetricData.status)}`}>
                        {selectedMetricData.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fairness Assessment Results */}
                {selectedFairnessResult ? (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Assessment Results</h4>
                    
                    {/* Overall Status */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedFairnessResult.biasGap.toFixed(3)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Bias Gap</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedFairnessResult.threshold.toFixed(2)}</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">Threshold</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedFairnessResult.sampleSize}</div>
                        <div className="text-sm text-purple-600 dark:text-purple-400">Sample Size</div>
                      </div>
                      <div className={`text-center p-4 rounded-lg ${getStatusColor(selectedFairnessResult.status)}`}>
                        <div className="text-2xl font-bold">{selectedFairnessResult.status}</div>
                        <div className="text-sm">Overall Status</div>
                      </div>
                    </div>

                    {/* Demographic Breakdown */}
                    {selectedFairnessResult.demographicBreakdown && (
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-900 dark:text-white">Demographic Breakdown</h5>
                        {Object.entries(selectedFairnessResult.demographicBreakdown).map(([demographic, data]: [string, any]) => (
                          <div key={demographic} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h6 className="font-medium text-gray-900 dark:text-white mb-3">{demographic}</h6>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {Object.entries(data).filter(([key]) => key !== 'gap').map(([group, score]: [string, any]) => (
                                <div key={group} className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">{score.toFixed(2)}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">{group}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 text-center">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Gap: </span>
                              <span className={`font-bold ${data.gap > selectedFairnessResult.threshold ? 'text-red-600' : 'text-green-600'}`}>
                                {data.gap.toFixed(3)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Observation */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Assessment Observation</h5>
                      <p className="text-sm text-blue-800 dark:text-blue-200">{selectedFairnessResult.observation}</p>
                    </div>

                    {/* Assessment Metadata */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Assessed by: {selectedFairnessResult.assessedBy} • 
                      Dataset: {selectedFairnessResult.dataset} • 
                      {new Date(selectedFairnessResult.assessedAt).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Fairness Assessment Yet</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Run a fairness assessment to detect bias and unfair treatment</p>
                    <button 
                      onClick={() => setShowRunModal(true)}
                      disabled={!canCreate}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Run Assessment</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Bias/Fairness Risk</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a bias or fairness risk from the left panel to run fairness assessment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complete Fairness Assessment Report */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Fairness Assessment Report</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {fairnessResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Fairness Metric</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Bias Gap</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Threshold</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Observation</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {fairnessResults.map((result, index) => (
                  <tr key={result.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.useCaseName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.riskName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.metricName}</td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">
                      {result.biasGap.toFixed(3)}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                      ≤{result.threshold.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        <span>{result.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div className="max-w-xs truncate" title={result.observation}>
                        {result.observation}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Fairness Assessments Yet</h4>
            <p className="text-gray-600 dark:text-gray-400">Select a bias/fairness risk and run assessments to detect unfair treatment</p>
          </div>
        )}
      </div>

      {/* Run Fairness Assessment Modal */}
      {showRunModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Run Fairness Assessment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Detect bias and unfair treatment across demographic groups
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Assessment Context */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Assessment Context</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">Risk</span>
                    <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData?.riskName}</div>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">Use Case</span>
                    <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData?.useCaseName}</div>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">Current Score</span>
                    <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData?.score.toFixed(3)}</div>
                  </div>
                </div>
              </div>

              {/* Dataset Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset Selection</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {datasetTemplates[applicationProfile.domain]?.map((dataset) => (
                    <label
                      key={dataset.id}
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDataset === dataset.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dataset"
                        value={dataset.id}
                        checked={selectedDataset === dataset.id}
                        onChange={(e) => setSelectedDataset(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{dataset.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{dataset.description}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                          {dataset.sampleSize.toLocaleString()} samples • {dataset.format}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {dataset.attributes.map((attr, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {attr}
                            </span>
                          ))}
                        </div>
                      </div>
                    </label>
                  )) || (
                    <div className="col-span-2 text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">No pre-configured datasets for {applicationProfile.domain}</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Upload Custom Dataset
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Fairness Metric Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Fairness Metric</h4>
                
                <div className="space-y-3">
                  {fairnessMetrics.map((metric) => (
                    <label
                      key={metric.id}
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedFairnessMetric === metric.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fairnessMetric"
                        value={metric.id}
                        checked={selectedFairnessMetric === metric.id}
                        onChange={(e) => setSelectedFairnessMetric(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{metric.name}</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {metric.category.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.description}</p>
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs font-mono text-gray-800 dark:text-gray-200 mb-2">
                          {metric.formula}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Scale: {metric.scale} • Default threshold: ≤{metric.threshold}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Threshold Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Threshold Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fairness Threshold
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0.01"
                        max="0.20"
                        step="0.01"
                        value={fairnessThreshold}
                        onChange={(e) => setFairnessThreshold(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                        ≤{fairnessThreshold.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Lower values = stricter fairness requirements
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assessment Type
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>Comprehensive Assessment</option>
                      <option>Quick Bias Check</option>
                      <option>Regulatory Compliance</option>
                      <option>Custom Assessment</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Assessment Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Assessment Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sample Size
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>100 samples</option>
                      <option>500 samples</option>
                      <option>1000 samples</option>
                      <option>Full dataset</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confidence Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>90%</option>
                      <option>95%</option>
                      <option>99%</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statistical Test
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>Chi-square test</option>
                      <option>Fisher's exact test</option>
                      <option>Permutation test</option>
                      <option>Bootstrap test</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Human Review Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Human Review Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ethics Reviewer
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>Ethics Review Board</option>
                      <option>Domain Expert Panel</option>
                      <option>External Ethics Consultant</option>
                      <option>Automated Assessment Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Review Trigger
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>Always require human review</option>
                      <option>Only if bias detected</option>
                      <option>Only if threshold exceeded</option>
                      <option>Automated assessment only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cost and Time Estimation */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Assessment Estimation</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">~15 min</div>
                    <div className="text-gray-600 dark:text-gray-400">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">$2.50</div>
                    <div className="text-gray-600 dark:text-gray-400">Est. Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">500</div>
                    <div className="text-gray-600 dark:text-gray-400">Test Queries</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">5</div>
                    <div className="text-gray-600 dark:text-gray-400">Demographics</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Assessment will analyze bias across demographic groups and generate fairness report
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowRunModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRunFairnessAssessment}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for fairness assessment access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Assessment Report</span>
              </button>
              <button 
                onClick={handleComplete}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Fairness Assessment Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Fairness Report</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Assessments Completed: {fairnessResults.length}</div>
                <div>Fair Rate: {Math.round((counts.pass / counts.total) * 100)}%</div>
                <div>Ready for Explainability Engine</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bias Detection</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Fair: {counts.pass}</div>
                <div>Warning: {counts.warning}</div>
                <div>Biased: {counts.fail}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Step</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Fairness assessment complete</div>
                <div>✓ Ready for Explainability Engine</div>
                <div>✓ Export available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FairnessAssessment;