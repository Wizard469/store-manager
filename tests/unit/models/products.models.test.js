const sinon = require('sinon');
const { expect } = require("chai");

const productsModels = require("../../../src/models/products.models");
const connection = require("../../../src/models/connection");
const { productsMock, newProduct } = require("../mocks/products.mocks");

describe("Testing the Models of products", function () {
  afterEach(sinon.restore);

  it("should get all products (Model)", async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModels.getAll();

    expect(result).to.deep.equal(productsMock);
  });

  it("should get products by id (Model)", async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
    const result = await productsModels.getById(1);

    expect(result).to.deep.equal(productsMock[0]);
  });

  it('Should return the id of the new product (Model)', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 4 }])
      .onSecondCall()
      .resolves(newProduct);

    sinon.stub(productsModels, 'getById').resolves(newProduct);

    const result = await productsModels.addProduct('New Product');
    expect(result).to.deep.equal(newProduct);
  });
});
