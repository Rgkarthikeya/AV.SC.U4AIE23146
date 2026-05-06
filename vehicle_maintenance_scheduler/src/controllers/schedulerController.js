require("dotenv").config();

const Log = require("../../logging_middleware/logger");

const {
  fetchDepots,
  fetchVehicles
} = require("../services/schedulerService");

async function getSchedulerData(req, res) {

  try {

    const token = process.env.TOKEN;

    const depotData = await fetchDepots(token);

    const vehicleData = await fetchVehicles(token);

    const depots = depotData.depots;

    const vehicles = vehicleData.vehicles;

    // Taking first depot
    const totalHours = depots[0].MechanicHours;

    // Sort by highest impact first
    vehicles.sort((a, b) => b.Impact - a.Impact);

    let usedHours = 0;

    let selectedVehicles = [];

    let totalImpact = 0;

    for (let vehicle of vehicles) {

      if (usedHours + vehicle.Duration <= totalHours) {

        selectedVehicles.push(vehicle);

        usedHours += vehicle.Duration;

        totalImpact += vehicle.Impact;
      }
    }

    await Log(
      "backend",
      "info",
      "controller",
      "Vehicle schedule generated successfully"
    );

    res.status(200).json({
      success: true,
      mechanicHours: totalHours,
      usedHours,
      totalImpact,
      selectedVehicles
    });

  } catch (err) {

    console.log(err.message);

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to generate vehicle schedule"
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}

module.exports = {
  getSchedulerData
};