const express = require('express')

const routes = express.Router();
const controllers = require('../Controller/profile');
const Auth = require('../middleware/auth');

routes.get('/', Auth.isLoggedIn, controllers.getProfile);

module.exports = routes;
