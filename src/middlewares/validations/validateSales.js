const validateQt = (products) => {
  const productQt = products.every(({ quantity }) => quantity !== undefined);
  if (!productQt) return { status: 400, message: '"quantity" is required' };

  const validateQtValue = products.every(({ quantity }) => Number(quantity) > 0);
  if (!validateQtValue) {
    return {
      status: 422, message: '"quantity" must be greater than or equal to 1',
    };
  }

  return false;
};

const validateProductId = (products) => {
  const productIds = products.every(({ productId = 0 }) => productId);

  if (!productIds) return { message: '"productId" is required' };

  return false;
};

const validateSales = (req, res, next) => {
  const salesBody = req.body;

  if (validateProductId(salesBody)) {
    const message = validateProductId(salesBody);
    return res.status(400).json(message);
  }

  if (validateQt(salesBody)) {
    const { status, message } = validateQt(salesBody);
    return res.status(status).json({ message });
  }

  next();
};

module.exports = validateSales;
