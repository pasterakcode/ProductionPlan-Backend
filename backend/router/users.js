const express = require('express');
const router = express.Router();
const userActions = require('../actions/userActions');

router.get('/users', userActions.getUsers);
router.get('/users/login', userActions.loginUser);
router.post('/users', userActions.saveUser);
router.delete('/users/:id', userActions.deleteUser)


module.exports = router;
