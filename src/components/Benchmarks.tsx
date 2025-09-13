import React, { useState } from 'react';
import { 
  Target, 
  Trophy, 
  BarChart3, 
  TrendingUp,
  Play,
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Benchmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const benchmarkResults = [
    {
      id: 'bench_001',
      name: 'MMLU Benchmark',
      description: 'Massive Multitask Language Understanding',
      category: 'knowledge',
      models: [
        { name: 'GPT-4', score: 86.4, rank: 1 },
        { name: 'Claude-3', score: 84.2, rank: 2 },
        { name: 'Gemini Pro', score: 81.9, rank: 3 },
        { name: 'GPT-3.5', score: 70.0, rank: 4 }
      ],
      lastRun: '2024-01-15T10:00:00Z',
      status: 'completed',
      samples: 14042
    },
    {
      id: 'bench_002',
      name: 'HumanEval',
      description: 'Code generation and programming tasks',
      category: 'coding',
      models: [
        { name: 'GPT-4', score: 67.0, rank: 1 },
        { name: 'Claude-3', score: 61.4, rank: 2 },
        { name: 'Gemini Pro', score: 58.5, rank: 3 },
        { name: 'GPT-3.5', score: 48.1, rank: 4 }
      ],
      lastRun: '2024-01-14T16:30:00Z',
      status: 'completed',
      samples: 164
    },
    {
      id: 'bench_003',
      name: 'HellaSwag',
      description: 'Commonsense reasoning about everyday situations',
      category: 'reasoning',
      models: [
        { name: 'GPT-4', score: 95.3, rank: 1 },
        { name: 'Claude-3', score: 93.8, rank: 2 },
        { name: 'Gemini Pro', score: 92.1, rank: 3 },
        { name: 'GPT-3.5', score: 85.5, rank: 4 }
      ],
      lastRun: '2024-01-13T14:20:00Z',
      status: 'completed',
      samples: 10042
    },
    {
      id: 'bench_004',
      name: 'TruthfulQA',
      description: 'Truthfulness in question answering',
      category: 'truthfulness',
      models: [
        { name: 'Claude-3', score: 83.2, rank: 1 },
        { name: 'GPT-4', score: 81.5, rank: 2 },
        { name: 'Gemini Pro', score: 78.9, rank: 3 },
        { name: 'GPT-3.5', score: 68.7, rank: 4 }
      ],
      lastRun: '2024-01-12T11:45:00Z',
      status: 'completed',
      samples: 817
    }
  ];

  const customBenchmarks = [
    {
      id: 'custom_001',
      name: 'Customer Support Quality',
      description: 'Evaluate customer support response quality',
      category: 'custom',
      metrics: ['helpfulness', 'accuracy', 'empathy'],
      models: ['GPT-4', 'Claude-3'],
      status: 'running',
      progress: 65,
      samples: 500
    },
    {
      id: 'custom_002',
      name: 'Content Safety Evaluation',
      description: 'Assess content safety across different scenarios',
      category: 'safety',
      metrics: ['toxicity', 'bias', 'harmful_content'],
      models: ['GPT-4', 'GPT-3.5', 'Claude-3'],
      status: 'scheduled',
      scheduledFor: '2024-01-16T09:00:00Z',
      samples: 1000
    }
  ];

  const leaderboard = [
    {
      model: 'GPT-4',
      provider: 'OpenAI',
      overallScore: 82.6,
      benchmarks: {
        'MMLU': 86.4,
        'HumanEval': 67.0,
        'HellaSwag': 95.3,
        'TruthfulQA': 81.5
      },
      rank: 1,
      change: 0
    },
    {
      model: 'Claude-3',
      provider: 'Anthropic',
      overallScore: 80.7,
      benchmarks: {
        'MMLU': 84.2,
        'HumanEval': 61.4,
        'HellaSwag': 93.8,
        'TruthfulQA': 83.2
      },
      rank: 2,
      change: 0
    },
    {
      model: 'Gemini Pro',
      provider: 'Google',
      overallScore: 77.9,
      benchmarks: {
        'MMLU': 81.9,
        'HumanEval': 58.5,
        'HellaSwag': 92.1,
        'TruthfulQA': 78.9
      },
      rank: 3,
      change: 1
    },
    {
      model: 'GPT-3.5',
      provider: 'OpenAI',
      overallScore: 68.1,
      benchmarks: {
        'MMLU': 70.0,
        'HumanEval': 48.1,
        'HellaSwag': 85.5,
        'TruthfulQA': 68.7
      },
      rank: 4,
      change: -1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'running': return <Play className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'knowledge': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'coding': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'reasoning': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'truthfulness': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'safety': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'custom': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRankChange = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Benchmarks</h2>
          <p className="text-gray-600 dark:text-gray-400">Compare model performance across standardized benchmarks</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Benchmark</span>
        </button>
      </div>

      {/* Benchmark Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Benchmarks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{benchmarkResults.length + customBenchmarks.length}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Models Tested</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Performer</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">GPT-4</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">77.3%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['results', 'leaderboard', 'custom'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search benchmarks..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>All Categories</option>
                  <option>Knowledge</option>
                  <option>Coding</option>
                  <option>Reasoning</option>
                  <option>Truthfulness</option>
                  <option>Safety</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Benchmark Results */}
              <div className="space-y-6">
                {benchmarkResults.map((benchmark) => (
                  <div key={benchmark.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benchmark.name}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(benchmark.category)}`}>
                            {benchmark.category}
                          </div>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(benchmark.status)}`}>
                            {getStatusIcon(benchmark.status)}
                            <span className="capitalize">{benchmark.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{benchmark.description}</p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {benchmark.samples.toLocaleString()} samples • Last run: {new Date(benchmark.lastRun).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Model Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {benchmark.models.map((model, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{model.name}</h4>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500 dark:text-gray-500">#{model.rank}</span>
                              {model.rank === 1 && <Trophy className="w-4 h-4 text-yellow-500" />}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{model.score}%</div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${model.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Overall Score
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        MMLU
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        HumanEval
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        HellaSwag
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        TruthfulQA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {leaderboard.map((model, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">#{model.rank}</span>
                            {getRankChange(model.change)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{model.model}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{model.overallScore}%</div>
                        </td>
                        {Object.values(model.benchmarks).map((score, scoreIndex) => (
                          <td key={scoreIndex} className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{score}%</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4">
              {customBenchmarks.map((benchmark) => (
                <div key={benchmark.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benchmark.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(benchmark.category)}`}>
                          {benchmark.category}
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(benchmark.status)}`}>
                          {getStatusIcon(benchmark.status)}
                          <span className="capitalize">{benchmark.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{benchmark.description}</p>
                      
                      {benchmark.status === 'running' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>{benchmark.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${benchmark.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {benchmark.metrics.map((metric, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {metric.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Models: {benchmark.models.join(', ')} • {benchmark.samples.toLocaleString()} samples
                        {benchmark.scheduledFor && (
                          <span> • Scheduled: {new Date(benchmark.scheduledFor).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Benchmark Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Custom Benchmark</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Set up a custom benchmark to evaluate model performance
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Benchmark Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Custom Benchmark"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Custom</option>
                      <option>Knowledge</option>
                      <option>Coding</option>
                      <option>Reasoning</option>
                      <option>Safety</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe what this benchmark evaluates..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* Dataset Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Dataset *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>customer_support_v2 (1,000 samples)</option>
                    <option>code_reviews_v3 (800 samples)</option>
                    <option>content_quality_v1 (500 samples)</option>
                    <option>Upload new dataset</option>
                  </select>
                </div>
              </div>

              {/* Models Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Models to Benchmark</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {['GPT-4', 'GPT-3.5 Turbo', 'Claude-3', 'Gemini Pro'].map(model => (
                    <label key={model} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{model}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Evaluation Metrics */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Evaluation Metrics</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {['Quality Score', 'Accuracy', 'Helpfulness', 'Relevance', 'Coherence', 'Creativity'].map(metric => (
                    <label key={metric} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated runtime: 2-4 hours
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Create Benchmark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Benchmarks;