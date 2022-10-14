const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_ID', message: 'Invalid id' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
