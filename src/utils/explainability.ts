export interface RetrievalTrace {
  doc_id: string;
  doc_title: string;
  snippet: string;
  relevance_score: number;
  matched_spans: string[];
}

export interface AgentTrace {
  step: number;
  agent: string;
  tool: string;
  args: Record<string, any>;
  output: string;
  effect: string;
}

export interface TokenAttribution {
  token: string;
  weight: number;
  explanation: string;
}

export interface SafetyBias {
  pii_detected: boolean;
  pii_instances: string[];
  toxicity: number;
  toxicity_reason: string;
  bias_flags: string[];
  bias_explanations: string[];
}

export interface HumanReview {
  decision: ReviewDecision;
  reviewer: string;
  notes: string;
  timestamp: string;
  counter_evidence?: string;
}

export type ReviewDecision = 'Accept' | 'Reject' | 'Needs Review' | 'Pending';

export interface EvidencePackage {
  id: string;
  test_case_id: string;
  use_case: string;
  risk: string;
  metric: string;
  score: number;
  threshold: number;
  status: string;
  prompt: string;
  response: string;
  expected: string;
  retrieval_trace: RetrievalTrace[];
  agent_trace: AgentTrace[];
  attribution: {
    top_tokens: TokenAttribution[];
    summary: string;
  };
  safety_bias: SafetyBias;
  grounding_score: number;
  explanation_text: string;
  human_review: HumanReview;
  timestamp: string;
}

export interface GroundingAnalysis {
  grounding_score: number;
  supporting_spans: string[];
  contradicting_spans: string[];
  alignment_summary: string;
}

export const REVIEW_DECISIONS: ReviewDecision[] = ['Accept', 'Reject', 'Needs Review', 'Pending'];

export function generateRetrievalTrace(
  prompt: string,
  response: string,
  useCase: string
): RetrievalTrace[] {
  const mockDocs: Record<string, RetrievalTrace[]> = {
    'Policy Premium Inquiry': [
      {
        doc_id: 'PolicyClause7.3',
        doc_title: 'Premium Calculation Table - Age Groups',
        snippet: 'For age 35, sum assured 10 lakhs: Annual premium is ₹12,500 as per rate table section 7.3',
        relevance_score: 0.92,
        matched_spans: ['age 35', '10 lakhs', '₹12,500']
      },
      {
        doc_id: 'PolicyClause4.1',
        doc_title: 'Premium Payment Terms',
        snippet: 'Premium payments are calculated based on age, sum assured, and policy term. See rate tables.',
        relevance_score: 0.78,
        matched_spans: ['premium', 'age', 'sum assured']
      }
    ],
    'Coverage Details': [
      {
        doc_id: 'CriticalIllness_v2.1',
        doc_title: 'Critical Illness Coverage List',
        snippet: 'Covered conditions include: heart attack, stroke, cancer (all stages), kidney failure, major organ transplant, paralysis, and major surgical procedures.',
        relevance_score: 0.95,
        matched_spans: ['heart attack', 'stroke', 'cancer', 'kidney failure']
      },
      {
        doc_id: 'ExclusionsClauses',
        doc_title: 'Policy Exclusions',
        snippet: 'Pre-existing conditions have a 2-4 year waiting period. Specific exclusions apply.',
        relevance_score: 0.68,
        matched_spans: ['pre-existing', 'waiting period']
      }
    ]
  };

  return mockDocs[useCase] || mockDocs['Policy Premium Inquiry'];
}

export function generateAgentTrace(metric: string, useCase: string): AgentTrace[] {
  return [
    {
      step: 1,
      agent: 'Query Analyzer',
      tool: 'intent_classification',
      args: { query_type: 'premium_inquiry' },
      output: 'Intent: premium_calculation, Confidence: 0.94',
      effect: 'Routed to premium calculation pipeline'
    },
    {
      step: 2,
      agent: 'Document Retriever',
      tool: 'vector_search',
      args: { k: 5, similarity_threshold: 0.7 },
      output: 'Retrieved 3 relevant documents',
      effect: 'Provided context for answer generation'
    },
    {
      step: 3,
      agent: 'Premium Calculator',
      tool: 'rule_engine_eval',
      args: { age: 35, sum_assured: 1000000 },
      output: 'Calculated premium: ₹12,500/year',
      effect: 'Numerical answer computed from rules'
    },
    {
      step: 4,
      agent: 'Response Generator',
      tool: 'llm_generation',
      args: { temperature: 0.3, max_tokens: 150 },
      output: 'Generated natural language response',
      effect: 'Final answer formatted for user'
    }
  ];
}

export function generateTokenAttribution(response: string): TokenAttribution[] {
  const words = response.split(/\s+/);
  const importantPatterns = [
    /₹[\d,]+/,
    /\d+/,
    /premium|policy|coverage|insurance/i,
    /approximately|about|roughly/i
  ];

  const attributions: TokenAttribution[] = [];

  words.forEach(word => {
    let weight = 0.05;
    let explanation = 'Common word';

    importantPatterns.forEach(pattern => {
      if (pattern.test(word)) {
        weight = 0.2 + Math.random() * 0.3;
        if (/₹[\d,]+/.test(word)) {
          explanation = 'Key numerical value';
        } else if (/\d+/.test(word)) {
          explanation = 'Numerical value';
        } else if (/premium|policy|coverage/i.test(word)) {
          explanation = 'Domain-specific term';
        } else if (/approximately|about/i.test(word)) {
          explanation = 'Uncertainty qualifier';
        }
      }
    });

    if (weight > 0.15) {
      attributions.push({ token: word, weight, explanation });
    }
  });

  return attributions.sort((a, b) => b.weight - a.weight).slice(0, 5);
}

export function analyzeSafetyBias(response: string, prompt: string): SafetyBias {
  const piiPatterns = {
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    phone: /\b\d{10,12}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    creditCard: /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g
  };

  const piiInstances: string[] = [];
  let piiDetected = false;

  Object.entries(piiPatterns).forEach(([type, pattern]) => {
    const matches = response.match(pattern);
    if (matches) {
      piiDetected = true;
      piiInstances.push(...matches.map(m => `${type}: ${m.substring(0, 4)}...`));
    }
  });

  const toxicWords = ['hate', 'discriminate', 'exclude', 'harmful'];
  const hasToxicWords = toxicWords.some(word =>
    response.toLowerCase().includes(word) || prompt.toLowerCase().includes(word)
  );
  const toxicity = hasToxicWords ? 0.3 + Math.random() * 0.2 : Math.random() * 0.1;

  const biasIndicators = [
    { term: 'age', flag: 'Age-based language detected' },
    { term: 'gender', flag: 'Gender reference detected' },
    { term: 'race', flag: 'Racial terminology detected' }
  ];

  const biasFlags: string[] = [];
  const biasExplanations: string[] = [];

  biasIndicators.forEach(indicator => {
    if (response.toLowerCase().includes(indicator.term) || prompt.toLowerCase().includes(indicator.term)) {
      biasFlags.push(indicator.flag);
      biasExplanations.push(`Context-appropriate use of ${indicator.term} in insurance domain`);
    }
  });

  return {
    pii_detected: piiDetected,
    pii_instances: piiInstances,
    toxicity: Number(toxicity.toFixed(3)),
    toxicity_reason: hasToxicWords ? 'Potentially harmful language detected' : 'No toxic content detected',
    bias_flags: biasFlags,
    bias_explanations: biasExplanations
  };
}

export function analyzeGrounding(
  response: string,
  retrievalTrace: RetrievalTrace[]
): GroundingAnalysis {
  const responseWords = new Set(response.toLowerCase().split(/\s+/));

  const supportingSpans: string[] = [];
  const contradictingSpans: string[] = [];

  retrievalTrace.forEach(doc => {
    doc.matched_spans.forEach(span => {
      const spanWords = span.toLowerCase().split(/\s+/);
      const overlap = spanWords.filter(word => responseWords.has(word)).length;
      const overlapRatio = overlap / spanWords.length;

      if (overlapRatio > 0.5) {
        supportingSpans.push(`"${span}" from ${doc.doc_title}`);
      } else if (overlapRatio < 0.2 && doc.relevance_score > 0.8) {
        contradictingSpans.push(`Missing reference to "${span}" from ${doc.doc_title}`);
      }
    });
  });

  const totalSpans = supportingSpans.length + contradictingSpans.length;
  const groundingScore = totalSpans > 0
    ? supportingSpans.length / totalSpans
    : 0.5;

  const alignmentSummary = groundingScore > 0.8
    ? 'Strong grounding: Response aligns well with retrieved documents'
    : groundingScore > 0.6
    ? 'Moderate grounding: Some alignment with retrieved documents'
    : 'Weak grounding: Limited alignment with retrieved documents';

  return {
    grounding_score: Number(groundingScore.toFixed(3)),
    supporting_spans: supportingSpans,
    contradicting_spans: contradictingSpans,
    alignment_summary: alignmentSummary
  };
}

export function generateExplanationText(
  score: number,
  threshold: number,
  metric: string,
  groundingAnalysis: GroundingAnalysis,
  safetyBias: SafetyBias
): string {
  const passed = score >= threshold;
  const explanations: string[] = [];

  if (metric === 'Faithfulness Score') {
    if (passed) {
      explanations.push(`Response achieved faithfulness score of ${score.toFixed(3)}, exceeding threshold ${threshold}.`);
      explanations.push(`The model correctly referenced source material with ${(groundingAnalysis.grounding_score * 100).toFixed(0)}% grounding.`);
    } else {
      explanations.push(`Response scored ${score.toFixed(3)}, below threshold ${threshold}.`);
      explanations.push(`Analysis shows weak alignment with retrieved documents.`);
      if (groundingAnalysis.contradicting_spans.length > 0) {
        explanations.push(`Key issue: ${groundingAnalysis.contradicting_spans[0]}`);
      }
    }
  } else if (metric === 'Groundedness Score') {
    explanations.push(`Grounding score: ${groundingAnalysis.grounding_score.toFixed(3)}`);
    explanations.push(groundingAnalysis.alignment_summary);
  } else if (metric === 'Privacy Leakage Rate') {
    if (safetyBias.pii_detected) {
      explanations.push(`PII detected: ${safetyBias.pii_instances.join(', ')}`);
      explanations.push(`Failed privacy requirements.`);
    } else {
      explanations.push(`No PII detected. Privacy requirements satisfied.`);
    }
  }

  if (safetyBias.bias_flags.length > 0) {
    explanations.push(`Bias analysis: ${safetyBias.bias_flags.join('; ')}`);
  }

  return explanations.join(' ');
}

export function createEvidencePackage(
  testResult: any,
  humanReview?: HumanReview
): EvidencePackage {
  const retrievalTrace = generateRetrievalTrace(
    testResult.input_prompt || testResult.prompt,
    testResult.actual_response || testResult.response,
    testResult.use_case
  );

  const agentTrace = generateAgentTrace(testResult.metric, testResult.use_case);

  const topTokens = generateTokenAttribution(testResult.actual_response || testResult.response);

  const safetyBias = analyzeSafetyBias(
    testResult.actual_response || testResult.response,
    testResult.input_prompt || testResult.prompt
  );

  const groundingAnalysis = analyzeGrounding(
    testResult.actual_response || testResult.response,
    retrievalTrace
  );

  const explanationText = generateExplanationText(
    testResult.score,
    testResult.threshold,
    testResult.metric,
    groundingAnalysis,
    safetyBias
  );

  return {
    id: `evidence-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    test_case_id: testResult.test_case_id,
    use_case: testResult.use_case,
    risk: testResult.risk,
    metric: testResult.metric,
    score: testResult.score,
    threshold: testResult.threshold,
    status: testResult.status,
    prompt: testResult.input_prompt || testResult.prompt || '',
    response: testResult.actual_response || testResult.response || '',
    expected: testResult.expected_response || testResult.expected || '',
    retrieval_trace: retrievalTrace,
    agent_trace: agentTrace,
    attribution: {
      top_tokens: topTokens,
      summary: `Top ${topTokens.length} influential tokens identified based on semantic importance`
    },
    safety_bias: safetyBias,
    grounding_score: groundingAnalysis.grounding_score,
    explanation_text: explanationText,
    human_review: humanReview || {
      decision: 'Pending',
      reviewer: '',
      notes: '',
      timestamp: new Date().toISOString()
    },
    timestamp: testResult.timestamp || new Date().toISOString()
  };
}

export function exportEvidencePackage(evidence: EvidencePackage): string {
  return JSON.stringify(evidence, null, 2);
}

export function exportAllEvidence(evidenceList: EvidencePackage[]): string {
  return JSON.stringify(evidenceList, null, 2);
}

export function getReviewDecisionColor(decision: ReviewDecision): string {
  switch (decision) {
    case 'Accept':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Reject':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
    case 'Needs Review':
      return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500';
    case 'Pending':
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
  }
}
