const util = require('util');

const { IMGBB_TOKEN, IMGBB_URL } = process.env;
const fetch = require('node-fetch');

module.exports = {

  clean: (text, token) => {
    if (typeof text === 'string') {
      text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
      return text.replace(new RegExp(token, 'gi'), '****');
    }

    return text;
  },

  chunk: (array, size) => array.flatMap((_, i) => (i % size ? [] : [array.slice(i, i + size)])),

  wait: (ms) => util.promisify(setTimeout)(ms),

  upload: (buffer) => {
    const params = new URLSearchParams();
    params.append('key', IMGBB_TOKEN);
    params.append('image', buffer.toString('base64'));

    return fetch(IMGBB_URL, { method: 'POST', body: params })
      .then((res) => res.json())
      .then((obj) => obj.data.url);
  },

};
