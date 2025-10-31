import React, { useState } from 'react';
import {
  Shield,
  Eye,
  Edit2,
  Lock,
  Download,
  Info,
  ChevronRight,
  Users,
  FileText,
  Camera
} from 'lucide-react';

type AccessLevel = 'read' | 'edit' | 'govern';

interface Permission {
  level: AccessLevel;
  description: string;
}

interface RolePermissions {
  role: string;
  roleTitle: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  permissions: Record<string, Permission>;
}

interface WorkflowComponent {
  id: string;
  name: string;
  description: string;
}

const AccessMatrix: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const workflowComponents: WorkflowComponent[] = [
    {
      id: 'application_setup',
      name: 'Application Setup',
      description: 'Define AI application characteristics, use cases, and archetype classification'
    },
    {
      id: 'risk_identification',
      name: 'Risk Identification',
      description: 'Identify and document AI risks across NIST RMF categories'
    },
    {
      id: 'metrics_definition',
      name: 'Metrics Definition',
      description: 'Define trust metrics and evaluation criteria'
    },
    {
      id: 'dataset_generation',
      name: 'Dataset Generation',
      description: 'Create evaluation datasets aligned with use cases and metrics'
    },
    {
      id: 'test_lab',
      name: 'Test Lab',
      description: 'Execute TEVV tests and validation experiments'
    },
    {
      id: 'trust_score',
      name: 'Trust Score Computation',
      description: 'Compute trust scores and aggregate evaluation results'
    },
    {
      id: 'explainability',
      name: 'Explainability & Evidence',
      description: 'Generate explainability reports and evidence packs'
    },
    {
      id: 'trust_matrix',
      name: 'Trust Matrix',
      description: 'Visualize comprehensive trust assessment matrix'
    },
    {
      id: 'authorization',
      name: 'Authorization Engine',
      description: 'Configure role-based access control and permissions'
    },
    {
      id: 'monitoring',
      name: 'Continuous Monitoring',
      description: 'Monitor AI systems post-deployment for drift and compliance'
    }
  ];

  const roles: RolePermissions[] = [
    {
      role: 'CIO',
      roleTitle: 'Chief Information Officer',
      icon: '👔',
      color: 'indigo',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-500',
      permissions: {
        application_setup: { level: 'govern', description: 'Approves strategic AI initiatives and resource allocation' },
        risk_identification: { level: 'govern', description: 'Final authority on enterprise AI risk acceptance' },
        metrics_definition: { level: 'read', description: 'Reviews trust metrics and KPIs for portfolio oversight' },
        dataset_generation: { level: 'read', description: 'Monitors data quality and coverage metrics' },
        test_lab: { level: 'read', description: 'Reviews test execution status and coverage' },
        trust_score: { level: 'read', description: 'Monitors trust scores for portfolio health' },
        explainability: { level: 'read', description: 'Reviews explainability and transparency reports' },
        trust_matrix: { level: 'govern', description: 'Approves overall trust assessment and go/no-go decisions' },
        authorization: { level: 'govern', description: 'Approves access control policies and governance structure' },
        monitoring: { level: 'govern', description: 'Oversees continuous monitoring strategy and incident escalation' }
      }
    },
    {
      role: 'CISO',
      roleTitle: 'Chief Information Security Officer',
      icon: '🛡️',
      color: 'red',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-orange-500',
      permissions: {
        application_setup: { level: 'read', description: 'Reviews security requirements and threat landscape' },
        risk_identification: { level: 'edit', description: 'Defines security risks and threat scenarios' },
        metrics_definition: { level: 'read', description: 'Reviews security and privacy metrics' },
        dataset_generation: { level: 'read', description: 'Ensures data security and PII protection' },
        test_lab: { level: 'read', description: 'Reviews security test results and vulnerability assessments' },
        trust_score: { level: 'read', description: 'Monitors security and privacy trust scores' },
        explainability: { level: 'read', description: 'Reviews security evidence and audit trails' },
        trust_matrix: { level: 'read', description: 'Validates security compliance in trust matrix' },
        authorization: { level: 'edit', description: 'Configures security policies and access controls' },
        monitoring: { level: 'edit', description: 'Configures security monitoring and incident response' }
      }
    },
    {
      role: 'Quality & Compliance Manager',
      roleTitle: 'Quality & Compliance Manager',
      icon: '⚖️',
      color: 'blue',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-500',
      permissions: {
        application_setup: { level: 'edit', description: 'Configures compliance requirements and quality standards' },
        risk_identification: { level: 'edit', description: 'Identifies compliance and quality risks' },
        metrics_definition: { level: 'edit', description: 'Defines quality and compliance metrics' },
        dataset_generation: { level: 'read', description: 'Reviews dataset quality and compliance coverage' },
        test_lab: { level: 'read', description: 'Monitors test execution for compliance validation' },
        trust_score: { level: 'edit', description: 'Configures trust score computation rules' },
        explainability: { level: 'edit', description: 'Generates compliance evidence packs and documentation' },
        trust_matrix: { level: 'edit', description: 'Manages trust matrix configuration and reporting' },
        authorization: { level: 'edit', description: 'Defines role-based access and approval workflows' },
        monitoring: { level: 'read', description: 'Reviews compliance monitoring dashboards' }
      }
    },
    {
      role: 'TEVV Engineer',
      roleTitle: 'TEVV Engineer',
      icon: '🔬',
      color: 'purple',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-500',
      permissions: {
        application_setup: { level: 'read', description: 'Reviews application requirements for test planning' },
        risk_identification: { level: 'read', description: 'Reviews risks to design test scenarios' },
        metrics_definition: { level: 'edit', description: 'Defines technical metrics and test criteria' },
        dataset_generation: { level: 'edit', description: 'Creates and curates evaluation datasets' },
        test_lab: { level: 'edit', description: 'Executes TEVV tests and validation experiments' },
        trust_score: { level: 'edit', description: 'Computes and validates trust scores' },
        explainability: { level: 'edit', description: 'Generates explainability analysis and reports' },
        trust_matrix: { level: 'read', description: 'Reviews trust matrix results for validation' },
        authorization: { level: 'read', description: 'Views access permissions for test environments' },
        monitoring: { level: 'read', description: 'Reviews monitoring data for test validation' }
      }
    },
    {
      role: 'Data & Ethics Manager',
      roleTitle: 'Data & Ethics Manager',
      icon: '🌱',
      color: 'green',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-500',
      permissions: {
        application_setup: { level: 'read', description: 'Reviews ethical considerations and data requirements' },
        risk_identification: { level: 'read', description: 'Reviews bias and fairness risks' },
        metrics_definition: { level: 'edit', description: 'Defines fairness and bias metrics' },
        dataset_generation: { level: 'edit', description: 'Ensures dataset diversity and ethical sourcing' },
        test_lab: { level: 'read', description: 'Reviews bias and fairness test results' },
        trust_score: { level: 'read', description: 'Monitors fairness and ethics scores' },
        explainability: { level: 'read', description: 'Reviews ethical impact and bias reports' },
        trust_matrix: { level: 'read', description: 'Validates fairness in trust assessment' },
        authorization: { level: 'read', description: 'Reviews data access policies' },
        monitoring: { level: 'read', description: 'Monitors bias and fairness drift' }
      }
    },
    {
      role: 'MLOps & Reliability Engineer',
      roleTitle: 'MLOps & Reliability Engineer',
      icon: '⚙️',
      color: 'cyan',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-teal-500',
      permissions: {
        application_setup: { level: 'edit', description: 'Configures deployment and infrastructure requirements' },
        risk_identification: { level: 'read', description: 'Reviews operational and reliability risks' },
        metrics_definition: { level: 'read', description: 'Reviews performance and reliability metrics' },
        dataset_generation: { level: 'read', description: 'Reviews dataset for production readiness' },
        test_lab: { level: 'edit', description: 'Executes performance and reliability tests' },
        trust_score: { level: 'edit', description: 'Integrates trust scores into deployment pipeline' },
        explainability: { level: 'read', description: 'Reviews operational evidence and logs' },
        trust_matrix: { level: 'read', description: 'Validates production readiness in trust matrix' },
        authorization: { level: 'read', description: 'Reviews deployment access controls' },
        monitoring: { level: 'edit', description: 'Configures drift monitoring and alerting' }
      }
    },
    {
      role: 'AI Governance Auditor',
      roleTitle: 'AI Governance Auditor',
      icon: '🔍',
      color: 'orange',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-500',
      permissions: {
        application_setup: { level: 'read', description: 'Audits compliance with governance requirements' },
        risk_identification: { level: 'read', description: 'Validates risk assessment completeness' },
        metrics_definition: { level: 'read', description: 'Audits metric definitions and standards' },
        dataset_generation: { level: 'read', description: 'Validates dataset governance and lineage' },
        test_lab: { level: 'read', description: 'Audits test execution and evidence' },
        trust_score: { level: 'read', description: 'Validates trust score computation integrity' },
        explainability: { level: 'read', description: 'Reviews explainability and transparency compliance' },
        trust_matrix: { level: 'govern', description: 'Provides independent verification and sign-off' },
        authorization: { level: 'read', description: 'Audits access control compliance' },
        monitoring: { level: 'read', description: 'Audits continuous monitoring effectiveness' }
      }
    }
  ];

  const getAccessIcon = (level: AccessLevel) => {
    switch (level) {
      case 'read':
        return { icon: Eye, label: 'Read', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
      case 'edit':
        return { icon: Edit2, label: 'Edit', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'govern':
        return { icon: Lock, label: 'Govern', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' };
    }
  };

  const exportToCSV = () => {
    const headers = ['Workflow Component', ...roles.map(r => r.role)];
    const rows = workflowComponents.map(component => {
      return [
        component.name,
        ...roles.map(role => {
          const permission = role.permissions[component.id];
          return permission ? permission.level : '';
        })
      ];
    });

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'validaite-access-matrix.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPNG = () => {
    alert('PNG export would require html2canvas library. For now, use browser screenshot or print to PDF.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <span>Access Control Matrix</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Role-based access privileges across ValidAIte governance workflow components
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center space-x-2"
              >
                <Info className="w-4 h-4" />
                <span>{showLegend ? 'Hide' : 'Show'} Legend</span>
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={exportToPNG}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Export PNG</span>
              </button>
            </div>
          </div>

          {showLegend && (
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>Access Level Legend</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Read</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">View-only access</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Edit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Edit</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Configure and execute</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Govern</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Approval and sign-off authority</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    <tr>
                      <th className="sticky left-0 z-20 px-6 py-4 text-left bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                            Workflow Component
                          </span>
                        </div>
                      </th>
                      {roles.map((role) => (
                        <th
                          key={role.role}
                          className="px-6 py-4 text-center min-w-[140px]"
                        >
                          <div className={`inline-flex flex-col items-center space-y-1 px-4 py-2 rounded-lg bg-gradient-to-br ${role.gradientFrom} ${role.gradientTo} text-white shadow-md`}>
                            <span className="text-2xl">{role.icon}</span>
                            <span className="text-xs font-bold">{role.role}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {workflowComponents.map((component, idx) => (
                      <tr
                        key={component.id}
                        className={`${
                          idx % 2 === 0
                            ? 'bg-gray-50 dark:bg-gray-800/50'
                            : 'bg-white dark:bg-gray-800'
                        } hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors`}
                      >
                        <td className="sticky left-0 z-10 px-6 py-4 bg-inherit">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {component.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {component.description}
                            </div>
                          </div>
                        </td>
                        {roles.map((role) => {
                          const permission = role.permissions[component.id];
                          if (!permission) return <td key={role.role} />;

                          const accessInfo = getAccessIcon(permission.level);
                          const Icon = accessInfo.icon;
                          const cellKey = `${component.id}-${role.role}`;

                          return (
                            <td
                              key={role.role}
                              className="px-6 py-4 text-center relative"
                              onMouseEnter={() => setHoveredCell(cellKey)}
                              onMouseLeave={() => setHoveredCell(null)}
                            >
                              <div className="flex justify-center">
                                <div className={`p-2 rounded-lg ${accessInfo.bg} transition-transform hover:scale-110`}>
                                  <Icon className={`w-5 h-5 ${accessInfo.color}`} />
                                </div>
                              </div>
                              {hoveredCell === cellKey && (
                                <div className="absolute z-30 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-xl w-64">
                                  <div className="font-semibold mb-1">{accessInfo.label}</div>
                                  <div>{permission.description}</div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                    <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                                  </div>
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
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Role Responsibilities Summary</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div
                key={role.role}
                className={`p-4 rounded-lg border-2 bg-gradient-to-br ${role.gradientFrom}/10 ${role.gradientTo}/10 border-${role.color}-200 dark:border-${role.color}-800`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {role.role}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {role.roleTitle}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {Object.values(role.permissions).reduce((acc, perm) => {
                    const existing = acc.find(p => p.level === perm.level);
                    if (existing) {
                      existing.count++;
                    } else {
                      acc.push({ level: perm.level, count: 1 });
                    }
                    return acc;
                  }, [] as Array<{ level: AccessLevel; count: number }>).map((stat) => {
                    const accessInfo = getAccessIcon(stat.level);
                    const Icon = accessInfo.icon;
                    return (
                      <div key={stat.level} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <Icon className={`w-3 h-3 ${accessInfo.color}`} />
                          <span className="text-gray-700 dark:text-gray-300">{accessInfo.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{stat.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-start space-x-4">
            <Shield className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">Governance Principle</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                This access matrix implements NIST AI RMF and EU AI Act TEVV standards with clear separation of duties.
                The CIO provides strategic oversight, CISO leads security governance, Quality & Compliance Manager drives
                operational compliance, while technical roles (TEVV Engineer, Data & Ethics Manager, MLOps Engineer) execute
                specialized functions. The AI Governance Auditor ensures independent verification across all workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessMatrix;
