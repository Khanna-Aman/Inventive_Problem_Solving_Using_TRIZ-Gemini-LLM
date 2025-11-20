# Documentation

This folder contains comprehensive documentation and examples for the TRIZ Brainstorming App.

## 📚 Documentation Files

### Quick Start
- **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 5 minutes
  - Installation steps
  - Basic usage
  - Tips for best results
  - Troubleshooting common issues

### Technical Documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
  - Architecture diagrams
  - Data flow
  - Module responsibilities
  - Configuration points
  - Extension points

- **[WORKFLOW.md](WORKFLOW.md)** - Detailed process flow
  - Complete workflow diagram
  - Phase-by-phase breakdown
  - Timing information
  - Error handling strategy

### Project Overview
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - High-level project summary
  - Feature overview
  - Technology stack
  - Usage statistics
  - Success criteria

## 📁 Sample Session

The `samples/` folder contains a complete example session:

### Problem
**"Zero-Latency Hazard Detection for L5 Autonomous Vehicles"**

### Files Included
- `sample-session/problem-statement.json` - Structured problem definition
- `sample-session/raw-solution-principle-1.json` - Example TRIZ solutions (Principle #1: Segmentation)
- `sample-session/evaluated-solution-example.json` - KPI-scored solutions
- `sample-session/top-solutions-summary.md` - Executive summary table
- `sample-session/detailed-report-example.md` - Full detailed report
- `sample-session/console-output-example.txt` - Console output example

## 🎯 How to Use This Documentation

### For New Users
1. Start with **QUICKSTART.md** to get the app running
2. Review the **sample session** to see example outputs
3. Try the app with your own problem

### For Developers
1. Read **ARCHITECTURE.md** to understand the system design
2. Study **WORKFLOW.md** to understand the process flow
3. Review the source code in `src/` folder
4. Check **PROJECT_SUMMARY.md** for extension opportunities

### For Contributors
1. Read the main **CONTRIBUTING.md** in the root folder
2. Review **ARCHITECTURE.md** to understand the codebase
3. Check open issues for contribution opportunities

## 🔍 Quick Reference

### Key Concepts

**TRIZ (Theory of Inventive Problem Solving)**
- 40 inventive principles for systematic innovation
- Developed by Genrich Altshuller
- Used to resolve technical contradictions

**KPI Evaluation Matrix**
- 6 weighted categories for scoring solutions
- Impact (IFR Alignment) - 25%
- Feasibility (Technical Maturity) - 15%
- Supply Chain (Resource Availability) - 15%
- Economics (Cost Efficiency) - 20%
- Strategy (Novelty & IP) - 10%
- Agility (Time-to-Integration) - 15%

**Workflow Summary**
1. Problem Collection (5 min)
2. TRIZ Ideation (20-40 min) - 200 solutions
3. KPI Evaluation (10-20 min) - Score all solutions
4. Ranking & Reporting (5 sec) - Top 80 solutions

### File Locations

```
Project Root/
├── src/                    # Source code
├── data/                   # TRIZ principles & KPI matrix
├── docs/                   # This folder
│   ├── ARCHITECTURE.md
│   ├── QUICKSTART.md
│   ├── WORKFLOW.md
│   ├── PROJECT_SUMMARY.md
│   └── samples/
└── output/                 # Generated session outputs
```

## 💡 Tips

- **First Time?** Start with QUICKSTART.md
- **Want Examples?** Check the samples/ folder
- **Need Details?** Read ARCHITECTURE.md
- **Contributing?** See CONTRIBUTING.md in root

## 🆘 Getting Help

- Check the troubleshooting section in QUICKSTART.md
- Review the sample session for expected outputs
- Create an issue in the repository
- Read the main README.md in the root folder

---

**Happy Innovating!** 🚀

