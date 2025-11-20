# TRIZ Brainstorming App - Workflow

## Complete Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    START: User Runs npm start                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: PROBLEM COLLECTION                                    │
├─────────────────────────────────────────────────────────────────┤
│  • User answers 8 questions via CLI                             │
│  • Questions cover: title, domain, situation, ideal result,     │
│    constraints, contradiction, resources                        │
│  • Raw text input collected                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: PROBLEM STRUCTURING (AI)                              │
├─────────────────────────────────────────────────────────────────┤
│  • Gemini converts free-form text to structured JSON            │
│  • Creates problem_statement.json with:                         │
│    - problem_title                                              │
│    - domain                                                     │
│    - current_situation (description + limitations)              │
│    - ideal_final_result (description + constraints)             │
│    - the_contradiction (improve vs. worsen)                     │
│    - resources (available)                                      │
│  • Saved to output/session_[id]/problem-statement.json          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: TRIZ IDEATION (AI × 40)                               │
├─────────────────────────────────────────────────────────────────┤
│  FOR EACH of 40 TRIZ Principles:                                │
│    1. Build ideation prompt with:                               │
│       - Problem statement                                       │
│       - Specific TRIZ principle                                 │
│       - Instructions for cross-domain analogies                 │
│    2. Gemini generates:                                         │
│       - Problem deconstruction                                  │
│       - Principle analysis                                      │
│       - 3 cross-domain analogies                                │
│       - 5 synthesized solutions                                 │
│       - Recommendation                                          │
│    3. Each solution includes:                                   │
│       - Concept name                                            │
│       - Mechanism                                               │
│       - Real-world analogy                                      │
│       - Implementation steps                                    │
│                                                                 │
│  RESULT: 200 solutions (40 principles × 5 solutions)            │
│  • Saved to output/session_[id]/raw-solutions.json              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4: KPI EVALUATION (AI × 200)                             │
├─────────────────────────────────────────────────────────────────┤
│  FOR EACH of 200 Solutions:                                     │
│    1. Build evaluation prompt with:                             │
│       - Solution concept                                        │
│       - KPI matrix (6 categories)                               │
│       - Problem context                                         │
│    2. Gemini scores solution on 6 KPIs:                         │
│       ┌──────────────────────────────────────────┐             │
│       │ KPI              Weight   Score (1-5)    │             │
│       ├──────────────────────────────────────────┤             │
│       │ IFR Alignment      25%      [1-5]        │             │
│       │ Technical Maturity 15%      [1-5]        │             │
│       │ Resource Avail.    15%      [1-5]        │             │
│       │ Cost Efficiency    20%      [1-5]        │             │
│       │ Novelty & IP       10%      [1-5]        │             │
│       │ Time-to-Integrate  15%      [1-5]        │             │
│       └──────────────────────────────────────────┘             │
│    3. Calculates weighted total score                           │
│    4. Provides overall assessment                               │
│                                                                 │
│  RESULT: 200 evaluated solutions with scores                    │
│  • Saved to output/session_[id]/complete-evaluation.json        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 5: RANKING & SELECTION                                   │
├─────────────────────────────────────────────────────────────────┤
│  1. Group solutions by TRIZ principle (40 groups)               │
│  2. Sort each group by weighted_total_score (descending)        │
│  3. Select top 2 from each group                                │
│  4. Combine all top solutions (80 total)                        │
│  5. Sort combined list by score (descending)                    │
│                                                                 │
│  RESULT: 80 top solutions (2 per principle), ranked             │
│  • Saved to output/session_[id]/top-solutions.json              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 6: REPORT GENERATION                                     │
├─────────────────────────────────────────────────────────────────┤
│  1. CONSOLE TABLE:                                              │
│     • Display top 10-20 solutions                               │
│     • Show: Rank, Principle, Concept, Score, Assessment         │
│     • Formatted with cli-table3                                 │
│                                                                 │
│  2. DETAILED MARKDOWN REPORT:                                   │
│     • For each top solution:                                    │
│       - Full description                                        │
│       - Mechanism explanation                                   │
│       - Real-world analogy                                      │
│       - Implementation steps                                    │
│       - KPI breakdown table                                     │
│       - Overall assessment                                      │
│     • Saved to output/session_[id]/detailed-report.md           │
│                                                                 │
│  3. JSON EXPORTS:                                               │
│     • problem-statement.json                                    │
│     • raw-solutions.json                                        │
│     • complete-evaluation.json                                  │
│     • top-solutions.json                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    END: Reports Ready                           │
│  User can review:                                               │
│  • Console output (immediate feedback)                          │
│  • Detailed markdown report (human-readable)                    │
│  • JSON files (machine-readable, for further processing)        │
└─────────────────────────────────────────────────────────────────┘
```

## Timing Breakdown

| Phase | Duration | API Calls | Notes |
|-------|----------|-----------|-------|
| Problem Collection | 5 min | 1 | User input time |
| Problem Structuring | 10 sec | 1 | JSON conversion |
| TRIZ Ideation | 20-40 min | 40 | 1 per principle, ~30-60 sec each |
| KPI Evaluation | 10-20 min | 200 | 1 per solution, ~3-6 sec each |
| Ranking & Selection | 5 sec | 0 | Pure computation |
| Report Generation | 5 sec | 0 | File I/O |
| **TOTAL** | **30-60 min** | **242** | Depends on API response time |

## Data Flow

```
User Input (Text)
    ↓
Problem JSON (Structured)
    ↓
Raw Solutions JSON (200 solutions)
    ↓
Evaluated Solutions JSON (200 solutions + scores)
    ↓
Top Solutions JSON (80 solutions, ranked)
    ↓
Reports (Console + Markdown + JSON)
```

## Error Handling

```
┌─────────────────┐
│  API Call       │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │Success?│
    └───┬─┬──┘
        │ │
    Yes │ │ No
        │ │
        ▼ ▼
    ┌─────┐ ┌──────────────┐
    │ Use │ │ Log Error    │
    │ Data│ │ Continue     │
    └─────┘ │ with Next    │
            └──────────────┘
```

- API errors are logged but don't stop the process
- Failed solutions are skipped
- Session continues with successful results
- Final report shows only successful evaluations

## Parallel Processing Opportunities

Currently sequential, but could be parallelized:

```
CURRENT:
Principle 1 → Principle 2 → Principle 3 → ... → Principle 40

POTENTIAL:
Principle 1 ┐
Principle 2 ├─→ Parallel Processing → Faster Results
Principle 3 ┘
...
```

Note: Would require rate limit management and batch API calls.

