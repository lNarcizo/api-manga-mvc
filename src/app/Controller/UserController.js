const bcryptjs = require("bcryptjs");
const yup = require("yup");
const User = require("../Models/User");


class UserController {
    
    index(req,res)
    {
        console.log(req.body);
    }

    list(req, res)
    {
        console.log("oi lista");


    }

    async save(req, res)
    {

        let validation = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required()
        });

        if(!(await validation.isValid(req.body))){
            
            return res.status(400).json(
                {
                    error: true,
                    message: "Dados enviados não estão validos para serem cadastrados"
                }
            );
        }

        let emailCadastrado = await User.findOne({ email: req.body.email });

        if(emailCadastrado) {

            return res.status(400).json(
                {
                    error: false,
                    message: "Email ja utilizado para cadastro"
                }
            );
        }

        const { name, email, password } = req.body;


        const dados = {
            name,
            email,
            password
        }

        dados.password = await bcryptjs.hash(dados.password, 8);

        await User.create(dados, (error)=> {
            if(error) {
                return res.status(400).json(
                    {
                        error: true,
                        message: `Erro ao inserir Usuario: ${error}`
                    }
                )
            }

            return res.status(200).json(
                {
                    error: true,
                    message: `Usuario inserido com sucesso`
                }
            )

        })
    }

}

module.exports = new UserController();