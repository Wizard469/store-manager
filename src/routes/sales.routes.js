const express = require('express');
const salesControllers = require('../controllers/sales.controllers');

const validateSales = require('../middlewares/validations/validateSales');

const routes = express.Router();

routes.post('/sales', validateSales, salesControllers.addSales);

module.exports = routes;
