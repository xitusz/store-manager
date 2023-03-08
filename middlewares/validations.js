const productsServices = require('../services/productsServices');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateNameAlreadyExists = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsServices.getByName(name);

  if (product) return res.status(409).json({ message: 'Product already exists' });

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateSaleProductId = (req, res, next) => {
  const [{ productId }] = req.body;

  if (productId === undefined) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateSaleQuantity = (req, res, next) => {
  const [{ quantity }] = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateName,
  validateNameLength,
  validateQuantity,
  validateSaleProductId,
  validateSaleQuantity,
  validateNameAlreadyExists,
};