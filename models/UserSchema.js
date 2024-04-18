const mongoose = require('mongoose');
const validator = require('validator')

const userschema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, "plz provide an id"]
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("email is invalid, plz provide an valid email")
        //     }
        // }
    },

    passward: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        unique: true,
    },

    otp: {
        code: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: null
        }
    }
})

const User = mongoose.model("useres", userschema);
module.exports = User;

