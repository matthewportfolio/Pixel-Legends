const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require('discord-akairo');
const Queries = require('../util/queries');
const PixelDB = require('./Postgres');
const Player = require('./Player');
const Enemy = require('./Enemy');
const Skill = require('./Skill');
const Legend = require('./Legend');
const Inventory = require('./inventories/Inventory');
const LEGENDS = require('../util/templates/legends');
const ENEMIES = require('../util/templates/enemies');
const SKILLS = require('../util/templates/skills');

const {
  OWNER, TOKEN, DEFAULT_PREFIX,
} = process.env;

class PixelClient extends AkairoClient {
  constructor() {
    super({
      ownerID: OWNER,
    }, {
      disableEveryone: true,
      disabledEvents: ['TYPING_START'],
    });

    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      commandUtil: true,
      prefix: async (message) => {
        if (message.channel.type === 'dm') return DEFAULT_PREFIX;
        return message.guild.fetchPrefix();
      },
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors/',
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/',
    });

    this.templates = {
      legends: new Inventory(this),
      enemies: new Inventory(this),
      skills: new Inventory(this),
    };

    this.db = new PixelDB();
    this.players = new Inventory(this);
    this.legends = new Inventory(this);
    this.skills = new Inventory(this);
  }

  async createPlayer(player) {
    if (this.players.has(player.id)) throw new Error('A player with that id already exists');
    await this.db.query(Queries.CREATE_PLAYER(player));
    player = new Player(this, player);
    this.players.set(player.id, player);
    return player;
  }

  async _initialise() {
    await this.db.query(Queries.INIT);

    const players = await this.db.query(Queries.GET_ALL('players'));
    const legends = await this.db.query(Queries.GET_ALL('legends'));
    const skills = await this.db.query(Queries.GET_ALL('skills'));

    for (const data of Object.values(LEGENDS)) this.templates.legends.set(data.ref, data);
    for (const data of Object.values(ENEMIES)) this.templates.enemies.set(data.ref, data);
    for (const data of Object.values(SKILLS)) this.templates.skills.set(data.ref, data);

    for (const data of players.rows) this.players.set(data.id, new Player(this, data));
    for (const data of legends.rows) {
      const template = this.templates.legends.get(data.ref);
      this.legends.set(data.id, new Legend(this, { ...template, ...data }));
    }
    for (const data of skills.rows) {
      const template = this.templates.skills.get(data.ref);
      this.skills.set(data.id, new Skill(this, { ...template, ...data }));
    }

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    this.inhibitorHandler.loadAll();
    await this.db.start();
  }

  async start() {
    await this._initialise();
    return this.login(TOKEN);
  }
}

module.exports = PixelClient;
