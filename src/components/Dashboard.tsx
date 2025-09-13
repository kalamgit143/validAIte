import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap, 
  DollarSign, 
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import MetricCard from './MetricCard';
import Chart from './Chart';
import AlertsPanel from './AlertsPanel';
import RecentActivity from './RecentActivity';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Response Quality',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up' as const,
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Cost per Query',
      value: '$0.045',
      change: '-12%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Toxicity Rate',
      value: '0.8%',
      change: '+0.2%',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Daily Queries',
      value: '45.2K',
      change: '+18%',
      trend: 'up' as const,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'User Satisfaction',
      value: '4.7/5',
      change: '+0.1',
      trend: 'up' as const,
      icon: Users,
      color: 'purple'
    }
  ];

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Response Quality',
        data: [92, 94, 91, 95, 93, 96],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Response Time (s)',
        data: [1.5, 1.3, 1.4, 1.1, 1.2, 1.0],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor your GenAI application performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trust Score Trends</h3>
          <Chart data={chartData} type="line" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Industry Distribution</h3>
          <Chart 
            data={{
              labels: ['Healthcare', 'Finance', 'Enterprise', 'Government', 'Retail'],
              datasets: [{
                data: [28, 24, 22, 16, 10],
                backgroundColor: [
                  '#3B82F6',
                  '#10B981',
                  '#F59E0B',
                  '#EF4444',
                  '#8B5CF6'
                ]
              }]
            }} 
            type="doughnut" 
          />
        </div>
      </div>

      {/* Case Studies Success Stories */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              industry: 'Healthcare',
              achievement: 'Reduced triage errors by 40%',
              compliance: 'EU AI Act conformity achieved',
              icon: '🏥',
              trustScore: 94.2
            },
            {
              industry: 'Finance',
              achievement: 'Avoided $2.4M in regulatory fines',
              compliance: 'Built customer trust in lending',
              icon: '🏦',
              trustScore: 91.8
            },
            {
              industry: 'Enterprise',
              achievement: 'Improved productivity by 35%',
              compliance: 'Ensured safe copilot deployment',
              icon: '🏢',
              trustScore: 96.1
            },
            {
              industry: 'Government',
              achievement: 'Increased citizen trust to 4.8/5',
              compliance: 'Reduced call-center costs by 60%',
              icon: '🏛️',
              trustScore: 89.7
            },
            {
              industry: 'Retail',
              achievement: 'Boosted customer satisfaction by 28%',
              compliance: 'Eliminated brand safety risks',
              icon: '🛍️',
              trustScore: 95.4
            }
          ].map((story, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{story.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{story.industry}</h4>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Trust Score: {story.trustScore}%</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  <strong>Impact:</strong> {story.achievement}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Outcome:</strong> {story.compliance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsPanel />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;