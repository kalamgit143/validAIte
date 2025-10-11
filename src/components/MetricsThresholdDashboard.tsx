import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Target,
  BarChart3,
  Filter
} from 'lucide-react';
import { metrics, thresholds } from '../data/metrics';
import { Metric, Threshold } from '../types/tevv';

const MetricsThresholdDashboard: React.FC = () => {
  const [selectedRiskTier, setSelectedRiskTier] = useState<'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'>('HIGH');
  const [searchTerm, setSearchTerm] = useState('');

  const riskTiers: Array<'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'> = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'];

  const filteredMetrics = metrics.filter(metric =>
    searchTerm === '' ||
    metric.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    metric.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getThresholdForMetric = (metricId: string): Threshold | undefined => {
    return thresholds.find(t => t.metric === metricId);
  };

  const getThresholdValue = (threshold: Threshold, tier: string): string => {
    switch (tier) {
      case 'LOW': return threshold.low;
      case 'MODERATE': return threshold.moderate;
      case 'HIGH': return threshold.high;
      case 'CRITICAL': return threshold.critical;
      default: return threshold.low;
    }
  };

  const tierColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    MODERATE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };

  const mockResults: Record<string, { value: number; status: 'pass' | 'fail' | 'warning' }> = {
    'GRD': { value: 0.92, status: 'pass' },
    'CIT': { value: 0.96, status: 'pass' },
    'R@K': { value: 0.87, status: 'pass' },
    'FRS': { value: 2.1, status: 'pass' },
    'SCM': { value: 1.0, status: 'pass' },
    'PII': { value: 0.3, status: 'pass' },
    'TOX': { value: 0.8, status: 'pass' },
    'JBR': { value: 1.5, status: 'pass' },
    'VULN': { value: 0.15, status: 'pass' },
    'LIC': { value: 0, status: 'pass' },
    'TPV': { value: 0.7, status: 'pass' },
    'AUD': { value: 0.995, status: 'pass' },
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <Target className="w-8 h-8 text-blue-600" />
          <span>Metrics & Thresholds</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Risk-tier-based go/no-go thresholds for TEVV metrics
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Risk Tier:
            </span>
            {riskTiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedRiskTier(tier)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedRiskTier === tier
                    ? tierColors[tier]
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search metrics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMetrics.map(metric => {
          const threshold = getThresholdForMetric(metric.id);
          const currentThreshold = threshold ? getThresholdValue(threshold, selectedRiskTier) : 'N/A';
          const result = mockResults[metric.id];

          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-mono font-semibold">
                      {metric.id}
                    </span>
                    {result && (
                      <span className={`flex items-center space-x-1 ${
                        result.status === 'pass' ? 'text-green-600' : result.status === 'fail' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {result.status === 'pass' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : result.status === 'fail' ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {metric.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {metric.description}
                  </p>
                </div>
                <div className="ml-3">
                  {metric.betterDirection === 'higher' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Unit:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{metric.unit}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Range:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{metric.range}</span>
                </div>
              </div>

              {threshold && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {selectedRiskTier} Threshold:
                    </span>
                    <span className={`px-2 py-1 rounded text-sm font-mono font-semibold ${tierColors[selectedRiskTier]}`}>
                      {currentThreshold}
                    </span>
                  </div>

                  {result && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Current Value:</span>
                        <span className={`font-semibold ${
                          result.status === 'pass' ? 'text-green-600' : result.status === 'fail' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {result.value}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredMetrics.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No metrics found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Threshold Summary</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {riskTiers.map(tier => {
            const tierMetrics = thresholds.length;
            return (
              <div key={tier} className="text-center">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-2 ${tierColors[tier]}`}>
                  {tier}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tierMetrics}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  metrics defined
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricsThresholdDashboard;
