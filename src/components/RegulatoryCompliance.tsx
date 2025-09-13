import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Globe,
  Scale,
  Users,
  Eye,
  Download,
  Plus,
  Edit,
  Calendar,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const RegulatoryCompliance: React.FC = () => {
  const [activeRegulation, setActiveRegulation] = useState('eu_ai_act');

  const regulations = {
    eu_ai_act: {
      name: 'EU AI Act',
      description: 'European Union Artificial Intelligence Act compliance',
      status: 'active',
      effectiveDate: '2024-08-01',
      lastAssessment: '2024-01-15T10:00:00Z',
      compliance: 82,
      requirements: [
        {
          id: 'AIA-1',
          title: 'Risk Classification',
          description: 'Classify AI system according to risk levels',
          status: 'compliant',
          evidence: 'Risk classification document v1.2',
          dueDate: '2024-02-01'
        },
        {
          id: 'AIA-2',
          title: 'Conformity Assessment',
          description: 'Conduct conformity assessment for high-risk AI',
          status: 'in_progress',
          evidence: 'Assessment 65% complete',
          dueDate: '2024-03-15'
        },
        {
          id: 'AIA-3',
          title: 'CE Marking',
          description: 'Affix CE marking for compliant systems',
          status: 'pending',
          evidence: 'Pending conformity completion',
          dueDate: '2024-04-01'
        },
        {
          id: 'AIA-4',
          title: 'Registration in EU Database',
          description: 'Register high-risk AI systems',
          status: 'not_started',
          evidence: 'Registration process not initiated',
          dueDate: '2024-05-01'
        }
      ]
    },
    gdpr: {
      name: 'GDPR',
      description: 'General Data Protection Regulation compliance',
      status: 'active',
      effectiveDate: '2018-05-25',
      lastAssessment: '2024-01-10T14:00:00Z',
      compliance: 94,
      requirements: [
        {
          id: 'GDPR-1',
          title: 'Data Processing Lawfulness',
          description: 'Ensure lawful basis for data processing',
          status: 'compliant',
          evidence: 'Privacy policy updated, consent mechanisms active',
          dueDate: 'Ongoing'
        },
        {
          id: 'GDPR-2',
          title: 'Data Subject Rights',
          description: 'Implement data subject rights mechanisms',
          status: 'compliant',
          evidence: 'Rights management system operational',
          dueDate: 'Ongoing'
        },
        {
          id: 'GDPR-3',
          title: 'Data Protection Impact Assessment',
          description: 'Conduct DPIA for high-risk processing',
          status: 'compliant',
          evidence: 'DPIA completed for all AI systems',
          dueDate: 'Annual review'
        }
      ]
    },
    ccpa: {
      name: 'CCPA',
      description: 'California Consumer Privacy Act compliance',
      status: 'active',
      effectiveDate: '2020-01-01',
      lastAssessment: '2024-01-08T11:00:00Z',
      compliance: 88,
      requirements: [
        {
          id: 'CCPA-1',
          title: 'Consumer Rights Notice',
          description: 'Provide clear notice of consumer rights',
          status: 'compliant',
          evidence: 'Privacy notice updated with CCPA rights',
          dueDate: 'Annual review'
        },
        {
          id: 'CCPA-2',
          title: 'Opt-Out Mechanisms',
          description: 'Implement sale opt-out mechanisms',
          status: 'compliant',
          evidence: 'Do Not Sell link implemented',
          dueDate: 'Ongoing'
        }
      ]
    }
  };

  const complianceMetrics = [
    {
      name: 'Overall Compliance',
      value: '88%',
      change: '+3%',
      trend: 'up',
      color: 'green'
    },
    {
      name: 'Active Regulations',
      value: Object.keys(regulations).length,
      change: '+1',
      trend: 'up',
      color: 'blue'
    },
    {
      name: 'Pending Requirements',
      value: '7',
      change: '-2',
      trend: 'down',
      color: 'yellow'
    },
    {
      name: 'Compliance Score',
      value: '8.8/10',
      change: '+0.3',
      trend: 'up',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'not_started': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'non_compliant': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'not_started': return <XCircle className="w-4 h-4" />;
      case 'non_compliant': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (compliance >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (compliance >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const currentRegulation = regulations[activeRegulation as keyof typeof regulations];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Regulatory Compliance</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor compliance with global AI regulations and standards</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Compliance Report</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Regulation</span>
          </button>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regulation Selection */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          {Object.entries(regulations).map(([key, regulation]) => (
            <button
              key={key}
              onClick={() => setActiveRegulation(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeRegulation === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{regulation.name}</span>
              <div className={`px-2 py-1 rounded-full text-xs ${getComplianceColor(regulation.compliance)}`}>
                {regulation.compliance}%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Regulation Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{currentRegulation.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentRegulation.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Effective: {new Date(currentRegulation.effectiveDate).toLocaleDateString()}</span>
                <span>Last Assessment: {new Date(currentRegulation.lastAssessment).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-lg text-xl font-bold ${getComplianceColor(currentRegulation.compliance)}`}>
              {currentRegulation.compliance}%
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {currentRegulation.requirements.map((requirement) => (
              <div key={requirement.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{requirement.title}</h4>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement.status)}`}>
                        {getStatusIcon(requirement.status)}
                        <span className="capitalize">{requirement.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{requirement.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Requirement ID</span>
                        <div className="font-mono text-sm text-gray-900 dark:text-white">{requirement.id}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Due Date</span>
                        <div className="font-medium text-gray-900 dark:text-white">{requirement.dueDate}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Evidence:</span>
                      <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">{requirement.evidence}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Timeline */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Compliance Timeline</h3>
        
        <div className="space-y-4">
          {[
            { date: '2024-02-01', title: 'Risk Classification Due', status: 'upcoming', regulation: 'EU AI Act' },
            { date: '2024-03-15', title: 'Conformity Assessment Due', status: 'upcoming', regulation: 'EU AI Act' },
            { date: '2024-04-01', title: 'CE Marking Required', status: 'future', regulation: 'EU AI Act' },
            { date: '2024-05-01', title: 'EU Database Registration', status: 'future', regulation: 'EU AI Act' }
          ].map((milestone, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'upcoming' ? 'bg-yellow-500' : 'bg-gray-300'
              }`} />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{milestone.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{milestone.regulation}</div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(milestone.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Compliance Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Global Compliance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(regulations).map(([key, regulation]) => (
            <div key={key} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{regulation.name}</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceColor(regulation.compliance)}`}>
                  {regulation.compliance}%
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{regulation.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Compliant:</span>
                  <span className="text-green-600 dark:text-green-400">
                    {regulation.requirements.filter(r => r.status === 'compliant').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">In Progress:</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {regulation.requirements.filter(r => r.status === 'in_progress').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pending:</span>
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {regulation.requirements.filter(r => r.status === 'pending' || r.status === 'not_started').length}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    regulation.compliance >= 90 ? 'bg-green-500' :
                    regulation.compliance >= 80 ? 'bg-blue-500' :
                    regulation.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${regulation.compliance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegulatoryCompliance;