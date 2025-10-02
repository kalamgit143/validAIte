import React, { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Shield,
  Database,
  CheckCircle,
  Download,
  Eye,
  Lock,
  Calendar
} from 'lucide-react';

interface EvidenceArtifact {
  name: string;
  type: string;
  size: string;
  timestamp: string;
  signed: boolean;
}

interface EvidenceFolder {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  artifacts: EvidenceArtifact[];
  required: boolean;
  complete: boolean;
}

const EvidencePackManager: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const evidencePack: EvidenceFolder[] = [
    {
      id: '01_policy',
      name: '01_Policy',
      description: 'Governance policies, risk tiering, DPIA/TRA documents',
      icon: <Shield className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'AI_Governance_Policy_v2.pdf', type: 'PDF', size: '2.1 MB', timestamp: '2025-09-15', signed: true },
        { name: 'Risk_Tiering_Matrix.xlsx', type: 'Excel', size: '156 KB', timestamp: '2025-09-15', signed: true },
        { name: 'DPIA_Insurance_Policy_Advisor.pdf', type: 'PDF', size: '1.8 MB', timestamp: '2025-09-20', signed: true },
        { name: 'TRA_Assessment_Report.pdf', type: 'PDF', size: '987 KB', timestamp: '2025-09-22', signed: true }
      ]
    },
    {
      id: '02_design',
      name: '02_Design',
      description: 'Architecture, VAM manifest, model and data cards',
      icon: <Database className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'VAM_Insurance_Policy_Advisor.yaml', type: 'YAML', size: '12 KB', timestamp: '2025-10-01', signed: true },
        { name: 'Architecture_Diagram.pdf', type: 'PDF', size: '3.4 MB', timestamp: '2025-09-28', signed: true },
        { name: 'Model_Card_GPT4.pdf', type: 'PDF', size: '245 KB', timestamp: '2025-09-25', signed: true },
        { name: 'Data_Card_Policy_KB.pdf', type: 'PDF', size: '178 KB', timestamp: '2025-09-25', signed: true },
        { name: 'Integration_Spec_ServiceNow.pdf', type: 'PDF', size: '892 KB', timestamp: '2025-09-30', signed: true }
      ]
    },
    {
      id: '03_controls',
      name: '03_Controls',
      description: 'ACC checklist with implementation proofs',
      icon: <CheckCircle className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'ACC_Checklist_A3_A11_A9.csv', type: 'CSV', size: '34 KB', timestamp: '2025-10-01', signed: true },
        { name: 'RAG_Controls_Implementation.pdf', type: 'PDF', size: '1.2 MB', timestamp: '2025-09-29', signed: true },
        { name: 'Security_Controls_Proof.pdf', type: 'PDF', size: '956 KB', timestamp: '2025-09-29', signed: true },
        { name: 'Agent_Tool_Registry.json', type: 'JSON', size: '8 KB', timestamp: '2025-10-01', signed: true }
      ]
    },
    {
      id: '04_tevv',
      name: '04_TEVV',
      description: 'Test manifests, datasets, and raw results',
      icon: <FileText className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'TEVV_Pack_DEMO_A3_A11_A9_HIGH_V01.yaml', type: 'YAML', size: '18 KB', timestamp: '2025-10-02', signed: true },
        { name: 'groundedness_eval_dataset.json', type: 'JSON', size: '2.3 MB', timestamp: '2025-10-02', signed: true },
        { name: 'test_results_T-GRD-01.json', type: 'JSON', size: '456 KB', timestamp: '2025-10-02', signed: true },
        { name: 'test_results_T-RTR-01.json', type: 'JSON', size: '389 KB', timestamp: '2025-10-02', signed: true },
        { name: 'test_results_T-AGT-01.json', type: 'JSON', size: '124 KB', timestamp: '2025-10-02', signed: true },
        { name: 'test_results_T-AUD-01.json', type: 'JSON', size: '67 KB', timestamp: '2025-10-02', signed: true }
      ]
    },
    {
      id: '05_metrics',
      name: '05_Metrics',
      description: 'Metric summaries, trends, slice analysis',
      icon: <FileText className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'Metrics_Summary.csv', type: 'CSV', size: '14 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Metrics_Trend_Charts.pdf', type: 'PDF', size: '1.5 MB', timestamp: '2025-10-02', signed: true },
        { name: 'Slice_Fairness_Analysis.pdf', type: 'PDF', size: '876 KB', timestamp: '2025-10-02', signed: true }
      ]
    },
    {
      id: '06_authorization',
      name: '06_Authorization',
      description: 'Authorization records, sign-offs, exceptions',
      icon: <Lock className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'Authorization_Record_20251002.pdf', type: 'PDF', size: '234 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Sign_Off_Governance_Lead.pdf', type: 'PDF', size: '89 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Exceptions_Register.csv', type: 'CSV', size: '3 KB', timestamp: '2025-10-02', signed: true }
      ]
    },
    {
      id: '07_monitoring',
      name: '07_Monitoring',
      description: 'SLOs, alerts, incident logs, drift tracking',
      icon: <Calendar className="w-5 h-5" />,
      required: true,
      complete: true,
      artifacts: [
        { name: 'SLO_Configuration.yaml', type: 'YAML', size: '6 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Alert_Definitions.yaml', type: 'YAML', size: '8 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Incident_Log_Template.csv', type: 'CSV', size: '2 KB', timestamp: '2025-10-02', signed: true },
        { name: 'Drift_Monitoring_Config.json', type: 'JSON', size: '12 KB', timestamp: '2025-10-02', signed: true }
      ]
    }
  ];

  const selectedFolderData = evidencePack.find(f => f.id === selectedFolder);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence Pack Manager</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Regulator-ready evidence artifacts for Insurance Policy Advisor
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Complete Pack</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              {evidencePack.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedFolder === folder.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        folder.complete
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                      }`}>
                        {folder.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{folder.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{folder.artifacts.length} artifacts</p>
                      </div>
                    </div>
                    {folder.complete && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedFolderData ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFolderData.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedFolderData.description}</p>
                  </div>

                  <div className="space-y-2">
                    {selectedFolderData.artifacts.map((artifact, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{artifact.name}</p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-600 dark:text-gray-400">
                              <span>{artifact.type}</span>
                              <span>•</span>
                              <span>{artifact.size}</span>
                              <span>•</span>
                              <span>{artifact.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {artifact.signed && (
                            <div className="flex items-center space-x-1 text-xs text-green-600">
                              <Lock className="w-4 h-4" />
                              <span>Signed</span>
                            </div>
                          )}
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a folder to view artifacts</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">7/7</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Folders Complete</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{evidencePack.reduce((acc, f) => acc + f.artifacts.length, 0)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Artifacts</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Lock className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Digitally Signed</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Ready</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regulator Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidencePackManager;
