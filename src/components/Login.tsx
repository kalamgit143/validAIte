import React, { useState } from 'react';
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  Globe,
  Shield,
  ArrowRight,
  Award,
  FileText,
  TrendingUp,
  GitBranch,
  TestTube,
  Sparkles,
  Zap,
  Target,
  Settings,
  Database,
  Code,
  Lightbulb,
  Layout,
  CheckCircle,
  Activity,
  UserCircle
} from 'lucide-react';
import { NIST_TEVV_ROLES } from '../utils/archetypes';

interface LoginProps {
  onLogin: (credentials: any) => void;
  onShowSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onShowSignup }) => {
  const [currentView, setCurrentView] = useState<'homepage' | 'login' | 'signup'>('homepage');
  const [formData, setFormData] = useState({
    email: 'demo@validaite.com',
    password: 'demo123',
    tenantDomain: '',
    rememberMe: false,
    role: 'Quality & Compliance Manager'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onLogin(formData);
      setIsLoading(false);
    }, 1500);
  };


  const features = [
    {
      icon: Settings,
      stage: "Stage-1",
      title: "Application Setup",
      description: "Configure application details, archetype classification, and technical specifications for your GenAI system",
      inputs: "App manifest, tech stack, modifiers, risk context",
      outputs: "Application profile, archetype code, risk tier",
      stats: "12 archetypes"
    },
    {
      icon: Shield,
      stage: "Stage-2",
      title: "Risk Identification",
      description: "Identify and classify AI risks using NIST taxonomy - build comprehensive risk register with governance controls",
      inputs: "Application profile, use case catalog, risk library",
      outputs: "Risk register, governance controls, compliance mapping",
      stats: "Risk registry"
    },
    {
      icon: TrendingUp,
      stage: "Stage-3",
      title: "Metrics Definition",
      description: "Define measurable trust metrics mapped to identified risks with thresholds and benchmarks",
      inputs: "Risks, controls, metric library, thresholds",
      outputs: "Risk-metric mapping, evaluation configs, trust index",
      stats: "Live metrics"
    },
    {
      icon: Database,
      stage: "Stage-4",
      title: "Dataset Generation",
      description: "Generate comprehensive evaluation datasets for testing AI system performance and safety",
      inputs: "Use cases, risk scenarios, test requirements",
      outputs: "Test datasets, edge cases, validation sets",
      stats: "Auto datasets"
    },
    {
      icon: Code,
      stage: "Stage-5",
      title: "Test Case Creation",
      description: "Generate automated test scripts and evaluation workflows with full traceability to risks",
      inputs: "Risk register, metric mapping, test datasets, CI/CD hooks",
      outputs: "Automated test packs, traceability matrix, test scripts",
      stats: "Auto testing"
    },
    {
      icon: Target,
      stage: "Stage-6",
      title: "Trust Score Computation",
      description: "Execute comprehensive TEVV tests and compute quantified trust scores across all dimensions",
      inputs: "Test results, metric thresholds, benchmark data",
      outputs: "Trust scores, performance metrics, gap analysis",
      stats: "Trust scores"
    },
    {
      icon: Lightbulb,
      stage: "Stage-7",
      title: "Explainability & Evidence",
      description: "Human-in-the-loop review - domain experts validate sensitive cases and provide interpretability evidence",
      inputs: "Test results, human-sensitive datasets, SME feedback",
      outputs: "Human-validated evidence, explainability reports",
      stats: "Human review"
    },
    {
      icon: Layout,
      stage: "Stage-8",
      title: "Trust Matrix",
      description: "Unified 360° trust view consolidating all evaluation results, evidence, and compliance status",
      inputs: "Trust scores, TEVV results, HITL evidence, compliance data",
      outputs: "Trust matrix, risk heatmap, executive dashboard",
      stats: "360° view"
    },
    {
      icon: CheckCircle,
      stage: "Stage-9",
      title: "Authorization Engine",
      description: "Automated deployment gate - authorize production release based on trust scores and compliance thresholds",
      inputs: "Trust matrix, approval policies, stakeholder signoffs",
      outputs: "Deployment authorization, approval workflows",
      stats: "Auto gate"
    },
    {
      icon: Activity,
      stage: "Stage-10",
      title: "Continuous Monitoring",
      description: "Post-deployment monitoring - track production metrics, detect drift, trigger alerts on anomalies",
      inputs: "Production logs, telemetry, drift configs, anomaly triggers",
      outputs: "Monitoring dashboards, alerts, feedback loops",
      stats: "Live monitoring"
    }
  ];

  const useCases = [
    {
      industry: "Healthcare",
      title: "Medical Triage AI",
      description: "AI-powered emergency triage reducing diagnostic errors",
      impact: "40% error reduction",
      savings: "$2.4M annually",
      compliance: "HIPAA + EU AI Act",
      icon: "🏥",
      riskLevel: "High Risk",
      gradient: "from-red-500 to-pink-600"
    },
    {
      industry: "Financial Services",
      title: "Fair Lending AI",
      description: "Bias-free credit assessment and lending decisions",
      impact: "67% bias reduction",
      savings: "$1.8M in fines avoided",
      compliance: "SOX + Fair Lending",
      icon: "🏦",
      riskLevel: "High Risk",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      industry: "Government",
      title: "Citizen Services AI",
      description: "Transparent and fair public service automation",
      impact: "60% cost reduction",
      savings: "$3.2M annually",
      compliance: "FedRAMP + Transparency",
      icon: "🏛️",
      riskLevel: "High Risk",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      industry: "Enterprise",
      title: "Productivity Copilot",
      description: "Safe enterprise AI with privacy protection",
      impact: "35% efficiency gain",
      savings: "$1.2M productivity",
      compliance: "SOC 2 + Privacy",
      icon: "🏢",
      riskLevel: "Limited Risk",
      gradient: "from-purple-500 to-violet-600"
    }
  ];


  if (currentView === 'login') {
    // Login banner will be shown on homepage
  }

  // Homepage View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ValidAIte</h1>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">NIST AI RMF Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('login')}
              className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onShowSignup}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Login Banner */}
      {currentView === 'login' && (
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h3>
              <p className="text-gray-600 dark:text-gray-400">Access your AI governance dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="demo@validaite.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="demo123"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Role
                </label>
                <div className="relative">
                  <UserCircle className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    {NIST_TEVV_ROLES.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Access Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentView('homepage')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back to homepage
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              NIST AI RMF
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block lg:inline"> Compliance Platform</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              Comprehensive workflow to setup, classify, assess, test, validate, authorize, monitor, and report compliance for your GenAI applications
              <strong className="text-gray-900 dark:text-white"> following NIST AI Risk Management Framework</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            </div>
          </div>
        </div>

        {/* AI Governance Image */}
        <div className="mb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <img
              src="https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="ValidAIte NIST AI RMF Platform - AI Governance and Compliance"
              className="w-full h-auto max-h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-3xl hover:scale-105 transition-all duration-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 italic font-medium">
              "Bridging human expertise with AI capabilities through structured governance"
            </p>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-semibold">NIST AI RMF Core Modules</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">10-Stage AI Governance Workflow</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete NIST AI RMF lifecycle from application setup through deployment authorization to continuous monitoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">{feature.stage}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">{feature.description}</p>

                    <div className="space-y-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Inputs</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{feature.inputs}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Outputs</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{feature.outputs}</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold shadow-sm mt-4">
                      <Sparkles className="w-4 h-4" />
                      <span>{feature.stats}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="flex items-center justify-center space-x-8 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <span className="text-sm">&copy; 2024 ValidAIte</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;