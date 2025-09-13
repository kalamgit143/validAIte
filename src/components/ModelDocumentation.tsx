import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Edit, 
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  Brain,
  Database,
  Shield,
  Target,
  BarChart3,
  Code,
  Globe
} from 'lucide-react';

const ModelDocumentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('model_cards');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const modelCards = [
    {
      id: 'card_001',
      modelName: 'Customer Support Bot v2.1',
      application: 'Customer Support Bot',
      version: '2.1.0',
      status: 'complete',
      lastUpdated: '2024-01-15T10:00:00Z',
      updatedBy: 'Sarah Chen',
      completeness: 95,
      sections: {
        'Model Details': { status: 'complete', lastUpdated: '2024-01-15T10:00:00Z' },
        'Intended Use': { status: 'complete', lastUpdated: '2024-01-15T09:30:00Z' },
        'Training Data': { status: 'complete', lastUpdated: '2024-01-14T16:00:00Z' },
        'Evaluation Data': { status: 'complete', lastUpdated: '2024-01-14T15:30:00Z' },
        'Performance Metrics': { status: 'complete', lastUpdated: '2024-01-15T08:00:00Z' },
        'Ethical Considerations': { status: 'partial', lastUpdated: '2024-01-12T14:00:00Z' },
        'Limitations': { status: 'complete', lastUpdated: '2024-01-13T11:00:00Z' },
        'Recommendations': { status: 'complete', lastUpdated: '2024-01-13T11:30:00Z' }
      },
      compliance: ['EU AI Act', 'NIST RMF', 'Model Card Standard']
    },
    {
      id: 'card_002',
      modelName: 'Content Generator v1.3',
      application: 'Content Generator',
      version: '1.3.0',
      status: 'in_progress',
      lastUpdated: '2024-01-12T14:00:00Z',
      updatedBy: 'Mike Johnson',
      completeness: 72,
      sections: {
        'Model Details': { status: 'complete', lastUpdated: '2024-01-12T14:00:00Z' },
        'Intended Use': { status: 'complete', lastUpdated: '2024-01-12T13:30:00Z' },
        'Training Data': { status: 'partial', lastUpdated: '2024-01-10T16:00:00Z' },
        'Evaluation Data': { status: 'pending', lastUpdated: null },
        'Performance Metrics': { status: 'complete', lastUpdated: '2024-01-11T10:00:00Z' },
        'Ethical Considerations': { status: 'pending', lastUpdated: null },
        'Limitations': { status: 'partial', lastUpdated: '2024-01-09T15:00:00Z' },
        'Recommendations': { status: 'pending', lastUpdated: null }
      },
      compliance: ['EU AI Act', 'Model Card Standard']
    }
  ];

  const documentationTemplates = [
    {
      id: 'template_001',
      name: 'EU AI Act Model Card',
      description: 'Comprehensive model documentation for EU AI Act compliance',
      framework: 'EU AI Act',
      sections: [
        'General Information',
        'Intended Purpose',
        'Risk Assessment',
        'Data Governance',
        'Technical Specifications',
        'Performance Metrics',
        'Limitations & Risks',
        'Human Oversight'
      ],
      mandatory: true
    },
    {
      id: 'template_002',
      name: 'NIST AI RMF Documentation',
      description: 'Risk management framework documentation template',
      framework: 'NIST RMF',
      sections: [
        'System Overview',
        'Risk Assessment',
        'Governance Structure',
        'Monitoring & Measurement',
        'Risk Treatment',
        'Incident Response'
      ],
      mandatory: true
    },
    {
      id: 'template_003',
      name: 'Standard Model Card',
      description: 'Industry standard model card template',
      framework: 'Model Card Standard',
      sections: [
        'Model Details',
        'Intended Use',
        'Factors',
        'Metrics',
        'Evaluation Data',
        'Training Data',
        'Quantitative Analyses',
        'Ethical Considerations',
        'Caveats and Recommendations'
      ],
      mandatory: false
    }
  ];

  const documentationMetrics = [
    {
      name: 'Model Cards',
      value: modelCards.length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Avg Completeness',
      value: `${Math.round(modelCards.reduce((sum, card) => sum + card.completeness, 0) / modelCards.length)}%`,
      change: '+5%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Complete Cards',
      value: modelCards.filter(card => card.status === 'complete').length,
      change: '0',
      trend: 'stable',
      color: 'purple'
    },
    {
      name: 'Compliance Rate',
      value: '89%',
      change: '+3%',
      trend: 'up',
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
      case 'partial': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'outdated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'outdated': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'EU AI Act': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'NIST RMF': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Model Card Standard': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Model Documentation</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive model cards and documentation for compliance</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Model Card</span>
        </button>
      </div>

      {/* Documentation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {documentationMetrics.map((metric, index) => (
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
            {['model_cards', 'templates'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'model_cards' && (
            <div className="space-y-6">
              {modelCards.map((card) => (
                <div key={card.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{card.modelName}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                          {getStatusIcon(card.status)}
                          <span className="capitalize">{card.status.replace('_', ' ')}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          v{card.version}
                        </span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.completeness >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          card.completeness >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {card.completeness}% complete
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{card.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Last Updated</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(card.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Updated By</span>
                          <div className="font-medium text-gray-900 dark:text-white">{card.updatedBy}</div>
                        </div>
                      </div>

                      {/* Documentation Sections */}
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Documentation Sections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(card.sections).map(([section, data]: [string, any]) => (
                            <div key={section} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                                  {getStatusIcon(data.status)}
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white">{section}</span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {data.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'Pending'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Compliance Frameworks */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {card.compliance.map((framework, index) => (
                          <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${getFrameworkColor(framework)}`}>
                            {framework}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            card.completeness >= 90 ? 'bg-green-500' :
                            card.completeness >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${card.completeness}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
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

          {activeTab === 'templates' && (
            <div className="space-y-4">
              {documentationTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(template.framework)}`}>
                          {template.framework}
                        </div>
                        {template.mandatory && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                            Mandatory
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Required Sections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {template.sections.map((section, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-sm text-gray-900 dark:text-white">{section}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                        Use Template
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
        </div>
      </div>

      {/* Create Model Card Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Model Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create comprehensive documentation for your AI model
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    placeholder="My AI Model v1.0"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Customer Support Bot</option>
                    <option>Content Generator</option>
                    <option>Code Review Assistant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Documentation Template
                </label>
                <div className="space-y-2">
                  {documentationTemplates.map(template => (
                    <label key={template.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input type="radio" name="template" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">{template.name}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getFrameworkColor(template.framework)}`}>
                            {template.framework}
                          </span>
                          {template.mandatory && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                              Mandatory
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model Version
                </label>
                <input
                  type="text"
                  placeholder="1.0.0"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Documentation will be created based on selected template
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Model Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDocumentation;