const { Router } = require('express');
const LoginController = require('./app/Controller/LoginController');
const AuthMidleWare = require("./app/Midlewares/AuthMidleware");
const UserController = require("./app/Controller/UserController");
const GeneroController = require("./app/Controller/GeneroController");

const routes = new Router();

// Rota de autenticação
routes.post("/login", LoginController.index);

// Rotas de usuario
routes.get("/lista-usuarios", AuthMidleWare, UserController.list);
routes.post("/usuario/cadastro", UserController.save);

// Rotas de genero
routes.get("/genero/:name", AuthMidleWare, GeneroController.listOne);
routes.get("/lista-generos", AuthMidleWare, GeneroController.list);
routes.post("/genero/cadastro", AuthMidleWare, GeneroController.save);

module.exports = routes;