export interface Risk {
  id: string;
  category: RiskCategory;
  risk_name: string;
  description: string;
  severity: Severity;
  likelihood: Likelihood;
  impact_notes: string;
  owner_role: string;
  status: RiskStatus;
  score: number;
}

export type RiskCategory =
  | 'Accuracy'
  | 'Robustness'
  | 'Fairness'
  | 'Security'
  | 'Privacy'
  | 'Reliability'
  | 'Ethics';

export type Severity = 'High' | 'Medium' | 'Low';
export type Likelihood = 'Frequent' | 'Occasional' | 'Rare';
export type RiskStatus = 'Draft' | 'Reviewed' | 'Approved';

export const RISK_CATEGORIES: RiskCategory[] = [
  'Accuracy',
  'Robustness',
  'Fairness',
  'Security',
  'Privacy',
  'Reliability',
  'Ethics'
];

export const SEVERITIES: Severity[] = ['High', 'Medium', 'Low'];
export const LIKELIHOODS: Likelihood[] = ['Frequent', 'Occasional', 'Rare'];
export const RISK_STATUSES: RiskStatus[] = ['Draft', 'Reviewed', 'Approved'];
export const OWNER_ROLES = [
  'Governance Lead',
  'QA Engineer',
  'Domain Expert',
  'Security Officer',
  'AI Risk Manager'
];

export const RISK_TAXONOMY: Record<RiskCategory, string[]> = {
  'Accuracy': [
    'Hallucination',
    'Retrieval Error',
    'Grounding Gap',
    'Factual Inconsistency',
    'Answer Irrelevance'
  ],
  'Robustness': [
    'KB Drift',
    'Context Truncation',
    'Model Degradation',
    'Input Perturbation Sensitivity',
    'Performance Variability'
  ],
  'Fairness': [
    'Demographic Bias',
    'Sampling Bias',
    'Representation Gap',
    'Disparate Impact',
    'Cultural Bias'
  ],
  'Security': [
    'Prompt Injection',
    'Model Hijacking',
    'Data Poisoning',
    'Jailbreaking',
    'Adversarial Attack'
  ],
  'Privacy': [
    'PII Exposure',
    'Data Retention Leak',
    'Shadow Data',
    'Membership Inference',
    'Training Data Leakage'
  ],
  'Reliability': [
    'Misrouting (Agentic)',
    'Dependency Failure',
    'Service Downtime',
    'Rate Limiting Impact',
    'Latency Degradation'
  ],
  'Ethics': [
    'Discriminatory Response',
    'Inappropriate Output',
    'Harmful Content Generation',
    'Misinformation',
    'Social Bias Amplification'
  ]
};

const SEVERITY_WEIGHTS: Record<Severity, number> = {
  'High': 3,
  'Medium': 2,
  'Low': 1
};

const LIKELIHOOD_WEIGHTS: Record<Likelihood, number> = {
  'Frequent': 3,
  'Occasional': 2,
  'Rare': 1
};

export function calculateRiskScore(severity: Severity, likelihood: Likelihood): number {
  return SEVERITY_WEIGHTS[severity] * LIKELIHOOD_WEIGHTS[likelihood];
}

export function getRiskLevel(score: number): 'Critical' | 'High' | 'Medium' | 'Low' {
  if (score >= 9) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
}

interface ArchetypeContext {
  archetype_code: string;
  domain: string;
  modifiers: string[];
  data_sensitivity: string[];
  autonomy_level: string;
  use_cases: string[];
}

export function generateRisksFromArchetype(context: ArchetypeContext): Partial<Risk>[] {
  const risks: Partial<Risk>[] = [];

  if (context.modifiers.includes('RAG')) {
    risks.push(
      {
        category: 'Accuracy',
        risk_name: 'Hallucination',
        description: `Model may generate incorrect or fabricated information not supported by the knowledge base, especially critical in ${context.domain} domain.`,
        severity: 'High',
        likelihood: 'Frequent'
      },
      {
        category: 'Accuracy',
        risk_name: 'Retrieval Error',
        description: 'Vector search may retrieve irrelevant or outdated context from the knowledge base.',
        severity: 'Medium',
        likelihood: 'Occasional'
      },
      {
        category: 'Robustness',
        risk_name: 'KB Drift',
        description: 'Knowledge base becomes outdated, causing stale or incorrect responses.',
        severity: 'Medium',
        likelihood: 'Frequent'
      },
      {
        category: 'Accuracy',
        risk_name: 'Grounding Gap',
        description: 'Model fails to properly ground responses in retrieved context.',
        severity: 'High',
        likelihood: 'Occasional'
      }
    );
  }

  if (context.data_sensitivity.includes('pii') || context.data_sensitivity.includes('phi')) {
    risks.push(
      {
        category: 'Privacy',
        risk_name: 'PII Exposure',
        description: 'Chatbot may inadvertently expose personally identifiable information in responses or logs.',
        severity: 'High',
        likelihood: 'Rare'
      },
      {
        category: 'Privacy',
        risk_name: 'Data Retention Leak',
        description: 'Sensitive data may be retained longer than policy allows.',
        severity: 'Medium',
        likelihood: 'Occasional'
      }
    );
  }

  if (context.data_sensitivity.includes('financial')) {
    risks.push({
      category: 'Security',
      risk_name: 'Financial Data Exposure',
      description: 'Financial information may be exposed through model responses or side channels.',
      severity: 'High',
      likelihood: 'Rare'
    });
  }

  if (context.modifiers.includes('AG') || context.autonomy_level === 'action-taking') {
    risks.push(
      {
        category: 'Reliability',
        risk_name: 'Misrouting (Agentic)',
        description: 'Agent may route requests to wrong tools or take unintended actions.',
        severity: 'High',
        likelihood: 'Occasional'
      },
      {
        category: 'Security',
        risk_name: 'Tool Misuse',
        description: 'Agent may misuse external tools or APIs in unintended ways.',
        severity: 'High',
        likelihood: 'Occasional'
      }
    );
  }

  if (context.modifiers.includes('MM')) {
    risks.push(
      {
        category: 'Fairness',
        risk_name: 'Vision Model Bias',
        description: 'Image recognition may exhibit demographic or cultural biases.',
        severity: 'Medium',
        likelihood: 'Frequent'
      },
      {
        category: 'Accuracy',
        risk_name: 'Cross-modal Hallucination',
        description: 'Model may generate descriptions inconsistent with image/audio input.',
        severity: 'Medium',
        likelihood: 'Occasional'
      }
    );
  }

  risks.push(
    {
      category: 'Security',
      risk_name: 'Prompt Injection',
      description: 'Malicious users may inject prompts to bypass guardrails or extract sensitive information.',
      severity: 'High',
      likelihood: 'Occasional'
    },
    {
      category: 'Ethics',
      risk_name: 'Discriminatory Response',
      description: 'Model may generate biased or discriminatory content based on protected attributes.',
      severity: 'High',
      likelihood: 'Rare'
    },
    {
      category: 'Robustness',
      risk_name: 'Model Degradation',
      description: 'Model performance may degrade over time or with distribution shift.',
      severity: 'Medium',
      likelihood: 'Occasional'
    }
  );

  if (context.domain === 'healthcare') {
    risks.push({
      category: 'Ethics',
      risk_name: 'Medical Misinformation',
      description: 'Incorrect medical advice could lead to patient harm.',
      severity: 'High',
      likelihood: 'Occasional'
    });
  }

  if (context.domain === 'financial' || context.domain === 'banking') {
    risks.push({
      category: 'Accuracy',
      risk_name: 'Financial Calculation Error',
      description: 'Incorrect financial calculations or advice.',
      severity: 'High',
      likelihood: 'Occasional'
    });
  }

  return risks.map((risk, index) => ({
    ...risk,
    id: `risk-${Date.now()}-${index}`,
    impact_notes: '',
    owner_role: 'AI Risk Manager',
    status: 'Draft' as RiskStatus,
    score: calculateRiskScore(risk.severity as Severity, risk.likelihood as Likelihood)
  }));
}
