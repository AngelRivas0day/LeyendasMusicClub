const express = require('express');
const router = express.Router();

const reservationControleer = require('../controllers/reservationController');

router.get('/list', reservationControleer.listAll);
router.post('/create', reservationControleer.create);
router.get('/list/:id', reservationControleer.listAll);
router.post('/update/:id', reservationControleer.edit);
router.get('/delete/:id', reservationControleer.delete);

module.exports = router;
