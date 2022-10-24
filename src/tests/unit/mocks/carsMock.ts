import { ICar } from '../../../interfaces/ICar';

const carsMock: ICar = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const changedCarMock: ICar = {
  model: "Ferrari",
  year: 1964,
  color: "blue",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const changedCarMockWithId: ICar = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari",
  year: 1964,
  color: "blue",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const wrongCarMock = {
  model: "Ferrari",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

export { carsMock, changedCarMock, changedCarMockWithId, wrongCarMock };
