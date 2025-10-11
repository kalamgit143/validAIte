export interface TestCase {
  id: string;
  use_case: string;
  test_name: string;
  framework: TestFramework;
  interface_type: InterfaceType;
  script_code: string;
  script_path: string;
  metric: string;
  threshold: string | number;
  dataset_ref: string;
  risk: string;
  status: TestCaseStatus;
  created_at: string;
  input_prompt: string;
  expected_response: string;
}

export type TestFramework = 'Playwright' | 'RestAssured' | 'Postman' | 'Selenium' | 'Pytest';
export type InterfaceType = 'API' | 'UI' | 'Hybrid';
export type TestCaseStatus = 'Draft' | 'Generated' | 'Validated' | 'Approved';

export const TEST_FRAMEWORKS: TestFramework[] = ['Playwright', 'RestAssured', 'Postman', 'Selenium', 'Pytest'];
export const INTERFACE_TYPES: InterfaceType[] = ['API', 'UI', 'Hybrid'];
export const TEST_CASE_STATUSES: TestCaseStatus[] = ['Draft', 'Generated', 'Validated', 'Approved'];

export interface TestCaseMetadata {
  test_case_id: string;
  use_case_id: string;
  risk: string;
  metric: string;
  threshold: string | number;
  dataset_ref: string;
  framework: TestFramework;
  status: TestCaseStatus;
}

export interface ExecutionManifest {
  application: string;
  archetype: string;
  test_cases: TestCaseMetadata[];
  generated_date: string;
}

export function generatePlaywrightScript(
  testName: string,
  inputPrompt: string,
  expectedResponse: string,
  metric: string,
  threshold: string | number,
  appUrl: string
): string {
  return `import { test, expect } from "@playwright/test";
import { cosineSimilarity } from "../utils/metricUtils";

test("${testName} - ${metric} Test", async ({ page }) => {
  // Navigate to application
  await page.goto("${appUrl}");

  // Wait for chat interface to load
  await page.waitForSelector("#chat-input");

  // Enter prompt
  await page.fill("#chat-input", "${inputPrompt.replace(/"/g, '\\"')}");

  // Send message
  await page.click("#send-button");

  // Wait for response
  await page.waitForSelector("#chat-response");
  const response = await page.textContent("#chat-response");

  // Expected response
  const expected = "${expectedResponse.replace(/"/g, '\\"')}";

  // Calculate metric score
  const score = cosineSimilarity(response, expected);
  console.log("${metric} Score:", score);

  // Assert threshold
  expect(score).toBeGreaterThanOrEqual(${threshold});
});`;
}

export function generateRestAssuredScript(
  testName: string,
  inputPrompt: string,
  expectedResponse: string,
  metric: string,
  threshold: string | number,
  apiEndpoint: string
): string {
  return `import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import java.util.Map;

public class ${testName.replace(/[^a-zA-Z0-9]/g, '')}Test {

    @Test
    public void test${metric.replace(/[^a-zA-Z0-9]/g, '')}() {
        // Setup
        RestAssured.baseURI = "${apiEndpoint}";
        String prompt = "${inputPrompt.replace(/"/g, '\\"')}";
        String expected = "${expectedResponse.replace(/"/g, '\\"')}";

        // Make API call
        Response response = given()
            .header("Authorization", "Bearer " + System.getenv("API_TOKEN"))
            .header("Content-Type", "application/json")
            .body(Map.of("prompt", prompt))
            .post("/chat");

        // Extract response
        String actual = response.jsonPath().getString("response");

        // Calculate metric
        double score = MetricUtils.cosineSimilarity(actual, expected);
        System.out.println("${metric} Score: " + score);

        // Assert
        assertTrue(score >= ${threshold}, "${metric} Score below threshold");
    }
}`;
}

export function generatePostmanScript(
  testName: string,
  inputPrompt: string,
  expectedResponse: string,
  metric: string,
  threshold: string | number,
  apiEndpoint: string
): string {
  return `{
  "info": {
    "name": "${testName} - ${metric} Test",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "${testName}",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{API_TOKEN}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"prompt\\": \\"${inputPrompt.replace(/"/g, '\\"')}\\"\\n}"
        },
        "url": {
          "raw": "${apiEndpoint}/chat",
          "host": ["${apiEndpoint}"],
          "path": ["chat"]
        }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "const response = pm.response.json();",
              "const actual = response.response;",
              "const expected = '${expectedResponse.replace(/'/g, "\\'")}';",
              "",
              "// Calculate similarity (simplified)",
              "const score = calculateSimilarity(actual, expected);",
              "console.log('${metric} Score:', score);",
              "",
              "pm.test('${metric} Score >= ${threshold}', function() {",
              "    pm.expect(score).to.be.at.least(${threshold});",
              "});",
              "",
              "function calculateSimilarity(str1, str2) {",
              "    // Simplified similarity calculation",
              "    return str1.toLowerCase().includes(str2.toLowerCase()) ? 0.9 : 0.5;",
              "}"
            ]
          }
        }
      ]
    }
  ]
}`;
}

export function generatePytestScript(
  testName: string,
  inputPrompt: string,
  expectedResponse: string,
  metric: string,
  threshold: string | number,
  apiEndpoint: string
): string {
  return `import pytest
import requests
from utils.metrics import cosine_similarity

def test_${testName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${metric.toLowerCase().replace(/[^a-z0-9]/g, '_')}():
    """
    Test ${testName} - ${metric}
    Threshold: ${threshold}
    """
    # Setup
    api_url = "${apiEndpoint}/chat"
    headers = {
        "Authorization": f"Bearer {os.getenv('API_TOKEN')}",
        "Content-Type": "application/json"
    }

    # Input
    prompt = "${inputPrompt.replace(/"/g, '\\"')}"
    expected = "${expectedResponse.replace(/"/g, '\\"')}"

    # Execute
    response = requests.post(
        api_url,
        headers=headers,
        json={"prompt": prompt}
    )

    # Extract response
    actual = response.json().get("response", "")

    # Calculate metric
    score = cosine_similarity(actual, expected)
    print(f"${metric} Score: {score}")

    # Assert
    assert score >= ${threshold}, f"${metric} Score {score} below threshold ${threshold}"`;
}

export function generateTestCase(
  datasetEntry: any,
  framework: TestFramework,
  interfaceType: InterfaceType,
  appSetup: any
): TestCase {
  const testId = `TC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const testName = `${datasetEntry.use_case.replace(/[^a-zA-Z0-9]/g, '_')}_${datasetEntry.metric_tags[0]?.replace(/[^a-zA-Z0-9]/g, '_') || 'test'}`;

  let scriptCode = '';
  let scriptPath = '';

  const appUrl = appSetup.ui_url || 'https://app.example.com';
  const apiEndpoint = appSetup.api_endpoint || 'https://api.example.com';
  const threshold = 0.8;

  switch (framework) {
    case 'Playwright':
      scriptCode = generatePlaywrightScript(
        testName,
        datasetEntry.input_prompt,
        datasetEntry.expected_response,
        datasetEntry.metric_tags[0] || 'Faithfulness',
        threshold,
        appUrl
      );
      scriptPath = `/tests/${testName}.spec.js`;
      break;

    case 'RestAssured':
      scriptCode = generateRestAssuredScript(
        testName,
        datasetEntry.input_prompt,
        datasetEntry.expected_response,
        datasetEntry.metric_tags[0] || 'Faithfulness',
        threshold,
        apiEndpoint
      );
      scriptPath = `/src/test/java/${testName}Test.java`;
      break;

    case 'Postman':
      scriptCode = generatePostmanScript(
        testName,
        datasetEntry.input_prompt,
        datasetEntry.expected_response,
        datasetEntry.metric_tags[0] || 'Faithfulness',
        threshold,
        apiEndpoint
      );
      scriptPath = `/collections/${testName}.postman_collection.json`;
      break;

    case 'Pytest':
      scriptCode = generatePytestScript(
        testName,
        datasetEntry.input_prompt,
        datasetEntry.expected_response,
        datasetEntry.metric_tags[0] || 'Faithfulness',
        threshold,
        apiEndpoint
      );
      scriptPath = `/tests/test_${testName.toLowerCase()}.py`;
      break;

    default:
      scriptCode = '// Test script generation not implemented for this framework';
      scriptPath = `/tests/${testName}.txt`;
  }

  return {
    id: testId,
    use_case: datasetEntry.use_case,
    test_name: testName,
    framework,
    interface_type: interfaceType,
    script_code: scriptCode,
    script_path: scriptPath,
    metric: datasetEntry.metric_tags[0] || 'Faithfulness',
    threshold,
    dataset_ref: datasetEntry.id,
    risk: 'Hallucination',
    status: 'Generated',
    created_at: new Date().toISOString(),
    input_prompt: datasetEntry.input_prompt,
    expected_response: datasetEntry.expected_response
  };
}

export function generateExecutionManifest(
  testCases: TestCase[],
  application: string,
  archetype: string
): ExecutionManifest {
  return {
    application,
    archetype,
    generated_date: new Date().toISOString(),
    test_cases: testCases.map(tc => ({
      test_case_id: tc.id,
      use_case_id: tc.use_case,
      risk: tc.risk,
      metric: tc.metric,
      threshold: tc.threshold,
      dataset_ref: tc.dataset_ref,
      framework: tc.framework,
      status: tc.status
    }))
  };
}

export function exportTestSuiteAsZip(testCases: TestCase[]): Blob {
  // Simplified: In production, use JSZip or similar
  const files: string[] = [];

  testCases.forEach(tc => {
    files.push(`=== File: ${tc.script_path} ===\n\n${tc.script_code}\n\n`);
  });

  const content = files.join('\n\n');
  return new Blob([content], { type: 'text/plain' });
}

export function getFrameworkColor(framework: TestFramework): string {
  switch (framework) {
    case 'Playwright':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'RestAssured':
      return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
    case 'Postman':
      return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-500';
    case 'Selenium':
      return 'text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 border-purple-500';
    case 'Pytest':
      return 'text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/20 border-cyan-500';
  }
}

export function getInterfaceColor(interfaceType: InterfaceType): string {
  switch (interfaceType) {
    case 'API':
      return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border-blue-500';
    case 'UI':
      return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-500';
    case 'Hybrid':
      return 'text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 border-purple-500';
  }
}
