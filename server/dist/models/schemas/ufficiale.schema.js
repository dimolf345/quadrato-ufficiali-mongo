"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;
const gradi = require('../../utils/gradi');
const ufficialeSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Inserire il nome dell\'ufficiale'],
        minLenght: 3
    },
    cognome: {
        type: String,
        required: [true, 'Inserire il cognome dell\'ufficiale'],
        minLenght: 2
    },
    grado: {
        type: String,
        required: [true, 'Selezionare un grado per l\'ufficiale'],
        enum: gradi
    },
    data_imbarco: {
        type: Date,
        required: [true, 'Data di imbarco mancante'],
        validate: {
            validator: controllaDataOdierna,
            message: () => 'La data di imbarco dev\'essere precedente alla data odierna'
        }
    },
    email: {
        type: String,
        required: [true, 'Inserire l\'indirizzo email istituzionale'],
        unique: true,
        validate: {
            validator: controllaEmailMarina,
            message: (props) => `${props.value} non è un valido indirizzo email istituzionale`
        }
    },
    ddq: {
        type: Boolean,
        default: false
    },
    pt: {
        type: String,
        validate: {
            validator: (pt) => /\d/.test(pt),
            message: (props) => `${props.value} non è un valido posto tabellare. Inserire solo numeri`
        }
    },
    temporaneo_imbarco: {
        type: Boolean,
        default: false
    },
    data_sbarco: {
        type: Date,
        validate: {
            validator: controllaDataOdierna,
            message: () => 'Inserire una data antecedente alla data odierna'
        }
    },
    attivo: {
        type: Boolean,
        default: true,
        required: true
    }
});
function controllaEmailMarina(email) {
    const mailRegex = /\w*\.\w*@marina\.difesa\.it/;
    return mailRegex.test(email);
}
function controllaDataOdierna(data) {
    return data <= new Date();
}
const ufficialeModel = mongoose.model('Ufficiale', ufficialeSchema);
module.exports = ufficialeModel;
