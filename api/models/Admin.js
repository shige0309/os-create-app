const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            max: 10,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
            max: 20,
            unique: true
        },
    },
    {timestamps: true}
).plugin(bcrypt,{ fields: ['password'] });

module.exports = mongoose.model("Admin", adminSchema);