/* eslint-disable camelcase */
const SQL = require('sql-template-strings');

module.exports = {

  INIT: `
            CREATE TABLE IF NOT EXISTS guilds (
              id                TEXT NOT NULL UNIQUE PRIMARY KEY,
              prefix            TEXT,
              lastcontract      TIMESTAMP
            );
                    
            CREATE TABLE IF NOT EXISTS players (
              id                TEXT NOT NULL UNIQUE PRIMARY KEY,
              xp                INTEGER,
              gold              INTEGER
            );

            CREATE TABLE IF NOT EXISTS legends (
              id                SERIAL PRIMARY KEY,
              xp                INTEGER,
              position          INTEGER,
              player_id         TEXT NOT NULL,
              ref               TEXT NOT NULL,
              UNIQUE (position, player_id)
            );

            CREATE TABLE IF NOT EXISTS skills (
              id                SERIAL PRIMARY KEY,
              position          INTEGER,
              legend_id         INTEGER NOT NULL,
              ref               TEXT NOT NULL,
              UNIQUE (ref, player_id),
              UNIQUE (position, legend_id)
            );
    `,

  GET_GUILD: ({ id }) => SQL`SELECT * FROM guilds WHERE id = ${id}`,
  GET_GUILD_PREFIX: ({ id }) => SQL`SELECT prefix FROM guilds WHERE id = ${id}`,
  CREATE_GUILD: ({ id, prefix, lastContract }) => SQL`INSERT INTO guilds VALUES(${id}, ${prefix}, ${lastContract})`,

  GET_PLAYER: ({ id }) => SQL`SELECT * FROM players WHERE id = ${id}`,
  CREATE_PLAYER: ({
    id, xp = 0, gold = 50,
  }) => SQL`INSERT INTO players VALUES(${id}, ${xp}, ${gold})`,

  CREATE_LEGEND: ({
    xp = 0, position, playerID: player_id, ref,
  }) => SQL`INSERT INTO legends VALUES(DEFAULT, ${xp}, ${position}, ${player_id}, ${ref}) RETURNING *`,

  CREATE_SKILL: ({
    position, legendID, ref,
  }) => SQL`INSERT INTO skills VALUES(DEFAULT, ${position}, ${legendID}, ${ref}) RETURNING *`,

  GET_ALL: (table) => SQL`SELECT * FROM`.append(`"${table}"`),

  DELETE: (id, table) => SQL`DELETE FROM `
    .append(`"${table}" `)
    .append(`WHERE id = '${id}' RETURNING *`),

  MODIFY: (id, data, table) => SQL`UPDATE `
    .append(`"${table}" `)
    .append('SET ')
    .append(Object.entries(data).map(([k, v]) => `${k} = ${typeof v === 'string' ? `"${v}"` : v}`).join(', '))
    .append(` WHERE id = '${id}'`),


};
