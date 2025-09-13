import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle, 
  XCircle, 
  Clock,
  Brain,
  BarChart3,
  FileText,
  Users,
  Shield,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  Edit,
  Download,
  Plus,
  Filter,
  Search,
  Calendar,
  TrendingUp
} from 'lucide-react';

const ModelValidation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('validations');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const validationTests = [
    {
      id: 'val_001',
      name: 'EU AI Act Conformity Assessment',
      application: 'Customer Support Bot',
      type: 'conformity',
      status: 'completed',
      framework: 'EU AI Act',
      riskClass: 'Limited Risk',
      completedAt: '2024-01-15T10:00:00Z',
      validatedBy: 'External Auditor',
      certificate: 'EU-CONF-2024-001',
      validUntil: '2025-01-15T10:00:00Z',
      requirements: [
        { id: 'REQ-1', name: 'Transparency obligations', status: 'passed' },
        { id: 'REQ-2', name: 'Human oversight', status: 'passed' },
        { id: 'REQ-3', name: 'Accuracy requirements', status: 'passed' },
        { id: 'REQ-4', name: 'Robustness testing', status: 'passed' }
      ]
    },
    {
      id: 'val_002',
      name: 'High-Risk AI System Validation',
      application: 'Content Generator',
      type: 'high_risk',
      status: 'in_progress',
      framework: 'EU AI Act',
      riskClass: 'High Risk',
      startedAt: '2024-01-10T09:00:00Z',
      progress: 65,
      validatedBy: 'Internal Team',
      requirements: [
        { id: 'REQ-5', name: 'Risk management system', status: 'passed' },
        { id: 'REQ-6', name: 'Data governance', status: 'passed' },
        { id: 'REQ-7', name: 'Technical documentation', status: 'in_progress' },
        { id: 'REQ-8', name: 'Record keeping', status: 'pending' },
        { id: 'REQ-9', name: 'Transparency measures', status: 'pending' },
        { id: 'REQ-10', name: 'Human oversight measures', status: 'in_progress' }
      ]
    }
  ];

  const validationMetrics = [
    {
      name: 'Active Validations',
      value: validationTests.filter(v => v.status === 'in_progress').length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Completed Validations',
      value: validationTests.filter(v => v.status === 'completed').length,
      change: '+2',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Compliance Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'Valid Certificates',
      value: '3',
      change: '0',
      trend: 'stable',
      color: 'yellow'
    }
  ];

  const validationRequirements = [
    {
      category: 'Technical Documentation',
      requirements: [
        'Model architecture documentation',
        'Training data documentation',
        'Performance metrics documentation',
        'Risk assessment documentation'
      ],
      compliance: 85
    },
    {
      category: 'Data Governance',
      requirements: [
        'Data quality management',
        'Data lineage tracking',
        'Bias detection in datasets',
        'Data protection measures'
      ],
      compliance: 92
    },
    {
      category: 'Human Oversight',
      requirements: [
        'Human-in-the-loop processes',
        'Override mechanisms',
        'Escalation procedures',
        'Human review protocols'
      ],
      compliance: 78
    },
    {
      category: 'Transparency',
      requirements: [
        'Model explainability',
        'Decision transparency',
        'User notification systems',
        'Audit trail maintenance'
      ],
      compliance: 73
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Play className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRiskClassColor = (riskClass: string) => {
    switch (riskClass) {
      case 'High Risk': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Limited Risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Minimal Risk': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Model Validation</h2>
          <p className="text-gray-600 dark:text-gray-400">EU TEVV-compliant model validation and verification</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Validation</span>
        </button>
      </div>

      {/* Validation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {validationMetrics.map((metric, index) => (
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
            {['validations', 'requirements'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'validations' && (
            <div className="space-y-6">
              {validationTests.map((validation) => (
                <div key={validation.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{validation.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(validation.status)}`}>
                          {getStatusIcon(validation.status)}
                          <span className="capitalize">{validation.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskClassColor(validation.riskClass)}`}>
                          {validation.riskClass}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{validation.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Framework</span>
                          <div className="font-medium text-gray-900 dark:text-white">{validation.framework}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Validated By</span>
                          <div className="font-medium text-gray-900 dark:text-white">{validation.validatedBy}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {validation.status === 'completed' ? 'Valid Until' : 'Progress'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {validation.status === 'completed' 
                              ? new Date(validation.validUntil!).toLocaleDateString()
                              : `${validation.progress}%`
                            }
                          </div>
                        </div>
                      </div>

                      {validation.certificate && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <strong>Certificate:</strong> {validation.certificate}
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Validation Requirements</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {validation.requirements.map((req) => (
                            <div key={req.id} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                {getStatusIcon(req.status)}
                              </div>
                              <span className="text-sm text-gray-900 dark:text-white">{req.id}: {req.name}</span>
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

          {activeTab === 'requirements' && (
            <div className="space-y-6">
              {validationRequirements.map((category) => (
                <div key={category.category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                    <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
                      category.compliance >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      category.compliance >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {category.compliance}%
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {category.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        category.compliance >= 90 ? 'bg-green-500' :
                        category.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.compliance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Validation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Model Validation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up EU TEVV-compliant model validation process
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Validation Name *
                  </label>
                  <input
                    type="text"
                    placeholder="My Model Validation"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Customer Support Bot</option>
                    <option>Content Generator</option>
                    <option>Code Review Assistant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Validation Type *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Conformity Assessment</option>
                    <option>High-Risk AI Validation</option>
                    <option>Limited Risk Validation</option>
                    <option>Custom Validation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Classification *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>High Risk</option>
                    <option>Limited Risk</option>
                    <option>Minimal Risk</option>
                    <option>Unacceptable Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Validation Requirements
                </label>
                <div className="space-y-2">
                  {[
                    'Technical Documentation Review',
                    'Data Governance Assessment',
                    'Human Oversight Validation',
                    'Transparency Requirements',
                    'Risk Management System',
                    'Conformity Assessment'
                  ].map(req => (
                    <label key={req} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated duration: 2-4 weeks
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Start Validation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelValidation;