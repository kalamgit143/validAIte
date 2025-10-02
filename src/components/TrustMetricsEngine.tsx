import React, { useState } from 'react';
import { 
  Target, 
  Shield, 
  Users, 
  Brain,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Plus,
  Settings,
  Filter,
  Search,
  Calendar,
  Award,
  Zap,
  Activity,
  FileText,
  Database,
  Code,
  Lock,
  Globe,
  Heart,
  Scale,
  Lightbulb,
  Cpu,
  DollarSign,
  Timer,
  Layers,
  GitBranch,
  TestTube,
  Workflow,
  ArrowRight,
  ArrowLeft,
  Save,
  Play,
  Pause,
  RefreshCw,
  Link2
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
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [activeView, setActiveView] = useState('risk_mapping');

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
        evidenceRequired: 'Monitoring alerts, PII detection logs'
      }
    ]
  };

  // Trust Metrics Library
  const trustMetricsLibrary = [
    {
      id: 'faithfulness',
      name: 'Faithfulness Score',
      description: 'Measures how grounded responses are in retrieved knowledge',
      category: 'accuracy',
      applicableRisks: ['hallucination', 'grounding_gap'],
      evaluationMethod: 'Automated fact-checking against KB',
      threshold: 0.80,
      scale: '0-1 (higher is better)',
      icon: Target
    },
    {
      id: 'retrieval_freshness',
      name: 'Retrieval Freshness Score',
      description: 'Measures currency and relevance of retrieved knowledge',
      category: 'data_quality',
      applicableRisks: ['kb_drift', 'grounding_gap'],
      evaluationMethod: 'KB version tracking and timestamp analysis',
      threshold: 0.85,
      scale: '0-1 (higher is better)',
      icon: Database
    },
    {
      id: 'demographic_parity',
      name: 'Demographic Parity Gap',
      description: 'Measures fairness across demographic groups',
      category: 'fairness',
      applicableRisks: ['bias_fairness'],
      evaluationMethod: 'Statistical parity testing across groups',
      threshold: 0.05,
      scale: '0-1 (lower is better)',
      icon: Users
    },
    {
      id: 'pii_detection_rate',
      name: 'PII Detection Rate',
      description: 'Effectiveness of personally identifiable information detection',
      category: 'privacy',
      applicableRisks: ['privacy_leakage'],
      evaluationMethod: 'Automated PII scanning and validation',
      threshold: 0.95,
      scale: '0-1 (higher is better)',
      icon: Lock
    },
    {
      id: 'prompt_injection_resistance',
      name: 'Prompt Injection Resistance',
      description: 'Robustness against malicious prompt manipulation',
      category: 'security',
      applicableRisks: ['prompt_injection'],
      evaluationMethod: 'Red-team testing with adversarial prompts',
      threshold: 0.90,
      scale: '0-1 (higher is better)',
      icon: Shield
    },
    {
      id: 'intent_routing_accuracy',
      name: 'Intent Routing Accuracy',
      description: 'Accuracy of intent classification and routing',
      category: 'routing',
      applicableRisks: ['misrouting'],
      evaluationMethod: 'Intent classification validation against golden dataset',
      threshold: 0.92,
      scale: '0-1 (higher is better)',
      icon: ArrowRight
    }
  ];

  // Risk-to-Metric Mapping State
  const [riskMetricMapping, setRiskMetricMapping] = useState<any[]>([
    {
      id: 'RM001',
      useCaseId: 'UC1',
      useCase: 'Emergency Patient Triage',
      riskId: 'RR001',
      risk: 'Hallucination',
      metricId: 'faithfulness',
      metricName: 'Faithfulness Score',
      threshold: 0.80,
      evaluationMethod: 'Automated fact-checking against KB',
      owner: 'QA Engineer',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Sarah Chen'
    }
  ]);

  const [currentMappingForm, setCurrentMappingForm] = useState({
    metricId: '',
    customMetric: '',
    threshold: '',
    evaluationMethod: '',
    owner: ''
  });

  const selectedRiskData = inputFromStage1.governanceMatrix.find(gm => gm.id === selectedRisk);
  const riskMappings = riskMetricMapping.filter(rm => rm.riskId === selectedRiskData?.riskId);
  const suggestedMetrics = trustMetricsLibrary.filter(metric => 
    selectedRiskData ? metric.applicableRisks.some(risk => selectedRiskData.risk.toLowerCase().includes(risk.replace('_', ' '))) : []
  );

  const handleSaveMetricMapping = () => {
    if (!selectedRisk || !currentMappingForm.metricId || !currentMappingForm.threshold || !currentMappingForm.evaluationMethod || !currentMappingForm.owner) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedMetric = trustMetricsLibrary.find(m => m.id === currentMappingForm.metricId);
    const newMappingEntry = {
      id: `RM${String(riskMetricMapping.length + 1).padStart(3, '0')}`,
      useCaseId: selectedRiskData?.useCaseId || '',
      useCase: selectedRiskData?.useCase || '',
      riskId: selectedRiskData?.riskId || '',
      risk: selectedRiskData?.risk || '',
      metricId: currentMappingForm.metricId,
      metricName: selectedMetric?.name || currentMappingForm.customMetric,
      threshold: parseFloat(currentMappingForm.threshold),
      evaluationMethod: currentMappingForm.evaluationMethod,
      owner: currentMappingForm.owner,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Current User'
    };

    setRiskMetricMapping(prev => [...prev, newMappingEntry]);
    setCurrentMappingForm({ metricId: '', customMetric: '', threshold: '', evaluationMethod: '', owner: '' });
  };

  const handleComplete = () => {
    if (riskMetricMapping.length === 0) {
      alert('Please map metrics to at least one risk before proceeding');
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'accuracy': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fairness': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'privacy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'data_quality': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'routing': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getMappingCounts = () => {
    return {
      total: riskMetricMapping.length,
      accuracy: riskMetricMapping.filter(rm => trustMetricsLibrary.find(m => m.id === rm.metricId)?.category === 'accuracy').length,
      fairness: riskMetricMapping.filter(rm => trustMetricsLibrary.find(m => m.id === rm.metricId)?.category === 'fairness').length,
      security: riskMetricMapping.filter(rm => trustMetricsLibrary.find(m => m.id === rm.metricId)?.category === 'security').length
    };
  };

  const counts = getMappingCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trust Metrics Engine</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Stage 2: Quantify Trust</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Link risks to measurable trust metrics and establish evaluation thresholds</p>
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
              <div>High Risk: {inputFromStage1.governanceMatrix.filter(gm => gm.severity === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risks</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {inputFromStage1.governanceMatrix.length}</div>
              <div>High Severity: {inputFromStage1.governanceMatrix.filter(gm => gm.severity === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Controls</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Mapped: {inputFromStage1.governanceMatrix.filter(gm => gm.controls).length}</div>
              <div>Compliance: {inputFromStage1.governanceMatrix.filter(gm => gm.complianceMapping.length > 0).length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Trust Mapping</h4>
            <div className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
              <div>✓ Ready for metrics</div>
              <div>✓ Thresholds needed</div>
              <div>✓ Evaluation methods</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'risk_mapping', label: 'Risk → Metric Mapping', icon: Link2 },
              { id: 'trust_dashboard', label: 'Trust Dashboard', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeView === tab.id
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
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
          {activeView === 'risk_mapping' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel - Risk Register from Stage 1 */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Risk Register (from Stage 1)</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {inputFromStage1.governanceMatrix.map((risk) => {
                      const isSelected = selectedRisk === risk.id;
                      const hasMetrics = riskMetricMapping.some(rm => rm.riskId === risk.riskId);
                      
                      return (
                        <button
                          key={risk.id}
                          onClick={() => setSelectedRisk(risk.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                              : hasMetrics
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{risk.risk}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                                {risk.severity}
                              </div>
                              {hasMetrics && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Use Case: {risk.useCase}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {risk.id} • {riskMetricMapping.filter(rm => rm.riskId === risk.riskId).length} metrics assigned
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mapping Summary */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Mapping Summary</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                        <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                        <div className="text-gray-600 dark:text-gray-400">Total</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="font-bold text-blue-600 dark:text-blue-400">{counts.accuracy}</div>
                        <div className="text-blue-600 dark:text-blue-400">Accuracy</div>
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
                          Trust Metric Assignment: {selectedRiskData.risk}
                        </h3>
                        <button 
                          onClick={() => setShowMetricModal(true)}
                          className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Custom Metric</span>
                        </button>
                      </div>

                      {/* Risk Context from Stage 1 */}
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
                            <span className="text-xs text-red-600 dark:text-red-400">Controls</span>
                            <div className="text-sm text-red-900 dark:text-red-100">{selectedRiskData.controls}</div>
                          </div>
                        </div>
                        <div className="text-sm text-red-800 dark:text-red-200">
                          <strong>Evidence Required:</strong> {selectedRiskData.evidenceRequired}
                        </div>
                      </div>

                      {/* Suggested Trust Metrics */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">Suggested Trust Metrics</h4>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {suggestedMetrics.map((metric) => {
                            const Icon = metric.icon;
                            const isSelected = currentMappingForm.metricId === metric.id;
                            
                            return (
                              <label
                                key={metric.id}
                                className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="metric"
                                  value={metric.id}
                                  checked={isSelected}
                                  onChange={(e) => setCurrentMappingForm(prev => ({ 
                                    ...prev, 
                                    metricId: e.target.value, 
                                    customMetric: '',
                                    threshold: metric.threshold.toString(),
                                    evaluationMethod: metric.evaluationMethod
                                  }))}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="font-medium text-gray-900 dark:text-white text-sm">{metric.name}</span>
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(metric.category)}`}>
                                      {metric.category}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{metric.description}</p>
                                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-500">
                                    <div>Threshold: {metric.threshold}</div>
                                    <div>Scale: {metric.scale}</div>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    Method: {metric.evaluationMethod}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                          
                          {/* Custom Metric Option */}
                          <label className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            currentMappingForm.metricId === 'custom'
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}>
                            <input
                              type="radio"
                              name="metric"
                              value="custom"
                              checked={currentMappingForm.metricId === 'custom'}
                              onChange={(e) => setCurrentMappingForm(prev => ({ ...prev, metricId: e.target.value }))}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">Custom Trust Metric</span>
                              {currentMappingForm.metricId === 'custom' && (
                                <textarea
                                  value={currentMappingForm.customMetric}
                                  onChange={(e) => setCurrentMappingForm(prev => ({ ...prev, customMetric: e.target.value }))}
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
                              min="0"
                              max="1"
                              step="0.01"
                              value={currentMappingForm.threshold}
                              onChange={(e) => setCurrentMappingForm(prev => ({ ...prev, threshold: e.target.value }))}
                              placeholder="0.80"
                              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            />
                            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                              Minimum acceptable score (0.0 - 1.0)
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                              Metric Owner *
                            </label>
                            <select
                              value={currentMappingForm.owner}
                              onChange={(e) => setCurrentMappingForm(prev => ({ ...prev, owner: e.target.value }))}
                              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="">Select Owner</option>
                              <option value="QA Engineer">QA Engineer</option>
                              <option value="Automation Engineer">Automation Engineer</option>
                              <option value="Domain Expert">Domain Expert</option>
                              <option value="Ethics Reviewer">Ethics Reviewer</option>
                              <option value="SecOps Engineer">SecOps Engineer</option>
                              <option value="Governance Lead">Governance Lead</option>
                            </select>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                            Evaluation Method *
                          </label>
                          <textarea
                            value={currentMappingForm.evaluationMethod}
                            onChange={(e) => setCurrentMappingForm(prev => ({ ...prev, evaluationMethod: e.target.value }))}
                            placeholder="Describe how this metric will be evaluated (automated testing, human review, benchmark comparison)..."
                            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500 h-20 resize-none"
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={handleSaveMetricMapping}
                            disabled={!canCreate}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Metric Mapping</span>
                          </button>
                          <button
                            onClick={() => setCurrentMappingForm({ metricId: '', customMetric: '', threshold: '', evaluationMethod: '', owner: '' })}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Clear Form
                          </button>
                        </div>
                      </div>

                      {/* Assigned Metrics for Selected Risk */}
                      {riskMappings.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">Assigned Trust Metrics ({riskMappings.length})</h4>
                          {riskMappings.map((mapping) => (
                            <div key={mapping.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">{mapping.metricName}</span>
                                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                      Threshold: {mapping.threshold}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Owner: {mapping.owner} • Method: {mapping.evaluationMethod}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-500">
                                    {mapping.id} • Created by {mapping.createdBy} • {new Date(mapping.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {canEdit && (
                                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                      <Settings className="w-4 h-4" />
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
          ) : (
            /* Trust Dashboard View */
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trust Metrics Dashboard</h3>
              
              {/* Trust Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Trust Score</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">94.2%</p>
                    </div>
                    <Target className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Metrics Mapped</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{riskMetricMapping.length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High-Risk Metrics</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {riskMetricMapping.filter(rm => {
                          const risk = inputFromStage1.governanceMatrix.find(gm => gm.riskId === rm.riskId);
                          return risk?.severity === 'High';
                        }).length}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready for Testing</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {riskMetricMapping.filter(rm => rm.threshold && rm.evaluationMethod).length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Risk-to-Metric Mapping Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Risk → Metric Mapping</h4>
                
                {riskMetricMapping.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Trust Metric</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Threshold</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Evaluation Method</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {riskMetricMapping.map((mapping, index) => (
                          <tr key={mapping.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{mapping.useCase}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{mapping.risk}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{mapping.metricName}</td>
                            <td className="px-4 py-3 text-center text-sm font-mono text-gray-900 dark:text-white">{mapping.threshold}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              <div className="max-w-xs truncate" title={mapping.evaluationMethod}>
                                {mapping.evaluationMethod}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{mapping.owner}</td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                {canEdit && (
                                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <Settings className="w-4 h-4" />
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
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Metrics Mapped Yet</h4>
                    <p className="text-gray-600 dark:text-gray-400">Select risks and assign trust metrics to build your measurement framework</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!canCreate && "View-only mode - Contact administrator for metric mapping access"}
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
                    disabled={riskMetricMapping.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Complete Stage 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Metric Modal */}
      {showMetricModal && (
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
                  <option>Fairness</option>
                  <option>Security</option>
                  <option>Privacy</option>
                  <option>Data Quality</option>
                  <option>Routing</option>
                  <option>Domain-Specific</option>
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
                    Default Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    placeholder="0.80"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scale Description
                  </label>
                  <input
                    type="text"
                    placeholder="0-1 (higher is better)"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Evaluation Method *
                </label>
                <textarea
                  placeholder="Describe how this metric will be calculated and evaluated..."
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
                  onClick={() => setShowMetricModal(false)}
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
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Stage 2: Trust Metrics Engine Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk-Metric Mapping</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Risks Mapped: {new Set(riskMetricMapping.map(rm => rm.riskId)).size}</div>
                <div>Metrics Assigned: {riskMetricMapping.length}</div>
                <div>Thresholds Set: {riskMetricMapping.filter(rm => rm.threshold).length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluation Framework</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Methods Defined: {riskMetricMapping.filter(rm => rm.evaluationMethod).length}</div>
                <div>Owners Assigned: {riskMetricMapping.filter(rm => rm.owner).length}</div>
                <div>Ready for Testing: ✓</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next: Stage 3</h4>
              <div className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
                <div>✓ Ready for TEVV Automation</div>
                <div>✓ Metrics configured</div>
                <div>✓ Thresholds established</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Trust Metrics Framework Output</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Risk-to-Metric mapping will now feed into Stage 3 (TEVV Automation Suite) to execute 
              automated testing, evaluation, validation, and verification processes with quantitative trust measurements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustMetricsEngine;