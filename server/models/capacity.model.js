const mongoose = require("mongoose");

const CapacitySchema = new mongoose.Schema({
    departureDate: {
        type: Date,
        required: [true, "Departure date is required"]
    },
    departurePort: {
        type: String,
        required: [true, "Departure port is required"],
        enum: [
            "CAVAN",
            "CNSGH",
            "DEHAM",
            "INBOM",
            "JPTYO",
            "NKHKG",
            "NLRTM",
            "USLAX",
            "USNYC"
        ]
    },
    destinationPort: {
        type: String,
        required: [true, "Destination port is required"],
        enum: [
            "CAVAN",
            "CNSGH",
            "DEHAM",
            "INBOM",
            "JPTYO",
            "NKHKG",
            "NLRTM",
            "USLAX",
            "USNYC"
        ]
    },
    numFeuAvailable: {
        type: Number,
        required: [true, "Number of available FEUs is required"]
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
    isRefrigerated: {
        type: Boolean,
        default: false
    },
    allowHazardous: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Capacity", CapacitySchema);