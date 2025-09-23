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
  BarChart3
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
      scope: 'Initial patient assessment and priority classification in emergency departments',
      targetAudience: 'Emergency department staff, triage nurses, medical residents',
      intendedPurpose: 'Reduce diagnostic errors by 40%, improve patient flow efficiency, ensure consistent triage standards',
      successMetrics: ['40% reduction in diagnostic errors', '25% improvement in patient flow', '95% staff satisfaction'],
      potentialMisuse: [
        'Self-diagnosis by patients without medical supervision',
        'Replacement of medical professional judgment',
        'Use outside emergency department context',
        'Diagnostic decision-making without human oversight'
      ],
      domainHarms: [
        'Medical misdiagnosis leading to patient harm',
        'Delayed treatment due to incorrect triage',
        'Bias in care allocation across demographics',
        'Over-reliance reducing clinical skills'
      ],
      stakeholders: [
        { group: 'Patients', impact: 'Direct beneficiaries of improved triage accuracy', concerns: 'Privacy, safety, bias' },
        { group: 'Healthcare Providers', impact: 'Enhanced decision support tools', concerns: 'Liability, workflow integration' },
        { group: 'Hospital Administration', impact: 'Operational efficiency gains', concerns: 'Cost, compliance, liability' },
        { group: 'Regulators', impact: 'Patient safety oversight', concerns: 'Medical device compliance, safety standards' }
      ],
      ethicalConsiderations: [
        'Ensuring equitable care across all demographic groups',
        'Maintaining human agency in medical decisions',
        'Protecting patient privacy and confidentiality',
        'Preventing automation bias in clinical judgment'
      ]
    },
    {
      id: 'uc_002',
      name: 'Financial Lending Copilot',
      description: 'AI assistant for fair and compliant lending decisions',
      status: 'under_review',
      approvedBy: 'Pending CISO Review',
      createdAt: '2024-01-12T14:00:00Z',
      scope: 'Credit assessment and lending recommendation support for loan officers',
      targetAudience: 'Loan officers, underwriters, compliance teams, risk managers',
      intendedPurpose: 'Improve lending accuracy while ensuring fairness and regulatory compliance',
      successMetrics: ['67% reduction in bias', '15% improvement in approval accuracy', '100% regulatory compliance'],
      potentialMisuse: [
        'Automated lending without human oversight',
        'Discriminatory screening based on protected characteristics',
        'Regulatory circumvention or compliance washing',
        'Unfair advantage in competitive lending'
      ],
      domainHarms: [
        'Discriminatory lending practices',
        'Financial exclusion of vulnerable populations',
        'Regulatory violations and penalties',
        'Systemic bias amplification in credit markets'
      ],
      stakeholders: [
        { group: 'Loan Applicants', impact: 'Fair access to credit opportunities', concerns: 'Bias, transparency, appeals process' },
        { group: 'Financial Institution', impact: 'Improved risk assessment and compliance', concerns: 'Regulatory penalties, reputation risk' },
        { group: 'Regulators', impact: 'Fair lending enforcement', concerns: 'Discrimination, systemic risk' },
        { group: 'Fair Lending Advocates', impact: 'Equitable access to credit', concerns: 'Algorithmic bias, transparency' }
      ],
      ethicalConsiderations: [
        'Ensuring fair lending across all demographic groups',
        'Maintaining transparency in credit decisions',
        'Preventing discriminatory lending practices',
        'Protecting applicant privacy and data rights'
      ]
    }
  ];

  const useCaseTemplates = [
    {
      id: 'template_healthcare',
      name: 'Healthcare AI Use Case',
      description: 'Template for medical AI applications with patient safety focus',
      industry: 'Healthcare',
      keyConsiderations: ['Patient Safety', 'Medical Accuracy', 'HIPAA Compliance', 'Clinical Workflow'],
      riskAreas: ['Misdiagnosis', 'Bias in Care', 'Privacy Breach', 'Regulatory Non-compliance']
    },
    {
      id: 'template_financial',
      name: 'Financial Services AI Use Case',
      description: 'Template for financial AI with fair lending and compliance focus',
      industry: 'Financial Services',
      keyConsiderations: ['Fair Lending', 'Regulatory Compliance', 'Risk Assessment', 'Customer Privacy'],
      riskAreas: ['Discriminatory Lending', 'Regulatory Violations', 'Financial Bias', 'Data Breach']
    },
    {
      id: 'template_government',
      name: 'Government AI Use Case',
      description: 'Template for public sector AI with citizen rights focus',
      industry: 'Government',
      keyConsiderations: ['Citizen Rights', 'Transparency', 'Accountability', 'Public Trust'],
      riskAreas: ['Discrimination', 'Lack of Transparency', 'Unfair Treatment', 'Privacy Violations']
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Use Case Definition</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Define specific use cases and interaction scenarios</p>
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
              { id: 'templates', label: 'Templates', icon: Target }
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

                  {/* Detailed Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Scope & Purpose */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span>Scope & Purpose</span>
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Scope:</span>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.scope}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Target Audience:</span>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.targetAudience}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Intended Purpose:</span>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.intendedPurpose}</p>
                          </div>
                        </div>
                      </div>

                      {/* Success Metrics */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                          <span>Success Metrics</span>
                        </h4>
                        <div className="space-y-2">
                          {useCase.successMetrics.map((metric, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stakeholder Analysis */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>Stakeholder Analysis</span>
                        </h4>
                        <div className="space-y-3">
                          {useCase.stakeholders.map((stakeholder, index) => (
                            <div key={index} className="border-l-4 border-purple-300 pl-3">
                              <div className="font-medium text-gray-900 dark:text-white text-sm">{stakeholder.group}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                <strong>Impact:</strong> {stakeholder.impact}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                <strong>Concerns:</strong> {stakeholder.concerns}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
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

                      {/* Ethical Considerations */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-pink-600" />
                          <span>Ethical Considerations</span>
                        </h4>
                        <div className="space-y-2">
                          {useCase.ethicalConsiderations.map((consideration, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{consideration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {useCaseTemplates.map((template) => (
                  <div key={template.id} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{template.industry}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Key Considerations:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.keyConsiderations.map((consideration, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {consideration}
                            </span>
                          ))}
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
                      Use Template
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
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Define New Use Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a comprehensive use case definition with stakeholder analysis
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
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
                    placeholder="AI-powered medical triage system for emergency departments"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Scope *
                    </label>
                    <textarea
                      placeholder="Initial patient assessment and priority classification"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Audience *
                    </label>
                    <textarea
                      placeholder="Emergency department staff, triage nurses"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Risk Analysis</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Potential Misuse Cases *
                  </label>
                  <textarea
                    placeholder="List potential misuse scenarios (e.g., self-diagnosis by patients, replacement of medical judgment)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain-Specific Harms *
                  </label>
                  <textarea
                    placeholder="Identify potential harms specific to your domain (e.g., medical misdiagnosis, delayed treatment)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
              </div>

              {/* Stakeholder Impact */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Stakeholder Impact Assessment</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Key Stakeholder Groups
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Patients/End Users', 'Healthcare Providers', 'Regulators', 'Society at Large', 'Organization', 'Technology Partners'].map(stakeholder => (
                      <label key={stakeholder} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{stakeholder}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ethical Considerations *
                  </label>
                  <textarea
                    placeholder="Describe ethical considerations and principles that apply to this use case"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Use case will trigger risk assessment and governance workflow
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