import React, { useState } from 'react';
import { DriftDetection, DriftMetric } from '../types';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Bell,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import Chart from './Chart';

const DataDrift: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('input_drift');

  const driftDetections: DriftDetection[] = [
    {
      id: 'drift_001',
      application_id: 'app_001',
      detection_date: '2024-01-15T10:00:00Z',
      drift_metrics: {
        input_drift: {
          metric_name: 'Input Distribution Drift',
          current_value: 0.23,
          baseline_value: 0.18,
          threshold: 0.3,
          drift_score: 0.23,
          statistical_significance: 0.95,
          detection_method: 'KL Divergence'
        },
        output_drift: {
          metric_name: 'Output Quality Drift',
          current_value: 0.12,
          baseline_value: 0.15,
          threshold: 0.2,
          drift_score: 0.12,
          statistical_significance: 0.88,
          detection_method: 'Population Stability Index'
        },
        performance_drift: {
          metric_name: 'Model Performance Drift',
          current_value: 0.28,
          baseline_value: 0.22,
          threshold: 0.25,
          drift_score: 0.28,
          statistical_significance: 0.92,
          detection_method: 'Statistical Process Control'
        },
        concept_drift: {
          metric_name: 'Concept Drift',
          current_value: 0.15,
          baseline_value: 0.12,
          threshold: 0.2,
          drift_score: 0.15,
          statistical_significance: 0.78,
          detection_method: 'ADWIN'
        }
      },
      drift_severity: 'medium',
      recommended_actions: [
        'Review recent training data quality',
        'Consider model retraining',
        'Implement additional data validation'
      ],
      auto_mitigation_applied: false
    }
  ];

  const driftAlerts = [
    {
      id: 'alert_001',
      type: 'critical',
      metric: 'Toxicity Score Drift',
      message: 'Toxicity drift exceeded critical threshold (0.35 > 0.30)',
      timestamp: '2024-01-15T10:30:00Z',
      application: 'Customer Support Bot',
      recommendation: 'Review recent training data and consider model retraining'
    },
    {
      id: 'alert_002',
      type: 'warning',
      metric: 'Input Distribution Drift',
      message: 'Input patterns showing significant drift (0.23 approaching 0.30)',
      timestamp: '2024-01-15T09:15:00Z',
      application: 'Content Generator',
      recommendation: 'Monitor closely and prepare data validation rules'
    },
    {
      id: 'alert_003',
      type: 'info',
      metric: 'Model Performance Drift',
      message: 'Performance drift detected but within acceptable range',
      timestamp: '2024-01-15T08:45:00Z',
      application: 'Code Review Assistant',
      recommendation: 'Continue monitoring, no immediate action required'
    }
  ];

  const chartData = {
    input_drift: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Input Drift Score',
        data: [0.15, 0.18, 0.21, 0.23],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }]
    },
    output_drift: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Output Drift Score',
        data: [0.18, 0.16, 0.14, 0.12],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }]
    },
    toxicity_drift: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Toxicity Drift Score',
        data: [0.20, 0.25, 0.30, 0.35],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'normal': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Drift Detection</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor and detect drift in your GenAI application data</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Drift Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(driftDetections[0]?.drift_metrics || {}).map(([key, metric]) => (
          <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{metric.metric_name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Method: {metric.detection_method}</p>
              </div>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                metric.current_value >= metric.threshold ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                metric.current_value >= metric.threshold * 0.8 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {metric.current_value >= metric.threshold ? <AlertTriangle className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                <span>{metric.current_value >= metric.threshold ? 'Alert' : 'Normal'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.current_value.toFixed(3)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Threshold: {metric.threshold.toFixed(3)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Confidence: {(metric.statistical_significance * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Baseline: {metric.baseline_value.toFixed(3)} → Current: {metric.current_value.toFixed(3)}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.current_value >= metric.threshold ? 'bg-red-500' :
                    metric.current_value >= metric.threshold * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((metric.current_value / metric.threshold) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedMetric(key)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Details
              </button>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {metric.detection_method}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drift Recommendations */}
      {driftDetections[0] && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Actions</h3>
          <div className="space-y-3">
            {driftDetections[0].recommended_actions.map((action, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <span className={`text-sm font-medium ${
                  index === 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drift Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Drift Trends</h3>
          <div className="flex items-center space-x-2">
            {Object.keys(chartData).map(key => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
        <Chart data={chartData[selectedMetric as keyof typeof chartData]} type="line" height="400px" />
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Drift Alerts</h3>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Configure Alerts</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {driftAlerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertTypeColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{alert.metric}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                    {alert.message}
                  </p>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Application:</strong> {alert.application}
                  </div>
                  
                  <div className="text-sm bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <strong className="text-gray-900 dark:text-white">Recommendation:</strong> {alert.recommendation}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drift Detection Configuration */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Detection Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detection Sensitivity
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>High (0.1 threshold)</option>
              <option>Medium (0.2 threshold)</option>
              <option>Low (0.3 threshold)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monitoring Window
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>1 hour</option>
              <option>6 hours</option>
              <option>24 hours</option>
              <option>7 days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alert Frequency
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Immediate</option>
              <option>Hourly digest</option>
              <option>Daily digest</option>
              <option>Weekly digest</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Reset to Defaults
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataDrift;