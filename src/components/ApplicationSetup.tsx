import React, { useState } from 'react';
import { Database, Building, Globe, Users, Shield, Target, CheckCircle, AlertTriangle, Plus, CreditCard as Edit, Eye, Download, Save, RefreshCw, FileText, Settings, Crown, Gavel, Code, Brain, Lock, Activity, BarChart3, Calendar, Mail, ArrowRight, ArrowDown, Zap, Server, Key, Link, Layers, Upload, SkipForward, Info, ExternalLink } from 'lucide-react';

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
    // Mandatory Fields
    applicationName: '',
    applicationType: '',
    domain: '',
    environment: '',
    
    // Optional Integration Details
    apiEndpoint: '',
    authMethod: '',
    apiKey: '',
    kbSources: [] as string[],
    kbFiles: [] as File[],
    dbConnection: '',
    
    // Tracking
    skipIntegration: false
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);

  // Application Types as per GenAI evaluation standards
  const applicationTypes = [
    { 
      id: 'plain_llm', 
      name: 'Plain LLM', 
      description: 'Direct language model interaction without external knowledge',
      examples: 'ChatGPT-style interfaces, simple Q&A bots'
    },
    { 
      id: 'llm_rag', 
      name: 'LLM + RAG', 
      description: 'Language model with retrieval-augmented generation',
      examples: 'Document Q&A, knowledge base assistants'
    },
    { 
      id: 'multi_agent_rag', 
      name: 'Multi-Agentic + RAG', 
      description: 'Multiple AI agents with knowledge retrieval capabilities',
      examples: 'Complex workflow automation, multi-step reasoning'
    },
    { 
      id: 'copilot', 
      name: 'Copilot', 
      description: 'AI assistant integrated into existing workflows',
      examples: 'GitHub Copilot, Microsoft 365 Copilot'
    },
    { 
      id: 'summarizer', 
      name: 'Summarizer', 
      description: 'Specialized content summarization and analysis',
      examples: 'Document summarization, meeting notes, research synthesis'
    },
    { 
      id: 'generator', 
      name: 'Generator', 
      description: 'Content and asset generation systems',
      examples: 'Marketing copy, code generation, image creation'
    },
    { 
      id: 'decision_support', 
      name: 'Decision Support', 
      description: 'AI systems that assist in decision-making processes',
      examples: 'Medical diagnosis support, financial risk assessment'
    }
  ];

  // Domain categories for risk context
  const domains = [
    { id: 'insurance', name: 'Insurance', riskProfile: 'High regulatory oversight, actuarial accuracy critical' },
    { id: 'banking', name: 'Banking', riskProfile: 'Financial regulations, fair lending requirements' },
    { id: 'retail', name: 'Retail', riskProfile: 'Consumer protection, brand safety' },
    { id: 'healthcare', name: 'Healthcare', riskProfile: 'Patient safety, HIPAA compliance, medical accuracy' },
    { id: 'government', name: 'Government', riskProfile: 'Public accountability, transparency, fairness' },
    { id: 'manufacturing', name: 'Manufacturing', riskProfile: 'Safety standards, quality control' },
    { id: 'technology', name: 'Technology', riskProfile: 'Innovation balance, IP protection' },
    { id: 'education', name: 'Education', riskProfile: 'Student privacy, educational equity' },
    { id: 'legal', name: 'Legal', riskProfile: 'Professional standards, confidentiality' },
    { id: 'energy', name: 'Energy', riskProfile: 'Infrastructure safety, environmental impact' },
    { id: 'others', name: 'Others', riskProfile: 'General business applications' }
  ];

  // Environment types with risk implications
  const environments = [
    { 
      id: 'sandbox', 
      name: 'Sandbox', 
      description: 'Development and testing environment',
      riskLevel: 'Low',
      characteristics: 'Isolated, test data, no real users'
    },
    { 
      id: 'staging', 
      name: 'Staging', 
      description: 'Pre-production validation environment',
      riskLevel: 'Medium',
      characteristics: 'Production-like, limited access, validation data'
    },
    { 
      id: 'production', 
      name: 'Production', 
      description: 'Live user-facing system',
      riskLevel: 'High',
      characteristics: 'Real users, real data, business impact'
    }
  ];

  // Authentication methods for integration
  const authMethods = [
    'API Key',
    'Bearer Token', 
    'OAuth 2.0',
    'mTLS Certificate',
    'SAML',
    'Custom Authentication'
  ];

  // Knowledge Base source types
  const kbSourceTypes = [
    'Vector Database (Pinecone, Weaviate, etc.)',
    'Document Store (SharePoint, Confluence, etc.)',
    'API Knowledge Base (REST/GraphQL)',
    'File Upload (PDF, DOCX, TXT)',
    'Database Connection (SQL, NoSQL)',
    'Web Scraping / Crawling',
    'Custom Integration'
  ];

  const validateMandatoryFields = () => {
    const errors: string[] = [];
    
    if (!formData.applicationName.trim()) {
      errors.push('Application Name is required');
    }
    if (!formData.applicationType) {
      errors.push('Application Type must be selected');
    }
    if (!formData.domain) {
      errors.push('Domain must be selected');
    }
    if (!formData.environment) {
      errors.push('Environment must be selected');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSkipIntegration = () => {
    if (validateMandatoryFields()) {
      setFormData(prev => ({ ...prev, skipIntegration: true }));
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (validateMandatoryFields()) {
      setIsComplete(true);
      
      // Generate audit log entry
      const auditEntry = {
        action: 'Application Setup completed',
        user: currentUser?.name || 'System User',
        timestamp: new Date().toISOString(),
        applicationProfile: generateApplicationProfile()
      };
      
      console.log('Application Setup Output:', {
        applicationProfile: generateApplicationProfile(),
        auditLog: auditEntry,
        evidenceStub: generateEvidenceStub()
      });
    }
  };

  const generateApplicationProfile = () => {
    return {
      id: `app_${Date.now()}`,
      metadata: {
        appName: formData.applicationName,
        type: formData.applicationType,
        domain: formData.domain,
        environment: formData.environment,
        integrationDetails: formData.skipIntegration ? null : {
          apiEndpoint: formData.apiEndpoint,
          authMethod: formData.authMethod,
          hasApiKey: !!formData.apiKey,
          kbSources: formData.kbSources,
          dbConnection: formData.dbConnection
        }
      },
      registeredAt: new Date().toISOString(),
      status: 'profile_created',
      readyForUseCaseDefinition: true
    };
  };

  const generateEvidenceStub = () => {
    return {
      evidenceType: 'application_setup_log',
      applicationId: `app_${Date.now()}`,
      setupCompletedBy: currentUser?.name || 'System User',
      mandatoryFieldsCompleted: true,
      integrationConfigured: !formData.skipIntegration,
      complianceTraceability: {
        nistRmf: 'GOVERN-1.1 - AI system inventory',
        euAiAct: 'Art-16 - Record keeping requirements'
      },
      exportFormat: 'JSON',
      auditReady: true,
      timestamp: new Date().toISOString()
    };
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  const selectedDomain = domains.find(d => d.id === formData.domain);
  const selectedEnvironment = environments.find(e => e.id === formData.environment);
  const selectedAppType = applicationTypes.find(t => t.id === formData.applicationType);

  return (
    <div className="space-y-8">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Application Setup</h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
            <FileText className="w-4 h-4" />
            <span>Input to Use Case Definition</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Capture baseline profile of GenAI application under evaluation</p>
      </div>

      {/* Purpose & Context */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              Define <strong>what app is under review</strong>, <strong>where it runs</strong>, and <strong>what context it belongs to</strong>. 
              Live integration is optional at this stage and becomes mandatory in Stage 2 (Trust Metrics).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white text-sm">What (App Profile)</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Name, Type, Characteristics</div>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white text-sm">Where (Context)</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Domain, Environment, Risk Level</div>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white text-sm">How (Optional)</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Integration Details for Stage 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Please complete required fields:</h4>
              <ul className="mt-2 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-300">• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Mandatory Section */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Mandatory Information</h3>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-full font-medium">
              Required to Proceed
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Name *
              </label>
              <input
                type="text"
                value={formData.applicationName}
                onChange={(e) => setFormData(prev => ({ ...prev, applicationName: e.target.value }))}
                placeholder="e.g., Healthcare Triage Assistant, Customer Support Bot"
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Descriptive name for the GenAI application being evaluated
              </p>
            </div>

            {/* Application Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Type *
              </label>
              <select
                value={formData.applicationType}
                onChange={(e) => setFormData(prev => ({ ...prev, applicationType: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Select Application Type</option>
                {applicationTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {selectedAppType && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">{selectedAppType.description}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Examples: {selectedAppType.examples}</p>
                </div>
              )}
            </div>

            {/* Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Domain *
              </label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Select Domain</option>
                {domains.map(domain => (
                  <option key={domain.id} value={domain.id}>{domain.name}</option>
                ))}
              </select>
              {selectedDomain && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Risk Profile:</strong> {selectedDomain.riskProfile}
                  </p>
                </div>
              )}
            </div>

            {/* Environment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Environment *
              </label>
              <select
                value={formData.environment}
                onChange={(e) => setFormData(prev => ({ ...prev, environment: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Select Environment</option>
                {environments.map(env => (
                  <option key={env.id} value={env.id}>{env.name}</option>
                ))}
              </select>
              {selectedEnvironment && (
                <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-800 dark:text-purple-200">{selectedEnvironment.description}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">{selectedEnvironment.characteristics}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedEnvironment.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      selectedEnvironment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedEnvironment.riskLevel} Risk
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional Integration Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Integration Details</h3>
                <p className="text-gray-600 dark:text-gray-400">Optional now, required for Stage 2 (Trust Metrics Engine)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowIntegrationDetails(!showIntegrationDetails)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>{showIntegrationDetails ? 'Hide' : 'Show'} Integration</span>
              </button>
              
              {canCreate && (
                <button
                  onClick={handleSkipIntegration}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Skip for Now</span>
                </button>
              )}
            </div>
          </div>

          {showIntegrationDetails && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
              <div className="space-y-6">
                {/* API Configuration */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Server className="w-4 h-4" />
                    <span>API Configuration</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Endpoint
                      </label>
                      <input
                        type="url"
                        value={formData.apiEndpoint}
                        onChange={(e) => setFormData(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                        placeholder="https://api.company.com/ai/chat"
                        disabled={!canCreate}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Authentication Method
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
                  </div>

                  {formData.authMethod && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Key / Token
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          value={formData.apiKey}
                          onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                          placeholder="sk-proj-... or bearer token"
                          disabled={!canCreate}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Knowledge Base Sources */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Knowledge Base Sources</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {kbSourceTypes.map(source => (
                      <label key={source} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <input 
                          type="checkbox" 
                          disabled={!canCreate}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({ 
                                ...prev, 
                                kbSources: [...prev.kbSources, source] 
                              }));
                            } else {
                              setFormData(prev => ({ 
                                ...prev, 
                                kbSources: prev.kbSources.filter(s => s !== source) 
                              }));
                            }
                          }}
                          className="mt-1 rounded border-gray-300 disabled:opacity-50" 
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{source}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* File Upload for Knowledge Base */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Knowledge Base Files (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload documents for knowledge base analysis
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                        Supported: PDF, DOCX, TXT, CSV, JSON (max 100MB total)
                      </p>
                      <button 
                        disabled={!canCreate}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Choose Files
                      </button>
                    </div>
                  </div>
                </div>

                {/* Database Connection */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Link className="w-4 h-4" />
                    <span>Database Connection (Optional)</span>
                  </h4>
                  
                  <input
                    type="text"
                    value={formData.dbConnection}
                    onChange={(e) => setFormData(prev => ({ ...prev, dbConnection: e.target.value }))}
                    placeholder="postgresql://user:pass@host:port/db or mongodb://..."
                    disabled={!canCreate}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Connection string for knowledge base or vector database
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!canCreate ? "View-only mode - Contact administrator for setup access" : 
               "Complete mandatory fields to proceed to Use Case Definition"}
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button 
                    onClick={() => {
                      // Save draft functionality
                      console.log('Draft saved:', formData);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  
                  {formData.apiEndpoint && (
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Link className="w-4 h-4" />
                      <span>Test Connection</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={handleComplete}
                    disabled={!formData.applicationName || !formData.applicationType || !formData.domain || !formData.environment}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Complete Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Output Preview */}
      {isComplete && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">Application Setup Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Application Profile Object */}
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Application Profile Object</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>App ID: app_{Date.now()}</div>
                <div>Name: {formData.applicationName}</div>
                <div>Type: {formData.applicationType}</div>
                <div>Domain: {formData.domain}</div>
                <div>Environment: {formData.environment}</div>
                <div>Integration: {formData.skipIntegration ? 'Skipped' : 'Configured'}</div>
              </div>
            </div>
            
            {/* Audit Log Entry */}
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Audit Log Entry</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Action: Application Setup completed</div>
                <div>User: {currentUser?.name || 'System User'}</div>
                <div>Timestamp: {new Date().toLocaleString()}</div>
                <div>Status: Profile Created</div>
              </div>
            </div>
            
            {/* Evidence Stub */}
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Evidence Stub</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Format: JSON Export</div>
                <div>Compliance: NIST RMF, EU AI Act</div>
                <div>Traceability: Ready</div>
                <div>Audit Ready: ✓</div>
              </div>
            </div>
          </div>

          {/* Next Step Indicator */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">
                    Ready for Step 2: Use Case Definition
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Application profile will be used as context for business scenario mapping
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center space-x-2">
                <span>Proceed to Use Cases</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplicationSetup;