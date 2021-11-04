const Task = require('../db/models/task')

module.exports = {
	saveTask(req, res) {
		const newTask = new Task({
			item: 'DGD0102155',
			planned: 3000,
			done: 0,
			isInProgress: {
				status: false,
			},
		});
		
		newTask.save().then(() => {
			console.log('notatka zapisana');
		});
		
		res.send('Serwer tasks działa!');
	},
};
