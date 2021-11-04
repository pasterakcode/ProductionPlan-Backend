const express = require('express');
const router = express.Router();
const taskActions = require('../actions/apiTasks');

router.get('/', taskActions.saveTask);

module.exports = router;
