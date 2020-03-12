const Inventory = require('./Inventory');

class EnemySkillInventory extends Inventory {
  constructor(enemy, iterable) {
    super(enemy.client, iterable);
    this.enemy = enemy;
  }
}

module.exports = EnemySkillInventory;
