const BattleEmbed = require('./BattleEmbed');
const { Buttons } = require('../util/constants');
const Base = require('./Base');
const { chunk, wait } = require('../util/functions');

// IN PROGRESS

class Battle extends Base {
  constructor(client, data) {
    super(client);
    this.player = data.player;
    this.allies = data.player.legends.lineup.map((a) => a.battler);
    this.waves = chunk(data.enemies.map((e) => e.battler), 3);
    this.channel = data.channel;
    this.wave = 0;
    this.turn = 0;
    // this.partyTurn = 0;
    this._ended = false;
    this._battleEmbed = new BattleEmbed(this);
  }

  async _initialise() {
    this.player.inCombat = true;
    await this.player.fetchUser();
    this._message = await this._battleEmbed.initialise();
    await this._battleEmbed.setActive('Setting up GUI...').apply();
    for (const button of Object.values(Buttons)) await this._message.react(button);
    await this._battleEmbed.setActive('Ready!').apply();
  }

  async start() {
    await this._initialise();
    do {
      await this._nextTurn();
    }
    while (
      !this._ended
      && (
        this.allies.every((a) => a.health > 0)
        && this.waves.every((wave) => wave.every((e) => e.health > 0))
      )
    );
  }

  async _nextTurn() {
    const enemyTurn = Boolean(this.turn % 2);
    const party = enemyTurn ? this.waves[this.wave] : this.allies;
    for (const battler of party) {
      // calculate battler effects if any and apply them
      const effects = await this._tickEffects(battler);
      // if battler effects include a disable skip battler turn
      if (effects.some((e) => e.disable)) return;
      // only NOW update the skill bar to the battlers current skills (because we don't know if they were even going to get a turn)
      if (enemyTurn) await this._aiTurn(battler);
      else await this._playerTurn(battler);
    }
    console.log('here');
    this.turn += 1;
  }

  async _playerTurn(battler) {
    await this._battleEmbed
      .setSkillBar(battler.legend.skills.lineup)
      .setPortrait(battler)
      .apply();

    return new Promise((res) => {
      const filter = (r, user) => Object.values(Buttons)
        .includes(r.emoji.name) && user.id === this.player.id;

      const collector = this._message.createReactionCollector(filter, { time: 60000 });
      let skill;

      collector.on('collect', async (reaction) => {
        const emoji = reaction.emoji.name;

        switch (emoji) {
          case Buttons[1]:
          case Buttons[2]:
          case Buttons[3]:
            skill = battler.legend.skills.lineup[Object.values(Buttons).indexOf(emoji)];
            await this._battleEmbed.setActive(skill);
            break;
          case Buttons.tick:
            if (!skill) return;
            await this._setEffects(battler, skill);
            collector.stop();
            break;
          default:
        }
      });

      collector.on('end', (_, reason) => {
        if (reason === 'time') this._cleanup(collector);
        res(true);
      });
    });
  }

  async _aiTurn(battler) {

  }

  async _tickEffects(battler) {
    if (!battler.effects) return [];
  }

  async _setEffects(battler, skill) {

  }

  async _ability() {

  }

  _cleanup(collector) {
    this._ended = true;
    if (!collector.ended) collector.stop();
  }
}

module.exports = Battle;
