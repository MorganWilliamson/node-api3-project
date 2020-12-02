const express = require('express');
const helmet = require('helmet');
const middleware = require('./api/middleware');
const server = express();
const userRouter = require('./users/userRouter');

server.use(middleware.logger);
server.use(express.json());
server.use(helmet());
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
