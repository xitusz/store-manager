const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('productsControllers', () => {
  const req = {};
  const res = {};
  
  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });
  
  describe('testa o getAll', () => {
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
      sinon.stub(productsServices, 'getAll').resolves(products);
    });

    afterEach(async () => {
      productsServices.getAll.restore();
    });

    it('resposta: response.status(200).json(products)', async () => {
      await productsControllers.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(products)).to.be.true;
    });
  });

  describe('testa o getById', () => {
    const product = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    };

    beforeEach(async () => {
      sinon.stub(productsServices, 'getById').resolves(product);
    });

    afterEach(async () => {
      productsServices.getById.restore();
    });

    it('resposta: res.status(200).json(produto)', async () => {
      req.params = product.id;

      await productsControllers.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });
  });

  describe('testa o create', () => {
    const product = {
      name: 'Martelo de Thor',
      quantity: 10
    };

    beforeEach(async () => {
      sinon.stub(productsServices, 'create').resolves(product);
    })
  
    afterEach(async () => {
      productsServices.create.restore();
    })
  
    it('resposta: res.status(201).json(produto)', async () => {
      req.body = { name: product.name, quantity: product.quantity };

      await productsControllers.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });
  });

  describe('testa o update', () => {
    const product = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    };

    beforeEach(async () => {
      sinon.stub(productsServices, 'update').resolves(product);
    })
  
    afterEach(async () => {
      productsServices.update.restore();
    })
  
    it('resposta: res.status(200).json(produto)', async () => {
      req.params = product.id;
      req.body = { name: product.name, quantity: product.quantity };

      await productsControllers.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });
  });
  describe('testa o exclude', () => {
    const product = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    };

    beforeEach(async () => {
      sinon.stub(productsServices, 'exclude').resolves(product);
    })
  
    afterEach(async () => {
      productsServices.exclude.restore();
    })
  
    it('resposta: res.status(204)', async () => {
      req.params = product.id;

      await productsControllers.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;
    });
  });
});