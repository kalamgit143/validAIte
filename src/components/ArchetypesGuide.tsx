import React, { useState } from 'react';
import {
  Brain,
  MessageSquare,
  Code,
  Database,
  Bot,
  Image,
  FileText,
  Video,
  Mic,
  Shield,
  Network,
  Building,
  ChevronRight,
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Target,
  Layers,
  TrendingUp,
  Lock,
  Eye
} from 'lucide-react';

interface Archetype {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  riskProfile: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  characteristics: string[];
  useCases: string[];
  keyControls: string[];
  primaryMetrics: string[];
  euAIActClass: string;
  nistRMFLevel: string;
  complexity: number;
}

const archetypes: Archetype[] = [
  {
    id: 'A1',
    code: 'A1',
    name: 'Simple Chatbot / Q&A',
    description: 'Basic conversational interfaces with pre-defined responses or simple LLM-based Q&A without external data retrieval',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-600',
    riskProfile: 'LOW',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 1',
    complexity: 1,
    characteristics: [
      'Single-turn or multi-turn conversations',
      'No external knowledge base',
      'Static or semi-dynamic responses',
      'Limited domain scope',
      'No tool use or function calling'
    ],
    useCases: [
      'Customer service FAQs',
      'Internal IT helpdesk',
      'Product information chatbots',
      'Simple appointment scheduling'
    ],
    keyControls: [
      'Prompt template validation',
      'Output toxicity filtering',
      'Response quality monitoring',
      'User feedback collection'
    ],
    primaryMetrics: ['RES', 'TOX', 'PII', 'LAT']
  },
  {
    id: 'A2',
    code: 'A2',
    name: 'Content Generator',
    description: 'LLM-based systems that generate creative or informational content like marketing copy, summaries, or documentation',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    riskProfile: 'LOW',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 1',
    complexity: 2,
    characteristics: [
      'Single-domain content generation',
      'Template-based or free-form output',
      'No real-time data dependencies',
      'Human-in-the-loop review typical',
      'Brand and style guidelines enforcement'
    ],
    useCases: [
      'Marketing copy generation',
      'Email drafting assistants',
      'Social media content creation',
      'Documentation summarization',
      'Blog post generation'
    ],
    keyControls: [
      'Content quality validation',
      'Brand compliance checking',
      'Plagiarism detection',
      'Factuality verification',
      'Tone and style consistency'
    ],
    primaryMetrics: ['CRE', 'REL', 'TOX', 'STY', 'FAC']
  },
  {
    id: 'A3',
    code: 'A3',
    name: 'RAG System (Basic)',
    description: 'Retrieval-Augmented Generation with vector search over internal knowledge bases, documents, or FAQs',
    icon: Database,
    color: 'from-purple-500 to-violet-600',
    riskProfile: 'MEDIUM',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 2',
    complexity: 3,
    characteristics: [
      'Vector database integration',
      'Semantic search and retrieval',
      'Citation and grounding required',
      'Knowledge freshness policies',
      'Chunking and embedding strategies'
    ],
    useCases: [
      'Enterprise knowledge management',
      'Technical documentation Q&A',
      'Legal document retrieval',
      'Customer support with KB',
      'Internal policy assistants'
    ],
    keyControls: [
      'Retrieval quality assurance',
      'Groundedness validation',
      'Citation accuracy',
      'Knowledge freshness monitoring',
      'Access control enforcement'
    ],
    primaryMetrics: ['GRD', 'CIT', 'R@K', 'MRR', 'FRS']
  },
  {
    id: 'A4',
    code: 'A4',
    name: 'Structured Output Generator',
    description: 'LLM systems generating structured data (JSON, XML, database records) with schema validation',
    icon: Code,
    color: 'from-orange-500 to-red-600',
    riskProfile: 'MEDIUM',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 2',
    complexity: 3,
    characteristics: [
      'Schema-constrained outputs',
      'Data validation and parsing',
      'Integration with downstream systems',
      'Format consistency requirements',
      'Error handling and retry logic'
    ],
    useCases: [
      'Form filling automation',
      'Data extraction from documents',
      'API response generation',
      'Database record creation',
      'Report template population'
    ],
    keyControls: [
      'Schema validation',
      'Output format verification',
      'Data type consistency',
      'Completeness checking',
      'Integration testing'
    ],
    primaryMetrics: ['VAL', 'COM', 'ACC', 'CON', 'ERR']
  },
  {
    id: 'A5',
    code: 'A5',
    name: 'Code Assistant / IDE Plugin',
    description: 'AI-powered coding assistants providing code completion, generation, and review',
    icon: Code,
    color: 'from-indigo-500 to-blue-600',
    riskProfile: 'MEDIUM',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 2',
    complexity: 4,
    characteristics: [
      'Context-aware code suggestions',
      'Multi-language support',
      'Repository integration',
      'Security vulnerability detection',
      'Code quality analysis'
    ],
    useCases: [
      'IDE code completion',
      'Code review automation',
      'Documentation generation',
      'Test case generation',
      'Refactoring suggestions'
    ],
    keyControls: [
      'Security scanning',
      'License compliance',
      'Code quality validation',
      'Malicious code detection',
      'Privacy protection'
    ],
    primaryMetrics: ['SEC', 'QUA', 'ACC', 'LAT', 'SAF']
  },
  {
    id: 'A6',
    code: 'A6',
    name: 'Data Analyst / NLQ-to-SQL',
    description: 'Natural language query systems translating questions into SQL or data queries',
    icon: Database,
    color: 'from-teal-500 to-cyan-600',
    riskProfile: 'HIGH',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 3',
    complexity: 5,
    characteristics: [
      'Natural language to SQL translation',
      'Database schema understanding',
      'Query validation and safety',
      'Result interpretation',
      'Access control integration'
    ],
    useCases: [
      'Business intelligence assistants',
      'Self-service analytics',
      'Data exploration tools',
      'Report generation',
      'Ad-hoc query interfaces'
    ],
    keyControls: [
      'SQL injection prevention',
      'Query authorization',
      'Data access control',
      'Result validation',
      'Performance monitoring'
    ],
    primaryMetrics: ['ACC', 'SEC', 'PRV', 'PER', 'VAL']
  },
  {
    id: 'A7',
    code: 'A7',
    name: 'Vision AI / Multimodal',
    description: 'Systems processing images, video, or mixed media inputs with LLM reasoning',
    icon: Image,
    color: 'from-pink-500 to-rose-600',
    riskProfile: 'HIGH',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 3',
    complexity: 5,
    characteristics: [
      'Image and video processing',
      'OCR and document understanding',
      'Multi-modal reasoning',
      'Content moderation',
      'Media redaction capabilities'
    ],
    useCases: [
      'Medical image analysis',
      'Document processing',
      'Visual inspection systems',
      'Content moderation',
      'Accessibility tools'
    ],
    keyControls: [
      'Image quality validation',
      'PII detection and redaction',
      'Bias in visual recognition',
      'Medical accuracy validation',
      'Content appropriateness'
    ],
    primaryMetrics: ['ACC', 'PII', 'BIA', 'LAT', 'REL']
  },
  {
    id: 'A8',
    code: 'A8',
    name: 'Audio / Speech AI',
    description: 'Systems with speech recognition, synthesis, or voice-based interactions',
    icon: Mic,
    color: 'from-yellow-500 to-orange-600',
    riskProfile: 'MEDIUM',
    euAIActClass: 'Limited Risk',
    nistRMFLevel: 'Level 2',
    complexity: 4,
    characteristics: [
      'Automatic speech recognition',
      'Text-to-speech synthesis',
      'Voice biometric considerations',
      'Audio quality handling',
      'Multi-language support'
    ],
    useCases: [
      'Voice assistants',
      'Call center automation',
      'Transcription services',
      'Audio accessibility',
      'Voice-based navigation'
    ],
    keyControls: [
      'Audio quality validation',
      'Transcription accuracy',
      'Voice biometric privacy',
      'Language support verification',
      'Accessibility compliance'
    ],
    primaryMetrics: ['WER', 'LAT', 'PRV', 'ACC', 'LAN']
  },
  {
    id: 'A9',
    code: 'A9',
    name: 'Agentic AI / Tool Use',
    description: 'Autonomous agents with tool/function calling, planning, and multi-step reasoning',
    icon: Bot,
    color: 'from-red-500 to-pink-600',
    riskProfile: 'CRITICAL',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 4',
    complexity: 7,
    characteristics: [
      'Multi-step planning and execution',
      'Tool and API calling',
      'State management',
      'Error recovery mechanisms',
      'Cost and loop protection'
    ],
    useCases: [
      'Automated workflow systems',
      'IT operations automation',
      'Research assistants',
      'Complex task orchestration',
      'Autonomous decision systems'
    ],
    keyControls: [
      'Tool policy enforcement',
      'Cost limit controls',
      'Loop detection',
      'Action approval gates',
      'Observability and tracing'
    ],
    primaryMetrics: ['TPV', 'CST', 'REL', 'AUD', 'LAT']
  },
  {
    id: 'A10',
    code: 'A10',
    name: 'Fine-Tuned / Custom Model',
    description: 'Domain-specific models trained or fine-tuned on proprietary data',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    riskProfile: 'HIGH',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 3',
    complexity: 6,
    characteristics: [
      'Custom training data',
      'Model fine-tuning or adaptation',
      'Domain-specific optimization',
      'Model versioning',
      'Training data governance'
    ],
    useCases: [
      'Healthcare diagnostics',
      'Legal document analysis',
      'Financial modeling',
      'Domain-specific NER',
      'Specialized classifiers'
    ],
    keyControls: [
      'Training data quality',
      'Model validation',
      'Bias and fairness testing',
      'Model versioning',
      'Performance monitoring'
    ],
    primaryMetrics: ['ACC', 'BIA', 'REL', 'DRI', 'VAL']
  },
  {
    id: 'A11',
    code: 'A11',
    name: 'Enterprise Integration',
    description: 'Mission-critical systems with SOD, change management, and enterprise governance',
    icon: Building,
    color: 'from-gray-600 to-slate-700',
    riskProfile: 'CRITICAL',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 4',
    complexity: 8,
    characteristics: [
      'Separation of duties enforcement',
      'Change management integration',
      'Audit trail requirements',
      'Data residency compliance',
      'Enterprise SSO integration'
    ],
    useCases: [
      'Financial transaction systems',
      'Healthcare record systems',
      'Legal case management',
      'Regulatory compliance',
      'Critical infrastructure'
    ],
    keyControls: [
      'SOD attestation',
      'Change gate validation',
      'Audit completeness',
      'Data residency verification',
      'Release approval workflows'
    ],
    primaryMetrics: ['AUD', 'SOD', 'RES', 'REL', 'SEC']
  },
  {
    id: 'A12',
    code: 'A12',
    name: 'Multi-Agent System',
    description: 'Complex systems with multiple coordinating agents, advanced reasoning, and distributed decision-making',
    icon: Network,
    color: 'from-emerald-600 to-teal-700',
    riskProfile: 'CRITICAL',
    euAIActClass: 'High Risk',
    nistRMFLevel: 'Level 4',
    complexity: 9,
    characteristics: [
      'Multiple agent coordination',
      'Distributed reasoning',
      'Complex state management',
      'Inter-agent communication',
      'Emergent behavior monitoring'
    ],
    useCases: [
      'Autonomous supply chain',
      'Smart city systems',
      'Multi-robot coordination',
      'Complex simulation',
      'Distributed AI trading'
    ],
    keyControls: [
      'Agent coordination validation',
      'Communication security',
      'Emergent behavior detection',
      'System-wide observability',
      'Failure isolation'
    ],
    primaryMetrics: ['COR', 'EMG', 'REL', 'SEC', 'OBS']
  }
];

export default function ArchetypesGuide() {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>(archetypes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredArchetypes = archetypes.filter(arch => {
    const matchesSearch = arch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         arch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         arch.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || arch.riskProfile === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplexityStars = (complexity: number) => {
    return '★'.repeat(complexity) + '☆'.repeat(9 - complexity);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              AI Application Archetypes Guide
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive taxonomy of 12 AI application patterns with NIST RMF and EU AI Act mappings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search archetypes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{filteredArchetypes.length} of {archetypes.length} archetypes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 px-3 mb-3">Select Archetype</h3>
          {filteredArchetypes.map((arch) => {
            const Icon = arch.icon;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetype(arch)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedArchetype.id === arch.id
                    ? 'bg-blue-50 border-blue-300 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${arch.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-gray-600">{arch.code}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getRiskColor(arch.riskProfile)}`}>
                        {arch.riskProfile}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">{arch.name}</h4>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    selectedArchetype.id === arch.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          {selectedArchetype && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedArchetype.color} flex-shrink-0`}>
                  {React.createElement(selectedArchetype.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-mono font-bold text-gray-700">{selectedArchetype.code}</span>
                    <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getRiskColor(selectedArchetype.riskProfile)}`}>
                      {selectedArchetype.riskProfile} RISK
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedArchetype.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{selectedArchetype.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-xs text-blue-600 font-semibold mb-1">EU AI Act</div>
                  <div className="text-sm font-bold text-blue-900">{selectedArchetype.euAIActClass}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-xs text-purple-600 font-semibold mb-1">NIST RMF</div>
                  <div className="text-sm font-bold text-purple-900">{selectedArchetype.nistRMFLevel}</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="text-xs text-amber-600 font-semibold mb-1">Complexity</div>
                  <div className="text-sm font-bold text-amber-900">{getComplexityStars(selectedArchetype.complexity)}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-600" />
                  Key Characteristics
                </h3>
                <div className="space-y-2">
                  {selectedArchetype.characteristics.map((char, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gray-600" />
                  Common Use Cases
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedArchetype.useCases.map((useCase, idx) => (
                    <div key={idx} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700">
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  Key Controls Required
                </h3>
                <div className="space-y-2">
                  {selectedArchetype.keyControls.map((control, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Lock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{control}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                  Primary Trust Metrics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArchetype.primaryMetrics.map((metric, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-mono font-bold border border-blue-200">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Implementation Guidance</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      This archetype requires {selectedArchetype.riskProfile.toLowerCase()} risk governance processes.
                      Implement all {selectedArchetype.keyControls.length} key controls and monitor {selectedArchetype.primaryMetrics.length} primary metrics
                      for {selectedArchetype.euAIActClass} compliance under EU AI Act and {selectedArchetype.nistRMFLevel} assurance under NIST RMF.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
