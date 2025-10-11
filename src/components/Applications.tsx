import React, { useState } from 'react';
import { ApplicationMetadata } from '../types';
import { 
  Plus, 
  Settings, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Code,
  Database,
  Globe,
  Zap,
  Shield
} from 'lucide-react';

const Applications: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});

  const applications: (ApplicationMetadata & {
    id: string;
    description: string;
    status: string;
    endpoint: string;
    apiKey: string;
    lastActivity: string;
    dailyRequests: number;
    avgResponseTime: string;
    qualityScore: number;
    tags: string[];
    industry?: string;
    useCase?: string;
    trustScore?: number;
    complianceStatus?: string;
  })[] = [
    {
      id: '1',
      app_name: 'Healthcare Triage Assistant',
      app_type: 'chatbot',
      version: '3.2.0',
      environment: 'prod',
      region: 'us',
      description: 'AI-powered medical triage system reducing diagnostic errors by 40%',
      status: 'active',
      endpoint: 'https://healthcare-api.validaite.com/triage',
      apiKey: 'sk-health-abc123...xyz789',
      lastActivity: '2 minutes ago',
      dailyRequests: 2847,
      avgResponseTime: '0.8s',
      qualityScore: 96,
      tags: ['healthcare', 'triage', 'eu-ai-act', 'production'],
      industry: 'Healthcare',
      useCase: 'Medical Triage & Diagnosis Support',
      trustScore: 94.2,
      complianceStatus: 'EU AI Act Certified'
    },
    {
      id: '2',
      app_name: 'Financial Lending Copilot',
      app_type: 'copilot',
      version: '2.8.0',
      environment: 'prod',
      region: 'us',
      description: 'AI lending assistant preventing bias and ensuring fair credit decisions',
      status: 'active',
      endpoint: 'https://finance-api.validaite.com/lending',
      apiKey: 'sk-fin-def456...uvw012',
      lastActivity: '5 minutes ago',
      dailyRequests: 1456,
      avgResponseTime: '1.1s',
      qualityScore: 93,
      tags: ['finance', 'lending', 'fairness', 'production'],
      industry: 'Financial Services',
      useCase: 'Fair Lending & Credit Assessment',
      trustScore: 91.8,
      complianceStatus: 'SOX Compliant'
    },
    {
      id: '3',
      app_name: 'SAP Enterprise Copilot',
      app_type: 'copilot',
      version: '1.5.0',
      environment: 'prod',
      region: 'eu',
      description: 'Enterprise productivity copilot with advanced safety controls',
      status: 'active',
      endpoint: 'https://sap-api.validaite.com/copilot',
      apiKey: 'sk-sap-ghi789...rst345',
      lastActivity: '1 minute ago',
      dailyRequests: 3247,
      avgResponseTime: '0.9s',
      qualityScore: 95,
      tags: ['enterprise', 'sap', 'copilot', 'productivity'],
      industry: 'Enterprise Software',
      useCase: 'Enterprise Productivity & Automation',
      trustScore: 96.1,
      complianceStatus: 'ISO 27001 Certified'
    },
    {
      id: '4',
      app_name: 'Government Citizen Services',
      app_type: 'chatbot',
      version: '2.0.0',
      environment: 'prod',
      region: 'us',
      description: 'Public sector AI reducing call center costs by 60% while building citizen trust',
      status: 'active',
      endpoint: 'https://gov-api.validaite.com/services',
      apiKey: 'sk-gov-jkl012...def678',
      lastActivity: '3 minutes ago',
      dailyRequests: 1892,
      avgResponseTime: '1.0s',
      qualityScore: 92,
      tags: ['government', 'public-sector', 'citizen-services'],
      industry: 'Government',
      useCase: 'Citizen Services & Support',
      trustScore: 89.7,
      complianceStatus: 'FedRAMP Authorized'
    },
    {
      id: '5',
      app_name: 'Retail Brand Safety Assistant',
      app_type: 'agent',
      version: '1.7.0',
      environment: 'prod',
      region: 'us',
      description: 'AI content moderation eliminating brand safety risks and boosting satisfaction',
      status: 'active',
      endpoint: 'https://retail-api.qualizeal.com/moderation',
      apiKey: 'sk-qlz-retail-mno345...abc123',
      lastActivity: '30 seconds ago',
      dailyRequests: 4156,
      avgResponseTime: '0.6s',
      qualityScore: 97,
      tags: ['retail', 'brand-safety', 'content-moderation'],
      industry: 'Retail & E-commerce',
      useCase: 'Brand Safety & Content Moderation',
      trustScore: 95.4,
      complianceStatus: 'Brand Safety Certified'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'development': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'development': return <Activity className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const toggleApiKeyVisibility = (appId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '...' + key.substring(key.length - 8);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Applications</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your GenAI applications</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{app.app_name}</h3>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span className="capitalize">{app.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{app.description}</p>

            {/* Industry & Use Case */}
            {app.industry && (
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {app.industry} • {app.useCase}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                  <span>Trust Score: {app.trustScore}%</span>
                  <span>{app.complianceStatus}</span>
                </div>
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{app.dailyRequests.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Daily Requests</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{app.qualityScore}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Quality Score</div>
              </div>
              {app.trustScore && (
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{app.trustScore}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Trust Score</div>
                </div>
              )}
            </div>

            {/* Technical Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">App Type:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{app.app_type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Version:</span>
                <span className="font-medium text-gray-900 dark:text-white">{app.version}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                <span className="font-medium text-gray-900 dark:text-white">{app.avgResponseTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Environment:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  app.environment === 'production' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : app.environment === 'dev'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {app.environment.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Region:</span>
                <span className="font-medium text-gray-900 dark:text-white uppercase">{app.region}</span>
              </div>
            </div>

            {/* API Configuration */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Endpoint</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                      {app.endpoint}
                    </code>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">API Key</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                      {showApiKey[app.id] ? app.apiKey : maskApiKey(app.apiKey)}
                    </code>
                    <button 
                      onClick={() => toggleApiKeyVisibility(app.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showApiKey[app.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-4">
              {app.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Last activity: {app.lastActivity}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Application</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Connect your GenAI application for monitoring and evaluation
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application Name *
                    </label>
                    <input
                      type="text"
                      placeholder="My GenAI Application"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application Type *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Chatbot</option>
                      <option>RAG System</option>
                      <option>AI Agent</option>
                      <option>Copilot</option>
                      <option>Multimodal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Context & Objectives
                  </label>
                  <textarea
                    placeholder="Describe the business problem this AI solves, target outcomes, and success metrics..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Healthcare</option>
                      <option>Financial Services</option>
                      <option>Enterprise Software</option>
                      <option>Government</option>
                      <option>Retail & E-commerce</option>
                      <option>Technology</option>
                      <option>Manufacturing</option>
                      <option>Education</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Use Case *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Medical Triage & Diagnosis</option>
                      <option>Fair Lending & Credit Assessment</option>
                      <option>Enterprise Productivity</option>
                      <option>Citizen Services & Support</option>
                      <option>Brand Safety & Content Moderation</option>
                      <option>Customer Support</option>
                      <option>Content Generation</option>
                      <option>Code Review & Development</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      EU AI Act Risk Classification *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Unacceptable Risk (Prohibited)</option>
                      <option>High Risk (Mandatory TEVV)</option>
                      <option>Limited Risk (Transparency)</option>
                      <option>Minimal Risk (No Obligations)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected User Volume
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>&lt; 1K users/month</option>
                      <option>1K - 10K users/month</option>
                      <option>10K - 100K users/month</option>
                      <option>100K - 1M users/month</option>
                      <option>&gt; 1M users/month</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Environment *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Development</option>
                      <option>QA</option>
                      <option>UAT</option>
                      <option>Production</option>
                      <option>Sandbox</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Version *
                    </label>
                    <input
                      type="text"
                      placeholder="1.0.0"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Region *
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>US</option>
                      <option>EU</option>
                      <option>APAC</option>
                      <option>Global</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Applicable Compliance Frameworks *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['NIST RMF', 'EU AI Act', 'GDPR', 'HIPAA', 'SOX', 'CCPA', 'ISO 27001', 'SOC 2', 'FedRAMP'].map(framework => (
                      <label key={framework} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stakeholder Impact Assessment
                  </label>
                  <textarea
                    placeholder="Identify key stakeholders and potential impacts (patients, customers, employees, society)..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Mitigation Strategy
                  </label>
                  <textarea
                    placeholder="Describe planned risk mitigation measures and controls..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  />
                </div>
              </div>

              {/* API Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>API Configuration</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Endpoint *
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.example.com/chat"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Authentication Method
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>API Key</option>
                      <option>Bearer Token</option>
                      <option>OAuth 2.0</option>
                      <option>mTLS Certificate</option>
                      <option>SAML</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model Provider
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>OpenAI</option>
                      <option>Anthropic</option>
                      <option>Google</option>
                      <option>Azure OpenAI</option>
                      <option>AWS Bedrock</option>
                      <option>Hugging Face</option>
                      <option>Cohere</option>
                      <option>Mistral</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key / Token *
                  </label>
                  <input
                    type="password"
                    placeholder="sk-proj-..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rate Limit (requests/minute)
                    </label>
                    <input
                      type="number"
                      placeholder="60"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      placeholder="30"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Monitoring Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Monitoring Configuration</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sampling Rate (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={100}
                      min={1}
                      max={100}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Retention (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      min={1}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Trust Metrics to Monitor
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Accuracy Score', 'Fairness Assessment', 'Robustness Testing', 'Transparency Score', 'Privacy Compliance', 'Safety Validation'].map(metric => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Evaluation Metrics
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Quality Score', 'Toxicity Detection', 'Bias Detection', 'Coherence', 'Factuality', 'Cost Tracking'].map(metric => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Alert Thresholds
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Quality Threshold (%)</label>
                      <input
                        type="number"
                        defaultValue={85}
                        min={0}
                        max={100}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Max Toxicity (%)</label>
                      <input
                        type="number"
                        defaultValue={5}
                        min={0}
                        max={100}
                        step={0.1}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">Max Response Time (s)</label>
                      <input
                        type="number"
                        defaultValue={5}
                        min={1}
                        step={0.1}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Governance Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Governance Configuration</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Owner (CIO/CDO)
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Madhu Ronanki (CIO)</option>
                      <option>Mike Johnson (CDO)</option>
                      <option>Alex Kim (CTO)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Security Owner (CISO)
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Alex Kim (CISO)</option>
                      <option>Emily Davis (Deputy CISO)</option>
                      <option>Jordan Smith (Security Lead)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Compliance Officer
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Emily Davis (Compliance)</option>
                      <option>Taylor Brown (Risk)</option>
                      <option>Jordan Smith (Audit)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      QA Lead
                    </label>
                    <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Jordan Smith (QA Lead)</option>
                      <option>Taylor Brown (Test Manager)</option>
                      <option>Casey Wilson (QA Engineer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Approvals for Deployment
                  </label>
                  <div className="space-y-2">
                    {['Risk Assessment Completion', 'Security Review Approval', 'Compliance Validation', 'Ethics Review (High Risk)', 'Performance Benchmarking', 'Documentation Completeness'].map(approval => (
                      <label key={approval} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{approval}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="chatbot, customer-support, production"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                * Required fields
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Test Connection
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Integration Guide</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">SDK Integration</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                <div># Install validAIte SDK</div>
                <div>pip install validaite-sdk</div>
                <div className="mt-2">from validaite import TrustEvaluator</div>
                <div className="mt-1">evaluator = TrustEvaluator(</div>
                <div className="ml-4">api_key="your_key",</div>
                <div className="ml-4">application_id="app_123"</div>
                <div>)</div>
                <div className="mt-2"># Log with trust metrics</div>
                <div>evaluator.log_interaction(</div>
                <div className="ml-4">prompt=prompt,</div>
                <div className="ml-4">response=response,</div>
                <div className="ml-4">user_context=user_context,</div>
                <div className="ml-4">trust_metrics=["accuracy", "fairness"]</div>
                <div>)</div>
              </code>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">REST API</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                <div>POST /api/v1/trust/evaluate</div>
                <div className="mt-2">{"{"}</div>
                <div>  "application_id": "app_123",</div>
                <div>  "trace_id": "tr_abc123",</div>
                <div>  "prompt": "Your prompt",</div>
                <div>  "response": "AI response",</div>
                <div>  "user_context": {"{"}</div>
                <div>    "user_id": "user_456",</div>
                <div>    "persona": "customer"</div>
                <div>  {"}"},</div>
                <div>  "trust_metrics": ["accuracy", "fairness"],</div>
                <div>  "evaluation_mode": "real_time"</div>
                <div>{"}"}</div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;