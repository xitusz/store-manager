const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  try {
  const products = await productsServices.getAll();

  res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsServices.getById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsServices.create(name, quantity);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const newProduct = await productsServices.update(id, name, quantity);

    if (!newProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsServices.exclude(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};