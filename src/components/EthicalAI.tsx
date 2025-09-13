import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Scale, 
  Eye,
  Shield,
  Brain,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  Edit,
  Download,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  FileText
} from 'lucide-react';

const EthicalAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessments');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const ethicalAssessments = [
    {
      id: 'eth_001',
      name: 'Fairness & Non-Discrimination Assessment',
      application: 'Customer Support Bot',
      status: 'completed',
      assessor: 'Ethics Committee',
      completedAt: '2024-01-15T10:00:00Z',
      overallScore: 87,
      principles: {
        'Human Agency': { score: 92, status: 'excellent' },
        'Technical Robustness': { score: 88, status: 'good' },
        'Privacy & Data Governance': { score: 85, status: 'good' },
        'Transparency': { score: 82, status: 'satisfactory' },
        'Diversity & Fairness': { score: 90, status: 'excellent' },
        'Societal Wellbeing': { score: 85, status: 'good' },
        'Accountability': { score: 88, status: 'good' }
      },
      recommendations: [
        'Improve transparency in decision-making processes',
        'Enhance documentation for algorithmic decisions',
        'Implement additional bias testing for edge cases'
      ]
    },
    {
      id: 'eth_002',
      name: 'Human-Centric AI Assessment',
      application: 'Content Generator',
      status: 'in_progress',
      assessor: 'Sarah Chen',
      startedAt: '2024-01-12T14:00:00Z',
      progress: 60,
      principles: {
        'Human Agency': { score: 78, status: 'satisfactory' },
        'Technical Robustness': { score: 85, status: 'good' },
        'Privacy & Data Governance': { score: 92, status: 'excellent' },
        'Transparency': { score: 75, status: 'needs_improvement' },
        'Diversity & Fairness': { score: 68, status: 'needs_improvement' },
        'Societal Wellbeing': { score: 80, status: 'satisfactory' },
        'Accountability': { score: 82, status: 'satisfactory' }
      }
    }
  ];

  const ethicalPrinciples = [
    {
      id: 'human_agency',
      name: 'Human Agency & Oversight',
      description: 'AI systems should empower human beings, allowing them to make informed decisions',
      requirements: [
        'Human oversight mechanisms',
        'Meaningful human control',
        'Human-in-the-loop processes',
        'Override capabilities'
      ],
      compliance: 90
    },
    {
      id: 'technical_robustness',
      name: 'Technical Robustness & Safety',
      description: 'AI systems need to be resilient and secure',
      requirements: [
        'Accuracy and reliability',
        'Resilience to attacks',
        'Fall-back plans',
        'General safety measures'
      ],
      compliance: 85
    },
    {
      id: 'privacy',
      name: 'Privacy & Data Governance',
      description: 'AI systems must ensure privacy and data protection',
      requirements: [
        'Privacy by design',
        'Data minimization',
        'Data quality assurance',
        'Access control mechanisms'
      ],
      compliance: 88
    },
    {
      id: 'transparency',
      name: 'Transparency',
      description: 'AI systems should be transparent and explainable',
      requirements: [
        'Explainability of decisions',
        'Communication about AI use',
        'Documentation standards',
        'Audit trail maintenance'
      ],
      compliance: 75
    },
    {
      id: 'diversity',
      name: 'Diversity, Non-discrimination & Fairness',
      description: 'AI systems should be fair and avoid bias',
      requirements: [
        'Bias detection and mitigation',
        'Inclusive design processes',
        'Fairness testing',
        'Demographic parity assessment'
      ],
      compliance: 82
    },
    {
      id: 'societal',
      name: 'Societal & Environmental Wellbeing',
      description: 'AI systems should benefit society and environment',
      requirements: [
        'Environmental impact assessment',
        'Social impact evaluation',
        'Sustainability measures',
        'Democratic values alignment'
      ],
      compliance: 78
    },
    {
      id: 'accountability',
      name: 'Accountability',
      description: 'AI systems should be auditable and accountable',
      requirements: [
        'Auditability mechanisms',
        'Risk assessment procedures',
        'Impact assessment processes',
        'Redress mechanisms'
      ],
      compliance: 85
    }
  ];

  const ethicalMetrics = [
    {
      name: 'Ethical Assessments',
      value: ethicalAssessments.length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Avg Ethical Score',
      value: '84%',
      change: '+3%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Principles Compliance',
      value: '83%',
      change: '+2%',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'Active Reviews',
      value: ethicalAssessments.filter(a => a.status === 'in_progress').length,
      change: '0',
      trend: 'stable',
      color: 'yellow'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (score >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ethical AI Assessment</h2>
          <p className="text-gray-600 dark:text-gray-400">Evaluate AI systems against ethical principles and guidelines</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Ethical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {ethicalMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
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
            {['assessments', 'principles'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'assessments' && (
            <div className="space-y-6">
              {ethicalAssessments.map((assessment) => (
                <div key={assessment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{assessment.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                          {getStatusIcon(assessment.status)}
                          <span className="capitalize">{assessment.status.replace('_', ' ')}</span>
                        </div>
                        {assessment.overallScore && (
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(assessment.overallScore)}`}>
                            {assessment.overallScore}% Overall
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Assessor</span>
                          <div className="font-medium text-gray-900 dark:text-white">{assessment.assessor}</div>
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

                      {/* Ethical Principles Scores */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Ethical Principles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(assessment.principles).map(([principle, data]: [string, any]) => (
                            <div key={principle} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{data.score}%</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{principle}</div>
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getScoreColor(data.score)}`}>
                                {data.status?.replace('_', ' ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {assessment.recommendations && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {assessment.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'principles' && (
            <div className="space-y-6">
              {ethicalPrinciples.map((principle) => (
                <div key={principle.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{principle.name}</h3>
                    <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getScoreColor(principle.compliance)}`}>
                      {principle.compliance}%
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{principle.description}</p>

                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Requirements</h4>
                    {principle.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        principle.compliance >= 90 ? 'bg-green-500' :
                        principle.compliance >= 80 ? 'bg-blue-500' :
                        principle.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${principle.compliance}%` }}
                    />
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
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Ethical AI Assessment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Evaluate your AI system against ethical principles and guidelines
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
                    placeholder="My Ethical Assessment"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Customer Support Bot</option>
                    <option>Content Generator</option>
                    <option>Code Review Assistant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Ethical Principles to Assess
                </label>
                <div className="space-y-2">
                  {ethicalPrinciples.map(principle => (
                    <label key={principle.id} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{principle.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assessment Type
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>Comprehensive Assessment</option>
                  <option>Fairness & Bias Focus</option>
                  <option>Transparency Focus</option>
                  <option>Human Agency Focus</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated duration: 1-2 weeks
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthicalAI;