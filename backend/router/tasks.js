const express = require('express');
const router = express.Router();
const taskActions = require('../actions/taskActions');

// pobieranie wszystkich zleceń
router.get('/tasks', taskActions.getAllTasks);
// pobieranie jednego zlecenia
router.get('/tasks/find/:id', taskActions.getTask);
// pobieranie tablicy z liniami produkcyjnymi
router.get('/tasks/productionLines', taskActions.getProductionLines);
// // pobieranie planowanych zleceń
router.get('/tasks/planned/:productionLine', taskActions.getPlannedTasks);
// // pobieranie wstrzymanych zleceń
router.get('/tasks/paused/:productionLine', taskActions.getPausedTasks);
// pobieranie zakończonych zleceń
router.get('/tasks/done/:productionLine', taskActions.getDoneTasks);
// zapisywanie nowych zleceń
router.post('/tasks', taskActions.saveTask);
// aktywacja zlecenia
router.put('/tasks/active/:id', taskActions.activeTask);
// edytowanie zleceń
router.put('/tasks/edit/:id', taskActions.editTask);
// raportowanie produkcji
router.put('/tasks/report/:id', taskActions.reportTask);
// wstrzymywanie zlecenia
router.put('/tasks/pause/:id', taskActions.pauseTask);
// wstrzymywanie zlecenia
router.put('/tasks/resume/:id', taskActions.resumeTask);
// usuwanie zleceń
router.delete('/tasks/:id', taskActions.deleteTask);

module.exports = router;
