const jwt = require('jsonwebtoken');

exports.login = (req,res,next) => {
    const token = jwt.sign({nickname: req.body.nickname}, "verg61er6g51r651b6e1tg6rt851hg61rt5");
    res.status(201).json(token);
}