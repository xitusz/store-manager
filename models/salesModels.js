const connection = require('./connection');

const serialize = ({
  sale_id: saleId,
  date,
  product_id: productId,
  quantity,
}) => ({
  saleId,
  date,
  productId,
  quantity,
});

const getAll = async () => {
  const query = `
    SELECT SP.sale_id, S.date, SP.product_id, SP.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON SP.sale_id = S.id
    ORDER BY sale_id, product_id ASC
  `;

  const [sales] = await connection.execute(query);

  if (!sales.length) return null;

  return sales.map(serialize);
};

const getById = async (id) => {
    const query = `
      SELECT S.date, SP.product_id, SP.quantity
      FROM StoreManager.sales AS S
      INNER JOIN StoreManager.sales_products AS SP
      ON SP.sale_id = S.id
      WHERE S.id = ?
      ORDER BY sale_id, product_id ASC
    `;

    const [sale] = await connection.execute(query, [id]);

    if (!sale.length) return null;

    return sale.map(serialize);
};

const update = async (id, productId, quantity) => {
  const query = `
    UPDATE StoreManager.sales_products
    SET quantity = ? WHERE product_id = ? AND sale_id = ?
  `;

  const [result] = await connection.execute(query, [quantity, productId, id]);

  if (result.affectedRows === 0) return null;

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

module.exports = {
  getAll,
  getById,
  update,
};