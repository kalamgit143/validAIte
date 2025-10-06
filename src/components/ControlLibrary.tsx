import React, { useState } from 'react';
import {
  Shield,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  GitBranch,
  Activity,
  Layers,
  Settings,
  Search
} from 'lucide-react';
import { controls } from '../data/controls';

const ControlLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');

  const categoryIcons: Record<string, React.ReactNode> = {
    GOV: <Shield className="w-5 h-5" />,
    DAT: <Database className="w-5 h-5" />,
    MOD: <GitBranch className="w-5 h-5" />,
    SEC: <Lock className="w-5 h-5" />,
    SAF: <AlertTriangle className="w-5 h-5" />,
    FAI: <CheckCircle className="w-5 h-5" />,
    EXPL: <Eye className="w-5 h-5" />,
    OBS: <Activity className="w-5 h-5" />,
    REL: <Layers className="w-5 h-5" />,
    RAG: <Database className="w-5 h-5" />,
    SCH: <Settings className="w-5 h-5" />,
    AGT: <Activity className="w-5 h-5" />,
    AUT: <Settings className="w-5 h-5" />,
    INT: <Layers className="w-5 h-5" />,
    MON: <Eye className="w-5 h-5" />
  };

  const categoryColors: Record<string, string> = {
    GOV: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    DAT: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    MOD: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    SEC: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    SAF: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    FAI: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    EXPL: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    OBS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    REL: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    RAG: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    SCH: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400',
    AGT: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    AUT: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    INT: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
    MON: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
  };

  const families = Array.from(new Set(controls.map(c => c.family)));

  const filteredControls = controls.filter(control => {
    const matchesSearch = searchTerm === '' ||
      control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFamily = selectedFamily === 'all' || control.family === selectedFamily;

    return matchesSearch && matchesFamily;
  });

  const groupedControls = filteredControls.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {} as Record<string, typeof controls>);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span>Assurance Control Catalogue (ACC)</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive control library for AI assurance and governance
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search controls by ID, name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFamily('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFamily === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({controls.length})
          </button>
          {families.map(family => {
            const count = controls.filter(c => c.family === family).length;
            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFamily === family
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {family} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {Object.entries(groupedControls).map(([category, categoryControls]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded ${categoryColors[category]}`}>
                {categoryIcons[category]}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {categoryControls[0].family}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {categoryControls.length} control{categoryControls.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {categoryControls.map(control => (
                <div
                  key={control.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${categoryColors[control.category]}`}>
                          {control.id}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          {control.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {control.description}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No controls found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ControlLibrary;
