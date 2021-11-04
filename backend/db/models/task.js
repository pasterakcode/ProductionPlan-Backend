const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
	item: String,
	planned: Number,
	produced: Number,
    created: Date,
	isInProgress: {
		status: Boolean,
		date: Date,
	},
	isPaused: {
		status: Boolean,
		date: Date,
	},
	isDone: {
		status: Boolean,
		date: Date,
	},
});

module.exports = Task;

