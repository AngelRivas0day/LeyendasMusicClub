const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gamesController');

router.get('/list', gameController.listAll);
router.post('/create', gameController.create);
router.get('/list/:id', gameController.listAll);
router.post('/update/:id', gameController.edit);
router.get('/delete/:id', gameController.delete);

module.exports = router;
