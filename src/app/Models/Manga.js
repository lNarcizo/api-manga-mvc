const mongoose = require("mongoose");

const Manga = mongoose.Schema(
    {
        name: { type: String, required: true },
        capitulo: { type: Number, required: true },
        genero: {type: [mongoose.Schema.Types.ObjectId], ref: 'Genero', required: false}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Manga', Manga);