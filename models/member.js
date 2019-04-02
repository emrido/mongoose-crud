const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: String,
    address: String,
    zipcode: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
    },
    phone: {
        type: String,
        validate: {
            validator: function (phone) {
                return phone.length > 11 && phone.length < 13;
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});

memberSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Validation Error: Email already exists'));
    } else {
        next();
    }
});

let Member = mongoose.model('Member', memberSchema);

module.exports = Member;