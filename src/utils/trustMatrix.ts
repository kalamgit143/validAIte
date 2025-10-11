export interface TrustMatrixRow {
  id: string;
  use_case: string;
  risk: string;
  metric: string;
  score: number;
  threshold: number;
  status: 'Pass' | 'Fail';
  human_decision: 'Accept' | 'Reject' | 'Needs Review' | 'Pending';
  final_outcome: 'Trusted' | 'Needs Review' | 'Blocked';
  evidence_link: string;
  test_case_id: string;
  timestamp: string;
}

export interface UseCaseTrustSummary {
  id: string;
  name: string;
  trust_index: number;
  total_tests: number;
  passed: number;
  failed: number;
  accepted: number;
  rejected: number;
  risks: RiskMetricScore[];
}

export interface RiskMetricScore {
  risk: string;
  metric: string;
  score: number;
  threshold: number;
  status: 'Pass' | 'Fail';
  human_decision: string;
}

export interface ApplicationTrustReport {
  application: string;
  archetype: string;
  overall_trust_index: number;
  risk_tier: 'Low' | 'Medium' | 'High' | 'Critical';
  use_cases: UseCaseTrustSummary[];
  total_tests: number;
  pass_rate: number;
  acceptance_rate: number;
  recommendation: string;
  compliance_summary: ComplianceSummary;
  generated_date: string;
}

export interface ComplianceSummary {
  nist_rmf_coverage: string[];
  eu_ai_act_articles: string[];
  status: 'Compliant' | 'Partial' | 'Non-Compliant';
}

export interface HeatmapCell {
  risk: string;
  metric: string;
  score: number;
  status: 'Pass' | 'Fail';
  color: string;
}

export interface TrendDataPoint {
  date: string;
  trust_index: number;
  release: string;
}

export function computeFinalOutcome(
  testStatus: 'Pass' | 'Fail',
  humanDecision: 'Accept' | 'Reject' | 'Needs Review' | 'Pending'
): 'Trusted' | 'Needs Review' | 'Blocked' {
  if (testStatus === 'Pass' && humanDecision === 'Accept') {
    return 'Trusted';
  } else if (humanDecision === 'Reject') {
    return 'Blocked';
  } else {
    return 'Needs Review';
  }
}

export function createTrustMatrixRow(
  testResult: any,
  evidencePackage: any
): TrustMatrixRow {
  const status = testResult.status as 'Pass' | 'Fail';
  const humanDecision = evidencePackage?.human_review?.decision || 'Pending';
  const finalOutcome = computeFinalOutcome(status, humanDecision);

  return {
    id: `matrix-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    use_case: testResult.use_case,
    risk: testResult.risk,
    metric: testResult.metric,
    score: testResult.score,
    threshold: testResult.threshold,
    status,
    human_decision: humanDecision,
    final_outcome: finalOutcome,
    evidence_link: evidencePackage?.id ? `evidence/${evidencePackage.id}.json` : '',
    test_case_id: testResult.test_case_id,
    timestamp: testResult.timestamp || new Date().toISOString()
  };
}

export function aggregateByUseCase(matrixRows: TrustMatrixRow[]): UseCaseTrustSummary[] {
  const useCaseMap = new Map<string, TrustMatrixRow[]>();

  matrixRows.forEach(row => {
    if (!useCaseMap.has(row.use_case)) {
      useCaseMap.set(row.use_case, []);
    }
    useCaseMap.get(row.use_case)!.push(row);
  });

  const summaries: UseCaseTrustSummary[] = [];

  useCaseMap.forEach((rows, useCase) => {
    const totalTests = rows.length;
    const passed = rows.filter(r => r.status === 'Pass').length;
    const failed = rows.filter(r => r.status === 'Fail').length;
    const accepted = rows.filter(r => r.human_decision === 'Accept').length;
    const rejected = rows.filter(r => r.human_decision === 'Reject').length;

    const scores = rows.map(r => r.score);
    const trustIndex = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const risks: RiskMetricScore[] = rows.map(r => ({
      risk: r.risk,
      metric: r.metric,
      score: r.score,
      threshold: r.threshold,
      status: r.status,
      human_decision: r.human_decision
    }));

    summaries.push({
      id: `UC-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: useCase,
      trust_index: Number((trustIndex * 100).toFixed(0)),
      total_tests: totalTests,
      passed,
      failed,
      accepted,
      rejected,
      risks
    });
  });

  return summaries;
}

export function computeOverallTrustIndex(useCaseSummaries: UseCaseTrustSummary[]): number {
  if (useCaseSummaries.length === 0) return 0;

  const totalIndex = useCaseSummaries.reduce((sum, uc) => sum + uc.trust_index, 0);
  return Number((totalIndex / useCaseSummaries.length).toFixed(0));
}

export function determineRiskTier(overallTrustIndex: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (overallTrustIndex >= 80) return 'Low';
  if (overallTrustIndex >= 60) return 'Medium';
  if (overallTrustIndex >= 40) return 'High';
  return 'Critical';
}

export function generateRecommendation(
  overallTrustIndex: number,
  passRate: number,
  acceptanceRate: number
): string {
  if (overallTrustIndex >= 80 && passRate >= 80 && acceptanceRate >= 80) {
    return 'Approved for production deployment. All trust metrics meet requirements.';
  } else if (overallTrustIndex >= 70 && passRate >= 70) {
    return 'Conditional approval. Address identified issues before full deployment.';
  } else if (overallTrustIndex >= 60) {
    return 'Proceed with caution. Significant improvements needed before production.';
  } else {
    return 'Deployment blocked. Critical trust failures require immediate remediation.';
  }
}

export function generateComplianceSummary(
  overallTrustIndex: number,
  hasHumanReview: boolean
): ComplianceSummary {
  const nistCoverage = [
    'MAP-1: Risk Context Established',
    'MEASURE-2: Trust Metrics Defined',
    'MEASURE-3: Test Results Captured',
    'MANAGE-1: Human Review Conducted',
    'GOVERN-1: Audit Trail Maintained'
  ];

  const euArticles = [
    'Article 9: Risk Management System',
    'Article 10: Data Governance',
    'Article 13: Transparency Obligations',
    'Article 14: Human Oversight',
    'Article 15: Accuracy & Robustness'
  ];

  let status: 'Compliant' | 'Partial' | 'Non-Compliant';

  if (overallTrustIndex >= 80 && hasHumanReview) {
    status = 'Compliant';
  } else if (overallTrustIndex >= 60) {
    status = 'Partial';
  } else {
    status = 'Non-Compliant';
  }

  return {
    nist_rmf_coverage: nistCoverage,
    eu_ai_act_articles: euArticles,
    status
  };
}

export function createApplicationTrustReport(
  matrixRows: TrustMatrixRow[],
  application: string,
  archetype: string
): ApplicationTrustReport {
  const useCaseSummaries = aggregateByUseCase(matrixRows);
  const overallTrustIndex = computeOverallTrustIndex(useCaseSummaries);
  const riskTier = determineRiskTier(overallTrustIndex);

  const totalTests = matrixRows.length;
  const passed = matrixRows.filter(r => r.status === 'Pass').length;
  const accepted = matrixRows.filter(r => r.human_decision === 'Accept').length;

  const passRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;
  const acceptanceRate = totalTests > 0 ? (accepted / totalTests) * 100 : 0;

  const recommendation = generateRecommendation(overallTrustIndex, passRate, acceptanceRate);

  const hasHumanReview = matrixRows.some(r => r.human_decision !== 'Pending');
  const complianceSummary = generateComplianceSummary(overallTrustIndex, hasHumanReview);

  return {
    application,
    archetype,
    overall_trust_index: overallTrustIndex,
    risk_tier: riskTier,
    use_cases: useCaseSummaries,
    total_tests: totalTests,
    pass_rate: Number(passRate.toFixed(1)),
    acceptance_rate: Number(acceptanceRate.toFixed(1)),
    recommendation,
    compliance_summary: complianceSummary,
    generated_date: new Date().toISOString()
  };
}

export function generateHeatmapData(matrixRows: TrustMatrixRow[]): HeatmapCell[] {
  const uniqueRisks = Array.from(new Set(matrixRows.map(r => r.risk)));
  const uniqueMetrics = Array.from(new Set(matrixRows.map(r => r.metric)));

  const heatmap: HeatmapCell[] = [];

  uniqueRisks.forEach(risk => {
    uniqueMetrics.forEach(metric => {
      const matchingRows = matrixRows.filter(r => r.risk === risk && r.metric === metric);

      if (matchingRows.length > 0) {
        const avgScore = matchingRows.reduce((sum, r) => sum + r.score, 0) / matchingRows.length;
        const status = matchingRows.every(r => r.status === 'Pass') ? 'Pass' : 'Fail';

        heatmap.push({
          risk,
          metric,
          score: Number(avgScore.toFixed(3)),
          status,
          color: getHeatmapColor(avgScore)
        });
      }
    });
  });

  return heatmap;
}

export function getHeatmapColor(score: number): string {
  if (score >= 0.9) return '#10b981';
  if (score >= 0.8) return '#84cc16';
  if (score >= 0.7) return '#eab308';
  if (score >= 0.6) return '#f97316';
  return '#ef4444';
}

export function getTrustIndexColor(index: number): string {
  if (index >= 80) return 'text-green-700 dark:text-green-400';
  if (index >= 60) return 'text-yellow-700 dark:text-yellow-400';
  if (index >= 40) return 'text-orange-700 dark:text-orange-400';
  return 'text-red-700 dark:text-red-400';
}

export function getRiskTierColor(tier: string): string {
  switch (tier) {
    case 'Low':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Medium':
      return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500';
    case 'High':
      return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-500';
    case 'Critical':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
    default:
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
  }
}

export function getOutcomeColor(outcome: string): string {
  switch (outcome) {
    case 'Trusted':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Needs Review':
      return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500';
    case 'Blocked':
      return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
    default:
      return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
  }
}

export function generateTrendData(): TrendDataPoint[] {
  return [
    { date: '2024-08-01', trust_index: 72, release: 'v1.0' },
    { date: '2024-09-01', trust_index: 78, release: 'v1.1' },
    { date: '2024-10-01', trust_index: 82, release: 'v1.2' },
    { date: '2025-10-11', trust_index: 85, release: 'v2.0' }
  ];
}

export function exportTrustMatrix(matrixRows: TrustMatrixRow[]): string {
  return JSON.stringify(matrixRows, null, 2);
}

export function exportTrustReport(report: ApplicationTrustReport): string {
  return JSON.stringify(report, null, 2);
}

export function exportAuditBundle(
  matrixRows: TrustMatrixRow[],
  report: ApplicationTrustReport,
  evidencePackages: any[]
): string {
  const bundle = {
    trust_matrix: matrixRows,
    trust_report: report,
    evidence_packages: evidencePackages,
    exported_at: new Date().toISOString()
  };

  return JSON.stringify(bundle, null, 2);
}
