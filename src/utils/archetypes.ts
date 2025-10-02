import { Crown, Shield, Code, Gavel, Users, Target, DollarSign, Activity, CheckCircle, AlertTriangle, TrendingUp, Award, Building, Scale, Brain, Eye, Lock, FileText, BarChart3 } from 'lucide-react';
import { ArchetypeConfig, ArchetypeMetrics, ArchetypeWorkflow, ArchetypeInsight } from '../types/archetypes';

export const archetypeConfigs: { [key: string]: ArchetypeConfig } = {
  'cio_cdo': {
    id: 'cio_cdo',
    name: 'CIO/CDO',
    title: 'Chief Information/Data Officer',
    description: 'Strategic AI governance and business impact oversight',
    icon: Crown,
    color: 'from-blue-600 to-indigo-700',
    defaultView: 'executive-summary',
    primaryMetrics: ['business-impact', 'portfolio-risk', 'compliance-status', 'ai-roi'],
    workflows: ['strategic-approval', 'portfolio-review', 'risk-acceptance'],
    restrictions: ['no-technical-details', 'high-level-only'],
    focus: ['Business Impact', 'Strategic Alignment', 'ROI', 'Risk Overview']
  },
  'qa_tevv_engineer': {
    id: 'qa_tevv_engineer',
    name: 'QA/TEVV Engineer',
    title: 'Quality Assurance & TEVV Engineer',
    description: 'Manual validation, ISO 25010 quality dimensions, and TEVV execution',
    icon: Code,
    color: 'from-green-600 to-emerald-700',
    defaultView: 'quality-dashboard',
    primaryMetrics: ['test-coverage', 'quality-scores', 'defect-rates', 'manual-validation'],
    workflows: ['manual-validation', 'evidence-collection', 'quality-assessment'],
    tools: ['iso-25010-tracker', 'manual-test-runner', 'evidence-collector'],
    focus: ['Quality Metrics', 'Test Coverage', 'Manual Validation', 'Evidence Collection']
  },
  'tevv_automation_engineer': {
    id: 'tevv_automation_engineer',
    name: 'TEVV Automation Engineer',
    title: 'TEVV Automation Engineer',
    description: 'EU AI Act automation, CI/CD integration, and automated evidence collection',
    icon: Activity,
    color: 'from-purple-600 to-violet-700',
    defaultView: 'automation-pipeline',
    primaryMetrics: ['automation-coverage', 'pipeline-health', 'eu-compliance', 'evidence-automation'],
    workflows: ['pipeline-setup', 'automation-config', 'evidence-automation'],
    tools: ['cicd-integration', 'automation-designer', 'evidence-collector'],
    focus: ['Pipeline Health', 'EU AI Act Compliance', 'Automation Coverage', 'Evidence Collection']
  },
  'ai_secops_engineer': {
    id: 'ai_secops_engineer',
    name: 'AI SecOps Engineer',
    title: 'AI Security Operations Engineer',
    description: 'Security testing, incident response, and adversarial validation',
    icon: Shield,
    color: 'from-red-600 to-pink-700',
    defaultView: 'security-operations',
    primaryMetrics: ['security-score', 'threat-detection', 'incident-response', 'vulnerability-count'],
    workflows: ['incident-response', 'security-testing', 'threat-analysis'],
    tools: ['red-team-tools', 'security-scanner', 'incident-tracker'],
    focus: ['Security Posture', 'Threat Detection', 'Incident Response', 'Adversarial Testing']
  },
  'domain_ethics_reviewer': {
    id: 'domain_ethics_reviewer',
    name: 'Domain & Ethics Reviewer',
    title: 'Domain & Ethics Reviewer',
    description: 'Independent domain expertise and ethics validation',
    icon: Gavel,
    color: 'from-amber-600 to-yellow-700',
    defaultView: 'ethics-review',
    primaryMetrics: ['ethics-score', 'domain-accuracy', 'fairness-assessment', 'expert-consensus'],
    workflows: ['ethics-review', 'domain-validation', 'fairness-assessment'],
    tools: ['ethics-rubric', 'domain-validator', 'consensus-tracker'],
    focus: ['Ethics Review', 'Domain Accuracy', 'Fairness Assessment', 'Expert Consensus']
  }
};

export const getArchetypeMetrics = (archetypeId: string): ArchetypeMetrics => {
  const baseMetrics = {
    'business-impact': { value: '$12.4M', change: '+$2.1M', trend: 'up' as const, description: 'Quantified business value from AI initiatives' },
    'portfolio-risk': { value: '7.2/10', change: '-0.3', trend: 'up' as const, description: 'Overall portfolio risk score' },
    'compliance-status': { value: '87%', change: '+5%', trend: 'up' as const, description: 'Regulatory compliance rate' },
    'ai-roi': { value: '+247%', change: '+23%', trend: 'up' as const, description: 'Return on AI investment' },
    'test-coverage': { value: '94.2%', change: '+2.1%', trend: 'up' as const, description: 'Automated test coverage' },
    'quality-scores': { value: '96.8%', change: '+1.3%', trend: 'up' as const, description: 'Average quality score' },
    'defect-rates': { value: '0.02%', change: '-0.01%', trend: 'up' as const, description: 'Defect detection rate' },
    'manual-validation': { value: '89.3%', change: '+4.2%', trend: 'up' as const, description: 'Manual validation pass rate' },
    'automation-coverage': { value: '98%', change: '+12%', trend: 'up' as const, description: 'Pipeline automation coverage' },
    'pipeline-health': { value: '96%', change: '+3%', trend: 'up' as const, description: 'CI/CD pipeline health' },
    'eu-compliance': { value: '82%', change: '+8%', trend: 'up' as const, description: 'EU AI Act compliance' },
    'evidence-automation': { value: '94%', change: '+15%', trend: 'up' as const, description: 'Automated evidence collection' },
    'security-score': { value: '94%', change: '+3%', trend: 'up' as const, description: 'Overall security posture' },
    'threat-detection': { value: '99.7%', change: '+0.2%', trend: 'up' as const, description: 'Threat detection rate' },
    'incident-response': { value: '4.2min', change: '-1.3min', trend: 'up' as const, description: 'Average incident response time' },
    'vulnerability-count': { value: '2', change: '-3', trend: 'up' as const, description: 'Open critical vulnerabilities' },
    'ethics-score': { value: '92.7%', change: '+2.8%', trend: 'up' as const, description: 'Ethics assessment score' },
    'domain-accuracy': { value: '94.1%', change: '+1.5%', trend: 'up' as const, description: 'Domain-specific accuracy' },
    'fairness-assessment': { value: '88.9%', change: '+3.2%', trend: 'up' as const, description: 'Fairness evaluation score' },
    'expert-consensus': { value: '0.87', change: '+0.05', trend: 'up' as const, description: 'Expert panel consensus rate' }
  };

  const config = archetypeConfigs[archetypeId];
  const metrics: ArchetypeMetrics = {};
  
  config.primaryMetrics.forEach(metricKey => {
    if (baseMetrics[metricKey as keyof typeof baseMetrics]) {
      metrics[metricKey] = baseMetrics[metricKey as keyof typeof baseMetrics];
    }
  });

  return metrics;
};

export const getArchetypeWorkflows = (archetypeId: string): ArchetypeWorkflow[] => {
  const workflows: { [key: string]: ArchetypeWorkflow[] } = {
    'cio_cdo': [
      {
        id: 'strategic-approval',
        name: 'Strategic AI Approval',
        description: 'Review and approve high-risk AI deployments',
        archetype: 'cio_cdo',
        estimatedDuration: '2-3 days',
        currentStep: 2,
        steps: [
          { id: 'risk-review', title: 'Risk Assessment Review', description: 'Review comprehensive risk analysis', status: 'completed', priority: 'high' },
          { id: 'business-impact', title: 'Business Impact Analysis', description: 'Evaluate business value and ROI', status: 'in_progress', priority: 'high' },
          { id: 'compliance-check', title: 'Compliance Verification', description: 'Verify regulatory compliance', status: 'pending', priority: 'medium' },
          { id: 'final-approval', title: 'Strategic Approval', description: 'Final deployment authorization', status: 'pending', priority: 'critical' }
        ]
      }
    ],
    'qa_tevv_engineer': [
      {
        id: 'manual-validation',
        name: 'Manual Quality Validation',
        description: 'Comprehensive manual testing and validation',
        archetype: 'qa_tevv_engineer',
        estimatedDuration: '1-2 weeks',
        currentStep: 1,
        steps: [
          { id: 'test-design', title: 'Test Case Design', description: 'Design manual test cases', status: 'in_progress', priority: 'high' },
          { id: 'execution', title: 'Test Execution', description: 'Execute manual tests', status: 'pending', priority: 'high' },
          { id: 'evidence', title: 'Evidence Collection', description: 'Collect and document evidence', status: 'pending', priority: 'medium' },
          { id: 'validation', title: 'Quality Validation', description: 'Validate quality metrics', status: 'pending', priority: 'high' }
        ]
      }
    ],
    'tevv_automation_engineer': [
      {
        id: 'pipeline-setup',
        name: 'TEVV Pipeline Setup',
        description: 'Configure automated TEVV pipeline',
        archetype: 'tevv_automation_engineer',
        estimatedDuration: '3-5 days',
        currentStep: 3,
        steps: [
          { id: 'pipeline-design', title: 'Pipeline Design', description: 'Design automation pipeline', status: 'completed', priority: 'high' },
          { id: 'integration', title: 'CI/CD Integration', description: 'Integrate with existing pipelines', status: 'completed', priority: 'high' },
          { id: 'testing', title: 'Pipeline Testing', description: 'Test automation pipeline', status: 'in_progress', priority: 'medium' },
          { id: 'deployment', title: 'Pipeline Deployment', description: 'Deploy to production', status: 'pending', priority: 'high' }
        ]
      }
    ],
    'ai_secops_engineer': [
      {
        id: 'security-testing',
        name: 'Security Validation',
        description: 'Comprehensive security testing and validation',
        archetype: 'ai_secops_engineer',
        estimatedDuration: '1 week',
        currentStep: 2,
        steps: [
          { id: 'threat-model', title: 'Threat Modeling', description: 'Identify security threats', status: 'completed', priority: 'high' },
          { id: 'red-team', title: 'Red Team Testing', description: 'Adversarial testing', status: 'in_progress', priority: 'critical' },
          { id: 'vulnerability', title: 'Vulnerability Assessment', description: 'Security vulnerability scan', status: 'pending', priority: 'high' },
          { id: 'remediation', title: 'Security Remediation', description: 'Address security issues', status: 'pending', priority: 'critical' }
        ]
      }
    ],
    'domain_ethics_reviewer': [
      {
        id: 'ethics-review',
        name: 'Ethics Review Process',
        description: 'Independent ethics and domain validation',
        archetype: 'domain_ethics_reviewer',
        estimatedDuration: '1-2 weeks',
        currentStep: 1,
        steps: [
          { id: 'ethics-assessment', title: 'Ethics Assessment', description: 'Evaluate ethical implications', status: 'in_progress', priority: 'high' },
          { id: 'domain-review', title: 'Domain Validation', description: 'Validate domain-specific accuracy', status: 'pending', priority: 'high' },
          { id: 'fairness-check', title: 'Fairness Assessment', description: 'Assess fairness across demographics', status: 'pending', priority: 'medium' },
          { id: 'consensus', title: 'Expert Consensus', description: 'Achieve expert panel consensus', status: 'pending', priority: 'high' }
        ]
      }
    ]
  };

  return workflows[archetypeId] || [];
};

export const getArchetypeInsights = (archetypeId: string): ArchetypeInsight[] => {
  const insights: { [key: string]: ArchetypeInsight[] } = {
    'cio_cdo': [
      {
        type: 'strategic',
        title: 'AI Competitive Advantage Established',
        description: 'Healthcare AI delivers 40% better outcomes than industry average',
        action: 'Strategic Planning Session',
        priority: 'high',
        archetype: 'cio_cdo',
        affectedAreas: ['Healthcare Portfolio', 'Competitive Position']
      },
      {
        type: 'risk',
        title: 'Regulatory Landscape Evolving',
        description: 'EU AI Act implementation requires $500K investment in Q2',
        action: 'Budget Approval Required',
        priority: 'critical',
        archetype: 'cio_cdo',
        affectedAreas: ['Budget Planning', 'Compliance']
      },
      {
        type: 'opportunity',
        title: 'Market Expansion Opportunity',
        description: 'Trust metrics enable expansion into regulated markets',
        action: 'Market Analysis Review',
        priority: 'medium',
        archetype: 'cio_cdo',
        affectedAreas: ['Market Strategy', 'Business Growth']
      }
    ],
    'qa_tevv_engineer': [
      {
        type: 'success',
        title: 'TEVV Automation Suite Deployed',
        description: 'Automated testing pipeline reduces manual effort by 75%',
        action: 'View TEVV Dashboard',
        priority: 'medium',
        archetype: 'qa_tevv_engineer',
        affectedAreas: ['Test Automation', 'Efficiency']
      },
      {
        type: 'warning',
        title: 'Model Drift Detected',
        description: 'Content Generator showing 15% performance drift, retraining recommended',
        action: 'Review Drift Analysis',
        priority: 'high',
        archetype: 'qa_tevv_engineer',
        affectedAreas: ['Model Performance', 'Quality Assurance']
      }
    ],
    'tevv_automation_engineer': [
      {
        type: 'success',
        title: 'EU AI Act Pipeline Operational',
        description: 'Automated TEVV pipeline achieving 98% compliance coverage',
        action: 'Monitor Pipeline Health',
        priority: 'medium',
        archetype: 'tevv_automation_engineer',
        affectedAreas: ['EU Compliance', 'Automation']
      },
      {
        type: 'warning',
        title: 'Pipeline Performance Degradation',
        description: 'CI/CD pipeline showing 20% slower execution times',
        action: 'Optimize Pipeline Configuration',
        priority: 'high',
        archetype: 'tevv_automation_engineer',
        affectedAreas: ['Pipeline Performance', 'Efficiency']
      }
    ],
    'ai_secops_engineer': [
      {
        type: 'critical',
        title: 'Prompt Injection Attempts Detected',
        description: '12 sophisticated prompt injection attempts blocked in last 24h',
        action: 'Review Security Logs',
        priority: 'critical',
        archetype: 'ai_secops_engineer',
        affectedAreas: ['Security Threats', 'Incident Response']
      },
      {
        type: 'warning',
        title: 'Model Theft Protection Update Required',
        description: 'New attack vectors identified, security controls need updating',
        action: 'Update Security Controls',
        priority: 'high',
        archetype: 'ai_secops_engineer',
        affectedAreas: ['Security Controls', 'Threat Protection']
      }
    ],
    'domain_ethics_reviewer': [
      {
        type: 'warning',
        title: 'Fairness Assessment Required',
        description: 'Healthcare AI showing potential bias in demographic groups',
        action: 'Conduct Fairness Review',
        priority: 'high',
        archetype: 'domain_ethics_reviewer',
        affectedAreas: ['Fairness', 'Ethics Compliance']
      },
      {
        type: 'success',
        title: 'Domain Validation Complete',
        description: 'Medical accuracy validation passed with 94.1% score',
        action: 'Review Validation Report',
        priority: 'low',
        archetype: 'domain_ethics_reviewer',
        affectedAreas: ['Domain Accuracy', 'Validation']
      }
    ]
  };

  return insights[archetypeId] || [];
};

export const getArchetypeFromRole = (role: string): string => {
  const roleMapping: { [key: string]: string } = {
    '🔵 AI Governance Lead (Risk + Compliance)': 'cio_cdo',
    '🟢 QA/TEVV Engineer (ISO 25010, Manual Validation)': 'qa_tevv_engineer',
    '🟣 TEVV Automation Engineer (EU AI Act, Test Automation)': 'tevv_automation_engineer',
    '🔴 AI SecOps Engineer (Security + DevSecOps)': 'ai_secops_engineer',
    '🟡 Domain & Ethics Reviewer (Domain + Ethics)': 'domain_ethics_reviewer'
  };

  return roleMapping[role] || 'cio_cdo';
};

export const getArchetypeNavigation = (archetypeId: string): string[] => {
  const navigation: { [key: string]: string[] } = {
    'cio_cdo': [
      'dashboard',
      'applications',
      'risk-assessment',
      'compliance-reporting',
      'analytics',
      'reports'
    ],
    'qa_tevv_engineer': [
      'dashboard',
      'applications',
      'evaluations',
      'model-validation',
      'datasets',
      'human-feedback',
      'reports'
    ],
    'tevv_automation_engineer': [
      'dashboard',
      'applications',
      'tevv-automation',
      'continuous-monitoring',
      'observability',
      'analytics'
    ],
    'ai_secops_engineer': [
      'dashboard',
      'applications',
      'guardrails',
      'alerts',
      'observability',
      'audit-trail'
    ],
    'domain_ethics_reviewer': [
      'dashboard',
      'applications',
      'ethical-ai',
      'bias-auditing',
      'human-feedback',
      'reports'
    ]
  };

  return navigation[archetypeId] || navigation['cio_cdo'];
};

export const getArchetypeInputsOutputs = (archetypeId: string) => {
  const inputsOutputs: { [key: string]: { responsibilities: string[], outputs: string[] } } = {
    'cio_cdo': {
      responsibilities: [
        'Strategic oversight of AI initiatives',
        'Business impact assessment',
        'Portfolio risk management',
        'Compliance verification'
      ],
      outputs: [
        'Application business criticality classification',
        'Strategic alignment validation',
        'ROI projections and business value assessment',
        'Executive approval for high-risk deployments'
      ]
    },
    'qa_tevv_engineer': {
      responsibilities: [
        'Manual quality validation',
        'ISO 25010 quality assessment',
        'Evidence collection',
        'Test case design and execution'
      ],
      outputs: [
        'Quality metrics and test coverage reports',
        'Manual validation evidence',
        'Defect identification and tracking',
        'Quality assurance certification'
      ]
    },
    'tevv_automation_engineer': {
      responsibilities: [
        'CI/CD pipeline integration',
        'EU AI Act automation',
        'Automated evidence collection',
        'Pipeline health monitoring'
      ],
      outputs: [
        'Automated TEVV pipeline configuration',
        'EU AI Act compliance automation',
        'Evidence automation frameworks',
        'Pipeline performance metrics'
      ]
    },
    'ai_secops_engineer': {
      responsibilities: [
        'Security testing and validation',
        'Threat detection and response',
        'Adversarial testing',
        'Vulnerability assessment'
      ],
      outputs: [
        'Security posture assessment',
        'Threat detection reports',
        'Incident response documentation',
        'Security remediation plans'
      ]
    },
    'domain_ethics_reviewer': {
      responsibilities: [
        'Ethics review and validation',
        'Domain accuracy assessment',
        'Fairness evaluation',
        'Expert consensus building'
      ],
      outputs: [
        'Ethics assessment reports',
        'Domain-specific validation',
        'Fairness assessment scores',
        'Expert panel consensus documentation'
      ]
    }
  };

  return inputsOutputs[archetypeId] || inputsOutputs['cio_cdo'];
};