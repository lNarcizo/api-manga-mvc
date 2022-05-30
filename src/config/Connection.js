const mongoose = require("mongoose");

class Connection{

    constructor()
    {
        this.connectionDataBaseMongoDb();
    }

    connectionDataBaseMongoDb()
    {
        this.mongoDbConnection = mongoose.connect("mongodb://0.0.0.0:27017/ykz_mangas", {
            useNewUrlParser: true,
            useUnifiedtopology: true
        })
        .then(()=> {
            console.log("Conexão com MongoDB estabeleida com sucesso!");
        })
        .catch((error)=> {
            console.log(`Falha na conexão com MongoDB: ${error}`);
        })
    }


}

module.exports = new Connection();