import React, { useState } from 'react';
import { 
  Database, 
  Building, 
  Globe, 
  Shield,
  Users,
  Brain,
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Save,
  Eye,
  Code,
  Lock,
  Activity,
  Target,
  FileText,
  Zap,
  Cloud,
  Server,
  Smartphone
} from 'lucide-react';

interface ApplicationSetupProps {
  onNavigateToUseCase?: () => void;
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const ApplicationSetup: React.FC<ApplicationSetupProps> = ({ 
  onNavigateToUseCase,
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [formData, setFormData] = useState({
    // Basic Information
    applicationName: '',
    applicationDescription: '',
    applicationVersion: '1.0.0',
    
    // NIST RMF Required Fields
    businessCriticality: '',
    dataClassification: '',
    userBaseSize: '',
    geographicScope: '',
    
    // EU TEVV Required Fields
    euAiActRiskClass: '',
    intendedPurpose: '',
    targetUsers: '',
    deploymentContext: '',
    humanOversightLevel: '',
    
    // Technical Architecture
    modelProvider: '',
    modelType: '',
    dataFlowPattern: '',
    integrationPattern: '',
    
    // Compliance & Governance
    applicableFrameworks: [] as string[],
    stakeholderImpact: '',
    riskMitigation: ''
  });

  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFrameworkChange = (framework: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      applicableFrameworks: checked 
        ? [...prev.applicableFrameworks, framework]
        : prev.applicableFrameworks.filter(f => f !== framework)
    }));
  };

  const handleComplete = () => {
    // Check all mandatory fields are filled
    const requiredFields = [
      'applicationName',
      'applicationDescription',
      'businessCriticality',
      'dataClassification',
      'euAiActRiskClass',
      'intendedPurpose',
      'targetUsers',
      'humanOversightLevel',
      'modelProvider',
      'modelType'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return !value || (Array.isArray(value) && value.length === 0);
    });
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.map(f => f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(', ')}`);
      return;
    }

    // Check if at least one compliance framework is selected
    if (formData.applicableFrameworks.length === 0) {
      alert('Please select at least one applicable compliance framework');
      return;
    }

    setIsComplete(true);
    
    // Navigate to Use Case Definition after a brief delay
    setTimeout(() => {
      if (onNavigateToUseCase) {
        onNavigateToUseCase();
      }
    }, 1500);
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;

  // Check if all mandatory fields are filled
  const isMandatoryFieldsFilled = () => {
    const requiredFields = [
      'applicationName',
      'applicationDescription', 
      'businessCriticality',
      'dataClassification',
      'euAiActRiskClass',
      'intendedPurpose',
      'targetUsers',
      'humanOversightLevel',
      'modelProvider',
      'modelType'
    ];

    const allFieldsFilled = requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.toString().trim() !== '';
    });

    const hasFrameworks = formData.applicableFrameworks.length > 0;

    return allFieldsFilled && hasFrameworks;
  };

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
              <FileText className="w-4 h-4" />
              <span>Input to Use Case Definition</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Configure your GenAI application for governance and compliance</p>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Application metadata & API config</li>
              <li>• NIST RMF classification data</li>
              <li>• EU AI Act risk assessment</li>
              <li>• Technical architecture details</li>
              <li>• Compliance framework mapping</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Application Profiling</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">Creating baseline context</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Application Profile created</li>
              <li>• Context Baseline established</li>
              <li>• Integration verified</li>
              <li>• Ready for use case mapping</li>
              <li>• Evidence: Setup documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-8">
          {/* Basic Application Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span>Basic Application Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Name *
                </label>
                <input
                  type="text"
                  value={formData.applicationName}
                  onChange={(e) => handleInputChange('applicationName', e.target.value)}
                  placeholder="Healthcare Triage Assistant"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Version *
                </label>
                <input
                  type="text"
                  value={formData.applicationVersion}
                  onChange={(e) => handleInputChange('applicationVersion', e.target.value)}
                  placeholder="1.0.0"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Description *
              </label>
              <textarea
                value={formData.applicationDescription}
                onChange={(e) => handleInputChange('applicationDescription', e.target.value)}
                placeholder="AI-powered medical triage system for emergency departments..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
          </div>

          {/* NIST RMF Classification */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-600" />
              <span>NIST RMF Classification</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Criticality *
                </label>
                <select
                  value={formData.businessCriticality}
                  onChange={(e) => handleInputChange('businessCriticality', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Criticality</option>
                  <option value="mission_critical">Mission Critical (Life/Safety Impact)</option>
                  <option value="business_critical">Business Critical (Revenue Impact)</option>
                  <option value="business_important">Business Important (Operational Impact)</option>
                  <option value="administrative">Administrative (Support Functions)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Classification *
                </label>
                <select
                  value={formData.dataClassification}
                  onChange={(e) => handleInputChange('dataClassification', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Data Classification</option>
                  <option value="public">Public (No restrictions)</option>
                  <option value="internal">Internal (Company confidential)</option>
                  <option value="confidential">Confidential (Restricted access)</option>
                  <option value="restricted">Restricted (Highly sensitive)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User Base Size
                </label>
                <select
                  value={formData.userBaseSize}
                  onChange={(e) => handleInputChange('userBaseSize', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select User Base Size</option>
                  <option value="small">Small (&lt; 100 users)</option>
                  <option value="medium">Medium (100-1,000 users)</option>
                  <option value="large">Large (1,000-10,000 users)</option>
                  <option value="enterprise">Enterprise (&gt; 10,000 users)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Geographic Scope
                </label>
                <select
                  value={formData.geographicScope}
                  onChange={(e) => handleInputChange('geographicScope', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Geographic Scope</option>
                  <option value="local">Local (Single location)</option>
                  <option value="regional">Regional (State/Province)</option>
                  <option value="national">National (Single country)</option>
                  <option value="international">International (Multiple countries)</option>
                  <option value="global">Global (Worldwide)</option>
                </select>
              </div>
            </div>
          </div>

          {/* EU AI Act Requirements */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span>EU AI Act Requirements</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  EU AI Act Risk Classification *
                </label>
                <select
                  value={formData.euAiActRiskClass}
                  onChange={(e) => handleInputChange('euAiActRiskClass', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Risk Classification</option>
                  <option value="unacceptable">Unacceptable Risk (Prohibited)</option>
                  <option value="high_risk">High Risk (Mandatory TEVV)</option>
                  <option value="limited_risk">Limited Risk (Transparency Obligations)</option>
                  <option value="minimal_risk">Minimal Risk (No Specific Obligations)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Human Oversight Level *
                </label>
                <select
                  value={formData.humanOversightLevel}
                  onChange={(e) => handleInputChange('humanOversightLevel', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Oversight Level</option>
                  <option value="human_in_loop">Human-in-the-Loop (Continuous oversight)</option>
                  <option value="human_on_loop">Human-on-the-Loop (Monitoring)</option>
                  <option value="human_out_loop">Human-out-of-Loop (Minimal oversight)</option>
                  <option value="meaningful_control">Meaningful Human Control</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Users *
                </label>
                <input
                  type="text"
                  value={formData.targetUsers}
                  onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                  placeholder="Emergency department staff, triage nurses"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deployment Context
                </label>
                <select
                  value={formData.deploymentContext}
                  onChange={(e) => handleInputChange('deploymentContext', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Deployment Context</option>
                  <option value="cloud">Cloud (Public/Private)</option>
                  <option value="on_premise">On-Premise</option>
                  <option value="hybrid">Hybrid Cloud</option>
                  <option value="edge">Edge Computing</option>
                  <option value="mobile">Mobile/Device</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intended Purpose (Article 13 Technical Documentation) *
              </label>
              <textarea
                value={formData.intendedPurpose}
                onChange={(e) => handleInputChange('intendedPurpose', e.target.value)}
                placeholder="Assist emergency department staff in patient triage by analyzing symptoms and recommending priority levels..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-green-600" />
              <span>Technical Architecture</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model Provider *
                </label>
                <select
                  value={formData.modelProvider}
                  onChange={(e) => handleInputChange('modelProvider', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Model Provider</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google (Gemini)</option>
                  <option value="azure_openai">Azure OpenAI</option>
                  <option value="aws_bedrock">AWS Bedrock</option>
                  <option value="hugging_face">Hugging Face</option>
                  <option value="cohere">Cohere</option>
                  <option value="mistral">Mistral AI</option>
                  <option value="custom">Custom/Self-hosted</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model Type *
                </label>
                <select
                  value={formData.modelType}
                  onChange={(e) => handleInputChange('modelType', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Model Type</option>
                  <option value="llm">Large Language Model (LLM)</option>
                  <option value="multimodal">Multimodal (Text + Vision/Audio)</option>
                  <option value="embedding">Embedding Model</option>
                  <option value="fine_tuned">Fine-tuned Model</option>
                  <option value="rag">RAG (Retrieval Augmented Generation)</option>
                  <option value="agent">AI Agent/Assistant</option>
                  <option value="custom">Custom Architecture</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Flow Pattern
                </label>
                <select
                  value={formData.dataFlowPattern}
                  onChange={(e) => handleInputChange('dataFlowPattern', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Data Flow Pattern</option>
                  <option value="batch">Batch Processing</option>
                  <option value="real_time">Real-time Processing</option>
                  <option value="request_response">Request-Response</option>
                  <option value="event_driven">Event-driven</option>
                  <option value="streaming">Streaming</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Integration Pattern
                </label>
                <select
                  value={formData.integrationPattern}
                  onChange={(e) => handleInputChange('integrationPattern', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Integration Pattern</option>
                  <option value="api_gateway">API Gateway</option>
                  <option value="direct_api">Direct API Integration</option>
                  <option value="message_queue">Message Queue</option>
                  <option value="webhook">Webhook</option>
                  <option value="embedded">Embedded SDK</option>
                  <option value="microservice">Microservice</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compliance Framework Mapping */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Compliance Framework Mapping</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Applicable Compliance Frameworks *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'NIST AI RMF',
                  'EU AI Act', 
                  'GDPR',
                  'HIPAA',
                  'SOX',
                  'CCPA',
                  'ISO 27001',
                  'SOC 2',
                  'FedRAMP',
                  'PCI DSS',
                  'Medical Device Regulation',
                  'Fair Lending (ECOA)'
                ].map(framework => (
                  <label key={framework} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={formData.applicableFrameworks.includes(framework)}
                      onChange={(e) => handleFrameworkChange(framework, e.target.checked)}
                      className="rounded border-gray-300" 
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stakeholder Impact Assessment
                </label>
                <textarea
                  value={formData.stakeholderImpact}
                  onChange={(e) => handleInputChange('stakeholderImpact', e.target.value)}
                  placeholder="Identify key stakeholders and potential impacts (patients, healthcare providers, regulators)..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Mitigation Strategy
                </label>
                <textarea
                  value={formData.riskMitigation}
                  onChange={(e) => handleInputChange('riskMitigation', e.target.value)}
                  placeholder="Describe planned risk mitigation measures and controls..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-indigo-600" />
              <span>API Configuration</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Endpoint
                </label>
                <input
                  type="url"
                  value={formData.apiEndpoint}
                  onChange={(e) => handleInputChange('apiEndpoint', e.target.value)}
                  placeholder="https://api.healthcare.com/triage"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Authentication Method
                </label>
                <select
                  value={formData.authMethod}
                  onChange={(e) => handleInputChange('authMethod', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Authentication</option>
                  <option value="api_key">API Key</option>
                  <option value="bearer_token">Bearer Token</option>
                  <option value="oauth2">OAuth 2.0</option>
                  <option value="mtls">mTLS Certificate</option>
                  <option value="saml">SAML</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key / Token
              </label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

                <div>Business: {formData.businessCriticality}</div>
                <div>EU AI Act: {formData.euAiActRiskClass}</div>
                <div>Frameworks: {formData.applicableFrameworks.length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Steps</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>✓ Profile created</div>
                <div>✓ Context established</div>
                <div>→ Navigating to Use Cases...</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationSetup;