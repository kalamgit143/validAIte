import React, { useState } from 'react';
import { 
  Database, 
  Building, 
  Globe, 
  Users,
  Shield,
  Target,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Download,
  Save,
  RefreshCw,
  FileText,
  Settings,
  Crown,
  Gavel,
  Code,
  Brain,
  Lock,
  Activity,
  BarChart3,
  Calendar,
  Mail
} from 'lucide-react';

const ApplicationSetup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    applicationName: '',
    applicationDescription: '',
    businessObjective: '',
    industry: '',
    useCase: '',
    riskClassification: '',
    expectedUserVolume: '',
    stakeholderImpact: '',
    complianceFrameworks: [] as string[],
    governanceOwners: {
      riskOwner: '',
      securityOwner: '',
      complianceOfficer: '',
      qaLead: ''
    }
  });

  const steps = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Application context and business objectives',
      icon: Database,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Risk & Compliance',
      description: 'Risk classification and regulatory requirements',
      icon: Shield,
      color: 'red'
    },
    {
      id: 3,
      title: 'Governance Assignment',
      description: 'Stakeholder roles and responsibilities',
      icon: Users,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Review & Submit',
      description: 'Final review and governance approval',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const industries = [
    'Healthcare',
    'Financial Services',
    'Government',
    'Enterprise Software',
    'Retail & E-commerce',
    'Manufacturing',
    'Education',
    'Technology'
  ];

  const useCases = [
    'Medical Triage & Diagnosis Support',
    'Fair Lending & Credit Assessment',
    'Enterprise Productivity & Automation',
    'Citizen Services & Support',
    'Brand Safety & Content Moderation',
    'Customer Support',
    'Content Generation',
    'Code Review & Development'
  ];

  const complianceFrameworks = [
    'NIST AI RMF',
    'EU AI Act',
    'GDPR',
    'HIPAA',
    'SOX',
    'CCPA',
    'ISO 27001',
    'SOC 2',
    'FedRAMP',
    'PCI DSS'
  ];

  const governanceRoles = [
    { id: 'riskOwner', title: 'Risk Owner (CIO/CDO)', options: ['Sarah Chen (CIO)', 'Mike Johnson (CDO)', 'Alex Kim (CTO)'] },
    { id: 'securityOwner', title: 'Security Owner (CISO)', options: ['Alex Kim (CISO)', 'Emily Davis (Deputy CISO)', 'Jordan Smith (Security Lead)'] },
    { id: 'complianceOfficer', title: 'Compliance Officer', options: ['Emily Davis (Compliance)', 'Taylor Brown (Risk)', 'Jordan Smith (Audit)'] },
    { id: 'qaLead', title: 'QA Lead', options: ['Jordan Smith (QA Lead)', 'Taylor Brown (Test Manager)', 'Casey Wilson (QA Engineer)'] }
  ];

  const handleFrameworkToggle = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      complianceFrameworks: prev.complianceFrameworks.includes(framework)
        ? prev.complianceFrameworks.filter(f => f !== framework)
        : [...prev.complianceFrameworks, framework]
    }));
  };

  const getStepColor = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    switch (step?.color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'red': return 'from-red-500 to-red-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'green': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Application Context & Business Objectives</h3>
        </div>
        <p className="text-blue-800 dark:text-blue-200">
          Define the application context, business objectives, and stakeholder impact to establish governance foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Name *
          </label>
          <input
            type="text"
            value={formData.applicationName}
            onChange={(e) => setFormData(prev => ({ ...prev, applicationName: e.target.value }))}
            placeholder="Healthcare Triage Assistant"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry Domain *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Application Description *
        </label>
        <textarea
          value={formData.applicationDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, applicationDescription: e.target.value }))}
          placeholder="AI-powered medical triage system reducing diagnostic errors by 40%"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Objective & Expected Impact *
        </label>
        <textarea
          value={formData.businessObjective}
          onChange={(e) => setFormData(prev => ({ ...prev, businessObjective: e.target.value }))}
          placeholder="Reduce diagnostic errors by 40%, improve patient flow efficiency, generate $2.4M annual cost savings"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Use Case *
          </label>
          <select
            value={formData.useCase}
            onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Use Case</option>
            {useCases.map(useCase => (
              <option key={useCase} value={useCase}>{useCase}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expected User Volume
          </label>
          <select
            value={formData.expectedUserVolume}
            onChange={(e) => setFormData(prev => ({ ...prev, expectedUserVolume: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Volume</option>
            <option value="< 1K users/month">< 1K users/month</option>
            <option value="1K - 10K users/month">1K - 10K users/month</option>
            <option value="10K - 100K users/month">10K - 100K users/month</option>
            <option value="100K - 1M users/month">100K - 1M users/month</option>
            <option value="> 1M users/month">> 1M users/month</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Stakeholder Impact Assessment *
        </label>
        <textarea
          value={formData.stakeholderImpact}
          onChange={(e) => setFormData(prev => ({ ...prev, stakeholderImpact: e.target.value }))}
          placeholder="Identify key stakeholders and potential impacts (patients, healthcare providers, regulators, society)"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Risk Classification & Regulatory Mapping</h3>
        </div>
        <p className="text-red-800 dark:text-red-200">
          Classify AI system risk level and map applicable regulatory requirements for compliance planning.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          EU AI Act Risk Classification *
        </label>
        <select
          value={formData.riskClassification}
          onChange={(e) => setFormData(prev => ({ ...prev, riskClassification: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        >
          <option value="">Select Risk Classification</option>
          <option value="unacceptable">Unacceptable Risk (Prohibited)</option>
          <option value="high">High Risk (Mandatory TEVV)</option>
          <option value="limited">Limited Risk (Transparency Obligations)</option>
          <option value="minimal">Minimal Risk (No Specific Obligations)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Applicable Compliance Frameworks *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {complianceFrameworks.map(framework => (
            <label key={framework} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={formData.complianceFrameworks.includes(framework)}
                onChange={() => handleFrameworkToggle(framework)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Risk Classification Impact</h4>
            <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
              <p><strong>High Risk:</strong> Requires mandatory TEVV (Testing, Evaluation, Validation, Verification)</p>
              <p><strong>Limited Risk:</strong> Transparency obligations and user notification requirements</p>
              <p><strong>Minimal Risk:</strong> No specific regulatory obligations under EU AI Act</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">Governance Stakeholder Assignment</h3>
        </div>
        <p className="text-purple-800 dark:text-purple-200">
          Assign governance roles and responsibilities to ensure proper oversight and accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {governanceRoles.map(role => (
          <div key={role.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {role.title} *
            </label>
            <select
              value={formData.governanceOwners[role.id as keyof typeof formData.governanceOwners]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                governanceOwners: {
                  ...prev.governanceOwners,
                  [role.id]: e.target.value
                }
              }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select {role.title}</option>
              {role.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Governance Responsibilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">CIO/CDO (Risk Owner)</h5>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Strategic AI ownership and accountability</li>
              <li>• Risk classification approval</li>
              <li>• Business impact assessment</li>
              <li>• Final deployment authorization</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">CISO (Security Owner)</h5>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Security risk assessment</li>
              <li>• Threat model validation</li>
              <li>• Security control implementation</li>
              <li>• Incident response planning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Review & Governance Approval</h3>
        </div>
        <p className="text-green-800 dark:text-green-200">
          Review all information and submit for governance approval workflow.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Application Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Application Name</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.applicationName || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Industry</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.industry || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Use Case</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.useCase || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Risk Classification</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.riskClassification || 'Not specified'}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Risk Owner</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.governanceOwners.riskOwner || 'Not assigned'}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Security Owner</span>
              <div className="font-medium text-gray-900 dark:text-white">{formData.governanceOwners.securityOwner || 'Not assigned'}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-500">Compliance Frameworks</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.complianceFrameworks.map(framework => (
                  <span key={framework} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Next Steps After Submission</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-blue-800 dark:text-blue-200">Risk assessment initiation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-blue-800 dark:text-blue-200">Governance stakeholder notification</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <span className="text-blue-800 dark:text-blue-200">TEVV automation suite setup</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <span className="text-blue-800 dark:text-blue-200">Trust metrics engine configuration</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Application Setup</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Configure application context and governance stakeholders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all ${
                    isActive 
                      ? `bg-gradient-to-r ${getStepColor(step.id)} text-white shadow-lg transform scale-105`
                      : isCompleted
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-white/20' : ''
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs opacity-80">{step.description}</div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded-full ${
                    activeStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-96">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Step {activeStep} of {steps.length}
          </div>
          
          {activeStep < steps.length ? (
            <button
              onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
              className={`px-6 py-3 bg-gradient-to-r ${getStepColor(activeStep)} text-white rounded-lg hover:opacity-90 transition-all shadow-lg`}
            >
              Next Step
            </button>
          ) : (
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg">
              Submit for Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSetup;