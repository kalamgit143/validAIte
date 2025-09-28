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
  Award
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
  const [loginMethod, setLoginMethod] = useState<'email' | 'domain'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      onLogin(formData);
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with advanced security controls',
      metric: '99.9% uptime'
    },
    {
      icon: Target,
      title: 'Trust Metrics',
      description: 'Quantify AI trust through comprehensive evaluation',
      metric: '6 trust dimensions'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring with automated incident response',
      metric: '<1s detection'
    }
  ];

  const trustLogos = [
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Finance', icon: '🏦' },
    { name: 'Government', icon: '🏛️' },
    { name: 'Enterprise', icon: '🏢' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex">
      {/* Left Panel - Compact & Focused */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Optimized Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 w-full">
          {/* Header Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">validAIte</h1>
                <p className="text-blue-100 text-sm">GenAI Trust Platform</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-3 leading-tight">
                Enterprise AI Governance
              </h2>
              <p className="text-blue-100 text-base xl:text-lg leading-relaxed">
                NIST RMF and EU TEVV compliant platform for quantifying AI trust through 
                accuracy, fairness, and continuous monitoring.
              </p>
            </div>

            {/* Compact Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                        <span className="text-blue-200 text-xs font-medium">{feature.metric}</span>
                      </div>
                      <p className="text-blue-100 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Image & Trust Indicators */}
          <div className="space-y-6">
            {/* AI Governance Image */}
            <div className="relative">
              <img 
                src="/image.png" 
                alt="AI Governance - Human and AI collaboration in modern workspace"
                className="w-full max-w-xs mx-auto rounded-lg shadow-xl opacity-95 hover:opacity-100 transition-all duration-300 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl"></div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-blue-100 text-sm font-medium">Trusted by 500+ organizations</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="flex items-center space-x-1 text-blue-200 text-xs">
                    <span className="text-sm">{logo.icon}</span>
                    <span>{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Streamlined Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-sm">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">validAIte</h1>
            </div>
          </div>

          {/* Compact Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to your AI governance platform</p>
          </div>

          {/* Streamlined Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection - Prominent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Role
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="🔵 AI Governance Lead (Risk + Compliance)">🔵 AI Governance Lead</option>
                  <option value="🟢 QA Engineer (ISO 25010, Manual Validation)">🟢 QA Engineer</option>
                  <option value="🟣 Automation / TEVV Engineer (EU AI Act, Test Automation)">🟣 TEVV Engineer</option>
                  <option value="🔴 AI SecOps Engineer (Security + DevSecOps)">🔴 SecOps Engineer</option>
                  <option value="🟡 Domain & Ethics Reviewer (Domain + Ethics)">🟡 Ethics Reviewer</option>
                </select>
              </div>
            </div>

            {/* Conditional Domain Input */}
            {loginMethod === 'domain' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.tenantDomain}
                    onChange={(e) => setFormData(prev => ({ ...prev, tenantDomain: e.target.value }))}
                    placeholder="acme-corp"
                    className="w-full pl-10 pr-20 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    .validaite.com
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Compact SSO Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="ml-2">SSO</span>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Shield className="w-4 h-4" />
                <span className="ml-2">SAML</span>
              </button>
            </div>
          </div>

          {/* Compact Footer */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={onShowSignup}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Start free trial
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
              <Award className="w-3 h-3" />
              <span>SOC 2 Type II Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Content */}
      <div className="lg:hidden w-full flex flex-col">
        {/* Mobile Header with Image */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">validAIte</h1>
            </div>
            <p className="text-blue-100 text-sm">Enterprise AI Governance Platform</p>
          </div>
          
          <div className="relative">
            <img 
              src="/image.png" 
              alt="AI Governance"
              className="w-full max-w-48 mx-auto rounded-lg shadow-xl opacity-90"
            />
          </div>
        </div>

        {/* Mobile Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Same form fields as desktop but more compact */}
              <div>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="🔵 AI Governance Lead (Risk + Compliance)">🔵 Governance Lead</option>
                    <option value="🟢 QA Engineer (ISO 25010, Manual Validation)">🟢 QA Engineer</option>
                    <option value="🟣 Automation / TEVV Engineer (EU AI Act, Test Automation)">🟣 TEVV Engineer</option>
                    <option value="🔴 AI SecOps Engineer (Security + DevSecOps)">🔴 SecOps Engineer</option>
                    <option value="🟡 Domain & Ethics Reviewer (Domain + Ethics)">🟡 Ethics Reviewer</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@company.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 dark:text-gray-400">Remember</span>
                </label>
                <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
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
  );
};

export default Login;