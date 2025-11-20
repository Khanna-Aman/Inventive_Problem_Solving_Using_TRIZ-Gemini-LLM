import Table from 'cli-table3';

class ReportGenerator {
  constructor(fileManager) {
    this.fileManager = fileManager;
  }

  selectTopSolutions(evaluatedResults, topN = 2) {
    const topSolutions = [];

    for (const principleResult of evaluatedResults) {
      // Sort solutions by weighted score
      const sortedSolutions = principleResult.solutions
        .sort((a, b) => b.kpi_evaluation.weighted_total_score - a.kpi_evaluation.weighted_total_score)
        .slice(0, topN);

      for (const solution of sortedSolutions) {
        topSolutions.push({
          principle_id: principleResult.principle.id,
          principle_name: principleResult.principle.name,
          concept_name: solution.concept_name,
          mechanism: solution.mechanism,
          real_world_analogy: solution.real_world_analogy,
          weighted_score: solution.kpi_evaluation.weighted_total_score,
          overall_assessment: solution.kpi_evaluation.overall_assessment,
          kpi_scores: solution.kpi_evaluation.kpi_scores,
          implementation_steps: solution.implementation_steps
        });
      }
    }

    // Sort all top solutions by score
    topSolutions.sort((a, b) => b.weighted_score - a.weighted_score);

    return topSolutions;
  }

  generateConsoleReport(topSolutions) {
    console.log('\n' + '='.repeat(100));
    console.log('TOP TRIZ SOLUTIONS - RANKED BY WEIGHTED SCORE');
    console.log('='.repeat(100) + '\n');

    const table = new Table({
      head: ['Rank', 'Principle', 'Concept Name', 'Score', 'Assessment'],
      colWidths: [6, 25, 35, 8, 50],
      wordWrap: true
    });

    topSolutions.forEach((solution, index) => {
      table.push([
        index + 1,
        `#${solution.principle_id}: ${solution.principle_name}`,
        solution.concept_name,
        solution.weighted_score.toFixed(2),
        solution.overall_assessment
      ]);
    });

    console.log(table.toString());
    console.log('\n');
  }

  generateDetailedReport(topSolutions) {
    let report = '# TRIZ BRAINSTORMING SESSION - DETAILED REPORT\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += '---\n\n';

    topSolutions.forEach((solution, index) => {
      report += `## ${index + 1}. ${solution.concept_name}\n\n`;
      report += `**TRIZ Principle:** #${solution.principle_id} - ${solution.principle_name}\n\n`;
      report += `**Weighted Score:** ${solution.weighted_score.toFixed(2)} / 5.00\n\n`;
      
      report += `### Mechanism\n${solution.mechanism}\n\n`;
      
      report += `### Real-World Analogy\n${solution.real_world_analogy}\n\n`;
      
      report += `### Implementation Steps\n`;
      solution.implementation_steps.forEach((step, i) => {
        report += `${i + 1}. ${step}\n`;
      });
      report += '\n';
      
      report += `### KPI Evaluation\n\n`;
      report += `**Overall Assessment:** ${solution.overall_assessment}\n\n`;
      
      report += '| Category | KPI | Score | Weight | Justification |\n';
      report += '|----------|-----|-------|--------|---------------|\n';
      
      solution.kpi_scores.forEach(kpi => {
        report += `| ${kpi.category} | ${kpi.kpi} | ${kpi.score}/5 | ${(kpi.weight * 100).toFixed(0)}% | ${kpi.justification} |\n`;
      });
      
      report += '\n---\n\n';
    });

    return report;
  }

  async saveReports(sessionId, topSolutions, allEvaluatedResults, problemStatement) {
    // Save top solutions summary
    await this.fileManager.writeJSON(
      this.fileManager.getOutputPath(sessionId, 'top-solutions.json'),
      topSolutions
    );

    // Save detailed markdown report
    const detailedReport = this.generateDetailedReport(topSolutions);
    await this.fileManager.writeText(
      this.fileManager.getOutputPath(sessionId, 'detailed-report.md'),
      detailedReport
    );

    // Save complete evaluation results
    await this.fileManager.writeJSON(
      this.fileManager.getOutputPath(sessionId, 'complete-evaluation.json'),
      allEvaluatedResults
    );

    // Save problem statement
    await this.fileManager.writeJSON(
      this.fileManager.getOutputPath(sessionId, 'problem-statement.json'),
      problemStatement
    );

    console.log(`\n✓ Reports saved to: output/${sessionId}/\n`);
  }
}

export default ReportGenerator;

