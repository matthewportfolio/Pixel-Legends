const { Structures } = require('discord.js');
const Queries = require('../util/queries');

const { DEFAULT_PREFIX } = process.env;

module.exports = Structures.extend('Guild', (Guild) => {
  class PixelGuild extends Guild {
    async fetchPrefix() {
      if (this.prefix) return this.prefix;

      const { rows: [entry] } = await this.client.db
        .query(Queries.GET_GUILD_PREFIX({ id: this.id }));
      if (!entry) return DEFAULT_PREFIX;

      this.prefix = entry.prefix;
      return this.prefix;
    }
  }

  return PixelGuild;
});
