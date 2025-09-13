import React, { useState } from 'react';
import { Experiment, ExperimentVariant, ExperimentResults } from '../types';
import { Target, PlayCircle, Pause, BarChart, Users, Calendar } from 'lucide-react';

const Experiments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('running');

  const experiments: { running: Experiment[], completed: Experiment[] } = {
    running: [
      {
        id: 'exp_001',
        name: 'Creative vs Instructional Prompts',
        description: 'Testing different prompt styles for content generation',
        hypothesis: 'Creative prompts will generate more engaging content',
        status: 'running',
        experiment_config: {
          variants: [
            {
              id: 'var_001',
              name: 'Creative Prompt',
              description: 'Uses creative and engaging language',
              configuration: { prompt_style: 'creative', temperature: 0.9 },
              is_control: false
            },
            {
              id: 'var_002', 
              name: 'Instructional Prompt',
              description: 'Uses clear, instructional language',
              configuration: { prompt_style: 'instructional', temperature: 0.3 },
              is_control: true
            }
          ],
          traffic_allocation: { 'var_001': 0.5, 'var_002': 0.5 },
          success_metrics: ['quality_score', 'engagement_score'],
          guardrail_metrics: ['toxicity_score', 'bias_score']
        },
        statistical_config: {
          significance_level: 0.05,
          power: 0.8,
          minimum_effect_size: 0.1,
          sample_size_per_variant: 1000
        }
      },
      {
        id: 'exp_002',
        name: 'Model Temperature Optimization',
        description: 'Optimizing temperature parameter for best quality/creativity balance',
        hypothesis: 'Temperature 0.7 will provide optimal balance',
        status: 'running',
        experiment_config: {
          variants: [
            {
              id: 'var_003',
              name: 'Temperature 0.5',
              description: 'Conservative temperature setting',
              configuration: { temperature: 0.5 },
              is_control: false
            },
            {
              id: 'var_004',
              name: 'Temperature 0.7', 
              description: 'Balanced temperature setting',
              configuration: { temperature: 0.7 },
              is_control: true
            },
            {
              id: 'var_005',
              name: 'Temperature 0.9',
              description: 'Creative temperature setting', 
              configuration: { temperature: 0.9 },
              is_control: false
            }
          ],
          traffic_allocation: { 'var_003': 0.33, 'var_004': 0.34, 'var_005': 0.33 },
          success_metrics: ['quality_score', 'creativity_score', 'coherence_score'],
          guardrail_metrics: ['toxicity_score']
        },
        statistical_config: {
          significance_level: 0.05,
          power: 0.8,
          minimum_effect_size: 0.05,
          sample_size_per_variant: 800
        }
      }
    ],
    completed: [
      {
        id: 'exp_003',
        name: 'GPT-4 vs Claude-3 Comparison',
        description: 'Comparing model performance for customer support',
        hypothesis: 'GPT-4 will outperform Claude-3 in customer support scenarios',
        status: 'completed',
        experiment_config: {
          variants: [
            {
              id: 'var_006',
              name: 'GPT-4',
              description: 'OpenAI GPT-4 model',
              configuration: { model: 'gpt-4', provider: 'openai' },
              is_control: true
            },
            {
              id: 'var_007',
              name: 'Claude-3',
              description: 'Anthropic Claude-3 model',
              configuration: { model: 'claude-3', provider: 'anthropic' },
              is_control: false
            }
          ],
          traffic_allocation: { 'var_006': 0.5, 'var_007': 0.5 },
          success_metrics: ['quality_score', 'helpfulness_score'],
          guardrail_metrics: ['toxicity_score', 'bias_score']
        },
        statistical_config: {
          significance_level: 0.05,
          power: 0.8,
          minimum_effect_size: 0.1,
          sample_size_per_variant: 1500
        },
        results: {
          statistical_significance: true,
          p_value: 0.003,
          confidence_interval: [0.08, 0.16],
          effect_size: 0.12,
          variant_performance: {
            'var_006': {
              sample_size: 1500,
              conversion_rate: 0.94,
              mean_metric_value: 94.2,
              standard_error: 0.8,
              confidence_interval: [92.6, 95.8]
            },
            'var_007': {
              sample_size: 1500,
              conversion_rate: 0.89,
              mean_metric_value: 89.1,
              standard_error: 0.9,
              confidence_interval: [87.3, 90.9]
            }
          },
          winner: 'var_006',
          recommendation: 'Deploy GPT-4 variant to production'
        }
      },
      {
        id: 'exp_004',
        name: 'Response Length Optimization',
        description: 'Testing optimal response length for user satisfaction',
        hypothesis: 'Medium length responses will achieve highest user satisfaction',
        status: 'completed',
        experiment_config: {
          variants: [
            {
              id: 'var_008',
              name: 'Short',
              description: 'Concise responses under 100 words',
              configuration: { max_length: 100, response_style: 'concise' },
              is_control: false
            },
            {
              id: 'var_009',
              name: 'Medium',
              description: 'Balanced responses 100-300 words',
              configuration: { max_length: 300, response_style: 'balanced' },
              is_control: true
            },
            {
              id: 'var_010',
              name: 'Long',
              description: 'Detailed responses over 300 words',
              configuration: { max_length: 500, response_style: 'detailed' },
              is_control: false
            }
          ],
          traffic_allocation: { 'var_008': 0.33, 'var_009': 0.34, 'var_010': 0.33 },
          success_metrics: ['satisfaction_score', 'completion_rate'],
          guardrail_metrics: ['response_time', 'coherence_score']
        },
        statistical_config: {
          significance_level: 0.05,
          power: 0.8,
          minimum_effect_size: 0.08,
          sample_size_per_variant: 1200
        },
        results: {
          statistical_significance: true,
          p_value: 0.012,
          confidence_interval: [0.04, 0.12],
          effect_size: 0.08,
          variant_performance: {
            'var_008': {
              sample_size: 1200,
              conversion_rate: 0.82,
              mean_metric_value: 82.1,
              standard_error: 0.9,
              confidence_interval: [80.3, 83.9]
            },
            'var_009': {
              sample_size: 1200,
              conversion_rate: 0.89,
              mean_metric_value: 89.3,
              standard_error: 0.8,
              confidence_interval: [87.7, 90.9]
            },
            'var_010': {
              sample_size: 1200,
              conversion_rate: 0.85,
              mean_metric_value: 85.7,
              standard_error: 0.9,
              confidence_interval: [83.9, 87.5]
            }
          },
          winner: 'var_009',
          recommendation: 'Deploy Medium Length variant to production'
        }
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experiments</h2>
          <p className="text-gray-600 dark:text-gray-400">A/B test your prompts and models to optimize performance</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>New Experiment</span>
        </button>
      </div>

      {/* Experiment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Experiments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
            <PlayCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
            </div>
            <BarChart className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Improvement</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">+15%</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tested Variants</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Experiment Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['running', 'completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} ({experiments[tab as keyof typeof experiments].length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'running' ? (
            <div className="space-y-6">
              {experiments.running.map(experiment => (
                <div key={experiment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{experiment.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{experiment.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(experiment.status)}`}>
                          {experiment.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Variants: {experiment.experiment_config.variants.length}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Significance: {experiment.statistical_config.significance_level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <BarChart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hypothesis */}
                  <div className="mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Hypothesis:</strong> {experiment.hypothesis}
                      </div>
                    </div>
                  </div>

                  {/* Variants Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {experiment.experiment_config.variants.map((variant) => (
                      <div key={variant.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{variant.name}</h4>
                          {variant.is_control && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              Control
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{variant.description}</p>
                        <div className="space-y-2 text-sm">
                          {Object.entries(variant.configuration).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {typeof value === 'number' ? value : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Traffic Allocation */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Traffic Allocation</h4>
                    <div className="flex space-x-2">
                      {Object.entries(experiment.experiment_config.traffic_allocation).map(([variantId, allocation]) => {
                        const variant = experiment.experiment_config.variants.find(v => v.id === variantId);
                        return (
                          <div key={variantId} className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                            <div 
                              className="bg-blue-600 h-4 rounded-full flex items-center justify-center"
                              style={{ width: `${allocation * 100}%` }}
                            >
                              <span className="text-xs text-white font-medium">{(allocation * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {experiments.completed.map(experiment => (
                <div key={experiment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{experiment.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{experiment.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(experiment.status)}`}>
                          {experiment.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Variants: {experiment.experiment_config.variants.length}
                        </span>
                      </div>
                    </div>
                    {experiment.results && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Winner</div>
                        <div className="font-medium text-green-600 dark:text-green-400">
                          {experiment.experiment_config.variants.find(v => v.id === experiment.results?.winner)?.name}
                        </div>
                      </div>
                    )}
                  </div>

                  {experiment.results && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="text-sm text-green-600 dark:text-green-400">Effect Size</div>
                        <div className="font-bold text-green-700 dark:text-green-300">+{(experiment.results.effect_size * 100).toFixed(1)}%</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 dark:text-blue-400">P-Value</div>
                        <div className="font-bold text-blue-700 dark:text-blue-300">{experiment.results.p_value.toFixed(4)}</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="text-sm text-purple-600 dark:text-purple-400">Significance</div>
                        <div className="font-bold text-purple-700 dark:text-purple-300">
                          {experiment.results.statistical_significance ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Recommendation</div>
                        <div className="font-bold text-gray-900 dark:text-white text-xs">{experiment.results.recommendation}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiments;