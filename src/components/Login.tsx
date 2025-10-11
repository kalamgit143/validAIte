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
  Github
} from 'lucide-react';

interface LoginProps {
  onLogin: (credentials: any) => void;
  onShowSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onShowSignup }) => {
  const [currentView, setCurrentView] = useState<'homepage' | 'login' | 'signup'>('homepage');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tenantDomain: '',
    rememberMe: false,
    role: '🔵 AI Governance Lead (Risk + Compliance)'
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

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    console.log(`OAuth login with ${provider} clicked`);
    setIsLoading(true);

    setTimeout(() => {
      onLogin({
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        role: 'Platform Admin',
        tenant: 'Organization'
      });
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      stage: "Stage-0",
      title: "Archetype Classification",
      description: "Define what kind of app it is - classify applications into 12 NIST-aligned archetypes with risk tier and assurance playbook",
      inputs: "App manifest, tech stack, modifiers, risk context",
      outputs: "Archetype code, risk tier, assurance playbook",
      stats: "12 archetypes"
    },
    {
      icon: Shield,
      stage: "Stage-1",
      title: "Risk Mapping & Governance",
      description: "Find risks and map controls - build comprehensive risk register with governance controls and compliance mapping",
      inputs: "Application profile, use case catalog, risk library",
      outputs: "Risk register, governance controls, governance matrix",
      stats: "Risk registry"
    },
    {
      icon: TrendingUp,
      stage: "Stage-2",
      title: "Trust Metrics Engine",
      description: "Turn risks into measurable trust metrics - map risks to quantifiable metrics with thresholds and benchmarks",
      inputs: "Risks, controls, metric library, thresholds",
      outputs: "Risk-metric mapping, evaluation configs, trust index",
      stats: "Live metrics"
    },
    {
      icon: TestTube,
      stage: "Stage-3",
      title: "TEVV Automation Suite",
      description: "Automate testing for those metrics - run comprehensive test packs with full traceability to risks",
      inputs: "Risk register, metric mapping, test datasets, CI/CD hooks",
      outputs: "Automated test packs, traceability matrix, test results",
      stats: "Auto testing"
    },
    {
      icon: Brain,
      stage: "Stage-4",
      title: "Validation Lab (HITL)",
      description: "Let humans check fairness and ethics - domain experts validate sensitive cases and provide feedback",
      inputs: "Test results, human-sensitive datasets, SME feedback",
      outputs: "Human-validated evidence, validation notes",
      stats: "Human review"
    },
    {
      icon: GitBranch,
      stage: "Stage-5",
      title: "Continuous Monitoring",
      description: "Keep monitoring after release - track production metrics, detect drift, and trigger alerts on anomalies",
      inputs: "Production logs, telemetry, drift configs, anomaly triggers",
      outputs: "Monitoring dashboards, alerts, feedback loops",
      stats: "Live monitoring"
    },
    {
      icon: FileText,
      stage: "Stage-6",
      title: "Compliance Reporting",
      description: "Generate compliance reports - create audit-ready evidence bundles aligned to regulatory frameworks",
      inputs: "Governance matrix, trust scores, TEVV results, HITL evidence, monitoring logs",
      outputs: "Compliance pack, regulatory reports, executive dashboard",
      stats: "Audit ready"
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
                    placeholder="you@company.com"
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
                    placeholder="Enter your password"
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('github')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                </button>
              </div>
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
              Comprehensive 10-stage workflow to setup, classify, assess, test, validate, authorize, monitor, and report compliance for your GenAI applications
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
              src="/image.png"
              alt="ValidAIte NIST AI RMF Platform"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-3xl hover:scale-105 transition-all duration-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 italic font-medium whitespace-nowrap">
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