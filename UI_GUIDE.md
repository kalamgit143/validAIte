# ValidAIte UI Guide

## User Interface Layout & Navigation

### Main Application Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: QUALIZEAL | User Profile | Workflow Indicator | Search │
└─────────────────────────────────────────────────────────────────┘
│
├── Sidebar (Navigation)          │  Main Content Area
│                                  │
│   📊 Platform                    │  [Active Component Rendered Here]
│      • Dashboard                 │
│      • AI Applications           │  • Archetype Classifier
│                                  │  • RMF Workflow
│   🎯 ValidAIte - NIST RMF ⭐     │  • TEVV Pack Manager
│      • Archetype Classifier      │  • Metrics Dashboard
│      • RMF Workflow              │  • Evidence Pack Manager
│      • TEVV Pack Manager         │
│      • Metrics Dashboard         │
│      • Evidence Pack             │
│                                  │
│   🛡️ Risk Mapping & Governance  │
│   📈 Trust Metrics Engine        │
│   🔬 TEVV Automation Suite       │
│   👥 Validation Lab (HITL)       │
│   📡 Continuous Monitoring       │
│   📋 Compliance Reporting        │
│   🏢 Organization                │
│                                  │
└──────────────────────────────────┴──────────────────────────────┘
```

---

## 1. Archetype Classifier UI

### Layout: Single Page Form with 3-Step Flow

#### Step 1: Input Form
```
┌─────────────────────────────────────────────────────────────────┐
│  Archetype Classifier                                      🧠   │
│  NIST RMF Step 1: Categorize - Auto-classify GenAI apps         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Application Metadata                                            │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ App Name            │  │ Domain        [⌄]   │              │
│  │ Insurance Policy... │  │ • Insurance         │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                  │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ Impact Context [⌄]  │  │ Data Sensitivity    │              │
│  │ • Customer Facing   │  │ [PII] [PHI] [PCI]   │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                  │
│  ──────────────────────────────────────────────────────────────│
│                                                                  │
│  Capabilities                                                    │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ Interaction  [⌄]    │  │ Model Provider [⌄]  │              │
│  │ • Multi Turn        │  │ • OpenAI            │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                  │
│  ☑ Retrieval (RAG)      ☑ Citations                             │
│  ☐ Fine-Tuned Model     ☑ Tool Use (Agents)                     │
│  ☑ Vision (VLM)         ☐ Speech (ASR)                          │
│  ☐ NL to SQL            ☐ IDE Plugins                           │
│                                                                  │
│  Autonomy Threshold (%)                                          │
│  ┌────────────────────────────────┐                             │
│  │ [0        ▓▓▓▓░░░░░░░░    100] │                             │
│  └────────────────────────────────┘                             │
│                                                                  │
│  ──────────────────────────────────────────────────────────────│
│                                                                  │
│  Integration & Governance                                        │
│  ☑ SSO/SCIM             ☑ Release Gates                         │
│  ☑ Audit Trails         ☐ HITL Mandatory                        │
│                                                                  │
│  Enterprise Systems                                              │
│  [SAP] [Salesforce] [ServiceNow✓] [Guidewire]                  │
│                                                                  │
│  Regulatory Scope                                                │
│  [HIPAA] [SOX] [GDPR] [GxP] [AML]                              │
│                                                                  │
│                      [Classify Application 🧠 →]                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 2: Classifying (Animated)
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                      ⚙️ (spinning animation)                    │
│                                                                  │
│                   Analyzing Application                          │
│              Running ADM classifier algorithm...                 │
│                                                                  │
│         ✅ Analyzing capabilities & features                     │
│         ✅ Evaluating tech stack signals                         │
│         ⏳ Computing archetype scores...                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 3: Results
```
┌─────────────────────────────────────────────────────────────────┐
│  Classification Result                                           │
├─────────────────────────────────────────────────────────────────┤
│  ╔═══════════════════════════════════════════════════╗          │
│  ║  A3: RAG Knowledge Assistant                🛡️    ║          │
│  ║  Primary classification with 42% confidence       ║          │
│  ║                                                   ║          │
│  ║  [HIGH Risk] [62% Confidence]                    ║          │
│  ╚═══════════════════════════════════════════════════╝          │
│                                                                  │
│  Modifiers                                                       │
│  [RAG] [AG] [ENT] [MM] [PII]                                    │
│                                                                  │
│  Archetype Mixture                                               │
│  A3: RAG Knowledge Assistant        44% ▓▓▓▓▓▓▓▓▓░░░             │
│  A11: Enterprise-Integrated GenAI   31% ▓▓▓▓▓▓░░░░░             │
│  A9: Tool-Using Agent               20% ▓▓▓▓░░░░░░░             │
│                                                                  │
│  Decision Trace                                                  │
│  → A3: retrieval enabled (+5)                                    │
│  → A3: citations enabled (+3)                                    │
│  → A3: vector DB: pinecone (+3)                                  │
│  → A11: enterprise systems: ServiceNow (+5)                      │
│  → A9: tool use enabled (+5)                                     │
│                                                                  │
│  Next Steps                                                      │
│  ✅ Generate TEVV pack for A3                                    │
│  ✅ Apply HIGH risk tier thresholds                              │
│  ✅ Configure controls and evidence capture                      │
│                                                                  │
│  [← Classify Another]            [Generate TEVV Pack 📦]         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. TEVV Pack Manager UI

### Layout: List → Detail → Execution Flow

#### List View
```
┌─────────────────────────────────────────────────────────────────┐
│  TEVV Pack Manager                                         📦   │
│  NIST RMF Steps 2-4: Select → Implement → Assess                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Insurance Policy Advisor              ✅  DEMO_A3_A11_A9   │ │
│  │ [A3] [A11] [A9]  +  [RAG][AG][ENT][PII]    [HIGH]         │ │
│  │                                                            │ │
│  │ 🛡️ 10 Controls  •  🧪 4 Tests  •  ✅ 6/6 Passed           │ │
│  │                                                            │ │
│  │                                     [👁️ View Results]      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Code Generation Assistant             ⏳  A5_CODE_MOD_V01  │ │
│  │ [A5]  +  [CODE]                            [MODERATE]      │ │
│  │                                                            │ │
│  │ 🛡️ 4 Controls  •  🧪 1 Test  •  ⏳ Running                │ │
│  │                                                            │ │
│  │                                          [▶️ Run Pack]      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Detail View
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Packs                 [Export Config] [▶️ Execute]   │
├─────────────────────────────────────────────────────────────────┤
│  ╔═══════════════════════════════════════════════════════════╗ │
│  ║  Insurance Policy Advisor                                 ║ │
│  ║  DEMO_A3_A11_A9_HIGH_V01                                  ║ │
│  ║  [HIGH Risk]  Status: completed                           ║ │
│  ╚═══════════════════════════════════════════════════════════╝ │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────┐    │
│  │ Required Controls        │  │ Test Configuration       │    │
│  │                          │  │                          │    │
│  │ ✅ RAG-01               │  │ ✅ T-GRD-01             │    │
│  │ Chunking policy          │  │ Groundedness             │    │
│  │                          │  │ [GRD][CIT]               │    │
│  │ ✅ RAG-02               │  │                          │    │
│  │ Retriever quality        │  │ ✅ T-RTR-01             │    │
│  │                          │  │ Retrieval Quality        │    │
│  │ ✅ RAG-03               │  │ [R@5][MRR][FRS]          │    │
│  │ Freshness & re-index     │  │                          │    │
│  │                          │  │ ✅ T-AGT-01             │    │
│  │ ✅ INT-01               │  │ Tool Policy              │    │
│  │ Release gates            │  │ [TPV]                    │    │
│  │                          │  │                          │    │
│  │ ✅ AGT-01               │  │ ✅ T-AUD-01             │    │
│  │ Tool registry & scopes   │  │ Audit Completeness       │    │
│  │                          │  │ [AUD]                    │    │
│  └──────────────────────────┘  └──────────────────────────┘    │
│                                                                  │
│  Thresholds (HIGH Risk Tier)                                    │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐             │
│  │ GRD │ │ CIT │ │ R@5 │ │ FRS │ │ TPV │ │ AUD │             │
│  │≥0.90│ │≥0.95│ │≥0.85│ │≤3d  │ │≤1/1k│ │≥0.99│             │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘             │
│                                                                  │
│  Test Results                           2025-10-02 14:30        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ GRD  ✅ │ │ CIT  ✅ │ │ R@5  ✅ │                        │
│  │ 0.92     │ │ 0.96     │ │ 0.86     │                        │
│  │ score    │ │ score    │ │ score    │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ FRS  ✅ │ │ TPV  ✅ │ │ AUD  ✅ │                        │
│  │ 2.0      │ │ 0.5      │ │ 0.995    │                        │
│  │ days     │ │ /1000    │ │ score    │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. RMF Workflow UI

### Layout: Expandable Phase Cards

```
┌─────────────────────────────────────────────────────────────────┐
│  NIST RMF Workflow                    Insurance Policy Advisor  │
│  End-to-end risk management framework execution                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ╔═══════════════════════════════════════════════════════════╗ │
│  ║  🔍  1. Categorize                             ✅         ║ │
│  ║  Classify AI system and determine risk tier                ║ │
│  ║                                                             ║ │
│  ║  Actions                                                    ║ │
│  ║  ✅ Ingest VAM manifest           2025-10-02 14:15         ║ │
│  ║  ✅ Run ADM classifier             2025-10-02 14:16         ║ │
│  ║  ✅ Determine archetype mix        2025-10-02 14:16         ║ │
│  ║                                                             ║ │
│  ║  Outputs                                                    ║ │
│  ║  → Primary Archetype: A3 (RAG Knowledge Assistant)         ║ │
│  ║  → Mixture: A11 (30%), A9 (20%)                            ║ │
│  ║  → Risk Tier: HIGH                                         ║ │
│  ╚═══════════════════════════════════════════════════════════╝ │
│        │                                                          │
│        ▼                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  🛡️  2. Select                                 ✅         │ │
│  │  Choose controls and TEVV requirements                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│        │                                                          │
│        ▼                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ⚙️  3. Implement                              ✅         │ │
│  │  Configure controls and instrumentation                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│        │                                                          │
│        ▼                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  🧪  4. Assess                                 ✅         │ │
│  │  Execute TEVV tests and collect evidence                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│        │                                                          │
│        ▼                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ✅  5. Authorize                              ✅         │ │
│  │  Make go/no-go authorization decision                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│        │                                                          │
│        ▼                                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📡  6. Monitor                                ⏳         │ │
│  │  Continuous monitoring and drift detection                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ ✅ 5/6   │ │ ⏱️ 20min │ │ 📊 6/6   │                        │
│  │ Complete │ │ Duration │ │ Passing  │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Metrics Dashboard UI

### Layout: Metric Cards Grid + Summary

```
┌─────────────────────────────────────────────────────────────────┐
│  Metrics Dashboard                         [Category ▼] [7d ▼] │
│  Real-time trust metrics - Insurance Policy Advisor             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ GRD      ✅ │ │ CIT      ✅ │ │ R@5      ✅ │            │
│  │ Groundedness │ │ Citation Acc │ │ Recall@5     │            │
│  │              │ │              │ │              │            │
│  │  0.92        │ │  0.96        │ │  0.86        │            │
│  │  score       │ │  score       │ │  score       │            │
│  │ Threshold:   │ │ Threshold:   │ │ Threshold:   │            │
│  │ ≥0.90        │ │ ≥0.95        │ │ ≥0.85        │            │
│  │              │ │              │ │              │            │
│  │ ─────────── │ │ ─────────── │ │ ─────────── │            │
│  │ (sparkline)  │ │ (sparkline)  │ │ (sparkline)  │            │
│  │              │ │              │ │              │            │
│  │ [Quality]    │ │ [Quality]    │ │ [Retrieval]  │            │
│  │ 📈 +2.3%    │ │ ─ 0.0%      │ │ 📉 -1.1%    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ FRS      ✅ │ │ TPV      ✅ │ │ AUD      ✅ │            │
│  │ Freshness    │ │ Tool Policy  │ │ Audit Compl. │            │
│  │              │ │              │ │              │            │
│  │  2.0         │ │  0.5         │ │  0.995       │            │
│  │  days        │ │  /1000       │ │  score       │            │
│  │ Threshold:   │ │ Threshold:   │ │ Threshold:   │            │
│  │ ≤3           │ │ ≤1.0         │ │ ≥0.99        │            │
│  │              │ │              │ │              │            │
│  │ ─────────── │ │ ─────────── │ │ ─────────── │            │
│  │ (sparkline)  │ │ (sparkline)  │ │ (sparkline)  │            │
│  │              │ │              │ │              │            │
│  │ [Operation]  │ │ [Security]   │ │ [Compliance] │            │
│  │ 📈 +25.0%   │ │ ─ 0.0%      │ │ ─ 0.0%      │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ╔═══════════════════════════════════════════════════════════╗ │
│  ║  ✅  All Metrics Passing                                  ║ │
│  ║  All 6 metrics meet HIGH risk tier thresholds.            ║ │
│  ║  System authorized for production until 2026-01-02.       ║ │
│  ║                                                            ║ │
│  ║  📡 Next review: 30 days  •  📅 Last assessed: 2 hrs ago  ║ │
│  ╚═══════════════════════════════════════════════════════════╝ │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ SLO          │ │ Retrieval    │ │ Incidents    │            │
│  │ Compliance   │ │ Drift        │ │              │            │
│  │ 100%     ✅ │ │ 4.2%     📡 │ │ 0        ✅ │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Evidence Pack Manager UI

### Layout: Folder Sidebar + Artifact List

```
┌─────────────────────────────────────────────────────────────────┐
│  Evidence Pack Manager                   [📥 Download Pack]     │
│  Regulator-ready evidence - Insurance Policy Advisor            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Folders          │  Selected: 04_TEVV                           │
│                   │  Test manifests, datasets, raw results       │
│  ┌─────────────┐ │ ┌────────────────────────────────────────┐   │
│  │ 🛡️ 01_Policy│ │ │ 📄 TEVV_Pack_DEMO_A3_A11_A9_HIGH...   │   │
│  │ 4 artifacts │ │ │ YAML • 18 KB • 2025-10-02  🔒 [👁️][📥] │   │
│  │         ✅ │ │ └────────────────────────────────────────┘   │
│  └─────────────┘ │                                              │
│                   │ ┌────────────────────────────────────────┐   │
│  ┌─────────────┐ │ │ 📄 groundedness_eval_dataset.json      │   │
│  │ 💾 02_Design│ │ │ JSON • 2.3 MB • 2025-10-02 🔒 [👁️][📥] │   │
│  │ 5 artifacts │ │ └────────────────────────────────────────┘   │
│  │         ✅ │ │                                              │
│  └─────────────┘ │ ┌────────────────────────────────────────┐   │
│                   │ │ 📄 test_results_T-GRD-01.json          │   │
│  ┌─────────────┐ │ │ JSON • 456 KB • 2025-10-02 🔒 [👁️][📥] │   │
│  │ ✅ 03_Control│ │ └────────────────────────────────────────┘   │
│  │ 4 artifacts │ │                                              │
│  │         ✅ │ │ ┌────────────────────────────────────────┐   │
│  └─────────────┘ │ │ 📄 test_results_T-RTR-01.json          │   │
│                   │ │ JSON • 389 KB • 2025-10-02 🔒 [👁️][📥] │   │
│  ┌─────────────┐ │ └────────────────────────────────────────┘   │
│  │ 📋 04_TEVV ◀│ │                                              │
│  │ 6 artifacts │ │ ┌────────────────────────────────────────┐   │
│  │         ✅ │ │ │ 📄 test_results_T-AGT-01.json          │   │
│  └─────────────┘ │ │ JSON • 124 KB • 2025-10-02 🔒 [👁️][📥] │   │
│                   │ └────────────────────────────────────────┘   │
│  ┌─────────────┐ │                                              │
│  │ 📊 05_Metric│ │ ┌────────────────────────────────────────┐   │
│  │ 3 artifacts │ │ │ 📄 test_results_T-AUD-01.json          │   │
│  │         ✅ │ │ │ JSON • 67 KB • 2025-10-02  🔒 [👁️][📥] │   │
│  └─────────────┘ │ └────────────────────────────────────────┘   │
│                   │                                              │
│  ┌─────────────┐ │                                              │
│  │ 🔒 06_Author│ │                                              │
│  │ 3 artifacts │ │                                              │
│  │         ✅ │ │                                              │
│  └─────────────┘ │                                              │
│                   │                                              │
│  ┌─────────────┐ │                                              │
│  │ 📡 07_Monitor│ │                                              │
│  │ 4 artifacts │ │                                              │
│  │         ✅ │ │                                              │
│  └─────────────┘ │                                              │
│                                                                  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐      │
│  │ ✅ 7/7    │ │ 📄 29     │ │ 🔒 100%   │ │ 🛡️ Ready  │      │
│  │ Complete  │ │ Artifacts │ │ Signed    │ │ Regulator │      │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Risk Tiers
- **LOW**: Green (`#10b981`)
- **MODERATE**: Yellow (`#f59e0b`)
- **HIGH**: Orange (`#f97316`)
- **CRITICAL**: Red (`#ef4444`)

### Status Indicators
- **Completed**: Green checkmark (`#10b981`)
- **In Progress**: Blue clock (`#3b82f6`)
- **Pending**: Gray clock (`#9ca3af`)
- **Failed**: Red X (`#ef4444`)

### Categories
- **Quality**: Blue (`#3b82f6`)
- **Retrieval**: Purple (`#8b5cf6`)
- **Security**: Red (`#ef4444`)
- **Compliance**: Green (`#10b981`)
- **Operational**: Yellow (`#f59e0b`)

---

## Responsive Behavior

### Desktop (≥1024px)
- Sidebar always visible
- 3-column grids for metrics
- Full navigation menu

### Tablet (768px - 1023px)
- Collapsible sidebar
- 2-column grids
- Condensed navigation

### Mobile (≤767px)
- Hidden sidebar (hamburger menu)
- Single-column layouts
- Stacked cards

---

## Interaction Patterns

### Buttons
- **Primary Action**: Blue background, white text
- **Secondary Action**: White background, gray border
- **Danger Action**: Red background, white text
- **Disabled**: Gray background, cursor not-allowed

### Form Elements
- **Text Input**: Border focus with blue ring
- **Select Dropdown**: Chevron indicator
- **Checkbox**: Rounded corners with checkmark
- **Toggle Pills**: Blue when selected, gray when not

### Cards
- **Default**: White/gray-800 background, gray border
- **Selected**: Blue border, blue tinted background
- **Success**: Green border, green tinted background
- **Error**: Red border, red tinted background

### Hover States
- Buttons: Darken background
- Cards: Add border color
- Links: Underline appears

---

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals

### Screen Reader Support
- ARIA labels on all icons
- Role attributes on custom components
- Alt text on images

### Color Contrast
- WCAG AA compliant (4.5:1 minimum)
- Dark mode optimized
- Focus indicators visible

---

*This UI guide shows the complete layout structure for all ValidAIte components. Each screen is designed for clarity, efficiency, and regulatory compliance.*
