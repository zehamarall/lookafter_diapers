'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiapersSchema   = new Schema({
    name: String,
    description : String,
    updated_at: { type: Date, default: Date.now },
    avaliable: [
            {
                size: Number,
                qtd: Number, 
                updated_at: { type: Date},
                minute_sell: Number
            }]
});

module.exports = mongoose.model('Diapers', DiapersSchema);

