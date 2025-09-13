import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Users, 
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Download,
  GitBranch,
  Target,
  BarChart3,
  Calendar,
  Lock,
  Unlock,
  Activity
} from 'lucide-react';

const ModelGovernance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('policies');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const governancePolicies = [
    {
      id: 'policy_001',
      name: 'AI Model Deployment Policy',
      description: 'Governance framework for AI model deployment and lifecycle management',
      version: '2.1',
      status: 'active',
      approvedBy: 'AI Ethics Committee',
      approvedAt: '2024-01-10T10:00:00Z',
      nextReview: '2024-07-10T10:00:00Z',
      compliance: ['NIST RMF', 'EU AI Act'],
      scope: ['All AI Models', 'Production Deployments'],
      requirements: [
        'Risk assessment completion',
        'Security review approval',
        'Performance benchmarking',
        'Ethical assessment',
        'Documentation completeness'
      ]
    },
    {
      id: 'policy_002',
      name: 'Data Governance for AI',
      description: 'Data management and privacy policies for AI systems',
      version: '1.8',
      status: 'active',
      approvedBy: 'Data Protection Officer',
      approvedAt: '2024-01-05T14:00:00Z',
      nextReview: '2024-04-05T14:00:00Z',
      compliance: ['GDPR', 'CCPA'],
      scope: ['Training Data', 'Inference Data', 'Evaluation Data'],
      requirements: [
        'Data minimization principles',
        'Consent management',
        'Data quality assurance',
        'Retention policy compliance',
        'Cross-border transfer controls'
      ]
    },
    {
      id: 'policy_003',
      name: 'AI Ethics and Fairness Policy',
      description: 'Ethical guidelines and fairness requirements for AI development',
      version: '1.5',
      status: 'under_review',
      approvedBy: 'Ethics Committee',
      approvedAt: '2023-12-15T09:00:00Z',
      nextReview: '2024-01-20T09:00:00Z',
      compliance: ['EU Ethics Guidelines', 'IEEE Standards'],
      scope: ['All AI Applications'],
      requirements: [
        'Bias testing and mitigation',
        'Fairness assessment',
        'Transparency requirements',
        'Human oversight mechanisms',
        'Accountability measures'
      ]
    }
  ];

  const modelInventory = [
    {
      id: 'model_001',
      name: 'Customer Support Bot v2.1',
      type: 'Language Model',
      provider: 'OpenAI',
      model: 'GPT-4',
      status: 'production',
      riskLevel: 'medium',
      owner: 'Sarah Chen',
      deployedAt: '2024-01-10T10:00:00Z',
      lastReview: '2024-01-15T14:00:00Z',
      nextReview: '2024-04-15T14:00:00Z',
      compliance: {
        'Risk Assessment': 'completed',
        'Security Review': 'completed',
        'Ethical Assessment': 'completed',
        'Performance Validation': 'completed'
      },
      governance: {
        'Policy Compliance': 95,
        'Documentation': 92,
        'Monitoring': 98,
        'Access Control': 90
      }
    },
    {
      id: 'model_002',
      name: 'Content Generator v1.3',
      type: 'Language Model',
      provider: 'Anthropic',
      model: 'Claude-3',
      status: 'staging',
      riskLevel: 'high',
      owner: 'Mike Johnson',
      deployedAt: '2024-01-08T16:00:00Z',
      lastReview: '2024-01-12T11:00:00Z',
      nextReview: '2024-02-12T11:00:00Z',
      compliance: {
        'Risk Assessment': 'in_progress',
        'Security Review': 'completed',
        'Ethical Assessment': 'pending',
        'Performance Validation': 'completed'
      },
      governance: {
        'Policy Compliance': 78,
        'Documentation': 85,
        'Monitoring': 88,
        'Access Control': 92
      }
    }
  ];

  const governanceMetrics = [
    {
      name: 'Active Policies',
      value: governancePolicies.filter(p => p.status === 'active').length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Models in Production',
      value: modelInventory.filter(m => m.status === 'production').length,
      change: '0',
      trend: 'stable',
      color: 'green'
    },
    {
      name: 'Compliance Rate',
      value: '89%',
      change: '+4%',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'Pending Reviews',
      value: '3',
      change: '-1',
      trend: 'down',
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'production':
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'staging':
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'under_review':
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive':
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'production':
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'staging':
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'under_review':
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive':
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Model Governance</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive governance framework for AI model lifecycle management</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Policy</span>
        </button>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {governanceMetrics.map((metric, index) => (
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
                <BarChart3 className="w-4 h-4" />
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
            {['policies', 'inventory'].map(tab => (
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
          {activeTab === 'policies' && (
            <div className="space-y-6">
              {governancePolicies.map((policy) => (
                <div key={policy.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{policy.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                          {getStatusIcon(policy.status)}
                          <span className="capitalize">{policy.status.replace('_', ' ')}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          v{policy.version}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{policy.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Approved By</span>
                          <div className="font-medium text-gray-900 dark:text-white">{policy.approvedBy}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Approved Date</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(policy.approvedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Next Review</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(policy.nextReview).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Compliance Frameworks */}
                      <div className="mb-4">
                        <span className="text-xs text-gray-500 dark:text-gray-500">Compliance Frameworks:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {policy.compliance.map((framework, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500">Key Requirements:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {policy.requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {modelInventory.map((model) => (
                <div key={model.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{model.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                          {getStatusIcon(model.status)}
                          <span className="capitalize">{model.status}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(model.riskLevel)}`}>
                          {model.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Model Type</span>
                          <div className="font-medium text-gray-900 dark:text-white">{model.type}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Provider</span>
                          <div className="font-medium text-gray-900 dark:text-white">{model.provider}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Owner</span>
                          <div className="font-medium text-gray-900 dark:text-white">{model.owner}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Next Review</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(model.nextReview).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Compliance Status */}
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Compliance Status</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(model.compliance).map(([requirement, status]) => (
                            <div key={requirement} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                {getStatusIcon(status)}
                              </div>
                              <span className="text-xs text-gray-900 dark:text-white">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Governance Scores */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Governance Scores</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(model.governance).map(([metric, score]) => (
                            <div key={metric} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{score}%</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{metric.replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Governance Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define governance policies for AI model management
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Policy Name *
                  </label>
                  <input
                    type="text"
                    placeholder="My Governance Policy"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Policy Type *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Model Deployment</option>
                    <option>Data Governance</option>
                    <option>Ethics & Fairness</option>
                    <option>Security & Privacy</option>
                    <option>Risk Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe the policy purpose and scope..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Compliance Frameworks
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['NIST RMF', 'EU AI Act', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2'].map(framework => (
                    <label key={framework} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Applicable Scope
                </label>
                <div className="space-y-2">
                  {['All AI Models', 'Production Models Only', 'High-Risk Models', 'Customer-Facing Models'].map(scope => (
                    <label key={scope} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{scope}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Policy will require approval from designated committee
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelGovernance;