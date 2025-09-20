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
import DataInputForm from './components/DataInputForm';

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

  // Mock authentication handlers
  const handleLogin = (credentials: any) => {
    setCurrentUser({
      name: 'Sarah Chen',
      email: credentials.email,
      role: 'Platform Admin',
      tenant: 'Acme Corporation',
      avatar: null
    });
    setIsAuthenticated(true);
  };

  const handleSignup = (data: any) => {
    setCurrentUser({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: 'Platform Admin',
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
        { id: 'data-input', label: 'Use Case Definition', icon: Database },
        { id: 'risk-assessment', label: 'Risk Classification', icon: Shield },
        { id: 'model-governance', label: 'Governance Controls', icon: Settings },
        { id: 'compliance-framework', label: 'Framework Mapping', icon: FileText },
        { id: 'regulatory-compliance', label: 'Regulatory Reports', icon: Shield },
        { id: 'audit-trail', label: 'Evidence Packs', icon: Eye },
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
      case 'data-input':
        return <DataInputForm />;
      
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
      
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'compliance-framework':
        return <ComplianceFramework />;
      case 'model-governance':
        return <ModelGovernance />;
      case 'audit-trail':
        return <AuditTrail />;
      
      case 'model-validation':
        return <ModelValidation />;
      case 'ethical-ai':
        return <EthicalAI />;
      case 'bias-auditing':
        return <BiasAuditing />;
      case 'explainability':
        return <ExplainabilityAI />;
      case 'regulatory-compliance':
        return <RegulatoryCompliance />;
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">QUALIZEAL</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">{currentUser?.tenant || 'GenAI Trust Platform'}</p>
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
        <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen shadow-sm`}>
          <nav className="p-4 space-y-6 h-screen overflow-y-auto">
            {navItems.map((section, sectionIndex) => (
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
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;