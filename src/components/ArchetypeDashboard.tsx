import React, { useState } from 'react';
import { 
  Crown, Shield, Code, Gavel, Activity,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Target, DollarSign, Users, Brain, Eye, Lock,
  BarChart3, FileText, Award, Building, Scale,
  ArrowRight, Calendar, Clock, Plus, Settings,
  Zap, Heart, Globe, Database, Lightbulb
} from 'lucide-react';
import { archetypeConfigs, getArchetypeMetrics, getArchetypeWorkflows, getArchetypeInsights, getArchetypeFromRole } from '../utils/archetypes';
import MetricCard from './MetricCard';

interface ArchetypeDashboardProps {
  currentUser: any;
  onNavigate: (tab: string) => void;
}

const ArchetypeDashboard: React.FC<ArchetypeDashboardProps> = ({ currentUser, onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  const archetypeId = getArchetypeFromRole(currentUser?.role || '');
  const config = archetypeConfigs[archetypeId];
  const metrics = getArchetypeMetrics(archetypeId);
  const workflows = getArchetypeWorkflows(archetypeId);
  const insights = getArchetypeInsights(archetypeId);

  if (!config) {
    return <div>Archetype configuration not found</div>;
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success':
      case 'strategic': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'critical':
      case 'risk': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'opportunity': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
      case 'strategic': return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'critical':
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default: return <Target className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Activity className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderArchetypeSpecificContent = () => {
    switch (archetypeId) {
      case 'cio_cdo':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Portfolio Performance */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Portfolio Performance</h3>
              <div className="space-y-4">
                {[
                  { name: 'Healthcare Triage', value: '$2.4M', impact: 'Cost Savings', status: 'exceeding', risk: 'High Risk' },
                  { name: 'Financial Lending', value: '67%', impact: 'Bias Reduction', status: 'on-track', risk: 'High Risk' },
                  { name: 'Enterprise Copilot', value: '35%', impact: 'Productivity Gain', status: 'on-track', risk: 'Limited Risk' },
                  { name: 'Government Services', value: '4.8/5', impact: 'Citizen Trust', status: 'exceeding', risk: 'High Risk' }
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{app.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{app.impact}</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">{app.risk}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{app.value}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        app.status === 'exceeding' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Risk Heatmap */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strategic Risk Heatmap</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { risk: 'Regulatory', level: 'high', impact: 'high' },
                  { risk: 'Competitive', level: 'medium', impact: 'high' },
                  { risk: 'Technical', level: 'low', impact: 'medium' },
                  { risk: 'Reputational', level: 'medium', impact: 'high' },
                  { risk: 'Financial', level: 'low', impact: 'medium' },
                  { risk: 'Operational', level: 'medium', impact: 'medium' }
                ].map((risk, index) => (
                  <div key={index} className={`p-3 rounded-lg text-center text-sm font-medium ${
                    risk.level === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {risk.risk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'qa_tevv_engineer':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Test Executions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Test Executions</h3>
              <div className="space-y-4">
                {[
                  { suite: 'Healthcare TEVV Suite', progress: 85, tests: 247, status: 'running' },
                  { suite: 'Financial Security Tests', progress: 100, tests: 156, status: 'completed' },
                  { suite: 'Enterprise Performance', progress: 60, tests: 89, status: 'running' },
                  { suite: 'Government Robustness', progress: 45, tests: 134, status: 'running' }
                ].map((suite, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{suite.suite}</div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        suite.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {suite.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{suite.tests} tests</span>
                      <span>{suite.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${suite.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Trends */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quality Trends</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Test Coverage', current: 94.2, target: 90, trend: '+2.1%' },
                  { metric: 'Quality Score', current: 96.8, target: 95, trend: '+1.3%' },
                  { metric: 'Manual Validation', current: 89.3, target: 85, trend: '+4.2%' },
                  { metric: 'Evidence Collection', current: 92.1, target: 90, trend: '+0.8%' }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{metric.metric}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Target: {metric.target}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{metric.current}%</div>
                      <div className="text-sm text-green-600 dark:text-green-400">{metric.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tevv_automation_engineer':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline Health */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Health</h3>
              <div className="space-y-4">
                {[
                  { pipeline: 'Healthcare TEVV Pipeline', health: 98, builds: 45, status: 'healthy' },
                  { pipeline: 'Financial Security Pipeline', health: 94, builds: 32, status: 'healthy' },
                  { pipeline: 'Enterprise Quality Pipeline', health: 87, builds: 28, status: 'warning' },
                  { pipeline: 'Government Compliance Pipeline', health: 96, builds: 38, status: 'healthy' }
                ].map((pipeline, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{pipeline.pipeline}</div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        pipeline.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pipeline.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{pipeline.builds} builds this week</span>
                      <span>{pipeline.health}% health</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          pipeline.health >= 95 ? 'bg-green-500' : 
                          pipeline.health >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${pipeline.health}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EU AI Act Compliance */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">EU AI Act Automation</h3>
              <div className="space-y-4">
                {[
                  { component: 'Risk Classification', automation: 95, status: 'automated' },
                  { component: 'TEVV Execution', automation: 88, status: 'automated' },
                  { component: 'Evidence Collection', automation: 94, status: 'automated' },
                  { component: 'Compliance Reporting', automation: 82, status: 'partial' }
                ].map((component, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{component.component}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {component.status === 'automated' ? 'Fully Automated' : 'Partially Automated'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{component.automation}%</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        component.automation >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {component.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ai_secops_engineer':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Threat Landscape */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Threat Landscape (24h)</h3>
              <div className="space-y-4">
                {[
                  { threat: 'Prompt Injection', attempts: 12, blocked: 12, severity: 'high' },
                  { threat: 'Model Theft', attempts: 3, blocked: 3, severity: 'critical' },
                  { threat: 'Data Poisoning', attempts: 1, blocked: 1, severity: 'medium' },
                  { threat: 'Adversarial Input', attempts: 8, blocked: 7, severity: 'medium' }
                ].map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{threat.threat}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{threat.attempts} attempts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">{threat.blocked}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        threat.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {threat.severity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Controls Status */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Controls Status</h3>
              <div className="space-y-3">
                {[
                  { control: 'Input Validation', status: 'active', effectiveness: 98 },
                  { control: 'Output Filtering', status: 'active', effectiveness: 96 },
                  { control: 'Access Control', status: 'active', effectiveness: 99 },
                  { control: 'Audit Logging', status: 'active', effectiveness: 100 },
                  { control: 'Encryption', status: 'active', effectiveness: 100 }
                ].map((control, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{control.control}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${control.effectiveness}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{control.effectiveness}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'domain_ethics_reviewer':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ethics Review Queue */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ethics Review Queue</h3>
              <div className="space-y-4">
                {[
                  { application: 'Healthcare Triage', review: 'Fairness Assessment', priority: 'high', dueDate: '2024-01-20' },
                  { application: 'Financial Lending', review: 'Bias Audit', priority: 'critical', dueDate: '2024-01-18' },
                  { application: 'Government Services', review: 'Transparency Review', priority: 'medium', dueDate: '2024-01-25' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{item.application}</div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.review}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">Due: {item.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Accuracy Metrics */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain Accuracy Metrics</h3>
              <div className="space-y-4">
                {[
                  { domain: 'Medical Accuracy', score: 94.1, benchmark: 88.0, status: 'exceeding' },
                  { domain: 'Financial Compliance', score: 91.7, benchmark: 90.0, status: 'meeting' },
                  { domain: 'Legal Accuracy', score: 87.3, benchmark: 85.0, status: 'meeting' },
                  { domain: 'Ethical Alignment', score: 92.7, benchmark: 90.0, status: 'exceeding' }
                ].map((domain, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{domain.domain}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Benchmark: {domain.benchmark}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{domain.score}%</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        domain.status === 'exceeding' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {domain.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Archetype Header */}
      <div className={`bg-gradient-to-r ${config.color} p-8 rounded-xl text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <config.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{config.title}</h2>
                <p className="text-white/80 text-lg">{config.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {config.focus.map((focus, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {focus}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">
              {archetypeId === 'cio_cdo' ? '92.3%' :
               archetypeId === 'qa_tevv_engineer' ? '96.8%' :
               archetypeId === 'tevv_automation_engineer' ? '98%' :
               archetypeId === 'ai_secops_engineer' ? '94%' : '92.7%'}
            </div>
            <div className="text-white/80 text-sm">
              {archetypeId === 'cio_cdo' ? 'Portfolio Trust Score' :
               archetypeId === 'qa_tevv_engineer' ? 'Quality Score' :
               archetypeId === 'tevv_automation_engineer' ? 'Automation Coverage' :
               archetypeId === 'ai_secops_engineer' ? 'Security Score' : 'Ethics Score'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics).map(([key, metric]) => {
          const getMetricIcon = (metricKey: string) => {
            switch (metricKey) {
              case 'business-impact': return DollarSign;
              case 'portfolio-risk': return Target;
              case 'compliance-status': return CheckCircle;
              case 'ai-roi': return TrendingUp;
              case 'test-coverage': return BarChart3;
              case 'quality-scores': return Award;
              case 'defect-rates': return AlertTriangle;
              case 'manual-validation': return Users;
              case 'automation-coverage': return Activity;
              case 'pipeline-health': return Zap;
              case 'eu-compliance': return Scale;
              case 'evidence-automation': return FileText;
              case 'security-score': return Shield;
              case 'threat-detection': return Eye;
              case 'incident-response': return Clock;
              case 'vulnerability-count': return Lock;
              case 'ethics-score': return Heart;
              case 'domain-accuracy': return Brain;
              case 'fairness-assessment': return Users;
              case 'expert-consensus': return Gavel;
              default: return Target;
            }
          };

          const getMetricColor = (metricKey: string) => {
            switch (metricKey) {
              case 'business-impact':
              case 'ai-roi': return 'green';
              case 'portfolio-risk':
              case 'vulnerability-count': return 'red';
              case 'compliance-status':
              case 'test-coverage': return 'blue';
              case 'quality-scores':
              case 'ethics-score': return 'purple';
              default: return 'blue';
            }
          };

          const Icon = getMetricIcon(key);
          return (
            <MetricCard
              key={key}
              title={metric.description}
              value={metric.value.toString()}
              change={metric.change}
              trend={metric.trend}
              icon={Icon}
              color={getMetricColor(key) as any}
            />
          );
        })}
      </div>

      {/* Archetype-Specific Content */}
      {renderArchetypeSpecificContent()}

      {/* Active Workflows */}
      {workflows.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Workflows</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All Workflows
            </button>
          </div>
          
          <div className="space-y-6">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{workflow.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Estimated duration: {workflow.estimatedDuration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {workflow.currentStep ? `${workflow.currentStep}/${workflow.steps.length}` : '0/4'}
                    </div>
                  </div>
                </div>

                {/* Workflow Steps */}
                <div className="space-y-3">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                        step.status === 'blocked' ? 'bg-red-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900 dark:text-white">{step.title}</span>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStepStatusColor(step.status)}`}>
                            {getStepStatusIcon(step.status)}
                            <span className="capitalize">{step.status.replace('_', ' ')}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(step.priority)}`}>
                            {step.priority}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights & Actions</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All Insights
          </button>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getInsightColor(insight.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
                      <span>{insight.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {archetypeId === 'cio_cdo' && [
            { icon: Target, label: 'Review AI Strategy', color: 'bg-blue-600', action: 'risk-assessment' },
            { icon: DollarSign, label: 'Budget Planning', color: 'bg-green-600', action: 'analytics' },
            { icon: Users, label: 'Stakeholder Report', color: 'bg-purple-600', action: 'reports' },
            { icon: BarChart3, label: 'Portfolio Analysis', color: 'bg-indigo-600', action: 'applications' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => onNavigate(action.action)}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {archetypeId === 'qa_tevv_engineer' && [
            { icon: Code, label: 'Run Tests', color: 'bg-green-600', action: 'evaluations' },
            { icon: Eye, label: 'Manual Review', color: 'bg-blue-600', action: 'human-feedback' },
            { icon: BarChart3, label: 'Quality Report', color: 'bg-purple-600', action: 'reports' },
            { icon: Settings, label: 'Test Config', color: 'bg-gray-600', action: 'model-validation' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => onNavigate(action.action)}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {archetypeId === 'tevv_automation_engineer' && [
            { icon: Activity, label: 'Pipeline Status', color: 'bg-purple-600', action: 'tevv-automation' },
            { icon: Zap, label: 'Automation Config', color: 'bg-blue-600', action: 'continuous-monitoring' },
            { icon: Database, label: 'Evidence Collection', color: 'bg-green-600', action: 'datasets' },
            { icon: BarChart3, label: 'Performance Report', color: 'bg-indigo-600', action: 'analytics' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => onNavigate(action.action)}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {archetypeId === 'ai_secops_engineer' && [
            { icon: Shield, label: 'Security Review', color: 'bg-red-600', action: 'guardrails' },
            { icon: AlertTriangle, label: 'Threat Analysis', color: 'bg-orange-600', action: 'alerts' },
            { icon: Lock, label: 'Access Control', color: 'bg-gray-600', action: 'user-management' },
            { icon: Eye, label: 'Incident Response', color: 'bg-pink-600', action: 'audit-trail' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => onNavigate(action.action)}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}

          {archetypeId === 'domain_ethics_reviewer' && [
            { icon: Gavel, label: 'Ethics Review', color: 'bg-amber-600', action: 'ethical-ai' },
            { icon: Users, label: 'Fairness Assessment', color: 'bg-yellow-600', action: 'bias-auditing' },
            { icon: Brain, label: 'Domain Validation', color: 'bg-orange-600', action: 'human-feedback' },
            { icon: FileText, label: 'Review Report', color: 'bg-amber-700', action: 'reports' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => onNavigate(action.action)}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeDashboard;
