const { validateId } = require('../middlewares/validations/validateInput');
const productsModel = require('../models/products.model');

const productsService = {
  getAll: async () => {
    const result = await productsModel.getAll();
    return { type: null, message: result };
  },

  getById: async (id) => {
    const validation = validateId(id);
    if (validation.type) return validation;

    const result = await productsModel.getById(id);
    if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    console.log(result);
    return { type: null, message: result };
  },
};

module.exports = productsService;
