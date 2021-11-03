const express = require('express');
const router = express.Router();
const apiTasks = require('../actions/apiTasks');

router.get('/', apiTasks.homepage);

module.exports = router;
