const { MessageEmbed } = require('discord.js');
const Skill = require('./Skill');

class BattleEmbed extends MessageEmbed {
  constructor(battle) {
    super();
    this.battle = battle;
    this.channel = battle.channel;
  }

  async initialise() {
    this.addField('Active', '\u200b');
    this.addField('Skills', '\u200b');
    this.message = await this.channel.send(this);
    return this.message;
  }

  setActive(info) {
    if (info instanceof Skill) {
      this.fields[0].value = info.description;
    } else this.fields[0].value = info;
    return this;
  }

  setPortrait(battler) {
    this.setThumbnail(battler.legend.image);
    return this;
  }

  setSkillBar(skills) {
    this.fields[1].value = skills.map((s) => s.name).join('\n');
    return this;
  }

  setEffects(battler) {

  }

  apply() {
    return this.message.edit({ embed: this });
  }

  get _clone() {
    return new MessageEmbed(this);
  }
}

module.exports = BattleEmbed;
