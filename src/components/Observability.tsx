import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Calendar,
  Download,
  RefreshCw,
  Search,
  Settings,
  Database,
  Network,
  Cpu,
  HardDrive
} from 'lucide-react';
import Chart from './Chart';

const Observability: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [selectedService, setSelectedService] = useState('all');

  const systemMetrics = [
    {
      name: 'Request Rate',
      value: '1.2K/min',
      change: '+12%',
      trend: 'up',
      status: 'healthy',
      icon: Activity
    },
    {
      name: 'Error Rate',
      value: '0.02%',
      change: '-0.01%',
      trend: 'down',
      status: 'healthy',
      icon: AlertTriangle
    },
    {
      name: 'P95 Latency',
      value: '245ms',
      change: '+15ms',
      trend: 'up',
      status: 'warning',
      icon: Clock
    },
    {
      name: 'Throughput',
      value: '850 RPS',
      change: '+8%',
      trend: 'up',
      status: 'healthy',
      icon: Zap
    }
  ];

  const services = [
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: '99.98%',
      requests: '45.2K',
      errors: 8,
      avgLatency: '120ms',
      instances: 3
    },
    {
      name: 'Model Inference',
      status: 'healthy',
      uptime: '99.95%',
      requests: '38.7K',
      errors: 12,
      avgLatency: '1.2s',
      instances: 5
    },
    {
      name: 'Evaluation Engine',
      status: 'warning',
      uptime: '99.85%',
      requests: '12.3K',
      errors: 23,
      avgLatency: '450ms',
      instances: 2
    },
    {
      name: 'Data Pipeline',
      status: 'healthy',
      uptime: '99.99%',
      requests: '67.8K',
      errors: 3,
      avgLatency: '85ms',
      instances: 4
    }
  ];

  const recentEvents = [
    {
      id: 'event_001',
      type: 'error',
      service: 'Model Inference',
      message: 'High memory usage detected on instance-3',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'warning',
      resolved: false
    },
    {
      id: 'event_002',
      type: 'deployment',
      service: 'API Gateway',
      message: 'Deployment v2.1.3 completed successfully',
      timestamp: '2024-01-15T09:45:00Z',
      severity: 'info',
      resolved: true
    },
    {
      id: 'event_003',
      type: 'alert',
      service: 'Evaluation Engine',
      message: 'Response time exceeded threshold (500ms)',
      timestamp: '2024-01-15T08:20:00Z',
      severity: 'critical',
      resolved: true
    }
  ];

  const infrastructureMetrics = [
    {
      name: 'CPU Usage',
      value: '68%',
      threshold: '80%',
      status: 'healthy',
      icon: Cpu
    },
    {
      name: 'Memory Usage',
      value: '72%',
      threshold: '85%',
      status: 'healthy',
      icon: HardDrive
    },
    {
      name: 'Network I/O',
      value: '1.2 GB/s',
      threshold: '2.0 GB/s',
      status: 'healthy',
      icon: Network
    },
    {
      name: 'Storage Usage',
      value: '45%',
      threshold: '90%',
      status: 'healthy',
      icon: Database
    }
  ];

  const chartData = {
    requests: {
      labels: ['00:00', '00:15', '00:30', '00:45', '01:00'],
      datasets: [{
        label: 'Requests/min',
        data: [1100, 1250, 1180, 1320, 1200],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    latency: {
      labels: ['00:00', '00:15', '00:30', '00:45', '01:00'],
      datasets: [{
        label: 'P95 Latency (ms)',
        data: [230, 245, 260, 255, 245],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }]
    },
    errors: {
      labels: ['00:00', '00:15', '00:30', '00:45', '01:00'],
      datasets: [{
        label: 'Error Rate (%)',
        data: [0.01, 0.02, 0.03, 0.02, 0.02],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Observability</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor system health and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                  <span className="capitalize">{metric.status}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{metric.name}</p>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Request Rate</h3>
          <Chart data={chartData.requests} type="line" height="200px" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Latency</h3>
          <Chart data={chartData.latency} type="line" height="200px" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Error Rate</h3>
          <Chart data={chartData.errors} type="line" height="200px" />
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h3>
            <div className="flex items-center space-x-3">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                <option value="api">API Gateway</option>
                <option value="model">Model Inference</option>
                <option value="eval">Evaluation Engine</option>
                <option value="data">Data Pipeline</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                    <span className="capitalize">{service.status}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.instances} instances • {service.uptime} uptime
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-white">{service.requests}</div>
                    <div>Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-white">{service.errors}</div>
                    <div>Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-white">{service.avgLatency}</div>
                    <div>Avg Latency</div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure Metrics */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Infrastructure</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {infrastructureMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className={`p-4 rounded-lg ${getStatusColor(metric.status)} mb-3`}>
                  <Icon className="w-8 h-8 mx-auto" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">{metric.name}</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">of {metric.threshold}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Events</h3>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event.id} className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(event.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{event.service}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                    {event.message}
                  </p>
                  
                  {event.resolved && (
                    <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Resolved</span>
                    </div>
                  )}
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
    </div>
  );
};

export default Observability;