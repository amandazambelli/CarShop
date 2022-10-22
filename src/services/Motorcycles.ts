import { IService } from '../interfaces/IService';
import { IMotorcycle, motoZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotoService implements IService<IMotorcycle> {
  private _motos:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._motos = model;
  }

  public async create(obj:unknown):Promise<IMotorcycle> {
    const parsed = motoZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motos.create(parsed.data);
  }

  public async read():Promise<IMotorcycle[]> {
    const motos = await this._motos.read();
    return motos;
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const moto = await this._motos.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    if (obj === '') {
      throw new Error(ErrorTypes.ObjectIsEmpty);
    }
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const motoUpdated = await this._motos.update(_id, parsed.data as IMotorcycle);
    if (!motoUpdated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return motoUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const moto = await this._motos.delete(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }
}

export default MotoService;
