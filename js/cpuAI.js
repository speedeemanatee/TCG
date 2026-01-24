// Pokemon TCG - CPU AI Logic

class CPUAI {
    constructor(gameState, gameEngine) {
        this.state = gameState;
        this.engine = gameEngine;
        this.thinkingDelay = 800; // ms delay between actions for visibility
        this.difficulty = 0.6; // 0.0 to 1.0 (1.0 is most optimal)
    }

    // Main AI turn execution
    async executeTurn() {
        const cpu = this.state.cpu;

        // Short delay for player to see it's CPU's turn
        await this.delay(500);

        // Setup phase - choose active and bench
        if (!cpu.active && cpu.hand.length > 0) {
            await this.chooseActivePokemon();
        }

        // Main phase
        this.state.phase = 'main';
        await this.performActions();

        // Attack phase
        const attackIndex = await this.performAttack();

        // Return attack choice to UI for animation handling
        // logic for actual execution will happen in UI or be called here if UI didn't handle it?
        // Actually, to keep it simple: return the plan. UI will interpret.

        if (typeof attackIndex === 'number') {
            return { action: 'attack', index: attackIndex };
        }

        // End turn if no attack (or after attack logic elsewhere)
        if (!this.state.gameOver) {
            this.engine.endTurn();
        }

        return { action: 'end' };
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // SETUP DECISIONS
    // ============================================

    async chooseActivePokemon() {
        const cpu = this.state.cpu;
        const basics = cpu.hand.filter(c =>
            c.cardType === CardType.POKEMON && c.stage === Stage.BASIC
        );

        if (basics.length === 0) return;

        // Sort by HP (prefer higher HP for active)
        basics.sort((a, b) => b.hp - a.hp);

        // Set best basic as active
        await this.delay(this.thinkingDelay);
        this.engine.setActiveFromHand('cpu', basics[0].uid);

        // Put others on bench
        for (let i = 1; i < basics.length && i <= 5; i++) {
            await this.delay(300);
            this.engine.playBasicToBench('cpu', basics[i].uid);
        }
    }

    // ============================================
    // MAIN PHASE AI
    // ============================================

    async performActions() {
        const cpu = this.state.cpu;
        let actionsRemaining = true;
        let actionCount = 0;
        const maxActions = 20; // Safety limit

        while (actionsRemaining && actionCount < maxActions && !this.state.gameOver) {
            actionCount++;
            actionsRemaining = false;

            // Priority 1: Play Basic Pokemon to bench
            if (await this.tryPlayBasicToBench()) {
                actionsRemaining = true;
                continue;
            }

            // Priority 2: Evolve Pokemon
            if (await this.tryEvolve()) {
                actionsRemaining = true;
                continue;
            }

            // Priority 3: Attach energy
            if (await this.tryAttachEnergy()) {
                actionsRemaining = true;
                continue;
            }

            // Priority 4: Use beneficial trainer cards
            if (await this.tryPlayTrainer()) {
                actionsRemaining = true;
                continue;
            }

            // Priority 5: Consider retreat if needed
            if (await this.tryRetreat()) {
                actionsRemaining = true;
                continue;
            }
        }
    }

    async tryPlayBasicToBench() {
        const cpu = this.state.cpu;

        if (cpu.bench.length >= 5) return false;

        const basics = cpu.hand.filter(c =>
            c.cardType === CardType.POKEMON && c.stage === Stage.BASIC
        );

        if (basics.length === 0) return false;

        // Play one basic to bench
        await this.delay(this.thinkingDelay);
        return this.engine.playBasicToBench('cpu', basics[0].uid);
    }

    async tryEvolve() {
        const cpu = this.state.cpu;

        // Can't evolve on first turn
        if (cpu.isFirstTurn) return false;

        const evolutions = cpu.hand.filter(c =>
            c.cardType === CardType.POKEMON && c.evolvesFrom
        );

        for (const evo of evolutions) {
            // Check active
            if (cpu.active &&
                cpu.active.card.id === evo.evolvesFrom &&
                !cpu.playedThisTurn.includes(cpu.active.card.uid)) {
                await this.delay(this.thinkingDelay);
                if (this.engine.evolvePokemon('cpu', evo.uid, cpu.active)) {
                    return true;
                }
            }

            // Check bench
            for (const benched of cpu.bench) {
                if (benched.card.id === evo.evolvesFrom &&
                    !cpu.playedThisTurn.includes(benched.card.uid)) {
                    await this.delay(this.thinkingDelay);
                    if (this.engine.evolvePokemon('cpu', evo.uid, benched)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    async tryAttachEnergy() {
        if (this.state.actions.hasAttachedEnergy) return false;

        const cpu = this.state.cpu;
        const energyCards = cpu.hand.filter(c => c.cardType === CardType.ENERGY);

        if (energyCards.length === 0) return false;

        // Prefer attaching to active Pokemon, especially if it can attack
        let bestTarget = null;
        let bestScore = -1;

        // Evaluate active
        if (cpu.active) {
            const score = this.evaluateEnergyTarget(cpu.active, energyCards[0]);
            if (score > bestScore) {
                bestScore = score;
                bestTarget = cpu.active;
            }
        }

        // Evaluate bench
        for (const benched of cpu.bench) {
            const score = this.evaluateEnergyTarget(benched, energyCards[0]);
            if (score > bestScore) {
                bestScore = score;
                bestTarget = benched;
            }
        }

        if (bestTarget) {
            await this.delay(this.thinkingDelay);
            return this.engine.attachEnergy('cpu', energyCards[0].uid, bestTarget);
        }

        return false;
    }

    evaluateEnergyTarget(pokemon, energyCard) {
        let score = 0;

        // Prefer Pokemon that match energy type
        if (pokemon.card.pokemonType === energyCard.energyType) {
            score += 10;
        }

        // Prefer Pokemon close to being able to attack
        for (const attack of pokemon.card.attacks) {
            const missingEnergy = this.countMissingEnergy(pokemon, attack);
            if (missingEnergy === 1) {
                score += 20; // One energy away from attacking
            } else if (missingEnergy === 2) {
                score += 10;
            }
        }

        // Prefer active Pokemon
        if (pokemon === this.state.cpu.active) {
            score += 5;
        }

        // Prefer higher HP Pokemon (investment protection)
        score += pokemon.card.hp / 20;

        // Prefer evolved Pokemon
        if (pokemon.card.stage === Stage.STAGE1) score += 5;
        if (pokemon.card.stage === Stage.STAGE2) score += 10;

        // Add randomness based on difficulty
        const variance = (1 - this.difficulty) * 20;
        score += (Math.random() * variance) - (variance / 2);

        return score;
    }

    countMissingEnergy(pokemon, attack) {
        const energyCounts = {};
        for (const energy of pokemon.attachedEnergy) {
            energyCounts[energy.energyType] = (energyCounts[energy.energyType] || 0) + 1;
        }

        let missing = 0;
        let colorlessNeeded = 0;

        for (const required of attack.cost) {
            if (required === PokemonType.COLORLESS) {
                colorlessNeeded++;
            } else {
                if (!energyCounts[required] || energyCounts[required] <= 0) {
                    missing++;
                } else {
                    energyCounts[required]--;
                }
            }
        }

        // Check colorless with remaining
        const remaining = Object.values(energyCounts).reduce((a, b) => a + b, 0);
        if (remaining < colorlessNeeded) {
            missing += colorlessNeeded - remaining;
        }

        return missing;
    }

    async tryPlayTrainer() {
        const cpu = this.state.cpu;
        const trainers = cpu.hand.filter(c => c.cardType === CardType.TRAINER);

        for (const trainer of trainers) {
            // Skip supporter if already played one
            if (trainer.trainerType === TrainerType.SUPPORTER &&
                this.state.actions.hasPlayedSupporter) {
                continue;
            }

            const shouldPlay = this.evaluateTrainer(trainer);

            // Random chance to skip or delay playing a trainer based on difficulty
            if (shouldPlay && Math.random() < (0.4 + this.difficulty * 0.6)) {
                await this.delay(this.thinkingDelay);

                // Handle trainers that need targets
                let target = this.getTrainerTarget(trainer);
                if (this.engine.playTrainer('cpu', trainer.uid, target)) {
                    return true;
                }
            }
        }

        return false;
    }

    evaluateTrainer(trainer) {
        const cpu = this.state.cpu;

        switch (trainer.effect) {
            case 'heal':
                // Use if active has significant damage
                return cpu.active && cpu.active.damage >= 30;

            case 'superHeal':
                // Use if active has significant damage and has energy to spare
                return cpu.active &&
                    cpu.active.damage >= 50 &&
                    cpu.active.attachedEnergy.length > cpu.active.card.retreatCost;

            case 'switch':
                // Use if active is in bad shape
                return cpu.active &&
                    cpu.bench.length > 0 &&
                    (cpu.active.currentHP < cpu.active.maxHP * 0.3 ||
                        cpu.active.statusCondition !== StatusCondition.NONE);

            case 'discardAndDraw':
                // Professor's Research - use if hand is small
                return cpu.hand.length <= 3;

            case 'searchPokemon':
                // Poke Ball - use if bench isn't full
                return cpu.bench.length < 3;

            case 'retrieveEnergy':
                // Use if we have energy in discard
                return cpu.discardPile.some(c => c.cardType === CardType.ENERGY);

            case 'shuffleAndDraw':
                // Marnie - use if hand is small or player has many cards
                return cpu.hand.length <= 2 || this.state.player.hand.length >= 7;

            case 'gust':
                // Boss's Orders - use if opponent has weak benched Pokemon
                return this.state.player.bench.some(p =>
                    p.currentHP < 60 || p.attachedEnergy.length === 0
                );

            default:
                return false;
        }
    }

    getTrainerTarget(trainer) {
        const cpu = this.state.cpu;

        switch (trainer.effect) {
            case 'heal':
            case 'superHeal':
                // Target the most damaged Pokemon
                let mostDamaged = cpu.active;
                for (const benched of cpu.bench) {
                    if (benched.damage > mostDamaged.damage) {
                        mostDamaged = benched;
                    }
                }
                return mostDamaged;

            default:
                return null;
        }
    }

    async tryRetreat() {
        if (this.state.actions.hasRetreated) return false;

        const cpu = this.state.cpu;
        if (!cpu.active || cpu.bench.length === 0) return false;

        // Consider retreat if:
        // 1. Active is about to be knocked out
        // 2. Active has bad status
        // 3. Active can't attack but benched can

        const shouldRetreat = this.evaluateRetreat();
        if (!shouldRetreat) return false;

        // Check if we can afford retreat
        if (cpu.active.attachedEnergy.length < cpu.active.card.retreatCost) {
            return false;
        }

        // Find best Pokemon to switch to
        const bestBench = this.findBestBenchToActive();
        if (bestBench === null) return false;

        await this.delay(this.thinkingDelay);
        return this.engine.retreat('cpu', bestBench);
    }

    evaluateRetreat() {
        const cpu = this.state.cpu;
        const active = cpu.active;

        if (!active) return false;

        // Low HP - retreat
        if (active.currentHP < active.maxHP * 0.25) return true;

        // Bad status
        if (active.statusCondition === StatusCondition.CONFUSED ||
            active.statusCondition === StatusCondition.POISONED) return true;

        // Can't attack but someone on bench can
        if (active.getUsableAttacks().length === 0) {
            for (const benched of cpu.bench) {
                if (benched.getUsableAttacks().length > 0) {
                    return true;
                }
            }
        }

        return false;
    }

    findBestBenchToActive() {
        const cpu = this.state.cpu;
        let bestIndex = -1;
        let bestScore = -1;

        for (let i = 0; i < cpu.bench.length; i++) {
            const benched = cpu.bench[i];
            let score = 0;

            // Prefer Pokemon that can attack
            if (benched.getUsableAttacks().length > 0) score += 20;

            // Prefer higher HP
            score += benched.currentHP / 10;

            // Prefer no status
            if (benched.statusCondition === StatusCondition.NONE) score += 10;

            // Prefer evolved Pokemon
            if (benched.card.stage === Stage.STAGE1) score += 5;
            if (benched.card.stage === Stage.STAGE2) score += 10;

            // Add randomness based on difficulty
            const variance = (1 - this.difficulty) * 15;
            score += (Math.random() * variance) - (variance / 2);

            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }

        return bestIndex;
    }

    // ============================================
    // ATTACK PHASE AI
    // ============================================

    async performAttack() {
        const cpu = this.state.cpu;

        if (!cpu.active || this.state.gameOver) return;

        const usableAttacks = cpu.active.getUsableAttacks();
        if (usableAttacks.length === 0) {
            this.state.log('CPU has no usable attacks!');
            return;
        }

        // Choose best attack
        const bestAttackIndex = this.chooseBestAttack(usableAttacks);

        await this.delay(this.thinkingDelay);

        // Return the choice instead of executing immediately
        // allowing the UI to handle animation
        return bestAttackIndex;
    }

    chooseBestAttack(usableAttacks) {
        const opponent = this.state.player;
        let bestIndex = 0;
        let bestScore = -1;

        for (let i = 0; i < this.state.cpu.active.card.attacks.length; i++) {
            const attack = this.state.cpu.active.card.attacks[i];

            // Skip if not usable
            if (!usableAttacks.includes(attack)) continue;

            let score = attack.damage;

            // Bonus for knockout potential
            if (opponent.active) {
                let effectiveDamage = attack.damage;

                // Account for weakness
                if (opponent.active.card.weakness === this.state.cpu.active.card.pokemonType) {
                    effectiveDamage *= 2;
                }

                // Account for resistance
                if (opponent.active.card.resistance === this.state.cpu.active.card.pokemonType) {
                    effectiveDamage -= 30;
                }

                if (effectiveDamage >= opponent.active.currentHP) {
                    score += 100; // Knockout bonus
                }
            }

            // Slight penalty for self-damage
            if (attack.effect === 'selfDamage') {
                score -= 10;
            }

            // Bonus for status effects
            if (attack.effect === 'coinFlipParalyze') score += 15;
            if (attack.effect === 'coinFlipConfuse') score += 10;

            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }

        // Potential to choose a slightly sub-optimal attack based on difficulty
        if (Math.random() > this.difficulty && usableAttacks.length > 1) {
            // Find another usable attack that isn't the best
            const otherAttacks = usableAttacks.filter(a => a !== this.state.cpu.active.card.attacks[bestIndex]);
            if (otherAttacks.length > 0) {
                const randomAttack = otherAttacks[Math.floor(Math.random() * otherAttacks.length)];
                bestIndex = this.state.cpu.active.card.attacks.indexOf(randomAttack);
            }
        }

        return bestIndex;
    }

    // Handle choosing active after knockout
    async chooseNewActive() {
        const cpu = this.state.cpu;

        if (cpu.bench.length === 0) return false;

        // Find best Pokemon to promote
        const bestIndex = this.findBestBenchToActive();

        if (bestIndex >= 0) {
            await this.delay(this.thinkingDelay);
            return this.engine.setActiveFromBench('cpu', bestIndex);
        }

        // Default to first
        return this.engine.setActiveFromBench('cpu', 0);
    }
}

// Make globally available
window.CPUAI = CPUAI;
