const express = require('express');
const routes = express.Router();

const controllers = require('../Controller/addData');

routes.get('/add', controllers.getAddData);

routes.post('/add', controllers.postAddData);
module.exports = routes;