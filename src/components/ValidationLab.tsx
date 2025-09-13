import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  Brain,
  Target,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Plus,
  Edit,
  Download,
  Filter,
  Search,
  Calendar,
  Settings,
  Award,
  Shield,
  Activity,
  BarChart3,
  TrendingUp,
  User,
  Crown,
  Zap,
  Globe,
  Lock,
  Mail,
  Phone
} from 'lucide-react';

const ValidationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('validation_tasks');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showExpertPanelModal, setShowExpertPanelModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const validationTasks = [
    {
      id: 'task_001',
      name: 'Healthcare Triage - Medical Accuracy Validation',
      description: 'Expert validation of AI triage decisions for emergency department scenarios',
      application: 'Healthcare Triage Assistant',
      type: 'medical_validation',
      status: 'in_progress',
      priority: 'critical',
      riskLevel: 'high',
      expertPanel: 'Medical Ethics Board',
      requiredExpertise: ['Emergency Medicine', 'Medical Ethics', 'AI Safety'],
      assignedExperts: [
        { name: 'Dr. Sarah Chen', role: 'Emergency Medicine Physician', progress: 85 },
        { name: 'Dr. Michael Torres', role: 'Medical Ethics Specialist', progress: 78 },
        { name: 'Dr. Lisa Wang', role: 'AI Safety Researcher', progress: 92 }
      ],
      totalSamples: 500,
      completedSamples: 387,
      consensusThreshold: 0.8,
      currentConsensus: 0.87,
      validationCriteria: [
        'Medical accuracy and safety',
        'Appropriate triage classification',
        'Ethical considerations',
        'Bias detection across demographics',
        'Emergency protocol compliance'
      ],
      dueDate: '2024-01-20T23:59:59Z',
      estimatedCompletion: '2024-01-18T15:00:00Z',
      riskTraceability: ['RISK-HEALTH-001', 'RISK-BIAS-002', 'RISK-SAFETY-003'],
      governanceApproval: 'CIO + Medical Director',
      complianceFrameworks: ['EU AI Act', 'HIPAA', 'Medical Device Regulation']
    },
    {
      id: 'task_002',
      name: 'Financial Lending - Fair Lending Compliance Review',
      description: 'Expert review of lending decisions for bias and regulatory compliance',
      application: 'Financial Lending Copilot',
      type: 'fairness_validation',
      status: 'pending_assignment',
      priority: 'high',
      riskLevel: 'high',
      expertPanel: 'Fair Lending Review Board',
      requiredExpertise: ['Fair Lending Regulation', 'Credit Risk Assessment', 'Bias Detection'],
      assignedExperts: [],
      totalSamples: 300,
      completedSamples: 0,
      consensusThreshold: 0.85,
      validationCriteria: [
        'Fair lending compliance (ECOA)',
        'Demographic bias assessment',
        'Credit risk accuracy',
        'Regulatory adherence',
        'Adverse action reasoning'
      ],
      dueDate: '2024-01-25T23:59:59Z',
      riskTraceability: ['RISK-FIN-001', 'RISK-BIAS-001', 'RISK-REG-002'],
      governanceApproval: 'CIO + Chief Risk Officer',
      complianceFrameworks: ['EU AI Act', 'ECOA', 'GDPR', 'SOX']
    },
    {
      id: 'task_003',
      name: 'Government Services - Public Trust Assessment',
      description: 'Citizen impact assessment and public trust validation',
      application: 'Government Citizen Services',
      type: 'public_trust_validation',
      status: 'completed',
      priority: 'high',
      riskLevel: 'medium',
      expertPanel: 'Public Trust Advisory Board',
      requiredExpertise: ['Public Administration', 'Digital Government', 'Citizen Experience'],
      assignedExperts: [
        { name: 'Dr. Emily Davis', role: 'Public Administration Expert', progress: 100 },
        { name: 'Prof. Alex Kim', role: 'Digital Government Specialist', progress: 100 },
        { name: 'Dr. Jordan Smith', role: 'Citizen Experience Researcher', progress: 100 }
      ],
      totalSamples: 200,
      completedSamples: 200,
      consensusThreshold: 0.75,
      currentConsensus: 0.89,
      finalScore: 92.4,
      validationCriteria: [
        'Citizen service quality',
        'Accessibility compliance',
        'Cultural sensitivity',
        'Privacy protection',
        'Government transparency'
      ],
      completedAt: '2024-01-14T16:30:00Z',
      riskTraceability: ['RISK-GOV-001', 'RISK-TRUST-002'],
      governanceApproval: 'Agency CIO + Public Trust Officer',
      complianceFrameworks: ['FedRAMP', 'Section 508', 'Privacy Act']
    }
  ];

  const expertPanels = [
    {
      id: 'panel_001',
      name: 'Medical Ethics Board',
      description: 'Expert panel for healthcare AI validation and ethics review',
      domain: 'Healthcare',
      chairperson: 'Dr. Sarah Chen',
      members: [
        { name: 'Dr. Sarah Chen', role: 'Emergency Medicine Physician', expertise: ['Emergency Medicine', 'Medical Ethics'], availability: 'high' },
        { name: 'Dr. Michael Torres', role: 'Medical Ethics Specialist', expertise: ['Medical Ethics', 'AI Safety'], availability: 'medium' },
        { name: 'Dr. Lisa Wang', role: 'AI Safety Researcher', expertise: ['AI Safety', 'Healthcare AI'], availability: 'high' },
        { name: 'Dr. Robert Kim', role: 'Clinical Decision Support Expert', expertise: ['Clinical Decision Support', 'Medical Informatics'], availability: 'low' }
      ],
      activeTasks: 2,
      completedValidations: 15,
      averageConsensus: 0.87,
      specializations: ['Medical Accuracy', 'Patient Safety', 'Clinical Ethics', 'AI Bias in Healthcare'],
      certifications: ['Medical Board Certification', 'AI Ethics Certification', 'HIPAA Compliance'],
      meetingSchedule: 'Weekly Tuesdays 2:00 PM EST'
    },
    {
      id: 'panel_002',
      name: 'Fair Lending Review Board',
      description: 'Expert panel for financial AI fairness and regulatory compliance',
      domain: 'Financial Services',
      chairperson: 'Prof. Emily Davis',
      members: [
        { name: 'Prof. Emily Davis', role: 'Fair Lending Expert', expertise: ['Fair Lending', 'Credit Risk'], availability: 'high' },
        { name: 'Dr. Alex Kim', role: 'Financial Regulation Specialist', expertise: ['Banking Regulation', 'Compliance'], availability: 'medium' },
        { name: 'Ms. Jordan Smith', role: 'Bias Detection Researcher', expertise: ['Algorithmic Bias', 'Fairness'], availability: 'high' }
      ],
      activeTasks: 1,
      completedValidations: 8,
      averageConsensus: 0.91,
      specializations: ['Fair Lending Compliance', 'Credit Bias Detection', 'Regulatory Adherence'],
      certifications: ['CRA Certification', 'Fair Lending Specialist', 'Risk Management Professional'],
      meetingSchedule: 'Bi-weekly Fridays 10:00 AM EST'
    },
    {
      id: 'panel_003',
      name: 'Public Trust Advisory Board',
      description: 'Expert panel for government AI and public sector validation',
      domain: 'Government',
      chairperson: 'Dr. Taylor Brown',
      members: [
        { name: 'Dr. Taylor Brown', role: 'Public Administration Expert', expertise: ['Public Administration', 'Digital Government'], availability: 'high' },
        { name: 'Prof. Casey Wilson', role: 'Digital Government Specialist', expertise: ['E-Government', 'Citizen Services'], availability: 'medium' },
        { name: 'Dr. Morgan Lee', role: 'Public Trust Researcher', expertise: ['Public Trust', 'Government Transparency'], availability: 'high' }
      ],
      activeTasks: 0,
      completedValidations: 12,
      averageConsensus: 0.84,
      specializations: ['Public Service Quality', 'Government Transparency', 'Citizen Experience'],
      certifications: ['Public Administration Certification', 'Digital Government Expert', 'Privacy Professional'],
      meetingSchedule: 'Monthly First Monday 3:00 PM EST'
    }
  ];

  const validationMetrics = [
    {
      name: 'Active Validations',
      value: validationTasks.filter(t => t.status === 'in_progress').length,
      change: '+2',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Expert Consensus',
      value: '87%',
      change: '+3%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Validation Quality',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'Expert Panels',
      value: expertPanels.length,
      change: '+1',
      trend: 'up',
      color: 'yellow'
    }
  ];

  const validationWorkflows = [
    {
      id: 'workflow_001',
      name: 'Healthcare AI Validation Workflow',
      description: 'Comprehensive medical AI validation process',
      steps: [
        { step: 1, name: 'Medical Accuracy Review', owner: 'Emergency Medicine Expert', duration: '2-3 days', status: 'completed' },
        { step: 2, name: 'Patient Safety Assessment', owner: 'Medical Ethics Specialist', duration: '1-2 days', status: 'completed' },
        { step: 3, name: 'Bias Detection Analysis', owner: 'AI Safety Researcher', duration: '2-3 days', status: 'in_progress' },
        { step: 4, name: 'Clinical Protocol Validation', owner: 'Clinical Decision Expert', duration: '1-2 days', status: 'pending' },
        { step: 5, name: 'Final Consensus Review', owner: 'Full Panel', duration: '1 day', status: 'pending' }
      ],
      totalDuration: '7-11 days',
      consensusRequired: 0.8,
      governanceApproval: 'Medical Director + CIO',
      complianceValidation: 'EU AI Act + HIPAA'
    },
    {
      id: 'workflow_002',
      name: 'Financial AI Fairness Workflow',
      description: 'Fair lending and bias validation process',
      steps: [
        { step: 1, name: 'Fair Lending Compliance Review', owner: 'Fair Lending Expert', duration: '3-4 days', status: 'pending' },
        { step: 2, name: 'Demographic Bias Analysis', owner: 'Bias Detection Researcher', duration: '2-3 days', status: 'pending' },
        { step: 3, name: 'Regulatory Adherence Check', owner: 'Financial Regulation Specialist', duration: '2 days', status: 'pending' },
        { step: 4, name: 'Credit Risk Validation', owner: 'Credit Risk Expert', duration: '2-3 days', status: 'pending' },
        { step: 5, name: 'Final Compliance Review', owner: 'Full Panel', duration: '1 day', status: 'pending' }
      ],
      totalDuration: '10-13 days',
      consensusRequired: 0.85,
      governanceApproval: 'Chief Risk Officer + CIO',
      complianceValidation: 'ECOA + EU AI Act + SOX'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending_assignment': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Activity className="w-4 h-4" />;
      case 'pending_assignment': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'blocked': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Validation Lab (HITL)</h2>
          <p className="text-gray-600 dark:text-gray-400">Human-in-the-Loop validation with domain expert panels</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowExpertPanelModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Expert Panels</span>
          </button>
          <button 
            onClick={() => setShowCreateTaskModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Validation Task</span>
          </button>
        </div>
      </div>

      {/* Validation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {validationMetrics.map((metric, index) => (
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
            {['validation_tasks', 'expert_panels', 'workflows'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'validation_tasks' && (
            <div className="space-y-6">
              {validationTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{task.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          <span className="capitalize">{task.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(task.riskLevel)}`}>
                          {task.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{task.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Expert Panel</span>
                          <div className="font-medium text-gray-900 dark:text-white">{task.expertPanel}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Progress</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {task.completedSamples}/{task.totalSamples} ({Math.round((task.completedSamples / task.totalSamples) * 100)}%)
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Due Date</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(task.completedSamples / task.totalSamples) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Assigned Experts */}
                      {task.assignedExperts.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Assigned Experts</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {task.assignedExperts.map((expert, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 dark:text-white text-sm">{expert.name}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">{expert.role}</div>
                                  <div className="text-xs text-purple-600 dark:text-purple-400">{expert.progress}% complete</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Validation Criteria */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Validation Criteria</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.validationCriteria.map((criteria, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Risk Traceability */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Risk Traceability</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.riskTraceability.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded font-mono">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Consensus & Results */}
                      {task.currentConsensus && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-900 dark:text-green-100">
                              Expert Consensus: {(task.currentConsensus * 100).toFixed(1)}%
                            </span>
                            <span className="text-sm text-green-700 dark:text-green-300">
                              Required: {(task.consensusThreshold * 100)}%
                            </span>
                          </div>
                          {task.finalScore && (
                            <div className="text-sm text-green-800 dark:text-green-200 mt-1">
                              Final Validation Score: {task.finalScore}%
                            </div>
                          )}
                        </div>
                      )}

                      {/* Governance & Compliance */}
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Governance:</span> {task.governanceApproval} • 
                        <span className="font-medium ml-2">Compliance:</span> {task.complianceFrameworks.join(', ')}
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

          {activeTab === 'expert_panels' && (
            <div className="space-y-6">
              {expertPanels.map((panel) => (
                <div key={panel.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{panel.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                          {panel.domain}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          {panel.members.length} experts
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{panel.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Chairperson</span>
                          <div className="font-medium text-gray-900 dark:text-white">{panel.chairperson}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Active Tasks</span>
                          <div className="font-medium text-gray-900 dark:text-white">{panel.activeTasks}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Completed Validations</span>
                          <div className="font-medium text-gray-900 dark:text-white">{panel.completedValidations}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Avg Consensus</span>
                          <div className="font-medium text-gray-900 dark:text-white">{(panel.averageConsensus * 100).toFixed(1)}%</div>
                        </div>
                      </div>

                      {/* Panel Members */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Panel Members</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {panel.members.map((member, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white text-sm">{member.name}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{member.role}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(member.availability)}`}>
                                    {member.availability} availability
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {panel.specializations.map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Meeting Schedule */}
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Meeting Schedule:</span> {panel.meetingSchedule}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40">
                        Manage Panel
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="space-y-6">
              {validationWorkflows.map((workflow) => (
                <div key={workflow.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{workflow.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{workflow.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Total Duration</span>
                          <div className="font-medium text-gray-900 dark:text-white">{workflow.totalDuration}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Consensus Required</span>
                          <div className="font-medium text-gray-900 dark:text-white">{(workflow.consensusRequired * 100)}%</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Governance Approval</span>
                          <div className="font-medium text-gray-900 dark:text-white">{workflow.governanceApproval}</div>
                        </div>
                      </div>

                      {/* Workflow Steps */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Validation Steps</h4>
                        {workflow.steps.map((step) => (
                          <div key={step.step} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              step.status === 'completed' ? 'bg-green-500 text-white' :
                              step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                              'bg-gray-300 text-gray-600'
                            }`}>
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{step.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {step.owner} • {step.duration}
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                              {step.status.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Compliance Validation:</span> {workflow.complianceValidation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Validation Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Validation Task</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up human-in-the-loop validation with domain experts
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Task Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Healthcare AI Validation Task"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
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
                    Validation Objective & Scope *
                  </label>
                  <textarea
                    placeholder="Describe the validation objective, scope, and expected outcomes..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Type *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Medical Validation</option>
                      <option>Fairness Validation</option>
                      <option>Safety Validation</option>
                      <option>Ethics Review</option>
                      <option>Domain Expert Review</option>
                      <option>Regulatory Compliance</option>
                      <option>Public Trust Assessment</option>
                      <option>Technical Validation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority Level *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Level *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>High Risk (EU AI Act)</option>
                      <option>Medium Risk</option>
                      <option>Low Risk</option>
                      <option>Minimal Risk</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Duration
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>&lt; 1 week</option>
                      <option>1-2 weeks</option>
                      <option>2-4 weeks</option>
                      <option>1-2 months</option>
                      <option>&gt; 2 months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Expert Panel Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Expert Panel & Expertise Requirements</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expert Panel *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Medical Ethics Board</option>
                      <option>Fair Lending Review Board</option>
                      <option>Public Trust Advisory Board</option>
                      <option>AI Safety Committee</option>
                      <option>Technical Review Panel</option>
                      <option>Create New Panel</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Consensus Threshold *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Simple Majority (51%)</option>
                      <option>Supermajority (67%)</option>
                      <option>Strong Consensus (80%)</option>
                      <option>Near Unanimous (90%)</option>
                      <option>Unanimous (100%)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Expertise *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Emergency Medicine',
                      'Medical Ethics', 
                      'AI Safety',
                      'Fair Lending',
                      'Credit Risk',
                      'Bias Detection',
                      'Public Administration',
                      'Digital Government',
                      'Clinical Decision Support',
                      'Financial Regulation',
                      'Healthcare AI',
                      'Government Transparency',
                      'Patient Safety',
                      'Algorithmic Fairness',
                      'Regulatory Compliance',
                      'Ethics Review',
                      'Domain Knowledge',
                      'Technical Review'
                    ].map(expertise => (
                      <label key={expertise} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{expertise}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expert Assignment Strategy
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Auto-assign based on expertise</option>
                    <option>Manual expert selection</option>
                    <option>Round-robin assignment</option>
                    <option>Workload-balanced assignment</option>
                    <option>Expertise-weighted assignment</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Min Experts Required
                    </label>
                    <input
                      type="number"
                      defaultValue={3}
                      min={1}
                      max={10}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Experts per Sample
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      min={1}
                      max={15}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Validation Criteria */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Validation Criteria & Instructions</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Validation Criteria *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Medical accuracy and safety',
                      'Appropriate triage classification',
                      'Ethical considerations',
                      'Bias detection across demographics',
                      'Emergency protocol compliance',
                      'Fair lending compliance (ECOA)',
                      'Credit risk accuracy',
                      'Regulatory adherence',
                      'Adverse action reasoning',
                      'Public service quality',
                      'Government transparency',
                      'Citizen experience',
                      'Accessibility compliance',
                      'Cultural sensitivity',
                      'Privacy protection'
                    ].map(criteria => (
                      <label key={criteria} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{criteria}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Detailed Validation Instructions *
                  </label>
                  <textarea
                    placeholder="Provide comprehensive instructions for experts including evaluation criteria, edge cases to consider, domain-specific guidelines, and scoring rubrics..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Evaluation Rubric
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Healthcare Quality Rubric v2.1</option>
                      <option>Fair Lending Assessment Rubric v1.8</option>
                      <option>Government Services Quality Rubric v2.0</option>
                      <option>AI Safety Evaluation Rubric v1.5</option>
                      <option>Custom Rubric</option>
                      <option>Create New Rubric</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Scoring Method
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>1-5 Likert Scale</option>
                      <option>1-10 Numeric Scale</option>
                      <option>Pass/Fail Binary</option>
                      <option>Percentage Score (0-100%)</option>
                      <option>Custom Scoring System</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain-Specific Guidelines
                  </label>
                  <textarea
                    placeholder="Provide domain-specific validation guidelines (e.g., medical protocols, financial regulations, government standards)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>
              </div>

              {/* Dataset & Sampling */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset & Sampling Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Source Dataset *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>healthcare_triage_v1 (2,000 samples)</option>
                      <option>financial_lending_v2 (1,500 samples)</option>
                      <option>government_services_v1 (900 samples)</option>
                      <option>enterprise_copilot_v3 (1,200 samples)</option>
                      <option>retail_brand_safety_v1 (800 samples)</option>
                      <option>Upload new dataset</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sample Size for Validation *
                    </label>
                    <input
                      type="number"
                      placeholder="500"
                      min={10}
                      max={5000}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sampling Strategy
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Random Sampling</option>
                      <option>Stratified Sampling</option>
                      <option>Edge Case Focus</option>
                      <option>High-Risk Scenarios</option>
                      <option>Demographic Balanced</option>
                      <option>Error-Prone Cases</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quality Threshold
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>&gt; 90% (Excellent)</option>
                      <option>&gt; 80% (Good)</option>
                      <option>&gt; 70% (Acceptable)</option>
                      <option>&gt; 60% (Minimum)</option>
                      <option>Custom Threshold</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Depth
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Surface Review (&lt; 2h per expert)</option>
                      <option>Standard Review (2-4h per expert)</option>
                      <option>Deep Review (4-8h per expert)</option>
                      <option>Comprehensive Audit (&gt; 8h per expert)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Demographic Stratification (for bias testing)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Gender', 'Age Groups', 'Ethnicity', 'Geographic Region', 'Socioeconomic Status', 'Language', 'Disability Status', 'Education Level'].map(demographic => (
                      <label key={demographic} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{demographic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Edge Cases & Special Scenarios
                  </label>
                  <textarea
                    placeholder="Define specific edge cases, corner scenarios, or high-risk situations that require special attention during validation..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Risk & Compliance Integration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Risk & Compliance Integration</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Register Traceability *
                  </label>
                  <input
                    type="text"
                    placeholder="RISK-HEALTH-001, RISK-BIAS-002, RISK-SAFETY-003"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Compliance Frameworks *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['EU AI Act', 'NIST RMF', 'HIPAA', 'ECOA', 'GDPR', 'SOX', 'FedRAMP', 'ISO 27001', 'SOC 2', 'Medical Device Regulation', 'Fair Credit Reporting Act', 'Section 508'].map(framework => (
                      <label key={framework} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Governance Approval Required *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>CIO Only</option>
                      <option>CIO + CISO</option>
                      <option>CIO + Medical Director</option>
                      <option>CIO + Chief Risk Officer</option>
                      <option>Full C-Suite Approval</option>
                      <option>Board-Level Approval</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Regulatory Notification Required
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>None</option>
                      <option>FDA (Medical Devices)</option>
                      <option>Federal Reserve (Banking)</option>
                      <option>EU Notified Body</option>
                      <option>Agency CIO (Government)</option>
                      <option>Multiple Regulators</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Regulatory Impact Assessment
                  </label>
                  <textarea
                    placeholder="Describe potential regulatory implications, required notifications, and compliance considerations..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Workflow Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Validation Workflow Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Workflow Template
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Healthcare AI Validation Workflow</option>
                      <option>Financial AI Fairness Workflow</option>
                      <option>Government AI Trust Workflow</option>
                      <option>Enterprise AI Safety Workflow</option>
                      <option>Custom Workflow</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Escalation Procedure
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Standard Escalation</option>
                      <option>Fast-Track (Critical Issues)</option>
                      <option>Medical Emergency Protocol</option>
                      <option>Financial Regulatory Protocol</option>
                      <option>Government Security Protocol</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Disagreement Resolution
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Majority Vote</option>
                      <option>Chairperson Decision</option>
                      <option>Additional Expert Review</option>
                      <option>Escalate to Governance</option>
                      <option>External Arbitration</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quality Assurance
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Inter-rater Reliability Check</option>
                      <option>Random Sample Re-validation</option>
                      <option>Blind Validation</option>
                      <option>Cross-validation</option>
                      <option>No Additional QA</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Documentation Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Basic Documentation</option>
                      <option>Standard Documentation</option>
                      <option>Comprehensive Documentation</option>
                      <option>Regulatory Submission Level</option>
                      <option>Audit-Ready Documentation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Success Criteria & Acceptance Thresholds *
                  </label>
                  <textarea
                    placeholder="Define clear success criteria and acceptance thresholds (e.g., >90% expert consensus, <5% bias across demographics, 100% safety compliance)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Notification & Communication */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Notification & Communication</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Coordinator *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Sarah Chen (AI Safety Lead)</option>
                      <option>Mike Johnson (QA Manager)</option>
                      <option>Emily Davis (Compliance Officer)</option>
                      <option>Alex Kim (Technical Lead)</option>
                      <option>Jordan Smith (Project Manager)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notification Frequency
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Real-time Updates</option>
                      <option>Daily Digest</option>
                      <option>Weekly Summary</option>
                      <option>Milestone-based</option>
                      <option>On-demand Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stakeholder Notification List
                  </label>
                  <input
                    type="text"
                    placeholder="cio@company.com, medical-director@hospital.com, ai-safety@company.com"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Communication Channels
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'email', name: 'Email', icon: Mail },
                      { id: 'slack', name: 'Slack', icon: MessageSquare },
                      { id: 'teams', name: 'Microsoft Teams', icon: Users },
                      { id: 'sms', name: 'SMS', icon: Phone }
                    ].map(channel => {
                      const Icon = channel.icon;
                      return (
                        <label key={channel.id} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked={channel.id === 'email'} className="rounded border-gray-300" />
                          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{channel.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expert Incentive & Compensation
                  </label>
                  <textarea
                    placeholder="Define expert compensation, incentives, recognition, or other motivational factors..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                  />
                </div>
              </div>

              {/* Quality Assurance */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Quality Assurance & Validation</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Inter-rater Reliability Target
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>&gt; 0.9 (Excellent)</option>
                      <option>&gt; 0.8 (Good)</option>
                      <option>&gt; 0.7 (Acceptable)</option>
                      <option>&gt; 0.6 (Minimum)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Calibration Method
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Pre-task Calibration</option>
                      <option>Ongoing Calibration</option>
                      <option>Post-task Calibration</option>
                      <option>No Calibration</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Sample Size (%)
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>5% Random Re-validation</option>
                      <option>10% Random Re-validation</option>
                      <option>20% Random Re-validation</option>
                      <option>100% Double Validation</option>
                      <option>No Re-validation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Quality Control Measures
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Attention Check Questions',
                      'Time-based Quality Control',
                      'Consistency Validation',
                      'Expert Feedback Loop',
                      'Bias Detection in Reviews',
                      'Statistical Outlier Detection',
                      'Domain Knowledge Testing',
                      'Calibration Exercises'
                    ].map(measure => (
                      <label key={measure} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{measure}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expert Performance Monitoring
                  </label>
                  <textarea
                    placeholder="Define how expert performance will be monitored and maintained (response time, quality scores, consistency metrics)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                  />
                </div>
              </div>

              {/* Deliverables & Outcomes */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Deliverables & Expected Outcomes</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Expected Deliverables *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Expert Validation Report',
                      'Consensus Analysis',
                      'Risk Mitigation Recommendations',
                      'Bias Assessment Report',
                      'Safety Validation Certificate',
                      'Compliance Evidence Pack',
                      'Governance Approval Documentation',
                      'Regulatory Submission Package',
                      'Expert Panel Meeting Minutes',
                      'Quality Assurance Report',
                      'Inter-rater Reliability Analysis',
                      'Final Validation Score'
                    ].map(deliverable => (
                      <label key={deliverable} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{deliverable}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Impact & Value Proposition *
                  </label>
                  <textarea
                    placeholder="Describe the expected business impact, value creation, and strategic benefits of this validation..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimated Budget ($)
                    </label>
                    <input
                      type="number"
                      placeholder="15000"
                      min={0}
                      step={100}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ROI Expectation
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Risk Mitigation Value</option>
                      <option>Regulatory Compliance Value</option>
                      <option>Trust & Reputation Value</option>
                      <option>Operational Efficiency</option>
                      <option>Cost Avoidance</option>
                      <option>Revenue Protection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post-Validation Actions
                  </label>
                  <textarea
                    placeholder="Define actions to be taken based on validation results (model updates, policy changes, training requirements)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields • Task will be assigned to expert panel upon creation
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateTaskModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save as Draft
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Create Validation Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expert Panel Management Modal */}
      {showExpertPanelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Expert Panels</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Configure domain expert panels for human validation
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Panel Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Panel Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Panel Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Medical Ethics Board"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain Focus *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Healthcare</option>
                      <option>Financial Services</option>
                      <option>Government</option>
                      <option>Enterprise</option>
                      <option>Retail</option>
                      <option>Education</option>
                      <option>Cross-Domain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Panel Description & Charter *
                  </label>
                  <textarea
                    placeholder="Describe the panel's purpose, scope, and validation responsibilities..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Chairperson *
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Sarah Chen"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meeting Schedule
                    </label>
                    <input
                      type="text"
                      placeholder="Weekly Tuesdays 2:00 PM EST"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Expert Management */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Expert Management</h4>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">Add Expert to Panel</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expert Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Dr. Michael Torres"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Professional Role *
                        </label>
                        <input
                          type="text"
                          placeholder="Medical Ethics Specialist"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="michael.torres@hospital.com"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Availability Level
                        </label>
                        <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                          <option>High (20+ hours/week)</option>
                          <option>Medium (10-20 hours/week)</option>
                          <option>Low (&lt; 10 hours/week)</option>
                          <option>On-demand Only</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Areas of Expertise *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                          'Emergency Medicine',
                          'Medical Ethics',
                          'AI Safety',
                          'Fair Lending',
                          'Credit Risk',
                          'Bias Detection',
                          'Public Administration',
                          'Digital Government',
                          'Clinical Decision Support',
                          'Financial Regulation',
                          'Healthcare AI',
                          'Government Transparency',
                          'Patient Safety',
                          'Algorithmic Fairness',
                          'Regulatory Compliance'
                        ].map(expertise => (
                          <label key={expertise} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{expertise}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Professional Credentials & Certifications
                      </label>
                      <textarea
                        placeholder="List relevant credentials, certifications, and qualifications..."
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                      />
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Add Expert to Panel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Panel configuration will be saved and available for validation tasks
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowExpertPanelModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Save Panel Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationLab;