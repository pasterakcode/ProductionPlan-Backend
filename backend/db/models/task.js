const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	productionLine: {
		type: String,
		required: true,
	},
	item: {
		type: String,
		required: true,
	},
	planned: {
		type: Number,
		required: true,
	},
	produced: {
		type: Number,
		default: 0,
		required: true,
	},
	// createDate: {
	// 	type: Date,
	// 	default: Date.now,
	// 	required: true,
	// },
	isInProgress: {
		status: { type: Boolean, default: false, required: true },
		date: { type: Date, required: false },
	},
	isPaused: {
		status: { type: Boolean, default: false, required: true },
		reason: { type: String, required: false },
		fromDate: { type: Date, required: false },
		toDate: { type: Date, required: false },
	},
	isDone: {
		status: { type: Boolean, default: false, required: true },
		completedDate: { type: Date, required: false },
	},
	reportHistory: {
		type: Object,
		required: false,
	},
});
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
