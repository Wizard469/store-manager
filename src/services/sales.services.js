const productsServices = require('./products.services');
const salesModels = require('../models/sales.models');

const checkProductsIds = async (products) => {
  const results = [];
  await Promise.all(
    products.map(async ({ productId }) => {
      const id = await productsServices.getById(productId);
      results.push(id);
    }),
  );
  return results.every((result) => result);
};

const mapProduct = (saleId, products) => products
  .map((product) => ({
    ...product,
    saleId,
  }));

const createSaleProducts = (saleId, saleProducts) => {
  const mappedProducts = mapProduct(saleId, saleProducts);

  mappedProducts.forEach(async (product) => {
    await salesModels.addProductsSales(product);
  });
};

const salesServices = {
  getAll: async () => {
    const result = await salesModels.getAll();
    return { status: 200, message: result };
  },

  getById: async (Id) => {
    const result = await salesModels.getById(Id);

    if (result.length !== 0) return { status: 200, message: result };

    return {
      status: 404,
      message: {
        message: 'Sale not found',
      },
    };
  },

  addNewSales: async (saleProducts) => {
    const validateId = await checkProductsIds(saleProducts);

    if (!validateId) return { status: 404, message: 'Product not found' };

    const saleId = await salesModels.addSales();

    createSaleProducts(saleId, saleProducts);

    return { status: 201, message: { id: saleId, itemsSold: saleProducts } };
  },
};

module.exports = salesServices;
