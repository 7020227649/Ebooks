const AgentArmyOrchestrator = require('../agents/orchestrator');

const args = process.argv.slice(2);
const orchestrator = new AgentArmyOrchestrator();

if (args.includes('--status') || args.includes('-s')) {
  orchestrator.showStatus();
} else if (args.includes('--reset')) {
  console.log('🔄 Resetting task board to initial state...');
  // Reload and reset tasks
  orchestrator.board.tasks.forEach(t => {
    t.status = 'READY';
    t.score = null;
  });
  orchestrator.board.project.overallProgress = 0;
  orchestrator.saveBoard();
  console.log('Done! Task board reset.');
  orchestrator.showStatus();
} else {
  console.log('⚡ Launching Super AI Orchestrator & Agent Army...');
  orchestrator.runAutonomousCycle();
}
