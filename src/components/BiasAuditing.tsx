import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Eye,
  Play,
  Download,
  Plus,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Target,
  Shield,
  Brain,
  Activity,
  FileText
} from 'lucide-react';

const BiasAuditing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audits');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const biasAudits = [
    {
      id: 'bias_001',
      name: 'Gender Bias Assessment',
      application: 'Customer Support Bot',
      status: 'completed',
      auditor: 'Fairness Team',
      completedAt: '2024-01-15T10:00:00Z',
      overallScore: 8.2,
      demographics: {
        'Gender': { score: 7.8, bias_detected: true, severity: 'medium' },
        'Age': { score: 8.5, bias_detected: false, severity: 'low' },
        'Ethnicity': { score: 8.0, bias_detected: true, severity: 'low' },
        'Geography': { score: 8.8, bias_detected: false, severity: 'low' }
      },
      metrics: {
        'Demographic Parity': 0.85,
        'Equal Opportunity': 0.82,
        'Equalized Odds': 0.79,
        'Calibration': 0.88
      },
      recommendations: [
        'Increase training data diversity for gender representation',
        'Implement bias mitigation techniques in preprocessing',
        'Add fairness constraints to model training'
      ]
    },
    {
      id: 'bias_002',
      name: 'Comprehensive Fairness Audit',
      application: 'Content Generator',
      status: 'in_progress',
      auditor: 'External Auditor',
      startedAt: '2024-01-12T09:00:00Z',
      progress: 65,
      demographics: {
        'Gender': { score: 6.5, bias_detected: true, severity: 'high' },
        'Age': { score: 7.2, bias_detected: true, severity: 'medium' },
        'Ethnicity': { score: 6.8, bias_detected: true, severity: 'high' },
        'Geography': { score: 7.5, bias_detected: true, severity: 'medium' },
        'Socioeconomic': { score: 7.0, bias_detected: true, severity: 'medium' }
      }
    }
  ];

  const biasMetrics = [
    {
      name: 'Active Audits',
      value: biasAudits.filter(a => a.status === 'in_progress').length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Bias Issues Found',
      value: '7',
      change: '+2',
      trend: 'up',
      color: 'red'
    },
    {
      name: 'Avg Fairness Score',
      value: '7.6/10',
      change: '+0.3',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Mitigations Applied',
      value: '12',
      change: '+3',
      trend: 'up',
      color: 'purple'
    }
  ];

  const fairnessMetrics = [
    {
      id: 'demographic_parity',
      name: 'Demographic Parity',
      description: 'Equal positive prediction rates across groups',
      formula: 'P(Ŷ=1|A=a) = P(Ŷ=1|A=b)',
      threshold: 0.8,
      currentValue: 0.85,
      status: 'passing'
    },
    {
      id: 'equal_opportunity',
      name: 'Equal Opportunity',
      description: 'Equal true positive rates across groups',
      formula: 'P(Ŷ=1|Y=1,A=a) = P(Ŷ=1|Y=1,A=b)',
      threshold: 0.8,
      currentValue: 0.82,
      status: 'passing'
    },
    {
      id: 'equalized_odds',
      name: 'Equalized Odds',
      description: 'Equal TPR and FPR across groups',
      formula: 'TPR_a = TPR_b and FPR_a = FPR_b',
      threshold: 0.8,
      currentValue: 0.79,
      status: 'failing'
    },
    {
      id: 'calibration',
      name: 'Calibration',
      description: 'Equal positive predictive values across groups',
      formula: 'P(Y=1|Ŷ=1,A=a) = P(Y=1|Ŷ=1,A=b)',
      threshold: 0.8,
      currentValue: 0.88,
      status: 'passing'
    }
  ];

  const biasDetectionTools = [
    {
      name: 'Fairlearn',
      description: 'Microsoft\'s fairness assessment and mitigation toolkit',
      status: 'active',
      lastRun: '2024-01-15T08:00:00Z',
      metrics: ['Demographic Parity', 'Equal Opportunity']
    },
    {
      name: 'AI Fairness 360',
      description: 'IBM\'s comprehensive bias detection and mitigation library',
      status: 'active',
      lastRun: '2024-01-15T06:00:00Z',
      metrics: ['Equalized Odds', 'Calibration', 'Individual Fairness']
    },
    {
      name: 'What-If Tool',
      description: 'Google\'s visual interface for bias analysis',
      status: 'configured',
      lastRun: '2024-01-14T14:00:00Z',
      metrics: ['Counterfactual Fairness', 'Feature Attribution']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passing':
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
      case 'configured': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'failing': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passing': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Activity className="w-4 h-4" />;
      case 'failing': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bias Auditing</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive bias detection and fairness assessment</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Bias Audit</span>
        </button>
      </div>

      {/* Bias Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {biasMetrics.map((metric, index) => (
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
            {['audits', 'metrics', 'tools'].map(tab => (
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
          {activeTab === 'audits' && (
            <div className="space-y-6">
              {biasAudits.map((audit) => (
                <div key={audit.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{audit.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                          {getStatusIcon(audit.status)}
                          <span className="capitalize">{audit.status.replace('_', ' ')}</span>
                        </div>
                        {audit.overallScore && (
                          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            Score: {audit.overallScore}/10
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{audit.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Auditor</span>
                          <div className="font-medium text-gray-900 dark:text-white">{audit.auditor}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {audit.status === 'completed' ? 'Completed' : 'Progress'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {audit.status === 'completed' 
                              ? new Date(audit.completedAt!).toLocaleDateString()
                              : `${audit.progress}%`
                            }
                          </div>
                        </div>
                      </div>

                      {/* Demographics Analysis */}
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Demographic Analysis</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(audit.demographics).map(([demo, data]: [string, any]) => (
                            <div key={demo} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{data.score}/10</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{demo}</div>
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSeverityColor(data.severity)}`}>
                                {data.bias_detected ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                <span>{data.severity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fairness Metrics */}
                      {audit.metrics && (
                        <div className="space-y-3 mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Fairness Metrics</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(audit.metrics).map(([metric, value]) => (
                              <div key={metric} className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{value}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">{metric}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {audit.recommendations && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {audit.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {fairnessMetrics.map((metric) => (
                <div key={metric.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getStatusColor(metric.status)}`}>
                      {metric.currentValue.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-500">Formula:</span>
                    <code className="block text-sm text-gray-800 dark:text-gray-200 mt-1 font-mono">
                      {metric.formula}
                    </code>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Threshold: {metric.threshold} | Current: {metric.currentValue.toFixed(2)}
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {getStatusIcon(metric.status)}
                      <span className="capitalize">{metric.status}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.currentValue >= metric.threshold ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((metric.currentValue / 1) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-4">
              {biasDetectionTools.map((tool, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                          {getStatusIcon(tool.status)}
                          <span className="capitalize">{tool.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tool.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Last run: {new Date(tool.lastRun).toLocaleString()}</span>
                        <div className="flex flex-wrap gap-1">
                          {tool.metrics.map((metric, metricIndex) => (
                            <span key={metricIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40">
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

      {/* Create Bias Audit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Bias Audit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up comprehensive bias detection and fairness assessment
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Audit Name *
                  </label>
                  <input
                    type="text"
                    placeholder="My Bias Audit"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Demographic Groups to Analyze
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Gender', 'Age', 'Ethnicity', 'Geography', 'Socioeconomic', 'Religion'].map(demo => (
                    <label key={demo} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{demo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Fairness Metrics
                </label>
                <div className="space-y-2">
                  {fairnessMetrics.map(metric => (
                    <label key={metric.id} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{metric.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated duration: 1-3 days
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Start Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasAuditing;