// contains most of the logic for fetching the data from each API endpoint.
const request = require("request");
const { URL_IPIFY, URL_IPWHO } = require("./constants");

/**
 * @function fetchMyIP - Makes a single API request to retrieve the user's IP address.
 * @param {callback} callback- pass back an error or the IP string
 * @returns {string} - IP address Example: "162.245.144.188", null if error
 */

const fetchMyIP = (callback) => {
  request(URL_IPIFY, (error, response, body) => {
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
  });
};

/**
 * @function fetchCoordsByIP - fetch GEO coordinates based on an IP address.
 * @param {string} ip
 * @param {callback}
 * @returns {string} - returns the latitude and longitude for it
 */

const fetchCoordsByIP = (ip, callback) => {
  request(
    `${URL_IPWHO}${ip}?fields=latitude,longitude`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const geoCoords = JSON.parse(body);
      callback(null, geoCoords);
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP };
