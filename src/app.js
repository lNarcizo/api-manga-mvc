const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");

require("./config/Connection");

class App {

    constructor()
    {
        this.app = express();
        this.middleWares();
        this.routes();
    }

    middleWares()
    {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use((req,resp,next)=> {
            resp.header("Access-Control-Allow-Origin", "*");
            resp.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            resp.header("Access-Control-Allow-Headers", "Access, Content-type, Authorization, Acept, Origin, X-Requested-With");

            this.app.use(cors);
            next();
        })
    }

    routes()
    {
        this.app.use(routes);
    }


}

module.exports = new App().app;