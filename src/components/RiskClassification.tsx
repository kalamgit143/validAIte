import React, { useState } from 'react';
import { AlertTriangle, Shield, Target, Brain, Users, FileText, CheckCircle, XCircle, Clock, Eye, CreditCard as Edit, Download, Plus, BarChart3, Activity, Globe, Lock, Heart, Scale, Building, Gavel, ArrowRight, ArrowDown, ArrowLeft, Layers, Save, Database, List, Tag } from 'lucide-react';

interface RiskClassificationProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const RiskClassification: React.FC<RiskClassificationProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [showCustomRiskModal, setShowCustomRiskModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock Application Profile from Step 1
  const applicationProfile = {
    name: 'Healthcare Triage Assistant',
    type: 'LLM+RAG',
    domain: 'Healthcare',
    environment: 'Production',
    businessCriticality: 'Mission Critical',
    euAiActClass: 'High Risk',
    oversightLevel: 'Human-in-the-Loop'
  };

  // Mock Use Case Catalog from Step 2
  const useCaseCatalog = [
    {
      id: 'UC1',
      title: 'Emergency Patient Triage',
      description: 'Assess patient symptoms and assign triage priority based on severity and urgency',
      criticality: 'High',
      source: 'Business Workflow'
    },
    {
      id: 'UC2',
      title: 'Symptom Documentation',
      description: 'Document patient symptoms and medical history for healthcare providers',
      criticality: 'Medium',
      source: 'Domain Expert'
    },
    {
      id: 'UC3',
      title: 'Treatment Recommendation',
      description: 'Provide initial treatment recommendations based on symptoms and medical history',
      criticality: 'High',
      source: 'Chat Logs'
    }
  ];

  // Predefined Risk Taxonomy
  const riskTaxonomy = [
    {
      id: 'hallucination',
      name: 'Hallucination',
      description: 'Model generating false or misleading medical information',
      category: 'accuracy',
      icon: Brain,
      color: 'red'
    },
    {
      id: 'retrieval_error',
      name: 'Retrieval Error',
      description: 'Incorrect or irrelevant medical information retrieval from knowledge base',
      category: 'grounding',
      icon: Database,
      color: 'orange'
    },
    {
      id: 'grounding_gap',
      name: 'Grounding Gap',
      description: 'Disconnect between model output and authoritative medical knowledge',
      category: 'grounding',
      icon: Target,
      color: 'yellow'
    },
    {
      id: 'kb_drift',
      name: 'Knowledge Base Drift',
      description: 'Outdated or obsolete medical knowledge affecting recommendations',
      category: 'data_quality',
      icon: Activity,
      color: 'blue'
    },
    {
      id: 'privacy_leakage',
      name: 'Privacy Leakage',
      description: 'Exposure of patient personal health information (PHI)',
      category: 'privacy',
      icon: Lock,
      color: 'purple'
    },
    {
      id: 'bias_fairness',
      name: 'Bias & Fairness',
      description: 'Discriminatory treatment based on demographics, insurance status, or other factors',
      category: 'fairness',
      icon: Users,
      color: 'green'
    },
    {
      id: 'prompt_injection',
      name: 'Prompt Injection/Security',
      description: 'Malicious prompts attempting to manipulate medical recommendations',
      category: 'security',
      icon: Shield,
      color: 'red'
    },
    {
      id: 'misrouting',
      name: 'Intent Misrouting',
      description: 'Incorrect classification of patient intent leading to wrong care pathway',
      category: 'routing',
      icon: ArrowRight,
      color: 'orange'
    }
  ];

  // Risk Register State
  const [riskRegister, setRiskRegister] = useState<any[]>([
    {
      id: 'RR001',
      useCaseId: 'UC1',
      useCaseTitle: 'Emergency Patient Triage',
      riskId: 'hallucination',
      riskName: 'Hallucination',
      severity: 'High',
      likelihood: 'Occasional',
      description: 'False medical information could lead to incorrect triage priority, potentially endangering patient safety',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Sarah Chen'
    }
  ]);

  const [currentRiskForm, setCurrentRiskForm] = useState({
    riskId: '',
    severity: '',
    likelihood: '',
    description: ''
  });

  const selectedUseCaseData = useCaseCatalog.find(uc => uc.id === selectedUseCase);
  const useCaseRisks = riskRegister.filter(risk => risk.useCaseId === selectedUseCase);

  const handleSaveRiskClassification = () => {
    if (!selectedUseCase || !currentRiskForm.riskId || !currentRiskForm.severity || !currentRiskForm.likelihood || !currentRiskForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedRisk = riskTaxonomy.find(r => r.id === currentRiskForm.riskId);
    const newRiskEntry = {
      id: `RR${String(riskRegister.length + 1).padStart(3, '0')}`,
      useCaseId: selectedUseCase,
      useCaseTitle: selectedUseCaseData?.title || '',
      riskId: currentRiskForm.riskId,
      riskName: selectedRisk?.name || '',
      severity: currentRiskForm.severity,
      likelihood: currentRiskForm.likelihood,
      description: currentRiskForm.description,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Current User'
    };

    setRiskRegister(prev => [...prev, newRiskEntry]);
    setCurrentRiskForm({ riskId: '', severity: '', likelihood: '', description: '' });
  };

  const handleComplete = () => {
    if (riskRegister.length === 0) {
      alert('Please classify risks for at least one use case before proceeding');
      return;
    }
    setIsComplete(true);
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-gray-900';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
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

  const getRiskCounts = () => {
    return {
      total: riskRegister.length,
      high: riskRegister.filter(r => r.severity === 'High').length,
      medium: riskRegister.filter(r => r.severity === 'Medium').length,
      low: riskRegister.filter(r => r.severity === 'Low').length
    };
  };

  const counts = getRiskCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Risk Classification</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>Input to Governance Controls</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Classify risks for each use case using predefined taxonomy</p>
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

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Use Case Catalog */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <List className="w-5 h-5 text-green-600" />
              <span>Use Case Catalog</span>
            </h3>
            
            <div className="space-y-3">
              {useCaseCatalog.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setSelectedUseCase(useCase.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedUseCase === useCase.id
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{useCase.title}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCriticalityColor(useCase.criticality)}`}>
                      {useCase.criticality}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{useCase.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{useCase.id} • {useCase.source}</span>
                    <span>{useCaseRisks.length} risks classified</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Risk Register Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Risk Register Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="font-bold text-red-600 dark:text-red-400">{counts.high}</div>
                  <div className="text-red-600 dark:text-red-400">High</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div className="font-bold text-yellow-600 dark:text-yellow-400">{counts.medium}</div>
                  <div className="text-yellow-600 dark:text-yellow-400">Medium</div>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 dark:text-green-400">{counts.low}</div>
                  <div className="text-green-600 dark:text-green-400">Low</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Risk Classification Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedUseCase ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Risk Classification: {selectedUseCaseData?.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setShowCustomRiskModal(true)}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Custom Risk</span>
                    </button>
                  </div>
                </div>

                {/* Use Case Context */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use Case Context</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{selectedUseCaseData?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                    <span>ID: {selectedUseCaseData?.id}</span>
                    <span>Criticality: {selectedUseCaseData?.criticality}</span>
                    <span>Source: {selectedUseCaseData?.source}</span>
                  </div>
                </div>

                {/* Suggested Risks */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Suggested Risks (Based on Application Profile)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {riskTaxonomy.map((risk) => {
                      const Icon = risk.icon;
                      const isClassified = useCaseRisks.some(r => r.riskId === risk.id);
                      
                      return (
                        <div
                          key={risk.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            currentRiskForm.riskId === risk.id
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : isClassified
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                          onClick={() => !isClassified && setCurrentRiskForm(prev => ({ ...prev, riskId: risk.id }))}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className={`w-5 h-5 text-${risk.color}-600 dark:text-${risk.color}-400`} />
                            <span className="font-medium text-gray-900 dark:text-white">{risk.name}</span>
                            {isClassified && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{risk.description}</p>
                          <div className="mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${risk.color}-100 text-${risk.color}-800 dark:bg-${risk.color}-900/20 dark:text-${risk.color}-300`}>
                              {risk.category.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Risk Classification Form */}
                {currentRiskForm.riskId && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-4">
                      Classify Risk: {riskTaxonomy.find(r => r.id === currentRiskForm.riskId)?.name}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                          Severity *
                        </label>
                        <select
                          value={currentRiskForm.severity}
                          onChange={(e) => setCurrentRiskForm(prev => ({ ...prev, severity: e.target.value }))}
                          className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 rounded-lg focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select Severity</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                          Likelihood *
                        </label>
                        <select
                          value={currentRiskForm.likelihood}
                          onChange={(e) => setCurrentRiskForm(prev => ({ ...prev, likelihood: e.target.value }))}
                          className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 rounded-lg focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select Likelihood</option>
                          <option value="Frequent">Frequent</option>
                          <option value="Occasional">Occasional</option>
                          <option value="Rare">Rare</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                        Risk Description *
                      </label>
                      <textarea
                        value={currentRiskForm.description}
                        onChange={(e) => setCurrentRiskForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe how this risk could manifest in this specific use case and its potential impact..."
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 rounded-lg focus:ring-2 focus:ring-red-500 h-20 resize-none"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleSaveRiskClassification}
                        disabled={!canCreate}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Risk Classification</span>
                      </button>
                      <button
                        onClick={() => setCurrentRiskForm({ riskId: '', severity: '', likelihood: '', description: '' })}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Classified Risks for Selected Use Case */}
                {useCaseRisks.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Classified Risks ({useCaseRisks.length})</h4>
                    {useCaseRisks.map((risk) => (
                      <div key={risk.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">{risk.riskName}</span>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                                {risk.severity}
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(risk.likelihood)}`}>
                                {risk.likelihood}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{risk.description}</p>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {risk.id} • Created by {risk.createdBy} • {new Date(risk.createdAt).toLocaleDateString()}
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
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Use Case</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a use case from the left panel to begin risk classification</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Register Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Risk Register</h3>
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

        {riskRegister.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Likelihood</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {riskRegister.map((risk, index) => (
                  <tr key={risk.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{risk.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{risk.useCaseTitle}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{risk.riskName}</td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(risk.likelihood)}`}>
                        {risk.likelihood}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div className="max-w-xs truncate" title={risk.description}>
                        {risk.description}
                      </div>
                    </td>
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
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Risks Classified Yet</h4>
            <p className="text-gray-600 dark:text-gray-400">Select a use case and classify its risks to build your Risk Register</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for risk classification access"}
        </div>
        
        <div className="flex items-center space-x-3">
          {canCreate && (
            <>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Progress</span>
              </button>
              <button 
                onClick={handleComplete}
                disabled={riskRegister.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom Risk Modal */}
      {showCustomRiskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Custom Risk</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a custom risk not covered by the standard taxonomy
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Name *
                </label>
                <input
                  type="text"
                  placeholder="Custom Risk Name"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Category
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Accuracy</option>
                  <option>Grounding</option>
                  <option>Data Quality</option>
                  <option>Privacy</option>
                  <option>Fairness</option>
                  <option>Security</option>
                  <option>Routing</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Description *
                </label>
                <textarea
                  placeholder="Describe the custom risk and its potential impact..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Severity *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Severity</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Likelihood *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Likelihood</option>
                    <option>Frequent</option>
                    <option>Occasional</option>
                    <option>Rare</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Custom risk will be added to the taxonomy for future use
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCustomRiskModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Custom Risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Risk Classification Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Register</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Use Cases Analyzed: {useCaseCatalog.length}</div>
                <div>Total Risks: {riskRegister.length}</div>
                <div>High Severity: {counts.high}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Distribution</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>High: {counts.high}</div>
                <div>Medium: {counts.medium}</div>
                <div>Low: {counts.low}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Controls</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Classification Complete</div>
                <div>✓ Ready for Governance Controls</div>
                <div>✓ Export Available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskClassification;