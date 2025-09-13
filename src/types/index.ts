// Core Types for validAIte Platform

export interface ApplicationMetadata {
  app_name: string;
  app_type: 'chatbot' | 'rag' | 'agent' | 'copilot' | 'multimodal';
  version: string;
  environment: 'dev' | 'qa' | 'uat' | 'prod' | 'sandbox';
  org_id?: string;
  tenant_id?: string;
  region: 'us' | 'eu' | 'apac' | 'global';
}

export interface UserInteractionContext {
  session_id: string;
  user_id?: string; // anonymized
  persona: 'customer' | 'agent' | 'developer' | 'admin';
  device_platform: 'web' | 'mobile' | 'slack' | 'voice' | 'embedded';
  language_locale: string; // e.g., en-US, fr-FR
  conversation_history?: ConversationMessage[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface PromptsInstructions {
  user_prompt: string;
  system_prompt?: string;
  intermediate_prompts?: string[];
  prompt_template_id?: string;
  guardrails_applied?: string[];
}

export interface ModelParameters {
  model: string;
  model_version?: string;
  provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'oss' | 'other';
  parameters: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    stop_sequences?: string[];
    frequency_penalty?: number;
    presence_penalty?: number;
  };
  routing_logic?: string;
}

export interface RetrievalContext {
  retrieved_chunks?: RetrievedChunk[];
  retrieval_algorithm: 'bm25' | 'dense' | 'hybrid' | 'rerank' | 'other';
  kb_version?: string;
}

export interface RetrievedChunk {
  source: string;
  content: string;
  similarity_score: number;
}

export interface ModelResponse {
  response: string;
  alt_candidates?: string[];
  reasoning_steps?: string[];
  tool_calls?: ToolCall[];
  output_format: 'text' | 'json' | 'sql' | 'markdown' | 'multimodal';
  streaming_logs?: string[];
}

export interface ToolCall {
  tool: string;
  request: any;
  response: any;
}

export interface EvaluationInputs {
  golden_reference?: string;
  eval_templates?: string[];
  rubric?: EvaluationCriteria[];
  human_feedback?: 'thumbs_up' | 'thumbs_down' | 'rubric_scores';
}

export interface EvaluationCriteria {
  name: string;
  description: string;
  weight: number;
  scale: number;
}

export interface OperationalMetrics {
  latency_ms: number;
  tokens_in: number;
  tokens_out: number;
  total_tokens: number;
  cost_usd: number;
  retries: number;
  error_codes?: string[];
}

export interface SafetyCompliance {
  toxicity_score: number;
  bias_flags?: string[];
  pii_detected: boolean;
  regulatory_flags?: ('hipaa' | 'gdpr' | 'pci')[];
  jailbreak_detected: boolean;
}

export interface MultiAgentWorkflow {
  agent_name?: string;
  step_id?: number;
  workflow_graph_id?: string;
  tool_invocations?: AgentToolInvocation[];
  self_critique?: string;
}

export interface AgentToolInvocation {
  agent: string;
  step: number;
  tool: string;
  status: 'success' | 'failed' | 'pending';
}

export interface SystemInfraMetadata {
  trace_id: string;
  api_endpoint: string;
  infra: {
    container_id?: string;
    pod_name?: string;
    gpu_type?: string;
    memory?: string;
    region: string;
  };
  sdk_version: string;
}

// Complete Trace Structure
export interface AITrace {
  // Core identification
  id: string;
  trace_id: string;
  timestamp: string;
  
  // Application context
  application_metadata: ApplicationMetadata;
  user_context: UserInteractionContext;
  
  // Request details
  prompts: PromptsInstructions;
  model_config: ModelParameters;
  retrieval_context?: RetrievalContext;
  
  // Response details
  model_response: ModelResponse;
  
  // Evaluation
  evaluation_inputs?: EvaluationInputs;
  evaluation_results?: EvaluationResults;
  
  // Metrics
  operational_metrics: OperationalMetrics;
  safety_compliance: SafetyCompliance;
  
  // Advanced features
  multi_agent?: MultiAgentWorkflow;
  system_metadata: SystemInfraMetadata;
}

export interface EvaluationResults {
  quality_score?: number;
  toxicity_score?: number;
  bias_score?: number;
  coherence_score?: number;
  factuality_score?: number;
  relevance_score?: number;
  creativity_score?: number;
  helpfulness_score?: number;
  accuracy_score?: number;
  fluency_score?: number;
  overall_score?: number;
}

// NIST RMF Specific Types
export interface NISTRMFAssessment {
  id: string;
  name: string;
  application_id: string;
  framework_version: string;
  assessment_date: string;
  assessor: string;
  
  // NIST RMF Core Functions
  identify: NISTFunction;
  protect: NISTFunction;
  detect: NISTFunction;
  respond: NISTFunction;
  recover: NISTFunction;
  
  overall_maturity: number;
  risk_score: number;
  recommendations: string[];
}

export interface NISTFunction {
  maturity_level: 1 | 2 | 3 | 4; // Partial, Risk Informed, Repeatable, Adaptive
  controls: NISTControl[];
  score: number;
}

export interface NISTControl {
  id: string; // e.g., "ID.AM-1", "PR.AC-1"
  name: string;
  description: string;
  implementation_status: 'not_implemented' | 'partially_implemented' | 'largely_implemented' | 'fully_implemented';
  evidence: string;
  gaps: string[];
}

// EU TEVV Specific Types
export interface EUTEVVAssessment {
  id: string;
  name: string;
  application_id: string;
  ai_act_classification: 'unacceptable' | 'high_risk' | 'limited_risk' | 'minimal_risk';
  assessment_date: string;
  assessor: string;
  
  // TEVV Components
  testing: TEVVComponent;
  evaluation: TEVVComponent;
  validation: TEVVComponent;
  verification: TEVVComponent;
  
  conformity_status: 'compliant' | 'non_compliant' | 'under_assessment';
  ce_marking_eligible: boolean;
  recommendations: string[];
}

export interface TEVVComponent {
  completion_percentage: number;
  requirements: TEVVRequirement[];
  evidence_documents: string[];
  gaps: string[];
}

export interface TEVVRequirement {
  id: string; // e.g., "T-1.1", "E-2.3"
  name: string;
  description: string;
  mandatory: boolean;
  status: 'not_started' | 'in_progress' | 'completed' | 'non_compliant';
  evidence: string;
  due_date?: string;
}

// Risk Assessment Types
export interface RiskAssessment {
  id: string;
  name: string;
  application_id: string;
  assessment_type: 'initial' | 'periodic' | 'change_driven' | 'incident_driven';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  
  risk_categories: {
    data_privacy: RiskCategory;
    bias_fairness: RiskCategory;
    security: RiskCategory;
    transparency: RiskCategory;
    accountability: RiskCategory;
    performance: RiskCategory;
    societal_impact: RiskCategory;
  };
  
  overall_risk_score: number;
  mitigation_strategies: MitigationStrategy[];
  residual_risk: number;
  review_date: string;
}

export interface RiskCategory {
  score: number; // 1-10 scale
  likelihood: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  impact: 'negligible' | 'minor' | 'moderate' | 'major' | 'catastrophic';
  controls: string[];
  gaps: string[];
}

export interface MitigationStrategy {
  id: string;
  name: string;
  description: string;
  implementation_status: 'planned' | 'in_progress' | 'implemented' | 'verified';
  effectiveness: number; // 0-100%
  cost: number;
  timeline: string;
}

// Bias and Fairness Types
export interface BiasAssessment {
  id: string;
  name: string;
  application_id: string;
  assessment_date: string;
  
  demographic_groups: {
    gender: DemographicAnalysis;
    age: DemographicAnalysis;
    ethnicity: DemographicAnalysis;
    geography: DemographicAnalysis;
    socioeconomic: DemographicAnalysis;
    religion?: DemographicAnalysis;
    disability?: DemographicAnalysis;
  };
  
  fairness_metrics: {
    demographic_parity: FairnessMetric;
    equal_opportunity: FairnessMetric;
    equalized_odds: FairnessMetric;
    calibration: FairnessMetric;
    individual_fairness?: FairnessMetric;
  };
  
  overall_fairness_score: number;
  bias_mitigation_applied: string[];
}

export interface DemographicAnalysis {
  representation_percentage: number;
  performance_disparity: number;
  bias_detected: boolean;
  severity: 'low' | 'medium' | 'high';
  confidence_interval: [number, number];
}

export interface FairnessMetric {
  name: string;
  value: number;
  threshold: number;
  passing: boolean;
  formula: string;
  interpretation: string;
}

// Explainability Types
export interface ExplanationResult {
  id: string;
  trace_id: string;
  method: 'lime' | 'shap' | 'attention' | 'gradient' | 'counterfactual' | 'other';
  explanation_type: 'local' | 'global' | 'example_based';
  
  feature_importance: FeatureImportance[];
  explanation_text: string;
  confidence_score: number;
  visualization_data?: any;
  
  user_satisfaction?: number; // 1-5 scale
  explanation_quality?: number; // 1-100 scale
}

export interface FeatureImportance {
  feature: string;
  importance: number; // -1 to 1
  type: 'positive' | 'negative' | 'neutral';
  description?: string;
}

// Compliance and Audit Types
export interface ComplianceStatus {
  framework: 'nist_rmf' | 'eu_ai_act' | 'gdpr' | 'ccpa' | 'iso_27001' | 'soc2';
  version: string;
  overall_compliance: number; // 0-100%
  last_assessment: string;
  next_review: string;
  
  requirements: ComplianceRequirement[];
  gaps: ComplianceGap[];
  action_items: ActionItem[];
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  status: 'compliant' | 'partially_compliant' | 'non_compliant' | 'not_applicable';
  evidence: string[];
  last_verified: string;
}

export interface ComplianceGap {
  requirement_id: string;
  gap_description: string;
  risk_level: 'low' | 'medium' | 'high';
  remediation_plan: string;
  target_date: string;
  owner: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'completed' | 'blocked';
  assignee: string;
  due_date: string;
  estimated_effort: string;
}

// Testing and Validation Types
export interface TestExecution {
  id: string;
  test_suite_id: string;
  test_type: 'unit' | 'integration' | 'functional' | 'performance' | 'security' | 'bias' | 'safety';
  
  execution_metadata: {
    started_at: string;
    completed_at?: string;
    duration_ms?: number;
    executor: string;
    environment: string;
    version: string;
  };
  
  test_results: TestResult[];
  overall_status: 'passed' | 'failed' | 'skipped' | 'error';
  coverage_metrics?: CoverageMetrics;
  performance_metrics?: PerformanceMetrics;
}

export interface TestResult {
  test_id: string;
  test_name: string;
  status: 'passed' | 'failed' | 'skipped' | 'error';
  duration_ms: number;
  error_message?: string;
  assertions: AssertionResult[];
  metadata?: Record<string, any>;
}

export interface AssertionResult {
  assertion: string;
  expected: any;
  actual: any;
  passed: boolean;
  message?: string;
}

export interface CoverageMetrics {
  line_coverage: number;
  branch_coverage: number;
  function_coverage: number;
  statement_coverage: number;
}

export interface PerformanceMetrics {
  avg_response_time: number;
  p95_response_time: number;
  p99_response_time: number;
  throughput_rps: number;
  error_rate: number;
  memory_usage: number;
  cpu_usage: number;
}

// Data Drift Types
export interface DriftDetection {
  id: string;
  application_id: string;
  detection_date: string;
  
  drift_metrics: {
    input_drift: DriftMetric;
    output_drift: DriftMetric;
    performance_drift: DriftMetric;
    concept_drift: DriftMetric;
  };
  
  drift_severity: 'low' | 'medium' | 'high' | 'critical';
  recommended_actions: string[];
  auto_mitigation_applied: boolean;
}

export interface DriftMetric {
  metric_name: string;
  current_value: number;
  baseline_value: number;
  threshold: number;
  drift_score: number; // 0-1 scale
  statistical_significance: number;
  detection_method: string;
}

// Human Feedback Types
export interface HumanFeedback {
  id: string;
  trace_id: string;
  feedback_type: 'rating' | 'annotation' | 'correction' | 'preference';
  
  rating?: {
    overall: number; // 1-5 scale
    quality: number;
    helpfulness: number;
    accuracy: number;
    safety: number;
  };
  
  annotation?: {
    annotator_id: string;
    annotation_task_id: string;
    labels: Record<string, any>;
    confidence: number;
    time_spent_seconds: number;
  };
  
  correction?: {
    corrected_response: string;
    correction_type: 'factual' | 'style' | 'safety' | 'bias' | 'other';
    explanation: string;
  };
  
  preference?: {
    preferred_response_id: string;
    comparison_responses: string[];
    preference_reason: string;
  };
  
  feedback_metadata: {
    submitted_at: string;
    user_id: string;
    session_context: Record<string, any>;
  };
}

// Alert and Monitoring Types
export interface Alert {
  id: string;
  alert_type: 'threshold' | 'anomaly' | 'compliance' | 'security' | 'performance';
  severity: 'info' | 'warning' | 'error' | 'critical';
  
  trigger_condition: {
    metric: string;
    operator: 'gt' | 'lt' | 'eq' | 'ne' | 'contains' | 'regex';
    threshold: any;
    current_value: any;
  };
  
  application_id: string;
  triggered_at: string;
  resolved_at?: string;
  
  notification_channels: ('email' | 'slack' | 'webhook' | 'sms')[];
  escalation_policy: string;
  
  context: {
    trace_ids: string[];
    affected_users: number;
    business_impact: string;
  };
}

// Experiment and A/B Testing Types
export interface Experiment {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  
  experiment_config: {
    variants: ExperimentVariant[];
    traffic_allocation: Record<string, number>;
    success_metrics: string[];
    guardrail_metrics: string[];
  };
  
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  
  statistical_config: {
    significance_level: number; // e.g., 0.05
    power: number; // e.g., 0.8
    minimum_effect_size: number;
    sample_size_per_variant: number;
  };
  
  results?: ExperimentResults;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  description: string;
  configuration: Record<string, any>;
  is_control: boolean;
}

export interface ExperimentResults {
  statistical_significance: boolean;
  p_value: number;
  confidence_interval: [number, number];
  effect_size: number;
  
  variant_performance: Record<string, VariantMetrics>;
  winner?: string;
  recommendation: string;
}

export interface VariantMetrics {
  sample_size: number;
  conversion_rate: number;
  mean_metric_value: number;
  standard_error: number;
  confidence_interval: [number, number];
}

// Dataset and Benchmark Types
export interface Dataset {
  id: string;
  name: string;
  description: string;
  type: 'training' | 'evaluation' | 'benchmark' | 'production_sample';
  
  schema: {
    input_column: string;
    output_column?: string;
    ground_truth_columns: string[];
    metadata_columns: string[];
  };
  
  statistics: {
    total_samples: number;
    size_bytes: number;
    created_at: string;
    last_updated: string;
    version: string;
  };
  
  quality_metrics: {
    completeness: number;
    consistency: number;
    accuracy: number;
    validity: number;
  };
  
  bias_analysis?: {
    demographic_distribution: Record<string, number>;
    representation_gaps: string[];
    bias_indicators: Record<string, number>;
  };
}

export interface Benchmark {
  id: string;
  name: string;
  description: string;
  category: 'knowledge' | 'reasoning' | 'coding' | 'safety' | 'multilingual' | 'custom';
  
  benchmark_config: {
    dataset_id: string;
    models_to_test: string[];
    evaluation_metrics: string[];
    test_parameters: Record<string, any>;
  };
  
  execution_status: 'scheduled' | 'running' | 'completed' | 'failed';
  results?: BenchmarkResults;
}

export interface BenchmarkResults {
  execution_date: string;
  model_scores: Record<string, ModelBenchmarkScore>;
  leaderboard_ranking: LeaderboardEntry[];
  statistical_analysis: {
    significance_tests: Record<string, number>;
    confidence_intervals: Record<string, [number, number]>;
  };
}

export interface ModelBenchmarkScore {
  overall_score: number;
  metric_scores: Record<string, number>;
  rank: number;
  percentile: number;
}

export interface LeaderboardEntry {
  model: string;
  provider: string;
  score: number;
  rank: number;
  change_from_previous: number;
}