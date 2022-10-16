const express = require('express');

const productsControllers = require('../controllers/products.controllers');

const routes = express.Router();

routes.get('/products', productsControllers.getAll);
routes.get('/products/:id', productsControllers.getById);
routes.post('/products', productsControllers.addProduct);

module.exports = routes;
