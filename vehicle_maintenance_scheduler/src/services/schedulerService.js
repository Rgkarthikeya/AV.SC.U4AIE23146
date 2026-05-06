const axios = require("axios");

async function fetchDepots(token) {

  const response = await axios.get(
    "http://20.207.122.201/evaluation-service/depots",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}


async function fetchVehicles(token) {

  const response = await axios.get(
    "http://20.207.122.201/evaluation-service/vehicles",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}

module.exports = {
  fetchDepots,
  fetchVehicles
};