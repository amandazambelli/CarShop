import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carsMock, changedCarMock, changedCarMockWithId, wrongCarMock } from '../mocks/carsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carsMock);
    sinon.stub(carsModel, 'read').resolves([carsMock]);
		sinon.stub(carsModel, 'readOne')
			.onCall(0).resolves(carsMock)
			.onCall(1).resolves(null);
		sinon.stub(carsModel, 'update')
      .onCall(0).resolves(changedCarMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(null)
      .onCall(3).resolves(null);
    sinon.stub(carsModel, 'delete')
      .onCall(0).resolves(carsMock)
			.onCall(2).resolves(null);

	});

	after(() => {
		sinon.restore()
	});

	describe('Create a new car', () => {
		it('Success', async () => {
			const carCreated = await carsService.create(carsMock);

			expect(carCreated).to.be.deep.equal(carsMock);
		});

		it('Failure', async () => {
			try {
				await carsService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('Searching all cars', () => {
		it('Success', async () => {
			const cars = await carsService.read();

			expect(cars).to.be.deep.equal([carsMock]);
		});
	});

	describe('searching a car', () => {
		it('Success', async () => {
			const carFound = await carsService.readOne('4edd40c86762e0fb12000003');

			expect(carFound).to.be.deep.equal(carsMock);
		});

		it('Failure', async () => {
			try {
				await carsService.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update a car', () => {
		it('Success', async () => {
			const carUpdated = await carsService.update('4edd40c86762e0fb12000003', changedCarMock);
			expect(carUpdated).to.be.deep.equal(changedCarMockWithId);
		});

		it('Failure: entity not found', async () => {
			let errorToTest;
			try {
				await carsService.update('4edd40c86762e0fb12000004', changedCarMock)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('Failure: entity is not valid', async () => {
			let errorToTest;
			try {
				await carsService.update('4edd40c86762e0fb12000003', wrongCarMock)
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest).to.be.instanceOf(ZodError);
		});

    it('Failure: object is empty', async () => {
			let errorToTest;
			try {
				await carsService.update('4edd40c86762e0fb12000003', '')
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.ObjectIsEmpty);
		});
	});

  describe('Deleting a car', () => {
		it('Success', async () => {
			const carDeleted = await carsService.delete('4edd40c86762e0fb12000003');
			expect(carDeleted).to.be.deep.equal(carsMock);
		});

		it('Failure: entity not found', async () => {
			let errorToTest;
			try {
				await carsService.delete('4edd40c86762e0fb12000004')
			} catch (error: any) {
				errorToTest = error;
			}
			expect(errorToTest.message).to.be.equal(ErrorTypes.EntityNotFound);
		});
	});
});