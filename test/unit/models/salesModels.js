const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');

describe('salesModels', () => {
  describe('Busca todas as vendas', () => {
    describe('quando não existe vendas', () => {
      beforeEach(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna null', async () => {
        const result = await salesModels.getAll();

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
        sinon.stub(connection, 'execute').resolves([sales])
      });

      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna um array', async () => {
        const response = await salesModels.getAll();

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await salesModels.getAll();

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "saleId", "date", "productId", "quantity"', async () => {
        const item = await salesModels.getAll();

        expect(item[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });

      it('tamanho da resposta está correta', async () => {
        const item = await salesModels.getAll();

        expect(item.length).to.be.equal(2);
      });
    });
  });


  describe('Busca venda por ID', () => {
    describe('quando não existe venda com o ID informado', () => {
      beforeEach(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
    
      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna null', async () => {
        const response = await salesModels.getById(1);
        
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
        sinon.stub(connection, 'execute').resolves([sale]);
      });

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const response = await salesModels.getById(1);

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await salesModels.getById(1);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "saleId", "date", "productId", "quantity"', async () => {
        const item = await salesModels.getById(1);

        expect(item[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });
});