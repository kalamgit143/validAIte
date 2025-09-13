import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Download, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  Target,
  Globe,
  Users,
  Settings,
  Archive,
  Mail,
  Share2,
  Crown,
  Award,
  Stamp,
  FileCheck,
  Building,
  Scale,
  Gavel,
  BookOpen,
  Briefcase,
  Lock,
  Unlock,
  Database,
  Network,
  Activity,
  TrendingUp,
  DollarSign,
  Clock3,
  MapPin,
  Flag
} from 'lucide-react';

const ComplianceReporting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('evidence_packs');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRiskRegister, setSelectedRiskRegister] = useState('all');
  const [showGovernanceModal, setShowGovernanceModal] = useState(false);

  const evidencePacks = [
    {
      id: 'pack_001',
      name: 'Healthcare Triage - EU AI Act Evidence Package',
      framework: 'EU AI Act',
      version: '2024.1',
      status: 'complete',
      generatedAt: '2024-01-15T14:30:00Z',
      validUntil: '2025-01-15T14:30:00Z',
      applications: ['Healthcare Triage Assistant'],
      riskRegister: 'Healthcare Triage Assistant',
      riskClass: 'High Risk',
      governanceApproval: {
        cio: { approved: true, approver: 'Sarah Chen', timestamp: '2024-01-15T10:00:00Z' },
        ciso: { approved: true, approver: 'Alex Kim', timestamp: '2024-01-15T11:30:00Z' },
        compliance: { approved: true, approver: 'Emily Davis', timestamp: '2024-01-15T13:00:00Z' },
        medical_director: { approved: true, approver: 'Dr. Michael Rodriguez', timestamp: '2024-01-15T14:00:00Z' }
      },
      ceMarking: {
        eligible: true,
        certificate: 'CE-HEALTH-2024-001',
        notifiedBody: 'TÜV SÜD',
        validUntil: '2027-01-15'
      },
      components: [
        { name: 'Risk Classification & Assessment', status: 'included', size: '3.2 MB', riskTraceability: ['RISK-HEALTH-001', 'RISK-BIAS-002'] },
        { name: 'Conformity Assessment Report', status: 'included', size: '4.8 MB', riskTraceability: ['RISK-COMP-001'] },
        { name: 'Technical Documentation Package', status: 'included', size: '6.1 MB', riskTraceability: ['RISK-TECH-001'] },
        { name: 'Quality Management System', status: 'included', size: '2.9 MB', riskTraceability: ['RISK-QMS-001'] },
        { name: 'Post-Market Monitoring Plan', status: 'included', size: '1.7 MB', riskTraceability: ['RISK-MONITOR-001'] },
        { name: 'Human Oversight Documentation', status: 'included', size: '2.3 MB', riskTraceability: ['RISK-HUMAN-001'] },
        { name: 'Transparency & Explainability', status: 'included', size: '3.4 MB', riskTraceability: ['RISK-TRANS-001'] },
        { name: 'Data Governance Evidence', status: 'included', size: '2.8 MB', riskTraceability: ['RISK-DATA-001'] }
      ],
      compliance: 96,
      auditTrail: 'Complete',
      downloadCount: 18,
      regulatorySubmission: {
        submitted: true,
        submissionId: 'EU-DB-2024-HEALTH-001',
        submittedTo: 'EU AI Act Database',
        submissionDate: '2024-01-15T16:00:00Z'
      }
    },
    {
      id: 'pack_002',
      name: 'Financial Lending - NIST RMF + Fair Lending Evidence',
      framework: 'NIST RMF + ECOA',
      version: '1.2',
      status: 'in_progress',
      progress: 78,
      applications: ['Financial Lending Copilot'],
      riskRegister: 'Financial Lending Copilot',
      riskClass: 'High Risk',
      governanceApproval: {
        cio: { approved: true, approver: 'Sarah Chen', timestamp: '2024-01-14T15:00:00Z' },
        ciso: { approved: true, approver: 'Alex Kim', timestamp: '2024-01-14T16:30:00Z' },
        compliance: { approved: false, approver: 'Pending Emily Davis Review', timestamp: null },
        cfo: { approved: false, approver: 'Pending CFO Review', timestamp: null }
      },
      components: [
        { name: 'NIST RMF Risk Assessment', status: 'included', size: '4.1 MB', riskTraceability: ['RISK-FIN-001', 'RISK-BIAS-001'] },
        { name: 'Fair Lending Compliance Report', status: 'included', size: '3.8 MB', riskTraceability: ['RISK-FAIR-001'] },
        { name: 'ECOA Compliance Documentation', status: 'in_progress', size: '2.3 MB', riskTraceability: ['RISK-ECOA-001'] },
        { name: 'Algorithmic Impact Assessment', status: 'in_progress', size: '1.9 MB', riskTraceability: ['RISK-ALGO-001'] },
        { name: 'Model Risk Management', status: 'pending', size: '0 MB', riskTraceability: ['RISK-MODEL-001'] },
        { name: 'Governance & Oversight Evidence', status: 'pending', size: '0 MB', riskTraceability: ['RISK-GOV-001'] }
      ],
      compliance: 78,
      auditTrail: 'Partial',
      regulatorySubmission: {
        submitted: false,
        targetSubmission: 'Federal Reserve + OCC',
        estimatedSubmission: '2024-02-01T00:00:00Z'
      }
    },
    {
      id: 'pack_003',
      name: 'Enterprise Copilot - ISO 27001 + SOC 2 Evidence',
      framework: 'ISO 27001 + SOC 2',
      version: '1.3',
      status: 'complete',
      generatedAt: '2024-01-13T11:00:00Z',
      validUntil: '2025-01-13T11:00:00Z',
      applications: ['SAP Enterprise Copilot'],
      riskRegister: 'SAP Enterprise Copilot',
      riskClass: 'Medium Risk',
      governanceApproval: {
        cio: { approved: true, approver: 'Sarah Chen', timestamp: '2024-01-13T09:00:00Z' },
        ciso: { approved: true, approver: 'Alex Kim', timestamp: '2024-01-13T10:00:00Z' },
        compliance: { approved: true, approver: 'Emily Davis', timestamp: '2024-01-13T10:30:00Z' }
      },
      components: [
        { name: 'ISO 27001 Security Controls', status: 'included', size: '3.8 MB', riskTraceability: ['RISK-SEC-001', 'RISK-DATA-001'] },
        { name: 'SOC 2 Type II Report', status: 'included', size: '4.2 MB', riskTraceability: ['RISK-SOC-001'] },
        { name: 'Enterprise Risk Assessment', status: 'included', size: '2.9 MB', riskTraceability: ['RISK-ENT-001'] },
        { name: 'Data Protection Impact Assessment', status: 'included', size: '2.1 MB', riskTraceability: ['RISK-GDPR-001'] },
        { name: 'Business Continuity Plan', status: 'included', size: '1.8 MB', riskTraceability: ['RISK-BCP-001'] }
      ],
      compliance: 94,
      auditTrail: 'Complete',
      downloadCount: 12,
      certifications: [
        { type: 'ISO 27001', certificate: 'ISO-27001-2024-ENT', validUntil: '2027-01-13' },
        { type: 'SOC 2 Type II', certificate: 'SOC2-2024-ENT', validUntil: '2025-01-13' }
      ]
    },
    {
      id: 'pack_004',
      name: 'Government Services - FedRAMP + NIST Evidence',
      framework: 'FedRAMP + NIST RMF',
      version: '1.0',
      status: 'complete',
      generatedAt: '2024-01-14T09:00:00Z',
      validUntil: '2027-01-14T09:00:00Z',
      applications: ['Government Citizen Services'],
      riskRegister: 'Government Citizen Services',
      riskClass: 'High Risk',
      governanceApproval: {
        cio: { approved: true, approver: 'Sarah Chen', timestamp: '2024-01-14T08:00:00Z' },
        ciso: { approved: true, approver: 'Alex Kim', timestamp: '2024-01-14T08:30:00Z' },
        compliance: { approved: true, approver: 'Emily Davis', timestamp: '2024-01-14T09:00:00Z' }
      },
      fedrampAuthorization: {
        level: 'Moderate',
        authorizationDate: '2024-01-14T09:00:00Z',
        authorizingOfficial: 'Federal CIO',
        pato: 'P-ATO-GOV-2024-001'
      },
      components: [
        { name: 'FedRAMP Security Package', status: 'included', size: '8.2 MB', riskTraceability: ['RISK-GOV-001', 'RISK-FED-001'] },
        { name: 'NIST RMF Implementation', status: 'included', size: '5.1 MB', riskTraceability: ['RISK-NIST-001'] },
        { name: 'Continuous Monitoring Plan', status: 'included', size: '3.4 MB', riskTraceability: ['RISK-MONITOR-001'] },
        { name: 'Incident Response Procedures', status: 'included', size: '2.7 MB', riskTraceability: ['RISK-IR-001'] },
        { name: 'Public Trust Impact Assessment', status: 'included', size: '2.9 MB', riskTraceability: ['RISK-TRUST-001'] }
      ],
      compliance: 92,
      auditTrail: 'Complete',
      downloadCount: 6
    },
    {
      id: 'pack_005',
      name: 'Retail Brand Safety - Brand Protection Evidence',
      framework: 'Brand Safety + GDPR',
      version: '1.1',
      status: 'complete',
      generatedAt: '2024-01-12T16:00:00Z',
      validUntil: '2025-01-12T16:00:00Z',
      applications: ['Retail Brand Safety Assistant'],
      riskRegister: 'Retail Brand Safety Assistant',
      riskClass: 'Medium Risk',
      governanceApproval: {
        cio: { approved: true, approver: 'Sarah Chen', timestamp: '2024-01-12T14:00:00Z' },
        cmo: { approved: true, approver: 'Marketing Director', timestamp: '2024-01-12T15:00:00Z' },
        compliance: { approved: true, approver: 'Emily Davis', timestamp: '2024-01-12T15:30:00Z' }
      },
      components: [
        { name: 'Brand Safety Risk Assessment', status: 'included', size: '2.1 MB', riskTraceability: ['RISK-BRAND-001'] },
        { name: 'Content Moderation Evidence', status: 'included', size: '3.7 MB', riskTraceability: ['RISK-CONTENT-001'] },
        { name: 'GDPR Compliance Documentation', status: 'included', size: '2.4 MB', riskTraceability: ['RISK-GDPR-001'] },
        { name: 'Customer Trust Metrics', status: 'included', size: '1.9 MB', riskTraceability: ['RISK-TRUST-001'] },
        { name: 'Reputation Management Plan', status: 'included', size: '1.6 MB', riskTraceability: ['RISK-REP-001'] }
      ],
      compliance: 95,
      auditTrail: 'Complete',
      downloadCount: 9,
      brandSafetyCertification: {
        certified: true,
        certificate: 'BRAND-SAFE-2024-001',
        certifyingBody: 'Brand Safety Institute'
      }
    }
  ];

  const complianceMetrics = [
    {
      name: 'Evidence Packs',
      value: evidencePacks.length,
      change: '+3',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Governance Approval Rate',
      value: '94%',
      change: '+8%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Regulatory Submissions',
      value: evidencePacks.filter(p => p.regulatorySubmission?.submitted).length,
      change: '+2',
      trend: 'up',
      color: 'purple'
    },
    {
      name: 'CE Marking Eligible',
      value: evidencePacks.filter(p => p.ceMarking?.eligible).length,
      change: '+1',
      trend: 'up',
      color: 'yellow'
    }
  ];

  const governanceWorkflows = [
    {
      id: 'workflow_001',
      name: 'Healthcare AI Governance Workflow',
      description: 'Medical AI deployment approval process',
      approvalSteps: [
        { step: 1, role: 'QA Lead', action: 'Risk assessment completion', status: 'completed', approver: 'Jordan Smith', timestamp: '2024-01-15T08:00:00Z' },
        { step: 2, role: 'AI Safety Officer', action: 'Safety review & bias assessment', status: 'completed', approver: 'Dr. Sarah Chen', timestamp: '2024-01-15T09:30:00Z' },
        { step: 3, role: 'Medical Director', action: 'Clinical validation & ethics review', status: 'completed', approver: 'Dr. Michael Rodriguez', timestamp: '2024-01-15T11:00:00Z' },
        { step: 4, role: 'CISO', action: 'Security & data protection approval', status: 'completed', approver: 'Alex Kim', timestamp: '2024-01-15T12:00:00Z' },
        { step: 5, role: 'Compliance Officer', action: 'Regulatory compliance validation', status: 'completed', approver: 'Emily Davis', timestamp: '2024-01-15T13:00:00Z' },
        { step: 6, role: 'CIO', action: 'Strategic approval & deployment authorization', status: 'completed', approver: 'Sarah Chen', timestamp: '2024-01-15T14:00:00Z' }
      ],
      digitalSignatures: {
        enabled: true,
        signatureHash: 'SHA256:abc123def456...',
        timestampAuthority: 'DigiCert Timestamp Authority'
      },
      complianceFrameworks: ['EU AI Act', 'HIPAA', 'GDPR', 'Medical Device Regulation']
    },
    {
      id: 'workflow_002',
      name: 'Financial AI Governance Workflow',
      description: 'Fair lending AI approval process',
      approvalSteps: [
        { step: 1, role: 'QA Lead', action: 'Risk assessment & bias testing', status: 'completed', approver: 'Jordan Smith', timestamp: '2024-01-14T10:00:00Z' },
        { step: 2, role: 'Fair Lending Officer', action: 'ECOA compliance review', status: 'completed', approver: 'Fair Lending Expert', timestamp: '2024-01-14T12:00:00Z' },
        { step: 3, role: 'Model Risk Manager', action: 'Model risk assessment', status: 'completed', approver: 'Risk Management', timestamp: '2024-01-14T14:00:00Z' },
        { step: 4, role: 'CISO', action: 'Financial data security review', status: 'completed', approver: 'Alex Kim', timestamp: '2024-01-14T15:00:00Z' },
        { step: 5, role: 'Compliance Officer', action: 'Regulatory framework validation', status: 'in_progress', approver: 'Emily Davis', timestamp: null },
        { step: 6, role: 'CFO', action: 'Financial impact & liability review', status: 'pending', approver: 'CFO', timestamp: null },
        { step: 7, role: 'CIO', action: 'Final deployment authorization', status: 'pending', approver: 'Sarah Chen', timestamp: null }
      ],
      digitalSignatures: {
        enabled: true,
        signatureHash: 'SHA256:def456ghi789...',
        timestampAuthority: 'Federal PKI'
      },
      complianceFrameworks: ['NIST RMF', 'ECOA', 'Fair Credit Reporting Act', 'SOX']
    },
    {
      id: 'workflow_003',
      name: 'Government AI Governance Workflow',
      description: 'Public sector AI deployment approval',
      approvalSteps: [
        { step: 1, role: 'QA Lead', action: 'Public sector risk assessment', status: 'completed', approver: 'Jordan Smith', timestamp: '2024-01-14T08:00:00Z' },
        { step: 2, role: 'Privacy Officer', action: 'Citizen privacy impact assessment', status: 'completed', approver: 'Privacy Officer', timestamp: '2024-01-14T10:00:00Z' },
        { step: 3, role: 'CISO', action: 'FedRAMP security controls validation', status: 'completed', approver: 'Alex Kim', timestamp: '2024-01-14T12:00:00Z' },
        { step: 4, role: 'Public Trust Officer', action: 'Citizen trust & transparency review', status: 'completed', approver: 'Public Trust Officer', timestamp: '2024-01-14T14:00:00Z' },
        { step: 5, role: 'Agency CIO', action: 'Agency-level deployment approval', status: 'completed', approver: 'Agency CIO', timestamp: '2024-01-14T16:00:00Z' }
      ],
      digitalSignatures: {
        enabled: true,
        signatureHash: 'SHA256:ghi789jkl012...',
        timestampAuthority: 'Federal PKI'
      },
      complianceFrameworks: ['FedRAMP', 'NIST RMF', 'Privacy Act', 'Section 508']
    }
  ];

  const riskRegisters = [
    'All Risk Registers',
    'Healthcare Triage Assistant',
    'Financial Lending Copilot',
    'SAP Enterprise Copilot', 
    'Government Citizen Services',
    'Retail Brand Safety Assistant'
  ];

  const regulatorySubmissions = [
    {
      id: 'sub_001',
      name: 'EU AI Act Database Registration',
      framework: 'EU AI Act',
      application: 'Healthcare Triage Assistant',
      submissionId: 'EU-DB-2024-HEALTH-001',
      status: 'submitted',
      submittedAt: '2024-01-15T16:00:00Z',
      acknowledgment: 'ACK-EU-2024-001',
      nextReview: '2024-07-15T00:00:00Z'
    },
    {
      id: 'sub_002', 
      name: 'Federal Reserve Model Risk Notification',
      framework: 'Federal Reserve SR 11-7',
      application: 'Financial Lending Copilot',
      status: 'pending',
      estimatedSubmission: '2024-02-01T00:00:00Z',
      requiredApprovals: ['CFO', 'Chief Risk Officer', 'Compliance Officer']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
      case 'included': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'scheduled':
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <FileCheck className="w-4 h-4" />;
      case 'approved': return <Award className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'NIST RMF': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'EU AI Act': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'ISO/IEC 23053': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'OWASP AI': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'NIST RMF + ECOA': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ISO 27001 + SOC 2': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'FedRAMP + NIST RMF': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400';
      case 'Brand Safety + GDPR': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskClassColor = (riskClass: string) => {
    switch (riskClass) {
      case 'High Risk': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium Risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low Risk': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredEvidencePacks = evidencePacks.filter(pack => 
    selectedRiskRegister === 'all' || pack.riskRegister === selectedRiskRegister
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance Reporting</h2>
          <p className="text-gray-600 dark:text-gray-400">Risk-integrated evidence packs with governance approval workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowGovernanceModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Crown className="w-4 h-4" />
            <span>Governance Workflows</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Evidence Pack</span>
          </button>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
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
                <BarChart3 className="w-4 h-4" />
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
            {['evidence_packs', 'governance_workflows', 'regulatory_submissions'].map(tab => (
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
          {activeTab === 'evidence_packs' && (
            <div className="space-y-6">
              {/* Risk Register Filter */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by Risk Register:
                </label>
                <select
                  value={selectedRiskRegister}
                  onChange={(e) => setSelectedRiskRegister(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {riskRegisters.map(register => (
                    <option key={register} value={register === 'All Risk Registers' ? 'all' : register}>
                      {register}
                    </option>
                  ))}
                </select>
              </div>

              {filteredEvidencePacks.map((pack) => (
                <div key={pack.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{pack.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pack.status)}`}>
                          {getStatusIcon(pack.status)}
                          <span className="capitalize">{pack.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(pack.framework)}`}>
                          {pack.framework}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskClassColor(pack.riskClass)}`}>
                          {pack.riskClass}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          v{pack.version}
                        </span>
                        {pack.ceMarking?.eligible && (
                          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>CE Eligible</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Risk Register</span>
                          <div className="font-medium text-gray-900 dark:text-white">{pack.riskRegister}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Compliance</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {pack.compliance || pack.estimatedCompliance}%
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {pack.status === 'complete' ? 'Generated' : pack.status === 'scheduled' ? 'Scheduled' : 'Progress'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {pack.generatedAt 
                              ? new Date(pack.generatedAt).toLocaleDateString()
                              : pack.scheduledFor
                              ? new Date(pack.scheduledFor).toLocaleDateString()
                              : `${pack.progress}%`
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Applications</span>
                          <div className="font-medium text-gray-900 dark:text-white">{pack.applications.length} apps</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Downloads</span>
                          <div className="font-medium text-gray-900 dark:text-white">{pack.downloadCount || 0}</div>
                        </div>
                      </div>

                      {/* Governance Approval Status */}
                      {pack.governanceApproval && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Governance Approval Status</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(pack.governanceApproval).map(([role, approval]: [string, any]) => (
                              <div key={role} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  approval.approved ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}>
                                  {approval.approved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                </div>
                                <div>
                                  <div className="text-xs font-medium text-gray-900 dark:text-white">{role.toUpperCase()}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">{approval.approver}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Regulatory Certifications */}
                      {(pack.ceMarking || pack.fedrampAuthorization || pack.certifications || pack.brandSafetyCertification) && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Regulatory Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {pack.ceMarking?.eligible && (
                              <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-lg flex items-center space-x-2">
                                <Award className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">CE Marking</div>
                                  <div>{pack.ceMarking.certificate} • Valid until {new Date(pack.ceMarking.validUntil).toLocaleDateString()}</div>
                                </div>
                              </div>
                            )}
                            {pack.fedrampAuthorization && (
                              <div className="px-3 py-2 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 text-xs rounded-lg flex items-center space-x-2">
                                <Shield className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">FedRAMP {pack.fedrampAuthorization.level}</div>
                                  <div>{pack.fedrampAuthorization.pato}</div>
                                </div>
                              </div>
                            )}
                            {pack.certifications?.map((cert, index) => (
                              <div key={index} className="px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded-lg flex items-center space-x-2">
                                <Stamp className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">{cert.type}</div>
                                  <div>{cert.certificate}</div>
                                </div>
                              </div>
                            ))}
                            {pack.brandSafetyCertification?.certified && (
                              <div className="px-3 py-2 bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 text-xs rounded-lg flex items-center space-x-2">
                                <Shield className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">Brand Safety Certified</div>
                                  <div>{pack.brandSafetyCertification.certificate}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Progress bar for in-progress packs */}
                      {pack.status === 'in_progress' && pack.progress && (
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${pack.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Components */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Evidence Components</h4>
                        <div className="space-y-2">
                          {pack.components.map((component, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                                  {getStatusIcon(component.status)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{component.name}</div>
                                  {component.riskTraceability && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {component.riskTraceability.map((risk: string, riskIndex: number) => (
                                        <span key={riskIndex} className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                                          {risk}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">{component.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Regulatory Submission Status */}
                      {pack.regulatorySubmission && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Regulatory Submission</h4>
                          {pack.regulatorySubmission.submitted ? (
                            <div className="text-sm text-blue-800 dark:text-blue-200">
                              <div>✓ Submitted to {pack.regulatorySubmission.submittedTo}</div>
                              <div>Submission ID: {pack.regulatorySubmission.submissionId}</div>
                              <div>Date: {new Date(pack.regulatorySubmission.submissionDate!).toLocaleDateString()}</div>
                            </div>
                          ) : (
                            <div className="text-sm text-blue-800 dark:text-blue-200">
                              <div>Target: {pack.regulatorySubmission.targetSubmission}</div>
                              <div>Estimated: {new Date(pack.regulatorySubmission.estimatedSubmission!).toLocaleDateString()}</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {pack.applications.map((app, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {pack.status === 'complete' && (
                        <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/40 flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'governance_workflows' && (
            <div className="space-y-4">
              {governanceWorkflows.map((workflow) => (
                <div key={workflow.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                          {getStatusIcon(workflow.status)}
                          <span className="capitalize">{workflow.status}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          {workflow.riskRegister}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{workflow.description}</p>
                      
                      {/* Approval Steps */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Approval Workflow</h4>
                        {workflow.approvalSteps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.status === 'completed' ? 'bg-green-500 text-white' :
                              step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                              'bg-gray-300 text-gray-600'
                            }`}>
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{step.role}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{step.action}</div>
                              {step.timestamp && (
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                  Approved by {step.approver} on {new Date(step.timestamp).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                              {step.status.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Digital Signatures */}
                      {workflow.digitalSignatures && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <strong>Digital Signatures:</strong> {workflow.digitalSignatures.enabled ? 'Enabled' : 'Disabled'}
                            {workflow.digitalSignatures.enabled && (
                              <div className="mt-1 font-mono text-xs">
                                Hash: {workflow.digitalSignatures.signatureHash}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Compliance Frameworks */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {workflow.complianceFrameworks.map((framework, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            {framework}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40">
                        View Workflow
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

          {activeTab === 'regulatory_submissions' && (
            <div className="space-y-4">
              {regulatorySubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{submission.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span className="capitalize">{submission.status}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(submission.framework)}`}>
                          {submission.framework}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Application</span>
                          <div className="font-medium text-gray-900 dark:text-white">{submission.application}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {submission.status === 'submitted' ? 'Submitted' : 'Estimated Submission'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {submission.submittedAt 
                              ? new Date(submission.submittedAt).toLocaleDateString()
                              : submission.estimatedSubmission
                              ? new Date(submission.estimatedSubmission).toLocaleDateString()
                              : 'TBD'
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {submission.submissionId ? 'Submission ID' : 'Required Approvals'}
                          </span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {submission.submissionId || submission.requiredApprovals?.join(', ') || 'N/A'}
                          </div>
                        </div>
                      </div>

                      {submission.acknowledgment && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <strong>Acknowledgment:</strong> {submission.acknowledgment}
                            {submission.nextReview && (
                              <div>Next Review: {new Date(submission.nextReview).toLocaleDateString()}</div>
                            )}
                          </div>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Risk-to-Evidence Traceability Matrix */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Risk-to-Evidence Traceability Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Evidence Component</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Governance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { id: 'RISK-HEALTH-001', description: 'Medical misdiagnosis risk', evidence: 'Risk Classification & Assessment', status: 'included', governance: 'CIO + Medical Director' },
                { id: 'RISK-BIAS-002', description: 'Healthcare bias in triage', evidence: 'Conformity Assessment Report', status: 'included', governance: 'AI Safety + Ethics Board' },
                { id: 'RISK-FIN-001', description: 'Discriminatory lending risk', evidence: 'Fair Lending Compliance Report', status: 'included', governance: 'CFO + Fair Lending Officer' },
                { id: 'RISK-GOV-001', description: 'Public trust degradation', evidence: 'Public Trust Impact Assessment', status: 'included', governance: 'Agency CIO + Public Trust Officer' },
                { id: 'RISK-BRAND-001', description: 'Brand reputation damage', evidence: 'Brand Safety Risk Assessment', status: 'included', governance: 'CMO + Brand Safety Officer' }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.evidence}</td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {getStatusIcon(row.status)}
                      <span>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{row.governance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Evidence Pack Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Evidence Pack</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create risk-integrated compliance evidence package with governance approval
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evidence Pack Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Healthcare AI - EU AI Act Evidence"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Framework *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>EU AI Act</option>
                    <option>NIST RMF</option>
                    <option>ISO 27001</option>
                    <option>FedRAMP</option>
                    <option>SOC 2</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Classification *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>High Risk (Mandatory TEVV)</option>
                    <option>Medium Risk (Enhanced Due Diligence)</option>
                    <option>Low Risk (Standard Compliance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Governance Approval Workflow *
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Healthcare AI Governance Workflow</option>
                  <option>Financial AI Governance Workflow</option>
                  <option>Enterprise AI Governance Workflow</option>
                  <option>Government AI Governance Workflow</option>
                  <option>Custom Governance Workflow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Risk-Integrated Evidence Components
                </label>
                <div className="space-y-2">
                  {[
                    'Risk Classification & Assessment (RISK-xxx-001)',
                    'Conformity Assessment Report (RISK-COMP-001)',
                    'Technical Documentation Package (RISK-TECH-001)',
                    'Quality Management System (RISK-QMS-001)',
                    'Human Oversight Documentation (RISK-HUMAN-001)',
                    'Transparency & Explainability (RISK-TRANS-001)',
                    'Data Governance Evidence (RISK-DATA-001)',
                    'Post-Market Monitoring Plan (RISK-MONITOR-001)'
                  ].map(component => (
                    <label key={component} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{component}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Regulatory Submission Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Auto-submit to EU AI Act Database</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Prepare for Federal Reserve submission</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Enable digital signatures</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reporting Period
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>Custom range</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>PDF Package</option>
                    <option>ZIP Archive</option>
                    <option>JSON Export</option>
                    <option>Excel Workbook</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>High (Regulatory Deadline)</option>
                    <option>Medium (Scheduled Review)</option>
                    <option>Low (Routine Compliance)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Auto-generates: Risk Traceability • Governance Signatures • Regulatory Submissions
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Evidence Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Governance Workflows Modal */}
      {showGovernanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Governance Approval Workflows</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Configure domain-specific governance approval workflows
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {governanceWorkflows.map((workflow) => (
                <div key={workflow.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{workflow.description}</p>
                  
                  <div className="space-y-2">
                    {workflow.approvalSteps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.status === 'completed' ? 'bg-green-500 text-white' :
                          step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}>
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{step.role}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{step.action}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                          {step.status.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Workflows ensure proper governance oversight for compliance
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowGovernanceModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Configure Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceReporting;