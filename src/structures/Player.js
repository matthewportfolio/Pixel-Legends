const { Tables } = require('../util/constants');
const Queries = require('../util/queries');
const Base = require('./Base');
const PlayerLegendInventory = require('./inventories/PlayerLegendInventory');

class Player extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this._patch(data);
  }

  get legends() {
    const legends = this.client.legends.filter((l) => l.playerID === this.id);
    return new PlayerLegendInventory(this, legends.values());
  }

  _patch(data) {
    if ('xp' in data) this.xp = data.xp;
    if ('gold' in data) this.gold = data.gold;
    if (data.user) this.user = data.user;
  }

  async fetchUser() {
    const user = this.client.users.fetch(this.id);
    this._patch({ user });
    return user;
  }

  async edit(data) {
    await this.client.db.query(Queries.MODIFY(this.id, data, Tables.PLAYERS));
    this._patch(data);
    return this;
  }

  static resolveID(player) {
    if (player instanceof this) return player.id;
    if (typeof player === 'string') return player;
    return null;
  }
}

module.exports = Player;
