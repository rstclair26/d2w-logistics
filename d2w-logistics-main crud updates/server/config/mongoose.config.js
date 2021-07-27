const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/" + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection established to database"))
    .catch(err => console.log("Error connecting to database", err))
