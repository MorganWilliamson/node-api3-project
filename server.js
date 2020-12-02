const express = require('express');
const middleware = require('./api/middleware');

const server = express();
server.use(middleware.logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
