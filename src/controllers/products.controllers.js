const productsService = require('../services/products.services');

const productsControllers = {
  getAll: async (_req, res) => {
    const result = await productsService.getAll();
    res.status(200).json(result);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const result = await productsService.getById(id);

    if (result) return res.status(200).json(result);

    res.status(404).json({ message: 'Product not found' });
  },

  addProduct: async (req, res) => {
    const { name } = req.body;
    const result = await productsService.addProduct(name);

    res.status(201).json(result);
  },
};

module.exports = productsControllers;
