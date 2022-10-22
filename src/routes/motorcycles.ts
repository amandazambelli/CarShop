import { Router } from 'express';
import MotoController from '../controllers/Motorcycles';
import MotoModel from '../models/Motorcycles';
import MotoService from '../services/Motorcycles';

const route = Router();

const motoModel = new MotoModel();
const motoService = new MotoService(motoModel);
const motoController = new MotoController(motoService);

const id = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motoController.create(req, res));
route.get('/motorcycles', (req, res) => motoController.read(req, res));
route.get(id, (req, res) => motoController.readOne(req, res));
route.put(id, (req, res) => motoController.update(req, res));
route.delete(id, (req, res) => motoController.delete(req, res));

export default route;
