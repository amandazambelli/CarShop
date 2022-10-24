import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { carsMock, changedCarMock, changedCarMockWithId, wrongCarMock } from '../mocks/carsMock';
import CarsController from '../../../controllers/Cars';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';


describe('Cars Controller', () => {
  const carsModel = new CarsModel()
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
 
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carsMock);
    sinon.stub(carsService, 'read').resolves([carsMock]);
    sinon.stub(carsService, 'readOne').resolves(carsMock);
    sinon.stub(carsService, 'update').resolves(changedCarMockWithId);
    sinon.stub(carsService, 'delete').resolves(carsMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Creating a new car', () => {
    it('Success', async () => {
      req.body = carsMock;
      await carsController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('Searching all cars', () => {
    it('Success', async () => {
      await carsController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carsMock])).to.be.true;
    });
  });

  describe('Searching one car', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};
      await carsController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('Updating a car', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};
      req.body = changedCarMock;
      await carsController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(changedCarMockWithId)).to.be.true;
    });
  });

  describe('Deleting a car', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};;
      await carsController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

});