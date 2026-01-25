// Pokemon TCG - Main Game Entry Point

// Global game objects
let gameState = null;
let gameEngine = null;
let cpuAI = null;

let gameUI = null;
let bgEffect = null;
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
    setupEasterEgg();

    // Background Effect (Title Screen only)
    if (window.BackgroundEffect) {
        bgEffect = new BackgroundEffect();
        bgEffect.start();
    }

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

    // Stop background effect
    if (bgEffect) {
        bgEffect.stop();
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
        gameUI.render(); // Ensure bench is updated visibly immediately
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

    // Use Event Delegation for Deck Selection (Handles dynamic decks like Trout)
    const viewDeckBtn = document.getElementById('view-deck-btn');
    const deckContainer = document.querySelector('.deck-preview');
    if (deckContainer) {
        deckContainer.addEventListener('click', (e) => {
            const choice = e.target.closest('.deck-choice.selectable');
            if (!choice) return;

            // Update state
            selectedDeck = choice.dataset.deck;

            // Show view button
            if (viewDeckBtn) {
                viewDeckBtn.style.display = 'flex';
            }

            // Update UI
            const allChoices = document.querySelectorAll('.deck-choice.selectable');
            allChoices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

            console.log(`🎴 Selected deck: ${selectedDeck}`);
        });
    }

    // View Deck Button listener
    if (viewDeckBtn) {
        viewDeckBtn.addEventListener('click', () => {
            // Dynamic import/creation based on deck type
            let deck = [];
            switch (selectedDeck) {
                case 'fire': deck = createFireDeck(); break;
                case 'water': deck = createWaterDeck(); break;
                case 'grass': deck = createGrassDeck(); break;
                case 'electric': deck = createElectricDeck(); break;
                case 'psychic': deck = createPsychicDeck(); break;
                case 'fighting': deck = createFightingDeck(); break;
                case 'dark': deck = createDarkDeck(); break;
                case 'colorless': deck = createColorlessDeck(); break;
                case 'trout': deck = createTroutDeck(); break;
            }

            // Filter unique cards
            const uniqueCards = [];
            const seenIds = new Set();
            deck.forEach(card => {
                // Use base ID (remove unique suffix if present)
                const baseId = card.id;
                if (!seenIds.has(baseId)) {
                    seenIds.add(baseId);
                    uniqueCards.push(card);
                }
            });

            showDeckPreview(uniqueCards, selectedDeck);
        });
    }

    // Auto-start if no start button
    if (!startBtn) {
        startNewGame();
    }
});

function showDeckPreview(cards, deckType) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `${deckType.charAt(0).toUpperCase() + deckType.slice(1)} Deck Preview`;
    modal.classList.add('wide');

    let currentIndex = 0;

    // Render Function
    const renderCard = () => {
        const container = modalContent.querySelector('.card-gallery-container');
        if (!container) return;

        let cardWrapper = container.querySelector('.card-wrapper');
        if (!cardWrapper) {
            cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
            // Insert before controls
            const controls = container.querySelector('.gallery-controls');
            if (controls) {
                container.insertBefore(cardWrapper, controls);
            } else {
                container.appendChild(cardWrapper);
            }
        }
        cardWrapper.innerHTML = '';

        const card = cards[currentIndex];
        const cardEl = window.gameUI.createCardElement(card);
        cardEl.classList.remove('playable', 'selectable');
        cardEl.style.cursor = 'default';

        cardWrapper.appendChild(cardEl);

        // Update Counter
        const counter = container.querySelector('.gallery-counter');
        if (counter) counter.textContent = `${currentIndex + 1} / ${cards.length}`;
    };

    // Setup HTML
    modalContent.innerHTML = `
        <div class="card-gallery-container">
            <div class="gallery-controls">
                <button class="gallery-btn prev-btn">❮</button>
                <div class="gallery-counter">1 / ${cards.length}</div>
                <button class="gallery-btn next-btn">❯</button>
            </div>
        </div>
    `;

    // Listeners
    const prevBtn = modalContent.querySelector('.prev-btn');
    const nextBtn = modalContent.querySelector('.next-btn');

    const nextCard = () => {
        currentIndex = (currentIndex + 1) % cards.length;
        renderCard();
    };

    const prevCard = () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        renderCard();
    };

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Keyboard
    const keyHandler = (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') prevCard();
    };
    document.addEventListener('keydown', keyHandler);

    // Initial
    renderCard();

    modal.classList.add('active');

    // Cleanup
    const cleanup = () => {
        modal.classList.remove('wide');
        document.removeEventListener('keydown', keyHandler);
        modal.querySelector('.modal-close').removeEventListener('click', cleanup);
    };
    modal.querySelector('.modal-close').addEventListener('click', cleanup);
}


// Easter Egg Logic
function setupEasterEgg() {
    const title = document.querySelector('.title-poke');
    if (!title) return;

    let clickCount = 0;
    let lastClickTime = 0;
    const REQUIRED_CLICKS = 5;
    const TIME_WINDOW = 1000; // 1 second reset for rapid clicks

    // Disable default selection to prevent highlighting text
    title.style.userSelect = 'none';
    title.style.cursor = 'pointer';
    title.style.pointerEvents = 'auto'; // Force clickable

    // Check if already unlocked - DISABLING PERSISTENCE AS REQUESTED
    /* 
    if (localStorage.getItem('pokemon-tcg-trout-unlocked') === 'true') {
        unlockTroutDeckUI();
    }
    */

    // Use mousedown to prevent text selection interference
    title.addEventListener('mousedown', (e) => {
        const now = Date.now();
        console.log('Title clicked!'); // Debug

        if (now - lastClickTime > TIME_WINDOW) {
            clickCount = 0;
        }

        clickCount++;
        lastClickTime = now;

        // Visual feedback
        title.style.transform = `scale(${1 + (clickCount * 0.1)})`;
        setTimeout(() => title.style.transform = '', 100);

        if (clickCount >= REQUIRED_CLICKS) {
            // Check if already unlocked in this session
            if (!document.querySelector('.deck-choice[data-deck="trout"]')) {
                unlockTroutDeck();
            }
            clickCount = 0;
        }
    });
}

function unlockTroutDeck() {
    // localStorage.setItem('pokemon-tcg-trout-unlocked', 'true'); // Removed persistence
    alert('🐟 A wild Trout appeared! The Trout Deck is now available!');
    unlockTroutDeckUI();

    // Auto-select
    const troutDeckBtn = document.querySelector('.deck-choice[data-deck="trout"]');
    if (troutDeckBtn) troutDeckBtn.click();
}
window.unlockTroutDeck = unlockTroutDeck;

function unlockTroutDeckUI() {
    const deckContainer = document.querySelector('.deck-preview');
    if (!deckContainer) return;

    // Check if already exists
    if (document.querySelector('.deck-choice[data-deck="trout"]')) return;

    const troutDeckHTML = `
        <div class="deck-choice selectable sparkle-in" data-deck="trout">
            <div class="deck-art-container">
                <img src="assets/trout/andregor.png" alt="Trout Deck" class="deck-art-img" style="object-position: top;">
                <div class="deck-art-placeholder" style="background: linear-gradient(135deg, #166534 0%, #3b82f6 100%);">
                    <span>🐟</span>
                    <small>Easter Egg</small>
                </div>
            </div>
            <div class="deck-info">
                <h3>Trout Deck</h3>
                <p>Values, Integrity, Excellence</p>
            </div>
        </div>
    `;

    // Prepend to start of list (make it first)
    deckContainer.insertAdjacentHTML('afterbegin', troutDeckHTML);

    // No need to add specific listener anymore due to event delegation
}
