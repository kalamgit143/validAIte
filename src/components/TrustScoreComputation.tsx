import React, { useState, useMemo, useEffect } from 'react';
import {
  Play,
  Download,
  CheckCircle,
  XCircle,
  ChevronRight,
  FileText,
  TrendingUp,
  AlertCircle,
  Loader,
  BarChart3,
  PieChart,
  Clock,
  Zap
} from 'lucide-react';
import {
  TrustScoreResult,
  TestStatus,
  ExecutionProgress,
  simulateTestExecution,
  generateTrustIndexReport,
  exportTrustScoreResults,
  exportTrustIndexReport,
  aggregateByMetric,
  getStatusColor,
  getScoreColor
} from '../utils/trustScoreComputation';

const TrustScoreComputation: React.FC = () => {
  const mockTestCases = [
    {
      id: 'TC-001',
      use_case: 'Policy Premium Inquiry',
      risk: 'Hallucination',
      metric: 'Faithfulness Score',
      threshold: 0.8,
      framework: 'Playwright'
    },
    {
      id: 'TC-002',
      use_case: 'Policy Premium Inquiry',
      risk: 'KB Drift',
      metric: 'Freshness Index',
      threshold: 0.9,
      framework: 'Playwright'
    },
    {
      id: 'TC-003',
      use_case: 'Coverage Details',
      risk: 'Hallucination',
      metric: 'Groundedness Score',
      threshold: 0.85,
      framework: 'RestAssured'
    }
  ];

  const mockDatasets = [
    {
      id: 'DS-001',
      input_prompt: 'What will be my premium for a policy of 10 lakhs sum assured at age 35?',
      expected_response: 'The premium for a 10 lakh policy at age 35 is approximately ₹12,500 per year.'
    },
    {
      id: 'DS-002',
      input_prompt: 'Can you tell me the last updated date of premium calculation data?',
      expected_response: 'The premium calculation data was last updated on 15th March 2025.'
    },
    {
      id: 'DS-003',
      input_prompt: 'What diseases are covered under critical illness insurance?',
      expected_response: 'Critical illness insurance typically covers heart attack, stroke, cancer, kidney failure, organ transplant, paralysis, and major surgeries as per policy terms.'
    }
  ];

  const mockAppSetup = {
    application_name: 'Insurance Policy Assistant',
    archetype_code: 'A2-RAG-ENT-PII'
  };

  const [results, setResults] = useState<TrustScoreResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState<ExecutionProgress>({
    total: 0,
    completed: 0,
    running: 0,
    passed: 0,
    failed: 0,
    percentage: 0
  });
  const [selectedResult, setSelectedResult] = useState<TrustScoreResult | null>(null);

  const executeAllTests = async () => {
    setIsExecuting(true);
    setResults([]);
    setProgress({
      total: mockTestCases.length,
      completed: 0,
      running: 0,
      passed: 0,
      failed: 0,
      percentage: 0
    });

    const newResults: TrustScoreResult[] = [];

    for (let i = 0; i < mockTestCases.length; i++) {
      const testCase = mockTestCases[i];
      const dataset = mockDatasets[i];

      setProgress(prev => ({
        ...prev,
        running: 1
      }));

      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = simulateTestExecution(testCase, dataset);
      const fullResult: TrustScoreResult = {
        id: `result-${Date.now()}-${i}`,
        ...result,
        timestamp: new Date().toISOString()
      } as TrustScoreResult;

      newResults.push(fullResult);
      setResults([...newResults]);

      setProgress(prev => ({
        ...prev,
        completed: i + 1,
        running: 0,
        passed: prev.passed + (fullResult.status === 'Pass' ? 1 : 0),
        failed: prev.failed + (fullResult.status === 'Fail' ? 1 : 0),
        percentage: ((i + 1) / mockTestCases.length) * 100
      }));
    }

    setIsExecuting(false);
  };

  const trustIndexReport = useMemo(() => {
    if (results.length === 0) return null;
    return generateTrustIndexReport(
      results,
      mockAppSetup.application_name,
      mockAppSetup.archetype_code
    );
  }, [results]);

  const metricAggregations = useMemo(() => {
    if (results.length === 0) return [];
    return aggregateByMetric(results);
  }, [results]);

  const downloadResults = () => {
    const data = exportTrustScoreResults(results);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-scores-${mockAppSetup.archetype_code}.json`;
    a.click();
  };

  const downloadReport = () => {
    if (!trustIndexReport) return;
    const data = exportTrustIndexReport(trustIndexReport);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-index-report-${mockAppSetup.archetype_code}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Trust Score Computation
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Execute test cases and compute trust metric scores with live monitoring
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {trustIndexReport?.overall_trust_index.toFixed(2) || '0.00'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Trust Index</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {trustIndexReport?.pass_rate.toFixed(0) || '0'}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
          </div>
        </div>
      </div>

      {/* Context Display */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Execution Configuration</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Application</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockAppSetup.application_name}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Archetype</div>
            <div className="font-bold text-gray-900 dark:text-white font-mono">{mockAppSetup.archetype_code}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Test Cases</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockTestCases.length}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Status</div>
            <div className={`font-bold ${isExecuting ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
              {isExecuting ? 'Running' : results.length > 0 ? 'Completed' : 'Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 flex-wrap">
        <button
          onClick={executeAllTests}
          disabled={isExecuting}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isExecuting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Executing Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Run All Tests</span>
            </>
          )}
        </button>

        <button
          onClick={downloadResults}
          disabled={results.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export Results</span>
        </button>

        <button
          onClick={downloadReport}
          disabled={!trustIndexReport}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Execution Progress */}
      {(isExecuting || results.length > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Execution Progress</h3>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {progress.percentage.toFixed(0)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.total}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">{progress.passed}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Passed</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-700 dark:text-red-400">{progress.failed}</div>
              <div className="text-xs text-red-600 dark:text-red-400">Failed</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{progress.running}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Running</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.completed}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* Metric Aggregations */}
      {metricAggregations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span>Metric Aggregations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metricAggregations.map((agg, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="font-bold text-purple-900 dark:text-purple-100 mb-2">{agg.metric_name}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-purple-700 dark:text-purple-400">Average</div>
                    <div className="font-bold text-gray-900 dark:text-white">{agg.average_score.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-700 dark:text-purple-400">Pass Rate</div>
                    <div className="font-bold text-gray-900 dark:text-white">{agg.pass_rate.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-700 dark:text-purple-400">Passed</div>
                    <div className="font-bold text-green-600 dark:text-green-400">{agg.passed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-700 dark:text-purple-400">Failed</div>
                    <div className="font-bold text-red-600 dark:text-red-400">{agg.failed}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Trust Score Results ({results.length})</span>
          </h3>
        </div>

        {results.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No results yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Click "Run All Tests" to execute test cases</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Use Case</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Metric</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Threshold</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Time (ms)</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Eval Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {results.map(result => (
                  <tr
                    key={result.id}
                    onClick={() => setSelectedResult(result)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{result.use_case}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{result.risk}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{result.metric}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-lg font-bold ${getScoreColor(result.score, result.threshold)}`}>
                        {result.score.toFixed(3)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{result.threshold}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{result.response_time_ms}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 dark:text-gray-400">{result.eval_type}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Test Result Details</h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Use Case</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedResult.use_case}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Risk</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedResult.risk}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Metric</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedResult.metric}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(selectedResult.status)}`}>
                    {selectedResult.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Score</div>
                  <div className={`text-3xl font-bold ${getScoreColor(selectedResult.score, selectedResult.threshold)}`}>
                    {selectedResult.score.toFixed(3)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Threshold</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedResult.threshold}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Time</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedResult.response_time_ms}ms
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expected Response</div>
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800 text-sm text-gray-900 dark:text-white">
                  {selectedResult.expected_response}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Actual Response</div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-gray-900 dark:text-white">
                  {selectedResult.actual_response}
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Evaluated at: {new Date(selectedResult.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {trustIndexReport && (
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Trust Score Computation Complete</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {trustIndexReport.total_tests} tests executed • Trust Index: {trustIndexReport.overall_trust_index.toFixed(3)} • Pass Rate: {trustIndexReport.pass_rate.toFixed(0)}%
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
            <span>Continue to Explainability & Evidence</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TrustScoreComputation;
