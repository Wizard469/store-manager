const productsModel = require('../models/products.models');

const productsServices = {
  getAll: async () => {
    const result = await productsModel.getAll();
    return result;
  },

  getById: async (id) => {
    const result = await productsModel.getById(id);
    return result || false;
  },

  addProduct: async (name) => {
    const result = await productsModel.addProduct(name);
    return result;
  },
};

module.exports = productsServices;
