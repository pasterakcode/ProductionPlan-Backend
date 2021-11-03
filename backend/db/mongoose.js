const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/productionPlan', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const Task = mongoose.model('Task', {
	item: String,
	planned: Number,
	done: Number,
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

const newTask = new Task({
	item: 'DGD0102150',
	planned: 2000,
	done: 0,
	isInProgress: {
		status: false,
	},
});

newTask.save().then(() => {
	console.log('notatka zapisana');
});
