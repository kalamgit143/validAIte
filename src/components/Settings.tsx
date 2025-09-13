import React, { useState } from 'react';
import { Settings, Bell, Shield, DollarSign, Users, Key, Globe } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  defaultValue="QUALIZEAL"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Model
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>GPT-4</option>
                  <option>Claude-3</option>
                  <option>Gemini Pro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>UTC-8 (Pacific)</option>
                  <option>UTC-5 (Eastern)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Retention (days)
                </label>
                <input
                  type="number"
                  defaultValue={90}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Evaluation Thresholds</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality Score Threshold
                  </label>
                  <input
                    type="number"
                    defaultValue={85}
                    min={0}
                    max={100}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Toxicity Rate (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={2}
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Response Time (s)
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    min={1}
                    step={0.1}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
            
            <div className="space-y-4">
              {[
                { id: 'quality_alerts', label: 'Quality Score Alerts', description: 'Get notified when quality drops below threshold' },
                { id: 'cost_alerts', label: 'Cost Alerts', description: 'Alert when spending exceeds budget' },
                { id: 'toxicity_alerts', label: 'Toxicity Alerts', description: 'Immediate alerts for toxic content detection' },
                { id: 'experiment_completion', label: 'Experiment Completion', description: 'Notify when A/B tests reach significance' },
                { id: 'weekly_reports', label: 'Weekly Reports', description: 'Summary reports every Monday' }
              ].map(notification => (
                <div key={notification.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.label}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Two-Factor Authentication</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Secure your account with 2FA. Currently disabled.
                    </p>
                    <button className="mt-2 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Data Encryption</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Encrypt data at rest</span>
                    <span className="text-sm text-green-600 dark:text-green-400">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Encrypt data in transit</span>
                    <span className="text-sm text-green-600 dark:text-green-400">Enabled</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Access Control</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue={60}
                      className="w-32 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <label className="text-sm text-gray-700 dark:text-gray-300">Require IP whitelisting</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Production API Key', key: 'gae_prod_••••••••••••7891', created: '2 weeks ago', lastUsed: '5 minutes ago' },
                { name: 'Development API Key', key: 'gae_dev_••••••••••••4567', created: '1 month ago', lastUsed: '2 hours ago' },
                { name: 'Testing API Key', key: 'gae_test_••••••••••••1234', created: '3 days ago', lastUsed: 'Never' }
              ].map((apiKey, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{apiKey.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{apiKey.key}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Created {apiKey.created} • Last used {apiKey.lastUsed}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                      Regenerate
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate New API Key
            </button>
          </div>
        );

      default:
        return <div>Section content for {activeSection}</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <nav className="space-y-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          {renderSection()}
          
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;