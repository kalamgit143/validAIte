import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Eye,
  BarChart3,
  Bell
} from 'lucide-react';

interface SLOMetric {
  id: string;
  archetype: string;
  metric: string;
  target: string;
  current: number;
  status: 'healthy' | 'warning' | 'breach';
  trend: 'up' | 'down' | 'stable';
  lastChecked: string;
}

const MonitoringSLODashboard: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>('all');

  const sloMetrics: SLOMetric[] = [
    {
      id: '1',
      archetype: 'A3',
      metric: 'Groundedness p50',
      target: '≥0.90',
      current: 0.92,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '2 minutes ago'
    },
    {
      id: '2',
      archetype: 'A3',
      metric: 'Freshness Lag',
      target: '≤3 days',
      current: 2.1,
      status: 'healthy',
      trend: 'down',
      lastChecked: '5 minutes ago'
    },
    {
      id: '3',
      archetype: 'A3',
      metric: 'Retrieval Drift',
      target: '<10%',
      current: 4.2,
      status: 'healthy',
      trend: 'up',
      lastChecked: '1 minute ago'
    },
    {
      id: '4',
      archetype: 'A3',
      metric: 'Incident Rate',
      target: '=0',
      current: 0,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '1 minute ago'
    },
    {
      id: '5',
      archetype: 'A11',
      metric: 'Audit Completeness',
      target: '≥0.99',
      current: 0.995,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '3 minutes ago'
    },
    {
      id: '6',
      archetype: 'A11',
      metric: 'Change Gate Pass Rate',
      target: '=100%',
      current: 100,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '10 minutes ago'
    },
    {
      id: '7',
      archetype: 'A9',
      metric: 'Tool Policy Violations',
      target: '≤1/1k',
      current: 0.7,
      status: 'healthy',
      trend: 'down',
      lastChecked: '2 minutes ago'
    },
    {
      id: '8',
      archetype: 'A9',
      metric: 'Runaway Loops',
      target: '=0',
      current: 0,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '1 minute ago'
    },
    {
      id: '9',
      archetype: 'A5',
      metric: 'Vulnerability Delta',
      target: '≤0',
      current: 0,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '15 minutes ago'
    },
    {
      id: '10',
      archetype: 'A5',
      metric: 'Mutation Score',
      target: '≥0.85',
      current: 0.87,
      status: 'healthy',
      trend: 'up',
      lastChecked: '20 minutes ago'
    },
    {
      id: '11',
      archetype: 'A12',
      metric: 'Harmful Advice Rate',
      target: '=0',
      current: 0,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '1 minute ago'
    },
    {
      id: '12',
      archetype: 'A12',
      metric: 'HITL Adherence',
      target: '≥99%',
      current: 99.8,
      status: 'healthy',
      trend: 'stable',
      lastChecked: '5 minutes ago'
    }
  ];

  const archetypes = ['all', ...Array.from(new Set(sloMetrics.map(m => m.archetype)))];

  const filteredMetrics = selectedArchetype === 'all'
    ? sloMetrics
    : sloMetrics.filter(m => m.archetype === selectedArchetype);

  const statusCounts = {
    healthy: sloMetrics.filter(m => m.status === 'healthy').length,
    warning: sloMetrics.filter(m => m.status === 'warning').length,
    breach: sloMetrics.filter(m => m.status === 'breach').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'breach':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'breach':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <Activity className="w-8 h-8 text-blue-600" />
          <span>Monitoring & SLO Dashboard</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Post-production continuous monitoring and service level objectives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-lg border border-green-200 dark:border-green-800 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Healthy</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{statusCounts.healthy}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">SLOs met</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Warning</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{statusCounts.warning}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Approaching threshold</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/30 rounded-lg border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Breach</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{statusCounts.breach}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">SLO violated</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Archetype
        </label>
        <select
          value={selectedArchetype}
          onChange={(e) => setSelectedArchetype(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {archetypes.map(arch => (
            <option key={arch} value={arch}>
              {arch === 'all' ? 'All Archetypes' : `Archetype ${arch}`}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMetrics.map(metric => (
          <div
            key={metric.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-semibold">
                    {metric.archetype}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {metric.metric}
                </h3>
              </div>
              {getStatusIcon(metric.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Target</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{metric.target}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Current</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{metric.current}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                {getTrendIcon(metric.trend)}
                <span className="capitalize">{metric.trend}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-500">{metric.lastChecked}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <span>Active Alerts</span>
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded text-sm">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">All systems operational</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">No alerts</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>SLO Coverage by Archetype</span>
        </h3>
        <div className="space-y-3">
          {['A3', 'A11', 'A9', 'A5', 'A12'].map(arch => {
            const archMetrics = sloMetrics.filter(m => m.archetype === arch);
            const healthyCount = archMetrics.filter(m => m.status === 'healthy').length;
            const percentage = archMetrics.length > 0 ? (healthyCount / archMetrics.length) * 100 : 0;

            return (
              <div key={arch} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Archetype {arch}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {healthyCount}/{archMetrics.length} healthy ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonitoringSLODashboard;
