# TRIZ Brainstorming App - Architecture

## System Overview

The TRIZ Brainstorming App is a Node.js application that orchestrates a multi-stage AI-powered innovation process using Google's Gemini LLM and the TRIZ methodology.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface (CLI)                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   Main Application (index.js)                │
│  - Orchestrates workflow                                     │
│  - Manages session lifecycle                                 │
└─┬─────────┬──────────┬──────────┬──────────┬────────────────┘
  │         │          │          │          │
  │         │          │          │          │
┌─▼─────────▼──────────▼──────────▼──────────▼────────────────┐
│                      Core Modules                            │
├──────────────────────────────────────────────────────────────┤
│ ProblemCollector  │ TRIZIdeation │ KPIEvaluator │ ReportGen │
│ - Interactive Q&A │ - Prompt     │ - Score      │ - Rank    │
│ - JSON conversion │   builder    │   solutions  │ - Format  │
│                   │ - Batch      │ - Calculate  │ - Export  │
│                   │   processing │   weights    │           │
└─────────┬─────────┴──────┬───────┴──────┬───────┴───────────┘
          │                │              │
          │                │              │
┌─────────▼────────────────▼──────────────▼───────────────────┐
│                     Utility Layer                            │
├──────────────────────────────────────────────────────────────┤
│  GeminiClient              │  FileManager                    │
│  - API wrapper             │  - JSON I/O                     │
│  - JSON extraction         │  - Directory management         │
│  - Error handling          │  - Path resolution              │
└────────┬───────────────────┴─────────────┬───────────────────┘
         │                                 │
         │                                 │
┌────────▼─────────────────────────────────▼───────────────────┐
│              External Dependencies                           │
├──────────────────────────────────────────────────────────────┤
│  Google Gemini API    │  File System    │  Data Files       │
│  - gemini-2.0-flash   │  - fs/promises  │  - TRIZ principles│
│  - JSON mode          │  - path         │  - KPI matrix     │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Problem Collection Phase
```
User Input (CLI)
    ↓
ProblemCollector.collectProblemStatement()
    ↓
GeminiClient.generateJSON(structuring_prompt)
    ↓
Structured Problem JSON
    ↓
FileManager.writeJSON(problem-statement.json)
```

### 2. Ideation Phase
```
For each TRIZ Principle (1-40):
    ↓
TRIZIdeation.buildPrompt(problem, principle)
    ↓
GeminiClient.generateJSON(ideation_prompt)
    ↓
5 Solution Concepts
    ↓
Aggregate all solutions
    ↓
FileManager.writeJSON(raw-solutions.json)
```

### 3. Evaluation Phase
```
For each Solution Concept:
    ↓
KPIEvaluator.evaluateSingleConcept(solution, kpi_matrix)
    ↓
GeminiClient.generateJSON(evaluation_prompt)
    ↓
6 KPI Scores + Weighted Total
    ↓
Aggregate evaluations
    ↓
FileManager.writeJSON(complete-evaluation.json)
```

### 4. Ranking & Reporting Phase
```
ReportGenerator.selectTopSolutions(evaluations, topN=2)
    ↓
Sort by weighted_score
    ↓
Generate Console Table (cli-table3)
    ↓
Generate Markdown Report
    ↓
FileManager.writeJSON(top-solutions.json)
FileManager.writeText(detailed-report.md)
```

## Module Responsibilities

### Core Modules

#### ProblemCollector
- **Purpose**: Capture user's problem definition
- **Input**: User responses via readline
- **Output**: Structured problem JSON
- **AI Usage**: Converts free-form text to structured format

#### TRIZIdeation
- **Purpose**: Generate solutions using TRIZ principles
- **Input**: Problem statement + TRIZ principle
- **Output**: 5 solution concepts per principle
- **AI Usage**: Creative solution generation with cross-domain analogies

#### KPIEvaluator
- **Purpose**: Score solutions objectively
- **Input**: Solution concept + KPI matrix
- **Output**: Scored evaluation with justifications
- **AI Usage**: Analytical scoring against defined criteria

#### ReportGenerator
- **Purpose**: Rank and format results
- **Input**: All evaluated solutions
- **Output**: Ranked tables and detailed reports
- **AI Usage**: None (pure data processing)

### Utility Modules

#### GeminiClient
- **Purpose**: Abstract Gemini API interactions
- **Features**:
  - Automatic JSON extraction from markdown
  - Error handling and retry logic
  - Configurable generation parameters

#### FileManager
- **Purpose**: Centralize file operations
- **Features**:
  - Automatic directory creation
  - Path resolution
  - JSON serialization/deserialization

## Configuration Points

### Environment Variables
- `GEMINI_API_KEY`: Required for API access

### Data Files
- `data/kpi-matrix.json`: KPI definitions and weights
- `data/TRIZ_principles.json`: 40 TRIZ principles

### Gemini Parameters
```javascript
{
  model: 'gemini-2.0-flash-exp',
  temperature: 0.7,      // Creativity level
  topP: 0.95,            // Nucleus sampling
  maxOutputTokens: 8192  // Response length limit
}
```

## Error Handling Strategy

1. **API Errors**: Caught and logged, processing continues with remaining items
2. **JSON Parsing**: Automatic extraction from markdown code blocks
3. **File I/O**: Directory auto-creation, graceful error messages
4. **Rate Limiting**: Built-in delays between API calls

## Performance Considerations

- **API Calls**: ~200+ calls per full session (40 principles × 5 solutions)
- **Processing Time**: ~30-60 minutes for complete analysis
- **Rate Limiting**: 1-second delay between principle processing
- **Memory**: Moderate (all results held in memory before final write)

## Extension Points

### Adding New KPIs
1. Edit `data/kpi-matrix.json`
2. Update evaluation prompt in `KPIEvaluator`
3. Adjust weight distribution (must sum to 1.0)

### Custom TRIZ Principles
1. Modify `TRIZ_principles.json`
2. Follow existing schema (id, name, definition, guidelines, examples)

### Alternative LLMs
1. Create new client in `src/utils/`
2. Implement `generateJSON()` and `generateContent()` methods
3. Update dependency injection in `index.js`

## Security Considerations

- API keys stored in `.env` (not committed to git)
- No user data transmitted except to Gemini API
- All outputs stored locally
- No external network calls except to Gemini

## Future Enhancements

- [ ] Web UI interface
- [ ] Database storage for session history
- [ ] Collaborative sessions
- [ ] Custom principle libraries
- [ ] Export to PowerPoint/PDF
- [ ] Integration with project management tools

