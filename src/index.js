require('dotenv').config({ path: '../.env' });
require('colors');
require('./structures/Guild');
const PixelClient = require('./structures/Client');

new PixelClient().start();
