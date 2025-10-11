import React, { useState } from 'react';
import {
  Brain,
  Shield,
  TrendingUp,
  FileText,
  TestTube,
  GitBranch,
  Menu,
  X,
  LogOut,
  Users,
  Target,
  FolderOpen,
  Layers,
  CheckCircle,
  Code
} from 'lucide-react';

// 7-Stage Workflow Components
import ApplicationSetup from './components/ApplicationSetup';
import RiskIdentification from './components/RiskIdentification';
import MetricsDefinition from './components/MetricsDefinition';
import DatasetGeneration from './components/DatasetGeneration';
import TestCaseCreation from './components/TestCaseCreation';
import TrustScoreComputation from './components/TrustScoreComputation';
import ModelGovernance from './components/ModelGovernance';
import TrustMetricsEngine from './components/TrustMetricsEngine';
import TEVVAutomationSuite from './components/TEVVAutomationSuite';
import ValidationLab from './components/ValidationLab';
import AuthorizationEngine from './components/AuthorizationEngine';
import ContinuousMonitoring from './components/ContinuousMonitoring';

// Reference & Tools
import RMFValidAIteMapping from './components/RMFValidAIteMapping';
import ControlLibrary from './components/ControlLibrary';
import MetricsThresholdDashboard from './components/MetricsThresholdDashboard';
import EvidencePackGenerator from './components/EvidencePackGenerator';

// Authentication Components
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [activeTab, setActiveTab] = useState('stage-0');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
      category: 'AI Governance Workflow',
      items: [
        { id: 'stage-0', label: 'Application Setup', icon: Brain, description: 'Configure application information and setup' },
        { id: 'risk-identification', label: 'Risk Identification', icon: Shield, description: 'Identify and classify potential risks' },
        { id: 'metrics-definition', label: 'Metrics Definition', icon: TrendingUp, description: 'Define measurable trust metrics' },
        { id: 'dataset-generation', label: 'Dataset Generation', icon: FileText, description: 'Generate testable evaluation datasets' },
        { id: 'test-case-creation', label: 'Test Case Creation', icon: Code, description: 'Generate automation scripts' },
        { id: 'trust-score-computation', label: 'Trust Score Computation', icon: TrendingUp, description: 'Execute tests and compute scores' },
        { id: 'stage-1', label: 'Control Selection', icon: Target, description: 'Select controls based on archetype' },
        { id: 'stage-2', label: 'Configure TEVV Pack', icon: TestTube, description: 'Set tests and thresholds' },
        { id: 'stage-3', label: 'Execute Tests', icon: GitBranch, description: 'Run automated test suite' },
        { id: 'stage-4', label: 'Human Review', icon: Users, description: 'Expert validation (HITL)' },
        { id: 'stage-5', label: 'Authorization', icon: CheckCircle, description: 'Approve or reject deployment' },
        { id: 'stage-6', label: 'Continuous Monitoring', icon: GitBranch, description: 'Monitor metrics and drift' },
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
        case 'stage-1':
          return <ModelGovernance />;
        case 'stage-2':
          return <TrustMetricsEngine />;
        case 'stage-3':
          return <TEVVAutomationSuite />;
        case 'stage-4':
          return <ValidationLab />;
        case 'stage-5':
          return <AuthorizationEngine />;
        case 'stage-6':
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

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} lg:w-72 transition-all duration-300 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen shadow-lg`}>
          <nav className="p-6">
            {navItems.map((section) => (
              <div key={section.category} className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                  <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {section.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:scale-102'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          activeTab === item.id
                            ? 'bg-white/20'
                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            activeTab === item.id
                              ? 'text-white'
                              : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-500'
                          }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <span className={`block text-sm font-semibold ${
                            activeTab === item.id
                              ? 'text-white'
                              : 'text-gray-900 dark:text-gray-200'
                          }`}>{item.label}</span>
                          <span className={`block text-xs ${
                            activeTab === item.id
                              ? 'text-white/80'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>{item.description}</span>
                        </div>
                        {activeTab === item.id && (
                          <div className="absolute right-2 w-1 h-8 bg-white rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
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
