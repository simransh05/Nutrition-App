const express = require('express');
const routes = express.Router();

const controller = require('../Controller/Total');

routes.get('/',controller.getTotal);
routes.post('/',controller.postTotal);

module.exports = routes;