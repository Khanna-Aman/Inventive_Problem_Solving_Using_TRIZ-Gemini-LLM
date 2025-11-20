class TRIZIdeation {
  constructor(geminiClient, fileManager) {
    this.geminiClient = geminiClient;
    this.fileManager = fileManager;
  }

  async generateSolutionsForPrinciple(problemStatement, principle) {
    const prompt = this.buildPrompt(problemStatement, principle);
    
    console.log(`\n  Processing Principle ${principle.id}: ${principle.name}...`);
    
    try {
      const result = await this.geminiClient.generateJSON(prompt);
      return result;
    } catch (error) {
      console.error(`  ✗ Error processing principle ${principle.id}:`, error.message);
      return null;
    }
  }

  buildPrompt(problemStatement, principle) {
    return `**Role:** You are a Senior R&D Engineer and TRIZ Master Consultant. You specialize in lateral thinking and cross-industry innovation transfer.

**Task:** You must generate innovative solutions for a specific problem using **ONLY** one specific TRIZ Principle.

**Inputs:**

1.  **The Problem:** A problem statement provided in the JSON format below.
2.  **The Constraint:** You must strictly use **TRIZ Principle ${principle.id}: ${principle.name}** (and no others).

**Process:**
1.  **Analyze the JSON:** extract the core contradiction or pain point from the provided JSON data.
2.  **Define the Principle:** Briefly explain how the selected TRIZ principle works (conceptually).
3.  **External Search (Knowledge Retrieval):** Search your internal database for 3 real-world examples where this specific principle was used in *different* industries (e.g., biology, aerospace, software) to solve a similar abstract problem.
4.  **Application:** Map those external examples to the current JSON problem to create specific solution proposals.

**Instructions:**
Please think step-by-step:

1.  **Deconstruct the Problem:** Read the JSON and explicitly state the *Technical Contradiction* (what improves vs. what worsens).
2.  **Analyze the Principle:** How does ${principle.name} traditionally resolve this type of contradiction?
3.  **Cross-Domain Search:** Identify how this principle is utilized in nature, patents, or other industries.
4.  **Synthesize Solutions:** Generate 5 distinct solution concepts for the JSON problem based *strictly* on the research in step 3.

**The Problem Data (JSON):**
${JSON.stringify(problemStatement, null, 2)}

**The TRIZ Principle:**
${JSON.stringify(principle, null, 2)}

**Output Format:**
Please organize your response into a Well Structured JSON format as below. 
{
  "triz_consultation_report": {
    "meta_data": {
      "role": "Senior R&D Engineer / TRIZ Master",
      "problem_title": "${problemStatement.problem_title}",
      "applied_principle": {
        "id": ${principle.id},
        "name": "${principle.name}"
      }
    },
    "step_1_problem_deconstruction": {
      "technical_contradiction": {
        "improve": "string",
        "worsen": "string"
      },
      "identified_barrier": "string"
    },
    "step_2_principle_analysis": {
      "core_strategy": "string"
    },
    "step_3_cross_domain_analogies": [
      {
        "domain": "string",
        "concept": "string",
        "insight": "string"
      }
    ],
    "step_4_synthesized_solutions": [
      {
        "concept_name": "string",
        "mechanism": "string",
        "real_world_analogy": "string",
        "implementation_steps": ["string"]
      }
    ],
    "step_5_recommendation": {
      "selected_concept": "string",
      "rationale": "string",
      "next_step_offer": "string"
    }
  }
}

Return ONLY the JSON object, no additional text.`;
  }

  async generateAllSolutions(problemStatement, principles) {
    console.log('\n=== Generating TRIZ Solutions ===');
    console.log(`Processing ${principles.length} TRIZ principles...\n`);

    const allSolutions = [];

    for (const principle of principles) {
      const solution = await this.generateSolutionsForPrinciple(problemStatement, principle);
      if (solution) {
        allSolutions.push(solution);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n✓ Generated solutions for ${allSolutions.length} principles\n`);
    
    return allSolutions;
  }
}

export default TRIZIdeation;

