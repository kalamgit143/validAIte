import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Code, 
  Brain,
  Users,
  Shield,
  Settings,
  Globe,
  Zap,
  FileText,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Eye,
  Lock,
  Unlock,
  MessageSquare,
  Image,
  Mic,
  Video,
  Layers,
  GitBranch,
  TestTube,
  Award,
  Workflow
} from 'lucide-react';
import { ApplicationMetadata, UserInteractionContext, ModelParameters, PromptsInstructions } from '../types';

const DataInputForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState('application');
  const [formData, setFormData] = useState({
    application: {
      app_name: '',
      app_type: 'chatbot',
      version: '',
      environment: 'dev',
      region: 'us',
      org_id: '',
      tenant_id: '',
      deployment_id: '',
      model_id: '',
      use_case: '',
      industry: '',
      risk_classification: '',
      compliance_frameworks: []
    },
    user_context: {
      session_id: '',
      user_id: '',
      persona: 'customer',
      device_platform: 'web',
      language_locale: 'en-US',
      conversation_history: [],
      user_demographics: {
        age_group: '',
        gender: '',
        location: '',
        language_preference: ''
      },
      interaction_context: {
        channel: '',
        intent: '',
        urgency: '',
        complexity: ''
      }
    },
    prompts: {
      user_prompt: '',
      system_prompt: '',
      prompt_template_id: '',
      intermediate_prompts: [],
      guardrails_applied: [],
      prompt_engineering: {
        technique: '',
        few_shot_examples: [],
        chain_of_thought: false,
        role_playing: false
      }
    },
    model_config: {
      model: 'gpt-4',
      model_version: '',
      provider: 'openai',
      parameters: {
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: []
      },
      routing_logic: '',
      fallback_models: [],
      cost_constraints: {
        max_cost_per_request: 0,
        budget_limit: 0,
        cost_optimization: false
      }
    },
    retrieval_context: {
      retrieval_algorithm: 'hybrid',
      kb_version: '',
      retrieved_chunks: [],
      embedding_model: '',
      similarity_threshold: 0.7,
      max_chunks: 5,
      reranking_enabled: false
    },
    model_response: {
      response: '',
      alt_candidates: [],
      reasoning_steps: [],
      tool_calls: [],
      output_format: 'text',
      streaming_logs: [],
      confidence_score: 0,
      response_metadata: {
        generation_method: '',
        model_uncertainty: 0,
        hallucination_score: 0
      }
    },
    evaluation_inputs: {
      golden_reference: '',
      eval_templates: [],
      rubric: [],
      human_feedback: '',
      evaluation_criteria: {
        quality_weight: 0.3,
        safety_weight: 0.3,
        fairness_weight: 0.2,
        performance_weight: 0.2
      }
    },
    operational_metrics: {
      latency_ms: 0,
      tokens_in: 0,
      tokens_out: 0,
      total_tokens: 0,
      cost_usd: 0,
      retries: 0,
      error_codes: [],
      infrastructure_metrics: {
        cpu_usage: 0,
        memory_usage: 0,
        gpu_utilization: 0,
        network_latency: 0
      }
    },
    safety_compliance: {
      toxicity_score: 0,
      bias_flags: [],
      pii_detected: false,
      regulatory_flags: [],
      jailbreak_detected: false,
      content_safety: {
        violence_score: 0,
        hate_speech_score: 0,
        sexual_content_score: 0,
        self_harm_score: 0
      }
    },
    multi_agent: {
      agent_name: '',
      step_id: 0,
      workflow_graph_id: '',
      tool_invocations: [],
      self_critique: '',
      agent_collaboration: {
        coordination_method: '',
        communication_protocol: '',
        conflict_resolution: ''
      }
    },
    system_metadata: {
      trace_id: '',
      api_endpoint: '',
      sdk_version: '',
      infra: {
        container_id: '',
        pod_name: '',
        gpu_type: '',
        memory: '',
        region: '',
        availability_zone: '',
        instance_type: ''
      },
      deployment_info: {
        deployment_id: '',
        version: '',
        environment: '',
        rollout_strategy: ''
      }
    }
  });

  const sections = [
    { id: 'application', label: 'Application Metadata', icon: Database, color: 'blue' },
    { id: 'user_context', label: 'User Context', icon: Users, color: 'green' },
    { id: 'prompts', label: 'Prompts & Instructions', icon: FileText, color: 'purple' },
    { id: 'model_config', label: 'Model Configuration', icon: Brain, color: 'yellow' },
    { id: 'retrieval', label: 'Retrieval Context', icon: Target, color: 'red' },
    { id: 'model_response', label: 'Model Response', icon: MessageSquare, color: 'cyan' },
    { id: 'evaluation_inputs', label: 'Evaluation Inputs', icon: TestTube, color: 'pink' },
    { id: 'operational', label: 'Operational Metrics', icon: Activity, color: 'indigo' },
    { id: 'safety', label: 'Safety & Compliance', icon: Shield, color: 'orange' },
    { id: 'multi_agent', label: 'Multi-Agent Workflow', icon: Workflow, color: 'teal' },
    { id: 'system', label: 'System Metadata', icon: Settings, color: 'gray' }
  ];

  const getSectionColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
      pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const renderApplicationMetadata = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Metadata</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Name *
          </label>
          <input
            type="text"
            value={formData.application.app_name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, app_name: e.target.value }
            }))}
            placeholder="Customer Support Bot"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Type *
          </label>
          <select
            value={formData.application.app_type}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, app_type: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="chatbot">Chatbot</option>
            <option value="rag">RAG System</option>
            <option value="agent">AI Agent</option>
            <option value="copilot">Copilot</option>
            <option value="multimodal">Multimodal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry Domain *
          </label>
          <select
            value={formData.application.industry}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, industry: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Industry</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Financial Services</option>
            <option value="government">Government</option>
            <option value="enterprise">Enterprise</option>
            <option value="retail">Retail</option>
            <option value="education">Education</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Use Case *
          </label>
          <select
            value={formData.application.use_case}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, use_case: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Use Case</option>
            <option value="medical_triage">Medical Triage & Diagnosis</option>
            <option value="fair_lending">Fair Lending & Credit Assessment</option>
            <option value="citizen_services">Citizen Services & Support</option>
            <option value="enterprise_productivity">Enterprise Productivity</option>
            <option value="brand_safety">Brand Safety & Content Moderation</option>
            <option value="customer_support">Customer Support</option>
            <option value="content_generation">Content Generation</option>
            <option value="code_review">Code Review & Development</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Version *
          </label>
          <input
            type="text"
            value={formData.application.version}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, version: e.target.value }
            }))}
            placeholder="2.1.0"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            EU AI Act Risk Classification *
          </label>
          <select
            value={formData.application.risk_classification}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, risk_classification: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Risk Level</option>
            <option value="unacceptable">Unacceptable Risk (Prohibited)</option>
            <option value="high_risk">High Risk (Mandatory TEVV)</option>
            <option value="limited_risk">Limited Risk (Transparency)</option>
            <option value="minimal_risk">Minimal Risk (No Obligations)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Environment *
          </label>
          <select
            value={formData.application.environment}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, environment: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="dev">Development</option>
            <option value="qa">QA</option>
            <option value="uat">UAT</option>
            <option value="prod">Production</option>
            <option value="sandbox">Sandbox</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Region *
          </label>
          <select
            value={formData.application.region}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, region: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="us">United States</option>
            <option value="eu">European Union</option>
            <option value="apac">Asia Pacific</option>
            <option value="global">Global</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Organization ID (Optional)
          </label>
          <input
            type="text"
            value={formData.application.org_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, org_id: e.target.value }
            }))}
            placeholder="org_12345"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tenant ID (Optional)
          </label>
          <input
            type="text"
            value={formData.application.tenant_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              application: { ...prev.application, tenant_id: e.target.value }
            }))}
            placeholder="tenant_67890"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Compliance Frameworks */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Applicable Compliance Frameworks
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['NIST RMF', 'EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'ISO 27001', 'SOC 2', 'FedRAMP'].map(framework => (
            <label key={framework} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserContext = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Interaction Context</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Session ID *
          </label>
          <input
            type="text"
            value={formData.user_context.session_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              user_context: { ...prev.user_context, session_id: e.target.value }
            }))}
            placeholder="session_abc123"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User ID (Anonymized)
          </label>
          <input
            type="text"
            value={formData.user_context.user_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              user_context: { ...prev.user_context, user_id: e.target.value }
            }))}
            placeholder="user_12345"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User Persona *
          </label>
          <select
            value={formData.user_context.persona}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              user_context: { ...prev.user_context, persona: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Device Platform *
          </label>
          <select
            value={formData.user_context.device_platform}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              user_context: { ...prev.user_context, device_platform: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="slack">Slack</option>
            <option value="voice">Voice</option>
            <option value="embedded">Embedded</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language/Locale *
          </label>
          <select
            value={formData.user_context.language_locale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              user_context: { ...prev.user_context, language_locale: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German (Germany)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="ja-JP">Japanese (Japan)</option>
            <option value="zh-CN">Chinese (Simplified)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interaction Channel
          </label>
          <select
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Channel</option>
            <option value="chat">Live Chat</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="api">API</option>
            <option value="mobile_app">Mobile App</option>
            <option value="web_portal">Web Portal</option>
          </select>
        </div>
      </div>

      {/* User Demographics (for bias testing) */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">User Demographics (for Bias Testing)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age Group (Optional)
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="">Not specified</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65+">65+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender (Optional)
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="">Not specified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Geographic Location (Optional)
            </label>
            <input
              type="text"
              placeholder="US-CA, EU-DE, etc."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interaction Intent
            </label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="">Select Intent</option>
              <option value="information_seeking">Information Seeking</option>
              <option value="problem_solving">Problem Solving</option>
              <option value="transaction">Transaction</option>
              <option value="complaint">Complaint</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conversation History */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conversation History (JSON Format)
        </label>
        <textarea
          placeholder={`[
  {
    "role": "user",
    "content": "Previous user message",
    "timestamp": "2024-01-15T10:00:00Z"
  },
  {
    "role": "assistant", 
    "content": "Previous AI response",
    "timestamp": "2024-01-15T10:00:05Z"
  }
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-32 resize-none font-mono text-sm"
        />
      </div>
    </div>
  );

  const renderPrompts = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prompts & Instructions</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          User Prompt *
        </label>
        <textarea
          value={formData.prompts.user_prompt}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            prompts: { ...prev.prompts, user_prompt: e.target.value }
          }))}
          placeholder="How can I reset my password?"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          System Prompt (Optional)
        </label>
        <textarea
          value={formData.prompts.system_prompt}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            prompts: { ...prev.prompts, system_prompt: e.target.value }
          }))}
          placeholder="You are a helpful customer support assistant..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prompt Template ID (Optional)
          </label>
          <input
            type="text"
            value={formData.prompts.prompt_template_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              prompts: { ...prev.prompts, prompt_template_id: e.target.value }
            }))}
            placeholder="support_template_v1"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prompt Engineering Technique
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option value="">Select Technique</option>
            <option value="zero_shot">Zero-shot</option>
            <option value="few_shot">Few-shot</option>
            <option value="chain_of_thought">Chain of Thought</option>
            <option value="role_playing">Role Playing</option>
            <option value="tree_of_thoughts">Tree of Thoughts</option>
          </select>
        </div>
      </div>

      {/* Prompt Engineering Configuration */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Prompt Engineering Configuration</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Few-shot Examples (JSON Format)
            </label>
            <textarea
              placeholder={`[
  {
    "input": "Example user input",
    "output": "Expected AI response"
  }
]`}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none font-mono text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Chain of Thought</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Role Playing</span>
            </label>
          </div>
        </div>
      </div>

      {/* Guardrails */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Applied Guardrails
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Toxicity Filter', 'Bias Detector', 'PII Masking', 'Prompt Injection Protection', 'Content Safety', 'Factuality Check'].map(guardrail => (
            <label key={guardrail} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{guardrail}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModelConfig = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model *
          </label>
          <select
            value={formData.model_config.model}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: { ...prev.model_config, model: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude-3</option>
            <option value="claude-3-haiku">Claude-3 Haiku</option>
            <option value="gemini-pro">Gemini Pro</option>
            <option value="gemini-ultra">Gemini Ultra</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model Version
          </label>
          <input
            type="text"
            value={formData.model_config.model_version}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: { ...prev.model_config, model_version: e.target.value }
            }))}
            placeholder="gpt-4-0125-preview"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Provider *
          </label>
          <select
            value={formData.model_config.provider}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: { ...prev.model_config, provider: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
            <option value="mistral">Mistral</option>
            <option value="oss">Open Source</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Routing Logic (Optional)
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500">
            <option value="">No routing</option>
            <option value="cost_optimized">Cost Optimized</option>
            <option value="performance_optimized">Performance Optimized</option>
            <option value="quality_optimized">Quality Optimized</option>
            <option value="load_balanced">Load Balanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Temperature: {formData.model_config.parameters.temperature}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={formData.model_config.parameters.temperature}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: {
                ...prev.model_config,
                parameters: { ...prev.model_config.parameters, temperature: parseFloat(e.target.value) }
              }
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Tokens
          </label>
          <input
            type="number"
            value={formData.model_config.parameters.max_tokens}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: {
                ...prev.model_config,
                parameters: { ...prev.model_config.parameters, max_tokens: parseInt(e.target.value) }
              }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Top P: {formData.model_config.parameters.top_p}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={formData.model_config.parameters.top_p}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: {
                ...prev.model_config,
                parameters: { ...prev.model_config.parameters, top_p: parseFloat(e.target.value) }
              }
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frequency Penalty: {formData.model_config.parameters.frequency_penalty}
          </label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={formData.model_config.parameters.frequency_penalty}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: {
                ...prev.model_config,
                parameters: { ...prev.model_config.parameters, frequency_penalty: parseFloat(e.target.value) }
              }
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Presence Penalty: {formData.model_config.parameters.presence_penalty}
          </label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={formData.model_config.parameters.presence_penalty}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_config: {
                ...prev.model_config,
                parameters: { ...prev.model_config.parameters, presence_penalty: parseFloat(e.target.value) }
              }
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Cost Constraints */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Cost Constraints</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Cost per Request ($)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="0.10"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Budget Limit ($)
            </label>
            <input
              type="number"
              placeholder="100.00"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-6">
            <input type="checkbox" className="rounded border-gray-300" />
            <label className="text-sm text-gray-700 dark:text-gray-300">Enable cost optimization</label>
          </div>
        </div>
      </div>

      {/* Fallback Models */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Fallback Models (Optional)
        </label>
        <input
          type="text"
          placeholder="gpt-3.5-turbo, claude-3-haiku"
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Stop Sequences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Stop Sequences (Optional)
        </label>
        <input
          type="text"
          placeholder="\\n\\n, END, STOP"
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </div>
  );

  const renderRetrievalContext = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Retrieval Context (RAG-specific)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Retrieval Algorithm
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
            <option value="bm25">BM25</option>
            <option value="dense">Dense Vector</option>
            <option value="hybrid">Hybrid</option>
            <option value="rerank">Rerank</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Knowledge Base Version
          </label>
          <input
            type="text"
            placeholder="kb_v2.1"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Embedding Model
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
            <option value="">Select Embedding Model</option>
            <option value="text-embedding-ada-002">OpenAI Ada-002</option>
            <option value="text-embedding-3-small">OpenAI Embedding-3-Small</option>
            <option value="text-embedding-3-large">OpenAI Embedding-3-Large</option>
            <option value="sentence-transformers">Sentence Transformers</option>
            <option value="cohere-embed">Cohere Embed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Similarity Threshold: {formData.retrieval_context.similarity_threshold}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={formData.retrieval_context.similarity_threshold}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              retrieval_context: { ...prev.retrieval_context, similarity_threshold: parseFloat(e.target.value) }
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Retrieved Chunks
          </label>
          <input
            type="number"
            value={formData.retrieval_context.max_chunks}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              retrieval_context: { ...prev.retrieval_context, max_chunks: parseInt(e.target.value) }
            }))}
            min="1"
            max="20"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            checked={formData.retrieval_context.reranking_enabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              retrieval_context: { ...prev.retrieval_context, reranking_enabled: e.target.checked }
            }))}
            className="rounded border-gray-300"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">Enable reranking</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Retrieved Chunks (JSON Format)
        </label>
        <textarea
          placeholder={`[
  {
    "source": "knowledge_base.pdf",
    "content": "Password reset instructions...",
    "similarity_score": 0.95
  }
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-32 resize-none font-mono text-sm"
        />
      </div>
    </div>
  );

  const renderModelResponse = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Response</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Primary Response *
        </label>
        <textarea
          value={formData.model_response.response}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            model_response: { ...prev.model_response, response: e.target.value }
          }))}
          placeholder="The AI model's response to the user prompt..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 h-32 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Format
          </label>
          <select
            value={formData.model_response.output_format}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_response: { ...prev.model_response, output_format: e.target.value as any }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
          >
            <option value="text">Text</option>
            <option value="json">JSON</option>
            <option value="sql">SQL</option>
            <option value="markdown">Markdown</option>
            <option value="multimodal">Multimodal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confidence Score (0-1)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={formData.model_response.confidence_score}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_response: { ...prev.model_response, confidence_score: parseFloat(e.target.value) }
            }))}
            placeholder="0.95"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Alternative Candidates (JSON Format)
        </label>
        <textarea
          placeholder={`[
  "Alternative response 1",
  "Alternative response 2"
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 h-24 resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Reasoning Steps (JSON Format)
        </label>
        <textarea
          placeholder={`[
  "Step 1: Analyzed user intent",
  "Step 2: Retrieved relevant information",
  "Step 3: Generated response"
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 h-24 resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tool Calls (JSON Format)
        </label>
        <textarea
          placeholder={`[
  {
    "tool": "calculator",
    "request": {"operation": "add", "a": 5, "b": 3},
    "response": {"result": 8}
  }
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 h-24 resize-none font-mono text-sm"
        />
      </div>
    </div>
  );

  const renderEvaluationInputs = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evaluation Inputs</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Golden Reference (Expected Output)
        </label>
        <textarea
          value={formData.evaluation_inputs.golden_reference}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            evaluation_inputs: { ...prev.evaluation_inputs, golden_reference: e.target.value }
          }))}
          placeholder="The expected correct response for evaluation..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Evaluation Templates
        </label>
        <input
          type="text"
          placeholder="quality_template_v1, safety_template_v2"
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Human Feedback Type
        </label>
        <select
          value={formData.evaluation_inputs.human_feedback}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            evaluation_inputs: { ...prev.evaluation_inputs, human_feedback: e.target.value as any }
          }))}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value="">No human feedback</option>
          <option value="thumbs_up">Thumbs Up/Down</option>
          <option value="rubric_scores">Rubric Scores</option>
          <option value="detailed_annotation">Detailed Annotation</option>
        </select>
      </div>

      {/* Evaluation Criteria Weights */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Evaluation Criteria Weights</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quality: {formData.evaluation_inputs.evaluation_criteria.quality_weight}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.evaluation_inputs.evaluation_criteria.quality_weight}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation_inputs: {
                  ...prev.evaluation_inputs,
                  evaluation_criteria: { ...prev.evaluation_inputs.evaluation_criteria, quality_weight: parseFloat(e.target.value) }
                }
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Safety: {formData.evaluation_inputs.evaluation_criteria.safety_weight}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.evaluation_inputs.evaluation_criteria.safety_weight}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation_inputs: {
                  ...prev.evaluation_inputs,
                  evaluation_criteria: { ...prev.evaluation_inputs.evaluation_criteria, safety_weight: parseFloat(e.target.value) }
                }
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fairness: {formData.evaluation_inputs.evaluation_criteria.fairness_weight}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.evaluation_inputs.evaluation_criteria.fairness_weight}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation_inputs: {
                  ...prev.evaluation_inputs,
                  evaluation_criteria: { ...prev.evaluation_inputs.evaluation_criteria, fairness_weight: parseFloat(e.target.value) }
                }
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Performance: {formData.evaluation_inputs.evaluation_criteria.performance_weight}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.evaluation_inputs.evaluation_criteria.performance_weight}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation_inputs: {
                  ...prev.evaluation_inputs,
                  evaluation_criteria: { ...prev.evaluation_inputs.evaluation_criteria, performance_weight: parseFloat(e.target.value) }
                }
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom Evaluation Rubric (JSON Format)
        </label>
        <textarea
          placeholder={`[
  {
    "name": "Medical Accuracy",
    "description": "Accuracy of medical information",
    "weight": 0.4,
    "scale": 10
  }
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 h-32 resize-none font-mono text-sm"
        />
      </div>
    </div>
  );
  const renderSafetyCompliance = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Safety & Compliance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Toxicity Score (0-1)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={formData.safety_compliance.toxicity_score}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              safety_compliance: { ...prev.safety_compliance, toxicity_score: parseFloat(e.target.value) }
            }))}
            placeholder="0.05"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PII Detected
          </label>
          <select
            value={formData.safety_compliance.pii_detected.toString()}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              safety_compliance: { ...prev.safety_compliance, pii_detected: e.target.value === 'true' }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Jailbreak Detected
          </label>
          <select
            value={formData.safety_compliance.jailbreak_detected.toString()}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              safety_compliance: { ...prev.safety_compliance, jailbreak_detected: e.target.value === 'true' }
            }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bias Flags
          </label>
          <input
            type="text"
            placeholder="gender_bias, age_bias"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Content Safety Scores */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Content Safety Scores (0-1)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Violence Score
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.02"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hate Speech Score
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.01"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sexual Content Score
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Self-harm Score
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Regulatory Flags
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['HIPAA', 'GDPR', 'PCI'].map(flag => (
            <label key={flag} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{flag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOperationalMetrics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Operational Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Latency (milliseconds)
          </label>
          <input
            type="number"
            value={formData.operational_metrics.latency_ms}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              operational_metrics: { ...prev.operational_metrics, latency_ms: parseInt(e.target.value) }
            }))}
            placeholder="1200"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cost (USD)
          </label>
          <input
            type="number"
            step="0.001"
            value={formData.operational_metrics.cost_usd}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              operational_metrics: { ...prev.operational_metrics, cost_usd: parseFloat(e.target.value) }
            }))}
            placeholder="0.045"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tokens In
          </label>
          <input
            type="number"
            value={formData.operational_metrics.tokens_in}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              operational_metrics: { ...prev.operational_metrics, tokens_in: parseInt(e.target.value) }
            }))}
            placeholder="150"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tokens Out
          </label>
          <input
            type="number"
            value={formData.operational_metrics.tokens_out}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              operational_metrics: { ...prev.operational_metrics, tokens_out: parseInt(e.target.value) }
            }))}
            placeholder="200"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Retries
          </label>
          <input
            type="number"
            value={formData.operational_metrics.retries}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              operational_metrics: { ...prev.operational_metrics, retries: parseInt(e.target.value) }
            }))}
            placeholder="0"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Error Codes
          </label>
          <input
            type="text"
            placeholder="RATE_LIMIT_EXCEEDED, TIMEOUT"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Infrastructure Metrics */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Infrastructure Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CPU Usage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="65"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Memory Usage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="72"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GPU Utilization (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="85"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Network Latency (ms)
            </label>
            <input
              type="number"
              placeholder="45"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMultiAgent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multi-Agent Workflow</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Agent Name
          </label>
          <input
            type="text"
            value={formData.multi_agent.agent_name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              multi_agent: { ...prev.multi_agent, agent_name: e.target.value }
            }))}
            placeholder="research_agent"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Workflow Step ID
          </label>
          <input
            type="number"
            value={formData.multi_agent.step_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              multi_agent: { ...prev.multi_agent, step_id: parseInt(e.target.value) }
            }))}
            placeholder="1"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Workflow Graph ID
          </label>
          <input
            type="text"
            value={formData.multi_agent.workflow_graph_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              multi_agent: { ...prev.multi_agent, workflow_graph_id: e.target.value }
            }))}
            placeholder="workflow_abc123"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Coordination Method
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500">
            <option value="">Select Method</option>
            <option value="sequential">Sequential</option>
            <option value="parallel">Parallel</option>
            <option value="hierarchical">Hierarchical</option>
            <option value="consensus">Consensus</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tool Invocations (JSON Format)
        </label>
        <textarea
          placeholder={`[
  {
    "agent": "research_agent",
    "step": 1,
    "tool": "web_search",
    "status": "success"
  }
]`}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 h-24 resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Self-Critique (Optional)
        </label>
        <textarea
          value={formData.multi_agent.self_critique}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            multi_agent: { ...prev.multi_agent, self_critique: e.target.value }
          }))}
          placeholder="Agent's self-assessment of its performance..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 h-20 resize-none"
        />
      </div>
    </div>
  );
  const renderSystemMetadata = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System & Infrastructure Metadata</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trace ID *
          </label>
          <input
            type="text"
            value={formData.system_metadata.trace_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              system_metadata: { ...prev.system_metadata, trace_id: e.target.value }
            }))}
            placeholder="tr_abc123def456"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API Endpoint
          </label>
          <input
            type="text"
            value={formData.system_metadata.api_endpoint}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              system_metadata: { ...prev.system_metadata, api_endpoint: e.target.value }
            }))}
            placeholder="/api/v1/chat"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SDK Version *
          </label>
          <input
            type="text"
            value={formData.system_metadata.sdk_version}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              system_metadata: { ...prev.system_metadata, sdk_version: e.target.value }
            }))}
            placeholder="1.2.0"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deployment ID
          </label>
          <input
            type="text"
            placeholder="deploy_xyz789"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Container ID
          </label>
          <input
            type="text"
            placeholder="container_789"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pod Name (Kubernetes)
          </label>
          <input
            type="text"
            placeholder="genai-pod-abc123"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GPU Type
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500">
            <option value="">None</option>
            <option value="A100">NVIDIA A100</option>
            <option value="V100">NVIDIA V100</option>
            <option value="T4">NVIDIA T4</option>
            <option value="H100">NVIDIA H100</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Memory Allocation
          </label>
          <input
            type="text"
            placeholder="16GB"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Availability Zone
          </label>
          <input
            type="text"
            placeholder="us-west-2a"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instance Type
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500">
            <option value="">Select Instance</option>
            <option value="m5.large">m5.large</option>
            <option value="m5.xlarge">m5.xlarge</option>
            <option value="c5.2xlarge">c5.2xlarge</option>
            <option value="p3.2xlarge">p3.2xlarge (GPU)</option>
            <option value="p4d.24xlarge">p4d.24xlarge (GPU)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rollout Strategy
          </label>
          <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500">
            <option value="">Select Strategy</option>
            <option value="blue_green">Blue-Green</option>
            <option value="canary">Canary</option>
            <option value="rolling">Rolling</option>
            <option value="a_b_testing">A/B Testing</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'application': return renderApplicationMetadata();
      case 'user_context': return renderUserContext();
      case 'prompts': return renderPrompts();
      case 'model_config': return renderModelConfig();
      case 'retrieval': return renderRetrievalContext();
      case 'model_response': return renderModelResponse();
      case 'evaluation_inputs': return renderEvaluationInputs();
      case 'safety': return renderSafetyCompliance();
      case 'multi_agent': return renderMultiAgent();
      case 'operational': return renderOperationalMetrics();
      case 'system': return renderSystemMetadata();
      default: return renderApplicationMetadata();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Structured Data Input</h2>
          <p className="text-gray-600 dark:text-gray-400">Input structured data for comprehensive AI evaluation and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import JSON</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>Generate SDK Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Input Sections</h3>
            <nav className="space-y-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                      activeSection === section.id
                        ? `${getSectionColor(section.color)} font-medium`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {renderActiveSection()}
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields for NIST RMF and EU TEVV compliance
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  Clear Form
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Validate Schema
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Submit for Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JSON Preview</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              Copy JSON
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
              Download
            </button>
            <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/40">
              Validate
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Quick Input Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Input Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Healthcare Triage', type: 'Medical AI', industry: 'healthcare' },
            { name: 'Financial Lending', type: 'Credit Assessment', industry: 'finance' },
            { name: 'Enterprise Copilot', type: 'Productivity AI', industry: 'enterprise' },
            { name: 'Government Services', type: 'Citizen Support', industry: 'government' },
            { name: 'Retail Brand Safety', type: 'Content Moderation', industry: 'retail' },
            { name: 'Custom Template', type: 'Custom Configuration', industry: 'custom' }
          ].map((template, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{template.type}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">{template.industry}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataInputForm;