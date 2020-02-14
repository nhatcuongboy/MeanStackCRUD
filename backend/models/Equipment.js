
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let equipmentSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    description: {
        type: String
    },
    assign: {
        type: String
    }
}, {
    collection: 'equipments'
})

equipmentSchema.plugin(uniqueValidator, { message: 'name already in use.' });
module.exports = mongoose.model('Equipment', equipmentSchema)