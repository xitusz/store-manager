const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('salesControllers', () => {
  const req = {};
  const res = {};
  
  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  describe('testa o getAll', () => {
    const sales = [{
      saleId: 1,
      date: "2022-04-03T18:06:11.000Z",
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: "2022-04-03T18:06:11.000Z",
      productId: 2,
      quantity: 10
    }];

    beforeEach(async () => {
      sinon.stub(salesServices, 'getAll').resolves(sales);
    });

    afterEach(async () => {
      salesServices.getAll.restore();
    });

    it('resposta: response.status(200).json(sales)', async () => {
      await salesControllers.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sales)).to.be.true;
    });
  });

  describe('testa o getById', () => {
    const sale = {
      saleId: 1,
      date: "2022-04-03T18:06:11.000Z",
      productId: 1,
      quantity: 5
    };

    beforeEach(async () => {
      sinon.stub(salesServices, 'getById').resolves(sale);
    });

    afterEach(async () => {
      salesServices.getById.restore();
    });

    it('resposta: res.status(200).json(sale)', async () => {
      req.params = sale.saleId;

      await salesControllers.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sale)).to.be.true;
    });
  });
});