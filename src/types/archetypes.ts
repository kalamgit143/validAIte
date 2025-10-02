// Archetype-specific types and configurations

export interface ArchetypeConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  defaultView: string;
  primaryMetrics: string[];
  workflows: string[];
  restrictions?: string[];
  tools?: string[];
  focus: string[];
}

export interface ArchetypeMetrics {
  [key: string]: {
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'stable';
    description: string;
  };
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignedTo?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ArchetypeWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  archetype: string;
  estimatedDuration: string;
  currentStep?: number;
}

export interface ArchetypeInsight {
  type: 'success' | 'warning' | 'critical' | 'opportunity' | 'strategic' | 'risk';
  title: string;
  description: string;
  action: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  archetype: string;
  affectedAreas: string[];
}