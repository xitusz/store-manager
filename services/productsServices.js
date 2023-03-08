const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);

  return product;
};

const getByName = async (name) => {
  const products = await productsModels.getByName(name);

  return products;
};

const create = async (name, quantity) => {
  const product = await productsModels.create(name, quantity);

  return product;
};

const update = async (id, name, quantity) => {
  const product = await productsModels.update(id, name, quantity);

  return product;
};

const exclude = async (id) => {
  const product = await productsModels.exclude(id);

  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  exclude,
};