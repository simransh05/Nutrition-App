const express = require('express')

const routes = express.Router();
const controllers = require('../Controller/login');

routes.get('/', controllers.getLogin);

routes.post('/', controllers.postLogin);

module.exports = routes;