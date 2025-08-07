const express = require('express')

const routes = express.Router();
const controllers = require('../Controller/signup');

routes.get('/', controllers.getSignup);

routes.post('/', controllers.postSignup);

module.exports = routes;
