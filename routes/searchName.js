const express = require('express');
const routes = express.Router();

const controllers = require('../Controller/searchName')


routes.get('/', controllers.getSearchName);

routes.post('/',controllers.postSearchName);

module.exports = routes;