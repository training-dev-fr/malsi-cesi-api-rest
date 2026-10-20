const express = require('express');
const router = express.Router();
const userController = require('./../controller/message.controller.js');

router.get('/', userController.getAllMessage);

router.post('/', userController.addMessage);

module.exports = router;