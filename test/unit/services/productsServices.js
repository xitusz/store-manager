const sinon = require('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

describe('productsServices', () => {
  describe('testa o getAll', () => {
    describe('quando não existe produto', () => {
      beforeEach(async () => {
        sinon.stub(productsModels, 'getAll').resolves(null)
      });

      afterEach(async () => {
        productsModels.getAll.restore()
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
        sinon.stub(productsModels, 'getAll').resolves(products)
      });

      afterEach(async () => {
        productsModels.getAll.restore()
      });

      it('retorna um array', async () => {
        const response = await productsServices.getAll();

        expect(response).to.be.a('array');
      });

      it('o array não está vazio', async () => {
        const response = await productsServices.getAll();

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsServices.getAll();

        expect(item[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('resposta esperada está correta', async () => {
        const item = await productsServices.getAll();

        expect(item).to.be.equal(products);
      });
    });
  });
  
  describe('testa o getById', () => {
    describe('quando não existe produto', () => {
      beforeEach(async () => {
        sinon.stub(productsModels, 'getById').resolves(null)
      });

      afterEach(async () => {
        productsModels.getById.restore()
      });

      it('retorna null', async () => {
        const result = await productsModels.getById(1);

        expect(result).to.be.null;
      });
    });

    describe('quando existe produto', () => {
      const product = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }];

      beforeEach(() => {
        sinon.stub(productsModels, 'getById').resolves(product);
      });

      afterEach(() => {
        productsModels.getById.restore();
      })

      it('retorna um array', async () => {
        const response = await productsServices.getById(1);

        expect(response).to.be.a('array');
      });

      it('o objeto não está vazio', async () => {
        const response = await productsServices.getById(1);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsServices.getById(1);

        expect(item[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('objeto esperado está correto', async () => {
        const item = await productsServices.getById(1);

        expect(item).to.be.equal(product);
      });
    });
  });

  describe('testa o getByName', () => {
    describe('quando não existe produto', () => {
      beforeEach(async () => {
        sinon.stub(productsModels, 'getByName').resolves(null)
      });

      afterEach(async () => {
        productsModels.getByName.restore()
      });

      it('retorna null', async () => {
        const result = await productsModels.getByName(1);

        expect(result).to.be.null;
      });
    });

    describe('quando existe produto', () => {
      const product = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }];

      beforeEach(() => {
        sinon.stub(productsModels, 'getByName').resolves(product);
      });

      afterEach(() => {
        productsModels.getByName.restore();
      })

      it('retorna um array', async () => {
        const response = await productsServices.getByName('Martelo de Thor');

        expect(response).to.be.a('array');
      });

      it('o objeto não está vazio', async () => {
        const response = await productsServices.getByName('Martelo de Thor');

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id", "name", "quantity"', async () => {
        const item = await productsServices.getByName('Martelo de Thor');

        expect(item[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('objeto esperado está correto', async () => {
        const item = await productsServices.getByName('Martelo de Thor');

        expect(item).to.be.equal(product);
      });
    });
  });

  describe('testa o create', () => {
    const newProduct = [{
      name: 'camisa',
      quantity: 11
    }];
  
    beforeEach(async () => {
      const execute = [{ insertId: 1 }];
  
      sinon.stub(productsModels, 'create').resolves(execute);
    })
  
    afterEach(async () => {
      productsModels.create.restore();
    })
  
    it('retorna um array', async () => {
      const response = await productsServices.create(newProduct);

      expect(response).to.be.a('array')
    });

    it('o objeto não está vazio', async () => {
      const response = await productsServices.create(newProduct);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui o novo ID inserido', async () => {
      const item = await productsServices.create(newProduct);

      expect(item[0]).to.have.a.property('insertId');
    });
  });
});