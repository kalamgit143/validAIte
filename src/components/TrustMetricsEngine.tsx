import React, { useState } from 'react';
import { 
  Target, 
  Shield, 
  Users, 
  Brain,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Plus,
  Settings,
  Filter,
  Search,
  Calendar,
  Award,
  Zap,
  Activity,
  FileText,
  Database,
  Code,
  Lock,
  Globe,
  Heart,
  Scale,
  Lightbulb,
  Cpu,
  DollarSign,
  Timer,
  Layers,
  GitBranch,
  TestTube,
  Workflow
} from 'lucide-react';

const TrustMetricsEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trust_dashboard');
  const [selectedApplication, setSelectedApplication] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const trustMetrics = {
    healthcare_triage: {
      application: 'Healthcare Triage Assistant',
      industry: 'Healthcare',
      riskLevel: 'High Risk (EU AI Act)',
      overallTrustScore: 94.2,
      trustComponents: {
        accuracy: { score: 96.8, weight: 0.25, trend: '+2.1%', status: 'excellent' },
        fairness: { score: 92.4, weight: 0.20, trend: '+1.8%', status: 'good' },
        robustness: { score: 94.1, weight: 0.20, trend: '+0.5%', status: 'excellent' },
        transparency: { score: 89.7, weight: 0.15, trend: '+3.2%', status: 'good' },
        privacy: { score: 97.2, weight: 0.10, trend: '+0.8%', status: 'excellent' },
        safety: { score: 98.5, weight: 0.10, trend: '+1.2%', status: 'excellent' }
      },
      domainSpecific: {
        'Medical Accuracy': 96.8,
        'Clinical Relevance': 94.2,
        'Patient Safety': 98.5,
        'Diagnostic Confidence': 91.7,
        'Triage Appropriateness': 93.4
      },
      complianceAlignment: {
        'EU AI Act': 94,
        'HIPAA': 97,
        'GDPR': 95,
        'Medical Device Regulation': 89
      },
      businessImpact: {
        'Error Reduction': '40%',
        'Patient Satisfaction': '4.8/5',
        'Cost Savings': '$2.4M annually',
        'Regulatory Compliance': '97%'
      }
    },
    financial_lending: {
      application: 'Financial Lending Copilot',
      industry: 'Financial Services',
      riskLevel: 'High Risk (EU AI Act)',
      overallTrustScore: 91.8,
      trustComponents: {
        accuracy: { score: 94.2, weight: 0.25, trend: '+1.5%', status: 'excellent' },
        fairness: { score: 95.1, weight: 0.25, trend: '+2.8%', status: 'excellent' },
        robustness: { score: 89.3, weight: 0.20, trend: '+0.9%', status: 'good' },
        transparency: { score: 92.7, weight: 0.15, trend: '+1.7%', status: 'excellent' },
        privacy: { score: 96.4, weight: 0.10, trend: '+0.3%', status: 'excellent' },
        safety: { score: 88.9, weight: 0.05, trend: '+1.1%', status: 'good' }
      },
      domainSpecific: {
        'Credit Assessment Accuracy': 94.2,
        'Fair Lending Compliance': 95.1,
        'Regulatory Adherence': 96.8,
        'Risk Prediction Quality': 92.3,
        'Bias Mitigation': 94.7
      },
      complianceAlignment: {
        'EU AI Act': 92,
        'ECOA (Fair Lending)': 95,
        'GDPR': 96,
        'SOX': 94,
        'Basel III': 89
      },
      businessImpact: {
        'Bias Reduction': '67%',
        'Regulatory Fines Avoided': '$2.4M',
        'Approval Accuracy': '+15%',
        'Customer Trust': '4.6/5'
      }
    }
  };

  const trustFrameworks = [
    {
      id: 'nist_trustworthy_ai',
      name: 'NIST Trustworthy AI Framework',
      description: 'Comprehensive trustworthiness assessment based on NIST AI RMF',
      dimensions: ['Valid & Reliable', 'Safe', 'Fair & Non-harmful', 'Explainable & Interpretable', 'Privacy-enhanced', 'Accountable & Transparent'],
      status: 'active',
      coverage: 95
    },
    {
      id: 'eu_ethics_guidelines',
      name: 'EU Ethics Guidelines for Trustworthy AI',
      description: 'European Commission guidelines for ethical AI development',
      dimensions: ['Human Agency', 'Technical Robustness', 'Privacy & Data Governance', 'Transparency', 'Diversity & Fairness', 'Societal Wellbeing', 'Accountability'],
      status: 'active',
      coverage: 92
    },
    {
      id: 'ieee_ethically_aligned',
      name: 'IEEE Ethically Aligned Design',
      description: 'IEEE standards for ethical AI design and implementation',
      dimensions: ['Human Rights', 'Well-being', 'Data Agency', 'Effectiveness', 'Transparency'],
      status: 'configured',
      coverage: 87
    }
  ];

  const trustMetricsConfig = {
    accuracy: {
      name: 'Accuracy & Reliability',
      description: 'Measures correctness and consistency of AI outputs',
      metrics: [
        { id: 'factual_accuracy', name: 'Factual Accuracy', weight: 0.3, threshold: 0.9 },
        { id: 'response_relevance', name: 'Response Relevance', weight: 0.25, threshold: 0.85 },
        { id: 'consistency', name: 'Output Consistency', weight: 0.2, threshold: 0.8 },
        { id: 'completeness', name: 'Response Completeness', weight: 0.15, threshold: 0.8 },
        { id: 'coherence', name: 'Logical Coherence', weight: 0.1, threshold: 0.85 }
      ],
      evaluationMethods: ['Automated Fact-checking', 'Semantic Similarity', 'Expert Review', 'Benchmark Comparison']
    },
    fairness: {
      name: 'Fairness & Non-discrimination',
      description: 'Ensures equitable treatment across demographic groups',
      metrics: [
        { id: 'demographic_parity', name: 'Demographic Parity', weight: 0.25, threshold: 0.8 },
        { id: 'equal_opportunity', name: 'Equal Opportunity', weight: 0.25, threshold: 0.8 },
        { id: 'equalized_odds', name: 'Equalized Odds', weight: 0.2, threshold: 0.8 },
        { id: 'calibration', name: 'Calibration', weight: 0.15, threshold: 0.8 },
        { id: 'individual_fairness', name: 'Individual Fairness', weight: 0.15, threshold: 0.75 }
      ],
      evaluationMethods: ['Bias Testing', 'Fairness Metrics', 'Demographic Analysis', 'Counterfactual Testing']
    },
    robustness: {
      name: 'Robustness & Security',
      description: 'Resilience against adversarial attacks and edge cases',
      metrics: [
        { id: 'adversarial_robustness', name: 'Adversarial Robustness', weight: 0.3, threshold: 0.85 },
        { id: 'input_validation', name: 'Input Validation', weight: 0.25, threshold: 0.9 },
        { id: 'edge_case_handling', name: 'Edge Case Handling', weight: 0.2, threshold: 0.8 },
        { id: 'prompt_injection_resistance', name: 'Prompt Injection Resistance', weight: 0.15, threshold: 0.95 },
        { id: 'model_theft_protection', name: 'Model Theft Protection', weight: 0.1, threshold: 0.9 }
      ],
      evaluationMethods: ['Red Team Testing', 'Adversarial Examples', 'Stress Testing', 'Security Scanning']
    },
    transparency: {
      name: 'Transparency & Explainability',
      description: 'Interpretability and explainability of AI decisions',
      metrics: [
        { id: 'decision_explainability', name: 'Decision Explainability', weight: 0.3, threshold: 0.8 },
        { id: 'feature_importance', name: 'Feature Importance Clarity', weight: 0.25, threshold: 0.75 },
        { id: 'model_interpretability', name: 'Model Interpretability', weight: 0.2, threshold: 0.7 },
        { id: 'uncertainty_quantification', name: 'Uncertainty Quantification', weight: 0.15, threshold: 0.8 },
        { id: 'reasoning_transparency', name: 'Reasoning Transparency', weight: 0.1, threshold: 0.75 }
      ],
      evaluationMethods: ['LIME', 'SHAP', 'Attention Visualization', 'Counterfactual Explanations']
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 95) return 'bg-emerald-100 dark:bg-emerald-900/20';
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 80) return 'bg-blue-100 dark:bg-blue-900/20';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'good': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'satisfactory': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'needs_improvement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const renderTrustDashboard = () => (
    <div className="space-y-6">
      {/* Application Selector */}
      <div className="flex items-center space-x-4">
        <select
          value={selectedApplication}
          onChange={(e) => setSelectedApplication(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Applications</option>
          <option value="healthcare_triage">Healthcare Triage Assistant</option>
          <option value="financial_lending">Financial Lending Copilot</option>
          <option value="enterprise_copilot">SAP Enterprise Copilot</option>
          <option value="government_services">Government Citizen Services</option>
          <option value="retail_brand_safety">Retail Brand Safety Assistant</option>
        </select>
        
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="1d">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Trust Score Overview */}
      {selectedApplication !== 'all' && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {trustMetrics[selectedApplication as keyof typeof trustMetrics]?.application}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {trustMetrics[selectedApplication as keyof typeof trustMetrics]?.industry} • 
                {trustMetrics[selectedApplication as keyof typeof trustMetrics]?.riskLevel}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                {trustMetrics[selectedApplication as keyof typeof trustMetrics]?.overallTrustScore}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall Trust Score</div>
            </div>
          </div>

          {/* Trust Components */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(trustMetrics[selectedApplication as keyof typeof trustMetrics]?.trustComponents || {}).map(([component, data]: [string, any]) => (
              <div key={component} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                    {data.score}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 capitalize mb-2">
                    {component.replace('_', ' ')}
                  </div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                    {data.status}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Weight: {(data.weight * 100)}% • {data.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Domain-Specific Metrics */}
      {selectedApplication !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain-Specific Trust Metrics</h4>
            <div className="space-y-3">
              {Object.entries(trustMetrics[selectedApplication as keyof typeof trustMetrics]?.domainSpecific || {}).map(([metric, score]) => (
                <div key={metric} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric}</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(score as number)} ${getScoreColor(score as number)}`}>
                    {score}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Impact Metrics</h4>
            <div className="space-y-4">
              {Object.entries(trustMetrics[selectedApplication as keyof typeof trustMetrics]?.businessImpact || {}).map(([metric, value]) => (
                <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric}</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compliance Alignment */}
      {selectedApplication !== 'all' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regulatory Compliance Alignment</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(trustMetrics[selectedApplication as keyof typeof trustMetrics]?.complianceAlignment || {}).map(([framework, score]) => (
              <div key={framework} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`text-xl font-bold ${getScoreColor(score as number)}`}>
                  {score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{framework}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (score as number) >= 95 ? 'bg-emerald-500' :
                      (score as number) >= 90 ? 'bg-green-500' :
                      (score as number) >= 80 ? 'bg-blue-500' :
                      (score as number) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTrustConfiguration = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trust Metrics Configuration</h3>
        <button 
          onClick={() => setShowConfigModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Metric</span>
        </button>
      </div>

      {Object.entries(trustMetricsConfig).map(([category, config]) => (
        <div key={category} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{config.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {config.metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{metric.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Weight: {(metric.weight * 100)}% • Threshold: {(metric.threshold * 100)}%
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue={metric.weight}
                    className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue={metric.threshold}
                    className="w-20 px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Evaluation Methods</h5>
            <div className="flex flex-wrap gap-2">
              {config.evaluationMethods.map((method, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrustFrameworks = () => (
    <div className="space-y-4">
      {trustFrameworks.map((framework) => (
        <div key={framework.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{framework.name}</h4>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                  <span className="capitalize">{framework.status}</span>
                </div>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                  {framework.coverage}% coverage
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{framework.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {framework.dimensions.map((dimension, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                    {dimension}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                Configure
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                framework.coverage >= 95 ? 'bg-emerald-500' :
                framework.coverage >= 90 ? 'bg-green-500' :
                framework.coverage >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${framework.coverage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trust Metrics Engine</h2>
          <p className="text-gray-600 dark:text-gray-400">Quantify AI trustworthiness through comprehensive evaluation frameworks</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Trust Report</span>
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Run Trust Assessment</span>
          </button>
        </div>
      </div>

      {/* Trust Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Trust Score</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">93.0%</p>
            </div>
            <Target className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High-Trust Applications</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">4/5</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trust Improvement</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+8.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trust Assessments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['trust_dashboard', 'configuration', 'frameworks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'trust_dashboard' && renderTrustDashboard()}
          {activeTab === 'configuration' && renderTrustConfiguration()}
          {activeTab === 'frameworks' && renderTrustFrameworks()}
        </div>
      </div>

      {/* Trust Metrics Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configure Custom Trust Metric</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define domain-specific trust metrics for your application
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Metric Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Medical Accuracy"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option>Accuracy & Reliability</option>
                    <option>Fairness & Non-discrimination</option>
                    <option>Robustness & Security</option>
                    <option>Transparency & Explainability</option>
                    <option>Privacy & Data Protection</option>
                    <option>Safety & Harm Prevention</option>
                    <option>Domain-Specific</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe what this metric measures and why it's important for trust..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (0-1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue="0.2"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Threshold (0-1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue="0.8"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scale (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="10"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Evaluation Methods
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Automated Testing', 'Human Review', 'Benchmark Comparison', 'Expert Assessment', 'Statistical Analysis', 'Domain Validation'].map(method => (
                    <label key={method} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Applicable Applications
                </label>
                <div className="space-y-2">
                  {['Healthcare Triage Assistant', 'Financial Lending Copilot', 'SAP Enterprise Copilot', 'Government Citizen Services', 'Retail Brand Safety Assistant'].map(app => (
                    <label key={app} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Custom metrics will be integrated into trust score calculation
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Add Metric
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustMetricsEngine;