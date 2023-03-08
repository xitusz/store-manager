const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT * FROM StoreManager.products AS P
    ORDER BY P.id ASC
  `;

  const [products] = await connection.execute(query);

  if (!products.length) return null;

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  
  const [product] = await connection.execute(query, [id]);

  if (!product.length) return null;

  return product[0];
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';

  const [product] = await connection.execute(query, [name]);

  if (!product.length) return null;
  
  return product[0];
};

const create = async (name, quantity) => {
  const query = `
    INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)
  `;
  
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  
  const [result] = await connection.execute(query, [name, quantity, id]);
  
  if (result.affectedRows === 0) return null;

  return {
    id,
    name,
    quantity,
  };
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  if (result.affectedRows === 0) return null;

  return result;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  exclude,
};