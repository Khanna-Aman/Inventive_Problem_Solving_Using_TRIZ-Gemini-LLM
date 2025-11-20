# Quick Start Guide

Get up and running with the TRIZ Brainstorming App in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up API Key

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` and add your key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## Step 3: Run the App

```bash
npm start
```

## Step 4: Answer the Questions

The app will ask you 8 questions about your problem:

```
1. What is the title of your problem?
   Example: "Reduce packaging waste in e-commerce"

2. What domain/industry does this problem belong to?
   Example: "E-commerce / Sustainability"

3. Describe the current situation and technical limitations:
   Example: "Current packaging uses excessive plastic and cardboard. 
   Customers demand protection but also eco-friendliness."

4. What is the ideal final result you want to achieve?
   Example: "Products arrive undamaged with zero packaging waste"

5. What are the key constraints? (comma-separated)
   Example: "Must protect products, Must be cost-neutral, Must scale globally"

6. What parameter do you want to IMPROVE?
   Example: "Environmental sustainability"

7. What parameter typically WORSENS when you try to improve the above?
   Example: "Product protection and shipping cost"

8. What resources are available? (comma-separated)
   Example: "Product itself, Shipping containers, Customer participation, 
   Return logistics network"
```

## Step 5: Wait for Processing

The app will:
- ✓ Convert your input to structured JSON (10 seconds)
- ✓ Generate solutions for 40 TRIZ principles (~20-40 minutes)
- ✓ Evaluate each solution against KPIs (~10-20 minutes)
- ✓ Rank and generate reports (5 seconds)

**Total time: 30-60 minutes** (grab a coffee! ☕)

## Step 6: Review Results

### Console Output
You'll see a ranked table of top solutions:

```
╔════════════════════════════════════════════════════════════════╗
║   TOP TRIZ SOLUTIONS - RANKED BY WEIGHTED SCORE               ║
╚════════════════════════════════════════════════════════════════╝

┌──────┬─────────────────────┬────────────────────┬────────┬──────────┐
│ Rank │ Principle           │ Concept Name       │ Score  │ Assessment│
├──────┼─────────────────────┼────────────────────┼────────┼──────────┤
│ 1    │ #1: Segmentation    │ Spinal Reflex Loop │ 4.45   │ Excellent...│
│ 2    │ #10: Preliminary... │ Pre-Computed Maps  │ 4.30   │ Highly...│
└──────┴─────────────────────┴────────────────────┴────────┴──────────┘
```

### Output Files
Check the `output/session_[timestamp]/` folder:

```
output/session_1234567890/
├── problem-statement.json       # Your structured problem
├── raw-solutions.json           # All 200 solutions
├── complete-evaluation.json     # Full KPI scores
├── top-solutions.json           # Top 80 solutions (2 per principle)
└── detailed-report.md           # Human-readable report
```

## Step 7: Explore the Detailed Report

Open `detailed-report.md` to see:
- Full solution descriptions
- Implementation steps
- KPI scores with justifications
- Real-world analogies
- Overall assessments

## Tips for Best Results

### 1. Be Specific in Your Problem Description
❌ "Make our product better"
✅ "Reduce product assembly time from 45 to 15 minutes without increasing defect rate"

### 2. Clearly Define the Contradiction
The heart of TRIZ is resolving contradictions:
- What improves? (Speed, Quality, Cost, etc.)
- What worsens? (Usually the opposite)

### 3. List All Available Resources
Resources can be:
- Physical: materials, energy, space
- Informational: data, signals, patterns
- Temporal: time, sequences, rhythms
- Functional: existing capabilities

### 4. Set Realistic Constraints
Constraints guide the AI to practical solutions:
- Budget limits
- Time constraints
- Regulatory requirements
- Technical limitations

## Testing with Sample Data

Want to see it in action first? Check the `samples/` directory for a complete example session.

## Troubleshooting

### "GEMINI_API_KEY not found"
- Make sure `.env` file exists in the root directory
- Check that the key is on a line like: `GEMINI_API_KEY=abc123...`
- No quotes needed around the key

### "Rate limit exceeded"
- Free tier has limits; wait a few minutes and try again
- Or increase delays in `src/modules/triz-ideation.js`

### "JSON parsing error"
- Usually temporary; the app will skip that solution and continue
- Check your internet connection
- Verify API key is valid

### Process takes too long
For testing, edit `src/index.js` to use fewer principles:
```javascript
const trizPrinciples = (await this.fileManager.loadTRIZPrinciples()).slice(0, 5);
```

## Next Steps

1. **Review the detailed report** - Understand the top solutions
2. **Share with your team** - Use the markdown reports in presentations
3. **Iterate** - Run multiple sessions with refined problem statements
4. **Implement** - Start with the highest-scored, most feasible solutions

## Need Help?

- Check `README.md` for full documentation
- Review `ARCHITECTURE.md` for technical details
- See `samples/` for example outputs
- Create an issue in the repository

Happy innovating! 🚀

