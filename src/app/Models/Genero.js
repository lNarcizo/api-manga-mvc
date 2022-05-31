const mongoose = require("mongoose");

const Genero = mongoose.Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Genero', Genero);