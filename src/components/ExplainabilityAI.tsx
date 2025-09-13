import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Target, 
  BarChart3,
  FileText,
  Users,
  Settings,
  Play,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Code,
  Activity
} from 'lucide-react';

const ExplainabilityAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explanations');
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      type: 'global',
      status: 'configured',
      applications: ['Customer Support Bot'],
      lastRun: '2024-01-14T16:20:00Z',
      accuracy: 91,
      interpretability: 95
    }
  ];

  const explanationResults = [
    {
      id: 'exp_001',
      traceId: 'trace_001',
      application: 'Customer Support Bot',
      prompt: 'How can I reset my password?',
      response: 'To reset your password, please follow these steps...',
      method: 'SHAP',
      timestamp: '2024-01-15T10:30:00Z',
      confidence: 0.94,
      keyFactors: [
        { feature: 'password', importance: 0.45, type: 'positive' },
        { feature: 'reset', importance: 0.32, type: 'positive' },
        { feature: 'account', importance: 0.18, type: 'positive' },
        { feature: 'help', importance: 0.12, type: 'positive' },
        { feature: 'login', importance: 0.08, type: 'positive' }
      ],
      explanation: 'The model focused primarily on password-related terms and help-seeking language to generate appropriate support instructions.'
    },
    {
      id: 'exp_002',
      traceId: 'trace_002',
      application: 'Content Generator',
      prompt: 'Write a blog post about AI ethics',
      response: 'AI ethics is a crucial topic in today\'s technological landscape...',
      method: 'LIME',
      timestamp: '2024-01-15T09:20:00Z',
      confidence: 0.78,
      keyFactors: [
        { feature: 'ethics', importance: 0.38, type: 'positive' },
        { feature: 'AI', importance: 0.35, type: 'positive' },
        { feature: 'blog', importance: 0.22, type: 'positive' },
        { feature: 'technology', importance: 0.15, type: 'positive' },
        { feature: 'write', importance: 0.10, type: 'positive' }
      ],
      explanation: 'The model identified key ethical and technological concepts to structure the blog post content.'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Explainability</h2>
          <p className="text-gray-600 dark:text-gray-400">Make AI decisions transparent and interpretable</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Method</span>
        </button>
      </div>

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

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['explanations', 'methods'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'explanations' && (
            <div className="space-y-6">
              {explanationResults.map((result) => (
                <div key={result.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{result.application}</h3>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                          {result.method}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="text-sm">
                          <strong className="text-gray-900 dark:text-white">Prompt:</strong>
                          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-1">
                            {result.prompt}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <strong className="text-gray-900 dark:text-white">Response:</strong>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-1">
                            {result.response}
                          </div>
                        </div>
                      </div>

                      {/* Feature Importance */}
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Influencing Factors</h4>
                        <div className="space-y-2">
                          {result.keyFactors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="flex-1 flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                                  {factor.feature}
                                </span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getImportanceColor(factor.importance)}`}
                                    style={{ width: `${factor.importance * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                                  {(factor.importance * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <strong className="text-blue-900 dark:text-blue-100">Explanation:</strong>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">{result.explanation}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
                        <span>Trace ID: {result.traceId}</span>
                        <span>{new Date(result.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'methods' && (
            <div className="space-y-4">
              {explanationMethods.map((method) => (
                <div key={method.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(method.status)}`}>
                          <span className="capitalize">{method.status}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(method.type)}`}>
                          {method.type} explanations
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Accuracy</span>
                          <div className="font-medium text-gray-900 dark:text-white">{method.accuracy}%</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Interpretability</span>
                          <div className="font-medium text-gray-900 dark:text-white">{method.interpretability}%</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Last Run</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(method.lastRun).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {method.applications.map((app, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                        Run Analysis
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explainability Configuration */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Explainability Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Global Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Auto-generate explanations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Store explanations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Explanation detail level
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                  <option>High Detail</option>
                  <option>Medium Detail</option>
                  <option>Low Detail</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Performance Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Sampling rate (%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue="10"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Max explanation time (ms)
                </label>
                <input
                  type="number"
                  defaultValue={500}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Method Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Explanation Method</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Configure a new explainability method for your AI models
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Method Name *
                  </label>
                  <input
                    type="text"
                    placeholder="My Explanation Method"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Method Type *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>LIME</option>
                    <option>SHAP</option>
                    <option>Attention Visualization</option>
                    <option>Gradient-based</option>
                    <option>Counterfactual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Applications
                </label>
                <div className="space-y-2">
                  {['Customer Support Bot', 'Content Generator', 'Code Review Assistant'].map(app => (
                    <label key={app} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation Scope
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="scope" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Local</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="scope" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Global</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="scope" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Both</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Method will be available after configuration
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplainabilityAI;