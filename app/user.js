const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: "home"
    },
    statusHistory: {
        type: [
            {
                timestamp: Date,
                status: String
            }
        ],
        default: []
    },
    colorPreference: {
        type: String,
        default: "grey"
    },
    darkPreference: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.changePassword = function (password, newPassword) {
    if (bcrypt.compareSync(password, this.password)) {
        this.password = newPassword;
    }
};

module.exports = mongoose.model("userInfo", userSchema, "userInfo");