const errorMap = {
  INVALID_ID: 400,
  PRODUCT_NOT_FOUND: 404,
};

const errorsMap = (type) => errorMap[type] || 500;

module.exports = errorsMap;
