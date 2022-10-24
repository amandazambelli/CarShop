import { IMotorcycle } from '../../../interfaces/IMotorcycle';

const motosMock: IMotorcycle = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
};

const changedMotoMock: IMotorcycle = {
  model: "HONDA HG",
  year: 1964,
  color: "blue",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
};

const changedMotoMockWithId: IMotorcycle = {
  _id: "4edd40c86762e0fb12000003",
  model: "HONDA HG",
  year: 1964,
  color: "blue",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
};

const wrongMotoMock = {
  model: "Ferrari",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
};

export { motosMock, changedMotoMock, changedMotoMockWithId, wrongMotoMock };
