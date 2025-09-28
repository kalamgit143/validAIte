import React, { useState } from 'react';
import { Target, Users, CheckCircle, XCircle, Clock, AlertTriangle, Eye, CreditCard as Edit, Download, Plus, Filter, Search, BarChart3, Activity, Shield, FileText, Crown, Gavel, Code, Building, Globe, Lock, Brain, Heart, Scale, Database, Settings, Calendar, Mail, Phone, ExternalLink, ArrowRight, ArrowDown, ArrowLeft, Layers, Save, Grid2x2 as Grid, List, Table } from 'lucide-react';

interface GovernanceMatrixProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const GovernanceMatrix: React.FC<GovernanceMatrixProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [activeView, setActiveView] = useState('matrix');
  const [selectedApplication, setSelectedApplication] = useState('healthcare_triage');
  const [isComplete, setIsComplete] = useState(false);

  // Mock input from Governance Controls (Component 4)
  const inputFromGovernanceControls = {
    controlFramework: [
      {
        riskId: 'scenario_001_hallucination',
        riskName: 'Medical Hallucination Risk',
        controls: [
          { controlId: 'ctrl_001', controlName: 'Canonical KB Tagging', effectiveness: 92 },
          { controlId: 'ctrl_002', controlName: 'Grounding Threshold Control', effectiveness: 88 },
          { controlId: 'ctrl_005', controlName: 'HITL Fallback', effectiveness: 94 }
        ],
        mitigationLevel: 91,
        residualRisk: 'medium'
      }
    ],
    controlTypes: {
      preventive: 3,
      detective: 2,
      corrective: 1
    }
  };

  // Complete Governance Matrix
  const governanceMatrix = {
    applicationId: 'healthcare_triage',
    applicationName: 'Healthcare Triage Assistant',
    
    // Complete traceability chain
    traceabilityChain: [
      {
        useCase: {
          id: 'scenario_001',
          name: 'Emergency Patient Triage',
          source: 'Emergency Department Workflow',
          context: 'High-criticality patient assessment'
        },
        risks: [
          {
            id: 'scenario_001_hallucination',
            category: 'Medical Hallucination',
            severity: 'high',
            likelihood: 'medium',
            impact: 'catastrophic'
          }
        ],
        controls: [
          {
            id: 'ctrl_001',
            name: 'Canonical KB Tagging',
            type: 'preventive',
            effectiveness: 92
          },
          {
            id: 'ctrl_005',
            name: 'HITL Fallback',
            type: 'corrective',
            effectiveness: 94
          }
        ],
        complianceMapping: {
          'NIST RMF': ['GOVERN-1.1', 'MEASURE-2.3', 'MANAGE-1.2'],
          'EU AI Act': ['Art-9 Risk Management', 'Art-14 Human Oversight'],
          'HIPAA': ['164.312 Access Control', '164.308 Security']
        },
        evidenceNeeded: [
          'Medical KB validation reports',
          'Human oversight procedures',
          'Triage accuracy metrics',
          'Bias testing results'
        ]
      }
    ],
    
    // Governance stakeholders
    stakeholders: {
      riskOwner: { name: 'Sarah Chen', role: 'CIO', status: 'assigned', contact: 'sarah.chen@acme.com' },
      securityOwner: { name: 'Alex Kim', role: 'CISO', status: 'assigned', contact: 'alex.kim@acme.com' },
      complianceOfficer: { name: 'Emily Davis', role: 'Compliance Officer', status: 'assigned', contact: 'emily.davis@acme.com' },
      qaLead: { name: 'Jordan Smith', role: 'QA Lead', status: 'assigned', contact: 'jordan.smith@acme.com' },
      ethicsReviewer: { name: 'Dr. Sarah Chen', role: 'Medical Ethics Board', status: 'assigned', contact: 'ethics@acme.com' },
      domainExpert: { name: 'Dr. Michael Torres', role: 'Emergency Medicine', status: 'assigned', contact: 'medical@acme.com' }
    },
    
    // Approval workflow
    approvalWorkflow: [
      { step: 1, role: 'QA Lead', task: 'Risk assessment completion', status: 'completed', completedAt: '2024-01-10T10:00:00Z' },
      { step: 2, role: 'CISO', task: 'Security review & threat model', status: 'completed', completedAt: '2024-01-12T14:00:00Z' },
      { step: 3, role: 'Compliance Officer', task: 'Regulatory mapping validation', status: 'completed', completedAt: '2024-01-13T16:00:00Z' },
      { step: 4, role: 'Ethics Reviewer', task: 'Medical ethics assessment', status: 'completed', completedAt: '2024-01-14T11:00:00Z' },
      { step: 5, role: 'Domain Expert', task: 'Medical accuracy validation', status: 'completed', completedAt: '2024-01-14T15:00:00Z' },
      { step: 6, role: 'CIO', task: 'Strategic approval & deployment', status: 'approved', completedAt: '2024-01-15T09:00:00Z' }
    ],
    
    governanceStatus: 'approved',
    deploymentAuthorized: true,
    lastUpdated: '2024-01-15T09:00:00Z'
  };

  // Generated final output
  const generateOutput = () => {
    return {
      masterTraceabilityArtifact: {
        useCases: governanceMatrix.traceabilityChain.map(chain => chain.useCase),
        risks: governanceMatrix.traceabilityChain.flatMap(chain => chain.risks),
        controls: governanceMatrix.traceabilityChain.flatMap(chain => chain.controls),
        complianceMapping: governanceMatrix.traceabilityChain.reduce((acc, chain) => ({
          ...acc,
          ...chain.complianceMapping
        }), {}),
        evidenceRequirements: governanceMatrix.traceabilityChain.flatMap(chain => chain.evidenceNeeded)
      },
      governanceReport: {
        applicationId: governanceMatrix.applicationId,
        applicationName: governanceMatrix.applicationName,
        governanceStatus: governanceMatrix.governanceStatus,
        deploymentAuthorized: governanceMatrix.deploymentAuthorized,
        stakeholderAssignments: governanceMatrix.stakeholders,
        approvalWorkflow: governanceMatrix.approvalWorkflow,
        exportFormats: ['PDF', 'JSON', 'CSV'],
        auditReady: true,
        timestamp: new Date().toISOString()
      }
    };
  };

  const handleComplete = () => {
    setIsComplete(true);
    console.log('Governance Matrix Output:', generateOutput());
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canApprove = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'A') : false;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'assigned': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'assigned': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              5
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Governance Matrix</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Final Traceability Output</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Generate unified traceability matrix for Stage 2 (Trust Metrics)</p>
        </div>
        
        {/* Flow Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-blue-600 dark:text-blue-400">Application Setup</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-green-600 dark:text-green-400">Use Case Definition</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-red-600 dark:text-red-400">Risk Classification</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-purple-600 dark:text-purple-400">Governance Controls</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-indigo-600 dark:text-indigo-400">Governance Matrix</span>
        </div>
      </div>

      {/* Input from Previous Component */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">Input from Governance Controls</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Control Framework</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Risk-Control Mappings: {inputFromGovernanceControls.controlFramework.length}</div>
              <div>Avg Mitigation: {inputFromGovernanceControls.controlFramework[0]?.mitigationLevel}%</div>
              <div>Controls Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Control Types</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Preventive: {inputFromGovernanceControls.controlTypes.preventive}</div>
              <div>Detective: {inputFromGovernanceControls.controlTypes.detective}</div>
              <div>Corrective: {inputFromGovernanceControls.controlTypes.corrective}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Matrix</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Controls assigned</div>
              <div>✓ Mitigation calculated</div>
              <div>✓ Ready for traceability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
              <li>• Use cases (Step 2)</li>
              <li>• Risks (Step 3)</li>
              <li>• Controls (Step 4)</li>
              <li>• Compliance frameworks</li>
              <li>• Stakeholder assignments</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Matrix Generation</h3>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">Creating unified traceability</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
              <li>• Master traceability artifact</li>
              <li>• Governance report (PDF/JSON/CSV)</li>
              <li>• Evidence requirements mapped</li>
              <li>• Compliance framework aligned</li>
              <li>• Ready for Trust Metrics Engine</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'matrix', label: 'Traceability Matrix', icon: Grid },
              { id: 'stakeholders', label: 'Stakeholder Matrix', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeView === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
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
          {activeView === 'matrix' ? (
            <div className="space-y-6">
              {/* Complete Traceability Matrix */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
                    Complete Traceability: Use Case → Risk → Control → Compliance → Evidence
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/50 dark:bg-gray-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Use Case</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Source/Context</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Risk</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Control</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Compliance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Evidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {governanceMatrix.traceabilityChain.map((chain, index) => (
                        <tr key={index} className="bg-white/30 dark:bg-gray-800/30">
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{chain.useCase.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{chain.useCase.id}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">{chain.useCase.source}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{chain.useCase.context}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              {chain.risks.map((risk, riskIndex) => (
                                <div key={riskIndex} className="text-sm">
                                  <div className="font-medium text-gray-900 dark:text-white">{risk.category}</div>
                                  <div className={`inline-block px-2 py-1 rounded text-xs ${
                                    risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                                    risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {risk.severity}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              {chain.controls.map((control, controlIndex) => (
                                <div key={controlIndex} className="text-sm">
                                  <div className="font-medium text-gray-900 dark:text-white">{control.name}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {control.type} • {control.effectiveness}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              {Object.entries(chain.complianceMapping).map(([framework, controls]) => (
                                <div key={framework} className="text-sm">
                                  <div className="font-medium text-gray-900 dark:text-white">{framework}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {Array.isArray(controls) ? controls.join(', ') : controls}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              {chain.evidenceNeeded.slice(0, 2).map((evidence, evidenceIndex) => (
                                <div key={evidenceIndex} className="text-xs text-gray-600 dark:text-gray-400">
                                  • {evidence}
                                </div>
                              ))}
                              {chain.evidenceNeeded.length > 2 && (
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                  +{chain.evidenceNeeded.length - 2} more
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Governance Coverage Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Use Case Coverage</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">91%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Risk Mitigation</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">94%</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Control Effectiveness</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">100%</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">Traceability</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stakeholder Assignment Matrix */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">Governance Stakeholder Assignment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(governanceMatrix.stakeholders).map(([roleKey, stakeholder]: [string, any]) => (
                    <div key={roleKey} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                          {roleKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h5>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stakeholder.status)}`}>
                          {getStatusIcon(stakeholder.status)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white font-medium">{stakeholder.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{stakeholder.role}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-500">{stakeholder.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Workflow Status */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Digital Governance Approval Workflow</span>
                </h4>
                <div className="space-y-3">
                  {governanceMatrix.approvalWorkflow.map((step) => (
                    <div key={step.step} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.status === 'completed' || step.status === 'approved' ? 'bg-green-500 text-white' :
                        step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{step.role}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{step.task}</div>
                        {step.completedAt && (
                          <div className="text-xs text-green-600 dark:text-green-400">
                            Completed: {new Date(step.completedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                        {step.status.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!canCreate && "View-only mode - Contact administrator for matrix generation access"}
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Matrix</span>
                  </button>
                  <button 
                    onClick={handleComplete}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Generate Final Matrix</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Final Output */}
      {isComplete && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Risk Mapping & Governance Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Master Traceability Artifact</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>✓ Use Case → Risk → Control mapping complete</div>
                <div>✓ Compliance framework alignment verified</div>
                <div>✓ Evidence requirements documented</div>
                <div>✓ Stakeholder assignments confirmed</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Export-Ready Governance Report</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>✓ PDF report generated</div>
                <div>✓ JSON data export ready</div>
                <div>✓ CSV format available</div>
                <div>✓ Audit trail complete</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Ready for Trust Metrics Engine</div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Complete governance foundation established for quantitative trust assessment
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center space-x-2">
                <span>Launch Trust Metrics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role-Based Access Info */}
      {currentUser && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">
                {currentUser.role} Access Level
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                Permissions: {getUserPermissions ? getUserPermissions('Risk Mapping & Governance').join('•') : 'Loading...'}
                {!canCreate && " (View-only access)"}
                {canApprove && " • Approval Authority"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceControls;