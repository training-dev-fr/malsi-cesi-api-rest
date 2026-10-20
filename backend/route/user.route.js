const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log("récupération de user");
});

router.get('/:id', () => {
    console.log("récupération de user par id");
});

router.post('/', () => {
    console.log("création de user");
});

router.put('/', () => {
    console.log("modification de user");
});

router.delete('/', () => {
    console.log("suppression de user");
});


module.exports = router;