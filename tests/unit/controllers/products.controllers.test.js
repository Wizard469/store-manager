const sinon = require('sinon');
const chai = require("chai");
const { expect } = chai;
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
chai.use(sinonChai);
chai.use(chaiHttp);
const app = require("../../../src/app");
const connection = require("../../../src/models/connection");
const { productsMock } = require("../mocks/products.mocks");

describe("Testing the Services of products", function () {
  afterEach(sinon.restore);

  it("should get all products (Controller)", async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsMock);
  });

  it("should get products by id (Controller)", async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

    const response = await chai.request(app).get('/products/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsMock[0]);
  });

  it("Should get the message 'Product not found' when no product is found (Controller)", async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const response = await chai.request(app).get('/products/50');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });
});
