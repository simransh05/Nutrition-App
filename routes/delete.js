const express = require('express');
const routes = express.Router();

const controller = require('../Controller/delete')

routes.post('/', controller.postDelete);

routes.post('/history', controller.postDeleteHistory);
routes.post('/find',controller.postDeleteFind);
module.exports = routes;