module.exports = {

  DAMAGE: {
    name: 'Damage',
    description: 'Damage\'s an opponent',
    apply(battler) {
      battler.health -= 20;
      return battler;
    },
  },

  BURN: {
    name: 'Burn',
    description: 'Burn\'s an opponent',
    apply(battler) {
      battler.health -= 5;
      return battler;
    },
  },

  BLEED: {
    name: 'Bleed',
    description: 'Bleed\'s an opponent',
    apply(battler) {
      battler.health -= 5;
      return battler;
    },
  },

  HEAL: {
    name: 'Burn',
    description: 'Heal\'s an ally',
    apply(battler) {
      battler.health += 20;
      return battler;
    },
  },

};
