import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Users,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Save,
  Brain,
  Shield,
  Globe,
  Heart,
  Building,
  Code,
  Lightbulb,
  Zap,
  Activity,
  Clock,
  BarChart3,
  Scale,
  Lock,
  Database,
  Settings,
  Award,
  Gavel,
  Crown,
  TestTube,
  FileCheck,
  Workflow,
  GitBranch,
  Timer,
  Layers,
  Search,
  Filter,
  XCircle,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  List,
  BookOpen,
  Briefcase
} from 'lucide-react';

interface UseCaseDefinitionProps {
  currentUser?: any;
  canPerformAction?: (module: string, action: string) => boolean;
  getUserPermissions?: (module: string) => string[];
}

const UseCaseDefinition: React.FC<UseCaseDefinitionProps> = ({ 
  currentUser, 
  canPerformAction, 
  getUserPermissions 
}) => {
  const [activeTab, setActiveTab] = useState('definition');
  const [formData, setFormData] = useState({
    businessScenarios: [] as any[],
    userStories: [] as any[],
    criticalityRatings: {} as any,
    workflowSources: [] as string[]
  });
  const [showAddScenarioModal, setShowAddScenarioModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock input from Application Setup (Component 1)
  const inputFromApplicationSetup = {
    applicationProfile: {
      id: 'app_1705234567',
      name: 'Healthcare Triage Assistant',
      type: 'llm_rag',
      domain: 'Healthcare',
      environment: 'production'
    },
    contextBaseline: {
      appType: 'llm_rag',
      domain: 'Healthcare',
      complianceScope: ['EU AI Act', 'HIPAA', 'GDPR'],
      businessCriticality: 'high',
      integrationStatus: 'configured'
    }
  };

  const businessScenarios = [
    {
      id: 'scenario_001',
      name: 'Emergency Patient Triage',
      description: 'Assess patient symptoms and assign triage priority',
      source: 'Emergency Department Workflow',
      criticality: 'high',
      userStories: [
        'As a triage nurse, I want to quickly assess patient severity',
        'As an ED physician, I need accurate priority recommendations',
        'As a patient, I want fair and unbiased triage assessment'
      ],
      businessValue: 'Reduce diagnostic errors, improve patient flow',
      complianceImpact: ['HIPAA', 'Medical Device Regulation']
    },
    {
      id: 'scenario_002',
      name: 'Symptom Documentation',
      description: 'Document patient symptoms and medical history',
      source: 'Clinical Documentation Requirements',
      criticality: 'medium',
      userStories: [
        'As a nurse, I want to document symptoms accurately',
        'As a physician, I need complete medical history',
        'As a patient, I want my information protected'
      ],
      businessValue: 'Improve documentation quality, reduce errors',
      complianceImpact: ['HIPAA', 'GDPR']
    }
  ];

  // Generated output for next component
  const generateOutput = () => {
    return {
      useCaseCatalog: businessScenarios.map(scenario => ({
        id: scenario.id,
        name: scenario.name,
        description: scenario.description,
        criticality: scenario.criticality,
        userStories: scenario.userStories,
        businessValue: scenario.businessValue,
        complianceScope: scenario.complianceImpact
      })),
      businessValueMapping: {
        'Emergency Patient Triage': {
          businessValue: 'Reduce diagnostic errors, improve patient flow',
          complianceScope: ['HIPAA', 'Medical Device Regulation'],
          criticality: 'high'
        },
        'Symptom Documentation': {
          businessValue: 'Improve documentation quality, reduce errors',
          complianceScope: ['HIPAA', 'GDPR'],
          criticality: 'medium'
        }
      },
      evidence: {
        useCaseDefinitions: `${businessScenarios.length} use cases defined`,
        businessValueMapped: 'All use cases mapped to business value',
        complianceScopeMapped: 'Compliance requirements identified',
        timestamp: new Date().toISOString()
      }
    };
  };

  const handleComplete = () => {
    setIsComplete(true);
    console.log('Use Case Definition Output:', generateOutput());
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  return (
    <div className="space-y-8">
      {/* Header with Flow Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Use Case Definition</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
              <FileText className="w-4 h-4" />
              <span>Input to Risk Classification</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Define business scenarios and user stories from workflows</p>
        </div>
        
        {/* Flow Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-blue-600 dark:text-blue-400">Application Setup</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-green-600 dark:text-green-400">Use Case Definition</span>
          <ArrowRight className="w-4 h-4" />
          <span>Risk Classification</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Controls</span>
          <ArrowRight className="w-4 h-4" />
          <span>Governance Matrix</span>
        </div>
      </div>

      {/* Input from Previous Component */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Input from Application Setup</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Application Profile</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Name: {inputFromApplicationSetup.applicationProfile.name}</div>
              <div>Type: {inputFromApplicationSetup.applicationProfile.type}</div>
              <div>Domain: {inputFromApplicationSetup.applicationProfile.domain}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Context Baseline</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Criticality: {inputFromApplicationSetup.contextBaseline.businessCriticality}</div>
              <div>Compliance: {inputFromApplicationSetup.contextBaseline.complianceScope.length} frameworks</div>
              <div>Status: {inputFromApplicationSetup.contextBaseline.integrationStatus}</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Processing</h4>
            <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <div>✓ Application registered</div>
              <div>✓ Integration verified</div>
              <div>✓ Context established</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output Flow Visualization */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center space-x-2">
              <ArrowDown className="w-4 h-4" />
              <span>Required Inputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Business scenarios from workflows</li>
              <li>• User stories and intents</li>
              <li>• Criticality ratings (H/M/L)</li>
              <li>• Domain expert input</li>
              <li>• Workflow documentation</li>
            </ul>
          </div>

          {/* Processing */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Use Case Mapping</h3>
            <p className="text-sm text-green-800 dark:text-green-200">Creating scenario catalog</p>
          </div>

          {/* Outputs */}
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Generated Outputs</span>
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Use Case Catalog created</li>
              <li>• Business value mapped</li>
              <li>• Compliance scope defined</li>
              <li>• Evidence package ready</li>
              <li>• Ready for risk analysis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['definition', 'scenarios'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'definition' ? 'Use Case Definition' : 'Business Scenarios'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'definition' && (
            <div className="space-y-6">
              {/* Scenario Sources */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Scenario Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { source: 'Jira/ADO Tickets', icon: Briefcase, count: '24 tickets' },
                    { source: 'Workflow Documentation', icon: BookOpen, count: '8 documents' },
                    { source: 'Domain Expert Input', icon: Users, count: '3 experts' }
                  ].map((source, index) => {
                    const Icon = source.icon;
                    return (
                      <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg text-center">
                        <Icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                        <div className="font-medium text-gray-900 dark:text-white">{source.source}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{source.count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add New Scenario */}
              {canCreate && (
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Scenarios</h3>
                  <button 
                    onClick={() => setShowAddScenarioModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Scenario</span>
                  </button>
                </div>
              )}

              {/* Existing Scenarios */}
              <div className="space-y-4">
                {businessScenarios.map((scenario) => (
                  <div key={scenario.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{scenario.name}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            scenario.criticality === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            scenario.criticality === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {scenario.criticality.toUpperCase()} IMPACT
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{scenario.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Source</span>
                            <div className="font-medium text-gray-900 dark:text-white">{scenario.source}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Business Value</span>
                            <div className="font-medium text-gray-900 dark:text-white">{scenario.businessValue}</div>
                          </div>
                        </div>

                        {/* User Stories */}
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">User Stories</h5>
                          <div className="space-y-1">
                            {scenario.userStories.map((story, index) => (
                              <div key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{story}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Compliance Impact */}
                        <div className="flex flex-wrap gap-2">
                          {scenario.complianceImpact.map((framework, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        {canEdit && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scenarios' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scenario Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Import scenarios from Jira, ADO, or workflow documentation
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <button className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center space-y-2">
                    <Briefcase className="w-6 h-6" />
                    <span className="font-medium">Import from Jira</span>
                    <span className="text-xs opacity-80">User stories & epics</span>
                  </button>
                  
                  <button className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center space-y-2">
                    <BookOpen className="w-6 h-6" />
                    <span className="font-medium">Upload Workflows</span>
                    <span className="text-xs opacity-80">Process documentation</span>
                  </button>
                  
                  <button className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span className="font-medium">Expert Workshop</span>
                    <span className="text-xs opacity-80">Collaborative definition</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!canCreate && "View-only mode - Contact administrator for editing access"}
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  <button 
                    onClick={handleComplete}
                    disabled={businessScenarios.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center space-x-2"
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
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Use Case Definition Complete</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use Case Catalog</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Scenarios: {businessScenarios.length}</div>
                <div>User Stories: {businessScenarios.reduce((sum, s) => sum + s.userStories.length, 0)}</div>
                <div>High Priority: {businessScenarios.filter(s => s.criticality === 'high').length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Business Value Mapping</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Value Mapped: 100%</div>
                <div>Compliance Scope: Defined</div>
                <div>Criticality: Assessed</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evidence Package</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Definitions: Saved</div>
                <div>Metadata: Complete</div>
                <div>Audit Trail: Generated</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-emerald-800 dark:text-emerald-200">
              <Layers className="w-4 h-4" />
              <span>Ready for Risk Classification (Component 3)</span>
            </div>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
              <span>Proceed to Risk Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Scenario Modal */}
      {showAddScenarioModal && canCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Business Scenario</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a new business scenario for {inputFromApplicationSetup.applicationProfile.name}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scenario Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Emergency Patient Assessment"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Criticality Rating *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="">Select Criticality</option>
                    <option value="high">High - Mission Critical</option>
                    <option value="medium">Medium - Business Important</option>
                    <option value="low">Low - Operational Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scenario Description *
                </label>
                <textarea
                  placeholder="Describe the business scenario and expected AI behavior..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User Stories / Intents
                </label>
                <textarea
                  placeholder="As a [user], I want to [action] so that [benefit]..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Business Value
                </label>
                <input
                  type="text"
                  placeholder="Reduce diagnostic errors by 40%, improve patient flow"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scenario will be added to use case catalog
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAddScenarioModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Scenario
                </button>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseDefinition;