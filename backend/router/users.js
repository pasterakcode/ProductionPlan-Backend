const express = require('express');
const router = express.Router();
const apiUsers = require('../actions/apiUsers');

router.get('/', apiUsers);

module.exports = router;
