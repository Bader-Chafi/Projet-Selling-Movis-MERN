const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            default: 'admin',
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: [true, 'this email is already used'],
            validate: {
                validator: function (value) {
                    // Check if the email ends with "@admin.com"
                    return value.endsWith('@admin.com');
                },
                message: 'Email must end with "@admin.com"',
            },
        },
        typeUser: {
            type: String,
            default: 'Admin',
        },
        password: {
            type: String,
            required: true,
        }
    },
    { joined: true }
)
adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Admin', adminSchema)