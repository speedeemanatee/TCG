// Pokemon TCG - Main Game Entry Point

// Global game objects
let gameState = null;
let gameEngine = null;
let cpuAI = null;
let gameUI = null;
let selectedDeck = 'fire'; // Default selection

// Initialize the game
function initGame() {
    console.log('🎴 Pokemon TCG - Initializing...');

    // Create game state
    gameState = new GameState();
    window.gameState = gameState;

    // Create game engine
    gameEngine = new GameEngine(gameState);
    window.gameEngine = gameEngine;

    // Create CPU AI
    cpuAI = new CPUAI(gameState, gameEngine);
    window.cpuAI = cpuAI;

    // Create UI
    gameUI = new GameUI(gameState, gameEngine, cpuAI);
    window.gameUI = gameUI;

    console.log('✅ Game objects created');
}

// Start a new game
async function startNewGame() {
    console.log('🎮 Starting new game...');

    // Clear any existing game state
    if (gameUI) {
        gameUI.hideModal();
    }

    // Setup the game
    const allDeckTypes = ['fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'colorless', 'dark'];
    const otherDeckTypes = allDeckTypes.filter(d => d !== selectedDeck);
    const cpuDeck = otherDeckTypes[Math.floor(Math.random() * otherDeckTypes.length)];

    gameEngine.setupGame(selectedDeck, cpuDeck);

    // Initialize UI
    gameUI.init();

    // Initial render
    gameUI.render();

    // Player setup phase - need to choose active Pokemon
    if (gameState.currentTurn === 'player') {
        await playerSetup();
    } else {
        await cpuSetup();
        await playerSetup();
    }

    // Start first turn
    if (!gameState.actions.hasDrawn && gameState.turnNumber === 1) {
        // First turn doesn't draw
        gameState.phase = 'main';
    }

    gameUI.render();

    if (gameState.currentTurn === 'cpu') {
        setTimeout(async () => {
            await gameUI.executeCPUTurn();
        }, 1000);
    }

    console.log('✅ Game started!');
}

// Player setup - choose active Pokemon
async function playerSetup() {
    const player = gameState.player;

    // Find basic Pokemon in hand
    const basics = player.hand.filter(c =>
        c.cardType === CardType.POKEMON &&
        c.stage === Stage.BASIC
    );

    if (basics.length === 0) {
        console.error('No basic Pokemon! This should have been handled by mulligan.');
        return;
    }

    // Auto-select first basic as active for now (could show modal)
    if (!player.active) {
        // Sort by HP and pick best
        basics.sort((a, b) => b.hp - a.hp);
        gameEngine.setActiveFromHand('player', basics[0].uid);
    }

    // Put remaining basics on bench
    const remainingBasics = player.hand.filter(c =>
        c.cardType === CardType.POKEMON &&
        c.stage === Stage.BASIC
    );

    for (const basic of remainingBasics.slice(0, 5)) {
        gameEngine.playBasicToBench('player', basic.uid);
    }

    gameUI.render();
}

// CPU setup
async function cpuSetup() {
    await cpuAI.chooseActivePokemon();
    gameUI.render();
}

// Expose globally
window.initGame = initGame;
window.startNewGame = startNewGame;

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    initGame();

    // Add start button listener
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startNewGame);
    }

    // Add deck selection listeners
    const deckChoices = document.querySelectorAll('.deck-choice.selectable');
    deckChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            // Update state
            selectedDeck = choice.dataset.deck;

            // Update UI
            deckChoices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

            console.log(`🎴 Selected deck: ${selectedDeck}`);
        });
    });

    // Auto-start if no start button
    if (!startBtn) {
        startNewGame();
    }
});
