const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        originalUrl: {
            type: String,
            required: true
        },
        shortUrlId: {
            type: String,
            required: true
        },
        clicks: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);