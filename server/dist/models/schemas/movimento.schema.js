"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const movimentoSchema = new mongoose.Schema({
    creato_da: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ufficiale'
    },
    data_creazione: {
        type: Date,
        required: [true, 'Inserire una data per la creazione del movimento'],
        default: new Date()
    },
    data_movimento: {
        type: Date,
        required: [true, 'Inserire la data di riferimento del movimento']
    },
    importo: {
        type: Number,
        required: [true, 'Importo del movimento mancante!']
    },
    descrizione: {
        type: String,
        required: [true, 'Inserire la descrizione del movimento']
    },
    note: {
        type: String
    }
});
const movimentoModel = mongoose.model('Movimento', movimentoSchema);
module.exports = movimentoModel;
