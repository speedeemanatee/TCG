// Pokemon TCG - Core Game Engine

class GameEngine {
    constructor(gameState) {
        this.state = gameState;
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    flipCoin() {
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        this.state.log(`Coin flip: ${result}!`);
        return result === 'heads';
    }

    // ============================================
    // SETUP PHASE
    // ============================================

    setupGame(playerDeckType = 'fire', cpuDeckType = 'water') {
        this.state.reset();

        // Create decks based on selection
        const deckCreators = {
            'fire': createFireDeck,
            'water': createWaterDeck,
            'grass': createGrassDeck,
            'electric': createElectricDeck
        };

        const playerDeckCreator = deckCreators[playerDeckType] || createFireDeck;
        const cpuDeckCreator = deckCreators[cpuDeckType] || createWaterDeck;

        this.state.player.deck = this.shuffleDeck(playerDeckCreator());
        this.state.cpu.deck = this.shuffleDeck(cpuDeckCreator());

        this.state.log(`Decks initialized: Player (${playerDeckType}), CPU (${cpuDeckType})`);

        // Draw initial hands
        this.drawInitialHands();

        // Check for mulligans and set up active/bench
        this.handleMulligans();

        // Set prize cards
        this.setupPrizeCards();

        // Determine who goes first (coin flip)
        const playerFirst = this.flipCoin();
        this.state.currentTurn = playerFirst ? 'player' : 'cpu';
        this.state.log(`${playerFirst ? 'You go' : 'CPU goes'} first!`);

        // Start first turn
        this.state.phase = 'main'; // First turn skips draw

        return true;
    }

    drawInitialHands() {
        // Draw 7 cards each
        for (let i = 0; i < 7; i++) {
            this.drawCard('player', false);
            this.drawCard('cpu', false);
        }
        this.state.log('Both players drew their starting hands.');
    }

    handleMulligans() {
        let playerMulligans = 0;
        let cpuMulligans = 0;

        // Check for basic Pokemon
        while (!this.hasBasicPokemon(this.state.player.hand)) {
            this.state.log('You have no Basic Pokemon! Mulligan!');
            playerMulligans++;

            // Return hand to deck and reshuffle
            this.state.player.deck.push(...this.state.player.hand);
            this.state.player.hand = [];
            this.shuffleDeck(this.state.player.deck);

            for (let i = 0; i < 7; i++) {
                this.drawCard('player', false);
            }
        }

        while (!this.hasBasicPokemon(this.state.cpu.hand)) {
            this.state.log('CPU has no Basic Pokemon! Mulligan!');
            cpuMulligans++;

            this.state.cpu.deck.push(...this.state.cpu.hand);
            this.state.cpu.hand = [];
            this.shuffleDeck(this.state.cpu.deck);

            for (let i = 0; i < 7; i++) {
                this.drawCard('cpu', false);
            }
        }

        // Opponent draws for each mulligan
        for (let i = 0; i < playerMulligans; i++) {
            this.drawCard('cpu', false);
            this.state.log('CPU draws a card for your mulligan.');
        }
        for (let i = 0; i < cpuMulligans; i++) {
            this.drawCard('player', false);
            this.state.log('You draw a card for CPU mulligan.');
        }
    }

    hasBasicPokemon(hand) {
        return hand.some(card =>
            card.cardType === CardType.POKEMON &&
            card.stage === Stage.BASIC
        );
    }

    setupPrizeCards() {
        // Set 6 prize cards for each player
        for (let i = 0; i < 6; i++) {
            if (this.state.player.deck.length > 0) {
                this.state.player.prizeCards.push(this.state.player.deck.pop());
            }
            if (this.state.cpu.deck.length > 0) {
                this.state.cpu.prizeCards.push(this.state.cpu.deck.pop());
            }
        }
        this.state.log('Prize cards set!');
    }

    // ============================================
    // DRAW PHASE
    // ============================================

    drawCard(who, logIt = true) {
        const player = this.state.getPlayerState(who);

        if (player.deck.length === 0) {
            // Check win condition - can't draw
            this.state.gameOver = true;
            this.state.winner = who === 'player' ? 'cpu' : 'player';
            this.state.log(`${who === 'player' ? 'You' : 'CPU'} cannot draw a card! Game Over!`);
            return null;
        }

        const card = player.deck.pop();
        player.hand.push(card);

        if (logIt) {
            if (who === 'player') {
                this.state.log(`You drew ${card.name}!`);
            } else {
                this.state.log('CPU drew a card.');
            }
        }

        return card;
    }

    startTurn() {
        const who = this.state.currentTurn;
        const player = this.state.getCurrentPlayer();

        // Draw phase (except first turn of game)
        if (!(this.state.turnNumber === 1 && player.isFirstTurn)) {
            this.state.phase = 'draw';
            const card = this.drawCard(who);
            if (!card) return false; // Game over - can't draw
        }

        this.state.phase = 'main';
        return true;
    }

    // ============================================
    // MAIN PHASE ACTIONS
    // ============================================

    // Play a Basic Pokemon from hand to bench
    playBasicToBench(who, cardUid) {
        const player = this.state.getPlayerState(who);

        // Find card in hand
        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) {
            this.state.log('Card not found in hand!');
            return false;
        }

        const card = player.hand[cardIndex];

        // Validate it's a basic Pokemon
        if (card.cardType !== CardType.POKEMON || card.stage !== Stage.BASIC) {
            this.state.log('Can only play Basic Pokemon to bench!');
            return false;
        }

        // Check bench space
        if (player.bench.length >= 5) {
            this.state.log('Bench is full!');
            return false;
        }

        // Play to bench
        player.hand.splice(cardIndex, 1);
        const activePokemon = new ActivePokemon(card, who);
        player.bench.push(activePokemon);
        player.playedThisTurn.push(card.uid);

        this.state.log(`${who === 'player' ? 'You' : 'CPU'} played ${card.name} to the bench!`);
        return true;
    }

    // Set active Pokemon from bench (for setup or when active is knocked out)
    setActiveFromBench(who, benchIndex) {
        const player = this.state.getPlayerState(who);

        if (benchIndex < 0 || benchIndex >= player.bench.length) {
            this.state.log('Invalid bench position!');
            return false;
        }

        const pokemon = player.bench.splice(benchIndex, 1)[0];
        player.active = pokemon;

        this.state.log(`${who === 'player' ? 'You' : 'CPU'} set ${pokemon.card.name} as Active Pokemon!`);
        return true;
    }

    // Set active Pokemon directly from hand (setup only)
    setActiveFromHand(who, cardUid) {
        const player = this.state.getPlayerState(who);

        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) return false;

        const card = player.hand[cardIndex];
        if (card.cardType !== CardType.POKEMON || card.stage !== Stage.BASIC) {
            return false;
        }

        player.hand.splice(cardIndex, 1);
        player.active = new ActivePokemon(card, who);
        player.playedThisTurn.push(card.uid);

        this.state.log(`${who === 'player' ? 'You' : 'CPU'} set ${card.name} as Active Pokemon!`);
        return true;
    }

    // Attach energy to a Pokemon
    attachEnergy(who, energyCardUid, targetPokemon) {
        const player = this.state.getPlayerState(who);

        if (this.state.actions.hasAttachedEnergy) {
            this.state.log('Already attached energy this turn!');
            return false;
        }

        // Find energy in hand
        const energyIndex = player.hand.findIndex(c => c.uid === energyCardUid);
        if (energyIndex === -1) {
            this.state.log('Energy card not found!');
            return false;
        }

        const energy = player.hand[energyIndex];
        if (energy.cardType !== CardType.ENERGY) {
            this.state.log('That\'s not an energy card!');
            return false;
        }

        // Remove from hand and attach
        player.hand.splice(energyIndex, 1);
        targetPokemon.attachEnergy(energy);
        this.state.actions.hasAttachedEnergy = true;

        this.state.log(`${who === 'player' ? 'You' : 'CPU'} attached ${energy.name} to ${targetPokemon.card.name}!`);
        return true;
    }

    // Evolve a Pokemon
    evolvePokemon(who, handCardUid, targetPokemon) {
        const player = this.state.getPlayerState(who);

        // Can't evolve on first turn
        if (player.isFirstTurn) {
            this.state.log("Can't evolve on your first turn!");
            return false;
        }

        // Find evolution card in hand
        const cardIndex = player.hand.findIndex(c => c.uid === handCardUid);
        if (cardIndex === -1) return false;

        const evolutionCard = player.hand[cardIndex];

        // Validate it's an evolution
        if (evolutionCard.cardType !== CardType.POKEMON) return false;
        if (evolutionCard.evolvesFrom !== targetPokemon.card.id) {
            this.state.log(`${evolutionCard.name} doesn't evolve from ${targetPokemon.card.name}!`);
            return false;
        }

        // Can't evolve Pokemon played this turn
        if (player.playedThisTurn.includes(targetPokemon.card.uid)) {
            this.state.log("Can't evolve a Pokemon that was just played!");
            return false;
        }

        // Perform evolution
        player.hand.splice(cardIndex, 1);
        targetPokemon.evolveTo(evolutionCard);
        player.playedThisTurn.push(evolutionCard.uid);

        this.state.log(`${targetPokemon.previousStages[targetPokemon.previousStages.length - 1].name} evolved into ${evolutionCard.name}!`);
        return true;
    }

    // Retreat active Pokemon
    retreat(who, benchIndex) {
        const player = this.state.getPlayerState(who);

        if (this.state.actions.hasRetreated) {
            this.state.log('Already retreated this turn!');
            return false;
        }

        if (!player.active) {
            this.state.log('No active Pokemon!');
            return false;
        }

        if (player.bench.length === 0) {
            this.state.log('No Pokemon on bench to switch to!');
            return false;
        }

        if (player.active.statusCondition === StatusCondition.ASLEEP ||
            player.active.statusCondition === StatusCondition.PARALYZED) {
            this.state.log(`${player.active.card.name} can't retreat while ${player.active.statusCondition}!`);
            return false;
        }

        // Check retreat cost
        const retreatCost = player.active.card.retreatCost;
        if (player.active.attachedEnergy.length < retreatCost) {
            this.state.log('Not enough energy to retreat!');
            return false;
        }

        // Discard energy for retreat
        const discarded = [];
        for (let i = 0; i < retreatCost; i++) {
            const removed = player.active.attachedEnergy.shift();
            discarded.push(removed);
            player.discardPile.push(removed);
        }

        // Swap Pokemon
        const oldActive = player.active;
        player.active = player.bench.splice(benchIndex, 1)[0];
        player.bench.push(oldActive);

        this.state.actions.hasRetreated = true;
        this.state.log(`${oldActive.card.name} retreated! ${player.active.card.name} is now active!`);
        return true;
    }

    // ============================================
    // TRAINER CARDS
    // ============================================

    playTrainer(who, cardUid, target = null) {
        const player = this.state.getPlayerState(who);
        const opponent = who === 'player' ? this.state.cpu : this.state.player;

        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) return false;

        const card = player.hand[cardIndex];
        if (card.cardType !== CardType.TRAINER) return false;

        // Check supporter limit
        if (card.trainerType === TrainerType.SUPPORTER && this.state.actions.hasPlayedSupporter) {
            this.state.log('Already played a Supporter this turn!');
            return false;
        }

        // Execute effect
        let success = true;
        switch (card.effect) {
            case 'heal':
                if (target && target.damage > 0) {
                    target.heal(card.healAmount);
                    this.state.log(`${target.card.name} was healed for ${card.healAmount} HP!`);
                } else {
                    success = false;
                }
                break;

            case 'switch':
                // Need to let player choose bench Pokemon
                if (player.bench.length > 0) {
                    // This will be handled by UI - for now just flag success
                    success = true;
                } else {
                    success = false;
                }
                break;

            case 'discardAndDraw':
                // Professor's Research
                player.discardPile.push(...player.hand.filter(c => c.uid !== cardUid));
                player.hand = [];
                for (let i = 0; i < card.drawAmount; i++) {
                    this.drawCard(who, false);
                }
                this.state.log(`${who === 'player' ? 'You' : 'CPU'} discarded hand and drew ${card.drawAmount} cards!`);
                break;

            case 'searchPokemon':
                // Poke Ball - flip coin
                if (this.flipCoin()) {
                    const basicIndex = player.deck.findIndex(c =>
                        c.cardType === CardType.POKEMON && c.stage === Stage.BASIC
                    );
                    if (basicIndex !== -1) {
                        const found = player.deck.splice(basicIndex, 1)[0];
                        player.hand.push(found);
                        this.shuffleDeck(player.deck);
                        this.state.log(`Found ${found.name} and added to hand!`);
                    } else {
                        this.state.log('No Basic Pokemon in deck!');
                    }
                } else {
                    this.state.log('Poke Ball failed - tails!');
                }
                break;

            case 'retrieveEnergy':
                const energyCards = player.discardPile.filter(c => c.cardType === CardType.ENERGY);
                const toRetrieve = energyCards.slice(0, card.retrieveAmount);
                for (const energy of toRetrieve) {
                    const idx = player.discardPile.findIndex(c => c.uid === energy.uid);
                    if (idx !== -1) {
                        player.discardPile.splice(idx, 1);
                        player.hand.push(energy);
                    }
                }
                this.state.log(`Retrieved ${toRetrieve.length} energy from discard pile!`);
                break;

            case 'superHeal':
                if (target && target.damage > 0 && target.attachedEnergy.length >= card.discardEnergy) {
                    const removed = target.removeEnergy(PokemonType.COLORLESS, card.discardEnergy);
                    player.discardPile.push(...removed);
                    target.heal(card.healAmount);
                    this.state.log(`${target.card.name} was healed for ${card.healAmount} HP!`);
                } else {
                    success = false;
                }
                break;

            case 'shuffleAndDraw':
                // Marnie
                player.deck.push(...player.hand.filter(c => c.uid !== cardUid));
                player.hand = [];
                opponent.deck.push(...opponent.hand);
                opponent.hand = [];
                this.shuffleDeck(player.deck);
                this.shuffleDeck(opponent.deck);

                for (let i = 0; i < card.drawAmount; i++) {
                    this.drawCard(who, false);
                }
                for (let i = 0; i < card.opponentDraw; i++) {
                    this.drawCard(who === 'player' ? 'cpu' : 'player', false);
                }
                this.state.log(`Marnie shuffled hands! Drew ${card.drawAmount}, opponent drew ${card.opponentDraw}!`);
                break;

            case 'gust':
                // Boss's Orders - need to select opponent's bench
                if (opponent.bench.length > 0) {
                    success = true;
                } else {
                    success = false;
                }
                break;

            default:
                success = false;
        }

        if (success) {
            player.hand.splice(cardIndex, 1);
            player.discardPile.push(card);

            if (card.trainerType === TrainerType.SUPPORTER) {
                this.state.actions.hasPlayedSupporter = true;
            }
        }

        return success;
    }

    // ============================================
    // ATTACK PHASE
    // ============================================

    attack(who, attackIndex) {
        const player = this.state.getPlayerState(who);
        const opponent = who === 'player' ? this.state.cpu : this.state.player;

        if (!player.active) {
            this.state.log('No active Pokemon!');
            return false;
        }

        const active = player.active;
        const attack = active.card.attacks[attackIndex];

        if (!attack) {
            this.state.log('Invalid attack!');
            return false;
        }

        // Check if can use attack
        if (!active.canUseAttack(attack)) {
            this.state.log(`Not enough energy for ${attack.name}!`);
            return false;
        }

        // Check confusion
        if (active.statusCondition === StatusCondition.CONFUSED) {
            this.state.log(`${active.card.name} is confused!`);
            if (!this.flipCoin()) {
                this.state.log(`${active.card.name} hurt itself in confusion!`);
                active.takeDamage(30);
                this.state.phase = 'between-turns';
                return true;
            }
        }

        // Check smokescreen
        if (active.smokescreened) {
            this.state.log('Opponent used Smokescreen last turn!');
            if (!this.flipCoin()) {
                this.state.log('Attack failed due to Smokescreen!');
                this.state.phase = 'between-turns';
                return true;
            }
        }

        // Perform attack
        this.state.log(`${active.card.name} uses ${attack.name}!`);

        let damage = attack.damage;

        // Process attack effects
        if (attack.effect) {
            damage = this.processAttackEffect(attack, active, opponent, damage);
        }

        // Check invulnerability
        if (opponent.active && opponent.active.isInvulnerable) {
            this.state.log(`${opponent.active.card.name} is protected!`);
            damage = 0;
        }

        // Apply weakness/resistance (unless swift)
        if (opponent.active && attack.effect !== 'swift') {
            // Weakness
            if (opponent.active.card.weakness === active.card.pokemonType) {
                damage *= 2;
                this.state.log('It\'s super effective! (Weakness x2)');
            }

            // Resistance
            if (opponent.active.card.resistance === active.card.pokemonType) {
                damage -= 30;
                this.state.log('It\'s not very effective... (Resistance -30)');
            }
        }

        // Deal damage
        if (opponent.active && damage > 0) {
            const knocked = opponent.active.takeDamage(damage);
            this.state.log(`${opponent.active.card.name} takes ${damage} damage!`);

            if (knocked) {
                this.handleKnockout(opponent, who);
            }
        }

        this.state.phase = 'between-turns';
        return true;
    }

    processAttackEffect(attack, attacker, opponent, baseDamage) {
        let damage = baseDamage;

        switch (attack.effect) {
            case 'discardEnergy':
                const removed = attacker.removeEnergy(attack.effectType, attack.effectAmount);
                const player = this.state.getPlayerState(attacker.owner);
                player.discardPile.push(...removed);
                this.state.log(`Discarded ${attack.effectAmount} ${attack.effectType} energy.`);
                break;

            case 'coinFlipBonus':
                if (this.flipCoin()) {
                    damage += attack.bonusDamage;
                    this.state.log(`Bonus damage: +${attack.bonusDamage}!`);
                }
                break;

            case 'coinFlipParalyze':
                if (this.flipCoin() && opponent.active) {
                    opponent.active.applyStatus(StatusCondition.PARALYZED);
                    this.state.log(`${opponent.active.card.name} is Paralyzed!`);
                }
                break;

            case 'coinFlipConfuse':
                if (this.flipCoin() && opponent.active) {
                    opponent.active.applyStatus(StatusCondition.CONFUSED);
                    this.state.log(`${opponent.active.card.name} is Confused!`);
                }
                break;

            case 'coinFlipInvulnerable':
                if (this.flipCoin()) {
                    attacker.isInvulnerable = true;
                    this.state.log(`${attacker.card.name} is protected next turn!`);
                }
                break;

            case 'smokescreen':
                if (opponent.active) {
                    opponent.active.smokescreened = true;
                }
                break;

            case 'multiCoinFlip':
                let heads = 0;
                for (let i = 0; i < attack.flipCount; i++) {
                    if (this.flipCoin()) heads++;
                }
                damage = attack.damage * heads;
                this.state.log(`${heads} heads! Total damage: ${damage}`);
                break;

            case 'benchDamage':
                for (const benched of opponent.bench) {
                    benched.takeDamage(attack.benchDamage);
                    this.state.log(`${benched.card.name} takes ${attack.benchDamage} bench damage!`);
                }
                break;

            case 'selfDamage':
                attacker.takeDamage(attack.selfDamage);
                this.state.log(`${attacker.card.name} takes ${attack.selfDamage} recoil damage!`);
                break;

            case 'blockTrainers':
                this.state.turnEffects[opponent.active ? opponent.active.owner : 'cpu'].cannotPlayTrainers = true;
                break;

            case 'swift':
                // Damage is unaffected by weakness/resistance (handled in attack())
                break;
        }

        return damage;
    }

    handleKnockout(losingPlayer, winningPlayerWho) {
        this.state.log(`${losingPlayer.active.card.name} was knocked out!`);

        const winner = this.state.getPlayerState(winningPlayerWho);

        // Move knocked out Pokemon to discard
        losingPlayer.discardPile.push(losingPlayer.active.card);
        losingPlayer.discardPile.push(...losingPlayer.active.attachedEnergy);
        losingPlayer.discardPile.push(...losingPlayer.active.previousStages);
        losingPlayer.active = null;

        // Winner takes a prize
        if (winner.prizeCards.length > 0) {
            const prize = winner.prizeCards.pop();
            winner.hand.push(prize);
            this.state.log(`${winningPlayerWho === 'player' ? 'You' : 'CPU'} took a prize card!`);
        }

        // Check win condition
        if (winner.prizeCards.length === 0) {
            this.state.gameOver = true;
            this.state.winner = winningPlayerWho;
            this.state.phase = 'gameover';
            this.state.log(`${winningPlayerWho === 'player' ? 'You' : 'CPU'} took all prize cards! Game Over!`);
            return;
        }

        // Check if loser has no Pokemon
        if (losingPlayer.bench.length === 0) {
            this.state.gameOver = true;
            this.state.winner = winningPlayerWho;
            this.state.phase = 'gameover';
            this.state.log(`${losingPlayer.owner === 'player' ? 'You have' : 'CPU has'} no Pokemon left! Game Over!`);
        }
    }

    // ============================================
    // BETWEEN TURNS
    // ============================================

    processBetweenTurns() {
        // Check both active Pokemon for status effects
        if (this.state.player.active) {
            const knocked = this.state.player.active.processBetweenTurns();
            if (knocked) {
                this.handleKnockout(this.state.player, 'cpu');
            }
        }

        if (this.state.cpu.active) {
            const knocked = this.state.cpu.active.processBetweenTurns();
            if (knocked) {
                this.handleKnockout(this.state.cpu, 'player');
            }
        }

        if (!this.state.gameOver) {
            this.state.switchTurn();
        }
    }

    // ============================================
    // TURN MANAGEMENT
    // ============================================

    endTurn() {
        this.processBetweenTurns();
    }

    // Check if game is over
    checkGameOver() {
        return this.state.gameOver;
    }

    // Get available actions for current player
    getAvailableActions(who) {
        const player = this.state.getPlayerState(who);
        const actions = [];

        // Basic Pokemon to bench
        const basicPokemon = player.hand.filter(c =>
            c.cardType === CardType.POKEMON && c.stage === Stage.BASIC
        );
        if (basicPokemon.length > 0 && player.bench.length < 5) {
            actions.push({ type: 'playBasic', cards: basicPokemon });
        }

        // Attach energy
        if (!this.state.actions.hasAttachedEnergy) {
            const energyCards = player.hand.filter(c => c.cardType === CardType.ENERGY);
            if (energyCards.length > 0 && (player.active || player.bench.length > 0)) {
                actions.push({ type: 'attachEnergy', cards: energyCards });
            }
        }

        // Evolution
        const evolutionCards = player.hand.filter(c =>
            c.cardType === CardType.POKEMON && c.evolvesFrom
        );
        for (const evo of evolutionCards) {
            // Check if we have the pre-evolution
            const targets = [];
            if (player.active && player.active.card.id === evo.evolvesFrom &&
                !player.playedThisTurn.includes(player.active.card.uid)) {
                targets.push(player.active);
            }
            for (const benched of player.bench) {
                if (benched.card.id === evo.evolvesFrom &&
                    !player.playedThisTurn.includes(benched.card.uid)) {
                    targets.push(benched);
                }
            }
            if (targets.length > 0) {
                actions.push({ type: 'evolve', card: evo, targets: targets });
            }
        }

        // Trainer cards
        const trainerCards = player.hand.filter(c => c.cardType === CardType.TRAINER);
        for (const trainer of trainerCards) {
            if (trainer.trainerType === TrainerType.SUPPORTER && this.state.actions.hasPlayedSupporter) {
                continue;
            }
            actions.push({ type: 'playTrainer', card: trainer });
        }

        // Retreat
        if (!this.state.actions.hasRetreated && player.active && player.bench.length > 0) {
            if (player.active.attachedEnergy.length >= player.active.card.retreatCost) {
                actions.push({ type: 'retreat' });
            }
        }

        // Attack
        if (player.active) {
            const usableAttacks = player.active.getUsableAttacks();
            if (usableAttacks.length > 0) {
                actions.push({ type: 'attack', attacks: usableAttacks });
            }
        }

        // End turn
        actions.push({ type: 'endTurn' });

        return actions;
    }
}

// Make globally available
window.GameEngine = GameEngine;
