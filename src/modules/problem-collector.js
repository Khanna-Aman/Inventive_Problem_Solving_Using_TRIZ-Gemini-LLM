import readline from 'readline';

class ProblemCollector {
  constructor(geminiClient) {
    this.geminiClient = geminiClient;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async collectProblemStatement() {
    console.log('\n=== TRIZ Problem Statement Collector ===\n');
    console.log('Please answer the following questions to define your problem:\n');

    const problemTitle = await this.ask('1. What is the title of your problem? ');
    const domain = await this.ask('2. What domain/industry does this problem belong to? ');
    const currentSituation = await this.ask('3. Describe the current situation and technical limitations: ');
    const idealResult = await this.ask('4. What is the ideal final result you want to achieve? ');
    const constraints = await this.ask('5. What are the key constraints? (comma-separated): ');
    const improve = await this.ask('6. What parameter do you want to IMPROVE? ');
    const worsen = await this.ask('7. What parameter typically WORSENS when you try to improve the above? ');
    const resources = await this.ask('8. What resources are available? (comma-separated): ');

    this.rl.close();

    const userInput = {
      problemTitle,
      domain,
      currentSituation,
      idealResult,
      constraints: constraints.split(',').map(c => c.trim()),
      improve,
      worsen,
      resources: resources.split(',').map(r => r.trim())
    };

    console.log('\n\nConverting your input to structured JSON format using Gemini...\n');

    const prompt = `You are a TRIZ expert. Convert the following user input into a well-structured JSON format for TRIZ problem analysis.

User Input:
${JSON.stringify(userInput, null, 2)}

Create a JSON object with the following structure:
{
  "problem_title": "string",
  "domain": "string",
  "current_situation": {
    "description": "string",
    "technical_limitations": "string"
  },
  "ideal_final_result": {
    "description": "string",
    "constraints": ["array of strings"]
  },
  "the_contradiction": {
    "improve": "string",
    "worsen": "string"
  },
  "resources": {
    "available": ["array of strings"]
  }
}

Return ONLY the JSON object, no additional text.`;

    const problemStatement = await this.geminiClient.generateJSON(prompt);
    
    console.log('\n✓ Problem statement created successfully!\n');
    
    return problemStatement;
  }
}

export default ProblemCollector;

