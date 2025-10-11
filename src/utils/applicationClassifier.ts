interface ClassificationInputs {
  domain: string;
  modifiers: string[];
  data_sensitivity: string[];
  autonomy_level: string;
  deployment_environment: string;
  has_rag: boolean;
  has_multimodal: boolean;
  has_agentic: boolean;
}

interface SystemOutputs {
  archetype_code: string;
  risk_tier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  modifiers: string[];
  recommended_risks: string[];
  recommended_metrics: string[];
  governance_controls: string[];
  assurance_playbook: string;
}

const DOMAIN_CODES: Record<string, string> = {
  'insurance': 'A2',
  'banking': 'A3',
  'healthcare': 'A1',
  'retail': 'A4',
  'government': 'A5',
  'education': 'A6',
  'technology': 'A7',
  'manufacturing': 'A8'
};

const RISK_MAPPINGS: Record<string, string[]> = {
  'rag': ['Hallucination', 'KB Drift', 'Grounding Issues', 'Context Window Overflow'],
  'pii': ['Privacy Leakage', 'PII Exposure', 'Data Residency Violation'],
  'phi': ['PHI Leakage', 'HIPAA Violation', 'Patient Data Exposure'],
  'financial': ['Financial Data Leak', 'Transaction Data Exposure', 'SOX Compliance Risk'],
  'agentic': ['Unintended Actions', 'Tool Misuse', 'Autonomous Decision Risk'],
  'multimodal': ['Vision Model Bias', 'Audio Transcription Errors', 'Cross-modal Hallucination'],
  'high_autonomy': ['Autonomous Decision Risk', 'Human Oversight Bypass', 'Action Verification Failure']
};

const METRICS_MAPPINGS: Record<string, string[]> = {
  'rag': ['Faithfulness', 'Grounding Precision', 'Context Relevance', 'Answer Relevance'],
  'privacy': ['Privacy Leakage Rate', 'PII Detection Rate', 'Data Anonymization Score'],
  'toxicity': ['Toxicity Score', 'Bias Detection Rate', 'Fairness Metrics'],
  'agentic': ['Tool Use Accuracy', 'Action Success Rate', 'Human Approval Rate'],
  'general': ['Answer Relevance', 'Coherence', 'Fluency', 'Latency']
};

const CONTROL_MAPPINGS: Record<string, string[]> = {
  'rag': ['KB Freshness Policy', 'Source Citation Requirements', 'Retrieval Quality Checks'],
  'privacy': ['PII Filtering Control', 'Data Anonymization', 'Access Logging'],
  'high_risk': ['Human-in-the-Loop', 'Decision Approval Workflow', 'Rollback Capability'],
  'agentic': ['Tool Use Restrictions', 'Action Whitelist', 'Sandbox Environment']
};

export function classifyApplication(inputs: ClassificationInputs): SystemOutputs {
  const domainCode = DOMAIN_CODES[inputs.domain] || 'A9';

  const modifierCodes: string[] = [];
  if (inputs.has_rag || inputs.modifiers.includes('RAG')) modifierCodes.push('RAG');
  if (inputs.modifiers.includes('Fine-Tuned (FT)')) modifierCodes.push('FT');
  if (inputs.has_agentic || inputs.modifiers.includes('Agentic (AG)')) modifierCodes.push('AG');
  if (inputs.has_multimodal || inputs.modifiers.includes('Multimodal (MM)')) modifierCodes.push('MM');
  if (inputs.modifiers.includes('Enterprise (ENT)')) modifierCodes.push('ENT');

  if (inputs.data_sensitivity.includes('pii')) modifierCodes.push('PII');
  if (inputs.data_sensitivity.includes('phi')) modifierCodes.push('PHI');
  if (inputs.data_sensitivity.includes('financial')) modifierCodes.push('FIN');

  const archetype_code = `${domainCode}${modifierCodes.length > 0 ? '-' + modifierCodes.join('-') : ''}`;

  const risk_tier = calculateRiskTier(inputs);

  const recommended_risks = generateRecommendedRisks(inputs);

  const recommended_metrics = generateRecommendedMetrics(inputs);

  const governance_controls = generateGovernanceControls(inputs, risk_tier);

  const assurance_playbook = `${archetype_code}-${risk_tier}-Playbook-v1`;

  return {
    archetype_code,
    risk_tier,
    modifiers: modifierCodes,
    recommended_risks,
    recommended_metrics,
    governance_controls,
    assurance_playbook
  };
}

function calculateRiskTier(inputs: ClassificationInputs): 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' {
  let riskScore = 0;

  if (inputs.autonomy_level === 'action-taking') riskScore += 3;
  else if (inputs.autonomy_level === 'decisioning') riskScore += 2;
  else riskScore += 1;

  if (inputs.data_sensitivity.includes('phi')) riskScore += 3;
  else if (inputs.data_sensitivity.includes('financial')) riskScore += 2;
  else if (inputs.data_sensitivity.includes('pii')) riskScore += 2;
  else if (inputs.data_sensitivity.includes('confidential')) riskScore += 1;

  if (inputs.deployment_environment === 'production') riskScore += 2;
  else if (inputs.deployment_environment === 'cloud') riskScore += 1;

  if (inputs.has_agentic) riskScore += 2;

  if (riskScore >= 8) return 'CRITICAL';
  if (riskScore >= 6) return 'HIGH';
  if (riskScore >= 3) return 'MODERATE';
  return 'LOW';
}

function generateRecommendedRisks(inputs: ClassificationInputs): string[] {
  const risks = new Set<string>();

  if (inputs.has_rag || inputs.modifiers.includes('RAG')) {
    RISK_MAPPINGS['rag'].forEach(r => risks.add(r));
  }

  if (inputs.data_sensitivity.includes('pii')) {
    RISK_MAPPINGS['pii'].forEach(r => risks.add(r));
  }

  if (inputs.data_sensitivity.includes('phi')) {
    RISK_MAPPINGS['phi'].forEach(r => risks.add(r));
  }

  if (inputs.data_sensitivity.includes('financial')) {
    RISK_MAPPINGS['financial'].forEach(r => risks.add(r));
  }

  if (inputs.has_agentic || inputs.modifiers.includes('Agentic (AG)')) {
    RISK_MAPPINGS['agentic'].forEach(r => risks.add(r));
  }

  if (inputs.has_multimodal || inputs.modifiers.includes('Multimodal (MM)')) {
    RISK_MAPPINGS['multimodal'].forEach(r => risks.add(r));
  }

  if (inputs.autonomy_level === 'action-taking') {
    RISK_MAPPINGS['high_autonomy'].forEach(r => risks.add(r));
  }

  risks.add('Prompt Injection');
  risks.add('Model Toxicity');

  return Array.from(risks);
}

function generateRecommendedMetrics(inputs: ClassificationInputs): string[] {
  const metrics = new Set<string>();

  if (inputs.has_rag || inputs.modifiers.includes('RAG')) {
    METRICS_MAPPINGS['rag'].forEach(m => metrics.add(m));
  }

  if (inputs.data_sensitivity.length > 0 && inputs.data_sensitivity[0] !== 'none') {
    METRICS_MAPPINGS['privacy'].forEach(m => metrics.add(m));
  }

  if (inputs.has_agentic || inputs.modifiers.includes('Agentic (AG)')) {
    METRICS_MAPPINGS['agentic'].forEach(m => metrics.add(m));
  }

  METRICS_MAPPINGS['toxicity'].forEach(m => metrics.add(m));
  METRICS_MAPPINGS['general'].forEach(m => metrics.add(m));

  return Array.from(metrics);
}

function generateGovernanceControls(inputs: ClassificationInputs, riskTier: string): string[] {
  const controls = new Set<string>();

  if (inputs.has_rag || inputs.modifiers.includes('RAG')) {
    CONTROL_MAPPINGS['rag'].forEach(c => controls.add(c));
  }

  if (inputs.data_sensitivity.length > 0 && inputs.data_sensitivity[0] !== 'none') {
    CONTROL_MAPPINGS['privacy'].forEach(c => controls.add(c));
  }

  if (riskTier === 'HIGH' || riskTier === 'CRITICAL') {
    CONTROL_MAPPINGS['high_risk'].forEach(c => controls.add(c));
  }

  if (inputs.has_agentic || inputs.modifiers.includes('Agentic (AG)')) {
    CONTROL_MAPPINGS['agentic'].forEach(c => controls.add(c));
  }

  controls.add('Output Monitoring');
  controls.add('Audit Logging');
  controls.add('Version Control');

  return Array.from(controls);
}
