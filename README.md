# CAR SHOP PROJECT #

Este projeto, realizado no módulo de Back-End do curso de Desenvolvimento Web da Trybe, consiste na construção de uma API com CRUD para gerenciar uma concessionária de veículos. Para isso utilizei os princípios de Programação Orientada a Objetos (POO), banco de dados com MongoDB e arquitetura em camadas (MSC - Model, Service, Controller). Cobertura total de testes unitários.


## Habilidades Desenvolvidas ##

- TypeScript
- Node
- Express
- MongoDB
- Mongoose
- POO
- SOLID
- Testes com Mocha, Chai e Sinnon


## Informações ##

Para iniciar o projeto utilizando Docker Compose: docker-compose up -d
Para iniciar o projeto localmente: npm run dev

Para acessar o projeto: http://localhost:3001


## Endpoints ##

### Cars ###

POST | http://localhost:3001/cars

GET | http://localhost:3001/cars

GET | http://localhost:3001/cars/:id

PUT | http://localhost:3001/cars/:id

DELETE | http://localhost:3001/cars/:id

### Motorcycles ###

POST | http://localhost:3001/motorcycles

GET | http://localhost:3001/motorcycles

GET | http://localhost:3001/motorcycles/:id

PUT | http://localhost:3001/motorcycles/:id

DELETE | http://localhost:3001/motorcycles/:id

