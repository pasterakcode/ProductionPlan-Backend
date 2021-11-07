const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
	},
	accessLvl: {
		type: Number,
		min: 1,
		max: 3,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
