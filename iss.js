// contains most of the logic for fetching the data from each API endpoint.
const request = require("request");
const { URL } = require("./constants");

/**
 * @function fetchMyIP - Makes a single API request to retrieve the user's IP address.
 * @param {callback} callback- pass back an error or the IP string
 * @returns {string} - IP address Example: "162.245.144.188", null if error
 */

const fetchMyIP = (callback) => {
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body)["ip"];
    callback(null, IP);
    return;
  });
};

module.exports = { fetchMyIP };
