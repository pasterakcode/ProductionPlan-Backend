const express = require('express');
const router = express.Router();
const taskActions = require('../actions/taskActions');

// pobieranie zleceń
router.get('/tasks', taskActions.getAllTasks);
// pobieranie jednego zlecenia
router.get('/tasks/:id', taskActions.getTask);
// zapisywanie nowych zleceń
router.post('/tasks', taskActions.saveTask);
// edytowanie zleceń
router.put('/tasks/:id', taskActions.updateTask);
// usuwanie zleceń
router.delete('/tasks/:id', taskActions.deleteTask);
// raportowanie produkcji
router.put('/tasks/report/:id', taskActions.reportTask);
// wstrzymywanie zlecenia
router.put('/tasks/pause/:id', taskActions.pauseTask);

module.exports = router;
