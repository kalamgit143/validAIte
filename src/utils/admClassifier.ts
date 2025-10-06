// ADM v1.0 - Archetype Determination Matrix Classifier
// Implements weighted signal detection, risk scoring, and RMF profile generation

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

const archetypeNames: Record<string, string> = {
  A1: 'Assistive Text Generation (Single-Turn)',
  A2: 'Conversational Assistant (Multi-Turn Dialog)',
  A3: 'RAG Knowledge Assistant / Policy Explainer',
  A4: 'Structured Generation & Document Automation',
  A5: 'Code Generation & DevOps Assistant',
  A6: 'Generative Analytics & Data Reasoning',
  A7: 'Multimodal Perception–Generation (Vision/Speech)',
  A8: 'Fine-Tuned Domain Expert (Regulation-Aware)',
  A9: 'Tool-Using Agent (Orchestrated Actions)',
  A10: 'Autonomous Workflow Agent (Limited Autonomy)',
  A11: 'Enterprise-Integrated GenAI (Mission-Critical)',
  A12: 'Safety-Critical / Regulated Decision Support (HITL-Mandatory)',
};

export function classifyApplication(vam: Partial<VAMData>): ClassificationResult {
  const scores: Record<string, number> = {};
  const signals: Record<string, string[]> = {};
  const decisionTrace: string[] = [];

  // Initialize all archetypes
  Object.keys(archetypeNames).forEach((code) => {
    scores[code] = 0;
    signals[code] = [];
  });

  // A1: Assistive Text Generation (Single-Turn)
  // Signals: single_turn (+5), retrieval disabled (+3), structured_output=none (+1), tool_use=false (+3)
  if (vam.interactionPattern === 'single_turn') {
    scores.A1 += 5;
    signals.A1.push('single_turn (+5)');
    decisionTrace.push('A1: single_turn (+5)');
  }
  if (!vam.retrievalEnabled) {
    scores.A1 += 3;
    signals.A1.push('retrieval disabled (+3)');
    decisionTrace.push('A1: retrieval disabled (+3)');
  }
  if (vam.structuredOutput === 'none') {
    scores.A1 += 1;
    signals.A1.push('structured_output=none (+1)');
  }
  if (!vam.toolUse) {
    scores.A1 += 3;
    signals.A1.push('tool_use=false (+3)');
  }

  // A2: Conversational Assistant
  // Signals: multi_turn (+5), conversation_memory (+3), retrieval disabled (+1), tool_use=false (+1)
  if (vam.interactionPattern === 'multi_turn') {
    scores.A2 += 5;
    signals.A2.push('multi_turn (+5)');
    decisionTrace.push('A2: multi_turn (+5)');
  }
  if (vam.conversationMemory) {
    scores.A2 += 3;
    signals.A2.push('conversation_memory=true (+3)');
    decisionTrace.push('A2: conversation_memory=true (+3)');
  }
  if (!vam.retrievalEnabled) {
    scores.A2 += 1;
    signals.A2.push('retrieval disabled (+1)');
  }
  if (!vam.toolUse) {
    scores.A2 += 1;
    signals.A2.push('tool_use=false (+1)');
  }

  // A3: RAG Knowledge Assistant
  // Signals: retrieval enabled (+5), citations (+3), vector_db!=none (+3), freshness_policy!=none (+1)
  if (vam.retrievalEnabled) {
    scores.A3 += 5;
    signals.A3.push('retrieval.enabled=true (+5)');
    decisionTrace.push('A3: retrieval.enabled=true (+5)');
  }
  if (vam.citationsEnabled) {
    scores.A3 += 3;
    signals.A3.push('citations=true (+3)');
    decisionTrace.push('A3: citations=true (+3)');
  }
  if (vam.vectorDb && vam.vectorDb !== 'none') {
    scores.A3 += 3;
    signals.A3.push(`vector_db=${vam.vectorDb} (+3)`);
    decisionTrace.push(`A3: vector_db=${vam.vectorDb} (+3)`);
  }
  if (vam.freshnessPolicy && vam.freshnessPolicy !== 'none') {
    scores.A3 += 1;
    signals.A3.push(`freshness_policy=${vam.freshnessPolicy} (+1)`);
  }

  // A4: Structured Generation & Document Automation
  // Signals: structured_output in {json,table} (+5), schema_refs!=[] (+3), validation present (+1)
  if (vam.structuredOutput && ['json', 'xml', 'table'].includes(vam.structuredOutput)) {
    scores.A4 += 5;
    signals.A4.push(`structured_output=${vam.structuredOutput} (+5)`);
    decisionTrace.push(`A4: structured_output=${vam.structuredOutput} (+5)`);
  }
  if (vam.schemaRefs && vam.schemaRefs.length > 0) {
    scores.A4 += 3;
    signals.A4.push(`schema_refs count=${vam.schemaRefs.length} (+3)`);
    decisionTrace.push(`A4: schema_refs count=${vam.schemaRefs.length} (+3)`);
  }

  // A5: Code Generation & DevOps
  // Signals: ide_plugins (+5), repo_connectors!=[] (+5), static analyzer (+3)
  if (vam.idePlugins) {
    scores.A5 += 5;
    signals.A5.push('ide_plugins=true (+5)');
    decisionTrace.push('A5: ide_plugins=true (+5)');
  }
  if (vam.repoConnectors && vam.repoConnectors.length > 0) {
    scores.A5 += 5;
    signals.A5.push(`repo_connectors=${vam.repoConnectors.join(',')} (+5)`);
    decisionTrace.push(`A5: repo_connectors=${vam.repoConnectors.join(',')} (+5)`);
  }
  if (vam.staticAnalyzer) {
    scores.A5 += 3;
    signals.A5.push('static_analyzer=true (+3)');
    decisionTrace.push('A5: static_analyzer=true (+3)');
  }

  // A6: Generative Analytics (NL→SQL)
  // Signals: nlq_to_sql (+5), bi_connectors!=[] (+3), query_validation (+3)
  if (vam.nlqToSql) {
    scores.A6 += 5;
    signals.A6.push('nlq_to_sql=true (+5)');
    decisionTrace.push('A6: nlq_to_sql=true (+5)');
  }
  if (vam.biConnectors && vam.biConnectors.length > 0) {
    scores.A6 += 3;
    signals.A6.push(`bi_connectors=${vam.biConnectors.join(',')} (+3)`);
    decisionTrace.push(`A6: bi_connectors=${vam.biConnectors.join(',')} (+3)`);
  }
  if (vam.queryValidation) {
    scores.A6 += 3;
    signals.A6.push('query_validation=true (+3)');
    decisionTrace.push('A6: query_validation=true (+3)');
  }

  // A7: Multimodal (Vision/Speech)
  // Signals: modalities includes vision|speech (+5), vlm|asr|tts (+3), media_redaction (+1)
  if (
    vam.modalities &&
    (vam.modalities.includes('vision') || vam.modalities.includes('speech'))
  ) {
    scores.A7 += 5;
    signals.A7.push('modalities includes vision|speech (+5)');
    decisionTrace.push('A7: modalities includes vision|speech (+5)');
  }
  if (vam.vlm || vam.asr || vam.tts) {
    scores.A7 += 3;
    const mmFeatures = [
      vam.vlm && 'vlm',
      vam.asr && 'asr',
      vam.tts && 'tts',
    ]
      .filter(Boolean)
      .join(',');
    signals.A7.push(`${mmFeatures}=true (+3)`);
    decisionTrace.push(`A7: ${mmFeatures}=true (+3)`);
  }
  if (vam.mediaRedaction) {
    scores.A7 += 1;
    signals.A7.push('media_redaction=true (+1)');
  }

  // A8: Fine-Tuned Domain Expert
  // Signals: fine_tuned (+5), domain in {healthcare,finance,legal,insurance} (+3), adapters/checkpoints (+1)
  if (vam.fineTuned) {
    scores.A8 += 5;
    signals.A8.push('fine_tuned=true (+5)');
    decisionTrace.push('A8: fine_tuned=true (+5)');
  }
  if (
    vam.domain &&
    ['healthcare', 'finance', 'legal', 'insurance'].includes(vam.domain)
  ) {
    scores.A8 += 3;
    signals.A8.push(`domain=${vam.domain} (+3)`);
    decisionTrace.push(`A8: domain=${vam.domain} (+3)`);
  }
  if (
    (vam.adapters && vam.adapters.length > 0) ||
    (vam.checkpoints && vam.checkpoints.length > 0)
  ) {
    scores.A8 += 1;
    signals.A8.push('adapters/checkpoints present (+1)');
  }

  // A9: Tool-Using Agent
  // Signals: tool_use (+5), planner!=none (+3), cost_quota_controls (+1), policy_engine (+1)
  if (vam.toolUse) {
    scores.A9 += 5;
    signals.A9.push('tool_use=true (+5)');
    decisionTrace.push('A9: tool_use=true (+5)');
  }
  if (vam.planner && vam.planner !== 'none') {
    scores.A9 += 3;
    signals.A9.push(`planner=${vam.planner} (+3)`);
    decisionTrace.push(`A9: planner=${vam.planner} (+3)`);
  }
  if (vam.costQuotaControls) {
    scores.A9 += 1;
    signals.A9.push('cost_quota_controls=true (+1)');
  }
  if (vam.policyEngine) {
    scores.A9 += 1;
    signals.A9.push('policy_engine=true (+1)');
  }

  // A10: Autonomous Workflow Agent
  // Signals: autonomy_threshold>0 (+5), human_approval_steps low|none (+3), rollback/killswitch (+1)
  if (vam.autonomyThreshold && vam.autonomyThreshold > 0) {
    scores.A10 += 5;
    signals.A10.push(`autonomy_threshold=${vam.autonomyThreshold}% (+5)`);
    decisionTrace.push(`A10: autonomy_threshold=${vam.autonomyThreshold}% (+5)`);
  }
  if (
    vam.humanApprovalSteps &&
    ['low', 'none'].includes(vam.humanApprovalSteps)
  ) {
    scores.A10 += 3;
    signals.A10.push(`human_approval_steps=${vam.humanApprovalSteps} (+3)`);
    decisionTrace.push(`A10: human_approval_steps=${vam.humanApprovalSteps} (+3)`);
  }
  if (vam.rollbackKillswitch) {
    scores.A10 += 1;
    signals.A10.push('rollback_killswitch=true (+1)');
  }

  // A11: Enterprise-Integrated GenAI
  // Signals: systems contains enterprise systems (+5), release_gates (+3), audit_trails (+3), sso_scim (+1)
  if (vam.systems && vam.systems.length > 0) {
    scores.A11 += 5;
    signals.A11.push(`systems=${vam.systems.join(',')} (+5)`);
    decisionTrace.push(`A11: systems=${vam.systems.join(',')} (+5)`);
  }
  if (vam.releaseGates) {
    scores.A11 += 3;
    signals.A11.push('release_gates=true (+3)');
    decisionTrace.push('A11: release_gates=true (+3)');
  }
  if (vam.auditTrails) {
    scores.A11 += 3;
    signals.A11.push('audit_trails=true (+3)');
    decisionTrace.push('A11: audit_trails=true (+3)');
  }
  if (vam.ssoScim) {
    scores.A11 += 1;
    signals.A11.push('sso_scim=true (+1)');
  }

  // A12: Safety-Critical / Regulated Decision Support
  // Signals: impact_context=safety_critical (+5) OR regulator_scope!=none (+5), hitl_mandatory (+5), evidence=regulator_ready (+3)
  if (vam.impactContext === 'safety_critical') {
    scores.A12 += 5;
    signals.A12.push('impact_context=safety_critical (+5)');
    decisionTrace.push('A12: impact_context=safety_critical (+5)');
  }
  if (vam.regulatorScope && vam.regulatorScope.length > 0) {
    scores.A12 += 5;
    signals.A12.push(`regulator_scope=${vam.regulatorScope.join(',')} (+5)`);
    decisionTrace.push(`A12: regulator_scope=${vam.regulatorScope.join(',')} (+5)`);
  }
  if (vam.hitlMandatory) {
    scores.A12 += 5;
    signals.A12.push('hitl_mandatory=true (+5)');
    decisionTrace.push('A12: hitl_mandatory=true (+5)');
  }
  if (vam.evidenceRequired === 'regulator_ready') {
    scores.A12 += 3;
    signals.A12.push('evidence_required=regulator_ready (+3)');
    decisionTrace.push('A12: evidence_required=regulator_ready (+3)');
  }

  // Normalize scores to probabilities (0..1)
  const total = Object.values(scores).reduce((sum, s) => sum + Math.max(s, 0), 0);
  const probs: Record<string, number> = {};

  Object.keys(scores).forEach((code) => {
    probs[code] = total > 0 ? Math.max(scores[code], 0) / total : 0;
  });

  // Sort by probability and filter >= 0.15 threshold
  const sortedArchetypes = Object.entries(probs)
    .sort(([, a], [, b]) => b - a)
    .filter(([, prob]) => prob >= 0.15)
    .map(([code, prob]) => ({
      code,
      name: archetypeNames[code] || code,
      probability: prob,
      signals: signals[code],
    }));

  // Determine dominant archetype
  const primaryArchetype = sortedArchetypes[0];
  const secondBest = sortedArchetypes[1];
  const dominant =
    primaryArchetype && secondBest && primaryArchetype.probability - secondBest.probability >= 0.1
      ? primaryArchetype.code
      : 'composite';

  // Conflict resolution
  let resolvedPrimary = primaryArchetype;
  if (sortedArchetypes.length >= 2) {
    const top2Codes = sortedArchetypes.slice(0, 2).map((a) => a.code);

    // A3 and A11 both high → A11 primary (enterprise-embedded), preserve RAG in modifiers
    if (top2Codes.includes('A3') && top2Codes.includes('A11')) {
      resolvedPrimary = sortedArchetypes.find((a) => a.code === 'A11') || primaryArchetype;
    }

    // A9 and A10 both high → use autonomy_threshold to choose
    if (top2Codes.includes('A9') && top2Codes.includes('A10')) {
      resolvedPrimary =
        (vam.autonomyThreshold || 0) > 0
          ? sortedArchetypes.find((a) => a.code === 'A10') || primaryArchetype
          : sortedArchetypes.find((a) => a.code === 'A9') || primaryArchetype;
    }

    // A8 and A12 both high → A12 primary, keep FT and REG
    if (top2Codes.includes('A8') && top2Codes.includes('A12')) {
      resolvedPrimary = sortedArchetypes.find((a) => a.code === 'A12') || primaryArchetype;
    }
  }

  // Detect modifiers
  const modifiers: string[] = [];
  if (vam.retrievalEnabled) modifiers.push('RAG');
  if (vam.fineTuned) modifiers.push('FT');
  if (vam.vlm || vam.asr || vam.tts) modifiers.push('MM');
  if (vam.toolUse || (vam.planner && vam.planner !== 'none')) modifiers.push('AG');
  if ((vam.autonomyThreshold || 0) > 0) modifiers.push('AUTO');
  if (vam.dataSensitivity && vam.dataSensitivity.length > 0) {
    vam.dataSensitivity.forEach((s) => modifiers.push(s.toUpperCase()));
  }
  if (scores.A11 >= 6) modifiers.push('ENT');
  if ((vam.regulatorScope && vam.regulatorScope.length > 0) || vam.hitlMandatory) {
    modifiers.push('REG');
  }

  // Calculate risk tier
  const riskScore = calculateRiskScore(vam);
  const riskTier = getRiskTier(riskScore);

  // Calculate confidence
  const probValues = Object.values(probs);
  const maxProb = Math.max(...probValues);
  const stdDev = calculateStdDev(probValues);
  const confidence = Math.max(0, Math.min(1, maxProb - stdDev));

  // Generate RMF profile
  const rmfProfile = generateRMFProfile(sortedArchetypes, riskTier, modifiers);

  // Build mixture
  const mixture: Record<string, number> = {};
  sortedArchetypes.forEach((a) => {
    mixture[a.code] = a.probability;
  });

  return {
    primaryArchetype: resolvedPrimary,
    archetypes: sortedArchetypes.slice(0, 3),
    dominant,
    modifiers,
    riskTier,
    riskScore,
    confidence,
    decisionTrace,
    mixture,
    rmfProfile,
  };
}

function calculateRiskScore(vam: Partial<VAMData>): number {
  let riskScore = 0;

  // Impact context base score
  const impactScores: Record<string, number> = {
    internal: 1,
    customer_facing: 2,
    mission_critical: 3,
    safety_critical: 4,
  };
  riskScore += impactScores[vam.impactContext || 'internal'] || 1;

  // Data sensitivity weight
  if (vam.dataSensitivity && vam.dataSensitivity.length > 0) {
    if (vam.dataSensitivity.includes('none')) {
      riskScore += 0;
    } else if (vam.dataSensitivity.includes('pii')) {
      riskScore += 1;
    } else if (
      vam.dataSensitivity.includes('phi') ||
      vam.dataSensitivity.includes('pci')
    ) {
      riskScore += 2;
    }
  }

  // Autonomy weight
  const autonomyThreshold = vam.autonomyThreshold || 0;
  if (autonomyThreshold === 0) {
    riskScore += 0;
  } else if (autonomyThreshold <= 30) {
    riskScore += 1;
  } else if (autonomyThreshold <= 70) {
    riskScore += 2;
  } else {
    riskScore += 3;
  }

  // Regulator weight
  if (vam.regulatorScope && vam.regulatorScope.length > 0) {
    riskScore += vam.regulatorScope.length > 1 ? 3 : 2;
  }

  // Integration weight
  if (vam.systems && vam.systems.length > 0) {
    riskScore += 1;
  }

  return riskScore;
}

function getRiskTier(riskScore: number): string {
  if (riskScore >= 9) return 'CRITICAL';
  if (riskScore >= 6) return 'HIGH';
  if (riskScore >= 3) return 'MODERATE';
  return 'LOW';
}

function calculateStdDev(values: number[]): number {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function generateRMFProfile(
  archetypes: ArchetypeScore[],
  riskTier: string,
  modifiers: string[]
): RMFProfile {
  const controls: string[] = [];
  const assessPacks: string[] = [];
  const thresholds: string[] = [];
  const monitoring: string[] = [];

  archetypes.forEach((arch) => {
    switch (arch.code) {
      case 'A3': // RAG
        controls.push('Groundedness-CTRL', 'RetrievalFreshness-CTRL');
        assessPacks.push('A3-Groundedness', 'A3-Retrieval-Quality');
        thresholds.push('groundedness>=0.85', 'citation-accuracy>=0.9');
        monitoring.push('retrieval-drift');
        break;
      case 'A4': // Structured Generation
        controls.push('Schema-Validation-CTRL', 'Data-Minimization-CTRL');
        assessPacks.push('A4-Schema-Compliance', 'A4-Field-Provenance');
        thresholds.push('schema-conformance>=0.95');
        monitoring.push('schema-drift');
        break;
      case 'A5': // Code Generation
        controls.push('SAST-CTRL', 'License-CTRL', 'Test-Quality-CTRL');
        assessPacks.push('A5-Security-Scan', 'A5-License-Check');
        thresholds.push('vulnerability-count=0', 'test-pass-rate>=0.9');
        monitoring.push('security-alerts');
        break;
      case 'A6': // Analytics
        controls.push('Query-Validation-CTRL', 'RLS-CLS-CTRL');
        assessPacks.push('A6-Query-Correctness', 'A6-Privacy-Joins');
        thresholds.push('query-accuracy>=0.9');
        monitoring.push('query-errors');
        break;
      case 'A7': // Multimodal
        controls.push('Media-Redaction-CTRL', 'Perception-Bias-CTRL');
        assessPacks.push('A7-Modality-Robustness', 'A7-Slice-Fairness');
        thresholds.push('OCR-F1>=0.85', 'WER<=0.15');
        monitoring.push('perception-drift');
        break;
      case 'A8': // Fine-Tuned Domain Expert
        controls.push('Domain-Eval-CTRL', 'Harmful-Advice-CTRL');
        assessPacks.push('A8-Domain-Benchmarks', 'A8-Policy-Conformance');
        thresholds.push('domain-accuracy>=0.9');
        monitoring.push('domain-drift');
        break;
      case 'A9': // Tool-Using Agent
        controls.push('ToolScope-CTRL', 'Injection-Defense-CTRL', 'Cost-Quota-CTRL');
        assessPacks.push('A9-Tool-Use-Safety', 'A9-Policy-Simulation');
        thresholds.push('tool-policy-violations=0');
        monitoring.push('tool-misuse-alerts');
        break;
      case 'A10': // Autonomous Workflow
        controls.push('Autonomy-Threshold-CTRL', 'Rollback-CTRL', 'Killswitch-CTRL');
        assessPacks.push('A10-Autonomy-Drills', 'A10-Rollback-Safety');
        thresholds.push('autonomy-policy-coverage>=0.95');
        monitoring.push('autonomy-watchdog');
        break;
      case 'A11': // Enterprise-Integrated
        controls.push('Change-Gate-CTRL', 'SSO/Audit-CTRL', 'SoD-CTRL');
        assessPacks.push('A11-Change-Gate', 'A11-SoD-Attestation');
        thresholds.push('pre-release-eval-pass=true');
        monitoring.push('incident-desk-integration', 'audit-trail-completeness');
        break;
      case 'A12': // Safety-Critical
        controls.push('HITL-CTRL', 'Explainer-Fidelity-CTRL', 'Fairness-Harm-CTRL');
        assessPacks.push('A12-Decision-Explainability', 'A12-Fairness-Report');
        thresholds.push('HITL-coverage=100%', 'fairness-metrics-pass=true');
        monitoring.push('harm-incident-tracking');
        break;
    }
  });

  return {
    categorize: riskTier,
    selectControls: [...new Set(controls)],
    assessPacks: [...new Set(assessPacks)],
    authorizeThresholds: [...new Set(thresholds)],
    monitoring: [...new Set(monitoring)],
  };
}
