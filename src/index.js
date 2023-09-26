const express = require("express");
const app = express();
const { PORT } = require("./config/serverconfig");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);

app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);
  await connect();
  console.log("mongodb connected");
});
