const Base = require('./Base');
const LegendSkillInventory = require('./inventories/LegendSkillInventory');
const { MODIFY, DELETE } = require('../util/queries');
const { Tables } = require('../util/constants');

class Legend extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this.ref = data.ref;
    this.name = data.name;
    this.description = data.description;
    this.rarity = data.rarity;
    this.image = data.image;
    this.class = data.class;
    this._patch(data);
  }

  get skills() {
    const skills = this.client.skills.filter((s) => s.legendID === this.id);
    return new LegendSkillInventory(this, skills.values());
  }

  get player() {
    return this.client.players.get(this.playerID);
  }

  get battler() {
    return {
      health: 100,
      stamina: 100,
      legend: this,
    };
  }

  get template() {
    return this.client.templates.legends.get(this.ref);
  }

  async edit(data) {
    await this.client.db.query(MODIFY(this.id, data, Tables.LEGENDS));
    this._patch(data);
    return this;
  }

  async delete() {
    await this.client.db.query(DELETE(this.id, Tables.LEGENDS));
    this.client.legends.delete(this.id);
    return this;
  }

  _patch(data) {
    if ('xp' in data) this.xp = data.xp;
    if (data.position) this.position = data.position;
    if (data.player_id) this.playerID = data.player_id;
    if (data.nickname) this.nickname = data.nickname;
    if (data.skill_bar) this.skillBar = data.skill_bar;
  }
}

module.exports = Legend;
