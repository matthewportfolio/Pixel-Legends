const Inventory = require('./Inventory');
const Skill = require('../Skill');
const { CREATE_SKILL } = require('../../util/queries');

class LegendSkillInventory extends Inventory {
  constructor(legend, iterable) {
    super(legend.client, iterable);
    this.legend = legend;
  }

  get lineup() {
    return this.filter((x) => x.position)
      .sort((a, b) => a.position - b.position)
      .first(3);
  }

  get default() {
    return this.filter((x) => x.default);
  }

  async add(skill, position) {
    const template = this.client.templates.skills.get(skill.ref || skill);
    if (!template) throw new Error('The template for this skill doesn\'t exist');

    const { rows: [data] } = await this.client.db.query(CREATE_SKILL({
      position, legendID: this.legend.id, ref: template.ref,
    }));

    skill = new Skill(this.client, { ...template, ...data });
    this.client.skills.set(skill.id, skill);
    return skill;
  }
}

module.exports = LegendSkillInventory;
