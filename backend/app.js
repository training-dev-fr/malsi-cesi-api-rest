const express = require('express');
const cors = require('cors');

const app = express();

const router = require('./route/route.js');
const userRoute = require('./route/user.route.js');
const messageRouter = require('./route/message.route.js');

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/message',messageRouter);
app.use('/',router);

module.exports = app;