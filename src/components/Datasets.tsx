import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  BarChart3,
  Calendar,
  Tag,
  Users,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const Datasets: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const datasets = [
    {
      id: 'ds_001',
      name: 'Customer Support Conversations',
      description: 'Real customer support conversations with quality annotations',
      type: 'evaluation',
      format: 'jsonl',
      size: '2.3 MB',
      samples: 1000,
      columns: ['prompt', 'response', 'quality_score', 'toxicity_score', 'user_rating'],
      tags: ['customer-support', 'quality', 'production'],
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-14T09:15:00Z',
      createdBy: 'Sarah Chen',
      status: 'ready',
      usage: 15,
      lastUsed: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ds_002',
      name: 'Marketing Content Generation',
      description: 'Marketing copy samples with creativity and bias annotations',
      type: 'training',
      format: 'csv',
      size: '1.8 MB',
      samples: 750,
      columns: ['prompt', 'generated_content', 'creativity_score', 'bias_score', 'brand_alignment'],
      tags: ['marketing', 'creativity', 'bias-detection'],
      createdAt: '2024-01-08T11:20:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      createdBy: 'Mike Johnson',
      status: 'processing',
      usage: 8,
      lastUsed: '2024-01-14T15:20:00Z'
    },
    {
      id: 'ds_003',
      name: 'Code Review Comments',
      description: 'Code review suggestions with accuracy and helpfulness ratings',
      type: 'evaluation',
      format: 'jsonl',
      size: '4.1 MB',
      samples: 1500,
      columns: ['code_snippet', 'review_comment', 'accuracy', 'helpfulness', 'developer_rating'],
      tags: ['code-review', 'development', 'accuracy'],
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-13T12:30:00Z',
      createdBy: 'Alex Kim',
      status: 'ready',
      usage: 22,
      lastUsed: '2024-01-15T08:45:00Z'
    },
    {
      id: 'ds_004',
      name: 'Multilingual Translations',
      description: 'Translation pairs across 5 languages with fluency scores',
      type: 'benchmark',
      format: 'json',
      size: '6.7 MB',
      samples: 2000,
      columns: ['source_text', 'target_text', 'source_lang', 'target_lang', 'fluency', 'accuracy'],
      tags: ['translation', 'multilingual', 'fluency'],
      createdAt: '2024-01-03T13:15:00Z',
      updatedAt: '2024-01-11T10:20:00Z',
      createdBy: 'Emily Davis',
      status: 'ready',
      usage: 12,
      lastUsed: '2024-01-13T14:10:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'evaluation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'benchmark': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesTab = activeTab === 'all' || dataset.type === activeTab;
    const matchesSearch = searchQuery === '' || 
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Datasets</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage evaluation datasets and training data</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Dataset</span>
          </button>
        </div>
      </div>

      {/* Dataset Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Datasets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{datasets.length}</p>
            </div>
            <Database className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Samples</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {datasets.reduce((sum, ds) => sum + ds.samples, 0).toLocaleString()}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">14.9 MB</p>
            </div>
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Evaluations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
            <Users className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {['all', 'evaluation', 'training', 'benchmark'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDatasets.map((dataset) => (
          <div key={dataset.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{dataset.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.status)}`}>
                      {getStatusIcon(dataset.status)}
                      <span className="capitalize">{dataset.status}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(dataset.type)}`}>
                      {dataset.type}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dataset.description}</p>

            {/* Dataset Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{dataset.samples.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Samples</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{dataset.size}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{dataset.usage}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Usage</div>
              </div>
            </div>

            {/* Schema Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Schema</h4>
              <div className="flex flex-wrap gap-1">
                {dataset.columns.slice(0, 3).map((column, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded font-mono">
                    {column}
                  </span>
                ))}
                {dataset.columns.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                    +{dataset.columns.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {dataset.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <span>Created by {dataset.createdBy}</span>
                <span>Format: {dataset.format.toUpperCase()}</span>
              </div>
              <span>Last used: {new Date(dataset.lastUsed).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Dataset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Dataset</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Upload a new dataset for evaluation or training
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Dataset Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dataset Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My Evaluation Dataset"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dataset Type *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Evaluation</option>
                      <option>Training</option>
                      <option>Benchmark</option>
                      <option>Golden Reference</option>
                      <option>Bias Testing</option>
                      <option>Safety Testing</option>
                      <option>Robustness Testing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry Domain
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>General</option>
                      <option>Healthcare</option>
                      <option>Financial Services</option>
                      <option>Government</option>
                      <option>Enterprise</option>
                      <option>Retail</option>
                      <option>Education</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Sensitivity Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Public</option>
                      <option>Internal</option>
                      <option>Confidential</option>
                      <option>Restricted</option>
                      <option>Highly Sensitive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the dataset and its intended use..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">File Upload</h4>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop your dataset file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Supported formats: CSV, JSON, JSONL, Parquet, Excel (max 500MB)
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose File
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Sample Count
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Source
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Production Data</option>
                      <option>Synthetic Data</option>
                      <option>Public Dataset</option>
                      <option>Expert Curated</option>
                      <option>User Generated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schema Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Schema Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Input Column *
                    </label>
                    <input
                      type="text"
                      placeholder="prompt"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Output Column
                    </label>
                    <input
                      type="text"
                      placeholder="response"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ground Truth Columns (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="quality_score, toxicity_score, user_rating"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Demographic Columns (for bias testing)
                  </label>
                  <input
                    type="text"
                    placeholder="age_group, gender, location, ethnicity"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Context Columns (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="session_id, user_id, timestamp, metadata"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Data Quality Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Data Quality & Validation</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Auto-validate schema</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Check for duplicates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Validate data types</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">PII detection</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Min Quality Threshold (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={80}
                      min={0}
                      max={100}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Missing Values (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      min={0}
                      max={100}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Duplicate Rate (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={10}
                      min={0}
                      max={100}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tags and Metadata */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Tags and Metadata</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="evaluation, quality, production"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Collection Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Version
                    </label>
                    <input
                      type="text"
                      placeholder="v1.0"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Public dataset</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Auto-validate schema</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Enable versioning</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Require approval</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Lineage & Provenance
                  </label>
                  <textarea
                    placeholder="Describe the source, collection method, and any transformations applied to this data..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields • Data will be encrypted and access-controlled
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Validate Only
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload Dataset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datasets;