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
    image: null, // Set to 'assets/pokemon/charmander.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/charmeleon.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/charizard.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/vulpix.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/ninetales.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/growlithe.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/arcanine.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/magmar.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/ponyta.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/rapidash.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/squirtle.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/wartortle.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/blastoise.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/psyduck.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/golduck.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/staryu.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/starmie.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/lapras.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/seel.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/dewgong.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/shellder.png' when image is generated
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
    image: null, // Set to 'assets/pokemon/cloyster.png' when image is generated
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
    placeholderIcon: '🦅',
    weakness: null,
    resistance: PokemonType.FIGHTING,
    retreatCost: 2,
    attacks: [
        {
            name: 'Thunder',
            cost: [PokemonType.ELECTRIC, PokemonType.ELECTRIC, PokemonType.ELECTRIC, PokemonType.COLORLESS],
            damage: 120,
            effect: 'coinFlipSelfDamage',
            selfDamage: 30,
            description: 'Flip a coin. If tails, Zapdos does 30 damage to itself.'
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
