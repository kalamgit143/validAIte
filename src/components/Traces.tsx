import React, { useState } from 'react';
import { AITrace, ApplicationMetadata, UserInteractionContext, ModelParameters, OperationalMetrics, SafetyCompliance } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Zap,
  DollarSign,
  Activity
} from 'lucide-react';

const Traces: React.FC = () => {
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null);
  const [expandedTrace, setExpandedTrace] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const traces: AITrace[] = [
    {
      id: 'trace_001',
      trace_id: 'tr_abc123def456',
      timestamp: '2024-01-15T10:30:45Z',
      
      application_metadata: {
        app_name: 'Customer Support Bot',
        app_type: 'chatbot',
        version: '2.1.0',
        environment: 'prod',
        region: 'us'
      },
      
      user_context: {
        session_id: 'session_abc123',
        user_id: 'user_12345',
        persona: 'customer',
        device_platform: 'web',
        language_locale: 'en-US'
      },
      
      prompts: {
        user_prompt: "How can I reset my password?",
        system_prompt: "You are a helpful customer support assistant.",
        prompt_template_id: "support_template_v1"
      },
      
      model_config: {
        model: 'gpt-4',
        provider: 'openai',
        parameters: {
          temperature: 0.7,
          max_tokens: 500,
          top_p: 1.0
        }
      },
      
      model_response: {
        response: "To reset your password, please follow these steps:\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your email for reset instructions",
        output_format: 'text'
      },
      
      operational_metrics: {
        latency_ms: 1200,
        tokens_in: 150,
        tokens_out: 200,
        total_tokens: 350,
        cost_usd: 0.045,
        retries: 0
      },
      
      safety_compliance: {
        toxicity_score: 0.1,
        pii_detected: false,
        jailbreak_detected: false,
        bias_flags: []
      },
      
      evaluation_results: {
        quality_score: 94,
        toxicity_score: 0.1,
        bias_score: 0.2,
        coherence_score: 96,
        factuality_score: 92,
        relevance_score: 95
      },
      
      system_metadata: {
        trace_id: 'tr_abc123def456',
        api_endpoint: '/api/v1/chat',
        sdk_version: '1.2.0',
        infra: {
          container_id: 'container_789',
          region: 'us-west-2'
        }
      }
    },
    {
      id: 'trace_002',
      trace_id: 'tr_def456ghi789',
      timestamp: '2024-01-15T10:28:12Z',
      
      application_metadata: {
        app_name: 'Content Generator',
        app_type: 'rag',
        version: '1.3.0',
        environment: 'prod',
        region: 'eu'
      },
      
      user_context: {
        session_id: 'session_def456',
        user_id: 'user_67890',
        persona: 'agent',
        device_platform: 'web',
        language_locale: 'en-GB'
      },
      
      prompts: {
        user_prompt: "Write a blog post about AI ethics",
        system_prompt: "You are an expert content writer.",
        guardrails_applied: ['toxicity_filter', 'bias_detector']
      },
      
      model_config: {
        model: 'claude-3',
        provider: 'anthropic',
        parameters: {
          temperature: 0.8,
          max_tokens: 2000
        }
      },
      
      model_response: {
        response: "",
        output_format: 'text'
      },
      
      operational_metrics: {
        latency_ms: 2500,
        tokens_in: 100,
        tokens_out: 0,
        total_tokens: 100,
        cost_usd: 0.023,
        retries: 1,
        error_codes: ['RATE_LIMIT_EXCEEDED']
      },
      
      safety_compliance: {
        toxicity_score: 0.0,
        pii_detected: false,
        jailbreak_detected: false
      },
      
      system_metadata: {
        trace_id: 'tr_def456ghi789',
        api_endpoint: '/api/v1/generate',
        sdk_version: '1.2.0',
        infra: {
          container_id: 'container_456',
          region: 'eu-central-1'
        }
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredTraces = traces.filter(trace => {
    const matchesStatus = filterStatus === 'all' || trace.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      trace.input?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trace.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trace.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Traces</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor and debug your GenAI application requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search traces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Time Range</span>
          </button>

          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Traces List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTraces.map((trace) => (
            <div key={trace.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => setExpandedTrace(expandedTrace === trace.id ? null : trace.id)}
                    className="mt-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {expandedTrace === trace.id ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(trace.status)}
                      <span className="font-medium text-gray-900 dark:text-white">{trace.application}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trace.status)}`}>
                        {trace.status}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(trace.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-mono">{trace.id}</span> • 
                      <span className="ml-1">User: {trace.user}</span> • 
                      <span className="ml-1">Model: {trace.model}</span>
                    </div>
                    
                    <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <strong>Input:</strong> {trace.input}
                    </div>
                    
                    {trace.output && (
                      <div className="text-sm text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-2">
                        <strong>Output:</strong> {trace.output}
                      </div>
                    )}
                    
                    {trace.error && (
                      <div className="text-sm text-red-800 dark:text-red-200 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mt-2">
                        <strong>Error:</strong> {trace.error}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{(trace.operational_metrics.latency_ms / 1000).toFixed(1)}s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${trace.operational_metrics.cost_usd.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>{trace.operational_metrics.total_tokens} tokens</span>
                  </div>
                  <button
                    onClick={() => setSelectedTrace(trace.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedTrace === trace.id && (
                <div className="mt-4 pl-8 space-y-4">
                  {/* Application Metadata */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Application Context</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">App Type</div>
                        <div className="font-medium text-gray-900 dark:text-white capitalize">{trace.application_metadata.app_type}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Environment</div>
                        <div className="font-medium text-gray-900 dark:text-white uppercase">{trace.application_metadata.environment}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Version</div>
                        <div className="font-medium text-gray-900 dark:text-white">{trace.application_metadata.version}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Region</div>
                        <div className="font-medium text-gray-900 dark:text-white uppercase">{trace.application_metadata.region}</div>
                      </div>
                    </div>
                  </div>

                  {/* Model Configuration */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Model Configuration</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-500">Model:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">{trace.model_config.model}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-500">Provider:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">{trace.model_config.provider}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-500">Temperature:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">{trace.model_config.parameters.temperature}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Safety & Compliance */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Safety & Compliance</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Toxicity</div>
                        <div className="font-medium text-gray-900 dark:text-white">{trace.safety_compliance.toxicity_score}%</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">PII Detected</div>
                        <div className="font-medium text-gray-900 dark:text-white">{trace.safety_compliance.pii_detected ? 'Yes' : 'No'}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Jailbreak</div>
                        <div className="font-medium text-gray-900 dark:text-white">{trace.safety_compliance.jailbreak_detected ? 'Detected' : 'Clean'}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-500">Bias Flags</div>
                        <div className="font-medium text-gray-900 dark:text-white">{trace.safety_compliance.bias_flags?.length || 0}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      User: {trace.user_context.user_id} • {trace.application_metadata.app_type} • {trace.application_metadata.environment}
                    </div>
                  </div>
                  
                  {/* Evaluations */}
                  {trace.evaluation_results && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evaluation Scores</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.entries(trace.evaluation_results).filter(([_, score]) => score !== undefined).map(([metric, score]) => (
                          <div key={metric} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                              {metric.replace('_score', '').replace('_', ' ')}
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {typeof score === 'number' ? score.toFixed(1) : score}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input/Output */}
                  <div className="space-y-3">
                    <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <strong>Input:</strong> {trace.prompts.user_prompt}
                    </div>
                    
                    {trace.model_response.response && (
                      <div className="text-sm text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <strong>Output:</strong> {trace.model_response.response}
                      </div>
                    )}
                    
                    {trace.operational_metrics.error_codes && trace.operational_metrics.error_codes.length > 0 && (
                      <div className="text-sm text-red-800 dark:text-red-200 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <strong>Error:</strong> {trace.operational_metrics.error_codes.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* System Metadata */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">System Metadata</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {JSON.stringify({
                          trace_id: trace.system_metadata.trace_id,
                          api_endpoint: trace.system_metadata.api_endpoint,
                          sdk_version: trace.system_metadata.sdk_version,
                          infrastructure: trace.system_metadata.infra
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Traces;