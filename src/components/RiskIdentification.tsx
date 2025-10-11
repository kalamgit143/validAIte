import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Shield,
  Plus,
  X,
  Download,
  Sparkles,
  Filter,
  CheckCircle,
  Edit2,
  Save,
  BarChart3,
  FileText,
  ChevronRight,
  Eye,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import {
  Risk,
  RiskCategory,
  Severity,
  Likelihood,
  RiskStatus,
  RISK_CATEGORIES,
  SEVERITIES,
  LIKELIHOODS,
  RISK_STATUSES,
  OWNER_ROLES,
  RISK_TAXONOMY,
  calculateRiskScore,
  getRiskLevel,
  generateRisksFromArchetype
} from '../utils/riskTaxonomy';

const RiskIdentification: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory | 'All'>('All');
  const [editingRisk, setEditingRisk] = useState<string | null>(null);
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockArchetypeData = {
    application_name: 'Insurance Policy Assistant',
    archetype_code: 'A2-RAG-ENT-PII',
    risk_tier: 'High',
    modifiers: ['RAG', 'ENT', 'PII'],
    domain: 'insurance',
    use_cases: ['Policy Premium Inquiry', 'Coverage Details'],
    data_sensitivity: ['pii'],
    autonomy_level: 'advisory'
  };

  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    category: 'Accuracy',
    risk_name: '',
    description: '',
    severity: 'Medium',
    likelihood: 'Occasional',
    impact_notes: '',
    owner_role: 'AI Risk Manager',
    status: 'Draft'
  });

  const generateRisks = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedRisks = generateRisksFromArchetype({
        archetype_code: mockArchetypeData.archetype_code,
        domain: mockArchetypeData.domain,
        modifiers: mockArchetypeData.modifiers,
        data_sensitivity: mockArchetypeData.data_sensitivity,
        autonomy_level: mockArchetypeData.autonomy_level,
        use_cases: mockArchetypeData.use_cases
      }) as Risk[];

      setRisks(generatedRisks);
      setIsGenerating(false);
    }, 2000);
  };

  const addCustomRisk = () => {
    if (newRisk.risk_name && newRisk.description) {
      const risk: Risk = {
        id: `risk-${Date.now()}`,
        category: newRisk.category as RiskCategory,
        risk_name: newRisk.risk_name,
        description: newRisk.description,
        severity: newRisk.severity as Severity,
        likelihood: newRisk.likelihood as Likelihood,
        impact_notes: newRisk.impact_notes || '',
        owner_role: newRisk.owner_role as string,
        status: newRisk.status as RiskStatus,
        score: calculateRiskScore(newRisk.severity as Severity, newRisk.likelihood as Likelihood)
      };

      setRisks([...risks, risk]);
      setNewRisk({
        category: 'Accuracy',
        risk_name: '',
        description: '',
        severity: 'Medium',
        likelihood: 'Occasional',
        impact_notes: '',
        owner_role: 'AI Risk Manager',
        status: 'Draft'
      });
    }
  };

  const updateRisk = (id: string, updates: Partial<Risk>) => {
    setRisks(risks.map(risk => {
      if (risk.id === id) {
        const updatedRisk = { ...risk, ...updates };
        if (updates.severity || updates.likelihood) {
          updatedRisk.score = calculateRiskScore(
            updatedRisk.severity,
            updatedRisk.likelihood
          );
        }
        return updatedRisk;
      }
      return risk;
    }));
  };

  const deleteRisk = (id: string) => {
    setRisks(risks.filter(risk => risk.id !== id));
  };

  const exportRiskRegister = () => {
    const register = {
      archetype: mockArchetypeData.archetype_code,
      application: mockArchetypeData.application_name,
      generated_date: new Date().toISOString(),
      risk_tier: mockArchetypeData.risk_tier,
      risks: risks
    };

    const blob = new Blob([JSON.stringify(register, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risk-register-${mockArchetypeData.archetype_code}.json`;
    a.click();
  };

  const filteredRisks = useMemo(() => {
    if (selectedCategory === 'All') return risks;
    return risks.filter(risk => risk.category === selectedCategory);
  }, [risks, selectedCategory]);

  const risksByCategory = useMemo(() => {
    const grouped: Record<string, number> = {};
    RISK_CATEGORIES.forEach(cat => {
      grouped[cat] = risks.filter(r => r.category === cat).length;
    });
    return grouped;
  }, [risks]);

  const riskScoreDistribution = useMemo(() => {
    const distribution = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    risks.forEach(risk => {
      const level = getRiskLevel(risk.score);
      distribution[level]++;
    });
    return distribution;
  }, [risks]);

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'High': return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-500';
      case 'Medium': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500';
      case 'Low': return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    }
  };

  const getLikelihoodColor = (likelihood: Likelihood) => {
    switch (likelihood) {
      case 'Frequent': return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-500';
      case 'Occasional': return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
      case 'Rare': return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 border-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    const level = getRiskLevel(score);
    switch (level) {
      case 'Critical': return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-600';
      case 'High': return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-600';
      case 'Medium': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-600';
      case 'Low': return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Risk Identification & Classification
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Identify and classify potential risks to establish your risk register
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-red-600 dark:text-red-400">
            {risks.length}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Risks Identified</span>
        </div>
      </div>

      {/* Archetype Context Display */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Inputs from Previous Stages</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Application</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockArchetypeData.application_name}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Archetype Code</div>
            <div className="font-bold text-gray-900 dark:text-white font-mono">{mockArchetypeData.archetype_code}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Risk Tier</div>
            <div className="font-bold text-red-600 dark:text-red-400">{mockArchetypeData.risk_tier}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Domain</div>
            <div className="font-bold text-gray-900 dark:text-white capitalize">{mockArchetypeData.domain}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Modifiers:</span>
          <div className="flex flex-wrap gap-2">
            {mockArchetypeData.modifiers.map(mod => (
              <span key={mod} className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold">
                {mod}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={generateRisks}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Generating Risks...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate via LLM</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowTaxonomy(!showTaxonomy)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <Eye className="w-5 h-5" />
          <span>{showTaxonomy ? 'Hide' : 'View'} Taxonomy</span>
        </button>

        <button
          onClick={exportRiskRegister}
          disabled={risks.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export Risk Register</span>
        </button>
      </div>

      {/* Risk Taxonomy Reference */}
      {showTaxonomy && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Predefined Risk Taxonomy (NIST RMF & EU AI Act Aligned)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(RISK_TAXONOMY).map(([category, riskNames]) => (
              <div key={category} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${category === 'Accuracy' ? 'bg-blue-500' : category === 'Security' ? 'bg-red-500' : category === 'Privacy' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                  <span>{category}</span>
                </h4>
                <ul className="space-y-1">
                  {riskNames.map(name => (
                    <li key={name} className="text-sm text-gray-600 dark:text-gray-400">• {name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Filters & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Category Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filter by Category</span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All Risks</span>
                  <span className="text-sm">{risks.length}</span>
                </div>
              </button>
              {RISK_CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category}</span>
                    <span className="text-sm">{risksByCategory[category]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Score Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Score Distribution</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(riskScoreDistribution).map(([level, count]) => (
                <div key={level}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{level}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        level === 'Critical' ? 'bg-red-600' :
                        level === 'High' ? 'bg-orange-500' :
                        level === 'Medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${risks.length > 0 ? (count / risks.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Risk Register */}
        <div className="lg:col-span-3 space-y-6">
          {/* Add Custom Risk */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border-2 border-green-200 dark:border-green-800 p-6">
            <h3 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Custom Risk</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newRisk.category}
                onChange={e => setNewRisk({ ...newRisk, category: e.target.value as RiskCategory })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {RISK_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="text"
                value={newRisk.risk_name}
                onChange={e => setNewRisk({ ...newRisk, risk_name: e.target.value })}
                placeholder="Risk Name"
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <select
                value={newRisk.severity}
                onChange={e => setNewRisk({ ...newRisk, severity: e.target.value as Severity })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {SEVERITIES.map(sev => (
                  <option key={sev} value={sev}>{sev}</option>
                ))}
              </select>

              <select
                value={newRisk.likelihood}
                onChange={e => setNewRisk({ ...newRisk, likelihood: e.target.value as Likelihood })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {LIKELIHOODS.map(lik => (
                  <option key={lik} value={lik}>{lik}</option>
                ))}
              </select>

              <textarea
                value={newRisk.description}
                onChange={e => setNewRisk({ ...newRisk, description: e.target.value })}
                placeholder="Risk Description"
                rows={2}
                className="md:col-span-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <select
                value={newRisk.owner_role}
                onChange={e => setNewRisk({ ...newRisk, owner_role: e.target.value })}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {OWNER_ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              <button
                onClick={addCustomRisk}
                className="md:col-span-1 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg"
              >
                Add Risk
              </button>
            </div>
          </div>

          {/* Risk Register Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Risk Register ({filteredRisks.length} Risks)</span>
              </h3>
            </div>

            {filteredRisks.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No risks identified yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Click "Generate via LLM" or add custom risks</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Risk Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Likelihood</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredRisks.map(risk => (
                      <tr key={risk.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          {editingRisk === risk.id ? (
                            <input
                              type="text"
                              value={risk.risk_name}
                              onChange={e => updateRisk(risk.id, { risk_name: e.target.value })}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            />
                          ) : (
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{risk.risk_name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{risk.description}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingRisk === risk.id ? (
                            <select
                              value={risk.category}
                              onChange={e => updateRisk(risk.id, { category: e.target.value as RiskCategory })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            >
                              {RISK_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                              {risk.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingRisk === risk.id ? (
                            <select
                              value={risk.severity}
                              onChange={e => updateRisk(risk.id, { severity: e.target.value as Severity })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            >
                              {SEVERITIES.map(sev => (
                                <option key={sev} value={sev}>{sev}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getSeverityColor(risk.severity)}`}>
                              {risk.severity}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingRisk === risk.id ? (
                            <select
                              value={risk.likelihood}
                              onChange={e => updateRisk(risk.id, { likelihood: e.target.value as Likelihood })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            >
                              {LIKELIHOODS.map(lik => (
                                <option key={lik} value={lik}>{lik}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getLikelihoodColor(risk.likelihood)}`}>
                              {risk.likelihood}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className={`px-3 py-1 rounded-lg text-xs font-bold border inline-flex items-center space-x-1 ${getScoreColor(risk.score)}`}>
                            <span>{risk.score}</span>
                            <span className="text-[10px]">({getRiskLevel(risk.score)})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{risk.owner_role}</span>
                        </td>
                        <td className="px-6 py-4">
                          {editingRisk === risk.id ? (
                            <select
                              value={risk.status}
                              onChange={e => updateRisk(risk.id, { status: e.target.value as RiskStatus })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            >
                              {RISK_STATUSES.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              risk.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              risk.status === 'Reviewed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              {risk.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {editingRisk === risk.id ? (
                              <button
                                onClick={() => setEditingRisk(null)}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingRisk(risk.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteRisk(risk.id)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Continue Button */}
          {risks.length > 0 && (
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Risk Register Complete</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {risks.length} risks identified and classified
                  </p>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                <span>Continue to Metrics Definition</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskIdentification;
