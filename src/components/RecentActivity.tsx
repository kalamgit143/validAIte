import React from 'react';
import { Brain, PlayCircle, Target, Settings } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      type: 'experiment',
      title: 'Prompt A/B Test Started',
      description: 'Testing creative vs instructional prompts',
      user: 'Madhu Ronanki',
      time: '2 minutes ago',
      icon: Target
    },
    {
      type: 'model',
      title: 'Model Deployed',
      description: 'GPT-4 Turbo deployed to production',
      user: 'Mike Johnson',
      time: '15 minutes ago',
      icon: Brain
    },
    {
      type: 'test',
      title: 'Prompt Test Completed',
      description: '95% quality score achieved',
      user: 'Alex Kim',
      time: '1 hour ago',
      icon: PlayCircle
    },
    {
      type: 'config',
      title: 'Evaluation Metrics Updated',
      description: 'Added bias detection threshold',
      user: 'Emily Davis',
      time: '3 hours ago',
      icon: Settings
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'experiment':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
      case 'model':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'test':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  by {activity.user}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;