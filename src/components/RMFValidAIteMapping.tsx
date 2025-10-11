import React from 'react';
import {
  ArrowRight,
  Shield,
  Target,
  Settings,
  BarChart3,
  CheckCircle,
  Eye,
  Layers
} from 'lucide-react';

const RMFValidAIteMapping: React.FC = () => {
  const rmfSteps = [
    {
      id: 'categorize',
      name: 'CATEGORIZE',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      nistDescription: 'Categorize the system and information processed, stored, and transmitted',
      validaiteMapping: [
        'Archetype Classification (ADM v1.0)',
        'Risk Tier Determination',
        'Modifier Detection (RAG, FT, AG, etc.)'
      ]
    },
    {
      id: 'select',
      name: 'SELECT',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      nistDescription: 'Select an initial set of baseline security controls',
      validaiteMapping: [
        'ACC Control Profile Selection',
        'Archetype-Specific Controls',
        'Modifier Add-On Controls'
      ]
    },
    {
      id: 'implement',
      name: 'IMPLEMENT',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      nistDescription: 'Implement the security controls and document how controls are deployed',
      validaiteMapping: [
        'Control Implementation Checklist',
        'TEVV Pack Assignment',
        'Evidence Capture Configuration'
      ]
    },
    {
      id: 'assess',
      name: 'ASSESS',
      icon: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      nistDescription: 'Assess the security controls using appropriate assessment procedures',
      validaiteMapping: [
        'TEVV Test Execution',
        'Metrics Collection & Analysis',
        'Threshold Compliance Check'
      ]
    },
    {
      id: 'authorize',
      name: 'AUTHORIZE',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      nistDescription: 'Authorize system operation based on a determination of risk',
      validaiteMapping: [
        'Authorization Gate Evaluation',
        'Machine-Checkable Decision',
        'Evidence Pack Generation'
      ]
    },
    {
      id: 'monitor',
      name: 'MONITOR',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      nistDescription: 'Monitor the security controls on an ongoing basis',
      validaiteMapping: [
        'SLO Monitoring Dashboard',
        'Drift Detection & Alerts',
        'Continuous Compliance Tracking'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          NIST RMF → ValidAIte Mapping
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          How ValidAIte implements the NIST Risk Management Framework for AI systems
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          NIST Risk Management Framework (RMF)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A structured process that integrates security, privacy, and cyber supply chain risk management activities into the system development life cycle.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium">
            NIST SP 800-37
          </span>
          <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium">
            AI RMF (NIST AI 100-1)
          </span>
          <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium">
            TEVV Practices
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {rmfSteps.map((step, idx) => (
          <div key={step.id} className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all">
              <div className={`bg-gradient-to-r ${step.color} p-4`}>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/20 rounded">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">Step {idx + 1}</div>
                    <h3 className="text-2xl font-bold">{step.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                      NIST RMF Definition
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {step.nistDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                      ValidAIte Implementation
                    </h4>
                    <div className="space-y-2">
                      {step.validaiteMapping.map((item, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {idx < rmfSteps.length - 1 && (
              <div className="flex justify-center my-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <span>End-to-End Flow</span>
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Application Ingestion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                System ingests VAM (ValidAIte Application Manifest) or auto-harvests from telemetry
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">ADM Classification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Archetype Determination Matrix classifies application → emits archetype + modifiers + risk tier
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Profile Resolution</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                System pulls Control Profile + TEVV Pack(s) and applies Risk-Tier thresholds
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">TEVV Execution</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Executor runs tests, gathers metrics, and compiles Evidence Pack (7 sections)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Authorization Decision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Authorizer evaluates rules → time-bound authorization + Monitoring plan
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              6
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Continuous Monitoring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                SLO dashboard tracks metrics, drift, and compliance; triggers re-assessment on change
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">12 Archetypes</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">A1-A12</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive taxonomy covering single-turn to safety-critical AI systems
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">52 Controls</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">ACC</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Assurance Control Catalogue across 15 control families
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">26 Metrics</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">TEVV</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Test metrics with risk-tier-based thresholds (LOW/MOD/HIGH/CRIT)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RMFValidAIteMapping;
