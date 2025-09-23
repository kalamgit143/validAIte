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
  Layers
} from 'lucide-react';

const UseCaseDefinition: React.FC = () => {
  const [activeSection, setActiveSection] = useState('definition');
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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
          <p className="text-gray-600 dark:text-gray-400 mt-2">Define specific use cases and interaction scenarios with NIST RMF and EU TEVV compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Use Cases</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Define New Use Case</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'definition', label: 'Use Case Definitions', icon: FileText },
              { id: 'templates', label: 'Compliance Templates', icon: Target }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeSection === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'definition' ? (
            <div className="space-y-6">
              {useCaseDefinitions.map((useCase) => (
                <div key={useCase.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">{useCase.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(useCase.status)}`}>
                          {getStatusIcon(useCase.status)}
                          <span className="capitalize">{useCase.status.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200 mb-4">{useCase.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Approved By</span>
                          <div className="text-blue-900 dark:text-blue-100">{useCase.approvedBy}</div>
                        </div>
                        <div>
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Created</span>
                          <div className="text-blue-900 dark:text-blue-100">{new Date(useCase.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Use Case ID</span>
                          <div className="text-blue-900 dark:text-blue-100 font-mono">{useCase.id}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* NIST RMF Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* System Context (NIST RMF) */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span>System Context (NIST RMF)</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Organizational Context:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.systemContext.organizationalContext}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Technical Context:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.systemContext.technicalContext}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Business Context:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.systemContext.businessContext}</p>
                        </div>
                      </div>
                    </div>

                    {/* Intended Use */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span>Intended Use & Purpose</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Primary Purpose:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.intendedUse.primaryPurpose}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Target Users:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.intendedUse.targetUsers}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Human Oversight:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.intendedUse.humanOversight}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EU TEVV Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Risk Assessment (EU TEVV) */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Risk Assessment (EU TEVV)</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">AI Act Classification:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.riskAssessment.aiActClassification}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Impact Assessment:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.riskAssessment.impactAssessment}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Threat Modeling:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.riskAssessment.threatModeling}</p>
                        </div>
                      </div>
                    </div>

                    {/* Data Governance */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Database className="w-4 h-4 text-purple-600" />
                        <span>Data Governance (EU TEVV)</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Training Data:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.dataGovernance.trainingDataSources}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Data Privacy:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.dataGovernance.dataPrivacy}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Data Lineage:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.dataGovernance.dataLineage}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Human Oversight & Transparency */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Human Oversight Measures */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>Human Oversight Measures</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.humanOversightMeasures.humanInTheLoop}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.humanOversightMeasures.overrideMechanisms}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.humanOversightMeasures.escalationProcedures}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transparency Measures */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-yellow-600" />
                        <span>Transparency Measures</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.transparencyMeasures.explainabilityFeatures}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.transparencyMeasures.userNotification}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{useCase.transparencyMeasures.decisionAuditTrail}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stakeholder Analysis */}
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>Stakeholder Analysis & Engagement</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {useCase.stakeholderAnalysis.map((stakeholder, index) => (
                        <div key={index} className="border-l-4 border-purple-300 pl-3 bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-r-lg">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{stakeholder.group}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            <strong>Impact:</strong> {stakeholder.impact}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Concerns:</strong> {stakeholder.concerns}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Engagement:</strong> {stakeholder.engagementPlan}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Potential Misuse Cases */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span>Potential Misuse Cases</span>
                      </h4>
                      <div className="space-y-2">
                        {useCase.potentialMisuse.map((misuse, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{misuse}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Domain-Specific Harms */}
                    <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-red-600" />
                        <span>Domain-Specific Harms</span>
                      </h4>
                      <div className="space-y-2">
                        {useCase.domainHarms.map((harm, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Shield className="w-4 h-4 text-red-500 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{harm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCaseTemplates.map((template) => (
                  <div key={template.id} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{template.industry}</p>
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                            {template.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Required NIST/TEVV Sections:</span>
                        <div className="grid grid-cols-1 gap-1 mt-2">
                          {template.requiredSections.slice(0, 4).map((section, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-700 dark:text-gray-300">{section}</span>
                            </div>
                          ))}
                          {template.requiredSections.length > 4 && (
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              +{template.requiredSections.length - 4} more sections...
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Risk Areas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.riskAreas.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Use NIST/TEVV Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Use Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Define New Use Case (NIST RMF + EU TEVV Compliant)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a comprehensive use case definition with full NIST RMF and EU TEVV compliance requirements
              </p>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Basic Information</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Use Case Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Healthcare Triage Assistant"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry Domain *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Use Case Description *
                  </label>
                  <textarea
                    placeholder="AI-powered medical triage system for emergency departments reducing diagnostic errors by 40%"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      EU AI Act Risk Classification *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Classification</option>
                      <option value="unacceptable">Unacceptable Risk (Prohibited)</option>
                      <option value="high">High Risk (Mandatory TEVV)</option>
                      <option value="limited">Limited Risk (Transparency)</option>
                      <option value="minimal">Minimal Risk (No Obligations)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      NIST Risk Level *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Risk Level</option>
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                      <option value="critical">Critical Risk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* NIST RMF System Context */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>NIST RMF System Context</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organizational Context *
                    </label>
                    <textarea
                      placeholder="How this AI system fits within organizational structure and processes"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technical Context *
                    </label>
                    <textarea
                      placeholder="Technical architecture, integration points, and system dependencies"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Context *
                    </label>
                    <textarea
                      placeholder="Business objectives, success metrics, and value proposition"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Regulatory Context *
                    </label>
                    <textarea
                      placeholder="Applicable regulations, compliance requirements, and legal considerations"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Intended Use & Purpose */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Intended Use & Purpose (NIST RMF)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Purpose *
                    </label>
                    <textarea
                      placeholder="Main function and objective of the AI system"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Users *
                    </label>
                    <textarea
                      placeholder="Specific user groups and their roles"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Operational Environment *
                    </label>
                    <textarea
                      placeholder="Where and how the system will be deployed and operated"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Human Oversight Requirements *
                    </label>
                    <textarea
                      placeholder="Required human oversight, review, and intervention mechanisms"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* EU TEVV Data Governance */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span>Data Governance (EU TEVV)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Training Data Sources *
                    </label>
                    <textarea
                      placeholder="Description of training data sources, collection methods, and validation"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Quality Assurance *
                    </label>
                    <textarea
                      placeholder="Data quality measures, validation procedures, and bias testing"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Privacy & Protection *
                    </label>
                    <textarea
                      placeholder="Privacy protection measures, consent management, and data rights"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Lineage & Traceability *
                    </label>
                    <textarea
                      placeholder="Data lineage tracking, provenance documentation, and audit trails"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Requirements */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>Performance Requirements (NIST RMF)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Accuracy Threshold *
                    </label>
                    <input
                      type="text"
                      placeholder="95% diagnostic accuracy"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Latency Requirement *
                    </label>
                    <input
                      type="text"
                      placeholder="< 30 seconds response time"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Availability Target *
                    </label>
                    <input
                      type="text"
                      placeholder="99.9% uptime"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Throughput Capacity *
                    </label>
                    <input
                      type="text"
                      placeholder="500 patients/hour peak capacity"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reliability Metrics *
                    </label>
                    <input
                      type="text"
                      placeholder="Mean time between failures > 720 hours"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Human Oversight Measures (EU TEVV) */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span>Human Oversight Measures (EU TEVV)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Human-in-the-Loop Requirements *
                    </label>
                    <textarea
                      placeholder="Describe required human involvement in decision-making process"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Override Mechanisms *
                    </label>
                    <textarea
                      placeholder="How humans can override or modify AI decisions"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Competency Requirements *
                    </label>
                    <textarea
                      placeholder="Required qualifications and training for human operators"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Escalation Procedures *
                    </label>
                    <textarea
                      placeholder="Procedures for escalating uncertain or high-risk cases"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Transparency & Explainability (EU TEVV) */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-yellow-600" />
                  <span>Transparency & Explainability (EU TEVV)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Explainability Features *
                    </label>
                    <textarea
                      placeholder="How the system explains its decisions to users"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      User Notification Systems *
                    </label>
                    <textarea
                      placeholder="How users are informed about AI assistance and limitations"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Decision Audit Trail *
                    </label>
                    <textarea
                      placeholder="Logging and traceability of AI decisions"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Public Documentation *
                    </label>
                    <textarea
                      placeholder="Public-facing documentation and transparency reports"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Risk Analysis & Threat Modeling</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Potential Misuse Cases *
                  </label>
                  <textarea
                    placeholder="List potential misuse scenarios (e.g., self-diagnosis by patients, replacement of medical judgment)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain-Specific Harms *
                  </label>
                  <textarea
                    placeholder="Identify potential harms specific to your domain (e.g., medical misdiagnosis, delayed treatment)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vulnerability Analysis *
                    </label>
                    <textarea
                      placeholder="Technical vulnerabilities and attack vectors"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Threat Modeling *
                    </label>
                    <textarea
                      placeholder="Systematic threat identification and analysis"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Stakeholder Impact Assessment */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Stakeholder Impact Assessment</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Key Stakeholder Groups *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Patients/End Users', 'Healthcare Providers', 'Regulators', 'Society at Large', 'Organization', 'Technology Partners', 'Ethics Committees', 'Patient Advocates'].map(stakeholder => (
                      <label key={stakeholder} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{stakeholder}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stakeholder Engagement Plan *
                  </label>
                  <textarea
                    placeholder="How stakeholders will be engaged throughout the AI lifecycle (consultation, feedback, monitoring)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ethical Considerations *
                  </label>
                  <textarea
                    placeholder="Describe ethical considerations and principles that apply to this use case"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>
              </div>

              {/* Technical Documentation (EU TEVV) */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Code className="w-5 h-5 text-indigo-600" />
                  <span>Technical Documentation (EU TEVV)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model Architecture *
                    </label>
                    <textarea
                      placeholder="Detailed model architecture and design decisions"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Training Procedure *
                    </label>
                    <textarea
                      placeholder="Training methodology, hyperparameters, and validation approach"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Metrics *
                    </label>
                    <textarea
                      placeholder="Comprehensive evaluation metrics and benchmarks"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Known Limitations *
                    </label>
                    <textarea
                      placeholder="Known limitations, constraints, and boundary conditions"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Mapping */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Compliance Framework Mapping</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    NIST RMF Controls *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['GOVERN-1.1', 'GOVERN-1.2', 'MAP-1.1', 'MAP-1.2', 'MEASURE-1.1', 'MEASURE-2.1', 'MANAGE-1.1', 'MANAGE-1.2'].map(control => (
                      <label key={control} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{control}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    EU AI Act Requirements *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Art-9 Risk Management', 'Art-10 Data Governance', 'Art-11 Technical Documentation', 'Art-12 Record Keeping', 'Art-13 Transparency', 'Art-14 Human Oversight', 'Art-15 Accuracy & Robustness', 'Art-16 Cybersecurity'].map(requirement => (
                      <label key={requirement} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{requirement}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Additional Standards & Regulations
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['GDPR', 'HIPAA', 'SOX', 'CCPA', 'ISO 27001', 'SOC 2', 'FDA Medical Device', 'ECOA Fair Lending', 'FedRAMP', 'PCI DSS', 'ISO 13485', 'IEC 62304'].map(standard => (
                      <label key={standard} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{standard}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* TEVV Testing Requirements */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-green-600" />
                  <span>TEVV Testing Requirements</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Testing Types *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Functional Testing', 'Performance Testing', 'Security Testing', 'Bias Testing', 'Robustness Testing', 'Safety Testing', 'Usability Testing', 'Integration Testing', 'Regression Testing', 'Stress Testing', 'Penetration Testing', 'Accessibility Testing'].map(testType => (
                      <label key={testType} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{testType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Benchmarks *
                    </label>
                    <textarea
                      placeholder="Industry benchmarks and evaluation standards"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Criteria *
                    </label>
                    <textarea
                      placeholder="Success criteria and acceptance thresholds"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification Requirements *
                  </label>
                  <textarea
                    placeholder="Independent verification and third-party assessment requirements"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
                  />
                </div>
              </div>

              {/* Governance & Approval */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-indigo-600" />
                  <span>Governance & Approval Requirements</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Owner (CIO/CDO) *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Risk Owner</option>
                      <option>Sarah Chen (CIO)</option>
                      <option>Mike Johnson (CDO)</option>
                      <option>Alex Kim (CTO)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Security Owner (CISO) *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Security Owner</option>
                      <option>Alex Kim (CISO)</option>
                      <option>Emily Davis (Deputy CISO)</option>
                      <option>Jordan Smith (Security Lead)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Compliance Officer *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Compliance Officer</option>
                      <option>Emily Davis (Compliance)</option>
                      <option>Taylor Brown (Risk)</option>
                      <option>Jordan Smith (Audit)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain Expert *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Domain Expert</option>
                      <option>Dr. Sarah Chen (Medical)</option>
                      <option>Lisa Rodriguez (Financial)</option>
                      <option>Mark Thompson (Government)</option>
                      <option>Jennifer Wu (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Approvals for Deployment *
                  </label>
                  <div className="space-y-2">
                    {['Risk Assessment Completion', 'Security Review Approval', 'Compliance Validation', 'Ethics Review (High Risk)', 'Domain Expert Validation', 'Performance Benchmarking', 'TEVV Execution Completion', 'Documentation Completeness', 'Stakeholder Sign-off'].map(approval => (
                      <label key={approval} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{approval}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monitoring & Maintenance */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Monitoring & Maintenance Plan</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Continuous Monitoring Plan *
                    </label>
                    <textarea
                      placeholder="Real-time monitoring, drift detection, and performance tracking"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Periodic Review Schedule *
                    </label>
                    <textarea
                      placeholder="Regular review cycles, update procedures, and maintenance schedule"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Incident Response Plan *
                  </label>
                  <textarea
                    placeholder="Procedures for handling AI system failures, bias incidents, and security breaches"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields • Use case will trigger comprehensive governance workflow with NIST RMF and EU TEVV compliance
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Define Use Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseDefinition;