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
  Gavel,
  Play,
  ChevronRight,
  Sparkles,
  Rocket,
  Clock,
  DollarSign
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

  const features = [
    {
      icon: Target,
      title: "Trust Metrics Engine",
      description: "Quantify AI trustworthiness through accuracy, fairness, robustness, and transparency metrics",
      color: "emerald",
      stats: "94% avg trust score"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "NIST RMF-compliant risk classification and EU AI Act compliance automation",
      color: "red",
      stats: "87% compliance rate"
    },
    {
      icon: Activity,
      title: "TEVV Automation",
      description: "Automated Testing, Evaluation, Validation, and Verification for EU AI Act",
      color: "violet",
      stats: "98% test coverage"
    },
    {
      icon: Users,
      title: "Human-in-the-Loop",
      description: "Expert validation lab with domain specialists and ethics review boards",
      color: "amber",
      stats: "89% expert approval"
    },
    {
      icon: BarChart3,
      title: "Continuous Monitoring",
      description: "Real-time drift detection, safety guardrails, and incident response",
      color: "orange",
      stats: "24/7 monitoring"
    },
    {
      icon: FileText,
      title: "Compliance Reporting",
      description: "Automated evidence collection and regulatory reporting for audits",
      color: "indigo",
      stats: "100% audit ready"
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

  const stats = [
    { label: "Organizations Trust Us", value: "500+", icon: Building },
    { label: "AI Applications Governed", value: "2,000+", icon: Zap },
    { label: "Compliance Frameworks", value: "12+", icon: Shield },
    { label: "Trust Assessments", value: "50K+", icon: Target }
  ];

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">validAIte</h1>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h3>
              <p className="text-gray-600 dark:text-gray-400">Access your AI governance dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.location.href = 'mailto:accounts@validaite.com?subject=Enterprise%20Account%20Request&body=Hello,%0A%0AI%20would%20like%20to%20discuss%20enterprise%20access%20to%20the%20validAIte%20platform.%0A%0ACompany%20Name:%20%0AIndustry:%20%0AExpected%20AI%20Applications:%20%0ACompliance%20Requirements:%20%0AContact%20Person:%20%0APhone:%20%0A%0AThank%20you!'}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Account Manager</span>
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
      </div>
    );
  }

  // Homepage View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">validAIte</h1>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">GenAI Trust & Governance Platform</p>
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
              Start Free Trial
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Make Your AI
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block lg:inline"> Trustworthy</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              Enterprise AI governance platform ensuring your GenAI applications are 
              <strong className="text-gray-900 dark:text-white"> safe, fair, and compliant</strong> with 
              NIST RMF and EU AI Act requirements.
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
              alt="validAIte robot testing LLM powered GenAI app robot"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-3xl hover:scale-105 transition-all duration-500"
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
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-semibold">Complete AI Governance Suite</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Six Integrated Trust Modules</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From risk assessment to continuous monitoring - everything you need for trustworthy AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50/50 to-transparent dark:from-${feature.color}-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-${feature.color}-600 transition-colors">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">{feature.description}</p>
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 dark:from-${feature.color}-900/20 dark:to-${feature.color}-800/20 text-${feature.color}-800 dark:text-${feature.color}-300 rounded-xl text-sm font-semibold shadow-sm`}>
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
            <span className="text-sm">&copy; 2024 validAIte</span>
          </div>
        </footer>
      </div>
  );
};

export default Login;