import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  Bell,
  Eye,
  RefreshCw,
  Settings,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Brain,
  Users,
  Database,
  BarChart3,
  Target,
  Filter,
  Calendar,
  Phone,
  Mail,
  Slack,
  Webhook,
  Plus,
  Edit,
  Download,
  Search,
  Network,
  Cpu,
  HardDrive,
  Globe,
  Lock,
  Unlock,
  Code,
  FileText,
  Timer,
  Layers,
  GitBranch,
  Server,
  MonitorSpeaker
} from 'lucide-react';
import Chart from './Chart';

const ContinuousMonitoring: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [monitoringStatus, setMonitoringStatus] = useState('active');
  const [activeTab, setActiveTab] = useState('real_time');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Real-time monitoring streams with risk traceability
  const monitoringStreams = [
    {
      id: 'stream_001',
      name: 'Healthcare Triage - Real-time Drift Detection',
      type: 'drift_monitoring',
      status: 'active',
      riskRegister: 'Healthcare Triage Assistant',
      riskTraceability: ['RISK-HEALTH-001', 'RISK-DRIFT-002'],
      lastAlert: '2024-01-15T10:30:00Z',
      alertCount: 3,
      threshold: 0.3,
      currentValue: 0.23,
      applications: ['Healthcare Triage Assistant'],
      monitoringFrequency: '30 seconds',
      alertChannels: ['email', 'slack', 'webhook'],
      escalationPolicy: 'Medical Emergency Protocol',
      businessImpact: 'Patient safety risk - immediate escalation required'
    },
    {
      id: 'stream_002',
      name: 'Financial Lending - Bias Monitoring',
      type: 'bias_monitoring',
      status: 'active',
      riskRegister: 'Financial Lending Copilot',
      riskTraceability: ['RISK-FIN-001', 'RISK-BIAS-001'],
      lastAlert: '2024-01-15T09:15:00Z',
      alertCount: 1,
      threshold: 0.05,
      currentValue: 0.02,
      applications: ['Financial Lending Copilot'],
      monitoringFrequency: '1 minute',
      alertChannels: ['email', 'slack'],
      escalationPolicy: 'Fair Lending Compliance Protocol',
      businessImpact: 'Regulatory compliance risk - legal review required'
    },
    {
      id: 'stream_003',
      name: 'Enterprise Copilot - Safety Guardrail Monitor',
      type: 'safety_monitoring',
      status: 'active',
      riskRegister: 'SAP Enterprise Copilot',
      riskTraceability: ['RISK-ENT-001', 'RISK-SAFETY-003'],
      lastAlert: '2024-01-15T08:45:00Z',
      alertCount: 7,
      threshold: 0.02,
      currentValue: 0.008,
      applications: ['SAP Enterprise Copilot'],
      monitoringFrequency: '15 seconds',
      alertChannels: ['email', 'webhook'],
      escalationPolicy: 'Enterprise Security Protocol',
      businessImpact: 'Data security risk - CISO notification required'
    },
    {
      id: 'stream_004',
      name: 'Government Services - Performance Monitor',
      type: 'performance_monitoring',
      status: 'warning',
      riskRegister: 'Government Citizen Services',
      riskTraceability: ['RISK-GOV-001', 'RISK-PERF-002'],
      lastAlert: '2024-01-15T10:45:00Z',
      alertCount: 2,
      threshold: 3.0,
      currentValue: 3.2,
      applications: ['Government Citizen Services'],
      monitoringFrequency: '1 minute',
      alertChannels: ['email', 'sms'],
      escalationPolicy: 'Public Service Availability Protocol',
      businessImpact: 'Citizen service degradation - public trust impact'
    },
    {
      id: 'stream_005',
      name: 'Retail Brand Safety - Content Monitor',
      type: 'content_monitoring',
      status: 'active',
      riskRegister: 'Retail Brand Safety Assistant',
      riskTraceability: ['RISK-RETAIL-001', 'RISK-BRAND-002'],
      lastAlert: '2024-01-15T07:20:00Z',
      alertCount: 12,
      threshold: 0.01,
      currentValue: 0.003,
      applications: ['Retail Brand Safety Assistant'],
      monitoringFrequency: '10 seconds',
      alertChannels: ['email', 'slack', 'webhook'],
      escalationPolicy: 'Brand Safety Crisis Protocol',
      businessImpact: 'Brand reputation risk - marketing team notification'
    }
  ];

  // Incident response with governance integration
  const incidentResponse = [
    {
      id: 'incident_001',
      title: 'Healthcare Triage - High Bias Detection in Emergency Cases',
      severity: 'critical',
      status: 'investigating',
      detectedAt: '2024-01-15T10:30:00Z',
      affectedApplications: ['Healthcare Triage Assistant'],
      responseTeam: 'Medical AI Safety Team',
      governanceEscalation: 'CIO + Medical Director',
      estimatedResolution: '2024-01-15T12:00:00Z',
      riskRegister: 'Healthcare Triage Assistant',
      riskTraceability: ['RISK-HEALTH-001', 'RISK-BIAS-002'],
      businessImpact: 'Patient safety - potential misdiagnosis risk',
      regulatoryImplications: 'HIPAA compliance review required',
      actions: [
        'Activated emergency medical AI guardrails',
        'Escalated to Medical AI Safety Team',
        'Initiated bias root cause analysis',
        'Notified Medical Director and CIO',
        'Triggered regulatory compliance review'
      ],
      mitigationStrategy: 'Temporary human oversight requirement for high-risk cases'
    },
    {
      id: 'incident_002',
      title: 'Financial Lending - Discriminatory Pattern Alert',
      severity: 'high',
      status: 'resolved',
      detectedAt: '2024-01-15T08:15:00Z',
      resolvedAt: '2024-01-15T09:30:00Z',
      affectedApplications: ['Financial Lending Copilot'],
      responseTeam: 'Fair Lending Compliance Team',
      governanceEscalation: 'CISO + Compliance Officer',
      riskRegister: 'Financial Lending Copilot',
      riskTraceability: ['RISK-FIN-001', 'RISK-BIAS-001'],
      businessImpact: 'Regulatory compliance - potential fair lending violation',
      regulatoryImplications: 'ECOA compliance validation completed',
      resolution: 'Bias threshold adjusted, additional training data incorporated',
      actions: [
        'Identified demographic bias pattern in lending decisions',
        'Temporarily increased human review threshold',
        'Adjusted algorithmic bias detection sensitivity',
        'Incorporated additional diverse training data',
        'Validated compliance with ECOA regulations',
        'Updated bias monitoring thresholds'
      ],
      mitigationStrategy: 'Enhanced bias detection with regulatory compliance validation'
    },
    {
      id: 'incident_003',
      title: 'Enterprise Copilot - Data Leakage Detection',
      severity: 'critical',
      status: 'resolved',
      detectedAt: '2024-01-14T14:20:00Z',
      resolvedAt: '2024-01-14T16:45:00Z',
      affectedApplications: ['SAP Enterprise Copilot'],
      responseTeam: 'Enterprise Security Team',
      governanceEscalation: 'CISO + CIO',
      riskRegister: 'SAP Enterprise Copilot',
      riskTraceability: ['RISK-ENT-001', 'RISK-DATA-003'],
      businessImpact: 'Data security - potential intellectual property exposure',
      regulatoryImplications: 'ISO 27001 incident reporting completed',
      resolution: 'Data access controls strengthened, model retrained with sanitized data',
      actions: [
        'Detected potential sensitive data exposure in responses',
        'Immediately activated data loss prevention protocols',
        'Conducted forensic analysis of affected interactions',
        'Strengthened data access controls and sanitization',
        'Retrained model with properly sanitized dataset',
        'Updated security monitoring thresholds'
      ],
      mitigationStrategy: 'Enhanced data sanitization with real-time PII detection'
    }
  ];

  // Advanced monitoring configuration
  const monitoringConfiguration = {
    realTimeStreams: {
      healthcareTriage: {
        medicalAccuracy: { threshold: 0.95, current: 0.97, status: 'healthy' },
        biasDetection: { threshold: 0.05, current: 0.02, status: 'healthy' },
        patientSafety: { threshold: 0.99, current: 0.98, status: 'warning' },
        responseTime: { threshold: 2.0, current: 1.2, status: 'healthy' }
      },
      financialLending: {
        fairnessScore: { threshold: 0.90, current: 0.94, status: 'healthy' },
        discriminationRisk: { threshold: 0.03, current: 0.01, status: 'healthy' },
        regulatoryCompliance: { threshold: 0.95, current: 0.97, status: 'healthy' },
        decisionAccuracy: { threshold: 0.92, current: 0.95, status: 'healthy' }
      },
      enterpriseCopilot: {
        dataLeakageRisk: { threshold: 0.01, current: 0.003, status: 'healthy' },
        productivityGain: { threshold: 0.25, current: 0.35, status: 'excellent' },
        securityCompliance: { threshold: 0.98, current: 0.99, status: 'healthy' },
        userSatisfaction: { threshold: 4.0, current: 4.6, status: 'excellent' }
      }
    },
    alertingRules: [
      {
        id: 'rule_001',
        name: 'Medical Bias Alert - Healthcare Triage',
        condition: 'bias_score > 0.05 OR accuracy < 0.95',
        severity: 'critical',
        escalation: 'Medical Director + CIO',
        channels: ['email', 'sms', 'slack'],
        businessContext: 'Patient safety risk requiring immediate medical review'
      },
      {
        id: 'rule_002', 
        name: 'Fair Lending Violation - Financial Services',
        condition: 'discrimination_risk > 0.03 OR fairness_score < 0.90',
        severity: 'high',
        escalation: 'Compliance Officer + Legal Team',
        channels: ['email', 'slack'],
        businessContext: 'Regulatory compliance risk requiring legal review'
      },
      {
        id: 'rule_003',
        name: 'Data Security Breach - Enterprise Copilot',
        condition: 'data_leakage_risk > 0.01 OR pii_detected = true',
        severity: 'critical',
        escalation: 'CISO + Security Team',
        channels: ['email', 'sms', 'webhook'],
        businessContext: 'Data security incident requiring immediate containment'
      }
    ]
  };

  const monitoringMetrics = [
    {
      name: 'Active Monitors',
      value: monitoringStreams.filter(s => s.status === 'active').length,
      change: '+2',
      trend: 'up',
      color: 'green',
      description: 'Real-time monitoring streams'
    },
    {
      name: 'Critical Alerts (24h)',
      value: '3',
      change: '+1',
      trend: 'up',
      color: 'red',
      description: 'High-severity incidents requiring governance escalation'
    },
    {
      name: 'MTTR (Mean Time to Resolution)',
      value: '1.2h',
      change: '-15min',
      trend: 'down',
      color: 'blue',
      description: 'Average incident resolution time'
    },
    {
      name: 'System Health Score',
      value: '98.5%',
      change: '+0.2%',
      trend: 'up',
      color: 'purple',
      description: 'Composite health across all monitored applications'
    }
  ];

  // Real-time drift monitoring data
  const driftTrendData = {
    labels: ['10:00', '10:15', '10:30', '10:45', '11:00'],
    datasets: [
      {
        label: 'Healthcare Bias Drift',
        data: [0.02, 0.03, 0.05, 0.04, 0.02],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Financial Fairness Drift',
        data: [0.01, 0.015, 0.02, 0.018, 0.012],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      },
      {
        label: 'Enterprise Security Drift',
        data: [0.003, 0.005, 0.008, 0.006, 0.004],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Governance escalation workflows
  const escalationWorkflows = [
    {
      id: 'workflow_001',
      name: 'Medical Emergency Escalation',
      trigger: 'Healthcare bias > 5% OR accuracy < 95%',
      steps: [
        { step: 1, role: 'AI Safety Team', action: 'Immediate assessment', sla: '5 minutes' },
        { step: 2, role: 'Medical Director', action: 'Clinical review', sla: '15 minutes' },
        { step: 3, role: 'CIO', action: 'System decision', sla: '30 minutes' },
        { step: 4, role: 'Legal/Compliance', action: 'Regulatory notification', sla: '1 hour' }
      ],
      businessContext: 'Patient safety incidents require immediate medical and executive oversight'
    },
    {
      id: 'workflow_002',
      name: 'Financial Compliance Escalation',
      trigger: 'Lending bias > 3% OR fairness < 90%',
      steps: [
        { step: 1, role: 'Compliance Team', action: 'Bias analysis', sla: '10 minutes' },
        { step: 2, role: 'Legal Team', action: 'Regulatory assessment', sla: '30 minutes' },
        { step: 3, role: 'CISO', action: 'Risk evaluation', sla: '45 minutes' },
        { step: 4, role: 'Regulators', action: 'External notification', sla: '2 hours' }
      ],
      businessContext: 'Fair lending violations require immediate compliance and legal review'
    },
    {
      id: 'workflow_003',
      name: 'Enterprise Security Escalation',
      trigger: 'Data leakage > 1% OR PII detected',
      steps: [
        { step: 1, role: 'Security Team', action: 'Threat containment', sla: '2 minutes' },
        { step: 2, role: 'CISO', action: 'Impact assessment', sla: '10 minutes' },
        { step: 3, role: 'CIO', action: 'Business continuity', sla: '20 minutes' },
        { step: 4, role: 'Legal/PR', action: 'External communication', sla: '1 hour' }
      ],
      businessContext: 'Data security incidents require immediate containment and executive oversight'
    }
  ];

  // Infrastructure monitoring
  const infrastructureHealth = [
    {
      component: 'Healthcare AI Inference Cluster',
      status: 'healthy',
      cpu: 68,
      memory: 72,
      network: 45,
      storage: 34,
      instances: 5,
      region: 'us-east-1',
      lastHealthCheck: '2024-01-15T10:47:00Z'
    },
    {
      component: 'Financial AI Processing Nodes',
      status: 'healthy', 
      cpu: 75,
      memory: 68,
      network: 52,
      storage: 41,
      instances: 3,
      region: 'us-west-2',
      lastHealthCheck: '2024-01-15T10:47:00Z'
    },
    {
      component: 'Enterprise Copilot Cluster',
      status: 'warning',
      cpu: 85,
      memory: 89,
      network: 67,
      storage: 78,
      instances: 8,
      region: 'eu-central-1',
      lastHealthCheck: '2024-01-15T10:46:00Z'
    },
    {
      component: 'Government Services Infrastructure',
      status: 'healthy',
      cpu: 62,
      memory: 58,
      network: 38,
      storage: 29,
      instances: 4,
      region: 'us-gov-east-1',
      lastHealthCheck: '2024-01-15T10:47:00Z'
    }
  ];

  // Automated response actions
  const automatedResponses = [
    {
      id: 'auto_001',
      name: 'Healthcare Bias Auto-Mitigation',
      trigger: 'Healthcare bias detection > 5%',
      actions: [
        'Activate human-in-the-loop review for high-risk cases',
        'Increase bias detection sensitivity by 20%',
        'Route ambiguous cases to medical expert panel',
        'Generate immediate bias analysis report'
      ],
      status: 'active',
      lastTriggered: '2024-01-15T10:30:00Z',
      effectivenessScore: 94
    },
    {
      id: 'auto_002',
      name: 'Financial Fair Lending Protection',
      trigger: 'Lending discrimination risk > 3%',
      actions: [
        'Temporarily increase human review threshold to 100%',
        'Generate fair lending compliance report',
        'Notify compliance team and legal counsel',
        'Initiate bias mitigation algorithm adjustment'
      ],
      status: 'active',
      lastTriggered: '2024-01-15T09:15:00Z',
      effectivenessScore: 97
    },
    {
      id: 'auto_003',
      name: 'Enterprise Data Loss Prevention',
      trigger: 'PII detection OR data leakage risk > 1%',
      actions: [
        'Immediately block suspicious responses',
        'Activate enhanced data sanitization',
        'Generate security incident report',
        'Notify CISO and security team'
      ],
      status: 'active',
      lastTriggered: '2024-01-14T14:20:00Z',
      effectivenessScore: 99
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical':
      case 'investigating': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'degraded': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
      case 'investigating': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'slack': return <Slack className="w-4 h-4" />;
      case 'webhook': return <Webhook className="w-4 h-4" />;
      case 'sms': return <Phone className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Continuous Monitoring</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time drift, anomalies, and incident response with governance integration</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusColor(monitoringStatus)}`}>
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Monitoring {monitoringStatus}</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Monitoring Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {monitoringMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{metric.description}</p>
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

      {/* Main Monitoring Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['real_time', 'incidents', 'infrastructure', 'automation'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'real_time' && (
            <div className="space-y-6">
              {/* Real-time Drift Chart */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Risk Monitoring</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1h">Last Hour</option>
                      <option value="6h">Last 6 Hours</option>
                      <option value="24h">Last 24 Hours</option>
                    </select>
                  </div>
                </div>
                <Chart data={driftTrendData} type="line" height="300px" />
              </div>

              {/* Monitoring Streams */}
              <div className="space-y-4">
                {monitoringStreams.map((stream) => (
                  <div key={stream.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{stream.name}</h4>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stream.status)}`}>
                            {getStatusIcon(stream.status)}
                            <span className="capitalize">{stream.status}</span>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {stream.type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Current Value</span>
                            <div className="font-medium text-gray-900 dark:text-white">{stream.currentValue}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Threshold</span>
                            <div className="font-medium text-gray-900 dark:text-white">{stream.threshold}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Alerts (24h)</span>
                            <div className="font-medium text-gray-900 dark:text-white">{stream.alertCount}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Frequency</span>
                            <div className="font-medium text-gray-900 dark:text-white">{stream.monitoringFrequency}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Last Alert</span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {new Date(stream.lastAlert).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>

                        {/* Risk Traceability */}
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Risk Traceability:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {stream.riskTraceability.map((risk, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                                {risk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Business Impact */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                          <div className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Business Impact:</strong> {stream.businessImpact}
                          </div>
                        </div>

                        {/* Alert Channels */}
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Alert Channels:</span>
                          <div className="flex items-center space-x-2">
                            {stream.alertChannels.map((channel, index) => (
                              <div key={index} className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                                {getChannelIcon(channel)}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Escalation: {stream.escalationPolicy}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          {stream.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Status indicator bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          stream.currentValue <= stream.threshold ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((stream.currentValue / stream.threshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-6">
              {/* Governance Escalation Workflows */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Governance Escalation Workflows</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {escalationWorkflows.map((workflow) => (
                    <div key={workflow.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{workflow.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{workflow.businessContext}</p>
                      <div className="space-y-2">
                        {workflow.steps.map((step) => (
                          <div key={step.step} className="flex items-center space-x-2 text-xs">
                            <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{step.role}</div>
                              <div className="text-gray-600 dark:text-gray-400">{step.action} ({step.sla})</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Incidents */}
              <div className="space-y-4">
                {incidentResponse.map((incident) => (
                  <div key={incident.id} className={`border-l-4 p-6 rounded-r-lg ${getSeverityColor(incident.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">{incident.title}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(incident.detectedAt).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Response Team</span>
                            <div className="font-medium text-gray-900 dark:text-white">{incident.responseTeam}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Governance Escalation</span>
                            <div className="font-medium text-gray-900 dark:text-white">{incident.governanceEscalation}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Business Impact</span>
                            <div className="font-medium text-gray-900 dark:text-white">{incident.businessImpact}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {incident.status === 'resolved' ? 'Resolved' : 'ETA'}
                            </span>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {incident.resolvedAt 
                                ? new Date(incident.resolvedAt).toLocaleString()
                                : new Date(incident.estimatedResolution!).toLocaleString()
                              }
                            </div>
                          </div>
                        </div>

                        {/* Risk Traceability */}
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Risk Traceability:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {incident.riskTraceability.map((risk, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                                {risk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Regulatory Implications */}
                        {incident.regulatoryImplications && (
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-3">
                            <div className="text-sm text-yellow-800 dark:text-yellow-200">
                              <strong>Regulatory Implications:</strong> {incident.regulatoryImplications}
                            </div>
                          </div>
                        )}

                        {/* Response Actions */}
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Response Actions:</span>
                          <ul className="mt-2 space-y-1">
                            {incident.actions.map((action, index) => (
                              <li key={index} className="text-sm text-gray-800 dark:text-gray-200 flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mitigation Strategy */}
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <strong>Mitigation Strategy:</strong> {incident.mitigationStrategy}
                          </div>
                        </div>

                        {incident.resolution && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-sm text-blue-800 dark:text-blue-200">
                              <strong>Resolution:</strong> {incident.resolution}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Infrastructure Health Monitoring</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {infrastructureHealth.map((component, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{component.component}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                            {getStatusIcon(component.status)}
                            <span className="capitalize">{component.status}</span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{component.instances} instances</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{component.region}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{component.cpu}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">CPU</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <HardDrive className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{component.memory}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Memory</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Network className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{component.network}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Network</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Database className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{component.storage}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Storage</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Last health check: {new Date(component.lastHealthCheck).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Automated Response Actions</h3>
              
              <div className="space-y-4">
                {automatedResponses.map((response) => (
                  <div key={response.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{response.name}</h4>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.status)}`}>
                            {getStatusIcon(response.status)}
                            <span className="capitalize">{response.status}</span>
                          </div>
                          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {response.effectivenessScore}% effective
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-3">
                          <div className="text-sm text-yellow-800 dark:text-yellow-200">
                            <strong>Trigger:</strong> {response.trigger}
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Automated Actions:</span>
                          <ul className="space-y-1">
                            {response.actions.map((action, index) => (
                              <li key={index} className="text-sm text-gray-800 dark:text-gray-200 flex items-start space-x-2">
                                <Zap className="w-4 h-4 text-blue-500 mt-0.5" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Last triggered: {new Date(response.lastTriggered).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Monitoring Configuration */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Advanced Monitoring Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Detection Sensitivity</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Healthcare bias threshold
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.1"
                  step="0.01"
                  defaultValue="0.05"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-500 dark:text-gray-500">Current: 5%</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Financial fairness threshold
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.1"
                  step="0.01"
                  defaultValue="0.03"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-500 dark:text-gray-500">Current: 3%</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Alert Configuration</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Real-time alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Governance auto-escalation</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Automated mitigation</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Response Teams</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Medical AI Safety Team</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fair Lending Compliance</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Enterprise Security Team</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Government Services Team</span>
                <span className="text-yellow-600 dark:text-yellow-400">On-call</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Brand Safety Team</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Monitor Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Monitoring Stream</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up real-time monitoring with governance integration
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monitor Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Healthcare Bias Monitor"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Register *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
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
                  Monitoring Type *
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Bias Monitoring</option>
                  <option>Drift Detection</option>
                  <option>Safety Monitoring</option>
                  <option>Performance Monitoring</option>
                  <option>Content Monitoring</option>
                  <option>Security Monitoring</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alert Threshold
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.05"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monitoring Frequency
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>10 seconds</option>
                    <option>30 seconds</option>
                    <option>1 minute</option>
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Severity Level
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Alert Channels
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'email', name: 'Email', icon: Mail },
                    { id: 'slack', name: 'Slack', icon: Slack },
                    { id: 'webhook', name: 'Webhook', icon: Webhook },
                    { id: 'sms', name: 'SMS', icon: Phone }
                  ].map(channel => {
                    const Icon = channel.icon;
                    return (
                      <label key={channel.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{channel.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Governance Escalation Policy
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Medical Emergency Protocol</option>
                  <option>Fair Lending Compliance Protocol</option>
                  <option>Enterprise Security Protocol</option>
                  <option>Public Service Availability Protocol</option>
                  <option>Brand Safety Crisis Protocol</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Impact Description
                </label>
                <textarea
                  placeholder="Describe the business impact and required governance response..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Monitor will be integrated with risk register and governance workflows
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Monitor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinuousMonitoring;