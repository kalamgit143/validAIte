import React, { useState, useMemo } from 'react';
import {
  Play,
  Copy,
  Save,
  Share2,
  Settings,
  Zap,
  Brain,
  MessageSquare,
  Code,
  FileText,
  Image,
  Mic,
  Video,
  RefreshCw,
  Download,
  Upload,
  History,
  Bookmark,
  Target,
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertCircle,
  Loader,
  BarChart3,
  PieChart,
  Clock,
  TrendingUp
} from 'lucide-react';
import {
  TrustScoreResult,
  ExecutionProgress,
  simulateTestExecution,
  generateTrustIndexReport,
  exportTrustScoreResults,
  exportTrustIndexReport,
  aggregateByMetric,
  getStatusColor,
  getScoreColor
} from '../utils/trustScoreComputation';
import TestScriptsGeneration from './TestScriptsGeneration';

const Playground: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'playground' | 'execution' | 'scripts'>('playground');

  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [activeTab, setActiveTab] = useState('text');

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

  const models = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', type: 'text' },
    { id: 'gpt-4-vision', name: 'GPT-4 Vision', provider: 'OpenAI', type: 'multimodal' },
    { id: 'claude-3', name: 'Claude-3', provider: 'Anthropic', type: 'text' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', type: 'text' },
    { id: 'dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', type: 'image' },
    { id: 'whisper', name: 'Whisper', provider: 'OpenAI', type: 'audio' }
  ];

  const promptTemplates = [
    {
      category: 'Customer Support',
      templates: [
        { name: 'Help Desk Response', prompt: 'You are a helpful customer support agent. Respond to this customer inquiry: {query}' },
        { name: 'Troubleshooting Guide', prompt: 'Provide step-by-step troubleshooting for: {issue}' }
      ]
    },
    {
      category: 'Content Creation',
      templates: [
        { name: 'Blog Post Writer', prompt: 'Write a comprehensive blog post about: {topic}' },
        { name: 'Social Media Post', prompt: 'Create an engaging social media post about: {topic}' }
      ]
    },
    {
      category: 'Code Generation',
      templates: [
        { name: 'Function Generator', prompt: 'Write a {language} function that: {description}' },
        { name: 'Code Review', prompt: 'Review this code and suggest improvements: {code}' }
      ]
    }
  ];

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

  const handleRun = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResponse("This is a simulated response from the AI model. The playground allows you to test different prompts, models, and parameters in real-time to optimize your GenAI applications.");
      setIsLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    console.log('Saving configuration...');
  };

  const handleShare = () => {
    console.log('Sharing session...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Test Lab
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Interactive AI testing playground and automated trust score computation
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveMainTab('playground')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeMainTab === 'playground'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Interactive Playground</span>
            </div>
            {activeMainTab === 'playground' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveMainTab('execution')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeMainTab === 'execution'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Trust Score Execution</span>
            </div>
            {activeMainTab === 'execution' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveMainTab('scripts')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeMainTab === 'scripts'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Test Scripts Generation</span>
            </div>
            {activeMainTab === 'scripts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"></div>
            )}
          </button>
        </div>
      </div>

      {/* Playground Tab Content */}
      {activeMainTab === 'playground' && (
        <>
          <div className="flex items-center space-x-3 flex-wrap">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
            </button>
            <button onClick={handleShare} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Configuration</h3>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prompt
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter your prompt here..."
                      className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleRun}
                      disabled={isLoading || !prompt}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Run Prompt</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {response && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{response}</p>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Response Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <span>Latency: 1.2s</span>
                      <span>Tokens: 124</span>
                      <span>Quality: 94%</span>
                      <span>Toxicity: 0.1%</span>
                      <span>Fairness: 92%</span>
                      <span>Safety: 98%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Temperature: {temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Tokens: {maxTokens}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="100"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Top P: {topP}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={topP}
                      onChange={(e) => setTopP(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prompt Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promptTemplates.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.templates.map((template, templateIndex) => (
                      <button
                        key={templateIndex}
                        onClick={() => setPrompt(template.prompt)}
                        className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{template.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">{template.prompt}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {response && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trust Evaluation Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Accuracy', score: 94, color: 'emerald' },
                  { name: 'Fairness', score: 92, color: 'blue' },
                  { name: 'Robustness', score: 89, color: 'purple' },
                  { name: 'Transparency', score: 87, color: 'yellow' },
                  { name: 'Privacy', score: 96, color: 'green' },
                  { name: 'Safety', score: 98, color: 'red' }
                ].map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`text-2xl font-bold text-${metric.color}-600 dark:text-${metric.color}-400`}>
                      {metric.score}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{metric.name}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">Overall Trust Score: 92.7%</span>
                </div>
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  High trust score indicates reliable, safe, and fair AI behavior suitable for production deployment.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Trust Score Execution Tab Content */}
      {activeMainTab === 'execution' && (
        <>
          <div className="flex items-center justify-between">
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
                          <div className={`text-sm font-bold ${getScoreColor(result.score, result.threshold)}`}>
                            {result.score.toFixed(3)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{result.threshold.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{result.execution_time_ms}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{result.evaluation_type}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Test Scripts Generation Tab Content */}
      {activeMainTab === 'scripts' && (
        <TestScriptsGeneration />
      )}
    </div>
  );
};

export default Playground;
