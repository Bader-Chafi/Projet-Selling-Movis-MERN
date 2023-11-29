const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            minlength: [4, 'the name is to short'],
            maxlength: [20, 'the name is to long'],
            required: true
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: [true,'this email is already used'],
        },
        password: {
            type: String,
            required: true,
        },
        film: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Film"
        }
    },
    { joined: true }
)

// crypt the password
// const bcrypt = require('bcrypt');
// userSchema.pre("save", async function (next) {
//     //  check if password has modified 
//     if (!this.isModified('password')) {
//         return next();
//     }
//     // encrypt the password
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(this.password, salt);
//         this.password = hash;
//     } catch (err) {
//         return next(err)
//     }
// })

module.exports = mongoose.model('User', userSchema)