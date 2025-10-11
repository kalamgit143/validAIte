import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  FolderOpen,
  Shield,
  Database,
  Target,
  TrendingUp,
  Eye,
  Lock,
  Plus
} from 'lucide-react';

interface EvidenceSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
  status: 'complete' | 'partial' | 'empty';
}

const EvidencePackGenerator: React.FC = () => {
  const [packName, setPackName] = useState('');
  const [archetype, setArchetype] = useState('A3');
  const [riskTier, setRiskTier] = useState('HIGH');

  const evidenceSections: EvidenceSection[] = [
    {
      id: '01_policy',
      name: '01. Policy & Governance',
      icon: <Shield className="w-5 h-5" />,
      description: 'AI governance policies, risk tiering, DPIA/TRA documents',
      items: [
        'AI Governance Policy v2.1',
        'Model Risk Tiering Framework',
        'Data Privacy Impact Assessment',
        'Threat & Risk Assessment'
      ],
      status: 'complete'
    },
    {
      id: '02_design',
      name: '02. Architecture & Design',
      icon: <Database className="w-5 h-5" />,
      description: 'Architecture diagrams, VAM manifest, model/data cards',
      items: [
        'System Architecture Diagram',
        'ValidAIte Application Manifest (VAM)',
        'Model Card - GPT-4',
        'Data Card - Knowledge Base'
      ],
      status: 'complete'
    },
    {
      id: '03_controls',
      name: '03. Control Implementation',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'ACC checklist with implementation proofs',
      items: [
        'ACC Checklist - 10/10 controls implemented',
        'RAG-01: Chunking Policy v1.0',
        'RAG-02: Retriever Quality SLA',
        'SEC-02: Access Control Matrix',
        'OBS-02: Telemetry Configuration'
      ],
      status: 'complete'
    },
    {
      id: '04_tevv',
      name: '04. TEVV Execution',
      icon: <Target className="w-5 h-5" />,
      description: 'Test manifests, raw results, evaluator configs',
      items: [
        'TEVV Pack A3_BASE_V1',
        'Groundedness Test Results',
        'Citation Accuracy Report',
        'Retrieval Quality Metrics',
        'Safety Battery Results'
      ],
      status: 'complete'
    },
    {
      id: '05_metrics',
      name: '05. Metrics & Analysis',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Metric roll-ups, trend charts, slice analysis',
      items: [
        'Metrics Summary Dashboard',
        'Groundedness: 0.92 (≥0.90 ✓)',
        'Citation Accuracy: 0.96 (≥0.95 ✓)',
        'R@5: 0.87 (≥0.85 ✓)',
        'Freshness: 2.1 days (≤3 ✓)',
        'Fairness Slice Analysis'
      ],
      status: 'complete'
    },
    {
      id: '06_authorization',
      name: '06. Authorization & Sign-offs',
      icon: <Lock className="w-5 h-5" />,
      description: 'Authorization decisions, sign-offs, exceptions',
      items: [
        'Authorization Decision: APPROVED',
        'Risk Owner Sign-off',
        'Technical Lead Approval',
        'Valid Until: 2024-12-31'
      ],
      status: 'partial'
    },
    {
      id: '07_monitoring',
      name: '07. Monitoring & Continuous Assurance',
      icon: <Eye className="w-5 h-5" />,
      description: 'SLOs, alert configs, incident logs, retraining records',
      items: [
        'Monitoring Plan v1.0',
        'SLO Dashboard Configuration',
        'Alert Rules: 4 configured',
        'Incident Log (empty)',
        'Re-index Schedule: Weekly'
      ],
      status: 'complete'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'partial':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'empty':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5" />;
      case 'partial':
        return <Clock className="w-5 h-5" />;
      case 'empty':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const overallCompleteness = evidenceSections.filter(s => s.status === 'complete').length / evidenceSections.length * 100;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <FolderOpen className="w-8 h-8 text-blue-600" />
          <span>Evidence Pack Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate regulator-ready evidence packages with 7-section structure
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pack Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pack Name
            </label>
            <input
              type="text"
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              placeholder="e.g., Insurance_Policy_Advisor_v1"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Archetype
            </label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Tier
            </label>
            <select
              value={riskTier}
              onChange={(e) => setRiskTier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="LOW">LOW</option>
              <option value="MODERATE">MODERATE</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Completeness</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {evidenceSections.filter(s => s.status === 'complete').length} of {evidenceSections.length} sections complete
            </p>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {overallCompleteness.toFixed(0)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallCompleteness}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {evidenceSections.map(section => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {section.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(section.status)}`}>
                {getStatusIcon(section.status)}
                <span className="capitalize">{section.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2 text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 text-sm font-medium flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Ready to Generate
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All sections are ready. Generate the complete evidence pack.
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium">
          <Download className="w-5 h-5" />
          <span>Generate Evidence Pack</span>
        </button>
      </div>
    </div>
  );
};

export default EvidencePackGenerator;
