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
  Download
} from 'lucide-react';

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
  idePlugins: boolean;
  repoConnectors: string[];
  nlqToSql: boolean;
  biConnectors: string[];
  vlm: boolean;
  asr: boolean;
  tts: boolean;
  modelProvider: string;
  fineTuned: boolean;
  adapters: string[];
  toolUse: boolean;
  planner: string;
  autonomyThreshold: number;
  humanApprovalSteps: string;
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

interface ClassificationResult {
  primaryArchetype: ArchetypeScore;
  archetypes: ArchetypeScore[];
  modifiers: string[];
  riskTier: string;
  confidence: number;
  decisionTrace: string[];
  mixture: Record<string, number>;
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
    idePlugins: false,
    repoConnectors: [],
    nlqToSql: false,
    biConnectors: [],
    vlm: false,
    asr: false,
    tts: false,
    modelProvider: 'openai',
    fineTuned: false,
    adapters: [],
    toolUse: false,
    planner: 'none',
    autonomyThreshold: 0,
    humanApprovalSteps: 'high',
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
    { code: 'A1', name: 'Assistive Text Generation', description: 'Single-turn text completion, no memory or retrieval' },
    { code: 'A2', name: 'Conversational Assistant', description: 'Multi-turn dialog with memory, no retrieval' },
    { code: 'A3', name: 'RAG Knowledge Assistant', description: 'Retrieval-augmented generation with citations' },
    { code: 'A4', name: 'Structured Generation', description: 'JSON/table output with schema validation' },
    { code: 'A5', name: 'Code Generation', description: 'Code/test generation with security scanning' },
    { code: 'A6', name: 'Generative Analytics', description: 'Natural language to SQL/DSL' },
    { code: 'A7', name: 'Multimodal AI', description: 'Vision/speech + text processing' },
    { code: 'A8', name: 'Fine-Tuned Domain Expert', description: 'Domain-specific fine-tuned models' },
    { code: 'A9', name: 'Tool-Using Agent', description: 'LLM with tool/API calling capabilities' },
    { code: 'A10', name: 'Autonomous Workflow Agent', description: 'Multi-step autonomous execution' },
    { code: 'A11', name: 'Enterprise-Integrated GenAI', description: 'Embedded in mission-critical systems' },
    { code: 'A12', name: 'Safety-Critical HITL', description: 'Regulated decision support with mandatory human oversight' }
  ];

  const classifyApplication = () => {
    setIsClassifying(true);
    setStep('classify');

    setTimeout(() => {
      const scores: Record<string, number> = {};
      const signals: Record<string, string[]> = {};

      Object.keys(archetypeDefinitions).forEach(key => {
        scores[archetypeDefinitions[parseInt(key)].code] = 0;
        signals[archetypeDefinitions[parseInt(key)].code] = [];
      });

      if (vamData.interactionPattern === 'single_turn' && !vamData.retrievalEnabled) {
        scores['A1'] += 5;
        signals['A1'].push('single_turn (+5)');
        signals['A1'].push('retrieval disabled (+3)');
        scores['A1'] += 3;
      }

      if (vamData.interactionPattern === 'multi_turn' && !vamData.retrievalEnabled) {
        scores['A2'] += 5;
        signals['A2'].push('multi_turn (+5)');
      }

      if (vamData.retrievalEnabled) {
        scores['A3'] += 5;
        signals['A3'].push('retrieval enabled (+5)');
        if (vamData.citationsEnabled) {
          scores['A3'] += 3;
          signals['A3'].push('citations enabled (+3)');
        }
        if (vamData.vectorDb !== 'none') {
          scores['A3'] += 3;
          signals['A3'].push(`vector DB: ${vamData.vectorDb} (+3)`);
        }
      }

      if (vamData.structuredOutput !== 'none') {
        scores['A4'] += 5;
        signals['A4'].push(`structured output: ${vamData.structuredOutput} (+5)`);
      }

      if (vamData.idePlugins || (vamData.repoConnectors && vamData.repoConnectors.length > 0)) {
        scores['A5'] += 5;
        signals['A5'].push('code generation tools (+5)');
      }

      if (vamData.nlqToSql) {
        scores['A6'] += 5;
        signals['A6'].push('NL to SQL (+5)');
      }

      if (vamData.vlm || vamData.asr || vamData.tts) {
        scores['A7'] += 5;
        signals['A7'].push('multimodal capabilities (+5)');
      }

      if (vamData.fineTuned && ['healthcare', 'finance', 'legal', 'insurance'].includes(vamData.domain || '')) {
        scores['A8'] += 5;
        signals['A8'].push('fine-tuned domain model (+5)');
      }

      if (vamData.toolUse) {
        scores['A9'] += 5;
        signals['A9'].push('tool use enabled (+5)');
        if (vamData.planner !== 'none') {
          scores['A9'] += 3;
          signals['A9'].push(`planner: ${vamData.planner} (+3)`);
        }
      }

      if ((vamData.autonomyThreshold || 0) > 0) {
        scores['A10'] += 5;
        signals['A10'].push(`autonomy threshold: ${vamData.autonomyThreshold}% (+5)`);
      }

      if (vamData.systems && vamData.systems.length > 0) {
        scores['A11'] += 5;
        signals['A11'].push(`enterprise systems: ${vamData.systems.join(', ')} (+5)`);
        if (vamData.releaseGates) {
          scores['A11'] += 3;
          signals['A11'].push('release gates (+3)');
        }
      }

      if (vamData.hitlMandatory || (vamData.regulatorScope && vamData.regulatorScope.length > 0)) {
        scores['A12'] += 5;
        signals['A12'].push('safety-critical/regulated (+5)');
      }

      const total = Object.values(scores).reduce((a, b) => Math.max(a, 0) + Math.max(b, 0), 0);
      const probs: Record<string, number> = {};

      Object.keys(scores).forEach(key => {
        probs[key] = total > 0 ? Math.max(scores[key], 0) / total : 0;
      });

      const sortedArchetypes = Object.entries(probs)
        .sort(([, a], [, b]) => b - a)
        .filter(([, prob]) => prob >= 0.15)
        .map(([code, prob]) => ({
          code,
          name: archetypeDefinitions.find(a => a.code === code)?.name || code,
          probability: prob,
          signals: signals[code]
        }));

      const modifiers: string[] = [];
      if (vamData.retrievalEnabled) modifiers.push('RAG');
      if (vamData.fineTuned) modifiers.push('FT');
      if (vamData.vlm || vamData.asr || vamData.tts) modifiers.push('MM');
      if (vamData.toolUse) modifiers.push('AG');
      if ((vamData.autonomyThreshold || 0) > 0) modifiers.push('AUTO');
      if (vamData.dataSensitivity && vamData.dataSensitivity.length > 0) {
        vamData.dataSensitivity.forEach(s => modifiers.push(s.toUpperCase()));
      }
      if (vamData.systems && vamData.systems.length > 0) modifiers.push('ENT');
      if (vamData.regulatorScope && vamData.regulatorScope.length > 0) modifiers.push('REG');

      let riskScore = 0;
      const impactScores: Record<string, number> = {
        'internal': 1,
        'customer_facing': 2,
        'mission_critical': 3,
        'safety_critical': 4
      };
      riskScore += impactScores[vamData.impactContext || 'internal'] || 1;

      if (vamData.dataSensitivity && vamData.dataSensitivity.includes('none')) riskScore += 0;
      else if (vamData.dataSensitivity && vamData.dataSensitivity.includes('pii')) riskScore += 1;
      else if (vamData.dataSensitivity && (vamData.dataSensitivity.includes('phi') || vamData.dataSensitivity.includes('pci'))) riskScore += 2;

      const autoThreshold = vamData.autonomyThreshold || 0;
      if (autoThreshold === 0) riskScore += 0;
      else if (autoThreshold <= 30) riskScore += 1;
      else if (autoThreshold <= 70) riskScore += 2;
      else riskScore += 3;

      if (vamData.regulatorScope && vamData.regulatorScope.length > 0) {
        riskScore += vamData.regulatorScope.length > 1 ? 3 : 2;
      }

      if (vamData.systems && vamData.systems.length > 0) riskScore += 1;

      let riskTier = 'LOW';
      if (riskScore >= 9) riskTier = 'CRITICAL';
      else if (riskScore >= 6) riskTier = 'HIGH';
      else if (riskScore >= 3) riskTier = 'MODERATE';

      const confidence = sortedArchetypes.length > 0
        ? sortedArchetypes[0].probability - (sortedArchetypes[1]?.probability || 0)
        : 0;

      const decisionTrace: string[] = [];
      sortedArchetypes.forEach(arch => {
        arch.signals.forEach(signal => {
          decisionTrace.push(`${arch.code}: ${signal}`);
        });
      });

      const result: ClassificationResult = {
        primaryArchetype: sortedArchetypes[0],
        archetypes: sortedArchetypes.slice(0, 3),
        modifiers,
        riskTier,
        confidence: Math.min(confidence, 1),
        decisionTrace,
        mixture: Object.fromEntries(sortedArchetypes.map(a => [a.code, a.probability]))
      };

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
                    ? 'bg-purple-600 text-white'
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
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
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
                <span key={mod} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full text-sm font-medium">
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

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Next Steps</h4>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Generate TEVV pack for {classification.primaryArchetype.code}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Apply {classification.riskTier} risk tier thresholds</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Configure controls and evidence capture</span>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {archetypeDefinitions.slice(0, 3).map((arch) => (
          <div key={arch.code} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{arch.code}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{arch.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{arch.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchetypeClassifier;
