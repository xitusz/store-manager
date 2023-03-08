const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);

  return sale;
};

const update = async (id, productId, quantity) => {
  const sale = await salesModels.update(id, productId, quantity);

  return sale;
};

module.exports = {
  getAll,
  getById,
  update,
};