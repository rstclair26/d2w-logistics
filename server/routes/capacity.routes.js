const CapacityController = require("../controllers/capacity.controller");
const { authenticate } = require("../config/jwt.config");

// Add call to authenticate function later to protect routes

module.exports = function(app) {
    app.get("/api/capacities", CapacityController.getAllCapacities);
    app.get("/api/capacities/goods/:goodsType", CapacityController.getCapacitiesByGoodsType);
    app.get("/api/capacities/:id", CapacityController.getCapacity);
    app.post("/api/capacities", CapacityController.addCapacity);
    app.put("/api/capacities/:id", CapacityController.updateCapacity);
    app.delete("/api/capacities/:id", CapacityController.deleteCapacity);
}