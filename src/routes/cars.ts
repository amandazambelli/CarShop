import { Router } from 'express';
import CarsController from '../controllers/Cars';
import CarsModel from '../models/Cars';
import CarsService from '../services/Cars';

const route = Router();

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

route.post('/cars', (req, res) => carsController.create(req, res));
route.get('/cars', (req, res) => carsController.read(req, res));
route.get('/cars/:id', (req, res) => carsController.readOne(req, res));
route.put('/cars/:id', (req, res) => carsController.update(req, res));
route.delete('/cars/:id', (req, res) => carsController.delete(req, res));

export default route;
