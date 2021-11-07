const User = require('../db/models/userModel');

module.exports = {
	// router.delete('/users/:id', userActions.deleteUser)
	async getUsers(req, res) {
		try {
			const users = await User.find({});
			res.status(200).json(users);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
	async loginUser(req, res) {
		const login = req.body.login;
		const password = req.body.password;
		try {
			const user = await User.findOne({ login: login.toLowerCase() });
			if (user.password === password) {
				res.status(200).json(user);
			} else {
				res.status(400).json({ message: 'błędne hasło!' });
			}
		} catch (err) {
			res.status(400).json({
				message: err.message + ' użytkownik: ' + login + ' nie istnieje!',
			});
		}
	},
	async saveUser(req, res) {
		const login = req.body.login;
		const accessLvl = req.body.accessLvl;
		const password = req.body.password;
		try {
			const user = await User.findOne({ login: login.toLowerCase() });
			if (user) {
				throw `User exsisted!`;
			}
			const newUser = new User({
				login: login.toLowerCase(),
				accessLvl,
				password,
			});
			await newUser.save();
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	},
	async deleteUser(req, res) {
		const id = req.params.id;
		try {
			await User.deleteOne({ _id: id });
			res.sendStatus(204);
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	},
};
