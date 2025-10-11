import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  Settings,
  Filter,
  Search,
  Calendar,
  Eye,
  Trash2,
  Plus,
  Mail,
  Slack,
  Webhook,
  Phone
} from 'lucide-react';

const Alerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const alerts = {
    active: [
      {
        id: 'alert_001',
        title: 'High Toxicity Rate Detected',
        description: 'Toxicity rate exceeded 5% threshold in Customer Support Bot',
        severity: 'critical',
        type: 'toxicity',
        application: 'Customer Support Bot',
        metric: 'toxicity_rate',
        threshold: 5,
        currentValue: 7.2,
        triggeredAt: '2024-01-15T10:30:00Z',
        status: 'active',
        acknowledged: false,
        assignedTo: 'Madhu Ronanki'
      },
      {
        id: 'alert_002',
        title: 'Response Quality Degradation',
        description: 'Quality score dropped below 85% in Content Generator',
        severity: 'warning',
        type: 'quality',
        application: 'Content Generator',
        metric: 'quality_score',
        threshold: 85,
        currentValue: 82.1,
        triggeredAt: '2024-01-15T09:15:00Z',
        status: 'active',
        acknowledged: true,
        assignedTo: 'Mike Johnson'
      },
      {
        id: 'alert_003',
        title: 'High Response Latency',
        description: 'Average response time exceeded 3 seconds',
        severity: 'warning',
        type: 'performance',
        application: 'Code Review Assistant',
        metric: 'response_time',
        threshold: 3,
        currentValue: 3.8,
        triggeredAt: '2024-01-15T08:45:00Z',
        status: 'active',
        acknowledged: false,
        assignedTo: 'Alex Kim'
      }
    ],
    resolved: [
      {
        id: 'alert_004',
        title: 'Cost Budget Exceeded',
        description: 'Monthly cost budget exceeded $500 limit',
        severity: 'warning',
        type: 'cost',
        application: 'All Applications',
        metric: 'monthly_cost',
        threshold: 500,
        currentValue: 523.45,
        triggeredAt: '2024-01-14T16:20:00Z',
        resolvedAt: '2024-01-14T18:30:00Z',
        status: 'resolved',
        resolvedBy: 'Emily Davis'
      }
    ]
  };

  const alertRules = [
    {
      id: 'rule_001',
      name: 'Toxicity Threshold Alert',
      description: 'Alert when toxicity rate exceeds 5%',
      metric: 'toxicity_rate',
      condition: 'greater_than',
      threshold: 5,
      severity: 'critical',
      applications: ['Customer Support Bot', 'Content Generator'],
      channels: ['email', 'slack'],
      enabled: true
    },
    {
      id: 'rule_002',
      name: 'Quality Score Alert',
      description: 'Alert when quality score drops below 85%',
      metric: 'quality_score',
      condition: 'less_than',
      threshold: 85,
      severity: 'warning',
      applications: ['All Applications'],
      channels: ['email'],
      enabled: true
    },
    {
      id: 'rule_003',
      name: 'Response Time Alert',
      description: 'Alert when response time exceeds 3 seconds',
      metric: 'response_time',
      condition: 'greater_than',
      threshold: 3,
      severity: 'warning',
      applications: ['All Applications'],
      channels: ['email', 'webhook'],
      enabled: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'toxicity': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'quality': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'performance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cost': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'slack': return <Slack className="w-4 h-4" />;
      case 'webhook': return <Webhook className="w-4 h-4" />;
      case 'sms': return <Phone className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage system alerts and notifications</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Alert Rule</span>
        </button>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{alerts.active.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {alerts.active.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">5</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alert Rules</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{alertRules.length}</p>
            </div>
            <Settings className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Alert Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['active', 'resolved', 'rules'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} {tab === 'rules' ? '' : `(${alerts[tab as keyof typeof alerts]?.length || 0})`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'active' || activeTab === 'resolved' ? (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {alerts[activeTab as keyof typeof alerts].map((alert: any) => (
                  <div key={alert.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                          {getSeverityIcon(alert.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                              <span className="capitalize">{alert.severity}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(alert.type)}`}>
                              {alert.type}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{alert.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                              <div className="font-medium text-gray-900 dark:text-white">{alert.application}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Current Value</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {alert.currentValue}{alert.metric.includes('rate') || alert.metric.includes('score') ? '%' : 
                                 alert.metric.includes('time') ? 's' : 
                                 alert.metric.includes('cost') ? '$' : ''}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Threshold</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {alert.threshold}{alert.metric.includes('rate') || alert.metric.includes('score') ? '%' : 
                                 alert.metric.includes('time') ? 's' : 
                                 alert.metric.includes('cost') ? '$' : ''}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Assigned To</span>
                              <div className="font-medium text-gray-900 dark:text-white">{alert.assignedTo || alert.resolvedBy}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Triggered: {new Date(alert.triggeredAt).toLocaleString()}</span>
                            {alert.resolvedAt && (
                              <span>Resolved: {new Date(alert.resolvedAt).toLocaleString()}</span>
                            )}
                            {alert.acknowledged && (
                              <span className="text-green-600 dark:text-green-400">✓ Acknowledged</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {activeTab === 'active' && (
                          <>
                            <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                              Acknowledge
                            </button>
                            <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/40">
                              Resolve
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Alert Rules */}
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{rule.name}</h3>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                            <span className="capitalize">{rule.severity}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rule.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {rule.enabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rule.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Metric</span>
                            <div className="font-medium text-gray-900 dark:text-white">{rule.metric.replace('_', ' ')}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Condition</span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {rule.condition.replace('_', ' ')} {rule.threshold}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Applications</span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {rule.applications.length === 1 ? rule.applications[0] : `${rule.applications.length} apps`}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Channels</span>
                            <div className="flex items-center space-x-1">
                              {rule.channels.map((channel, index) => (
                                <div key={index} className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                                  {getChannelIcon(channel)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Alert Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Alert Rule</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up automated alerts for your GenAI applications
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rule Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Alert Rule"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Severity *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Critical</option>
                      <option>Warning</option>
                      <option>Info</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe when this alert should trigger..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Condition Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Alert Condition</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Metric *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Quality Score</option>
                      <option>Toxicity Rate</option>
                      <option>Response Time</option>
                      <option>Cost per Query</option>
                      <option>Error Rate</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Condition *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Greater than</option>
                      <option>Less than</option>
                      <option>Equal to</option>
                      <option>Not equal to</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Threshold *
                    </label>
                    <input
                      type="number"
                      placeholder="85"
                      step="0.1"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Application Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Applications</h4>
                
                <div className="space-y-2">
                  {['All Applications', 'Customer Support Bot', 'Content Generator', 'Code Review Assistant'].map(app => (
                    <label key={app} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notification Channels */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Notification Channels</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'email', name: 'Email', icon: Mail },
                    { id: 'slack', name: 'Slack', icon: Slack },
                    { id: 'webhook', name: 'Webhook', icon: Webhook },
                    { id: 'sms', name: 'SMS', icon: Phone }
                  ].map(channel => {
                    const Icon = channel.icon;
                    return (
                      <label key={channel.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{channel.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Create Alert Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;