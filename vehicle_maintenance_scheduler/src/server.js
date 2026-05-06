const express = require("express");
const cors = require("cors");

require("dotenv").config();

const Log = require("../logging_middleware/logger");

const schedulerRoutes = require("./routes/schedulerRoutes");

const app = express();

app.use(cors());

app.use(express.json());


// Main API route
app.use("/api", schedulerRoutes);


// Test route
app.get("/", async (req, res) => {

  await Log(
    "backend",
    "info",
    "route",
    "Root route opened"
  );

  res.json({
    message: "Vehicle Scheduler API Running"
  });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});