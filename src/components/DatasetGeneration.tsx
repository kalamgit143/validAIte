import React, { useState, useMemo } from 'react';
import {
  Database,
  Plus,
  X,
  Download,
  Sparkles,
  Edit2,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  FileText,
  BarChart3,
  Upload,
  Eye,
  Target,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';
import {
  DatasetEntry,
  DifficultyLevel,
  DatasetSource,
  ReviewStatus,
  DIFFICULTY_LEVELS,
  DATASET_SOURCES,
  REVIEW_STATUSES,
  generateDatasetForUseCase,
  calculateDatasetQuality,
  exportDatasetToJSON,
  exportDatasetToJSONL,
  exportDatasetToCSV,
  validateDatasetEntry,
  getDifficultyColor,
  getSourceColor
} from '../utils/datasetGeneration';

const DatasetGeneration: React.FC = () => {
  const mockUseCases = [
    { name: 'Policy Premium Inquiry', description: 'Users asking about insurance premiums' },
    { name: 'Coverage Details', description: 'Questions about policy coverage' },
    { name: 'Customer Support', description: 'General customer service queries' }
  ];

  const mockMetrics = [
    { metric_name: 'Faithfulness Score' },
    { metric_name: 'Groundedness Score' },
    { metric_name: 'Freshness Index' },
    { metric_name: 'Privacy Leakage Rate' },
    { metric_name: 'PII Detection Rate' },
    { metric_name: 'Context Relevance' },
    { metric_name: 'Citation Accuracy' },
    { metric_name: 'Intent Routing Accuracy' }
  ];

  const mockRisks = [
    { risk_name: 'Hallucination', category: 'Accuracy' },
    { risk_name: 'KB Drift', category: 'Robustness' },
    { risk_name: 'PII Exposure', category: 'Privacy' }
  ];

  const [datasets, setDatasets] = useState<DatasetEntry[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('All');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQualityMetrics, setShowQualityMetrics] = useState(true);

  const [newEntry, setNewEntry] = useState<Partial<DatasetEntry>>({
    use_case: '',
    input_prompt: '',
    expected_response: '',
    metric_tags: [],
    difficulty_level: 'Medium',
    source: 'Manual',
    review_status: 'Draft',
    reviewer_name: '',
    notes: ''
  });

  const mockArchetypeData = {
    application_name: 'Insurance Policy Assistant',
    archetype_code: 'A2-RAG-ENT-PII',
    risk_tier: 'High',
    domain: 'insurance'
  };

  const generateDatasets = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedDatasets: DatasetEntry[] = [];

      mockUseCases.forEach(useCase => {
        const entries = generateDatasetForUseCase(
          useCase.name,
          mockRisks,
          mockMetrics,
          mockArchetypeData.domain
        );

        entries.forEach((entry, index) => {
          generatedDatasets.push({
            id: `dataset-${Date.now()}-${generatedDatasets.length}`,
            use_case: entry.use_case || useCase.name,
            input_prompt: entry.input_prompt || '',
            expected_response: entry.expected_response || '',
            metric_tags: entry.metric_tags || [],
            difficulty_level: entry.difficulty_level || 'Medium',
            source: entry.source || 'Generated',
            review_status: entry.review_status || 'Draft',
            reviewer_name: entry.reviewer_name || '',
            created_at: new Date().toISOString(),
            notes: entry.notes || ''
          });
        });
      });

      setDatasets(generatedDatasets);
      setIsGenerating(false);
    }, 3000);
  };

  const addCustomEntry = () => {
    const errors = validateDatasetEntry(newEntry);
    if (errors.length > 0) {
      alert(`Validation errors:\n${errors.join('\n')}`);
      return;
    }

    const entry: DatasetEntry = {
      id: `dataset-${Date.now()}`,
      use_case: newEntry.use_case || '',
      input_prompt: newEntry.input_prompt || '',
      expected_response: newEntry.expected_response || '',
      metric_tags: newEntry.metric_tags || [],
      difficulty_level: newEntry.difficulty_level || 'Medium',
      source: newEntry.source || 'Manual',
      review_status: newEntry.review_status || 'Draft',
      reviewer_name: newEntry.reviewer_name || '',
      created_at: new Date().toISOString(),
      notes: newEntry.notes || ''
    };

    setDatasets([...datasets, entry]);
    setNewEntry({
      use_case: '',
      input_prompt: '',
      expected_response: '',
      metric_tags: [],
      difficulty_level: 'Medium',
      source: 'Manual',
      review_status: 'Draft',
      reviewer_name: '',
      notes: ''
    });
  };

  const updateEntry = (id: string, updates: Partial<DatasetEntry>) => {
    setDatasets(datasets.map(entry => (entry.id === id ? { ...entry, ...updates } : entry)));
  };

  const deleteEntry = (id: string) => {
    setDatasets(datasets.filter(entry => entry.id !== id));
  };

  const exportDataset = (format: 'json' | 'jsonl' | 'csv') => {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'json':
        content = exportDatasetToJSON(datasets);
        filename = `evaluation-dataset-${mockArchetypeData.archetype_code}.json`;
        mimeType = 'application/json';
        break;
      case 'jsonl':
        content = exportDatasetToJSONL(datasets);
        filename = `evaluation-dataset-${mockArchetypeData.archetype_code}.jsonl`;
        mimeType = 'application/x-ndjson';
        break;
      case 'csv':
        content = exportDatasetToCSV(datasets);
        filename = `evaluation-dataset-${mockArchetypeData.archetype_code}.csv`;
        mimeType = 'text/csv';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const filteredDatasets = useMemo(() => {
    if (selectedUseCase === 'All') return datasets;
    return datasets.filter(entry => entry.use_case === selectedUseCase);
  }, [datasets, selectedUseCase]);

  const qualityMetrics = useMemo(() => {
    return calculateDatasetQuality(
      datasets,
      mockUseCases.map(uc => uc.name),
      mockRisks
    );
  }, [datasets]);

  const datasetsByUseCase = useMemo(() => {
    const grouped: Record<string, number> = {};
    mockUseCases.forEach(uc => {
      grouped[uc.name] = datasets.filter(d => d.use_case === uc.name).length;
    });
    return grouped;
  }, [datasets]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Use Case Dataset Generation
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Generate testable evaluation datasets with prompts and expected responses
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {datasets.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Dataset Entries</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {qualityMetrics.approved_entries}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Approved</div>
          </div>
        </div>
      </div>

      {/* Functional Use Case Catalog */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
            Functional Use Case Catalog
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          As a NIST RMF and TEVV expert, define functional use cases that represent real-world scenarios your GenAI application will handle. These use cases drive comprehensive testing, evaluation, validation, and verification activities.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-2 border-purple-200 dark:border-purple-700 mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-purple-600" />
            <span>Define New Use Case</span>
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Use Case Title (e.g., Policy Premium Inquiry)"
                className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
              <select
                className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              >
                <option value="high">High Priority</option>
                <option value="medium" selected>Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <textarea
              placeholder="Use case description - Describe the functional scenario in detail"
              rows={2}
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Expected behavior - What should the AI system do in this scenario?"
              rows={2}
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Use Case to Catalog</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {mockUseCases.map((useCase, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-bold">
                      UC-{String(index + 1).padStart(2, '0')}
                    </span>
                    <h5 className="font-bold text-gray-900 dark:text-white">
                      {useCase.name}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Display */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Inputs from Previous Stages</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Application</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockArchetypeData.application_name}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Archetype</div>
            <div className="font-bold text-gray-900 dark:text-white font-mono">{mockArchetypeData.archetype_code}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Use Cases</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockUseCases.length}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Metrics</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockMetrics.length}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Risks</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockRisks.length}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Use Cases:</span>
          <div className="flex flex-wrap gap-2">
            {mockUseCases.map(uc => (
              <span key={uc.name} className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold">
                {uc.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 flex-wrap">
        <button
          onClick={generateDatasets}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Generating Datasets...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate via LLM</span>
            </>
          )}
        </button>

        <button
          onClick={() => exportDataset('json')}
          disabled={datasets.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={() => exportDataset('jsonl')}
          disabled={datasets.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export JSONL</span>
        </button>

        <button
          onClick={() => exportDataset('csv')}
          disabled={datasets.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Quality Metrics Dashboard */}
      {showQualityMetrics && datasets.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Dataset Quality Metrics</span>
            </h3>
            <button
              onClick={() => setShowQualityMetrics(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Use Case Coverage */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">Use Case Coverage</div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {qualityMetrics.use_case_coverage.toFixed(0)}%
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Target: ≥ 90%</div>
            </div>

            {/* Risk Coverage */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-700 dark:text-green-400 mb-1">Risk Coverage</div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                {qualityMetrics.risk_coverage.toFixed(0)}%
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">Target: ≥ 80%</div>
            </div>

            {/* Difficulty Distribution */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-sm text-purple-700 dark:text-purple-400 mb-2">Difficulty Balance</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700 dark:text-green-400">Easy</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.difficulty_distribution.Easy}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-700 dark:text-yellow-400">Medium</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.difficulty_distribution.Medium}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-700 dark:text-red-400">Hard</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.difficulty_distribution.Hard}</span>
                </div>
              </div>
            </div>

            {/* Source Distribution */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-sm text-orange-700 dark:text-orange-400 mb-2">Source Mix</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-700 dark:text-purple-400">Generated</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.source_distribution.Generated}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-700 dark:text-blue-400">SME</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.source_distribution.SME}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-700 dark:text-cyan-400">KB</span>
                  <span className="font-bold text-gray-900 dark:text-white">{qualityMetrics.source_distribution.KB}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Use Case List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-cyan-600" />
              <span>Use Cases</span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedUseCase('All')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedUseCase === 'All'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All</span>
                  <span className="text-sm">{datasets.length}</span>
                </div>
              </button>
              {mockUseCases.map(uc => (
                <button
                  key={uc.name}
                  onClick={() => setSelectedUseCase(uc.name)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedUseCase === uc.name
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{uc.name}</span>
                    <span className="text-sm">{datasetsByUseCase[uc.name] || 0}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dataset Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Database className="w-5 h-5 text-cyan-600" />
                <span>Evaluation Dataset ({filteredDatasets.length} Entries)</span>
              </h3>
            </div>

            {filteredDatasets.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No dataset entries yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Click "Generate via LLM" or add custom entries</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Use Case</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Input Prompt</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Expected Response</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Metrics</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Difficulty</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredDatasets.map(entry => (
                      <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">{entry.use_case}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-900 dark:text-white line-clamp-3">{entry.input_prompt}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{entry.expected_response}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {entry.metric_tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {entry.metric_tags.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                                +{entry.metric_tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(entry.difficulty_level)}`}>
                            {entry.difficulty_level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getSourceColor(entry.source)}`}>
                            {entry.source}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            entry.review_status === 'Approved' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                            entry.review_status === 'Reviewed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {entry.review_status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateEntry(entry.id, { review_status: 'Approved' })}
                              className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
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

          {/* Add Custom Entry */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-xl border-2 border-cyan-200 dark:border-cyan-800 p-6">
            <h3 className="font-bold text-cyan-900 dark:text-cyan-100 mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Custom Dataset Entry</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newEntry.use_case}
                onChange={e => setNewEntry({ ...newEntry, use_case: e.target.value })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Use Case</option>
                {mockUseCases.map(uc => (
                  <option key={uc.name} value={uc.name}>{uc.name}</option>
                ))}
              </select>

              <select
                value={newEntry.difficulty_level}
                onChange={e => setNewEntry({ ...newEntry, difficulty_level: e.target.value as DifficultyLevel })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={newEntry.source}
                onChange={e => setNewEntry({ ...newEntry, source: e.target.value as DatasetSource })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {DATASET_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>

              <input
                type="text"
                value={newEntry.reviewer_name}
                onChange={e => setNewEntry({ ...newEntry, reviewer_name: e.target.value })}
                placeholder="Reviewer Name"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <textarea
                value={newEntry.input_prompt}
                onChange={e => setNewEntry({ ...newEntry, input_prompt: e.target.value })}
                placeholder="Input Prompt (User Query)"
                rows={3}
                className="md:col-span-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <textarea
                value={newEntry.expected_response}
                onChange={e => setNewEntry({ ...newEntry, expected_response: e.target.value })}
                placeholder="Expected Response (Golden Answer)"
                rows={3}
                className="md:col-span-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric Tags (Select multiple)
                </label>
                <div className="flex flex-wrap gap-2">
                  {mockMetrics.map(metric => {
                    const isSelected = newEntry.metric_tags?.includes(metric.metric_name);
                    return (
                      <button
                        key={metric.metric_name}
                        onClick={() => {
                          const tags = newEntry.metric_tags || [];
                          if (isSelected) {
                            setNewEntry({ ...newEntry, metric_tags: tags.filter(t => t !== metric.metric_name) });
                          } else {
                            setNewEntry({ ...newEntry, metric_tags: [...tags, metric.metric_name] });
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {metric.metric_name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={addCustomEntry}
                className="md:col-span-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 font-medium shadow-lg"
              >
                Add Entry
              </button>
            </div>
          </div>

          {/* Continue Button */}
          {datasets.length > 0 && (
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Dataset Generation Complete</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {datasets.length} entries • {qualityMetrics.approved_entries} approved • {qualityMetrics.use_case_coverage.toFixed(0)}% coverage
                  </p>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                <span>Continue to Test Case Creation</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetGeneration;
