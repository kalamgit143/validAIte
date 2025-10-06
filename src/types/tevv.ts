export interface TEVVPack {
  packId: string;
  archetype: string;
  riskTier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  controls: {
    required: string[];
  };
  datasets: {
    evalSets: Array<{
      name: string;
      source: string;
    }>;
  };
  tests: Array<{
    id: string;
    type: string;
    dataset?: string;
    metrics: string[];
  }>;
  thresholds: Record<string, string>;
  evidence: {
    capture: string[];
    store: string;
  };
  authorization: {
    rule: string;
    blockers: string[];
  };
  monitoring: {
    alerts: string[];
  };
}

export interface Control {
  id: string;
  family: string;
  name: string;
  description: string;
  category: 'GOV' | 'DAT' | 'MOD' | 'SEC' | 'SAF' | 'FAI' | 'EXPL' | 'OBS' | 'REL' | 'RAG' | 'SCH' | 'AGT' | 'AUT' | 'INT' | 'MON';
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  unit: string;
  range: string;
  betterDirection: 'higher' | 'lower';
}

export interface Threshold {
  metric: string;
  low: string;
  moderate: string;
  high: string;
  critical: string;
}

export interface EvidencePack {
  id: string;
  applicationId: string;
  archetype: string;
  riskTier: string;
  timestamp: string;
  sections: {
    policy: string[];
    design: string[];
    controls: string[];
    tevv: string[];
    metrics: string[];
    authorization: string[];
    monitoring: string[];
  };
  status: 'draft' | 'complete' | 'approved' | 'rejected';
}

export interface MetricResult {
  id: string;
  metric: string;
  value: number;
  threshold: string;
  status: 'pass' | 'fail' | 'warning';
  timestamp: string;
  details?: string;
}

export interface AuthorizationDecision {
  id: string;
  applicationId: string;
  timestamp: string;
  decision: 'authorized' | 'conditional' | 'denied';
  controlsImplemented: boolean;
  testsExecuted: boolean;
  metricsPass: boolean;
  blockersPresent: boolean;
  validUntil?: string;
  monitoringPlan?: string[];
  remediationRequired?: string[];
}

export interface MonitoringSLO {
  id: string;
  archetype: string;
  metric: string;
  target: string;
  current: number;
  status: 'healthy' | 'warning' | 'breach';
  lastChecked: string;
}
