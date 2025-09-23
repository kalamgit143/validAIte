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

const Dashboard: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('cio');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const userRoles = [
    {
      id: 'cio',
      name: 'CIO/CDO',
      title: 'Chief Information Officer',
      description: 'Strategic AI governance and business impact oversight',
      icon: Crown,
      color: 'from-blue-600 to-indigo-700',
      focus: ['Business Impact', 'Strategic Alignment', 'ROI', 'Risk Overview']
    },
    {
      id: 'ciso',
      name: 'CISO',
      title: 'Chief Information Security Officer',
      description: 'AI security, risk management, and threat mitigation',
      icon: Shield,
      color: 'from-red-600 to-pink-700',
      focus: ['Security Posture', 'Threat Landscape', 'Compliance', 'Incident Response']
    },
    {
      id: 'qa_lead',
      name: 'QA/Engineering Lead',
      title: 'Quality Assurance & Engineering Lead',
      description: 'Technical quality, testing coverage, and system reliability',
      icon: Code,
      color: 'from-green-600 to-emerald-700',
      focus: ['Quality Metrics', 'Test Coverage', 'Performance', 'Technical Debt']
    },
    {
      id: 'compliance',
      name: 'Compliance Officer',
      title: 'Compliance & Risk Officer',
      description: 'Regulatory compliance, audit readiness, and governance',
      icon: Gavel,
      color: 'from-purple-600 to-violet-700',
      focus: ['Regulatory Status', 'Audit Readiness', 'Policy Compliance', 'Evidence Management']
    },
    {
      id: 'board',
      name: 'Board/Executive',
      title: 'Board of Directors & Executives',
      description: 'High-level oversight, strategic decisions, and fiduciary responsibility',
      icon: Building,
      color: 'from-gray-700 to-slate-800',
      focus: ['Executive Summary', 'Strategic Risks', 'Competitive Position', 'Stakeholder Impact']
    }
  ];

  const dashboardData = {
    cio: {
      title: 'AI Governance Executive Dashboard',
      subtitle: 'Strategic oversight of AI initiatives and business impact',
      keyMetrics: [
        {
          title: 'AI ROI',
          value: '+247%',
          change: '+23%',
          trend: 'up' as const,
          icon: DollarSign,
          color: 'green',
          description: 'Return on AI investment across portfolio'
        },
        {
          title: 'Business Value Created',
          value: '$12.4M',
          change: '+$2.1M',
          trend: 'up' as const,
          icon: TrendingUp,
          color: 'blue',
          description: 'Quantified business value from AI initiatives'
        },
        {
          title: 'Strategic Risk Score',
          value: '7.2/10',
          change: '-0.3',
          trend: 'up' as const,
          icon: Target,
          color: 'yellow',
          description: 'Overall strategic risk assessment'
        },
        {
          title: 'AI Maturity Level',
          value: 'Level 4',
          change: '+1 Level',
          trend: 'up' as const,
          icon: Award,
          color: 'purple',
          description: 'Organizational AI maturity (NIST Scale)'
        }
      ],
      insights: [
        {
          type: 'success',
          title: 'Healthcare AI Delivers 40% Error Reduction',
          description: 'Triage assistant exceeds performance targets, generating $2.4M annual savings',
          action: 'View Healthcare Dashboard',
          priority: 'high'
        },
        {
          type: 'opportunity',
          title: 'Financial AI Ready for Scale',
          description: 'Lending copilot shows 95% fairness score, ready for enterprise deployment',
          action: 'Review Deployment Plan',
          priority: 'medium'
        },
        {
          type: 'attention',
          title: 'EU AI Act Compliance at 82%',
          description: '3 high-risk systems require conformity assessment completion by Q2',
          action: 'Review Compliance Timeline',
          priority: 'high'
        }
      ],
      portfolioOverview: {
        totalApplications: 8,
        productionReady: 5,
        highRiskSystems: 3,
        complianceRate: 87,
        trustScoreAvg: 92.3
      }
    },
    ciso: {
      title: 'AI Security & Risk Dashboard',
      subtitle: 'Comprehensive security posture and threat landscape monitoring',
      keyMetrics: [
        {
          title: 'Security Incidents',
          value: '0',
          change: '-3',
          trend: 'up' as const,
          icon: Shield,
          color: 'green',
          description: 'AI-related security incidents this month'
        },
        {
          title: 'Threat Detection Rate',
          value: '99.7%',
          change: '+0.2%',
          trend: 'up' as const,
          icon: Eye,
          color: 'blue',
          description: 'Automated threat detection effectiveness'
        },
        {
          title: 'Critical Vulnerabilities',
          value: '2',
          change: '-1',
          trend: 'up' as const,
          icon: AlertTriangle,
          color: 'red',
          description: 'Open critical security vulnerabilities'
        },
        {
          title: 'Compliance Score',
          value: '94%',
          change: '+3%',
          trend: 'up' as const,
          icon: CheckCircle,
          color: 'purple',
          description: 'Overall security compliance rating'
        }
      ],
      insights: [
        {
          type: 'critical',
          title: 'Prompt Injection Attempts Detected',
          description: '12 sophisticated prompt injection attempts blocked in last 24h',
          action: 'Review Security Logs',
          priority: 'critical'
        },
        {
          type: 'warning',
          title: 'Model Theft Protection Update Required',
          description: 'New attack vectors identified, security controls need updating',
          action: 'Update Security Controls',
          priority: 'high'
        },
        {
          type: 'info',
          title: 'Security Audit Scheduled',
          description: 'External security audit scheduled for Q2 2024',
          action: 'Prepare Audit Materials',
          priority: 'medium'
        }
      ],
      securityOverview: {
        threatsBlocked: 247,
        vulnerabilitiesPatched: 15,
        securityScore: 94,
        incidentResponseTime: '4.2min',
        complianceFrameworks: 6
      }
    },
    qa_lead: {
      title: 'AI Quality & Engineering Dashboard',
      subtitle: 'Technical quality metrics, testing coverage, and system reliability',
      keyMetrics: [
        {
          title: 'Test Coverage',
          value: '94.2%',
          change: '+2.1%',
          trend: 'up' as const,
          icon: TestTube,
          color: 'green',
          description: 'Automated test coverage across AI systems'
        },
        {
          title: 'Quality Score',
          value: '96.8%',
          change: '+1.3%',
          trend: 'up' as const,
          icon: Target,
          color: 'blue',
          description: 'Average quality score across all models'
        },
        {
          title: 'Technical Debt',
          value: '12 hrs',
          change: '-8 hrs',
          trend: 'up' as const,
          icon: Code,
          color: 'yellow',
          description: 'Estimated technical debt in AI systems'
        },
        {
          title: 'System Reliability',
          value: '99.95%',
          change: '+0.05%',
          trend: 'up' as const,
          icon: Activity,
          color: 'purple',
          description: 'Overall system uptime and reliability'
        }
      ],
      insights: [
        {
          type: 'success',
          title: 'TEVV Automation Suite Deployed',
          description: 'Automated testing pipeline reduces manual effort by 75%',
          action: 'View TEVV Dashboard',
          priority: 'medium'
        },
        {
          type: 'attention',
          title: 'Model Drift Detected',
          description: 'Content Generator showing 15% performance drift, retraining recommended',
          action: 'Review Drift Analysis',
          priority: 'high'
        },
        {
          type: 'info',
          title: 'New Testing Framework Available',
          description: 'Enhanced bias testing framework ready for integration',
          action: 'Evaluate Framework',
          priority: 'low'
        }
      ],
      engineeringOverview: {
        activeTests: 156,
        passRate: 94.2,
        avgBuildTime: '12.3min',
        codeQuality: 'A+',
        automationCoverage: 87
      }
    },
    compliance: {
      title: 'Regulatory Compliance Dashboard',
      subtitle: 'Compliance status, audit readiness, and regulatory alignment',
      keyMetrics: [
        {
          title: 'Compliance Rate',
          value: '87%',
          change: '+5%',
          trend: 'up' as const,
          icon: CheckCircle,
          color: 'green',
          description: 'Overall regulatory compliance score'
        },
        {
          title: 'Audit Readiness',
          value: '92%',
          change: '+8%',
          trend: 'up' as const,
          icon: FileText,
          color: 'blue',
          description: 'Audit preparation completeness'
        },
        {
          title: 'Policy Violations',
          value: '3',
          change: '-2',
          trend: 'up' as const,
          icon: AlertTriangle,
          color: 'red',
          description: 'Active policy violations requiring attention'
        },
        {
          title: 'Evidence Completeness',
          value: '89%',
          change: '+12%',
          trend: 'up' as const,
          icon: Database,
          color: 'purple',
          description: 'Compliance evidence documentation'
        }
      ],
      insights: [
        {
          type: 'urgent',
          title: 'EU AI Act Deadline Approaching',
          description: 'High-risk system conformity assessment due in 45 days',
          action: 'Accelerate Assessment',
          priority: 'critical'
        },
        {
          type: 'success',
          title: 'GDPR Audit Passed',
          description: 'Annual GDPR compliance audit completed with zero findings',
          action: 'View Audit Report',
          priority: 'low'
        },
        {
          type: 'attention',
          title: 'New Regulatory Requirements',
          description: 'Updated NIST AI RMF guidelines require policy updates',
          action: 'Review Requirements',
          priority: 'medium'
        }
      ],
      complianceOverview: {
        activeFrameworks: 6,
        completedAudits: 12,
        pendingActions: 7,
        riskScore: 7.2,
        evidenceDocuments: 247
      }
    },
    board: {
      title: 'Executive AI Governance Summary',
      subtitle: 'Strategic oversight for board-level decision making',
      keyMetrics: [
        {
          title: 'AI Business Impact',
          value: '$12.4M',
          change: '+$2.1M',
          trend: 'up' as const,
          icon: DollarSign,
          color: 'green',
          description: 'Total quantified business value from AI'
        },
        {
          title: 'Strategic Risk Level',
          value: 'Medium',
          change: 'Stable',
          trend: 'up' as const,
          icon: Target,
          color: 'yellow',
          description: 'Overall strategic risk assessment'
        },
        {
          title: 'Regulatory Readiness',
          value: '87%',
          change: '+5%',
          trend: 'up' as const,
          icon: Scale,
          color: 'blue',
          description: 'Readiness for regulatory compliance'
        },
        {
          title: 'Stakeholder Trust',
          value: '4.7/5',
          change: '+0.2',
          trend: 'up' as const,
          icon: Heart,
          color: 'purple',
          description: 'Stakeholder confidence in AI governance'
        }
      ],
      insights: [
        {
          type: 'strategic',
          title: 'AI Competitive Advantage Established',
          description: 'Healthcare AI delivers 40% better outcomes than industry average',
          action: 'Strategic Planning Session',
          priority: 'high'
        },
        {
          type: 'risk',
          title: 'Regulatory Landscape Evolving',
          description: 'EU AI Act implementation requires $500K investment in Q2',
          action: 'Budget Approval Required',
          priority: 'critical'
        },
        {
          type: 'opportunity',
          title: 'Market Expansion Opportunity',
          description: 'Trust metrics enable expansion into regulated markets',
          action: 'Market Analysis Review',
          priority: 'medium'
        }
      ],
      executiveOverview: {
        aiInitiatives: 8,
        marketPosition: 'Leading',
        regulatoryStatus: 'On Track',
        stakeholderSentiment: 'Positive',
        competitiveAdvantage: 'Strong'
      }
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

  const renderRoleSpecificContent = () => {
    switch (selectedRole) {
      case 'cio':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Portfolio Performance */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Portfolio Performance</h3>
              <div className="space-y-4">
                {[
                  { name: 'Healthcare Triage', value: '$2.4M', impact: 'Cost Savings', status: 'exceeding' },
                  { name: 'Financial Lending', value: '67%', impact: 'Bias Reduction', status: 'on-track' },
                  { name: 'Enterprise Copilot', value: '35%', impact: 'Productivity Gain', status: 'on-track' },
                  { name: 'Government Services', value: '4.8/5', impact: 'Citizen Trust', status: 'exceeding' }
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{app.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{app.impact}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{app.value}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        app.status === 'exceeding' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Risk Heatmap */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strategic Risk Heatmap</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { risk: 'Regulatory', level: 'high', impact: 'high' },
                  { risk: 'Competitive', level: 'medium', impact: 'high' },
                  { risk: 'Technical', level: 'low', impact: 'medium' },
                  { risk: 'Reputational', level: 'medium', impact: 'high' },
                  { risk: 'Financial', level: 'low', impact: 'medium' },
                  { risk: 'Operational', level: 'medium', impact: 'medium' }
                ].map((risk, index) => (
                  <div key={index} className={`p-3 rounded-lg text-center text-sm font-medium ${
                    risk.level === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {risk.risk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ciso':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Threat Landscape */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Threat Landscape (24h)</h3>
              <div className="space-y-4">
                {[
                  { threat: 'Prompt Injection', attempts: 12, blocked: 12, severity: 'high' },
                  { threat: 'Model Theft', attempts: 3, blocked: 3, severity: 'critical' },
                  { threat: 'Data Poisoning', attempts: 1, blocked: 1, severity: 'medium' },
                  { threat: 'Adversarial Input', attempts: 8, blocked: 7, severity: 'medium' }
                ].map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{threat.threat}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{threat.attempts} attempts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">{threat.blocked}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        threat.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {threat.severity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Controls Status */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Controls Status</h3>
              <div className="space-y-3">
                {[
                  { control: 'Input Validation', status: 'active', effectiveness: 98 },
                  { control: 'Output Filtering', status: 'active', effectiveness: 96 },
                  { control: 'Access Control', status: 'active', effectiveness: 99 },
                  { control: 'Audit Logging', status: 'active', effectiveness: 100 },
                  { control: 'Encryption', status: 'active', effectiveness: 100 }
                ].map((control, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{control.control}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${control.effectiveness}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{control.effectiveness}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'qa_lead':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Execution Status */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Test Executions</h3>
              <div className="space-y-4">
                {[
                  { suite: 'Healthcare TEVV Suite', progress: 85, tests: 247, status: 'running' },
                  { suite: 'Financial Security Tests', progress: 100, tests: 156, status: 'completed' },
                  { suite: 'Enterprise Performance', progress: 60, tests: 89, status: 'running' },
                  { suite: 'Government Robustness', progress: 45, tests: 134, status: 'running' }
                ].map((suite, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{suite.suite}</div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        suite.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {suite.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{suite.tests} tests</span>
                      <span>{suite.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${suite.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Trends */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quality Trends</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Code Quality', current: 96.8, target: 95, trend: '+1.2%' },
                  { metric: 'Test Coverage', current: 94.2, target: 90, trend: '+2.1%' },
                  { metric: 'Bug Density', current: 0.02, target: 0.05, trend: '-0.01' },
                  { metric: 'Performance Score', current: 92.1, target: 90, trend: '+0.8%' }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{metric.metric}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Target: {metric.target}{metric.metric === 'Bug Density' ? '' : '%'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {metric.current}{metric.metric === 'Bug Density' ? '' : '%'}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">{metric.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regulatory Timeline */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {[
                  { deadline: 'EU AI Act Conformity', date: '2024-03-15', days: 45, status: 'urgent' },
                  { deadline: 'GDPR Annual Review', date: '2024-04-01', days: 62, status: 'upcoming' },
                  { deadline: 'SOC 2 Audit', date: '2024-05-15', days: 106, status: 'planned' },
                  { deadline: 'NIST RMF Assessment', date: '2024-06-01', days: 123, status: 'planned' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.deadline}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(item.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{item.days}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        item.status === 'urgent' ? 'bg-red-100 text-red-800' :
                        item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.days} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Framework Status */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Framework Compliance</h3>
              <div className="space-y-3">
                {[
                  { framework: 'EU AI Act', compliance: 82, trend: '+5%' },
                  { framework: 'NIST RMF', compliance: 94, trend: '+2%' },
                  { framework: 'GDPR', compliance: 97, trend: '+1%' },
                  { framework: 'ISO 27001', compliance: 91, trend: '+3%' }
                ].map((framework, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{framework.framework}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            framework.compliance >= 90 ? 'bg-green-500' :
                            framework.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${framework.compliance}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{framework.compliance}%</span>
                      <span className="text-sm text-green-600 dark:text-green-400">{framework.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'board':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Position */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Market Position</h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Leading</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Market Position</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">Top 5%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Trust Score Ranking</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">98.5%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Regulatory Readiness</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stakeholder Sentiment */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stakeholder Sentiment</h3>
              <div className="space-y-4">
                {[
                  { stakeholder: 'Customers', sentiment: 4.8, change: '+0.2' },
                  { stakeholder: 'Employees', sentiment: 4.6, change: '+0.1' },
                  { stakeholder: 'Regulators', sentiment: 4.4, change: '+0.3' },
                  { stakeholder: 'Investors', sentiment: 4.7, change: '+0.1' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.stakeholder}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${
                            i < Math.floor(item.sentiment) ? 'bg-yellow-400' : 'bg-gray-300'
                          }`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.sentiment}</span>
                      <span className="text-sm text-green-600 dark:text-green-400">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Selector Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Governance Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Role-based insights for AI governance and oversight</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Header */}
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
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">
              {selectedRole === 'cio' ? '92.3%' :
               selectedRole === 'ciso' ? '94%' :
               selectedRole === 'qa_lead' ? '96.8%' :
               selectedRole === 'compliance' ? '87%' : '4.7/5'}
            </div>
            <div className="text-white/80 text-sm">
              {selectedRole === 'board' ? 'Stakeholder Trust' : 'Overall Score'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentDashboard.keyMetrics.map((metric, index) => (
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none pr-10 min-w-48"
            >
              {userRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name} - {role.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Crown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Role-Specific Content */}
      {renderRoleSpecificContent()}

      {/* Key Insights */}
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedRole === 'cio' && [
            { icon: Target, label: 'Review AI Strategy', color: 'bg-blue-600' },
            { icon: DollarSign, label: 'Budget Planning', color: 'bg-green-600' },
            { icon: Users, label: 'Stakeholder Report', color: 'bg-purple-600' },
            { icon: BarChart3, label: 'Portfolio Analysis', color: 'bg-indigo-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'ciso' && [
            { icon: Shield, label: 'Security Review', color: 'bg-red-600' },
            { icon: AlertTriangle, label: 'Threat Analysis', color: 'bg-orange-600' },
            { icon: Lock, label: 'Access Control', color: 'bg-gray-600' },
            { icon: Eye, label: 'Incident Response', color: 'bg-pink-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'qa_lead' && [
            { icon: TestTube, label: 'Run Tests', color: 'bg-green-600' },
            { icon: Code, label: 'Code Review', color: 'bg-blue-600' },
            { icon: BarChart3, label: 'Quality Report', color: 'bg-purple-600' },
            { icon: Settings, label: 'Test Config', color: 'bg-gray-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'compliance' && [
            { icon: FileText, label: 'Audit Report', color: 'bg-purple-600' },
            { icon: Scale, label: 'Policy Review', color: 'bg-indigo-600' },
            { icon: CheckCircle, label: 'Evidence Pack', color: 'bg-green-600' },
            { icon: Calendar, label: 'Schedule Audit', color: 'bg-blue-600' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}>
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {selectedRole === 'board' && [
            { icon: TrendingUp, label: 'Strategic Review', color: 'bg-blue-600' },
            { icon: Globe, label: 'Market Analysis', color: 'bg-green-600' },
            { icon: Users, label: 'Stakeholder Report', color: 'bg-purple-600' },
            { icon: Award, label: 'Competitive Position', color: 'bg-indigo-600' }
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