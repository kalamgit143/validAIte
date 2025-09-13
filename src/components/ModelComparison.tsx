import React, { useState } from 'react';
import { Brain, TrendingUp, DollarSign, Clock, Zap } from 'lucide-react';

const ModelComparison: React.FC = () => {
  const [selectedModels, setSelectedModels] = useState(['gpt-4', 'claude-3', 'gemini-pro']);

  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      metrics: {
        quality: 95,
        speed: 1.2,
        cost: 0.06,
        toxicity: 0.5,
        coherence: 96,
        factuality: 92
      }
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      metrics: {
        quality: 88,
        speed: 0.8,
        cost: 0.002,
        toxicity: 1.2,
        coherence: 89,
        factuality: 85
      }
    },
    {
      id: 'claude-3',
      name: 'Claude-3',
      provider: 'Anthropic',
      metrics: {
        quality: 93,
        speed: 1.5,
        cost: 0.008,
        toxicity: 0.3,
        coherence: 94,
        factuality: 91
      }
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      metrics: {
        quality: 90,
        speed: 1.0,
        cost: 0.0025,
        toxicity: 0.8,
        coherence: 91,
        factuality: 89
      }
    }
  ];

  const metrics = [
    { key: 'quality', label: 'Quality Score', unit: '%', icon: TrendingUp },
    { key: 'speed', label: 'Avg Response Time', unit: 's', icon: Clock },
    { key: 'cost', label: 'Cost per 1K Tokens', unit: '$', icon: DollarSign },
    { key: 'toxicity', label: 'Toxicity Rate', unit: '%', icon: Zap, inverse: true },
    { key: 'coherence', label: 'Coherence', unit: '%', icon: Brain },
    { key: 'factuality', label: 'Factuality', unit: '%', icon: TrendingUp }
  ];

  const getScoreColor = (score: number, inverse = false) => {
    const threshold = inverse ? (score <= 1 ? 90 : score <= 2 ? 70 : 50) : (score >= 90 ? 90 : score >= 70 ? 70 : 50);
    if ((!inverse && score >= 90) || (inverse && score <= 1)) return 'bg-green-500';
    if ((!inverse && score >= 70) || (inverse && score <= 2)) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Model Comparison</h2>
          <p className="text-gray-600 dark:text-gray-400">Compare performance metrics across different AI models</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Comparison
        </button>
      </div>

      {/* Model Selection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Models to Compare</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedModels.includes(model.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{model.provider}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metric
                </th>
                {models.filter(m => selectedModels.includes(m.id)).map(model => (
                  <th key={model.id} className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {model.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <tr key={metric.key} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {metric.label}
                        </span>
                      </div>
                    </td>
                    {models.filter(m => selectedModels.includes(m.id)).map(model => {
                      const value = model.metrics[metric.key as keyof typeof model.metrics];
                      const isNumber = typeof value === 'number';
                      return (
                        <td key={model.id} className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {metric.unit === '$' ? '$' : ''}{isNumber ? value.toFixed(metric.unit === 's' || metric.unit === '$' ? 3 : 0) : value}{metric.unit !== '$' ? metric.unit : ''}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${getScoreColor(isNumber ? value : 0, metric.inverse)}`} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Radar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.filter(m => selectedModels.includes(m.id)).map(model => (
            <div key={model.id} className="text-center">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">{model.name}</h4>
              <div className="relative w-40 h-40 mx-auto">
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  <defs>
                    <pattern id={`grid-${model.id}`} patternUnits="userSpaceOnUse" width="32" height="32">
                      <circle cx="80" cy="80" r="20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                      <circle cx="80" cy="80" r="40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="160" height="160" fill={`url(#grid-${model.id})`}/>
                  <polygon
                    points={`80,${80 - (model.metrics.quality * 0.6)},${80 + (model.metrics.coherence * 0.6 * 0.866)},${80 + (model.metrics.coherence * 0.6 * 0.5)},${80 + (model.metrics.factuality * 0.6 * 0.866)},${80 - (model.metrics.factuality * 0.6 * 0.5)},80,${80 + (model.metrics.quality * 0.6)},${80 - (model.metrics.coherence * 0.6 * 0.866)},${80 - (model.metrics.coherence * 0.6 * 0.5)}`}
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Overall Score: {Math.round((model.metrics.quality + model.metrics.coherence + model.metrics.factuality) / 3)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;