const mongoose = require('mongoose')
require('mongoose-type-email');
const Schema = mongoose.Schema



const contactSchema = new Schema({
        name: {type: String, required: true, minlength: 2},
        dob: {type: Date, required: true},
        mobile : {type: [Number], required: true},
        email : {type: [mongoose.SchemaTypes.Email], required: true}
    },
    {
        timestamps: true,
    });

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact