const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const secure = require("../middleware/secure")
const { body } = require('express-validator');
const limitLogin = require('../middleware/limitLogin');



router.post('/signup', usersCtrl.signup);

router.post('/login', limitLogin, usersCtrl.login);

router.get('/logout', secure, usersCtrl.logout);

router.get('/home', secure, usersCtrl.getUserHome);

router.put('/account/m', secure, usersCtrl.modifyUser);

router.delete('/account/d', secure, usersCtrl.deleteUser);

module.exports = router; 