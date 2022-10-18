const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const { salesBodyMock, salesService, salesServiceError} = require('../mocks/sales.mocks');


describe('Testing the Controllers of sales', function () {
  afterEach(sinon.restore);

  it('Should add a new Sale', async function () {
    const res = {};
    const req = {
      body: salesBodyMock,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesServices, 'addNewSales').resolves(salesService);

    await salesControllers.addSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      itemsSold: salesBodyMock,
    });
  });

  it('Should return an error when productID is invalid', async function () {
    const res = {};
    const req = {
      body: salesBodyMock,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesServices, 'addNewSales').resolves(salesServiceError);

    await salesControllers.addSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
