// Pokemon TCG - Main Game Entry Point

// Global game objects
let gameState = null;
let gameEngine = null;
let cpuAI = null;
let gameUI = null;
let selectedDeck = 'fire'; // Default selection

// Apply theme immediately to prevent flash
function initTheme() {
    const storedTheme = localStorage.getItem('pokemon-tcg-theme');
    // Default to dark if not set
    const theme = storedTheme || 'dark';
    document.body.setAttribute('data-theme', theme);
}
initTheme();

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

    // Setup Settings (Title Screen)
    setupSettings();
    setupChangelog();

    console.log('✅ Game objects created');
}

function setupSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const template = document.getElementById('settings-template');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    if (!settingsBtn || !template || !modal) return;

    // Separate close handler to avoid duplicates if called multiple times
    // (though setupSettings is only called once per page load usually)
    const closeModal = () => modal.classList.remove('active');

    // Ensure we don't duplicate listeners if initGame is called multiple times (it shouldn't be, but good practice)
    modalClose.onclick = closeModal;

    // We only want to close on outside click if it's the title screen
    // The UI class handles this for the game, but we need it for title screen
    window.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    settingsBtn.addEventListener('click', () => {
        // Populate modal from template
        modalTitle.textContent = "Settings";
        modalContent.innerHTML = '';
        modalContent.appendChild(template.content.cloneNode(true));

        // Get switches
        const themeSwitch = modalContent.querySelector('#setting-theme');
        const guideSwitch = modalContent.querySelector('#setting-guide');
        const ttsSwitch = modalContent.querySelector('#setting-tts');

        // Set current values
        // Theme
        const storedTheme = localStorage.getItem('pokemon-tcg-theme');
        themeSwitch.checked = storedTheme === 'light';

        // Guide
        const storedGuide = localStorage.getItem('pokemon-tcg-guide');
        // Default to true if not set
        guideSwitch.checked = storedGuide !== 'false';

        // TTS
        const storedTTS = localStorage.getItem('pokemon-tcg-tts');
        ttsSwitch.checked = storedTTS === 'true';

        // Bind events
        themeSwitch.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('pokemon-tcg-theme', theme);

            // Sync with in-game toggle if it exists
            if (window.gameUI && window.gameUI.elements.themeSwitch) {
                window.gameUI.elements.themeSwitch.checked = (theme === 'light');
            }
        });

        guideSwitch.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('pokemon-tcg-guide', enabled);

            if (window.gameUI) {
                window.gameUI.guideEnabled = enabled;
                window.gameUI.toggleGuidePanel();
                // Sync UI switch if visible
                if (window.gameUI.elements.guideSwitch) {
                    window.gameUI.elements.guideSwitch.checked = enabled;
                }
            }
        });

        ttsSwitch.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('pokemon-tcg-tts', enabled);

            if (window.gameUI) {
                window.gameUI.ttsEnabled = enabled;
                if (!enabled) window.gameUI.cancelSpeech();
                // Sync UI switch if visible
                if (window.gameUI.elements.ttsSwitch) {
                    window.gameUI.elements.ttsSwitch.checked = enabled;
                }
            }
        });

        // Show modal
        modal.classList.add('active');
    });
}

function setupChangelog() {
    const changelogBtn = document.getElementById('changelog-btn');
    const template = document.getElementById('changelog-template');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (!changelogBtn || !template || !modal) return;

    // Button click
    changelogBtn.addEventListener('click', () => {
        // Populate modal
        modalTitle.textContent = "Changelog";
        modalContent.innerHTML = '';
        modalContent.appendChild(template.content.cloneNode(true));

        // Show
        modal.classList.add('active');
    });
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

    // Prompt for Active Pokemon
    if (!player.active) {
        // If only 1 basic, auto-select? No, let's always prompt for consistency/polish
        // or auto-select if only 1 to save a click? 
        // User asked for choice, so let's offer choice if >1, but if only 1 it must be active.

        if (basics.length === 1) {
            gameEngine.setActiveFromHand('player', basics[0].uid);
            gameUI.render(); // Render to show active
        } else {
            const activeUid = await gameUI.promptActiveSelection(basics);
            gameEngine.setActiveFromHand('player', activeUid);
            gameUI.render(); // Render to show active
        }
    }

    // Put remaining basics on bench
    const remainingBasics = player.hand.filter(c =>
        c.cardType === CardType.POKEMON &&
        c.stage === Stage.BASIC
    );

    if (remainingBasics.length > 0) {
        // Prompt for bench
        const benchUids = await gameUI.promptBenchSelection(remainingBasics);
        benchUids.forEach(uid => {
            gameEngine.playBasicToBench('player', uid);
        });
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
