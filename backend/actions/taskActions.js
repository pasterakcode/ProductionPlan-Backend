const Task = require('../db/models/taskModel');

module.exports = {
	async getAllTasks(req, res) {
		// pobieranie zadań
		try {
			const tasks = await Task.find({});
			res.status(200).json(tasks);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	async getTask(req, res) {
		// pobieranie zadania
		const id = req.params.id;
		try {
			const task = await Task.findOne({ _id: id });
			res.status(200).json(task);
		} catch (err) {
			return res.status(404).json({ message: err.message });
		}
	},
	async getProductionLines(req, res) {
		// pobieranie tablicy z aktualnymi liniami produkcyjnymi
		try {
			const tasks = await Task.find({});
			const productionLines = tasks.map(x => x.productionLine);
			const uniqueProductionLines = [...new Set(productionLines)];
			res.status(200).json(uniqueProductionLines);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
	async getDoneTasks(req, res) {
		// pobieranie zakończonych zleceń
		const productionLine = req.params.productionLine;
		try {
			const tasks = await Task.find({
				'isDone.status': true,
				productionLine: productionLine,
			});
			res.status(200).json(tasks);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async getPausedTasks(req, res) {
		// pobieranie wstrzymanych zleceń
		const productionLine = req.params.productionLine;
		try {
			const tasks = await Task.find({
				'isPaused.status': true,
				productionLine: productionLine,
			});
			res.status(200).json(tasks);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async getPlannedTasks(req, res) {
		// pobieranie planowanych zleceń (nierozpoczętych + rozpoczętych)
		const productionLine = req.params.productionLine;
		try {
			const tasks = await Task.find({
				'isPaused.status': false,
				'isDone.status': false,
				productionLine: productionLine,
			});
			res.status(200).json(tasks);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async saveTask(req, res) {
		// zapisywanie zadania
		const productionLine = req.body.productionLine;
		const item = req.body.item;
		const planned = req.body.planned;
		const user = req.body.user;
		const operationHistory = {
			stock: 0,
			operation: 'created task',
			date: new Date(),
			user: user,
		};
		try {
			const newTask = new Task({
				productionLine: productionLine.toUpperCase(),
				item,
				planned,
				reportHistory: [operationHistory],
			});
			await newTask.save();
			res.status(201).json(newTask);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async activeTask(req, res) {
		// edycja zadań
		const id = req.params.id;
		const user = req.body.user;
		const operationHistory = {
			stock: 0,
			operation: 'active task',
			date: new Date(),
			user: user,
		};
		try {
			const task = await Task.findOne({ _id: id });
			task.isInProgress.status = true;
			task.reportHistory = task.reportHistory
				? [...task.reportHistory, operationHistory]
				: [operationHistory];
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async editTask(req, res) {
		// edycja ilości planowanej do wykonania
		const id = req.params.id;
		const planned = req.body.planned;
		const user = req.body.user;
		try {
			const task = await Task.findOne({ _id: id });
			const operationHistory = {
				stock: task.produced,
				operation: 'update task',
				comment: `change planned qty from: ${task.planned} to: ${planned}`,
				date: new Date(),
				user: user,
			};
			task.planned = planned;
			task.reportHistory = task.reportHistory
				? [...task.reportHistory, operationHistory]
				: [operationHistory];
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async reportTask(req, res) {
		// raportowanie produkcji
		const id = req.params.id;
		const produced = req.body.produced;
		const user = req.body.user;
		try {
			const task = await Task.findOne({ _id: id });
			const operationHistory = {
				stock: task.produced + produced,
				operation: 'production reporting',
				comment: `produced: ${produced}pcs.`,
				date: new Date(),
				user: user,
			};
			task.produced = task.produced + produced;
			if (task.planned <= task.produced) {
				task.isInProgress = false;
				task.isDone.status = true;
				task.isDone.completedDate = Date.now();
				operationHistory.comment = `produced: ${produced}pcs. Task completed!`;
			}
			task.reportHistory = task.reportHistory
				? [...task.reportHistory, operationHistory]
				: [operationHistory];
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async pauseTask(req, res) {
		// wstrzymywanie produkcji
		const id = req.params.id;
		const reason = req.body.reason;
		const user = req.body.user;
		try {
			const task = await Task.findOne({ _id: id });
			const operationHistory = {
				stock: task.produced,
				operation: 'paused task',
				comment: `reason: ${reason}`,
				date: new Date(),
				user: user,
			};
			task.isInProgress.status = false;
			task.isPaused.status = true;
			task.isPaused.reason = reason;
			task.isPaused.fromDate = new Date();
			task.reportHistory = task.reportHistory
				? [...task.reportHistory, operationHistory]
				: [operationHistory];
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async resumeTask(req, res) {
		// wstrzymywanie produkcji
		const id = req.params.id;
		const comment = req.body.comment;
		const user = req.body.user;
		try {
			const task = await Task.findOne({ _id: id });
			const operationHistory = {
				stock: task.produced,
				operation: 'resume task',
				comment: comment,
				date: new Date(),
				user: user,
			};
			task.isInProgress.status = true;
			task.isPaused.status = false;
			task.isPaused.toDate = new Date();
			task.reportHistory = task.reportHistory
				? [...task.reportHistory, operationHistory]
				: [operationHistory];
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async deleteTask(req, res) {
		// usuwanien zadań
		const id = req.params.id;
		try {
			await Task.deleteOne({ _id: id });
			res.sendStatus(204);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
};
