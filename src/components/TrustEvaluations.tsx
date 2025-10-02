import React, { useState } from 'react';
import { 
  Target, 
  Play, 
  CheckCircle, 
  XCircle,
  Clock,
  Brain,
  Database,
  Activity,
  Settings,
  Eye,
  Download,
  Plus,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  BarChart3,
  FileText,
  Zap,
  Users,
  Shield,
  ArrowRight,
  ArrowLeft,
  Save,
  Upload,
  Calendar,
  TrendingUp,
  TrendingDown,
  Layers,
  Code,
  Globe,
  Lock,
  Heart,
  Scale
} from 'lucide-react';

interface TrustEvaluationsProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const TrustEvaluations: React.FC<TrustEvaluationsProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showRunModal, setShowRunModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<any[]>([]);
  const [isComplete, setIsComplete] = useState(false);

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

  // Mock input from Step 1 (Trust Metrics Engine)
  const inputFromStep1 = {
    metricRegistry: [
      {
        id: 'TM001',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR001',
        riskName: 'Hallucination',
        metricName: 'Faithfulness Score',
        threshold: 0.80,
        benchmarkSource: 'Industry Standard',
        owner: 'QA Engineer',
        evaluationMethod: 'Ground truth comparison',
        scale: '0.0-1.0'
      },
      {
        id: 'TM002',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR002',
        riskName: 'Grounding Gap',
        metricName: 'Medical Accuracy Score',
        threshold: 0.85,
        benchmarkSource: 'Regulatory Standard',
        owner: 'Domain Expert',
        evaluationMethod: 'Expert validation',
        scale: '0.0-1.0'
      },
      {
        id: 'TM003',
        useCaseId: 'UC2',
        useCaseName: 'Symptom Documentation',
        riskId: 'RR003',
        riskName: 'Privacy Leakage',
        metricName: 'PII Detection Rate',
        threshold: 0.95,
        benchmarkSource: 'Regulatory Standard',
        owner: 'SecOps Engineer',
        evaluationMethod: 'Automated PII scanning',
        scale: '0.0-1.0'
      },
      {
        id: 'TM004',
        useCaseId: 'UC3',
        useCaseName: 'Treatment Recommendation',
        riskId: 'RR004',
        riskName: 'Bias/Fairness',
        metricName: 'Demographic Parity Gap',
        threshold: 0.05,
        benchmarkSource: 'Industry Standard',
        owner: 'Domain Reviewer',
        evaluationMethod: 'Demographic analysis',
        scale: '0.0-1.0'
      }
    ]
  };

  const availableDatasets = [
    {
      id: 'ds_golden_001',
      name: 'Healthcare Golden Dataset v2.1',
      type: 'golden',
      description: 'Expert-validated medical Q&A pairs with ground truth',
      samples: 1000,
      lastUpdated: '2024-01-15T10:00:00Z',
      quality: 98,
      coverage: ['Emergency Triage', 'Symptom Assessment', 'Treatment Guidance']
    },
    {
      id: 'ds_synthetic_001',
      name: 'Synthetic Medical Queries v1.3',
      type: 'synthetic',
      description: 'AI-generated test queries covering edge cases',
      samples: 2500,
      lastUpdated: '2024-01-14T16:00:00Z',
      quality: 85,
      coverage: ['Edge Cases', 'Adversarial Prompts', 'Boundary Conditions']
    },
    {
      id: 'ds_historical_001',
      name: 'Production Chat Logs (Last 30 Days)',
      type: 'historical',
      description: 'Real user interactions from production environment',
      samples: 5000,
      lastUpdated: '2024-01-15T08:00:00Z',
      quality: 92,
      coverage: ['Real User Queries', 'Production Patterns', 'User Behavior']
    },
    {
      id: 'ds_adversarial_001',
      name: 'Medical Adversarial Test Set',
      type: 'adversarial',
      description: 'Challenging prompts designed to test robustness',
      samples: 500,
      lastUpdated: '2024-01-13T14:00:00Z',
      quality: 95,
      coverage: ['Prompt Injection', 'Jailbreak Attempts', 'Bias Probes']
    }
  ];

  const [evaluationConfig, setEvaluationConfig] = useState({
    selectedDatasets: [] as string[],
    queryCount: 100,
    evaluationMode: 'online',
    batchSize: 10,
    timeout: 30,
    retryCount: 3
  });

  const selectedMetricData = inputFromStep1.metricRegistry.find(m => m.id === selectedMetric);

  const handleRunEvaluation = async () => {
    if (!selectedMetric || evaluationConfig.selectedDatasets.length === 0) {
      alert('Please select a metric and at least one dataset');
      return;
    }

    setIsRunning(true);
    setShowRunModal(false);

    // Simulate evaluation run
    setTimeout(() => {
      const mockResult = {
        id: `eval_${Date.now()}`,
        metricId: selectedMetric,
        metricName: selectedMetricData?.metricName || '',
        useCaseName: selectedMetricData?.useCaseName || '',
        riskName: selectedMetricData?.riskName || '',
        threshold: selectedMetricData?.threshold || 0,
        datasets: evaluationConfig.selectedDatasets,
        queryCount: evaluationConfig.queryCount,
        score: Math.random() * 0.4 + 0.6, // Random score between 0.6-1.0
        status: 'completed',
        executedAt: new Date().toISOString(),
        duration: '2m 45s',
        details: {
          totalQueries: evaluationConfig.queryCount,
          successfulQueries: Math.floor(evaluationConfig.queryCount * 0.95),
          failedQueries: Math.floor(evaluationConfig.queryCount * 0.05),
          avgResponseTime: '1.2s',
          cost: '$12.45'
        }
      };

      setEvaluationResults(prev => [...prev, mockResult]);
      setIsRunning(false);
    }, 3000);
  };

  const handleComplete = () => {
    if (evaluationResults.length === 0) {
      alert('Please run evaluations for at least one metric before proceeding');
      return;
    }
    setIsComplete(true);
  };

  const canRun = canPerformAction ? canPerformAction('Trust Metrics Engine', 'R') : true;
  const canCreate = canPerformAction ? canPerformAction('Trust Metrics Engine', 'C') : true;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'running': return <Play className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDatasetTypeColor = (type: string) => {
    switch (type) {
      case 'golden': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'synthetic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'historical': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'adversarial': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getScoreColor = (score: number, threshold: number) => {
    if (score >= threshold) return 'text-green-600 dark:text-green-400';
    if (score >= threshold * 0.8) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPassFailStatus = (score: number, threshold: number) => {
    return score >= threshold ? 'PASS' : 'FAIL';
  };

  const getPassFailColor = (score: number, threshold: number) => {
    return score >= threshold 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trust Evaluations</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Measure Trust Metrics</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Run controlled tests to measure trust metrics against your GenAI application</p>
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

      {/* Input from Step 1 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Input from Step 1: Trust Metrics Engine</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metric Registry</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Use Cases: {new Set(inputFromStep1.metricRegistry.map(m => m.useCaseId)).size}</div>
              <div>Risks Mapped: {inputFromStep1.metricRegistry.length}</div>
              <div>Metrics Defined: {new Set(inputFromStep1.metricRegistry.map(m => m.metricName)).size}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Trust Thresholds</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Faithfulness: ≥{inputFromStep1.metricRegistry.find(m => m.metricName === 'Faithfulness Score')?.threshold}</div>
              <div>Medical Accuracy: ≥{inputFromStep1.metricRegistry.find(m => m.metricName === 'Medical Accuracy Score')?.threshold}</div>
              <div>PII Detection: ≥{inputFromStep1.metricRegistry.find(m => m.metricName === 'PII Detection Rate')?.threshold}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benchmark Sources</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Industry: {inputFromStep1.metricRegistry.filter(m => m.benchmarkSource === 'Industry Standard').length}</div>
              <div>Regulatory: {inputFromStep1.metricRegistry.filter(m => m.benchmarkSource === 'Regulatory Standard').length}</div>
              <div>Custom: {inputFromStep1.metricRegistry.filter(m => m.benchmarkSource === 'Custom').length}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Evaluation</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Metrics mapped</div>
              <div>✓ Thresholds set</div>
              <div>✓ Ready to test</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Metric Registry */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <span>Metric Registry</span>
            </h3>
            
            <div className="space-y-4">
              {/* Group by use case */}
              {Array.from(new Set(inputFromStep1.metricRegistry.map(m => m.useCaseId))).map(useCaseId => {
                const useCaseMetrics = inputFromStep1.metricRegistry.filter(m => m.useCaseId === useCaseId);
                const useCaseName = useCaseMetrics[0]?.useCaseName;
                
                return (
                  <div key={useCaseId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">{useCaseName}</h4>
                    <div className="space-y-2">
                      {useCaseMetrics.map((metric) => {
                        const isSelected = selectedMetric === metric.id;
                        const hasResults = evaluationResults.some(r => r.metricId === metric.id);
                        
                        return (
                          <button
                            key={metric.id}
                            onClick={() => setSelectedMetric(metric.id)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                : hasResults
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{metric.riskName}</span>
                              <div className="flex items-center space-x-1">
                                {hasResults && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              Metric: {metric.metricName}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {metric.id} • Threshold: ≥{metric.threshold} • {metric.benchmarkSource}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evaluation Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Evaluation Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{inputFromStep1.metricRegistry.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total Metrics</div>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 dark:text-green-400">{evaluationResults.length}</div>
                  <div className="text-green-600 dark:text-green-400">Evaluated</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {evaluationResults.filter(r => r.score >= r.threshold).length}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">Passed</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="font-bold text-red-600 dark:text-red-400">
                    {evaluationResults.filter(r => r.score < r.threshold).length}
                  </div>
                  <div className="text-red-600 dark:text-red-400">Failed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Evaluation Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedMetric && selectedMetricData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Evaluate: {selectedMetricData.metricName}
                  </h3>
                  <button 
                    onClick={() => setShowRunModal(true)}
                    disabled={!canRun}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Run Evaluation</span>
                  </button>
                </div>

                {/* Metric Context */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Metric Context</h4>
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
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Threshold</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">≥{selectedMetricData.threshold}</div>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Benchmark</span>
                      <div className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.benchmarkSource}</div>
                    </div>
                  </div>
                  <div className="text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>Evaluation Method:</strong> {selectedMetricData.evaluationMethod} • 
                    <strong> Scale:</strong> {selectedMetricData.scale} • 
                    <strong> Owner:</strong> {selectedMetricData.owner}
                  </div>
                </div>

                {/* Dataset Selection */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Available Datasets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableDatasets.map((dataset) => (
                      <div key={dataset.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{dataset.name}</span>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getDatasetTypeColor(dataset.type)}`}>
                                {dataset.type}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{dataset.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                              <span>{dataset.samples.toLocaleString()} samples</span>
                              <span>Quality: {dataset.quality}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {dataset.coverage.map((coverage, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                              {coverage}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Evaluation Results */}
                {evaluationResults.filter(r => r.metricId === selectedMetric).length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Previous Evaluation Results</h4>
                    {evaluationResults.filter(r => r.metricId === selectedMetric).map((result) => (
                      <div key={result.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {getStatusIcon(result.status)}
                              <span className="capitalize">{result.status}</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{result.metricName}</span>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getPassFailColor(result.score, result.threshold)}`}>
                              {getPassFailStatus(result.score, result.threshold)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(result.score, result.threshold)}`}>
                              {result.score.toFixed(3)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Threshold: ≥{result.threshold}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Queries</span>
                            <div className="font-medium text-gray-900 dark:text-white">{result.details.totalQueries}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Success Rate</span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {Math.round((result.details.successfulQueries / result.details.totalQueries) * 100)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Duration</span>
                            <div className="font-medium text-gray-900 dark:text-white">{result.duration}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Cost</span>
                            <div className="font-medium text-gray-900 dark:text-white">{result.details.cost}</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Executed: {new Date(result.executedAt).toLocaleString()} • 
                          Datasets: {result.datasets.length} • 
                          Avg Response: {result.details.avgResponseTime}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Metric</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a trust metric from the left panel to configure and run evaluations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Evaluation Results Overview */}
      {evaluationResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evaluation Results</h3>
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
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {evaluationResults.map((result, index) => (
                  <tr key={result.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.useCaseName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.riskName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{result.metricName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-lg font-bold ${getScoreColor(result.score, result.threshold)}`}>
                        {result.score.toFixed(3)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">≥{result.threshold}</td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPassFailColor(result.score, result.threshold)}`}>
                        {getPassFailStatus(result.score, result.threshold)}
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
      )}

      {/* Run Evaluation Modal */}
      {showRunModal && selectedMetricData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Run Trust Evaluation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Configure and execute evaluation for {selectedMetricData.metricName}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Metric Summary */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Evaluation Target</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400">Metric:</span>
                    <div className="text-emerald-900 dark:text-emerald-100 font-medium">{selectedMetricData.metricName}</div>
                  </div>
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400">Risk:</span>
                    <div className="text-emerald-900 dark:text-emerald-100">{selectedMetricData.riskName}</div>
                  </div>
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400">Threshold:</span>
                    <div className="text-emerald-900 dark:text-emerald-100">≥{selectedMetricData.threshold}</div>
                  </div>
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400">Method:</span>
                    <div className="text-emerald-900 dark:text-emerald-100">{selectedMetricData.evaluationMethod}</div>
                  </div>
                </div>
              </div>

              {/* Dataset Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset Selection *</h4>
                <div className="space-y-3">
                  {availableDatasets.map((dataset) => (
                    <label key={dataset.id} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={evaluationConfig.selectedDatasets.includes(dataset.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEvaluationConfig(prev => ({
                              ...prev,
                              selectedDatasets: [...prev.selectedDatasets, dataset.id]
                            }));
                          } else {
                            setEvaluationConfig(prev => ({
                              ...prev,
                              selectedDatasets: prev.selectedDatasets.filter(id => id !== dataset.id)
                            }));
                          }
                        }}
                        className="mt-1 rounded border-gray-300" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{dataset.name}</span>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getDatasetTypeColor(dataset.type)}`}>
                            {dataset.type}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {dataset.samples.toLocaleString()} samples
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{dataset.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Evaluation Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Evaluation Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Test Queries
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      value={evaluationConfig.queryCount}
                      onChange={(e) => setEvaluationConfig(prev => ({ ...prev, queryCount: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                      <span>10</span>
                      <span className="font-medium text-gray-900 dark:text-white">{evaluationConfig.queryCount}</span>
                      <span>1000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Response Collection Mode
                    </label>
                    <select
                      value={evaluationConfig.evaluationMode}
                      onChange={(e) => setEvaluationConfig(prev => ({ ...prev, evaluationMode: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="online">Online (Live API)</option>
                      <option value="offline">Offline (Pre-recorded)</option>
                      <option value="hybrid">Hybrid (Mixed)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Batch Size
                    </label>
                    <input
                      type="number"
                      value={evaluationConfig.batchSize}
                      onChange={(e) => setEvaluationConfig(prev => ({ ...prev, batchSize: parseInt(e.target.value) }))}
                      min="1"
                      max="100"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      value={evaluationConfig.timeout}
                      onChange={(e) => setEvaluationConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                      min="5"
                      max="300"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Retry Count
                    </label>
                    <input
                      type="number"
                      value={evaluationConfig.retryCount}
                      onChange={(e) => setEvaluationConfig(prev => ({ ...prev, retryCount: parseInt(e.target.value) }))}
                      min="0"
                      max="5"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evaluation Notes
                  </label>
                  <textarea
                    placeholder="Add any specific notes or context for this evaluation run..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 h-16 resize-none"
                  />
                </div>
              </div>

              {/* Cost & Time Estimation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Evaluation Estimation</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">Estimated Duration:</span>
                    <div className="text-blue-900 dark:text-blue-100 font-medium">
                      {Math.ceil(evaluationConfig.queryCount / evaluationConfig.batchSize * 0.5)} minutes
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">Estimated Cost:</span>
                    <div className="text-blue-900 dark:text-blue-100 font-medium">
                      ${(evaluationConfig.queryCount * 0.02).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">API Calls:</span>
                    <div className="text-blue-900 dark:text-blue-100 font-medium">{evaluationConfig.queryCount}</div>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">Datasets:</span>
                    <div className="text-blue-900 dark:text-blue-100 font-medium">{evaluationConfig.selectedDatasets.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Evaluation will test {selectedMetricData.metricName} against threshold of ≥{selectedMetricData.threshold}
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowRunModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRunEvaluation}
                  disabled={evaluationConfig.selectedDatasets.length === 0}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Evaluation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Running Evaluation Indicator */}
      {isRunning && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <div>
            <div className="font-medium">Running Evaluation...</div>
            <div className="text-sm text-emerald-100">
              Testing {selectedMetricData?.metricName} with {evaluationConfig.queryCount} queries
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canRun && "View-only mode - Contact administrator for evaluation execution access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Results</span>
              </button>
              <button 
                onClick={handleComplete}
                disabled={evaluationResults.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
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
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Trust Evaluations Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluation Results</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Metrics Evaluated: {evaluationResults.length}</div>
                <div>Passed Thresholds: {evaluationResults.filter(r => r.score >= r.threshold).length}</div>
                <div>Failed Thresholds: {evaluationResults.filter(r => r.score < r.threshold).length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Raw Scores</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Avg Score: {evaluationResults.length > 0 ? (evaluationResults.reduce((sum, r) => sum + r.score, 0) / evaluationResults.length).toFixed(3) : 'N/A'}</div>
                <div>Min Score: {evaluationResults.length > 0 ? Math.min(...evaluationResults.map(r => r.score)).toFixed(3) : 'N/A'}</div>
                <div>Max Score: {evaluationResults.length > 0 ? Math.max(...evaluationResults.map(r => r.score)).toFixed(3) : 'N/A'}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Benchmarking</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Evaluations complete</div>
                <div>✓ Scores collected</div>
                <div>✓ Ready for Step 3</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Next: Step 3 - Trust Benchmarking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The evaluation scores will now be compared against thresholds and industry standards 
              to determine pass/fail status and generate trust benchmarks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustEvaluations;