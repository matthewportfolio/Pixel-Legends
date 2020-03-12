const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class ProfileCommand extends Command {
  constructor() {
    super('start', {
      ownerOnly: false,
      aliases: ['start'],
    });
  }

  async exec(message) {


  }
}

module.exports = ProfileCommand;
