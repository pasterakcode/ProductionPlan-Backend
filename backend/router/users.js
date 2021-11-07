const express = require('express');
const router = express.Router();
const userActions = require('../actions/userActions');

// pobranie wszystkich użytkowników 
router.get('/users', userActions.getUsers);
// pobieranie jednego użytownika / logowanie
router.get('/users/login', userActions.loginUser);
// dodawanie nowego użytkownika
router.post('/users', userActions.saveUser);
// kasowanie użytkownika
router.delete('/users/:id', userActions.deleteUser)


module.exports = router;
