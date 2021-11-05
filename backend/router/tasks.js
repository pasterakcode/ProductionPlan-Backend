const express = require('express');
const router = express.Router();
const taskActions = require('../actions/taskActions');

// pobieranie zleceń
router.get('/tasks', taskActions.getAllTasks);
// pobieranie jednego zlecenia
router.get('/tasks/find/:id', taskActions.getTask);
// pobieranie zakończonych zleceń
router.get('/tasks/done', taskActions.getDoneTasks);
// // pobieranie wstrzymanych zleceń
router.get('/tasks/paused', taskActions.getPausedTasks);
// zapisywanie nowych zleceń
router.post('/tasks', taskActions.saveTask);
// edytowanie zleceń
router.put('/tasks/edit/:id', taskActions.updateTask);
// usuwanie zleceń
router.delete('/tasks/:id', taskActions.deleteTask);
// raportowanie produkcji
router.put('/tasks/report/:id', taskActions.reportTask);
// wstrzymywanie zlecenia
router.put('/tasks/pause/:id', taskActions.pauseTask);

module.exports = router;
