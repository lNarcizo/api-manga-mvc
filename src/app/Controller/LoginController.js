const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const config = require("../../config/auth");

class LoginController {

    async index(req, res)
    {
        const { email, password } = req.body;

        const usuarioExiste = await User.findOne({ email });

        if(!usuarioExiste) {

            return res.status(400).json(
                {
                    error: true,
                    message: "Não foi possivel efetuar login, Usuario inexistente!"
                }
            );
        }

        if(!(await bcryptjs.compare(password, usuarioExiste.password))){

            return res.status(400).json(
                {
                    error: true,
                    message: "Não foi possivel efetuar login, senha incorreta!"
                }
            );
        }

        return res.status(200).json(
            {
                user: {
                    name: usuarioExiste.name,
                    email: usuarioExiste.email
                },
                token: jwt.sign({ id: usuarioExiste._id }, config.secret, { expiresIn: config.expireIn })
            }
        );
    }
}

module.exports = new LoginController();