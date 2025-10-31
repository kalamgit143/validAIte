export interface TrustMetric {
  id: string;
  risk_name: string;
  metric_name: string;
  metric_type: MetricType;
  definition: string;
  formula: string;
  threshold: number | string;
  evidence_type: EvidenceType;
  weight: number;
  owner_role: string;
  status: MetricStatus;
  category: string;
}

export type MetricType = 'Quantitative' | 'Qualitative';
export type EvidenceType = 'Code Eval' | 'LLM Eval' | 'Human Review' | 'LLM + Code' | 'Code + Human' | 'Hybrid';
export type MetricStatus = 'Draft' | 'Reviewed' | 'Approved';

export const METRIC_TYPES: MetricType[] = ['Quantitative', 'Qualitative'];
export const EVIDENCE_TYPES: EvidenceType[] = [
  'Code Eval',
  'LLM Eval',
  'Human Review',
  'LLM + Code',
  'Code + Human',
  'Hybrid'
];
export const METRIC_STATUSES: MetricStatus[] = ['Draft', 'Reviewed', 'Approved'];

export const METRIC_OWNER_ROLES = [
  'CIO',
  'CISO',
  'Quality & Compliance Manager',
  'QA Engineer',
  'Governance Lead',
  'Domain Expert',
  'AI Risk Manager',
  'Security Officer'
];

export interface MetricLibraryItem {
  risk_category: string;
  risk_name: string;
  metrics: {
    name: string;
    type: MetricType;
    definition: string;
    formula: string;
    default_threshold: string;
    evidence_type: EvidenceType;
  }[];
}

export const TRUST_METRIC_LIBRARY: MetricLibraryItem[] = [
  {
    risk_category: 'Accuracy',
    risk_name: 'Hallucination',
    metrics: [
      {
        name: 'Faithfulness Score',
        type: 'Quantitative',
        definition: 'Measures factual alignment of LLM responses with ground truth data.',
        formula: 'cosine_similarity(retrieved_context, generated_response)',
        default_threshold: '≥ 0.8',
        evidence_type: 'LLM + Code'
      },
      {
        name: 'Groundedness Score',
        type: 'Quantitative',
        definition: 'Percentage of claims in response supported by retrieved context.',
        formula: 'supported_claims / total_claims',
        default_threshold: '≥ 0.85',
        evidence_type: 'LLM Eval'
      }
    ]
  },
  {
    risk_category: 'Accuracy',
    risk_name: 'Retrieval Error',
    metrics: [
      {
        name: 'Context Relevance',
        type: 'Quantitative',
        definition: 'Relevance of retrieved context to user query.',
        formula: 'avg(relevance_scores)',
        default_threshold: '≥ 0.75',
        evidence_type: 'Code Eval'
      },
      {
        name: 'Retrieval Precision',
        type: 'Quantitative',
        definition: 'Ratio of relevant retrieved documents to total retrieved.',
        formula: 'relevant_docs / total_retrieved_docs',
        default_threshold: '≥ 0.7',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Accuracy',
    risk_name: 'Grounding Gap',
    metrics: [
      {
        name: 'Citation Accuracy',
        type: 'Quantitative',
        definition: 'Percentage of responses properly citing source material.',
        formula: 'cited_responses / total_responses',
        default_threshold: '≥ 0.9',
        evidence_type: 'LLM + Code'
      }
    ]
  },
  {
    risk_category: 'Robustness',
    risk_name: 'KB Drift',
    metrics: [
      {
        name: 'Freshness Index',
        type: 'Quantitative',
        definition: 'Measures how recent or updated the retrieved KB data is.',
        formula: '(1 - drift_ratio)',
        default_threshold: '≥ 0.9',
        evidence_type: 'Code Eval'
      },
      {
        name: 'Staleness Rate',
        type: 'Quantitative',
        definition: 'Percentage of responses using outdated information.',
        formula: 'stale_responses / total_responses',
        default_threshold: '≤ 0.1',
        evidence_type: 'Code + Human'
      }
    ]
  },
  {
    risk_category: 'Robustness',
    risk_name: 'Context Truncation',
    metrics: [
      {
        name: 'Context Completeness',
        type: 'Quantitative',
        definition: 'Percentage of required context included within token limits.',
        formula: 'included_context / required_context',
        default_threshold: '≥ 0.95',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Robustness',
    risk_name: 'Model Degradation',
    metrics: [
      {
        name: 'Performance Consistency',
        type: 'Quantitative',
        definition: 'Variance in model performance over time.',
        formula: '1 - std_dev(performance_scores)',
        default_threshold: '≥ 0.85',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Fairness',
    risk_name: 'Demographic Bias',
    metrics: [
      {
        name: 'Demographic Parity',
        type: 'Quantitative',
        definition: 'Equal positive outcome rates across demographic groups.',
        formula: 'max_group_rate - min_group_rate',
        default_threshold: '≤ 0.1',
        evidence_type: 'Code + Human'
      },
      {
        name: 'Equalized Odds',
        type: 'Quantitative',
        definition: 'Equal true positive and false positive rates across groups.',
        formula: 'max(TPR_diff, FPR_diff)',
        default_threshold: '≤ 0.1',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Fairness',
    risk_name: 'Cultural Bias',
    metrics: [
      {
        name: 'Cultural Sensitivity Score',
        type: 'Qualitative',
        definition: 'Assessment of responses for cultural appropriateness.',
        formula: 'human_review_rating',
        default_threshold: '≥ 4/5',
        evidence_type: 'Human Review'
      }
    ]
  },
  {
    risk_category: 'Security',
    risk_name: 'Prompt Injection',
    metrics: [
      {
        name: 'Injection Resistance Rate',
        type: 'Quantitative',
        definition: 'Percentage of injection attempts successfully blocked.',
        formula: 'blocked_attempts / total_attempts',
        default_threshold: '≥ 0.95',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Security',
    risk_name: 'Data Poisoning',
    metrics: [
      {
        name: 'Input Validation Rate',
        type: 'Quantitative',
        definition: 'Percentage of inputs passing validation checks.',
        formula: 'valid_inputs / total_inputs',
        default_threshold: '≥ 0.99',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Privacy',
    risk_name: 'PII Exposure',
    metrics: [
      {
        name: 'Privacy Leakage Rate',
        type: 'Quantitative',
        definition: 'Percentage of responses exposing personal identifiable information.',
        formula: 'leak_count / total_responses',
        default_threshold: '≤ 0.01',
        evidence_type: 'Code + Human'
      },
      {
        name: 'PII Detection Rate',
        type: 'Quantitative',
        definition: 'Percentage of PII correctly identified and masked.',
        formula: 'detected_pii / actual_pii',
        default_threshold: '≥ 0.95',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Privacy',
    risk_name: 'Data Retention Leak',
    metrics: [
      {
        name: 'Retention Compliance',
        type: 'Quantitative',
        definition: 'Percentage of data properly deleted per retention policy.',
        formula: 'deleted_on_time / total_scheduled_deletions',
        default_threshold: '≥ 0.99',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Reliability',
    risk_name: 'Misrouting (Agentic)',
    metrics: [
      {
        name: 'Intent Routing Accuracy',
        type: 'Quantitative',
        definition: 'Percentage of requests routed to correct tools/agents.',
        formula: 'correct_routes / total_routes',
        default_threshold: '≥ 0.9',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Reliability',
    risk_name: 'Dependency Failure',
    metrics: [
      {
        name: 'Graceful Degradation Rate',
        type: 'Quantitative',
        definition: 'Percentage of dependency failures handled gracefully.',
        formula: 'handled_failures / total_failures',
        default_threshold: '≥ 0.95',
        evidence_type: 'Code Eval'
      }
    ]
  },
  {
    risk_category: 'Ethics',
    risk_name: 'Discriminatory Response',
    metrics: [
      {
        name: 'Bias Detection Rate',
        type: 'Quantitative',
        definition: 'Percentage of discriminatory content flagged by system.',
        formula: 'flagged_bias / actual_bias',
        default_threshold: '≥ 0.9',
        evidence_type: 'LLM + Code'
      }
    ]
  },
  {
    risk_category: 'Ethics',
    risk_name: 'Inappropriate Output',
    metrics: [
      {
        name: 'Toxicity Rate',
        type: 'Quantitative',
        definition: 'Percentage of responses containing toxic or harmful content.',
        formula: 'toxic_responses / total_responses',
        default_threshold: '≤ 0.05',
        evidence_type: 'LLM Eval'
      },
      {
        name: 'Content Safety Score',
        type: 'Quantitative',
        definition: 'Overall safety rating of generated content.',
        formula: 'avg(safety_scores)',
        default_threshold: '≥ 0.9',
        evidence_type: 'LLM Eval'
      }
    ]
  }
];

export function findMetricsForRisk(riskName: string, category: string): MetricLibraryItem | undefined {
  return TRUST_METRIC_LIBRARY.find(
    item => item.risk_name === riskName || item.risk_category === category
  );
}

export function generateMetricsFromRisk(risk: any): Partial<TrustMetric>[] {
  const libraryItem = findMetricsForRisk(risk.risk_name, risk.category);

  if (!libraryItem || !libraryItem.metrics) {
    return [{
      risk_name: risk.risk_name,
      metric_name: `${risk.risk_name} Score`,
      metric_type: 'Quantitative',
      definition: `Measures the impact and occurrence of ${risk.risk_name.toLowerCase()}.`,
      formula: 'To be defined',
      threshold: '0.8',
      evidence_type: 'LLM + Code',
      weight: 0.5,
      owner_role: 'QA Engineer',
      status: 'Draft',
      category: risk.category
    }];
  }

  return libraryItem.metrics.map(metric => ({
    risk_name: risk.risk_name,
    metric_name: metric.name,
    metric_type: metric.type,
    definition: metric.definition,
    formula: metric.formula,
    threshold: metric.default_threshold,
    evidence_type: metric.evidence_type,
    weight: 1 / libraryItem.metrics.length,
    owner_role: 'QA Engineer',
    status: 'Draft',
    category: risk.category
  }));
}

export function validateThreshold(threshold: string | number, metricType: MetricType): boolean {
  if (metricType === 'Qualitative') return true;

  const thresholdStr = String(threshold);
  const pattern = /^(≥|≤|>|<|=)?\s*\d+\.?\d*$/;
  return pattern.test(thresholdStr);
}

export function calculateTotalWeight(metrics: TrustMetric[]): number {
  return metrics.reduce((sum, metric) => sum + metric.weight, 0);
}

export function normalizeWeights(metrics: TrustMetric[]): TrustMetric[] {
  const total = calculateTotalWeight(metrics);
  if (total === 0) return metrics;

  return metrics.map(metric => ({
    ...metric,
    weight: metric.weight / total
  }));
}

export function getMetricsByCategory(metrics: TrustMetric[]): Record<string, TrustMetric[]> {
  const grouped: Record<string, TrustMetric[]> = {};

  metrics.forEach(metric => {
    if (!grouped[metric.category]) {
      grouped[metric.category] = [];
    }
    grouped[metric.category].push(metric);
  });

  return grouped;
}
