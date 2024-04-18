const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const path = require("path");

mongoose.set("strictQuery", true);

const app = express();

require("dotenv").config({ path: ".env" });

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// user routes
app.use("/user/v1/recipe", require("./routes/recipes"));

// index route
app.use("/", (req, res) => {
  return res.send("Forbidden");
});

const port = 5000;
const hostname = "127.0.0.1";

if (mongoose.connections[0].readyState) {
  console.log("Mongodb already connected");
} else {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "doughflow",
    })
    .then(() => console.log("Mongodb connected successfully!"))
    .catch((err) =>
      console.log("Something went wrong in connecting Mongodb", err)
    );
}

app.listen(port, hostname, () => {
  console.log(`App is listening at ${hostname}:${port}`);
});
