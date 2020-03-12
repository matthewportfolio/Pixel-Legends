const { Collection } = require('discord.js');

class Inventory extends Collection {
  constructor(client, iterable) {
    super();
    Object.defineProperty(this, 'client', { value: client });
    if (iterable) for (const i of iterable) this._add(i);
  }

  _add(data) {
    return this.set(data.id || data.ref, data);
  }

  static get [Symbol.species]() {
    return Collection;
  }
}

module.exports = Inventory;
