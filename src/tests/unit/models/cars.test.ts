import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/Cars';
import { Model } from 'mongoose';
import { carsMock, changedCarMock, changedCarMockWithId } from '../mocks/carsMock';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carsMock);
    sinon.stub(Model, 'find').resolves([carsMock]);
    sinon.stub(Model, 'findOne').resolves(carsMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(changedCarMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves('');
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a new car', () => {
		it('successfully created', async () => {
			const newCar = await carsModel.create(carsMock);
			expect(newCar).to.be.deep.equal(carsMock);
		});
	});

  describe('searching all cars', () => {
		it('successfully found', async () => {
			const carsFound = await carsModel.read();
			expect(carsFound).to.be.deep.equal([carsMock]);
		});
	});

  describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carsModel.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carsMock);
		});

		it('_id not found', async () => {
			try {
				await carsModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('changing a car', () => {
		it('successfully changed', async () => {
			const carChanged = await carsModel.update('4edd40c86762e0fb12000003', changedCarMock);
			expect(carChanged).to.be.deep.equal(changedCarMockWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await carsModel.update('123ERRADO', changedCarMock);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting a car', () => {
		it('successfully deleted', async () => {
			const carDeleted = await carsModel.delete('4edd40c86762e0fb12000003');
			expect(carDeleted).to.be.deep.equal('');
		});
	
		it('_id not found to change', async () => {
			try {
				await carsModel.delete('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
