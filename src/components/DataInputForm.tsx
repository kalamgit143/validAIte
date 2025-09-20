import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  AlertTriangle,
  Shield,
  Users,
  Brain,
  Database,
  Settings,
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  Target,
  Globe,
  Lock,
  Zap,
  Activity,
  Code,
  MessageSquare,
  BarChart3,
  Search,
  Filter
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  description: string;
  sourceType: string;
  agentsInvolved: string[];
}

interface Risk {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  evidenceNeeded: string;
  category: string;
}

interface Control {
  id: string;
  name: string;
  mappedRisks: string[];
  mitigationStrategy: string;
  complianceMapping: string[];
  agentResponsibility?: string;
}

interface GovernanceMatrixRow {
  useCase: string;
  source: string;
  agents: string[];
  risks: string[];
  severity: string;
  controls: string[];
  compliance: string[];
}

const DataInputForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    name: '',
    domain: '',
    environment: '',
    description: '',
    type: ''
  });
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [governanceMatrix, setGovernanceMatrix] = useState<GovernanceMatrixRow[]>([]);

  const domains = [
    'Retail & E-commerce',
    'Banking & Financial Services', 
    'Insurance',
    'Healthcare & Life Sciences',
    'Government & Public Sector',
    'Manufacturing',
    'Technology & Software',
    'Education',
    'Energy & Utilities',
    'Transportation & Logistics'
  ];

  const applicationTypes = [
    'Plain LLM',
    'LLM + RAG',
    'Multi-Agentic (Tool Calling, MCP, etc.) + RAG',
    'Copilot / Assistant',
    'Summarizer / Q&A System',
    'Content Generator',
    'Decision Support'
  ];

  const sourceTypes = [
    'Knowledge Base (KB)',
    'API Integration',
    'Database Query',
    'Agent Orchestration',
    'None'
  ];

  const agentTypes = [
    'Retriever',
    'Summarizer', 
    'Orchestrator',
    'ToolCaller',
    'ComplianceAgent',
    'AnalyticsAgent',
    'SecurityAgent'
  ];

  const evidenceTypes = [
    'KB logs',
    'API traces',
    'Agent transcripts',
    'UI recordings',
    'Database queries',
    'System metrics',
    'User feedback',
    'Audit logs'
  ];

  const complianceFrameworks = [
    'NIST AI RMF',
    'EU AI Act',
    'ISO/IEC 23053',
    'OWASP LLM Top-10',
    'SOC 2',
    'GDPR',
    'HIPAA',
    'SOX',
    'CCPA',
    'FedRAMP'
  ];

  const getRisksByAppType = (appType: string): Risk[] => {
    const baseRisks = [
      { id: 'hallucination', name: 'Hallucination', category: 'accuracy', severity: 'high' as const, description: 'Model generates false or misleading information', evidenceNeeded: 'API traces' },
      { id: 'bias_fairness', name: 'Bias/Fairness', category: 'fairness', severity: 'high' as const, description: 'Discriminatory outputs across demographic groups', evidenceNeeded: 'User feedback' },
      { id: 'toxicity', name: 'Toxicity', category: 'safety', severity: 'high' as const, description: 'Harmful, offensive, or inappropriate content generation', evidenceNeeded: 'UI recordings' },
      { id: 'inconsistency', name: 'Inconsistency', category: 'reliability', severity: 'medium' as const, description: 'Varying responses to similar inputs', evidenceNeeded: 'API traces' },
      { id: 'prompt_injection', name: 'Prompt Injection', category: 'security', severity: 'high' as const, description: 'Malicious prompt manipulation attacks', evidenceNeeded: 'System metrics' },
      { id: 'data_privacy', name: 'Data Privacy', category: 'privacy', severity: 'high' as const, description: 'Unauthorized data exposure or processing', evidenceNeeded: 'Audit logs' },
      { id: 'explainability_gap', name: 'Explainability Gap', category: 'transparency', severity: 'medium' as const, description: 'Lack of decision transparency', evidenceNeeded: 'User feedback' }
    ];

    const ragRisks = [
      { id: 'retrieval_errors', name: 'Retrieval Errors', category: 'accuracy', severity: 'high' as const, description: 'Incorrect or irrelevant document retrieval', evidenceNeeded: 'KB logs' },
      { id: 'kb_freshness_drift', name: 'KB Freshness/Drift', category: 'reliability', severity: 'medium' as const, description: 'Outdated or drifting knowledge base content', evidenceNeeded: 'KB logs' },
      { id: 'conflicting_sources', name: 'Conflicting Sources', category: 'accuracy', severity: 'medium' as const, description: 'Contradictory information from multiple sources', evidenceNeeded: 'KB logs' },
      { id: 'grounding_gap', name: 'Grounding Gap', category: 'accuracy', severity: 'high' as const, description: 'Responses not properly grounded in retrieved content', evidenceNeeded: 'API traces' },
      { id: 'retrieval_injection', name: 'Retrieval Injection', category: 'security', severity: 'high' as const, description: 'Malicious content injection through retrieval', evidenceNeeded: 'System metrics' },
      { id: 'citation_consistency', name: 'Citation Consistency', category: 'transparency', severity: 'low' as const, description: 'Inconsistent or missing source citations', evidenceNeeded: 'UI recordings' }
    ];

    const multiAgentRisks = [
      { id: 'agent_misrouting', name: 'Agent Misrouting', category: 'reliability', severity: 'high' as const, description: 'Incorrect agent selection or routing', evidenceNeeded: 'Agent transcripts' },
      { id: 'deadlocks', name: 'Deadlocks', category: 'performance', severity: 'medium' as const, description: 'Agent workflow deadlocks or infinite loops', evidenceNeeded: 'System metrics' },
      { id: 'tool_misuse', name: 'Tool Misuse', category: 'safety', severity: 'high' as const, description: 'Inappropriate or dangerous tool usage', evidenceNeeded: 'Agent transcripts' },
      { id: 'latency', name: 'Latency', category: 'performance', severity: 'medium' as const, description: 'Excessive response times in multi-agent workflows', evidenceNeeded: 'System metrics' },
      { id: 'state_leakage', name: 'State Leakage', category: 'privacy', severity: 'high' as const, description: 'Information leakage between agent states', evidenceNeeded: 'Agent transcripts' },
      { id: 'handoff_errors', name: 'Handoff Errors', category: 'reliability', severity: 'medium' as const, description: 'Failed or incomplete agent handoffs', evidenceNeeded: 'Agent transcripts' },
      { id: 'over_delegation', name: 'Over-Delegation', category: 'governance', severity: 'medium' as const, description: 'Excessive delegation without human oversight', evidenceNeeded: 'Audit logs' }
    ];

    const copilotRisks = [
      { id: 'wrong_action', name: 'Wrong Action', category: 'safety', severity: 'high' as const, description: 'Copilot suggests or executes incorrect actions', evidenceNeeded: 'UI recordings' },
      { id: 'context_leakage', name: 'Context Leakage', category: 'privacy', severity: 'high' as const, description: 'Sensitive context shared inappropriately', evidenceNeeded: 'System metrics' },
      { id: 'over_autonomy', name: 'Over-Autonomy', category: 'governance', severity: 'medium' as const, description: 'Excessive autonomous behavior without user control', evidenceNeeded: 'User feedback' }
    ];

    const summarizerRisks = [
      { id: 'coverage_gaps', name: 'Coverage Gaps', category: 'accuracy', severity: 'medium' as const, description: 'Important information omitted from summaries', evidenceNeeded: 'KB logs' },
      { id: 'compression_bias', name: 'Compression Bias', category: 'fairness', severity: 'medium' as const, description: 'Biased information selection during summarization', evidenceNeeded: 'User feedback' },
      { id: 'hallucinated_citations', name: 'Hallucinated Citations', category: 'accuracy', severity: 'high' as const, description: 'False or non-existent source citations', evidenceNeeded: 'KB logs' }
    ];

    const contentGeneratorRisks = [
      { id: 'plagiarism', name: 'Plagiarism', category: 'legal', severity: 'high' as const, description: 'Unauthorized copying of copyrighted content', evidenceNeeded: 'API traces' },
      { id: 'brand_drift', name: 'Brand Drift', category: 'business', severity: 'medium' as const, description: 'Content inconsistent with brand guidelines', evidenceNeeded: 'User feedback' },
      { id: 'ethical_risks', name: 'Ethical Risks', category: 'ethics', severity: 'high' as const, description: 'Content violating ethical standards', evidenceNeeded: 'UI recordings' }
    ];

    const decisionSupportRisks = [
      { id: 'over_reliance', name: 'Over-Reliance', category: 'governance', severity: 'high' as const, description: 'Excessive dependence on AI recommendations', evidenceNeeded: 'User feedback' },
      { id: 'explainability_gap_decision', name: 'Explainability Gap', category: 'transparency', severity: 'high' as const, description: 'Lack of decision reasoning transparency', evidenceNeeded: 'System metrics' },
      { id: 'fairness_ranking', name: 'Fairness in Ranking', category: 'fairness', severity: 'high' as const, description: 'Biased ranking or recommendation algorithms', evidenceNeeded: 'Audit logs' }
    ];

    let risks = [...baseRisks];

    if (appType.includes('RAG')) {
      risks = [...risks, ...ragRisks];
    }
    if (appType.includes('Multi-Agentic')) {
      risks = [...risks, ...multiAgentRisks];
    }
    if (appType.includes('Copilot') || appType.includes('Assistant')) {
      risks = [...risks, ...copilotRisks];
    }
    if (appType.includes('Summarizer') || appType.includes('Q&A')) {
      risks = [...risks, ...summarizerRisks];
    }
    if (appType.includes('Content Generator')) {
      risks = [...risks, ...contentGeneratorRisks];
    }
    if (appType.includes('Decision Support')) {
      risks = [...risks, ...decisionSupportRisks];
    }

    return risks;
  };

  const generateGovernanceMatrix = () => {
    const matrix: GovernanceMatrixRow[] = [];
    
    useCases.forEach(useCase => {
      const useCaseRisks = risks.filter(risk => 
        controls.some(control => 
          control.mappedRisks.includes(risk.id)
        )
      );
      
      const useCaseControls = controls.filter(control =>
        control.mappedRisks.some(riskId => 
          useCaseRisks.some(risk => risk.id === riskId)
        )
      );

      const allCompliance = [...new Set(useCaseControls.flatMap(control => control.complianceMapping))];
      const maxSeverity = useCaseRisks.reduce((max, risk) => {
        if (risk.severity === 'high') return 'high';
        if (risk.severity === 'medium' && max !== 'high') return 'medium';
        return max;
      }, 'low' as string);

      matrix.push({
        useCase: useCase.title,
        source: useCase.sourceType,
        agents: useCase.agentsInvolved,
        risks: useCaseRisks.map(r => r.name),
        severity: maxSeverity,
        controls: useCaseControls.map(c => c.name),
        compliance: allCompliance
      });
    });

    setGovernanceMatrix(matrix);
  };

  const addUseCase = () => {
    const newUseCase: UseCase = {
      id: `uc_${Date.now()}`,
      title: '',
      description: '',
      sourceType: '',
      agentsInvolved: []
    };
    setUseCases([...useCases, newUseCase]);
  };

  const updateUseCase = (id: string, field: keyof UseCase, value: any) => {
    setUseCases(prev => prev.map(uc => 
      uc.id === id ? { ...uc, [field]: value } : uc
    ));
  };

  const addControl = () => {
    const newControl: Control = {
      id: `ctrl_${Date.now()}`,
      name: '',
      mappedRisks: [],
      mitigationStrategy: '',
      complianceMapping: [],
      agentResponsibility: ''
    };
    setControls([...controls, newControl]);
  };

  const updateControl = (id: string, field: keyof Control, value: any) => {
    setControls(prev => prev.map(ctrl => 
      ctrl.id === id ? { ...ctrl, [field]: value } : ctrl
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Setup</h2>
        <p className="text-gray-600 dark:text-gray-400">Define your GenAI application characteristics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Name *
          </label>
          <input
            type="text"
            value={applicationData.name}
            onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Retail Copilot"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain *
          </label>
          <select
            value={applicationData.domain}
            onChange={(e) => setApplicationData(prev => ({ ...prev, domain: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Domain</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deployment Environment *
          </label>
          <select
            value={applicationData.environment}
            onChange={(e) => setApplicationData(prev => ({ ...prev, environment: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Environment</option>
            <option value="sandbox">Sandbox</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Type *
          </label>
          <select
            value={applicationData.type}
            onChange={(e) => setApplicationData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Application Type</option>
            {applicationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={applicationData.description}
          onChange={(e) => setApplicationData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the application's purpose, functionality, and business objectives..."
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Define Use Cases</h2>
          <p className="text-gray-600 dark:text-gray-400">Specify the specific use cases for your application</p>
        </div>
        <button
          onClick={addUseCase}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Use Case</span>
        </button>
      </div>

      <div className="space-y-4">
        {useCases.map((useCase, index) => (
          <div key={useCase.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Use Case #{index + 1}</h3>
              <button
                onClick={() => setUseCases(prev => prev.filter(uc => uc.id !== useCase.id))}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Use Case Title *
                </label>
                <input
                  type="text"
                  value={useCase.title}
                  onChange={(e) => updateUseCase(useCase.id, 'title', e.target.value)}
                  placeholder="e.g., Return Policy Inquiry"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Source Type *
                </label>
                <select
                  value={useCase.sourceType}
                  onChange={(e) => updateUseCase(useCase.id, 'sourceType', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Source Type</option>
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={useCase.description}
                onChange={(e) => updateUseCase(useCase.id, 'description', e.target.value)}
                placeholder="Describe the chatbot task expected..."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            </div>

            {applicationData.type.includes('Multi-Agentic') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Agents Involved
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {agentTypes.map(agent => (
                    <label key={agent} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={useCase.agentsInvolved.includes(agent)}
                        onChange={(e) => {
                          const newAgents = e.target.checked
                            ? [...useCase.agentsInvolved, agent]
                            : useCase.agentsInvolved.filter(a => a !== agent);
                          updateUseCase(useCase.id, 'agentsInvolved', newAgents);
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{agent}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {useCases.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No use cases defined yet</p>
            <button
              onClick={addUseCase}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Use Case
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => {
    const suggestedRisks = getRisksByAppType(applicationData.type);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Risk Classification</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Identify risks based on your {applicationData.type} architecture
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Auto-Populated Risk Library</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Based on your {applicationData.type} selection, we've pre-populated {suggestedRisks.length} relevant risks. 
                You can edit, remove, or add custom risks as needed.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {suggestedRisks.map((risk, index) => {
            const existingRisk = risks.find(r => r.id === risk.id) || risk;
            const isSelected = risks.some(r => r.id === risk.id);

            return (
              <div key={risk.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRisks(prev => [...prev, existingRisk]);
                      } else {
                        setRisks(prev => prev.filter(r => r.id !== risk.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{existingRisk.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(existingRisk.severity)}`}>
                        {existingRisk.severity.toUpperCase()}
                      </div>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        {existingRisk.category}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Severity</label>
                          <select
                            value={existingRisk.severity}
                            onChange={(e) => {
                              const newSeverity = e.target.value as 'high' | 'medium' | 'low';
                              setRisks(prev => prev.map(r => 
                                r.id === risk.id ? { ...r, severity: newSeverity } : r
                              ));
                            }}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Evidence Needed</label>
                          <select
                            value={existingRisk.evidenceNeeded}
                            onChange={(e) => {
                              setRisks(prev => prev.map(r => 
                                r.id === risk.id ? { ...r, evidenceNeeded: e.target.value } : r
                              ));
                            }}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                          >
                            {evidenceTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{existingRisk.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add Custom Risk</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Custom risk name"
              className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Custom Risk
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Establish Controls</h2>
          <p className="text-gray-600 dark:text-gray-400">Define mitigation controls for identified risks</p>
        </div>
        <button
          onClick={addControl}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Control</span>
        </button>
      </div>

      <div className="space-y-4">
        {controls.map((control, index) => (
          <div key={control.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Control #{index + 1}</h3>
              <button
                onClick={() => setControls(prev => prev.filter(c => c.id !== control.id))}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Name *
                </label>
                <input
                  type="text"
                  value={control.name}
                  onChange={(e) => updateControl(control.id, 'name', e.target.value)}
                  placeholder="e.g., Canonical KB Validation"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mapped Risk(s) *
                </label>
                <select
                  multiple
                  value={control.mappedRisks}
                  onChange={(e) => {
                    const selectedRisks = Array.from(e.target.selectedOptions, option => option.value);
                    updateControl(control.id, 'mappedRisks', selectedRisks);
                  }}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  size={3}
                >
                  {risks.map(risk => (
                    <option key={risk.id} value={risk.id}>{risk.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mitigation Strategy *
              </label>
              <textarea
                value={control.mitigationStrategy}
                onChange={(e) => updateControl(control.id, 'mitigationStrategy', e.target.value)}
                placeholder="e.g., Restrict retriever to validated policy docs."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Compliance Mapping
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {complianceFrameworks.map(framework => (
                    <label key={framework} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={control.complianceMapping.includes(framework)}
                        onChange={(e) => {
                          const newMapping = e.target.checked
                            ? [...control.complianceMapping, framework]
                            : control.complianceMapping.filter(f => f !== framework);
                          updateControl(control.id, 'complianceMapping', newMapping);
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">{framework}</span>
                    </label>
                  ))}
                </div>
              </div>

              {applicationData.type.includes('Multi-Agentic') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Agent Responsibility
                  </label>
                  <select
                    value={control.agentResponsibility || ''}
                    onChange={(e) => updateControl(control.id, 'agentResponsibility', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Agent</option>
                    {agentTypes.map(agent => (
                      <option key={agent} value={agent}>{agent}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}

        {controls.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No controls defined yet</p>
            <button
              onClick={addControl}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add First Control
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderStep5 = () => {
    if (governanceMatrix.length === 0) {
      generateGovernanceMatrix();
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governance Matrix Review</h2>
            <p className="text-gray-600 dark:text-gray-400">Review the auto-generated governance traceability matrix</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Evidence Pack</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Continue to Trust Metrics Engine
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Use Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Agent(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk(s)</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Control(s)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {governanceMatrix.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.useCase}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.agents.map((agent, agentIndex) => (
                          <span key={agentIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {agent}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.risks.slice(0, 2).map((risk, riskIndex) => (
                          <span key={riskIndex} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded">
                            {risk}
                          </span>
                        ))}
                        {row.risks.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.risks.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(row.severity)}`}>
                        {row.severity.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.controls.slice(0, 2).map((control, controlIndex) => (
                          <span key={controlIndex} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded">
                            {control}
                          </span>
                        ))}
                        {row.controls.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.controls.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.compliance.slice(0, 2).map((comp, compIndex) => (
                          <span key={compIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            {comp}
                          </span>
                        ))}
                        {row.compliance.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{row.compliance.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Governance Matrix Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-800 dark:text-blue-200">Use Cases:</span>
                  <div className="font-bold text-blue-900 dark:text-blue-100">{useCases.length}</div>
                </div>
                <div>
                  <span className="text-blue-800 dark:text-blue-200">Risks Identified:</span>
                  <div className="font-bold text-blue-900 dark:text-blue-100">{risks.length}</div>
                </div>
                <div>
                  <span className="text-blue-800 dark:text-blue-200">Controls Defined:</span>
                  <div className="font-bold text-blue-900 dark:text-blue-100">{controls.length}</div>
                </div>
                <div>
                  <span className="text-blue-800 dark:text-blue-200">Compliance Frameworks:</span>
                  <div className="font-bold text-blue-900 dark:text-blue-100">
                    {[...new Set(controls.flatMap(c => c.complianceMapping))].length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return applicationData.name && applicationData.domain && applicationData.environment && applicationData.type && applicationData.description;
      case 2:
        return useCases.length > 0 && useCases.every(uc => uc.title && uc.description && uc.sourceType);
      case 3:
        return risks.length > 0;
      case 4:
        return controls.length > 0 && controls.every(c => c.name && c.mappedRisks.length > 0 && c.mitigationStrategy);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Mapping & Governance</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive risk assessment and governance framework setup</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of 5
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {[
            { step: 1, title: 'Application Setup', icon: Settings },
            { step: 2, title: 'Define Use Cases', icon: MessageSquare },
            { step: 3, title: 'Risk Classification', icon: AlertTriangle },
            { step: 4, title: 'Establish Controls', icon: Shield },
            { step: 5, title: 'Governance Matrix', icon: FileText }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  item.step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {item.step < currentStep ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    item.step <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.title}
                  </div>
                </div>
                {index < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    item.step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 1 && 'Define your application characteristics'}
              {currentStep === 2 && 'Specify use cases and data sources'}
              {currentStep === 3 && 'Identify and classify risks'}
              {currentStep === 4 && 'Establish mitigation controls'}
              {currentStep === 5 && 'Review governance traceability'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!canProceed() || currentStep === 5}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>{currentStep === 5 ? 'Complete' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Application Summary (visible after step 1) */}
      {currentStep > 1 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-4 text-sm">
            <span className="font-medium text-gray-900 dark:text-white">{applicationData.name}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{applicationData.domain}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{applicationData.type}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              applicationData.environment === 'production' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
              applicationData.environment === 'staging' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {applicationData.environment.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInputForm;