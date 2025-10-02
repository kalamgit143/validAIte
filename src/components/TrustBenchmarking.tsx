import React, { useState } from 'react';
import { 
  Target, 
  BarChart3, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Settings,
  ArrowRight,
  ArrowLeft,
  Database,
  Activity,
  Brain,
  Shield,
  Users,
  Lock,
  Zap,
  FileText,
  Save,
  Filter,
  Calendar,
  RefreshCw,
  Award,
  Gauge
} from 'lucide-react';

interface TrustBenchmarkingProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const TrustBenchmarking: React.FC<TrustBenchmarkingProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [benchmarkType, setBenchmarkType] = useState('industry');

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

  // Mock input from Step 2: Trust Evaluations
  const inputFromTrustEvaluations = {
    evaluationResults: [
      {
        id: 'EVAL001',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR001',
        riskName: 'Hallucination',
        metricId: 'faithfulness_score',
        metricName: 'Faithfulness Score',
        threshold: 0.80,
        benchmarkSource: 'Industry Standard',
        rawScore: 0.72,
        evaluatedAt: '2024-01-15T10:00:00Z',
        dataset: 'Medical Golden Dataset v2.1',
        sampleSize: 500,
        evaluationMethod: 'Automated Grounding Check'
      },
      {
        id: 'EVAL002',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR002',
        riskName: 'Medical Accuracy',
        metricId: 'medical_accuracy_score',
        metricName: 'Medical Accuracy Score',
        threshold: 0.85,
        benchmarkSource: 'Regulatory Standard',
        rawScore: 0.91,
        evaluatedAt: '2024-01-15T10:30:00Z',
        dataset: 'Clinical Validation Set v1.5',
        sampleSize: 300,
        evaluationMethod: 'Expert Validation'
      },
      {
        id: 'EVAL003',
        useCaseId: 'UC2',
        useCaseName: 'Symptom Documentation',
        riskId: 'RR003',
        riskName: 'Privacy Leakage',
        metricId: 'pii_exposure_rate',
        metricName: 'PII Exposure Rate',
        threshold: 0.02,
        benchmarkSource: 'Org Standard',
        rawScore: 0.01,
        evaluatedAt: '2024-01-15T11:00:00Z',
        dataset: 'Privacy Test Cases v1.0',
        sampleSize: 200,
        evaluationMethod: 'Automated PII Detection'
      },
      {
        id: 'EVAL004',
        useCaseId: 'UC3',
        useCaseName: 'Treatment Recommendation',
        riskId: 'RR004',
        riskName: 'Bias/Fairness',
        metricId: 'demographic_parity_gap',
        metricName: 'Demographic Parity Gap',
        threshold: 0.05,
        benchmarkSource: 'Industry Standard',
        rawScore: 0.08,
        evaluatedAt: '2024-01-15T11:30:00Z',
        dataset: 'Fairness Test Set v2.0',
        sampleSize: 400,
        evaluationMethod: 'Demographic Analysis'
      }
    ]
  };

  // Industry/Org Benchmarks Database
  const benchmarkDatabase = {
    industry: {
      'Healthcare': {
        'faithfulness_score': { value: 0.85, source: 'Healthcare AI Consortium 2024' },
        'medical_accuracy_score': { value: 0.88, source: 'Medical AI Standards Board' },
        'pii_exposure_rate': { value: 0.015, source: 'Healthcare Privacy Alliance' },
        'demographic_parity_gap': { value: 0.04, source: 'Fair Healthcare AI Initiative' }
      },
      'Financial Services': {
        'faithfulness_score': { value: 0.82, source: 'FinTech AI Standards 2024' },
        'bias_score': { value: 0.03, source: 'Fair Lending Consortium' }
      }
    },
    organizational: {
      'faithfulness_score': { value: 0.83, source: 'QUALIZEAL Internal Standard' },
      'medical_accuracy_score': { value: 0.90, source: 'QUALIZEAL Medical AI Policy' },
      'pii_exposure_rate': { value: 0.01, source: 'QUALIZEAL Privacy Standard' },
      'demographic_parity_gap': { value: 0.03, source: 'QUALIZEAL Fairness Policy' }
    },
    regulatory: {
      'medical_accuracy_score': { value: 0.95, source: 'FDA AI/ML Guidance' },
      'pii_exposure_rate': { value: 0.005, source: 'HIPAA Privacy Rule' },
      'demographic_parity_gap': { value: 0.02, source: 'EU AI Act Fairness Requirements' }
    }
  };

  // Benchmarking State
  const [benchmarkingResults, setBenchmarkingResults] = useState(() => {
    return inputFromTrustEvaluations.evaluationResults.map(eval => {
      const benchmark = getBenchmarkValue(eval.metricId, eval.benchmarkSource);
      const status = getBenchmarkStatus(eval.rawScore, eval.threshold, benchmark, eval.metricId);
      
      return {
        ...eval,
        benchmark: benchmark,
        status: status,
        benchmarkedAt: new Date().toISOString(),
        benchmarkedBy: currentUser?.name || 'System'
      };
    });
  });

  function getBenchmarkValue(metricId: string, benchmarkSource: string) {
    const domain = applicationProfile.domain;
    
    if (benchmarkSource === 'Industry Standard') {
      return benchmarkDatabase.industry[domain]?.[metricId]?.value || 0.8;
    } else if (benchmarkSource === 'Org Standard') {
      return benchmarkDatabase.organizational[metricId]?.value || 0.8;
    } else if (benchmarkSource === 'Regulatory Standard') {
      return benchmarkDatabase.regulatory[metricId]?.value || 0.9;
    }
    return 0.8; // Default
  }

  function getBenchmarkStatus(score: number, threshold: number, benchmark: number, metricId: string) {
    const isInverse = metricId.includes('exposure') || metricId.includes('gap') || metricId.includes('error');
    
    if (isInverse) {
      // Lower is better (e.g., PII exposure, bias gap)
      if (score <= threshold && score <= benchmark) return 'PASS';
      if (score <= Math.max(threshold, benchmark) * 1.2) return 'WARNING';
      return 'FAIL';
    } else {
      // Higher is better (e.g., faithfulness, accuracy)
      if (score >= threshold && score >= benchmark) return 'PASS';
      if (score >= Math.min(threshold, benchmark) * 0.9) return 'WARNING';
      return 'FAIL';
    }
  }

  const selectedMetricData = benchmarkingResults.find(result => result.id === selectedMetric);

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

  const getBenchmarkCounts = () => {
    return {
      total: benchmarkingResults.length,
      pass: benchmarkingResults.filter(r => r.status === 'PASS').length,
      warning: benchmarkingResults.filter(r => r.status === 'WARNING').length,
      fail: benchmarkingResults.filter(r => r.status === 'FAIL').length
    };
  };

  const counts = getBenchmarkCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trust Benchmarking</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>Input to Fairness Assessment</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Compare evaluation results against thresholds and industry benchmarks</p>
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

      {/* Input from Step 2: Trust Evaluations */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Input from Trust Evaluations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluation Results</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Metrics Evaluated: {inputFromTrustEvaluations.evaluationResults.length}</div>
              <div>Total Samples: {inputFromTrustEvaluations.evaluationResults.reduce((sum, r) => sum + r.sampleSize, 0)}</div>
              <div>Ready for Benchmarking: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Raw Scores</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Faithfulness: 0.72</div>
              <div>Medical Accuracy: 0.91</div>
              <div>PII Exposure: 0.01</div>
              <div>Bias Gap: 0.08</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Thresholds</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Faithfulness: ≥0.80</div>
              <div>Medical Accuracy: ≥0.85</div>
              <div>PII Exposure: ≤0.02</div>
              <div>Bias Gap: ≤0.05</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Benchmarking</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Scores collected</div>
              <div>✓ Thresholds defined</div>
              <div>✓ Ready for comparison</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benchmark Selection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              id: 'industry', 
              name: 'Industry Standard', 
              description: 'Compare against healthcare AI industry averages',
              icon: Building,
              color: 'blue'
            },
            { 
              id: 'organizational', 
              name: 'Organizational Standard', 
              description: 'Compare against QUALIZEAL internal baselines',
              icon: Target,
              color: 'purple'
            },
            { 
              id: 'regulatory', 
              name: 'Regulatory Standard', 
              description: 'Compare against FDA/EU regulatory requirements',
              icon: Shield,
              color: 'red'
            }
          ].map(benchmark => {
            const Icon = benchmark.icon;
            return (
              <button
                key={benchmark.id}
                onClick={() => setBenchmarkType(benchmark.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  benchmarkType === benchmark.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className={`w-6 h-6 text-${benchmark.color}-600 dark:text-${benchmark.color}-400`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">{benchmark.name}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benchmark.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Evaluation Results */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Evaluation Results</span>
            </h3>
            
            <div className="space-y-4">
              {inputFromTrustEvaluations.evaluationResults.map((result) => {
                const benchmarkResult = benchmarkingResults.find(br => br.id === result.id);
                const isSelected = selectedMetric === result.id;
                
                return (
                  <button
                    key={result.id}
                    onClick={() => setSelectedMetric(result.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{result.metricName}</span>
                      {benchmarkResult && (
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(benchmarkResult.status)}`}>
                          {getStatusIcon(benchmarkResult.status)}
                          <span>{benchmarkResult.status}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Use Case: {result.useCaseName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Risk: {result.riskName}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>Score: {result.rawScore.toFixed(3)}</span>
                      <span>Threshold: {result.threshold.toFixed(2)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Benchmark Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Benchmark Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 dark:text-green-400">{counts.pass}</div>
                  <div className="text-green-600 dark:text-green-400">Pass</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div className="font-bold text-yellow-600 dark:text-yellow-400">{counts.warning}</div>
                  <div className="text-yellow-600 dark:text-yellow-400">Warning</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="font-bold text-red-600 dark:text-red-400">{counts.fail}</div>
                  <div className="text-red-600 dark:text-red-400">Fail</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Benchmark Comparison */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedMetric && selectedMetricData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Benchmark Analysis: {selectedMetricData.metricName}
                  </h3>
                  <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getStatusColor(selectedMetricData.status)}`}>
                    {selectedMetricData.status}
                  </div>
                </div>

                {/* Metric Context */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Evaluation Context</h4>
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
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Dataset</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.dataset}</div>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Sample Size</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.sampleSize}</div>
                    </div>
                  </div>
                </div>

                {/* Benchmark Comparison Visualization */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Benchmark Comparison</h4>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Performance Comparison</span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {selectedMetricData.metricId.includes('exposure') || selectedMetricData.metricId.includes('gap') ? 'Lower is Better' : 'Higher is Better'}
                      </span>
                    </div>
                    
                    {/* Visual Bar Chart */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Score:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4 relative">
                          <div 
                            className={`h-4 rounded-full ${
                              selectedMetricData.status === 'PASS' ? 'bg-green-500' :
                              selectedMetricData.status === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(selectedMetricData.rawScore * 100, 100)}%` }}
                          />
                          <span className="absolute right-2 top-0 text-xs text-white font-medium leading-4">
                            {selectedMetricData.rawScore.toFixed(3)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Threshold:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 relative">
                          <div 
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${Math.min(selectedMetricData.threshold * 100, 100)}%` }}
                          />
                          <span className="absolute right-2 -top-1 text-xs text-gray-600 dark:text-gray-400">
                            {selectedMetricData.threshold.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Benchmark:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 relative">
                          <div 
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: `${Math.min(selectedMetricData.benchmark * 100, 100)}%` }}
                          />
                          <span className="absolute right-2 -top-1 text-xs text-gray-600 dark:text-gray-400">
                            {selectedMetricData.benchmark.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMetricData.rawScore.toFixed(3)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Actual Score</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedMetricData.threshold.toFixed(2)}</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Threshold</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedMetricData.benchmark.toFixed(2)}</div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">{benchmarkType.replace('_', ' ')} Benchmark</div>
                    </div>
                  </div>

                  {/* Benchmark Source Information */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Benchmark Source</h5>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      {(() => {
                        const domain = applicationProfile.domain;
                        const metricId = selectedMetricData.metricId;
                        
                        if (benchmarkType === 'industry') {
                          return benchmarkDatabase.industry[domain]?.[metricId]?.source || 'Industry Standard Database';
                        } else if (benchmarkType === 'organizational') {
                          return benchmarkDatabase.organizational[metricId]?.source || 'QUALIZEAL Internal Standard';
                        } else if (benchmarkType === 'regulatory') {
                          return benchmarkDatabase.regulatory[metricId]?.source || 'Regulatory Requirement';
                        }
                        return 'Standard Benchmark';
                      })()}
                    </div>
                  </div>

                  {/* Gap Analysis */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 dark:text-white">Gap Analysis</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Gap vs Threshold</div>
                        <div className={`text-lg font-bold ${
                          selectedMetricData.rawScore >= selectedMetricData.threshold ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedMetricData.metricId.includes('exposure') || selectedMetricData.metricId.includes('gap') 
                            ? (selectedMetricData.threshold - selectedMetricData.rawScore).toFixed(3)
                            : (selectedMetricData.rawScore - selectedMetricData.threshold).toFixed(3)
                          }
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Gap vs Benchmark</div>
                        <div className={`text-lg font-bold ${
                          selectedMetricData.rawScore >= selectedMetricData.benchmark ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedMetricData.metricId.includes('exposure') || selectedMetricData.metricId.includes('gap')
                            ? (selectedMetricData.benchmark - selectedMetricData.rawScore).toFixed(3)
                            : (selectedMetricData.rawScore - selectedMetricData.benchmark).toFixed(3)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Gauge className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Metric</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose an evaluation result from the left panel to view benchmark analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Threshold & Benchmark Comparison Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Benchmark Report</h3>
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Metric</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Score</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Threshold</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Benchmark</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {benchmarkingResults.map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.useCaseName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.riskName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.metricName}</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">
                    {result.rawScore.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                    {result.threshold.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                    {result.benchmark.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                      <span>{result.status}</span>
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
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for benchmarking access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Benchmark Report</span>
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
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Trust Benchmarking Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benchmark Report</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Metrics Benchmarked: {benchmarkingResults.length}</div>
                <div>Pass Rate: {Math.round((counts.pass / counts.total) * 100)}%</div>
                <div>Ready for Fairness Assessment</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status Distribution</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Pass: {counts.pass}</div>
                <div>Warning: {counts.warning}</div>
                <div>Fail: {counts.fail}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Step</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Benchmarking complete</div>
                <div>✓ Ready for Fairness Assessment</div>
                <div>✓ Export available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustBenchmarking;