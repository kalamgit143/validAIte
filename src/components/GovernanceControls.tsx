import React, { useState } from 'react';
import { Shield, Settings, CheckCircle, XCircle, Clock, AlertTriangle, Users, FileText, Target, Eye, CreditCard as Edit, Download, Plus, Play, Pause, BarChart3, Activity, Lock, Globe, Brain, Scale, Heart, Code, Database, Zap, Crown, Gavel, ArrowRight, ArrowDown, ArrowLeft, Layers, Save, Link2, Filter } from 'lucide-react';

interface GovernanceControlsProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const GovernanceControls: React.FC<GovernanceControlsProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [showCustomControlModal, setShowCustomControlModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock input from Risk Classification (Component 3)
  const inputFromRiskClassification = {
    riskRegister: [
      {
        useCaseId: 'UC1',
        useCaseName: 'Emergency Patient Triage',
        risks: [
          {
            id: 'RR001',
            riskId: 'hallucination',
            riskName: 'Hallucination',
            severity: 'High',
            likelihood: 'Frequent',
            description: 'False medical information could lead to misdiagnosis'
          },
          {
            id: 'RR002',
            riskId: 'grounding_gap',
            riskName: 'Grounding Gap',
            severity: 'Medium',
            likelihood: 'Occasional',
            description: 'Disconnect between model output and medical knowledge'
          }
        ]
      },
      {
        useCaseId: 'UC2',
        useCaseName: 'Symptom Documentation',
        risks: [
          {
            id: 'RR003',
            riskId: 'privacy_leakage',
            riskName: 'Privacy Leakage',
            severity: 'High',
            likelihood: 'Rare',
            description: 'Exposure of patient personal health information'
          }
        ]
      }
    ]
  };

  const controlLibrary = [
    {
      id: 'ctrl_001',
      name: 'Canonical KB Tagging',
      description: 'Ensure knowledge base content is properly tagged and validated',
      type: 'preventive',
      category: 'grounding',
      applicableRisks: ['hallucination', 'grounding_gap', 'retrieval_error']
    },
    {
      id: 'ctrl_002',
      name: 'Grounding Threshold',
      description: 'Set minimum confidence thresholds for knowledge retrieval',
      type: 'preventive',
      category: 'quality',
      applicableRisks: ['hallucination', 'grounding_gap']
    },
    {
      id: 'ctrl_003',
      name: 'Freshness Monitoring',
      description: 'Monitor and update knowledge base for currency',
      type: 'detective',
      category: 'data_quality',
      applicableRisks: ['kb_drift', 'grounding_gap']
    },
    {
      id: 'ctrl_004',
      name: 'PII Masking',
      description: 'Automatically detect and mask personally identifiable information',
      type: 'preventive',
      category: 'privacy',
      applicableRisks: ['privacy_leakage']
    },
    {
      id: 'ctrl_005',
      name: 'HITL Fallback',
      description: 'Human-in-the-loop escalation for uncertain cases',
      type: 'corrective',
      category: 'oversight',
      applicableRisks: ['hallucination', 'bias_fairness', 'misrouting']
    },
    {
      id: 'ctrl_006',
      name: 'Red-Team Testing',
      description: 'Continuous adversarial testing and security validation',
      type: 'detective',
      category: 'security',
      applicableRisks: ['prompt_injection', 'bias_fairness']
    }
  ];

  // Control Framework State
  const [controlFramework, setControlFramework] = useState<any[]>([
    {
      id: 'CF001',
      useCaseId: 'UC1',
      useCaseName: 'Emergency Patient Triage',
      riskId: 'RR001',
      riskName: 'Hallucination',
      controlType: 'Preventive',
      controlId: 'ctrl_001',
      controlName: 'Canonical KB Tagging',
      owner: 'Governance Lead',
      effectiveness: 'High',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Sarah Chen'
    }
  ]);

  const [currentControlForm, setCurrentControlForm] = useState({
    controlType: '',
    controlId: '',
    customControl: '',
    owner: '',
    effectiveness: ''
  });

  const selectedRiskData = inputFromRiskClassification.riskRegister
    .flatMap(uc => uc.risks.map(risk => ({ ...risk, useCaseId: uc.useCaseId, useCaseName: uc.useCaseName })))
    .find(risk => risk.id === selectedRisk);

  const riskControls = controlFramework.filter(cf => cf.riskId === selectedRisk);
  const suggestedControls = controlLibrary.filter(control => 
    selectedRiskData ? control.applicableRisks.includes(selectedRiskData.riskId) : []
  );

  const handleSaveControlMapping = () => {
    if (!selectedRisk || !currentControlForm.controlType || (!currentControlForm.controlId && !currentControlForm.customControl) || !currentControlForm.owner || !currentControlForm.effectiveness) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedControl = controlLibrary.find(c => c.id === currentControlForm.controlId);
    const newControlEntry = {
      id: `CF${String(controlFramework.length + 1).padStart(3, '0')}`,
      useCaseId: selectedRiskData?.useCaseId || '',
      useCaseName: selectedRiskData?.useCaseName || '',
      riskId: selectedRisk,
      riskName: selectedRiskData?.riskName || '',
      controlType: currentControlForm.controlType,
      controlId: currentControlForm.controlId || 'custom',
      controlName: selectedControl?.name || currentControlForm.customControl,
      owner: currentControlForm.owner,
      effectiveness: currentControlForm.effectiveness,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Current User'
    };

    setControlFramework(prev => [...prev, newControlEntry]);
    setCurrentControlForm({ controlType: '', controlId: '', customControl: '', owner: '', effectiveness: '' });
  };

  const handleComplete = () => {
    if (controlFramework.length === 0) {
      alert('Please assign controls to at least one risk before proceeding');
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

  const getControlTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'preventive': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'detective': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'corrective': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness.toLowerCase()) {
      case 'high': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getControlCounts = () => {
    return {
      total: controlFramework.length,
      preventive: controlFramework.filter(cf => cf.controlType === 'Preventive').length,
      detective: controlFramework.filter(cf => cf.controlType === 'Detective').length,
      corrective: controlFramework.filter(cf => cf.controlType === 'Corrective').length
    };
  };

  const counts = getControlCounts();

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Governance Controls</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Input to Governance Matrix</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Assign controls to mitigate identified risks</p>
        </div>
      </div>

      {/* Input from Previous Component */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h3 className="font-semibold text-red-900 dark:text-red-100">Input from Risk Classification</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Register</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Use Cases: {inputFromRiskClassification.riskRegister.length}</div>
              <div>Total Risks: {inputFromRiskClassification.riskRegister.reduce((sum, r) => sum + r.risks.length, 0)}</div>
              <div>High Severity: {inputFromRiskClassification.riskRegister.flatMap(r => r.risks).filter(risk => risk.severity === 'High').length}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Categories</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Hallucination: 1</div>
              <div>Grounding Gap: 1</div>
              <div>Privacy: 1</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Control Mapping</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Risks identified</div>
              <div>✓ Severity assessed</div>
              <div>✓ Ready for mitigation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <li>• Risks (from classification)</li>
              <li>• Control library catalog</li>
              <li>• Human mapping decisions</li>
              <li>• Mitigation strategies</li>
              <li>• Implementation preferences</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Control Mapping</h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">Assigning controls to risks</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <li>• Control Framework (Risk → Control)</li>
              <li>• Control types categorized</li>
              <li>• Mitigation effectiveness scores</li>
              <li>• Evidence: Control assignments</li>
              <li>• Ready for matrix generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Risk Register */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Risk Register</span>
            </h3>
            
            <div className="space-y-4">
              {inputFromRiskClassification.riskRegister.map((useCase) => (
                <div key={useCase.useCaseId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{useCase.useCaseName}</h4>
                  <div className="space-y-2">
                    {useCase.risks.map((risk) => {
                      const isSelected = selectedRisk === risk.id;
                      const hasControls = controlFramework.some(cf => cf.riskId === risk.id);
                      
                      return (
                        <button
                          key={risk.id}
                          onClick={() => setSelectedRisk(risk.id)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : hasControls
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{risk.riskName}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                                {risk.severity}
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(risk.likelihood)}`}>
                                {risk.likelihood}
                              </div>
                              {hasControls && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {risk.id} • {controlFramework.filter(cf => cf.riskId === risk.id).length} controls assigned
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Control Framework Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Control Framework Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
                  <div className="font-bold text-gray-900 dark:text-white">{counts.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 dark:text-green-400">{counts.preventive}</div>
                  <div className="text-green-600 dark:text-green-400">Preventive</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="font-bold text-blue-600 dark:text-blue-400">{counts.detective}</div>
                  <div className="text-blue-600 dark:text-blue-400">Detective</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div className="font-bold text-yellow-600 dark:text-yellow-400">{counts.corrective}</div>
                  <div className="text-yellow-600 dark:text-yellow-400">Corrective</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Control Assignment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {selectedRisk && selectedRiskData ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Control Assignment: {selectedRiskData.riskName}
                  </h3>
                  <button 
                    onClick={() => setShowCustomControlModal(true)}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Custom Control</span>
                  </button>
                </div>

                {/* Risk Context */}
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Risk Context</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Use Case</span>
                      <div className="text-sm text-red-900 dark:text-red-100 font-medium">{selectedRiskData.useCaseName}</div>
                    </div>
                    <div>
                      <span className="text-xs text-red-600 dark:text-red-400">Risk ID</span>
                      <div className="text-sm text-red-900 dark:text-red-100 font-mono">{selectedRiskData.id}</div>
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
                  <p className="text-sm text-red-800 dark:text-red-200">{selectedRiskData.description}</p>
                </div>

                {/* Control Assignment Form */}
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-4">Assign Control</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                        Control Type *
                      </label>
                      <select
                        value={currentControlForm.controlType}
                        onChange={(e) => setCurrentControlForm(prev => ({ ...prev, controlType: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Control Type</option>
                        <option value="Preventive">Preventive</option>
                        <option value="Detective">Detective</option>
                        <option value="Corrective">Corrective</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                        Control Owner *
                      </label>
                      <select
                        value={currentControlForm.owner}
                        onChange={(e) => setCurrentControlForm(prev => ({ ...prev, owner: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Owner</option>
                        <option value="Governance Lead">Governance Lead</option>
                        <option value="QA Engineer">QA Engineer</option>
                        <option value="SecOps Engineer">SecOps Engineer</option>
                        <option value="Domain Reviewer">Domain Reviewer</option>
                        <option value="CISO">CISO</option>
                        <option value="Compliance Officer">Compliance Officer</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Control Library (Multi-select) *
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {suggestedControls.map((control) => (
                        <label
                          key={control.id}
                          className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                            currentControlForm.controlId === control.id
                              ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="control"
                            value={control.id}
                            checked={currentControlForm.controlId === control.id}
                            onChange={(e) => setCurrentControlForm(prev => ({ ...prev, controlId: e.target.value, customControl: '' }))}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{control.name}</span>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getControlTypeColor(control.type)}`}>
                                {control.type}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{control.description}</p>
                          </div>
                        </label>
                      ))}
                      
                      {/* Custom Control Option */}
                      <label className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        currentControlForm.controlId === 'custom'
                          ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}>
                        <input
                          type="radio"
                          name="control"
                          value="custom"
                          checked={currentControlForm.controlId === 'custom'}
                          onChange={(e) => setCurrentControlForm(prev => ({ ...prev, controlId: e.target.value }))}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">Custom Control</span>
                          {currentControlForm.controlId === 'custom' && (
                            <textarea
                              value={currentControlForm.customControl}
                              onChange={(e) => setCurrentControlForm(prev => ({ ...prev, customControl: e.target.value }))}
                              placeholder="Describe your custom control..."
                              className="w-full mt-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm h-16 resize-none"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Effectiveness Rating *
                    </label>
                    <select
                      value={currentControlForm.effectiveness}
                      onChange={(e) => setCurrentControlForm(prev => ({ ...prev, effectiveness: e.target.value }))}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Effectiveness</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <button
                      onClick={handleSaveControlMapping}
                      disabled={!canCreate}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Control Mapping</span>
                    </button>
                    <button
                      onClick={() => setCurrentControlForm({ controlType: '', controlId: '', customControl: '', owner: '', effectiveness: '' })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Clear Form
                    </button>
                  </div>
                </div>

                {/* Assigned Controls for Selected Risk */}
                {riskControls.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Assigned Controls ({riskControls.length})</h4>
                    {riskControls.map((control) => (
                      <div key={control.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">{control.controlName}</span>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getControlTypeColor(control.controlType)}`}>
                                {control.controlType}
                              </div>
                              <span className={`text-sm font-medium ${getEffectivenessColor(control.effectiveness)}`}>
                                {control.effectiveness} Effectiveness
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Owner: {control.owner}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {control.id} • Created by {control.createdBy} • {new Date(control.createdAt).toLocaleDateString()}
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
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Risk</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose a risk from the left panel to assign governance controls</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Framework Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Control Framework</h3>
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

        {controlFramework.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Control Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Control</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Effectiveness</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {controlFramework.map((control, index) => (
                  <tr key={control.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{control.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{control.useCaseName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{control.riskName}</td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getControlTypeColor(control.controlType)}`}>
                        {control.controlType}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div className="max-w-xs truncate" title={control.controlName}>
                        {control.controlName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{control.owner}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-medium ${getEffectivenessColor(control.effectiveness)}`}>
                        {control.effectiveness}
                      </span>
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
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Controls Assigned Yet</h4>
            <p className="text-gray-600 dark:text-gray-400">Select a risk and assign controls to build your Control Framework</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {!canCreate && "View-only mode - Contact administrator for control assignment access"}
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
                disabled={controlFramework.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Complete & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom Control Modal */}
      {showCustomControlModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Custom Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a custom control not available in the standard library
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Name *
                </label>
                <input
                  type="text"
                  placeholder="Custom Control Name"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Type *
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Control Type</option>
                  <option>Preventive</option>
                  <option>Detective</option>
                  <option>Corrective</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Description *
                </label>
                <textarea
                  placeholder="Describe the custom control and how it mitigates the risk..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Category
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Grounding</option>
                    <option>Quality</option>
                    <option>Data Quality</option>
                    <option>Privacy</option>
                    <option>Oversight</option>
                    <option>Security</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Implementation Type
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Automated</option>
                    <option>Manual</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Custom control will be added to the library for future use
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCustomControlModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Add Custom Control
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output Preview */}
      {isComplete && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            <h3 className="text-lg font-semibold text-violet-900 dark:text-violet-100">Governance Controls Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Control Framework</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Risk-Control Mappings: {controlFramework.length}</div>
                <div>Controls Assigned: {controlFramework.length}</div>
                <div>Risks Covered: {new Set(controlFramework.map(cf => cf.riskId)).size}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Control Types</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Preventive: {counts.preventive}</div>
                <div>Detective: {counts.detective}</div>
                <div>Corrective: {counts.corrective}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Matrix</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Controls assigned</div>
                <div>✓ Owners identified</div>
                <div>✓ Ready for traceability</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceControls;