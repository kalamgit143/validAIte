export interface TrustScoreResult {
  id: string;
  test_case_id: string;
  use_case: string;
  risk: string;
  metric: string;
  score: number;
  threshold: number;
  status: TestStatus;
  response_time_ms: number;
  eval_type: EvalType;
  timestamp: string;
  actual_response: string;
  expected_response: string;
  error_message?: string;
}

export type TestStatus = 'Pass' | 'Fail' | 'Running' | 'Error';
export type EvalType = 'Code Eval' | 'LLM Eval' | 'LLM + Code' | 'Code + Human';

export interface MetricAggregation {
  metric_name: string;
  total_tests: number;
  passed: number;
  failed: number;
  average_score: number;
  min_score: number;
  max_score: number;
  pass_rate: number;
}

export interface RiskAggregation {
  risk_name: string;
  total_tests: number;
  passed: number;
  failed: number;
  weighted_score: number;
  status: TestStatus;
}

export interface UseCaseAggregation {
  use_case: string;
  total_tests: number;
  passed: number;
  failed: number;
  trust_index: number;
  status: TestStatus;
}

export interface TrustIndexReport {
  application: string;
  archetype: string;
  overall_trust_index: number;
  total_tests: number;
  passed: number;
  failed: number;
  pass_rate: number;
  metric_aggregations: MetricAggregation[];
  risk_aggregations: RiskAggregation[];
  use_case_aggregations: UseCaseAggregation[];
  generated_date: string;
}

export interface ExecutionProgress {
  total: number;
  completed: number;
  running: number;
  passed: number;
  failed: number;
  percentage: number;
}

export function cosineSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);

  const uniqueWords = new Set([...words1, ...words2]);
  const vector1: number[] = [];
  const vector2: number[] = [];

  uniqueWords.forEach(word => {
    vector1.push(words1.filter(w => w === word).length);
    vector2.push(words2.filter(w => w === word).length);
  });

  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  return dotProduct / (magnitude1 * magnitude2);
}

export function calculateFaithfulness(actual: string, expected: string): number {
  return cosineSimilarity(actual, expected);
}

export function calculateGroundedness(actual: string, context: string): number {
  const actualWords = actual.toLowerCase().split(/\s+/);
  const contextWords = new Set(context.toLowerCase().split(/\s+/));

  const supportedWords = actualWords.filter(word => contextWords.has(word));
  return actualWords.length > 0 ? supportedWords.length / actualWords.length : 0;
}

export function calculateFreshnessIndex(dataTimestamp: Date, currentTimestamp: Date, maxAgeMs: number): number {
  const timeDiff = currentTimestamp.getTime() - dataTimestamp.getTime();
  const freshnessRatio = Math.max(0, 1 - (timeDiff / maxAgeMs));
  return freshnessRatio;
}

export function calculatePrivacyLeakageRate(responses: string[]): number {
  const piiPatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/g,
    /\b\d{10,12}\b/g,
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g
  ];

  let leakCount = 0;

  responses.forEach(response => {
    piiPatterns.forEach(pattern => {
      if (pattern.test(response)) {
        leakCount++;
      }
    });
  });

  return responses.length > 0 ? leakCount / responses.length : 0;
}

export function calculateBiasGap(scores: number[]): number {
  if (scores.length === 0) return 0;
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  return maxScore - minScore;
}

export function calculateLatencyConsistency(responseTimes: number[]): number {
  if (responseTimes.length === 0) return 1;

  const mean = responseTimes.reduce((sum, val) => sum + val, 0) / responseTimes.length;
  const variance = responseTimes.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / responseTimes.length;
  const stdDev = Math.sqrt(variance);

  return Math.max(0, 1 - (stdDev / mean));
}

export function simulateTestExecution(
  testCase: any,
  dataset: any
): Partial<TrustScoreResult> {
  const responseTime = 800 + Math.random() * 1200;

  const variations = [
    dataset.expected_response,
    dataset.expected_response.replace(/approximately/g, 'about'),
    dataset.expected_response.replace(/₹/g, 'Rs. '),
    dataset.expected_response.split(' ').slice(0, -2).join(' '),
    'The premium information is currently unavailable.'
  ];

  const actualResponse = variations[Math.floor(Math.random() * variations.length)];

  let score = 0;
  let evalType: EvalType = 'LLM + Code';

  switch (testCase.metric) {
    case 'Faithfulness Score':
      score = calculateFaithfulness(actualResponse, dataset.expected_response);
      evalType = 'LLM + Code';
      break;

    case 'Groundedness Score':
      score = calculateGroundedness(actualResponse, dataset.expected_response);
      evalType = 'LLM Eval';
      break;

    case 'Freshness Index':
      score = calculateFreshnessIndex(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        new Date(),
        30 * 24 * 60 * 60 * 1000
      );
      evalType = 'Code Eval';
      break;

    case 'Privacy Leakage Rate':
      score = 1 - calculatePrivacyLeakageRate([actualResponse]);
      evalType = 'Code Eval';
      break;

    case 'Context Relevance':
      score = cosineSimilarity(actualResponse, dataset.input_prompt);
      evalType = 'LLM + Code';
      break;

    default:
      score = 0.7 + Math.random() * 0.3;
      break;
  }

  score = Math.max(0, Math.min(1, score + (Math.random() * 0.1 - 0.05)));

  const threshold = testCase.threshold || 0.8;
  const status: TestStatus = score >= threshold ? 'Pass' : 'Fail';

  return {
    test_case_id: testCase.id,
    use_case: testCase.use_case,
    risk: testCase.risk,
    metric: testCase.metric,
    score: Number(score.toFixed(3)),
    threshold,
    status,
    response_time_ms: Math.round(responseTime),
    eval_type: evalType,
    actual_response: actualResponse,
    expected_response: dataset.expected_response
  };
}

export function aggregateByMetric(results: TrustScoreResult[]): MetricAggregation[] {
  const metricMap = new Map<string, TrustScoreResult[]>();

  results.forEach(result => {
    if (!metricMap.has(result.metric)) {
      metricMap.set(result.metric, []);
    }
    metricMap.get(result.metric)!.push(result);
  });

  const aggregations: MetricAggregation[] = [];

  metricMap.forEach((metricResults, metricName) => {
    const scores = metricResults.map(r => r.score);
    const passed = metricResults.filter(r => r.status === 'Pass').length;
    const failed = metricResults.filter(r => r.status === 'Fail').length;

    aggregations.push({
      metric_name: metricName,
      total_tests: metricResults.length,
      passed,
      failed,
      average_score: scores.reduce((sum, s) => sum + s, 0) / scores.length,
      min_score: Math.min(...scores),
      max_score: Math.max(...scores),
      pass_rate: (passed / metricResults.length) * 100
    });
  });

  return aggregations;
}

export function aggregateByRisk(results: TrustScoreResult[]): RiskAggregation[] {
  const riskMap = new Map<string, TrustScoreResult[]>();

  results.forEach(result => {
    if (!riskMap.has(result.risk)) {
      riskMap.set(result.risk, []);
    }
    riskMap.get(result.risk)!.push(result);
  });

  const aggregations: RiskAggregation[] = [];

  riskMap.forEach((riskResults, riskName) => {
    const passed = riskResults.filter(r => r.status === 'Pass').length;
    const failed = riskResults.filter(r => r.status === 'Fail').length;
    const weightedScore = riskResults.reduce((sum, r) => sum + r.score, 0) / riskResults.length;

    aggregations.push({
      risk_name: riskName,
      total_tests: riskResults.length,
      passed,
      failed,
      weighted_score: Number(weightedScore.toFixed(3)),
      status: failed === 0 ? 'Pass' : 'Fail'
    });
  });

  return aggregations;
}

export function aggregateByUseCase(results: TrustScoreResult[]): UseCaseAggregation[] {
  const useCaseMap = new Map<string, TrustScoreResult[]>();

  results.forEach(result => {
    if (!useCaseMap.has(result.use_case)) {
      useCaseMap.set(result.use_case, []);
    }
    useCaseMap.get(result.use_case)!.push(result);
  });

  const aggregations: UseCaseAggregation[] = [];

  useCaseMap.forEach((useCaseResults, useCase) => {
    const passed = useCaseResults.filter(r => r.status === 'Pass').length;
    const failed = useCaseResults.filter(r => r.status === 'Fail').length;
    const trustIndex = useCaseResults.reduce((sum, r) => sum + r.score, 0) / useCaseResults.length;

    aggregations.push({
      use_case: useCase,
      total_tests: useCaseResults.length,
      passed,
      failed,
      trust_index: Number(trustIndex.toFixed(3)),
      status: failed === 0 ? 'Pass' : 'Fail'
    });
  });

  return aggregations;
}

export function calculateOverallTrustIndex(results: TrustScoreResult[], metricWeights?: Map<string, number>): number {
  if (results.length === 0) return 0;

  if (!metricWeights || metricWeights.size === 0) {
    return results.reduce((sum, r) => sum + r.score, 0) / results.length;
  }

  let weightedSum = 0;
  let totalWeight = 0;

  results.forEach(result => {
    const weight = metricWeights.get(result.metric) || 1;
    weightedSum += result.score * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

export function generateTrustIndexReport(
  results: TrustScoreResult[],
  application: string,
  archetype: string
): TrustIndexReport {
  const passed = results.filter(r => r.status === 'Pass').length;
  const failed = results.filter(r => r.status === 'Fail').length;

  return {
    application,
    archetype,
    overall_trust_index: Number(calculateOverallTrustIndex(results).toFixed(3)),
    total_tests: results.length,
    passed,
    failed,
    pass_rate: (passed / results.length) * 100,
    metric_aggregations: aggregateByMetric(results),
    risk_aggregations: aggregateByRisk(results),
    use_case_aggregations: aggregateByUseCase(results),
    generated_date: new Date().toISOString()
  };
}

export function exportTrustScoreResults(results: TrustScoreResult[]): string {
  return JSON.stringify(results, null, 2);
}

export function exportTrustIndexReport(report: TrustIndexReport): string {
  return JSON.stringify(report, null, 2);
}

export function getStatusColor(status: TestStatus): string {
  switch (status) {
    case 'Pass':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Fail':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
    case 'Running':
      return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
    case 'Error':
      return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-500';
  }
}

export function getScoreColor(score: number, threshold: number): string {
  if (score >= threshold) {
    return 'text-green-700 dark:text-green-400';
  } else if (score >= threshold * 0.8) {
    return 'text-yellow-700 dark:text-yellow-400';
  } else {
    return 'text-red-700 dark:text-red-400';
  }
}
