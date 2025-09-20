import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  AlertTriangle,
  Shield,
  Users,
  Brain,
  Database,
  Settings,
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  Target,
  Globe,
  Lock,
  Zap,
  Activity,
  Code,
  MessageSquare,
  BarChart3,
  Search,
  Filter,
  Building,
  Scale,
  Gavel,
  BookOpen,
  Clock,
  Award,
  Layers,
  Network,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Server,
  Cloud,
  Wifi,
  Router,
  Fingerprint,
  Key,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Upload,
  Calendar,
  Timer,
  TrendingUp,
  BarChart,
  PieChart,
  LineChart
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  description: string;
  sourceType: string;
  agentsInvolved: string[];
  businessObjective: string;
  targetAudience: string;
  successCriteria: string;
  potentialMisuse: string[];
  domainHarms: string[];
  stakeholderImpact: string;
  dataTypes: string[];
  outputTypes: string[];
  userPersonas: string[];
  interactionPatterns: string[];
  complianceRequirements: string[];
  riskTolerance: string;
  businessCriticality: string;
  userVolume: string;
  geographicScope: string[];
  regulatoryJurisdiction: string[];
}

interface Risk {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low' | 'critical';
  description: string;
  evidenceNeeded: string;
  category: string;
  likelihood: string;
  impact: string;
  riskOwner: string;
  mitigationStatus: string;
  residualRisk: string;
  threatActors: string[];
  attackVectors: string[];
  businessImpact: string;
  technicalImpact: string;
  complianceImpact: string;
  detectionMethods: string[];
  preventionMethods: string[];
  monitoringRequirements: string[];
  incidentResponsePlan: string;
  reviewFrequency: string;
  lastAssessment: string;
  nextReview: string;
}

interface Control {
  id: string;
  name: string;
  mappedRisks: string[];
  mitigationStrategy: string;
  complianceMapping: string[];
  agentResponsibility?: string;
  controlType: string;
  implementationStatus: string;
  effectiveness: string;
  controlOwner: string;
  testingFrequency: string;
  automationLevel: string;
  costEstimate: string;
  implementationTimeline: string;
  dependencies: string[];
  successMetrics: string[];
  monitoringMethod: string;
  alertThresholds: string;
  escalationProcedure: string;
  documentationLinks: string[];
  trainingRequired: boolean;
  toolsRequired: string[];
  resourceRequirements: string;
}

interface GovernanceMatrixRow {
  useCase: string;
  source: string;
  agents: string[];
  risks: string[];
  severity: string;
  controls: string[];
  compliance: string[];
  riskOwner: string;
  controlOwner: string;
  testingStrategy: string;
  monitoringApproach: string;
  evidenceArtifacts: string[];
  approvalStatus: string;
  lastReview: string;
  nextReview: string;
}

const DataInputForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    name: '',
    domain: '',
    environment: '',
    description: '',
    type: '',
    businessObjective: '',
    targetUsers: '',
    expectedVolume: '',
    geographicScope: [],
    regulatoryScope: [],
    dataClassification: '',
    deploymentModel: '',
    integrationPoints: [],
    securityRequirements: [],
    performanceRequirements: {
      latency: '',
      throughput: '',
      availability: '',
      scalability: ''
    },
    complianceFrameworks: [],
    riskTolerance: '',
    businessCriticality: '',
    stakeholders: {
      businessOwner: '',
      technicalOwner: '',
      riskOwner: '',
      complianceOfficer: '',
      endUsers: []
    }
  });
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [governanceMatrix, setGovernanceMatrix] = useState<GovernanceMatrixRow[]>([]);

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

  const applicationTypes = [
    'Plain LLM',
    'LLM + RAG',
    'Multi-Agentic (Tool Calling, MCP, etc.) + RAG',
    'Copilot / Assistant',
    'Summarizer / Q&A System',
    'Content Generator',
    'Decision Support'
  ];

  const sourceTypes = [
    'Knowledge Base (KB)',
    'API Integration',
    'Database Query',
    'Agent Orchestration',
    'Document Repository',
    'Real-time Data Feed',
    'External Services',
    'None'
  ];

  const agentTypes = [
    'Retriever',
    'Summarizer', 
    'Orchestrator',
    'ToolCaller',
    'ComplianceAgent',
    'AnalyticsAgent',
    'SecurityAgent',
    'ValidationAgent',
    'MonitoringAgent',
    'EscalationAgent'
  ];

  const evidenceTypes = [
    'KB logs',
    'API traces',
    'Agent transcripts',
    'UI recordings',
    'Database queries',
    'System metrics',
    'User feedback',
    'Audit logs',
    'Performance metrics',
    'Security logs',
    'Compliance reports',
    'Test results',
    'Monitoring data',
    'Error logs',
    'Transaction logs'
  ];

  const complianceFrameworks = [
    'NIST AI RMF',
    'EU AI Act',
    'ISO/IEC 23053',
    'ISO/IEC 23894',
    'OWASP LLM Top-10',
    'SOC 2',
    'GDPR',
    'HIPAA',
    'SOX',
    'CCPA',
    'FedRAMP',
    'PCI DSS',
    'ISO 27001',
    'ISO 42001',
    'IEEE 2857'
  ];

  const riskCategories = [
    'Accuracy & Reliability',
    'Fairness & Bias',
    'Security & Privacy',
    'Transparency & Explainability',
    'Safety & Harm Prevention',
    'Performance & Scalability',
    'Governance & Accountability',
    'Data Quality & Integrity',
    'User Experience & Usability',
    'Business Continuity',
    'Legal & Regulatory',
    'Ethical Considerations'
  ];

  const controlTypes = [
    'Preventive',
    'Detective',
    'Corrective',
    'Compensating',
    'Administrative',
    'Technical',
    'Physical',
    'Governance',
    'Process',
    'Monitoring'
  ];

  const getRisksByAppType = (appType: string): Risk[] => {
    const baseRisks: Risk[] = [
      { 
        id: 'hallucination', 
        name: 'Hallucination', 
        category: 'Accuracy & Reliability', 
        severity: 'high', 
        description: 'Model generates false or misleading information not grounded in training data',
        evidenceNeeded: 'API traces',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'AI Engineering Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Malicious users', 'Unintentional misuse'],
        attackVectors: ['Adversarial prompts', 'Edge case inputs'],
        businessImpact: 'Reputation damage, customer trust loss',
        technicalImpact: 'Incorrect outputs, system reliability issues',
        complianceImpact: 'Regulatory violations, audit findings',
        detectionMethods: ['Fact-checking algorithms', 'Confidence scoring', 'Human review'],
        preventionMethods: ['Training data curation', 'Output validation', 'Confidence thresholds'],
        monitoringRequirements: ['Real-time fact verification', 'Output quality scoring'],
        incidentResponsePlan: 'Immediate output flagging, human escalation, root cause analysis',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-15',
        nextReview: '2024-02-15'
      },
      { 
        id: 'bias_fairness', 
        name: 'Bias/Fairness', 
        category: 'Fairness & Bias', 
        severity: 'high', 
        description: 'Discriminatory outputs across demographic groups or protected characteristics',
        evidenceNeeded: 'User feedback',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'Ethics & Fairness Officer',
        mitigationStatus: 'in_progress',
        residualRisk: 'low',
        threatActors: ['Biased training data', 'Algorithmic bias'],
        attackVectors: ['Demographic prompting', 'Stereotype reinforcement'],
        businessImpact: 'Legal liability, discrimination claims',
        technicalImpact: 'Unfair model outputs, performance disparities',
        complianceImpact: 'GDPR violations, discrimination law breaches',
        detectionMethods: ['Bias testing frameworks', 'Demographic analysis', 'Fairness metrics'],
        preventionMethods: ['Diverse training data', 'Bias mitigation techniques', 'Fairness constraints'],
        monitoringRequirements: ['Continuous bias monitoring', 'Demographic performance tracking'],
        incidentResponsePlan: 'Bias incident investigation, model retraining, stakeholder notification',
        reviewFrequency: 'Quarterly',
        lastAssessment: '2024-01-10',
        nextReview: '2024-04-10'
      },
      { 
        id: 'toxicity', 
        name: 'Toxicity', 
        category: 'Safety & Harm Prevention', 
        severity: 'critical', 
        description: 'Generation of harmful, offensive, or inappropriate content',
        evidenceNeeded: 'UI recordings',
        likelihood: 'low',
        impact: 'critical',
        riskOwner: 'Content Safety Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'very_low',
        threatActors: ['Malicious users', 'Adversarial attacks'],
        attackVectors: ['Toxic prompt injection', 'Jailbreaking attempts'],
        businessImpact: 'Brand damage, user harm, legal liability',
        technicalImpact: 'Harmful content generation, safety violations',
        complianceImpact: 'Content policy violations, regulatory sanctions',
        detectionMethods: ['Toxicity classifiers', 'Content filters', 'Human moderation'],
        preventionMethods: ['Input sanitization', 'Output filtering', 'Safety guardrails'],
        monitoringRequirements: ['Real-time toxicity scoring', 'Content safety alerts'],
        incidentResponsePlan: 'Immediate content blocking, user notification, safety review',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-12',
        nextReview: '2024-01-19'
      },
      { 
        id: 'inconsistency', 
        name: 'Inconsistency', 
        category: 'Accuracy & Reliability', 
        severity: 'medium', 
        description: 'Varying responses to similar inputs affecting user trust and reliability',
        evidenceNeeded: 'API traces',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Quality Assurance Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Model instability', 'Parameter variations'],
        attackVectors: ['Temperature manipulation', 'Prompt variations'],
        businessImpact: 'User confusion, reduced trust, support burden',
        technicalImpact: 'Unpredictable outputs, quality degradation',
        complianceImpact: 'Quality standard violations',
        detectionMethods: ['Consistency testing', 'Output comparison', 'Variance analysis'],
        preventionMethods: ['Parameter standardization', 'Prompt engineering', 'Model fine-tuning'],
        monitoringRequirements: ['Output consistency tracking', 'Variance monitoring'],
        incidentResponsePlan: 'Consistency analysis, parameter adjustment, quality review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-08',
        nextReview: '2024-02-08'
      },
      { 
        id: 'prompt_injection', 
        name: 'Prompt Injection', 
        category: 'Security & Privacy', 
        severity: 'critical', 
        description: 'Malicious manipulation of prompts to bypass safety measures or extract sensitive information',
        evidenceNeeded: 'System metrics',
        likelihood: 'medium',
        impact: 'critical',
        riskOwner: 'Security Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Malicious users', 'Attackers', 'Competitors'],
        attackVectors: ['Direct injection', 'Indirect injection', 'Context manipulation'],
        businessImpact: 'Data breaches, security incidents, competitive disadvantage',
        technicalImpact: 'System compromise, unauthorized access, data exposure',
        complianceImpact: 'Security standard violations, data protection breaches',
        detectionMethods: ['Injection detection algorithms', 'Anomaly detection', 'Security monitoring'],
        preventionMethods: ['Input validation', 'Prompt sanitization', 'Access controls'],
        monitoringRequirements: ['Real-time injection detection', 'Security event monitoring'],
        incidentResponsePlan: 'Immediate blocking, security investigation, system hardening',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-14',
        nextReview: '2024-01-21'
      },
      { 
        id: 'data_privacy', 
        name: 'Data Privacy', 
        category: 'Security & Privacy', 
        severity: 'high', 
        description: 'Unauthorized data exposure, processing, or retention violating privacy regulations',
        evidenceNeeded: 'Audit logs',
        likelihood: 'low',
        impact: 'high',
        riskOwner: 'Data Protection Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Internal users', 'External attackers', 'Third parties'],
        attackVectors: ['Data extraction', 'Unauthorized access', 'Data leakage'],
        businessImpact: 'Regulatory fines, legal liability, reputation damage',
        technicalImpact: 'Data breaches, privacy violations, system compromise',
        complianceImpact: 'GDPR violations, privacy law breaches',
        detectionMethods: ['Data loss prevention', 'Access monitoring', 'Privacy scanning'],
        preventionMethods: ['Data minimization', 'Encryption', 'Access controls'],
        monitoringRequirements: ['Data access logging', 'Privacy compliance monitoring'],
        incidentResponsePlan: 'Data breach response, regulatory notification, remediation',
        reviewFrequency: 'Quarterly',
        lastAssessment: '2024-01-05',
        nextReview: '2024-04-05'
      },
      { 
        id: 'explainability_gap', 
        name: 'Explainability Gap', 
        category: 'Transparency & Explainability', 
        severity: 'medium', 
        description: 'Lack of transparency in AI decision-making processes affecting user trust and regulatory compliance',
        evidenceNeeded: 'User feedback',
        likelihood: 'high',
        impact: 'medium',
        riskOwner: 'AI Ethics Officer',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Regulatory scrutiny', 'User distrust'],
        attackVectors: ['Black box decisions', 'Unexplained outputs'],
        businessImpact: 'Regulatory scrutiny, user distrust, adoption barriers',
        technicalImpact: 'Debugging difficulties, model opacity',
        complianceImpact: 'Transparency requirement violations',
        detectionMethods: ['Explainability testing', 'User surveys', 'Regulatory audits'],
        preventionMethods: ['Explainable AI techniques', 'Decision logging', 'Transparency features'],
        monitoringRequirements: ['Explanation quality tracking', 'User comprehension metrics'],
        incidentResponsePlan: 'Explanation enhancement, transparency improvement, user communication',
        reviewFrequency: 'Quarterly',
        lastAssessment: '2024-01-03',
        nextReview: '2024-04-03'
      }
    ];

    const ragRisks: Risk[] = [
      { 
        id: 'retrieval_errors', 
        name: 'Retrieval Errors', 
        category: 'Accuracy & Reliability', 
        severity: 'high', 
        description: 'Incorrect or irrelevant document retrieval leading to poor response quality',
        evidenceNeeded: 'KB logs',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'Data Engineering Lead',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Poor data quality', 'Indexing errors'],
        attackVectors: ['Query manipulation', 'Index corruption'],
        businessImpact: 'Poor user experience, reduced accuracy',
        technicalImpact: 'Irrelevant retrievals, quality degradation',
        complianceImpact: 'Accuracy standard violations',
        detectionMethods: ['Retrieval quality metrics', 'Relevance scoring', 'User feedback'],
        preventionMethods: ['Index optimization', 'Query enhancement', 'Relevance tuning'],
        monitoringRequirements: ['Retrieval performance tracking', 'Quality metrics monitoring'],
        incidentResponsePlan: 'Index reoptimization, query refinement, quality review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-10',
        nextReview: '2024-02-10'
      },
      { 
        id: 'kb_freshness_drift', 
        name: 'KB Freshness/Drift', 
        category: 'Data Quality & Integrity', 
        severity: 'medium', 
        description: 'Outdated or drifting knowledge base content affecting response accuracy',
        evidenceNeeded: 'KB logs',
        likelihood: 'high',
        impact: 'medium',
        riskOwner: 'Content Management Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Content staleness', 'Update delays'],
        attackVectors: ['Outdated information', 'Content drift'],
        businessImpact: 'Outdated information, user dissatisfaction',
        technicalImpact: 'Stale data retrieval, accuracy degradation',
        complianceImpact: 'Data quality standard violations',
        detectionMethods: ['Freshness monitoring', 'Content versioning', 'Update tracking'],
        preventionMethods: ['Automated updates', 'Content lifecycle management', 'Version control'],
        monitoringRequirements: ['Content freshness tracking', 'Update frequency monitoring'],
        incidentResponsePlan: 'Content refresh, update prioritization, quality validation',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-12',
        nextReview: '2024-01-19'
      },
      { 
        id: 'conflicting_sources', 
        name: 'Conflicting Sources', 
        category: 'Accuracy & Reliability', 
        severity: 'medium', 
        description: 'Contradictory information from multiple sources leading to inconsistent responses',
        evidenceNeeded: 'KB logs',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Content Quality Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Content conflicts', 'Source inconsistencies'],
        attackVectors: ['Contradictory documents', 'Version conflicts'],
        businessImpact: 'User confusion, credibility issues',
        technicalImpact: 'Inconsistent outputs, quality issues',
        complianceImpact: 'Information quality violations',
        detectionMethods: ['Conflict detection algorithms', 'Source comparison', 'Consistency checks'],
        preventionMethods: ['Source prioritization', 'Conflict resolution rules', 'Content harmonization'],
        monitoringRequirements: ['Conflict detection monitoring', 'Source consistency tracking'],
        incidentResponsePlan: 'Conflict resolution, source prioritization, content review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-09',
        nextReview: '2024-02-09'
      },
      { 
        id: 'grounding_gap', 
        name: 'Grounding Gap', 
        category: 'Accuracy & Reliability', 
        severity: 'high', 
        description: 'Responses not properly grounded in retrieved content, leading to hallucinations',
        evidenceNeeded: 'API traces',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'AI Engineering Lead',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Model limitations', 'Poor grounding'],
        attackVectors: ['Weak retrieval signals', 'Poor context integration'],
        businessImpact: 'Inaccurate information, user distrust',
        technicalImpact: 'Ungrounded responses, hallucinations',
        complianceImpact: 'Accuracy requirement violations',
        detectionMethods: ['Grounding verification', 'Citation checking', 'Source validation'],
        preventionMethods: ['Grounding enforcement', 'Citation requirements', 'Source verification'],
        monitoringRequirements: ['Grounding quality tracking', 'Citation accuracy monitoring'],
        incidentResponsePlan: 'Grounding improvement, citation verification, quality review',
        reviewFrequency: 'Bi-weekly',
        lastAssessment: '2024-01-11',
        nextReview: '2024-01-25'
      },
      { 
        id: 'retrieval_injection', 
        name: 'Retrieval Injection', 
        category: 'Security & Privacy', 
        severity: 'critical', 
        description: 'Malicious content injection through retrieval mechanisms',
        evidenceNeeded: 'System metrics',
        likelihood: 'low',
        impact: 'critical',
        riskOwner: 'Security Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'very_low',
        threatActors: ['Malicious actors', 'Insider threats'],
        attackVectors: ['Document poisoning', 'Index manipulation'],
        businessImpact: 'Security breaches, data corruption',
        technicalImpact: 'System compromise, data integrity loss',
        complianceImpact: 'Security standard violations',
        detectionMethods: ['Content integrity checks', 'Anomaly detection', 'Security scanning'],
        preventionMethods: ['Content validation', 'Access controls', 'Integrity verification'],
        monitoringRequirements: ['Content integrity monitoring', 'Security event tracking'],
        incidentResponsePlan: 'Immediate isolation, forensic analysis, system restoration',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-13',
        nextReview: '2024-01-20'
      },
      { 
        id: 'citation_consistency', 
        name: 'Citation Consistency', 
        category: 'Transparency & Explainability', 
        severity: 'low', 
        description: 'Inconsistent or missing source citations affecting transparency',
        evidenceNeeded: 'UI recordings',
        likelihood: 'high',
        impact: 'low',
        riskOwner: 'Quality Assurance Lead',
        mitigationStatus: 'planned',
        residualRisk: 'low',
        threatActors: ['Implementation gaps', 'Process inconsistencies'],
        attackVectors: ['Missing citations', 'Incorrect attributions'],
        businessImpact: 'Reduced transparency, user confusion',
        technicalImpact: 'Poor traceability, debugging difficulties',
        complianceImpact: 'Transparency requirement gaps',
        detectionMethods: ['Citation validation', 'Source tracking', 'Attribution checking'],
        preventionMethods: ['Citation enforcement', 'Source tracking', 'Attribution standards'],
        monitoringRequirements: ['Citation quality tracking', 'Attribution accuracy monitoring'],
        incidentResponsePlan: 'Citation correction, attribution improvement, process review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-07',
        nextReview: '2024-02-07'
      }
    ];

    const multiAgentRisks: Risk[] = [
      { 
        id: 'agent_misrouting', 
        name: 'Agent Misrouting', 
        category: 'Performance & Scalability', 
        severity: 'high', 
        description: 'Incorrect agent selection or routing leading to suboptimal task execution',
        evidenceNeeded: 'Agent transcripts',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'System Architecture Lead',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Routing logic errors', 'Agent conflicts'],
        attackVectors: ['Logic manipulation', 'Agent confusion'],
        businessImpact: 'Poor task execution, user frustration',
        technicalImpact: 'Workflow failures, performance degradation',
        complianceImpact: 'Service quality violations',
        detectionMethods: ['Routing analytics', 'Agent performance tracking', 'Workflow monitoring'],
        preventionMethods: ['Routing optimization', 'Agent specialization', 'Fallback mechanisms'],
        monitoringRequirements: ['Routing success tracking', 'Agent performance monitoring'],
        incidentResponsePlan: 'Routing correction, agent retraining, workflow optimization',
        reviewFrequency: 'Bi-weekly',
        lastAssessment: '2024-01-11',
        nextReview: '2024-01-25'
      },
      { 
        id: 'deadlocks', 
        name: 'Deadlocks', 
        category: 'Performance & Scalability', 
        severity: 'medium', 
        description: 'Agent workflow deadlocks or infinite loops causing system failures',
        evidenceNeeded: 'System metrics',
        likelihood: 'low',
        impact: 'high',
        riskOwner: 'System Architecture Lead',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Logic errors', 'Resource conflicts'],
        attackVectors: ['Circular dependencies', 'Resource contention'],
        businessImpact: 'System downtime, service interruption',
        technicalImpact: 'System hangs, resource exhaustion',
        complianceImpact: 'Availability requirement violations',
        detectionMethods: ['Deadlock detection', 'Resource monitoring', 'Timeout mechanisms'],
        preventionMethods: ['Deadlock prevention algorithms', 'Resource management', 'Circuit breakers'],
        monitoringRequirements: ['System health monitoring', 'Resource utilization tracking'],
        incidentResponsePlan: 'System restart, deadlock analysis, prevention enhancement',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-06',
        nextReview: '2024-02-06'
      },
      { 
        id: 'tool_misuse', 
        name: 'Tool Misuse', 
        category: 'Safety & Harm Prevention', 
        severity: 'critical', 
        description: 'Inappropriate or dangerous tool usage by AI agents',
        evidenceNeeded: 'Agent transcripts',
        likelihood: 'low',
        impact: 'critical',
        riskOwner: 'AI Safety Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'very_low',
        threatActors: ['Agent errors', 'Malicious manipulation'],
        attackVectors: ['Tool exploitation', 'Permission escalation'],
        businessImpact: 'Safety incidents, liability issues',
        technicalImpact: 'System damage, data corruption',
        complianceImpact: 'Safety standard violations',
        detectionMethods: ['Tool usage monitoring', 'Permission tracking', 'Safety checks'],
        preventionMethods: ['Tool restrictions', 'Permission controls', 'Safety guardrails'],
        monitoringRequirements: ['Tool usage tracking', 'Safety event monitoring'],
        incidentResponsePlan: 'Tool restriction, safety review, incident investigation',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-14',
        nextReview: '2024-01-21'
      },
      { 
        id: 'latency', 
        name: 'Latency', 
        category: 'Performance & Scalability', 
        severity: 'medium', 
        description: 'Excessive response times in multi-agent workflows affecting user experience',
        evidenceNeeded: 'System metrics',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Performance Engineering Lead',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['System complexity', 'Resource constraints'],
        attackVectors: ['Resource exhaustion', 'Network delays'],
        businessImpact: 'Poor user experience, reduced adoption',
        technicalImpact: 'Slow responses, system bottlenecks',
        complianceImpact: 'Performance standard violations',
        detectionMethods: ['Latency monitoring', 'Performance profiling', 'User experience tracking'],
        preventionMethods: ['Performance optimization', 'Caching strategies', 'Load balancing'],
        monitoringRequirements: ['Response time tracking', 'Performance metrics monitoring'],
        incidentResponsePlan: 'Performance optimization, resource scaling, bottleneck resolution',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-13',
        nextReview: '2024-01-20'
      },
      { 
        id: 'state_leakage', 
        name: 'State Leakage', 
        category: 'Security & Privacy', 
        severity: 'high', 
        description: 'Information leakage between agent states compromising data isolation',
        evidenceNeeded: 'Agent transcripts',
        likelihood: 'low',
        impact: 'high',
        riskOwner: 'Security Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Implementation flaws', 'State management errors'],
        attackVectors: ['State pollution', 'Memory leaks'],
        businessImpact: 'Data breaches, privacy violations',
        technicalImpact: 'Data contamination, security breaches',
        complianceImpact: 'Data isolation requirement violations',
        detectionMethods: ['State monitoring', 'Isolation testing', 'Memory analysis'],
        preventionMethods: ['State isolation', 'Memory management', 'Access controls'],
        monitoringRequirements: ['State integrity monitoring', 'Isolation verification'],
        incidentResponsePlan: 'State cleanup, isolation enhancement, security review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-08',
        nextReview: '2024-02-08'
      },
      { 
        id: 'handoff_errors', 
        name: 'Handoff Errors', 
        category: 'Performance & Scalability', 
        severity: 'medium', 
        description: 'Failed or incomplete agent handoffs disrupting workflow execution',
        evidenceNeeded: 'Agent transcripts',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Workflow Engineering Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Protocol errors', 'Communication failures'],
        attackVectors: ['Handoff interruption', 'Protocol violations'],
        businessImpact: 'Workflow failures, task incompletion',
        technicalImpact: 'Process interruption, data loss',
        complianceImpact: 'Process integrity violations',
        detectionMethods: ['Handoff monitoring', 'Workflow tracking', 'Success rate analysis'],
        preventionMethods: ['Handoff protocols', 'Error handling', 'Retry mechanisms'],
        monitoringRequirements: ['Handoff success tracking', 'Workflow completion monitoring'],
        incidentResponsePlan: 'Handoff retry, protocol review, workflow repair',
        reviewFrequency: 'Bi-weekly',
        lastAssessment: '2024-01-09',
        nextReview: '2024-01-23'
      },
      { 
        id: 'over_delegation', 
        name: 'Over-Delegation', 
        category: 'Governance & Accountability', 
        severity: 'medium', 
        description: 'Excessive delegation without human oversight compromising accountability',
        evidenceNeeded: 'Audit logs',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Governance Officer',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Automation bias', 'Oversight gaps'],
        attackVectors: ['Excessive automation', 'Reduced human control'],
        businessImpact: 'Accountability gaps, governance failures',
        technicalImpact: 'Uncontrolled automation, oversight loss',
        complianceImpact: 'Human oversight requirement violations',
        detectionMethods: ['Delegation tracking', 'Human involvement metrics', 'Oversight monitoring'],
        preventionMethods: ['Delegation limits', 'Human checkpoints', 'Oversight requirements'],
        monitoringRequirements: ['Delegation level tracking', 'Human oversight monitoring'],
        incidentResponsePlan: 'Delegation review, oversight enhancement, governance strengthening',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-04',
        nextReview: '2024-02-04'
      }
    ];

    const copilotRisks: Risk[] = [
      { 
        id: 'wrong_action', 
        name: 'Wrong Action', 
        category: 'Safety & Harm Prevention', 
        severity: 'critical', 
        description: 'Copilot suggests or executes incorrect actions with potential for harm',
        evidenceNeeded: 'UI recordings',
        likelihood: 'low',
        impact: 'critical',
        riskOwner: 'AI Safety Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Model errors', 'Context misunderstanding'],
        attackVectors: ['Incorrect suggestions', 'Harmful actions'],
        businessImpact: 'User harm, liability issues, reputation damage',
        technicalImpact: 'Incorrect operations, system damage',
        complianceImpact: 'Safety requirement violations',
        detectionMethods: ['Action validation', 'Safety checks', 'User confirmation'],
        preventionMethods: ['Action verification', 'Safety guardrails', 'Human approval'],
        monitoringRequirements: ['Action accuracy tracking', 'Safety event monitoring'],
        incidentResponsePlan: 'Action reversal, safety investigation, prevention enhancement',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-15',
        nextReview: '2024-01-22'
      },
      { 
        id: 'context_leakage', 
        name: 'Context Leakage', 
        category: 'Security & Privacy', 
        severity: 'high', 
        description: 'Sensitive context shared inappropriately across sessions or users',
        evidenceNeeded: 'System metrics',
        likelihood: 'low',
        impact: 'high',
        riskOwner: 'Data Protection Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Implementation flaws', 'Session management errors'],
        attackVectors: ['Context bleeding', 'Session contamination'],
        businessImpact: 'Privacy violations, data breaches',
        technicalImpact: 'Data contamination, privacy breaches',
        complianceImpact: 'Privacy regulation violations',
        detectionMethods: ['Context isolation testing', 'Privacy scanning', 'Session monitoring'],
        preventionMethods: ['Context isolation', 'Session management', 'Privacy controls'],
        monitoringRequirements: ['Context integrity monitoring', 'Privacy compliance tracking'],
        incidentResponsePlan: 'Context cleanup, privacy investigation, isolation enhancement',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-10',
        nextReview: '2024-02-10'
      },
      { 
        id: 'over_autonomy', 
        name: 'Over-Autonomy', 
        category: 'Governance & Accountability', 
        severity: 'medium', 
        description: 'Excessive autonomous behavior without user control or oversight',
        evidenceNeeded: 'User feedback',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'User Experience Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Design flaws', 'Autonomy creep'],
        attackVectors: ['Excessive automation', 'Reduced user control'],
        businessImpact: 'User dissatisfaction, control loss',
        technicalImpact: 'Uncontrolled behavior, user override failures',
        complianceImpact: 'Human control requirement violations',
        detectionMethods: ['Autonomy level tracking', 'User control metrics', 'Override monitoring'],
        preventionMethods: ['Autonomy limits', 'User controls', 'Override mechanisms'],
        monitoringRequirements: ['Autonomy level monitoring', 'User control tracking'],
        incidentResponsePlan: 'Autonomy adjustment, control enhancement, user empowerment',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-05',
        nextReview: '2024-02-05'
      }
    ];

    const summarizerRisks: Risk[] = [
      { 
        id: 'coverage_gaps', 
        name: 'Coverage Gaps', 
        category: 'Accuracy & Reliability', 
        severity: 'medium', 
        description: 'Important information omitted from summaries affecting completeness',
        evidenceNeeded: 'KB logs',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Content Quality Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Summarization bias', 'Content filtering'],
        attackVectors: ['Information omission', 'Selective summarization'],
        businessImpact: 'Incomplete information, decision errors',
        technicalImpact: 'Information loss, quality degradation',
        complianceImpact: 'Completeness requirement violations',
        detectionMethods: ['Coverage analysis', 'Completeness metrics', 'Content comparison'],
        preventionMethods: ['Coverage requirements', 'Completeness checks', 'Quality validation'],
        monitoringRequirements: ['Coverage tracking', 'Completeness monitoring'],
        incidentResponsePlan: 'Coverage improvement, completeness enhancement, quality review',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-08',
        nextReview: '2024-02-08'
      },
      { 
        id: 'compression_bias', 
        name: 'Compression Bias', 
        category: 'Fairness & Bias', 
        severity: 'medium', 
        description: 'Biased information selection during summarization process',
        evidenceNeeded: 'User feedback',
        likelihood: 'medium',
        impact: 'medium',
        riskOwner: 'Ethics & Fairness Officer',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Algorithmic bias', 'Selection bias'],
        attackVectors: ['Biased selection', 'Unfair representation'],
        businessImpact: 'Biased information, unfair representation',
        technicalImpact: 'Skewed summaries, bias amplification',
        complianceImpact: 'Fairness requirement violations',
        detectionMethods: ['Bias testing', 'Representation analysis', 'Fairness metrics'],
        preventionMethods: ['Bias mitigation', 'Fair selection', 'Representation balance'],
        monitoringRequirements: ['Bias monitoring', 'Fairness tracking'],
        incidentResponsePlan: 'Bias correction, fairness improvement, representation balancing',
        reviewFrequency: 'Quarterly',
        lastAssessment: '2024-01-02',
        nextReview: '2024-04-02'
      },
      { 
        id: 'hallucinated_citations', 
        name: 'Hallucinated Citations', 
        category: 'Accuracy & Reliability', 
        severity: 'high', 
        description: 'False or non-existent source citations in summaries',
        evidenceNeeded: 'KB logs',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'Quality Assurance Lead',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Model hallucination', 'Citation errors'],
        attackVectors: ['False citations', 'Non-existent sources'],
        businessImpact: 'Credibility loss, misinformation spread',
        technicalImpact: 'False attributions, quality degradation',
        complianceImpact: 'Attribution accuracy violations',
        detectionMethods: ['Citation verification', 'Source validation', 'Accuracy checking'],
        preventionMethods: ['Citation validation', 'Source verification', 'Accuracy controls'],
        monitoringRequirements: ['Citation accuracy tracking', 'Source verification monitoring'],
        incidentResponsePlan: 'Citation correction, source verification, accuracy improvement',
        reviewFrequency: 'Bi-weekly',
        lastAssessment: '2024-01-12',
        nextReview: '2024-01-26'
      }
    ];

    const contentGeneratorRisks: Risk[] = [
      { 
        id: 'plagiarism', 
        name: 'Plagiarism', 
        category: 'Legal & Regulatory', 
        severity: 'critical', 
        description: 'Unauthorized copying of copyrighted content leading to legal liability',
        evidenceNeeded: 'API traces',
        likelihood: 'medium',
        impact: 'critical',
        riskOwner: 'Legal Counsel',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Copyright infringement', 'IP violations'],
        attackVectors: ['Content copying', 'Unauthorized reproduction'],
        businessImpact: 'Legal liability, copyright claims, financial penalties',
        technicalImpact: 'Content violations, IP infringement',
        complianceImpact: 'Copyright law violations',
        detectionMethods: ['Plagiarism detection', 'Content comparison', 'IP scanning'],
        preventionMethods: ['Originality checks', 'Content filtering', 'IP protection'],
        monitoringRequirements: ['Plagiarism monitoring', 'IP compliance tracking'],
        incidentResponsePlan: 'Content removal, legal review, IP investigation',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-14',
        nextReview: '2024-01-21'
      },
      { 
        id: 'brand_drift', 
        name: 'Brand Drift', 
        category: 'Business Continuity', 
        severity: 'medium', 
        description: 'Content inconsistent with brand guidelines and messaging',
        evidenceNeeded: 'User feedback',
        likelihood: 'high',
        impact: 'medium',
        riskOwner: 'Brand Manager',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Brand inconsistency', 'Message drift'],
        attackVectors: ['Off-brand content', 'Inconsistent messaging'],
        businessImpact: 'Brand dilution, message confusion, market positioning issues',
        technicalImpact: 'Inconsistent outputs, brand violations',
        complianceImpact: 'Brand standard violations',
        detectionMethods: ['Brand compliance checking', 'Message consistency analysis', 'Style validation'],
        preventionMethods: ['Brand guidelines enforcement', 'Style controls', 'Message validation'],
        monitoringRequirements: ['Brand compliance monitoring', 'Message consistency tracking'],
        incidentResponsePlan: 'Brand correction, message alignment, style adjustment',
        reviewFrequency: 'Weekly',
        lastAssessment: '2024-01-11',
        nextReview: '2024-01-18'
      },
      { 
        id: 'ethical_risks', 
        name: 'Ethical Risks', 
        category: 'Ethical Considerations', 
        severity: 'high', 
        description: 'Content violating ethical standards and moral principles',
        evidenceNeeded: 'UI recordings',
        likelihood: 'low',
        impact: 'high',
        riskOwner: 'Ethics Officer',
        mitigationStatus: 'implemented',
        residualRisk: 'low',
        threatActors: ['Ethical violations', 'Moral conflicts'],
        attackVectors: ['Unethical content', 'Moral violations'],
        businessImpact: 'Ethical violations, reputation damage, stakeholder concerns',
        technicalImpact: 'Inappropriate content, ethical breaches',
        complianceImpact: 'Ethical standard violations',
        detectionMethods: ['Ethical review', 'Content screening', 'Moral assessment'],
        preventionMethods: ['Ethical guidelines', 'Content filtering', 'Moral constraints'],
        monitoringRequirements: ['Ethical compliance monitoring', 'Content appropriateness tracking'],
        incidentResponsePlan: 'Content review, ethical assessment, guideline reinforcement',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-07',
        nextReview: '2024-02-07'
      }
    ];

    const decisionSupportRisks: Risk[] = [
      { 
        id: 'over_reliance', 
        name: 'Over-Reliance', 
        category: 'Governance & Accountability', 
        severity: 'high', 
        description: 'Excessive dependence on AI recommendations without critical evaluation',
        evidenceNeeded: 'User feedback',
        likelihood: 'high',
        impact: 'high',
        riskOwner: 'Decision Governance Lead',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Automation bias', 'Critical thinking reduction'],
        attackVectors: ['Blind acceptance', 'Reduced scrutiny'],
        businessImpact: 'Poor decisions, reduced human judgment, accountability issues',
        technicalImpact: 'Uncritical acceptance, decision quality degradation',
        complianceImpact: 'Human oversight requirement violations',
        detectionMethods: ['Decision tracking', 'Override monitoring', 'Critical thinking assessment'],
        preventionMethods: ['Decision frameworks', 'Critical evaluation requirements', 'Human validation'],
        monitoringRequirements: ['Decision quality tracking', 'Human involvement monitoring'],
        incidentResponsePlan: 'Decision review, critical thinking training, oversight enhancement',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-06',
        nextReview: '2024-02-06'
      },
      { 
        id: 'explainability_gap_decision', 
        name: 'Explainability Gap', 
        category: 'Transparency & Explainability', 
        severity: 'high', 
        description: 'Lack of decision reasoning transparency affecting trust and accountability',
        evidenceNeeded: 'System metrics',
        likelihood: 'high',
        impact: 'high',
        riskOwner: 'AI Transparency Officer',
        mitigationStatus: 'in_progress',
        residualRisk: 'medium',
        threatActors: ['Model opacity', 'Complex reasoning'],
        attackVectors: ['Black box decisions', 'Unexplained recommendations'],
        businessImpact: 'Reduced trust, accountability issues, regulatory scrutiny',
        technicalImpact: 'Opaque decisions, debugging difficulties',
        complianceImpact: 'Explainability requirement violations',
        detectionMethods: ['Explainability testing', 'Transparency metrics', 'User comprehension assessment'],
        preventionMethods: ['Explainable AI techniques', 'Decision logging', 'Reasoning documentation'],
        monitoringRequirements: ['Explanation quality tracking', 'Transparency monitoring'],
        incidentResponsePlan: 'Explanation enhancement, transparency improvement, reasoning clarification',
        reviewFrequency: 'Monthly',
        lastAssessment: '2024-01-09',
        nextReview: '2024-02-09'
      },
      { 
        id: 'fairness_ranking', 
        name: 'Fairness in Ranking', 
        category: 'Fairness & Bias', 
        severity: 'high', 
        description: 'Biased ranking or recommendation algorithms affecting equitable treatment',
        evidenceNeeded: 'Audit logs',
        likelihood: 'medium',
        impact: 'high',
        riskOwner: 'Fairness Officer',
        mitigationStatus: 'planned',
        residualRisk: 'medium',
        threatActors: ['Algorithmic bias', 'Ranking bias'],
        attackVectors: ['Biased algorithms', 'Unfair rankings'],
        businessImpact: 'Unfair treatment, discrimination claims, reputation damage',
        technicalImpact: 'Biased recommendations, unfair rankings',
        complianceImpact: 'Fairness requirement violations',
        detectionMethods: ['Fairness testing', 'Ranking analysis', 'Bias detection'],
        preventionMethods: ['Fair ranking algorithms', 'Bias mitigation', 'Equity controls'],
        monitoringRequirements: ['Fairness monitoring', 'Ranking equity tracking'],
        incidentResponsePlan: 'Ranking correction, fairness improvement, bias mitigation',
        reviewFrequency: 'Quarterly',
        lastAssessment: '2024-01-03',
        nextReview: '2024-04-03'
      }
    ];

    let risks = [...baseRisks];

    if (appType.includes('RAG')) {
      risks = [...risks, ...ragRisks];
    }
    if (appType.includes('Multi-Agentic')) {
      risks = [...risks, ...multiAgentRisks];
    }
    if (appType.includes('Copilot') || appType.includes('Assistant')) {
      risks = [...risks, ...copilotRisks];
    }
    if (appType.includes('Summarizer') || appType.includes('Q&A')) {
      risks = [...risks, ...summarizerRisks];
    }
    if (appType.includes('Content Generator')) {
      risks = [...risks, ...contentGeneratorRisks];
    }
    if (appType.includes('Decision Support')) {
      risks = [...risks, ...decisionSupportRisks];
    }

    return risks;
  };

  const generateGovernanceMatrix = () => {
    const matrix: GovernanceMatrixRow[] = [];
    
    useCases.forEach(useCase => {
      const useCaseRisks = risks.filter(risk => 
        controls.some(control => 
          control.mappedRisks.includes(risk.id)
        )
      );
      
      const useCaseControls = controls.filter(control =>
        control.mappedRisks.some(riskId => 
          useCaseRisks.some(risk => risk.id === riskId)
        )
      );

      const allCompliance = [...new Set(useCaseControls.flatMap(control => control.complianceMapping))];
      const maxSeverity = useCaseRisks.reduce((max, risk) => {
        if (risk.severity === 'critical') return 'critical';
        if (risk.severity === 'high') return 'high';
        if (risk.severity === 'medium' && max !== 'high' && max !== 'critical') return 'medium';
        return max;
      }, 'low' as string);

      // Enhanced governance matrix with NIST RMF and TEVV requirements
      matrix.push({
        useCase: useCase.title,
        source: useCase.sourceType,
        agents: useCase.agentsInvolved,
        risks: useCaseRisks.map(r => r.name),
        severity: maxSeverity,
        controls: useCaseControls.map(c => c.name),
        compliance: allCompliance,
        riskOwner: useCaseRisks[0]?.riskOwner || 'TBD',
        controlOwner: useCaseControls[0]?.controlOwner || 'TBD',
        testingStrategy: 'Automated + Manual',
        monitoringApproach: 'Continuous',
        evidenceArtifacts: ['Test Results', 'Audit Logs', 'Compliance Reports'],
        approvalStatus: 'Pending',
        lastReview: '2024-01-15',
        nextReview: '2024-04-15'
      });
    });

    setGovernanceMatrix(matrix);
  };

  const addUseCase = () => {
    const newUseCase: UseCase = {
      id: `uc_${Date.now()}`,
      title: '',
      description: '',
      sourceType: '',
      agentsInvolved: [],
      businessObjective: '',
      targetAudience: '',
      successCriteria: '',
      potentialMisuse: [],
      domainHarms: [],
      stakeholderImpact: '',
      dataTypes: [],
      outputTypes: [],
      userPersonas: [],
      interactionPatterns: [],
      complianceRequirements: [],
      riskTolerance: '',
      businessCriticality: '',
      userVolume: '',
      geographicScope: [],
      regulatoryJurisdiction: []
    };
    setUseCases([...useCases, newUseCase]);
  };

  const updateUseCase = (id: string, field: keyof UseCase, value: any) => {
    setUseCases(prev => prev.map(uc => 
      uc.id === id ? { ...uc, [field]: value } : uc
    ));
  };

  const addControl = () => {
    const newControl: Control = {
      id: `ctrl_${Date.now()}`,
      name: '',
      mappedRisks: [],
      mitigationStrategy: '',
      complianceMapping: [],
      agentResponsibility: '',
      controlType: 'Preventive',
      implementationStatus: 'Not Implemented',
      effectiveness: '',
      controlOwner: '',
      testingFrequency: 'Monthly',
      automationLevel: 'Manual',
      costEstimate: '',
      implementationTimeline: '',
      dependencies: [],
      successMetrics: [],
      monitoringMethod: '',
      alertThresholds: '',
      escalationProcedure: '',
      documentationLinks: [],
      trainingRequired: false,
      toolsRequired: [],
      resourceRequirements: ''
    };
    setControls([...controls, newControl]);
  };

  const updateControl = (id: string, field: keyof Control, value: any) => {
    setControls(prev => prev.map(ctrl => 
      ctrl.id === id ? { ...ctrl, [field]: value } : ctrl
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Setup</h2>
        <p className="text-gray-600 dark:text-gray-400">Define your GenAI application characteristics and governance context</p>
      </div>

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
            value={applicationData.type}
            onChange={(e) => setApplicationData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Application Type</option>
            {applicationTypes.map(type => (
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
          value={applicationData.description}
          onChange={(e) => setApplicationData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the application's purpose, functionality, and business objectives..."
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
        />
      </div>

      {/* Enhanced NIST RMF Context */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>NIST RMF Context & Governance</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Business Objective *
            </label>
            <textarea
              value={applicationData.businessObjective}
              onChange={(e) => setApplicationData(prev => ({ ...prev, businessObjective: e.target.value }))}
              placeholder="Define the business problem this AI solves and expected outcomes..."
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Target Users & Stakeholders *
            </label>
            <textarea
              value={applicationData.targetUsers}
              onChange={(e) => setApplicationData(prev => ({ ...prev, targetUsers: e.target.value }))}
              placeholder="Identify primary users, affected stakeholders, and their roles..."
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Risk Tolerance Level *
            </label>
            <select
              value={applicationData.riskTolerance}
              onChange={(e) => setApplicationData(prev => ({ ...prev, riskTolerance: e.target.value }))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Risk Tolerance</option>
              <option value="very_low">Very Low (Healthcare, Finance)</option>
              <option value="low">Low (Government, Legal)</option>
              <option value="medium">Medium (Enterprise, Education)</option>
              <option value="high">High (Marketing, Entertainment)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Business Criticality *
            </label>
            <select
              value={applicationData.businessCriticality}
              onChange={(e) => setApplicationData(prev => ({ ...prev, businessCriticality: e.target.value }))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Criticality</option>
              <option value="mission_critical">Mission Critical</option>
              <option value="business_critical">Business Critical</option>
              <option value="important">Important</option>
              <option value="standard">Standard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Expected User Volume *
            </label>
            <select
              value={applicationData.expectedVolume}
              onChange={(e) => setApplicationData(prev => ({ ...prev, expectedVolume: e.target.value }))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Volume</option>
              <option value="low">< 1K users/month</option>
              <option value="medium">1K - 10K users/month</option>
              <option value="high">10K - 100K users/month</option>
              <option value="very_high">100K - 1M users/month</option>
              <option value="enterprise">> 1M users/month</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
              Geographic Scope *
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {['United States', 'European Union', 'United Kingdom', 'Canada', 'Australia', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa', 'Global'].map(region => (
                <label key={region} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={applicationData.geographicScope.includes(region)}
                    onChange={(e) => {
                      const newScope = e.target.checked
                        ? [...applicationData.geographicScope, region]
                        : applicationData.geographicScope.filter(r => r !== region);
                      setApplicationData(prev => ({ ...prev, geographicScope: newScope }));
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-xs text-blue-800 dark:text-blue-200">{region}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
              Regulatory Scope *
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {['EU AI Act', 'GDPR', 'CCPA', 'HIPAA', 'SOX', 'FedRAMP', 'PCI DSS', 'SOC 2', 'ISO 27001'].map(regulation => (
                <label key={regulation} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={applicationData.regulatoryScope.includes(regulation)}
                    onChange={(e) => {
                      const newScope = e.target.checked
                        ? [...applicationData.regulatoryScope, regulation]
                        : applicationData.regulatoryScope.filter(r => r !== regulation);
                      setApplicationData(prev => ({ ...prev, regulatoryScope: newScope }));
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-xs text-blue-800 dark:text-blue-200">{regulation}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Assignment */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <h4 className="font-medium text-green-900 dark:text-green-100 mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Governance Stakeholder Assignment</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Business Owner (Accountable) *
            </label>
            <input
              type="text"
              value={applicationData.stakeholders.businessOwner}
              onChange={(e) => setApplicationData(prev => ({ 
                ...prev, 
                stakeholders: { ...prev.stakeholders, businessOwner: e.target.value }
              }))}
              placeholder="e.g., VP of Customer Experience"
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Technical Owner (Responsible) *
            </label>
            <input
              type="text"
              value={applicationData.stakeholders.technicalOwner}
              onChange={(e) => setApplicationData(prev => ({ 
                ...prev, 
                stakeholders: { ...prev.stakeholders, technicalOwner: e.target.value }
              }))}
              placeholder="e.g., AI Engineering Lead"
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Risk Owner (CIO/CISO) *
            </label>
            <select
              value={applicationData.stakeholders.riskOwner}
              onChange={(e) => setApplicationData(prev => ({ 
                ...prev, 
                stakeholders: { ...prev.stakeholders, riskOwner: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Risk Owner</option>
              <option value="cio">Chief Information Officer (CIO)</option>
              <option value="ciso">Chief Information Security Officer (CISO)</option>
              <option value="cdo">Chief Data Officer (CDO)</option>
              <option value="cto">Chief Technology Officer (CTO)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Compliance Officer *
            </label>
            <input
              type="text"
              value={applicationData.stakeholders.complianceOfficer}
              onChange={(e) => setApplicationData(prev => ({ 
                ...prev, 
                stakeholders: { ...prev.stakeholders, complianceOfficer: e.target.value }
              }))}
              placeholder="e.g., Chief Compliance Officer"
              className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Define Use Cases</h2>
          <p className="text-gray-600 dark:text-gray-400">Specify detailed use cases with NIST RMF context and TEVV requirements</p>
        </div>
        <button
          onClick={addUseCase}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Use Case</span>
        </button>
      </div>

      <div className="space-y-6">
        {useCases.map((useCase, index) => (
          <div key={useCase.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Use Case #{index + 1}</h3>
              <button
                onClick={() => setUseCases(prev => prev.filter(uc => uc.id !== useCase.id))}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Basic Use Case Information */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Use Case Title *
                  </label>
                  <input
                    type="text"
                    value={useCase.title}
                    onChange={(e) => updateUseCase(useCase.id, 'title', e.target.value)}
                    placeholder="e.g., Return Policy Inquiry"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Source Type *
                  </label>
                  <select
                    value={useCase.sourceType}
                    onChange={(e) => updateUseCase(useCase.id, 'sourceType', e.target.value)}
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
                  value={useCase.description}
                  onChange={(e) => updateUseCase(useCase.id, 'description', e.target.value)}
                  placeholder="Describe the specific task, expected behavior, and success criteria..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            </div>

            {/* NIST RMF Enhanced Context */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">NIST RMF Context</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Business Objective
                  </label>
                  <input
                    type="text"
                    value={useCase.businessObjective}
                    onChange={(e) => updateUseCase(useCase.id, 'businessObjective', e.target.value)}
                    placeholder="e.g., Reduce support ticket resolution time by 40%"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={useCase.targetAudience}
                    onChange={(e) => updateUseCase(useCase.id, 'targetAudience', e.target.value)}
                    placeholder="e.g., Customer service representatives"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Success Criteria
                </label>
                <textarea
                  value={useCase.successCriteria}
                  onChange={(e) => updateUseCase(useCase.id, 'successCriteria', e.target.value)}
                  placeholder="Define measurable success criteria (e.g., 95% accuracy, <2s response time, 90% user satisfaction)"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm h-16 resize-none"
                />
              </div>
            </div>

            {/* TEVV Risk Context */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-red-900 dark:text-red-100 mb-3">TEVV Risk Context</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                    Potential Misuse/Abuse Cases
                  </label>
                  <textarea
                    value={useCase.potentialMisuse.join('\n')}
                    onChange={(e) => updateUseCase(useCase.id, 'potentialMisuse', e.target.value.split('\n').filter(item => item.trim()))}
                    placeholder="List potential misuse scenarios (one per line)&#10;e.g., Using for medical diagnosis without supervision&#10;Bypassing human oversight requirements"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-red-300 dark:border-red-600 rounded text-sm h-20 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                    Domain-Specific Harms
                  </label>
                  <textarea
                    value={useCase.domainHarms.join('\n')}
                    onChange={(e) => updateUseCase(useCase.id, 'domainHarms', e.target.value.split('\n').filter(item => item.trim()))}
                    placeholder="Identify potential harms specific to your domain (one per line)&#10;e.g., Incorrect medical advice&#10;Financial loss from bad recommendations"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-red-300 dark:border-red-600 rounded text-sm h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                    Stakeholder Impact Assessment
                  </label>
                  <textarea
                    value={useCase.stakeholderImpact}
                    onChange={(e) => updateUseCase(useCase.id, 'stakeholderImpact', e.target.value)}
                    placeholder="Describe impact on different stakeholders (customers, employees, society, regulators)..."
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-red-300 dark:border-red-600 rounded text-sm h-16 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Technical Context */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Technical Context</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Types Involved
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Personal Data', 'Financial Data', 'Health Data', 'Biometric Data', 'Location Data', 'Behavioral Data', 'Transactional Data', 'Public Data'].map(dataType => (
                      <label key={dataType} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={useCase.dataTypes.includes(dataType)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...useCase.dataTypes, dataType]
                              : useCase.dataTypes.filter(t => t !== dataType);
                            updateUseCase(useCase.id, 'dataTypes', newTypes);
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">{dataType}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Types
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Text Response', 'Recommendations', 'Classifications', 'Predictions', 'Summaries', 'Decisions', 'Actions', 'Reports'].map(outputType => (
                      <label key={outputType} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={useCase.outputTypes.includes(outputType)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...useCase.outputTypes, outputType]
                              : useCase.outputTypes.filter(t => t !== outputType);
                            updateUseCase(useCase.id, 'outputTypes', newTypes);
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">{outputType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Agentic Configuration */}
            {applicationData.type.includes('Multi-Agentic') && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">Multi-Agent Configuration</h4>
                
                <div>
                  <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                    Agents Involved
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {agentTypes.map(agent => (
                      <label key={agent} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={useCase.agentsInvolved.includes(agent)}
                          onChange={(e) => {
                            const newAgents = e.target.checked
                              ? [...useCase.agentsInvolved, agent]
                              : useCase.agentsInvolved.filter(a => a !== agent);
                            updateUseCase(useCase.id, 'agentsInvolved', newAgents);
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-purple-800 dark:text-purple-200">{agent}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {useCases.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No use cases defined yet</p>
            <button
              onClick={addUseCase}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Use Case
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => {
    const suggestedRisks = getRisksByAppType(applicationData.type);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Risk Classification</h2>
          <p className="text-gray-600 dark:text-gray-400">
            NIST RMF-compliant risk identification based on your {applicationData.type} architecture
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Auto-Populated Risk Library</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Based on your {applicationData.type} selection, we've pre-populated {suggestedRisks.length} relevant risks 
                following NIST RMF categories. Each risk includes TEVV-compliant evidence requirements and mitigation strategies.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {suggestedRisks.map((risk, index) => {
            const existingRisk = risks.find(r => r.id === risk.id) || risk;
            const isSelected = risks.some(r => r.id === risk.id);

            return (
              <div key={risk.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRisks(prev => [...prev, existingRisk]);
                      } else {
                        setRisks(prev => prev.filter(r => r.id !== risk.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{existingRisk.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(existingRisk.severity)}`}>
                        {existingRisk.severity.toUpperCase()}
                      </div>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        {existingRisk.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{existingRisk.description}</p>

                    {isSelected && (
                      <div className="space-y-4 mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Severity</label>
                            <select
                              value={existingRisk.severity}
                              onChange={(e) => {
                                const newSeverity = e.target.value as 'critical' | 'high' | 'medium' | 'low';
                                setRisks(prev => prev.map(r => 
                                  r.id === risk.id ? { ...r, severity: newSeverity } : r
                                ));
                              }}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            >
                              <option value="critical">Critical</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Likelihood</label>
                            <select
                              value={existingRisk.likelihood}
                              onChange={(e) => {
                                setRisks(prev => prev.map(r => 
                                  r.id === risk.id ? { ...r, likelihood: e.target.value } : r
                                ));
                              }}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            >
                              <option value="very_low">Very Low</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="very_high">Very High</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Evidence Needed</label>
                            <select
                              value={existingRisk.evidenceNeeded}
                              onChange={(e) => {
                                setRisks(prev => prev.map(r => 
                                  r.id === risk.id ? { ...r, evidenceNeeded: e.target.value } : r
                                ));
                              }}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            >
                              {evidenceTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Risk Owner</label>
                            <input
                              type="text"
                              value={existingRisk.riskOwner}
                              onChange={(e) => {
                                setRisks(prev => prev.map(r => 
                                  r.id === risk.id ? { ...r, riskOwner: e.target.value } : r
                                ));
                              }}
                              placeholder="e.g., AI Safety Officer"
                              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Business Impact</label>
                            <input
                              type="text"
                              value={existingRisk.businessImpact}
                              onChange={(e) => {
                                setRisks(prev => prev.map(r => 
                                  r.id === risk.id ? { ...r, businessImpact: e.target.value } : r
                                ));
                              }}
                              placeholder="e.g., Reputation damage, customer trust loss"
                              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add Custom Risk</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Custom risk name"
              className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Custom Risk
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Establish Controls</h2>
          <p className="text-gray-600 dark:text-gray-400">Define NIST RMF-compliant mitigation controls with TEVV traceability</p>
        </div>
        <button
          onClick={addControl}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Control</span>
        </button>
      </div>

      <div className="space-y-6">
        {controls.map((control, index) => (
          <div key={control.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Control #{index + 1}</h3>
              <button
                onClick={() => setControls(prev => prev.filter(c => c.id !== control.id))}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Basic Control Information */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Name *
                  </label>
                  <input
                    type="text"
                    value={control.name}
                    onChange={(e) => updateControl(control.id, 'name', e.target.value)}
                    placeholder="e.g., Canonical KB Validation"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Type *
                  </label>
                  <select
                    value={control.controlType}
                    onChange={(e) => updateControl(control.id, 'controlType', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {controlTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mapped Risk(s) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  {risks.map(risk => (
                    <label key={risk.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={control.mappedRisks.includes(risk.id)}
                        onChange={(e) => {
                          const newRisks = e.target.checked
                            ? [...control.mappedRisks, risk.id]
                            : control.mappedRisks.filter(r => r !== risk.id);
                          updateControl(control.id, 'mappedRisks', newRisks);
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">{risk.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mitigation Strategy *
                </label>
                <textarea
                  value={control.mitigationStrategy}
                  onChange={(e) => updateControl(control.id, 'mitigationStrategy', e.target.value)}
                  placeholder="e.g., Restrict retriever to validated policy docs with automated quality checks and human oversight for edge cases."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            </div>

            {/* NIST RMF Control Details */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">NIST RMF Control Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Implementation Status *
                  </label>
                  <select
                    value={control.implementationStatus}
                    onChange={(e) => updateControl(control.id, 'implementationStatus', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  >
                    <option value="Not Implemented">Not Implemented</option>
                    <option value="Partially Implemented">Partially Implemented</option>
                    <option value="Largely Implemented">Largely Implemented</option>
                    <option value="Fully Implemented">Fully Implemented</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Control Owner *
                  </label>
                  <input
                    type="text"
                    value={control.controlOwner}
                    onChange={(e) => updateControl(control.id, 'controlOwner', e.target.value)}
                    placeholder="e.g., AI Safety Officer"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Testing Frequency
                  </label>
                  <select
                    value={control.testingFrequency}
                    onChange={(e) => updateControl(control.id, 'testingFrequency', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  >
                    <option value="Continuous">Continuous</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Automation Level
                  </label>
                  <select
                    value={control.automationLevel}
                    onChange={(e) => updateControl(control.id, 'automationLevel', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  >
                    <option value="Fully Automated">Fully Automated</option>
                    <option value="Partially Automated">Partially Automated</option>
                    <option value="Manual">Manual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Effectiveness Rating
                  </label>
                  <select
                    value={control.effectiveness}
                    onChange={(e) => updateControl(control.id, 'effectiveness', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-blue-300 dark:border-blue-600 rounded text-sm"
                  >
                    <option value="">Select Effectiveness</option>
                    <option value="Very High (90-100%)">Very High (90-100%)</option>
                    <option value="High (80-89%)">High (80-89%)</option>
                    <option value="Medium (70-79%)">Medium (70-79%)</option>
                    <option value="Low (60-69%)">Low (60-69%)</option>
                    <option value="Very Low (<60%)">Very Low (<60%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TEVV Compliance Mapping */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">TEVV Compliance Mapping</h4>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Compliance Frameworks
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {complianceFrameworks.map(framework => (
                    <label key={framework} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={control.complianceMapping.includes(framework)}
                        onChange={(e) => {
                          const newMapping = e.target.checked
                            ? [...control.complianceMapping, framework]
                            : control.complianceMapping.filter(f => f !== framework);
                          updateControl(control.id, 'complianceMapping', newMapping);
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-xs text-purple-800 dark:text-purple-200">{framework}</span>
                    </label>
                  ))}
                </div>
              </div>

              {applicationData.type.includes('Multi-Agentic') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                    Agent Responsibility
                  </label>
                  <select
                    value={control.agentResponsibility || ''}
                    onChange={(e) => updateControl(control.id, 'agentResponsibility', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-purple-300 dark:border-purple-600 rounded text-sm"
                  >
                    <option value="">Select Agent</option>
                    {agentTypes.map(agent => (
                      <option key={agent} value={agent}>{agent}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Implementation & Monitoring */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">Implementation & Monitoring</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    Monitoring Method
                  </label>
                  <input
                    type="text"
                    value={control.monitoringMethod}
                    onChange={(e) => updateControl(control.id, 'monitoringMethod', e.target.value)}
                    placeholder="e.g., Automated quality checks with daily reports"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    Alert Thresholds
                  </label>
                  <input
                    type="text"
                    value={control.alertThresholds}
                    onChange={(e) => updateControl(control.id, 'alertThresholds', e.target.value)}
                    placeholder="e.g., Quality < 90%, Error rate > 5%"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                  Success Metrics
                </label>
                <textarea
                  value={control.successMetrics.join('\n')}
                  onChange={(e) => updateControl(control.id, 'successMetrics', e.target.value.split('\n').filter(item => item.trim()))}
                  placeholder="Define measurable success criteria (one per line)&#10;e.g., 100% KB validation coverage&#10;Zero unauthorized retrievals&#10;95% accuracy in grounding verification"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-green-300 dark:border-green-600 rounded text-sm h-20 resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {controls.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No controls defined yet</p>
            <button
              onClick={addControl}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add First Control
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => {
    if (governanceMatrix.length === 0) {
      generateGovernanceMatrix();
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governance Matrix Review</h2>
            <p className="text-gray-600 dark:text-gray-400">NIST RMF & TEVV-compliant governance traceability matrix</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Evidence Pack</span>
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Continue to Trust Metrics Engine</span>
            </button>
          </div>
        </div>

        {/* Enhanced Governance Matrix */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Agent(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk(s)</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Control(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Compliance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Testing Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {governanceMatrix.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.useCase}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.agents.map((agent, agentIndex) => (
                          <span key={agentIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {agent}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.risks.slice(0, 2).map((risk, riskIndex) => (
                          <span key={riskIndex} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                            {risk}
                          </span>
                        ))}
                        {row.risks.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.risks.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(row.severity)}`}>
                        {row.severity.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.controls.slice(0, 2).map((control, controlIndex) => (
                          <span key={controlIndex} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded">
                            {control}
                          </span>
                        ))}
                        {row.controls.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.controls.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.compliance.slice(0, 2).map((comp, compIndex) => (
                          <span key={compIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            {comp}
                          </span>
                        ))}
                        {row.compliance.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.compliance.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.riskOwner}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.testingStrategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Summary with NIST RMF & TEVV Metrics */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">NIST RMF & TEVV Governance Summary</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{useCases.length}</div>
                  <div className="text-blue-800 dark:text-blue-200">Use Cases Defined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{risks.length}</div>
                  <div className="text-blue-800 dark:text-blue-200">Risks Identified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{controls.length}</div>
                  <div className="text-blue-800 dark:text-blue-200">Controls Defined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {[...new Set(controls.flatMap(c => c.complianceMapping))].length}
                  </div>
                  <div className="text-blue-800 dark:text-blue-200">Compliance Frameworks</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-blue-200 dark:border-blue-700">
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">NIST RMF Coverage</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">GOVERN:</span>
                      <span className="font-bold text-blue-900 dark:text-blue-100">✓ Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">MAP:</span>
                      <span className="font-bold text-blue-900 dark:text-blue-100">✓ Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">MEASURE:</span>
                      <span className="font-bold text-yellow-700 dark:text-yellow-300">→ Next Phase</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">MANAGE:</span>
                      <span className="font-bold text-yellow-700 dark:text-yellow-300">→ Next Phase</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">TEVV Readiness</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Testing:</span>
                      <span className="font-bold text-green-700 dark:text-green-300">Ready</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Evaluation:</span>
                      <span className="font-bold text-green-700 dark:text-green-300">Ready</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Validation:</span>
                      <span className="font-bold text-yellow-700 dark:text-yellow-300">Pending</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Verification:</span>
                      <span className="font-bold text-yellow-700 dark:text-yellow-300">Pending</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Compliance Status</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Risk Coverage:</span>
                      <span className="font-bold text-green-700 dark:text-green-300">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Control Mapping:</span>
                      <span className="font-bold text-green-700 dark:text-green-300">
                        {Math.round((controls.filter(c => c.mappedRisks.length > 0).length / controls.length) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Framework Alignment:</span>
                      <span className="font-bold text-green-700 dark:text-green-300">
                        {[...new Set(controls.flatMap(c => c.complianceMapping))].length} frameworks
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">Governance Approval:</span>
                      <span className="font-bold text-yellow-700 dark:text-yellow-300">Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps & Recommendations */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Next Steps & Recommendations</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Immediate Actions Required</h5>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>• Submit governance matrix for CIO/CISO approval</li>
                <li>• Schedule risk owner review meetings</li>
                <li>• Initiate compliance framework mapping validation</li>
                <li>• Begin TEVV test suite design in Automation Suite</li>
                <li>• Set up Trust Metrics Engine configuration</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Recommended Next Modules</h5>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>• Trust Metrics Engine → Configure trust measurement</li>
                <li>• TEVV Automation Suite → Design test execution</li>
                <li>• Validation Lab (HITL) → Set up human validation</li>
                <li>• Continuous Monitoring → Configure real-time oversight</li>
                <li>• Compliance Reporting → Prepare evidence documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return applicationData.name && 
               applicationData.domain && 
               applicationData.environment && 
               applicationData.type && 
               applicationData.description &&
               applicationData.businessObjective &&
               applicationData.targetUsers &&
               applicationData.riskTolerance &&
               applicationData.businessCriticality &&
               applicationData.expectedVolume &&
               applicationData.geographicScope.length > 0 &&
               applicationData.regulatoryScope.length > 0 &&
               applicationData.stakeholders.businessOwner &&
               applicationData.stakeholders.technicalOwner &&
               applicationData.stakeholders.riskOwner &&
               applicationData.stakeholders.complianceOfficer;
      case 2:
        return useCases.length > 0 && 
               useCases.every(uc => 
                 uc.title && 
                 uc.description && 
                 uc.sourceType &&
                 uc.businessObjective &&
                 uc.targetAudience &&
                 uc.successCriteria
               );
      case 3:
        return risks.length > 0 && 
               risks.every(r => 
                 r.riskOwner && 
                 r.businessImpact
               );
      case 4:
        return controls.length > 0 && 
               controls.every(c => 
                 c.name && 
                 c.mappedRisks.length > 0 && 
                 c.mitigationStrategy &&
                 c.controlOwner &&
                 c.monitoringMethod
               );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Mapping & Governance</h2>
          <p className="text-gray-600 dark:text-gray-400">NIST RMF & EU TEVV-compliant risk assessment and governance framework</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of 5
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {[
            { step: 1, title: 'Application Setup', icon: Settings, description: 'NIST RMF Context & Stakeholders' },
            { step: 2, title: 'Define Use Cases', icon: MessageSquare, description: 'TEVV Use Case Definition' },
            { step: 3, title: 'Risk Classification', icon: AlertTriangle, description: 'Dynamic Risk Library' },
            { step: 4, title: 'Establish Controls', icon: Shield, description: 'NIST RMF Controls' },
            { step: 5, title: 'Governance Matrix', icon: FileText, description: 'Traceability & Evidence' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex items-center">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium mb-2 ${
                    item.step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.step < currentStep ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className={`text-sm font-medium ${
                    item.step <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.title}
                  </div>
                  <div className={`text-xs ${
                    item.step <= currentStep ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
                {index < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    item.step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 1 && 'Define application context and governance stakeholders'}
              {currentStep === 2 && 'Specify use cases with NIST RMF and TEVV context'}
              {currentStep === 3 && 'Identify and classify risks with evidence requirements'}
              {currentStep === 4 && 'Establish NIST RMF-compliant mitigation controls'}
              {currentStep === 5 && 'Review governance traceability and evidence pack'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!canProceed() || currentStep === 5}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>{currentStep === 5 ? 'Complete Setup' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Application Summary (visible after step 1) */}
      {currentStep > 1 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-4 text-sm">
            <span className="font-medium text-gray-900 dark:text-white">{applicationData.name}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{applicationData.domain}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{applicationData.type}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              applicationData.environment === 'production' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
              applicationData.environment === 'staging' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {applicationData.environment.toUpperCase()}
            </span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">Risk Tolerance: {applicationData.riskTolerance?.replace('_', ' ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInputForm;