require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./config/mongoose.config");

app.use(cors({
	credentials: true,
	origin: "http://localhost:3000",
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/capacity.routes")(app);

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`));