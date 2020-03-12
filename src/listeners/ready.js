const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    console.log(`Ready! ${this.client.user.tag}`.bold.blue);
  }
}

module.exports = ReadyListener;
