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
  Target
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
    rememberMe: false
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
      description: 'SOC 2 compliant with advanced security controls'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-tenant architecture with role-based access'
    },
    {
      icon: Target,
      title: 'Trust Metrics',
      description: 'Quantify AI trust through comprehensive evaluation'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring with automated incident response'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">validAIte</h1>
              <p className="text-blue-100">GenAI Testing & Validation Platform</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Enterprise-grade AI governance with NIST RMF and EU TEVV compliance. 
                Quantify trust through accuracy, fairness, robustness, and continuous monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-blue-100 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <p className="text-blue-200 text-sm">
            Trusted by 500+ organizations worldwide
          </p>
          <div className="flex items-center justify-center space-x-6 mt-4 opacity-60">
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">validAIte</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your AI governance platform</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Join 500+ organizations delivering AI trust across industries
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => setLoginMethod('domain')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'domain'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Organization Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginMethod === 'domain' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Domain
                </label>
                <div className="relative">
                  <Building className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.tenantDomain}
                    onChange={(e) => setFormData(prev => ({ ...prev, tenantDomain: e.target.value }))}
                    placeholder="acme-corp"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                    .qualizeal.com
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                Role
              </label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.role || 'Platform Admin'}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AI Risk Manager (NIST RMF)">AI Risk Manager (NIST RMF)</option>
                  <option value="TEVV Engineer (EU AI Act)">TEVV Engineer (EU AI Act)</option>
                  <option value="AI Security Officer (ISO 27001)">AI Security Officer (ISO 27001)</option>
                  <option value="AI Compliance Officer (Regulatory)">AI Compliance Officer (Regulatory)</option>
                  <option value="Domain Expert (HITL Validation)">Domain Expert (HITL Validation)</option>
                  <option value="AI Ethics Reviewer (IEEE 2857)">AI Ethics Reviewer (IEEE 2857)</option>
                  <option value="AI Quality Engineer (ISO 25010)">AI Quality Engineer (ISO 25010)</option>
                  <option value="DevSecOps Engineer (CI/CD)">DevSecOps Engineer (CI/CD)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="ml-2">SSO</span>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Shield className="w-5 h-5" />
                <span className="ml-2">SAML</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={onShowSignup}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Start your free trial
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;