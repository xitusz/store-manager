const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await salesServices.getById(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;

    const newProduct = await salesServices.update(id, productId, quantity);
    
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  update,
};