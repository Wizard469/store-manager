const connection = require('./connection');

const productsModels = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products',
    );
    return result;
  },

  getById: async (id) => {
    const [[result]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id', [id],
    );
    return result;
  },

  addProduct: async (name) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products(name) VALUES(?)', [name],
    );
    const newProduct = await productsModels.getById(insertId);
    return newProduct;
  },
};

module.exports = productsModels;
