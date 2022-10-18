const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const { salesBodyMock } = require('../mocks/sales.mocks');

describe('Testing the Models of sales', function () {
  afterEach(sinon.restore);

  it("Should add a Sale", async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModels.addSales();
    expect(result).to.equal(1);
  });

  it("Should add products to sales_products", async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModels.addProductsSales(salesBodyMock);

    expect(result).to.be.undefined;
  });
});
