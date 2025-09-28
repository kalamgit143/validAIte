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
  const [activeTab, setActiveTab] = useState('controls');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock input from Risk Classification (Component 3)
  const inputFromRiskClassification = {
    riskRegister: [
      {
        useCaseId: 'scenario_001',
        useCaseName: 'Emergency Patient Triage',
        risks: [
          {
            id: 'scenario_001_hallucination',
            category: 'hallucination',
            severity: 'high',
            likelihood: 'medium',
            impact: 'catastrophic',
            description: 'False medical information could lead to misdiagnosis'
          },
          {
            id: 'scenario_001_bias',
            category: 'bias',
            severity: 'high',
            likelihood: 'medium',
            impact: 'major',
            description: 'Biased triage decisions affecting patient care equity'
          }
        ],
        overallRiskScore: 8.2,
        riskLevel: 'high'
      }
    ],
    riskSeverityMatrix: {
      high: 1,
      medium: 1,
      low: 0
    }
  };

  const controlLibrary = [
    {
      id: 'ctrl_001',
      name: 'Canonical KB Tagging',
      description: 'Ensure knowledge base content is properly tagged and validated',
      type: 'preventive',
      category: 'grounding',
      applicableRisks: ['hallucination', 'grounding_gap', 'retrieval_error'],
      implementation: 'automated',
      effectiveness: 92
    },
    {
      id: 'ctrl_002',
      name: 'Grounding Threshold Control',
      description: 'Set minimum confidence thresholds for knowledge retrieval',
      type: 'preventive',
      category: 'quality',
      applicableRisks: ['hallucination', 'grounding_gap'],
      implementation: 'automated',
      effectiveness: 88
    },
    {
      id: 'ctrl_003',
      name: 'Freshness Monitoring',
      description: 'Monitor and update knowledge base for currency',
      type: 'detective',
      category: 'data_quality',
      applicableRisks: ['drift', 'grounding_gap'],
      implementation: 'automated',
      effectiveness: 85
    },
    {
      id: 'ctrl_004',
      name: 'PII Masking',
      description: 'Automatically detect and mask personally identifiable information',
      type: 'preventive',
      category: 'privacy',
      applicableRisks: ['privacy'],
      implementation: 'automated',
      effectiveness: 96
    },
    {
      id: 'ctrl_005',
      name: 'HITL Fallback',
      description: 'Human-in-the-loop escalation for uncertain cases',
      type: 'corrective',
      category: 'oversight',
      applicableRisks: ['hallucination', 'bias', 'misrouting'],
      implementation: 'manual',
      effectiveness: 94
    },
    {
      id: 'ctrl_006',
      name: 'Red-Team Testing',
      description: 'Continuous adversarial testing and security validation',
      type: 'detective',
      category: 'security',
      applicableRisks: ['security', 'bias'],
      implementation: 'automated',
      effectiveness: 89
    }
  ];

  const riskControlMappings = [
    {
      riskId: 'scenario_001_hallucination',
      riskName: 'Medical Hallucination Risk',
      assignedControls: [
        { controlId: 'ctrl_001', controlName: 'Canonical KB Tagging', effectiveness: 92 },
        { controlId: 'ctrl_002', controlName: 'Grounding Threshold Control', effectiveness: 88 },
        { controlId: 'ctrl_005', controlName: 'HITL Fallback', effectiveness: 94 }
      ],
      overallMitigation: 91,
      residualRisk: 'medium'
    },
    {
      riskId: 'scenario_001_bias',
      riskName: 'Triage Bias Risk',
      assignedControls: [
        { controlId: 'ctrl_005', controlName: 'HITL Fallback', effectiveness: 94 },
        { controlId: 'ctrl_006', controlName: 'Red-Team Testing', effectiveness: 89 }
      ],
      overallMitigation: 87,
      residualRisk: 'low'
    }
  ];

  // Generated output for next component
  const generateOutput = () => {
    return {
      controlFramework: riskControlMappings.map(mapping => ({
        riskId: mapping.riskId,
        riskName: mapping.riskName,
        controls: mapping.assignedControls,
        mitigationLevel: mapping.overallMitigation,
        residualRisk: mapping.residualRisk
      })),
      controlTypes: {
        preventive: controlLibrary.filter(c => c.type === 'preventive').length,
        detective: controlLibrary.filter(c => c.type === 'detective').length,
        corrective: controlLibrary.filter(c => c.type === 'corrective').length
      },
      evidence: {
        controlAssignments: `${riskControlMappings.length} risk-control mappings`,
        avgMitigation: Math.round(riskControlMappings.reduce((sum, m) => sum + m.overallMitigation, 0) / riskControlMappings.length),
        auditReady: true,
        timestamp: new Date().toISOString()
      }
    };
  };

  const handleComplete = () => {
    setIsComplete(true);
    console.log('Governance Controls Output:', generateOutput());
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  const getControlTypeColor = (type: string) => {
    switch (type) {
      case 'preventive': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'detective': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'corrective': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return 'text-green-600 dark:text-green-400';
    if (effectiveness >= 80) return 'text-blue-600 dark:text-blue-400';
    if (effectiveness >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

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
        
        {/* Flow Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-blue-600 dark:text-blue-400">Application Setup</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-green-600 dark:text-green-400">Use Case Definition</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-red-600 dark:text-red-400">Risk Classification</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-purple-600 dark:text-purple-400">Governance Controls</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Matrix</span>
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
              <div>High Severity: {inputFromRiskClassification.riskSeverityMatrix.high}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Severity Matrix</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>High: {inputFromRiskClassification.riskSeverityMatrix.high}</div>
              <div>Medium: {inputFromRiskClassification.riskSeverityMatrix.medium}</div>
              <div>Low: {inputFromRiskClassification.riskSeverityMatrix.low}</div>
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

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['controls', 'mappings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'controls' ? 'Control Library' : 'Risk-Control Mappings'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'controls' ? (
            <div className="space-y-6">
              {/* Control Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'preventive', count: controlLibrary.filter(c => c.type === 'preventive').length, color: 'green' },
                  { type: 'detective', count: controlLibrary.filter(c => c.type === 'detective').length, color: 'blue' },
                  { type: 'corrective', count: controlLibrary.filter(c => c.type === 'corrective').length, color: 'yellow' }
                ].map((category) => (
                  <div key={category.type} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className={`text-3xl font-bold text-${category.color}-600 dark:text-${category.color}-400 mb-2`}>
                      {category.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category.type} Controls</div>
                  </div>
                ))}
              </div>

              {/* Control Library */}
              <div className="space-y-4">
                {controlLibrary.map((control) => (
                  <div key={control.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{control.name}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getControlTypeColor(control.type)}`}>
                            {control.type}
                          </div>
                          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {control.implementation}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{control.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Effectiveness</span>
                          <span className={`font-bold ${getEffectivenessColor(control.effectiveness)}`}>
                            {control.effectiveness}%
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {control.applicableRisks.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                              {risk.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {canCreate && (
                          <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40 flex items-center space-x-1">
                            <Link2 className="w-3 h-3" />
                            <span>Assign</span>
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk-Control Mappings */}
              {riskControlMappings.map((mapping) => (
                <div key={mapping.riskId} className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">{mapping.riskName}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          mapping.residualRisk === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          mapping.residualRisk === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {mapping.residualRisk.toUpperCase()} RESIDUAL RISK
                        </div>
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded font-mono">
                          {mapping.riskId}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-purple-600 dark:text-purple-400">Overall Mitigation</div>
                      <div className={`text-2xl font-bold ${getEffectivenessColor(mapping.overallMitigation)}`}>
                        {mapping.overallMitigation}%
                      </div>
                    </div>
                  </div>

                  {/* Assigned Controls */}
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span>Assigned Controls</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mapping.assignedControls.map((control) => (
                        <div key={control.controlId} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                            {control.controlName}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Effectiveness</span>
                            <span className={`text-sm font-bold ${getEffectivenessColor(control.effectiveness)}`}>
                              {control.effectiveness}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
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
                    disabled={riskControlMappings.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Complete & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
                <div>Risk-Control Mappings: {riskControlMappings.length}</div>
                <div>Avg Mitigation: {Math.round(riskControlMappings.reduce((sum, m) => sum + m.overallMitigation, 0) / riskControlMappings.length)}%</div>
                <div>Controls Assigned: {riskControlMappings.reduce((sum, m) => sum + m.assignedControls.length, 0)}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Control Types</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Preventive: {controlLibrary.filter(c => c.type === 'preventive').length}</div>
                <div>Detective: {controlLibrary.filter(c => c.type === 'detective').length}</div>
                <div>Corrective: {controlLibrary.filter(c => c.type === 'corrective').length}</div>
              </div>
    </div>
  );
};

export default GovernanceControls;