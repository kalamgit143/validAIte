import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';

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

const ApplicationSetup: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

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
      setUseCases([...useCases, { ...currentUseCase, use_case_id: `UC-${useCases.length + 1}` }]);
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

  const getSectionIcon = (section: number) => {
    const icons = [Building, Code, Target, Upload, FileText];
    const Icon = icons[section - 1];
    return <Icon className="w-5 h-5" />;
  };

  const sections = [
    'Basic Application Information',
    'Technical Details (UI/API)',
    'Functional Use Case Catalog',
    'File Upload & Integrations',
    'Review & Submit'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              0
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Application Setup</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              <Database className="w-4 h-4" />
              <span>Stage 0: Foundation</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Configure your GenAI application details and setup evaluation parameters</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
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

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Complete Setup Guide:</strong> Fill in all sections to establish the foundation for your AI governance workflow. This information will be used throughout the validation pipeline.
        </div>
      </div>

      {sections.map((sectionName, idx) => {
        const sectionNum = idx + 1;
        const isExpanded = expandedSections.includes(sectionNum);
        const isActive = activeSection === sectionNum;

        return (
          <div
            key={sectionNum}
            className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all ${
              isActive
                ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <button
              onClick={() => {
                setActiveSection(sectionNum);
                if (!isExpanded) toggleSection(sectionNum);
              }}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {getSectionIcon(sectionNum)}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Section {sectionNum}: {sectionName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionNum === 1 && 'Core application information and business context'}
                    {sectionNum === 2 && 'Technical stack, LLM configuration, and integrations'}
                    {sectionNum === 3 && 'Define and manage functional use cases'}
                    {sectionNum === 4 && 'Upload knowledge base and configuration files'}
                    {sectionNum === 5 && 'Review all information before submission'}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                {sectionNum === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Application Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={applicationData.application_name}
                          onChange={e => setApplicationData({ ...applicationData, application_name: e.target.value })}
                          placeholder="e.g., Insurance Policy Assistant"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Domain <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={applicationData.domain}
                          onChange={e => setApplicationData({ ...applicationData, domain: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {domains.map(d => (
                            <option key={d} value={d.toLowerCase()}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Application Description
                      </label>
                      <textarea
                        value={applicationData.application_description}
                        onChange={e => setApplicationData({ ...applicationData, application_description: e.target.value })}
                        placeholder="Describe what this application does and its primary purpose..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={applicationData.organization}
                          onChange={e => setApplicationData({ ...applicationData, organization: e.target.value })}
                          placeholder="e.g., Acme Corporation"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Deployment Environment
                        </label>
                        <select
                          value={applicationData.deployment_environment}
                          onChange={e => setApplicationData({ ...applicationData, deployment_environment: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {deploymentEnvironments.map(env => (
                            <option key={env} value={env.toLowerCase()}>{env}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Owner
                        </label>
                        <input
                          type="text"
                          value={applicationData.business_owner}
                          onChange={e => setApplicationData({ ...applicationData, business_owner: e.target.value })}
                          placeholder="e.g., John Doe - Product Manager"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Technical Owner
                        </label>
                        <input
                          type="text"
                          value={applicationData.tech_owner}
                          onChange={e => setApplicationData({ ...applicationData, tech_owner: e.target.value })}
                          placeholder="e.g., Jane Smith - Lead Engineer"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data Sensitivity
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {dataSensitivityOptions.map(option => (
                          <button
                            key={option}
                            onClick={() => toggleArrayValue(
                              applicationData.data_sensitivity,
                              option.toLowerCase(),
                              setApplicationData,
                              'data_sensitivity'
                            )}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              applicationData.data_sensitivity.includes(option.toLowerCase())
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Autonomy Level
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {autonomyLevels.map(level => (
                          <button
                            key={level}
                            onClick={() => setApplicationData({ ...applicationData, autonomy_level: level.toLowerCase() })}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              applicationData.autonomy_level === level.toLowerCase()
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Modifiers
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {modifierOptions.map(modifier => (
                          <button
                            key={modifier}
                            onClick={() => toggleArrayValue(
                              applicationData.modifiers,
                              modifier,
                              setApplicationData,
                              'modifiers'
                            )}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              applicationData.modifiers.includes(modifier)
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {modifier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Risk Context Notes
                      </label>
                      <textarea
                        value={applicationData.risk_context_notes}
                        onChange={e => setApplicationData({ ...applicationData, risk_context_notes: e.target.value })}
                        placeholder="Describe any critical business or ethical risks..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {sectionNum === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Interface Type
                        </label>
                        <select
                          value={technicalDetails.interface_type}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, interface_type: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {interfaceTypes.map(type => (
                            <option key={type} value={type.toLowerCase()}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          LLM Provider
                        </label>
                        <select
                          value={technicalDetails.llm_provider}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, llm_provider: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {llmProviders.map(provider => (
                            <option key={provider} value={provider.toLowerCase()}>{provider}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          LLM Model Name
                        </label>
                        <input
                          type="text"
                          value={technicalDetails.llm_model_name}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, llm_model_name: e.target.value })}
                          placeholder="e.g., gpt-4o-mini"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Frontend Tech Stack
                        </label>
                        <input
                          type="text"
                          value={technicalDetails.frontend_tech_stack}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, frontend_tech_stack: e.target.value })}
                          placeholder="e.g., React, TypeScript"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Backend Tech Stack
                        </label>
                        <input
                          type="text"
                          value={technicalDetails.backend_tech_stack}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, backend_tech_stack: e.target.value })}
                          placeholder="e.g., Node.js, Python FastAPI"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">RAG Configuration</h4>
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
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Vector Database
                          </label>
                          <select
                            value={technicalDetails.vector_db}
                            onChange={e => setTechnicalDetails({ ...technicalDetails, vector_db: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
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
                            placeholder="e.g., Similarity search, Top k=5"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">API Endpoints</h4>
                        <button
                          onClick={addApiEndpoint}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Endpoint</span>
                        </button>
                      </div>
                      <div className="space-y-2">
                        {technicalDetails.api_endpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <select
                              value={endpoint.method}
                              onChange={e => updateApiEndpoint(index, 'method', e.target.value)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {technicalDetails.api_endpoints.length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                            No endpoints added yet
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Authentication Method
                        </label>
                        <select
                          value={technicalDetails.auth_method}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, auth_method: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {authMethods.map(method => (
                            <option key={method} value={method.toLowerCase().replace(' ', '-')}>{method}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Authentication Token
                        </label>
                        <input
                          type="password"
                          value={technicalDetails.auth_token}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, auth_token: e.target.value })}
                          placeholder="Enter API key or token"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          UI URL
                        </label>
                        <input
                          type="url"
                          value={technicalDetails.ui_url}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, ui_url: e.target.value })}
                          placeholder="https://app.example.com"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          UI Input Selector
                        </label>
                        <input
                          type="text"
                          value={technicalDetails.ui_input_selector}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, ui_input_selector: e.target.value })}
                          placeholder="#chat-input"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          UI Output Selector
                        </label>
                        <input
                          type="text"
                          value={technicalDetails.ui_output_selector}
                          onChange={e => setTechnicalDetails({ ...technicalDetails, ui_output_selector: e.target.value })}
                          placeholder="#chat-response"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Integration Tools
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {integrationToolOptions.map(tool => (
                          <button
                            key={tool}
                            onClick={() => toggleArrayValue(
                              technicalDetails.integration_tools,
                              tool,
                              setTechnicalDetails,
                              'integration_tools'
                            )}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              technicalDetails.integration_tools.includes(tool)
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {tool}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deployment Logs API
                      </label>
                      <input
                        type="url"
                        value={technicalDetails.deployment_logs_api}
                        onChange={e => setTechnicalDetails({ ...technicalDetails, deployment_logs_api: e.target.value })}
                        placeholder="https://api.example.com/logs"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {sectionNum === 3 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add New Use Case</h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={currentUseCase.use_case_title}
                            onChange={e => setCurrentUseCase({ ...currentUseCase, use_case_title: e.target.value })}
                            placeholder="Use Case Title"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <select
                            value={currentUseCase.priority}
                            onChange={e => setCurrentUseCase({ ...currentUseCase, priority: e.target.value })}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <textarea
                          value={currentUseCase.expected_behavior}
                          onChange={e => setCurrentUseCase({ ...currentUseCase, expected_behavior: e.target.value })}
                          placeholder="Expected behavior"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <select
                            value={currentUseCase.data_source}
                            onChange={e => setCurrentUseCase({ ...currentUseCase, data_source: e.target.value })}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                                className={`px-3 py-1 rounded-lg border text-sm transition-all ${
                                  currentUseCase.risk_association.includes(risk)
                                    ? 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
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
                                className={`px-3 py-1 rounded-lg border text-sm transition-all ${
                                  currentUseCase.evaluation_scope.includes(scope)
                                    ? 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {scope}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={addUseCase}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Add Use Case</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Defined Use Cases ({useCases.length})
                      </h4>
                      {useCases.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No use cases defined yet
                        </div>
                      ) : (
                        useCases.map((useCase, index) => (
                          <div
                            key={index}
                            className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                                    {useCase.use_case_id}
                                  </span>
                                  <h5 className="font-medium text-gray-900 dark:text-white">
                                    {useCase.use_case_title}
                                  </h5>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    useCase.priority === 'high'
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                      : useCase.priority === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  }`}>
                                    {useCase.priority}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {useCase.use_case_description}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                  {useCase.risk_association.map(risk => (
                                    <span
                                      key={risk}
                                      className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                                    >
                                      {risk}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={() => removeUseCase(index)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {sectionNum === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                        <label className="block cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              Knowledge Base
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, DOC, CSV
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={e => handleFileUpload('knowledge_base', e)}
                            accept=".pdf,.doc,.docx,.csv"
                            className="hidden"
                          />
                        </label>
                        {uploadedFiles.find(f => f.type === 'knowledge_base') && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{uploadedFiles.find(f => f.type === 'knowledge_base')?.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                        <label className="block cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              API Collection
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Postman JSON
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={e => handleFileUpload('api_collection', e)}
                            accept=".json"
                            className="hidden"
                          />
                        </label>
                        {uploadedFiles.find(f => f.type === 'api_collection') && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{uploadedFiles.find(f => f.type === 'api_collection')?.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                        <label className="block cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              UI Locator Map
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              JSON
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={e => handleFileUpload('ui_map', e)}
                            accept=".json"
                            className="hidden"
                          />
                        </label>
                        {uploadedFiles.find(f => f.type === 'ui_map') && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{uploadedFiles.find(f => f.type === 'ui_map')?.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                        <label className="block cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              Use Case Sheet
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              XLSX, CSV
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={e => handleFileUpload('use_case_sheet', e)}
                            accept=".xlsx,.csv"
                            className="hidden"
                          />
                        </label>
                        {uploadedFiles.find(f => f.type === 'use_case_sheet') && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{uploadedFiles.find(f => f.type === 'use_case_sheet')?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {sectionNum === 5 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Application Summary
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Name:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {applicationData.application_name || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Domain:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {applicationData.domain}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Environment:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {applicationData.deployment_environment}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Autonomy:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {applicationData.autonomy_level}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">LLM Provider:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {technicalDetails.llm_provider || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Model:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {technicalDetails.llm_model_name || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Use Cases:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {useCases.length}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Files:</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {uploadedFiles.length}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Configuration Complete
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ready to proceed to Stage 1: Control Selection
                          </p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium">
                        Submit & Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationSetup;
