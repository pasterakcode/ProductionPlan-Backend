const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	item: {
		type: String,
		required: true,
	},
	planned: {
		type: String,
		required: true,
	},
	produced: {
		type: Number,
		default: 0,
		required: true,
	},
	createDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	completedDate: {
		type: Date,
		required: false,
	},
	isInProgress: {
		type: Boolean,
		default: true,
		required: true,
	},
	isPaused: {
		type: Boolean,
		default: false,
		required: true,
	},
	isDone: {
		type: Boolean,
		default: false,
		required: true,
	},
	reportHistory: {
		type: Object,
		required: false,
	}
});
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
