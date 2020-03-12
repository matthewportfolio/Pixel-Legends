const { Command } = require('discord-akairo');
const { inspect } = require('util');
const Discord = require('discord.js');
const Jimp = require('jimp');
const { clean, upload, chunk } = require('../../util/functions');
const Queries = require('../../util/queries');
const Battle = require('../../structures/Battle');
const Enemy = require('../../structures/Enemy');
const Image = require('../../util/Image');

class EvalCommand extends Command {
  constructor() {
    super('eval', {
      ownerOnly: true,
      aliases: ['eval'],
      args: [
        {
          id: 'query',
          match: 'content',
        },
      ],
    });
  }

  async exec(message, { query }) {
    try {
      const evaled = await eval(query); // eslint-disable-line no-eval
      const response = `\`\`\`js\n${clean(inspect(evaled, { depth: 0 }), message.client.token)}\n\`\`\``;

      await message.channel.send(response);
    } catch (err) {
      console.error('Eval error:', err);
      return message.channel.send(`Error:\`\`\`xl\n${clean(err, message.client.token)}\n\`\`\``);
    }
  }
}

module.exports = EvalCommand;
