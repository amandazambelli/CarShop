import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { motosMock, changedMotoMock, changedMotoMockWithId, wrongMotoMock } from '../mocks/motorcyclesMock';
import MotosModel from '../../../models/Motorcycles';
import MotosService from '../../../services/Motorcycles';

describe('Motorcycles Service', () => {
	const motosModel = new MotosModel();
	const motosService = new MotosService(motosModel);

	before(() => {
		sinon.stub(motosModel, 'create').resolves(motosMock);
    sinon.stub(motosModel, 'read').resolves([motosMock]);
		sinon.stub(motosModel, 'readOne')
			.onCall(0).resolves(motosMock)
			.onCall(1).resolves(null);
		sinon.stub(motosModel, 'update')
      .onCall(0).resolves(changedMotoMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(null)
      .onCall(3).resolves(null);
    sinon.stub(motosModel, 'delete')
      .onCall(0).resolves(motosMock)
			.onCall(2).resolves(null);

	});

	after(() => {
		sinon.restore()
	});

	describe('Create a new motorcycle', () => {
		it('Success', async () => {
			const motoCreated = await motosService.create(motosMock);

			expect(motoCreated).to.be.deep.equal(motosMock);
		});

		it('Failure', async () => {
			try {
				await motosService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('Searching all motorcycles', () => {
		it('Success', async () => {
			const motos = await motosService.read();

			expect(motos).to.be.deep.equal([motosMock]);
		});
	});

	describe('searching a motorcycle', () => {
		it('Success', async () => {
			const motoFound = await motosService.readOne('4edd40c86762e0fb12000003');

			expect(motoFound).to.be.deep.equal(motosMock);
		});

		it('Failure', async () => {
			try {
				await motosService.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update a motorcycle', () => {
		it('Success', async () => {
			const motoUpdated = await motosService.update('4edd40c86762e0fb12000003', changedMotoMock);
			expect(motoUpdated).to.be.deep.equal(changedMotoMockWithId);
		});

		it('Failure: entity not found', async () => {
			let errorToTest;
			try {
				await motosService.update('4edd40c86762e0fb12000004', changedMotoMock)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('Failure: entity is not valid', async () => {
			let errorToTest;
			try {
				await motosService.update('4edd40c86762e0fb12000003', wrongMotoMock)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest).to.be.instanceOf(ZodError);
		});

    it('Failure: object is empty', async () => {
			let errorToTest;
			try {
				await motosService.update('4edd40c86762e0fb12000003', '')
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.ObjectIsEmpty);
		});
	});

  describe('Deleting a motorcycle', () => {
		it('Success', async () => {
			const motoDeleted = await motosService.delete('4edd40c86762e0fb12000003');
			expect(motoDeleted).to.be.deep.equal(motosMock);
		});

		it('Failure: entity not found', async () => {
			let errorToTest;
			try {
				await motosService.delete('4edd40c86762e0fb12000004')
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.EntityNotFound);
		});
	});
});