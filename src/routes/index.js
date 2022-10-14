const express = require('express');
const productsRoutes = require('./products.routes');

const routes = express.Router();

routes.use(productsRoutes);

module.exports = routes;
