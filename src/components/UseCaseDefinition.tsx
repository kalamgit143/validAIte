import React, { useState } from 'react';
import { FileText, Target, Users, AlertTriangle, CheckCircle, Plus, CreditCard as Edit, Eye, Download, Save, Trash2, ArrowRight, ArrowDown, ArrowLeft, List, BookOpen, Briefcase, Building, Code, MessageSquare, Shield, Database, ChevronDown, ChevronRight, Upload, Link, UserCheck, Calendar, Clock, X, Search, Filter, RefreshCw, ExternalLink, FileUp, Globe, Settings, Brain, Zap } from 'lucide-react';

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
  const [useCases, setUseCases] = useState<any[]>([]);
  const [activeInputMethod, setActiveInputMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    criticality: '',
    source: ''
  });
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [editingUseCase, setEditingUseCase] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Business Workflow Upload State
  const [workflowFile, setWorkflowFile] = useState<File | null>(null);
  const [workflowAnalysis, setWorkflowAnalysis] = useState<any>(null);

  // JIRA/ADO Import State
  const [jiraConfig, setJiraConfig] = useState({
    platform: '',
    serverUrl: '',
    projectKey: '',
    apiToken: '',
    jqlQuery: ''
  });
  const [jiraImportResults, setJiraImportResults] = useState<any[]>([]);

  // Domain Expert Input State
  const [expertSession, setExpertSession] = useState({
    expertName: '',
    expertRole: '',
    sessionType: '',
    interviewNotes: '',
    validatedUseCases: [] as any[]
  });

  // Mock input from Application Setup (Component 1)
  const inputFromApplicationSetup = {
    applicationProfile: {
      id: 'app_1705234567',
      name: 'Healthcare Triage Assistant',
      type: 'LLM+RAG',
      domain: 'Healthcare',
      environment: 'Production',
      businessCriticality: 'Mission Critical',
      euAiActRiskClass: 'High Risk',
      humanOversightLevel: 'Human-in-the-Loop'
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveUseCase = () => {
    if (!formData.title || !formData.description || !formData.criticality || !formData.source) {
      alert('Please fill in all required fields');
      return;
    }

    const newUseCase = {
      id: `UC${useCases.length + 1}`,
      title: formData.title,
      description: formData.description,
      criticality: formData.criticality,
      source: formData.source,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Current User'
    };

    setUseCases(prev => [...prev, newUseCase]);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      criticality: '',
      source: ''
    });
  };

  const handleEditUseCase = (id: string) => {
    const useCase = useCases.find(uc => uc.id === id);
    if (useCase) {
      setFormData({
        title: useCase.title,
        description: useCase.description,
        criticality: useCase.criticality,
        source: useCase.source
      });
      setEditingUseCase(id);
    }
  };

  const handleUpdateUseCase = () => {
    if (!editingUseCase) return;

    setUseCases(prev => prev.map(uc => 
      uc.id === editingUseCase 
        ? { ...uc, ...formData, updatedAt: new Date().toISOString() }
        : uc
    ));

    setEditingUseCase(null);
    setFormData({
      title: '',
      description: '',
      criticality: '',
      source: ''
    });
  };

  const handleDeleteUseCase = (id: string) => {
    if (confirm('Are you sure you want to delete this use case?')) {
      setUseCases(prev => prev.filter(uc => uc.id !== id));
    }
  };

  const handleComplete = () => {
    if (useCases.length === 0) {
      alert('Please add at least one use case before proceeding');
      return;
    }
    setIsComplete(true);
  };

  // Business Workflow Upload Handler
  const handleWorkflowUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWorkflowFile(file);
      // Simulate workflow analysis
      setTimeout(() => {
        setWorkflowAnalysis({
          extractedUseCases: [
            {
              title: 'Patient Registration',
              description: 'Register new patient with demographic and insurance information',
              criticality: 'High',
              confidence: 0.92
            },
            {
              title: 'Symptom Assessment',
              description: 'Collect and analyze patient symptoms for triage priority',
              criticality: 'High',
              confidence: 0.89
            },
            {
              title: 'Medical History Review',
              description: 'Review patient medical history and previous visits',
              criticality: 'Medium',
              confidence: 0.85
            }
          ],
          totalSteps: 12,
          aiSteps: 3,
          confidence: 0.88
        });
      }, 2000);
    }
  };

  // JIRA/ADO Import Handler
  const handleJiraImport = async () => {
    if (!jiraConfig.platform || !jiraConfig.serverUrl || !jiraConfig.projectKey) {
      alert('Please fill in all required JIRA/ADO configuration fields');
      return;
    }

    // Simulate JIRA import
    setTimeout(() => {
      setJiraImportResults([
        {
          key: 'HEALTH-123',
          title: 'Emergency Triage Workflow',
          description: 'As a triage nurse, I want to quickly assess patient severity so I can prioritize care appropriately',
          priority: 'High',
          type: 'Story',
          status: 'Done'
        },
        {
          key: 'HEALTH-124',
          title: 'Patient Symptom Documentation',
          description: 'As a nurse, I want to document patient symptoms accurately so physicians have complete information',
          priority: 'Medium',
          type: 'Story',
          status: 'In Progress'
        },
        {
          key: 'HEALTH-125',
          title: 'Medical History Integration',
          description: 'As a physician, I want to access patient medical history so I can make informed decisions',
          priority: 'Medium',
          type: 'Epic',
          status: 'To Do'
        }
      ]);
    }, 1500);
  };

  // Domain Expert Session Handler
  const handleExpertSessionSave = () => {
    if (!expertSession.expertName || !expertSession.expertRole || !expertSession.interviewNotes) {
      alert('Please fill in expert information and interview notes');
      return;
    }

    const expertUseCases = expertSession.validatedUseCases.map((uc, index) => ({
      id: `UC${useCases.length + index + 1}`,
      title: uc.title,
      description: uc.description,
      criticality: uc.criticality,
      source: 'Domain Expert',
      expertValidation: {
        expertName: expertSession.expertName,
        expertRole: expertSession.expertRole,
        sessionType: expertSession.sessionType,
        notes: expertSession.interviewNotes,
        validatedAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      createdBy: expertSession.expertName
    }));

    setUseCases(prev => [...prev, ...expertUseCases]);
    
    // Reset expert session
    setExpertSession({
      expertName: '',
      expertRole: '',
      sessionType: '',
      interviewNotes: '',
      validatedUseCases: []
    });
    setActiveInputMethod(null);
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Business Workflow': return <Building className="w-4 h-4" />;
      case 'Jira/ADO': return <Briefcase className="w-4 h-4" />;
      case 'Domain Expert': return <Users className="w-4 h-4" />;
      case 'Chat Logs': return <MessageSquare className="w-4 h-4" />;
      case 'Risk Register': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const canCreate = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'C') : true;
  const canEdit = canPerformAction ? canPerformAction('Risk Mapping & Governance', 'E') : true;

  const renderInputMethodModal = () => {
    if (!activeInputMethod) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getSourceIcon(activeInputMethod)}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeInputMethod} Input
                </h3>
              </div>
              <button 
                onClick={() => setActiveInputMethod(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeInputMethod === 'Business Workflow' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Business Workflow Documentation</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Upload process documents, workflow diagrams, or business requirements to extract use cases
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Drag and drop your workflow files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                      Supported formats: PDF, DOCX, XLSX, Visio, Lucidchart, Draw.io (max 50MB)
                    </p>
                    <input
                      type="file"
                      onChange={handleWorkflowUpload}
                      accept=".pdf,.docx,.xlsx,.vsdx,.json,.xml"
                      className="hidden"
                      id="workflow-upload"
                    />
                    <label
                      htmlFor="workflow-upload"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer inline-flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Files</span>
                    </label>
                  </div>
                </div>

                {workflowFile && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">{workflowFile.name}</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        ({(workflowFile.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    {!workflowAnalysis ? (
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing workflow and extracting use cases...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Analysis Complete:</strong> Found {workflowAnalysis.extractedUseCases.length} potential use cases 
                          from {workflowAnalysis.totalSteps} workflow steps ({workflowAnalysis.aiSteps} AI-related)
                        </div>
                        
                        <div className="space-y-3">
                          {workflowAnalysis.extractedUseCases.map((uc: any, index: number) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 dark:text-white">{uc.title}</h5>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-blue-600 dark:text-blue-400">
                                    {(uc.confidence * 100).toFixed(0)}% confidence
                                  </span>
                                  <button
                                    onClick={() => {
                                      setFormData({
                                        title: uc.title,
                                        description: uc.description,
                                        criticality: uc.criticality,
                                        source: 'Business Workflow'
                                      });
                                      setActiveInputMethod(null);
                                    }}
                                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                  >
                                    Use This
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{uc.description}</p>
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCriticalityColor(uc.criticality)}`}>
                                {uc.criticality} Priority
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeInputMethod === 'Jira/ADO' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Import from JIRA/Azure DevOps</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Connect to your project management system to import user stories and epics
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform *
                    </label>
                    <select
                      value={jiraConfig.platform}
                      onChange={(e) => setJiraConfig(prev => ({ ...prev, platform: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Platform</option>
                      <option value="jira_cloud">JIRA Cloud</option>
                      <option value="jira_server">JIRA Server</option>
                      <option value="azure_devops">Azure DevOps</option>
                      <option value="github_issues">GitHub Issues</option>
                      <option value="linear">Linear</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Server URL *
                    </label>
                    <input
                      type="url"
                      value={jiraConfig.serverUrl}
                      onChange={(e) => setJiraConfig(prev => ({ ...prev, serverUrl: e.target.value }))}
                      placeholder="https://company.atlassian.net"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Key *
                    </label>
                    <input
                      type="text"
                      value={jiraConfig.projectKey}
                      onChange={(e) => setJiraConfig(prev => ({ ...prev, projectKey: e.target.value }))}
                      placeholder="HEALTH"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Token *
                    </label>
                    <input
                      type="password"
                      value={jiraConfig.apiToken}
                      onChange={(e) => setJiraConfig(prev => ({ ...prev, apiToken: e.target.value }))}
                      placeholder="Your API token"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JQL Query (Optional)
                  </label>
                  <textarea
                    value={jiraConfig.jqlQuery}
                    onChange={(e) => setJiraConfig(prev => ({ ...prev, jqlQuery: e.target.value }))}
                    placeholder="project = HEALTH AND type in (Story, Epic) AND status != Closed"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Leave empty to import all stories and epics from the project
                  </p>
                </div>

                <button
                  onClick={handleJiraImport}
                  disabled={!jiraConfig.platform || !jiraConfig.serverUrl || !jiraConfig.projectKey}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Link className="w-4 h-4" />
                  <span>Connect & Import</span>
                </button>

                {jiraImportResults.length > 0 && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Import Results ({jiraImportResults.length} items found)
                    </h5>
                    <div className="space-y-3">
                      {jiraImportResults.map((item, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                                {item.key}
                              </span>
                              <h6 className="font-medium text-gray-900 dark:text-white">{item.title}</h6>
                            </div>
                            <button
                              onClick={() => {
                                setFormData({
                                  title: item.title,
                                  description: item.description,
                                  criticality: item.priority,
                                  source: 'Jira/ADO'
                                });
                                setActiveInputMethod(null);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Import
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCriticalityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                              {item.type}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeInputMethod === 'Domain Expert' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Domain Expert Session</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Capture use cases through expert interviews and domain knowledge sessions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expert Name *
                    </label>
                    <input
                      type="text"
                      value={expertSession.expertName}
                      onChange={(e) => setExpertSession(prev => ({ ...prev, expertName: e.target.value }))}
                      placeholder="Dr. Sarah Chen"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expert Role *
                    </label>
                    <select
                      value={expertSession.expertRole}
                      onChange={(e) => setExpertSession(prev => ({ ...prev, expertRole: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Expert Role</option>
                      <option value="Medical Director">Medical Director</option>
                      <option value="Emergency Physician">Emergency Physician</option>
                      <option value="Triage Nurse">Triage Nurse</option>
                      <option value="Clinical Informaticist">Clinical Informaticist</option>
                      <option value="Healthcare Administrator">Healthcare Administrator</option>
                      <option value="Patient Safety Officer">Patient Safety Officer</option>
                      <option value="Ethics Committee Member">Ethics Committee Member</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Type
                    </label>
                    <select
                      value={expertSession.sessionType}
                      onChange={(e) => setExpertSession(prev => ({ ...prev, sessionType: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Session Type</option>
                      <option value="structured_interview">Structured Interview</option>
                      <option value="workflow_walkthrough">Workflow Walkthrough</option>
                      <option value="use_case_validation">Use Case Validation</option>
                      <option value="risk_brainstorming">Risk Brainstorming</option>
                      <option value="requirements_review">Requirements Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interview Notes & Findings *
                  </label>
                  <textarea
                    value={expertSession.interviewNotes}
                    onChange={(e) => setExpertSession(prev => ({ ...prev, interviewNotes: e.target.value }))}
                    placeholder="Document key insights, use cases identified, domain-specific requirements, edge cases, and expert recommendations..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-3">Expert-Validated Use Cases</h5>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4">
                    Add use cases that have been validated by the domain expert during this session
                  </p>
                  
                  <div className="space-y-3">
                    {expertSession.validatedUseCases.map((uc, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{uc.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{uc.description}</div>
                          </div>
                          <button
                            onClick={() => {
                              setExpertSession(prev => ({
                                ...prev,
                                validatedUseCases: prev.validatedUseCases.filter((_, i) => i !== index)
                              }));
                            }}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => {
                        const newUseCase = {
                          title: `Expert Use Case ${expertSession.validatedUseCases.length + 1}`,
                          description: 'Enter description...',
                          criticality: 'Medium'
                        };
                        setExpertSession(prev => ({
                          ...prev,
                          validatedUseCases: [...prev.validatedUseCases, newUseCase]
                        }));
                      }}
                      className="w-full px-4 py-2 border-2 border-dashed border-yellow-300 dark:border-yellow-600 rounded-lg text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Expert-Validated Use Case</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleExpertSessionSave}
                  disabled={!expertSession.expertName || !expertSession.expertRole || !expertSession.interviewNotes}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Save Expert Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

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
      </div>

      {/* Application Profile Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Application Profile (from Step 1)</h3>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{inputFromApplicationSetup.applicationProfile.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {inputFromApplicationSetup.applicationProfile.type} | {inputFromApplicationSetup.applicationProfile.domain} | {inputFromApplicationSetup.applicationProfile.environment}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              <div>Business Criticality: <span className="font-medium">{inputFromApplicationSetup.applicationProfile.businessCriticality}</span></div>
              <div>EU AI Act: <span className="font-medium">{inputFromApplicationSetup.applicationProfile.euAiActRiskClass}</span></div>
              <div>Oversight: <span className="font-medium">{inputFromApplicationSetup.applicationProfile.humanOversightLevel}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Method Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose Input Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveInputMethod('Business Workflow')}
            className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
          >
            <Building className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Business Workflow</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Upload process documents, workflow diagrams, or business requirements
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              Supports: PDF, DOCX, XLSX, Visio, Draw.io
            </div>
          </button>

          <button
            onClick={() => setActiveInputMethod('Jira/ADO')}
            className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group"
          >
            <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">JIRA/Azure DevOps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Import user stories, epics, and requirements from project management tools
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              Supports: JIRA Cloud/Server, Azure DevOps, GitHub
            </div>
          </button>

          <button
            onClick={() => setActiveInputMethod('Domain Expert')}
            className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group"
          >
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Domain Expert</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Structured expert interviews and domain knowledge capture sessions
            </p>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Expert validation, interviews, requirements review
            </div>
          </button>
        </div>
      </div>

      {/* Manual Use Case Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Plus className="w-5 h-5 text-green-600" />
            <span>{editingUseCase ? 'Edit Use Case' : 'Manual Use Case Entry'}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Use Case Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Policy Premium Inquiry"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Criticality *
              </label>
              <select
                value={formData.criticality}
                onChange={(e) => handleInputChange('criticality', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Criticality</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="As a customer, I want to ask about my policy premium so I can know my payment obligations."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source of Use Case *
            </label>
            <select
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Source</option>
              <option value="Business Workflow">Business Workflow</option>
              <option value="Jira/ADO">Jira/ADO</option>
              <option value="Domain Expert">Domain Expert</option>
              <option value="Chat Logs">Chat Logs</option>
              <option value="Risk Register">Risk Register</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            {canCreate && (
              <>
                {editingUseCase ? (
                  <>
                    <button
                      onClick={handleUpdateUseCase}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Use Case</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingUseCase(null);
                        setFormData({ title: '', description: '', criticality: '', source: '' });
                      }}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSaveUseCase}
                    disabled={!formData.title || !formData.description || !formData.criticality || !formData.source}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Use Case</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Use Case Catalog */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <List className="w-5 h-5 text-green-600" />
              <span>Use Case Catalog ({useCases.length})</span>
            </h3>
            
            {useCases.length > 0 && (
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
            )}
          </div>

          {useCases.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Use Cases Defined</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start by choosing an input method above or manually entering use cases
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 dark:text-white">Business Workflow</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Upload process docs</div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 dark:text-white">JIRA/ADO</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Import user stories</div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 dark:text-white">Domain Expert</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Expert interviews</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {useCases.map((useCase) => (
                <div key={useCase.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <button
                          onClick={() => setExpandedUseCase(expandedUseCase === useCase.id ? null : useCase.id)}
                          className="mt-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          {expandedUseCase === useCase.id ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{useCase.id}</span>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{useCase.title}</h4>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCriticalityColor(useCase.criticality)}`}>
                              <span>{useCase.criticality.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                              {getSourceIcon(useCase.source)}
                              <span>{useCase.source}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {expandedUseCase === useCase.id ? useCase.description : 
                             useCase.description.length > 100 ? `${useCase.description.substring(0, 100)}...` : useCase.description}
                          </p>
                          
                          {expandedUseCase === useCase.id && (
                            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-500">ID:</span>
                                  <span className="ml-2 font-mono text-gray-900 dark:text-white">{useCase.id}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-500">Criticality:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{useCase.criticality}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-500">Source:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{useCase.source}</span>
                                </div>
                              </div>
                              <div className="mt-3 text-sm">
                                <span className="text-gray-500 dark:text-gray-500">Created by:</span>
                                <span className="ml-2 text-gray-900 dark:text-white">{useCase.createdBy}</span>
                                <span className="ml-4 text-gray-500 dark:text-gray-500">on</span>
                                <span className="ml-2 text-gray-900 dark:text-white">{new Date(useCase.createdAt).toLocaleString()}</span>
                              </div>
                              {useCase.expertValidation && (
                                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                  <div className="text-sm text-purple-800 dark:text-purple-200">
                                    <strong>Expert Validation:</strong> {useCase.expertValidation.expertName} ({useCase.expertValidation.expertRole})
                                  </div>
                                  <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                    Session: {useCase.expertValidation.sessionType} • {new Date(useCase.expertValidation.validatedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setExpandedUseCase(expandedUseCase === useCase.id ? null : useCase.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {canEdit && (
                          <>
                            <button
                              onClick={() => handleEditUseCase(useCase.id)}
                              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUseCase(useCase.id)}
                              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
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
              {useCases.length === 0 ? 
                "Add at least one use case to proceed" : 
                `${useCases.length} use case${useCases.length === 1 ? '' : 's'} defined`
              }
            </div>
            
            <div className="flex items-center space-x-3">
              {canCreate && (
                <>
                  <button 
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  <button 
                    onClick={handleComplete}
                    disabled={useCases.length === 0}
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
                <div>Total Use Cases: {useCases.length}</div>
                <div>High Priority: {useCases.filter(uc => uc.criticality === 'High').length}</div>
                <div>Medium Priority: {useCases.filter(uc => uc.criticality === 'Medium').length}</div>
                <div>Low Priority: {useCases.filter(uc => uc.criticality === 'Low').length}</div>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Source Breakdown</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {['Business Workflow', 'Jira/ADO', 'Domain Expert', 'Chat Logs', 'Risk Register', 'Other'].map(source => {
                  const count = useCases.filter(uc => uc.source === source).length;
                  return count > 0 ? <div key={source}>{source}: {count}</div> : null;
                })}
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ready for Next Step</h4>
              <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <div>✓ Use cases documented</div>
                <div>✓ Criticality assessed</div>
                <div>✓ Sources identified</div>
                <div>✓ Ready for risk analysis</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-emerald-800 dark:text-emerald-200">
              <Target className="w-4 h-4" />
              <span>Ready for Risk Classification (Component 3)</span>
            </div>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
              <span>Proceed to Risk Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Example Use Cases for Reference */}
      {useCases.length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Example Use Cases (Healthcare Triage Assistant)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">UC1: Emergency Patient Triage</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                "As a triage nurse, I want to assess patient severity so I can prioritize care appropriately."
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">High</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Business Workflow</span>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">UC2: Symptom Documentation</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                "As a nurse, I want to document symptoms accurately so physicians have complete information."
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Medium</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Domain Expert</span>
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">UC3: Patient History Review</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                "As a physician, I want to review patient history quickly so I can make informed decisions."
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Low</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Chat Logs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Method Modals */}
      {renderInputMethodModal()}
    </div>
  );
};

export default UseCaseDefinition;