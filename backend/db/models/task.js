const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
	item: String,
	planned: Number,
	produced: Number,
    created: Date,
	isInProgress: {
		status: Boolean,
		startDate: Date,
	},
	isPaused: {
		status: Boolean,
		pausedDate: Date,
	},
	isDone: {
		status: Boolean,
		doneDate: Date,
	},
});

module.exports = Task;

