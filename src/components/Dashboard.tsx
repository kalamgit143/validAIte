import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Activity,
  Shield,
  Target,
  Brain,
  FileText,
  BarChart3,
  Crown,
  Building,
  Gavel,
  Code,
  Eye,
  Settings,
  Bell,
  Calendar,
  Award,
  Layers,
  Database,
  Lock,
  Globe,
  Heart,
  Scale,
  Lightbulb,
  Cpu,
  Timer,
  GitBranch,
  TestTube,
  Workflow,
  PieChart,
  LineChart,
  ArrowRight,
  ExternalLink,
  Download,
  RefreshCw,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import MetricCard from './MetricCard';
import Chart from './Chart';

interface DashboardProps {
  userRole?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const roleToIdMap: Record<string, string> = {
    'Quality & Compliance Manager': 'quality_compliance_lead',
    'TEVV Engineer': 'test_evaluation_engineer',
    'Data & Ethics Manager': 'data_ethics_steward',
    'MLOps & Reliability Engineer': 'mlops_lifecycle_engineer',
    'AI Governance Auditor': 'governance_audit_advisor',
    'CISO': 'quality_compliance_lead'
  };

  const currentRoleId = userRole ? roleToIdMap[userRole] || 'quality_compliance_lead' : 'quality_compliance_lead';

  const [selectedRole, setSelectedRole] = useState(currentRoleId);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const userRoles = [
    {
      id: 'quality_compliance_lead',
      name: 'Quality & Compliance Manager',
      title: 'Quality & Compliance Manager',
      description: 'Owns overall AI quality and compliance strategy, NIST RMF and EU TEVV alignment',
      icon: Crown,
      color: 'from-blue-600 to-indigo-700',
      focus: ['Quality Strategy', 'NIST RMF', 'EU TEVV', 'Model Documentation', 'Risk Register']
    },
    {
      id: 'test_evaluation_engineer',
      name: 'TEVV Engineer',
      title: 'TEVV Engineer',
      description: 'Designs and executes functional, non-functional, and GenAI-specific tests',
      icon: TestTube,
      color: 'from-purple-600 to-violet-700',
      focus: ['Test Execution', 'Prompt Testing', 'Bias Testing', 'Trust Metrics', 'Explainability']
    },
    {
      id: 'data_ethics_steward',
      name: 'Data & Ethics Manager',
      title: 'Data & Ethics Manager',
      description: 'Manages dataset governance, lineage, and ensures data quality and fairness',
      icon: Database,
      color: 'from-green-600 to-emerald-700',
      focus: ['Dataset Governance', 'Data Quality', 'Bias Detection', 'Fairness', 'Lineage']
    },
    {
      id: 'mlops_lifecycle_engineer',
      name: 'MLOps & Reliability Engineer',
      title: 'MLOps & Reliability Engineer',
      description: 'Maintains AI lifecycle, version control, drift monitoring, and TEVV automation',
      icon: GitBranch,
      color: 'from-cyan-600 to-blue-700',
      focus: ['Lifecycle Management', 'Version Control', 'Drift Monitoring', 'CI/CD', 'Automation']
    },
    {
      id: 'governance_audit_advisor',
      name: 'AI Governance Auditor',
      title: 'AI Governance Auditor',
      description: 'Provides independent review for risk, ethics, compliance, and audit readiness',
      icon: Shield,
      color: 'from-orange-600 to-red-700',
      focus: ['Independent Review', 'Risk Assessment', 'Audit Readiness', 'Regulatory Traceability']
    }
  ];

  const dashboardData = {
    quality_compliance_lead: {
      title: 'AI Quality & Compliance Dashboard',
      subtitle: 'Strategic quality oversight and regulatory compliance management',
      keyMetrics: [
        {
          title: 'Compliance Rate',
          value: '87%',
          change: '+5%',
          trend: 'up' as const,
          icon: CheckCircle,
          color: 'green',
          description: 'Overall NIST RMF & EU AI Act compliance'
        },
        {
          title: 'Model Documentation',
          value: '8/8',
          change: '+2',
          trend: 'up' as const,
          icon: FileText,
          color: 'blue',
          description: 'Model Cards and Annex IV completed'
        },
        {
          title: 'Risk Register Status',
          value: '94%',
          change: '+3%',
          trend: 'up' as const,
          icon: AlertTriangle,
          color: 'yellow',
          description: 'Risk register completeness'
        },
        {
          title: 'Audit Readiness',
          value: '92%',
          change: '+8%',
          trend: 'up' as const,
          icon: Shield,
          color: 'purple',
          description: 'TEVV audit preparation status'
        }
      ],
      insights: [
        {
          type: 'success',
          title: 'EU AI Act Annex IV Documentation Complete',
          description: 'All high-risk systems now have complete technical documentation',
          action: 'Review Documentation',
          priority: 'medium'
        },
        {
          type: 'attention',
          title: 'NIST RMF Alignment Gap Identified',
          description: '3 systems require updated risk management documentation',
          action: 'Update Risk Register',
          priority: 'high'
        },
        {
          type: 'opportunity',
          title: 'Quality Strategy Review Due',
          description: 'Quarterly strategy review scheduled for next week',
          action: 'Schedule Meeting',
          priority: 'medium'
        }
      ]
    },
    test_evaluation_engineer: {
      title: 'AI Test & Evaluation Dashboard',
      subtitle: 'Functional, non-functional, and GenAI-specific test execution',
      keyMetrics: [
        {
          title: 'Test Coverage',
          value: '94.2%',
          change: '+2.1%',
          trend: 'up' as const,
          icon: TestTube,
          color: 'green',
          description: 'Overall test coverage across systems'
        },
        {
          title: 'Trust Metrics Score',
          value: '92.3/100',
          change: '+3.1',
          trend: 'up' as const,
          icon: Target,
          color: 'blue',
          description: 'Accuracy, fairness, faithfulness average'
        },
        {
          title: 'Prompt Tests Passed',
          value: '247/250',
          change: '+12',
          trend: 'up' as const,
          icon: Brain,
          color: 'purple',
          description: 'GenAI prompt testing success rate'
        },
        {
          title: 'Bias Score',
          value: '0.12',
          change: '-0.03',
          trend: 'up' as const,
          icon: Scale,
          color: 'green',
          description: 'Lower is better - fairness metric'
        }
      ],
      insights: [
        {
          type: 'success',
          title: 'Hallucination Testing Complete',
          description: 'Content generator passes all factual accuracy tests',
          action: 'View Test Results',
          priority: 'low'
        },
        {
          type: 'attention',
          title: 'Robustness Tests Failing',
          description: 'Adversarial inputs causing 8% failure rate in chatbot',
          action: 'Review Failures',
          priority: 'high'
        },
        {
          type: 'info',
          title: 'New Explainability Framework Available',
          description: 'Enhanced SHAP-based testing ready for integration',
          action: 'Evaluate Framework',
          priority: 'medium'
        }
      ]
    },
    data_ethics_steward: {
      title: 'Data & Ethics Governance Dashboard',
      subtitle: 'Dataset governance, lineage, and fairness validation',
      keyMetrics: [
        {
          title: 'Data Quality Score',
          value: '96.8%',
          change: '+1.3%',
          trend: 'up' as const,
          icon: Database,
          color: 'green',
          description: 'Overall dataset quality metrics'
        },
        {
          title: 'Lineage Coverage',
          value: '100%',
          change: '0%',
          trend: 'up' as const,
          icon: GitBranch,
          color: 'blue',
          description: 'Complete data lineage tracking'
        },
        {
          title: 'Bias Detection',
          value: '3 issues',
          change: '-2',
          trend: 'up' as const,
          icon: AlertTriangle,
          color: 'yellow',
          description: 'Active bias issues requiring attention'
        },
        {
          title: 'Consent Compliance',
          value: '100%',
          change: '0%',
          trend: 'up' as const,
          icon: CheckCircle,
          color: 'purple',
          description: 'Data consent and GDPR compliance'
        }
      ],
      insights: [
        {
          type: 'attention',
          title: 'Gender Bias Detected in Training Data',
          description: 'Healthcare dataset shows 15% gender imbalance',
          action: 'Rebalance Dataset',
          priority: 'high'
        },
        {
          type: 'success',
          title: 'Evaluation Dataset Curated',
          description: 'New diverse evaluation dataset ready for testing',
          action: 'Deploy Dataset',
          priority: 'low'
        },
        {
          type: 'info',
          title: 'Data Lineage Audit Complete',
          description: 'All datasets traced to original sources',
          action: 'View Report',
          priority: 'low'
        }
      ]
    },
    mlops_lifecycle_engineer: {
      title: 'MLOps & Lifecycle Management Dashboard',
      subtitle: 'AI lifecycle, version control, and drift monitoring',
      keyMetrics: [
        {
          title: 'Model Versions',
          value: '47',
          change: '+5',
          trend: 'up' as const,
          icon: GitBranch,
          color: 'blue',
          description: 'Total models in version control'
        },
        {
          title: 'Drift Alerts',
          value: '2 active',
          change: '+1',
          trend: 'down' as const,
          icon: TrendingDown,
          color: 'red',
          description: 'Models showing performance drift'
        },
        {
          title: 'Pipeline Uptime',
          value: '99.95%',
          change: '+0.05%',
          trend: 'up' as const,
          icon: Activity,
          color: 'green',
          description: 'CI/CD pipeline availability'
        },
        {
          title: 'Automation Coverage',
          value: '87%',
          change: '+12%',
          trend: 'up' as const,
          icon: Workflow,
          color: 'purple',
          description: 'Post-deployment TEVV automation'
        }
      ],
      insights: [
        {
          type: 'critical',
          title: 'Content Generator Showing Drift',
          description: '15% performance degradation, retraining recommended',
          action: 'Initiate Retraining',
          priority: 'critical'
        },
        {
          type: 'success',
          title: 'Automated Retraining Pipeline Live',
          description: 'New pipeline reduces retraining time by 60%',
          action: 'View Pipeline',
          priority: 'low'
        },
        {
          type: 'info',
          title: 'Model Registry Updated',
          description: '5 new model versions registered this week',
          action: 'Review Changes',
          priority: 'medium'
        }
      ]
    },
    governance_audit_advisor: {
      title: 'AI Governance & Audit Dashboard',
      subtitle: 'Independent review and audit readiness validation',
      keyMetrics: [
        {
          title: 'Audit Readiness',
          value: '92%',
          change: '+8%',
          trend: 'up' as const,
          icon: Shield,
          color: 'green',
          description: 'Overall audit preparation status'
        },
        {
          title: 'Risk Score',
          value: '7.2/10',
          change: '-0.3',
          trend: 'up' as const,
          icon: AlertTriangle,
          color: 'yellow',
          description: 'Independent risk assessment'
        },
        {
          title: 'Evidence Documents',
          value: '247',
          change: '+28',
          trend: 'up' as const,
          icon: FileText,
          color: 'blue',
          description: 'Compliance evidence collected'
        },
        {
          title: 'Traceability Score',
          value: '94%',
          change: '+5%',
          trend: 'up' as const,
          icon: GitBranch,
          color: 'purple',
          description: 'Regulatory traceability coverage'
        }
      ],
      insights: [
        {
          type: 'urgent',
          title: 'Independent Review Scheduled',
          description: 'Quarterly governance review scheduled for next week',
          action: 'Prepare Materials',
          priority: 'critical'
        },
        {
          type: 'success',
          title: 'Ethics Assessment Complete',
          description: 'All systems passed ethics and compliance review',
          action: 'View Report',
          priority: 'low'
        },
        {
          type: 'attention',
          title: 'Documentation Gaps Identified',
          description: '3 systems need updated compliance documentation',
          action: 'Update Docs',
          priority: 'high'
        }
      ]
    }
  };

  const currentDashboard = dashboardData[selectedRole as keyof typeof dashboardData];
  const currentRole = userRoles.find(role => role.id === selectedRole);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success':
      case 'strategic': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'critical':
      case 'urgent':
      case 'risk': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning':
      case 'attention': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'opportunity':
      case 'info': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
      case 'strategic': return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'critical':
      case 'urgent':
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'warning':
      case 'attention': return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'opportunity':
      case 'info': return <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default: return <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Testing Services Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Role-based insights for comprehensive AI testing, evaluation, validation, and verification services.
        </p>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {!userRole && (
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none pr-10 min-w-80 text-sm font-medium shadow-sm"
              >
                {userRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Crown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className={`bg-gradient-to-r ${currentRole?.color} p-8 rounded-xl text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{currentDashboard.title}</h3>
            <p className="text-white/80 mb-4">{currentDashboard.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {currentRole?.focus.map((focus, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentDashboard.keyMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights & Actions</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All Insights
          </button>
        </div>

        <div className="space-y-4">
          {currentDashboard.insights.map((insight, index) => (
            <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getInsightColor(insight.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
                      <span>{insight.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedRole === 'quality_compliance_lead' && [
            { icon: FileText, label: 'Update Model Cards', color: 'bg-blue-600' },
            { icon: Shield, label: 'Review Risk Register', color: 'bg-red-600' },
            { icon: CheckCircle, label: 'NIST RMF Status', color: 'bg-green-600' },
            { icon: BarChart3, label: 'Compliance Report', color: 'bg-purple-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'test_evaluation_engineer' && [
            { icon: TestTube, label: 'Run Test Suite', color: 'bg-purple-600' },
            { icon: Brain, label: 'Prompt Testing', color: 'bg-blue-600' },
            { icon: Target, label: 'Trust Metrics', color: 'bg-green-600' },
            { icon: Scale, label: 'Bias Analysis', color: 'bg-orange-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'data_ethics_steward' && [
            { icon: Database, label: 'Data Quality Check', color: 'bg-green-600' },
            { icon: GitBranch, label: 'View Lineage', color: 'bg-blue-600' },
            { icon: Scale, label: 'Fairness Assessment', color: 'bg-purple-600' },
            { icon: AlertTriangle, label: 'Bias Detection', color: 'bg-yellow-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'mlops_lifecycle_engineer' && [
            { icon: GitBranch, label: 'Model Registry', color: 'bg-cyan-600' },
            { icon: TrendingDown, label: 'Drift Monitoring', color: 'bg-red-600' },
            { icon: Workflow, label: 'CI/CD Pipeline', color: 'bg-blue-600' },
            { icon: RefreshCw, label: 'Trigger Retraining', color: 'bg-green-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'governance_audit_advisor' && [
            { icon: Shield, label: 'Audit Review', color: 'bg-orange-600' },
            { icon: FileText, label: 'Evidence Pack', color: 'bg-blue-600' },
            { icon: AlertTriangle, label: 'Risk Assessment', color: 'bg-red-600' },
            { icon: CheckCircle, label: 'Ethics Review', color: 'bg-green-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
