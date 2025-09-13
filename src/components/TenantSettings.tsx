import React, { useState } from 'react';
import { 
  Building, 
  Palette, 
  Shield, 
  Globe,
  Users,
  CreditCard,
  Settings,
  Upload,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertTriangle,
  Crown,
  Zap,
  Target
} from 'lucide-react';

const TenantSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);

  const sections = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const tenantInfo = {
    name: 'QUALIZEAL',
    domain: 'qualizeal.validaite.com',
    plan: 'Professional',
    status: 'active',
    createdAt: '2024-01-01T09:00:00Z',
    userCount: 24,
    applicationCount: 8,
    billingCycle: 'annual',
    nextBilling: '2024-12-01T00:00:00Z'
  };

  const usageMetrics = {
    currentPeriod: {
      requests: 45230,
      evaluations: 1247,
      storage: 2.3,
      users: 24
    },
    limits: {
      maxRequests: 100000,
      maxEvaluations: 5000,
      maxStorage: 10,
      maxUsers: 50
    }
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            defaultValue={tenantInfo.name}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Organization Domain
          </label>
          <div className="flex">
            <input
              type="text"
              defaultValue="acme-corp"
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-sm text-gray-600 dark:text-gray-400">
              .validaite.com
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Technology</option>
            <option>Financial Services</option>
            <option>Healthcare</option>
            <option>Manufacturing</option>
            <option>Retail</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Size
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>201-1000 employees</option>
            <option>1000+ employees</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Usage Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {usageMetrics.currentPeriod.requests.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">API Requests</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              of {usageMetrics.limits.maxRequests.toLocaleString()} limit
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {usageMetrics.currentPeriod.evaluations.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Evaluations</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              of {usageMetrics.limits.maxEvaluations.toLocaleString()} limit
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {usageMetrics.currentPeriod.storage} GB
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Storage Used</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              of {usageMetrics.limits.maxStorage} GB limit
            </div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {usageMetrics.currentPeriod.users}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">Active Users</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              of {usageMetrics.limits.maxUsers} limit
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranding = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Branding & Customization</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Organization Logo
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload your logo (PNG, JPG, SVG)
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Choose File
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color Scheme
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  defaultValue="#3B82F6"
                  className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#3B82F6"
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Secondary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  defaultValue="#8B5CF6"
                  className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#8B5CF6"
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom Domain (Enterprise)
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="ai-governance"
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-sm text-gray-600 dark:text-gray-400">
            .company.com
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Available with Enterprise plan
        </p>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
      
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Multi-Factor Authentication</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Require MFA for all users in your organization
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
                <span className="text-sm text-yellow-800 dark:text-yellow-200">Require MFA for all users</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Session Management</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue={60}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Concurrent Sessions
              </label>
              <input
                type="number"
                defaultValue={3}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">IP Access Control</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300" />
              <label className="text-sm text-gray-700 dark:text-gray-300">Enable IP whitelisting</label>
            </div>
            <textarea
              placeholder="192.168.1.0/24&#10;10.0.0.0/8"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">API Security</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Organization API Key</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">Master API key for organization-level access</p>
              </div>
              <div className="flex items-center space-x-2">
                <code className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                  {showApiKey ? 'sk-org-abc123def456ghi789' : 'sk-org-••••••••••••••••'}
                </code>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Subscription</h3>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Professional Plan</span>
            </h4>
            <p className="text-gray-600 dark:text-gray-400">Annual billing • Next billing: {new Date(tenantInfo.nextBilling).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">$299</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">/month</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">25</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">AI Applications</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">100K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Evaluations/month</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">50</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Team Members</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">90</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Days Retention</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Payment Method</h4>
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Expires 12/2027</div>
              </div>
            </div>
            <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Update payment method
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Billing Address</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>QUALIZEAL</div>
            <div>123 Business Ave</div>
            <div>San Francisco, CA 94105</div>
            <div>United States</div>
          </div>
          <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Update address
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Plan Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Feature</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Current</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">AI Applications</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">25</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">Unlimited</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Team Members</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">50</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">Unlimited</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Custom Domain</td>
                <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">On-premise Deployment</td>
                <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
          Upgrade to Enterprise
        </button>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance Configuration</h3>
      
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Active Frameworks</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'NIST AI RMF', enabled: true, compliance: 94 },
            { name: 'EU AI Act', enabled: true, compliance: 78 },
            { name: 'ISO/IEC 23053', enabled: true, compliance: 91 },
            { name: 'OWASP AI Security', enabled: false, compliance: 0 }
          ].map((framework, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked={framework.enabled} className="rounded border-gray-300" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{framework.name}</div>
                  {framework.enabled && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Compliance: {framework.compliance}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Data Residency</h4>
        <select className="w-full md:w-64 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option>United States</option>
          <option>European Union</option>
          <option>Asia Pacific</option>
          <option>Canada</option>
        </select>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Audit Settings</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Audit log retention (years)</span>
            <select className="px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
              <option>7 years</option>
              <option>5 years</option>
              <option>3 years</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Real-time audit logging</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'general': return renderGeneral();
      case 'branding': return renderBranding();
      case 'security': return renderSecurity();
      case 'billing': return renderBilling();
      case 'compliance': return renderCompliance();
      default: return renderGeneral();
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

export default TenantSettings;