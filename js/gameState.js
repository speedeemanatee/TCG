// Pokemon TCG - Game State Management

class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        // Players
        this.player = this.createPlayerState('player');
        this.cpu = this.createPlayerState('cpu');

        // Turn management
        this.currentTurn = null; // 'player' or 'cpu'
        this.turnNumber = 1;
        this.phase = 'setup'; // 'setup', 'draw', 'main', 'attack', 'between-turns', 'gameover'

        // Action flags for current turn
        this.actions = {
            hasDrawn: false,
            hasAttachedEnergy: false,
            hasPlayedSupporter: false,
            hasRetreated: false
        };

        // Game state flags
        this.gameOver = false;
        this.winner = null;
        this.gameLog = [];

        // Turn-based effects
        this.turnEffects = {
            player: {},
            cpu: {}
        };
    }

    createPlayerState(owner) {
        return {
            owner: owner,
            deck: [],
            hand: [],
            discardPile: [],
            prizeCards: [],
            active: null,
            bench: [], // Max 5

            // Track cards that can't evolve this turn
            playedThisTurn: [],

            // Track if this is first turn
            isFirstTurn: true
        };
    }

    // Get the current player's state
    getCurrentPlayer() {
        return this.currentTurn === 'player' ? this.player : this.cpu;
    }

    // Get the opponent's state
    getOpponent() {
        return this.currentTurn === 'player' ? this.cpu : this.player;
    }

    // Get specific player state
    getPlayerState(who) {
        return who === 'player' ? this.player : this.cpu;
    }

    // Add to game log
    log(message) {
        const entry = {
            turn: this.turnNumber,
            phase: this.phase,
            message: message,
            timestamp: Date.now()
        };
        this.gameLog.push(entry);
        console.log(`[Turn ${this.turnNumber}] ${message}`);

        // Trigger UI update
        if (window.updateGameLog) {
            window.updateGameLog(entry);
        }
    }

    // Reset turn action flags
    resetTurnActions() {
        this.actions = {
            hasDrawn: false,
            hasAttachedEnergy: false,
            hasPlayedSupporter: false,
            hasRetreated: false
        };
    }

    // Switch turns
    switchTurn() {
        // Clear played this turn for current player
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.playedThisTurn = [];
        currentPlayer.isFirstTurn = false;

        // Switch
        this.currentTurn = this.currentTurn === 'player' ? 'cpu' : 'player';

        if (this.currentTurn === 'player') {
            this.turnNumber++;
        }

        this.resetTurnActions();
        this.phase = 'draw';

        // Clear turn effects
        this.turnEffects[this.currentTurn] = {};

        this.log(`${this.currentTurn === 'player' ? 'Your' : "CPU's"} turn begins.`);
    }

    // Serialize for saving/debugging
    serialize() {
        return JSON.stringify({
            player: this.player,
            cpu: this.cpu,
            currentTurn: this.currentTurn,
            turnNumber: this.turnNumber,
            phase: this.phase,
            actions: this.actions,
            gameOver: this.gameOver,
            winner: this.winner
        }, null, 2);
    }
}

// Pokemon instance on the field
class ActivePokemon {
    constructor(card, owner) {
        this.card = card;
        this.owner = owner;
        this.currentHP = card.hp;
        this.maxHP = card.hp;
        this.attachedEnergy = [];
        this.damageCounters = 0;
        this.statusCondition = StatusCondition.NONE;
        this.statusTurns = 0; // For paralyzed (clears after 1 turn)

        // Evolution chain
        this.previousStages = []; // Cards this evolved from

        // Special flags
        this.canRetreat = true;
        this.isInvulnerable = false; // From Agility
        this.smokescreened = false;
    }

    // Calculate total damage taken
    get damage() {
        return this.maxHP - this.currentHP;
    }

    // Check if knocked out
    get isKnockedOut() {
        return this.currentHP <= 0;
    }

    // Take damage
    takeDamage(amount) {
        this.currentHP = Math.max(0, this.currentHP - amount);
        return this.isKnockedOut;
    }

    // Heal damage
    heal(amount) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
    }

    // Attach energy
    attachEnergy(energyCard) {
        this.attachedEnergy.push(energyCard);
    }

    // Remove energy
    removeEnergy(energyType, count = 1) {
        let removed = [];
        for (let i = 0; i < count; i++) {
            const index = this.attachedEnergy.findIndex(e =>
                e.energyType === energyType || energyType === PokemonType.COLORLESS
            );
            if (index !== -1) {
                removed.push(this.attachedEnergy.splice(index, 1)[0]);
            }
        }
        return removed;
    }

    // Count energy of a specific type
    countEnergy(energyType) {
        if (energyType === PokemonType.COLORLESS) {
            return this.attachedEnergy.length;
        }
        return this.attachedEnergy.filter(e => e.energyType === energyType).length;
    }

    // Check if can use attack
    canUseAttack(attack) {
        // Check status
        if (this.statusCondition === StatusCondition.ASLEEP) return false;
        if (this.statusCondition === StatusCondition.PARALYZED) return false;

        // Check energy requirements
        const energyCounts = {};
        for (const energy of this.attachedEnergy) {
            energyCounts[energy.energyType] = (energyCounts[energy.energyType] || 0) + 1;
        }

        let colorlessNeeded = 0;
        for (const required of attack.cost) {
            if (required === PokemonType.COLORLESS) {
                colorlessNeeded++;
            } else {
                if (!energyCounts[required] || energyCounts[required] <= 0) {
                    return false;
                }
                energyCounts[required]--;
            }
        }

        // Check colorless with remaining energy
        const totalRemaining = Object.values(energyCounts).reduce((a, b) => a + b, 0);
        return totalRemaining >= colorlessNeeded;
    }

    // Get usable attacks
    getUsableAttacks() {
        return this.card.attacks.filter(attack => this.canUseAttack(attack));
    }

    // Evolve into a new Pokemon
    evolveTo(evolutionCard) {
        // Store current stage
        this.previousStages.push(this.card);

        // Update to new card
        this.card = evolutionCard;

        // Increase HP (keep damage)
        const currentDamage = this.damage;
        this.maxHP = evolutionCard.hp;
        this.currentHP = Math.max(1, this.maxHP - currentDamage);

        // Clear status conditions
        this.statusCondition = StatusCondition.NONE;
        this.statusTurns = 0;
        this.isInvulnerable = false;
        this.smokescreened = false;
    }

    // Apply status condition
    applyStatus(status) {
        // Can't stack statuses (except poison+burn)
        if (status === StatusCondition.POISONED || status === StatusCondition.BURNED) {
            // These can coexist but not duplicate
            this.statusCondition = status;
        } else {
            // Others replace
            this.statusCondition = status;
        }
        this.statusTurns = 0;
    }

    // Process between-turns effects
    processBetweenTurns() {
        let knockedOut = false;

        // Poison damage
        if (this.statusCondition === StatusCondition.POISONED) {
            knockedOut = this.takeDamage(10);
            if (window.gameState) {
                window.gameState.log(`${this.card.name} takes 10 poison damage!`);
            }
        }

        // Burn damage + coin flip
        if (this.statusCondition === StatusCondition.BURNED) {
            const headsForBurn = Math.random() < 0.5; // Flip coin
            if (!headsForBurn) {
                knockedOut = this.takeDamage(20);
                if (window.gameState) {
                    window.gameState.log(`${this.card.name} takes 20 burn damage!`);
                }
            } else {
                if (window.gameState) {
                    window.gameState.log(`${this.card.name} flips heads and avoids burn damage!`);
                }
            }
        }

        // Paralyzed clears
        if (this.statusCondition === StatusCondition.PARALYZED) {
            this.statusTurns++;
            if (this.statusTurns >= 1) {
                this.statusCondition = StatusCondition.NONE;
                if (window.gameState) {
                    window.gameState.log(`${this.card.name} is no longer Paralyzed!`);
                }
            }
        }

        // Asleep - flip to wake up
        if (this.statusCondition === StatusCondition.ASLEEP) {
            const wakeUp = Math.random() < 0.5;
            if (wakeUp) {
                this.statusCondition = StatusCondition.NONE;
                if (window.gameState) {
                    window.gameState.log(`${this.card.name} wakes up!`);
                }
            } else {
                if (window.gameState) {
                    window.gameState.log(`${this.card.name} is still Asleep!`);
                }
            }
        }

        // Clear temporary effects
        this.isInvulnerable = false;
        this.smokescreened = false;

        return knockedOut;
    }
}

// Make globally available
window.GameState = GameState;
window.ActivePokemon = ActivePokemon;
