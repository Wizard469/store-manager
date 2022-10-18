const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const {
  salesBodyMock,
  salesService,
  salesServiceError,
  fetchedSales,
  fetchedSalesById,
  salesFetchedSuccessfully,
  salesFetchedByIdSuccessfully,
} = require('../mocks/sales.mocks');


describe('Testing the Controllers of sales', function () {
  afterEach(sinon.restore);

  it('Should add a new Sale (Controller)', async function () {
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

  it('Should return an error when productID is invalid (Controller)', async function () {
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

  it('Should get all sales (Controller)', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesServices, 'getAll').resolves(salesFetchedSuccessfully);

    await salesControllers.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(fetchedSales);
  });

  it('Should get a sale by id (Controller)', async function () {
    const res = {};
    const req = {
      params: {
        id: 1
      }
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesServices, 'getById').resolves(salesFetchedByIdSuccessfully);

    await salesControllers.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(fetchedSalesById);
  });
});
