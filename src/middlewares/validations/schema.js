const joy = require('joi');

const idSchema = joy.number().integer().min(1).required();

module.exports = {
  idSchema,
};
