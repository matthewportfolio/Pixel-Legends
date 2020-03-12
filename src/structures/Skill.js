const Base = require('./Base');
const { MODIFY, DELETE } = require('../util/queries');
const { Tables } = require('../util/constants');

class Skill extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this.ref = data.ref;
    this.offensive = data.offensive;
    this.aoe = data.aoe;
    this.name = data.name;
    this.description = data.description;
    this.cost = data.cost;
    this.level = data.level;
    this.effects = data.effects;
    this.legendID = data.legend_id;
    this._patch(data);
  }

  get legend() {
    return this.client.legends.get(this.legendID);
  }

  get template() {
    return this.client.templates.skills.get(this.ref);
  }

  async edit(data) {
    await this.client.db.query(MODIFY(this.id, data, Tables.SKILLS));
    this._patch(data);
    return this;
  }

  async delete() {
    await this.client.db.query(DELETE(this.id, Tables.SKILLS));
    this.client.skills.delete(this.id);
    return this;
  }

  _patch(data) {
    if (data.position) this.position = data.position;
    if (data.legend_id) this.legendID = data.legend_id;
  }
}

module.exports = Skill;
