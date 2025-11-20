# TRIZ Brainstorming App - Powered by Gemini LLM

A Node.js application that uses TRIZ (Theory of Inventive Problem Solving) and Google's Gemini LLM to generate, evaluate, and rank innovative solutions to complex problems.

## 🎯 Features

- **Interactive Problem Collection**: Guided questionnaire to capture problem statements
- **Automated TRIZ Analysis**: Applies all 40 TRIZ principles to generate solutions
- **AI-Powered Ideation**: Uses Gemini 2.0 Flash to generate creative solutions
- **KPI-Based Evaluation**: Scores solutions across 6 key performance indicators
- **Intelligent Ranking**: Selects top 2 solutions per principle based on weighted scores
- **Comprehensive Reports**: Generates detailed markdown and JSON reports

## 📋 Prerequisites

- Node.js (v18 or higher)
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

## 📁 Project Structure

```
triz-brainstorming-app/
├── src/                    # Source code
├── data/                   # TRIZ principles and KPI matrix
├── docs/                   # Documentation, samples, and reference materials
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md               # This file
```

> **Note**: Additional documentation and sample files are in the `docs/` folder.

## 🚀 Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## 💻 Usage

Run the application:
```bash
npm start
```

Follow the interactive prompts to:
1. Define your problem statement
2. Specify constraints and contradictions
3. Identify available resources

The app will then:
- Generate solutions using all 40 TRIZ principles
- Evaluate each solution against the KPI matrix
- Rank and display the top solutions
- Save detailed reports to the `output/` directory

## 📊 Output Structure

Each session creates a timestamped folder in `output/` containing:

```
output/session_[timestamp]/
├── problem-statement.json       # Your input problem
├── raw-solutions.json           # All generated solutions
├── complete-evaluation.json     # Full KPI evaluations
├── top-solutions.json           # Top-ranked solutions
└── detailed-report.md           # Human-readable report
```

## 🎓 TRIZ Principles

The app applies all 40 TRIZ Inventive Principles:

1. Segmentation
2. Taking out
3. Local quality
4. Asymmetry
5. Merging
6. Universality
7. Nested doll
8. Anti-weight
9. Preliminary anti-action
10. Preliminary action
... and 30 more!

## 📈 KPI Evaluation Matrix

Solutions are evaluated across 6 categories:

| Category | KPI | Weight |
|----------|-----|--------|
| Impact | IFR Alignment (Ideality) | 25% |
| Feasibility | Technical Maturity (TRL) | 15% |
| Supply Chain | Resource Availability | 15% |
| Economics | Cost Efficiency | 20% |
| Strategy | Novelty & IP | 10% |
| Agility | Time-to-Integration | 15% |

Each KPI is scored 1-5, and a weighted total score is calculated.

## 📁 Project Structure

```
triz-brainstorming-app/
├── src/
│   ├── index.js                 # Main application
│   ├── modules/
│   │   ├── problem-collector.js # Interactive problem input
│   │   ├── triz-ideation.js     # Solution generation
│   │   ├── kpi-evaluator.js     # Solution evaluation
│   │   └── report-generator.js  # Report creation
│   └── utils/
│       ├── gemini-client.js     # Gemini API wrapper
│       └── file-manager.js      # File I/O utilities
├── data/
│   └── kpi-matrix.json          # KPI definitions
├── samples/
│   └── sample-session/          # Example outputs
├── output/                      # Generated reports (created at runtime)
└── package.json
```

## 🔧 Configuration

### Gemini Model Settings

Edit `src/utils/gemini-client.js` to adjust:
- Model version (default: `gemini-2.0-flash-exp`)
- Temperature (default: 0.7)
- Max output tokens (default: 8192)

### KPI Weights

Edit `data/kpi-matrix.json` to customize evaluation criteria and weights.

## 📖 Example Use Cases

- Product innovation and R&D
- Process optimization
- Engineering problem-solving
- Business model innovation
- Technology roadmap planning

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📄 License

MIT License - feel free to use this for any purpose.

## 🔍 How It Works

### Workflow

```
1. Problem Collection
   ↓
2. JSON Conversion (via Gemini)
   ↓
3. TRIZ Ideation (40 principles × 5 solutions each)
   ↓
4. KPI Evaluation (Each solution scored on 6 KPIs)
   ↓
5. Ranking & Selection (Top 2 per principle)
   ↓
6. Report Generation (Console + Files)
```

### AI Integration Points

1. **Problem Structuring**: Converts natural language input to structured JSON
2. **Solution Generation**: Creates 5 unique solutions per TRIZ principle
3. **KPI Scoring**: Evaluates each solution against the KPI matrix
4. **Justification**: Provides reasoning for each score

## 📝 Sample Session

See the `samples/sample-session/` directory for a complete example based on the autonomous vehicle hazard detection problem.

## ⚙️ Advanced Usage

### Running with Specific Principles

To test with a subset of principles, modify `src/index.js`:

```javascript
// Load only first 5 principles for testing
const trizPrinciples = (await this.fileManager.loadTRIZPrinciples()).slice(0, 5);
```

### Adjusting Solution Count

In `src/modules/report-generator.js`, change the `topN` parameter:

```javascript
const topSolutions = this.reportGenerator.selectTopSolutions(evaluatedResults, 3); // Top 3 instead of 2
```

## 🐛 Troubleshooting

### API Rate Limiting
If you encounter rate limits, increase the delay in `src/modules/triz-ideation.js`:
```javascript
await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds instead of 1
```

### JSON Parsing Errors
The app automatically extracts JSON from markdown code blocks. If issues persist, check the Gemini API response format.

### Memory Issues
For large sessions (all 40 principles), ensure Node.js has sufficient memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

## 📚 Additional Documentation

All detailed documentation and reference materials are in the `docs/` folder:

- **`docs/ARCHITECTURE.md`** - Technical architecture and system design
- **`docs/QUICKSTART.md`** - 5-minute quick start guide
- **`docs/WORKFLOW.md`** - Detailed process flow and timing
- **`docs/PROJECT_SUMMARY.md`** - High-level project overview
- **`docs/samples/`** - Complete example session with outputs

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Areas where we'd love help:
- Web UI interface
- Unit tests and integration tests
- Performance optimizations
- Multi-language support
- Additional example sessions

## 🙏 Acknowledgments

- TRIZ methodology by Genrich Altshuller
- Google Gemini LLM for AI-powered ideation
- Original TRIZ principles data from the reference repository

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues or questions, please create an issue in the repository.

