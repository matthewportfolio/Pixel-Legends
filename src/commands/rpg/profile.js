const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class ProfileCommand extends Command {
  constructor() {
    super('profile', {
      aliases: ['profile', 'p'],
      args: [
        {
          id: 'user',
          match: 'content',
          type: 'user',
          default: (message) => message.author,
        },
      ],
    });
  }

  async exec(message, { user }) {
    /* const self = user.id === message.author.id;
    if (!profile) return message.util.send(`${self ? 'You have' : `${user.tag} has`} not yet created a profile! use \`!start\` to get started.`);

    const ProfileEmbed = new MessageEmbed()
      .setTitle(`${self ? 'Your' : `${user.tag}'s`} profile`)
      .setDescription(Object.entries(profile).join('\n'))
      .setColor('BLUE');

    return message.util.send(ProfileEmbed); */
  }
}

module.exports = ProfileCommand;
