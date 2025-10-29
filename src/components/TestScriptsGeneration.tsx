import React, { useState, useMemo } from 'react';
import {
  Code,
  Play,
  Download,
  Sparkles,
  CheckCircle,
  ChevronRight,
  FileText,
  Target,
  TrendingUp,
  AlertCircle,
  Copy,
  Check,
  Archive,
  Eye,
  X
} from 'lucide-react';
import {
  TestCase,
  TestFramework,
  InterfaceType,
  TEST_FRAMEWORKS,
  INTERFACE_TYPES,
  generateTestCase,
  generateExecutionManifest,
  exportTestSuiteAsZip,
  getFrameworkColor,
  getInterfaceColor
} from '../utils/testCaseGeneration';

const TestScriptsGeneration: React.FC = () => {
  const mockDatasets = [
    {
      id: 'DS-01-1',
      use_case: 'Policy Premium Inquiry',
      input_prompt: 'What will be my premium for a policy of 10 lakhs sum assured at age 35?',
      expected_response: 'The premium for a 10 lakh policy at age 35 is approximately ₹12,500 per year.',
      metric_tags: ['Faithfulness Score', 'Groundedness Score'],
      difficulty_level: 'Medium',
      source: 'Generated'
    },
    {
      id: 'DS-01-2',
      use_case: 'Policy Premium Inquiry',
      input_prompt: 'Can you tell me the last updated date of premium calculation data?',
      expected_response: 'The premium calculation data was last updated on 15th March 2025.',
      metric_tags: ['Freshness Index'],
      difficulty_level: 'Easy',
      source: 'KB'
    },
    {
      id: 'DS-02-1',
      use_case: 'Coverage Details',
      input_prompt: 'What diseases are covered under critical illness insurance?',
      expected_response: 'Critical illness insurance typically covers heart attack, stroke, cancer, kidney failure, organ transplant, paralysis, and major surgeries as per policy terms.',
      metric_tags: ['Faithfulness Score', 'Groundedness Score'],
      difficulty_level: 'Medium',
      source: 'KB'
    }
  ];

  const mockAppSetup = {
    application_name: 'Insurance Policy Assistant',
    archetype_code: 'A2-RAG-ENT-PII',
    interface_type: 'Hybrid' as InterfaceType,
    api_endpoint: 'https://api.insurance.company.com',
    ui_url: 'https://insurebot.company.com',
    auth_method: 'Bearer Token'
  };

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<TestFramework>('Playwright');
  const [selectedInterface, setSelectedInterface] = useState<InterfaceType>(mockAppSetup.interface_type);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateAllTestCases = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generated: TestCase[] = mockDatasets.map(dataset =>
        generateTestCase(dataset, selectedFramework, selectedInterface, mockAppSetup)
      );

      setTestCases(generated);
      setIsGenerating(false);
      if (generated.length > 0) {
        setSelectedTestCase(generated[0]);
      }
    }, 2500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadScript = (testCase: TestCase) => {
    const blob = new Blob([testCase.script_code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const extension = testCase.framework === 'Postman' ? 'json' :
                     testCase.framework === 'Playwright' ? 'spec.js' :
                     testCase.framework === 'Pytest' ? 'py' : 'java';
    a.download = `${testCase.test_name}.${extension}`;
    a.click();
  };

  const downloadAllAsZip = () => {
    const blob = exportTestSuiteAsZip(testCases);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-suite-${mockAppSetup.archetype_code}.txt`;
    a.click();
  };

  const exportManifest = () => {
    const manifest = generateExecutionManifest(
      testCases,
      mockAppSetup.application_name,
      mockAppSetup.archetype_code
    );

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `execution-manifest-${mockAppSetup.archetype_code}.json`;
    a.click();
  };

  const frameworkStats = useMemo(() => {
    const stats: Record<TestFramework, number> = {
      Playwright: 0,
      RestAssured: 0,
      Postman: 0,
      Selenium: 0,
      Pytest: 0
    };
    testCases.forEach(tc => {
      stats[tc.framework]++;
    });
    return stats;
  }, [testCases]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Test Scripts Generation (Automation Generation)
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Automatically generate executable automation scripts from your datasets
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {testCases.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Test Cases</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {testCases.filter(tc => tc.status === 'Generated').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Generated</div>
          </div>
        </div>
      </div>

      {/* Context Display */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Inputs from Previous Stages</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Application</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockAppSetup.application_name}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Archetype</div>
            <div className="font-bold text-gray-900 dark:text-white font-mono">{mockAppSetup.archetype_code}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Interface</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockAppSetup.interface_type}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">API Endpoint</div>
            <div className="font-bold text-gray-900 dark:text-white text-xs truncate">{mockAppSetup.api_endpoint}</div>
          </div>
          <div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Dataset Entries</div>
            <div className="font-bold text-gray-900 dark:text-white">{mockDatasets.length}</div>
          </div>
        </div>
      </div>

      {/* Framework Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Automation Framework Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Framework
            </label>
            <select
              value={selectedFramework}
              onChange={e => setSelectedFramework(e.target.value as TestFramework)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            >
              {TEST_FRAMEWORKS.map(framework => (
                <option key={framework} value={framework}>{framework}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {selectedFramework === 'Playwright' && 'Modern UI automation with Node.js'}
              {selectedFramework === 'RestAssured' && 'Java-based REST API testing'}
              {selectedFramework === 'Postman' && 'API testing with collections'}
              {selectedFramework === 'Selenium' && 'Traditional UI automation'}
              {selectedFramework === 'Pytest' && 'Python-based testing framework'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interface Type
            </label>
            <select
              value={selectedInterface}
              onChange={e => setSelectedInterface(e.target.value as InterfaceType)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            >
              {INTERFACE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {selectedInterface === 'API' && 'REST API calls only'}
              {selectedInterface === 'UI' && 'Browser-based UI automation'}
              {selectedInterface === 'Hybrid' && 'Combined API + UI testing'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 flex-wrap">
        <button
          onClick={generateAllTestCases}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Generating Test Cases...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate via LLM</span>
            </>
          )}
        </button>

        <button
          onClick={downloadAllAsZip}
          disabled={testCases.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Archive className="w-5 h-5" />
          <span>Download Project ZIP</span>
        </button>

        <button
          onClick={exportManifest}
          disabled={testCases.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Export Manifest</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Test Case List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Generated Tests</span>
            </h3>
            {testCases.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No test cases yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testCases.map(tc => (
                  <button
                    key={tc.id}
                    onClick={() => setSelectedTestCase(tc)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTestCase?.id === tc.id
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">{tc.test_name}</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        selectedTestCase?.id === tc.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {tc.framework}
                      </span>
                      <span className="text-xs">{tc.metric}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Framework Stats */}
          {testCases.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Framework Stats</span>
              </h3>
              <div className="space-y-2">
                {Object.entries(frameworkStats).map(([framework, count]) => (
                  count > 0 && (
                    <div key={framework} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{framework}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Panel: Script Preview */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTestCase ? (
            <>
              {/* Test Case Info */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100">{selectedTestCase.test_name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getFrameworkColor(selectedTestCase.framework)}`}>
                      {selectedTestCase.framework}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getInterfaceColor(selectedTestCase.interface_type)}`}>
                      {selectedTestCase.interface_type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Use Case</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{selectedTestCase.use_case}</div>
                  </div>
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Metric</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{selectedTestCase.metric}</div>
                  </div>
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Threshold</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{selectedTestCase.threshold}</div>
                  </div>
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Status</div>
                    <div className="font-semibold text-green-700 dark:text-green-400 text-sm">{selectedTestCase.status}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
                  <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Input Prompt</div>
                  <div className="text-sm text-gray-900 dark:text-white mb-3">{selectedTestCase.input_prompt}</div>
                  <div className="text-xs text-indigo-700 dark:text-indigo-400 mb-1">Expected Response</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{selectedTestCase.expected_response}</div>
                </div>
              </div>

              {/* Script Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-green-400" />
                    <span className="text-white font-mono text-sm">{selectedTestCase.script_path}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(selectedTestCase.script_code, selectedTestCase.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                    >
                      {copiedId === selectedTestCase.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => downloadScript(selectedTestCase)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-gray-900 dark:bg-black overflow-x-auto max-h-96">
                  <pre className="text-sm font-mono text-green-400">
                    {selectedTestCase.script_code}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-12 text-center">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No test case selected</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Generate test cases and select one to view the script</p>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {testCases.length > 0 && (
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Test Suite Generation Complete</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {testCases.length} test cases generated • {selectedFramework} framework • Ready for execution
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
            <span>Continue to Trust Score Computation</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestScriptsGeneration;
