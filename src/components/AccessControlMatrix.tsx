import React, { useState } from 'react';
import {
  Shield,
  Download,
  FileText,
  Crown,
  Lock,
  Users,
  Code,
  BarChart3,
  Activity,
  Eye,
  Edit3,
  CheckCircle,
  Info
} from 'lucide-react';

interface AccessLevel {
  type: 'read' | 'edit' | 'govern';
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
}

interface MatrixData {
  component: string;
  [key: string]: string;
}

const AccessControlMatrix: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: string } | null>(null);

  const accessLevels: { [key: string]: AccessLevel } = {
    read: {
      type: 'read',
      icon: '🟢',
      label: 'Read',
      color: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'View-only access to monitor and review'
    },
    edit: {
      type: 'edit',
      icon: '✏️',
      label: 'Edit',
      color: 'text-blue-700 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'Configure, execute, and modify workflows'
    },
    govern: {
      type: 'govern',
      icon: '🔒',
      label: 'Govern',
      color: 'text-purple-700 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Approval authority and policy oversight'
    }
  };

  const roles: Role[] = [
    {
      id: 'cio',
      name: 'Chief Information Officer',
      shortName: 'CIO',
      icon: Crown,
      color: 'text-slate-700 dark:text-slate-300',
      gradient: 'from-slate-600 to-slate-700',
      description: 'Final authority, oversees sign-offs and policy alignment'
    },
    {
      id: 'ciso',
      name: 'Chief Information Security Officer',
      shortName: 'CISO',
      icon: Shield,
      color: 'text-red-700 dark:text-red-400',
      gradient: 'from-red-600 to-pink-600',
      description: 'Leads risk, authorization, and monitoring gates'
    },
    {
      id: 'qcm',
      name: 'Quality & Compliance Manager',
      shortName: 'Q&C Manager',
      icon: CheckCircle,
      color: 'text-blue-700 dark:text-blue-400',
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Governs compliance, risk, and audit artifacts'
    },
    {
      id: 'tevv',
      name: 'TEVV Engineer',
      shortName: 'TEVV Engineer',
      icon: Code,
      color: 'text-green-700 dark:text-green-400',
      gradient: 'from-green-600 to-emerald-600',
      description: 'Executes AI testing, evaluation, and validation workflows'
    },
    {
      id: 'dem',
      name: 'Data & Ethics Manager',
      shortName: 'Data & Ethics',
      icon: Users,
      color: 'text-amber-700 dark:text-amber-400',
      gradient: 'from-amber-600 to-orange-600',
      description: 'Manages ethical data governance, bias, and fairness'
    },
    {
      id: 'mlops',
      name: 'MLOps & Reliability Engineer',
      shortName: 'MLOps',
      icon: Activity,
      color: 'text-purple-700 dark:text-purple-400',
      gradient: 'from-purple-600 to-indigo-600',
      description: 'Handles lifecycle, drift, and performance operations'
    },
    {
      id: 'auditor',
      name: 'AI Governance Auditor',
      shortName: 'Auditor',
      icon: Eye,
      color: 'text-cyan-700 dark:text-cyan-400',
      gradient: 'from-cyan-600 to-teal-600',
      description: 'Provides independent verification and compliance audit trail'
    }
  ];

  const matrixData: MatrixData[] = [
    {
      component: 'Application Setup',
      cio: 'govern',
      ciso: 'read',
      qcm: 'edit',
      tevv: 'read',
      dem: 'read',
      mlops: 'edit',
      auditor: 'read'
    },
    {
      component: 'Risk Identification',
      cio: 'govern',
      ciso: 'edit',
      qcm: 'edit',
      tevv: 'read',
      dem: 'read',
      mlops: 'read',
      auditor: 'read'
    },
    {
      component: 'Metrics Definition',
      cio: 'read',
      ciso: 'read',
      qcm: 'edit',
      tevv: 'edit',
      dem: 'edit',
      mlops: 'read',
      auditor: 'read'
    },
    {
      component: 'Dataset Generation',
      cio: 'read',
      ciso: 'read',
      qcm: 'read',
      tevv: 'edit',
      dem: 'edit',
      mlops: 'read',
      auditor: 'read'
    },
    {
      component: 'Test Lab',
      cio: 'read',
      ciso: 'read',
      qcm: 'read',
      tevv: 'edit',
      dem: 'read',
      mlops: 'edit',
      auditor: 'read'
    },
    {
      component: 'Trust Score Computation',
      cio: 'read',
      ciso: 'read',
      qcm: 'edit',
      tevv: 'edit',
      dem: 'read',
      mlops: 'edit',
      auditor: 'read'
    },
    {
      component: 'Trust Matrix & Evidence',
      cio: 'govern',
      ciso: 'read',
      qcm: 'edit',
      tevv: 'read',
      dem: 'read',
      mlops: 'read',
      auditor: 'govern'
    },
    {
      component: 'Authorization Engine',
      cio: 'govern',
      ciso: 'edit',
      qcm: 'edit',
      tevv: 'read',
      dem: 'read',
      mlops: 'read',
      auditor: 'read'
    },
    {
      component: 'Continuous Monitoring',
      cio: 'govern',
      ciso: 'edit',
      qcm: 'read',
      tevv: 'read',
      dem: 'read',
      mlops: 'edit',
      auditor: 'read'
    },
    {
      component: 'Evidence Export',
      cio: 'govern',
      ciso: 'edit',
      qcm: 'edit',
      tevv: 'edit',
      dem: 'edit',
      mlops: 'edit',
      auditor: 'govern'
    }
  ];

  const exportToCSV = () => {
    const headers = ['Workflow Component', ...roles.map(r => r.shortName)];
    const rows = matrixData.map(row => [
      row.component,
      ...roles.map(role => {
        const access = row[role.id];
        return accessLevels[access]?.icon || '';
      })
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'access-control-matrix.csv';
    a.click();
  };

  const exportToPNG = () => {
    alert('PNG export would require html2canvas library. CSV export is available.');
  };

  const getAccessLevel = (roleId: string, componentIndex: number): AccessLevel => {
    const access = matrixData[componentIndex][roleId];
    return accessLevels[access];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Access Control Matrix
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Role-based permissions across 10-stage AI Governance Workflow (NIST AI RMF & EU AI Act TEVV)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToPNG}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export PNG</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Info className="w-5 h-5 text-blue-600" />
          <span>Access Level Legend</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(accessLevels).map((level) => (
            <div key={level.type} className={`${level.bgColor} rounded-lg p-4 border-2 border-current ${level.color}`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{level.icon}</span>
                <span className="font-bold text-lg">{level.label}</span>
              </div>
              <p className="text-sm opacity-90">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roles Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <div
              key={role.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${role.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{role.shortName}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{role.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Access Matrix Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Permission Matrix (10 Components × 7 Roles = 70 Permissions)</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                <th className="sticky left-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-6 py-4 text-left">
                  <div className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wide">
                    Workflow Component
                  </div>
                </th>
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <th key={role.id} className="px-4 py-4 text-center min-w-[140px]">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-10 h-10 bg-gradient-to-r ${role.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-bold text-xs text-gray-900 dark:text-white">{role.shortName}</div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {matrixData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-colors ${
                    rowIndex % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-800/50'
                  } hover:bg-blue-50 dark:hover:bg-blue-900/10`}
                >
                  <td className="sticky left-0 z-10 px-6 py-4 bg-inherit">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white whitespace-nowrap">
                      {row.component}
                    </div>
                  </td>
                  {roles.map((role) => {
                    const access = getAccessLevel(role.id, rowIndex);
                    const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === role.id;
                    return (
                      <td
                        key={role.id}
                        className="px-4 py-4 text-center relative"
                        onMouseEnter={() => setHoveredCell({ row: rowIndex, col: role.id })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="flex items-center justify-center">
                          <div
                            className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              access.bgColor
                            } ${access.color} ${
                              isHovered ? 'scale-110 shadow-lg ring-2 ring-blue-500 dark:ring-blue-400' : ''
                            }`}
                          >
                            <span className="text-lg mr-2">{access.icon}</span>
                            <span className="font-bold">{access.label}</span>
                          </div>
                        </div>

                        {isHovered && (
                          <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-xl whitespace-nowrap pointer-events-none">
                            <div className="font-bold mb-1">{role.shortName}</div>
                            <div>{access.description}</div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Governance Principles */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Governance Principles Summary</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div key={role.id} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className={`w-8 h-8 bg-gradient-to-r ${role.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900 dark:text-white mb-1">{role.shortName}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{role.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Framework Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>NIST AI RMF Alignment</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Govern: CIO oversight ensures strategic alignment</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Map: Risk identification and context establishment</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Measure: TEVV executes testing and validation</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Manage: Continuous monitoring and improvement</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>EU AI Act TEVV Alignment</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Article 9: Risk management throughout lifecycle</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Article 10: Data governance and quality</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Article 13: Transparency and explainability</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Article 15: Accuracy and robustness testing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessControlMatrix;
