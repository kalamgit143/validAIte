import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Users,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Save,
  Brain,
  Shield,
  Globe,
  Heart,
  Building,
  Code,
  Lightbulb,
  Zap,
  Activity,
  Clock,
  BarChart3,
  Scale,
  Lock,
  Database,
  Settings,
  Award,
  Gavel,
  Crown,
  TestTube,
  FileCheck,
  Workflow,
  GitBranch,
  Timer,
  Layers,
  Search,
  Filter,
  XCircle
} from 'lucide-react';

const UseCaseDefinition: React.FC = () => {
  const [activeSection, setActiveSection] = useState('definition');
  const [activeTab, setActiveTab] = useState('existing');
  const [activeStep, setActiveStep] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');

  const existingUseCases = [
    {
      id: 'uc_001',
      name: 'Healthcare Triage Assistant',
      description: 'AI-powered medical triage system for emergency departments',
      industry: 'Healthcare',
      riskLevel: 'High Risk',
      status: 'approved',
      createdBy: 'Dr. Sarah Chen',
      createdAt: '2024-01-10T09:00:00Z',
      lastUpdated: '2024-01-15T14:00:00Z',
      stakeholders: ['Patients', 'Healthcare Providers', 'Regulators'],
      complianceFrameworks: ['EU AI Act', 'HIPAA', 'GDPR', 'Medical Device Regulation'],
      businessImpact: 'Reduce diagnostic errors by 40%, improve patient flow',
      tags: ['medical', 'triage', 'emergency', 'high-risk']
    },
    {
      id: 'uc_002',
      name: 'Financial Lending Copilot',
      description: 'AI assistant for fair and compliant lending decisions',
      industry: 'Financial Services',
      riskLevel: 'High Risk',
      status: 'under_review',
      createdBy: 'Mike Johnson',
      createdAt: '2024-01-12T14:00:00Z',
      lastUpdated: '2024-01-14T16:30:00Z',
      stakeholders: ['Loan Applicants', 'Financial Institution', 'Regulators'],
      complianceFrameworks: ['EU AI Act', 'ECOA', 'FCRA', 'SOX', 'GDPR'],
      businessImpact: 'Improve lending accuracy while ensuring fairness',
      tags: ['finance', 'lending', 'fairness', 'high-risk']
    },
    {
      id: 'uc_003',
      name: 'Enterprise Productivity Copilot',
      description: 'AI assistant for enterprise productivity and automation',
      industry: 'Enterprise Software',
      riskLevel: 'Limited Risk',
      status: 'approved',
      createdBy: 'Alex Kim',
      createdAt: '2024-01-08T11:00:00Z',
      lastUpdated: '2024-01-13T10:00:00Z',
      stakeholders: ['Employees', 'Management', 'IT Department'],
      complianceFrameworks: ['EU AI Act', 'GDPR', 'ISO 27001'],
      businessImpact: 'Increase productivity by 35%, reduce manual tasks',
      tags: ['enterprise', 'productivity', 'automation', 'limited-risk']
    }
  ];

  const useCaseDefinitions = [
    {
      id: 'uc_001',
      name: 'Healthcare Triage Assistant',
      description: 'AI-powered medical triage system for emergency departments',
      status: 'approved',
      approvedBy: 'CIO & Medical Director',
      createdAt: '2024-01-10T09:00:00Z',
      
      // NIST RMF Required Fields
      systemContext: {
        organizationalContext: 'Emergency department workflow optimization',
        technicalContext: 'Real-time patient assessment and priority classification',
        businessContext: 'Reduce diagnostic errors and improve patient outcomes',
        regulatoryContext: 'Medical device regulations and patient safety standards'
      },
      
      intendedUse: {
        primaryPurpose: 'Assist emergency department staff in patient triage and priority classification',
        targetUsers: 'Emergency department staff, triage nurses, medical residents',
        operationalEnvironment: 'Hospital emergency departments, 24/7 operations',
        decisionSupport: 'Recommendation system with human oversight required',
        humanOversight: 'Licensed medical professional must validate all triage decisions'
      },
      
      performanceRequirements: {
        accuracyThreshold: '95% diagnostic accuracy',
        latencyRequirement: '< 30 seconds response time',
        availabilityTarget: '99.9% uptime',
        throughputCapacity: '500 patients/hour peak capacity',
        reliabilityMetrics: 'Mean time between failures > 720 hours'
      },
      
      // EU TEVV Required Fields
      riskAssessment: {
        aiActClassification: 'High Risk - Healthcare AI System',
        riskLevel: 'High',
        impactAssessment: 'Direct impact on patient safety and medical decisions',
        vulnerabilityAnalysis: 'Misdiagnosis, bias in triage, system failures',
        threatModeling: 'Adversarial inputs, data poisoning, model drift'
      },
      
      dataGovernance: {
        trainingDataSources: 'De-identified patient records, medical literature, clinical guidelines',
        dataQuality: 'Medical expert validation, bias testing across demographics',
        dataPrivacy: 'HIPAA compliant, patient consent protocols',
        dataRetention: '7 years for audit compliance',
        dataLineage: 'Full traceability from source to model training'
      },
      
      technicalDocumentation: {
        modelArchitecture: 'Transformer-based language model with medical knowledge base',
        trainingProcedure: 'Supervised learning with expert-validated medical cases',
        evaluationMetrics: 'Medical accuracy, diagnostic confidence, bias metrics',
        limitationsKnown: 'Limited to emergency triage, requires human validation',
        performanceBenchmarks: 'Validated against medical board exam standards'
      },
      
      humanOversightMeasures: {
        humanInTheLoop: 'Licensed medical professional review required',
        overrideMechanisms: 'One-click override with reason logging',
        escalationProcedures: 'Automatic escalation for uncertain cases',
        competencyRequirements: 'Medical license and triage training required',
        trainingPrograms: 'AI-assisted triage certification program'
      },
      
      transparencyMeasures: {
        explainabilityFeatures: 'SHAP-based decision explanations',
        userNotification: 'Clear AI assistance indicators',
        decisionAuditTrail: 'Complete decision logging and traceability',
        publicDocumentation: 'Model card and performance metrics published',
        stakeholderCommunication: 'Regular updates to medical staff and patients'
      },
      
      // Compliance & Governance
      complianceMapping: {
        nistRmfControls: ['GOVERN-1.1', 'MAP-1.2', 'MEASURE-2.1', 'MANAGE-1.3'],
        euAiActRequirements: ['Art-9 Risk Management', 'Art-10 Data Governance', 'Art-13 Transparency'],
        additionalStandards: ['HIPAA', 'FDA Medical Device', 'ISO 13485']
      },
      
      stakeholderAnalysis: [
        { 
          group: 'Patients', 
          impact: 'Direct beneficiaries of improved triage accuracy and reduced wait times', 
          concerns: 'Privacy protection, diagnostic accuracy, bias prevention',
          engagementPlan: 'Patient advisory board, feedback collection, transparency reports'
        },
        { 
          group: 'Healthcare Providers', 
          impact: 'Enhanced decision support tools and workflow efficiency', 
          concerns: 'Liability, workflow integration, skill dependency',
          engagementPlan: 'Training programs, feedback sessions, performance monitoring'
        },
        { 
          group: 'Hospital Administration', 
          impact: 'Operational efficiency gains and cost reduction', 
          concerns: 'Implementation costs, compliance requirements, liability',
          engagementPlan: 'ROI reporting, compliance updates, risk assessments'
        },
        { 
          group: 'Regulators', 
          impact: 'Patient safety oversight and compliance monitoring', 
          concerns: 'Medical device compliance, safety standards, audit requirements',
          engagementPlan: 'Regular compliance reports, audit cooperation, transparency'
        }
      ],
      
      ethicalConsiderations: [
        'Ensuring equitable care across all demographic groups',
        'Maintaining human agency in medical decisions',
        'Protecting patient privacy and confidentiality',
        'Preventing automation bias in clinical judgment',
        'Ensuring accessibility for diverse patient populations'
      ],
      
      potentialMisuse: [
        'Self-diagnosis by patients without medical supervision',
        'Replacement of medical professional judgment',
        'Use outside emergency department context',
        'Diagnostic decision-making without human oversight',
        'Commercial exploitation of medical data'
      ],
      
      domainHarms: [
        'Medical misdiagnosis leading to patient harm',
        'Delayed treatment due to incorrect triage',
        'Bias in care allocation across demographics',
        'Over-reliance reducing clinical skills',
        'System failures during critical situations'
      ]
    }
  ];

  const useCaseTemplates = [
    {
      id: 'template_healthcare',
      name: 'Healthcare AI Use Case',
      description: 'NIST RMF + EU TEVV compliant template for medical AI applications',
      industry: 'Healthcare',
      riskLevel: 'High Risk',
      requiredSections: [
        'Medical Use Case Definition',
        'Patient Safety Assessment',
        'Clinical Workflow Integration',
        'Medical Accuracy Requirements',
        'HIPAA Compliance Measures',
        'FDA Medical Device Considerations',
        'Clinical Validation Requirements',
        'Medical Ethics Review'
      ],
      keyConsiderations: ['Patient Safety', 'Medical Accuracy', 'HIPAA Compliance', 'Clinical Workflow'],
      riskAreas: ['Misdiagnosis', 'Bias in Care', 'Privacy Breach', 'Regulatory Non-compliance']
    },
    {
      id: 'template_financial',
      name: 'Financial Services AI Use Case',
      description: 'Fair lending and regulatory compliance template for financial AI',
      industry: 'Financial Services',
      riskLevel: 'High Risk',
      requiredSections: [
        'Financial Use Case Definition',
        'Fair Lending Assessment',
        'Regulatory Compliance Mapping',
        'Credit Risk Evaluation',
        'Consumer Protection Measures',
        'Financial Bias Testing',
        'Regulatory Reporting Requirements',
        'Financial Ethics Review'
      ],
      keyConsiderations: ['Fair Lending', 'Regulatory Compliance', 'Risk Assessment', 'Customer Privacy'],
      riskAreas: ['Discriminatory Lending', 'Regulatory Violations', 'Financial Bias', 'Data Breach']
    },
    {
      id: 'template_government',
      name: 'Government AI Use Case',
      description: 'Public sector AI template with citizen rights and transparency focus',
      industry: 'Government',
      riskLevel: 'High Risk',
      requiredSections: [
        'Government Use Case Definition',
        'Citizen Rights Assessment',
        'Public Transparency Requirements',
        'Democratic Values Alignment',
        'Public Trust Measures',
        'Government Ethics Review',
        'Public Accountability Mechanisms',
        'Civic Engagement Planning'
      ],
      keyConsiderations: ['Citizen Rights', 'Transparency', 'Accountability', 'Public Trust'],
      riskAreas: ['Discrimination', 'Lack of Transparency', 'Unfair Treatment', 'Privacy Violations']
    },
    {
      id: 'template_enterprise',
      name: 'Enterprise AI Use Case',
      description: 'Enterprise productivity AI with employee rights and workplace fairness',
      industry: 'Enterprise',
      riskLevel: 'Medium Risk',
      requiredSections: [
        'Enterprise Use Case Definition',
        'Employee Impact Assessment',
        'Workplace Fairness Evaluation',
        'Productivity Enhancement Metrics',
        'Employee Privacy Protection',
        'Skills Development Planning',
        'Change Management Strategy',
        'Enterprise Ethics Review'
      ],
      keyConsiderations: ['Employee Rights', 'Workplace Fairness', 'Productivity', 'Privacy'],
      riskAreas: ['Employee Surveillance', 'Workplace Bias', 'Job Displacement', 'Privacy Invasion']
    }
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    industry: '',
    riskLevel: '',
    
    // System Context
    organizationalContext: '',
    technicalContext: '',
    businessContext: '',
    regulatoryContext: '',
    
    // Intended Use
    primaryPurpose: '',
    targetUsers: '',
    operationalEnvironment: '',
    humanOversight: '',
    
    // Performance Requirements
    accuracyThreshold: '',
    latencyRequirement: '',
    availabilityTarget: '',
    throughputCapacity: '',
    
    // Risk Assessment
    impactAssessment: '',
    vulnerabilityAnalysis: '',
    threatModeling: '',
    
    // Data Governance
    trainingDataSources: '',
    dataQuality: '',
    dataPrivacy: '',
    dataLineage: '',
    
    // Human Oversight
    humanInTheLoop: '',
    overrideMechanisms: '',
    competencyRequirements: '',
    escalationProcedures: '',
    
    // Transparency
    explainabilityFeatures: '',
    userNotification: '',
    decisionAuditTrail: '',
    publicDocumentation: '',
    
    // Technical Documentation
    modelArchitecture: '',
    trainingProcedure: '',
    evaluationMetrics: '',
    knownLimitations: '',
    
    // Stakeholder Analysis
    stakeholderGroups: [],
    engagementPlan: '',
    ethicalConsiderations: '',
    
    // Risk Analysis
    potentialMisuse: '',
    domainHarms: '',
    
    // Compliance
    nistControls: [],
    euAiActRequirements: [],
    additionalStandards: [],
    
    // Governance
    riskOwner: '',
    securityOwner: '',
    complianceOfficer: '',
    domainExpert: '',
    
    // Monitoring
    monitoringPlan: '',
    reviewSchedule: '',
    incidentResponse: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'under_review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High Risk': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Limited Risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Minimal Risk': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredUseCases = existingUseCases.filter(useCase => {
    const matchesSearch = searchQuery === '' || 
      useCase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      useCase.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = filterIndustry === 'all' || useCase.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const steps = [
    {
      id: 1,
      title: 'Basic Info',
      description: 'Use case overview',
      icon: FileText
    },
    {
      id: 2,
      title: 'System Context',
      description: 'NIST RMF context',
      icon: Building
    },
    {
      id: 3,
      title: 'Intended Use',
      description: 'Purpose & users',
      icon: Target
    },
    {
      id: 4,
      title: 'Performance',
      description: 'Requirements',
      icon: BarChart3
    },
    {
      id: 5,
      title: 'Risk Assessment',
      description: 'EU TEVV risks',
      icon: AlertTriangle
    },
    {
      id: 6,
      title: 'Data Governance',
      description: 'EU TEVV data',
      icon: Database
    },
    {
      id: 7,
      title: 'Human Oversight',
      description: 'EU TEVV oversight',
      icon: Users
    },
    {
      id: 8,
      title: 'Transparency',
      description: 'EU TEVV transparency',
      icon: Eye
    },
    {
      id: 9,
      title: 'Technical Docs',
      description: 'EU TEVV technical',
      icon: Code
    },
    {
      id: 10,
      title: 'Stakeholders',
      description: 'Impact analysis',
      icon: Users
    },
    {
      id: 11,
      title: 'Compliance',
      description: 'Framework mapping',
      icon: Shield
    },
    {
      id: 12,
      title: 'Governance',
      description: 'Approval & monitoring',
      icon: Crown
    }
  ];

  const getStepColor = (stepId: number) => {
    const colors = [
      'from-blue-600 to-blue-700',
      'from-purple-600 to-purple-700',
      'from-green-600 to-green-700',
      'from-yellow-600 to-yellow-700',
      'from-red-600 to-red-700',
      'from-indigo-600 to-indigo-700',
      'from-pink-600 to-pink-700',
      'from-teal-600 to-teal-700',
      'from-orange-600 to-orange-700',
      'from-cyan-600 to-cyan-700',
      'from-violet-600 to-violet-700',
      'from-emerald-600 to-emerald-700'
    ];
    return colors[(stepId - 1) % colors.length];
  };

  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Use Case Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Healthcare Triage Assistant"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry Domain *
                </label>
                <select 
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Government">Government</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="AI-powered medical triage system for emergency departments"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                EU AI Act Risk Level *
              </label>
              <select 
                value={formData.riskLevel}
                onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Risk Level</option>
                <option value="Unacceptable Risk">Unacceptable Risk (Prohibited)</option>
                <option value="High Risk">High Risk (Mandatory TEVV)</option>
                <option value="Limited Risk">Limited Risk (Transparency)</option>
                <option value="Minimal Risk">Minimal Risk (No Obligations)</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">NIST RMF System Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organizational Context *
                </label>
                <textarea
                  value={formData.organizationalContext}
                  onChange={(e) => setFormData({...formData, organizationalContext: e.target.value})}
                  placeholder="How this AI system fits within organizational structure"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technical Context *
                </label>
                <textarea
                  value={formData.technicalContext}
                  onChange={(e) => setFormData({...formData, technicalContext: e.target.value})}
                  placeholder="Technical architecture and system dependencies"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Context *
                </label>
                <textarea
                  value={formData.businessContext}
                  onChange={(e) => setFormData({...formData, businessContext: e.target.value})}
                  placeholder="Business objectives and value proposition"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Regulatory Context *
                </label>
                <textarea
                  value={formData.regulatoryContext}
                  onChange={(e) => setFormData({...formData, regulatoryContext: e.target.value})}
                  placeholder="Applicable regulations and compliance requirements"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              Step {activeStep} content will be implemented here
            </div>
          </div>
        );
    }
  };

  const industries = [
    'Healthcare',
    'Financial Services',
    'Government',
    'Enterprise Software',
    'Retail & E-commerce',
    'Manufacturing',
    'Education',
    'Technology'
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Use Case Definition</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Define specific use cases and interaction scenarios</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Define New Use Case</span>
        </button>
      </div>

      {/* Use Case Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['existing', 'export'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'existing' ? 'Existing Use Cases' : 'Export Use Cases'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'existing' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search use cases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Industries</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="Government">Government</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Use Cases Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredUseCases.map((useCase) => (
                  <div key={useCase.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{useCase.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(useCase.status)}`}>
                              {getStatusIcon(useCase.status)}
                              <span className="capitalize">{useCase.status.replace('_', ' ')}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(useCase.riskLevel)}`}>
                              {useCase.riskLevel}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{useCase.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Industry</span>
                        <div className="font-medium text-gray-900 dark:text-white">{useCase.industry}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Created By</span>
                        <div className="font-medium text-gray-900 dark:text-white">{useCase.createdBy}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Business Impact</span>
                      <div className="text-sm text-gray-900 dark:text-white">{useCase.businessImpact}</div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Stakeholders</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {useCase.stakeholders.slice(0, 3).map((stakeholder, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {stakeholder}
                          </span>
                        ))}
                        {useCase.stakeholders.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{useCase.stakeholders.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {useCase.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                      <span>Created: {new Date(useCase.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(useCase.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Use Cases</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Export use case definitions for compliance documentation and audit purposes
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <button className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center space-y-2">
                    <FileText className="w-6 h-6" />
                    <span className="font-medium">PDF Report</span>
                    <span className="text-xs opacity-80">Comprehensive documentation</span>
                  </button>
                  
                  <button className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center space-y-2">
                    <Database className="w-6 h-6" />
                    <span className="font-medium">Excel Export</span>
                    <span className="text-xs opacity-80">Structured data format</span>
                  </button>
                  
                  <button className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center space-y-2">
                    <Code className="w-6 h-6" />
                    <span className="font-medium">JSON Export</span>
                    <span className="text-xs opacity-80">API integration format</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Use Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Define New Use Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create comprehensive use case definition with NIST RMF and EU TEVV compliance
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all ${
                          isActive 
                            ? `bg-gradient-to-r ${getStepColor(step.id)} text-white shadow-lg transform scale-105`
                            : isCompleted
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-white/20' : ''
                        }`}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-xs">{step.title}</div>
                        </div>
                      </button>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-1 mx-2 rounded-full ${
                          activeStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Step Content */}
            <div className="p-6 min-h-96">
              {renderCurrentStep()}
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Step {activeStep} of {steps.length}
              </div>
              
              {activeStep < steps.length ? (
                <button
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  className={`px-6 py-3 bg-gradient-to-r ${getStepColor(activeStep)} text-white rounded-lg hover:opacity-90 transition-all shadow-lg`}
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Submit for Approval
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseDefinition;