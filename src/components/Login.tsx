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
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  Target,
  Star,
  Award,
  BarChart3,
  AlertTriangle,
  FileText,
  Activity,
  TrendingUp,
  Heart,
  Scale,
  Database,
  Code,
  Crown,
  Gavel
} from 'lucide-react';

interface LoginProps {
  onLogin: (credentials: any) => void;
  onShowSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onShowSignup }) => {
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

  const problemSolutions = [
    {
      problem: "AI systems fail in production",
      solution: "Comprehensive testing before deployment",
      icon: Target,
      color: "red"
    },
    {
      problem: "Regulatory compliance is complex",
      solution: "Automated NIST RMF & EU AI Act compliance",
      icon: Shield,
      color: "blue"
    },
    {
      problem: "AI bias goes undetected",
      solution: "Continuous fairness monitoring & alerts",
      icon: Scale,
      color: "purple"
    },
    {
      problem: "Trust in AI is declining",
      solution: "Quantifiable trust metrics & transparency",
      icon: Heart,
      color: "green"
    }
  ];

  const useCases = [
    {
      industry: "Healthcare",
      useCase: "Medical Triage AI",
      impact: "40% error reduction",
      compliance: "HIPAA + EU AI Act",
      icon: "🏥",
      riskLevel: "High Risk"
    },
    {
      industry: "Finance",
      useCase: "Fair Lending AI",
      impact: "67% bias reduction",
      compliance: "SOX + Fair Lending",
      icon: "🏦",
      riskLevel: "High Risk"
    },
    {
      industry: "Government",
      useCase: "Citizen Services AI",
      impact: "60% cost reduction",
      compliance: "FedRAMP + Transparency",
      icon: "🏛️",
      riskLevel: "High Risk"
    },
    {
      industry: "Enterprise",
      useCase: "Productivity Copilot",
      impact: "35% efficiency gain",
      compliance: "SOC 2 + Privacy",
      icon: "🏢",
      riskLevel: "Limited Risk"
    }
  ];

  const platformModules = [
    {
      name: "Risk Mapping",
      description: "Map AI risks to governance controls",
      icon: AlertTriangle,
      color: "red"
    },
    {
      name: "Trust Metrics",
      description: "Quantify AI trustworthiness",
      icon: Target,
      color: "emerald"
    },
    {
      name: "TEVV Automation",
      description: "EU AI Act testing automation",
      icon: Activity,
      color: "violet"
    },
    {
      name: "Validation Lab",
      description: "Human-in-the-loop validation",
      icon: Users,
      color: "amber"
    },
    {
      name: "Continuous Monitoring",
      description: "Real-time AI safety monitoring",
      icon: BarChart3,
      color: "orange"
    },
    {
      name: "Compliance Reporting",
      description: "Automated compliance reports",
      icon: FileText,
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">validAIte</h1>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">GenAI Trust & Governance Platform</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Panel - Value Proposition */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Make Your AI
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Trustworthy</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Enterprise AI governance platform ensuring your GenAI applications are 
                <strong className="text-gray-900 dark:text-white"> safe, fair, and compliant</strong> with 
                NIST RMF and EU AI Act requirements.
              </p>
            </div>

            {/* Problem-Solution Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Organizations Choose validAIte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {problemSolutions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 text-${item.color}-600 dark:text-${item.color}-400`} />
                        </div>
                        <div>
                          <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">❌ {item.problem}</div>
                          <div className="text-sm text-green-600 dark:text-green-400 font-medium">✅ {item.solution}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Proven Results Across Industries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{useCase.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{useCase.industry}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        useCase.riskLevel === 'High Risk' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {useCase.riskLevel}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{useCase.useCase}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 dark:text-green-400 font-medium">{useCase.impact}</span>
                      <span className="text-blue-600 dark:text-blue-400">{useCase.compliance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Modules - Compact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete AI Governance Suite</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platformModules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                      <div className={`w-6 h-6 bg-${module.color}-100 dark:bg-${module.color}-900/20 rounded-lg flex items-center justify-center mb-2`}>
                        <Icon className={`w-3 h-3 text-${module.color}-600 dark:text-${module.color}-400`} />
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{module.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{module.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Governance Visual */}
            <div className="text-center">
              <img 
                src="/image.png" 
                alt="AI Governance - Human and AI collaboration"
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-all duration-300"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
                "Bridging human expertise with AI capabilities through structured governance"
              </p>
            </div>

            {/* Trust Indicators - Compact */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-green-800 dark:text-green-200 font-medium">500+ Organizations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-green-800 dark:text-green-200 font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span className="text-green-800 dark:text-green-200 font-medium">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Streamlined Login */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h3>
                  <p className="text-gray-600 dark:text-gray-400">Access your AI governance dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Role Selection - Prominent */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Your Role
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="🔵 AI Governance Lead (Risk + Compliance)">🔵 AI Governance Lead</option>
                        <option value="🟢 QA Engineer (ISO 25010, Manual Validation)">🟢 QA Engineer</option>
                        <option value="🟣 Automation / TEVV Engineer (EU AI Act, Test Automation)">🟣 TEVV Engineer</option>
                        <option value="🔴 AI SecOps Engineer (Security + DevSecOps)">🔴 SecOps Engineer</option>
                        <option value="🟡 Domain & Ethics Reviewer (Domain + Ethics)">🟡 Ethics Reviewer</option>
                      </select>
                    </div>
                  </div>

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
                </form>

                {/* SSO Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <Globe className="w-4 h-4 mr-2" />
                      SSO
                    </button>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <Shield className="w-4 h-4 mr-2" />
                      SAML
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    New to validAIte?{' '}
                    <button
                      onClick={onShowSignup}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Start free trial
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Trusted by leading organizations worldwide</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            {['Healthcare Systems', 'Financial Institutions', 'Government Agencies', 'Fortune 500'].map((org, index) => (
              <span key={index} className="text-sm text-gray-500 dark:text-gray-500 font-medium">{org}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;