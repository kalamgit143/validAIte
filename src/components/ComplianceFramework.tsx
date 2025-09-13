import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  Target,
  Users,
  Brain,
  AlertTriangle,
  Settings,
  Download,
  Eye,
  Plus,
  Filter,
  Search,
  Calendar,
  BarChart3
} from 'lucide-react';

const ComplianceFramework: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState('nist');
  const [showAddControlModal, setShowAddControlModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const complianceStatus = {
    nist: {
      name: 'NIST AI Risk Management Framework',
      version: '1.0',
      lastUpdated: '2024-01-15T10:00:00Z',
      overallCompliance: 87,
      categories: [
        {
          id: 'govern',
          name: 'GOVERN',
          description: 'Organizational governance and oversight',
          compliance: 92,
          controls: [
            { id: 'GV-1.1', name: 'AI governance structure', status: 'compliant', evidence: 'AI Ethics Committee established' },
            { id: 'GV-1.2', name: 'Risk management policies', status: 'compliant', evidence: 'Risk management policy v2.1' },
            { id: 'GV-1.3', name: 'AI risk tolerance', status: 'partial', evidence: 'Risk appetite statement pending' }
          ]
        },
        {
          id: 'map',
          name: 'MAP',
          description: 'Context and risk identification',
          compliance: 85,
          controls: [
            { id: 'MP-1.1', name: 'AI system categorization', status: 'compliant', evidence: 'System inventory complete' },
            { id: 'MP-1.2', name: 'Impact assessment', status: 'compliant', evidence: 'Impact analysis v1.2' },
            { id: 'MP-1.3', name: 'Risk identification', status: 'non_compliant', evidence: 'Risk register incomplete' }
          ]
        },
        {
          id: 'measure',
          name: 'MEASURE',
          description: 'Risk measurement and monitoring',
          compliance: 90,
          controls: [
            { id: 'MS-1.1', name: 'Risk metrics', status: 'compliant', evidence: 'Metrics dashboard active' },
            { id: 'MS-1.2', name: 'Performance monitoring', status: 'compliant', evidence: 'Continuous monitoring' },
            { id: 'MS-1.3', name: 'Risk reporting', status: 'compliant', evidence: 'Weekly risk reports' }
          ]
        },
        {
          id: 'manage',
          name: 'MANAGE',
          description: 'Risk response and treatment',
          compliance: 82,
          controls: [
            { id: 'MG-1.1', name: 'Risk treatment plans', status: 'partial', evidence: 'Treatment plans 80% complete' },
            { id: 'MG-1.2', name: 'Incident response', status: 'compliant', evidence: 'IR procedures documented' },
            { id: 'MG-1.3', name: 'Continuous improvement', status: 'compliant', evidence: 'Monthly reviews conducted' }
          ]
        }
      ]
    },
    eu_tevv: {
      name: 'EU AI Act TEVV Requirements',
      version: '2024.1',
      lastUpdated: '2024-01-14T16:00:00Z',
      overallCompliance: 78,
      categories: [
        {
          id: 'testing',
          name: 'TESTING',
          description: 'Comprehensive AI system testing',
          compliance: 85,
          controls: [
            { id: 'T-1.1', name: 'Functional testing', status: 'compliant', evidence: 'Test suite coverage 95%' },
            { id: 'T-1.2', name: 'Performance testing', status: 'compliant', evidence: 'Load testing complete' },
            { id: 'T-1.3', name: 'Security testing', status: 'partial', evidence: 'Penetration testing scheduled' }
          ]
        },
        {
          id: 'evaluation',
          name: 'EVALUATION',
          description: 'AI system evaluation and assessment',
          compliance: 75,
          controls: [
            { id: 'E-1.1', name: 'Bias evaluation', status: 'compliant', evidence: 'Bias testing framework' },
            { id: 'E-1.2', name: 'Fairness assessment', status: 'partial', evidence: 'Fairness metrics 70% complete' },
            { id: 'E-1.3', name: 'Accuracy evaluation', status: 'non_compliant', evidence: 'Accuracy benchmarks missing' }
          ]
        },
        {
          id: 'validation',
          name: 'VALIDATION',
          description: 'Model validation and verification',
          compliance: 70,
          controls: [
            { id: 'V-1.1', name: 'Model validation', status: 'partial', evidence: 'Validation framework 60% complete' },
            { id: 'V-1.2', name: 'Data validation', status: 'compliant', evidence: 'Data quality checks active' },
            { id: 'V-1.3', name: 'Output validation', status: 'non_compliant', evidence: 'Output validation pending' }
          ]
        },
        {
          id: 'verification',
          name: 'VERIFICATION',
          description: 'Independent verification processes',
          compliance: 82,
          controls: [
            { id: 'VF-1.1', name: 'Third-party verification', status: 'compliant', evidence: 'External audit complete' },
            { id: 'VF-1.2', name: 'Conformity assessment', status: 'compliant', evidence: 'Conformity certificate valid' },
            { id: 'VF-1.3', name: 'Continuous verification', status: 'partial', evidence: 'Verification schedule 80% complete' }
          ]
        }
      ]
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (compliance >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'non_compliant': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'non_compliant': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const currentFramework = complianceStatus[activeFramework as keyof typeof complianceStatus];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance Framework</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor compliance with NIST RMF and EU TEVV requirements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span onClick={() => setShowAddControlModal(true)}>Add Control</span>
          </button>
        </div>
      </div>

      {/* Framework Selection */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveFramework('nist')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              activeFramework === 'nist'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>NIST RMF</span>
          </button>
          <button
            onClick={() => setActiveFramework('eu_tevv')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              activeFramework === 'eu_tevv'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>EU TEVV</span>
          </button>
        </div>
      </div>

      {/* Framework Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{currentFramework.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Version {currentFramework.version} • Last updated: {new Date(currentFramework.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Compliance</div>
            <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getComplianceColor(currentFramework.overallCompliance)}`}>
              {currentFramework.overallCompliance}%
            </div>
          </div>
        </div>

        {/* Compliance Categories */}
        <div className="space-y-6">
          {currentFramework.categories.map((category) => (
            <div key={category.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getComplianceColor(category.compliance)}`}>
                  {category.compliance}%
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3">
                {category.controls.map((control) => (
                  <div key={control.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                        {getStatusIcon(control.status)}
                        <span className="capitalize">{control.status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{control.id}: {control.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{control.evidence}</div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      category.compliance >= 90 ? 'bg-green-500' :
                      category.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${category.compliance}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Actions</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">High Priority</h4>
              <p className="text-sm text-red-700 dark:text-red-300">Complete risk register for MAP-1.3 compliance</p>
              <button className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Assign Task
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Medium Priority</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Finalize risk appetite statement for GV-1.3</p>
              <button className="mt-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                Schedule Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Control Modal */}
      {showAddControlModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Compliance Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Add a new control to the {currentFramework.name}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Control Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Control Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control ID *
                    </label>
                    <input
                      type="text"
                      placeholder={activeFramework === 'nist' ? 'GV-1.4' : 'T-2.1'}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {currentFramework.categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Name *
                  </label>
                  <input
                    type="text"
                    placeholder="AI system documentation requirements"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Description *
                  </label>
                  <textarea
                    placeholder="Describe the control objective, requirements, and implementation guidance..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Type
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Preventive</option>
                      <option>Detective</option>
                      <option>Corrective</option>
                      <option>Compensating</option>
                      <option>Administrative</option>
                      <option>Technical</option>
                      <option>Physical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Implementation Details</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Implementation Status *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Not Implemented</option>
                    <option>Partially Implemented</option>
                    <option>Largely Implemented</option>
                    <option>Fully Implemented</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evidence of Implementation
                  </label>
                  <textarea
                    placeholder="Provide evidence of how this control is implemented (policies, procedures, technical controls, etc.)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Owner *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>CIO</option>
                      <option>CISO</option>
                      <option>Compliance Officer</option>
                      <option>QA Lead</option>
                      <option>AI Ethics Committee</option>
                      <option>Risk Manager</option>
                      <option>Data Protection Officer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Testing Frequency
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Continuous</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Annually</option>
                      <option>Ad-hoc</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Completion Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Verified Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Risk & Compliance Mapping */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Risk & Compliance Mapping</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Related Risk Categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Data Privacy', 'Bias & Fairness', 'Security', 'Transparency', 'Accountability', 'Societal Impact', 'Performance', 'Safety'].map(category => (
                      <label key={category} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Applicable Regulations
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'FedRAMP', 'ISO 27001', 'SOC 2', 'PCI DSS'].map(regulation => (
                      <label key={regulation} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{regulation}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Applicable Applications
                  </label>
                  <div className="space-y-2">
                    {['All Applications', 'Healthcare Triage Assistant', 'Financial Lending Copilot', 'SAP Enterprise Copilot', 'Government Citizen Services', 'Retail Brand Safety Assistant'].map(app => (
                      <label key={app} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={app === 'All Applications'} className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testing & Validation */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Testing & Validation</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Testing Methodology
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Automated Testing</option>
                    <option>Manual Review</option>
                    <option>Hybrid (Auto + Manual)</option>
                    <option>Continuous Monitoring</option>
                    <option>Periodic Audit</option>
                    <option>External Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Success Criteria
                  </label>
                  <textarea
                    placeholder="Define measurable criteria for control effectiveness (e.g., 100% of AI systems have documented risk assessments, bias testing shows < 5% disparity across demographics)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validation Method
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Document Review</option>
                      <option>Technical Testing</option>
                      <option>Process Observation</option>
                      <option>Interview/Survey</option>
                      <option>Data Analysis</option>
                      <option>External Audit</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Automation Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Fully Automated</option>
                      <option>Partially Automated</option>
                      <option>Manual Process</option>
                      <option>Hybrid Approach</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Gaps & Remediation */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Gaps & Remediation</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Identified Gaps
                  </label>
                  <textarea
                    placeholder="List any gaps in current implementation (e.g., missing documentation, incomplete testing, lack of automation)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Remediation Plan
                  </label>
                  <textarea
                    placeholder="Describe the plan to address identified gaps, including timeline, resources, and milestones..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimated Effort (hours)
                    </label>
                    <input
                      type="number"
                      placeholder="40"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Required ($)
                    </label>
                    <input
                      type="number"
                      placeholder="5000"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Level if Not Implemented
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Monitoring & Metrics */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Monitoring & Metrics</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Performance Indicators (KPIs)
                  </label>
                  <textarea
                    placeholder="Define measurable KPIs for this control (e.g., 100% of models have risk assessments, 0 critical security vulnerabilities, < 5% bias in demographic testing)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monitoring Tool/System
                    </label>
                    <input
                      type="text"
                      placeholder="validAIte Trust Metrics Engine"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alert Threshold
                    </label>
                    <input
                      type="text"
                      placeholder="< 90% compliance"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Automated Monitoring Capabilities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Real-time Monitoring', 'Automated Testing', 'Drift Detection', 'Anomaly Detection', 'Compliance Scoring', 'Evidence Collection', 'Report Generation', 'Alert Notifications'].map(capability => (
                      <label key={capability} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{capability}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documentation & References */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Documentation & References</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reference Documents
                  </label>
                  <textarea
                    placeholder="List relevant policies, procedures, standards, or guidelines that support this control..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-16 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Family/Group
                    </label>
                    <input
                      type="text"
                      placeholder="AI Governance Controls"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Version
                    </label>
                    <input
                      type="text"
                      placeholder="1.0"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Any additional notes, considerations, or special instructions for this control..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-16 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields • Control will be added to the selected framework category
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAddControlModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save as Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Control
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceFramework;