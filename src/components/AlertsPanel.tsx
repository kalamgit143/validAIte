import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      type: 'warning',
      title: 'High Toxicity Rate',
      message: 'Toxicity rate has increased by 15% in the last hour',
      time: '5 minutes ago',
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Model Update Available',
      message: 'GPT-4 Turbo is now available for testing',
      time: '1 hour ago',
      icon: Info
    },
    {
      type: 'success',
      title: 'Performance Improved',
      message: 'Response quality score reached 95%',
      time: '2 hours ago',
      icon: CheckCircle
    }
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`border-l-4 p-4 rounded-r-lg ${getAlertStyles(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(alert.type)}`} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;