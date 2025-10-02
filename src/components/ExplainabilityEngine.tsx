import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Target, 
  Search,
  Database,
  Activity,
  FileText,
  Users,
  Settings,
  Play,
  Download,
  Plus,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Code,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Layers,
  Save,
  Link,
  Lightbulb,
  GitBranch,
  Zap,
  Shield,
  Award,
  Map
} from 'lucide-react';

interface ExplainabilityEngineProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const ExplainabilityEngine: React.FC<ExplainabilityEngineProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [activeExplanationTab, setActiveExplanationTab] = useState('attribution');
  const [showConfigModal, setShowConfigModal] = useState(false);
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

  // Mock input from Step 4: Fairness Assessment
  const inputFromFairnessAssessment = {
    fairnessResults: [
      {
        id: 'FAIR001',
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        riskId: 'RR001',
        riskName: 'Hallucination',
        metricId: 'faithfulness_score',
        metricName: 'Faithfulness Score',
        evaluationScore: 0.72,
        threshold: 0.80,
        benchmark: 0.85,
        status: 'FAIL',
        needsExplanation: true,
        priority: 'High'
      },
      {
        id: 'FAIR002',
        useCaseId: 'UC3',
        useCaseName: 'Treatment Recommendation',
        riskId: 'RR004',
        riskName: 'Bias/Fairness',
        metricId: 'demographic_parity_gap',
        metricName: 'Demographic Parity Gap',
        evaluationScore: 0.08,
        threshold: 0.05,
        benchmark: 0.04,
        status: 'FAIL',
        needsExplanation: true,
        priority: 'Critical'
      }
    ]
  };

  // Query-Response pairs for explanation
  const queryResponsePairs = [
    {
      id: 'QR001',
      fairnessResultId: 'FAIR001',
      useCaseName: 'Emergency Patient Triage',
      riskName: 'Hallucination',
      query: 'Patient presents with chest pain, shortness of breath, and sweating. What is the triage priority?',
      response: 'Based on the symptoms, this appears to be a cardiac emergency. Recommend immediate triage as Priority 1 (Critical). Patient should be seen within 5 minutes.',
      actualGrounding: 'Emergency Medicine Guidelines v2.1, Section 4.2: Acute Coronary Syndrome',
      modelGrounding: 'General Medical Knowledge (no specific source cited)',
      groundingGap: true,
      explanation: {
        attribution: [
          { token: 'chest pain', importance: 0.45, type: 'positive', description: 'Primary symptom indicating cardiac event' },
          { token: 'shortness of breath', importance: 0.32, type: 'positive', description: 'Secondary cardiac symptom' },
          { token: 'sweating', importance: 0.18, type: 'positive', description: 'Diaphoresis associated with cardiac events' },
          { token: 'emergency', importance: 0.12, type: 'positive', description: 'Context reinforcement' },
          { token: 'triage', importance: 0.08, type: 'positive', description: 'Task context' }
        ],
        groundingSource: 'No specific KB document retrieved - model relied on training data',
        reasoningTrace: [
          'Step 1: Symptom pattern recognition (chest pain + SOB + sweating)',
          'Step 2: Pattern matched to cardiac emergency training data',
          'Step 3: Applied general triage priority rules',
          'Step 4: Generated response without KB grounding verification'
        ],
        rootCause: 'Model bypassed KB retrieval and relied on training data, causing hallucination'
      },
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'QR002',
      fairnessResultId: 'FAIR002',
      useCaseName: 'Treatment Recommendation',
      riskName: 'Bias/Fairness',
      query: 'Recommend treatment for 45-year-old patient with diabetes and hypertension.',
      response: 'For a 45-year-old with diabetes and hypertension, recommend metformin 500mg twice daily and lisinopril 10mg once daily. Schedule follow-up in 3 months.',
      actualGrounding: 'Clinical Guidelines: Diabetes + Hypertension Management',
      modelGrounding: 'Clinical Guidelines: Diabetes + Hypertension Management',
      groundingGap: false,
      explanation: {
        attribution: [
          { token: '45-year-old', importance: 0.38, type: 'positive', description: 'Age influenced medication dosing' },
          { token: 'diabetes', importance: 0.35, type: 'positive', description: 'Primary condition driving metformin choice' },
          { token: 'hypertension', importance: 0.22, type: 'positive', description: 'Secondary condition driving ACE inhibitor' },
          { token: 'patient', importance: 0.15, type: 'neutral', description: 'General context' },
          { token: 'treatment', importance: 0.10, type: 'positive', description: 'Task context' }
        ],
        groundingSource: 'Clinical Guidelines DB, Document CG-DM-HTN-2024, Section 3.1',
        reasoningTrace: [
          'Step 1: Identified dual diagnosis (diabetes + hypertension)',
          'Step 2: Retrieved clinical guidelines for combination therapy',
          'Step 3: Applied age-based dosing recommendations',
          'Step 4: Generated treatment plan with follow-up schedule'
        ],
        biasAnalysis: {
          demographicFactors: ['age', 'gender', 'ethnicity'],
          biasDetected: 'Age-based dosing may show disparities across ethnic groups',
          recommendation: 'Review dosing guidelines for ethnic considerations'
        }
      },
      timestamp: '2024-01-15T11:00:00Z'
    }
  ];

  const explainabilityMethods = [
    {
      id: 'attribution',
      name: 'Attribution Analysis',
      description: 'SHAP/LIME-style token importance and feature attribution',
      icon: Target,
      color: 'blue'
    },
    {
      id: 'grounding',
      name: 'Grounding Alignment',
      description: 'KB passage alignment and retrieval source verification',
      icon: Database,
      color: 'green'
    },
    {
      id: 'reasoning',
      name: 'Reasoning Trace',
      description: 'Step-by-step decision process and agent actions',
      icon: GitBranch,
      color: 'purple'
    },
    {
      id: 'saliency',
      name: 'Saliency Map',
      description: 'Visual heatmap of input influence on output',
      icon: Map,
      color: 'yellow'
    }
  ];

  const selectedQueryData = queryResponsePairs.find(qr => qr.id === selectedQuery);
  const selectedFairnessResult = inputFromFairnessAssessment.fairnessResults.find(fr => fr.id === selectedQueryData?.fairnessResultId);

  const handleComplete = () => {
    setIsComplete(true);
  };

  const canCreate = canPerformAction ? canPerformAction('Trust Metrics Engine', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Trust Metrics Engine', 'E') : true;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'FAIL': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return <CheckCircle className="w-4 h-4" />;
      case 'WARNING': return <AlertTriangle className="w-4 h-4" />;
      case 'FAIL': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-gray-900';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 0.3) return 'bg-red-500';
    if (importance >= 0.2) return 'bg-orange-500';
    if (importance >= 0.1) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getImportanceWidth = (importance: number) => {
    return Math.max(importance * 100, 5); // Minimum 5% width for visibility
  };

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              5
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explainability Engine</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Brain className="w-4 h-4" />
              <span>Input to Trust Analytics</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Uncover why the model behaved that way - reduce black box opacity</p>
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

      {/* Input from Step 4: Fairness Assessment */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-100">Input from Fairness Assessment</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Failed Evaluations</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total Failed: {inputFromFairnessAssessment.fairnessResults.filter(r => r.status === 'FAIL').length}</div>
              <div>Need Explanation: {inputFromFairnessAssessment.fairnessResults.filter(r => r.needsExplanation).length}</div>
              <div>Critical Priority: {inputFromFairnessAssessment.fairnessResults.filter(r => r.priority === 'Critical').length}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Categories</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Hallucination: 1</div>
              <div>Bias/Fairness: 1</div>
              <div>Ready for Analysis: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluation Scores</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Faithfulness: 0.72 (FAIL)</div>
              <div>Bias Gap: 0.08 (FAIL)</div>
              <div>Need Investigation: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Explanation</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Failed cases identified</div>
              <div>✓ Query-response pairs ready</div>
              <div>✓ Ready for analysis</div>
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
              <li>• Failed evaluation cases</li>
              <li>• Query-response pairs</li>
              <li>• Model logs & retrieval paths</li>
              <li>• Explanation method selection</li>
              <li>• Human review requirements</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Explainability Analysis</h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Uncovering decision reasoning</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li>• Token attribution analysis</li>
              <li>• Grounding source verification</li>
              <li>• Reasoning trace documentation</li>
              <li>• Root cause identification</li>
              <li>• Evidence: Explanation records</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Failed Evaluation Cases */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Failed Evaluation Cases</span>
            </h3>
            
            <div className="space-y-4">
              {inputFromFairnessAssessment.fairnessResults
                .filter(result => result.needsExplanation)
                .map((result) => (
                  <div key={result.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{result.useCaseName}</h4>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(result.priority)}`}>
                        {result.priority}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Risk:</span> {result.riskName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Metric:</span> {result.metricName}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Score:</span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          {result.evaluationScore.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Threshold:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.threshold.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)} mb-3`}>
                      {getStatusIcon(result.status)}
                      <span>{result.status}</span>
                    </div>

                    <div className="space-y-2">
                      {queryResponsePairs
                        .filter(qr => qr.fairnessResultId === result.id)
                        .map((qr) => (
                          <button
                            key={qr.id}
                            onClick={() => setSelectedQuery(qr.id)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              selectedQuery === qr.id
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              Query-Response Pair
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                              {qr.query.substring(0, 60)}...
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-500">{qr.id}</span>
                              {qr.groundingGap && (
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                                  Grounding Gap
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Explainability Analysis */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedQuery && selectedQueryData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Explanation Analysis: {selectedQueryData.riskName}
                  </h3>
                  <button 
                    onClick={() => setShowConfigModal(true)}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Configure Methods</span>
                  </button>
                </div>

                {/* Query-Response Viewer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Input Query</span>
                    </h4>
                    <div className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-600 p-3 rounded border">
                      {selectedQueryData.query}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>Model Response</span>
                    </h4>
                    <div className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-600 p-3 rounded border">
                      {selectedQueryData.response}
                    </div>
                  </div>
                </div>

                {/* Grounding Context */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-3">Grounding Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">Expected Grounding</span>
                      <div className="text-sm text-yellow-900 dark:text-yellow-100 font-medium">{selectedQueryData.actualGrounding}</div>
                    </div>
                    <div>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">Model Grounding</span>
                      <div className="text-sm text-yellow-900 dark:text-yellow-100 font-medium">{selectedQueryData.modelGrounding}</div>
                    </div>
                  </div>
                  {selectedQueryData.groundingGap && (
                    <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-200">Grounding Gap Detected</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Explainability Panel Tabs */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="border-b border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-6 px-6">
                      {explainabilityMethods.map(method => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setActiveExplanationTab(method.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                              activeExplanationTab === method.id
                                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{method.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Attribution View */}
                    {activeExplanationTab === 'attribution' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Token Attribution Analysis (SHAP/LIME Style)</h4>
                        <div className="space-y-3">
                          {selectedQueryData.explanation.attribution.map((attr, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="flex-1 flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-white w-32">
                                  "{attr.token}"
                                </span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 relative">
                                  <div 
                                    className={`h-3 rounded-full ${getImportanceColor(attr.importance)}`}
                                    style={{ width: `${getImportanceWidth(attr.importance)}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                                  {(attr.importance * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Attribution Insights</h5>
                          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            {selectedQueryData.explanation.attribution.map((attr, index) => (
                              <li key={index}>• <strong>"{attr.token}"</strong>: {attr.description}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Grounding Alignment */}
                    {activeExplanationTab === 'grounding' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">KB Passage Alignment & Retrieval Source</h4>
                        <div className="bg-white dark:bg-gray-600 p-4 rounded-lg border">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Grounding Source</h5>
                          <div className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                            {selectedQueryData.explanation.groundingSource}
                          </div>
                          {selectedQueryData.groundingGap && (
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-700">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                <span className="font-medium text-red-800 dark:text-red-200">Grounding Gap Analysis</span>
                              </div>
                              <div className="text-sm text-red-800 dark:text-red-200">
                                <div><strong>Expected:</strong> {selectedQueryData.actualGrounding}</div>
                                <div><strong>Actual:</strong> {selectedQueryData.modelGrounding}</div>
                                <div className="mt-2"><strong>Root Cause:</strong> {selectedQueryData.explanation.rootCause}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reasoning Trace */}
                    {activeExplanationTab === 'reasoning' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Step-by-Step Decision Process</h4>
                        <div className="space-y-3">
                          {selectedQueryData.explanation.reasoningTrace.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-600 rounded-lg border">
                              <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-900 dark:text-white">{step}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {selectedQueryData.explanation.biasAnalysis && (
                          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                            <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Bias Analysis</h5>
                            <div className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                              <div><strong>Factors:</strong> {selectedQueryData.explanation.biasAnalysis.demographicFactors.join(', ')}</div>
                              <div><strong>Detection:</strong> {selectedQueryData.explanation.biasAnalysis.biasDetected}</div>
                              <div><strong>Recommendation:</strong> {selectedQueryData.explanation.biasAnalysis.recommendation}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Saliency Map */}
                    {activeExplanationTab === 'saliency' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Visual Influence Heatmap</h4>
                        <div className="bg-white dark:bg-gray-600 p-4 rounded-lg border">
                          <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                            {selectedQueryData.query.split(' ').map((word, index) => {
                              const attribution = selectedQueryData.explanation.attribution.find(attr => 
                                attr.token.toLowerCase() === word.toLowerCase()
                              );
                              const importance = attribution?.importance || 0;
                              
                              return (
                                <span
                                  key={index}
                                  className="inline-block mr-1 mb-1 px-1 rounded"
                                  style={{
                                    backgroundColor: importance > 0.3 ? 'rgba(239, 68, 68, 0.3)' :
                                                   importance > 0.2 ? 'rgba(245, 158, 11, 0.3)' :
                                                   importance > 0.1 ? 'rgba(59, 130, 246, 0.3)' :
                                                   'transparent'
                                  }}
                                  title={attribution ? `Importance: ${(importance * 100).toFixed(1)}%` : 'No attribution'}
                                >
                                  {word}
                                </span>
                              );
                            })}
                          </div>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                            Color intensity indicates token influence on model decision
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Evidence Capture */}
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-emerald-900 dark:text-emerald-100">Evidence Capture</h4>
                      <button 
                        disabled={!canCreate}
                        className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save as Evidence</span>
                      </button>
                    </div>
                    <div className="text-sm text-emerald-800 dark:text-emerald-200">
                      Explanation will be stored with compliance logs for audit trail and governance review.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Failed Case</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a failed evaluation case from the left panel to analyze why the model behaved that way</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explainability Report Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Explainability Report</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Query ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Primary Attribution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Grounding Source</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Root Cause</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {queryResponsePairs.map((qr, index) => (
                <tr key={qr.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                  <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{qr.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{qr.useCaseName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{qr.riskName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {qr.explanation.attribution[0]?.token} ({(qr.explanation.attribution[0]?.importance * 100).toFixed(0)}%)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="max-w-xs truncate" title={qr.explanation.groundingSource}>
                      {qr.explanation.groundingSource}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="max-w-xs truncate" title={qr.explanation.rootCause}>
                      {qr.explanation.rootCause}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for explanation analysis access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Explanations</span>
              </button>
              <button 
                onClick={handleComplete}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configure Explainability Methods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Select and configure explanation techniques for model analysis
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Explanation Methods
                </label>
                <div className="space-y-3">
                  {explainabilityMethods.map(method => {
                    const Icon = method.icon;
                    return (
                      <label key={method.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300" />
                        <Icon className={`w-5 h-5 text-${method.color}-600 dark:text-${method.color}-400 mt-0.5`} />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{method.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attribution Detail Level
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option>High Detail (Top 10 tokens)</option>
                    <option>Medium Detail (Top 5 tokens)</option>
                    <option>Low Detail (Top 3 tokens)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Explanation Confidence Threshold
                  </label>
                  <input
                    type="number"
                    defaultValue={0.1}
                    min={0.01}
                    max={1.0}
                    step={0.01}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Configuration will apply to all explanation analyses
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Apply Configuration
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
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Explainability Analysis Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explanation Records</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Cases Analyzed: {queryResponsePairs.length}</div>
                <div>Root Causes Identified: {queryResponsePairs.length}</div>
                <div>Evidence Captured: ✓</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Insights</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Grounding Gaps: {queryResponsePairs.filter(qr => qr.groundingGap).length}</div>
                <div>Attribution Analysis: ✓</div>
                <div>Reasoning Traces: ✓</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Step</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Explanations complete</div>
                <div>✓ Ready for Trust Analytics</div>
                <div>✓ Evidence ready for audit</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplainabilityEngine;