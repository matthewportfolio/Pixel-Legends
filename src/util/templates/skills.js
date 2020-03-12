const effects = require('./effects');

module.exports = {
  SWIPE: {
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
      { ...effects.DAMAGE, intensity: 1, duration: 0 },
    ],
  },
  SINKING_BITE: {
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
      { ...effects.DAMAGE, intensity: 1, duration: 0 },
      { ...effects.BLEED, intensity: 1, duration: 3 },
    ],
  },
  LICK_WOUNDS: {
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
      { ...effects.HEAL, intensity: 1, duration: 0 },
    ],
  },


  LAZY_SLAP: {
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
      { ...effects.DAMAGE, intensity: 1, duration: 0 },
    ],
  },
  BELLY_FLOP: {
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
      { ...effects.DAMAGE, intensity: 1, duration: 0 },
    ],
  },
  SNACK: {
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
      { ...effects.HEAL, intensity: 1, duration: 0 },
    ],
  },
};
