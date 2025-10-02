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
  ArrowDown,
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
  Gauge,
  PieChart,
  LineChart,
  Grid,
  Layers,
  Map,
  Lightbulb,
  Heart,
  Scale,
  Crown,
  Building,
  Globe
} from 'lucide-react';

interface TrustAnalyticsProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const TrustAnalytics: React.FC<TrustAnalyticsProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedDrilldown, setSelectedDrilldown] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
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

  // Mock aggregated input from Steps 1-5
  const inputFromPreviousSteps = {
    metricRegistry: [
      { id: 'MR001', useCaseId: 'UC1', riskId: 'RR001', metric: 'Faithfulness Score', threshold: 0.80 },
      { id: 'MR002', useCaseId: 'UC1', riskId: 'RR002', metric: 'Medical Accuracy Score', threshold: 0.85 },
      { id: 'MR003', useCaseId: 'UC2', riskId: 'RR003', metric: 'PII Exposure Rate', threshold: 0.02 },
      { id: 'MR004', useCaseId: 'UC3', riskId: 'RR004', metric: 'Demographic Parity Gap', threshold: 0.05 }
    ],
    evaluationResults: [
      { id: 'EVAL001', metricId: 'MR001', score: 0.72, dataset: 'Medical Golden Dataset', sampleSize: 500 },
      { id: 'EVAL002', metricId: 'MR002', score: 0.91, dataset: 'Clinical Validation Set', sampleSize: 300 },
      { id: 'EVAL003', metricId: 'MR003', score: 0.01, dataset: 'Privacy Test Cases', sampleSize: 200 },
      { id: 'EVAL004', metricId: 'MR004', score: 0.08, dataset: 'Fairness Test Set', sampleSize: 400 }
    ],
    benchmarkingResults: [
      { id: 'BENCH001', evaluationId: 'EVAL001', benchmark: 0.85, status: 'FAIL' },
      { id: 'BENCH002', evaluationId: 'EVAL002', benchmark: 0.88, status: 'PASS' },
      { id: 'BENCH003', evaluationId: 'EVAL003', benchmark: 0.015, status: 'PASS' },
      { id: 'BENCH004', evaluationId: 'EVAL004', benchmark: 0.04, status: 'FAIL' }
    ],
    fairnessResults: [
      { id: 'FAIR001', metricId: 'MR004', biasGap: 0.08, affectedGroups: ['Gender', 'Age'], status: 'FAIL' }
    ],
    explanationResults: [
      { id: 'EXP001', evaluationId: 'EVAL001', rootCause: 'Model bypassed KB retrieval', groundingGap: true },
      { id: 'EXP002', evaluationId: 'EVAL004', rootCause: 'Age-based dosing bias in training data', biasSource: 'Training Data' }
    ]
  };

  // Trust Index Calculation
  const calculateTrustIndex = () => {
    const weights = {
      accuracy: 0.30,
      fairness: 0.25,
      robustness: 0.20,
      transparency: 0.15,
      privacy: 0.10
    };

    const scores = {
      accuracy: 0.815, // (0.72 + 0.91) / 2
      fairness: 0.92,  // 1 - 0.08 bias gap
      robustness: 0.85, // Mock robustness score
      transparency: 0.78, // Based on explainability coverage
      privacy: 0.99     // 1 - 0.01 PII exposure
    };

    const trustIndex = Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + (scores[key as keyof typeof scores] * weight);
    }, 0);

    return Math.round(trustIndex * 100);
  };

  const trustIndex = calculateTrustIndex();

  // Risk Heatmap Data
  const riskHeatmap = [
    {
      useCase: 'Emergency Patient Triage',
      risks: [
        { name: 'Hallucination', status: 'FAIL', score: 0.72, metric: 'Faithfulness Score' },
        { name: 'Medical Accuracy', status: 'PASS', score: 0.91, metric: 'Medical Accuracy Score' }
      ]
    },
    {
      useCase: 'Symptom Documentation',
      risks: [
        { name: 'Privacy Leakage', status: 'PASS', score: 0.01, metric: 'PII Exposure Rate' }
      ]
    },
    {
      useCase: 'Treatment Recommendation',
      risks: [
        { name: 'Bias/Fairness', status: 'FAIL', score: 0.08, metric: 'Demographic Parity Gap' }
      ]
    }
  ];

  // Trust Trends (Mock time series data)
  const trustTrends = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Trust Index',
      data: [72, 75, 68, trustIndex],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    }]
  };

  // Metric Performance Summary
  const metricPerformance = [
    { metric: 'Faithfulness Score', score: 0.72, threshold: 0.80, status: 'FAIL', trend: '-8%' },
    { metric: 'Medical Accuracy Score', score: 0.91, threshold: 0.85, status: 'PASS', trend: '+3%' },
    { metric: 'PII Exposure Rate', score: 0.01, threshold: 0.02, status: 'PASS', trend: '-50%' },
    { metric: 'Demographic Parity Gap', score: 0.08, threshold: 0.05, status: 'FAIL', trend: '+60%' }
  ];

  // Key Insights from Explainability
  const keyInsights = [
    {
      type: 'critical',
      title: 'Hallucination Root Cause Identified',
      description: 'Model bypassing KB retrieval in 28% of cases, relying on outdated training data',
      action: 'Update KB retrieval logic and retrain grounding module',
      priority: 'Critical',
      affectedMetrics: ['Faithfulness Score']
    },
    {
      type: 'warning',
      title: 'Gender Bias in Treatment Recommendations',
      description: 'Age-based dosing shows 8% disparity across demographic groups',
      action: 'Review dosing guidelines for demographic considerations',
      priority: 'High',
      affectedMetrics: ['Demographic Parity Gap']
    },
    {
      type: 'success',
      title: 'Privacy Protection Effective',
      description: 'PII masking working correctly with 99% effectiveness',
      action: 'Continue current privacy controls',
      priority: 'Low',
      affectedMetrics: ['PII Exposure Rate']
    }
  ];

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

  const getTrustIndexColor = (index: number) => {
    if (index >= 90) return 'from-green-500 to-emerald-600';
    if (index >= 80) return 'from-blue-500 to-cyan-600';
    if (index >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getTrustIndexGrade = (index: number) => {
    if (index >= 90) return 'A';
    if (index >= 80) return 'B';
    if (index >= 70) return 'C';
    if (index >= 60) return 'D';
    return 'F';
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      default: return <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-gray-900';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              6
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trust Analytics</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <BarChart3 className="w-4 h-4" />
              <span>Final Trust Dashboard</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Aggregate all trust measurements into comprehensive dashboard</p>
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

      {/* Input from Steps 1-5 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Input from Stage 2 Steps 1-5</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metrics (Step 1)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Metrics Defined: {inputFromPreviousSteps.metricRegistry.length}</div>
              <div>Thresholds Set: ✓</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluations (Step 2)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Scores Collected: {inputFromPreviousSteps.evaluationResults.length}</div>
              <div>Total Samples: {inputFromPreviousSteps.evaluationResults.reduce((sum, r) => sum + r.sampleSize, 0)}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benchmarking (Step 3)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Benchmarked: {inputFromPreviousSteps.benchmarkingResults.length}</div>
              <div>Pass Rate: {Math.round((inputFromPreviousSteps.benchmarkingResults.filter(r => r.status === 'PASS').length / inputFromPreviousSteps.benchmarkingResults.length) * 100)}%</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Fairness (Step 4)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Bias Assessments: {inputFromPreviousSteps.fairnessResults.length}</div>
              <div>Failed Fairness: {inputFromPreviousSteps.fairnessResults.filter(r => r.status === 'FAIL').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explanations (Step 5)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Root Causes: {inputFromPreviousSteps.explanationResults.length}</div>
              <div>Grounding Gaps: {inputFromPreviousSteps.explanationResults.filter(r => r.groundingGap).length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Trust Index */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overall Trust Index</h3>
          
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className={`w-32 h-32 bg-gradient-to-r ${getTrustIndexColor(trustIndex)} rounded-full flex items-center justify-center mb-4 shadow-xl`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{trustIndex}%</div>
                  <div className="text-lg font-medium text-white">{getTrustIndexGrade(trustIndex)}</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Trust Score</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weighted composite of all metrics</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Accuracy (30%): 81.5%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Fairness (25%): 92.0%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Robustness (20%): 85.0%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Transparency (15%): 78.0%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Privacy (10%): 99.0%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trust Index calculated using weighted aggregation: Accuracy (30%) + Fairness (25%) + Robustness (20%) + Transparency (15%) + Privacy (10%)
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Trust Overview', icon: Gauge },
              { id: 'heatmap', label: 'Risk Heatmap', icon: Grid },
              { id: 'trends', label: 'Trust Trends', icon: LineChart },
              { id: 'insights', label: 'Key Insights', icon: Lightbulb }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    selectedView === tab.id
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {selectedView === 'overview' && (
            <div className="space-y-6">
              {/* Metric Performance Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Metric Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {metricPerformance.map((metric, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{metric.metric}</h4>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                          {getStatusIcon(metric.status)}
                          <span>{metric.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.score.toFixed(3)}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Actual Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metric.threshold.toFixed(2)}</div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">Threshold</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-medium ${
                            metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.trend}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Trend</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            metric.status === 'PASS' ? 'bg-green-500' :
                            metric.status === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((metric.score / Math.max(metric.threshold, 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Dimensions Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trust Dimensions Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Accuracy', score: 81.5, icon: Target, color: 'green' },
                    { name: 'Fairness', score: 92.0, icon: Users, color: 'blue' },
                    { name: 'Robustness', score: 85.0, icon: Shield, color: 'purple' },
                    { name: 'Transparency', score: 78.0, icon: Eye, color: 'yellow' },
                    { name: 'Privacy', score: 99.0, icon: Lock, color: 'pink' }
                  ].map((dimension, index) => {
                    const Icon = dimension.icon;
                    return (
                      <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <Icon className={`w-8 h-8 text-${dimension.color}-600 dark:text-${dimension.color}-400 mx-auto mb-3`} />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{dimension.score.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{dimension.name}</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full bg-${dimension.color}-500`}
                            style={{ width: `${dimension.score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'heatmap' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Heatmap: Use Case × Risk × Status</h3>
              
              <div className="space-y-6">
                {riskHeatmap.map((useCase, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{useCase.useCase}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {useCase.risks.map((risk, riskIndex) => (
                        <div key={riskIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-gray-900 dark:text-white">{risk.name}</h5>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                              {getStatusIcon(risk.status)}
                              <span>{risk.status}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Metric:</span>
                              <span className="text-gray-900 dark:text-white">{risk.metric}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Score:</span>
                              <span className={`font-bold ${
                                risk.status === 'PASS' ? 'text-green-600' : 
                                risk.status === 'WARNING' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {risk.score.toFixed(3)}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                            <div 
                              className={`h-2 rounded-full ${
                                risk.status === 'PASS' ? 'bg-green-500' :
                                risk.status === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(risk.score * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'trends' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trust Trends Over Time</h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Trust Index Trend</h4>
                  <select className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">
                    <option>Last 4 weeks</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                
                {/* Simple trend visualization */}
                <div className="h-64 flex items-end justify-between space-x-2">
                  {trustTrends.datasets[0].data.map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="flex flex-col items-center justify-end h-48">
                        <div
                          className="w-12 bg-emerald-500 rounded-t transition-all duration-500 hover:opacity-80"
                          style={{ height: `${(value / 100) * 180}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{trustTrends.labels[index]}</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Metric Trends */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metricPerformance.slice(0, 4).map((metric, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">{metric.metric}</h5>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.score.toFixed(3)}</span>
                      <span className={`text-sm font-medium ${
                        metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights & Recommendations</h3>
              
              <div className="space-y-4">
                {keyInsights.map((insight, index) => (
                  <div key={index} className={`border-l-4 p-6 rounded-r-lg ${getInsightColor(insight.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                              {insight.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                          
                          <div className="bg-white dark:bg-gray-600 p-3 rounded-lg mb-3">
                            <strong className="text-gray-900 dark:text-white">Recommended Action:</strong>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">{insight.action}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {insight.affectedMetrics.map((metric, metricIndex) => (
                              <span key={metricIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Trust Analytics Report */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Trust Analytics Report</h3>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
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
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Root Cause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { useCase: 'Emergency Patient Triage', risk: 'Hallucination', metric: 'Faithfulness Score', score: 0.72, threshold: 0.80, benchmark: 0.85, status: 'FAIL', rootCause: 'KB retrieval bypass' },
                { useCase: 'Emergency Patient Triage', risk: 'Medical Accuracy', metric: 'Medical Accuracy Score', score: 0.91, threshold: 0.85, benchmark: 0.88, status: 'PASS', rootCause: 'N/A' },
                { useCase: 'Symptom Documentation', risk: 'Privacy Leakage', metric: 'PII Exposure Rate', score: 0.01, threshold: 0.02, benchmark: 0.015, status: 'PASS', rootCause: 'N/A' },
                { useCase: 'Treatment Recommendation', risk: 'Bias/Fairness', metric: 'Demographic Parity Gap', score: 0.08, threshold: 0.05, benchmark: 0.04, status: 'FAIL', rootCause: 'Training data bias' }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.useCase}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.risk}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.metric}</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">
                    {row.score.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                    {row.threshold.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                    {row.benchmark.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {getStatusIcon(row.status)}
                      <span>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.rootCause}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for trust analytics access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Trust Report</span>
              </button>
              <button 
                onClick={handleComplete}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete Stage 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Trust Analytics Report</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Generate comprehensive trust report for stakeholders
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Report Format
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'executive', name: 'Executive Summary', description: 'High-level trust overview for leadership' },
                    { id: 'technical', name: 'Technical Deep Dive', description: 'Detailed metrics and analysis for QA teams' },
                    { id: 'compliance', name: 'Compliance Report', description: 'Audit-ready documentation for regulators' },
                    { id: 'governance', name: 'Governance Dashboard', description: 'Risk and control status for governance teams' }
                  ].map(format => (
                    <label key={format.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input type="radio" name="format" className="mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{format.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{format.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Export Options
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['PDF Report', 'Excel Workbook', 'JSON Data', 'CSV Export'].map(option => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Report will include all Stage 2 results and evidence
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Stage 2: Trust Metrics Engine Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Trust Analytics Report</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Overall Trust Index: {trustIndex}%</div>
                <div>Metrics Analyzed: {metricPerformance.length}</div>
                <div>Insights Generated: {keyInsights.length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Findings</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Failed Metrics: {metricPerformance.filter(m => m.status === 'FAIL').length}</div>
                <div>Root Causes Identified: {inputFromPreviousSteps.explanationResults.length}</div>
                <div>Action Items: {keyInsights.length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next: Stage 3</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Trust baseline established</div>
                <div>✓ Ready for TEVV Automation</div>
                <div>✓ Continuous monitoring setup</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Stage 2 Summary</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trust Metrics Engine has established quantitative trust baselines for your GenAI application. 
              The Trust Index of {trustIndex}% provides a composite view of trustworthiness across all dimensions. 
              Key risks identified: Hallucination and Bias/Fairness require immediate attention before production deployment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustAnalytics;