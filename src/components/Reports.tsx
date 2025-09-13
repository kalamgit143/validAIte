import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Target,
  Mail,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generated');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const reports = {
    generated: [
      {
        id: 'report_001',
        name: 'Weekly Performance Summary',
        description: 'Comprehensive weekly performance analysis across all applications',
        type: 'performance',
        format: 'pdf',
        generatedAt: '2024-01-15T09:00:00Z',
        period: '2024-01-08 to 2024-01-14',
        size: '2.3 MB',
        applications: ['Customer Support Bot', 'Content Generator'],
        metrics: ['quality', 'toxicity', 'cost', 'latency'],
        status: 'completed',
        downloadCount: 12
      },
      {
        id: 'report_002',
        name: 'Monthly Cost Analysis',
        description: 'Detailed cost breakdown and optimization recommendations',
        type: 'cost',
        format: 'excel',
        generatedAt: '2024-01-01T08:00:00Z',
        period: '2023-12-01 to 2023-12-31',
        size: '1.8 MB',
        applications: ['All Applications'],
        metrics: ['cost_per_query', 'total_cost', 'usage_patterns'],
        status: 'completed',
        downloadCount: 8
      },
      {
        id: 'report_003',
        name: 'Quality Assessment Report',
        description: 'In-depth quality analysis with improvement suggestions',
        type: 'quality',
        format: 'pdf',
        generatedAt: '2024-01-14T16:30:00Z',
        period: '2024-01-07 to 2024-01-13',
        size: '3.1 MB',
        applications: ['Customer Support Bot'],
        metrics: ['quality_score', 'user_satisfaction', 'response_accuracy'],
        status: 'completed',
        downloadCount: 15
      }
    ],
    scheduled: [
      {
        id: 'schedule_001',
        name: 'Daily Operations Report',
        description: 'Daily summary of key metrics and alerts',
        type: 'operations',
        format: 'pdf',
        schedule: 'daily',
        nextRun: '2024-01-16T08:00:00Z',
        recipients: ['ops-team@company.com'],
        applications: ['All Applications'],
        metrics: ['quality', 'toxicity', 'cost', 'alerts'],
        enabled: true
      },
      {
        id: 'schedule_002',
        name: 'Weekly Executive Summary',
        description: 'High-level weekly summary for executives',
        type: 'executive',
        format: 'pdf',
        schedule: 'weekly',
        nextRun: '2024-01-22T09:00:00Z',
        recipients: ['executives@company.com'],
        applications: ['All Applications'],
        metrics: ['roi', 'cost_savings', 'performance_trends'],
        enabled: true
      },
      {
        id: 'schedule_003',
        name: 'Monthly Compliance Report',
        description: 'Compliance and safety metrics report',
        type: 'compliance',
        format: 'pdf',
        schedule: 'monthly',
        nextRun: '2024-02-01T10:00:00Z',
        recipients: ['compliance@company.com', 'legal@company.com'],
        applications: ['All Applications'],
        metrics: ['toxicity', 'bias', 'safety_scores'],
        enabled: false
      }
    ]
  };

  const reportTemplates = [
    {
      id: 'template_001',
      name: 'Performance Dashboard',
      description: 'Comprehensive performance metrics and trends',
      category: 'performance',
      metrics: ['quality', 'latency', 'throughput', 'error_rate'],
      visualizations: ['line_charts', 'bar_charts', 'tables']
    },
    {
      id: 'template_002',
      name: 'Cost Analysis',
      description: 'Detailed cost breakdown and optimization insights',
      category: 'cost',
      metrics: ['total_cost', 'cost_per_query', 'usage_patterns'],
      visualizations: ['pie_charts', 'trend_lines', 'cost_tables']
    },
    {
      id: 'template_003',
      name: 'Safety & Compliance',
      description: 'Safety metrics and compliance status',
      category: 'safety',
      metrics: ['toxicity', 'bias', 'content_safety'],
      visualizations: ['safety_scores', 'compliance_tables', 'alert_summaries']
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'cost': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'quality': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'safety': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'compliance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'executive': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'operations': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <BarChart3 className="w-4 h-4" />;
      case 'cost': return <DollarSign className="w-4 h-4" />;
      case 'quality': return <Target className="w-4 h-4" />;
      case 'safety': return <Users className="w-4 h-4" />;
      case 'compliance': return <FileText className="w-4 h-4" />;
      case 'executive': return <TrendingUp className="w-4 h-4" />;
      case 'operations': return <Settings className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
          <p className="text-gray-600 dark:text-gray-400">Generate and manage comprehensive reports</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Report</span>
        </button>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Generated Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.generated.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.scheduled.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {reports.generated.reduce((sum, report) => sum + report.downloadCount, 0)}
              </p>
            </div>
            <Download className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Templates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reportTemplates.length}</p>
            </div>
            <Settings className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['generated', 'scheduled', 'templates'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} {tab !== 'templates' ? `(${reports[tab as keyof typeof reports].length})` : `(${reportTemplates.length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'generated' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Types</option>
                  <option>Performance</option>
                  <option>Cost</option>
                  <option>Quality</option>
                  <option>Safety</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Generated Reports List */}
              <div className="space-y-4">
                {reports.generated.map((report) => (
                  <div key={report.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg ${getTypeColor(report.type)}`}>
                          {getTypeIcon(report.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                              {report.type}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {report.format.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{report.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Period</span>
                              <div className="font-medium text-gray-900 dark:text-white">{report.period}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Generated</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {new Date(report.generatedAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Size</span>
                              <div className="font-medium text-gray-900 dark:text-white">{report.size}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Downloads</span>
                              <div className="font-medium text-gray-900 dark:text-white">{report.downloadCount}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {report.metrics.map((metric, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                {metric.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
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
          )}

          {activeTab === 'scheduled' && (
            <div className="space-y-4">
              {reports.scheduled.map((schedule) => (
                <div key={schedule.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-lg ${getTypeColor(schedule.type)}`}>
                        {getTypeIcon(schedule.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{schedule.name}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(schedule.type)}`}>
                            {schedule.type}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            schedule.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {schedule.enabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{schedule.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Schedule</span>
                            <div className="font-medium text-gray-900 dark:text-white capitalize">{schedule.schedule}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Next Run</span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {new Date(schedule.nextRun).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Recipients</span>
                            <div className="font-medium text-gray-900 dark:text-white">{schedule.recipients.length} recipients</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {schedule.metrics.map((metric, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                              {metric.replace('_', ' ')}
                            </span>
                          ))}
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
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-lg ${getTypeColor(template.category)}`}>
                        {getTypeIcon(template.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.category)}`}>
                            {template.category}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Metrics:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.metrics.map((metric, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                                  {metric.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Visualizations:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.visualizations.map((viz, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded">
                                  {viz.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                        Use Template
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

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Report</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Generate a custom report for your GenAI applications
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Report Type Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Report Type</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportTemplates.map((template) => {
                    const Icon = getTypeIcon(template.category);
                    return (
                      <label key={template.id} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <input type="radio" name="template" className="mt-1" />
                        <div className={`p-2 rounded-lg ${getTypeColor(template.category)}`}>
                          {Icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{template.description}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Report Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Report Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Custom Report"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Format *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                      <option>JSON</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Range *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Applications
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>All Applications</option>
                      <option>Customer Support Bot</option>
                      <option>Content Generator</option>
                      <option>Code Review Assistant</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Metrics Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Metrics to Include</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Quality Score', 'Toxicity Rate', 'Response Time', 'Cost per Query', 'User Satisfaction', 'Error Rate', 'Throughput', 'Bias Score'].map(metric => (
                    <label key={metric} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Delivery Options</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="delivery" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Generate now and download</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="delivery" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email when ready</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="delivery" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Schedule recurring report</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated generation time: 2-5 minutes
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;