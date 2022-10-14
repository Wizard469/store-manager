const productsService = require('../services/products.service');
const errorsMap = require('../helpers/errorsMap');

const productsController = {
  getAll: async (_req, res) => {
    const { message } = await productsService.getAll();
    res.status(200).json(message);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.getById(id);

    if (type) return res.status(errorsMap(type)).json({ message });
    return res.status(200).json(message);
  },
};

module.exports = productsController;
