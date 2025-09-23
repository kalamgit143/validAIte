import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  Plus,
  Filter,
  Search,
  BarChart3,
  Activity,
  Shield,
  FileText,
  Crown,
  Gavel,
  Code,
  Building,
  Globe,
  Lock,
  Brain,
  Heart,
  Scale,
  Database,
  Settings,
  Calendar,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

const GovernanceMatrix: React.FC = () => {
  const [activeView, setActiveView] = useState('matrix');
  const [selectedApplication, setSelectedApplication] = useState('all');

  const governanceMatrix = [
    {
      applicationId: 'healthcare_triage',
      applicationName: 'Healthcare Triage Assistant',
      riskLevel: 'High Risk',
      euAiActClass: 'High Risk',
      stakeholders: {
        riskOwner: { name: 'Sarah Chen', role: 'CIO', status: 'assigned', contact: 'sarah.chen@acme.com' },
        securityOwner: { name: 'Alex Kim', role: 'CISO', status: 'assigned', contact: 'alex.kim@acme.com' },
        complianceOfficer: { name: 'Emily Davis', role: 'Compliance Officer', status: 'assigned', contact: 'emily.davis@acme.com' },
        qaLead: { name: 'Jordan Smith', role: 'QA Lead', status: 'assigned', contact: 'jordan.smith@acme.com' },
        ethicsReviewer: { name: 'Dr. Sarah Chen', role: 'Medical Ethics Board', status: 'assigned', contact: 'ethics@acme.com' },
        domainExpert: { name: 'Dr. Michael Torres', role: 'Emergency Medicine', status: 'assigned', contact: 'medical@acme.com' }
      },
      approvalWorkflow: [
        { step: 1, role: 'QA Lead', task: 'Risk assessment completion', status: 'completed', completedAt: '2024-01-10T10:00:00Z' },
        { step: 2, role: 'CISO', task: 'Security review & threat model', status: 'completed', completedAt: '2024-01-12T14:00:00Z' },
        { step: 3, role: 'Compliance Officer', task: 'Regulatory mapping validation', status: 'completed', completedAt: '2024-01-13T16:00:00Z' },
        { step: 4, role: 'Ethics Reviewer', task: 'Ethical assessment', status: 'completed', completedAt: '2024-01-14T11:00:00Z' },
        { step: 5, role: 'Domain Expert', task: 'Medical accuracy validation', status: 'completed', completedAt: '2024-01-14T15:00:00Z' },
        { step: 6, role: 'CIO', task: 'Strategic approval & deployment', status: 'approved', completedAt: '2024-01-15T09:00:00Z' }
      ],
      governanceStatus: 'approved',
      deploymentAuthorized: true,
      lastUpdated: '2024-01-15T09:00:00Z'
    },
    {
      applicationId: 'financial_lending',
      applicationName: 'Financial Lending Copilot',
      riskLevel: 'High Risk',
      euAiActClass: 'High Risk',
      stakeholders: {
        riskOwner: { name: 'Mike Johnson', role: 'CDO', status: 'assigned', contact: 'mike.johnson@acme.com' },
        securityOwner: { name: 'Alex Kim', role: 'CISO', status: 'assigned', contact: 'alex.kim@acme.com' },
        complianceOfficer: { name: 'Emily Davis', role: 'Compliance Officer', status: 'assigned', contact: 'emily.davis@acme.com' },
        qaLead: { name: 'Jordan Smith', role: 'QA Lead', status: 'assigned', contact: 'jordan.smith@acme.com' },
        ethicsReviewer: { name: 'Fair Lending Board', role: 'Ethics Committee', status: 'assigned', contact: 'ethics@acme.com' },
        domainExpert: { name: 'Lisa Rodriguez', role: 'Financial Risk Expert', status: 'assigned', contact: 'finance@acme.com' }
      },
      approvalWorkflow: [
        { step: 1, role: 'QA Lead', task: 'Risk assessment completion', status: 'completed', completedAt: '2024-01-11T10:00:00Z' },
        { step: 2, role: 'CISO', task: 'Security review & threat model', status: 'completed', completedAt: '2024-01-13T14:00:00Z' },
        { step: 3, role: 'Compliance Officer', task: 'Regulatory mapping validation', status: 'in_progress', startedAt: '2024-01-14T09:00:00Z' },
        { step: 4, role: 'Ethics Reviewer', task: 'Fair lending assessment', status: 'pending', scheduledFor: '2024-01-18T10:00:00Z' },
        { step: 5, role: 'Domain Expert', task: 'Financial risk validation', status: 'pending', scheduledFor: '2024-01-20T14:00:00Z' },
        { step: 6, role: 'CDO', task: 'Strategic approval & deployment', status: 'pending', scheduledFor: '2024-01-25T09:00:00Z' }
      ],
      governanceStatus: 'in_progress',
      deploymentAuthorized: false,
      lastUpdated: '2024-01-14T16:30:00Z'
    }
  ];

  const governanceRoles = [
    {
      role: 'Risk Owner (CIO/CDO)',
      responsibilities: [
        'Strategic AI ownership and accountability',
        'Risk classification approval',
        'Business impact assessment',
        'Final deployment authorization',
        'Stakeholder communication'
      ],
      icon: Crown,
      color: 'blue'
    },
    {
      role: 'Security Owner (CISO)',
      responsibilities: [
        'Security risk assessment',
        'Threat model validation',
        'Security control implementation',
        'Incident response planning',
        'Security compliance oversight'
      ],
      icon: Shield,
      color: 'red'
    },
    {
      role: 'Compliance Officer',
      responsibilities: [
        'Regulatory mapping and validation',
        'Compliance framework alignment',
        'Evidence pack preparation',
        'Audit trail maintenance',
        'Regulatory reporting'
      ],
      icon: Gavel,
      color: 'purple'
    },
    {
      role: 'QA Lead',
      responsibilities: [
        'Quality assurance oversight',
        'Testing strategy development',
        'TEVV execution management',
        'Performance validation',
        'Technical documentation review'
      ],
      icon: Code,
      color: 'green'
    },
    {
      role: 'Ethics Reviewer',
      responsibilities: [
        'Ethical assessment and review',
        'Bias evaluation oversight',
        'Fairness validation',
        'Societal impact assessment',
        'Ethics committee coordination'
      ],
      icon: Heart,
      color: 'pink'
    },
    {
      role: 'Domain Expert',
      responsibilities: [
        'Domain-specific validation',
        'Subject matter expertise',
        'Use case appropriateness review',
        'Industry standard compliance',
        'Professional oversight'
      ],
      icon: Brain,
      color: 'indigo'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'assigned': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'assigned': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High Risk': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium Risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low Risk': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Governance Matrix</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Review complete traceability and governance coverage</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedApplication}
            onChange={(e) => setSelectedApplication(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Applications</option>
            <option value="healthcare_triage">Healthcare Triage Assistant</option>
            <option value="financial_lending">Financial Lending Copilot</option>
            <option value="enterprise_copilot">SAP Enterprise Copilot</option>
            <option value="government_services">Government Citizen Services</option>
            <option value="retail_brand_safety">Retail Brand Safety Assistant</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Matrix</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'matrix', label: 'Governance Matrix', icon: Target },
              { id: 'roles', label: 'Role Definitions', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeView === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
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
          {activeView === 'matrix' ? (
            <div className="space-y-8">
              {governanceMatrix.map((app) => (
                <div key={app.applicationId} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">{app.applicationName}</h3>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.governanceStatus)}`}>
                          {getStatusIcon(app.governanceStatus)}
                          <span className="capitalize">{app.governanceStatus.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(app.riskLevel)}`}>
                          {app.riskLevel}
                        </div>
                        {app.deploymentAuthorized && (
                          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm rounded font-medium">
                            ✓ DEPLOYMENT AUTHORIZED
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-indigo-700 dark:text-indigo-300 mb-4">
                        EU AI Act Classification: {app.euAiActClass} • Last Updated: {new Date(app.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stakeholder Assignment */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Governance Stakeholder Assignment</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(app.stakeholders).map(([roleKey, stakeholder]: [string, any]) => (
                        <div key={roleKey} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                              {roleKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h5>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stakeholder.status)}`}>
                              {getStatusIcon(stakeholder.status)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white font-medium">{stakeholder.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{stakeholder.role}</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-500">{stakeholder.contact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approval Workflow */}
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span>Digital Governance Approval Workflow</span>
                    </h4>
                    <div className="space-y-3">
                      {app.approvalWorkflow.map((step) => (
                        <div key={step.step} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step.status === 'completed' || step.status === 'approved' ? 'bg-green-500 text-white' :
                            step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}>
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{step.role}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{step.task}</div>
                            {step.completedAt && (
                              <div className="text-xs text-green-600 dark:text-green-400">
                                Completed: {new Date(step.completedAt).toLocaleDateString()}
                              </div>
                            )}
                            {step.scheduledFor && (
                              <div className="text-xs text-blue-600 dark:text-blue-400">
                                Scheduled: {new Date(step.scheduledFor).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                            {step.status.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Role Definitions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {governanceRoles.map((roleInfo) => {
                  const Icon = roleInfo.icon;
                  return (
                    <div key={roleInfo.role} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-${roleInfo.color}-100 dark:bg-${roleInfo.color}-900/20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${roleInfo.color}-600 dark:text-${roleInfo.color}-400`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{roleInfo.role}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Responsibilities:</h4>
                        {roleInfo.responsibilities.map((responsibility, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{responsibility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Governance Process Flow */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Governance Process Flow</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      phase: 'Planning & Setup',
                      steps: ['Application Setup', 'Use Case Definition', 'Stakeholder Assignment'],
                      icon: Settings,
                      color: 'blue'
                    },
                    {
                      phase: 'Risk Assessment',
                      steps: ['Risk Classification', 'Threat Modeling', 'Impact Analysis'],
                      icon: AlertTriangle,
                      color: 'red'
                    },
                    {
                      phase: 'Control Implementation',
                      steps: ['Governance Controls', 'Mitigation Strategies', 'Monitoring Setup'],
                      icon: Shield,
                      color: 'green'
                    },
                    {
                      phase: 'Validation & Testing',
                      steps: ['TEVV Execution', 'Trust Metrics', 'Compliance Validation'],
                      icon: CheckCircle,
                      color: 'purple'
                    },
                    {
                      phase: 'Review & Approval',
                      steps: ['Stakeholder Review', 'Ethics Assessment', 'Final Approval'],
                      icon: Crown,
                      color: 'yellow'
                    },
                    {
                      phase: 'Monitoring & Maintenance',
                      steps: ['Continuous Monitoring', 'Periodic Review', 'Update Management'],
                      icon: Activity,
                      color: 'indigo'
                    }
                  ].map((phase) => {
                    const Icon = phase.icon;
                    return (
                      <div key={phase.phase} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-3">
                          <Icon className={`w-5 h-5 text-${phase.color}-600 dark:text-${phase.color}-400`} />
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{phase.phase}</h4>
                        </div>
                        <div className="space-y-1">
                          {phase.steps.map((step, index) => (
                            <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Governance Coverage Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Governance Coverage Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-sm text-green-700 dark:text-green-300">Stakeholder Assignment</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">87%</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Approval Workflow</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">94%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Control Implementation</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">92%</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Traceability Coverage</div>
          </div>
        </div>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Approval Status by Application</h4>
          <div className="space-y-3">
            {governanceMatrix.map((app) => (
              <div key={app.applicationId} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{app.applicationName}</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {app.approvalWorkflow.filter(step => step.status === 'completed' || step.status === 'approved').length}/
                    {app.approvalWorkflow.length}
                  </div>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(app.approvalWorkflow.filter(step => step.status === 'completed' || step.status === 'approved').length / app.approvalWorkflow.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Governance Health Metrics</h4>
          <div className="space-y-4">
            {[
              { metric: 'Stakeholder Response Time', value: '2.3 days', target: '< 3 days', status: 'good' },
              { metric: 'Approval Cycle Time', value: '12 days', target: '< 15 days', status: 'good' },
              { metric: 'Documentation Completeness', value: '94%', target: '> 90%', status: 'excellent' },
              { metric: 'Governance Compliance', value: '87%', target: '> 85%', status: 'good' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{metric.metric}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Target: {metric.target}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {metric.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceMatrix;