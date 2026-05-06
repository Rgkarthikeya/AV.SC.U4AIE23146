const axios = require("axios");
require("dotenv").config();

async function Log(stack, level, packageName, message) {
  try {

    const response = await axios.post(
      `${process.env.BASE_URL}/logs`,
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: packageName.toLowerCase(),
        message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log created successfully");

    return response.data;

  } catch (err) {

    console.log(
      err.response?.data || "Unable to send log to evaluation server"
    );
  }
}

module.exports = Log;