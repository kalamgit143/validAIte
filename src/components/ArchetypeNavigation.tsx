import React from 'react';
import { 
  BarChart3, Brain, Settings, PlayCircle, Users, TrendingUp,
  AlertTriangle, Zap, FileText, Target, Bell, TestTube,
  Activity, Shield, Database, Eye, Code, MessageSquare,
  Building, Crown, Gavel
} from 'lucide-react';
import { getArchetypeFromRole, getArchetypeNavigation, archetypeConfigs } from '../utils/archetypes';

interface ArchetypeNavigationProps {
  currentUser: any;
  activeTab: string;
  onNavigate: (tab: string) => void;
  getUserPermissions: (module: string) => string[];
}

const ArchetypeNavigation: React.FC<ArchetypeNavigationProps> = ({ 
  currentUser, 
  activeTab, 
  onNavigate, 
  getUserPermissions 
}) => {
  const archetypeId = getArchetypeFromRole(currentUser?.role || '');
  const config = archetypeConfigs[archetypeId];
  const allowedTabs = getArchetypeNavigation(archetypeId);

  const allNavItems = [
    // Core Platform
    { 
      category: 'Platform',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'applications', label: 'AI Applications', icon: Zap },
      ]
    },
    
    // Module 1: Risk Mapping & Governance
    { 
      category: 'Risk Mapping & Governance',
      items: [
        { id: 'application-setup', label: 'Application Setup', icon: Database },
        { id: 'use-case-definition', label: 'Use Case Definition', icon: FileText },
        { id: 'risk-classification', label: 'Risk Classification', icon: AlertTriangle },
        { id: 'governance-controls', label: 'Governance Controls', icon: Shield },
        { id: 'governance-matrix', label: 'Governance Matrix', icon: Target },
        { id: 'risk-assessment', label: 'Risk Assessment', icon: AlertTriangle },
      ]
    },
    
    // Module 2: Trust Metrics Engine
    { 
      category: 'Trust Metrics Engine',
      items: [
        { id: 'trust-metrics', label: 'Trust Metrics Engine', icon: Target },
        { id: 'evaluations', label: 'Trust Evaluations', icon: Target },
        { id: 'trust-benchmarking', label: 'Trust Benchmarking', icon: BarChart3 },
        { id: 'fairness-assessment', label: 'Fairness Assessment', icon: Users },
        { id: 'explainability-engine', label: 'Explainability Engine', icon: Brain },
        { id: 'trust-analytics', label: 'Trust Analytics', icon: TrendingUp },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'benchmarks', label: 'Benchmarks', icon: Target },
        { id: 'bias-auditing', label: 'Bias Auditing', icon: Users },
        { id: 'explainability', label: 'Explainability', icon: Brain },
      ]
    },
    
    // Module 3: TEVV Automation Suite
    { 
      category: 'TEVV Automation Suite',
      items: [
        { id: 'tevv-automation', label: 'TEVV Automation Suite', icon: Activity },
        { id: 'model-validation', label: 'Automated Validation', icon: Target },
        { id: 'playground', label: 'Testing Playground', icon: PlayCircle },
        { id: 'prompt-testing', label: 'Prompt Evolution', icon: MessageSquare },
        { id: 'model-comparison', label: 'Model Testing', icon: Brain },
        { id: 'datasets', label: 'Test Data Management', icon: Database },
      ]
    },
    
    // Module 4: Validation Lab (HITL)
    { 
      category: 'Validation Lab (HITL)',
      items: [
        { id: 'validation-lab', label: 'Validation Lab (HITL)', icon: Users },
        { id: 'human-feedback', label: 'Human-in-the-Loop', icon: Users },
        { id: 'ethical-ai', label: 'Ethics Review Board', icon: Users },
        { id: 'experiments', label: 'Human Validation', icon: Eye },
        { id: 'model-documentation', label: 'Expert Documentation', icon: FileText },
      ]
    },
    
    // Module 5: Continuous Monitoring
    { 
      category: 'Continuous Monitoring',
      items: [
        { id: 'continuous-monitoring', label: 'Continuous Monitoring', icon: Activity },
        { id: 'traces', label: 'Real-time Tracing', icon: Activity },
        { id: 'observability', label: 'System Health', icon: Activity },
        { id: 'data-drift', label: 'Drift Detection', icon: AlertTriangle },
        { id: 'guardrails', label: 'Safety Guardrails', icon: Shield },
        { id: 'alerts', label: 'Incident Response', icon: Bell },
      ]
    },
    
    // Module 6: Compliance Reporting
    { 
      category: 'Compliance Reporting',
      items: [
        { id: 'compliance-reporting', label: 'Compliance Reporting', icon: FileText },
        { id: 'reports', label: 'Compliance Reports', icon: FileText },
        { id: 'audit-trail', label: 'Audit Trail', icon: FileText },
      ]
    },
    
    // Organization Management
    { 
      category: 'Organization',
      items: [
        { id: 'user-management', label: 'User Management', icon: Users },
        { id: 'tenant-settings', label: 'Organization Settings', icon: Building },
        { id: 'settings', label: 'Platform Settings', icon: Settings },
      ]
    }
  ];

  // Filter navigation based on archetype
  const filteredNavItems = allNavItems.map(section => ({
    ...section,
    items: section.items.filter(item => allowedTabs.includes(item.id))
  })).filter(section => section.items.length > 0);

  // Get module permissions for display
  const getModulePermissions = (category: string) => {
    const moduleMap: { [key: string]: string } = {
      'Risk Mapping & Governance': 'Risk Mapping & Governance',
      'Trust Metrics Engine': 'Trust Metrics Engine',
      'TEVV Automation Suite': 'TEVV Automation Suite',
      'Validation Lab (HITL)': 'Validation Lab (HITL)',
      'Continuous Monitoring': 'Continuous Monitoring',
      'Compliance Reporting': 'Compliance Reporting'
    };
    
    const module = moduleMap[category];
    if (!module) return '';
    
    const permissions = getUserPermissions(module);
    const permissionLabels = {
      'C': 'Create',
      'E': 'Edit', 
      'R': 'Run',
      'A': 'Approve',
      'V': 'View'
    };
    return permissions.map(p => permissionLabels[p as keyof typeof permissionLabels]).join(' • ');
  };

  // Get role color for permission indicators
  const getRoleColor = () => {
    const roleColors = {
      'cio_cdo': 'bg-blue-500',
      'qa_tevv_engineer': 'bg-green-500',
      'tevv_automation_engineer': 'bg-purple-500',
      'ai_secops_engineer': 'bg-red-500',
      'domain_ethics_reviewer': 'bg-yellow-500'
    };
    return roleColors[archetypeId] || 'bg-gray-400';
  };

  const getPermissionIndicator = (category: string, itemId: string) => {
    const moduleMap: { [key: string]: string } = {
      'application-setup': 'Risk Mapping & Governance',
      'use-case-definition': 'Risk Mapping & Governance',
      'risk-classification': 'Risk Mapping & Governance',
      'governance-controls': 'Risk Mapping & Governance',
      'governance-matrix': 'Risk Mapping & Governance',
      'risk-assessment': 'Risk Mapping & Governance',
      'trust-metrics': 'Trust Metrics Engine',
      'evaluations': 'Trust Metrics Engine',
      'trust-benchmarking': 'Trust Metrics Engine',
      'fairness-assessment': 'Trust Metrics Engine',
      'explainability-engine': 'Trust Metrics Engine',
      'trust-analytics': 'Trust Metrics Engine',
      'analytics': 'Trust Metrics Engine',
      'benchmarks': 'Trust Metrics Engine',
      'bias-auditing': 'Trust Metrics Engine',
      'explainability': 'Trust Metrics Engine',
      'tevv-automation': 'TEVV Automation Suite',
      'model-validation': 'TEVV Automation Suite',
      'playground': 'TEVV Automation Suite',
      'prompt-testing': 'TEVV Automation Suite',
      'model-comparison': 'TEVV Automation Suite',
      'datasets': 'TEVV Automation Suite',
      'validation-lab': 'Validation Lab (HITL)',
      'human-feedback': 'Validation Lab (HITL)',
      'ethical-ai': 'Validation Lab (HITL)',
      'experiments': 'Validation Lab (HITL)',
      'model-documentation': 'Validation Lab (HITL)',
      'continuous-monitoring': 'Continuous Monitoring',
      'traces': 'Continuous Monitoring',
      'observability': 'Continuous Monitoring',
      'data-drift': 'Continuous Monitoring',
      'guardrails': 'Continuous Monitoring',
      'alerts': 'Continuous Monitoring',
      'compliance-reporting': 'Compliance Reporting',
      'reports': 'Compliance Reporting',
      'audit-trail': 'Compliance Reporting'
    };
    
    const module = moduleMap[itemId];
    if (!module) return null;
    
    const permissions = getUserPermissions(module);
    const hasCreate = permissions.includes('C');
    const hasApprove = permissions.includes('A');
    const hasRun = permissions.includes('R');
    
    const userRoleColor = getRoleColor();
    
    if (hasApprove) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full ring-2 ring-white`} title="Approval Authority" />;
    if (hasCreate) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full`} title="Create/Configure Authority" />;
    if (hasRun) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full opacity-75`} title="Execute Authority" />;
    return <div className="ml-auto w-2 h-2 bg-gray-300 rounded-full" title="View Only" />;
  };

  return (
    <nav className="p-4 space-y-6 h-screen overflow-y-auto">
      {/* Archetype Header */}
      <div className={`bg-gradient-to-r ${config.color} p-4 rounded-xl text-white mb-6`}>
        <div className="flex items-center space-x-3">
          <config.icon className="w-8 h-8" />
          <div>
            <div className="font-bold text-lg">{config.name}</div>
            <div className="text-white/80 text-sm">{config.title}</div>
          </div>
        </div>
      </div>

      {filteredNavItems.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.items.length > 0 && (
            <>
              <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 px-3 ${
                section.category === 'Platform' ? 'text-blue-700 dark:text-blue-300' :
                section.category === 'Risk Mapping & Governance' ? 'text-red-700 dark:text-red-300' :
                section.category === 'Trust Metrics Engine' ? 'text-emerald-700 dark:text-emerald-300' :
                section.category === 'TEVV Automation Suite' ? 'text-violet-700 dark:text-violet-300' :
                section.category === 'Validation Lab (HITL)' ? 'text-amber-700 dark:text-amber-300' :
                section.category === 'Continuous Monitoring' ? 'text-orange-700 dark:text-orange-300' :
                section.category === 'Compliance Reporting' ? 'text-indigo-700 dark:text-indigo-300' :
                section.category === 'Organization' ? 'text-slate-700 dark:text-slate-300' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {section.category}
                <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1 normal-case">
                  {getModulePermissions(section.category)}
                </div>
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm font-semibold ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl transform scale-[1.02] border border-blue-300'
                          : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : ''}`} />
                      <span>{item.label}</span>
                      {getPermissionIndicator(section.category, item.id)}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Archetype Workflow Status */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Current Workflow</h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {config.focus[0]} Focus
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
          Workflow: {config.description}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500 dark:text-gray-500">Active</span>
        </div>
      </div>

      {/* Permission Legend */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Permission Legend</h5>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 ${getRoleColor()} rounded-full ring-2 ring-white`}></div>
            <span>Approve</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 ${getRoleColor()} rounded-full`}></div>
            <span>Create/Edit</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 ${getRoleColor()} rounded-full opacity-75`}></div>
            <span>Execute</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>View Only</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ArchetypeNavigation;