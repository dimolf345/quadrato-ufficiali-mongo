"use strict";
const mongo = require('mongoose');
const quotaSchema = new mongo.Schema({
    creato_da: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Ufficiale',
        required: [true, "La quota deve specificare l'ufficiale"]
    },
    data_creazione: {
        type: Date,
        required: [true, 'Specificare la data di creazione della quota'],
        default: new Date()
    },
    importo: {
        type: Number,
        required: [true, 'Importo della quota mancante!']
    },
    descrizione: {
        type: String,
        required: [true, 'Specificare la motivazione della quota']
    },
    note: String
});
const quotaModel = mongo.model('Quota', quotaSchema);
module.exports = quotaModel;
