const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

describe('productsModels', () => {
  describe('Busca todos os produtos', () => {
    describe('quando não existe produto', () => {
      beforeEach(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna null', async () => {
        const result = await productsModels.getAll();

        expect(result).to.be.null;
      });
    });

    describe('quando existe produtos', () => {
      const products = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20
      }];

      beforeEach(async () => {
        sinon.stub(connection, 'execute').resolves([products])
      });

      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna um array', async () => {
        const response = await productsModels.getAll();

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await productsModels.getAll();

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsModels.getAll();

        expect(item[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('resposta esperada está correta', async () => {
        const item = await productsModels.getAll();

        expect(item).to.be.equal(products);
      });
    });
  });

  describe('Busca apenas um produto por seu ID', () => {
    describe('quando não existe um produto com o ID informado', () => {
      beforeEach(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
    
      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna null', async () => {
        const response = await productsModels.getById(1);
        
        expect(response).to.be.null;
      });
    });

    describe('quando existe um produto com o ID informado', () => {
      const product = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }];

      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([product]);
      });

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um objeto', async () => {
        const response = await productsModels.getById(1);

        expect(response).to.be.a('object');
      });

      it('o objeto não está vazio', async () => {
        const response = await productsModels.getById(1);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsModels.getById(1);

        expect(item).to.include.all.keys('id', 'name', 'quantity');
      });

      it('objeto esperado está correto', async () => {
        const item = await productsModels.getById(1);

        expect(item).to.be.equal(product[0]);
      });
    });
  });

  describe('Busca apenas um produto por seu nome', () => {
    describe('quando não existe um produto com o nome informado', () => {
      beforeEach(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
    
      afterEach(async () => {
        connection.execute.restore()
      });

      it('retorna null', async () => {
        const response = await productsModels.getByName('nome');
        
        expect(response).to.be.null;
      });
    });

    describe('quando existe um produto com o nome informado', () => {
      const product = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }];

      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([product]);
      });

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um objeto', async () => {
        const response = await productsModels.getByName('Martelo de Thor');

        expect(response).to.be.a('object');
      });

      it('o objeto não está vazio', async () => {
        const response = await productsModels.getByName('Martelo de Thor');

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsModels.getByName('Martelo de Thor');

        expect(item).to.include.all.keys('id', 'name', 'quantity');
      });

      it('objeto esperado está correto', async () => {
        const item = await productsModels.getByName('Martelo de Thor');

        expect(item).to.be.equal(product[0]);
      });
    });
  });

  describe('Insere um novo produto no DB', () => {
    describe('quando é inserido', async () => {

      const newProduct = [{
        name: 'camisa',
        quantity: 11
      }];
    
      beforeEach(async () => {
        const execute = [{ insertId: 1 }];
    
        sinon.stub(connection, 'execute').resolves([execute]);
      })
    
      afterEach(async () => {
        connection.execute.restore();
      })
    
      it('retorna um objeto', async () => {
        const response = await productsModels.create(newProduct);

        expect(response).to.be.a('object')
      });

      it('o objeto não está vazio', async () => {
        const response = await productsModels.create(newProduct);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui o novo ID inserido', async () => {
        const item = await productsModels.create(newProduct);

        expect(item).to.have.a.property('id');
      });
    });
  });
});