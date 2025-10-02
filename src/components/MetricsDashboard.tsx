import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react';

interface MetricData {
  name: string;
  code: string;
  value: number;
  threshold: number;
  unit: string;
  passed: boolean;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  history: { timestamp: string; value: number }[];
  category: string;
}

const MetricsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const metrics: MetricData[] = [
    {
      name: 'Groundedness',
      code: 'GRD',
      value: 0.92,
      threshold: 0.90,
      unit: 'score',
      passed: true,
      trend: 'up',
      trendValue: 2.3,
      category: 'Quality',
      history: [
        { timestamp: '2025-09-25', value: 0.89 },
        { timestamp: '2025-09-26', value: 0.90 },
        { timestamp: '2025-09-27', value: 0.91 },
        { timestamp: '2025-09-28', value: 0.90 },
        { timestamp: '2025-09-29', value: 0.91 },
        { timestamp: '2025-09-30', value: 0.92 },
        { timestamp: '2025-10-01', value: 0.92 },
        { timestamp: '2025-10-02', value: 0.92 }
      ]
    },
    {
      name: 'Citation Accuracy',
      code: 'CIT',
      value: 0.96,
      threshold: 0.95,
      unit: 'score',
      passed: true,
      trend: 'stable',
      trendValue: 0.0,
      category: 'Quality',
      history: [
        { timestamp: '2025-09-25', value: 0.96 },
        { timestamp: '2025-09-26', value: 0.96 },
        { timestamp: '2025-09-27', value: 0.95 },
        { timestamp: '2025-09-28', value: 0.96 },
        { timestamp: '2025-09-29', value: 0.96 },
        { timestamp: '2025-09-30', value: 0.96 },
        { timestamp: '2025-10-01', value: 0.96 },
        { timestamp: '2025-10-02', value: 0.96 }
      ]
    },
    {
      name: 'Recall@5',
      code: 'R@5',
      value: 0.86,
      threshold: 0.85,
      unit: 'score',
      passed: true,
      trend: 'down',
      trendValue: -1.1,
      category: 'Retrieval',
      history: [
        { timestamp: '2025-09-25', value: 0.88 },
        { timestamp: '2025-09-26', value: 0.87 },
        { timestamp: '2025-09-27', value: 0.87 },
        { timestamp: '2025-09-28', value: 0.86 },
        { timestamp: '2025-09-29', value: 0.87 },
        { timestamp: '2025-09-30', value: 0.86 },
        { timestamp: '2025-10-01', value: 0.86 },
        { timestamp: '2025-10-02', value: 0.86 }
      ]
    },
    {
      name: 'Freshness Lag',
      code: 'FRS',
      value: 2.0,
      threshold: 3.0,
      unit: 'days',
      passed: true,
      trend: 'up',
      trendValue: 25.0,
      category: 'Operational',
      history: [
        { timestamp: '2025-09-25', value: 1.5 },
        { timestamp: '2025-09-26', value: 1.6 },
        { timestamp: '2025-09-27', value: 1.8 },
        { timestamp: '2025-09-28', value: 1.9 },
        { timestamp: '2025-09-29', value: 2.0 },
        { timestamp: '2025-09-30', value: 2.1 },
        { timestamp: '2025-10-01', value: 2.0 },
        { timestamp: '2025-10-02', value: 2.0 }
      ]
    },
    {
      name: 'Tool Policy Violations',
      code: 'TPV',
      value: 0.5,
      threshold: 1.0,
      unit: '/1000',
      passed: true,
      trend: 'stable',
      trendValue: 0.0,
      category: 'Security',
      history: [
        { timestamp: '2025-09-25', value: 0.4 },
        { timestamp: '2025-09-26', value: 0.5 },
        { timestamp: '2025-09-27', value: 0.5 },
        { timestamp: '2025-09-28', value: 0.6 },
        { timestamp: '2025-09-29', value: 0.5 },
        { timestamp: '2025-09-30', value: 0.5 },
        { timestamp: '2025-10-01', value: 0.5 },
        { timestamp: '2025-10-02', value: 0.5 }
      ]
    },
    {
      name: 'Audit Completeness',
      code: 'AUD',
      value: 0.995,
      threshold: 0.99,
      unit: 'score',
      passed: true,
      trend: 'stable',
      trendValue: 0.0,
      category: 'Compliance',
      history: [
        { timestamp: '2025-09-25', value: 0.995 },
        { timestamp: '2025-09-26', value: 0.994 },
        { timestamp: '2025-09-27', value: 0.995 },
        { timestamp: '2025-09-28', value: 0.995 },
        { timestamp: '2025-09-29', value: 0.996 },
        { timestamp: '2025-09-30', value: 0.995 },
        { timestamp: '2025-10-01', value: 0.995 },
        { timestamp: '2025-10-02', value: 0.995 }
      ]
    }
  ];

  const categories = ['all', 'Quality', 'Retrieval', 'Security', 'Compliance', 'Operational'];

  const filteredMetrics = metrics.filter(m =>
    categoryFilter === 'all' || m.category === categoryFilter
  );

  const renderSparkline = (history: { timestamp: string; value: number }[]) => {
    const maxValue = Math.max(...history.map(h => h.value));
    const minValue = Math.min(...history.map(h => h.value));
    const range = maxValue - minValue || 1;

    return (
      <svg className="w-full h-12" viewBox="0 0 100 20" preserveAspectRatio="none">
        <polyline
          points={history
            .map((h, i) => {
              const x = (i / (history.length - 1)) * 100;
              const y = 20 - ((h.value - minValue) / range) * 18;
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-600 dark:text-blue-400"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Metrics Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Real-time trust metrics monitoring for Insurance Policy Advisor
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredMetrics.map(metric => (
              <div
                key={metric.code}
                className={`p-6 rounded-lg border-2 ${
                  metric.passed
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{metric.code}</p>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{metric.name}</h3>
                  </div>
                  {metric.passed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{metric.unit}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Threshold: {metric.unit === 'days' || metric.unit === '/1000' || metric.unit === '/KLOC' ? '≤' : '≥'} {metric.threshold}
                  </p>
                </div>

                <div className="mb-3">
                  {renderSparkline(metric.history)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {metric.category}
                  </span>
                  <div className={`flex items-center space-x-1 text-xs ${
                    metric.trend === 'up' ? 'text-green-600' :
                    metric.trend === 'down' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    {metric.trend === 'stable' && <Activity className="w-4 h-4" />}
                    <span>{metric.trendValue > 0 ? '+' : ''}{metric.trendValue.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Metrics Passing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  All {filteredMetrics.length} metrics meet HIGH risk tier thresholds. System is authorized for production use until 2026-01-02.
                </p>
                <div className="flex items-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">Next review: 30 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">Last assessed: 2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">SLO Compliance</h3>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">100%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All SLOs met in past 7 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Retrieval Drift</h3>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">4.2%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Below 10% threshold</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Incidents</h3>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">No incidents in 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
