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
  Users
} from 'lucide-react';

// ValidAIte 7-Stage Components
import ArchetypeClassifier from './components/ArchetypeClassifier';
import ModelGovernance from './components/ModelGovernance';
import TrustMetricsEngine from './components/TrustMetricsEngine';
import TEVVAutomationSuite from './components/TEVVAutomationSuite';
import ValidationLab from './components/ValidationLab';
import ContinuousMonitoring from './components/ContinuousMonitoring';
import ComplianceReporting from './components/ComplianceReporting';

// Authentication Components
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [activeTab, setActiveTab] = useState('stage-0');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
      category: '7-Stage AI Governance Workflow',
      items: [
        { id: 'stage-0', label: 'Stage-0: Archetype Classification', icon: Brain },
        { id: 'stage-1', label: 'Stage-1: Risk Mapping & Governance', icon: Shield },
        { id: 'stage-2', label: 'Stage-2: Trust Metrics Engine', icon: TrendingUp },
        { id: 'stage-3', label: 'Stage-3: TEVV Automation Suite', icon: TestTube },
        { id: 'stage-4', label: 'Stage-4: Validation Lab (HITL)', icon: Users },
        { id: 'stage-5', label: 'Stage-5: Continuous Monitoring', icon: GitBranch },
        { id: 'stage-6', label: 'Stage-6: Compliance Reporting', icon: FileText },
      ]
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'stage-0':
        return <ArchetypeClassifier />;
      case 'stage-1':
        return <ModelGovernance />;
      case 'stage-2':
        return <TrustMetricsEngine />;
      case 'stage-3':
        return <TEVVAutomationSuite />;
      case 'stage-4':
        return <ValidationLab />;
      case 'stage-5':
        return <ContinuousMonitoring />;
      case 'stage-6':
        return <ComplianceReporting />;

      default:
        return <ArchetypeClassifier />;
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
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ValidAIte</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  NIST AI RMF Platform
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
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen shadow-sm`}>
          <nav className="p-4">
            {navItems.map((section) => (
              <div key={section.category} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
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
