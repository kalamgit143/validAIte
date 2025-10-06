import React, { useState } from 'react';
import {
  Brain,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Database,
  Code,
  Activity,
  Layers,
  FileText,
  ChevronRight,
  Download,
  Target,
  Eye
} from 'lucide-react';
import { classifyApplication as admClassify } from '../utils/admClassifier';

interface VAMData {
  name: string;
  domain: string;
  dataSensitivity: string[];
  impactContext: string;
  interactionPattern: string;
  modalities: string[];
  retrievalEnabled: boolean;
  citationsEnabled: boolean;
  vectorDb: string;
  freshnessPolicy: string;
  structuredOutput: string;
  schemaRefs: string[];
  idePlugins: boolean;
  repoConnectors: string[];
  staticAnalyzer: boolean;
  nlqToSql: boolean;
  biConnectors: string[];
  queryValidation: boolean;
  vlm: boolean;
  asr: boolean;
  tts: boolean;
  mediaRedaction: boolean;
  modelProvider: string;
  fineTuned: boolean;
  adapters: string[];
  checkpoints: string[];
  toolUse: boolean;
  planner: string;
  autonomyThreshold: number;
  humanApprovalSteps: string;
  costQuotaControls: boolean;
  policyEngine: boolean;
  rollbackKillswitch: boolean;
  conversationMemory: boolean;
  systems: string[];
  ssoScim: boolean;
  releaseGates: boolean;
  auditTrails: boolean;
  hitlMandatory: boolean;
  regulatorScope: string[];
  evidenceRequired: string;
}

interface ArchetypeScore {
  code: string;
  name: string;
  probability: number;
  signals: string[];
}

interface RMFProfile {
  categorize: string;
  selectControls: string[];
  assessPacks: string[];
  authorizeThresholds: string[];
  monitoring: string[];
}

interface ClassificationResult {
  primaryArchetype: ArchetypeScore;
  archetypes: ArchetypeScore[];
  dominant: string;
  modifiers: string[];
  riskTier: string;
  riskScore: number;
  confidence: number;
  decisionTrace: string[];
  mixture: Record<string, number>;
  rmfProfile: RMFProfile;
}

const ArchetypeClassifier: React.FC = () => {
  const [step, setStep] = useState<'input' | 'classify' | 'results'>('input');
  const [vamData, setVamData] = useState<Partial<VAMData>>({
    name: '',
    domain: 'general',
    dataSensitivity: [],
    impactContext: 'internal',
    interactionPattern: 'single_turn',
    modalities: ['text'],
    retrievalEnabled: false,
    citationsEnabled: false,
    vectorDb: 'none',
    freshnessPolicy: 'none',
    structuredOutput: 'none',
    schemaRefs: [],
    idePlugins: false,
    repoConnectors: [],
    staticAnalyzer: false,
    nlqToSql: false,
    biConnectors: [],
    queryValidation: false,
    vlm: false,
    asr: false,
    tts: false,
    mediaRedaction: false,
    modelProvider: 'openai',
    fineTuned: false,
    adapters: [],
    checkpoints: [],
    toolUse: false,
    planner: 'none',
    autonomyThreshold: 0,
    humanApprovalSteps: 'high',
    costQuotaControls: false,
    policyEngine: false,
    rollbackKillswitch: false,
    conversationMemory: false,
    systems: [],
    ssoScim: false,
    releaseGates: false,
    auditTrails: false,
    hitlMandatory: false,
    regulatorScope: [],
    evidenceRequired: 'basic'
  });

  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const archetypeDefinitions = [
    {
      code: 'A1',
      name: 'Assistive Text Generation (Single-Turn)',
      shortName: 'Assistive Text Generation',
      description: 'Prompt-in → prose/summary/outlines → prompt-out. No tools, no memory, no external KB.',
      signals: ['No retrieval connectors', 'No function-calling', '/completions style APIs', 'Stateless calls'],
      useCases: ['Draft emails', 'Rewrite copy', 'Summarize documents'],
      risks: ['Hallucination', 'Style drift', 'Leakage via prompts'],
      archetypeCode: 'A1|TXT|STAT|GEN'
    },
    {
      code: 'A2',
      name: 'Conversational Assistant (Multi-Turn Dialog)',
      shortName: 'Conversational Assistant',
      description: 'Dialog manager with memory; may do light grounding but no retrieval layer.',
      signals: ['Conversation state store', 'Session memory', 'Turn IDs', 'No vector DB'],
      useCases: ['HR FAQs', 'Campus help', 'General concierge'],
      risks: ['Context carryover errors', 'Jailbreak via long history', 'Prompt injection'],
      archetypeCode: 'A2|TXT|DIAL|GEN'
    },
    {
      code: 'A3',
      name: 'RAG Knowledge Assistant / Policy Explainer',
      shortName: 'RAG Knowledge Assistant',
      description: 'Retrieval-Augmented Generation over internal KB/policies with grounding and citations.',
      signals: ['Vector DB', 'Retriever ranker', 'Citations', 'Chunking pipeline'],
      useCases: ['Insurance policy Q&A', 'SOP assistants', 'Product knowledge bots'],
      risks: ['Fabrication when retrieval fails', 'Outdated/poisoned KB', 'Citation mismatch'],
      archetypeCode: 'A3|TXT|RAG|ENT'
    },
    {
      code: 'A4',
      name: 'Structured Generation & Document Automation',
      shortName: 'Structured Generation',
      description: 'Generates constrained outputs (JSON, tables, forms) and/or transforms documents.',
      signals: ['JSON schemas', 'Function-call outputs', 'Validators', 'Template engines'],
      useCases: ['Claims forms', 'KYC pack assembly', 'Report drafting', 'Doc extraction'],
      risks: ['Schema non-conformance', 'Hidden hallucinated fields', 'Data leakage'],
      archetypeCode: 'A4|STRC|FUNC|ENT'
    },
    {
      code: 'A5',
      name: 'Code Generation & DevOps Assistant',
      shortName: 'Code Generation',
      description: 'Generates code/tests, refactors, performs tool-assisted IDE actions, CI suggestions.',
      signals: ['IDE plugins', 'Repo connectors', 'SARIF', 'Unit test scaffolding', 'Static analyzers'],
      useCases: ['Boilerplate code', 'Unit tests', 'IaC templates', 'CI fix suggestions'],
      risks: ['Insecure patterns', 'License contamination', 'Flaky tests', 'Supply-chain risk'],
      archetypeCode: 'A5|CODE|TOOLS|ENG'
    },
    {
      code: 'A6',
      name: 'Generative Analytics & Data Reasoning',
      shortName: 'Generative Analytics',
      description: 'NL → SQL / DSL; reasoning over datasets/warehouses; narrative BI.',
      signals: ['SQL generator', 'Semantic layer/BI connectors', 'Query sandbox', 'Guardrails'],
      useCases: ['Self-serve analytics', 'Anomaly narratives', 'Metric QA'],
      risks: ['Wrong queries with confident narratives', 'Privacy joins', 'Row-level leaks'],
      archetypeCode: 'A6|DATA|NLQ|ENT'
    },
    {
      code: 'A7',
      name: 'Multimodal Perception–Generation (Vision/Speech)',
      shortName: 'Multimodal AI',
      description: 'Vision+Text and/or Speech+Text; perception (OCR/VLM/ASR) + generation.',
      signals: ['Image/audio inputs', 'VLM/ASR/TTS models', 'Media pipelines'],
      useCases: ['Document intelligence', 'Call-center transcription', 'Compliance spotting'],
      risks: ['Perception bias', 'Adversarial images/audio prompts', 'PHI leakage in media'],
      archetypeCode: 'A7|MMOD|PERCEP|ENT'
    },
    {
      code: 'A8',
      name: 'Fine-Tuned Domain Expert (Regulation-Aware)',
      shortName: 'Fine-Tuned Domain Expert',
      description: 'Fine-tuned models on domain corpora (health, insurance, finance, legal) for expert answers.',
      signals: ['Custom checkpoints', 'LoRA adapters', 'Domain eval suites', 'Model cards'],
      useCases: ['Clinical note assistants', 'Underwriting guidance', 'Compliance drafting'],
      risks: ['Confident wrongs in high-stakes domains', 'Bias', 'Outdated domain facts'],
      archetypeCode: 'A8|TXT|FTUNE|REG'
    },
    {
      code: 'A9',
      name: 'Tool-Using Agent (Orchestrated Actions)',
      shortName: 'Tool-Using Agent',
      description: 'LLM plans + calls tools/APIs (search, calculators, ticketing), with human approvals on critical steps.',
      signals: ['Function-calling', 'Tool registry', 'Planner-executor loop', 'Guardrail policies'],
      useCases: ['ITSM triage→ticket update', 'Knowledge lookup→draft response', 'CRM note creation'],
      risks: ['Tool misuse', 'Prompt-injection via tool outputs', 'Chain-of-thought leakage', 'Cost/runaway loops'],
      archetypeCode: 'A9|AGNT|TOOLS|ENT'
    },
    {
      code: 'A10',
      name: 'Autonomous Workflow Agent (Limited Autonomy)',
      shortName: 'Autonomous Workflow Agent',
      description: 'Multi-step agents executing workflows with policy-gated autonomy (auto-approve under thresholds).',
      signals: ['Planners', 'Memory', 'Evaluators/critics', 'Policy engines', 'Rollback mechanisms'],
      useCases: ['Invoice matching & dispute drafting', 'Low-risk ops runbooks with auto-remediation'],
      risks: ['Cascading errors', 'Policy drift', 'Silent failures', 'Unsafe autonomy escalation'],
      archetypeCode: 'A10|AGNT|AUTO|OPS'
    },
    {
      code: 'A11',
      name: 'Enterprise-Integrated GenAI (Mission-Critical)',
      shortName: 'Enterprise-Integrated GenAI',
      description: 'GenAI embedded in core systems (ERP/CRM/Guidewire/SAP/ServiceNow) affecting business KPIs.',
      signals: ['Deep system adapters', 'SSO/SCIM', 'Audit trails', 'Change-management hooks', 'Release gates'],
      useCases: ['Order-to-cash note assistants', 'Claims triage', 'CX routing', 'Forecasting narratives'],
      risks: ['Business integrity', 'Compliance', 'Data residency', 'Vendor lock-in side-effects'],
      archetypeCode: 'A11|ENT|EMBED|BIZ'
    },
    {
      code: 'A12',
      name: 'Safety-Critical / Regulated Decision Support (HITL-Mandatory)',
      shortName: 'Safety-Critical HITL',
      description: 'Supports decisions with material safety/compliance impact; human-in-the-loop required.',
      signals: ['HITL checkpoints', 'Rationale capture', 'Dual control', 'Immutable evidence packs'],
      useCases: ['Clinical decision support', 'Claims adjudication', 'KYC/AML escalations', 'Credit risk notes'],
      risks: ['Harmful guidance', 'Discrimination', 'Regulatory breaches', 'Explainability gaps'],
      archetypeCode: 'A12|REG|HITL|HIGH'
    }
  ];

  const classifyApplication = () => {
    setIsClassifying(true);
    setStep('classify');

    setTimeout(() => {
      const result = admClassify(vamData);
      setClassification(result);
      setStep('results');
      setIsClassifying(false);
    }, 2000);
  };

  const updateVAM = (field: keyof VAMData, value: any) => {
    setVamData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof VAMData, value: string) => {
    setVamData(prev => {
      const current = (prev[field] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const renderInputForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Name
          </label>
          <input
            type="text"
            value={vamData.name}
            onChange={(e) => updateVAM('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g., Insurance Policy Advisor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain
          </label>
          <select
            value={vamData.domain}
            onChange={(e) => updateVAM('domain', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="general">General</option>
            <option value="insurance">Insurance</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Impact Context
          </label>
          <select
            value={vamData.impactContext}
            onChange={(e) => updateVAM('impactContext', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="internal">Internal</option>
            <option value="customer_facing">Customer Facing</option>
            <option value="mission_critical">Mission Critical</option>
            <option value="safety_critical">Safety Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data Sensitivity
          </label>
          <div className="flex flex-wrap gap-2">
            {['none', 'pii', 'phi', 'pci'].map(sens => (
              <button
                key={sens}
                onClick={() => toggleArrayValue('dataSensitivity', sens)}
                className={`px-3 py-1 rounded-full text-sm ${
                  (vamData.dataSensitivity || []).includes(sens)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {sens.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capabilities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interaction Pattern
            </label>
            <select
              value={vamData.interactionPattern}
              onChange={(e) => updateVAM('interactionPattern', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="single_turn">Single Turn</option>
              <option value="multi_turn">Multi Turn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Model Provider
            </label>
            <select
              value={vamData.modelProvider}
              onChange={(e) => updateVAM('modelProvider', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="meta">Meta</option>
              <option value="self_hosted">Self Hosted</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.retrievalEnabled}
              onChange={(e) => updateVAM('retrievalEnabled', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Retrieval (RAG)</span>
          </label>

          {vamData.retrievalEnabled && (
            <>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={vamData.citationsEnabled}
                  onChange={(e) => updateVAM('citationsEnabled', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Citations</span>
              </label>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vector Database
                </label>
                <select
                  value={vamData.vectorDb}
                  onChange={(e) => updateVAM('vectorDb', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="none">None</option>
                  <option value="faiss">FAISS</option>
                  <option value="pinecone">Pinecone</option>
                  <option value="pgvector">pgvector</option>
                  <option value="weaviate">Weaviate</option>
                </select>
              </div>
            </>
          )}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.fineTuned}
              onChange={(e) => updateVAM('fineTuned', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Fine-Tuned Model</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.toolUse}
              onChange={(e) => updateVAM('toolUse', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Tool Use (Agents)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.vlm}
              onChange={(e) => updateVAM('vlm', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Vision (VLM)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.asr}
              onChange={(e) => updateVAM('asr', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Speech (ASR)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.nlqToSql}
              onChange={(e) => updateVAM('nlqToSql', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">NL to SQL</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.idePlugins}
              onChange={(e) => updateVAM('idePlugins', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">IDE Plugins</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.staticAnalyzer}
              onChange={(e) => updateVAM('staticAnalyzer', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Static Analyzer</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.queryValidation}
              onChange={(e) => updateVAM('queryValidation', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Query Validation</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.mediaRedaction}
              onChange={(e) => updateVAM('mediaRedaction', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Media Redaction</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.conversationMemory}
              onChange={(e) => updateVAM('conversationMemory', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Conversation Memory</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.costQuotaControls}
              onChange={(e) => updateVAM('costQuotaControls', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Cost Quota Controls</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.policyEngine}
              onChange={(e) => updateVAM('policyEngine', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Policy Engine</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.rollbackKillswitch}
              onChange={(e) => updateVAM('rollbackKillswitch', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Rollback/Killswitch</span>
          </label>
        </div>

        {vamData.toolUse && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Autonomy Threshold (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={vamData.autonomyThreshold}
              onChange={(e) => updateVAM('autonomyThreshold', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integration & Governance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.ssoScim}
              onChange={(e) => updateVAM('ssoScim', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">SSO/SCIM</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.releaseGates}
              onChange={(e) => updateVAM('releaseGates', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Release Gates</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.auditTrails}
              onChange={(e) => updateVAM('auditTrails', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Audit Trails</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vamData.hitlMandatory}
              onChange={(e) => updateVAM('hitlMandatory', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">HITL Mandatory</span>
          </label>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enterprise Systems
          </label>
          <div className="flex flex-wrap gap-2">
            {['SAP', 'Salesforce', 'ServiceNow', 'Guidewire'].map(sys => (
              <button
                key={sys}
                onClick={() => toggleArrayValue('systems', sys)}
                className={`px-3 py-1 rounded-full text-sm ${
                  (vamData.systems || []).includes(sys)
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {sys}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Regulatory Scope
          </label>
          <div className="flex flex-wrap gap-2">
            {['HIPAA', 'SOX', 'GDPR', 'GxP', 'AML'].map(reg => (
              <button
                key={reg}
                onClick={() => toggleArrayValue('regulatorScope', reg)}
                className={`px-3 py-1 rounded-full text-sm ${
                  (vamData.regulatorScope || []).includes(reg)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => classifyApplication()}
          disabled={!vamData.name}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Brain className="w-5 h-5" />
          <span>Classify Application</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderClassifying = () => (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analyzing Application</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Running ADM classifier algorithm...</p>
      </div>
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>Analyzing capabilities & features</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>Evaluating tech stack signals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <span>Computing archetype scores...</span>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!classification) return null;

    const riskColors: Record<string, string> = {
      'LOW': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'MODERATE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'HIGH': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'CRITICAL': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {classification.primaryArchetype.code}: {classification.primaryArchetype.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Primary classification with {(classification.primaryArchetype.probability * 100).toFixed(1)}% confidence
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[classification.riskTier]}`}>
                  {classification.riskTier} Risk
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {(classification.confidence * 100).toFixed(0)}% Confidence
                </span>
              </div>
            </div>
            <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {classification.modifiers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Modifiers</h4>
            <div className="flex flex-wrap gap-2">
              {classification.modifiers.map(mod => (
                <span key={mod} className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400 rounded-full text-sm font-medium">
                  {mod}
                </span>
              ))}
            </div>
          </div>
        )}

        {classification.archetypes.length > 1 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Archetype Mixture</h4>
            <div className="space-y-4">
              {classification.archetypes.map(arch => (
                <div key={arch.code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {arch.code}: {arch.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {(arch.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${arch.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>RMF Profile & TEVV Linkage</span>
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Select Controls</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {classification.rmfProfile.selectControls.map((control, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-medium">
                      {control}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Assess Packs</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {classification.rmfProfile.assessPacks.map((pack, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">
                      {pack}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Authorize Thresholds</span>
                </h5>
                <div className="space-y-1">
                  {classification.rmfProfile.authorizeThresholds.map((threshold, idx) => (
                    <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {threshold}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>Monitoring</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {classification.rmfProfile.monitoring.map((mon, idx) => (
                    <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded text-xs font-medium">
                      {mon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Decision Trace</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {classification.decisionTrace.map((trace, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-sm">
                <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{trace}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Classification Summary</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Dominant:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{classification.dominant}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{classification.riskScore}/12</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{(classification.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setStep('input');
              setClassification(null);
            }}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Classify Another
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Generate TEVV Pack</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Archetype Classifier</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                NIST RMF Step 1: Categorize - Auto-classify GenAI applications into archetypes
              </p>
            </div>
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="p-6">
          {step === 'input' && renderInputForm()}
          {step === 'classify' && renderClassifying()}
          {step === 'results' && renderResults()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Archetype Reference Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {archetypeDefinitions.map((arch) => (
            <div key={arch.code} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{arch.code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{arch.shortName}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{arch.description}</p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">{arch.archetypeCode}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeClassifier;
