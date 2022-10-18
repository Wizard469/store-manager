const salesBodyMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const salesService = {
  status: 201,
  message: {
    id: 1,
    itemsSold: salesBodyMock,
  },
};

const salesServiceError = {
  status: 404,
  message: 'Product not found',
};

module.exports = {
  salesBodyMock,
  salesService,
  salesServiceError,
};
