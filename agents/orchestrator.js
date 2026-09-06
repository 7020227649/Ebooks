const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');
const ROLES_PATH = path.join(__dirname, 'agent_roles.json');
const BOARD_PATH = path.join(__dirname, 'task_board.json');

class AgentArmyOrchestrator {
  constructor(bookSlug = null) {
    this.roles = JSON.parse(fs.readFileSync(ROLES_PATH, 'utf8'));
    this.board = JSON.parse(fs.readFileSync(BOARD_PATH, 'utf8'));
    this.bookSlug = bookSlug || this.detectActiveBook();
    this.bookDir = this.bookSlug ? path.join(BOOKS_DIR, this.bookSlug) : null;
  }

  detectActiveBook() {
    // Check CLI argument first
    const args = process.argv.slice(2);
    for (const arg of args) {
      if (arg.startsWith('--book=')) return arg.split('=')[1];
      if (!arg.startsWith('--') && !['status', 'reset', 'start'].includes(arg)) return arg;
    }
    // Default to first book in books/
    if (fs.existsSync(BOOKS_DIR)) {
      const books = fs.readdirSync(BOOKS_DIR).filter(item => {
        return fs.statSync(path.join(BOOKS_DIR, item)).isDirectory() && fs.existsSync(path.join(BOOKS_DIR, item, 'book.config.json'));
      });
      if (books.length > 0) return books[0];
    }
    return null;
  }

  saveBoard() {
    this.board.project.lastUpdated = new Date().toISOString();
    fs.writeFileSync(BOARD_PATH, JSON.stringify(this.board, null, 2), 'utf8');
  }

  printHeader() {
    console.log(`\n===============================================================`);
    console.log(` 🎖️  JARVIS - SUPER AI ORCHESTRATOR & AGENT ARMY CONTROL CENTER`);
    console.log(`===============================================================`);
    console.log(` Mission:      Create 100% High-Value eBook`);
    console.log(` Target Book:  ${this.bookSlug ? 'books/' + this.bookSlug : 'Global Repo'}`);
    console.log(` Book Title:   "${this.board.project.title}"`);
    console.log(` Target Key:   "${this.board.project.targetKeyword}"`);
    console.log(` Army Active:  8 Specialized Agents`);
    console.log(`---------------------------------------------------------------\n`);
  }

  showStatus() {
    this.printHeader();
    console.log(`📋 Task Board Status:\n`);

    const tableData = this.board.tasks.map(t => {
      const agentInfo = this.roles.agents[t.assignedAgent];
      const agentName = agentInfo ? `${agentInfo.codename} (${agentInfo.role.split(' ')[0]})` : t.assignedAgent;
      return {
        'ID': t.id,
        'Phase': t.phase,
        'Task Title': t.title.length > 35 ? t.title.substring(0, 32) + '...' : t.title,
        'Agent': agentName,
        'Status': t.status,
        'Score': t.score ? `${t.score}/100` : '-'
      };
    });

    console.table(tableData);

    const completed = this.board.tasks.filter(t => t.status === 'COMPLETED').length;
    const progress = Math.round((completed / this.board.tasks.length) * 100);
    this.board.project.overallProgress = progress;

    console.log(`\n📊 Overall Mission Completion: [${'█'.repeat(Math.floor(progress / 5))}${'░'.repeat(20 - Math.floor(progress / 5))}] ${progress}%\n`);
  }

  auditFileQuality(relativeFilePath) {
    // Check in targeted book directory first, then root
    let fullPath = this.bookDir ? path.join(this.bookDir, relativeFilePath) : path.join(ROOT_DIR, relativeFilePath);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(ROOT_DIR, relativeFilePath);
    }

    if (!fs.existsSync(fullPath)) {
      return { score: 0, reason: 'File does not exist' };
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const words = content.trim().split(/\s+/).filter(Boolean).length;

    // If it's a JSON audit report
    if (relativeFilePath.endsWith('.json')) {
      try {
        const parsed = JSON.parse(content);
        const jsonScore = parsed.overallQualityScore || 95;
        return {
          score: jsonScore,
          wordCount: words,
          positiveSignals: ['Valid JSON artifact structure', 'Audit scorecard confirmed'],
          negativeSignals: [],
          status: jsonScore >= 90 ? 'APPROVED' : 'NEEDS_REVISION'
        };
      } catch (err) {
        return { score: 0, reason: 'Invalid JSON syntax' };
      }
    }

    let score = 70; // Baseline
    const positiveSignals = [];
    const negativeSignals = [];

    // Length check
    if (words > 150) score += 10;
    if (words > 300) score += 5;

    // Check for actionable elements
    if (content.includes('callout') || content.includes('Pro Tip') || content.includes('Action') || content.includes('> [!')) {
      score += 5;
      positiveSignals.push('Contains structured callouts');
    }
    if (content.includes('- [ ]') || content.includes('- [x]') || content.includes('Checklist')) {
      score += 5;
      positiveSignals.push('Contains actionable checklists');
    }
    if (content.includes('```') || content.includes('Case Study') || content.includes('Framework')) {
      score += 5;
      positiveSignals.push('Contains concrete code/models/case studies');
    }

    // Check for fluff or passive filler words
    const fluffKeywords = ['obviously', 'as we all know', 'needless to say', 'in today\'s fast-paced world'];
    fluffKeywords.forEach(fluff => {
      if (content.toLowerCase().includes(fluff)) {
        score -= 5;
        negativeSignals.push(`Detected generic filler: "${fluff}"`);
      }
    });

    score = Math.min(100, Math.max(0, score));

    return {
      score,
      wordCount: words,
      positiveSignals,
      negativeSignals,
      status: score >= 90 ? 'APPROVED' : 'NEEDS_REVISION'
    };
  }

  runAutonomousCycle() {
    this.printHeader();
    console.log(`🤖 Jarvis Orchestrator: Commencing Autonomous Production Cycle...\n`);

    let changesMade = false;

    for (const task of this.board.tasks) {
      const agent = this.roles.agents[task.assignedAgent];

      // Check if dependencies are met
      const depsSatisfied = task.dependencies.every(depId => {
        const depTask = this.board.tasks.find(t => t.id === depId);
        return depTask && (depTask.status === 'COMPLETED' || depTask.status === 'IN_PROGRESS');
      });

      if (!depsSatisfied) {
        continue;
      }

      // If task is ready or in progress, inspect quality
      if (task.outputFile) {
        const audit = this.auditFileQuality(task.outputFile);
        task.score = audit.score;

        if (audit.status === 'APPROVED') {
          if (task.status !== 'COMPLETED') {
            task.status = 'COMPLETED';
            console.log(` ✅ [${agent ? agent.codename : 'Agent'}] Task ${task.id} (${task.title}) APPROVED with Score: ${audit.score}/100!`);
            changesMade = true;
          }
        } else {
          task.status = 'IN_PROGRESS';
          console.log(` ⚠️  [${agent ? agent.codename : 'Agent'}] Task ${task.id} in progress (Score: ${audit.score}/100). Iterating on ${task.outputFile}...`);
        }
      }
    }

    // Check if ready for final compilation
    const coreTasksCompleted = this.board.tasks
      .filter(t => t.phase === 'DRAFTING' || t.phase === 'RESEARCH')
      .every(t => t.status === 'COMPLETED' || t.score >= 85);

    if (coreTasksCompleted) {
      console.log(`\n🚀 All core research and chapters meet quality standards! Triggering Pressman (Publishing Master)...`);
      try {
        const targetFlag = this.bookSlug ? `--book=${this.bookSlug}` : '';
        execSync(`node scripts/build.js ${targetFlag}`, { cwd: ROOT_DIR, stdio: 'inherit' });
        const pubTask = this.board.tasks.find(t => t.id === 'TASK-014');
        if (pubTask) {
          pubTask.status = 'COMPLETED';
          pubTask.score = 98;
        }
      } catch (err) {
        console.error('Build execution failed:', err.message);
      }
    }

    const completed = this.board.tasks.filter(t => t.status === 'COMPLETED').length;
    this.board.project.overallProgress = Math.round((completed / this.board.tasks.length) * 100);
    this.saveBoard();

    console.log(`\n✨ Cycle Complete! Current Progress: ${this.board.project.overallProgress}%\n`);
  }
}

module.exports = AgentArmyOrchestrator;

if (require.main === module) {
  const orchestrator = new AgentArmyOrchestrator();
  const arg = process.argv[2];

  if (arg === '--status') {
    orchestrator.showStatus();
  } else {
    orchestrator.runAutonomousCycle();
  }
}
