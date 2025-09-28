import React, { useState } from 'react';
import { 
  BarChart3, 
  Brain, 
  Settings, 
  PlayCircle, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Zap,
  FileText,
  Target,
  Search,
  Bell,
  User, 
  TestTube,
  GitBranch,
  Menu,
  X,
  Activity,
  Shield,
  Database,
  Eye,
  Code,
  MessageSquare,
  LogOut,
  Building,
  Crown
} from 'lucide-react';

// Authentication Components
import Login from './components/Login';
import Signup from './components/Signup';
import UserManagement from './components/UserManagement';
import TenantSettings from './components/TenantSettings';

// Core Platform Components
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import SettingsPanel from './components/Settings';

// Risk Mapping & Governance Components
import ApplicationSetup from './components/ApplicationSetup';
import UseCaseDefinition from './components/UseCaseDefinition';
import RiskClassification from './components/RiskClassification';
import GovernanceControls from './components/GovernanceControls';
import GovernanceMatrix from './components/GovernanceMatrix';

// Trust Modules
import TrustMetricsEngine from './components/TrustMetricsEngine';
import TEVVAutomationSuite from './components/TEVVAutomationSuite';
import ValidationLab from './components/ValidationLab';
import ContinuousMonitoring from './components/ContinuousMonitoring';
import ComplianceReporting from './components/ComplianceReporting';

// Supporting Components
import Playground from './components/Playground';
import PromptTesting from './components/PromptTesting';
import ModelComparison from './components/ModelComparison';
import Evaluations from './components/Evaluations';
import Benchmarks from './components/Benchmarks';
import Traces from './components/Traces';
import Analytics from './components/Analytics';
import Observability from './components/Observability';
import DataDrift from './components/DataDrift';
import Guardrails from './components/Guardrails';
import HumanFeedback from './components/HumanFeedback';
import Alerts from './components/Alerts';
import Datasets from './components/Datasets';
import Experiments from './components/Experiments';
import Reports from './components/Reports';
import RiskAssessment from './components/RiskAssessment';
import ComplianceFramework from './components/ComplianceFramework';
import ModelValidation from './components/ModelValidation';
import EthicalAI from './components/EthicalAI';
import RegulatoryCompliance from './components/RegulatoryCompliance';
import AuditTrail from './components/AuditTrail';
import ModelGovernance from './components/ModelGovernance';
import BiasAuditing from './components/BiasAuditing';
import ExplainabilityAI from './components/ExplainabilityAI';
import ModelDocumentation from './components/ModelDocumentation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Role-based navigation configuration
  const roleBasedNavigation = {
    '🔵 AI Governance Lead (Risk + Compliance)': {
      sections: ['Platform', 'Risk Mapping & Governance', 'Trust Metrics Engine', 'Compliance Reporting', 'Organization'],
      workflow: 'Risk Mapping → Trust Thresholds → Compliance Sign-off → Drift Review',
      responsibilities: ['Risk acceptance decisions', 'Compliance sign-off authority', 'Trust threshold approval', 'Governance-level decisions'],
      restrictions: ['No day-to-day testing execution', 'No technical test design'],
      actionPermissions: {
        'Risk Mapping & Governance': ['C', 'E', 'A', 'V'],
        'Trust Metrics Engine': ['C', 'A', 'V'], // thresholds only
        'TEVV Automation Suite': ['V'],
        'Validation Lab (HITL)': ['A', 'V'], // approve reports
        'Continuous Monitoring': ['A', 'V'], // governance alerts
        'Compliance Reporting': ['C', 'E', 'A', 'V']
      }
    },
    '🟢 QA Engineer (ISO 25010, Manual Validation)': {
      sections: ['Platform', 'TEVV Automation Suite', 'Validation Lab (HITL)', 'Trust Metrics Engine'],
      workflow: 'Manual Trust Validation → TEVV Design → HITL Testing → QA Evidence',
      responsibilities: ['Manual validation ownership', 'Traceability matrix maintenance', 'ISO 25010 quality dimensions', 'Defect triage and feedback'],
      restrictions: ['No risk acceptance decisions', 'No compliance sign-off'],
      actionPermissions: {
        'Risk Mapping & Governance': ['C', 'E', 'V'], // use cases, suggest risks
        'Trust Metrics Engine': ['R', 'V'], // manual validations
        'TEVV Automation Suite': ['R', 'V'], // manual/exploratory tests
        'Validation Lab (HITL)': ['R', 'V'], // manual HITL validation
        'Continuous Monitoring': ['V'],
        'Compliance Reporting': ['C', 'V'] // upload manual evidence
      }
    },
    '🟣 Automation / TEVV Engineer (EU AI Act, Test Automation)': {
      sections: ['Platform', 'Trust Metrics Engine', 'TEVV Automation Suite', 'Continuous Monitoring'],
      workflow: 'Trust Automation → TEVV Execution → CI/CD Integration → Evidence Automation',
      responsibilities: ['EU TEVV compliance execution', 'Automated evidence collection', 'Cross-module regression runs', 'Pipeline integration'],
      restrictions: ['No risk acceptance', 'No compliance sign-off', 'Technical execution focus'],
      actionPermissions: {
        'Risk Mapping & Governance': ['E', 'V'], // tag testable risks
        'Trust Metrics Engine': ['C', 'E', 'R', 'V'],
        'TEVV Automation Suite': ['C', 'E', 'R', 'V'],
        'Validation Lab (HITL)': ['V'],
        'Continuous Monitoring': ['V'],
        'Compliance Reporting': ['C', 'V'] // export evidence logs
      }
    },
    '🔴 AI SecOps Engineer (Security + DevSecOps)': {
      sections: ['Platform', 'Risk Mapping & Governance', 'TEVV Automation Suite', 'Continuous Monitoring'],
      workflow: 'Security Risk Input → Adversarial Testing → Security Validation → Incident Response',
      responsibilities: ['Incident response ownership', 'Security testing and red-teaming', 'Pipeline guardrails', 'Security monitoring'],
      restrictions: ['No business risk decisions', 'No compliance sign-off'],
      actionPermissions: {
        'Risk Mapping & Governance': ['C', 'E', 'V'], // security risks
        'Trust Metrics Engine': ['R', 'V'], // security trust metrics
        'TEVV Automation Suite': ['R', 'V'], // security tests
        'Validation Lab (HITL)': ['R', 'V'], // security HITL validations
        'Continuous Monitoring': ['C', 'E', 'R', 'A', 'V'], // full ownership
        'Compliance Reporting': ['C', 'V'] // security evidence
      }
    },
    '🟡 Domain & Ethics Reviewer (Domain + Ethics)': {
      sections: ['Platform', 'Risk Mapping & Governance', 'Trust Metrics Engine', 'Validation Lab (HITL)', 'Continuous Monitoring'],
      workflow: 'Domain Risk Input → Domain Trust Validation → Ethical HITL Review → Domain Evidence',
      responsibilities: ['Ethical threshold definition', 'Domain correctness validation', 'Independent ethics review', 'Fairness oversight'],
      restrictions: ['Independent from dev/test teams', 'No technical execution', 'Ethics and domain focus only'],
      actionPermissions: {
        'Risk Mapping & Governance': ['C', 'E', 'V'], // domain/ethical risks
        'Trust Metrics Engine': ['R', 'V'], // bias/fairness checks
        'TEVV Automation Suite': ['V'], // domain edge cases input
        'Validation Lab (HITL)': ['R', 'V'], // fairness/ethics validation
        'Continuous Monitoring': ['V'], // domain anomaly spotting
        'Compliance Reporting': ['C', 'V'] // fairness/ethics notes
      }
    }
  };

  // Mock authentication handlers
  const handleLogin = (credentials: any) => {
    setCurrentUser({
      name: 'Sarah Chen',
      email: credentials.email,
      role: credentials.role || 'Platform Admin',
      tenant: 'Acme Corporation',
      avatar: null
    });
    setIsAuthenticated(true);
  };

  const handleSignup = (data: any) => {
    setCurrentUser({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role || 'Platform Admin',
      tenant: data.tenantName,
      avatar: null
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Filter navigation items based on user role
  const getFilteredNavItems = () => {
    // All users see all sections - RBAC controls actions within components
    return navItems;
  };

  // Get current user's workflow
  const getCurrentWorkflow = () => {
    if (!currentUser?.role) return null;
    return roleBasedNavigation[currentUser.role as keyof typeof roleBasedNavigation]?.workflow || null;
  };

  // Get user's action permissions for a specific module
  const getUserPermissions = (module: string) => {
    if (!currentUser?.role) return [];
    const roleConfig = roleBasedNavigation[currentUser.role as keyof typeof roleBasedNavigation];
    return roleConfig?.actionPermissions?.[module] || ['V']; // Default to view-only
  };

  // Check if user can perform specific action
  const canPerformAction = (module: string, action: 'C' | 'E' | 'R' | 'A' | 'V') => {
    const permissions = getUserPermissions(module);
    return permissions.includes(action);
  };
  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (showSignup) {
      return <Signup onSignup={handleSignup} onShowLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />;
  }

  const navItems = [
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
      ]
    },
    
    // Module 2: Trust Metrics Engine
    { 
      category: 'Trust Metrics Engine',
      items: [
        { id: 'trust-metrics', label: 'Trust Metrics Engine', icon: Target },
        { id: 'evaluations', label: 'Trust Evaluations', icon: Target },
        { id: 'benchmarks', label: 'Trust Benchmarking', icon: BarChart3 },
        { id: 'bias-auditing', label: 'Fairness Assessment', icon: Users },
        { id: 'explainability', label: 'Explainability Engine', icon: Brain },
        { id: 'analytics', label: 'Trust Analytics', icon: TrendingUp },
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

  const renderActiveComponent = () => {
    switch (activeTab) {
      // Core Platform
      case 'dashboard':
        return <Dashboard />;
      case 'applications':
        return <Applications />;
      
      // Risk Mapping & Governance
      case 'application-setup':
        return <ApplicationSetup />;
      case 'use-case-definition':
        return <UseCaseDefinition />;
      case 'risk-classification':
        return <RiskClassification />;
      case 'governance-controls':
        return <GovernanceControls />;
      case 'governance-matrix':
        return <GovernanceMatrix />;
      
      // Trust Modules
      case 'trust-metrics':
        return <TrustMetricsEngine />;
      case 'tevv-automation':
        return <TEVVAutomationSuite />;
      case 'validation-lab':
        return <ValidationLab />;
      case 'continuous-monitoring':
        return <ContinuousMonitoring />;
      case 'compliance-reporting':
        return <ComplianceReporting />;
      
      // Supporting Components
      case 'playground':
        return <Playground />;
      case 'prompt-testing':
        return <PromptTesting />;
      case 'model-comparison':
        return <ModelComparison />;
      case 'evaluations':
        return <Evaluations />;
      case 'benchmarks':
        return <Benchmarks />;
      
      case 'traces':
        return <Traces />;
      case 'analytics':
        return <Analytics />;
      case 'observability':
        return <Observability />;
      case 'data-drift':
        return <DataDrift />;
      
      case 'guardrails':
        return <Guardrails />;
      case 'human-feedback':
        return <HumanFeedback />;
      case 'alerts':
        return <Alerts />;
      
      case 'datasets':
        return <Datasets />;
      case 'experiments':
        return <Experiments />;
      case 'reports':
        return <Reports />;
      
      case 'model-validation':
        return <ModelValidation />;
      case 'ethical-ai':
        return <EthicalAI />;
      case 'bias-auditing':
        return <BiasAuditing />;
      case 'explainability':
        return <ExplainabilityAI />;
      case 'model-documentation':
        return <ModelDocumentation />;
      
      // Organization Management
      case 'user-management':
        return <UserManagement />;
      case 'tenant-settings':
        return <TenantSettings />;
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">QUALIZEAL</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {currentUser?.role || 'GenAI Trust Platform'} • {currentUser?.tenant}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {currentUser?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{currentUser?.role}</div>
              </div>
            </div>

            {/* Workflow Indicator */}
            {getCurrentWorkflow() && (
              <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                  {getCurrentWorkflow()}
                </span>
              </div>
            )}

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600"
              />
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={() => setActiveTab('user-management')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'user-management' 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen shadow-sm`}>
          <nav className="p-4 space-y-6 h-screen overflow-y-auto">
            {getFilteredNavItems().map((section, sectionIndex) => (
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
                      {currentUser?.role && (
                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1 normal-case">
                          {/* Role-based action indicators */}
                          {section.category === 'Risk Mapping & Governance' && (
                            getUserPermissions('Risk Mapping & Governance').includes('A') ? 'C•E•A•V' :
                            getUserPermissions('Risk Mapping & Governance').includes('C') ? 'C•E•V' :
                            getUserPermissions('Risk Mapping & Governance').includes('E') ? 'E•V' : 'V'
                          )}
                          {section.category === 'Trust Metrics Engine' && (
                            getUserPermissions('Trust Metrics Engine').includes('A') ? 'C•A•V' :
                            getUserPermissions('Trust Metrics Engine').includes('R') ? 'R•V' :
                            getUserPermissions('Trust Metrics Engine').includes('C') ? 'C•E•R•V' : 'V'
                          )}
                          {section.category === 'TEVV Automation Suite' && (
                            getUserPermissions('TEVV Automation Suite').includes('C') ? 'C•E•R•V' :
                            getUserPermissions('TEVV Automation Suite').includes('R') ? 'R•V' : 'V'
                          )}
                          {section.category === 'Validation Lab (HITL)' && (
                            getUserPermissions('Validation Lab (HITL)').includes('A') ? 'A•V' :
                            getUserPermissions('Validation Lab (HITL)').includes('R') ? 'R•V' : 'V'
                          )}
                          {section.category === 'Continuous Monitoring' && (
                            getUserPermissions('Continuous Monitoring').includes('C') ? 'C•E•R•A•V' :
                            getUserPermissions('Continuous Monitoring').includes('A') ? 'A•V' : 'V'
                          )}
                          {section.category === 'Compliance Reporting' && (
                            getUserPermissions('Compliance Reporting').includes('A') ? 'C•E•A•V' :
                            getUserPermissions('Compliance Reporting').includes('C') ? 'C•V' : 'V'
                          )}
                        </div>
                      )}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm font-semibold ${
                              activeTab === item.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl transform scale-[1.02] border border-blue-300'
                                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : ''}`} />
                            <span>{item.label}</span>
                            {/* RBAC Action Indicators */}
                            {(() => {
                              const moduleMap: { [key: string]: string } = {
                                'application-setup': 'Risk Mapping & Governance',
                                'use-case-definition': 'Risk Mapping & Governance',
                                'risk-classification': 'Risk Mapping & Governance',
                                'governance-controls': 'Risk Mapping & Governance',
                                'governance-matrix': 'Risk Mapping & Governance',
                                'trust-metrics': 'Trust Metrics Engine',
                                'evaluations': 'Trust Metrics Engine',
                                'benchmarks': 'Trust Metrics Engine',
                                'bias-auditing': 'Trust Metrics Engine',
                                'explainability': 'Trust Metrics Engine',
                                'analytics': 'Trust Metrics Engine',
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
                                'reports': 'Compliance Reporting'
                              };
                              
                              const module = moduleMap[item.id];
                              if (!module) return null;
                              
                              const permissions = getUserPermissions(module);
                              const hasCreate = permissions.includes('C');
                              const hasApprove = permissions.includes('A');
                              const hasRun = permissions.includes('R');
                              
                              // Role-specific color bubbles
                              const roleColors = {
                                '🔵 AI Governance Lead (Risk + Compliance)': 'bg-blue-500',
                                '🟢 QA Engineer (ISO 25010, Manual Validation)': 'bg-green-500', 
                                '🟣 Automation / TEVV Engineer (EU AI Act, Test Automation)': 'bg-purple-500',
                                '🔴 AI SecOps Engineer (Security + DevSecOps)': 'bg-red-500',
                                '🟡 Domain & Ethics Reviewer (Domain + Ethics)': 'bg-yellow-500'
                              };
                              
                              const userRoleColor = roleColors[currentUser?.role as keyof typeof roleColors] || 'bg-gray-400';
                              
                              if (hasApprove) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full ring-2 ring-white`} title="Approval Authority" />;
                              if (hasCreate) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full`} title="Create/Configure Authority" />;
                              if (hasRun) return <div className={`ml-auto w-2 h-2 ${userRoleColor} rounded-full opacity-75`} title="Execute Authority" />;
                              return <div className="ml-auto w-2 h-2 bg-gray-300 rounded-full" title="View Only" />;
                            })()}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-900">
          {/* Pass RBAC functions to components */}
          {React.cloneElement(renderActiveComponent() as React.ReactElement, {
            currentUser,
            canPerformAction,
            getUserPermissions
          })}
        </main>
      </div>
    </div>
  );
}

export default App;