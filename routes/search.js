const express = require('express');
const routes = express.Router();

const controllers = require('../Controller/search');

routes.get('/',controllers.getSearch);
routes.post('/',controllers.postSearch);
module.exports = routes;