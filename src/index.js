import GeminiClient from './utils/gemini-client.js';
import FileManager from './utils/file-manager.js';
import ProblemCollector from './modules/problem-collector.js';
import TRIZIdeation from './modules/triz-ideation.js';
import KPIEvaluator from './modules/kpi-evaluator.js';
import ReportGenerator from './modules/report-generator.js';

class TRIZBrainstormingApp {
  constructor() {
    this.geminiClient = new GeminiClient();
    this.fileManager = new FileManager();
    this.problemCollector = new ProblemCollector(this.geminiClient);
    this.trizIdeation = new TRIZIdeation(this.geminiClient, this.fileManager);
    this.kpiEvaluator = new KPIEvaluator(this.geminiClient, this.fileManager);
    this.reportGenerator = new ReportGenerator(this.fileManager);
  }

  async run() {
    try {
      console.log('\n╔════════════════════════════════════════════════════════════════╗');
      console.log('║   TRIZ BRAINSTORMING APP - Powered by Gemini LLM              ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');

      // Step 1: Collect problem statement
      const problemStatement = await this.problemCollector.collectProblemStatement();
      
      // Create session ID
      const sessionId = `session_${Date.now()}`;
      
      // Save problem statement
      await this.fileManager.writeJSON(
        this.fileManager.getOutputPath(sessionId, 'problem-statement.json'),
        problemStatement
      );

      // Step 2: Load TRIZ principles
      console.log('Loading TRIZ principles...\n');
      const trizPrinciples = await this.fileManager.loadTRIZPrinciples();
      console.log(`✓ Loaded ${trizPrinciples.length} TRIZ principles\n`);

      // Step 3: Generate solutions for each principle
      const allSolutions = await this.trizIdeation.generateAllSolutions(
        problemStatement,
        trizPrinciples
      );

      // Save raw solutions
      await this.fileManager.writeJSON(
        this.fileManager.getOutputPath(sessionId, 'raw-solutions.json'),
        allSolutions
      );

      // Step 4: Load KPI matrix
      console.log('Loading KPI matrix...\n');
      const kpiMatrix = await this.fileManager.loadKPIMatrix();

      // Step 5: Evaluate all solutions
      const evaluatedResults = await this.kpiEvaluator.evaluateAllSolutions(
        allSolutions,
        kpiMatrix,
        problemStatement
      );

      // Step 6: Select top solutions
      console.log('Selecting top 2 solutions per principle...\n');
      const topSolutions = this.reportGenerator.selectTopSolutions(evaluatedResults, 2);

      // Step 7: Generate and display reports
      this.reportGenerator.generateConsoleReport(topSolutions);

      // Step 8: Save all reports
      await this.reportGenerator.saveReports(
        sessionId,
        topSolutions,
        evaluatedResults,
        problemStatement
      );

      console.log('╔════════════════════════════════════════════════════════════════╗');
      console.log('║   TRIZ BRAINSTORMING SESSION COMPLETE!                        ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');
      console.log(`Session ID: ${sessionId}`);
      console.log(`Output directory: output/${sessionId}/\n`);

    } catch (error) {
      console.error('\n✗ Error during brainstorming session:', error);
      process.exit(1);
    }
  }
}

// Run the app
const app = new TRIZBrainstormingApp();
app.run();

