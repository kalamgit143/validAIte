import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Target,
  FileText,
  Users,
  Brain,
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit,
  Download,
  Filter,
  Search,
  Calendar,
  BarChart3
} from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessments');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUseCaseModal, setShowUseCaseModal] = useState(false);

  const riskAssessments = [
    {
      id: 'risk_001',
      name: 'Healthcare Triage Assistant - EU AI Act Classification',
      application: 'Customer Support Bot',
      status: 'governance_approved',
      riskLevel: 'medium',
      score: 8.2,
      euAiActClass: 'high_risk',
      assessor: 'Madhu Ronanki',
      approvedBy: 'CIO & CISO',
      completedAt: '2024-01-15T10:00:00Z',
      governanceSignature: 'SIGNED_2024_001',
      categories: {
        'Data Privacy': { score: 8, level: 'high', controls: ['GDPR-Art6', 'HIPAA-164'] },
        'Bias & Fairness': { score: 7, level: 'medium', controls: ['NIST-MEASURE-2.3'] },
        'Security': { score: 9, level: 'high', controls: ['ISO27001-A.9', 'OWASP-LLM-01'] },
        'Transparency': { score: 8, level: 'high', controls: ['EU-AIA-Art13'] },
        'Accountability': { score: 8, level: 'high', controls: ['NIST-GOVERN-1.1'] },
        'Societal Impact': { score: 9, level: 'high', controls: ['EU-AIA-Art5'] }
      },
      mitigations: 7,
      recommendations: 12,
      threatModel: ['Medical Misdiagnosis', 'Bias in Triage', 'Data Breach'],
      stakeholders: ['Patients', 'Healthcare Providers', 'Regulators'],
      useCaseScope: 'Medical triage and initial diagnosis support'
    },
    {
      id: 'risk_002',
      name: 'Financial Lending Copilot - Regulatory Compliance',
      application: 'Financial Lending Copilot',
      status: 'in_progress',
      riskLevel: 'high',
      score: 8.8,
      euAiActClass: 'high_risk',
      assessor: 'Mike Johnson',
      approvedBy: 'Pending CIO Review',
      startedAt: '2024-01-14T14:30:00Z',
      progress: 75,
      categories: {
        'Data Privacy': { score: 9, level: 'high', controls: ['GDPR-Art6', 'CCPA-1798'] },
        'Bias & Fairness': { score: 8, level: 'high', controls: ['ECOA-Reg-B', 'NIST-MEASURE-2.3'] },
        'Security': { score: 8, level: 'high', controls: ['SOX-404', 'PCI-DSS'] },
        'Transparency': { score: 9, level: 'high', controls: ['FCRA-Section-615'] },
        'Accountability': { score: 9, level: 'high', controls: ['NIST-GOVERN-1.1'] },
        'Financial Impact': { score: 9, level: 'critical', controls: ['SOX-302', 'Basel-III'] }
      },
      mitigations: 12,
      recommendations: 18,
      threatModel: ['Discriminatory Lending', 'Financial Bias', 'Regulatory Violation'],
      stakeholders: ['Loan Applicants', 'Financial Institution', 'Regulators', 'Fair Lending Advocates'],
      useCaseScope: 'Credit assessment and lending decision support'
    }
  ];

  const useCaseCharters = [
    {
      id: 'charter_001',
      name: 'Healthcare Triage Assistant Charter',
      description: 'AI-powered medical triage system for emergency departments',
      scope: 'Initial patient assessment and priority classification',
      targetAudience: 'Emergency department staff, triage nurses',
      intendedPurpose: 'Reduce diagnostic errors and improve patient flow',
      potentialMisuse: ['Self-diagnosis by patients', 'Replacement of medical judgment', 'Use outside emergency context'],
      domainHarms: ['Medical misdiagnosis', 'Delayed treatment', 'Bias in care allocation'],
      status: 'approved',
      approvedBy: 'CIO & Medical Director',
      createdAt: '2024-01-10T09:00:00Z'
    },
    {
      id: 'charter_002',
      name: 'Financial Lending Copilot Charter',
      description: 'AI assistant for fair and compliant lending decisions',
      scope: 'Credit assessment and lending recommendation support',
      targetAudience: 'Loan officers, underwriters, compliance teams',
      intendedPurpose: 'Improve lending accuracy while ensuring fairness',
      potentialMisuse: ['Automated lending without human oversight', 'Discriminatory screening', 'Regulatory circumvention'],
      domainHarms: ['Discriminatory lending', 'Financial exclusion', 'Regulatory violations'],
      status: 'under_review',
      approvedBy: 'Pending CISO Review',
      createdAt: '2024-01-12T14:00:00Z'
    }
  ];

  const riskCategories = [
    {
      id: 'data_privacy',
      name: 'Data Privacy & Protection',
      description: 'Assessment of data handling, storage, and privacy compliance',
      framework: 'NIST RMF + GDPR',
      controls: ['NIST-GOVERN-1.2', 'GDPR-Art6', 'GDPR-Art25', 'HIPAA-164.312'],
      weight: 0.25
    },
    {
      id: 'bias_fairness',
      name: 'Bias & Fairness',
      description: 'Evaluation of algorithmic bias and fairness across demographics',
      framework: 'EU AI Act + NIST',
      controls: ['EU-AIA-Art10', 'NIST-MEASURE-2.3', 'ECOA-Reg-B', 'FCRA-Section-615'],
      weight: 0.20
    },
    {
      id: 'security',
      name: 'Security & Robustness',
      description: 'Security vulnerabilities and system robustness assessment',
      framework: 'NIST RMF + OWASP',
      controls: ['NIST-PROTECT-1.1', 'OWASP-LLM-01', 'OWASP-LLM-02', 'ISO27001-A.14'],
      weight: 0.20
    },
    {
      id: 'transparency',
      name: 'Transparency & Explainability',
      description: 'Model interpretability and decision transparency',
      framework: 'EU AI Act + IEEE',
      controls: ['EU-AIA-Art13', 'EU-AIA-Art14', 'IEEE-2857', 'NIST-MANAGE-1.1'],
      weight: 0.15
    },
    {
      id: 'accountability',
      name: 'Accountability & Governance',
      description: 'Governance structures and accountability mechanisms',
      framework: 'NIST RMF + ISO',
      controls: ['NIST-GOVERN-1.1', 'ISO42001-5.1', 'EU-AIA-Art16', 'SOX-404'],
      weight: 0.20
    },
    {
      id: 'societal_impact',
      name: 'Societal & Environmental Impact',
      description: 'Assessment of broader societal and environmental implications',
      framework: 'EU AI Act + UN SDG',
      controls: ['EU-AIA-Art5', 'UN-SDG-16', 'IEEE-2857-Social'],
      weight: 0.10
    }
  ];

  const riskMetrics = [
    {
      name: 'High Risk Applications',
      value: '2',
      change: '+1',
      trend: 'up',
      color: 'red'
    },
    {
      name: 'Medium Risk Applications',
      value: '3',
      change: '0',
      trend: 'stable',
      color: 'yellow'
    },
    {
      name: 'Low Risk Applications',
      value: '1',
      change: '0',
      trend: 'stable',
      color: 'green'
    },
    {
      name: 'Avg Risk Score',
      value: '7.4',
      change: '+0.3',
      trend: 'up',
      color: 'blue'
    }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'NIST RMF': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'EU TEVV': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Assessment</h2>
          <p className="text-gray-600 dark:text-gray-400">NIST RMF-compliant risk assessment for GenAI applications</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Risk Assessment</span>
        </button>
        <button 
          onClick={() => setShowUseCaseModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Charter Use Case</span>
        </button>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-red-600' : 
                metric.trend === 'down' ? 'text-green-600' : 'text-gray-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['assessments', 'use_cases', 'threat_modeling', 'governance', 'categories'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'assessments' && (
            <div className="space-y-6">
              {riskAssessments.map((assessment) => (
                <div key={assessment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{assessment.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                          <span className="capitalize">{assessment.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(assessment.riskLevel)}`}>
                          {assessment.riskLevel.toUpperCase()} RISK
                        </div>
                        {assessment.euAiActClass && (
                          <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            EU: {assessment.euAiActClass.replace('_', ' ').toUpperCase()}
                          </div>
                        )}
                        {assessment.governanceSignature && (
                          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded">
                            ✓ APPROVED
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Risk Score</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.score}/10</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Assessor</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.assessor}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Approved By</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.approvedBy}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {assessment.status === 'completed' ? 'Completed' : 'Progress'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {assessment.status === 'completed' 
                              ? new Date(assessment.completedAt!).toLocaleDateString()
                              : `${assessment.progress}%`
                            }
                          </div>
                        </div>
                      </div>

                      {/* Risk Categories */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Risk Categories</h4>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                          {Object.entries(assessment.categories).map(([category, data]: [string, any]) => (
                            <div key={category} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{data.score}/10</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{category}</div>
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRiskLevelColor(data.level)}`}>
                                {data.level}
                              </div>
                              {data.controls && (
                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {data.controls.length} controls
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Threat Model & Stakeholders */}
                      {assessment.threatModel && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Threat Model</h4>
                          <div className="flex flex-wrap gap-2">
                            {assessment.threatModel.map((threat: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                                {threat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {assessment.stakeholders && (
                        <div className="mt-3 space-y-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Impacted Stakeholders</h4>
                          <div className="flex flex-wrap gap-2">
                            {assessment.stakeholders.map((stakeholder: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                {stakeholder}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
                        <span>Mitigations: {assessment.mitigations} | Recommendations: {assessment.recommendations}</span>
                        {assessment.useCaseScope && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            Scope: {assessment.useCaseScope}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'use_cases' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Use Case Charters</h3>
                <button 
                  onClick={() => setShowUseCaseModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Charter New Use Case</span>
                </button>
              </div>
              
              {useCaseCharters.map((charter) => (
                <div key={charter.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{charter.name}</h4>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(charter.status)}`}>
                          <span className="capitalize">{charter.status.replace('_', ' ')}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{charter.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Scope</span>
                          <div className="text-sm text-gray-900 dark:text-white">{charter.scope}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Target Audience</span>
                          <div className="text-sm text-gray-900 dark:text-white">{charter.targetAudience}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Intended Purpose</span>
                          <div className="text-sm text-gray-900 dark:text-white">{charter.intendedPurpose}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Approved By</span>
                          <div className="text-sm text-gray-900 dark:text-white">{charter.approvedBy}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Potential Misuse Cases</h5>
                          <div className="flex flex-wrap gap-2">
                            {charter.potentialMisuse.map((misuse, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-xs rounded">
                                {misuse}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Domain-Specific Harms</h5>
                          <div className="flex flex-wrap gap-2">
                            {charter.domainHarms.map((harm, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                                {harm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'threat_modeling' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Threat & Harm Modeling</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>OWASP LLM Top 10</span>
                  </h4>
                  <div className="space-y-2">
                    {[
                      'LLM01: Prompt Injection',
                      'LLM02: Insecure Output Handling',
                      'LLM03: Training Data Poisoning',
                      'LLM04: Model Denial of Service',
                      'LLM05: Supply Chain Vulnerabilities'
                    ].map((threat, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>Fairness Harm Catalog</span>
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Demographic Bias',
                      'Intersectional Discrimination',
                      'Representation Bias',
                      'Historical Bias Amplification',
                      'Algorithmic Redlining'
                    ].map((harm, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{harm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Governance Assignment & Approval</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>CIO / CDO</span>
                  </h4>
                  <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <div>• Strategic AI ownership</div>
                    <div>• Risk classification approval</div>
                    <div>• Business impact assessment</div>
                    <div>• Final deployment authorization</div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>CISO</span>
                  </h4>
                  <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                    <div>• Security risk assessment</div>
                    <div>• Threat model validation</div>
                    <div>• Security control implementation</div>
                    <div>• Incident response planning</div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Compliance Officer</span>
                  </h4>
                  <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                    <div>• Regulatory mapping</div>
                    <div>• Compliance framework alignment</div>
                    <div>• Evidence pack preparation</div>
                    <div>• Audit trail maintenance</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Digital Governance Approval Flow</h4>
                <div className="space-y-4">
                  {[
                    { step: 1, role: 'QA Lead', action: 'Risk assessment completion', status: 'completed' },
                    { step: 2, role: 'CISO', action: 'Security review & threat model approval', status: 'completed' },
                    { step: 3, role: 'Compliance Officer', action: 'Regulatory mapping validation', status: 'in_progress' },
                    { step: 4, role: 'CIO/CDO', action: 'Strategic approval & deployment authorization', status: 'pending' }
                  ].map((approval) => (
                    <div key={approval.step} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        approval.status === 'completed' ? 'bg-green-500 text-white' :
                        approval.status === 'in_progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {approval.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{approval.role}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{approval.action}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                        {approval.status.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-4">
              {riskCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(category.framework)}`}>
                          {category.framework}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Weight: {(category.weight * 100)}%</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{category.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.controls.map((control, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded font-mono">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Risk Assessment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Conduct NIST RMF-compliant risk assessment for your GenAI application
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assessment Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Healthcare AI Risk Assessment"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option>Healthcare Triage Assistant</option>
                    <option>Financial Lending Copilot</option>
                    <option>SAP Enterprise Copilot</option>
                    <option>Government Citizen Services</option>
                    <option>Retail Brand Safety Assistant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  EU AI Act Risk Classification *
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option>Unacceptable Risk (Prohibited)</option>
                  <option>High Risk (Mandatory TEVV)</option>
                  <option>Limited Risk (Transparency Obligations)</option>
                  <option>Minimal Risk (No Specific Obligations)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Governance Framework Mapping
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">NIST RMF</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Govern & Map Functions</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">EU AI Act</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Risk Classification & Obligations</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">ISO/IEC 23053</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">AI Risk Management</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Domain-Specific</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">HIPAA, SOX, GDPR, etc.</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Stakeholder Impact Assessment
                </label>
                <div className="space-y-2">
                  {['Patients/End Users', 'Healthcare Providers', 'Regulators', 'Society at Large', 'Organization'].map(stakeholder => (
                    <label key={stakeholder} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{stakeholder}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Governance Owners Assignment
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Risk Owner (CIO/CDO)</label>
                    <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                      <option>Madhu Ronanki (CIO)</option>
                      <option>Mike Johnson (CDO)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Security Owner (CISO)</label>
                    <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                      <option>Alex Kim (CISO)</option>
                      <option>Emily Davis (Deputy CISO)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">QA Lead</label>
                    <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                      <option>Jordan Smith (QA Lead)</option>
                      <option>Taylor Brown (Test Manager)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Assessment requires governance approval before deployment
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Create Risk Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Use Case Charter Modal */}
      {showUseCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Charter New Use Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define scope, purpose, and potential risks for your AI use case
              </p>
            </div>
            
            <div className="p-6 space-y-6">
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
                    <option>Healthcare</option>
                    <option>Financial Services</option>
                    <option>Enterprise Software</option>
                    <option>Government</option>
                    <option>Retail & E-commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Intended Purpose & Scope *
                </label>
                <textarea
                  placeholder="Describe the intended purpose, scope, and target audience..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    placeholder="Emergency department staff, triage nurses"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Business Impact
                  </label>
                  <input
                    type="text"
                    placeholder="Reduce diagnostic errors by 40%"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Potential Misuse/Abuse Cases
                </label>
                <textarea
                  placeholder="List potential misuse scenarios (e.g., self-diagnosis by patients, replacement of medical judgment)..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Domain-Specific Harms
                </label>
                <textarea
                  placeholder="Identify potential harms specific to your domain (e.g., medical misdiagnosis, delayed treatment)..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Regulatory Landscape
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'PCI DSS', 'FedRAMP', 'ISO 27001'].map(regulation => (
                    <label key={regulation} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{regulation}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Charter will trigger risk classification and governance workflow
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowUseCaseModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Charter Use Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;