import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileManager {
  constructor() {
    this.rootDir = path.join(__dirname, '../..');
    this.dataDir = path.join(this.rootDir, 'data');
    this.outputDir = path.join(this.rootDir, 'output');
  }

  async ensureDir(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  async readJSON(filePath) {
    const fullPath = path.join(this.rootDir, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(content);
  }

  async writeJSON(filePath, data) {
    const fullPath = path.join(this.rootDir, filePath);
    await this.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async writeText(filePath, content) {
    const fullPath = path.join(this.rootDir, filePath);
    await this.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content, 'utf-8');
  }

  async loadTRIZPrinciples() {
    return await this.readJSON('Inventive_Problem_Solving_Using_TRIZ-Gemini-LLM-main/TRIZ_principles.json');
  }

  async loadKPIMatrix() {
    return await this.readJSON('data/kpi-matrix.json');
  }

  getOutputPath(sessionId, filename) {
    return path.join('output', sessionId, filename);
  }
}

export default FileManager;

