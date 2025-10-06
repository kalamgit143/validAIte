import React, { useState } from 'react';
import {
  Package,
  Shield,
  CheckCircle,
  AlertTriangle,
  Database,
  Target,
  Eye,
  FileText,
  ChevronRight,
  Download,
  Play
} from 'lucide-react';
import { tevvPacks, getTEVVPacksByArchetype } from '../data/tevvPacks';
import { controls } from '../data/controls';
import { TEVVPack } from '../types/tevv';

const TEVVPackViewer: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<TEVVPack | null>(null);
  const [filterArchetype, setFilterArchetype] = useState<string>('all');

  const archetypes = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'];

  const filteredPacks = filterArchetype === 'all'
    ? tevvPacks
    : getTEVVPacksByArchetype(filterArchetype);

  const riskColors = {
    'LOW': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'MODERATE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'HIGH': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'CRITICAL': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  const getControlDetails = (controlId: string) => {
    return controls.find(c => c.id === controlId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Package className="w-8 h-8 text-blue-600" />
              <span>TEVV Pack Library</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Test, Evaluation, Validation & Verification packs for archetype-specific assurance
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Archetype:
          </label>
          <select
            value={filterArchetype}
            onChange={(e) => setFilterArchetype(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Archetypes</option>
            {archetypes.map(arch => (
              <option key={arch} value={arch}>{arch}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredPacks.length} pack(s) available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredPacks.map(pack => (
            <div
              key={pack.packId}
              onClick={() => setSelectedPack(pack)}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg border cursor-pointer transition-all ${
                selectedPack?.packId === pack.packId
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pack.packId}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Archetype {pack.archetype}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${riskColors[pack.riskTier]}`}>
                  {pack.riskTier}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Controls</span>
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pack.controls.required.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>Tests</span>
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pack.tests.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                    <Database className="w-4 h-4" />
                    <span>Datasets</span>
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pack.datasets.evalSets.length}
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full px-3 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPack && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedPack.packId}
              </h2>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[selectedPack.riskTier]}`}>
                  {selectedPack.riskTier} Risk
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Archetype {selectedPack.archetype}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Execute Pack</span>
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export YAML</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Required Controls ({selectedPack.controls.required.length})</span>
                </h3>
                <div className="space-y-2">
                  {selectedPack.controls.required.map(controlId => {
                    const control = getControlDetails(controlId);
                    return (
                      <div
                        key={controlId}
                        className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-medium text-blue-900 dark:text-blue-300 text-sm">
                              {controlId}
                            </span>
                            {control && (
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {control.name}
                              </p>
                            )}
                          </div>
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-green-600" />
                  <span>Evaluation Datasets ({selectedPack.datasets.evalSets.length})</span>
                </h3>
                <div className="space-y-2">
                  {selectedPack.datasets.evalSets.map(dataset => (
                    <div
                      key={dataset.name}
                      className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
                    >
                      <div className="font-medium text-green-900 dark:text-green-300 text-sm">
                        {dataset.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                        {dataset.source}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span>TEVV Tests ({selectedPack.tests.length})</span>
                </h3>
                <div className="space-y-2">
                  {selectedPack.tests.map(test => (
                    <div
                      key={test.id}
                      className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-orange-900 dark:text-orange-300 text-sm">
                            {test.id}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Type: {test.type}
                          </div>
                        </div>
                      </div>
                      {test.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {test.metrics.map(metric => (
                            <span
                              key={metric}
                              className="px-2 py-0.5 bg-orange-200 dark:bg-orange-900/40 text-orange-900 dark:text-orange-300 rounded text-xs font-mono"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Thresholds ({Object.keys(selectedPack.thresholds).length})</span>
                </h3>
                <div className="space-y-1">
                  {Object.entries(selectedPack.thresholds).map(([metric, threshold]) => (
                    <div
                      key={metric}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm"
                    >
                      <span className="font-mono text-gray-700 dark:text-gray-300">{metric}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{threshold}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Evidence Capture</span>
              </h3>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                <div className="space-y-2">
                  {selectedPack.evidence.capture.map(item => (
                    <div key={item} className="flex items-center space-x-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Store: </span>
                  <span className="text-xs font-mono text-purple-900 dark:text-purple-300">
                    {selectedPack.evidence.store}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Eye className="w-5 h-5 text-cyan-600" />
                <span>Monitoring Alerts</span>
              </h3>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded border border-cyan-200 dark:border-cyan-800">
                <div className="space-y-2">
                  {selectedPack.monitoring.alerts.map((alert, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Authorization Rule</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 p-3 rounded">
              {selectedPack.authorization.rule}
            </p>
            {selectedPack.authorization.blockers.length > 0 && (
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Blockers:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPack.authorization.blockers.map(blocker => (
                    <span
                      key={blocker}
                      className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded text-xs font-medium"
                    >
                      {blocker}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TEVVPackViewer;
