import React, { useState } from 'react';
import { Database, Building, Globe, Users, Shield, Target, CheckCircle, AlertTriangle, Plus, Edit, Eye, Download, Save, RefreshCw, FileText, Settings, Crown, Gavel, Code, Brain, Lock, Activity, BarChart3, Calendar, Mail, ArrowRight, ArrowDown, Zap, Server, Key, Link, Layers, Upload, SkipForward, Info, ExternalLink } from 'lucide-react';

interface ApplicationSetupProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
  onNavigateToUseCase?: () => void;
}

const ApplicationSetup: React.FC<ApplicationSetupProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions,
  onNavigateToUseCase 
}) => {
  const [formData, setFormData] = useState({
    // Mandatory Fields
    applicationName: '',
    applicationType: '',
    domain: '',
    environment: '',
    
    // NIST RMF Required Fields
    businessCriticality: '',
    dataClassification: '',
    userBase: '',
    geographicScope: '',
    
    // EU TEVV Required Fields
    euAiActRiskClass: '',
    intendedPurpose: '',
    targetUsers: '',
    deploymentContext: '',
    humanOversight: '',
    
    // Technical Architecture
    modelProvider: '',
    modelType: '',
    dataFlow: '',
    integrationPattern: '',
    
    // Optional Integration Details
    apiEndpoint: '',
    authMethod: '',
    apiKey: '',
    kbSources: [] as string[],
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
    { id: 'healthcare', name: 'Healthcare', riskProfile: 'Patient safety, HIPAA compliance, medical accuracy' },
    { id: 'financial', name: 'Financial Services', riskProfile: 'Financial regulations, fair lending requirements' },
    { id: 'government', name: 'Government', riskProfile: 'Public accountability, transparency, fairness' },
    { id: 'insurance', name: 'Insurance', riskProfile: 'High regulatory oversight, actuarial accuracy critical' },
    { id: 'retail', name: 'Retail', riskProfile: 'Consumer protection, brand safety' },
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

  // Business Criticality levels (NIST RMF)
  const businessCriticalityLevels = [
    { id: 'mission_critical', name: 'Mission Critical', description: 'Essential for core business operations', riskMultiplier: 'High' },
    { id: 'business_critical', name: 'Business Critical', description: 'Important for business operations', riskMultiplier: 'Medium' },
    { id: 'business_important', name: 'Business Important', description: 'Supports business operations', riskMultiplier: 'Medium' },
    { id: 'administrative', name: 'Administrative', description: 'Administrative or support functions', riskMultiplier: 'Low' }
  ];

  // Data Classification levels
  const dataClassifications = [
    { id: 'public', name: 'Public', description: 'No harm if disclosed', riskLevel: 'Low' },
    { id: 'internal', name: 'Internal', description: 'Internal business information', riskLevel: 'Medium' },
    { id: 'confidential', name: 'Confidential', description: 'Sensitive business information', riskLevel: 'High' },
    { id: 'restricted', name: 'Restricted', description: 'Highly sensitive, regulated data', riskLevel: 'Critical' }
  ];

  // EU AI Act Risk Classifications
  const euAiActRiskClasses = [
    { id: 'unacceptable', name: 'Unacceptable Risk', description: 'Prohibited AI practices', color: 'red' },
    { id: 'high_risk', name: 'High Risk', description: 'Mandatory TEVV requirements', color: 'orange' },
    { id: 'limited_risk', name: 'Limited Risk', description: 'Transparency obligations', color: 'yellow' },
    { id: 'minimal_risk', name: 'Minimal Risk', description: 'No specific obligations', color: 'green' }
  ];

  // User Base sizes
  const userBaseSizes = [
    { id: 'small', name: 'Small (< 1K users)', description: 'Limited user base', riskLevel: 'Low' },
    { id: 'medium', name: 'Medium (1K - 10K users)', description: 'Moderate user base', riskLevel: 'Medium' },
    { id: 'large', name: 'Large (10K - 100K users)', description: 'Large user base', riskLevel: 'High' },
    { id: 'enterprise', name: 'Enterprise (> 100K users)', description: 'Very large user base', riskLevel: 'Critical' }
  ];

  // Geographic Scope
  const geographicScopes = [
    { id: 'local', name: 'Local', description: 'Single location/city', riskLevel: 'Low' },
    { id: 'regional', name: 'Regional', description: 'State/province level', riskLevel: 'Medium' },
    { id: 'national', name: 'National', description: 'Country-wide deployment', riskLevel: 'High' },
    { id: 'international', name: 'International', description: 'Multi-country deployment', riskLevel: 'Critical' }
  ];

  // Human Oversight Levels (EU AI Act Article 14)
  const humanOversightLevels = [
    { id: 'human_in_loop', name: 'Human-in-the-Loop', description: 'Human validates each AI decision', riskLevel: 'Low' },
    { id: 'human_on_loop', name: 'Human-on-the-Loop', description: 'Human monitors AI decisions', riskLevel: 'Medium' },
    { id: 'human_out_loop', name: 'Human-out-of-the-Loop', description: 'Minimal human oversight', riskLevel: 'High' },
    { id: 'meaningful_control', name: 'Meaningful Human Control', description: 'Human retains decision authority', riskLevel: 'Low' }
  ];

  // Deployment Context
  const deploymentContexts = [
    { id: 'cloud_public', name: 'Public Cloud', description: 'AWS, Azure, GCP', riskLevel: 'Medium' },
    { id: 'cloud_private', name: 'Private Cloud', description: 'Dedicated cloud infrastructure', riskLevel: 'Low' },
    { id: 'on_premise', name: 'On-Premise', description: 'Internal data centers', riskLevel: 'Low' },
    { id: 'hybrid', name: 'Hybrid', description: 'Mix of cloud and on-premise', riskLevel: 'Medium' },
    { id: 'edge', name: 'Edge Computing', description: 'Distributed edge deployment', riskLevel: 'High' },
    { id: 'mobile', name: 'Mobile/Device', description: 'Mobile app or device deployment', riskLevel: 'High' }
  ];

  // Model Providers
  const modelProviders = [
    'OpenAI', 'Anthropic', 'Google', 'Microsoft Azure OpenAI', 'AWS Bedrock', 
    'Hugging Face', 'Cohere', 'Mistral', 'Meta', 'Custom/On-premise'
  ];

  // Model Types
  const modelTypes = [
    'Large Language Model (LLM)', 'Multimodal Model', 'Embedding Model', 
    'Fine-tuned Model', 'RAG System', 'Agent Framework', 'Custom Model'
  ];

  // Data Flow Patterns
  const dataFlowPatterns = [
    'Batch Processing', 'Real-time Streaming', 'Request-Response', 
    'Event-Driven', 'Pub/Sub Messaging', 'Hybrid Flow'
  ];

  // Integration Patterns
  const integrationPatterns = [
    'API Gateway', 'Direct Integration', 'Message Queue', 
    'Webhook', 'Embedded SDK', 'Microservices'
  ];

  // Authentication methods for integration
  const authMethods = [
    'API Key', 'Bearer Token', 'OAuth 2.0', 'mTLS Certificate', 'SAML', 'Custom Authentication'
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
    
    // Basic Application Info
    if (!formData.applicationName.trim()) errors.push('Application Name is required');
    if (!formData.applicationType) errors.push('Application Type must be selected');
    if (!formData.domain) errors.push('Domain must be selected');
    if (!formData.environment) errors.push('Environment must be selected');
    
    // NIST RMF Required
    if (!formData.businessCriticality) errors.push('Business Criticality must be selected');
    if (!formData.dataClassification) errors.push('Data Classification must be selected');
    if (!formData.userBase) errors.push('User Base Size must be selected');
    if (!formData.geographicScope) errors.push('Geographic Scope must be selected');
    
    // EU TEVV Required
    if (!formData.euAiActRiskClass) errors.push('EU AI Act Risk Classification must be selected');
    if (!formData.intendedPurpose.trim()) errors.push('Intended Purpose is required');
    if (!formData.targetUsers.trim()) errors.push('Target Users must be specified');
    if (!formData.deploymentContext) errors.push('Deployment Context must be selected');
    if (!formData.humanOversight) errors.push('Human Oversight Level must be selected');
    
    // Technical Architecture
    if (!formData.modelProvider) errors.push('Model Provider must be selected');
    if (!formData.modelType) errors.push('Model Type must be selected');
    if (!formData.dataFlow) errors.push('Data Flow Pattern must be selected');
    if (!formData.integrationPattern) errors.push('Integration Pattern must be selected');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleComplete = () => {
    if (validateMandatoryFields()) {
      setIsComplete(true);
      
      // Generate application profile
      const applicationProfile = generateApplicationProfile();
      
      console.log('Application Setup Output:', {
        applicationProfile,
        auditLog: generateAuditEntry(),
        evidenceStub: generateEvidenceStub()
      });
      
      // Navigate to Use Case Definition after showing completion
      setTimeout(() => {
        if (onNavigateToUseCase) {
          onNavigateToUseCase();
        }
      }, 2000);
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
        businessCriticality: formData.businessCriticality,
        dataClassification: formData.dataClassification,
        userBase: formData.userBase,
        geographicScope: formData.geographicScope,
        euAiActRiskClass: formData.euAiActRiskClass,
        intendedPurpose: formData.intendedPurpose,
        targetUsers: formData.targetUsers,
        deploymentContext: formData.deploymentContext,
        humanOversight: formData.humanOversight,
        modelProvider: formData.modelProvider,
        modelType: formData.modelType,
        dataFlow: formData.dataFlow,
        integrationPattern: formData.integrationPattern,
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

  const generateAuditEntry = () => {
    return {
      action: 'Application Setup completed',
      user: currentUser?.name || 'System User',
      timestamp: new Date().toISOString(),
      applicationProfile: generateApplicationProfile()
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

  const selectedDomain = domains.find(d => d.id === formData.domain);
  const selectedEnvironment = environments.find(e => e.id === formData.environment);
  const selectedAppType = applicationTypes.find(t => t.id === formData.applicationType);
  const selectedBusinessCriticality = businessCriticalityLevels.find(b => b.id === formData.businessCriticality);
  const selectedDataClassification = dataClassifications.find(d => d.id === formData.dataClassification);
  const selectedEuRiskClass = euAiActRiskClasses.find(e => e.id === formData.euAiActRiskClass);

  return (
    <div className="space-y-8">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between">
        <div>
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
        {/* Basic Application Information */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Basic Application Information</h3>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-full font-medium">
              Required
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

        {/* NIST RMF Required Fields */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">NIST RMF Context</h3>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
              Risk Management Framework
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Criticality */}
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
                <option value="">Select Business Criticality</option>
                {businessCriticalityLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
              {selectedBusinessCriticality && (
                <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">{selectedBusinessCriticality.description}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Risk Multiplier: {selectedBusinessCriticality.riskMultiplier}
                  </p>
                </div>
              )}
            </div>

            {/* Data Classification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Classification *
              </label>
              <select
                value={formData.dataClassification}
                onChange={(e) => setFormData(prev => ({ ...prev, dataClassification: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select Data Classification</option>
                {dataClassifications.map(classification => (
                  <option key={classification.id} value={classification.id}>{classification.name}</option>
                ))}
              </select>
              {selectedDataClassification && (
                <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">{selectedDataClassification.description}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Risk Level: {selectedDataClassification.riskLevel}
                  </p>
                </div>
              )}
            </div>

            {/* User Base */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User Base Size *
              </label>
              <select
                value={formData.userBase}
                onChange={(e) => setFormData(prev => ({ ...prev, userBase: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select User Base Size</option>
                {userBaseSizes.map(size => (
                  <option key={size.id} value={size.id}>{size.name}</option>
                ))}
              </select>
            </div>

            {/* Geographic Scope */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Geographic Scope *
              </label>
              <select
                value={formData.geographicScope}
                onChange={(e) => setFormData(prev => ({ ...prev, geographicScope: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select Geographic Scope</option>
                {geographicScopes.map(scope => (
                  <option key={scope.id} value={scope.id}>{scope.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* EU TEVV Required Fields */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">EU AI Act TEVV Requirements</h3>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full font-medium">
              Testing, Evaluation, Validation, Verification
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* EU AI Act Risk Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                EU AI Act Risk Classification *
              </label>
              <select
                value={formData.euAiActRiskClass}
                onChange={(e) => setFormData(prev => ({ ...prev, euAiActRiskClass: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value="">Select Risk Classification</option>
                {euAiActRiskClasses.map(riskClass => (
                  <option key={riskClass.id} value={riskClass.id}>{riskClass.name}</option>
                ))}
              </select>
              {selectedEuRiskClass && (
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{selectedEuRiskClass.description}</p>
                </div>
              )}
            </div>

            {/* Human Oversight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Human Oversight Level *
              </label>
              <select
                value={formData.humanOversight}
                onChange={(e) => setFormData(prev => ({ ...prev, humanOversight: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value="">Select Human Oversight Level</option>
                {humanOversightLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>

            {/* Intended Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intended Purpose *
              </label>
              <textarea
                value={formData.intendedPurpose}
                onChange={(e) => setFormData(prev => ({ ...prev, intendedPurpose: e.target.value }))}
                placeholder="Describe the intended purpose and use of the AI system..."
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50 h-20 resize-none"
              />
            </div>

            {/* Target Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Users *
              </label>
              <input
                type="text"
                value={formData.targetUsers}
                onChange={(e) => setFormData(prev => ({ ...prev, targetUsers: e.target.value }))}
                placeholder="e.g., Healthcare professionals, Financial analysts, General public"
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>

            {/* Deployment Context */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deployment Context *
              </label>
              <select
                value={formData.deploymentContext}
                onChange={(e) => setFormData(prev => ({ ...prev, deploymentContext: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value="">Select Deployment Context</option>
                {deploymentContexts.map(context => (
                  <option key={context.id} value={context.id}>{context.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Technical Architecture</h3>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full font-medium">
              Required
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Provider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model Provider *
              </label>
              <select
                value={formData.modelProvider}
                onChange={(e) => setFormData(prev => ({ ...prev, modelProvider: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                <option value="">Select Model Provider</option>
                {modelProviders.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            {/* Model Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model Type *
              </label>
              <select
                value={formData.modelType}
                onChange={(e) => setFormData(prev => ({ ...prev, modelType: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                <option value="">Select Model Type</option>
                {modelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Data Flow */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Flow Pattern *
              </label>
              <select
                value={formData.dataFlow}
                onChange={(e) => setFormData(prev => ({ ...prev, dataFlow: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                <option value="">Select Data Flow Pattern</option>
                {dataFlowPatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>

            {/* Integration Pattern */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Integration Pattern *
              </label>
              <select
                value={formData.integrationPattern}
                onChange={(e) => setFormData(prev => ({ ...prev, integrationPattern: e.target.value }))}
                disabled={!canCreate}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                <option value="">Select Integration Pattern</option>
                {integrationPatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Optional Integration Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Integration Details</h3>
                <p className="text-gray-600 dark:text-gray-400">Optional now, required for Stage 2 (Trust Metrics Engine)</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowIntegrationDetails(!showIntegrationDetails)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>{showIntegrationDetails ? 'Hide' : 'Show'} Integration</span>
            </button>
          </div>

          {showIntegrationDetails && (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
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
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
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
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
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
               "Complete all required fields to proceed to Use Case Definition"}
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button 
                    onClick={() => {
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
                    disabled={!validateMandatoryFields()}
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
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Application Profile</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Name: {formData.applicationName}</div>
                <div>Type: {formData.applicationType}</div>
                <div>Domain: {formData.domain}</div>
                <div>Environment: {formData.environment}</div>
                <div>Risk Class: {formData.euAiActRiskClass}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Compliance Context</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>NIST RMF: Ready</div>
                <div>EU TEVV: Configured</div>
                <div>Business Criticality: {formData.businessCriticality}</div>
                <div>Data Classification: {formData.dataClassification}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Evidence Package</span>
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Profile Created: ✓</div>
                <div>Audit Log: Generated</div>
                <div>Export Ready: JSON/CSV</div>
                <div>Traceability: Ready</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">
                    Navigating to Use Case Definition...
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Application profile will be used as context for business scenario mapping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationSetup;