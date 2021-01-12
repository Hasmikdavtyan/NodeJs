var express = require('express');
var router = express.Router();
const {registerPage, registerUser}= require('../controllers/userController')
const {User} = require('../models/user')

/* GET users listing. */
router.route('/')
.get(registerPage)

.post(registerUser)

module.exports = router;

