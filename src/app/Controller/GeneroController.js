const yup = require("yup");
const Genero = require("../Models/Genero");

class GeneroController {

    index(req, res)
    {
        return res.status(200).json(
            {
                error: false,
                message: "genero index"
            }
        );
    }

    async listOne(req, res)
    {
        const { name } = req.params;

        let genero = await Genero.findOne({ name: name });

        if(!genero) {

            return res.status(400).json(
                {
                    error: true,
                    message: "Este genero não existe!"
                }
            );
        }

        return res.status(200).json(
            {
                error: false,
                data: genero
            }
        );        
    } 

    async list(req, res)
    {
        let generos = await Genero.find({});

        if(!generos) {

            return res.status(400).json(
                {
                    error: true,
                    message: "Não existem generos cadastrados!"
                }
            );
        }

        return res.status(200).json(
            {
                error: false,
                data: generos
            }
        );        
    } 

    async save(req, res)
    {
        let validation = yup.object().shape(
            {
                name: yup.string().required()
            }
        );

        if(!(await validation.isValid(req.body))) {

            return res.status(400).json(
                {
                    error: true,
                    message: "Dados enviados não estão validos para serem cadastrados"
                }
            );
        }

        let generoCadastrado = await Genero.findOne({ email: req.body.name });

        if(generoCadastrado) {

            return res.status(400).json(
                {
                    error: false,
                    message: "Este genero ja foi cadastrado!"
                }
            );
        }

        const { name } = req.body;

        const dados = {
            name
        }

        await Genero.create(dados, (error)=> {
            if(error) {
                return res.status(400).json(
                    {
                        error: true,
                        message: `Erro ao cadastrar Genero: ${error}`
                    }
                )
            }

            return res.status(200).json(
                {
                    error: true,
                    message: `Genero cadastrado com sucesso`
                }
            )
        })
    }

}

module.exports = new GeneroController();