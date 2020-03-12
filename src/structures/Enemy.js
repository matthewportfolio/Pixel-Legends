const Base = require('./Base');
const EnemySkillInventory = require('./inventories/EnemySkillInventory');
const Skill = require('./Skill');

class Enemy extends Base {
  constructor(client, data) {
    super(client);
    this.ref = data.ref;
    this.class = data.class;
    this.boss = Boolean(data.boss);
    this.image = data.image;
    this.stage = data.stage;
  }

  get skills() {
    const skills = Object.values(this.client.templates.enemies[this.ref].skills)
      .map((s) => new Skill(this.client, s));

    return new EnemySkillInventory(this, skills.values());
  }

  get battler() {
    return {
      health: 100,
      stamina: 100,
      enemy: this,
    };
  }
}

module.exports = Enemy;
