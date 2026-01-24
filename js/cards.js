// Pokemon TCG - Card Definitions and Deck Data

// Card Types
const CardType = {
    POKEMON: 'pokemon',
    ENERGY: 'energy',
    TRAINER: 'trainer'
};

// Pokemon Types
const PokemonType = {
    FIRE: 'fire',
    WATER: 'water',
    GRASS: 'grass',
    ELECTRIC: 'electric',
    PSYCHIC: 'psychic',
    FIGHTING: 'fighting',
    COLORLESS: 'colorless'
};

// Trainer Subtypes
const TrainerType = {
    ITEM: 'item',
    SUPPORTER: 'supporter'
};

// Evolution Stages
const Stage = {
    BASIC: 'basic',
    STAGE1: 'stage1',
    STAGE2: 'stage2'
};

// Status Conditions
const StatusCondition = {
    NONE: 'none',
    POISONED: 'poisoned',
    BURNED: 'burned',
    ASLEEP: 'asleep',
    PARALYZED: 'paralyzed',
    CONFUSED: 'confused'
};

// ============================================
// FIRE TYPE POKEMON
// ============================================

const Charmander = {
    id: 'charmander',
    name: 'Charmander',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/charmander.png',
    placeholderIcon: '🦎',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Scratch',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A basic scratch attack.'
        },
        {
            name: 'Ember',
            cost: [PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 30,
            effect: 'discardEnergy',
            effectAmount: 1,
            effectType: PokemonType.FIRE,
            description: 'Discard 1 Fire Energy from this Pokemon.'
        }
    ]
};

const Charmeleon = {
    id: 'charmeleon',
    name: 'Charmeleon',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.STAGE1,
    hp: 90,
    evolvesFrom: 'charmander',
    image: 'assets/pokemon/charmeleon.png',
    placeholderIcon: '🦎',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Slash',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A slashing attack.'
        },
        {
            name: 'Flamethrower',
            cost: [PokemonType.FIRE, PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 70,
            effect: 'discardEnergy',
            effectAmount: 1,
            effectType: PokemonType.FIRE,
            description: 'Discard 1 Fire Energy from this Pokemon.'
        }
    ]
};

const Charizard = {
    id: 'charizard',
    name: 'Charizard',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.STAGE2,
    hp: 150,
    evolvesFrom: 'charmeleon',
    image: 'assets/pokemon/charizard.png',
    placeholderIcon: '🐉',
    weakness: PokemonType.WATER,
    resistance: PokemonType.FIGHTING,
    retreatCost: 3,
    attacks: [
        {
            name: 'Fire Spin',
            cost: [PokemonType.FIRE, PokemonType.FIRE, PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 150,
            effect: 'discardEnergy',
            effectAmount: 2,
            effectType: PokemonType.FIRE,
            description: 'Discard 2 Fire Energy from this Pokemon.'
        },
        {
            name: 'Wing Attack',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 60,
            effect: null,
            description: 'A powerful wing attack.'
        }
    ]
};

const Vulpix = {
    id: 'vulpix',
    name: 'Vulpix',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/vulpix.png',
    placeholderIcon: '🦊',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Will-O-Wisp',
            cost: [PokemonType.FIRE],
            damage: 20,
            effect: null,
            description: 'A ghostly flame attack.'
        }
    ]
};

const Ninetales = {
    id: 'ninetales',
    name: 'Ninetales',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.STAGE1,
    hp: 110,
    evolvesFrom: 'vulpix',
    image: 'assets/pokemon/ninetales.png',
    placeholderIcon: '🦊',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Flamethrower',
            cost: [PokemonType.FIRE, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 80,
            effect: 'discardEnergy',
            effectAmount: 1,
            effectType: PokemonType.FIRE,
            description: 'Discard 1 Fire Energy from this Pokemon.'
        },
        {
            name: 'Fire Blast',
            cost: [PokemonType.FIRE, PokemonType.FIRE, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 120,
            effect: 'discardEnergy',
            effectAmount: 2,
            effectType: PokemonType.FIRE,
            description: 'Discard 2 Fire Energy from this Pokemon.'
        }
    ]
};

const Growlithe = {
    id: 'growlithe',
    name: 'Growlithe',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/growlithe.png',
    placeholderIcon: '🐕',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Bite',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A quick bite.'
        },
        {
            name: 'Flame Charge',
            cost: [PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A charging flame attack.'
        }
    ]
};

const Arcanine = {
    id: 'arcanine',
    name: 'Arcanine',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.STAGE1,
    hp: 130,
    evolvesFrom: 'growlithe',
    image: 'assets/pokemon/arcanine.png',
    placeholderIcon: '🐕',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Crunch',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 40,
            effect: null,
            description: 'A powerful bite.'
        },
        {
            name: 'Inferno',
            cost: [PokemonType.FIRE, PokemonType.FIRE, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 130,
            effect: 'discardEnergy',
            effectAmount: 2,
            effectType: PokemonType.FIRE,
            description: 'Discard 2 Fire Energy from this Pokemon.'
        }
    ]
};

const Magmar = {
    id: 'magmar',
    name: 'Magmar',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.BASIC,
    hp: 80,
    evolvesFrom: null,
    image: 'assets/pokemon/magmar.png',
    placeholderIcon: '🔥',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Smokescreen',
            cost: [PokemonType.FIRE],
            damage: 20,
            effect: 'smokescreen',
            description: 'If the Defending Pokemon tries to attack next turn, flip a coin. If tails, that attack does nothing.'
        },
        {
            name: 'Fire Punch',
            cost: [PokemonType.FIRE, PokemonType.FIRE],
            damage: 50,
            effect: null,
            description: 'A punch wreathed in flames.'
        }
    ]
};

const Ponyta = {
    id: 'ponyta',
    name: 'Ponyta',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/ponyta.png',
    placeholderIcon: '🐴',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Stomp',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: 'coinFlipBonus',
            bonusDamage: 10,
            description: 'Flip a coin. If heads, this attack does 10 more damage.'
        },
        {
            name: 'Flame Tail',
            cost: [PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A tail swipe with flames.'
        }
    ]
};

const Rapidash = {
    id: 'rapidash',
    name: 'Rapidash',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIRE,
    stage: Stage.STAGE1,
    hp: 100,
    evolvesFrom: 'ponyta',
    image: 'assets/pokemon/rapidash.png',
    placeholderIcon: '🐴',
    weakness: PokemonType.WATER,
    resistance: null,
    retreatCost: 0,
    attacks: [
        {
            name: 'Agility',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 30,
            effect: 'coinFlipInvulnerable',
            description: 'Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokemon during your opponent\'s next turn.'
        },
        {
            name: 'Fire Mane',
            cost: [PokemonType.FIRE, PokemonType.FIRE, PokemonType.COLORLESS],
            damage: 90,
            effect: null,
            description: 'A mane of fire crashes into the opponent.'
        }
    ]
};

// ============================================
// WATER TYPE POKEMON
// ============================================

const Squirtle = {
    id: 'squirtle',
    name: 'Squirtle',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/squirtle.png',
    placeholderIcon: '🐢',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Tackle',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A basic tackle.'
        },
        {
            name: 'Water Gun',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A blast of water.'
        }
    ]
};

const Wartortle = {
    id: 'wartortle',
    name: 'Wartortle',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE1,
    hp: 90,
    evolvesFrom: 'squirtle',
    image: 'assets/pokemon/wartortle.png',
    placeholderIcon: '🐢',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Bite',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A biting attack.'
        },
        {
            name: 'Aqua Tail',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 70,
            effect: null,
            description: 'A powerful tail strike with water.'
        }
    ]
};

const Blastoise = {
    id: 'blastoise',
    name: 'Blastoise',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE2,
    hp: 150,
    evolvesFrom: 'wartortle',
    image: 'assets/pokemon/blastoise.png',
    placeholderIcon: '🐢',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 3,
    attacks: [
        {
            name: 'Hydro Pump',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 150,
            effect: null,
            description: 'A devastating blast of water.'
        },
        {
            name: 'Skull Bash',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 60,
            effect: null,
            description: 'A headbutt attack.'
        }
    ]
};

const Psyduck = {
    id: 'psyduck',
    name: 'Psyduck',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/psyduck.png',
    placeholderIcon: '🦆',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Headache',
            cost: [PokemonType.WATER],
            damage: 10,
            effect: 'blockTrainers',
            description: 'Your opponent can\'t play Trainer cards from their hand during their next turn.'
        },
        {
            name: 'Fury Swipes',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 20,
            effect: 'multiCoinFlip',
            flipCount: 3,
            description: 'Flip 3 coins. This attack does 20 damage times the number of heads.'
        }
    ]
};

const Golduck = {
    id: 'golduck',
    name: 'Golduck',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE1,
    hp: 100,
    evolvesFrom: 'psyduck',
    image: 'assets/pokemon/golduck.png',
    placeholderIcon: '🦆',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Aqua Slash',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 50,
            effect: null,
            description: 'A slashing water attack.'
        },
        {
            name: 'Hydro Splash',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 90,
            effect: null,
            description: 'A powerful splash of water.'
        }
    ]
};

const Staryu = {
    id: 'staryu',
    name: 'Staryu',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 50,
    evolvesFrom: null,
    image: 'assets/pokemon/staryu.png',
    placeholderIcon: '⭐',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Tackle',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A basic tackle.'
        },
        {
            name: 'Star Freeze',
            cost: [PokemonType.WATER],
            damage: 20,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

const Starmie = {
    id: 'starmie',
    name: 'Starmie',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE1,
    hp: 90,
    evolvesFrom: 'staryu',
    image: 'assets/pokemon/starmie.png',
    placeholderIcon: '💫',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 0,
    attacks: [
        {
            name: 'Swift',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 40,
            effect: 'swift',
            description: 'This attack\'s damage isn\'t affected by Weakness, Resistance, or any other effects.'
        },
        {
            name: 'Hydro Star',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 80,
            effect: null,
            description: 'A star-shaped burst of water.'
        }
    ]
};

const Lapras = {
    id: 'lapras',
    name: 'Lapras',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 100,
    evolvesFrom: null,
    image: 'assets/pokemon/lapras.png',
    placeholderIcon: '🦕',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Water Splash',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 40,
            effect: null,
            description: 'A splash of water.'
        },
        {
            name: 'Ice Beam',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 60,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

const Seel = {
    id: 'seel',
    name: 'Seel',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/seel.png',
    placeholderIcon: '🧊',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Headbutt',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A simple headbutt.'
        },
        {
            name: 'Aurora Beam',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A beam of colorful light.'
        }
    ]
};

const Dewgong = {
    id: 'dewgong',
    name: 'Dewgong',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE1,
    hp: 110,
    evolvesFrom: 'seel',
    image: 'assets/pokemon/dewgong.png',
    placeholderIcon: '🧊',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Ice Shard',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 50,
            effect: null,
            description: 'Shards of ice hit the opponent.'
        },
        {
            name: 'Blizzard',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 100,
            effect: 'benchDamage',
            benchDamage: 10,
            description: 'Also does 10 damage to each of your opponent\'s Benched Pokemon.'
        }
    ]
};

const Shellder = {
    id: 'shellder',
    name: 'Shellder',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/shellder.png',
    placeholderIcon: '🐚',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Supersonic',
            cost: [PokemonType.WATER],
            damage: 0,
            effect: 'coinFlipConfuse',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Confused.'
        },
        {
            name: 'Clamp',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A clamping attack.'
        }
    ]
};

const Cloyster = {
    id: 'cloyster',
    name: 'Cloyster',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.WATER,
    stage: Stage.STAGE1,
    hp: 100,
    evolvesFrom: 'shellder',
    image: 'assets/pokemon/cloyster.png',
    placeholderIcon: '🐚',
    weakness: PokemonType.ELECTRIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Spike Cannon',
            cost: [PokemonType.WATER, PokemonType.COLORLESS],
            damage: 30,
            effect: 'multiCoinFlip',
            flipCount: 2,
            description: 'Flip 2 coins. This attack does 30 damage times the number of heads.'
        },
        {
            name: 'Hydro Tackle',
            cost: [PokemonType.WATER, PokemonType.WATER, PokemonType.COLORLESS],
            damage: 90,
            effect: 'selfDamage',
            selfDamage: 20,
            description: 'This Pokemon also does 20 damage to itself.'
        }
    ]
};

// ============================================
// GRASS TYPE POKEMON
// ============================================

const Bulbasaur = {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/bulbasaur.png',
    placeholderIcon: '🌱',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Tackle',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A basic tackle.'
        },
        {
            name: 'Vine Whip',
            cost: [PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 30,
            effect: null,
            description: 'A whipping vine attack.'
        }
    ]
};

const Ivysaur = {
    id: 'ivysaur',
    name: 'Ivysaur',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.STAGE1,
    hp: 90,
    evolvesFrom: 'bulbasaur',
    image: 'assets/pokemon/ivysaur.png',
    placeholderIcon: '🌿',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Razor Leaf',
            cost: [PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 40,
            effect: null,
            description: 'Sharp leaves slice the opponent.'
        },
        {
            name: 'Solar Beam',
            cost: [PokemonType.GRASS, PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 80,
            effect: null,
            description: 'A powerful beam of light.'
        }
    ]
};

const Venusaur = {
    id: 'venusaur',
    name: 'Venusaur',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.STAGE2,
    hp: 160,
    evolvesFrom: 'ivysaur',
    image: 'assets/pokemon/venusaur.png',
    placeholderIcon: '🌺',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 4,
    attacks: [
        {
            name: 'Petal Dance',
            cost: [PokemonType.GRASS, PokemonType.GRASS, PokemonType.GRASS],
            damage: 60,
            effect: 'multiCoinFlip',
            flipCount: 3,
            description: 'Flip 3 coins. This attack does 60 damage times the number of heads.'
        },
        {
            name: 'Solar Beam',
            cost: [PokemonType.GRASS, PokemonType.GRASS, PokemonType.GRASS, PokemonType.GRASS],
            damage: 130,
            effect: null,
            description: 'A devastating beam of light.'
        }
    ]
};

const Oddish = {
    id: 'oddish',
    name: 'Oddish',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.BASIC,
    hp: 50,
    evolvesFrom: null,
    image: 'assets/pokemon/oddish.png',
    placeholderIcon: '🌱',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Absorb',
            cost: [PokemonType.GRASS],
            damage: 10,
            effect: 'healSelf',
            healAmount: 10,
            description: 'Heal 10 damage from this Pokemon.'
        }
    ]
};

const Gloom = {
    id: 'gloom',
    name: 'Gloom',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.STAGE1,
    hp: 80,
    evolvesFrom: 'oddish',
    image: 'assets/pokemon/gloom.png',
    placeholderIcon: '🥀',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Poison Powder',
            cost: [PokemonType.GRASS],
            damage: 20,
            effect: 'poison',
            description: 'The Defending Pokemon is now Poisoned.'
        }
    ]
};

const Vileplume = {
    id: 'vileplume',
    name: 'Vileplume',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.STAGE2,
    hp: 140,
    evolvesFrom: 'gloom',
    image: 'assets/pokemon/vileplume.png',
    placeholderIcon: '🌻',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 3,
    attacks: [
        {
            name: 'Stun Spore',
            cost: [PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 40,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        },
        {
            name: 'Solar Beam',
            cost: [PokemonType.GRASS, PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 90,
            effect: null,
            description: 'A powerful beam of light.'
        }
    ]
};

const Tangela = {
    id: 'tangela',
    name: 'Tangela',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.GRASS,
    stage: Stage.BASIC,
    hp: 80,
    evolvesFrom: null,
    image: 'assets/pokemon/tangela.png',
    placeholderIcon: '🌀',
    weakness: PokemonType.FIRE,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Bind',
            cost: [PokemonType.GRASS, PokemonType.COLORLESS],
            damage: 30,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

// ============================================
// ELECTRIC TYPE POKEMON
// ============================================

const Pikachu = {
    id: 'pikachu',
    name: 'Pikachu',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/pikachu.png',
    placeholderIcon: '⚡',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Quick Attack',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: 'coinFlipBonus',
            bonusDamage: 20,
            description: 'Flip a coin. If heads, this attack does 20 more damage.'
        },
        {
            name: 'Electro Ball',
            cost: [PokemonType.ELECTRIC, PokemonType.COLORLESS],
            damage: 40,
            effect: null,
            description: 'A ball of electricity.'
        }
    ]
};

const Raichu = {
    id: 'raichu',
    name: 'Raichu',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.STAGE1,
    hp: 110,
    evolvesFrom: 'pikachu',
    image: 'assets/pokemon/raichu.png',
    placeholderIcon: '⚡',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Thunderbolt',
            cost: [PokemonType.ELECTRIC, PokemonType.ELECTRIC, PokemonType.COLORLESS],
            damage: 120,
            effect: 'discardEnergy',
            effectAmount: 1,
            effectType: PokemonType.ELECTRIC,
            description: 'Discard 1 Electric Energy from this Pokemon.'
        }
    ]
};

const Magnemite = {
    id: 'magnemite',
    name: 'Magnemite',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.BASIC,
    hp: 60,
    evolvesFrom: null,
    image: 'assets/pokemon/magnemite.png',
    placeholderIcon: '🧲',
    weakness: PokemonType.FIGHTING,
    resistance: PokemonType.COLORLESS,
    retreatCost: 1,
    attacks: [
        {
            name: 'Thunder Wave',
            cost: [PokemonType.ELECTRIC],
            damage: 10,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

const Magneton = {
    id: 'magneton',
    name: 'Magneton',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.STAGE1,
    hp: 90,
    evolvesFrom: 'magnemite',
    image: 'assets/pokemon/magneton.png',
    placeholderIcon: '🧲',
    weakness: PokemonType.FIGHTING,
    resistance: PokemonType.COLORLESS,
    retreatCost: 2,
    attacks: [
        {
            name: 'Self-Destruct',
            cost: [PokemonType.ELECTRIC, PokemonType.ELECTRIC, PokemonType.COLORLESS],
            damage: 100,
            effect: 'selfDestruct',
            selfDamage: 100,
            benchDamage: 20,
            description: 'This Pokemon does 100 damage to itself. Also does 20 damage to each Benched Pokemon (both your and your opponent\'s).'
        }
    ]
};

const Electabuzz = {
    id: 'electabuzz',
    name: 'Electabuzz',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.BASIC,
    hp: 90,
    evolvesFrom: null,
    image: 'assets/pokemon/electabuzz.png',
    placeholderIcon: '🔌',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Thunderpunch',
            cost: [PokemonType.ELECTRIC, PokemonType.COLORLESS],
            damage: 30,
            effect: 'coinFlipBonus',
            bonusDamage: 10,
            selfDamageOnTails: 10,
            description: 'Flip a coin. If heads, this attack does 30 damage plus 10 more damage. If tails, this attack does 30 damage and Electabuzz does 10 damage to itself.'
        }
    ]
};

const Zapdos = {
    id: 'zapdos',
    name: 'Zapdos',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.ELECTRIC,
    stage: Stage.BASIC,
    hp: 120,
    evolvesFrom: null,
    image: 'assets/pokemon/zapdos.png',
    placeholderIcon: '🦅',
    weakness: null,
    resistance: PokemonType.FIGHTING,
    retreatCost: 2,
    attacks: [
    ]
};

// ============================================
// PSYCHIC TYPE POKEMON
// ============================================

const Abra = {
    id: 'abra',
    name: 'Abra',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.BASIC,
    hp: 50,
    evolvesFrom: null,
    image: 'assets/pokemon/abra.png',
    placeholderIcon: '🥄',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 0,
    attacks: [
        {
            name: 'Teleport',
            cost: [PokemonType.PSYCHIC],
            damage: 0,
            effect: 'switch',
            description: 'Switch this Pokemon with 1 of your Benched Pokemon.'
        }
    ]
};

const Kadabra = {
    id: 'kadabra',
    name: 'Kadabra',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.STAGE1,
    hp: 80,
    evolvesFrom: 'abra',
    image: 'assets/pokemon/kadabra.png',
    placeholderIcon: '🥄',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Recover',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 0,
            effect: 'discardHeal',
            discardEnergy: 1,
            healAmount: 80,
            description: 'Discard 1 Psychic Energy from this Pokemon and heal all damage from it.'
        },
        {
            name: 'Super Psy Bolt',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC, PokemonType.COLORLESS],
            damage: 50,
            effect: null,
            description: 'A powerful psychic bolt.'
        }
    ]
};

const Alakazam = {
    id: 'alakazam',
    name: 'Alakazam',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.STAGE2,
    hp: 130,
    evolvesFrom: 'kadabra',
    image: 'assets/pokemon/alakazam.png',
    placeholderIcon: '🥄',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Damage Swap',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 0,
            effect: 'damageSwap',
            description: 'As often as you like during your turn, you may move 1 damage counter from 1 of your Pokemon to another as long as it doesn\'t knock out that Pokemon.'
        },
        {
            name: 'Mind Shock',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 80,
            effect: 'ignoreResistance',
            description: 'This attack\'s damage isn\'t affected by Resistance.'
        }
    ]
};

const Gastly = {
    id: 'gastly',
    name: 'Gastly',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.BASIC,
    hp: 50,
    evolvesFrom: null,
    image: 'assets/pokemon/gastly.png',
    placeholderIcon: '👻',
    weakness: null,
    resistance: PokemonType.FIGHTING,
    retreatCost: 0,
    attacks: [
        {
            name: 'Lick',
            cost: [PokemonType.PSYCHIC],
            damage: 10,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

const Haunter = {
    id: 'haunter',
    name: 'Haunter',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.STAGE1,
    hp: 80,
    evolvesFrom: 'gastly',
    image: 'assets/pokemon/haunter.png',
    placeholderIcon: '👻',
    weakness: null,
    resistance: PokemonType.FIGHTING,
    retreatCost: 1,
    attacks: [
        {
            name: 'Hypnosis',
            cost: [PokemonType.PSYCHIC],
            damage: 0,
            effect: 'sleep',
            description: 'The Defending Pokemon is now Asleep.'
        },
        {
            name: 'Dream Eater',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 60,
            effect: 'dreamEater',
            description: 'If the Defending Pokemon is Asleep, this attack does 60 damage. If not, this attack does nothing.'
        }
    ]
};

const Gengar = {
    id: 'gengar',
    name: 'Gengar',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.STAGE2,
    hp: 130,
    evolvesFrom: 'haunter',
    image: 'assets/pokemon/gengar.png',
    placeholderIcon: '👻',
    weakness: null,
    resistance: PokemonType.FIGHTING,
    retreatCost: 1,
    attacks: [
        {
            name: 'Curse',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 0,
            effect: 'moveDamage',
            description: 'Move 1 damage counter from 1 of your opponent\'s Pokemon to another.'
        },
        {
            name: 'Dark Mind',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 60,
            effect: 'benchDamage',
            benchDamage: 20,
            description: 'Does 20 damage to 1 of your opponent\'s Benched Pokemon.'
        }
    ]
};

const Mewtwo = {
    id: 'mewtwo',
    name: 'Mewtwo',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.PSYCHIC,
    stage: Stage.BASIC,
    hp: 120,
    evolvesFrom: null,
    image: 'assets/pokemon/mewtwo.png',
    placeholderIcon: '🧬',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Psychic',
            cost: [PokemonType.PSYCHIC, PokemonType.COLORLESS],
            damage: 20,
            effect: 'extraDamagePerEnergyOnOpponent',
            bonusDamage: 20,
            description: 'Does 20 damage plus 20 more damage for each Energy attached to the Defending Pokemon.'
        },
        {
            name: 'Barrier',
            cost: [PokemonType.PSYCHIC, PokemonType.PSYCHIC],
            damage: 0,
            effect: 'discardEnergyInvulnerable',
            discardEnergy: 1,
            description: 'Discard 1 Psychic Energy attached to Mewtwo in order to prevent all effects of attacks, including damage, done to Mewtwo during your opponent\'s next turn.'
        }
    ]
};

// ============================================
// FIGHTING TYPE POKEMON
// ============================================

const Machop = {
    id: 'machop',
    name: 'Machop',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.BASIC,
    hp: 70,
    evolvesFrom: null,
    image: 'assets/pokemon/machop.png',
    placeholderIcon: '💪',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Low Kick',
            cost: [PokemonType.COLORLESS],
            damage: 20,
            effect: null,
            description: 'A quick kick.'
        }
    ]
};

const Machoke = {
    id: 'machoke',
    name: 'Machoke',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.STAGE1,
    hp: 100,
    evolvesFrom: 'machop',
    image: 'assets/pokemon/machoke.png',
    placeholderIcon: '💪',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Karate Chop',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.COLORLESS],
            damage: 60,
            effect: 'damageMinusCurrentDamage',
            description: 'Does 60 damage minus 10 damage for each damage counter on Machoke.'
        },
        {
            name: 'Submission',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 80,
            effect: 'selfDamage',
            selfDamage: 20,
            description: 'Machoke does 20 damage to itself.'
        }
    ]
};

const Machamp = {
    id: 'machamp',
    name: 'Machamp',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.STAGE2,
    hp: 150,
    evolvesFrom: 'machoke',
    image: 'assets/pokemon/machamp.png',
    placeholderIcon: '💪',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 3,
    attacks: [
        {
            name: 'Seismic Toss',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.COLORLESS],
            damage: 80,
            effect: null,
            description: 'A powerful throw.'
        },
        {
            name: 'Fling',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.FIGHTING],
            damage: 120,
            effect: null,
            description: 'Fling the opponent.'
        }
    ]
};

const Onix = {
    id: 'onix',
    name: 'Onix',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.BASIC,
    hp: 100,
    evolvesFrom: null,
    image: null,
    placeholderIcon: '🗿',
    weakness: PokemonType.GRASS,
    resistance: null,
    retreatCost: 3,
    attacks: [
        {
            name: 'Rock Throw',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING],
            damage: 40,
            effect: null,
            description: 'Throws a rock.'
        },
        {
            name: 'Harden',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 0,
            effect: 'reduceDamageNextTurn',
            reduceAmount: 30,
            description: 'During your opponent\'s next turn, any damage done to Onix by attacks is reduced by 30.'
        }
    ]
};

const Hitmonlee = {
    id: 'hitmonlee',
    name: 'Hitmonlee',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.BASIC,
    hp: 80,
    evolvesFrom: null,
    image: null,
    placeholderIcon: '🦵',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Stretchy Kick',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING],
            damage: 30,
            effect: 'benchDamage',
            benchDamage: 10,
            description: 'Does 30 damage to the active Pokemon and 10 damage to one benched Pokemon.'
        },
        {
            name: 'High Jump Kick',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.COLORLESS],
            damage: 60,
            effect: null,
            description: 'A jumping kick.'
        }
    ]
};

const Hitmonchan = {
    id: 'hitmonchan',
    name: 'Hitmonchan',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.FIGHTING,
    stage: Stage.BASIC,
    hp: 80,
    evolvesFrom: null,
    image: null,
    placeholderIcon: '🥊',
    weakness: PokemonType.PSYCHIC,
    resistance: null,
    retreatCost: 2,
    attacks: [
        {
            name: 'Jab',
            cost: [PokemonType.FIGHTING],
            damage: 20,
            effect: null,
            description: 'A quick jab.'
        },
        {
            name: 'Special Punch',
            cost: [PokemonType.FIGHTING, PokemonType.FIGHTING, PokemonType.COLORLESS],
            damage: 50,
            effect: null,
            description: 'A powerful punch.'
        }
    ]
};

// ============================================
// COLORLESS TYPE POKEMON
// ============================================

const Pidgey = {
    id: 'pidgey',
    name: 'Pidgey',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.BASIC,
    hp: 50,
    evolvesFrom: null,
    image: 'assets/pokemon/pidgey.png',
    placeholderIcon: '🐦',
    weakness: PokemonType.ELECTRIC,
    resistance: PokemonType.FIGHTING,
    retreatCost: 1,
    attacks: [
        {
            name: 'Peck',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A basic peck.'
        }
    ]
};

const Pidgeotto = {
    id: 'pidgeotto',
    name: 'Pidgeotto',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.STAGE1,
    hp: 80,
    evolvesFrom: 'pidgey',
    image: 'assets/pokemon/pidgeotto.png',
    placeholderIcon: '🐦',
    weakness: PokemonType.ELECTRIC,
    resistance: PokemonType.FIGHTING,
    retreatCost: 1,
    attacks: [
        {
            name: 'Whirlwind',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 20,
            effect: 'opponentSwitch',
            description: 'Your opponent switches the Defending Pokemon with 1 of their Benched Pokemon.'
        },
        {
            name: 'Mirror Move',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 0,
            effect: 'copyLastAttackDamage',
            description: 'If Pidgeotto was damaged by an attack during your opponent\'s last turn, this attack does the same amount of damage to the Defending Pokemon.'
        }
    ]
};

const Pidgeot = {
    id: 'pidgeot',
    name: 'Pidgeot',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.STAGE2,
    hp: 120,
    evolvesFrom: 'pidgeotto',
    image: 'assets/pokemon/pidgeot.png',
    placeholderIcon: '🐦',
    weakness: PokemonType.ELECTRIC,
    resistance: PokemonType.FIGHTING,
    retreatCost: 0,
    attacks: [
        {
            name: 'Wing Attack',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 60,
            effect: null,
            description: 'A powerful wing attack.'
        },
        {
            name: 'Hurricane',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 100,
            effect: 'selfOpponentSwitch',
            description: 'Both you and your opponent switch your Active Pokemon with 1 of your Benched Pokemon.'
        }
    ]
};

const Rattata = {
    id: 'rattata',
    name: 'Rattata',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.BASIC,
    hp: 40,
    evolvesFrom: null,
    image: 'assets/pokemon/rattata.png',
    placeholderIcon: '🐀',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 0,
    attacks: [
        {
            name: 'Bite',
            cost: [PokemonType.COLORLESS],
            damage: 10,
            effect: null,
            description: 'A quick bite.'
        }
    ]
};

const Raticate = {
    id: 'raticate',
    name: 'Raticate',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.STAGE1,
    hp: 80,
    evolvesFrom: 'rattata',
    image: 'assets/pokemon/raticate.png',
    placeholderIcon: '🐀',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 1,
    attacks: [
        {
            name: 'Super Fang',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 0,
            effect: 'halfRemainingHP',
            description: 'Does damage to the Defending Pokemon equal to half of its remaining HP (rounded up).'
        }
    ]
};

const Snorlax = {
    id: 'snorlax',
    name: 'Snorlax',
    cardType: CardType.POKEMON,
    pokemonType: PokemonType.COLORLESS,
    stage: Stage.BASIC,
    hp: 130,
    evolvesFrom: null,
    image: 'assets/pokemon/snorlax.png',
    placeholderIcon: '💤',
    weakness: PokemonType.FIGHTING,
    resistance: null,
    retreatCost: 4,
    attacks: [
        {
            name: 'Body Slam',
            cost: [PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS, PokemonType.COLORLESS],
            damage: 50,
            effect: 'coinFlipParalyze',
            description: 'Flip a coin. If heads, the Defending Pokemon is now Paralyzed.'
        }
    ]
};

// ============================================
// ENERGY CARDS
// ============================================

const FireEnergy = {
    id: 'fire-energy',
    name: 'Fire Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.FIRE
};

const WaterEnergy = {
    id: 'water-energy',
    name: 'Water Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.WATER
};

const GrassEnergy = {
    id: 'grass-energy',
    name: 'Grass Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.GRASS
};

const ElectricEnergy = {
    id: 'electric-energy',
    name: 'Electric Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.ELECTRIC
};

const PsychicEnergy = {
    id: 'psychic-energy',
    name: 'Psychic Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.PSYCHIC
};

const FightingEnergy = {
    id: 'fighting-energy',
    name: 'Fighting Energy',
    cardType: CardType.ENERGY,
    energyType: PokemonType.FIGHTING
};

// ============================================
// TRAINER CARDS
// ============================================

const Potion = {
    id: 'potion',
    name: 'Potion',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.ITEM,
    effect: 'heal',
    healAmount: 30,
    description: 'Heal 30 damage from one of your Pokemon.'
};

const Switch = {
    id: 'switch',
    name: 'Switch',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.ITEM,
    effect: 'switch',
    description: 'Switch your Active Pokemon with one of your Benched Pokemon.'
};

const ProfessorsResearch = {
    id: 'professors-research',
    name: 'Professor\'s Research',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.SUPPORTER,
    effect: 'discardAndDraw',
    drawAmount: 7,
    description: 'Discard your hand and draw 7 cards.'
};

const PokeBall = {
    id: 'poke-ball',
    name: 'Poke Ball',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.ITEM,
    effect: 'searchPokemon',
    description: 'Flip a coin. If heads, search your deck for a Basic Pokemon and put it into your hand. Shuffle your deck.'
};

const EnergyRetrieval = {
    id: 'energy-retrieval',
    name: 'Energy Retrieval',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.ITEM,
    effect: 'retrieveEnergy',
    retrieveAmount: 2,
    description: 'Put up to 2 basic Energy cards from your discard pile into your hand.'
};

const SuperPotion = {
    id: 'super-potion',
    name: 'Super Potion',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.ITEM,
    effect: 'superHeal',
    healAmount: 60,
    discardEnergy: 1,
    description: 'Discard 1 Energy from one of your Pokemon and heal 60 damage from it.'
};

const Marnie = {
    id: 'marnie',
    name: 'Marnie',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.SUPPORTER,
    effect: 'shuffleAndDraw',
    drawAmount: 5,
    opponentDraw: 4,
    description: 'Each player shuffles their hand into their deck. You draw 5 cards. Your opponent draws 4 cards.'
};

const BossOrders = {
    id: 'boss-orders',
    name: 'Boss\'s Orders',
    cardType: CardType.TRAINER,
    trainerType: TrainerType.SUPPORTER,
    effect: 'gust',
    description: 'Switch one of your opponent\'s Benched Pokemon with their Active Pokemon.'
};

// ============================================
// DECK BUILDERS
// ============================================

function createFireDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Charmander, uid: `charmander-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Vulpix, uid: `vulpix-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Growlithe, uid: `growlithe-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Magmar, uid: `magmar-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Ponyta, uid: `ponyta-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 3; i++) deck.push({ ...Charmeleon, uid: `charmeleon-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Ninetales, uid: `ninetales-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Arcanine, uid: `arcanine-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Rapidash, uid: `rapidash-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 4; i++) deck.push({ ...Charizard, uid: `charizard-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...FireEnergy, uid: `fire-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createWaterDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Squirtle, uid: `squirtle-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Psyduck, uid: `psyduck-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Staryu, uid: `staryu-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Lapras, uid: `lapras-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Seel, uid: `seel-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Shellder, uid: `shellder-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 3; i++) deck.push({ ...Wartortle, uid: `wartortle-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Golduck, uid: `golduck-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Starmie, uid: `starmie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Dewgong, uid: `dewgong-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...Cloyster, uid: `cloyster-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 4; i++) deck.push({ ...Blastoise, uid: `blastoise-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...WaterEnergy, uid: `water-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createGrassDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Bulbasaur, uid: `bulbasaur-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Oddish, uid: `oddish-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Tangela, uid: `tangela-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 4; i++) deck.push({ ...Ivysaur, uid: `ivysaur-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Gloom, uid: `gloom-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 2; i++) deck.push({ ...Venusaur, uid: `venusaur-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Vileplume, uid: `vileplume-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...GrassEnergy, uid: `grass-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createElectricDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Pikachu, uid: `pikachu-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...Magnemite, uid: `magnemite-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...Electabuzz, uid: `electabuzz-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Zapdos, uid: `zapdos-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 4; i++) deck.push({ ...Raichu, uid: `raichu-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Magneton, uid: `magneton-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...ElectricEnergy, uid: `electric-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createPsychicDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Abra, uid: `abra-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Gastly, uid: `gastly-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Mewtwo, uid: `mewtwo-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 4; i++) deck.push({ ...Kadabra, uid: `kadabra-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Haunter, uid: `haunter-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 2; i++) deck.push({ ...Alakazam, uid: `alakazam-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Gengar, uid: `gengar-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...PsychicEnergy, uid: `psychic-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createFightingDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Machop, uid: `machop-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Onix, uid: `onix-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Hitmonlee, uid: `hitmonlee-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Hitmonchan, uid: `hitmonchan-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 8; i++) deck.push({ ...Machoke, uid: `machoke-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 4; i++) deck.push({ ...Machamp, uid: `machamp-${i}` });

    // Energy (20)
    for (let i = 0; i < 20; i++) deck.push({ ...FightingEnergy, uid: `fighting-energy-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

function createColorlessDeck() {
    const deck = [];

    // Basic Pokemon (12)
    for (let i = 0; i < 4; i++) deck.push({ ...Pidgey, uid: `pidgey-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Rattata, uid: `rattata-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Snorlax, uid: `snorlax-${i}` });

    // Stage 1 Pokemon (8)
    for (let i = 0; i < 4; i++) deck.push({ ...Pidgeotto, uid: `pidgeotto-${i}` });
    for (let i = 0; i < 4; i++) deck.push({ ...Raticate, uid: `raticate-${i}` });

    // Stage 2 Pokemon (4)
    for (let i = 0; i < 4; i++) deck.push({ ...Pidgeot, uid: `pidgeot-${i}` });

    // Energy (20)
    for (let i = 0; i < 5; i++) deck.push({ ...FireEnergy, uid: `fire-energy-c-${i}` });
    for (let i = 0; i < 5; i++) deck.push({ ...WaterEnergy, uid: `water-energy-c-${i}` });
    for (let i = 0; i < 5; i++) deck.push({ ...GrassEnergy, uid: `grass-energy-c-${i}` });
    for (let i = 0; i < 5; i++) deck.push({ ...ElectricEnergy, uid: `electric-energy-c-${i}` });

    // Trainers (16)
    for (let i = 0; i < 4; i++) deck.push({ ...Potion, uid: `potion-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Switch, uid: `switch-${i}` });
    for (let i = 0; i < 3; i++) deck.push({ ...ProfessorsResearch, uid: `professors-research-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...PokeBall, uid: `poke-ball-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...EnergyRetrieval, uid: `energy-retrieval-${i}` });
    for (let i = 0; i < 2; i++) deck.push({ ...Marnie, uid: `marnie-${i}` });
    for (let i = 0; i < 1; i++) deck.push({ ...BossOrders, uid: `boss-orders-${i}` });

    return deck;
}

// Export for use in other modules
window.CardType = CardType;
window.PokemonType = PokemonType;
window.TrainerType = TrainerType;
window.Stage = Stage;
window.StatusCondition = StatusCondition;
window.createFireDeck = createFireDeck;
window.createWaterDeck = createWaterDeck;
window.createGrassDeck = createGrassDeck;
window.createElectricDeck = createElectricDeck;
window.createPsychicDeck = createPsychicDeck;
window.createFightingDeck = createFightingDeck;
window.createColorlessDeck = createColorlessDeck;
