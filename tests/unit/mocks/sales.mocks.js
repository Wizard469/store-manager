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

const fetchedSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const salesFetchedSuccessfully = {
  status: 200,
  message: fetchedSales,
};

const fetchedSalesById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const salesFetchedByIdSuccessfully = {
  status: 200,
  message: fetchedSalesById,
}

const salesFetchedByIdUnsuccessfully = {
  status: 404,
  message: {
    message: 'Sale not found',
  },
};

module.exports = {
  salesBodyMock,
  salesService,
  salesServiceError,
  fetchedSales,
  salesFetchedSuccessfully,
  fetchedSalesById,
  salesFetchedByIdSuccessfully,
  salesFetchedByIdUnsuccessfully,
};
