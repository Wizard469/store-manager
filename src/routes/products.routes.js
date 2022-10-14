const express = require('express');

const productsController = require('../controllers/products.controller');

const routes = express.Router();

routes.get('/products', productsController.getAll);
routes.get('/products/:id', productsController.getById);

module.exports = routes;
