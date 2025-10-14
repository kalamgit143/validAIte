import React, { useState } from 'react';
import {
  Brain,
  Shield,
  TrendingUp,
  FileText,
  Code,
  Activity,
  CheckCircle,
  Menu,
  X,
  LogOut,
  FolderOpen,
  Layers,
  Home,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

// 10-Stage AI Governance Workflow
import ApplicationSetup from './components/ApplicationSetup';
import RiskIdentification from './components/RiskIdentification';
import MetricsDefinition from './components/MetricsDefinition';
import DatasetGeneration from './components/DatasetGeneration';
import TestCaseCreation from './components/TestCaseCreation';
import TrustScoreComputation from './components/TrustScoreComputation';
import ExplainabilityAI from './components/ExplainabilityAI';
import TrustMatrix from './components/TrustMatrix';
import AuthorizationEngine from './components/AuthorizationEngine';
import ContinuousMonitoring from './components/ContinuousMonitoring';

// Dashboard
import Dashboard from './components/Dashboard';

// Reference & Tools
import RMFValidAIteMapping from './components/RMFValidAIteMapping';
import ControlLibrary from './components/ControlLibrary';
import MetricsThresholdDashboard from './components/MetricsThresholdDashboard';
import EvidencePackGenerator from './components/EvidencePackGenerator';

// Authentication Components
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (credentials: any) => {
    setCurrentUser({
      name: 'Madhu Ronanki',
      email: credentials.email,
      role: credentials.role || 'Platform Admin',
      tenant: 'QualiZeal',
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
    setActiveTab('stage-0');
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (showSignup) {
      return <Signup onSignup={handleSignup} onShowLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />;
  }

  const navItems = [
    {
      category: 'Overview',
      items: [
        { id: 'home', label: 'Dashboard', icon: Home, description: 'Role-based governance overview' },
      ]
    },
    {
      category: 'AI Governance Workflow',
      items: [
        { id: 'stage-0', label: 'Application Setup', icon: Brain, description: 'Configure application information and setup' },
        { id: 'risk-identification', label: 'Risk Identification', icon: Shield, description: 'Identify and classify potential risks' },
        { id: 'metrics-definition', label: 'Metrics Definition', icon: TrendingUp, description: 'Define measurable trust metrics' },
        { id: 'dataset-generation', label: 'Dataset Generation', icon: FileText, description: 'Generate testable evaluation datasets' },
        { id: 'test-case-creation', label: 'Test Case Creation', icon: Code, description: 'Generate automation scripts' },
        { id: 'trust-score-computation', label: 'Trust Score Computation', icon: TrendingUp, description: 'Execute tests and compute scores' },
        { id: 'explainability-evidence', label: 'Explainability & Evidence', icon: FileText, description: 'HITL evidence review' },
        { id: 'trust-matrix', label: 'Trust Matrix', icon: Shield, description: 'Unified 360° trust view' },
        { id: 'authorization-engine', label: 'Authorization Engine', icon: CheckCircle, description: 'Deployment approval gate' },
        { id: 'continuous-monitoring', label: 'Continuous Monitoring', icon: Activity, description: 'Post-deployment monitoring' },
      ]
    },
    {
      category: 'Reference & Tools',
      items: [
        { id: 'rmf-reference', label: 'NIST RMF Reference', icon: Layers, description: 'RMF framework overview' },
        { id: 'control-library', label: 'Control Library', icon: Shield, description: 'Browse all ACC controls' },
        { id: 'metric-catalog', label: 'Metric Catalog', icon: TrendingUp, description: 'All trust metrics defined' },
        { id: 'evidence-export', label: 'Evidence Export', icon: FolderOpen, description: 'Generate compliance bundle' },
      ]
    }
  ];

  const renderActiveComponent = () => {
    try {
      switch (activeTab) {
        case 'home':
          return <Dashboard />;
        case 'stage-0':
          return <ApplicationSetup />;
        case 'risk-identification':
          return <RiskIdentification />;
        case 'metrics-definition':
          return <MetricsDefinition />;
        case 'dataset-generation':
          return <DatasetGeneration />;
        case 'test-case-creation':
          return <TestCaseCreation />;
        case 'trust-score-computation':
          return <TrustScoreComputation />;
        case 'explainability-evidence':
          return <ExplainabilityAI />;
        case 'trust-matrix':
          return <TrustMatrix />;
        case 'authorization-engine':
          return <AuthorizationEngine />;
        case 'continuous-monitoring':
          return <ContinuousMonitoring />;

        case 'rmf-reference':
          return <RMFValidAIteMapping />;
        case 'control-library':
          return <ControlLibrary />;
        case 'metric-catalog':
          return <MetricsThresholdDashboard />;
        case 'evidence-export':
          return <EvidencePackGenerator />;

        default:
          return <ApplicationSetup />;
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h3 className="text-red-800 dark:text-red-400 font-semibold mb-2">Component Error</h3>
          <p className="text-red-600 dark:text-red-400 text-sm">Failed to render component. Please check the console for details.</p>
        </div>
      );
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ValidAIte</h1>
                <span className="text-gray-400 dark:text-gray-500">|</span>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  NIST AI RMF Compliance Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {currentUser?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{currentUser?.tenant}</div>
              </div>
            </div>

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

      <div className="flex overflow-hidden h-[calc(100vh-4rem)] relative">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 top-16 lg:top-0 left-0 z-50 transition-all duration-300 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950 border-r border-gray-800/50 h-full shadow-2xl backdrop-blur-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-80'
        } ${
          sidebarOpen && !sidebarCollapsed ? 'w-80' : 'w-20'
        }`}>
          <nav className="p-5 space-y-6 min-h-full">
            {navItems.map((section, sectionIndex) => (
              <div key={section.category} className="relative">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2.5 mb-3 px-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                    <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] leading-tight">
                      {section.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-800 via-gray-700 to-transparent"></div>
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`w-full group relative flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-cyan-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                            : 'hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50'
                        }`}
                      >
                        {activeTab === item.id && (
                          <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 rounded-r-full shadow-lg shadow-blue-500/50"></div>
                        )}
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30'
                            : 'bg-gray-800/80 group-hover:bg-gray-700/80'
                        }`}>
                          <Icon className={`w-4.5 h-4.5 transition-all duration-200 ${
                            activeTab === item.id
                              ? 'text-white'
                              : 'text-gray-400 group-hover:text-blue-400'
                          }`} />
                        </div>
                        {!sidebarCollapsed && (
                          <>
                            <div className="flex-1 text-left min-w-0">
                              <span className={`block text-[13px] font-medium transition-colors duration-200 truncate ${
                                activeTab === item.id
                                  ? 'text-white'
                                  : 'text-gray-300 group-hover:text-white'
                              }`}>{item.label}</span>
                              <span className={`block text-[10px] mt-0.5 transition-colors duration-200 truncate ${
                                activeTab === item.id
                                  ? 'text-blue-300'
                                  : 'text-gray-500 group-hover:text-gray-400'
                              }`}>{item.description}</span>
                            </div>
                            {activeTab === item.id && (
                              <div className="flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                              </div>
                            )}
                          </>
                        )}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-400">{item.description}</div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Sidebar Toggle Button - Desktop Only */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 items-center justify-center w-8 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-r-lg shadow-lg transition-all duration-300 group"
          style={{
            left: sidebarCollapsed ? '5rem' : '19.5rem',
            transition: 'left 300ms ease-in-out'
          }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronsRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronsLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-auto p-6 bg-slate-50 dark:bg-slate-900 overflow-y-auto h-full">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;
