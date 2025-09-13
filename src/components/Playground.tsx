import React, { useState } from 'react';
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
  Target
} from 'lucide-react';

const Playground: React.FC = () => {
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

  const handleRun = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("This is a simulated response from the AI model. The playground allows you to test different prompts, models, and parameters in real-time to optimize your GenAI applications.");
      setIsLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    // Save current configuration
    console.log('Saving configuration...');
  };

  const handleShare = () => {
    // Share playground session
    console.log('Sharing session...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Playground</h2>
          <p className="text-gray-600 dark:text-gray-400">Test and experiment with different AI models and prompts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Bookmark className="w-4 h-4" />
            <span>Templates</span>
          </button>
          <button 
            onClick={handleShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration</h3>
            
            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </option>
                ))}
              </select>
            </div>

            {/* Trust Evaluation Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trust Evaluation Mode
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Disabled</option>
                <option>Basic (Quality + Safety)</option>
                <option>Standard (Core Trust Metrics)</option>
                <option>Comprehensive (Full Trust Suite)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry Context
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>General</option>
                <option>Healthcare</option>
                <option>Financial Services</option>
                <option>Government</option>
                <option>Enterprise</option>
                <option>Retail</option>
              </select>
            </div>

            {/* Parameters */}
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency Penalty: {frequencyPenalty}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={frequencyPenalty}
                  onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Presence Penalty: {presencePenalty}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={presencePenalty}
                  onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Advanced Configuration */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Advanced Configuration</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stop Sequences
                  </label>
                  <input
                    type="text"
                    placeholder="\\n\\n, END, STOP"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Seed (for reproducibility)
                  </label>
                  <input
                    type="number"
                    placeholder="42"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button 
                onClick={handleSave}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Config</span>
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Load Config</span>
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Trust Benchmark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Playground */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8 px-6">
                {[
                  { id: 'text', label: 'Text', icon: MessageSquare },
                  { id: 'code', label: 'Code', icon: Code },
                  { id: 'image', label: 'Image', icon: Image },
                  { id: 'audio', label: 'Audio', icon: Mic },
                  { id: 'multimodal', label: 'Multimodal', icon: Video }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Input Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prompt
                  </label>
                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Use Template
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleRun}
                    disabled={!prompt || isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                      </>
                    )}
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Run with Trust Eval</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Clear
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tokens: {prompt.split(' ').length} | Est. Cost: $0.002 | Trust Eval: +$0.001
                </div>
              </div>

              {/* Response Section */}
              {response && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Response
                    </label>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{response}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>Response time: 1.2s | Tokens: 156 | Cost: $0.009 | Trust Score: 94%</span>
                    <div className="flex items-center space-x-4">
                      <span>Quality: 94%</span>
                      <span>Toxicity: 0.1%</span>
                      <span>Fairness: 92%</span>
                      <span>Safety: 98%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Templates */}
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

      {/* Trust Evaluation Results */}
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
    </div>
  );
};

export default Playground;