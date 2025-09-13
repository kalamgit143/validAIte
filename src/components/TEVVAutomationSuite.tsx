import React, { useState } from 'react';
import { 
  Target, 
  Play, 
  CheckCircle, 
  XCircle,
  Clock,
  Brain,
  Shield,
  Users,
  Database,
  Activity,
  Settings,
  Eye,
  Download,
  Plus,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  BarChart3,
  FileText,
  Zap,
  GitBranch,
  Code,
  Lock,
  Cpu,
  Network,
  DollarSign,
  Timer,
  Layers,
  TestTube,
  Award,
  Link
} from 'lucide-react';

const TEVVAutomationSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState('testing');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRiskRegister, setSelectedRiskRegister] = useState('all');

  const tevvModules = {
    testing: [
      {
        id: 'test_001',
        name: 'Healthcare Triage - Functional Testing',
        description: 'Golden tests, prompt-response validation, medical knowledge grounding checks',
        type: 'functional',
        status: 'running',
        progress: 85,
        testCases: 247,
        passed: 198,
        failed: 12,
        skipped: 37,
        coverage: 94,
        duration: '3h 45m',
        riskTraceability: ['RISK-HEALTH-001', 'RISK-BIAS-002', 'RISK-SAFETY-003'],
        riskRegister: 'Healthcare Triage Assistant',
        testTypes: ['Golden Tests', 'Medical QA Validation', 'RAG Grounding Checks'],
        cicdIntegration: 'Jenkins Pipeline #247',
        automationArchitect: 'DevOps Team Alpha'
      },
      {
        id: 'test_002',
        name: 'Financial Lending - Security Testing',
        description: 'Red-teaming for jailbreaks, prompt injection, model theft, adversarial attacks',
        type: 'security',
        status: 'completed',
        testCases: 156,
        passed: 142,
        failed: 8,
        skipped: 6,
        coverage: 91,
        duration: '2h 30m',
        riskTraceability: ['RISK-FIN-001', 'RISK-SEC-004', 'RISK-BIAS-001'],
        riskRegister: 'Financial Lending Copilot',
        testTypes: ['Prompt Injection Tests', 'Jailbreak Attempts', 'Model Theft Protection'],
        cicdIntegration: 'GitLab CI/CD #156',
        automationArchitect: 'Security Team Beta'
      },
      {
        id: 'test_003',
        name: 'Enterprise Copilot - Non-Functional Testing',
        description: 'Latency, throughput, scalability, cost ceiling validation',
        type: 'non_functional',
        status: 'scheduled',
        scheduledFor: '2024-01-16T09:00:00Z',
        testCases: 89,
        estimatedDuration: '4h 15m',
        riskTraceability: ['RISK-PERF-001', 'RISK-COST-002', 'RISK-SCALE-003'],
        riskRegister: 'SAP Enterprise Copilot',
        testTypes: ['Load Testing', 'Scalability Tests', 'Cost Ceiling Validation'],
        cicdIntegration: 'Azure DevOps #89',
        automationArchitect: 'Platform Engineering'
      },
      {
        id: 'test_004',
        name: 'Government Services - Robustness Testing',
        description: 'Adversarial noise, paraphrase perturbations, edge case handling',
        type: 'robustness',
        status: 'in_progress',
        progress: 60,
        testCases: 134,
        passed: 78,
        failed: 4,
        skipped: 52,
        coverage: 88,
        duration: '2h 10m',
        riskTraceability: ['RISK-GOV-001', 'RISK-ROBUST-002'],
        riskRegister: 'Government Citizen Services',
        testTypes: ['Adversarial Noise', 'Paraphrase Perturbations', 'Edge Cases'],
        cicdIntegration: 'GitHub Actions #134',
        automationArchitect: 'QA Engineering Team'
      }
    ],
    evaluation: [
      {
        id: 'eval_001',
        name: 'Healthcare Domain Benchmark Evaluation',
        description: 'Medical QA benchmarks, clinical decision support validation',
        type: 'domain_benchmark',
        status: 'completed',
        benchmarks: ['MedQA', 'PubMedQA', 'Clinical Decision Support'],
        metrics: {
          'Medical Accuracy': 94.2,
          'Clinical Relevance': 91.8,
          'Safety Score': 96.5,
          'Diagnostic Confidence': 89.3
        },
        riskTraceability: ['RISK-HEALTH-001', 'RISK-SAFETY-003'],
        riskRegister: 'Healthcare Triage Assistant',
        completedAt: '2024-01-15T14:30:00Z',
        domainExpert: 'Dr. Sarah Chen',
        benchmarkDatasets: ['MedQA-USMLE', 'Clinical-Notes-v2', 'Triage-Cases-2024']
      },
      {
        id: 'eval_002',
        name: 'Financial Risk Analysis Evaluation',
        description: 'Financial domain benchmarks, lending fairness assessment',
        type: 'domain_benchmark',
        status: 'running',
        progress: 70,
        benchmarks: ['FinQA', 'Fair Lending Dataset', 'Credit Risk Assessment'],
        metrics: {
          'Financial Accuracy': 92.1,
          'Fairness Score': 88.7,
          'Regulatory Compliance': 94.3,
          'Bias Detection': 2.1
        },
        riskTraceability: ['RISK-FIN-001', 'RISK-BIAS-001'],
        riskRegister: 'Financial Lending Copilot',
        domainExpert: 'Mike Johnson',
        benchmarkDatasets: ['Fair-Lending-v3', 'Credit-Decisions-2024']
      },
      {
        id: 'eval_003',
        name: 'Human Preference Testing',
        description: 'Blind review scoring with expert rubrics and inter-annotator agreement',
        type: 'human_preference',
        status: 'completed',
        reviewers: ['Domain Expert Panel', 'Ethics Review Board'],
        metrics: {
          'Human Preference Score': 87.4,
          'Inter-Annotator Agreement': 0.82,
          'Expert Consensus': 0.89,
          'Ethical Alignment': 91.2
        },
        riskTraceability: ['RISK-ETHICS-001', 'RISK-HUMAN-002'],
        riskRegister: 'Government Citizen Services',
        completedAt: '2024-01-14T16:20:00Z',
        reviewRubric: 'Government Services Quality Rubric v2.1',
        annotators: 8
      }
    ],
    validation: [
      {
        id: 'val_001',
        name: 'Real-World Canary Release Validation',
        description: 'Pre-production validation with real user interactions and feedback',
        type: 'canary_release',
        status: 'in_progress',
        progress: 80,
        canaryMetrics: {
          'User Satisfaction': 4.7,
          'Task Completion Rate': 94.2,
          'Error Rate': 0.8,
          'Performance vs Baseline': '+12%'
        },
        trafficSplit: '5% canary, 95% baseline',
        duration: '7 days',
        riskTraceability: ['RISK-DEPLOY-001', 'RISK-USER-002'],
        riskRegister: 'Retail Brand Safety Assistant',
        validationLab: 'HITL Panel Review Required',
        domainExperts: ['Retail Safety Expert', 'Brand Compliance Officer']
      },
      {
        id: 'val_002',
        name: 'Human-in-the-Loop Validation',
        description: 'Domain expert validation through Validation Lab integration',
        type: 'hitl_validation',
        status: 'completed',
        validationResults: {
          'Expert Approval Rate': 89.3,
          'Consensus Score': 0.87,
          'Ethical Clearance': 'APPROVED',
          'Domain Accuracy': 92.1
        },
        riskTraceability: ['RISK-ETHICS-001', 'RISK-DOMAIN-003'],
        riskRegister: 'Healthcare Triage Assistant',
        completedAt: '2024-01-13T11:45:00Z',
        validationPanel: 'Medical Ethics Board',
        reviewers: 5
      }
    ],
    verification: [
      {
        id: 'ver_001',
        name: 'NIST/ISO/EU Compliance Verification',
        description: 'Traceability matrix auto-generation and compliance framework verification',
        type: 'compliance_verification',
        status: 'completed',
        frameworks: ['NIST RMF', 'EU AI Act', 'ISO/IEC 23053'],
        traceabilityMatrix: {
          'Requirements Coverage': '98%',
          'Risk-to-Test Mapping': '100%',
          'Control Implementation': '94%',
          'Evidence Completeness': '96%'
        },
        verifier: 'Compliance Automation Engine',
        certificate: 'TEVV-COMP-2024-001',
        validUntil: '2025-01-15',
        riskTraceability: ['RISK-COMP-001', 'RISK-TRACE-002'],
        riskRegister: 'Financial Lending Copilot',
        complianceOfficer: 'Emily Davis',
        auditReady: true
      },
      {
        id: 'ver_002',
        name: 'Release Readiness Verification',
        description: 'Comprehensive release readiness score calculation and approval workflow',
        type: 'release_readiness',
        status: 'in_progress',
        progress: 75,
        readinessScore: 87,
        readinessComponents: {
          'Testing Coverage': 94,
          'Evaluation Completion': 89,
          'Validation Approval': 85,
          'Compliance Verification': 92,
          'Risk Mitigation': 83
        },
        riskTraceability: ['RISK-DEPLOY-001', 'RISK-READY-002'],
        riskRegister: 'SAP Enterprise Copilot',
        approvalWorkflow: 'CIO → CISO → Compliance Officer',
        estimatedCompletion: '2024-01-18T15:00:00Z'
      }
    ]
  };

  const tevvMetrics = [
    {
      name: 'TEVV Coverage Rate',
      value: '98%',
      change: '+12%',
      trend: 'up',
      color: 'green',
      description: 'Risk Register to Test Coverage'
    },
    {
      name: 'Release Readiness Score',
      value: '87/100',
      change: '+8',
      trend: 'up',
      color: 'blue',
      description: 'Composite Deployment Readiness'
    },
    {
      name: 'Compliance Mapping',
      value: '94%',
      change: '+15%',
      trend: 'up',
      color: 'purple',
      description: 'NIST/ISO/EU Framework Alignment'
    },
    {
      name: 'CI/CD Integration',
      value: '100%',
      change: '+25%',
      trend: 'down',
      color: 'yellow',
      description: 'Automated Pipeline Coverage'
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

  const actorRoles = [
    {
      role: 'QA Engineer',
      responsibilities: ['Designs TEVV runs', 'Configures test suites', 'Reviews execution reports'],
      activeUser: 'Jordan Smith',
      currentTasks: 3
    },
    {
      role: 'Automation Architect', 
      responsibilities: ['Integrates with CI/CD pipelines', 'Manages distributed execution', 'Optimizes performance'],
      activeUser: 'Taylor Brown',
      currentTasks: 2
    },
    {
      role: 'Compliance Officer',
      responsibilities: ['Reviews verification reports', 'Validates framework mapping', 'Approves evidence packs'],
      activeUser: 'Emily Davis',
      currentTasks: 4
    },
    {
      role: 'Domain Expert (HITL)',
      responsibilities: ['Participates in validation', 'Provides expert judgment', 'Reviews edge cases'],
      activeUser: 'Dr. Sarah Chen',
      currentTasks: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'validated': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'running':
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'scheduled':
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'validated': return <CheckCircle className="w-4 h-4" />;
      case 'running':
      case 'in_progress': return <Play className="w-4 h-4" />;
      case 'scheduled':
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TEVV Automation Suite</h2>
          <p className="text-gray-600 dark:text-gray-400">Execute risk-to-test traceability across functional, robustness, and security domains</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create TEVV Suite</span>
        </button>
      </div>

      {/* TEVV Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {tevvMetrics.map((metric, index) => (
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

      {/* TEVV Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['testing', 'evaluation', 'validation', 'verification'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} ({tevvModules[tab as keyof typeof tevvModules].length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {tevvModules[activeTab as keyof typeof tevvModules].map((item: any) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="capitalize">{item.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                    
                    {/* Progress for running items */}
                    {item.progress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Test Results */}
                    {item.testCases && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{item.testCases}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Total Tests</div>
                        </div>
                        {item.passed !== undefined && (
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">{item.passed}</div>
                            <div className="text-xs text-green-600 dark:text-green-400">Passed</div>
                          </div>
                        )}
                        {item.failed !== undefined && (
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-lg font-bold text-red-600 dark:text-red-400">{item.failed}</div>
                            <div className="text-xs text-red-600 dark:text-red-400">Failed</div>
                          </div>
                        )}
                        {item.coverage && (
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.coverage}%</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">Coverage</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Metrics for evaluations */}
                    {item.metrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(item.metrics).map(([metric, score]) => (
                          <div key={metric} className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {typeof score === 'number' ? score.toFixed(1) : score}
                              {typeof score === 'number' && score <= 1 ? '' : '%'}
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">{metric}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Risk Traceability */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Risk Traceability:</span>
                      {item.riskTraceability?.map((risk: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded font-mono">
                          {risk}
                        </span>
                      ))}
                    </div>

                    {/* Additional metadata */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.duration && <span>Duration: {item.duration} • </span>}
                      {item.verifier && <span>Verifier: {item.verifier} • </span>}
                      {item.certificate && <span>Certificate: {item.certificate} • </span>}
                      {item.scheduledFor && <span>Scheduled: {new Date(item.scheduledFor).toLocaleString()}</span>}
                      {item.completedAt && <span>Completed: {new Date(item.completedAt).toLocaleString()}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Download className="w-4 h-4" />
                    </button>
                    {item.status === 'scheduled' && (
                      <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40">
                        Run Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk-to-Test Traceability Matrix */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Risk-to-Test Traceability Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk Description</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Testing</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Evaluation</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Validation</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { id: 'REQ-001', description: 'Model accuracy requirements', testing: 'pass', evaluation: 'pass', validation: 'pass', verification: 'pass' },
                { id: 'REQ-002', description: 'Robustness against adversarial inputs', testing: 'pass', evaluation: 'pass', validation: 'pending', verification: 'pending' },
                { id: 'BIAS-001', description: 'Demographic bias mitigation', testing: 'n/a', evaluation: 'pass', validation: 'pass', verification: 'pass' },
                { id: 'REG-001', description: 'EU AI Act compliance', testing: 'n/a', evaluation: 'n/a', validation: 'in_progress', verification: 'pending' }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                  <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{row.description}</td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.testing)}`}>
                      {getStatusIcon(row.testing)}
                      <span>{row.testing}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.evaluation)}`}>
                      {getStatusIcon(row.evaluation)}
                      <span>{row.evaluation}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.validation)}`}>
                      {getStatusIcon(row.validation)}
                      <span>{row.validation}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.verification)}`}>
                      {getStatusIcon(row.verification)}
                      <span>{row.verification}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create TEVV Suite Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create TEVV Automation Suite</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up automated Testing, Evaluation, Validation, and Verification processes
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Suite Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Healthcare Triage TEVV Suite"
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

              {/* TEVV Components */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">TEVV Components to Include</h4>
                <div className="space-y-3">
                  {[
                    { id: 'testing', name: 'Automated Testing', description: 'Functional, robustness, security tests' },
                    { id: 'evaluation', name: 'Model Evaluation', description: 'Performance and bias evaluation' },
                    { id: 'validation', name: 'Compliance Validation', description: 'Regulatory requirement validation' },
                    { id: 'verification', name: 'Independent Verification', description: 'Third-party verification' }
                  ].map(component => (
                    <div key={component.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{component.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{component.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CI/CD Integration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <GitBranch className="w-4 h-4" />
                  <span>CI/CD Pipeline Integration</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pipeline Platform
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Jenkins</option>
                      <option>GitLab CI/CD</option>
                      <option>Azure DevOps</option>
                      <option>GitHub Actions</option>
                      <option>CircleCI</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Automation Architect
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>DevOps Team Alpha</option>
                      <option>Security Team Beta</option>
                      <option>Platform Engineering</option>
                      <option>QA Engineering Team</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Execution Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Execution Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Execution Mode
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Parallel Execution</option>
                      <option>Sequential Execution</option>
                      <option>Distributed Nodes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>High (Pre-deployment)</option>
                      <option>Medium (Scheduled)</option>
                      <option>Low (Background)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Execution Time
                    </label>
                    <input
                      type="text"
                      placeholder="4h 30m"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Edge Case Handling */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Edge Case Configuration</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Large Model Handling
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Auto-parallelize in distributed nodes</option>
                      <option>Sequential execution with checkpoints</option>
                      <option>Sampling-based evaluation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ambiguous Results (50% pass/fail)
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Escalate to Validation Lab</option>
                      <option>Require manual review</option>
                      <option>Apply conservative threshold</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Auto-generates: TEVV Coverage Matrix • Release Readiness Score • TEVV Execution Reports
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Design TEVV Run
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TEVVAutomationSuite;