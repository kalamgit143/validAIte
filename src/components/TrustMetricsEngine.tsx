import React, { useState } from 'react';
import { 
  Target, 
  Brain, 
  Shield, 
  Users,
  Database,
  Activity,
  Settings,
  Eye,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  FileText,
  Globe,
  Lock,
  Heart,
  Scale,
  Building,
  Gavel,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Layers,
  Save,
  Code,
  Zap,
  Crown
} from 'lucide-react';

interface TrustMetricsEngineProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const TrustMetricsEngine: React.FC<TrustMetricsEngineProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [showCustomMetricModal, setShowCustomMetricModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock Application Profile from Stage 1
  const applicationProfile = {
    name: 'Healthcare Triage Assistant',
    type: 'LLM+RAG',
    domain: 'Healthcare',
    environment: 'Production',
    businessCriticality: 'Mission Critical',
    euAiActClass: 'High Risk',
    oversightLevel: 'Human-in-the-Loop'
  };

  // Mock input from Stage 1 - Governance Matrix
  const inputFromStage1 = {
    governanceMatrix: [
      {
        id: 'GM001',
        useCase: 'Emergency Patient Triage',
        useCaseId: 'UC1',
        risk: 'Hallucination',
        riskId: 'RR001',
        severity: 'High',
        likelihood: 'Frequent',
        controls: 'Canonical KB Tagging, HITL Fallback',
        complianceMapping: ['EU AI Act', 'NIST RMF'],
        evidenceRequired: 'Grounding score logs, KB references, HITL validation notes'
      },
      {
        id: 'GM002',
        useCase: 'Emergency Patient Triage',
        useCaseId: 'UC1',
        risk: 'Grounding Gap',
        riskId: 'RR002',
        severity: 'Medium',
        likelihood: 'Occasional',
        controls: 'Grounding Threshold',
        complianceMapping: ['NIST RMF'],
        evidenceRequired: 'Grounding score logs'
      },
      {
        id: 'GM003',
        useCase: 'Symptom Documentation',
        useCaseId: 'UC2',
        risk: 'Privacy Leakage',
        riskId: 'RR003',
        severity: 'High',
        likelihood: 'Rare',
        controls: 'PII Masking',
        complianceMapping: ['GDPR', 'HIPAA'],
        evidenceRequired: 'Monitoring alerts, anonymized transcripts'
      },
      {
        id: 'GM004',
        useCase: 'Treatment Recommendation',
        useCaseId: 'UC3',
        risk: 'Bias/Fairness',
        riskId: 'RR004',
        severity: 'Medium',
        likelihood: 'Occasional',
        controls: 'Red-Team Testing',
        complianceMapping: ['EU AI Act'],
        evidenceRequired: 'Bias testing results, demographic analysis'
      }
    ]
  };

  // Trust Metrics Library
  const trustMetricsLibrary = [
    {
      id: 'faithfulness_score',
      name: 'Faithfulness Score',
      description: 'Measures how grounded responses are in retrieved knowledge',
      category: 'accuracy',
      applicableRisks: ['hallucination', 'grounding_gap'],
      formula: '# grounded responses ÷ # total responses',
      scale: '0.0 - 1.0 (higher is better)',
      evaluationMethod: 'NLI-based grounding verification',
      industryThreshold: 0.80,
      icon: Target,
      color: 'emerald'
    },
    {
      id: 'retrieval_freshness',
      name: 'Retrieval Freshness Score',
      description: 'Measures currency and relevance of retrieved knowledge',
      category: 'grounding',
      applicableRisks: ['kb_drift', 'retrieval_error'],
      formula: '# fresh retrievals ÷ # total retrievals',
      scale: '0.0 - 1.0 (higher is better)',
      evaluationMethod: 'Knowledge base timestamp analysis',
      industryThreshold: 0.90,
      icon: Database,
      color: 'blue'
    },
    {
      id: 'demographic_parity_gap',
      name: 'Demographic Parity Gap',
      description: 'Measures difference in positive outcomes across demographic groups',
      category: 'fairness',
      applicableRisks: ['bias_fairness'],
      formula: 'max(|P(Y=1|A=a) - P(Y=1|A=b)|) across groups',
      scale: '0.0 - 1.0 (lower is better)',
      evaluationMethod: 'Statistical parity testing',
      industryThreshold: 0.05,
      icon: Users,
      color: 'purple'
    },
    {
      id: 'pii_exposure_rate',
      name: 'PII Exposure Rate',
      description: 'Percentage of responses containing personally identifiable information',
      category: 'privacy',
      applicableRisks: ['privacy_leakage'],
      formula: '# responses with PII ÷ # total responses × 100',
      scale: '0% - 100% (lower is better)',
      evaluationMethod: 'Named entity recognition + regex patterns',
      industryThreshold: 0.01,
      icon: Lock,
      color: 'red'
    },
    {
      id: 'injection_vulnerability_rate',
      name: 'Injection Vulnerability Rate',
      description: 'Percentage of successful prompt injection attempts',
      category: 'security',
      applicableRisks: ['prompt_injection'],
      formula: '# successful injections ÷ # injection attempts × 100',
      scale: '0% - 100% (lower is better)',
      evaluationMethod: 'Adversarial prompt testing',
      industryThreshold: 0.02,
      icon: Shield,
      color: 'orange'
    },
    {
      id: 'tool_selection_accuracy',
      name: 'Tool Selection Accuracy',
      description: 'Accuracy of routing decisions in multi-agent systems',
      category: 'routing',
      applicableRisks: ['misrouting'],
      formula: '# correct tool selections ÷ # total selections',
      scale: '0.0 - 1.0 (higher is better)',
      evaluationMethod: 'Intent classification validation',
      industryThreshold: 0.95,
      icon: ArrowRight,
      color: 'indigo'
    },
    {
      id: 'medical_accuracy_score',
      name: 'Medical Accuracy Score',
      description: 'Clinical accuracy of medical recommendations and diagnoses',
      category: 'domain_accuracy',
      applicableRisks: ['hallucination', 'grounding_gap'],
      formula: '# clinically accurate responses ÷ # total medical responses',
      scale: '0.0 - 1.0 (higher is better)',
      evaluationMethod: 'Expert medical review + clinical validation',
      industryThreshold: 0.95,
      icon: Heart,
      color: 'pink'
    },
    {
      id: 'regulatory_alignment_score',
      name: 'Regulatory Alignment Score',
      description: 'Compliance with domain-specific regulations and guidelines',
      category: 'compliance',
      applicableRisks: ['bias_fairness', 'privacy_leakage'],
      formula: '# compliant responses ÷ # total responses',
      scale: '0.0 - 1.0 (higher is better)',
      evaluationMethod: 'Regulatory checklist validation',
      industryThreshold: 0.98,
      icon: Scale,
      color: 'violet'
    }
  ];

  // Metric Registry State
  const [metricRegistry, setMetricRegistry] = useState<any[]>([
    {
      id: 'MR001',
      useCaseId: 'UC1',
      useCaseName: 'Emergency Patient Triage',
      riskId: 'RR001',
      riskName: 'Hallucination',
      metricId: 'faithfulness_score',
      metricName: 'Faithfulness Score',
      threshold: 0.80,
      benchmarkSource: 'Industry Standard',
      owner: 'QA Engineer',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Sarah Chen'
    }
  ]);

  const [currentMetricForm, setCurrentMetricForm] = useState({
    metricId: '',
    customMetric: '',
    threshold: '',
    benchmarkSource: '',
    owner: ''
  });

  const selectedRiskData = inputFromStage1.governanceMatrix.find(gm => gm.id === selectedRisk);
  const riskMetrics = metricRegistry.filter(mr => mr.riskId === selectedRiskData?.riskId);
  const suggestedMetrics = trustMetricsLibrary.filter(metric => 
    selectedRiskData ? metric.applicableRisks.some(risk => selectedRiskData.risk.toLowerCase().includes(risk.replace('_', ' '))) : []
  );

  const handleSaveMetricMapping = () => {
    if (!selectedRisk || !currentMetricForm.metricId || !currentMetricForm.threshold || !currentMetricForm.benchmarkSource || !currentMetricForm.owner) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedMetric = trustMetricsLibrary.find(m => m.id === currentMetricForm.metricId);
    const newMetricEntry = {
      id: `MR${String(metricRegistry.length + 1).padStart(3, '0')}`,
      useCaseId: selectedRiskData?.useCaseId || '',
      useCaseName: selectedRiskData?.useCase || '',
      riskId: selectedRiskData?.riskId || '',
      riskName: selectedRiskData?.risk || '',
      metricId: currentMetricForm.metricId,
      metricName: selectedMetric?.name || currentMetricForm.customMetric,
      threshold: parseFloat(currentMetricForm.threshold),
      benchmarkSource: currentMetricForm.benchmarkSource,
      owner: currentMetricForm.owner,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Current User'
    };

    setMetricRegistry(prev => [...prev, newMetricEntry]);
    setCurrentMetricForm({ metricId: '', customMetric: '', threshold: '', benchmarkSource: '', owner: '' });
  };

  const handleComplete = () => {
    if (metricRegistry.length === 0) {
      alert('Please assign metrics to at least one risk before proceeding');
      return;
    }
    setIsComplete(true);
  };

  const canCreate = canPerformAction ? canPerformAction('Trust Metrics Engine', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Trust Metrics Engine', 'E') : true;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood.toLowerCase()) {
      case 'frequent': return 'bg-red-500 text-white';
      case 'occasional': return 'bg-yellow-500 text-gray-900';
      case 'rare': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getMetricCategoryColor = (category: string) => {
    switch (category) {
      case 'accuracy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'grounding': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fairness': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'privacy': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'security': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'routing': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'domain_accuracy': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'compliance': return 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getMetricCounts = () => {
    return {
      total: metricRegistry.length,
      accuracy: metricRegistry.filter(mr => {
        const metric = trustMetricsLibrary.find(m => m.id === mr.metricId);
        return metric?.category === 'accuracy' || metric?.category === 'domain_accuracy';
      }).length,
      fairness: metricRegistry.filter(mr => {
        const metric = trustMetricsLibrary.find(m => m.id === mr.metricId);
        return metric?.category === 'fairness';
      }).length,
      security: metricRegistry.filter(mr => {
        const metric = trustMetricsLibrary.find(m => m.id === mr.metricId);
        return metric?.category === 'security' || metric?.category === 'privacy';
      }).length
    };
  };

  const counts = getMetricCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trust Metrics Engine</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Stage 2: Step 1 - Risk → Metric Mapping</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Map risks to measurable trust metrics with thresholds and benchmarks</p>
        </div>
      </div>

      {/* Application Profile Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Application Profile</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Application:</span>
            <div className="text-blue-900 dark:text-blue-100 font-semibold">{applicationProfile.name}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Type:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.type}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Domain:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.domain}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Environment:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.environment}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Criticality:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.businessCriticality}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">EU AI Act:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.euAiActClass}</div>
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Oversight:</span>
            <div className="text-blue-900 dark:text-blue-100">{applicationProfile.oversightLevel}</div>
          </div>
        </div>
      </div>

      {/* Input from Stage 1 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">Input from Stage 1: Governance Matrix</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use Cases</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {new Set(inputFromStage1.governanceMatrix.map(gm => gm.useCaseId)).size}</div>
              <div>High Criticality: 2</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risks Identified</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {inputFromStage1.governanceMatrix.length}</div>
              <div>High Severity: {inputFromStage1.governanceMatrix.filter(gm => gm.severity === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Controls Assigned</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Mapped: {inputFromStage1.governanceMatrix.length}</div>
              <div>Preventive: 3</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Metrics</h4>
            <div className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
              <div>✓ Governance Matrix complete</div>
              <div>✓ Ready for trust measurement</div>
              <div>✓ Proceed to metric mapping</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li>• Risks (from Governance Matrix)</li>
              <li>• Trust metrics library</li>
              <li>• Threshold definitions</li>
              <li>• Benchmark sources</li>
              <li>• Metric ownership assignments</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Risk → Metric Mapping</h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Converting risks to measurable metrics</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li>• Metric Registry (Risk → Metric)</li>
              <li>• Trust thresholds defined</li>
              <li>• Benchmark sources mapped</li>
              <li>• Evidence: Metric assignments</li>
              <li>• Ready for trust evaluations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Risk Register from Stage 1 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Risk Register (from Stage 1)</span>
            </h3>
            
            <div className="space-y-4">
              {/* Group risks by use case */}
              {Array.from(new Set(inputFromStage1.governanceMatrix.map(gm => gm.useCaseId))).map(useCaseId => {
                const useCaseRisks = inputFromStage1.governanceMatrix.filter(gm => gm.useCaseId === useCaseId);
                const useCaseName = useCaseRisks[0]?.useCase || '';
                
                return (
                  <div key={useCaseId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Use Case: {useCaseName}</h4>
                    <div className="space-y-2">
                      {useCaseRisks.map((risk) => {
                        const isSelected = selectedRisk === risk.id;
                        const hasMetrics = metricRegistry.some(mr => mr.riskId === risk.riskId);
                        
                        return (
                          <button
                            key={risk.id}
                            onClick={() => setSelectedRisk(risk.id)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                : hasMetrics
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">Risk: {risk.risk}</span>
                              <div className="flex items-center space-x-1">
                                <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                                  {risk.severity}
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(risk.likelihood)}`}>
                                  {risk.likelihood}
                                </div>
                                {hasMetrics && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {risk.id} • {metricRegistry.filter(mr => mr.riskId === risk.riskId).length} metrics assigned
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Metric Registry Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Metric Registry Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{counts.accuracy}</div>
                  <div className="text-emerald-600 dark:text-emerald-400">Accuracy</div>
                </div>
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <div className="font-bold text-purple-600 dark:text-purple-400">{counts.fairness}</div>
                  <div className="text-purple-600 dark:text-purple-400">Fairness</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="font-bold text-red-600 dark:text-red-400">{counts.security}</div>
                  <div className="text-red-600 dark:text-red-400">Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Metric Assignment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedRisk && selectedRiskData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Metric Assignment: {selectedRiskData.risk}
                  </h3>
                  <button 
                    onClick={() => setShowCustomMetricModal(true)}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Custom Metric</span>
                  </button>
                </div>

                {/* Risk Context */}
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Risk Context (from Stage 1)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Use Case</span>
                      <div className="text-sm text-red-900 dark:text-red-100 font-medium">{selectedRiskData.useCase}</div>
                    </div>
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Risk ID</span>
                      <div className="text-sm text-red-900 dark:text-red-100 font-mono">{selectedRiskData.riskId}</div>
                    </div>
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Severity</span>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityColor(selectedRiskData.severity)}`}>
                        {selectedRiskData.severity}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Likelihood</span>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(selectedRiskData.likelihood)}`}>
                        {selectedRiskData.likelihood}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-red-800 dark:text-red-200 mb-2">
                    <strong>Controls:</strong> {selectedRiskData.controls}
                  </div>
                  <div className="text-sm text-red-800 dark:text-red-200">
                    <strong>Evidence Required:</strong> {selectedRiskData.evidenceRequired}
                  </div>
                </div>

                {/* Suggested Metrics */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Suggested Trust Metrics</h4>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {suggestedMetrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <label
                          key={metric.id}
                          className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                            currentMetricForm.metricId === metric.id
                              ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="metric"
                            value={metric.id}
                            checked={currentMetricForm.metricId === metric.id}
                            onChange={(e) => setCurrentMetricForm(prev => ({ 
                              ...prev, 
                              metricId: e.target.value, 
                              customMetric: '',
                              threshold: metric.industryThreshold.toString()
                            }))}
                            className="mt-1"
                          />
                          <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{metric.name}</span>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getMetricCategoryColor(metric.category)}`}>
                                {metric.category.replace('_', ' ')}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{metric.description}</p>
                            <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                              <div><strong>Formula:</strong> {metric.formula}</div>
                              <div><strong>Scale:</strong> {metric.scale}</div>
                              <div><strong>Method:</strong> {metric.evaluationMethod}</div>
                              <div><strong>Industry Threshold:</strong> {metric.industryThreshold}</div>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                    
                    {/* Custom Metric Option */}
                    <label className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      currentMetricForm.metricId === 'custom'
                        ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}>
                      <input
                        type="radio"
                        name="metric"
                        value="custom"
                        checked={currentMetricForm.metricId === 'custom'}
                        onChange={(e) => setCurrentMetricForm(prev => ({ ...prev, metricId: e.target.value, threshold: '' }))}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">Custom Metric</span>
                        {currentMetricForm.metricId === 'custom' && (
                          <textarea
                            value={currentMetricForm.customMetric}
                            onChange={(e) => setCurrentMetricForm(prev => ({ ...prev, customMetric: e.target.value }))}
                            placeholder="Define your custom trust metric..."
                            className="w-full mt-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm h-16 resize-none"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Metric Configuration */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-4">Metric Configuration</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        Trust Threshold *
                      </label>
                      <input
                        type="number"
                        value={currentMetricForm.threshold}
                        onChange={(e) => setCurrentMetricForm(prev => ({ ...prev, threshold: e.target.value }))}
                        placeholder="0.80"
                        step="0.01"
                        min="0"
                        max="1"
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                        Values above this threshold are considered acceptable
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        Benchmark Source *
                      </label>
                      <select
                        value={currentMetricForm.benchmarkSource}
                        onChange={(e) => setCurrentMetricForm(prev => ({ ...prev, benchmarkSource: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Benchmark Source</option>
                        <option value="Industry Standard">Industry Standard</option>
                        <option value="Org Standard">Organization Standard</option>
                        <option value="Custom">Custom Threshold</option>
                        <option value="Regulatory Requirement">Regulatory Requirement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                      Metric Owner *
                    </label>
                    <select
                      value={currentMetricForm.owner}
                      onChange={(e) => setCurrentMetricForm(prev => ({ ...prev, owner: e.target.value }))}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Metric Owner</option>
                      <option value="QA Engineer">QA Engineer</option>
                      <option value="Automation Engineer">Automation Engineer</option>
                      <option value="Domain Expert">Domain Expert</option>
                      <option value="Ethics Reviewer">Ethics Reviewer</option>
                      <option value="SecOps Engineer">SecOps Engineer</option>
                      <option value="Governance Lead">Governance Lead</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <button
                      onClick={handleSaveMetricMapping}
                      disabled={!canCreate}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Metric Mapping</span>
                    </button>
                    <button
                      onClick={() => setCurrentMetricForm({ metricId: '', customMetric: '', threshold: '', benchmarkSource: '', owner: '' })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Clear Form
                    </button>
                  </div>
                </div>

                {/* Assigned Metrics for Selected Risk */}
                {riskMetrics.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Assigned Metrics ({riskMetrics.length})</h4>
                    {riskMetrics.map((metric) => (
                      <div key={metric.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">{metric.metricName}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Threshold: ≥{metric.threshold}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                ({metric.benchmarkSource})
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Owner: {metric.owner}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {metric.id} • Created by {metric.createdBy} • {new Date(metric.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {canEdit && (
                              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Risk</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a risk from the left panel to assign trust metrics</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metric Registry Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Metric Registry</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {metricRegistry.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Trust Metric</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Threshold</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Benchmark</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {metricRegistry.map((metric, index) => (
                  <tr key={metric.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{metric.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{metric.useCaseName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{metric.riskName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div className="max-w-xs truncate" title={metric.metricName}>
                        {metric.metricName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        ≥{metric.threshold}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{metric.benchmarkSource}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{metric.owner}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {canEdit && (
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Metrics Assigned Yet</h4>
            <p className="text-gray-600 dark:text-gray-400">Select a risk and assign trust metrics to build your Metric Registry</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for metric assignment access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Mappings</span>
              </button>
              <button 
                onClick={handleComplete}
                disabled={metricRegistry.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom Metric Modal */}
      {showCustomMetricModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Custom Trust Metric</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a custom trust metric not available in the standard library
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric Name *
                </label>
                <input
                  type="text"
                  placeholder="Custom Trust Metric"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric Category
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>Accuracy</option>
                  <option>Grounding</option>
                  <option>Fairness</option>
                  <option>Privacy</option>
                  <option>Security</option>
                  <option>Routing</option>
                  <option>Domain Accuracy</option>
                  <option>Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric Description *
                </label>
                <textarea
                  placeholder="Describe what this metric measures and how it relates to trust..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Formula/Calculation *
                  </label>
                  <input
                    type="text"
                    placeholder="# correct responses ÷ # total responses"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scale/Range *
                  </label>
                  <input
                    type="text"
                    placeholder="0.0 - 1.0 (higher is better)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Evaluation Method *
                </label>
                <textarea
                  placeholder="Describe how this metric will be evaluated (e.g., automated testing, expert review, statistical analysis)..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 h-20 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Custom metric will be added to the library for future use
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCustomMetricModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Add Custom Metric
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Trust Metrics Engine Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metric Registry</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Risk-Metric Mappings: {metricRegistry.length}</div>
                <div>Metrics Assigned: {metricRegistry.length}</div>
                <div>Risks Covered: {new Set(metricRegistry.map(mr => mr.riskId)).size}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metric Categories</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Accuracy: {counts.accuracy}</div>
                <div>Fairness: {counts.fairness}</div>
                <div>Security: {counts.security}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Evaluations</h4>
              <div className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
                <div>✓ Metrics defined</div>
                <div>✓ Thresholds set</div>
                <div>✓ Ready for Step 2</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Next: Step 2 - Trust Evaluations</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Metric Registry will now feed into Trust Evaluations to run actual measurements 
              against your GenAI application using datasets and evaluation methods.
            </p>
          </div>
        </div>
      )}

      {/* Metric Library Reference (Side Panel) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Trust Metrics Library Reference</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustMetricsLibrary.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{metric.name}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getMetricCategoryColor(metric.category)}`}>
                      {metric.category.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{metric.description}</p>
                
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-500">
                  <div><strong>Formula:</strong> {metric.formula}</div>
                  <div><strong>Scale:</strong> {metric.scale}</div>
                  <div><strong>Method:</strong> {metric.evaluationMethod}</div>
                  <div><strong>Industry Threshold:</strong> {metric.industryThreshold}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustMetricsEngine;