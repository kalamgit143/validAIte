import React, { useState } from 'react';
import { 
  Building, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Save,
  Users,
  Brain,
  Database,
  Globe,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Filter,
  Search,
  Calendar,
  BarChart3,
  TrendingUp,
  Award,
  Lock,
  Unlock,
  Activity,
  Code,
  Layers,
  GitBranch,
  Workflow
} from 'lucide-react';

const DataInputForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState('application-setup');
  const [formData, setFormData] = useState({
    // Application Setup
    appName: '',
    appType: '',
    version: '',
    environment: '',
    region: '',
    businessOwner: '',
    technicalOwner: '',
    riskOwner: '',
    complianceOfficer: '',
    riskTolerance: '',
    businessCriticality: '',
    userVolume: '',
    geographicScope: '',
    complianceFrameworks: [],
    businessObjectives: '',
    targetAudience: '',
    successCriteria: '',
    dataClassification: '',
    
    // Use Case Definition
    useCases: [],
    
    // Risk Classification
    selectedRisks: [],
    
    // Governance Controls
    controls: [],
    
    // Governance Matrix
    governanceMatrix: []
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const sections = [
    { 
      id: 'application-setup', 
      label: 'Application Setup', 
      icon: Building,
      description: 'Configure application context and governance stakeholders',
      color: 'blue'
    },
    { 
      id: 'use-case-definition', 
      label: 'Use Case Definition', 
      icon: FileText,
      description: 'Define specific use cases and interaction scenarios',
      color: 'green'
    },
    { 
      id: 'risk-classification', 
      label: 'Risk Classification', 
      icon: AlertTriangle,
      description: 'Identify and classify potential risks and threats',
      color: 'red'
    },
    { 
      id: 'governance-controls', 
      label: 'Governance Controls', 
      icon: Shield,
      description: 'Establish controls and mitigation strategies',
      color: 'purple'
    },
    { 
      id: 'governance-matrix', 
      label: 'Governance Matrix', 
      icon: Target,
      description: 'Review complete traceability and governance coverage',
      color: 'indigo'
    }
  ];

  const appTypes = [
    { value: 'chatbot', label: 'Chatbot', description: 'Conversational AI for customer support, Q&A' },
    { value: 'rag', label: 'RAG System', description: 'Retrieval-Augmented Generation for knowledge queries' },
    { value: 'agent', label: 'AI Agent', description: 'Autonomous agents with tool usage capabilities' },
    { value: 'copilot', label: 'AI Copilot', description: 'Productivity assistants for specific domains' },
    { value: 'multimodal', label: 'Multimodal AI', description: 'Text, image, audio, video processing systems' }
  ];

  const riskLibrary = {
    chatbot: [
      {
        id: 'CHAT-001',
        name: 'Hallucination & Misinformation',
        category: 'Accuracy & Reliability',
        description: 'AI generates false or misleading information',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['MEASURE-2.1', 'MEASURE-2.2'],
        tevvMapping: ['T-1.1', 'E-2.1'],
        threatActors: ['Malicious users', 'Unintentional misuse'],
        attackVectors: ['Prompt manipulation', 'Context poisoning'],
        businessImpact: 'Customer trust erosion, legal liability',
        technicalImpact: 'Incorrect responses, system reliability issues',
        complianceImpact: 'Regulatory violations, audit findings'
      },
      {
        id: 'CHAT-002',
        name: 'Prompt Injection Attacks',
        category: 'Security & Robustness',
        description: 'Malicious prompts bypass safety controls',
        likelihood: 'high',
        impact: 'high',
        nistMapping: ['PROTECT-1.1', 'DETECT-1.1'],
        tevvMapping: ['T-2.1', 'V-1.2'],
        threatActors: ['External attackers', 'Malicious insiders'],
        attackVectors: ['Direct injection', 'Indirect injection via data'],
        businessImpact: 'Data breach, service disruption',
        technicalImpact: 'System compromise, unauthorized access',
        complianceImpact: 'Security violations, incident reporting'
      },
      {
        id: 'CHAT-003',
        name: 'Bias in Responses',
        category: 'Fairness & Ethics',
        description: 'Discriminatory or biased responses to users',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['MEASURE-2.3', 'MANAGE-2.1'],
        tevvMapping: ['E-1.1', 'V-2.1'],
        threatActors: ['Biased training data', 'Algorithmic bias'],
        attackVectors: ['Training data manipulation', 'Model architecture bias'],
        businessImpact: 'Discrimination claims, reputation damage',
        technicalImpact: 'Unfair treatment, performance disparities',
        complianceImpact: 'Anti-discrimination violations, regulatory fines'
      }
    ],
    rag: [
      {
        id: 'RAG-001',
        name: 'Knowledge Base Poisoning',
        category: 'Data Integrity',
        description: 'Malicious content injected into knowledge base',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['PROTECT-2.1', 'DETECT-2.1'],
        tevvMapping: ['T-1.2', 'E-1.2'],
        threatActors: ['Internal threats', 'Supply chain attacks'],
        attackVectors: ['Document injection', 'Index manipulation'],
        businessImpact: 'Misinformation spread, legal liability',
        technicalImpact: 'Corrupted retrieval, system integrity loss',
        complianceImpact: 'Data quality violations, audit failures'
      },
      {
        id: 'RAG-002',
        name: 'Retrieval Manipulation',
        category: 'Security & Robustness',
        description: 'Adversarial queries manipulate retrieval results',
        likelihood: 'medium',
        impact: 'medium',
        nistMapping: ['PROTECT-1.2', 'MEASURE-1.1'],
        tevvMapping: ['T-2.2', 'E-2.2'],
        threatActors: ['Sophisticated attackers', 'Competitors'],
        attackVectors: ['Query manipulation', 'Embedding space attacks'],
        businessImpact: 'Incorrect information delivery, competitive disadvantage',
        technicalImpact: 'Poor retrieval quality, system gaming',
        complianceImpact: 'Information accuracy violations'
      }
    ],
    agent: [
      {
        id: 'AGENT-001',
        name: 'Unauthorized Tool Access',
        category: 'Security & Access Control',
        description: 'Agent accesses tools or systems without authorization',
        likelihood: 'high',
        impact: 'critical',
        nistMapping: ['PROTECT-1.1', 'DETECT-1.2'],
        tevvMapping: ['T-3.1', 'V-1.1'],
        threatActors: ['Malicious users', 'Compromised agents'],
        attackVectors: ['Privilege escalation', 'Tool chaining attacks'],
        businessImpact: 'Data breach, system compromise, financial loss',
        technicalImpact: 'Unauthorized system access, data exfiltration',
        complianceImpact: 'Access control violations, security breaches'
      },
      {
        id: 'AGENT-002',
        name: 'Goal Misalignment',
        category: 'AI Safety & Alignment',
        description: 'Agent pursues unintended goals or objectives',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['GOVERN-1.1', 'MEASURE-2.4'],
        tevvMapping: ['E-3.1', 'V-3.1'],
        threatActors: ['Design flaws', 'Specification gaps'],
        attackVectors: ['Reward hacking', 'Objective specification errors'],
        businessImpact: 'Unintended outcomes, resource waste',
        technicalImpact: 'System behavior drift, performance degradation',
        complianceImpact: 'Safety violations, regulatory non-compliance'
      }
    ],
    copilot: [
      {
        id: 'COPILOT-001',
        name: 'Code Injection via Suggestions',
        category: 'Security & Code Safety',
        description: 'Malicious code suggested by AI copilot',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['PROTECT-1.3', 'DETECT-1.3'],
        tevvMapping: ['T-4.1', 'E-4.1'],
        threatActors: ['Supply chain attacks', 'Malicious training data'],
        attackVectors: ['Training data poisoning', 'Adversarial examples'],
        businessImpact: 'Security vulnerabilities, intellectual property theft',
        technicalImpact: 'Vulnerable code generation, system compromise',
        complianceImpact: 'Security standard violations, audit failures'
      },
      {
        id: 'COPILOT-002',
        name: 'Intellectual Property Leakage',
        category: 'Privacy & IP Protection',
        description: 'AI suggests code that violates IP or contains proprietary information',
        likelihood: 'medium',
        impact: 'high',
        nistMapping: ['PROTECT-2.2', 'GOVERN-2.1'],
        tevvMapping: ['E-4.2', 'V-4.1'],
        threatActors: ['Training data contamination', 'Model memorization'],
        attackVectors: ['Code similarity attacks', 'License violation'],
        businessImpact: 'Legal liability, IP infringement claims',
        technicalImpact: 'Proprietary code exposure, license violations',
        complianceImpact: 'IP law violations, licensing breaches'
      }
    ],
    multimodal: [
      {
        id: 'MULTI-001',
        name: 'Cross-Modal Bias Amplification',
        category: 'Fairness & Representation',
        description: 'Bias amplified across different modalities',
        likelihood: 'high',
        impact: 'high',
        nistMapping: ['MEASURE-2.3', 'MANAGE-2.2'],
        tevvMapping: ['E-5.1', 'V-5.1'],
        threatActors: ['Biased training data', 'Representation gaps'],
        attackVectors: ['Multi-modal bias injection', 'Stereotype reinforcement'],
        businessImpact: 'Discrimination claims, market exclusion',
        technicalImpact: 'Unfair representation, performance disparities',
        complianceImpact: 'Anti-discrimination violations, fairness breaches'
      },
      {
        id: 'MULTI-002',
        name: 'Deepfake & Synthetic Media',
        category: 'Content Authenticity',
        description: 'Generation of misleading or harmful synthetic content',
        likelihood: 'medium',
        impact: 'critical',
        nistMapping: ['PROTECT-3.1', 'DETECT-3.1'],
        tevvMapping: ['T-5.1', 'E-5.2'],
        threatActors: ['Malicious actors', 'Misinformation campaigns'],
        attackVectors: ['Synthetic media generation', 'Identity spoofing'],
        businessImpact: 'Reputation damage, legal liability, trust erosion',
        technicalImpact: 'Content authenticity loss, detection challenges',
        complianceImpact: 'Content regulation violations, platform liability'
      }
    ]
  };

  const controlTemplates = {
    'Accuracy & Reliability': [
      {
        name: 'Fact-Checking Pipeline',
        type: 'Technical',
        description: 'Automated fact-checking against trusted sources',
        mitigation: 'Implement real-time fact verification with confidence scoring',
        nistMapping: ['MEASURE-2.1'],
        tevvMapping: ['T-1.1'],
        testingFrequency: 'Continuous',
        automationLevel: 'Fully Automated'
      },
      {
        name: 'Response Quality Monitoring',
        type: 'Process',
        description: 'Continuous monitoring of response quality metrics',
        mitigation: 'Deploy quality scoring with automated alerts',
        nistMapping: ['MEASURE-2.2'],
        tevvMapping: ['E-2.1'],
        testingFrequency: 'Real-time',
        automationLevel: 'Fully Automated'
      }
    ],
    'Security & Robustness': [
      {
        name: 'Input Sanitization',
        type: 'Technical',
        description: 'Sanitize and validate all user inputs',
        mitigation: 'Implement comprehensive input validation and sanitization',
        nistMapping: ['PROTECT-1.1'],
        tevvMapping: ['T-2.1'],
        testingFrequency: 'Continuous',
        automationLevel: 'Fully Automated'
      },
      {
        name: 'Prompt Injection Detection',
        type: 'Technical',
        description: 'Detect and block prompt injection attempts',
        mitigation: 'Deploy ML-based prompt injection detection system',
        nistMapping: ['DETECT-1.1'],
        tevvMapping: ['T-2.2'],
        testingFrequency: 'Real-time',
        automationLevel: 'Fully Automated'
      }
    ],
    'Fairness & Ethics': [
      {
        name: 'Bias Testing Framework',
        type: 'Process',
        description: 'Regular bias testing across demographic groups',
        mitigation: 'Implement automated bias detection and mitigation',
        nistMapping: ['MEASURE-2.3'],
        tevvMapping: ['E-1.1'],
        testingFrequency: 'Weekly',
        automationLevel: 'Partially Automated'
      },
      {
        name: 'Fairness Metrics Monitoring',
        type: 'Technical',
        description: 'Monitor fairness metrics in real-time',
        mitigation: 'Deploy fairness monitoring dashboard with alerts',
        nistMapping: ['MEASURE-2.3'],
        tevvMapping: ['V-2.1'],
        testingFrequency: 'Continuous',
        automationLevel: 'Fully Automated'
      }
    ]
  };

  const complianceFrameworks = [
    { id: 'eu_ai_act', name: 'EU AI Act', description: 'European AI regulation' },
    { id: 'nist_rmf', name: 'NIST AI RMF', description: 'US AI risk management framework' },
    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation' },
    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability Act' },
    { id: 'sox', name: 'SOX', description: 'Sarbanes-Oxley Act' },
    { id: 'ccpa', name: 'CCPA', description: 'California Consumer Privacy Act' },
    { id: 'iso27001', name: 'ISO 27001', description: 'Information security management' },
    { id: 'soc2', name: 'SOC 2', description: 'Service organization controls' },
    { id: 'fedramp', name: 'FedRAMP', description: 'Federal risk authorization program' }
  ];

  const getSectionColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSectionBg = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20',
      green: 'bg-green-50 dark:bg-green-900/20',
      red: 'bg-red-50 dark:bg-red-900/20',
      purple: 'bg-purple-50 dark:bg-purple-900/20',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSectionBorder = (color: string) => {
    const colors = {
      blue: 'border-blue-200 dark:border-blue-700',
      green: 'border-green-200 dark:border-green-700',
      red: 'border-red-200 dark:border-red-700',
      purple: 'border-purple-200 dark:border-purple-700',
      indigo: 'border-indigo-200 dark:border-indigo-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'not_started': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const addUseCase = () => {
    const newUseCase = {
      id: `uc_${Date.now()}`,
      title: '',
      description: '',
      sourceType: '',
      priority: 'medium',
      complexity: 'medium',
      userPersonas: [],
      expectedOutcomes: '',
      interactionPatterns: '',
      potentialMisuse: '',
      domainHarms: '',
      stakeholderImpact: '',
      agents: []
    };
    setFormData(prev => ({
      ...prev,
      useCases: [...prev.useCases, newUseCase]
    }));
  };

  const addRisk = (riskTemplate: any) => {
    const newRisk = {
      ...riskTemplate,
      id: `risk_${Date.now()}`,
      riskOwner: '',
      mitigationStatus: 'not_started',
      residualRisk: 'medium',
      monitoringMethod: '',
      incidentResponse: '',
      reviewFrequency: 'quarterly',
      lastAssessment: new Date().toISOString()
    };
    setFormData(prev => ({
      ...prev,
      selectedRisks: [...prev.selectedRisks, newRisk]
    }));
  };

  const addControl = (controlTemplate: any) => {
    const newControl = {
      ...controlTemplate,
      id: `ctrl_${Date.now()}`,
      implementationStatus: 'not_implemented',
      effectiveness: 0,
      costEstimate: 0,
      resourceRequirements: '',
      dependencies: '',
      successMetrics: '',
      monitoringMethod: '',
      alertThreshold: '',
      trainingRequired: false
    };
    setFormData(prev => ({
      ...prev,
      controls: [...prev.controls, newControl]
    }));
  };

  const generateGovernanceMatrix = () => {
    const matrix = formData.useCases.map(useCase => ({
      useCaseId: useCase.id,
      useCaseTitle: useCase.title,
      sourceType: useCase.sourceType,
      agents: useCase.agents,
      risks: formData.selectedRisks.filter(risk => 
        useCase.sourceType && riskLibrary[useCase.sourceType as keyof typeof riskLibrary]?.some(r => r.id === risk.id)
      ),
      controls: formData.controls,
      complianceFrameworks: formData.complianceFrameworks,
      governanceOwners: {
        businessOwner: formData.businessOwner,
        technicalOwner: formData.technicalOwner,
        riskOwner: formData.riskOwner,
        complianceOfficer: formData.complianceOfficer
      },
      testingRequirements: useCase.agents?.map((agent: any) => ({
        agentName: agent.name,
        testTypes: ['Functional', 'Security', 'Performance'],
        coverage: 'TBD'
      })) || []
    }));
    
    setFormData(prev => ({ ...prev, governanceMatrix: matrix }));
  };

  const renderApplicationSetup = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-xl ${getSectionBg('blue')} border ${getSectionBorder('blue')}`}>
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${getSectionColor('blue')} text-white`}>
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Application Setup</h3>
            <p className="text-gray-600 dark:text-gray-400">Configure application context and governance stakeholders</p>
          </div>
        </div>
      </div>

      {/* Basic Application Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>Basic Application Information</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Name *
            </label>
            <input
              type="text"
              value={formData.appName}
              onChange={(e) => setFormData(prev => ({ ...prev, appName: e.target.value }))}
              placeholder="Healthcare Triage Assistant"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Type *
            </label>
            <select
              value={formData.appType}
              onChange={(e) => setFormData(prev => ({ ...prev, appType: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Application Type</option>
              {appTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Version *
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
              placeholder="1.0.0"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Environment *
            </label>
            <select
              value={formData.environment}
              onChange={(e) => setFormData(prev => ({ ...prev, environment: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Environment</option>
              <option value="development">Development</option>
              <option value="qa">QA/Testing</option>
              <option value="uat">UAT/Staging</option>
              <option value="production">Production</option>
              <option value="sandbox">Sandbox</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Geographic Region *
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Region</option>
              <option value="us">United States</option>
              <option value="eu">European Union</option>
              <option value="apac">Asia Pacific</option>
              <option value="global">Global</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Classification *
            </label>
            <select
              value={formData.dataClassification}
              onChange={(e) => setFormData(prev => ({ ...prev, dataClassification: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Classification</option>
              <option value="public">Public</option>
              <option value="internal">Internal</option>
              <option value="confidential">Confidential</option>
              <option value="restricted">Restricted</option>
              <option value="highly_sensitive">Highly Sensitive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Governance Stakeholders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Governance Stakeholders (NIST RMF)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Owner *
            </label>
            <select
              value={formData.businessOwner}
              onChange={(e) => setFormData(prev => ({ ...prev, businessOwner: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Business Owner</option>
              <option value="sarah_chen">Sarah Chen (VP Product)</option>
              <option value="mike_johnson">Mike Johnson (Director AI)</option>
              <option value="emily_davis">Emily Davis (Head of Innovation)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technical Owner *
            </label>
            <select
              value={formData.technicalOwner}
              onChange={(e) => setFormData(prev => ({ ...prev, technicalOwner: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Technical Owner</option>
              <option value="alex_kim">Alex Kim (CTO)</option>
              <option value="jordan_smith">Jordan Smith (Lead Engineer)</option>
              <option value="taylor_brown">Taylor Brown (AI Architect)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Owner (CIO/CISO) *
            </label>
            <select
              value={formData.riskOwner}
              onChange={(e) => setFormData(prev => ({ ...prev, riskOwner: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Risk Owner</option>
              <option value="sarah_chen_cio">Sarah Chen (CIO)</option>
              <option value="alex_kim_ciso">Alex Kim (CISO)</option>
              <option value="emily_davis_cro">Emily Davis (CRO)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compliance Officer *
            </label>
            <select
              value={formData.complianceOfficer}
              onChange={(e) => setFormData(prev => ({ ...prev, complianceOfficer: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Compliance Officer</option>
              <option value="emily_davis_compliance">Emily Davis (Compliance)</option>
              <option value="jordan_smith_audit">Jordan Smith (Internal Audit)</option>
              <option value="taylor_brown_risk">Taylor Brown (Risk Management)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Context */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-blue-600" />
          <span>Risk Context</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Tolerance *
            </label>
            <select
              value={formData.riskTolerance}
              onChange={(e) => setFormData(prev => ({ ...prev, riskTolerance: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Risk Tolerance</option>
              <option value="very_low">Very Low (Healthcare, Finance)</option>
              <option value="low">Low (Government, Legal)</option>
              <option value="medium">Medium (Enterprise, Education)</option>
              <option value="high">High (Marketing, Entertainment)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Criticality *
            </label>
            <select
              value={formData.businessCriticality}
              onChange={(e) => setFormData(prev => ({ ...prev, businessCriticality: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Criticality</option>
              <option value="mission_critical">Mission Critical</option>
              <option value="business_critical">Business Critical</option>
              <option value="important">Important</option>
              <option value="standard">Standard</option>
              <option value="low_impact">Low Impact</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expected User Volume *
            </label>
            <select
              value={formData.userVolume}
              onChange={(e) => setFormData(prev => ({ ...prev, userVolume: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Volume</option>
              <option value="low">&lt; 1K users/month</option>
              <option value="medium">1K - 10K users/month</option>
              <option value="high">10K - 100K users/month</option>
              <option value="very_high">100K - 1M users/month</option>
              <option value="enterprise">&gt; 1M users/month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Geographic Scope *
            </label>
            <select
              value={formData.geographicScope}
              onChange={(e) => setFormData(prev => ({ ...prev, geographicScope: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Scope</option>
              <option value="local">Local/Regional</option>
              <option value="national">National</option>
              <option value="international">International</option>
              <option value="global">Global</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Frameworks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Applicable Compliance Frameworks</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceFrameworks.map(framework => (
            <label key={framework.id} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <input 
                type="checkbox" 
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                checked={formData.complianceFrameworks.includes(framework.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      complianceFrameworks: [...prev.complianceFrameworks, framework.id]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      complianceFrameworks: prev.complianceFrameworks.filter(f => f !== framework.id)
                    }));
                  }
                }}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{framework.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{framework.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Business Context */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span>Business Context</span>
        </h4>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Objectives *
            </label>
            <textarea
              value={formData.businessObjectives}
              onChange={(e) => setFormData(prev => ({ ...prev, businessObjectives: e.target.value }))}
              placeholder="Describe the business problem this AI solves and expected outcomes..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Audience *
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              placeholder="Define primary and secondary users, their roles and expertise levels..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Success Criteria *
            </label>
            <textarea
              value={formData.successCriteria}
              onChange={(e) => setFormData(prev => ({ ...prev, successCriteria: e.target.value }))}
              placeholder="Define measurable success criteria and KPIs..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCaseDefinition = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-xl ${getSectionBg('green')} border ${getSectionBorder('green')}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getSectionColor('green')} text-white`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Use Case Definition</h3>
              <p className="text-gray-600 dark:text-gray-400">Define specific use cases and interaction scenarios</p>
            </div>
          </div>
          <button
            onClick={addUseCase}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Use Case</span>
          </button>
        </div>
      </div>

      {/* Use Cases List */}
      <div className="space-y-6">
        {formData.useCases.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Use Cases Defined</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by defining your first use case to establish the foundation for risk assessment and governance.
            </p>
            <button
              onClick={addUseCase}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create First Use Case</span>
            </button>
          </div>
        ) : (
          formData.useCases.map((useCase: any, index: number) => (
            <div key={useCase.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span className="w-8 h-8 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>Use Case {index + 1}</span>
                </h4>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Use Case Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Emergency Triage Assessment"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Source Type *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors">
                    <option value="">Select Source Type</option>
                    {appTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors">
                    <option value="">Select Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Complexity Level *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors">
                    <option value="">Select Complexity</option>
                    <option value="simple">Simple</option>
                    <option value="medium">Medium</option>
                    <option value="complex">Complex</option>
                    <option value="very_complex">Very Complex</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Use Case Description *
                </label>
                <textarea
                  placeholder="Describe the specific use case, user interactions, and expected behavior..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none transition-colors"
                />
              </div>

              {/* TEVV Risk Context */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>TEVV Risk Context</span>
                </h5>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                      Potential Misuse Cases
                    </label>
                    <textarea
                      placeholder="Identify potential misuse scenarios (e.g., self-diagnosis by patients, replacement of medical judgment)..."
                      className="w-full px-4 py-3 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                      Domain-Specific Harms
                    </label>
                    <textarea
                      placeholder="List potential harms specific to your domain (e.g., medical misdiagnosis, delayed treatment)..."
                      className="w-full px-4 py-3 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                      Stakeholder Impact Assessment
                    </label>
                    <textarea
                      placeholder="Assess impact on different stakeholders (patients, providers, regulators, society)..."
                      className="w-full px-4 py-3 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderRiskClassification = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-xl ${getSectionBg('red')} border ${getSectionBorder('red')}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getSectionColor('red')} text-white`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Risk Classification</h3>
              <p className="text-gray-600 dark:text-gray-400">Identify and classify potential risks and threats</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Identified Risks</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{formData.selectedRisks.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Library */}
      {formData.appType && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Database className="w-5 h-5 text-red-600" />
            <span>Risk Library - {appTypes.find(t => t.value === formData.appType)?.label}</span>
          </h4>
          
          <div className="space-y-4">
            {riskLibrary[formData.appType as keyof typeof riskLibrary]?.map((risk: any) => (
              <div key={risk.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">{risk.name}</h5>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(risk.impact)}`}>
                        {risk.impact.toUpperCase()} IMPACT
                      </div>
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        {risk.category}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{risk.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Business Impact</span>
                        <div className="text-sm text-gray-900 dark:text-white">{risk.businessImpact}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Technical Impact</span>
                        <div className="text-sm text-gray-900 dark:text-white">{risk.technicalImpact}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Compliance Impact</span>
                        <div className="text-sm text-gray-900 dark:text-white">{risk.complianceImpact}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs text-gray-500 dark:text-gray-500">NIST RMF:</span>
                      {risk.nistMapping.map((mapping: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded font-mono">
                          {mapping}
                        </span>
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">EU TEVV:</span>
                      {risk.tevvMapping.map((mapping: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                          {mapping}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addRisk(risk)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Risk</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Risks */}
      {formData.selectedRisks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Selected Risks ({formData.selectedRisks.length})</span>
          </h4>
          
          <div className="space-y-4">
            {formData.selectedRisks.map((risk: any, index: number) => (
              <div key={risk.id} className="border border-red-200 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100">{risk.name}</h5>
                    <p className="text-sm text-red-700 dark:text-red-300">{risk.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(risk.impact)}`}>
                    {risk.impact.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGovernanceControls = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-xl ${getSectionBg('purple')} border ${getSectionBorder('purple')}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getSectionColor('purple')} text-white`}>
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Governance Controls</h3>
              <p className="text-gray-600 dark:text-gray-400">Establish controls and mitigation strategies</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Controls</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formData.controls.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Categories */}
      <div className="space-y-6">
        {Object.entries(controlTemplates).map(([category, controls]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h4>
              <span className="text-sm text-gray-600 dark:text-gray-400">{controls.length} available controls</span>
            </div>
            
            <div className="space-y-4">
              {controls.map((control: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">{control.name}</h5>
                        <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                          {control.type}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{control.description}</p>
                      
                      <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <strong>Mitigation:</strong> {control.mitigation}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addControl(control)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-500">NIST:</span>
                    {control.nistMapping.map((mapping: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded font-mono">
                        {mapping}
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">TEVV:</span>
                    {control.tevvMapping.map((mapping: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                        {mapping}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Controls */}
      {formData.controls.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span>Implemented Controls ({formData.controls.length})</span>
          </h4>
          
          <div className="space-y-4">
            {formData.controls.map((control: any, index: number) => (
              <div key={control.id} className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-purple-900 dark:text-purple-100">{control.name}</h5>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{control.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-xs rounded">
                      {control.type}
                    </div>
                    <button className="p-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGovernanceMatrix = () => {
    if (formData.governanceMatrix.length === 0) {
      generateGovernanceMatrix();
    }

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className={`p-6 rounded-xl ${getSectionBg('indigo')} border ${getSectionBorder('indigo')}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getSectionColor('indigo')} text-white`}>
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Governance Matrix</h3>
                <p className="text-gray-600 dark:text-gray-400">Complete traceability and governance coverage review</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Matrix</span>
              </button>
              <button
                onClick={generateGovernanceMatrix}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Matrix Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Use Cases</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formData.useCases.length}</p>
              </div>
              <FileText className="w-8 h-8 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Identified Risks</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formData.selectedRisks.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Controls</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formData.controls.length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coverage</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formData.selectedRisks.length > 0 ? Math.round((formData.controls.length / formData.selectedRisks.length) * 100) : 0}%
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Traceability Matrix */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-indigo-600" />
            <span>Traceability Matrix</span>
          </h4>
          
          {formData.governanceMatrix.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source Type</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risks</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Controls</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Compliance</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {formData.governanceMatrix.map((row: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {row.useCaseTitle || `Use Case ${index + 1}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {row.sourceType || 'Not specified'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300">
                          {row.risks?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                          {row.controls?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                          {row.complianceFrameworks?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          (row.controls?.length || 0) >= (row.risks?.length || 1) 
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {row.risks?.length > 0 ? Math.round(((row.controls?.length || 0) / row.risks.length) * 100) : 100}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Matrix Generated</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Complete the previous sections to generate the governance matrix.
              </p>
              <button
                onClick={generateGovernanceMatrix}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Target className="w-5 h-5" />
                <span>Generate Matrix</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'application-setup':
        return renderApplicationSetup();
      case 'use-case-definition':
        return renderUseCaseDefinition();
      case 'risk-classification':
        return renderRiskClassification();
      case 'governance-controls':
        return renderGovernanceControls();
      case 'governance-matrix':
        return renderGovernanceMatrix();
      default:
        return renderApplicationSetup();
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Mapping & Governance</h2>
          <p className="text-gray-600 dark:text-gray-400">NIST RMF and EU TEVV compliant risk assessment and governance framework</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Progress</span>
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 min-w-48 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-3 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${getSectionColor(section.color)} text-white shadow-lg transform scale-[1.02]`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{section.label}</div>
                  <div className={`text-xs ${activeSection === section.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-500'}`}>
                    {section.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(((formData.appName ? 1 : 0) + 
                        (formData.useCases.length > 0 ? 1 : 0) + 
                        (formData.selectedRisks.length > 0 ? 1 : 0) + 
                        (formData.controls.length > 0 ? 1 : 0) + 
                        (formData.governanceMatrix.length > 0 ? 1 : 0)) / 5 * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${((formData.appName ? 1 : 0) + 
                       (formData.useCases.length > 0 ? 1 : 0) + 
                       (formData.selectedRisks.length > 0 ? 1 : 0) + 
                       (formData.controls.length > 0 ? 1 : 0) + 
                       (formData.governanceMatrix.length > 0 ? 1 : 0)) / 5 * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Active Section Content */}
      <div className="min-h-96">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default DataInputForm;