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
	async saveTask(req, res) {
		// zapisywanie zadania
		const item = req.body.item;
		const planned = req.body.planned;
		const produced = 0;
		const created = new Date();
		const isInProgress = { status: false };
		const isPaused = { status: false };
		const isDone = { status: false };
		try {
			const newTask = new Task({
				item,
				planned,
				produced,
				created,
				isInProgress,
				isPaused,
				isDone,
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
			if (!task.isInProgress.status) {
				task.isInProgress = { status: true, startDate: new Date() };
			}
			if (task.planned <= task.produced) {
				task.isInProgress = {
					status: false,
					startDate: task.isInProgress.startDate || new Date(),
				};
				task.isDone = { status: true, doneDate: new Date() };
			}
			await task.save();
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	async pauseTask(req, res) {
		// raportowanie produkcji
		const id = req.params.id;
		try {
			const task = await Task.findOne({ _id: id });
			task.isInProgress = { status: false };
			task.isPaused = { status: true, pausedDate: new Date() };
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
