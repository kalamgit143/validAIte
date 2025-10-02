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
import { getArchetypeInputsOutputs } from '../utils/archetypes';
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
  const inputsOutputs = getArchetypeInputsOutputs(archetypeId);

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
                  { suite