const express = require('express');
const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

const routes = express.Router();

routes.use(productsRoutes);
routes.use(salesRoutes);

module.exports = routes;
