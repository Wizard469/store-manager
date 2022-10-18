const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../src/services/products.services');
const salesServices = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');
const { newProduct } = require('../mocks/products.mocks');
const {
  salesBodyMock,
  salesService,
  salesServiceError,
  fetchedSales,
  fetchedSalesById,
  salesFetchedSuccessfully,
  salesFetchedByIdSuccessfully,
  salesFetchedByIdUnsuccessfully,
} = require('../mocks/sales.mocks');

describe('Testing the Services of sales', function () {
  afterEach(sinon.restore);

  it("Should add a sale (Service)", async function () {
    sinon.stub(salesModels, 'addSales').resolves(1);
    sinon.stub(productsServices, 'getById').resolves(newProduct);
    sinon.stub(salesModels, 'addProductsSales').resolves();

    const result = await salesServices.addNewSales(salesBodyMock);

    expect(result).to.deep.equal(salesService);
  });

  it("Should return a error when productId is invalid (Service)", async function () {
    sinon.stub(salesModels, 'addSales').resolves(1);
    sinon.stub(productsServices, 'getById').resolves(false);
    sinon.stub(salesModels, 'addProductsSales').resolves();

    const result = await salesServices.addNewSales(salesBodyMock);

    expect(result).to.deep.equal(salesServiceError);
  });

  it('Should get all sales (Service)', async function () {
    sinon.stub(salesModels, 'getAll').resolves(fetchedSales);

    const result = await salesServices.getAll();

    expect(result).to.deep.equal(salesFetchedSuccessfully);
  });

  it('Should get a sale by id (Service)', async function () {
    sinon.stub(salesModels, 'getById').resolves(fetchedSalesById);

    const result = await salesServices.getById(1);

    expect(result).to.deep.equal(salesFetchedByIdSuccessfully);
  });

  it('Should return an error when saleId is invalid (Service)', async function () {
    sinon.stub(salesModels, 'getById').resolves([]);

    const result = await salesServices.getById(50);

    expect(result).to.deep.equal(salesFetchedByIdUnsuccessfully);
  });
});
