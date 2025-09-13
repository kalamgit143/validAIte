import React, { useState } from 'react';
import { 
  Eye, 
  FileText, 
  Clock, 
  User,
  Settings,
  Shield,
  Database,
  Activity,
  Download,
  Filter,
  Search,
  Calendar,
  Lock,
  Unlock,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const AuditTrail: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const auditEvents = [
    {
      id: 'audit_001',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'sarah.chen@company.com',
      action: 'model_deployment',
      category: 'model_management',
      resource: 'Customer Support Bot v2.1',
      details: 'Deployed GPT-4 model to production environment',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'high',
      compliance: ['NIST RMF', 'EU AI Act'],
      metadata: {
        model_id: 'gpt-4-turbo',
        environment: 'production',
        approval_id: 'APPR-2024-001'
      }
    },
    {
      id: 'audit_002',
      timestamp: '2024-01-15T09:45:00Z',
      user: 'mike.johnson@company.com',
      action: 'risk_assessment_update',
      category: 'risk_management',
      resource: 'Content Generator Risk Assessment',
      details: 'Updated risk score from 7.2 to 8.1 based on new evaluation results',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7)',
      severity: 'medium',
      compliance: ['NIST RMF'],
      metadata: {
        previous_score: 7.2,
        new_score: 8.1,
        assessment_id: 'RISK-2024-002'
      }
    },
    {
      id: 'audit_003',
      timestamp: '2024-01-15T08:20:00Z',
      user: 'alex.kim@company.com',
      action: 'data_access',
      category: 'data_governance',
      resource: 'Customer Support Dataset v2',
      details: 'Accessed customer support dataset for model evaluation',
      ipAddress: '172.16.0.25',
      userAgent: 'Python/3.9 requests/2.28.1',
      severity: 'medium',
      compliance: ['GDPR', 'CCPA'],
      metadata: {
        dataset_id: 'ds_customer_support_v2',
        access_type: 'read',
        purpose: 'model_evaluation'
      }
    },
    {
      id: 'audit_004',
      timestamp: '2024-01-15T07:15:00Z',
      user: 'system@company.com',
      action: 'automated_evaluation',
      category: 'evaluation',
      resource: 'Bias Detection Pipeline',
      details: 'Automated bias evaluation completed for all active models',
      ipAddress: '10.0.1.100',
      userAgent: 'GenAI-Platform/1.0',
      severity: 'low',
      compliance: ['EU TEVV'],
      metadata: {
        models_evaluated: 3,
        bias_scores: [0.12, 0.08, 0.15],
        evaluation_id: 'EVAL-2024-015'
      }
    },
    {
      id: 'audit_005',
      timestamp: '2024-01-15T06:30:00Z',
      user: 'emily.davis@company.com',
      action: 'compliance_review',
      category: 'compliance',
      resource: 'EU AI Act Compliance Status',
      details: 'Reviewed and updated EU AI Act compliance documentation',
      ipAddress: '192.168.1.75',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'high',
      compliance: ['EU AI Act'],
      metadata: {
        compliance_score: 82,
        requirements_updated: 4,
        review_id: 'REV-2024-003'
      }
    }
  ];

  const auditCategories = [
    { id: 'all', name: 'All Categories', count: auditEvents.length },
    { id: 'model_management', name: 'Model Management', count: 1 },
    { id: 'risk_management', name: 'Risk Management', count: 1 },
    { id: 'data_governance', name: 'Data Governance', count: 1 },
    { id: 'evaluation', name: 'Evaluation', count: 1 },
    { id: 'compliance', name: 'Compliance', count: 1 }
  ];

  const auditMetrics = [
    {
      name: 'Total Events',
      value: auditEvents.length.toString(),
      change: '+12',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'High Severity',
      value: auditEvents.filter(e => e.severity === 'high').length.toString(),
      change: '+2',
      trend: 'up',
      color: 'red'
    },
    {
      name: 'Compliance Events',
      value: auditEvents.filter(e => e.category === 'compliance').length.toString(),
      change: '+1',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Unique Users',
      value: new Set(auditEvents.map(e => e.user)).size.toString(),
      change: '0',
      trend: 'stable',
      color: 'purple'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'model_management': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'risk_management': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'data_governance': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'evaluation': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'compliance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'model_deployment': return <Database className="w-4 h-4" />;
      case 'risk_assessment_update': return <Shield className="w-4 h-4" />;
      case 'data_access': return <Lock className="w-4 h-4" />;
      case 'automated_evaluation': return <Activity className="w-4 h-4" />;
      case 'compliance_review': return <FileText className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      event.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.resource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Trail</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive audit logging for compliance and governance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Audit Log</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configure Logging</span>
          </button>
        </div>
      </div>

      {/* Audit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {auditMetrics.map((metric, index) => (
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

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search audit events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {auditCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>

          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Audit Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-lg ${getCategoryColor(event.category)}`}>
                    {getActionIcon(event.action)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{event.resource}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category.replace('_', ' ')}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">{event.details}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">User</span>
                        <div className="font-medium text-gray-900 dark:text-white">{event.user}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Timestamp</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">IP Address</span>
                        <div className="font-mono text-sm text-gray-900 dark:text-white">{event.ipAddress}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Action</span>
                        <div className="font-medium text-gray-900 dark:text-white">{event.action.replace('_', ' ')}</div>
                      </div>
                    </div>
                    
                    {/* Compliance Frameworks */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.compliance.map((framework, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                          {framework}
                        </span>
                      ))}
                    </div>
                    
                    {/* Metadata */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Metadata:</span>
                      <pre className="text-xs text-gray-800 dark:text-gray-200 mt-1">
                        {JSON.stringify(event.metadata, null, 2)}
                      </pre>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Configuration */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Audit Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Retention Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Audit log retention</span>
                <select className="px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                  <option>7 years</option>
                  <option>5 years</option>
                  <option>3 years</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Archive old logs</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Logging Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Real-time logging</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Include metadata</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;