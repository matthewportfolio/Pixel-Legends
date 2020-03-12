const Inventory = require('./Inventory');
const Legend = require('../Legend');
const { CREATE_LEGEND } = require('../../util/queries');

class PlayerLegendInventory extends Inventory {
  constructor(player, iterable) {
    super(player.client, iterable);
    this.player = player;
  }

  get lineup() {
    return this.filter((x) => x.position)
      .sort((a, b) => a.position - b.position)
      .first(3);
  }

  async add(legend) {
    const template = this.client.templates.legends.get(legend.ref || legend);
    if (!template) throw new Error('The template for this legend doesn\'t exist');

    const { rows: [data] } = await this.client.db.query(CREATE_LEGEND({
      playerID: this.player.id, ref: template.ref,
    }));

    legend = new Legend(this.client, { ...template, ...data });
    this.client.legends.set(legend.id, legend);
    return legend;
  }
}

module.exports = PlayerLegendInventory;
