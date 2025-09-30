import React, { useState } from 'react';
import { Target, Users, CheckCircle, XCircle, Clock, AlertTriangle, Eye, Edit, Download, Plus, Filter, Search, BarChart3, Activity, Shield, FileText, Crown, Gavel, Code, Building, Globe, Lock, Brain, Heart, Scale, Database, Settings, Calendar, Mail, Phone, ExternalLink, ArrowRight, ArrowDown, ArrowLeft, Layers, Save, Grid2x2 as Grid, List, Table } from 'lucide-react';

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
  const [editingCell, setEditingCell] = useState<{ rowId: string, field: string } | null>(null);

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

  // Mock input from previous steps
  const inputFromPreviousSteps = {
    useCases: [
      { id: 'UC1', title: 'Emergency Patient Triage', criticality: 'High' },
      { id: 'UC2', title: 'Symptom Documentation', criticality: 'Medium' },
      { id: 'UC3', title: 'Treatment Recommendation', criticality: 'High' }
    ],
    risks: [
      { id: 'RR001', useCaseId: 'UC1', useCaseName: 'Emergency Patient Triage', riskName: 'Hallucination', severity: 'High', likelihood: 'Frequent' },
      { id: 'RR002', useCaseId: 'UC1', useCaseName: 'Emergency Patient Triage', riskName: 'Grounding Gap', severity: 'Medium', likelihood: 'Occasional' },
      { id: 'RR003', useCaseId: 'UC2', useCaseName: 'Symptom Documentation', riskName: 'Privacy Leakage', severity: 'High', likelihood: 'Rare' },
      { id: 'RR004', useCaseId: 'UC3', useCaseName: 'Treatment Recommendation', riskName: 'Bias/Fairness', severity: 'Medium', likelihood: 'Occasional' }
    ],
    controls: [
      { id: 'CF001', riskId: 'RR001', controlName: 'Canonical KB Tagging', controlType: 'Preventive', owner: 'Governance Lead', effectiveness: 'High' },
      { id: 'CF002', riskId: 'RR001', controlName: 'HITL Fallback', controlType: 'Corrective', owner: 'Domain Reviewer', effectiveness: 'High' },
      { id: 'CF003', riskId: 'RR002', controlName: 'Grounding Threshold', controlType: 'Preventive', owner: 'QA Engineer', effectiveness: 'Medium' },
      { id: 'CF004', riskId: 'RR003', controlName: 'PII Masking', controlType: 'Preventive', owner: 'SecOps Engineer', effectiveness: 'High' },
      { id: 'CF005', riskId: 'RR004', controlName: 'Red-Team Testing', controlType: 'Detective', owner: 'SecOps Engineer', effectiveness: 'Medium' }
    ]
  };

  // Auto-generated Governance Matrix
  const [governanceMatrix, setGovernanceMatrix] = useState(() => {
    return inputFromPreviousSteps.risks.map(risk => {
      const useCase = inputFromPreviousSteps.useCases.find(uc => uc.id === risk.useCaseId);
      const riskControls = inputFromPreviousSteps.controls.filter(c => c.riskId === risk.id);
      
      return {
        id: `GM${risk.id}`,
        useCase: useCase?.title || '',
        useCaseId: risk.useCaseId,
        risk: risk.riskName,
        riskId: risk.id,
        severity: risk.severity,
        likelihood: risk.likelihood,
        controls: riskControls.map(c => c.controlName).join(', '),
        controlDetails: riskControls,
        complianceMapping: ['EU AI Act', 'NIST RMF'], // Default mappings
        evidenceRequired: 'Grounding score logs, KB references, HITL validation notes',
        lastUpdated: new Date().toISOString(),
        updatedBy: currentUser?.name || 'System'
      };
    });
  });

  const complianceFrameworks = [
    'NIST RMF',
    'EU AI Act', 
    'ISO/IEC 25010',
    'ISO/IEC 27001',
    'OWASP LLM Top-10',
    'GDPR',
    'HIPAA',
    'SOX',
    'CCPA'
  ];

  const evidenceTypes = [
    'Grounding score logs',
    'KB references',
    'HITL validation notes',
    'Monitoring alerts',
    'Test execution logs',
    'Bias testing results',
    'Security scan reports',
    'User feedback transcripts',
    'Performance metrics',
    'Audit trail logs'
  ];

  const handleCellEdit = (rowId: string, field: string, value: string | string[]) => {
    setGovernanceMatrix(prev => prev.map(row => 
      row.id === rowId ? { ...row, [field]: value, lastUpdated: new Date().toISOString(), updatedBy: currentUser?.name || 'User' } : row
    ));
    setEditingCell(null);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

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

  const exportMatrix = (format: 'json' | 'csv' | 'pdf') => {
    const exportData = governanceMatrix.map(row => ({
      use_case: row.useCase,
      risk: row.risk,
      severity: row.severity,
      likelihood: row.likelihood,
      controls: row.controls,
      compliance_mapping: row.complianceMapping.join(', '),
      evidence_required: row.evidenceRequired
    }));

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'governance-matrix.json';
      a.click();
    } else if (format === 'csv') {
      const headers = Object.keys(exportData[0]).join(',');
      const rows = exportData.map(row => Object.values(row).map(val => `"${val}"`).join(','));
      const csv = [headers, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'governance-matrix.csv';
      a.click();
    }
    // PDF export would be handled by a PDF library
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

      {/* Input from Previous Steps */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">Input from Previous Steps</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use Cases (Step 2)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {inputFromPreviousSteps.useCases.length}</div>
              <div>High Criticality: {inputFromPreviousSteps.useCases.filter(uc => uc.criticality === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risks (Step 3)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {inputFromPreviousSteps.risks.length}</div>
              <div>High Severity: {inputFromPreviousSteps.risks.filter(r => r.severity === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Controls (Step 4)</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total: {inputFromPreviousSteps.controls.length}</div>
              <div>High Effectiveness: {inputFromPreviousSteps.controls.filter(c => c.effectiveness === 'High').length}</div>
              <div>Ready: ✓</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Matrix Generation</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Auto-generated</div>
              <div>✓ Traceability complete</div>
              <div>✓ Ready for review</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'matrix', label: 'Governance Matrix', icon: Grid },
              { id: 'compliance', label: 'Compliance Picker', icon: Shield }
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
              {/* Export Options */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Auto-Generated Governance Matrix
                </h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => exportMatrix('json')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON</span>
                  </button>
                  <button 
                    onClick={() => exportMatrix('csv')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button 
                    onClick={() => exportMatrix('pdf')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Governance Matrix Table */}
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Risk</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Control(s) Assigned</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Compliance Mapping</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Evidence Required</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {governanceMatrix.map((row, index) => (
                        <tr key={row.id} className="bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{row.useCase}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{row.useCaseId}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{row.risk}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(row.severity)}`}>
                                {row.severity}
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getLikelihoodColor(row.likelihood)}`}>
                                {row.likelihood}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">{row.controls}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {row.controlDetails.length} control(s) • 
                              {row.controlDetails.filter(c => c.effectiveness === 'High').length} high effectiveness
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {editingCell?.rowId === row.id && editingCell?.field === 'complianceMapping' ? (
                              <div className="space-y-2">
                                {complianceFrameworks.map(framework => (
                                  <label key={framework} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={row.complianceMapping.includes(framework)}
                                      onChange={(e) => {
                                        const newMapping = e.target.checked
                                          ? [...row.complianceMapping, framework]
                                          : row.complianceMapping.filter(f => f !== framework);
                                        handleCellEdit(row.id, 'complianceMapping', newMapping);
                                      }}
                                      className="rounded border-gray-300"
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-300">{framework}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <div 
                                onClick={() => canEdit && setEditingCell({ rowId: row.id, field: 'complianceMapping' })}
                                className={`cursor-pointer ${canEdit ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''} p-2 rounded`}
                              >
                                <div className="flex flex-wrap gap-1">
                                  {row.complianceMapping.map((framework, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                      {framework}
                                    </span>
                                  ))}
                                </div>
                                {canEdit && (
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click to edit</div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingCell?.rowId === row.id && editingCell?.field === 'evidenceRequired' ? (
                              <div className="space-y-2">
                                <textarea
                                  value={row.evidenceRequired}
                                  onChange={(e) => handleCellEdit(row.id, 'evidenceRequired', e.target.value)}
                                  onBlur={() => setEditingCell(null)}
                                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm h-20 resize-none"
                                  autoFocus
                                />
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                  Suggested: {evidenceTypes.slice(0, 3).join(', ')}
                                </div>
                              </div>
                            ) : (
                              <div 
                                onClick={() => canEdit && setEditingCell({ rowId: row.id, field: 'evidenceRequired' })}
                                className={`cursor-pointer ${canEdit ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''} p-2 rounded`}
                              >
                                <div className="text-sm text-gray-900 dark:text-white">{row.evidenceRequired}</div>
                                {canEdit && (
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click to edit</div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              {canEdit && (
                                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                  <Edit className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Matrix Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{inputFromPreviousSteps.useCases.length}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Use Cases Mapped</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{inputFromPreviousSteps.risks.length}</div>
                  <div className="text-sm text-red-700 dark:text-red-300">Risks Classified</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{inputFromPreviousSteps.controls.length}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Controls Assigned</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Traceability Coverage</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Compliance Framework Picker */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">Compliance Framework Mapping</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {complianceFrameworks.map(framework => (
                    <div key={framework} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">{framework}</h4>
                        <input type="checkbox" defaultChecked={['NIST RMF', 'EU AI Act'].includes(framework)} className="rounded border-gray-300" />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Mapped to {governanceMatrix.filter(row => row.complianceMapping.includes(framework)).length} risk(s)
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Type Configuration */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Evidence Type Configuration</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {evidenceTypes.map(evidence => (
                    <label key={evidence} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{evidence}</span>
                    </label>
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
                    <Save className="w-4 h-4" />
                    <span>Save Matrix</span>
                  </button>
                  <button 
                    onClick={handleComplete}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Complete Stage 1</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Stage 1: Risk Mapping & Governance Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Master Traceability Artifact</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>✓ Use Case → Risk → Control mapping complete</div>
                <div>✓ Compliance framework alignment verified</div>
                <div>✓ Evidence requirements documented</div>
                <div>✓ Ready for Trust Metrics Engine (Stage 2)</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Export-Ready Governance Report</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>✓ JSON data export ready</div>
                <div>✓ CSV format available</div>
                <div>✓ PDF report generated</div>
                <div>✓ Audit-ready documentation</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Next: Stage 2 - Trust Metrics Engine</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Governance Matrix will now feed into the Trust Metrics Engine to quantify trustworthiness 
              and establish monitoring thresholds for your GenAI application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceMatrix;