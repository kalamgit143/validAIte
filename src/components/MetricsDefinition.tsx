import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Plus,
  X,
  Download,
  Sparkles,
  Eye,
  Edit2,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Target,
  FileText,
  BarChart3,
  Zap,
  BookOpen,
  Shield
} from 'lucide-react';
import {
  TrustMetric,
  MetricType,
  EvidenceType,
  MetricStatus,
  METRIC_TYPES,
  EVIDENCE_TYPES,
  METRIC_STATUSES,
  METRIC_OWNER_ROLES,
  TRUST_METRIC_LIBRARY,
  generateMetricsFromRisk,
  validateThreshold,
  calculateTotalWeight,
  normalizeWeights,
  getMetricsByCategory
} from '../utils/trustMetrics';

interface MetricsDefinitionProps {
  risks?: any[];
}

const MetricsDefinition: React.FC<MetricsDefinitionProps> = ({ risks: inputRisks }) => {
  const mockRisks = [
    {
      id: 'risk-1',
      category: 'Accuracy',
      risk_name: 'Hallucination',
      description: 'Model may generate incorrect or fabricated information',
      severity: 'High',
      likelihood: 'Frequent',
      score: 9
    },
    {
      id: 'risk-2',
      category: 'Robustness',
      risk_name: 'KB Drift',
      description: 'Knowledge base becomes outdated',
      severity: 'Medium',
      likelihood: 'Frequent',
      score: 6
    },
    {
      id: 'risk-3',
      category: 'Privacy',
      risk_name: 'PII Exposure',
      description: 'Chatbot may expose personally identifiable information',
      severity: 'High',
      likelihood: 'Rare',
      score: 3
    },
    {
      id: 'risk-4',
      category: 'Security',
      risk_name: 'Prompt Injection',
      description: 'Malicious users may inject prompts to bypass guardrails',
      severity: 'High',
      likelihood: 'Occasional',
      score: 6
    }
  ];

  const displayRisks = inputRisks || mockRisks;

  const [metrics, setMetrics] = useState<TrustMetric[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [newMetric, setNewMetric] = useState<Partial<TrustMetric>>({
    risk_name: '',
    metric_name: '',
    metric_type: 'Quantitative',
    definition: '',
    formula: '',
    threshold: '',
    evidence_type: 'LLM + Code',
    weight: 0.5,
    owner_role: 'QA Engineer',
    status: 'Draft',
    category: 'Accuracy'
  });

  const mockArchetypeData = {
    application_name: 'Insurance Policy Assistant',
    archetype_code: 'A2-RAG-ENT-PII',
    risk_tier: 'High',
    domain: 'insurance'
  };

  const generateMetrics = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedMetrics: TrustMetric[] = [];

      displayRisks.forEach(risk => {
        const riskMetrics = generateMetricsFromRisk(risk);
        riskMetrics.forEach((metric, index) => {
          generatedMetrics.push({
            id: `metric-${Date.now()}-${generatedMetrics.length}`,
            risk_name: metric.risk_name || risk.risk_name,
            metric_name: metric.metric_name || '',
            metric_type: metric.metric_type || 'Quantitative',
            definition: metric.definition || '',
            formula: metric.formula || '',
            threshold: metric.threshold || '0.8',
            evidence_type: metric.evidence_type || 'LLM + Code',
            weight: metric.weight || 0.5,
            owner_role: metric.owner_role || 'QA Engineer',
            status: metric.status || 'Draft',
            category: metric.category || risk.category
          });
        });
      });

      setMetrics(normalizeWeights(generatedMetrics));
      setIsGenerating(false);
    }, 2500);
  };

  const addCustomMetric = () => {
    if (newMetric.metric_name && newMetric.risk_name) {
      const metric: TrustMetric = {
        id: `metric-${Date.now()}`,
        risk_name: newMetric.risk_name,
        metric_name: newMetric.metric_name,
        metric_type: newMetric.metric_type as MetricType,
        definition: newMetric.definition || '',
        formula: newMetric.formula || '',
        threshold: newMetric.threshold || '0.8',
        evidence_type: newMetric.evidence_type as EvidenceType,
        weight: newMetric.weight || 0.5,
        owner_role: newMetric.owner_role || 'QA Engineer',
        status: newMetric.status as MetricStatus,
        category: newMetric.category || 'Accuracy'
      };

      setMetrics(normalizeWeights([...metrics, metric]));
      setNewMetric({
        risk_name: '',
        metric_name: '',
        metric_type: 'Quantitative',
        definition: '',
        formula: '',
        threshold: '',
        evidence_type: 'LLM + Code',
        weight: 0.5,
        owner_role: 'QA Engineer',
        status: 'Draft',
        category: 'Accuracy'
      });
    }
  };

  const updateMetric = (id: string, updates: Partial<TrustMetric>) => {
    setMetrics(normalizeWeights(metrics.map(metric =>
      metric.id === id ? { ...metric, ...updates } : metric
    )));
  };

  const deleteMetric = (id: string) => {
    setMetrics(normalizeWeights(metrics.filter(metric => metric.id !== id)));
  };

  const exportMetricLibrary = () => {
    const library = {
      application: mockArchetypeData.application_name,
      archetype: mockArchetypeData.archetype_code,
      generated_date: new Date().toISOString(),
      trust_metrics: metrics.map(m => ({
        risk: m.risk_name,
        metric: m.metric_name,
        threshold: m.threshold,
        evidence_type: m.evidence_type,
        weight: m.weight,
        category: m.category
      }))
    };

    const blob = new Blob([JSON.stringify(library, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-metrics-${mockArchetypeData.archetype_code}.json`;
    a.click();
  };

  const filteredMetrics = useMemo(() => {
    if (selectedCategory === 'All') return metrics;
    return metrics.filter(metric => metric.category === selectedCategory);
  }, [metrics, selectedCategory]);

  const metricsByCategory = useMemo(() => getMetricsByCategory(metrics), [metrics]);

  const categoryList = useMemo(() => {
    const categories = new Set(displayRisks.map(r => r.category));
    return ['All', ...Array.from(categories)];
  }, [displayRisks]);

  const totalWeight = useMemo(() => calculateTotalWeight(metrics), [metrics]);

  const getEvidenceColor = (evidence: EvidenceType) => {
    if (evidence.includes('Code')) return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
    if (evidence.includes('LLM')) return 'text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 border-purple-500';
    if (evidence.includes('Human')) return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Trust Metrics Definition
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Transform risks into measurable, quantifiable trust metrics with thresholds
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {metrics.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Metrics Defined</div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${totalWeight === 1 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {(totalWeight * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Weight</div>
          </div>
        </div>
      </div>

      {/* Context Display */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Inputs from Previous Stages</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Application</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockArchetypeData.application_name}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Archetype</div>
            <div className="font-bold text-gray-900 dark:text-white font-mono">{mockArchetypeData.archetype_code}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Risk Tier</div>
            <div className="font-bold text-red-600 dark:text-red-400">{mockArchetypeData.risk_tier}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Risks Identified</div>
            <div className="font-bold text-gray-900 dark:text-white">{displayRisks.length}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Risk Register:</span>
          <div className="flex flex-wrap gap-2">
            {displayRisks.map(risk => (
              <span key={risk.id} className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold">
                {risk.risk_name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={generateMetrics}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Generating Metrics...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate via LLM</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <BookOpen className="w-5 h-5" />
          <span>{showLibrary ? 'Hide' : 'View'} Metric Library</span>
        </button>

        <button
          onClick={exportMetricLibrary}
          disabled={metrics.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export Metric Library</span>
        </button>
      </div>

      {/* Metric Library Reference */}
      {showLibrary && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Predefined Trust Metric Library (NIST RMF & EU AI Act Aligned)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {TRUST_METRIC_LIBRARY.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.risk_name}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded">{item.risk_category}</span>
                </div>
                <div className="space-y-2">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">{metric.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.definition}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{metric.default_threshold}</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded">
                          {metric.evidence_type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Risk List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-600" />
              <span>Risk Register</span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All Risks</span>
                  <span className="text-sm">{displayRisks.length}</span>
                </div>
              </button>
              {categoryList.filter(c => c !== 'All').map(category => {
                const count = displayRisks.filter(r => r.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm">{count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Weight Distribution</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(metricsByCategory).map(([category, catMetrics]) => {
                const categoryWeight = catMetrics.reduce((sum, m) => sum + m.weight, 0);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{(categoryWeight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${categoryWeight * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metrics Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Trust Metrics Library ({filteredMetrics.length} Metrics)</span>
              </h3>
            </div>

            {filteredMetrics.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No metrics defined yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Click "Generate via LLM" or add custom metrics</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Risk</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Metric</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Threshold</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Evidence</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMetrics.map(metric => (
                      <tr key={metric.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-white">{metric.risk_name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{metric.category}</div>
                        </td>
                        <td className="px-6 py-4">
                          {editingMetric === metric.id ? (
                            <input
                              type="text"
                              value={metric.metric_name}
                              onChange={e => updateMetric(metric.id, { metric_name: e.target.value })}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            />
                          ) : (
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{metric.metric_name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{metric.definition}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                            {metric.metric_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {editingMetric === metric.id ? (
                            <input
                              type="text"
                              value={metric.threshold}
                              onChange={e => updateMetric(metric.id, { threshold: e.target.value })}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm font-mono"
                            />
                          ) : (
                            <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{metric.threshold}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getEvidenceColor(metric.evidence_type)}`}>
                            {metric.evidence_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {editingMetric === metric.id ? (
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="1"
                              value={metric.weight}
                              onChange={e => updateMetric(metric.id, { weight: parseFloat(e.target.value) })}
                              className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            />
                          ) : (
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                                  style={{ width: `${metric.weight * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{(metric.weight * 100).toFixed(0)}%</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            metric.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                            metric.status === 'Reviewed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {metric.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {editingMetric === metric.id ? (
                              <button
                                onClick={() => setEditingMetric(null)}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingMetric(metric.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteMetric(metric.id)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add Custom Metric */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border-2 border-green-200 dark:border-green-800 p-6">
            <h3 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Custom Metric</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newMetric.risk_name}
                onChange={e => setNewMetric({ ...newMetric, risk_name: e.target.value, category: displayRisks.find(r => r.risk_name === e.target.value)?.category || 'Accuracy' })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Risk</option>
                {displayRisks.map(risk => (
                  <option key={risk.id} value={risk.risk_name}>{risk.risk_name}</option>
                ))}
              </select>

              <input
                type="text"
                value={newMetric.metric_name}
                onChange={e => setNewMetric({ ...newMetric, metric_name: e.target.value })}
                placeholder="Metric Name"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <select
                value={newMetric.metric_type}
                onChange={e => setNewMetric({ ...newMetric, metric_type: e.target.value as MetricType })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {METRIC_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={newMetric.evidence_type}
                onChange={e => setNewMetric({ ...newMetric, evidence_type: e.target.value as EvidenceType })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {EVIDENCE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="text"
                value={newMetric.threshold}
                onChange={e => setNewMetric({ ...newMetric, threshold: e.target.value })}
                placeholder="Threshold (e.g., ≥ 0.8)"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={newMetric.weight}
                onChange={e => setNewMetric({ ...newMetric, weight: parseFloat(e.target.value) })}
                placeholder="Weight (0-1)"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <textarea
                value={newMetric.definition}
                onChange={e => setNewMetric({ ...newMetric, definition: e.target.value })}
                placeholder="Metric Definition"
                rows={2}
                className="md:col-span-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                value={newMetric.formula}
                onChange={e => setNewMetric({ ...newMetric, formula: e.target.value })}
                placeholder="Formula (optional)"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />

              <button
                onClick={addCustomMetric}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg"
              >
                Add Metric
              </button>
            </div>
          </div>

          {/* Continue Button */}
          {metrics.length > 0 && (
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Metrics Definition Complete</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {metrics.length} metrics defined • Total weight: {(totalWeight * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                <span>Continue to Use Case Dataset Generation</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsDefinition;
