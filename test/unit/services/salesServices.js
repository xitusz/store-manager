const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('salesServices', () => {
  describe('testa getAll', () => {
    describe('quando não existe vendas', () => {
      beforeEach(async () => {
        sinon.stub(salesModels, 'getAll').resolves(null);
      });

      afterEach(async () => {
        salesModels.getAll.restore()
      });

      it('retorna null', async () => {
        const result = await salesServices.getAll();

        expect(result).to.be.null;
      });
    });

    describe('quando existe vendas', () => {
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
        sinon.stub(salesModels, 'getAll').resolves(sales)
      });

      afterEach(async () => {
        salesModels.getAll.restore()
      });

      it('retorna um array', async () => {
        const response = await salesServices.getAll();

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await salesServices.getAll();

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "saleId", "date", "productId", "quantity"', async () => {
        const item = await salesServices.getAll();

        expect(item[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });

      it('tamanho da resposta está correta', async () => {
        const item = await salesServices.getAll();

        expect(item.length).to.be.equal(2);
      });
    });
  });


  describe('testa geById', () => {
    describe('quando não existe venda com o ID informado', () => {
      beforeEach(async () => {
        sinon.stub(salesModels, 'getById').resolves(null);
      });
    
      afterEach(async () => {
        salesModels.getById.restore()
      });

      it('retorna null', async () => {
        const response = await salesServices.getById(1);
        
        expect(response).to.be.null;
      });
    });

    describe('quando existe uma venda com o ID informado', () => {
      const sale = [{
        saleId: 1,
        date: "2022-04-03T18:06:11.000Z",
        productId: 1,
        quantity: 5
      }];

      beforeEach(() => {
        sinon.stub(salesModels, 'getById').resolves(sale);
      });

      afterEach(() => {
        salesModels.getById.restore();
      })

      it('retorna um array', async () => {
        const response = await salesServices.getById(1);

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await salesServices.getById(1);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "saleId", "date", "productId", "quantity"', async () => {
        const item = await salesServices.getById(1);

        expect(item[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });
});