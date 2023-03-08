const express = require('express');

const salesControllers = require('../controllers/salesControllers');
const {
  validateSaleProductId,
  validateSaleQuantity,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesControllers.getAll);

router.get('/:id', salesControllers.getById);

router.post('/', validateSaleProductId, validateSaleQuantity);

router.put(
  '/:id',
  validateSaleProductId,
  validateSaleQuantity,
  salesControllers.update,
);

module.exports = router;