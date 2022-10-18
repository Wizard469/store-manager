const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const { salesBodyMock, fetchedSales, fetchedSalesById } = require('../mocks/sales.mocks');

describe('Testing the Models of sales', function () {
  afterEach(sinon.restore);

  it("Should add a Sale (Model)", async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModels.addSales();
    expect(result).to.equal(1);
  });

  it("Should add products to sales_products (Model)", async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModels.addProductsSales(salesBodyMock);

    expect(result).to.be.undefined;
  });

  it('Should get all sales (Model)', async function () {
    sinon.stub(connection, 'execute').resolves([fetchedSales]);

    const result = await salesModels.getAll();

    expect(result).to.deep.equal(fetchedSales);
  });

  it('Should get a sale by id (Model)', async function () {
    sinon.stub(connection, 'execute').resolves([fetchedSalesById]);

    const result = await salesModels.getById(1);

    expect(result).to.deep.equal(fetchedSalesById);
  });
});
