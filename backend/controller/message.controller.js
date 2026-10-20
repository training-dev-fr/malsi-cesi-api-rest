const fs = require('fs');

const getAllMessage = (req, res, next) => {
    const content = fs.readFileSync('./message.txt', {encoding: "utf8"});
    res.status(200).json(content);
}

const addMessage = (req, res, next) => {
    fs.appendFileSync("./message.txt",req.body.message + '\n');
    res.status(201).json("Message ajouté");
}


module.exports = {getAllMessage, addMessage}