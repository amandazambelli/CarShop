import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { motosMock, changedMotoMock, changedMotoMockWithId, wrongMotoMock } from '../mocks/motorcyclesMock';
import MotosController from '../../../controllers/Motorcycles';
import MotosModel from '../../../models/Motorcycles';
import MotosService from '../../../services/Motorcycles';


describe('Motorcycles Controller', () => {
  const motosModel = new MotosModel()
  const motosService = new MotosService(motosModel);
  const motosController = new MotosController(motosService);
 
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motosService, 'create').resolves(motosMock);
    sinon.stub(motosService, 'read').resolves([motosMock]);
    sinon.stub(motosService, 'readOne').resolves(motosMock);
    sinon.stub(motosService, 'update').resolves(changedMotoMockWithId);
    sinon.stub(motosService, 'delete').resolves(motosMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Creating a new motorcycle', () => {
    it('Success', async () => {
      req.body = motosMock;
      await motosController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motosMock)).to.be.true;
    });
  });

  describe('Searching all motorcycles', () => {
    it('Success', async () => {
      await motosController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motosMock])).to.be.true;
    });
  });

  describe('Searching one motorcycle', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};
      await motosController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motosMock)).to.be.true;
    });
  });

  describe('Updating a motorcycle', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};
      req.body = changedMotoMock;
      await motosController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(changedMotoMockWithId)).to.be.true;
    });
  });

  describe('Deleting a motorcycle', () => {
    it('Success', async () => {
      req.params = { id: '4edd40c86762e0fb12000003'};;
      await motosController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motosMock)).to.be.true;
    });
  });

});