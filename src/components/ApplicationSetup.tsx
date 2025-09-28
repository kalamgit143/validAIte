import React, { useState } from 'react';
import { Database, Building, Globe, Users, Shield, Target, CheckCircle, AlertTriangle, Plus, CreditCard as Edit, Eye, Download, Save, RefreshCw, FileText, Settings, Crown, Gavel, Code, Brain, Lock, Activity, BarChart3, Calendar, Mail, ArrowRight, ArrowDown, Zap, Server, Key, Link, Layers } from 'lucide-react';

interface ApplicationSetupProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const ApplicationSetup: React.FC<ApplicationSetupProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [formData, setFormData] = useState({
    // Basic Application Information
    applicationName: '',
    applicationType: '',
    domain: '',
    environment: '',
    
    // Integration Details
    apiEndpoint: '',
    authMethod: '',
    apiKey: '',
    kbSources: [] as string[],
    
    // Context Information
    businessCriticality: '',
    userVolume: '',
    dataTypes: [] as string[],
    complianceScope: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const applicationTypes = [
    { id: 'plain_llm', name: 'Plain LLM', description: 'Direct language model interaction' },
    { id: 'llm_rag', name: 'LLM + RAG', description: 'Language model with retrieval augmentation' },
    { id: 'multi_agent_rag', name: 'Multi-Agentic + RAG', description: 'Multiple agents with knowledge retrieval' },
    { id: 'copilot', name: 'Copilot', description: 'AI assistant for specific workflows' },
    { id: 'summarizer', name: 'Summarizer', description: 'Document and content summarization' },
    { id: 'generator', name: 'Generator', description: 'Content and code generation' },
    { id: 'decision_support', name: 'Decision Support', description: 'AI-powered decision assistance' }
  ];

  const domains = [
    'Insurance', 'Banking', 'Retail', 'Healthcare', 'Government', 
    'Manufacturing', 'Technology', 'Education', 'Legal', 'Energy'
  ];

  const environments = [
    { id: 'sandbox', name: 'Sandbox', description: 'Development and testing' },
    { id: 'staging', name: 'Staging', description: 'Pre-production validation' },
    { id: 'production', name: 'Production', description: 'Live user-facing system' }
  ];

  const authMethods = [
    'API Key', 'Bearer Token', 'OAuth 2.0', 'mTLS Certificate', 'SAML', 'Custom'
  ];

  const complianceFrameworks = [
    'NIST RMF', 'EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'ISO 27001', 'SOC 2', 'FedRAMP', 'PCI DSS'
  ];

  // Mock output data that will be passed to next component
  const generateOutput = () => {
    return {
      applicationProfile: {
        id: `app_${Date.now()}`,
        name: formData.applicationName,
        type: formData.applicationType,
        domain: formData.domain,
        environment: formData.environment,
        registeredAt: new Date().toISOString()
      },
      contextBaseline: {
        appType: formData.applicationType,
        domain: formData.domain,
        complianceScope: formData.complianceScope,
        businessCriticality: formData.businessCriticality,
        integrationStatus: 'configured'
      },
      evidence: {
        setupLog: `Application ${formData.applicationName} registered successfully`,
        integrationStatus: 'API endpoint configured and tested',
        configurationHash: 'sha256:abc123...',
        timestamp: new Date().toISOString()
      }
    };
  };

  const handleComplete = () => {
    setIsComplete(true);
    // In real implementation, this would pass data to Use Case Definition component
    console.log('Application Setup Output:', generateOutput());
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Application Setup</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              <Database className="w-4 h-4" />
              <span>Input to Use Case Definition</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Configure application context and integration details</p>
        </div>
        
        {/* Flow Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">Application Setup</span>
          <ArrowRight className="w-4 h-4" />
          <span>Use Case Definition</span>
          <ArrowRight className="w-4 h-4" />
          <span>Risk Classification</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Controls</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Matrix</span>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Application type & domain</li>
              <li>• Environment & criticality</li>
              <li>• API endpoints & authentication</li>
              <li>• Knowledge base sources</li>
              <li>• Compliance requirements</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Application Registration</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">Creating baseline profile</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Application profile registered</li>
              <li>• Context baseline established</li>
              <li>• Integration status verified</li>
              <li>• Evidence package created</li>
              <li>• Ready for use case mapping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Configuration Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Basic Application Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application Name *
                  </label>
                  <input
                    type="text"
                    value={formData.applicationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationName: e.target.value }))}
                    placeholder="Healthcare Triage Assistant"
                    disabled={!canCreate}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application Type *
                  </label>
                  <select
                    value={formData.applicationType}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationType: e.target.value }))}
                    disabled={!canCreate}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="">Select Application Type</option>
                    {applicationTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name} - {type.description}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain *
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                      disabled={!canCreate}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="">Select Domain</option>
                      {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Environment *
                    </label>
                    <select
                      value={formData.environment}
                      onChange={(e) => setFormData(prev => ({ ...prev, environment: e.target.value }))}
                      disabled={!canCreate}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="">Select Environment</option>
                      {environments.map(env => (
                        <option key={env.id} value={env.id}>{env.name} - {env.description}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Criticality *
                  </label>
                  <select
                    value={formData.businessCriticality}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessCriticality: e.target.value }))}
                    disabled={!canCreate}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="">Select Criticality</option>
                    <option value="high">High - Mission Critical</option>
                    <option value="medium">Medium - Business Important</option>
                    <option value="low">Low - Operational Support</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Integration Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">Integration Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Endpoint *
                  </label>
                  <div className="relative">
                    <Server className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      value={formData.apiEndpoint}
                      onChange={(e) => setFormData(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                      placeholder="https://api.company.com/ai/chat"
                      disabled={!canCreate}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Authentication Method *
                  </label>
                  <select
                    value={formData.authMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, authMethod: e.target.value }))}
                    disabled={!canCreate}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <option value="">Select Auth Method</option>
                    {authMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key / Token *
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="sk-proj-..."
                      disabled={!canCreate}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Knowledge Base Sources
                  </label>
                  <div className="space-y-2">
                    {['Vector Database', 'Document Store', 'API Knowledge Base', 'Custom KB'].map(source => (
                      <label key={source} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          disabled={!canCreate}
                          className="rounded border-gray-300 disabled:opacity-50" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Scope */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">Compliance Scope</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {complianceFrameworks.map(framework => (
              <label key={framework} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  disabled={!canCreate}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({ 
                        ...prev, 
                        complianceScope: [...prev.complianceScope, framework] 
                      }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        complianceScope: prev.complianceScope.filter(f => f !== framework) 
                      }));
                    }
                  }}
                  className="rounded border-gray-300 disabled:opacity-50" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {!canCreate && "View-only mode - Contact administrator for configuration access"}
          </div>
          
          <div className="flex items-center space-x-3">
            {canCreate && (
              <>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Link className="w-4 h-4" />
                  <span>Test Connection</span>
                </button>
                <button 
                  onClick={handleComplete}
                  disabled={!formData.applicationName || !formData.applicationType || !formData.domain}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
                >
                  <span>Register & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Output Preview */}
      {isComplete && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Application Setup Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Application Profile</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>ID: app_{Date.now()}</div>
                <div>Type: {formData.applicationType}</div>
                <div>Domain: {formData.domain}</div>
                <div>Environment: {formData.environment}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Context Baseline</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Criticality: {formData.businessCriticality}</div>
                <div>Compliance: {formData.complianceScope.length} frameworks</div>
                <div>Integration: Configured</div>
                <div>Status: Ready</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evidence Package</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Setup Log: Generated</div>
                <div>Config Hash: sha256:abc123...</div>
                <div>Timestamp: {new Date().toLocaleString()}</div>
                <div>Audit Ready: ✓</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-200">
              <Layers className="w-4 h-4" />
              <span>Ready for Use Case Definition (Component 2)</span>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <span>Proceed to Use Cases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Role-Based Access Info */}
      {currentUser && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">
                {currentUser.role} Access Level
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                Permissions: {getUserPermissions ? getUserPermissions('Risk Mapping & Governance').join('•') : 'Loading...'}
                {!canCreate && " (View-only access)"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationSetup;