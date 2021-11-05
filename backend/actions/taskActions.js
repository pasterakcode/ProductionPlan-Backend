const Task = require('../db/models/task');

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
	async getDoneTasks(req, res) {
		// pobieranie zakończonych zleceń
		try {
			const tasks = await Task.find({ isDone: true });
			res.status(200).json(tasks);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async getPausedTasks(req, res) {
		// pobieranie wstrzymanych zleceń
		try {
			const tasks = await Task.find({});
			res.status(200).json(tasks);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async saveTask(req, res) {
		// zapisywanie zadania
		const item = req.body.item;
		const planned = req.body.planned;
		try {
			const newTask = new Task({
				item,
				planned,
			});
			await newTask.save();
			res.status(201).json(newTask);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async updateTask(req, res) {
		// edycja zadań
		const id = req.params.id;
		const planned = req.body.planned;
		try {
			const task = await Task.findOne({ _id: id });
			task.planned = planned;
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
		try {
			const task = await Task.findOne({ _id: id });
			task.produced = task.produced + produced;
			if (task.reportHistory) {
				task.reportHistory =
					[...task.reportHistory, { count: produced, date: new Date }];
			} else {
				task.reportHistory = [{ count: produced, date: new Date }];
			}
			if (task.planned <= task.produced) {
				task.isInProgress = false;
				task.isDone = true;
				task.completedDate = Date.now();
			}
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async pauseTask(req, res) {
		// wstrzymywanie produkcji
		const id = req.params.id;
		try {
			const task = await Task.findOne({ _id: id });
			task.isInProgress = false;
			task.isPaused = true;
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
