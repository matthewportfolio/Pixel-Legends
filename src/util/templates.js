module.exports = {
  ENEMIES: [
    {
      ref: 'WOLF',
      class: 'WARRIOR',
      name: 'Wolf',
      description: 'A wolf that seems to have gone rabid with rage',
      stage: 1,
    },
  ],

  LEGENDS: [
    {
      ref: 'DAVE',
      class: 'WARRIOR',
      name: 'Dave',
      description: 'Rising to violence is rare for Dave; then again, so is rising at all',
      rarity: 1,
    },
  ],

  SKILLS: [
    {
      ref: 'SWIPE',
      legend_ref: 'WOLF',
      name: 'Swipe',
      description: 'The wolf swipes with it\'s unusually sharp claws',
      offensive: true,
      aoe: false,
      cost: 15,
      cooldown: 0,
      level: 0,
      effects: [
        { effect: 'DAMAGE', intensity: 1, duration: 0 },
      ],
    },
    {
      ref: 'SINKING_BITE',
      legend_ref: 'WOLF',
      name: 'Sinking Bite',
      description: 'The wolf sinks it\'s serrated teeth into it\'s prey',
      offensive: true,
      aoe: false,
      cost: 20,
      cooldown: 0,
      level: 0,
      effects: [
        { effect: 'DAMAGE', intensity: 1, duration: 0 },
        { effect: 'BLEED', intensity: 1, duration: 3 },
      ],
    },
    {
      ref: 'LICK_WOUNDS',
      legend_ref: 'WOLF',
      name: 'Lick Wounds',
      description: 'The wolf licks it\'s wound\'s',
      offensive: false,
      aoe: false,
      cost: 25,
      cooldown: 0,
      level: 0,
      effects: [
        { effect: 'HEAL', intensity: 1, duration: 0 },
      ],
    },


    {
      ref: 'LAZY_SLAP',
      legend_ref: 'DAVE',
      name: 'Lazy Slap',
      description: 'Astonishingly, Dave manages to lift an arm',
      default: true,
      offensive: true,
      aoe: false,
      cost: 15,
      cooldown: 0,
      level: 0,
      effects: [
        { effect: 'DAMAGE', intensity: 1, duration: 0 },
      ],
    },
    {
      ref: 'BELLY_FLOP',
      legend_ref: 'DAVE',
      name: 'Belly Flop',
      description: 'Dave falls over, creating tremors in the earth',
      default: true,
      offensive: true,
      aoe: true,
      cost: 25,
      cooldown: 1,
      level: 0,
      effects: [
        { effect: 'DAMAGE', intensity: 1, duration: 0 },
      ],
    },
    {
      ref: 'SNACK',
      legend_ref: 'DAVE',
      name: 'Snack',
      description: 'Dave desperately scavenges for snacks, shoving whatever he finds into his mouth',
      default: true,
      offensive: false,
      aoe: false,
      cost: 30,
      cooldown: 2,
      level: 0,
      effects: [
        { effect: 'HEAL', intensity: 1, duration: 0 },
      ],
    },
  ],
};
