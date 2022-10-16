const sinon = require('sinon');
const { expect } = require("chai");

const productsServices = require("../../../src/services/products.services");
const productsModels = require("../../../src/models/products.models");
const { productsMock } = require("../mocks/products.mocks");

describe("Testing the Services of products", function () {
  afterEach(sinon.restore);

  it("should get all products (Service)", async function () {
    sinon.stub(productsModels, "getAll").resolves(productsMock);
    const result = await productsServices.getAll();

    expect(result).to.deep.equal({ type: null, message: productsMock })
  });

  it("should get products by id (Service)", async function () {
    sinon.stub(productsModels, "getById").resolves(productsMock[0]);
    const result = await productsServices.getById(1);

    expect(result).to.deep.equal({ type: null, message: productsMock[0] })
  });

  it("should get an error if the id is invalid", async function () {
    sinon.stub(productsModels, "getById").resolves(undefined);
    const result = await productsServices.getById(-5);

    expect(result).to.deep.equal({ type: "INVALID_ID", message: "Invalid id" });
  });

  it("should get an error if the id does not exist", async function () {
    sinon.stub(productsModels, "getById").resolves(undefined);
    const result = await productsServices.getById(9);

    expect(result).to.deep.equal({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });
  });
});
