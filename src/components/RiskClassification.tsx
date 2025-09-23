import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Target,
  Brain,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Plus,
  BarChart3,
  Activity,
  Globe,
  Lock,
  Heart,
  Scale,
  Building,
  Gavel
} from 'lucide-react';

const RiskClassification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const riskClassifications = [
    {
      id: 'risk_001',
      applicationName: 'Healthcare Triage Assistant',
      euAiActClass: 'high_risk',
      nistRiskLevel: 'high',
      overallRiskScore: 8.2,
      classifiedBy: 'Sarah Chen',
      classifiedAt: '2024-01-15T10:00:00Z',
      approvedBy: 'CIO & CISO',
      status: 'approved',
      riskCategories: {
        'Data Privacy': { score: 8, likelihood: 'high', impact: 'major', controls: ['GDPR-Art6', 'HIPAA-164'] },
        'Bias & Fairness': { score: 7, likelihood: 'medium', impact: 'major', controls: ['NIST-MEASURE-2.3'] },
        'Security': { score: 9, likelihood: 'high', impact: 'catastrophic', controls: ['ISO27001-A.9', 'OWASP-LLM-01'] },
        'Transparency': { score: 8, likelihood: 'medium', impact: 'major', controls: ['EU-AIA-Art13'] },
        'Accountability': { score: 8, likelihood: 'medium', impact: 'major', controls: ['NIST-GOVERN-1.1'] },
        'Societal Impact': { score: 9, likelihood: 'high', impact: 'major', controls: ['EU-AIA-Art5'] }
      },
      mitigationStrategies: [
        { name: 'Enhanced bias testing', status: 'implemented', effectiveness: 85 },
        { name: 'Human oversight protocols', status: 'implemented', effectiveness: 92 },
        { name: 'Data encryption at rest', status: 'implemented', effectiveness: 98 },
        { name: 'Audit trail mechanisms', status: 'planned', effectiveness: 0 }
      ],
      regulatoryMapping: ['EU AI Act', 'GDPR', 'HIPAA', 'Medical Device Regulation']
    },
    {
      id: 'risk_002',
      applicationName: 'Financial Lending Copilot',
      euAiActClass: 'high_risk',
      nistRiskLevel: 'high',
      overallRiskScore: 8.8,
      classifiedBy: 'Mike Johnson',
      classifiedAt: '2024-01-14T14:30:00Z',
      approvedBy: 'Pending CIO Review',
      status: 'under_review',
      riskCategories: {
        'Data Privacy': { score: 9, likelihood: 'high', impact: 'major', controls: ['GDPR-Art6', 'CCPA-1798'] },
        'Bias & Fairness': { score: 8, likelihood: 'high', impact: 'major', controls: ['ECOA-Reg-B', 'NIST-MEASURE-2.3'] },
        'Security': { score: 8, likelihood: 'medium', impact: 'major', controls: ['SOX-404', 'PCI-DSS'] },
        'Transparency': { score: 9, likelihood: 'medium', impact: 'major', controls: ['FCRA-Section-615'] },
        'Accountability': { score: 9, likelihood: 'medium', impact: 'major', controls: ['NIST-GOVERN-1.1'] },
        'Financial Impact': { score: 9, likelihood: 'high', impact: 'catastrophic', controls: ['SOX-302', 'Basel-III'] }
      },
      mitigationStrategies: [
        { name: 'Fair lending algorithms', status: 'implemented', effectiveness: 95 },
        { name: 'Explainable AI features', status: 'implemented', effectiveness: 88 },
        { name: 'Regulatory compliance monitoring', status: 'in_progress', effectiveness: 70 },
        { name: 'Bias detection systems', status: 'implemented', effectiveness: 92 }
      ],
      regulatoryMapping: ['EU AI Act', 'GDPR', 'ECOA', 'FCRA', 'SOX']
    }
  ];

  const riskMatrix = [
    { likelihood: 'Very High', impact: ['Medium', 'High', 'High', 'Critical', 'Critical'] },
    { likelihood: 'High', impact: ['Medium', 'Medium', 'High', 'High', 'Critical'] },
    { likelihood: 'Medium', impact: ['Low', 'Medium', 'Medium', 'High', 'High'] },
    { likelihood: 'Low', impact: ['Low', 'Low', 'Medium', 'Medium', 'High'] },
    { likelihood: 'Very Low', impact: ['Low', 'Low', 'Low', 'Medium', 'Medium'] }
  ];

  const impactLevels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-400 text-white';
      case 'medium': return 'bg-yellow-400 text-gray-900';
      case 'low': return 'bg-green-400 text-gray-900';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getEuAiActColor = (classification: string) => {
    switch (classification) {
      case 'unacceptable': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high_risk': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'limited_risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'minimal_risk': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'under_review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Risk Classification</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Identify and classify potential risks and threats</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Risk Register</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Classify New Risk</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'classification', label: 'Risk Classifications', icon: AlertTriangle },
              { id: 'matrix', label: 'Risk Matrix', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600 dark:text-red-400'
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
          {activeTab === 'classification' ? (
            <div className="space-y-6">
              {riskClassifications.map((classification) => (
                <div key={classification.id} className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-red-900 dark:text-red-100">{classification.applicationName}</h3>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(classification.status)}`}>
                          {getStatusIcon(classification.status)}
                          <span className="capitalize">{classification.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEuAiActColor(classification.euAiActClass)}`}>
                          EU: {classification.euAiActClass.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Overall Risk Score</span>
                          <div className="text-2xl font-bold text-red-900 dark:text-red-100">{classification.overallRiskScore}/10</div>
                        </div>
                        <div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">NIST Risk Level</span>
                          <div className="text-red-900 dark:text-red-100 capitalize">{classification.nistRiskLevel}</div>
                        </div>
                        <div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Classified By</span>
                          <div className="text-red-900 dark:text-red-100">{classification.classifiedBy}</div>
                        </div>
                        <div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Approved By</span>
                          <div className="text-red-900 dark:text-red-100">{classification.approvedBy}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Risk Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {Object.entries(classification.riskCategories).map(([category, data]: [string, any]) => (
                      <div key={category} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{category}</h4>
                          <div className="text-lg font-bold text-red-600 dark:text-red-400">{data.score}/10</div>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Likelihood:</span>
                            <span className={`px-2 py-1 rounded text-white ${
                              data.likelihood === 'high' ? 'bg-red-500' :
                              data.likelihood === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                              {data.likelihood}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Impact:</span>
                            <span className={`px-2 py-1 rounded text-white ${
                              data.impact === 'catastrophic' || data.impact === 'major' ? 'bg-red-500' :
                              data.impact === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                              {data.impact}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">Controls:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {data.controls.map((control: string, index: number) => (
                              <span key={index} className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded font-mono">
                                {control}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mitigation Strategies */}
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Mitigation Strategies</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {classification.mitigationStrategies.map((strategy, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{strategy.name}</div>
                            <div className={`text-xs px-2 py-1 rounded mt-1 ${
                              strategy.status === 'implemented' ? 'bg-green-100 text-green-800' :
                              strategy.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {strategy.status.replace('_', ' ')}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{strategy.effectiveness}%</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">effectiveness</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regulatory Mapping */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">Regulatory Mapping:</span>
                    {classification.regulatoryMapping.map((regulation, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                        {regulation}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Matrix */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Risk Assessment Matrix</h3>
                </div>
                <p className="text-red-800 dark:text-red-200 mb-6">
                  Likelihood vs Impact matrix for systematic risk evaluation
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Likelihood</th>
                        {impactLevels.map(level => (
                          <th key={level} className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {level}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {riskMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {row.likelihood}
                          </td>
                          {row.impact.map((risk, colIndex) => (
                            <td key={colIndex} className="p-3 text-center">
                              <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getRiskLevelColor(risk)}`}>
                                {risk}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risk Categories Guide */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Data Privacy', icon: Lock, color: 'blue', description: 'Personal data protection and privacy compliance' },
                  { name: 'Bias & Fairness', icon: Scale, color: 'purple', description: 'Algorithmic bias and fairness across demographics' },
                  { name: 'Security', icon: Shield, color: 'red', description: 'Cybersecurity threats and vulnerabilities' },
                  { name: 'Transparency', icon: Eye, color: 'yellow', description: 'Explainability and decision transparency' },
                  { name: 'Accountability', icon: Gavel, color: 'indigo', description: 'Governance and accountability mechanisms' },
                  { name: 'Societal Impact', icon: Heart, color: 'pink', description: 'Broader societal and environmental effects' }
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${category.color}-600 dark:text-${category.color}-400`} />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Risk Classification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Risk Classification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Classify AI system risks according to NIST RMF and EU AI Act frameworks
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Healthcare Triage Assistant</option>
                      <option>Financial Lending Copilot</option>
                      <option>SAP Enterprise Copilot</option>
                      <option>Government Citizen Services</option>
                      <option>Retail Brand Safety Assistant</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      EU AI Act Classification *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Unacceptable Risk (Prohibited)</option>
                      <option>High Risk (Mandatory TEVV)</option>
                      <option>Limited Risk (Transparency)</option>
                      <option>Minimal Risk (No Obligations)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Risk Category Assessment */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Risk Category Assessment</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Data Privacy', icon: Lock },
                    { name: 'Bias & Fairness', icon: Scale },
                    { name: 'Security', icon: Shield },
                    { name: 'Transparency', icon: Eye },
                    { name: 'Accountability', icon: Gavel },
                    { name: 'Societal Impact', icon: Heart }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.name} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Icon className="w-4 h-4 text-red-600" />
                          <h5 className="font-medium text-gray-900 dark:text-white">{category.name}</h5>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Likelihood</label>
                            <select className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">
                              <option>Very Low</option>
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                              <option>Very High</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Impact</label>
                            <select className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">
                              <option>Negligible</option>
                              <option>Minor</option>
                              <option>Moderate</option>
                              <option>Major</option>
                              <option>Catastrophic</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mitigation Planning */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Mitigation Planning</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Planned Mitigation Strategies
                  </label>
                  <textarea
                    placeholder="Describe planned risk mitigation measures and controls..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Tolerance Level
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Very Low (Healthcare, Finance)</option>
                      <option>Low (Government, Legal)</option>
                      <option>Medium (Enterprise, Education)</option>
                      <option>High (Marketing, Entertainment)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Review Frequency
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Semi-annually</option>
                      <option>Annually</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Classification will trigger governance approval workflow
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Classify Risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskClassification;