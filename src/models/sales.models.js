const snakeize = require('snakeize');
const connection = require('./connection');

const salesModels = {
  getAll: async () => {
    const [result] = await connection.execute(
    `
  SELECT
    sp.sale_id AS saleId,
    sp.product_id AS productId,
    sp.quantity,
    sl.date
  FROM
    StoreManager.sales_products sp
  INNER JOIN
    StoreManager.sales sl
  ON
    sl.id = sp.sale_id
  ORDER BY
    saleId, productId;
  `,
  );
    return result;
  },

  getById: async (Id) => {
    const [result] = await connection.execute(
      `
  SELECT
    sp.product_id AS productId,
    sp.quantity,
    sl.date
  FROM
    StoreManager.sales_products sp
  INNER JOIN
    StoreManager.sales sl
  ON
    sl.id = sp.sale_id
  AND
    sp.sale_id = ?;
  `,
    [Id],
  );
    return result;
  },

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
