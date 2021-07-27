const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"]
    },
    goodsType: {
        type: String,
        required: [true, "Primary market/type of goods is required"],
        enum: [
            "Automotive",
            "Clothing Retail",
            "Electronics",
            "Food Production",
            "Industrial"
        ]
    },
    email: {
        type: String,
        required: [true, "Email address is required"]
    },
    mobilePhone: {
        type: String,
        required: [true, "Mobile phone number is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set((value) => this.confirmPassword = value);

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password and confirm password must match")
    }

    next();
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
})

module.exports = mongoose.model("User", UserSchema);