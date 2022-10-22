import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motosMongooseSchema = new Schema<IMotorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  {
    versionKey: false,
  },
);

class Motorcycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', motosMongooseSchema)) {
    super(model);
  }
}

export default Motorcycles;
