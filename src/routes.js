const { Router } = require('express');
const LoginController = require('./app/Controller/LoginController');
const AuthMidleWare = require("./app/Midlewares/AuthMidleware");
const UserController = require("./app/Controller/UserController");

const routes = new Router();

routes.post("/login", LoginController.index);

routes.post("/usuario", UserController.save);
routes.get("/usuario", AuthMidleWare, UserController.list);

module.exports = routes;