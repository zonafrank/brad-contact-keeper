require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

// Connect database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
//   return res.json({ message: "Welcome to the contact keepw api!" });
// });

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

if (process.env.NODE_ENV === "production") {
  console.log(express.static("frontend/build"));
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
