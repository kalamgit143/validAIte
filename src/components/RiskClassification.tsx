import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Target,
  Brain,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Plus,
  BarChart3,
  Activity,
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
  Database,
  List,
  Tag
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('classification');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock input from Use Case Definition (Component 2)
  const inputFromUseCaseDefinition = {
    useCaseCatalog: [
      {
        id: 'scenario_001',
        name: 'Emergency Patient Triage',
        description: 'Assess patient symptoms and assign triage priority',
        criticality: 'high',
        businessValue: 'Reduce diagnostic errors, improve patient flow',
        complianceScope: ['HIPAA', 'Medical Device Regulation']
      },
      {
        id: 'scenario_002',
        name: 'Symptom Documentation',
        description: 'Document patient symptoms and medical history',
        criticality: 'medium',
        businessValue: 'Improve documentation quality',
        complianceScope: ['HIPAA', 'GDPR']
      }
    ],
    businessValueMapping: {
      totalScenarios: 2,
      highCriticality: 1,
      complianceFrameworks: ['HIPAA', 'GDPR', 'Medical Device Regulation']
    }
  };

  const riskCategories = [
    { id: 'hallucination', name: 'Hallucination', description: 'Model generating false or misleading information' },
    { id: 'retrieval_error', name: 'Retrieval Error', description: 'Incorrect or irrelevant information retrieval' },
    { id: 'drift', name: 'Model Drift', description: 'Performance degradation over time' },
    { id: 'bias', name: 'Bias & Discrimination', description: 'Unfair treatment across demographics' },
    { id: 'security', name: 'Security Vulnerabilities', description: 'Cybersecurity threats and attacks' },
    { id: 'privacy', name: 'Privacy Violations', description: 'Personal data exposure or misuse' },
    { id: 'misrouting', name: 'Intent Misrouting', description: 'Incorrect intent classification' },
    { id: 'grounding_gap', name: 'Grounding Gap', description: 'Disconnect from knowledge base' }
  ];

  const riskClassifications = [
    {
      id: 'risk_001',
      useCaseId: 'scenario_001',
      useCaseName: 'Emergency Patient Triage',
      risks: [
        {
          category: 'hallucination',
          severity: 'high',
          likelihood: 'medium',
          impact: 'catastrophic',
          description: 'False medical information could lead to misdiagnosis',
          domainSpecific: true
        },
        {
          category: 'bias',
          severity: 'high',
          likelihood: 'medium',
          impact: 'major',
          description: 'Biased triage decisions affecting patient care equity',
          domainSpecific: true
        },
        {
          category: 'grounding_gap',
          severity: 'medium',
          likelihood: 'low',
          impact: 'major',
          description: 'Outdated medical knowledge affecting recommendations',
          domainSpecific: true
        }
      ],
      overallRiskScore: 8.2,
      riskLevel: 'high',
      classifiedBy: 'Risk Assessment Team',
      classifiedAt: '2024-01-15T10:00:00Z'
    }
  ];

  // Generated output for next component
  const generateOutput = () => {
    return {
      riskRegister: riskClassifications.map(classification => ({
        useCaseId: classification.useCaseId,
        useCaseName: classification.useCaseName,
        risks: classification.risks.map(risk => ({
          id: `${classification.useCaseId}_${risk.category}`,
          category: risk.category,
          severity: risk.severity,
          likelihood: risk.likelihood,
          impact: risk.impact,
          description: risk.description,
          domainSpecific: risk.domainSpecific
        })),
        overallRiskScore: classification.overallRiskScore,
        riskLevel: classification.riskLevel
      })),
      riskSeverityMatrix: {
        high: riskClassifications.filter(r => r.riskLevel === 'high').length,
        medium: riskClassifications.filter(r => r.riskLevel === 'medium').length,
        low: riskClassifications.filter(r => r.riskLevel === 'low').length
      },
      evidence: {
        riskCatalog: `${riskClassifications.length} use cases analyzed`,
        riskCount: riskClassifications.reduce((sum, r) => sum + r.risks.length, 0),
        domainSpecificRisks: riskClassifications.reduce((sum, r) => sum + r.risks.filter(risk => risk.domainSpecific).length, 0),
        timestamp: new Date().toISOString()
      }
    };
  };

  const handleComplete = () => {
    setIsComplete(true);
    console.log('Risk Classification Output:', generateOutput());
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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
          <p className="text-gray-600 dark:text-gray-400">Identify and classify potential risks per use case</p>
        </div>
        
        {/* Flow Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-blue-600 dark:text-blue-400">Application Setup</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-green-600 dark:text-green-400">Use Case Definition</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-red-600 dark:text-red-400">Risk Classification</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Controls</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Matrix</span>
        </div>
      </div>

      {/* Input from Previous Component */}
      <div className="bg-gradient-to-r from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-green-900 dark:text-green-100">Input from Use Case Definition</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use Case Catalog</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Total Scenarios: {inputFromUseCaseDefinition.useCaseCatalog.length}</div>
              <div>High Criticality: {inputFromUseCaseDefinition.useCaseCatalog.filter(uc => uc.criticality === 'high').length}</div>
              <div>Compliance Scope: {inputFromUseCaseDefinition.businessValueMapping.complianceFrameworks.length} frameworks</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Business Value Mapping</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Value Mapped: 100%</div>
              <div>Critical Scenarios: {inputFromUseCaseDefinition.businessValueMapping.highCriticality}</div>
              <div>Ready for Risk Analysis</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available for Processing</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Use cases defined</div>
              <div>✓ Business value mapped</div>
              <div>✓ Ready for risk analysis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
              <li>• Use case list (from step 2)</li>
              <li>• Risk categories catalog</li>
              <li>• Human severity assessment</li>
              <li>• Domain-specific risks</li>
              <li>• Likelihood estimations</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Risk Analysis</h3>
            <p className="text-sm text-red-800 dark:text-red-200">Classifying & tagging risks</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
              <li>• Risk Register (tagged to use cases)</li>
              <li>• Risk Severity Matrix (H/M/L)</li>
              <li>• Domain-specific risk catalog</li>
              <li>• Evidence: JSON/CSV export</li>
              <li>• Ready for control mapping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['classification', 'matrix'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'classification' ? 'Risk Classification' : 'Risk Matrix'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'classification' ? (
            <div className="space-y-6">
              {/* Use Case Risk Analysis */}
              {inputFromUseCaseDefinition.useCaseCatalog.map((useCase) => (
                <div key={useCase.id} className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-red-900 dark:text-red-100">{useCase.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          useCase.criticality === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          useCase.criticality === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {useCase.criticality.toUpperCase()} CRITICALITY
                        </div>
                      </div>
                      
                      <p className="text-red-800 dark:text-red-200 mb-4">{useCase.description}</p>
                      
                      <div className="text-sm text-red-700 dark:text-red-300 mb-4">
                        Business Value: {useCase.businessValue}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {canCreate && (
                        <button 
                          onClick={() => setShowCreateModal(true)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Risk</span>
                        </button>
                      )}
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Risk Categories for this Use Case */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {riskCategories.slice(0, 6).map((category) => (
                      <div key={category.id} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{category.name}</h4>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs text-red-600 dark:text-red-400">HIGH</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{category.description}</p>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-500">Likelihood:</span>
                            <span className="px-2 py-1 bg-yellow-500 text-white rounded">Medium</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-500">Impact:</span>
                            <span className="px-2 py-1 bg-red-500 text-white rounded">Major</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Risk Summary */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Classification Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">1</div>
                    <div className="text-sm text-red-600 dark:text-red-400">High Risk Use Cases</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium Risk Use Cases</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Total Risk Categories</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">6</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Domain-Specific Risks</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Matrix */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">Risk Assessment Matrix</h3>
                <p className="text-red-800 dark:text-red-200 mb-6">Likelihood vs Impact matrix for systematic risk evaluation</p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Likelihood</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Negligible</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Minor</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Moderate</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Major</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Catastrophic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { likelihood: 'Very High', risks: ['Medium', 'High', 'High', 'Critical', 'Critical'] },
                        { likelihood: 'High', risks: ['Medium', 'Medium', 'High', 'High', 'Critical'] },
                        { likelihood: 'Medium', risks: ['Low', 'Medium', 'Medium', 'High', 'High'] },
                        { likelihood: 'Low', risks: ['Low', 'Low', 'Medium', 'Medium', 'High'] },
                        { likelihood: 'Very Low', risks: ['Low', 'Low', 'Low', 'Medium', 'Medium'] }
                      ].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300">{row.likelihood}</td>
                          {row.risks.map((risk, colIndex) => (
                            <td key={colIndex} className="p-3 text-center">
                              <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                risk === 'Critical' ? 'bg-red-600 text-white' :
                                risk === 'High' ? 'bg-red-400 text-white' :
                                risk === 'Medium' ? 'bg-yellow-400 text-gray-900' :
                                'bg-green-400 text-gray-900'
                              }`}>
                                {risk}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!canCreate && "View-only mode - Contact administrator for risk classification access"}
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Classification</span>
                  </button>
                  <button 
                    onClick={handleComplete}
                    disabled={riskClassifications.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
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
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Risk Classification Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Register</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Use Cases Analyzed: {riskClassifications.length}</div>
                <div>Total Risks: {riskClassifications.reduce((sum, r) => sum + r.risks.length, 0)}</div>
                <div>Domain-Specific: {riskClassifications.reduce((sum, r) => sum + r.risks.filter(risk => risk.domainSpecific).length, 0)}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Severity Matrix</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>High Risk: {riskClassifications.filter(r => r.riskLevel === 'high').length}</div>
                <div>Medium Risk: {riskClassifications.filter(r => r.riskLevel === 'medium').length}</div>
                <div>Low Risk: {riskClassifications.filter(r => r.riskLevel === 'low').length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evidence Package</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Risk Catalog: Generated</div>
                <div>Export Ready: JSON/CSV</div>
                <div>Audit Trail: Complete</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-orange-800 dark:text-orange-200">
              <Layers className="w-4 h-4" />
              <span>Ready for Governance Controls (Component 4)</span>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <span>Proceed to Controls</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskClassification;