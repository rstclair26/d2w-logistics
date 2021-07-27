const Capacity = require("../models/capacity.model");

module.exports.getAllCapacities = (req, res) => {
    console.log("In getAllCapacities");

    Capacity.find({}).sort({ departureDate: "ascending" })
        .then((capacities) => {
            console.log(capacities);
            res.json(capacities);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}

module.exports.getCapacitiesByGoodsType = (req, res) => {
    console.log("In getCapacitiesByGoodsType: " + req.params.goodsType);

    Capacity.find({ goodsType: req.params.goodsType }).sort({ departureDate: "ascending" })
        .then((capacities) => {
            console.log(capacities);
            res.json(capacities);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}

module.exports.getCapacity = (req, res) => {
    console.log("In getCapacity: " + req.params.id);

    Capacity.findById(req.params.id)
        .then((capacity) => {
            console.log(capacity);
            res.json(capacity);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}

module.exports.addCapacity = (req, res) => {
    console.log("In addCapacity:");
    console.log(req.body);

    Capacity.create(req.body)
        .then((newCapacity) => {
            console.log(newCapacity);
            res.json(newCapacity);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}

module.exports.updateCapacity = (req, res) => {
    console.log("In updateCapacity (" + req.params.id + "):");
    console.log(req.body);

    Capacity.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedCapacity) => {
            console.log(updatedCapacity);
            res.json(updatedCapacity);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}

module.exports.deleteCapacity = (req, res) => {
    console.log("In deleteCapacity: " + req.params.id);

    Capacity.findByIdAndDelete(req.params.id)
        .then((deletedCapacity) => res.json(deletedCapacity))
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
}