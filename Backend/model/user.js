const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        otp: {
            type: Number,
            default: null
        },
        isResetPasswordEnabled: {
            type: Boolean,
            default: false
        },
        resetId: {
            type: String,
            default: null
        },
        urls: [
            {
                type: Schema.Types.ObjectId,
                ref: "Url"
            }
        ]
    }
);

module.exports = mongoose.model("User", userSchema);