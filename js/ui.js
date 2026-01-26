// Pokemon TCG - UI Rendering and Interaction

class GameUI {
    constructor(gameState, gameEngine, cpuAI) {
        this.state = gameState;
        this.engine = gameEngine;
        this.cpu = cpuAI;

        // Current selection state
        this.selectedCard = null;
        this.selectedAction = null;
        this.awaitingTarget = false;
        this.pendingAction = null;
        this.mobileSelectedCardUid = null; // For mobile double-tap logic

        // TTS State
        this.ttsEnabled = false;
        this.speechSynth = window.speechSynthesis;
        this.currentUtterance = null;

        // Guide State
        this.guideEnabled = true;
        this.guideCollapsed = false;

        // DOM element cache
        this.elements = {};

        // Bind methods
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleActionButton = this.handleActionButton.bind(this);
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    init() {
        this.cacheElements();
        this.bindEvents();
        this.render();
    }

    cacheElements() {
        this.elements = {
            // Player zones
            playerHand: document.getElementById('player-hand'),
            playerActive: document.getElementById('player-active'),
            playerBench: document.getElementById('player-bench'),
            playerDeck: document.getElementById('player-deck'),
            playerDiscard: document.getElementById('player-discard'),
            playerPrizes: document.getElementById('player-prizes'),

            // CPU zones
            cpuActive: document.getElementById('cpu-active'),
            cpuBench: document.getElementById('cpu-bench'),
            cpuDeck: document.getElementById('cpu-deck'),
            cpuDiscard: document.getElementById('cpu-discard'),
            cpuPrizes: document.getElementById('cpu-prizes'),
            cpuHand: document.getElementById('cpu-hand'),

            // UI controls
            actionPanel: document.getElementById('action-panel'),
            attackBtn: document.getElementById('attack-btn'),
            retreatBtn: document.getElementById('retreat-btn'),
            endTurnBtn: document.getElementById('end-turn-btn'),

            // Info displays
            gameLog: document.getElementById('game-log'),
            turnInfo: document.getElementById('turn-info'),
            newGameHeaderBtn: document.getElementById('new-game-header-btn'),

            // Modals
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modal-title'),
            modalContent: document.getElementById('modal-content'),
            modalClose: document.getElementById('modal-close'),

            // Card detail
            cardDetail: document.getElementById('card-detail'),

            // Game over
            gameOverScreen: document.getElementById('game-over-screen'),
            gameOverMessage: document.getElementById('game-over-message'),
            newGameBtn: document.getElementById('new-game-btn'),

            // Feedback form removed


            // TTS
            ttsSwitch: document.getElementById('tts-switch'),

            // Guide
            guideSwitch: document.getElementById('guide-switch'),
            rookieGuide: document.getElementById('rookie-guide'),
            guideList: document.getElementById('guide-list')
        };
    }

    bindEvents() {
        // Action buttons
        this.elements.attackBtn?.addEventListener('click', () => this.handleActionButton('attack'));
        this.elements.retreatBtn?.addEventListener('click', () => this.handleActionButton('retreat'));
        this.elements.endTurnBtn?.addEventListener('click', () => this.handleActionButton('endTurn'));

        // Modal close
        this.elements.modalClose?.addEventListener('click', () => this.hideModal());

        // New game (Modal)
        this.elements.newGameBtn?.addEventListener('click', () => this.startNewGame());

        // New game (Header)
        this.elements.newGameHeaderBtn?.addEventListener('click', () => {
            if (confirm('Are you sure you want to restart the game?')) {
                this.startNewGame();
            }
        });

        // Close card detail on outside click (Mobile)
        window.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                this.elements.cardDetail &&
                this.elements.cardDetail.classList.contains('active') &&
                !e.target.closest('.card')) { // If not clicking a card
                this.hideCardDetail();
                this.mobileSelectedCardUid = null;
            }
        });

        // Close modal on outside click
        this.elements.modal?.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.hideModal();
            }
        });

        // Feedback form submission


        // TTS Toggle
        this.elements.ttsSwitch?.addEventListener('change', (e) => {
            this.ttsEnabled = e.target.checked;
            localStorage.setItem('pokemon-tcg-tts', this.ttsEnabled);
            this.cancelSpeech();
        });

        // Guide Toggle
        this.elements.guideSwitch?.addEventListener('change', (e) => {
            this.guideEnabled = e.target.checked;
            localStorage.setItem('pokemon-tcg-guide', this.guideEnabled);
            this.toggleGuidePanel();
        });

        // Guide Collapse Toggle
        const guidePanel = document.getElementById('rookie-guide');
        if (guidePanel) {
            const header = guidePanel.querySelector('h3');
            if (header) {
                // Create toggle button
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'guide-collapse-btn';
                toggleBtn.innerHTML = '▼';
                toggleBtn.title = 'Collapse Guide';
                header.appendChild(toggleBtn);

                // Toggle click
                header.addEventListener('click', () => {
                    this.guideCollapsed = !this.guideCollapsed;
                    guidePanel.classList.toggle('collapsed', this.guideCollapsed);
                    toggleBtn.style.transform = this.guideCollapsed ? 'rotate(-90deg)' : 'rotate(0)';
                });
            }
        }

        // Initialize state from LocalStorage if available
        const storedGuide = localStorage.getItem('pokemon-tcg-guide');
        if (storedGuide !== null) {
            this.guideEnabled = storedGuide === 'true';
        }

        const storedTTS = localStorage.getItem('pokemon-tcg-tts');
        if (storedTTS !== null) {
            this.ttsEnabled = storedTTS === 'true';
        }

        if (this.elements.guideSwitch) {
            this.elements.guideSwitch.checked = this.guideEnabled;
            this.toggleGuidePanel();
        }
        if (this.elements.ttsSwitch) {
            this.elements.ttsSwitch.checked = this.ttsEnabled;
        }

        // Initialize Theme Toggle
        this.elements.themeSwitch = document.getElementById('theme-switch');
        if (this.elements.themeSwitch) {
            this.elements.themeSwitch.checked = document.body.getAttribute('data-theme') === 'light';
            this.elements.themeSwitch.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'light' : 'dark';
                document.body.setAttribute('data-theme', theme);
            });
        }
    }

    // ============================================
    // RENDERING
    // ============================================

    render() {
        this.renderPlayerHand();
        this.renderPlayerActive();
        this.renderPlayerBench();
        this.renderPlayerDeck();
        this.renderPlayerDiscard();
        this.renderPlayerPrizes();

        this.renderCPUActive();
        this.renderCPUBench();
        this.renderCPUDeck();
        this.renderCPUDiscard();
        this.renderCPUPrizes();
        this.renderCPUHand();

        this.renderTurnInfo();
        this.renderGuide(); // Update guide
        this.updateActionButtons();

        if (this.state.gameOver) {
            this.showGameOver();
        }
    }

    // Player Hand
    renderPlayerHand() {
        if (!this.elements.playerHand) return;

        this.elements.playerHand.innerHTML = '';

        for (const card of this.state.player.hand) {
            const cardEl = this.createCardElement(card, 'player', 'hand');
            this.elements.playerHand.appendChild(cardEl);
        }
    }

    // Player Active
    renderPlayerActive() {
        if (!this.elements.playerActive) return;

        this.elements.playerActive.innerHTML = '';

        if (this.state.player.active) {
            const cardEl = this.createActivePokemonElement(this.state.player.active, 'player');
            this.elements.playerActive.appendChild(cardEl);
        } else {
            this.elements.playerActive.innerHTML = '<div class="empty-slot">No Active Pokémon</div>';
        }
    }

    // Player Bench
    renderPlayerBench() {
        if (!this.elements.playerBench) return;

        this.elements.playerBench.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            if (i < this.state.player.bench.length) {
                const cardEl = this.createActivePokemonElement(this.state.player.bench[i], 'player', i);
                this.elements.playerBench.appendChild(cardEl);
            } else {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'bench-slot empty';
                emptySlot.textContent = '';
                this.elements.playerBench.appendChild(emptySlot);
            }
        }
    }

    // Player Deck
    renderPlayerDeck() {
        if (!this.elements.playerDeck) return;

        this.elements.playerDeck.innerHTML = `
            <div class="deck-stack">
                <div class="card-back"></div>
                <div class="deck-count">${this.state.player.deck.length}</div>
            </div>
        `;
    }

    // Player Discard
    renderPlayerDiscard() {
        if (!this.elements.playerDiscard) return;

        const topCard = this.state.player.discardPile[this.state.player.discardPile.length - 1];

        if (topCard) {
            this.elements.playerDiscard.innerHTML = `
                <div class="discard-pile" title="Discard Pile (${this.state.player.discardPile.length} cards)">
                    ${this.getCardMiniDisplay(topCard)}
                    <div class="discard-count">${this.state.player.discardPile.length}</div>
                </div>
            `;
        } else {
            this.elements.playerDiscard.innerHTML = '<div class="empty-discard">Discard</div>';
        }
    }

    // Player Prizes
    renderPlayerPrizes() {
        if (!this.elements.playerPrizes) return;

        this.elements.playerPrizes.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const prizeEl = document.createElement('div');
            prizeEl.className = `prize-card ${i < this.state.player.prizeCards.length ? 'active' : 'taken'}`;
            this.elements.playerPrizes.appendChild(prizeEl);
        }
    }

    // CPU zones
    renderCPUActive() {
        if (!this.elements.cpuActive) return;

        this.elements.cpuActive.innerHTML = '';

        if (this.state.cpu.active) {
            const cardEl = this.createActivePokemonElement(this.state.cpu.active, 'cpu');
            this.elements.cpuActive.appendChild(cardEl);
        } else {
            this.elements.cpuActive.innerHTML = '<div class="empty-slot">No Active Pokémon</div>';
        }
    }

    renderCPUBench() {
        if (!this.elements.cpuBench) return;

        this.elements.cpuBench.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            if (i < this.state.cpu.bench.length) {
                const cardEl = this.createActivePokemonElement(this.state.cpu.bench[i], 'cpu', i);
                this.elements.cpuBench.appendChild(cardEl);
            } else {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'bench-slot empty';
                this.elements.cpuBench.appendChild(emptySlot);
            }
        }
    }

    renderCPUDeck() {
        if (!this.elements.cpuDeck) return;

        this.elements.cpuDeck.innerHTML = `
            <div class="deck-stack cpu">
                <div class="card-back"></div>
                <div class="deck-count">${this.state.cpu.deck.length}</div>
            </div>
        `;
    }

    renderCPUDiscard() {
        if (!this.elements.cpuDiscard) return;

        const topCard = this.state.cpu.discardPile[this.state.cpu.discardPile.length - 1];

        if (topCard) {
            this.elements.cpuDiscard.innerHTML = `
                <div class="discard-pile" title="CPU Discard (${this.state.cpu.discardPile.length} cards)">
                    ${this.getCardMiniDisplay(topCard)}
                    <div class="discard-count">${this.state.cpu.discardPile.length}</div>
                </div>
            `;
        } else {
            this.elements.cpuDiscard.innerHTML = '<div class="empty-discard">Discard</div>';
        }
    }

    renderCPUPrizes() {
        if (!this.elements.cpuPrizes) return;

        this.elements.cpuPrizes.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const prizeEl = document.createElement('div');
            prizeEl.className = `prize-card ${i < this.state.cpu.prizeCards.length ? 'active' : 'taken'}`;
            this.elements.cpuPrizes.appendChild(prizeEl);
        }
    }

    renderCPUHand() {
        if (!this.elements.cpuHand) return;

        this.elements.cpuHand.innerHTML = '';

        for (let i = 0; i < this.state.cpu.hand.length; i++) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card-back mini';
            this.elements.cpuHand.appendChild(cardEl);
        }

        // Show count
        const countEl = document.createElement('div');
        countEl.className = 'hand-count';
        countEl.textContent = this.state.cpu.hand.length;
        this.elements.cpuHand.appendChild(countEl);
    }

    renderTurnInfo() {
        const isPlayerTurn = this.state.currentTurn === 'player';

        if (this.elements.turnInfo) {
            this.elements.turnInfo.textContent = `Turn ${this.state.turnNumber} - ${isPlayerTurn ? 'Your Turn' : "CPU's Turn"}`;
            this.elements.turnInfo.style.color = isPlayerTurn ? 'var(--success)' : 'var(--danger)';
        }

        // Visual Turn Indicator
        if (this.elements.playerActive && this.elements.cpuActive) {
            // Apply to the parent section (.player-side or .cpu-side)
            const playerSide = this.elements.playerActive.closest('.player-side');
            const cpuSide = this.elements.cpuActive.closest('.cpu-side');

            if (playerSide && cpuSide) {
                if (isPlayerTurn) {
                    playerSide.classList.add('active-turn');
                    cpuSide.classList.remove('active-turn');
                } else {
                    playerSide.classList.remove('active-turn');
                    cpuSide.classList.add('active-turn');
                }
            }
        }
    }

    // ============================================
    // CARD ELEMENT CREATION
    // ============================================

    createCardElement(card, owner, zone) {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${card.cardType} ${card.pokemonType || ''} ${card.energyType || ''}`;
        cardEl.dataset.uid = card.uid;
        cardEl.dataset.owner = owner;
        cardEl.dataset.zone = zone;

        cardEl.innerHTML = this.getCardHTML(card);

        if (owner === 'player') {
            cardEl.addEventListener('click', (e) => this.handleCardClick(e, card, zone));
            cardEl.addEventListener('click', (e) => this.handleCardClick(e, card, zone));
            cardEl.addEventListener('click', (e) => this.handleCardClick(e, card, zone));

            // Only attach hover events on desktop to prevent mobile touch flickering
            if (window.innerWidth > 768) {
                cardEl.addEventListener('mouseenter', () => {
                    this.showCardDetail(card);
                    if (this.ttsEnabled) this.speakCard(card);
                });
                cardEl.addEventListener('mouseleave', () => {
                    this.hideCardDetail();
                    this.cancelSpeech();
                });
            }
        }

        return cardEl;
    }

    createActivePokemonElement(activePokemon, owner, benchIndex = null) {
        const cardEl = document.createElement('div');
        const card = activePokemon.card;
        cardEl.className = `card pokemon ${card.pokemonType} active-pokemon`;
        cardEl.dataset.uid = card.uid;
        cardEl.dataset.owner = owner;

        if (benchIndex !== null) {
            cardEl.dataset.benchIndex = benchIndex;
            cardEl.classList.add('benched');
        }

        // Add status indicator
        if (activePokemon.statusCondition !== StatusCondition.NONE) {
            cardEl.classList.add(`status-${activePokemon.statusCondition}`);
        }

        // Determine artwork content
        const artworkContent = card.image
            ? `<img src="${card.image}" alt="${card.name}" class="card-artwork-img">`
            : `<div class="placeholder">
                <span class="placeholder-icon">${card.placeholderIcon || '🎴'}</span>
               </div>`;

        cardEl.innerHTML = `
            <div class="card-header">
                <span class="card-name">${card.name}</span>
                <span class="card-hp">${activePokemon.currentHP}/${card.hp} HP</span>
            </div>
            <div class="card-artwork active-art">
                ${artworkContent}
            </div>
            <div class="hp-bar">
                <div class="hp-fill" style="width: ${(activePokemon.currentHP / card.hp) * 100}%"></div>
            </div>
            <div class="energy-attached">
                ${activePokemon.attachedEnergy.map(e => `<span class="energy-icon ${e.energyType}"></span>`).join('')}
            </div>
            ${activePokemon.statusCondition !== StatusCondition.NONE ?
                `<div class="status-badge">${activePokemon.statusCondition}</div>` : ''}
            <div class="attacks-mini">
                ${card.attacks.map(a => `
                    <div class="attack-mini ${activePokemon.canUseAttack(a) ? 'usable' : 'unusable'}">
                        <span class="attack-cost-mini">
                            ${a.cost.map(c => `<span class="energy-mini ${c}"></span>`).join('')}
                        </span>
                        <span>${a.name}</span>
                        <span class="attack-damage-mini">${a.damage}</span>
                    </div>
                `).join('')}
            </div>
        `;

        cardEl.addEventListener('click', (e) => this.handleActivePokemonClick(e, activePokemon, owner, benchIndex));
        cardEl.addEventListener('click', (e) => this.handleActivePokemonClick(e, activePokemon, owner, benchIndex));
        cardEl.addEventListener('click', (e) => this.handleActivePokemonClick(e, activePokemon, owner, benchIndex));

        // Only attach hover events on desktop
        if (window.innerWidth > 768) {
            cardEl.addEventListener('mouseenter', () => {
                this.showActivePokemonDetail(activePokemon);
                if (this.ttsEnabled) this.speakCard(activePokemon.card);
            });
            cardEl.addEventListener('mouseleave', () => {
                this.hideCardDetail();
                this.cancelSpeech();
            });
        }

        return cardEl;
    }

    getCardHTML(card) {
        switch (card.cardType) {
            case CardType.POKEMON:
                // Determine artwork content - use image if available, otherwise placeholder
                const artworkContent = card.image
                    ? `<img src="${card.image}" alt="${card.name}" class="card-artwork-img">`
                    : `<div class="placeholder">
                        <span class="placeholder-icon">${card.placeholderIcon || '🎴'}</span>
                        <span class="placeholder-text">Image Coming Soon</span>
                       </div>`;

                return `
                    <div class="card-header">
                        <span class="card-name">${card.name}</span>
                        <span class="card-hp">${card.hp} HP</span>
                    </div>
                    <div class="card-stage">${card.stage}</div>
                    <div class="card-artwork">
                        ${artworkContent}
                    </div>
                    <div class="attacks">
                        ${card.attacks.map(a => `
                            <div class="attack">
                                <span class="attack-cost">${a.cost.map(c => `<span class="energy-mini ${c}"></span>`).join('')}</span>
                                <span class="attack-name">${a.name}</span>
                                <span class="attack-damage">${a.damage}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="card-footer">
                        ${card.weakness ? `<span class="weakness">Weakness: ${card.weakness} x2</span>` : ''}
                        ${card.resistance ? `<span class="resistance">Resistance: ${card.resistance} -30</span>` : ''}
                        <span class="retreat">Retreat: ${card.retreatCost}</span>
                    </div>
                `;

            case CardType.ENERGY:
                const energyArtwork = card.image
                    ? `<img src="${card.image}" alt="${card.name}" class="card-artwork-img">`
                    : `<div class="energy-symbol ${card.energyType}"></div>`;

                return `
                    <div class="energy-card">
                        <div class="card-header-simple">
                            <span class="card-name">${card.name}</span>
                        </div>
                        <div class="card-artwork energy-artwork">
                            ${energyArtwork}
                        </div>
                        <div class="energy-type-icon ${card.energyType}"></div>
                    </div>
                `;

            case CardType.TRAINER:
                // Determine artwork content
                const trainerArtwork = card.image
                    ? `<img src="${card.image}" alt="${card.name}" class="card-artwork-img">`
                    : `<div class="placeholder">
                        <span class="placeholder-icon">${card.placeholderIcon || '🎴'}</span>
                        <span class="placeholder-text">Trainer Art</span>
                       </div>`;

                return `
                    <div class="trainer-card">
                        <div class="trainer-header">
                            <span class="trainer-name">${card.name}</span>
                            <span class="trainer-type">${card.trainerType}</span>
                        </div>
                        <div class="card-artwork">
                            ${trainerArtwork}
                        </div>
                        <div class="trainer-description">${card.description}</div>
                    </div>
                `;

            default:
                return `<div class="unknown-card">${card.name}</div>`;
        }
    }


    getCardMiniDisplay(card) {
        return `<div class="card-mini ${card.cardType} ${card.pokemonType || card.energyType || ''}">${card.name}</div>`;
    }

    // ============================================
    // USER INTERACTIONS
    // ============================================

    handleCardClick(e, card, zone) {
        e.stopPropagation();

        // Mobile Inspection Logic: First tap shows details, second tap acts
        if (window.innerWidth <= 768) {
            if (this.mobileSelectedCardUid !== card.uid) {
                this.mobileSelectedCardUid = card.uid;
                this.showCardDetail(card);
                return;
            }
            // Second tap proceeds...
            this.mobileSelectedCardUid = null;
            this.hideCardDetail();
        }

        // Only allow actions on player's turn
        if (this.state.currentTurn !== 'player') {
            this.showMessage("Wait for your turn!");
            return;
        }

        // If awaiting target selection
        if (this.awaitingTarget && this.pendingAction) {
            if (zone === 'hand') {
                this.showMessage("Select a Pokemon on the board!");
                return;
            }
            this.handleTargetSelection(card, zone);
            return;
        }

        // Handle based on card type
        switch (card.cardType) {
            case CardType.POKEMON:
                if (card.stage === Stage.BASIC) {
                    this.handleBasicPokemonClick(card);
                } else {
                    this.handleEvolutionClick(card);
                }
                break;

            case CardType.ENERGY:
                this.handleEnergyClick(card);
                break;

            case CardType.TRAINER:
                this.handleTrainerClick(card);
                break;
        }
    }

    handleBasicPokemonClick(card) {
        // If no active, set as active
        if (!this.state.player.active) {
            this.engine.setActiveFromHand('player', card.uid);
            this.render();
            return;
        }

        if (this.state.player.bench.length < 5) {
            this.engine.playBasicToBench('player', card.uid);
            this.render();

            // Highlight the new bench pokemon
            const newBenchEl = this.elements.playerBench.lastElementChild;
            if (newBenchEl) newBenchEl.classList.add('anim-play-glow');
        } else {
            this.showMessage("Bench is full!");
        }
    }

    handleEvolutionClick(card) {
        // Find valid evolution targets
        const targets = [];

        if (this.state.player.active &&
            this.state.player.active.card.id === card.evolvesFrom &&
            !this.state.player.playedThisTurn.includes(this.state.player.active.card.uid)) {
            targets.push({ pokemon: this.state.player.active, location: 'active' });
        }

        for (let i = 0; i < this.state.player.bench.length; i++) {
            const benched = this.state.player.bench[i];
            if (benched.card.id === card.evolvesFrom &&
                !this.state.player.playedThisTurn.includes(benched.card.uid)) {
                targets.push({ pokemon: benched, location: 'bench', index: i });
            }
        }

        if (targets.length === 0) {
            this.showMessage(`No valid targets for ${card.name}!`);
            return;
        }

        if (targets.length === 1) {
            // Auto-select only target
            this.engine.evolvePokemon('player', card.uid, targets[0].pokemon);
            this.render();
        } else {
            // Show selection modal
            this.showEvolutionTargetModal(card, targets);
        }
    }

    handleEnergyClick(card) {
        if (this.state.actions.hasAttachedEnergy) {
            this.showMessage("Already attached energy this turn!");
            return;
        }

        // Find valid targets
        const targets = [];
        if (this.state.player.active) {
            targets.push(this.state.player.active);
        }
        targets.push(...this.state.player.bench);

        if (targets.length === 0) {
            this.showMessage("No Pokemon to attach energy to!");
            return;
        }

        if (targets.length === 1) {
            this.engine.attachEnergy('player', card.uid, targets[0]);
            this.render();

            // Highlight target
            const targetUid = targets[0].card.uid;
            const targetEl = document.querySelector(`[data-uid="${targetUid}"]`);
            if (targetEl) targetEl.classList.add('anim-play-glow');
        } else {
            // Set up target selection
            this.awaitingTarget = true;
            this.pendingAction = { type: 'attachEnergy', card: card };
            this.showMessage("Select a Pokemon to attach energy to...");
            this.highlightValidTargets(targets);
        }
    }

    handleTrainerClick(card) {
        if (card.trainerType === TrainerType.SUPPORTER && this.state.actions.hasPlayedSupporter) {
            this.showMessage("Already played a Supporter this turn!");
            return;
        }

        // Handle trainers that need targets
        if (card.effect === 'heal' || card.effect === 'superHeal') {
            const targets = [];
            if (this.state.player.active && this.state.player.active.damage > 0) {
                targets.push(this.state.player.active);
            }
            for (const benched of this.state.player.bench) {
                if (benched.damage > 0) targets.push(benched);
            }

            if (targets.length === 0) {
                this.showMessage("No damaged Pokemon to heal!");
                return;
            }

            if (targets.length === 1) {
                this.engine.playTrainer('player', card.uid, targets[0]);
                this.render();
            } else {
                this.awaitingTarget = true;
                this.pendingAction = { type: 'playTrainer', card: card };
                this.showMessage("Select a Pokemon to heal...");
                this.highlightValidTargets(targets);
            }
            return;
        }

        if (card.effect === 'switch') {
            if (this.state.player.bench.length === 0) {
                this.showMessage("No bench Pokemon to switch to!");
                return;
            }
            this.awaitingTarget = true;
            this.pendingAction = { type: 'switch', card: card };
            this.showMessage("Select a bench Pokemon to switch to...");
            this.highlightValidTargets(this.state.player.bench);
            return;
        }

        if (card.effect === 'gust') {
            if (this.state.cpu.bench.length === 0) {
                this.showMessage("Opponent has no bench Pokemon!");
                return;
            }
            this.awaitingTarget = true;
            this.pendingAction = { type: 'gust', card: card };
            this.showMessage("Select an opponent's bench Pokemon to bring active...");
            this.highlightValidTargets(this.state.cpu.bench, 'cpu');
            return;
        }

        // Play trainer directly
        if (this.engine.playTrainer('player', card.uid)) {
            this.render();
        }
    }

    handleActivePokemonClick(e, activePokemon, owner, benchIndex) {
        e.stopPropagation();

        // Mobile Inspection Logic
        if (window.innerWidth <= 768) {
            const currentUid = activePokemon.card.uid;
            if (this.mobileSelectedCardUid !== currentUid) {
                this.mobileSelectedCardUid = currentUid;
                this.showActivePokemonDetail(activePokemon);
                return;
            }
            this.mobileSelectedCardUid = null;
            this.hideCardDetail();
        }

        if (this.awaitingTarget) {
            this.handleTargetSelection(activePokemon, owner === 'player' ? (benchIndex !== null ? 'bench' : 'active') : 'cpu', benchIndex);
        }
    }

    handleTargetSelection(target, zone, benchIndex = null) {
        if (!this.pendingAction) return;

        const action = this.pendingAction;
        this.awaitingTarget = false;
        this.pendingAction = null;
        this.clearHighlights();

        switch (action.type) {
            case 'attachEnergy':
                const result = this.engine.attachEnergy('player', action.card.uid, target);
                if (!result) {
                    this.state.log("Failed to attach energy. Check console.");
                    console.error("Attach Energy Failed:", { cardUid: action.card.uid, target });
                }
                break;

            case 'playTrainer':
                this.engine.playTrainer('player', action.card.uid, target);
                break;

            case 'switch':
                // Use switch trainer to swap
                const benchIdx = this.state.player.bench.indexOf(target);
                if (benchIdx !== -1) {
                    const oldActive = this.state.player.active;
                    this.state.player.active = this.state.player.bench.splice(benchIdx, 1)[0];
                    this.state.player.bench.push(oldActive);

                    // Discard switch card
                    const cardIndex = this.state.player.hand.findIndex(c => c.uid === action.card.uid);
                    if (cardIndex !== -1) {
                        const card = this.state.player.hand.splice(cardIndex, 1)[0];
                        this.state.player.discardPile.push(card);
                    }

                    this.state.log(`Switched ${oldActive.card.name} with ${this.state.player.active.card.name}!`);
                }
                break;

            case 'gust':
                const cpuBenchIdx = this.state.cpu.bench.indexOf(target);
                if (cpuBenchIdx !== -1) {
                    const oldCpuActive = this.state.cpu.active;
                    this.state.cpu.active = this.state.cpu.bench.splice(cpuBenchIdx, 1)[0];
                    if (oldCpuActive) {
                        this.state.cpu.bench.push(oldCpuActive);
                    }

                    // Discard boss's orders
                    const cardIndex = this.state.player.hand.findIndex(c => c.uid === action.card.uid);
                    if (cardIndex !== -1) {
                        const card = this.state.player.hand.splice(cardIndex, 1)[0];
                        this.state.player.discardPile.push(card);
                    }
                    this.state.actions.hasPlayedSupporter = true;

                    this.state.log(`Boss's Orders brought ${this.state.cpu.active.card.name} to the active position!`);
                }
                break;

            case 'retreat':
                const retBenchIdx = this.state.player.bench.indexOf(target);
                if (retBenchIdx !== -1) {
                    this.engine.retreat('player', retBenchIdx);
                }
                break;

            case 'chooseActive':
                const replaceBenchIdx = this.state.player.bench.indexOf(target);
                if (replaceBenchIdx !== -1) {
                    this.engine.setActiveFromBench('player', replaceBenchIdx);

                    // If this was a forced replacement (knockout), we need to advance game flow
                    if (this.state.currentTurn === 'cpu') {
                        // CPU turn killed us, we replaced, now turn ends
                        this.engine.endTurn();
                    } else {
                        // We killed ourselves (confusion/poison) or ended turn without active
                        // End our turn properly
                        this.endPlayerTurn();
                    }
                }
                break;
        }

        this.render();
    }

    handleActionButton(action) {
        if (this.state.currentTurn !== 'player') return;

        switch (action) {
            case 'attack':
                this.showAttackModal();
                break;

            case 'retreat':
                if (this.state.player.bench.length === 0) {
                    this.showMessage("No bench Pokemon to retreat to!");
                    return;
                }
                this.awaitingTarget = true;
                this.pendingAction = { type: 'retreat' };
                this.showMessage("Select a bench Pokemon to switch to...");
                this.highlightValidTargets(this.state.player.bench);
                break;

            case 'endTurn':
                this.endPlayerTurn();
                break;
        }
    }

    // ============================================
    // ACTION BUTTONS
    // ============================================

    updateActionButtons() {
        const isPlayerTurn = this.state.currentTurn === 'player';
        const player = this.state.player;

        // Attack button
        if (this.elements.attackBtn) {
            const canAttack = isPlayerTurn &&
                player.active &&
                player.active.getUsableAttacks().length > 0;
            this.elements.attackBtn.disabled = !canAttack;
        }

        // Retreat button
        if (this.elements.retreatBtn) {
            const canRetreat = isPlayerTurn &&
                !this.state.actions.hasRetreated &&
                player.active &&
                player.bench.length > 0 &&
                player.active.attachedEnergy.length >= player.active.card.retreatCost &&
                player.active.statusCondition !== StatusCondition.ASLEEP &&
                player.active.statusCondition !== StatusCondition.PARALYZED;
            this.elements.retreatBtn.disabled = !canRetreat;

            if (player.active) {
                this.elements.retreatBtn.title = `Retreat cost: ${player.active.card.retreatCost} energy`;
            }
        }

        // End turn button
        if (this.elements.endTurnBtn) {
            this.elements.endTurnBtn.disabled = !isPlayerTurn;
        }
    }

    // ============================================
    // MODALS
    // ============================================

    showModal(title, content) {
        if (!this.elements.modal) return;

        this.elements.modalTitle.textContent = title;
        this.elements.modalContent.innerHTML = content;
        this.elements.modal.classList.add('active');
    }

    hideModal() {
        if (!this.elements.modal) return;
        this.elements.modal.classList.remove('active');
    }

    // ============================================
    // TEXT TO SPEECH
    // ============================================

    speakCard(card) {
        if (!this.speechSynth) return;
        this.cancelSpeech();

        let text = '';

        if (card.cardType === CardType.POKEMON) {
            text += `${card.name}. ${card.hp} Hit Points. ${card.pokemonType} type. ${card.stage} Pokémon. `;
            text += `Attacks: `;
            card.attacks.forEach(attack => {
                text += `${attack.name}, ${attack.damage} damage. ${attack.description || ''} `;
            });
        } else if (card.cardType === CardType.TRAINER) {
            text += `${card.name}. ${card.trainerType} card. ${card.description} `;
        } else if (card.cardType === CardType.ENERGY) {
            text += `${card.name}. `;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to pick a clear voice if available (e.g., Google US English)
        const voices = this.speechSynth.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
        if (preferredVoice) utterance.voice = preferredVoice;

        this.currentUtterance = utterance;
        this.speechSynth.speak(utterance);
    }

    cancelSpeech() {
        if (this.speechSynth) {
            this.speechSynth.cancel();
            this.currentUtterance = null;
        }
    }

    showAttackModal() {
        if (!this.state.player.active) return;

        const attacks = this.state.player.active.card.attacks;
        let content = '<div class="attack-selection">';

        attacks.forEach((attack, index) => {
            const canUse = this.state.player.active.canUseAttack(attack);
            content += `
                <div class="attack-option ${canUse ? 'usable' : 'unusable'}" data-index="${index}" ${canUse ? '' : 'disabled'}>
                    <div class="attack-header">
                        <span class="attack-cost">${attack.cost.map(c => `<span class="energy-mini ${c}"></span>`).join('')}</span>
                        <span class="attack-name">${attack.name}</span>
                        <span class="attack-damage">${attack.damage}</span>
                    </div>
                    <div class="attack-description">${attack.description}</div>
                </div>
            `;
        });

        content += '</div>';

        this.showModal('Choose an Attack', content);

        // Bind attack selection
        document.querySelectorAll('.attack-option.usable').forEach(el => {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                this.hideModal();
                this.executeAttack(index);
            });
        });
    }

    showEvolutionTargetModal(evolutionCard, targets) {
        let content = '<div class="evolution-targets">';

        targets.forEach((target, index) => {
            content += `
                <div class="evolution-target" data-index="${index}">
                    <div class="target-name">${target.pokemon.card.name}</div>
                    <div class="target-location">${target.location === 'active' ? 'Active' : `Bench #${target.index + 1}`}</div>
                    <div class="target-hp">${target.pokemon.currentHP} HP</div>
                </div>
            `;
        });

        content += '</div>';

        this.showModal(`Evolve into ${evolutionCard.name}`, content);

        // Bind target selection
        document.querySelectorAll('.evolution-target').forEach(el => {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                this.hideModal();
                this.engine.evolvePokemon('player', evolutionCard.uid, targets[index].pokemon);
                this.render();
            });
        });
    }

    // ============================================
    // GAME ACTIONS
    // ============================================

    async executeAttack(attackIndex) {
        // Trigger Animation
        await this.animateAttack('player');

        // Calculate potential damage for visualization (simplified)
        // Ideally engine returns actual damage dealt, but we'll approximate/await implementation update
        // access damage logic if possible, or just animate generic shake on CPU
        await this.animateDamage('cpu', this.state.player.active.card.attacks[attackIndex].damage);

        const success = this.engine.attack('player', attackIndex);

        if (success) {
            this.render();

            // Check for knockout - CPU needs to choose new active
            if (!this.state.cpu.active && this.state.cpu.bench.length > 0 && !this.state.gameOver) {
                await this.cpu.chooseNewActive();
                this.render();
            }

            // End turn after attack
            if (!this.state.gameOver) {
                setTimeout(() => this.endPlayerTurn(), 500);
            }
        }
    }

    async endPlayerTurn() {
        // Check if player needs to choose new active
        if (!this.state.player.active && this.state.player.bench.length > 0) {
            this.showMessage("Choose a Pokemon to become active!");
            this.awaitingTarget = true;
            this.pendingAction = { type: 'chooseActive' };
            this.highlightValidTargets(this.state.player.bench);
            return;
        }

        this.engine.endTurn();
        this.render();

        // CPU turn
        if (!this.state.gameOver && this.state.currentTurn === 'cpu') {
            await this.executeCPUTurn();
        }
    }

    async executeCPUTurn() {
        // Start CPU turn
        this.engine.startTurn();
        this.render();

        // CPU needs active if none
        if (!this.state.cpu.active && this.state.cpu.bench.length > 0) {
            await this.cpu.chooseNewActive();
            this.render();
        }

        // Execute CPU AI
        const turnResult = await this.cpu.executeTurn();
        this.render();

        // Handle CPU Attack with Animation
        if (turnResult && turnResult.action === 'attack') {
            const attackIndex = turnResult.index;

            // Animation
            await this.animateAttack('cpu');

            // Damage Animation (approximate)
            const damage = this.state.cpu.active.card.attacks[attackIndex].damage;
            await this.animateDamage('player', damage);

            // Execute Attack
            const success = this.engine.attack('cpu', attackIndex);

            if (success) {
                this.render();

                // Check for knockout - Player needs to choose new active
                if (!this.state.player.active && this.state.player.bench.length > 0 && !this.state.gameOver) {
                    // Logic handled below
                } else if (!this.state.gameOver) {
                    this.engine.endTurn();
                    this.render();
                }
            }
        }

        // Check if player needs new active
        if (!this.state.player.active && this.state.player.bench.length > 0 && !this.state.gameOver) {
            this.state.log("Choose a Pokemon to become active!");
            this.awaitingTarget = true;
            this.pendingAction = { type: 'chooseActive' };
            this.highlightValidTargets(this.state.player.bench);
            return;
        }

        // Switch back to player
        if (!this.state.gameOver) {
            this.engine.startTurn();
            this.render();
        }
    }

    // ============================================
    // ANIMATIONS
    // ============================================

    async animateAttack(attackerOwner) {
        const attackerEl = attackerOwner === 'player' ?
            this.elements.playerActive?.querySelector('.card') :
            this.elements.cpuActive?.querySelector('.card');

        if (!attackerEl) return;

        const animClass = attackerOwner === 'player' ? 'anim-attack-player' : 'anim-attack-cpu';
        attackerEl.classList.add(animClass);

        // Wait for lunge to reach target
        await new Promise(r => setTimeout(r, 200));
    }

    async animateDamage(targetOwner, damage) {
        if (damage <= 0) return;

        const targetZone = targetOwner === 'player' ? this.elements.playerActive : this.elements.cpuActive;
        const targetEl = targetZone?.querySelector('.card');

        if (targetEl) {
            // Remove class to restart animation if needed
            targetEl.classList.remove('anim-damage');
            void targetEl.offsetWidth; // Trigger reflow
            targetEl.classList.add('anim-damage');

            // Floating text
            this.showFloatingDamage(targetEl, damage);
        }

        // Wait for shake/rest of lunge
        await new Promise(r => setTimeout(r, 300));
    }

    showFloatingDamage(targetEl, damage) {
        const rect = targetEl.getBoundingClientRect();
        const floatEl = document.createElement('div');
        floatEl.className = 'floating-damage';
        floatEl.textContent = `-${damage}`;

        // Position center of card
        floatEl.style.left = `${rect.left + rect.width / 2 - 20}px`;
        floatEl.style.top = `${rect.top + rect.height / 2}px`;

        document.body.appendChild(floatEl);

        // Cleanup
        setTimeout(() => {
            floatEl.remove();
        }, 1000);
    }

    // ============================================
    // HELPERS
    // ============================================

    showMessage(text) {
        this.addLogEntry({ message: text, timestamp: Date.now() });
        this.showToast(text);
    }

    showToast(text) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'game-toast';
        toast.textContent = text;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    addLogEntry(entry) {
        if (!this.elements.gameLog) return;

        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = entry.message;
        this.elements.gameLog.appendChild(logEntry);
        this.elements.gameLog.scrollTop = this.elements.gameLog.scrollHeight;
    }

    highlightValidTargets(targets, owner = 'player') {
        // Add highlight class to valid targets
        document.querySelectorAll('.card').forEach(el => {
            el.classList.remove('valid-target');
        });

        for (const target of targets) {
            const uid = target.card ? target.card.uid : target.uid;
            const el = document.querySelector(`[data-uid="${uid}"]`);
            if (el) {
                el.classList.add('valid-target');
            }
        }
    }

    clearHighlights() {
        document.querySelectorAll('.valid-target').forEach(el => {
            el.classList.remove('valid-target');
        });
    }

    showCardDetail(card) {
        if (!this.elements.cardDetail) return;

        this.elements.cardDetail.innerHTML = this.getCardDetailHTML(card);
        this.elements.cardDetail.classList.add('active');
    }

    showActivePokemonDetail(activePokemon) {
        if (!this.elements.cardDetail) return;

        const card = activePokemon.card;
        let html = this.getCardDetailHTML(card);

        // Add active Pokemon specific info
        html += `
            <div class="detail-status">
                <div>HP: ${activePokemon.currentHP}/${card.hp}</div>
                <div>Attached Energy: ${activePokemon.attachedEnergy.map(e => e.energyType).join(', ') || 'None'}</div>
                <div>Status: ${activePokemon.statusCondition}</div>
            </div>
        `;

        this.elements.cardDetail.innerHTML = html;
        this.elements.cardDetail.classList.add('active');
    }

    hideCardDetail() {
        if (!this.elements.cardDetail) return;
        this.elements.cardDetail.classList.remove('active');
    }

    getCardDetailHTML(card) {
        const hint = window.innerWidth <= 768 ? '<div class="mobile-tap-hint" style="text-align: center; margin-top: 1rem; color: var(--accent-secondary); font-weight: 600;">👆 Tap card again to play</div>' : '';

        if (card.cardType === CardType.POKEMON) {
            return `
                <div class="detail-header ${card.pokemonType}">
                    <h3>${card.name}</h3>
                    <span>${card.hp} HP</span>
                </div>
                <div class="detail-body">
                    <div class="detail-stage">${card.stage}${card.evolvesFrom ? ` (from ${card.evolvesFrom})` : ''}</div>
                    <div class="detail-attacks">
                        ${card.attacks.map(a => `
                            <div class="detail-attack">
                                <div class="attack-header">
                                    <span>${a.cost.map(c => `[${c}]`).join('')}</span>
                                    <span>${a.name}</span>
                                    <span>${a.damage}</span>
                                </div>
                                <div class="attack-desc">${a.description}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="detail-footer">
                        ${card.weakness ? `Weakness: ${card.weakness} x2` : ''}
                        ${card.resistance ? `Resistance: ${card.resistance} -30` : ''}
                        Retreat: ${card.retreatCost}
                    </div>
                    ${hint}
                </div>
            `;
        } else if (card.cardType === CardType.TRAINER) {
            return `
                <div class="detail-header trainer">
                    <h3>${card.name}</h3>
                    <span>${card.trainerType}</span>
                </div>
                <div class="detail-body">
                    <p>${card.description}</p>
                    ${hint}
                </div>
            `;
        } else {
            return `
                <div class="detail-header ${card.energyType}">
                    <h3>${card.name}</h3>
                </div>
                <div class="detail-body">
                     ${hint}
                </div>
            `;
        }
    }


    showGameOver() {
        if (!this.elements.gameOverScreen) return;

        const isWinner = this.state.winner === 'player';
        this.elements.gameOverMessage.textContent = isWinner ?
            '🏆 Victory! You won the battle!' :
            '💀 Defeat! The CPU won this time!';
        this.elements.gameOverScreen.classList.add('active');


    }



    startNewGame() {
        this.elements.gameOverScreen?.classList.remove('active');
        window.startNewGame();
    }

    // ============================================
    // ROOKIE GUIDE
    // ============================================

    toggleGuidePanel() {
        if (!this.elements.rookieGuide) return;

        if (this.guideEnabled) {
            this.elements.rookieGuide.classList.add('active');
            this.renderGuide();
        } else {
            this.elements.rookieGuide.classList.remove('active');
        }
    }

    renderGuide() {
        if (!this.guideEnabled || !this.elements.guideList) return;

        const isPlayerTurn = this.state.currentTurn === 'player';
        const actions = this.state.actions;

        // Define checklist items
        const checklist = [
            {
                text: "Draw a Card",
                done: actions.hasDrawn || this.state.turnNumber === 1, // Done automatically
                type: 'draw'
            },
            {
                text: "Play Basic Pokémon",
                done: this.state.player.bench.length > 0 && this.state.player.playedThisTurn.length > 0, // Approximate check
                type: 'play'
            },
            {
                text: "Evolve Pokémon",
                done: false, // Hard to track specifically without more flags, leave as general advice
                type: 'evolve'
            },
            {
                text: "Attach Energy",
                done: actions.hasAttachedEnergy,
                type: 'energy'
            },
            {
                text: "Play Trainer Cards",
                done: actions.hasPlayedSupporter, // Tracks supporter at least
                type: 'trainer'
            },
            {
                text: "Retreat Active",
                done: actions.hasRetreated,
                type: 'retreat'
            },
            {
                text: "Attack (Ends Turn)",
                done: false, // If attacked, turn ends, so this is always pending
                type: 'attack'
            }
        ];

        let html = '';
        checklist.forEach(item => {
            const isDone = isPlayerTurn && item.done;
            html += `
                <div class="guide-item ${isDone ? 'done' : ''}">
                    <div class="guide-checkbox"></div>
                    <span>${item.text}</span>
                </div>
            `;
        });

        this.elements.guideList.innerHTML = html;
    }

    // ============================================
    // PLAYER SETUP PROMPTS
    // ============================================

    promptActiveSelection(basics) {
        return new Promise((resolve) => {
            this.showModal("Select Active Pokémon", "");

            const container = document.createElement('div');
            container.className = 'card-selection-container';
            container.style.display = 'flex';
            container.style.gap = '1rem';
            container.style.justifyContent = 'center';
            container.style.flexWrap = 'wrap';

            basics.forEach(card => {
                const cardEl = this.createCardElement(card, 'player', 'hand');
                cardEl.classList.add('selectable');
                cardEl.onclick = () => {
                    this.hideModal();
                    resolve(card.uid);
                };
                container.appendChild(cardEl);
            });

            this.elements.modalContent.appendChild(container);
        });
    }

    promptBenchSelection(basics) {
        return new Promise((resolve) => {
            if (basics.length === 0) {
                resolve([]);
                return;
            }

            this.showModal("Select Bench Pokémon (Optional)", "");

            const container = document.createElement('div');
            container.className = 'card-selection-container';
            container.style.display = 'flex';
            container.style.gap = '1rem';
            container.style.justifyContent = 'center';
            container.style.flexWrap = 'wrap';
            container.style.marginBottom = '2rem';

            const selectedUids = new Set();

            basics.forEach(card => {
                const wrapper = document.createElement('div');
                wrapper.className = 'selection-wrapper';
                wrapper.style.position = 'relative';
                wrapper.style.cursor = 'pointer';

                const cardEl = this.createCardElement(card, 'player', 'hand');
                cardEl.style.transform = 'scale(0.8)';
                cardEl.style.margin = '0';
                cardEl.style.pointerEvents = 'none'; // Allow click to pass to wrapper
                cardEl.style.transition = 'all 0.2s ease';
                cardEl.style.opacity = '0.6'; // Default unselected state

                // Selection indicator
                const indicator = document.createElement('div');
                indicator.className = 'selection-indicator';
                indicator.style.position = 'absolute';
                indicator.style.top = '-10px';
                indicator.style.right = '-10px';
                indicator.style.width = '24px';
                indicator.style.height = '24px';
                indicator.style.borderRadius = '50%';
                indicator.style.background = 'var(--success)';
                indicator.style.color = 'white';
                indicator.style.display = 'flex';
                indicator.style.alignItems = 'center';
                indicator.style.justifyContent = 'center';
                indicator.style.zIndex = '10';
                indicator.innerHTML = '✓';
                indicator.style.opacity = selectedUids.has(card.uid) ? '1' : '0';
                indicator.style.transform = selectedUids.has(card.uid) ? 'scale(1)' : 'scale(0)';
                indicator.style.transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

                // Update styles if already selected (should be empty initially but good practice)
                if (selectedUids.has(card.uid)) {
                    cardEl.style.opacity = '1';
                    cardEl.style.transform = 'scale(0.85)';
                    cardEl.style.boxShadow = '0 0 15px var(--accent-primary)';
                }

                wrapper.onclick = () => {
                    if (selectedUids.has(card.uid)) {
                        // Deselect
                        selectedUids.delete(card.uid);
                        indicator.style.opacity = '0';
                        indicator.style.transform = 'scale(0)';
                        cardEl.style.opacity = '0.6';
                        cardEl.style.transform = 'scale(0.8)';
                        cardEl.style.boxShadow = 'none';
                    } else {
                        // Select
                        if (selectedUids.size >= 5) {
                            this.showToast("Max 5 Bench Pokémon!");
                            return;
                        }
                        selectedUids.add(card.uid);
                        indicator.style.opacity = '1';
                        indicator.style.transform = 'scale(1)';
                        cardEl.style.opacity = '1';
                        cardEl.style.transform = 'scale(0.85)'; // Slight pop
                        cardEl.style.boxShadow = '0 0 15px var(--accent-primary)';
                    }
                };

                wrapper.appendChild(cardEl);
                wrapper.appendChild(indicator);
                container.appendChild(wrapper);
            });

            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'start-btn';
            confirmBtn.style.padding = '0.5rem 2rem';
            confirmBtn.textContent = 'Confirm Bench';
            confirmBtn.onclick = () => {
                this.hideModal();
                resolve(Array.from(selectedUids));
            };

            this.elements.modalContent.appendChild(container);
            this.elements.modalContent.appendChild(confirmBtn);
        });
    }

    showModal(title, content) {
        if (!this.elements.modal) return;
        this.elements.modalTitle.textContent = title;
        if (typeof content === 'string') {
            this.elements.modalContent.innerHTML = content;
        } else {
            this.elements.modalContent.innerHTML = '';
            this.elements.modalContent.appendChild(content);
        }
        this.elements.modal.classList.add('active');
    }

    hideModal() {
        if (!this.elements.modal) return;
        this.elements.modal.classList.remove('active');
    }
}

// Global log update function
window.updateGameLog = function (entry) {
    if (window.gameUI) {
        window.gameUI.addLogEntry(entry);
    }
};

// Make globally available
window.GameUI = GameUI;
