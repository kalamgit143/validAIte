import React, { useState, useEffect } from 'react';
import {
  Building,
  Code,
  Target,
  Upload,
  Save,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Database,
  Shield,
  Users,
  FileText,
  Globe,
  Lock,
  Activity,
  Settings,
  Eye,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  User,
  Briefcase,
  Server,
  Cloud,
  Terminal,
  Brain,
  CheckSquare,
  XCircle
} from 'lucide-react';
import { classifyApplication } from '../utils/applicationClassifier';

interface ApplicationData {
  application_name: string;
  application_description: string;
  domain: string;
  organization: string;
  business_owner: string;
  tech_owner: string;
  deployment_environment: string;
  data_sensitivity: string[];
  autonomy_level: string;
  modifiers: string[];
  risk_context_notes: string;
}

interface TechnicalDetails {
  interface_type: string;
  frontend_tech_stack: string;
  backend_tech_stack: string;
  llm_provider: string;
  llm_model_name: string;
  embedding_provider: string;
  vector_db: string;
  retrieval_mechanism: string;
  api_endpoints: { method: string; path: string; description: string }[];
  auth_method: string;
  auth_token: string;
  ui_url: string;
  ui_input_selector: string;
  ui_output_selector: string;
  integration_tools: string[];
  deployment_logs_api: string;
}

interface UseCase {
  use_case_id: string;
  use_case_title: string;
  use_case_description: string;
  expected_behavior: string;
  risk_association: string[];
  data_source: string;
  sme_owner: string;
  priority: string;
  evaluation_scope: string[];
}

interface UploadedFile {
  type: string;
  file: File | null;
  name: string;
}

interface SystemMetadata {
  created_by: string;
  created_date: string;
  tenant_id: string;
  version: string;
  status: string;
}

interface SystemOutputs {
  archetype_code: string;
  risk_tier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  modifiers: string[];
  recommended_risks: string[];
  recommended_metrics: string[];
  governance_controls: string[];
  assurance_playbook: string;
}

const ApplicationSetup: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isFinalized, setIsFinalized] = useState(false);
  const [systemOutputs, setSystemOutputs] = useState<SystemOutputs | null>(null);
  const [userDecision, setUserDecision] = useState<'accept' | 'override'>('accept');
  const [overrideReason, setOverrideReason] = useState('');

  const [applicationData, setApplicationData] = useState<ApplicationData>({
    application_name: '',
    application_description: '',
    domain: 'insurance',
    organization: '',
    business_owner: '',
    tech_owner: '',
    deployment_environment: 'staging',
    data_sensitivity: [],
    autonomy_level: 'advisory',
    modifiers: [],
    risk_context_notes: ''
  });

  const [technicalDetails, setTechnicalDetails] = useState<TechnicalDetails>({
    interface_type: 'hybrid',
    frontend_tech_stack: '',
    backend_tech_stack: '',
    llm_provider: 'openai',
    llm_model_name: '',
    embedding_provider: '',
    vector_db: '',
    retrieval_mechanism: '',
    api_endpoints: [],
    auth_method: 'api-key',
    auth_token: '',
    ui_url: '',
    ui_input_selector: '',
    ui_output_selector: '',
    integration_tools: [],
    deployment_logs_api: ''
  });

  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [currentUseCase, setCurrentUseCase] = useState<UseCase>({
    use_case_id: '',
    use_case_title: '',
    use_case_description: '',
    expected_behavior: '',
    risk_association: [],
    data_source: '',
    sme_owner: '',
    priority: 'medium',
    evaluation_scope: []
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [systemMetadata, setSystemMetadata] = useState<SystemMetadata>({
    created_by: 'nageswara@qualizeal.com',
    created_date: new Date().toISOString(),
    tenant_id: 'T-1003',
    version: 'v1.0',
    status: 'draft'
  });

  const domains = ['Insurance', 'Banking', 'Healthcare', 'Retail', 'Government', 'Education', 'Technology', 'Manufacturing'];
  const dataSensitivityOptions = ['None', 'PII', 'PHI', 'Financial', 'Confidential'];
  const autonomyLevels = ['Advisory', 'Decisioning', 'Action-Taking'];
  const modifierOptions = ['RAG', 'Fine-Tuned (FT)', 'Agentic (AG)', 'Multimodal (MM)', 'Enterprise (ENT)'];
  const deploymentEnvironments = ['Staging', 'Production', 'Cloud', 'On-Prem'];
  const interfaceTypes = ['UI', 'API', 'Hybrid'];
  const llmProviders = ['OpenAI', 'Anthropic', 'Mistral', 'Google', 'Custom'];
  const authMethods = ['API Key', 'Bearer Token', 'OAuth 2.0'];
  const vectorDbs = ['ChromaDB', 'Pinecone', 'Weaviate', 'Qdrant', 'Milvus'];
  const integrationToolOptions = ['Salesforce', 'SAP', 'Google Drive', 'Slack', 'Microsoft Teams', 'Jira'];
  const priorities = ['High', 'Medium', 'Low'];
  const riskTypes = ['Hallucination', 'Bias', 'Privacy Leak', 'Toxicity', 'Drift', 'Security'];
  const evaluationScopes = ['Faithfulness', 'Bias', 'Privacy', 'Robustness', 'Toxicity', 'Fairness'];
  const dataSources = ['Knowledge Base', 'API', 'SME Docs', 'Database', 'External Service'];
  const statusOptions = ['Draft', 'Submitted', 'Approved', 'Archived'];

  useEffect(() => {
    if (isFinalized && !systemOutputs) {
      generateSystemOutputs();
    }
  }, [isFinalized]);

  const generateSystemOutputs = () => {
    const outputs = classifyApplication({
      domain: applicationData.domain,
      modifiers: applicationData.modifiers,
      data_sensitivity: applicationData.data_sensitivity,
      autonomy_level: applicationData.autonomy_level,
      deployment_environment: applicationData.deployment_environment,
      has_rag: applicationData.modifiers.includes('RAG') || !!technicalDetails.vector_db,
      has_multimodal: applicationData.modifiers.includes('Multimodal (MM)'),
      has_agentic: applicationData.modifiers.includes('Agentic (AG)')
    });

    setSystemOutputs(outputs);
  };

  const toggleSection = (section: number) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleArrayValue = (
    array: string[],
    value: string,
    setter: (value: any) => void,
    key: string
  ) => {
    const newArray = array.includes(value)
      ? array.filter(v => v !== value)
      : [...array, value];
    setter((prev: any) => ({ ...prev, [key]: newArray }));
  };

  const addUseCase = () => {
    if (currentUseCase.use_case_title.trim()) {
      setUseCases([...useCases, { ...currentUseCase, use_case_id: `UC-${String(useCases.length + 1).padStart(2, '0')}` }]);
      setCurrentUseCase({
        use_case_id: '',
        use_case_title: '',
        use_case_description: '',
        expected_behavior: '',
        risk_association: [],
        data_source: '',
        sme_owner: '',
        priority: 'medium',
        evaluation_scope: []
      });
    }
  };

  const removeUseCase = (index: number) => {
    setUseCases(useCases.filter((_, i) => i !== index));
  };

  const addApiEndpoint = () => {
    setTechnicalDetails(prev => ({
      ...prev,
      api_endpoints: [...prev.api_endpoints, { method: 'POST', path: '', description: '' }]
    }));
  };

  const updateApiEndpoint = (index: number, field: string, value: string) => {
    setTechnicalDetails(prev => ({
      ...prev,
      api_endpoints: prev.api_endpoints.map((ep, i) =>
        i === index ? { ...ep, [field]: value } : ep
      )
    }));
  };

  const removeApiEndpoint = (index: number) => {
    setTechnicalDetails(prev => ({
      ...prev,
      api_endpoints: prev.api_endpoints.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => [
        ...prev.filter(f => f.type !== type),
        { type, file, name: file.name }
      ]);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const handleFinalize = () => {
    setSystemMetadata(prev => ({ ...prev, status: 'submitted' }));
    setIsFinalized(true);
    setActiveSection(5);
    if (!expandedSections.includes(5)) {
      setExpandedSections([...expandedSections, 5]);
    }
  };

  const calculateCompleteness = () => {
    let completed = 0;
    let total = 0;

    total += 5;
    if (applicationData.application_name) completed++;
    if (applicationData.application_description) completed++;
    if (applicationData.organization) completed++;
    if (applicationData.business_owner) completed++;
    if (applicationData.tech_owner) completed++;

    total += 3;
    if (technicalDetails.llm_provider) completed++;
    if (technicalDetails.llm_model_name) completed++;
    if (technicalDetails.interface_type) completed++;

    total += 1;
    if (useCases.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const getSectionIcon = (section: number) => {
    const icons = [Building, Code, Target, Upload, Award];
    const Icon = icons[section - 1];
    return <Icon className="w-5 h-5" />;
  };

  const sections = [
    'Basic Application Information',
    'Technical Details (UI/API)',
    'Functional Use Case Catalog',
    'File Upload & Integrations',
    'Finalized Application Profile'
  ];

  const getCompletenessColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRiskTierColor = (tier: string) => {
    switch (tier) {
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-500';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-500';
      case 'HIGH': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 border-orange-500';
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-500';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-500';
    }
  };

  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Application Setup
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Begin your AI governance journey with our comprehensive 10-stage workflow. Configure your GenAI application details, archetype classification, and technical specifications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className={`text-2xl font-bold ${getCompletenessColor(completeness)}`}>
              {completeness}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {saveStatus === 'saving' ? (
              <>
                <Activity className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Draft</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 flex items-start space-x-3 shadow-sm">
        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Complete Setup Guide</h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Fill in all sections to establish the foundation for your AI governance workflow. The system will automatically generate archetype classification, risk tier, and recommended controls based on your inputs.
          </p>
        </div>
      </div>

      {sections.map((sectionName, idx) => {
        const sectionNum = idx + 1;
        const isExpanded = expandedSections.includes(sectionNum);
        const isActive = activeSection === sectionNum;

        return (
          <div
            key={sectionNum}
            className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all shadow-md hover:shadow-lg ${
              isActive
                ? 'border-blue-500 dark:border-blue-400 shadow-blue-200 dark:shadow-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <button
              onClick={() => {
                setActiveSection(sectionNum);
                if (!isExpanded) toggleSection(sectionNum);
              }}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-110'
                    : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {getSectionIcon(sectionNum)}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>Section {sectionNum}:</span>
                    <span>{sectionName}</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {sectionNum === 1 && 'Core application information and business context'}
                    {sectionNum === 2 && 'Technical stack, LLM configuration, and integrations'}
                    {sectionNum === 3 && 'Define and manage functional use cases'}
                    {sectionNum === 4 && 'Upload knowledge base and configuration files'}
                    {sectionNum === 5 && 'System-generated outputs with review and override'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {sectionNum === 5 && isFinalized && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-xs font-medium flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Generated</span>
                  </span>
                )}
                {isExpanded ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                <div className="pt-6 space-y-6">
                  {/* SECTION 1-4 CONTENT - Keep the same as before */}
                  {sectionNum === 1 && (
                    <div className="space-y-5">
                      {/* ... Previous Section 1 content ... */}
                      {/* I'll keep it short for readability, but it's the same as before */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Application Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.application_name}
                            onChange={e => setApplicationData({ ...applicationData, application_name: e.target.value })}
                            placeholder="e.g., Insurance Policy Assistant"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Domain <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={applicationData.domain}
                            onChange={e => setApplicationData({ ...applicationData, domain: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {domains.map(d => (
                              <option key={d} value={d.toLowerCase()}>{d}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Application Description
                        </label>
                        <textarea
                          value={applicationData.application_description}
                          onChange={e => setApplicationData({ ...applicationData, application_description: e.target.value })}
                          placeholder="Describe what this application does and its primary purpose..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={applicationData.organization}
                            onChange={e => setApplicationData({ ...applicationData, organization: e.target.value })}
                            placeholder="e.g., Qualizeal InsureTech"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Deployment Environment
                          </label>
                          <select
                            value={applicationData.deployment_environment}
                            onChange={e => setApplicationData({ ...applicationData, deployment_environment: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {deploymentEnvironments.map(env => (
                              <option key={env} value={env.toLowerCase()}>{env}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Business Owner
                          </label>
                          <input
                            type="text"
                            value={applicationData.business_owner}
                            onChange={e => setApplicationData({ ...applicationData, business_owner: e.target.value })}
                            placeholder="e.g., John Doe – Product Manager"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Technical Owner
                          </label>
                          <input
                            type="text"
                            value={applicationData.tech_owner}
                            onChange={e => setApplicationData({ ...applicationData, tech_owner: e.target.value })}
                            placeholder="e.g., Jane Smith – Lead Engineer"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Data Sensitivity
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {dataSensitivityOptions.map(option => (
                            <button
                              key={option}
                              onClick={() => toggleArrayValue(
                                applicationData.data_sensitivity,
                                option.toLowerCase(),
                                setApplicationData,
                                'data_sensitivity'
                              )}
                              className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all ${
                                applicationData.data_sensitivity.includes(option.toLowerCase())
                                  ? 'bg-blue-500 border-blue-500 text-white shadow-md scale-105'
                                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Autonomy Level
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {autonomyLevels.map(level => (
                            <button
                              key={level}
                              onClick={() => setApplicationData({ ...applicationData, autonomy_level: level.toLowerCase() })}
                              className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all ${
                                applicationData.autonomy_level === level.toLowerCase()
                                  ? 'bg-blue-500 border-blue-500 text-white shadow-md scale-105'
                                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Modifiers
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {modifierOptions.map(modifier => (
                            <button
                              key={modifier}
                              onClick={() => toggleArrayValue(
                                applicationData.modifiers,
                                modifier,
                                setApplicationData,
                                'modifiers'
                              )}
                              className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all ${
                                applicationData.modifiers.includes(modifier)
                                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-md scale-105'
                                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-400'
                              }`}
                            >
                              {modifier}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Risk Context Notes
                        </label>
                        <textarea
                          value={applicationData.risk_context_notes}
                          onChange={e => setApplicationData({ ...applicationData, risk_context_notes: e.target.value })}
                          placeholder="Describe any critical business or ethical risks..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: Technical Details */}
                  {sectionNum === 2 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Interface Type
                          </label>
                          <select
                            value={technicalDetails.interface_type}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, interface_type: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {interfaceTypes.map(type => (
                              <option key={type} value={type.toLowerCase()}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            LLM Provider
                          </label>
                          <select
                            value={technicalDetails.llm_provider}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, llm_provider: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {llmProviders.map(provider => (
                              <option key={provider} value={provider.toLowerCase()}>{provider}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            LLM Model Name
                          </label>
                          <input
                            type="text"
                            value={technicalDetails.llm_model_name}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, llm_model_name: e.target.value })}
                            placeholder="e.g., gpt-4o-mini"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Frontend Tech Stack
                          </label>
                          <input
                            type="text"
                            value={technicalDetails.frontend_tech_stack}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, frontend_tech_stack: e.target.value })}
                            placeholder="e.g., React, TypeScript"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Backend Tech Stack
                          </label>
                          <input
                            type="text"
                            value={technicalDetails.backend_tech_stack}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, backend_tech_stack: e.target.value })}
                            placeholder="e.g., Node.js, Python FastAPI"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-600/30 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Database className="w-5 h-5 text-blue-600" />
                          <span>RAG Configuration</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Embedding Provider
                            </label>
                            <input
                              type="text"
                              value={technicalDetails.embedding_provider}
                              onChange={e => setTechnicalDetails({ ...technicalDetails, embedding_provider: e.target.value })}
                              placeholder="e.g., OpenAI, Cohere"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Vector Database
                            </label>
                            <select
                              value={technicalDetails.vector_db}
                              onChange={e => setTechnicalDetails({ ...technicalDetails, vector_db: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select...</option>
                              {vectorDbs.map(db => (
                                <option key={db} value={db.toLowerCase()}>{db}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Retrieval Mechanism
                            </label>
                            <input
                              type="text"
                              value={technicalDetails.retrieval_mechanism}
                              onChange={e => setTechnicalDetails({ ...technicalDetails, retrieval_mechanism: e.target.value })}
                              placeholder="Similarity search, Top k=5"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-600/30 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                            <Terminal className="w-5 h-5 text-green-600" />
                            <span>API Endpoints</span>
                          </h4>
                          <button
                            onClick={addApiEndpoint}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {technicalDetails.api_endpoints.map((endpoint, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg">
                              <select
                                value={endpoint.method}
                                onChange={e => updateApiEndpoint(index, 'method', e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                              >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                              </select>
                              <input
                                type="text"
                                value={endpoint.path}
                                onChange={e => updateApiEndpoint(index, 'path', e.target.value)}
                                placeholder="/api/endpoint"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                              />
                              <input
                                type="text"
                                value={endpoint.description}
                                onChange={e => updateApiEndpoint(index, 'description', e.target.value)}
                                placeholder="Description"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                              />
                              <button
                                onClick={() => removeApiEndpoint(index)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {technicalDetails.api_endpoints.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                              No endpoints added yet. Click "Add" to create one.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Authentication Method
                          </label>
                          <select
                            value={technicalDetails.auth_method}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, auth_method: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {authMethods.map(method => (
                              <option key={method} value={method.toLowerCase().replace(' ', '-')}>{method}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Authentication Token
                          </label>
                          <input
                            type="password"
                            value={technicalDetails.auth_token}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, auth_token: e.target.value })}
                            placeholder="Enter API key or token"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            UI URL
                          </label>
                          <input
                            type="url"
                            value={technicalDetails.ui_url}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, ui_url: e.target.value })}
                            placeholder="https://app.example.com"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            UI Input Selector
                          </label>
                          <input
                            type="text"
                            value={technicalDetails.ui_input_selector}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, ui_input_selector: e.target.value })}
                            placeholder="#chat-input"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            UI Output Selector
                          </label>
                          <input
                            type="text"
                            value={technicalDetails.ui_output_selector}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, ui_output_selector: e.target.value })}
                            placeholder="#chat-response"
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Integration Tools
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {integrationToolOptions.map(tool => (
                            <button
                              key={tool}
                              onClick={() => toggleArrayValue(
                                technicalDetails.integration_tools,
                                tool,
                                setTechnicalDetails,
                                'integration_tools'
                              )}
                              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                                technicalDetails.integration_tools.includes(tool)
                                  ? 'bg-green-500 border-green-500 text-white shadow-md scale-105'
                                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400'
                              }`}
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Deployment Logs API
                        </label>
                        <input
                          type="url"
                          value={technicalDetails.deployment_logs_api}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, deployment_logs_api: e.target.value })}
                          placeholder="https://api.example.com/logs"
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: Use Cases */}
                  {sectionNum === 3 && (
                    <div className="space-y-5">
                      <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
                          <Plus className="w-5 h-5" />
                          <span>Add New Use Case</span>
                        </h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={currentUseCase.use_case_title}
                              onChange={e => setCurrentUseCase({ ...currentUseCase, use_case_title: e.target.value })}
                              placeholder="Use Case Title"
                              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                              value={currentUseCase.priority}
                              onChange={e => setCurrentUseCase({ ...currentUseCase, priority: e.target.value })}
                              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            >
                              {priorities.map(p => (
                                <option key={p} value={p.toLowerCase()}>{p}</option>
                              ))}
                            </select>
                          </div>
                          <textarea
                            value={currentUseCase.use_case_description}
                            onChange={e => setCurrentUseCase({ ...currentUseCase, use_case_description: e.target.value })}
                            placeholder="Use case description"
                            rows={2}
                            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea
                            value={currentUseCase.expected_behavior}
                            onChange={e => setCurrentUseCase({ ...currentUseCase, expected_behavior: e.target.value })}
                            placeholder="Expected behavior"
                            rows={2}
                            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <select
                              value={currentUseCase.data_source}
                              onChange={e => setCurrentUseCase({ ...currentUseCase, data_source: e.target.value })}
                              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select Data Source</option>
                              {dataSources.map(source => (
                                <option key={source} value={source.toLowerCase()}>{source}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={currentUseCase.sme_owner}
                              onChange={e => setCurrentUseCase({ ...currentUseCase, sme_owner: e.target.value })}
                              placeholder="SME Owner"
                              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Risk Association
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {riskTypes.map(risk => (
                                <button
                                  key={risk}
                                  onClick={() => toggleArrayValue(
                                    currentUseCase.risk_association,
                                    risk,
                                    setCurrentUseCase,
                                    'risk_association'
                                  )}
                                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                                    currentUseCase.risk_association.includes(risk)
                                      ? 'bg-red-500 border-red-500 text-white shadow-md'
                                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-400'
                                  }`}
                                >
                                  {risk}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Evaluation Scope
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {evaluationScopes.map(scope => (
                                <button
                                  key={scope}
                                  onClick={() => toggleArrayValue(
                                    currentUseCase.evaluation_scope,
                                    scope,
                                    setCurrentUseCase,
                                    'evaluation_scope'
                                  )}
                                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                                    currentUseCase.evaluation_scope.includes(scope)
                                      ? 'bg-purple-500 border-purple-500 text-white shadow-md'
                                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400'
                                  }`}
                                >
                                  {scope}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={addUseCase}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg"
                          >
                            <Plus className="w-5 h-5" />
                            <span>Add Use Case</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span>Defined Use Cases ({useCases.length})</span>
                        </h4>
                        {useCases.length === 0 ? (
                          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                            <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No use cases defined yet</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add your first use case above</p>
                          </div>
                        ) : (
                          useCases.map((useCase, index) => (
                            <div
                              key={index}
                              className="p-5 bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-3">
                                    <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold shadow-sm">
                                      {useCase.use_case_id}
                                    </span>
                                    <h5 className="font-bold text-gray-900 dark:text-white text-lg">
                                      {useCase.use_case_title}
                                    </h5>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${
                                      useCase.priority === 'high'
                                        ? 'bg-red-500 text-white'
                                        : useCase.priority === 'medium'
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-green-500 text-white'
                                    }`}>
                                      {useCase.priority.toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                                    {useCase.use_case_description}
                                  </p>
                                  {useCase.risk_association.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {useCase.risk_association.map(risk => (
                                        <span
                                          key={risk}
                                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-xs font-medium"
                                        >
                                          {risk}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeUseCase(index)}
                                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* SECTION 4: File Uploads */}
                  {sectionNum === 4 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                          { type: 'knowledge_base', label: 'Knowledge Base', accept: '.pdf,.doc,.docx,.csv', icon: FileText },
                          { type: 'api_collection', label: 'API Collection', accept: '.json', icon: Code },
                          { type: 'ui_map', label: 'UI Locator Map', accept: '.json', icon: Target },
                          { type: 'use_case_sheet', label: 'Use Case Sheet', accept: '.xlsx,.csv', icon: Database }
                        ].map(({ type, label, accept, icon: Icon }) => (
                          <div key={type} className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                            <label className="block cursor-pointer">
                              <div className="flex flex-col items-center space-y-3">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                  <Icon className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                  {label}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {accept.split(',').join(', ').toUpperCase()}
                                </span>
                              </div>
                              <input
                                type="file"
                                onChange={e => handleFileUpload(type, e)}
                                accept={accept}
                                className="hidden"
                              />
                            </label>
                            {uploadedFiles.find(f => f.type === type) && (
                              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                                  <CheckCircle className="w-5 h-5" />
                                  <span className="text-sm font-medium truncate">
                                    {uploadedFiles.find(f => f.type === type)?.name}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION 5: SYSTEM OUTPUTS - NEW COMPREHENSIVE DISPLAY */}
                  {sectionNum === 5 && systemOutputs && (
                    <div className="space-y-6">
                      {/* System Outputs Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl text-white shadow-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <Brain className="w-10 h-10" />
                          <div>
                            <h3 className="text-3xl font-bold">System-Generated Outputs</h3>
                            <p className="text-blue-100 text-sm">Intelligent classification based on your configuration</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg">
                            <div className="text-xs text-blue-100 mb-1">Archetype Code</div>
                            <div className="text-2xl font-bold font-mono">{systemOutputs.archetype_code}</div>
                          </div>
                          <div className={`px-6 py-3 rounded-lg border-2 font-bold ${getRiskTierColor(systemOutputs.risk_tier)}`}>
                            <div className="text-xs mb-1">Risk Tier</div>
                            <div className="text-2xl">{systemOutputs.risk_tier}</div>
                          </div>
                        </div>
                      </div>

                      {/* Modifiers */}
                      {systemOutputs.modifiers.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-cyan-600" />
                            <span>Active Modifiers</span>
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {systemOutputs.modifiers.map(mod => (
                              <span key={mod} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-bold shadow-md">
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommended Risks */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span>Recommended Risks</span>
                          <span className="text-sm font-normal text-gray-500">({systemOutputs.recommended_risks.length} identified)</span>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {systemOutputs.recommended_risks.map(risk => (
                            <div key={risk} className="px-4 py-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium text-red-800 dark:text-red-300">
                              {risk}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Metrics */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span>Recommended Trust Metrics</span>
                          <span className="text-sm font-normal text-gray-500">({systemOutputs.recommended_metrics.length} metrics)</span>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {systemOutputs.recommended_metrics.map(metric => (
                            <div key={metric} className="px-4 py-2 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-sm font-medium text-green-800 dark:text-green-300">
                              {metric}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Governance Controls */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span>Governance Controls</span>
                          <span className="text-sm font-normal text-gray-500">({systemOutputs.governance_controls.length} controls)</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {systemOutputs.governance_controls.map(control => (
                            <div key={control} className="px-4 py-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center space-x-2">
                              <CheckSquare className="w-4 h-4" />
                              <span>{control}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assurance Playbook */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl border-2 border-purple-200 dark:border-purple-800 p-6">
                        <h4 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>Assurance Playbook</span>
                        </h4>
                        <div className="text-2xl font-mono font-bold text-purple-800 dark:text-purple-300">
                          {systemOutputs.assurance_playbook}
                        </div>
                        <p className="text-sm text-purple-700 dark:text-purple-400 mt-2">
                          Reference bundle for testing, evaluation, and validation procedures
                        </p>
                      </div>

                      {/* User Review & Override */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Users className="w-5 h-5 text-yellow-600" />
                          <span>User Review & Override</span>
                        </h4>

                        <div className="space-y-4">
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggested Archetype (LLM Output)</div>
                            <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">{systemOutputs.archetype_code}</div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              Human Validation
                            </label>
                            <div className="flex space-x-4">
                              <button
                                onClick={() => setUserDecision('accept')}
                                className={`flex-1 px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                                  userDecision === 'accept'
                                    ? 'bg-green-500 border-green-500 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                                Accept
                              </button>
                              <button
                                onClick={() => setUserDecision('override')}
                                className={`flex-1 px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                                  userDecision === 'override'
                                    ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <XCircle className="w-5 h-5 mx-auto mb-1" />
                                Override
                              </button>
                            </div>
                          </div>

                          {userDecision === 'override' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Override Reason (Optional)
                              </label>
                              <textarea
                                value={overrideReason}
                                onChange={e => setOverrideReason(e.target.value)}
                                placeholder="Explain why you're overriding the system recommendation..."
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                              />
                            </div>
                          )}

                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Archetype (Auto Commit)</div>
                            <div className="text-xl font-mono font-bold text-green-800 dark:text-green-300">
                              {userDecision === 'accept' ? systemOutputs.archetype_code : 'OVERRIDE-PENDING'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Roles Involved */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                          <span>Roles Involved</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <span>AI Risk Manager</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Reviews LLM suggestion, confirms risk tier
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span>Governance Lead</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Approves archetype & control playbook
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                              <CheckSquare className="w-4 h-4 text-purple-600" />
                              <span>QA Engineer</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Ensures mapping flows into risk register
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Action */}
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                          <div>
                            <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Classification Complete</h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Ready to proceed to Risk Identification & Classification
                            </p>
                          </div>
                        </div>
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                          <span>Continue to Risk Identification</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Before Finalization */}
                  {sectionNum === 5 && !isFinalized && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center p-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl">
                        <div className="text-center">
                          <AlertCircle className="w-16 h-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generate System Outputs</h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Complete all sections and click below to generate intelligent archetype classification, risk assessment, and recommendations
                          </p>
                          <button
                            onClick={handleFinalize}
                            disabled={completeness < 50}
                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                          >
                            <Brain className="w-5 h-5" />
                            <span>Generate Classification</span>
                          </button>
                          {completeness < 50 && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-3">
                              Complete at least 50% of required fields to generate outputs
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationSetup;
