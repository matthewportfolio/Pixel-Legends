const Pool = require('pg-pool');

const {
  DB_URL,
  DB_MAX_CLIENTS,
  DB_IDLE_TIMEOUT,
  DB_CONNECTION_TIMEOUT,
} = process.env;


class PixelDB extends Pool {
  constructor() {
    super({
      connectionString: DB_URL,
      max: DB_MAX_CLIENTS,
      idleTimeoutMillis: DB_IDLE_TIMEOUT,
      connectionTimeoutMillis: DB_CONNECTION_TIMEOUT,
    });
  }

  async start() {
    await this.connect();
    console.log('Pool connected'.blue);
  }
}
module.exports = PixelDB;
