const express = require('express');
const router = express.Router();

router.get('/',() => {
    console.log("récupération de données"); 
});

router.post('/',() => {
    console.log("création de données"); 
});

module.exports = router;