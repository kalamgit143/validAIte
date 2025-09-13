import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  Users,
  Brain,
  Filter,
  Search
} from 'lucide-react';

const Guardrails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const guardrailRules = [
    {
      id: 'rule_001',
      name: 'Toxicity Filter',
      description: 'Block responses with toxicity score above 0.8',
      type: 'content_safety',
      condition: 'toxicity_score > 0.8',
      action: 'block',
      status: 'active',
      applications: ['Customer Support Bot', 'Content Generator'],
      triggeredCount: 23,
      blockedCount: 23,
      lastTriggered: '2024-01-15T10:30:00Z',
      severity: 'high'
    },
    {
      id: 'rule_002',
      name: 'PII Detection',
      description: 'Detect and mask personally identifiable information',
      type: 'privacy',
      condition: 'contains_pii = true',
      action: 'mask',
      status: 'active',
      applications: ['All Applications'],
      triggeredCount: 156,
      blockedCount: 0,
      lastTriggered: '2024-01-15T09:45:00Z',
      severity: 'critical'
    },
    {
      id: 'rule_003',
      name: 'Bias Detection',
      description: 'Flag responses with potential demographic bias',
      type: 'fairness',
      condition: 'bias_score > 0.7',
      action: 'flag',
      status: 'active',
      applications: ['Content Generator'],
      triggeredCount: 8,
      blockedCount: 0,
      lastTriggered: '2024-01-15T08:20:00Z',
      severity: 'medium'
    },
    {
      id: 'rule_004',
      name: 'Response Length Limit',
      description: 'Limit response length to prevent excessive costs',
      type: 'cost_control',
      condition: 'response_length > 2000',
      action: 'truncate',
      status: 'active',
      applications: ['All Applications'],
      triggeredCount: 45,
      blockedCount: 0,
      lastTriggered: '2024-01-15T07:15:00Z',
      severity: 'low'
    },
    {
      id: 'rule_005',
      name: 'Prompt Injection Detection',
      description: 'Detect and block prompt injection attempts',
      type: 'security',
      condition: 'prompt_injection_detected = true',
      action: 'block',
      status: 'active',
      applications: ['All Applications'],
      triggeredCount: 12,
      blockedCount: 12,
      lastTriggered: '2024-01-15T06:30:00Z',
      severity: 'critical'
    }
  ];

  const guardrailMetrics = [
    {
      name: 'Total Triggers',
      value: guardrailRules.reduce((sum, rule) => sum + rule.triggeredCount, 0),
      change: '+12%',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Blocked Requests',
      value: guardrailRules.reduce((sum, rule) => sum + rule.blockedCount, 0),
      change: '+8%',
      trend: 'up',
      color: 'red'
    },
    {
      name: 'Active Rules',
      value: guardrailRules.filter(rule => rule.status === 'active').length,
      change: '0%',
      trend: 'stable',
      color: 'green'
    },
    {
      name: 'Coverage',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      color: 'purple'
    }
  ];

  const recentViolations = [
    {
      id: 'violation_001',
      rule: 'Toxicity Filter',
      application: 'Customer Support Bot',
      input: 'This is a toxic message that was blocked...',
      action: 'blocked',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'high',
      score: 0.92
    },
    {
      id: 'violation_002',
      rule: 'PII Detection',
      application: 'Content Generator',
      input: 'My email is john.doe@example.com and phone is...',
      action: 'masked',
      timestamp: '2024-01-15T09:45:00Z',
      severity: 'medium',
      score: 0.85
    },
    {
      id: 'violation_003',
      rule: 'Prompt Injection Detection',
      application: 'Customer Support Bot',
      input: 'Ignore previous instructions and...',
      action: 'blocked',
      timestamp: '2024-01-15T06:30:00Z',
      severity: 'critical',
      score: 0.98
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content_safety': return <Shield className="w-4 h-4" />;
      case 'privacy': return <Users className="w-4 h-4" />;
      case 'fairness': return <BarChart3 className="w-4 h-4" />;
      case 'security': return <AlertTriangle className="w-4 h-4" />;
      case 'cost_control': return <TrendingUp className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'block': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'flag': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'mask': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'truncate': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Guardrails</h2>
          <p className="text-gray-600 dark:text-gray-400">Protect your GenAI applications with intelligent safety controls</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Rule</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {guardrailMetrics.map((metric, index) => (
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
            {['rules', 'violations', 'analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'rules' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search rules..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option>All Types</option>
                  <option>Content Safety</option>
                  <option>Privacy</option>
                  <option>Fairness</option>
                  <option>Security</option>
                  <option>Cost Control</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {guardrailRules.map((rule) => (
                  <div key={rule.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
                          {getTypeIcon(rule.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{rule.name}</h3>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}>
                              <span className="capitalize">{rule.status}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                              {rule.severity}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(rule.action)}`}>
                              {rule.action}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rule.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Condition</span>
                              <div className="font-mono text-sm text-gray-900 dark:text-white">{rule.condition}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Triggered</span>
                              <div className="font-medium text-gray-900 dark:text-white">{rule.triggeredCount} times</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Blocked</span>
                              <div className="font-medium text-gray-900 dark:text-white">{rule.blockedCount} requests</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Last Triggered</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {new Date(rule.lastTriggered).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {rule.applications.map((app, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                                {app}
                              </span>
                            ))}
                          </div>
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
                          {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
          )}

          {activeTab === 'violations' && (
            <div className="space-y-4">
              {recentViolations.map((violation) => (
                <div key={violation.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{violation.rule}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                          {violation.severity}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(violation.action)}`}>
                          {violation.action}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{violation.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Score</span>
                          <div className="font-medium text-gray-900 dark:text-white">{violation.score}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Timestamp</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(violation.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Action Taken</span>
                          <div className="font-medium text-gray-900 dark:text-white capitalize">{violation.action}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-500">Input:</span>
                        <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">{violation.input}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Rule Effectiveness</h4>
                  <div className="space-y-3">
                    {guardrailRules.slice(0, 3).map((rule, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{rule.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {Math.round((rule.blockedCount / rule.triggeredCount) * 100)}% effective
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Violation Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                      <span className="font-medium text-gray-900 dark:text-white">244 violations</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Week</span>
                      <span className="font-medium text-gray-900 dark:text-white">198 violations</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Change</span>
                      <span className="font-medium text-red-600 dark:text-red-400">+23%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Guardrail Rule</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up intelligent safety controls for your GenAI applications
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Rule Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Rule Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rule Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Guardrail Rule"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rule Type *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Content Safety</option>
                      <option>Privacy</option>
                      <option>Fairness</option>
                      <option>Security</option>
                      <option>Cost Control</option>
                      <option>Trust Threshold</option>
                      <option>Domain Compliance</option>
                      <option>Regulatory Compliance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry Context
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option>General</option>
                    <option>Healthcare (HIPAA)</option>
                    <option>Financial Services (SOX, ECOA)</option>
                    <option>Government (FedRAMP)</option>
                    <option>Enterprise (SOC 2)</option>
                    <option>Retail (PCI DSS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe what this rule does..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Condition Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Trigger Condition</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Metric *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Toxicity Score</option>
                      <option>Bias Score</option>
                      <option>PII Detected</option>
                      <option>Response Length</option>
                      <option>Prompt Injection</option>
                      <option>Trust Score</option>
                      <option>Accuracy Score</option>
                      <option>Fairness Score</option>
                      <option>Safety Score</option>
                      <option>Medical Accuracy</option>
                      <option>Financial Compliance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Operator *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Greater than</option>
                      <option>Less than</option>
                      <option>Equal to</option>
                      <option>Contains</option>
                      <option>Not equal to</option>
                      <option>Between</option>
                      <option>Outside range</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Threshold *
                    </label>
                    <input
                      type="number"
                      placeholder="0.8"
                      step="0.1"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Advanced Condition Logic (Optional)
                  </label>
                  <textarea
                    placeholder="(toxicity_score > 0.8 AND bias_score > 0.7) OR (trust_score < 0.6)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-16 resize-none font-mono text-sm"
                  />
                </div>
              </div>

              {/* Action Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Action to Take</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'block', name: 'Block', description: 'Block the request completely' },
                    { id: 'flag', name: 'Flag', description: 'Flag for human review' },
                    { id: 'mask', name: 'Mask', description: 'Mask sensitive content' },
                    { id: 'truncate', name: 'Truncate', description: 'Truncate long responses' },
                    { id: 'escalate', name: 'Escalate', description: 'Escalate to human expert' },
                    { id: 'fallback', name: 'Fallback', description: 'Use fallback model' },
                    { id: 'retry', name: 'Retry', description: 'Retry with different parameters' },
                    { id: 'log_only', name: 'Log Only', description: 'Log incident without blocking' }
                  ].map(action => (
                    <label key={action.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <input type="radio" name="action" className="mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{action.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{action.description}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Action Configuration (JSON)
                  </label>
                  <textarea
                    placeholder={`{
  "webhook_url": "https://api.company.com/alerts",
  "escalation_email": "security@company.com",
  "retry_count": 3,
  "fallback_model": "gpt-3.5-turbo"
}`}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none font-mono text-sm"
                  />
                </div>
              </div>

              {/* Governance & Approval */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Governance & Approval</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rule Severity
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Approval Required
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>None</option>
                      <option>QA Lead</option>
                      <option>CISO</option>
                      <option>CIO</option>
                      <option>Ethics Committee</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Justification
                  </label>
                  <textarea
                    placeholder="Explain the business need for this guardrail and its expected impact..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-16 resize-none"
                  />
                </div>
              </div>

              {/* Application Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Applications</h4>
                
                <div className="space-y-2">
                  {['All Applications', 'Healthcare Triage Assistant', 'Financial Lending Copilot', 'SAP Enterprise Copilot', 'Government Citizen Services', 'Retail Brand Safety Assistant'].map(app => (
                    <label key={app} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Environment Scope
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Development', 'QA', 'UAT', 'Production', 'Sandbox'].map(env => (
                      <label key={env} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={env === 'Production'} className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{env}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields • Rule will be active immediately upon creation
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Test Rule
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Create Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guardrails;