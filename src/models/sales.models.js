const snakeize = require('snakeize');
const connection = require('./connection');

const salesModels = {
  addSales: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales() VALUE();',
    );
    return insertId;
  },

  addProductsSales: async (sales) => {
    const columns = Object.keys(snakeize(sales)).join(', ');
    const placeholders = Object.keys(sales).map((_key) => '?').join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders});`,
    [...Object.values(sales)],
  );
  },
};

module.exports = salesModels;
