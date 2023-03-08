const express = require('express');

const productsControllers = require('../controllers/productsControllers');
const {
  validateName,
  validateNameLength,
  validateQuantity,
  validateNameAlreadyExists,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/', productsControllers.getAll);

router.get('/:id', productsControllers.getById);

router.post(
  '/',
  validateName,
  validateNameLength,
  validateQuantity,
  validateNameAlreadyExists,
  productsControllers.create,
);

router.put(
  '/:id',
  validateName,
  validateNameLength,
  validateQuantity,
  validateNameAlreadyExists,
  productsControllers.update,
);

router.delete('/:id', productsControllers.exclude);

module.exports = router;