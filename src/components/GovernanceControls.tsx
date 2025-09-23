import React, { useState } from 'react';
import { 
  Shield, 
  Settings, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Target,
  Eye,
  Edit,
  Download,
  Plus,
  Play,
  Pause,
  BarChart3,
  Activity,
  Lock,
  Globe,
  Brain,
  Scale,
  Heart,
  Code,
  Database,
  Zap,
  Crown,
  Gavel
} from 'lucide-react';

const GovernanceControls: React.FC = () => {
  const [activeTab, setActiveTab] = useState('controls');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('nist_rmf');

  const governanceControls = [
    {
      id: 'ctrl_001',
      name: 'AI Governance Structure',
      description: 'Establish organizational governance and oversight for AI systems',
      framework: 'NIST RMF',
      controlId: 'GOVERN-1.1',
      category: 'governance',
      status: 'implemented',
      effectiveness: 94,
      owner: 'CIO',
      implementedAt: '2024-01-10T10:00:00Z',
      lastReview: '2024-01-15T14:00:00Z',
      nextReview: '2024-04-15T14:00:00Z',
      evidence: [
        'AI Ethics Committee Charter',
        'AI Governance Policy v2.1',
        'Stakeholder Assignment Matrix',
        'Quarterly Review Reports'
      ],
      applications: ['All Applications'],
      riskMitigation: ['Governance Risk', 'Accountability Risk'],
      automationLevel: 'Partially Automated',
      complianceMapping: ['NIST-GOVERN-1.1', 'EU-AIA-Art16', 'ISO42001-5.1']
    },
    {
      id: 'ctrl_002',
      name: 'Bias Detection & Mitigation',
      description: 'Systematic bias detection and mitigation across AI systems',
      framework: 'EU AI Act',
      controlId: 'MEASURE-2.3',
      category: 'fairness',
      status: 'implemented',
      effectiveness: 89,
      owner: 'AI Ethics Committee',
      implementedAt: '2024-01-08T16:00:00Z',
      lastReview: '2024-01-14T11:00:00Z',
      nextReview: '2024-02-14T11:00:00Z',
      evidence: [
        'Bias Testing Framework',
        'Fairness Metrics Dashboard',
        'Demographic Analysis Reports',
        'Mitigation Action Plans'
      ],
      applications: ['Healthcare Triage Assistant', 'Financial Lending Copilot'],
      riskMitigation: ['Bias Risk', 'Fairness Risk', 'Discrimination Risk'],
      automationLevel: 'Fully Automated',
      complianceMapping: ['EU-AIA-Art10', 'NIST-MEASURE-2.3', 'ECOA-Reg-B']
    },
    {
      id: 'ctrl_003',
      name: 'Human Oversight Mechanisms',
      description: 'Ensure meaningful human control and oversight of AI decisions',
      framework: 'EU AI Act',
      controlId: 'MANAGE-1.2',
      category: 'oversight',
      status: 'in_progress',
      effectiveness: 76,
      owner: 'QA Lead',
      implementedAt: '2024-01-12T09:00:00Z',
      lastReview: '2024-01-13T15:00:00Z',
      nextReview: '2024-02-13T15:00:00Z',
      evidence: [
        'Human-in-the-Loop Procedures',
        'Override Mechanism Documentation',
        'Escalation Protocols',
        'Training Materials'
      ],
      applications: ['Healthcare Triage Assistant', 'Financial Lending Copilot', 'Government Citizen Services'],
      riskMitigation: ['Automation Risk', 'Human Agency Risk'],
      automationLevel: 'Manual Process',
      complianceMapping: ['EU-AIA-Art14', 'NIST-MANAGE-1.2', 'IEEE-2857']
    },
    {
      id: 'ctrl_004',
      name: 'Data Quality Assurance',
      description: 'Ensure training and operational data quality and integrity',
      framework: 'NIST RMF',
      controlId: 'MAP-1.3',
      category: 'data_quality',
      status: 'implemented',
      effectiveness: 92,
      owner: 'Data Engineering Team',
      implementedAt: '2024-01-05T12:00:00Z',
      lastReview: '2024-01-12T10:00:00Z',
      nextReview: '2024-03-12T10:00:00Z',
      evidence: [
        'Data Quality Monitoring Dashboard',
        'Data Validation Pipelines',
        'Quality Metrics Reports',
        'Data Lineage Documentation'
      ],
      applications: ['All Applications'],
      riskMitigation: ['Data Quality Risk', 'Model Performance Risk'],
      automationLevel: 'Fully Automated',
      complianceMapping: ['NIST-MAP-1.3', 'GDPR-Art5', 'ISO27001-A.12']
    }
  ];

  const controlCategories = [
    {
      id: 'governance',
      name: 'Governance & Oversight',
      description: 'Organizational governance structures and oversight mechanisms',
      icon: Crown,
      color: 'blue',
      count: 1
    },
    {
      id: 'fairness',
      name: 'Fairness & Bias',
      description: 'Bias detection, fairness assessment, and mitigation controls',
      icon: Scale,
      color: 'purple',
      count: 1
    },
    {
      id: 'oversight',
      name: 'Human Oversight',
      description: 'Human-in-the-loop processes and meaningful human control',
      icon: Users,
      color: 'green',
      count: 1
    },
    {
      id: 'data_quality',
      name: 'Data Quality',
      description: 'Data governance, quality assurance, and integrity controls',
      icon: Database,
      color: 'yellow',
      count: 1
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      description: 'Cybersecurity controls and privacy protection measures',
      icon: Lock,
      color: 'red',
      count: 0
    },
    {
      id: 'transparency',
      name: 'Transparency',
      description: 'Explainability, interpretability, and transparency controls',
      icon: Eye,
      color: 'indigo',
      count: 0
    }
  ];

  const frameworks = [
    { id: 'nist_rmf', name: 'NIST AI RMF', description: 'NIST AI Risk Management Framework' },
    { id: 'eu_ai_act', name: 'EU AI Act', description: 'European Union AI Act Requirements' },
    { id: 'iso_42001', name: 'ISO/IEC 42001', description: 'AI Management System Standard' },
    { id: 'custom', name: 'Custom Framework', description: 'Organization-specific controls' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'not_implemented': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'planned': return <Clock className="w-4 h-4" />;
      case 'not_implemented': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = controlCategories.find(c => c.id === category);
    switch (cat?.color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'indigo': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Governance Controls</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Establish controls and mitigation strategies</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Controls</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Control</span>
          </button>
        </div>
      </div>

      {/* Control Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {controlCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{category.count}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Controls</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'controls', label: 'Active Controls', icon: Shield },
              { id: 'frameworks', label: 'Frameworks', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'controls' ? (
            <div className="space-y-6">
              {governanceControls.map((control) => (
                <div key={control.id} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100">{control.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(control.status)}`}>
                          {getStatusIcon(control.status)}
                          <span className="capitalize">{control.status.replace('_', ' ')}</span>
                        </div>
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded font-mono">
                          {control.controlId}
                        </div>
                      </div>
                      
                      <p className="text-green-800 dark:text-green-200 mb-4">{control.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Framework</span>
                          <div className="text-green-900 dark:text-green-100">{control.framework}</div>
                        </div>
                        <div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Owner</span>
                          <div className="text-green-900 dark:text-green-100">{control.owner}</div>
                        </div>
                        <div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Effectiveness</span>
                          <div className="text-green-900 dark:text-green-100">{control.effectiveness}%</div>
                        </div>
                        <div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Next Review</span>
                          <div className="text-green-900 dark:text-green-100">{new Date(control.nextReview).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Control Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Evidence */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Evidence & Documentation</span>
                        </h4>
                        <div className="space-y-2">
                          {control.evidence.map((evidence, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{evidence}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-purple-600" />
                          <span>Applicable Applications</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {control.applications.map((app, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Risk Mitigation */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Target className="w-4 h-4 text-red-600" />
                          <span>Risk Mitigation</span>
                        </h4>
                        <div className="space-y-2">
                          {control.riskMitigation.map((risk, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Compliance Mapping */}
                      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-indigo-600" />
                          <span>Compliance Mapping</span>
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {control.complianceMapping.map((mapping, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 text-xs rounded font-mono">
                              {mapping}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Effectiveness Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-green-600 dark:text-green-400 mb-2">
                      <span>Control Effectiveness</span>
                      <span>{control.effectiveness}%</span>
                    </div>
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                      <div 
                        className="bg-green-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${control.effectiveness}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Framework Selection */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Framework:</label>
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {frameworks.map(framework => (
                    <option key={framework.id} value={framework.id}>{framework.name}</option>
                  ))}
                </select>
              </div>

              {/* Framework Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {frameworks.map((framework) => (
                  <div key={framework.id} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{framework.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{framework.description}</p>
                    
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      View Controls
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Control Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Governance Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a new governance control for AI risk mitigation
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Control Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Name *
                    </label>
                    <input
                      type="text"
                      placeholder="AI Governance Structure"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Category *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option value="">Select Category</option>
                      {controlCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Description *
                  </label>
                  <textarea
                    placeholder="Describe the control objective and implementation approach..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Framework *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>NIST AI RMF</option>
                      <option>EU AI Act</option>
                      <option>ISO/IEC 42001</option>
                      <option>Custom Framework</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Control Owner *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>CIO</option>
                      <option>CISO</option>
                      <option>Compliance Officer</option>
                      <option>QA Lead</option>
                      <option>AI Ethics Committee</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Implementation Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Implementation Status *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>Not Implemented</option>
                      <option>Planned</option>
                      <option>In Progress</option>
                      <option>Implemented</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Automation Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>Manual Process</option>
                      <option>Partially Automated</option>
                      <option>Fully Automated</option>
                      <option>Hybrid Approach</option>
                    </select>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Risk Categories Addressed
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Data Privacy', 'Bias & Fairness', 'Security', 'Transparency', 'Accountability', 'Societal Impact'].map(risk => (
                      <label key={risk} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{risk}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monitoring & Measurement */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Monitoring & Measurement</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Performance Indicators (KPIs)
                  </label>
                  <textarea
                    placeholder="Define measurable KPIs for control effectiveness..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Review Frequency
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>Continuous</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Effectiveness Threshold (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue="80"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Control will be integrated into governance framework
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Create Control
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceControls;