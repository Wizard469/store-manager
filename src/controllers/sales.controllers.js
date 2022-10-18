const salesServices = require('../services/sales.services');

const salesControllers = {
  getAll: async (_req, res) => {
    const { status, message } = await salesServices.getAll();

    res.status(status).json(message);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { status, message } = await salesServices.getById(id);

    res.status(status).json(message);
  },

  addSales: async (req, res) => {
    const sales = req.body;

    const { status, message } = await salesServices.addNewSales(sales);

    if (status === 201) return res.status(status).json(message);

    res.status(status).json({ message });
  },
};

module.exports = salesControllers;
