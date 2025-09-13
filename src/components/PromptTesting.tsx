import React, { useState } from 'react';
import { PlayCircle, Copy, Download, RefreshCw, Zap, AlertTriangle } from 'lucide-react';

const PromptTesting: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', cost: '$0.06/1K tokens' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', cost: '$0.002/1K tokens' },
    { id: 'claude-3', name: 'Claude-3', cost: '$0.008/1K tokens' },
    { id: 'gemini-pro', name: 'Gemini Pro', cost: '$0.0025/1K tokens' }
  ];

  const evaluationResults = {
    quality: 94,
    toxicity: 2,
    bias: 1,
    coherence: 96,
    factuality: 89,
    relevance: 92
  };

  const handleTest = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("This is a simulated response from the AI model. The prompt testing feature allows you to evaluate different prompts and compare their effectiveness across various metrics including quality, toxicity, bias, and coherence.");
      setIsLoading(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prompt Testing</h2>
          <p className="text-gray-600 dark:text-gray-400">Test and evaluate your prompts across different models</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Results</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prompt Input */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prompt Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.cost}
                    </option>
                  ))}
                </select>
              </div>

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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleTest}
                  disabled={!prompt || isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      <span>Test Prompt</span>
                    </>
                  )}
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Response */}
          {response && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">{response}</p>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Response time: 1.2s</span>
                <span>Tokens: 156 | Cost: $0.009</span>
              </div>
            </div>
          )}
        </div>

        {/* Evaluation Metrics */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evaluation Metrics</h3>
            
            <div className="space-y-4">
              {Object.entries(evaluationResults).map(([metric, score]) => (
                <div key={metric} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {metric}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(score)} ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Improvement Suggestions
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Consider adding more specific context to improve factuality score.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Run A/B Test</span>
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Save to Library
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Schedule Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptTesting;