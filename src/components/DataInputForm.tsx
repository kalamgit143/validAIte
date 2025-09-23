import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Trash2, 
  ChevronRight,
  ChevronLeft,
  Save,
  Download,
  FileText,
  Shield,
  Users,
  Building,
  Globe,
  Target,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  Brain,
  Code,
  MessageSquare,
  BarChart3,
  Lock,
  Zap,
  Activity,
  Clock,
  DollarSign,
  Scale,
  Lightbulb,
  Cpu,
  Network,
  HardDrive,
  Workflow,
  GitBranch,
  TestTube,
  Award,
  Crown,
  Search,
  Filter,
  Calendar,
  Edit,
  Copy,
  Upload,
  RefreshCw
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  description: string;
  sourceType: string;
  agents: string[];
  priority: string;
  complexity: string;
  userPersonas: string[];
  expectedOutcome: string;
  successCriteria: string;
  failureScenarios: string[];
  dataRequirements: string[];
  complianceRequirements: string[];
}

interface RiskItem {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: string;
  likelihood: string;
  impact: string;
  threatActors: string[];
  attackVectors: string[];
  businessImpact: string;
  technicalImpact: string;
  complianceImpact: string;
  detectionMethods: string[];
  preventionMethods: string[];
  mitigationStatus: string;
  residualRisk: string;
  riskOwner: string;
  reviewFrequency: string;
  lastAssessment: string;
  nextReview: string;
  monitoringRequirements: string[];
  incidentResponsePlan: string;
  relatedControls: string[];
}

interface Control {
  id: string;
  name: string;
  description: string;
  mappedRisks: string[];
  mitigationStrategy: string;
  complianceMapping: string[];
  agentResponsibility: string;
  controlType: string;
  implementationStatus: string;
  effectivenessRating: string;
  testingFrequency: string;
  automationLevel: string;
  costEstimate: string;
  resourceRequirements: string[];
  dependencies: string[];
  successMetrics: string[];
  monitoringMethod: string;
  alertThreshold: string;
  escalationProcedure: string;
  trainingRequirements: string[];
  documentationLinks: string[];
  lastTested: string;
  nextReview: string;
}

interface GovernanceMatrixRow {
  useCase: string;
  source: string;
  agents: string;
  risks: string;
  severity: string;
  controls: string;
  compliance: string;
  owners: string;
  testing: string;
  evidence: string;
}

const DataInputForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('setup');
  
  // Application Setup State
  const [applicationData, setApplicationData] = useState({
    name: '',
    domain: '',
    environment: '',
    description: '',
    appType: '',
    businessOwner: '',
    technicalOwner: '',
    riskOwner: '',
    complianceOfficer: '',
    riskTolerance: '',
    businessCriticality: '',
    userVolume: '',
    geographicScope: '',
    regulatoryScope: [] as string[],
    businessObjectives: '',
    targetAudience: '',
    successCriteria: '',
    dataClassification: '',
    deploymentModel: '',
    integrationComplexity: ''
  });

  // Use Cases State
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [currentUseCase, setCurrentUseCase] = useState<UseCase>({
    id: '',
    title: '',
    description: '',
    sourceType: '',
    agents: [],
    priority: '',
    complexity: '',
    userPersonas: [],
    expectedOutcome: '',
    successCriteria: '',
    failureScenarios: [],
    dataRequirements: [],
    complianceRequirements: []
  });

  // Risk Classification State
  const [selectedRisks, setSelectedRisks] = useState<RiskItem[]>([]);
  const [customRisks, setCustomRisks] = useState<RiskItem[]>([]);

  // Controls State
  const [controls, setControls] = useState<Control[]>([]);
  const [currentControl, setCurrentControl] = useState<Control>({
    id: '',
    name: '',
    description: '',
    mappedRisks: [],
    mitigationStrategy: '',
    complianceMapping: [],
    agentResponsibility: '',
    controlType: '',
    implementationStatus: '',
    effectivenessRating: '',
    testingFrequency: '',
    automationLevel: '',
    costEstimate: '',
    resourceRequirements: [],
    dependencies: [],
    successMetrics: [],
    monitoringMethod: '',
    alertThreshold: '',
    escalationProcedure: '',
    trainingRequirements: [],
    documentationLinks: [],
    lastTested: '',
    nextReview: ''
  });

  // Governance Matrix State
  const [governanceMatrix, setGovernanceMatrix] = useState<GovernanceMatrixRow[]>([]);

  // Risk Library by Application Type
  const riskLibrary = {
    'plain_llm': [
      {
        id: 'RISK-LLM-001',
        name: 'Hallucination & Factual Errors',
        description: 'Model generates false or misleading information',
        category: 'Accuracy & Reliability',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.1', 'MEASURE-2.2'],
        tevvMapping: ['T-1.1', 'E-1.2'],
        complianceFrameworks: ['EU AI Act Art. 15', 'NIST RMF']
      },
      {
        id: 'RISK-LLM-002',
        name: 'Demographic Bias & Fairness',
        description: 'Unfair treatment across demographic groups',
        category: 'Fairness & Non-discrimination',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.3', 'MANAGE-2.1'],
        tevvMapping: ['E-2.1', 'V-1.3'],
        complianceFrameworks: ['EU AI Act Art. 10', 'ECOA']
      },
      {
        id: 'RISK-LLM-003',
        name: 'Toxic Content Generation',
        description: 'Generation of harmful, offensive, or inappropriate content',
        category: 'Safety & Harm Prevention',
        defaultSeverity: 'critical',
        nistMapping: ['GOVERN-1.3', 'MEASURE-2.4'],
        tevvMapping: ['T-2.1', 'E-2.2'],
        complianceFrameworks: ['EU AI Act Art. 5', 'Content Safety Standards']
      },
      {
        id: 'RISK-LLM-004',
        name: 'Output Inconsistency',
        description: 'Inconsistent responses to similar inputs',
        category: 'Reliability & Performance',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.1'],
        tevvMapping: ['T-1.2'],
        complianceFrameworks: ['NIST RMF', 'ISO/IEC 23053']
      },
      {
        id: 'RISK-LLM-005',
        name: 'Prompt Injection Attacks',
        description: 'Malicious manipulation through crafted prompts',
        category: 'Security & Robustness',
        defaultSeverity: 'high',
        nistMapping: ['PROTECT-1.1', 'DETECT-1.1'],
        tevvMapping: ['T-3.1', 'V-2.1'],
        complianceFrameworks: ['OWASP LLM-01', 'NIST Cybersecurity']
      },
      {
        id: 'RISK-LLM-006',
        name: 'Data Privacy Leakage',
        description: 'Exposure of sensitive information in outputs',
        category: 'Privacy & Data Protection',
        defaultSeverity: 'critical',
        nistMapping: ['GOVERN-1.2', 'PROTECT-2.1'],
        tevvMapping: ['T-4.1', 'V-3.1'],
        complianceFrameworks: ['GDPR Art. 25', 'CCPA', 'HIPAA']
      },
      {
        id: 'RISK-LLM-007',
        name: 'Explainability Gap',
        description: 'Inability to explain model decisions',
        category: 'Transparency & Explainability',
        defaultSeverity: 'medium',
        nistMapping: ['MANAGE-1.1'],
        tevvMapping: ['E-3.1'],
        complianceFrameworks: ['EU AI Act Art. 13', 'Right to Explanation']
      }
    ],
    'llm_rag': [
      // Include all Plain LLM risks plus RAG-specific
      {
        id: 'RISK-RAG-001',
        name: 'Retrieval Accuracy Errors',
        description: 'Incorrect or irrelevant document retrieval',
        category: 'Retrieval & Grounding',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.1'],
        tevvMapping: ['T-1.3', 'E-1.3'],
        complianceFrameworks: ['NIST RMF', 'Domain Standards']
      },
      {
        id: 'RISK-RAG-002',
        name: 'Knowledge Base Drift',
        description: 'Outdated or stale information in knowledge base',
        category: 'Data Quality & Freshness',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.5'],
        tevvMapping: ['T-1.4'],
        complianceFrameworks: ['Data Governance Standards']
      },
      {
        id: 'RISK-RAG-003',
        name: 'Conflicting Source Information',
        description: 'Contradictory information from multiple sources',
        category: 'Information Integrity',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.2'],
        tevvMapping: ['E-1.4'],
        complianceFrameworks: ['Information Quality Standards']
      },
      {
        id: 'RISK-RAG-004',
        name: 'Grounding Failure',
        description: 'Model ignores retrieved context',
        category: 'Retrieval & Grounding',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.1'],
        tevvMapping: ['T-1.5', 'E-1.5'],
        complianceFrameworks: ['NIST RMF']
      },
      {
        id: 'RISK-RAG-005',
        name: 'Retrieval Injection',
        description: 'Malicious content injection through retrieval',
        category: 'Security & Robustness',
        defaultSeverity: 'high',
        nistMapping: ['PROTECT-1.2', 'DETECT-1.2'],
        tevvMapping: ['T-3.2'],
        complianceFrameworks: ['OWASP LLM-02', 'Security Standards']
      },
      {
        id: 'RISK-RAG-006',
        name: 'Citation Inconsistency',
        description: 'Inaccurate or missing source citations',
        category: 'Transparency & Traceability',
        defaultSeverity: 'medium',
        nistMapping: ['MANAGE-1.2'],
        tevvMapping: ['E-3.2'],
        complianceFrameworks: ['Academic Standards', 'Transparency Requirements']
      }
    ],
    'multi_agent_rag': [
      // Include all LLM + RAG risks plus Multi-Agent specific
      {
        id: 'RISK-AGENT-001',
        name: 'Agent Misrouting',
        description: 'Incorrect routing between agents',
        category: 'Agent Orchestration',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.6'],
        tevvMapping: ['T-5.1'],
        complianceFrameworks: ['Multi-Agent Standards']
      },
      {
        id: 'RISK-AGENT-002',
        name: 'Agent Deadlocks',
        description: 'Circular dependencies causing system halt',
        category: 'System Reliability',
        defaultSeverity: 'critical',
        nistMapping: ['MEASURE-1.1'],
        tevvMapping: ['T-5.2'],
        complianceFrameworks: ['System Reliability Standards']
      },
      {
        id: 'RISK-AGENT-003',
        name: 'Tool Misuse',
        description: 'Inappropriate or dangerous tool usage',
        category: 'Tool Safety',
        defaultSeverity: 'critical',
        nistMapping: ['GOVERN-1.4', 'PROTECT-1.3'],
        tevvMapping: ['T-5.3', 'V-2.2'],
        complianceFrameworks: ['Tool Safety Standards', 'EU AI Act']
      },
      {
        id: 'RISK-AGENT-004',
        name: 'Excessive Latency',
        description: 'Multi-agent coordination causing delays',
        category: 'Performance & Efficiency',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-1.2'],
        tevvMapping: ['T-5.4'],
        complianceFrameworks: ['Performance Standards']
      },
      {
        id: 'RISK-AGENT-005',
        name: 'State Leakage',
        description: 'Information leakage between agent sessions',
        category: 'Privacy & Security',
        defaultSeverity: 'high',
        nistMapping: ['PROTECT-2.2'],
        tevvMapping: ['T-4.2'],
        complianceFrameworks: ['GDPR', 'Privacy Standards']
      },
      {
        id: 'RISK-AGENT-006',
        name: 'Handoff Errors',
        description: 'Information loss during agent transitions',
        category: 'Information Integrity',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.7'],
        tevvMapping: ['T-5.5'],
        complianceFrameworks: ['Data Integrity Standards']
      },
      {
        id: 'RISK-AGENT-007',
        name: 'Over-Delegation',
        description: 'Excessive autonomy without human oversight',
        category: 'Human Oversight',
        defaultSeverity: 'high',
        nistMapping: ['GOVERN-1.5'],
        tevvMapping: ['V-1.1'],
        complianceFrameworks: ['EU AI Act Art. 14', 'Human Oversight Standards']
      }
    ],
    'copilot': [
      {
        id: 'RISK-COP-001',
        name: 'Wrong Action Execution',
        description: 'Copilot executes unintended or harmful actions',
        category: 'Action Safety',
        defaultSeverity: 'critical',
        nistMapping: ['GOVERN-1.6', 'PROTECT-1.4'],
        tevvMapping: ['T-6.1', 'V-2.3'],
        complianceFrameworks: ['Action Safety Standards', 'EU AI Act']
      },
      {
        id: 'RISK-COP-002',
        name: 'Context Leakage',
        description: 'Sensitive context shared inappropriately',
        category: 'Privacy & Security',
        defaultSeverity: 'high',
        nistMapping: ['PROTECT-2.3'],
        tevvMapping: ['T-4.3'],
        complianceFrameworks: ['GDPR', 'Confidentiality Standards']
      },
      {
        id: 'RISK-COP-003',
        name: 'Over-Autonomy',
        description: 'Excessive autonomous behavior without user consent',
        category: 'Human Agency',
        defaultSeverity: 'high',
        nistMapping: ['GOVERN-1.7'],
        tevvMapping: ['V-1.2'],
        complianceFrameworks: ['EU AI Act Art. 14', 'Human Agency Standards']
      }
    ],
    'summarizer': [
      {
        id: 'RISK-SUM-001',
        name: 'Coverage Gaps',
        description: 'Important information omitted from summaries',
        category: 'Information Completeness',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.8'],
        tevvMapping: ['E-1.6'],
        complianceFrameworks: ['Information Standards']
      },
      {
        id: 'RISK-SUM-002',
        name: 'Compression Bias',
        description: 'Systematic bias in information selection',
        category: 'Fairness & Representation',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.3'],
        tevvMapping: ['E-2.3'],
        complianceFrameworks: ['Fairness Standards']
      },
      {
        id: 'RISK-SUM-003',
        name: 'Hallucinated Citations',
        description: 'False or non-existent source references',
        category: 'Information Integrity',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.9'],
        tevvMapping: ['E-1.7'],
        complianceFrameworks: ['Academic Standards', 'Citation Standards']
      }
    ],
    'content_generator': [
      {
        id: 'RISK-CONT-001',
        name: 'Plagiarism & Copyright',
        description: 'Generation of copyrighted or plagiarized content',
        category: 'Intellectual Property',
        defaultSeverity: 'critical',
        nistMapping: ['GOVERN-1.8'],
        tevvMapping: ['E-4.1'],
        complianceFrameworks: ['Copyright Law', 'IP Standards']
      },
      {
        id: 'RISK-CONT-002',
        name: 'Brand Drift',
        description: 'Content inconsistent with brand guidelines',
        category: 'Brand Consistency',
        defaultSeverity: 'medium',
        nistMapping: ['MEASURE-2.10'],
        tevvMapping: ['E-4.2'],
        complianceFrameworks: ['Brand Standards']
      },
      {
        id: 'RISK-CONT-003',
        name: 'Ethical Content Risks',
        description: 'Generation of ethically problematic content',
        category: 'Ethics & Values',
        defaultSeverity: 'high',
        nistMapping: ['GOVERN-1.9'],
        tevvMapping: ['E-2.4', 'V-1.4'],
        complianceFrameworks: ['Ethics Guidelines', 'Content Standards']
      }
    ],
    'decision_support': [
      {
        id: 'RISK-DEC-001',
        name: 'Over-Reliance on AI',
        description: 'Humans overly dependent on AI recommendations',
        category: 'Human Agency',
        defaultSeverity: 'high',
        nistMapping: ['GOVERN-1.10'],
        tevvMapping: ['V-1.5'],
        complianceFrameworks: ['Human Oversight Standards']
      },
      {
        id: 'RISK-DEC-002',
        name: 'Decision Explainability Gap',
        description: 'Inability to explain decision rationale',
        category: 'Transparency & Explainability',
        defaultSeverity: 'high',
        nistMapping: ['MANAGE-1.3'],
        tevvMapping: ['E-3.3'],
        complianceFrameworks: ['Right to Explanation', 'EU AI Act Art. 13']
      },
      {
        id: 'RISK-DEC-003',
        name: 'Fairness in Decision Ranking',
        description: 'Biased ranking or prioritization of options',
        category: 'Fairness & Non-discrimination',
        defaultSeverity: 'high',
        nistMapping: ['MEASURE-2.3'],
        tevvMapping: ['E-2.5'],
        complianceFrameworks: ['Fairness Standards', 'Anti-Discrimination Law']
      }
    ]
  };

  const domains = [
    'Retail & E-commerce',
    'Banking & Financial Services',
    'Insurance',
    'Healthcare & Life Sciences',
    'Government & Public Sector',
    'Manufacturing',
    'Technology & Software',
    'Education',
    'Energy & Utilities',
    'Transportation & Logistics',
    'Media & Entertainment',
    'Real Estate',
    'Legal Services',
    'Consulting & Professional Services',
    'Non-Profit & NGO'
  ];

  const appTypes = [
    { value: 'plain_llm', label: 'Plain LLM' },
    { value: 'llm_rag', label: 'LLM + RAG' },
    { value: 'multi_agent_rag', label: 'Multi-Agentic (Tool Calling, MCP, etc.) + RAG' },
    { value: 'copilot', label: 'Copilot / Assistant' },
    { value: 'summarizer', label: 'Summarizer / Q&A System' },
    { value: 'content_generator', label: 'Content Generator' },
    { value: 'decision_support', label: 'Decision Support' }
  ];

  const sourceTypes = [
    'Knowledge Base (KB)',
    'API Integration',
    'Database Query',
    'Agent Orchestration',
    'File System',
    'Web Scraping',
    'Real-time Data Stream',
    'None (Direct LLM)'
  ];

  const agentTypes = [
    'Retriever Agent',
    'Summarizer Agent',
    'Orchestrator Agent',
    'Tool Caller Agent',
    'Compliance Agent',
    'Validation Agent',
    'Router Agent',
    'Memory Agent',
    'Planning Agent',
    'Execution Agent'
  ];

  const complianceFrameworks = [
    'NIST AI RMF',
    'EU AI Act',
    'GDPR',
    'CCPA',
    'HIPAA',
    'SOX',
    'PCI DSS',
    'ISO/IEC 23053',
    'ISO/IEC 27001',
    'SOC 2',
    'FedRAMP',
    'OWASP LLM Top 10',
    'IEEE Standards',
    'Domain-Specific Regulations'
  ];

  const userPersonas = [
    'End Customers',
    'Internal Employees',
    'Customer Service Agents',
    'Domain Experts',
    'Administrators',
    'Developers',
    'Compliance Officers',
    'External Partners',
    'Regulatory Bodies',
    'General Public'
  ];

  const riskCategories = [
    'Accuracy & Reliability',
    'Fairness & Non-discrimination',
    'Security & Robustness',
    'Privacy & Data Protection',
    'Transparency & Explainability',
    'Safety & Harm Prevention',
    'Performance & Efficiency',
    'Compliance & Governance',
    'Human Agency & Oversight',
    'Societal & Environmental Impact'
  ];

  const controlTypes = [
    'Preventive Control',
    'Detective Control',
    'Corrective Control',
    'Compensating Control',
    'Administrative Control',
    'Technical Control',
    'Physical Control'
  ];

  const addUseCase = () => {
    if (currentUseCase.title && currentUseCase.description) {
      const newUseCase = {
        ...currentUseCase,
        id: `uc_${Date.now()}`
      };
      setUseCases([...useCases, newUseCase]);
      setCurrentUseCase({
        id: '',
        title: '',
        description: '',
        sourceType: '',
        agents: [],
        priority: '',
        complexity: '',
        userPersonas: [],
        expectedOutcome: '',
        successCriteria: '',
        failureScenarios: [],
        dataRequirements: [],
        complianceRequirements: []
      });
    }
  };

  const removeUseCase = (id: string) => {
    setUseCases(useCases.filter(uc => uc.id !== id));
  };

  const getRisksForAppType = (appType: string): any[] => {
    const baseRisks = riskLibrary['plain_llm'] || [];
    const ragRisks = riskLibrary['llm_rag'] || [];
    const agentRisks = riskLibrary['multi_agent_rag'] || [];
    
    switch (appType) {
      case 'plain_llm':
        return baseRisks;
      case 'llm_rag':
        return [...baseRisks, ...ragRisks];
      case 'multi_agent_rag':
        return [...baseRisks, ...ragRisks, ...agentRisks];
      case 'copilot':
        return [...baseRisks, ...(riskLibrary['copilot'] || [])];
      case 'summarizer':
        return [...baseRisks, ...(riskLibrary['summarizer'] || [])];
      case 'content_generator':
        return [...baseRisks, ...(riskLibrary['content_generator'] || [])];
      case 'decision_support':
        return [...baseRisks, ...(riskLibrary['decision_support'] || [])];
      default:
        return baseRisks;
    }
  };

  const generateGovernanceMatrix = () => {
    const matrix: GovernanceMatrixRow[] = [];
    
    useCases.forEach(useCase => {
      selectedRisks.forEach(risk => {
        const relatedControls = controls.filter(control => 
          control.mappedRisks.includes(risk.id)
        );
        
        relatedControls.forEach(control => {
          matrix.push({
            useCase: useCase.title,
            source: useCase.sourceType,
            agents: useCase.agents.join(', '),
            risks: risk.name,
            severity: risk.severity,
            controls: control.name,
            compliance: control.complianceMapping.join(', '),
            owners: `Risk: ${risk.riskOwner || 'TBD'}, Control: ${control.name}`,
            testing: `${control.testingFrequency} - ${control.automationLevel}`,
            evidence: `${control.monitoringMethod} - ${control.successMetrics.join(', ')}`
          });
        });
      });
    });
    
    setGovernanceMatrix(matrix);
  };

  const exportEvidencePack = (format: string) => {
    const evidencePack = {
      application: applicationData,
      useCases: useCases,
      risks: selectedRisks,
      controls: controls,
      governanceMatrix: governanceMatrix,
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0',
        framework: 'NIST RMF + EU TEVV',
        exportFormat: format
      }
    };
    
    console.log(`Exporting evidence pack in ${format} format:`, evidencePack);
  };

  const renderApplicationSetup = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Setup</h3>
        <p className="text-gray-600 dark:text-gray-400">Define your GenAI application context and governance structure</p>
      </div>

      {/* Basic Application Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Name *
            </label>
            <input
              type="text"
              value={applicationData.name}
              onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Retail Copilot"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain *
            </label>
            <select
              value={applicationData.domain}
              onChange={(e) => setApplicationData(prev => ({ ...prev, domain: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Domain</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deployment Environment *
            </label>
            <select
              value={applicationData.environment}
              onChange={(e) => setApplicationData(prev => ({ ...prev, environment: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Environment</option>
              <option value="sandbox">Sandbox</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Type *
            </label>
            <select
              value={applicationData.appType}
              onChange={(e) => setApplicationData(prev => ({ ...prev, appType: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Application Type</option>
              {appTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={applicationData.description}
            onChange={(e) => setApplicationData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the application's purpose, functionality, and business context..."
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          />
        </div>
      </div>

      {/* NIST RMF Governance Context */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>NIST RMF Governance Context</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Owner *
            </label>
            <select
              value={applicationData.businessOwner}
              onChange={(e) => setApplicationData(prev => ({ ...prev, businessOwner: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Business Owner</option>
              <option value="ceo">CEO</option>
              <option value="coo">COO</option>
              <option value="business_unit_head">Business Unit Head</option>
              <option value="product_manager">Product Manager</option>
              <option value="department_head">Department Head</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technical Owner *
            </label>
            <select
              value={applicationData.technicalOwner}
              onChange={(e) => setApplicationData(prev => ({ ...prev, technicalOwner: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Technical Owner</option>
              <option value="cto">CTO</option>
              <option value="engineering_manager">Engineering Manager</option>
              <option value="ai_lead">AI/ML Lead</option>
              <option value="architect">Solution Architect</option>
              <option value="tech_lead">Technical Lead</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Owner (CIO/CISO) *
            </label>
            <select
              value={applicationData.riskOwner}
              onChange={(e) => setApplicationData(prev => ({ ...prev, riskOwner: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Risk Owner</option>
              <option value="cio">CIO (Chief Information Officer)</option>
              <option value="ciso">CISO (Chief Information Security Officer)</option>
              <option value="cdo">CDO (Chief Data Officer)</option>
              <option value="cro">CRO (Chief Risk Officer)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compliance Officer *
            </label>
            <select
              value={applicationData.complianceOfficer}
              onChange={(e) => setApplicationData(prev => ({ ...prev, complianceOfficer: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Compliance Officer</option>
              <option value="chief_compliance">Chief Compliance Officer</option>
              <option value="privacy_officer">Privacy Officer</option>
              <option value="data_protection">Data Protection Officer</option>
              <option value="regulatory_affairs">Regulatory Affairs Manager</option>
              <option value="legal_counsel">Legal Counsel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Context */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-red-600" />
          <span>Risk Context</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Tolerance Level *
            </label>
            <select
              value={applicationData.riskTolerance}
              onChange={(e) => setApplicationData(prev => ({ ...prev, riskTolerance: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              value={applicationData.businessCriticality}
              onChange={(e) => setApplicationData(prev => ({ ...prev, businessCriticality: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              value={applicationData.userVolume}
              onChange={(e) => setApplicationData(prev => ({ ...prev, userVolume: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              value={applicationData.geographicScope}
              onChange={(e) => setApplicationData(prev => ({ ...prev, geographicScope: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Scope</option>
              <option value="local">Local/Regional</option>
              <option value="national">National</option>
              <option value="eu">European Union</option>
              <option value="global">Global</option>
              <option value="us_only">US Only</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Regulatory Scope *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {complianceFrameworks.map(framework => (
              <label key={framework} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={applicationData.regulatoryScope.includes(framework)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setApplicationData(prev => ({ 
                        ...prev, 
                        regulatoryScope: [...prev.regulatoryScope, framework] 
                      }));
                    } else {
                      setApplicationData(prev => ({ 
                        ...prev, 
                        regulatoryScope: prev.regulatoryScope.filter(f => f !== framework) 
                      }));
                    }
                  }}
                  className="rounded border-gray-300" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Business Context */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Building className="w-5 h-5 text-green-600" />
          <span>Business Context</span>
        </h4>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Objectives *
            </label>
            <textarea
              value={applicationData.businessObjectives}
              onChange={(e) => setApplicationData(prev => ({ ...prev, businessObjectives: e.target.value }))}
              placeholder="Describe the business objectives this AI application aims to achieve..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience *
              </label>
              <input
                type="text"
                value={applicationData.targetAudience}
                onChange={(e) => setApplicationData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="e.g., Customer service representatives, End customers"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Classification *
              </label>
              <select
                value={applicationData.dataClassification}
                onChange={(e) => setApplicationData(prev => ({ ...prev, dataClassification: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Success Criteria *
            </label>
            <textarea
              value={applicationData.successCriteria}
              onChange={(e) => setApplicationData(prev => ({ ...prev, successCriteria: e.target.value }))}
              placeholder="Define measurable success criteria (e.g., 95% accuracy, &lt;2s response time, 90% user satisfaction)..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCaseDefinition = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Use Case Definition</h3>
        <p className="text-gray-600 dark:text-gray-400">Define specific use cases and their requirements</p>
      </div>

      {/* Existing Use Cases */}
      {useCases.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Defined Use Cases</h4>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={useCase.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">{useCase.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{useCase.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Source: {useCase.sourceType}</span>
                      <span>Priority: {useCase.priority}</span>
                      {useCase.agents.length > 0 && <span>Agents: {useCase.agents.join(', ')}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => removeUseCase(useCase.id)}
                    className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Use Case */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Use Case</h4>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Use Case Title *
              </label>
              <input
                type="text"
                value={currentUseCase.title}
                onChange={(e) => setCurrentUseCase(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Return Policy Inquiry"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Source Type *
              </label>
              <select
                value={currentUseCase.sourceType}
                onChange={(e) => setCurrentUseCase(prev => ({ ...prev, sourceType: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Source Type</option>
                {sourceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={currentUseCase.description}
              onChange={(e) => setCurrentUseCase(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the chatbot task expected, user interaction flow, and desired outcomes..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          {/* Agent Selection (only for Multi-Agentic) */}
          {applicationData.appType === 'multi_agent_rag' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Agents Involved *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {agentTypes.map(agent => (
                  <label key={agent} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={currentUseCase.agents.includes(agent)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentUseCase(prev => ({ 
                            ...prev, 
                            agents: [...prev.agents, agent] 
                          }));
                        } else {
                          setCurrentUseCase(prev => ({ 
                            ...prev, 
                            agents: prev.agents.filter(a => a !== agent) 
                          }));
                        }
                      }}
                      className="rounded border-gray-300" 
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{agent}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Use Case Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority Level *
              </label>
              <select
                value={currentUseCase.priority}
                onChange={(e) => setCurrentUseCase(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
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
              <select
                value={currentUseCase.complexity}
                onChange={(e) => setCurrentUseCase(prev => ({ ...prev, complexity: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Complexity</option>
                <option value="simple">Simple (Single-turn)</option>
                <option value="moderate">Moderate (Multi-turn)</option>
                <option value="complex">Complex (Multi-step)</option>
                <option value="very_complex">Very Complex (Multi-agent)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Outcome Type
              </label>
              <input
                type="text"
                value={currentUseCase.expectedOutcome}
                onChange={(e) => setCurrentUseCase(prev => ({ ...prev, expectedOutcome: e.target.value }))}
                placeholder="e.g., Policy information, Action recommendation"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* User Personas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              User Personas *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {userPersonas.map(persona => (
                <label key={persona} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={currentUseCase.userPersonas.includes(persona)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCurrentUseCase(prev => ({ 
                          ...prev, 
                          userPersonas: [...prev.userPersonas, persona] 
                        }));
                      } else {
                        setCurrentUseCase(prev => ({ 
                          ...prev, 
                          userPersonas: prev.userPersonas.filter(p => p !== persona) 
                        }));
                      }
                    }}
                    className="rounded border-gray-300" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{persona}</span>
                </label>
              ))}
            </div>
          </div>

          {/* TEVV Risk Context */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>TEVV Risk Context</span>
            </h5>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Potential Misuse Cases
                </label>
                <textarea
                  placeholder="Identify potential misuse scenarios (e.g., manipulation for fraud, circumventing policies)..."
                  className="w-full px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-16 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Domain-Specific Harms
                </label>
                <textarea
                  placeholder="List potential harms specific to your domain (e.g., financial loss, privacy breach, safety risks)..."
                  className="w-full px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-16 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Stakeholder Impact Assessment
                </label>
                <textarea
                  placeholder="Identify impacted stakeholders and potential consequences (customers, employees, partners, society)..."
                  className="w-full px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-16 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={addUseCase}
              disabled={!currentUseCase.title || !currentUseCase.description || !currentUseCase.sourceType}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Use Case</span>
            </button>
          </div>
        </div>
      </div>

      {/* Use Case Analytics */}
      {useCases.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Use Case Analytics</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{useCases.length}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Total Use Cases</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {useCases.filter(uc => uc.priority === 'critical' || uc.priority === 'high').length}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">High Priority</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {useCases.filter(uc => uc.complexity === 'complex' || uc.complexity === 'very_complex').length}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Complex Cases</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(useCases.flatMap(uc => uc.userPersonas)).size}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Unique Personas</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderRiskClassification = () => {
    const availableRisks = getRisksForAppType(applicationData.appType);
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Risk Classification</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Identify and classify risks for {appTypes.find(t => t.value === applicationData.appType)?.label}
          </p>
        </div>

        {/* Auto-populated Risks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Risk Library for {appTypes.find(t => t.value === applicationData.appType)?.label}
          </h4>
          
          <div className="space-y-4">
            {availableRisks.map((risk, index) => (
              <div key={risk.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedRisks.some(r => r.id === risk.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newRisk: RiskItem = {
                          id: risk.id,
                          name: risk.name,
                          description: risk.description,
                          category: risk.category,
                          severity: risk.defaultSeverity,
                          likelihood: 'medium',
                          impact: 'medium',
                          threatActors: [],
                          attackVectors: [],
                          businessImpact: '',
                          technicalImpact: '',
                          complianceImpact: '',
                          detectionMethods: [],
                          preventionMethods: [],
                          mitigationStatus: 'planned',
                          residualRisk: 'medium',
                          riskOwner: applicationData.riskOwner,
                          reviewFrequency: 'quarterly',
                          lastAssessment: new Date().toISOString(),
                          nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                          monitoringRequirements: [],
                          incidentResponsePlan: '',
                          relatedControls: []
                        };
                        setSelectedRisks([...selectedRisks, newRisk]);
                      } else {
                        setSelectedRisks(selectedRisks.filter(r => r.id !== risk.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">{risk.name}</h5>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        {risk.id}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.defaultSeverity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        risk.defaultSeverity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                        risk.defaultSeverity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {risk.defaultSeverity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{risk.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Category: {risk.category} | 
                      NIST: {risk.nistMapping?.join(', ')} | 
                      TEVV: {risk.tevvMapping?.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Risks Summary */}
        {selectedRisks.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Selected Risks Summary</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {selectedRisks.filter(r => r.severity === 'critical').length}
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">Critical</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {selectedRisks.filter(r => r.severity === 'high').length}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">High</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {selectedRisks.filter(r => r.severity === 'medium').length}
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {selectedRisks.filter(r => r.severity === 'low').length}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Low</div>
              </div>
            </div>

            <div className="space-y-3">
              {selectedRisks.map(risk => (
                <div key={risk.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{risk.name}</span>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({risk.category})</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    risk.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                    risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {risk.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEstablishControls = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Establish Controls</h3>
        <p className="text-gray-600 dark:text-gray-400">Define controls to mitigate identified risks</p>
      </div>

      {/* Existing Controls */}
      {controls.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Established Controls</h4>
          <div className="space-y-4">
            {controls.map((control, index) => (
              <div key={control.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">{control.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{control.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Risks: {control.mappedRisks.length}</span>
                      <span>Type: {control.controlType}</span>
                      <span>Status: {control.implementationStatus}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setControls(controls.filter(c => c.id !== control.id))}
                    className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Control */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Control</h4>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Control Name *
              </label>
              <input
                type="text"
                value={currentControl.name}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Canonical KB Validation"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Control Type *
              </label>
              <select
                value={currentControl.controlType}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, controlType: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Control Type</option>
                {controlTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Control Description *
            </label>
            <textarea
              value={currentControl.description}
              onChange={(e) => setCurrentControl(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe how this control works and what it protects against..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Mapped Risk(s) *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedRisks.map(risk => (
                <label key={risk.id} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={currentControl.mappedRisks.includes(risk.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCurrentControl(prev => ({ 
                          ...prev, 
                          mappedRisks: [...prev.mappedRisks, risk.id] 
                        }));
                      } else {
                        setCurrentControl(prev => ({ 
                          ...prev, 
                          mappedRisks: prev.mappedRisks.filter(r => r !== risk.id) 
                        }));
                      }
                    }}
                    className="rounded border-gray-300" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{risk.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mitigation Strategy *
            </label>
            <textarea
              value={currentControl.mitigationStrategy}
              onChange={(e) => setCurrentControl(prev => ({ ...prev, mitigationStrategy: e.target.value }))}
              placeholder="e.g., Restrict retriever to validated policy docs, implement content filtering..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Compliance Mapping *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {complianceFrameworks.map(framework => (
                <label key={framework} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={currentControl.complianceMapping.includes(framework)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCurrentControl(prev => ({ 
                          ...prev, 
                          complianceMapping: [...prev.complianceMapping, framework] 
                        }));
                      } else {
                        setCurrentControl(prev => ({ 
                          ...prev, 
                          complianceMapping: prev.complianceMapping.filter(f => f !== framework) 
                        }));
                      }
                    }}
                    className="rounded border-gray-300" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Agent Responsibility (only for Multi-Agentic) */}
          {applicationData.appType === 'multi_agent_rag' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agent Responsibility
              </label>
              <select
                value={currentControl.agentResponsibility}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, agentResponsibility: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Responsible Agent</option>
                {agentTypes.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </select>
            </div>
          )}

          {/* Enhanced Control Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Implementation Status
              </label>
              <select
                value={currentControl.implementationStatus}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, implementationStatus: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="implemented">Implemented</option>
                <option value="verified">Verified</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Testing Frequency
              </label>
              <select
                value={currentControl.testingFrequency}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, testingFrequency: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Frequency</option>
                <option value="continuous">Continuous</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Automation Level
              </label>
              <select
                value={currentControl.automationLevel}
                onChange={(e) => setCurrentControl(prev => ({ ...prev, automationLevel: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Automation</option>
                <option value="fully_automated">Fully Automated</option>
                <option value="partially_automated">Partially Automated</option>
                <option value="manual">Manual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => {
                if (currentControl.name && currentControl.description && currentControl.mappedRisks.length > 0) {
                  const newControl = {
                    ...currentControl,
                    id: `ctrl_${Date.now()}`
                  };
                  setControls([...controls, newControl]);
                  setCurrentControl({
                    id: '',
                    name: '',
                    description: '',
                    mappedRisks: [],
                    mitigationStrategy: '',
                    complianceMapping: [],
                    agentResponsibility: '',
                    controlType: '',
                    implementationStatus: '',
                    effectivenessRating: '',
                    testingFrequency: '',
                    automationLevel: '',
                    costEstimate: '',
                    resourceRequirements: [],
                    dependencies: [],
                    successMetrics: [],
                    monitoringMethod: '',
                    alertThreshold: '',
                    escalationProcedure: '',
                    trainingRequirements: [],
                    documentationLinks: [],
                    lastTested: '',
                    nextReview: ''
                  });
                }
              }}
              disabled={!currentControl.name || !currentControl.description || currentControl.mappedRisks.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Control</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGovernanceMatrix = () => {
    if (governanceMatrix.length === 0) {
      generateGovernanceMatrix();
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Governance Matrix Review</h3>
          <p className="text-gray-600 dark:text-gray-400">Complete traceability from use cases to compliance</p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{useCases.length}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Use Cases</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{selectedRisks.length}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Identified Risks</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{controls.length}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Controls</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(applicationData.regulatoryScope).size}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Frameworks</div>
            </div>
          </div>
        </div>

        {/* Governance Matrix Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Traceability Matrix</h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Agent(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Control(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {governanceMatrix.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.useCase}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.source}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.agents || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.risks}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        row.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                        row.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {row.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.controls}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.compliance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Evidence Pack</h4>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => exportEvidencePack('json')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => exportEvidencePack('csv')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => exportEvidencePack('pdf')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return applicationData.name && applicationData.domain && applicationData.environment && 
               applicationData.appType && applicationData.businessOwner && applicationData.riskOwner;
      case 2:
        return useCases.length > 0;
      case 3:
        return selectedRisks.length > 0;
      case 4:
        return controls.length > 0;
      default:
        return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Application Setup';
      case 2: return 'Use Case Definition';
      case 3: return 'Risk Classification';
      case 4: return 'Establish Controls';
      case 5: return 'Governance Matrix';
      default: return 'Setup';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Mapping & Governance</h2>
          <p className="text-gray-600 dark:text-gray-400">NIST RMF and EU TEVV compliant risk assessment and governance framework</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep} of 5: {getStepTitle()}
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 5 && (
                <div className={`w-16 h-1 mx-4 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Application Setup</span>
          <span>Use Cases</span>
          <span>Risk Classification</span>
          <span>Controls</span>
          <span>Matrix Review</span>
        </div>
      </div>

      {/* Step Content */}
      <div>
        {currentStep === 1 && renderApplicationSetup()}
        {currentStep === 2 && renderUseCaseDefinition()}
        {currentStep === 3 && renderRiskClassification()}
        {currentStep === 4 && renderEstablishControls()}
        {currentStep === 5 && renderGovernanceMatrix()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              disabled={!canProceedToNext()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                // Navigate to Trust Metrics Engine
                console.log('Proceeding to Trust Metrics Engine...');
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Continue to Trust Metrics Engine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataInputForm;