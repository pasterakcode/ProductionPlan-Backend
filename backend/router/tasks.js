const express = require('express');
const router = express.Router();
const taskActions = require('../actions/taskActions');


router.get('/tasks', taskActions.getAllTasks);
router.get('/tasks/find/:id', taskActions.getTask);
router.get('/tasks/productionLines', taskActions.getProductionLines);
router.get('/tasks/planned/:productionLine', taskActions.getPlannedTasks);
router.get('/tasks/paused/:productionLine', taskActions.getPausedTasks);
router.get('/tasks/done/:productionLine', taskActions.getDoneTasks);
router.post('/tasks', taskActions.saveTask);
router.put('/tasks/active/:id', taskActions.activeTask);
router.put('/tasks/edit/:id', taskActions.editTask);
router.put('/tasks/report/:id', taskActions.reportTask);
router.put('/tasks/pause/:id', taskActions.pauseTask);
router.put('/tasks/resume/:id', taskActions.resumeTask);
router.delete('/tasks/:id', taskActions.deleteTask);

module.exports = router;
