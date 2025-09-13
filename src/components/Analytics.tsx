import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, Filter } from 'lucide-react';
import Chart from './Chart';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('quality');
  const [showCustomRangeModal, setShowCustomRangeModal] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: '',
    timezone: 'UTC',
    granularity: 'daily'
  });

  const timeRanges = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metrics = [
    { value: 'quality', label: 'Quality Score' },
    { value: 'toxicity', label: 'Toxicity Rate' },
    { value: 'cost', label: 'Cost Analysis' },
    { value: 'latency', label: 'Response Time' }
  ];

  const chartData = {
    quality: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Quality Score',
        data: [92, 94, 91, 95, 93, 96, 94],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    toxicity: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Toxicity Rate (%)',
        data: [1.2, 0.8, 1.5, 0.9, 1.1, 0.7, 0.8],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }]
    },
    cost: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Daily Cost ($)',
        data: [45, 52, 48, 61, 55, 67, 58],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }]
    },
    latency: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Avg Response Time (s)',
        data: [1.2, 1.1, 1.3, 1.0, 1.2, 0.9, 1.1],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Deep insights into your GenAI application performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Custom Range</span>
          </button>
          <button 
            onClick={() => setShowCustomRangeModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Custom Range</span>
          </button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Avg Quality Score</p>
              <p className="text-2xl font-bold">94.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
          <p className="text-sm text-blue-100 mt-2">↑ 2.3% from last period</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Cost Savings</p>
              <p className="text-2xl font-bold">23%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-200" />
          </div>
          <p className="text-sm text-green-100 mt-2">↓ $127 this week</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Response Time</p>
              <p className="text-2xl font-bold">1.1s</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-200" />
          </div>
          <p className="text-sm text-purple-100 mt-2">↓ 0.2s improvement</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Safety Score</p>
              <p className="text-2xl font-bold">99.2%</p>
            </div>
            <Filter className="w-8 h-8 text-yellow-200" />
          </div>
          <p className="text-sm text-yellow-100 mt-2">↑ 0.8% safer responses</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
          <div className="flex items-center space-x-2">
            {metrics.map(metric => (
              <button
                key={metric.value}
                onClick={() => setSelectedMetric(metric.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === metric.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
        <Chart data={chartData[selectedMetric as keyof typeof chartData]} type="line" height="400px" />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Performance Breakdown</h3>
          <div className="space-y-4">
            {['GPT-4', 'Claude-3', 'Gemini Pro', 'GPT-3.5'].map((model, index) => {
              const performance = [95, 93, 90, 88][index];
              const usage = [45, 25, 20, 10][index];
              return (
                <div key={model} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][index]}`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{model}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{performance}% quality</span>
                    <span>{usage}% usage</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cost Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,247</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">vs Last Month</p>
                <p className="text-sm font-medium text-green-600">-12% ($168 saved)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">Avg per Query</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">$0.045</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">Daily Budget</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">$42.30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Date Range Modal */}
      {showCustomRangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Date Range</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Select a custom date range for analytics data
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Date Range Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Date Range</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={customDateRange.startDate}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={customDateRange.endDate}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={customDateRange.timezone}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT/BST)</option>
                      <option value="Europe/Paris">Paris (CET/CEST)</option>
                      <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                      <option value="Asia/Shanghai">Shanghai (CST)</option>
                      <option value="Asia/Singapore">Singapore (SGT)</option>
                      <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Granularity
                    </label>
                    <select
                      value={customDateRange.granularity}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, granularity: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Range Presets */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Quick Presets</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Last 2 weeks', days: 14 },
                    { label: 'Last month', days: 30 },
                    { label: 'Last quarter', days: 90 },
                    { label: 'Last 6 months', days: 180 },
                    { label: 'Last year', days: 365 },
                    { label: 'Year to date', days: 'ytd' },
                    { label: 'This month', days: 'month' },
                    { label: 'This quarter', days: 'quarter' }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        const now = new Date();
                        const end = now.toISOString().slice(0, 16);
                        let start;
                        
                        if (preset.days === 'ytd') {
                          start = new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 16);
                        } else if (preset.days === 'month') {
                          start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 16);
                        } else if (preset.days === 'quarter') {
                          const quarter = Math.floor(now.getMonth() / 3);
                          start = new Date(now.getFullYear(), quarter * 3, 1).toISOString().slice(0, 16);
                        } else {
                          const startDate = new Date(now);
                          startDate.setDate(startDate.getDate() - (preset.days as number));
                          start = startDate.toISOString().slice(0, 16);
                        }
                        
                        setCustomDateRange(prev => ({ ...prev, startDate: start, endDate: end }));
                      }}
                      className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Advanced Options</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Aggregation
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Average</option>
                      <option>Sum</option>
                      <option>Maximum</option>
                      <option>Minimum</option>
                      <option>Median</option>
                      <option>95th Percentile</option>
                      <option>99th Percentile</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Missing Data Handling
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Interpolate</option>
                      <option>Skip Missing</option>
                      <option>Zero Fill</option>
                      <option>Previous Value</option>
                      <option>Show Gaps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Filter Options
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Applications</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['All Applications', 'Healthcare Triage', 'Financial Lending', 'Enterprise Copilot', 'Government Services', 'Retail Brand Safety'].map(app => (
                          <label key={app} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked={app === 'All Applications'} className="rounded border-gray-300" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{app}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Environments</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Production', 'Staging', 'Development', 'QA', 'UAT'].map(env => (
                          <label key={env} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked={env === 'Production'} className="rounded border-gray-300" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{env}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">User Personas</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['All Users', 'Customers', 'Agents', 'Developers', 'Admins', 'Guests'].map(persona => (
                          <label key={persona} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked={persona === 'All Users'} className="rounded border-gray-300" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{persona}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Comparison Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Compare with previous period</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Show industry benchmarks</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Include confidence intervals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Show statistical significance</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Export & Sharing</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Export Format
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>PDF Report</option>
                      <option>Excel Workbook</option>
                      <option>CSV Data</option>
                      <option>JSON Data</option>
                      <option>PowerBI Dataset</option>
                      <option>Tableau Extract</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Report Template
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Executive Summary</option>
                      <option>Technical Deep Dive</option>
                      <option>Compliance Report</option>
                      <option>Trust Assessment</option>
                      <option>Performance Analysis</option>
                      <option>Custom Template</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Recipients (comma-separated emails)
                  </label>
                  <input
                    type="text"
                    placeholder="cio@company.com, compliance@company.com, ai-team@company.com"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Sharing Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Generate shareable dashboard link</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Schedule recurring reports</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Include raw data download</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Embed in external dashboards</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Trust Metrics Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Trust Metrics Configuration</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Trust Metrics to Include
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Accuracy Score',
                      'Fairness Assessment', 
                      'Robustness Testing',
                      'Transparency Score',
                      'Privacy Compliance',
                      'Safety Validation',
                      'Medical Accuracy',
                      'Financial Compliance',
                      'Clinical Relevance',
                      'Diagnostic Confidence',
                      'Fair Lending Score',
                      'Regulatory Alignment'
                    ].map(metric => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Trust Score Calculation Method
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Weighted Average</option>
                      <option>Minimum Score</option>
                      <option>Harmonic Mean</option>
                      <option>Custom Formula</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confidence Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>90%</option>
                      <option>95%</option>
                      <option>99%</option>
                      <option>99.9%</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Trust Formula (Optional)
                  </label>
                  <textarea
                    placeholder="(accuracy * 0.3) + (fairness * 0.25) + (robustness * 0.2) + (transparency * 0.15) + (privacy * 0.1)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-16 resize-none font-mono text-sm"
                  />
                </div>
              </div>

              {/* Compliance & Governance */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Compliance & Governance</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Compliance Frameworks to Include
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
                      Risk Assessment Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>All Risk Levels</option>
                      <option>High Risk Only</option>
                      <option>Medium & High Risk</option>
                      <option>Critical Risk Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Governance Approval Status
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>All Statuses</option>
                      <option>Approved Only</option>
                      <option>Pending Approval</option>
                      <option>Under Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Purpose & Audience
                  </label>
                  <textarea
                    placeholder="Describe the purpose of this analysis and target audience (e.g., Board presentation, regulatory submission, internal review)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-16 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Custom range will update all charts and metrics • Data processing may take 30-60 seconds
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCustomRangeModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save as Preset
                </button>
                <button 
                  onClick={() => {
                    // Apply the custom range
                    setTimeRange('custom');
                    setShowCustomRangeModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Range
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;