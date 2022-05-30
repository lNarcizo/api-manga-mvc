const app = require('./app');

let port = process.env.PORT || 8082;


app.listen(port, ()=> {
    console.log(`O servidor esta na porta: ${port}`);
});