class KPIEvaluator {
  constructor(geminiClient, fileManager) {
    this.geminiClient = geminiClient;
    this.fileManager = fileManager;
  }

  async evaluateSolution(solution, kpiMatrix, problemStatement) {
    const principle = solution.triz_consultation_report.meta_data.applied_principle;
    const solutions = solution.triz_consultation_report.step_4_synthesized_solutions;

    console.log(`\n  Evaluating solutions for Principle ${principle.id}: ${principle.name}...`);

    const evaluatedSolutions = [];

    for (let i = 0; i < solutions.length; i++) {
      const solutionConcept = solutions[i];
      
      try {
        const evaluation = await this.evaluateSingleConcept(
          solutionConcept,
          kpiMatrix,
          problemStatement,
          principle
        );
        
        evaluatedSolutions.push({
          ...solutionConcept,
          kpi_evaluation: evaluation
        });
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`    ✗ Error evaluating concept ${i + 1}:`, error.message);
      }
    }

    return {
      principle: principle,
      solutions: evaluatedSolutions
    };
  }

  async evaluateSingleConcept(solutionConcept, kpiMatrix, problemStatement, principle) {
    const prompt = `You are a Senior Product Manager and Innovation Analyst. Evaluate the following TRIZ solution concept against the KPI matrix.

**Problem Statement:**
${JSON.stringify(problemStatement, null, 2)}

**TRIZ Principle Applied:** ${principle.name}

**Solution Concept:**
${JSON.stringify(solutionConcept, null, 2)}

**KPI Matrix:**
${JSON.stringify(kpiMatrix, null, 2)}

**Task:**
Evaluate this solution concept against each KPI category. For each KPI:
1. Provide a score from 1 (Poor) to 5 (Excellent)
2. Provide a brief justification (2-3 sentences)

**Output Format (JSON only):**
{
  "kpi_scores": [
    {
      "category": "Impact",
      "kpi": "IFR Alignment (Ideality)",
      "score": 1-5,
      "justification": "string",
      "weight": 0.25
    },
    {
      "category": "Feasibility",
      "kpi": "Technical Maturity (TRL)",
      "score": 1-5,
      "justification": "string",
      "weight": 0.15
    },
    {
      "category": "Supply Chain",
      "kpi": "Resource Availability",
      "score": 1-5,
      "justification": "string",
      "weight": 0.15
    },
    {
      "category": "Economics",
      "kpi": "Cost Efficiency",
      "score": 1-5,
      "justification": "string",
      "weight": 0.20
    },
    {
      "category": "Strategy",
      "kpi": "Novelty & IP",
      "score": 1-5,
      "justification": "string",
      "weight": 0.10
    },
    {
      "category": "Agility",
      "kpi": "Time-to-Integration",
      "score": 1-5,
      "justification": "string",
      "weight": 0.15
    }
  ],
  "weighted_total_score": 0.0,
  "overall_assessment": "string (2-3 sentences summarizing strengths and weaknesses)"
}

Calculate the weighted_total_score as: sum(score * weight) for all KPIs.

Return ONLY the JSON object, no additional text.`;

    const evaluation = await this.geminiClient.generateJSON(prompt);
    
    // Calculate weighted score if not provided
    if (!evaluation.weighted_total_score) {
      evaluation.weighted_total_score = evaluation.kpi_scores.reduce(
        (sum, kpi) => sum + (kpi.score * kpi.weight), 
        0
      );
    }

    return evaluation;
  }

  async evaluateAllSolutions(allSolutions, kpiMatrix, problemStatement) {
    console.log('\n=== Evaluating Solutions Against KPI Matrix ===');
    console.log(`Evaluating ${allSolutions.length} principle solutions...\n`);

    const evaluatedResults = [];

    for (const solution of allSolutions) {
      const evaluated = await this.evaluateSolution(solution, kpiMatrix, problemStatement);
      evaluatedResults.push(evaluated);
    }

    console.log(`\n✓ Evaluation complete for all solutions\n`);
    
    return evaluatedResults;
  }
}

export default KPIEvaluator;

