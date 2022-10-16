const sinon = require('sinon');
const { expect } = require("chai");

const productsServices = require("../../../src/services/products.services");
const productsModels = require("../../../src/models/products.models");
const { productsMock, newProduct } = require("../mocks/products.mocks");

describe("Testing the Services of products", function () {
  afterEach(sinon.restore);

  it("should get all products (Service)", async function () {
    sinon.stub(productsModels, "getAll").resolves(productsMock);
    const result = await productsServices.getAll();

    expect(result).to.deep.equal(productsMock);
  });

  it("should get products by id (Service)", async function () {
    sinon.stub(productsModels, "getById").resolves(productsMock[0]);
    const result = await productsServices.getById(1);

    expect(result).to.deep.equal(productsMock[0]);
  });

  it("should return null, if the id does not exist (Service)", async function () {
    sinon.stub(productsModels, "getById").resolves(undefined);
    const result = await productsServices.getById(9);

    expect(result).to.deep.equal(false);
  });

  it('Should create a new product (Service)', async function () {
    sinon.stub(productsModels, 'addProduct').resolves(newProduct);

    const result = await productsServices.addProduct('New Product');

    expect(result).to.deep.equal(newProduct);
  });
});
