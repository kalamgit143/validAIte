import { Control } from '../types/tevv';

export const controls: Control[] = [
  { id: 'GOV-01', family: 'Governance & Roles', name: 'Policy Register', description: 'Maintain central registry of AI governance policies', category: 'GOV' },
  { id: 'GOV-02', family: 'Governance & Roles', name: 'RACI for AI', description: 'Define roles and responsibilities for AI systems', category: 'GOV' },
  { id: 'GOV-03', family: 'Governance & Roles', name: 'Model Risk Tiering', description: 'Classify and tier AI model risks', category: 'GOV' },

  { id: 'DAT-01', family: 'Data & Privacy', name: 'Data Lineage', description: 'Track data provenance and lineage', category: 'DAT' },
  { id: 'DAT-02', family: 'Data & Privacy', name: 'PII/PHI Minimization', description: 'Minimize collection and use of sensitive data', category: 'DAT' },
  { id: 'DAT-03', family: 'Data & Privacy', name: 'Retention & TTL', description: 'Define data retention and time-to-live policies', category: 'DAT' },
  { id: 'DAT-04', family: 'Data & Privacy', name: 'Consent/DPoA', description: 'Obtain and manage data consent and processing agreements', category: 'DAT' },

  { id: 'MOD-01', family: 'Model Governance', name: 'Model Card', description: 'Document model capabilities, limitations, and performance', category: 'MOD' },
  { id: 'MOD-02', family: 'Model Governance', name: 'Training/FT Provenance', description: 'Track training and fine-tuning data provenance', category: 'MOD' },
  { id: 'MOD-03', family: 'Model Governance', name: 'Hyperparameter Registry', description: 'Maintain registry of model hyperparameters', category: 'MOD' },
  { id: 'MOD-04', family: 'Model Governance', name: 'Versioning & Rollbacks', description: 'Version control and rollback capabilities for models', category: 'MOD' },

  { id: 'SEC-01', family: 'Security', name: 'Secrets Management', description: 'Secure storage and rotation of secrets and credentials', category: 'SEC' },
  { id: 'SEC-02', family: 'Security', name: 'Access Control (SSO/SCIM/SoD)', description: 'Implement access control with SSO, SCIM, and separation of duties', category: 'SEC' },
  { id: 'SEC-03', family: 'Security', name: 'Supply-Chain (SBOM)', description: 'Maintain software bill of materials for supply chain security', category: 'SEC' },
  { id: 'SEC-04', family: 'Security', name: 'Prompt/Response Redaction', description: 'Redact sensitive information from prompts and responses', category: 'SEC' },

  { id: 'SAF-01', family: 'Safety', name: 'Content Safety Gates', description: 'Implement gates to filter unsafe content', category: 'SAF' },
  { id: 'SAF-02', family: 'Safety', name: 'Jailbreak Resilience', description: 'Protect against jailbreak and adversarial prompts', category: 'SAF' },
  { id: 'SAF-03', family: 'Safety', name: 'Sensitive-Topic Policy Routing', description: 'Route sensitive topics to appropriate handling policies', category: 'SAF' },

  { id: 'FAI-01', family: 'Fairness', name: 'Slice Definition', description: 'Define protected slices for fairness evaluation', category: 'FAI' },
  { id: 'FAI-02', family: 'Fairness', name: 'Bias Tests', description: 'Conduct systematic bias testing across slices', category: 'FAI' },
  { id: 'FAI-03', family: 'Fairness', name: 'Remediation Plan', description: 'Develop and implement bias remediation plans', category: 'FAI' },

  { id: 'EXPL-01', family: 'Explainability', name: 'Rationale Capture', description: 'Capture and log reasoning rationales', category: 'EXPL' },
  { id: 'EXPL-02', family: 'Explainability', name: 'Explainer Fidelity Checks', description: 'Verify explanation accuracy and fidelity', category: 'EXPL' },
  { id: 'EXPL-03', family: 'Explainability', name: 'Decision Trace Logging', description: 'Log complete decision traces for audit', category: 'EXPL' },

  { id: 'OBS-01', family: 'Observability & Audit', name: 'Telemetry Spans', description: 'Implement distributed tracing with telemetry spans', category: 'OBS' },
  { id: 'OBS-02', family: 'Observability & Audit', name: 'Tool/RAG Traces', description: 'Trace tool calls and retrieval operations', category: 'OBS' },
  { id: 'OBS-03', family: 'Observability & Audit', name: 'Immutable Audit Store', description: 'Store audit logs in immutable storage', category: 'OBS' },

  { id: 'REL-01', family: 'Reliability & Robustness', name: 'Adversarial Prompts', description: 'Test resilience against adversarial prompts', category: 'REL' },
  { id: 'REL-02', family: 'Reliability & Robustness', name: 'Perturbation Tests', description: 'Test robustness under input perturbations', category: 'REL' },
  { id: 'REL-03', family: 'Reliability & Robustness', name: 'Determinism/Replay Seeds', description: 'Enable deterministic replay with fixed seeds', category: 'REL' },

  { id: 'RAG-01', family: 'Retrieval', name: 'Chunking Policy', description: 'Define and enforce document chunking policies', category: 'RAG' },
  { id: 'RAG-02', family: 'Retrieval', name: 'Retriever Quality', description: 'Monitor and maintain retriever quality metrics', category: 'RAG' },
  { id: 'RAG-03', family: 'Retrieval', name: 'Freshness & Re-index SLAs', description: 'Define and meet freshness and re-indexing SLAs', category: 'RAG' },
  { id: 'RAG-04', family: 'Retrieval', name: 'Citation Fidelity', description: 'Ensure accurate and faithful citations', category: 'RAG' },

  { id: 'SCH-01', family: 'Structure', name: 'JSON/Schema Contracts', description: 'Define and enforce schema contracts', category: 'SCH' },
  { id: 'SCH-02', family: 'Structure', name: 'Strict Validators', description: 'Implement strict schema validation', category: 'SCH' },
  { id: 'SCH-03', family: 'Structure', name: 'Differential Testing', description: 'Conduct differential testing against schemas', category: 'SCH' },

  { id: 'AGT-01', family: 'Agent/Tool-Use', name: 'Tool Registry & Scopes', description: 'Maintain tool registry with defined scopes', category: 'AGT' },
  { id: 'AGT-02', family: 'Agent/Tool-Use', name: 'Plan Validator', description: 'Validate agent plans before execution', category: 'AGT' },
  { id: 'AGT-03', family: 'Agent/Tool-Use', name: 'Cost/Loop Quotas', description: 'Enforce cost and loop iteration quotas', category: 'AGT' },

  { id: 'AUT-01', family: 'Autonomy', name: 'Autonomy Thresholds', description: 'Define and enforce autonomy threshold policies', category: 'AUT' },
  { id: 'AUT-02', family: 'Autonomy', name: 'Kill-Switch & Rollback', description: 'Implement emergency stop and rollback mechanisms', category: 'AUT' },
  { id: 'AUT-03', family: 'Autonomy', name: 'Simulation Drills', description: 'Conduct regular autonomy simulation drills', category: 'AUT' },

  { id: 'INT-01', family: 'Enterprise Integration', name: 'Release Gates', description: 'Implement pre-release quality gates', category: 'INT' },
  { id: 'INT-02', family: 'Enterprise Integration', name: 'Change Control', description: 'Enforce change control processes', category: 'INT' },
  { id: 'INT-03', family: 'Enterprise Integration', name: 'SoD Attestations', description: 'Maintain separation of duties attestations', category: 'INT' },
  { id: 'INT-04', family: 'Enterprise Integration', name: 'Data Residency', description: 'Ensure data residency compliance', category: 'INT' },

  { id: 'MON-01', family: 'Monitoring & IR', name: 'Drift Monitors', description: 'Monitor for model and data drift', category: 'MON' },
  { id: 'MON-02', family: 'Monitoring & IR', name: 'Incident Runbooks', description: 'Maintain incident response runbooks', category: 'MON' },
  { id: 'MON-03', family: 'Monitoring & IR', name: 'KPI/SLO Dashboards', description: 'Monitor KPIs and SLOs with dashboards', category: 'MON' },
];
