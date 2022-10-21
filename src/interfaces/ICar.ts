import { z } from 'zod';
import { IVehicle } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICarSchema = z.infer<typeof carZodSchema>;

export interface ICar extends IVehicle, ICarSchema {

}
