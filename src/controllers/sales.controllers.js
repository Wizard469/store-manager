const salesServices = require('../services/sales.services');

const salesControllers = {
  addSales: async (req, res) => {
    const sales = req.body;

    const { status, message } = await salesServices.addNewSales(sales);

    if (status === 201) return res.status(status).json(message);

    res.status(status).json({ message });
  },
};

module.exports = salesControllers;
