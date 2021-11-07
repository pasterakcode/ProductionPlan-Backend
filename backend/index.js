const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouterTasks = require('./router/tasks');
const apiRouterUsers = require('./router/users');
const bodyParser = require('body-parser');

//  db
require('./db/mongoose')

//  parser
app.use(bodyParser.json())

// routers
app.use('/api', apiRouterTasks);
app.use('/api', apiRouterUsers);

// serwer
app.listen(port, () => {
	console.log('serwer słucha na porcie: ' + port);
});
