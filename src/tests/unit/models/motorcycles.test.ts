import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { motosMock, changedMotoMock, changedMotoMockWithId, wrongMotoMock } from '../mocks/motorcyclesMock';
import MotosModel from '../../../models/Motorcycles';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Motorcycles Model', () => {
  const motosModel = new MotosModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motosMock);
    sinon.stub(Model, 'find').resolves([motosMock]);
    sinon.stub(Model, 'findOne').resolves(motosMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(changedMotoMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves('');
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a new motorcycle', () => {
		it('successfully created', async () => {
			const newMoto = await motosModel.create(motosMock);
			expect(newMoto).to.be.deep.equal(motosMock);
		});
	});

  describe('searching all motorcycles', () => {
		it('successfully found', async () => {
			const motosFound = await motosModel.read();
			expect(motosFound).to.be.deep.equal([motosMock]);
		});
	});

  describe('searching a motorcycle', () => {
		it('successfully found', async () => {
			const motoFound = await motosModel.readOne('4edd40c86762e0fb12000003');
			expect(motoFound).to.be.deep.equal(motosMock);
		});

		it('_id not found', async () => {
			try {
				await motosModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('changing a motorcycle', () => {
		it('successfully changed', async () => {
			const motoChanged = await motosModel.update('4edd40c86762e0fb12000003', motosMock);
			expect(motoChanged).to.be.deep.equal(changedMotoMockWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await motosModel.update('123ERRADO', changedMotoMock);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting a motorcycle', () => {
		it('successfully deleted', async () => {
			const motoDeleted = await motosModel.delete('4edd40c86762e0fb12000003');
			expect(motoDeleted).to.be.deep.equal('');
		});
	
		it('_id not found to change', async () => {
			try {
				await motosModel.delete('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
