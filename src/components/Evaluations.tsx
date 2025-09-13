import React, { useState } from 'react';
import { 
  Target, 
  Play, 
  Pause, 
  BarChart3, 
  Settings, 
  Plus,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Brain
} from 'lucide-react';

const Evaluations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('running');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const evaluations = {
    running: [
      {
        id: 'eval_001',
        name: 'Customer Support Quality Assessment',
        description: 'Comprehensive evaluation of customer support responses',
        status: 'running',
        progress: 75,
        dataset: 'customer_support_v2',
        model: 'gpt-4',
        metrics: ['quality', 'toxicity', 'bias', 'coherence', 'factuality', 'relevance'],
        startedAt: '2024-01-15T09:00:00Z',
        estimatedCompletion: '2024-01-15T15:30:00Z',
        samplesProcessed: 750,
        totalSamples: 1000,
        currentResults: {
          quality: 94.2,
          toxicity: 0.8,
          bias: 1.2,
          coherence: 96.1,
          factuality: 89.5,
          relevance: 92.8
        },
        cost: 12.45,
        evaluator: 'Sarah Chen'
      },
      {
        id: 'eval_002',
        name: 'Content Generation Bias Detection',
        description: 'Detecting bias in marketing content generation',
        status: 'running',
        progress: 45,
        dataset: 'marketing_content_v1',
        model: 'claude-3',
        metrics: ['bias', 'toxicity', 'quality', 'creativity'],
        startedAt: '2024-01-15T11:30:00Z',
        estimatedCompletion: '2024-01-15T17:00:00Z',
        samplesProcessed: 225,
        totalSamples: 500,
        currentResults: {
          bias: 2.1,
          toxicity: 0.3,
          quality: 91.7,
          creativity: 87.4
        },
        cost: 8.92,
        evaluator: 'Mike Johnson'
      }
    ],
    completed: [
      {
        id: 'eval_003',
        name: 'Code Review Assistant Evaluation',
        description: 'Evaluating code review suggestions quality',
        status: 'completed',
        dataset: 'code_reviews_v3',
        model: 'gpt-4',
        metrics: ['accuracy', 'helpfulness', 'completeness'],
        completedAt: '2024-01-14T16:45:00Z',
        duration: '2h 15m',
        samplesProcessed: 800,
        totalSamples: 800,
        finalResults: {
          accuracy: 96.8,
          helpfulness: 94.2,
          completeness: 91.5,
          overall: 94.2
        },
        cost: 15.67,
        evaluator: 'Alex Kim'
      },
      {
        id: 'eval_004',
        name: 'Multi-language Translation Quality',
        description: 'Assessing translation quality across 5 languages',
        status: 'completed',
        dataset: 'translations_multilang',
        model: 'gemini-pro',
        metrics: ['fluency', 'accuracy', 'cultural_sensitivity'],
        completedAt: '2024-01-13T14:20:00Z',
        duration: '4h 30m',
        samplesProcessed: 1200,
        totalSamples: 1200,
        finalResults: {
          fluency: 92.4,
          accuracy: 89.7,
          cultural_sensitivity: 95.1,
          overall: 92.4
        },
        cost: 22.34,
        evaluator: 'Emily Davis'
      }
    ],
    scheduled: [
      {
        id: 'eval_005',
        name: 'Weekly Performance Benchmark',
        description: 'Automated weekly performance evaluation',
        status: 'scheduled',
        dataset: 'production_sample_v1',
        model: 'gpt-4',
        scheduledFor: '2024-01-16T08:00:00Z',
        frequency: 'weekly',
        metrics: ['quality', 'toxicity', 'cost_efficiency'],
        estimatedDuration: '3h',
        estimatedCost: 18.50,
        evaluator: 'System'
      }
    ]
  };

  const customMetrics = [
    { id: 'quality', name: 'Quality Score', description: 'Overall response quality assessment' },
    { id: 'toxicity', name: 'Toxicity Detection', description: 'Harmful or toxic content detection' },
    { id: 'bias', name: 'Bias Detection', description: 'Demographic and cultural bias assessment' },
    { id: 'coherence', name: 'Coherence', description: 'Logical flow and consistency' },
    { id: 'factuality', name: 'Factual Accuracy', description: 'Factual correctness verification' },
    { id: 'relevance', name: 'Relevance', description: 'Response relevance to input' },
    { id: 'creativity', name: 'Creativity', description: 'Creative and original content assessment' },
    { id: 'helpfulness', name: 'Helpfulness', description: 'Usefulness of the response' },
    { id: 'completeness', name: 'Completeness', description: 'Thoroughness of the response' },
    { id: 'fluency', name: 'Fluency', description: 'Language fluency and naturalness' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Evaluations</h2>
          <p className="text-gray-600 dark:text-gray-400">Run comprehensive evaluations on your GenAI models</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Evaluation</span>
        </button>
      </div>

      {/* Evaluation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Running</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{evaluations.running.length}</p>
            </div>
            <Play className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Today</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">3</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{evaluations.scheduled.length}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cost (Month)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$247.89</p>
            </div>
            <BarChart3 className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Evaluation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['running', 'completed', 'scheduled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} ({evaluations[tab as keyof typeof evaluations].length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {evaluations[activeTab as keyof typeof evaluations].map((evaluation: any) => (
              <div key={evaluation.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{evaluation.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{evaluation.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                        {getStatusIcon(evaluation.status)}
                        <span className="capitalize">{evaluation.status}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Dataset: {evaluation.dataset}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Model: {evaluation.model}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">By: {evaluation.evaluator}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress for running evaluations */}
                {evaluation.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress: {evaluation.samplesProcessed}/{evaluation.totalSamples} samples</span>
                      <span>{evaluation.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${evaluation.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                      <span>Started: {new Date(evaluation.startedAt).toLocaleString()}</span>
                      <span>ETA: {new Date(evaluation.estimatedCompletion).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Results */}
                {(evaluation.currentResults || evaluation.finalResults) && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      {evaluation.status === 'running' ? 'Current Results' : 'Final Results'}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.entries(evaluation.currentResults || evaluation.finalResults).map(([metric, score]) => (
                        <div key={metric} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {typeof score === 'number' ? score.toFixed(1) : score}
                            {metric !== 'overall' && typeof score === 'number' && score < 10 ? '%' : 
                             metric !== 'overall' && typeof score === 'number' && score >= 10 ? '%' : ''}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {metric.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metrics and Cost */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {evaluation.metrics.map((metric: string) => (
                      <span key={metric} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                        {metric.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cost: ${(evaluation.cost || evaluation.estimatedCost || 0).toFixed(2)}
                  </div>
                </div>

                {/* Scheduled evaluation details */}
                {evaluation.status === 'scheduled' && (
                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-800 dark:text-purple-200">
                        Scheduled for: {new Date(evaluation.scheduledFor).toLocaleString()}
                      </span>
                      <span className="text-purple-600 dark:text-purple-400">
                        {evaluation.frequency && `Frequency: ${evaluation.frequency}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Evaluation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Evaluation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up a comprehensive evaluation for your GenAI model
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Model Evaluation"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model to Evaluate *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>GPT-4</option>
                      <option>GPT-3.5 Turbo</option>
                      <option>Claude-3</option>
                      <option>Gemini Pro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Type *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Trust Assessment</option>
                      <option>Performance Evaluation</option>
                      <option>Safety Validation</option>
                      <option>Bias Audit</option>
                      <option>Regulatory Compliance</option>
                      <option>Custom Evaluation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry Domain
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Healthcare</option>
                      <option>Financial Services</option>
                      <option>Government</option>
                      <option>Enterprise</option>
                      <option>Retail</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the purpose and scope of this evaluation..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Dataset Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset Selection</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dataset *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>customer_support_v2 (1,000 samples)</option>
                      <option>marketing_content_v1 (500 samples)</option>
                      <option>code_reviews_v3 (800 samples)</option>
                      <option>translations_multilang (1,200 samples)</option>
                      <option>healthcare_triage_v1 (2,000 samples)</option>
                      <option>financial_lending_v2 (1,500 samples)</option>
                      <option>government_services_v1 (900 samples)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sample Size
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Golden Reference Dataset (for accuracy evaluation)
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>None</option>
                    <option>expert_validated_responses_v1</option>
                    <option>medical_qa_golden_v2</option>
                    <option>financial_decisions_golden_v1</option>
                    <option>Upload new golden dataset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evaluation Context & Instructions
                  </label>
                  <textarea
                    placeholder="Provide specific context for evaluators, domain expertise requirements, and evaluation criteria..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Evaluation Metrics */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Evaluation Metrics</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Core Trust Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'accuracy', name: 'Accuracy & Reliability', description: 'Factual correctness and consistency' },
                        { id: 'fairness', name: 'Fairness & Non-discrimination', description: 'Equitable treatment across groups' },
                        { id: 'robustness', name: 'Robustness & Security', description: 'Resilience against attacks' },
                        { id: 'transparency', name: 'Transparency & Explainability', description: 'Decision interpretability' },
                        { id: 'privacy', name: 'Privacy & Data Protection', description: 'Data privacy compliance' },
                        { id: 'safety', name: 'Safety & Harm Prevention', description: 'Harm mitigation and safety' }
                      ].map(metric => (
                        <label key={metric.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          <input type="checkbox" className="mt-1 rounded border-gray-300" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{metric.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Domain-Specific Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'medical_accuracy', name: 'Medical Accuracy', description: 'Clinical correctness and safety' },
                        { id: 'financial_compliance', name: 'Financial Compliance', description: 'Regulatory adherence' },
                        { id: 'clinical_relevance', name: 'Clinical Relevance', description: 'Medical context appropriateness' },
                        { id: 'fair_lending', name: 'Fair Lending', description: 'Non-discriminatory lending' },
                        { id: 'diagnostic_confidence', name: 'Diagnostic Confidence', description: 'Medical decision confidence' },
                        { id: 'regulatory_alignment', name: 'Regulatory Alignment', description: 'Compliance framework alignment' }
                      ].map(metric => (
                        <label key={metric.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          <input type="checkbox" className="mt-1 rounded border-gray-300" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{metric.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Performance Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customMetrics.map(metric => (
                        <label key={metric.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          <input type="checkbox" className="mt-1 rounded border-gray-300" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{metric.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Human Evaluation Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Human Evaluation Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Human Evaluators Required
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>None (Automated only)</option>
                      <option>Domain Experts</option>
                      <option>Ethics Review Board</option>
                      <option>Mixed Panel</option>
                      <option>External Auditors</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Consensus Threshold
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Simple Majority (51%)</option>
                      <option>Supermajority (67%)</option>
                      <option>Strong Consensus (80%)</option>
                      <option>Unanimous (100%)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evaluation Instructions for Human Reviewers
                  </label>
                  <textarea
                    placeholder="Provide detailed instructions for human evaluators, including domain-specific criteria, edge cases to consider, and evaluation rubrics..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Expertise
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Medical Expertise', 'Financial Regulation', 'AI Safety', 'Ethics', 'Domain Knowledge', 'Technical Review', 'Legal Compliance', 'User Experience'].map(expertise => (
                      <label key={expertise} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{expertise}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Risk & Compliance Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Risk & Compliance Configuration</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Risk Categories to Assess
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Data Privacy', 'Bias & Fairness', 'Security', 'Transparency', 'Accountability', 'Societal Impact', 'Performance', 'Safety'].map(category => (
                      <label key={category} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Compliance Frameworks to Validate
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['NIST RMF', 'EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'ISO 27001', 'SOC 2', 'FedRAMP'].map(framework => (
                      <label key={framework} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Tolerance Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Very Low (Healthcare, Finance)</option>
                      <option>Low (Government, Legal)</option>
                      <option>Medium (Enterprise, Education)</option>
                      <option>High (Marketing, Entertainment)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Rigor Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Standard Evaluation</option>
                      <option>Enhanced Evaluation</option>
                      <option>Comprehensive Audit</option>
                      <option>Regulatory Submission</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Scheduling</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Execution
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Run Now</option>
                      <option>Schedule Later</option>
                      <option>Recurring</option>
                      <option>Triggered by Deployment</option>
                      <option>Triggered by Risk Change</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                      <option>Critical (Pre-deployment)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Cost ($)
                    </label>
                    <input
                      type="number"
                      placeholder="50.00"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notification Recipients
                  </label>
                  <input
                    type="text"
                    placeholder="sarah.chen@company.com, ai-team@company.com"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Success Criteria & Acceptance Thresholds
                  </label>
                  <textarea
                    placeholder="Define what constitutes a successful evaluation (e.g., Trust Score > 90%, No critical safety issues, Bias score < 5%)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated cost: $15.50 • Duration: ~2 hours • Trust assessment included
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save as Template
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Create Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluations;