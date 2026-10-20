const express = require('express');

const app = express();

const router = require('./route/route.js');
const userRoute = require('./route/user.route.js');
const messageRouter = require('./route/message.route.js');

app.use(express.json());

app.use('/user', userRoute);
app.use('/message',messageRouter);
app.use('/',router);

module.exports = app;