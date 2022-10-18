const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../src/services/products.services');
const salesServices = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');
const { newProduct } = require('../mocks/products.mocks');
const { salesBodyMock, salesService, salesServiceError } = require('../mocks/sales.mocks');

describe('Testing the Services of sales', function () {
  afterEach(sinon.restore);

  it("Should add a sale", async function () {
    sinon.stub(salesModels, 'addSales').resolves(1);
    sinon.stub(productsServices, 'getById').resolves(newProduct);
    sinon.stub(salesModels, 'addProductsSales').resolves();

    const result = await salesServices.addNewSales(salesBodyMock);

    expect(result).to.deep.equal(salesService);
  });

  it("Should return a error when productId is invalid", async function () {
    sinon.stub(salesModels, 'addSales').resolves(1);
    sinon.stub(productsServices, 'getById').resolves(false);
    sinon.stub(salesModels, 'addProductsSales').resolves();

    const result = await salesServices.addNewSales(salesBodyMock);

    expect(result).to.deep.equal(salesServiceError);
  });
});
