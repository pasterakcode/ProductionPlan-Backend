const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouterTasks = require('./router/tasks');

//  db
require('./db/mongoose')

// routers
app.use('/', apiRouterTasks);

// serwer
app.listen(port, () => {
	console.log('serwer słucha na porcie: ' + port);
});
