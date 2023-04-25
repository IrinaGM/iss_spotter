// contains most of the logic for fetching the data from each API endpoint.
const request = require("request");
const { URL_IPIFY, URL_IPWHO, URL_ISS_FLYOVER } = require("./constants");

/**
 * @function fetchMyIP - Makes a single API request to retrieve the user's IP address.
 * @param {callback} callback- pass back an error or the IP string
 * @returns {string} - (via callback) IP address Example: "162.245.144.188", null if error
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
 * @returns {object} - (via callback) the latitude and longitude for that IP. Example: { latitude: '49.27670', longitude: '-123.13000' }
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
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const geoCoords = JSON.parse(body);
      callback(null, geoCoords);
    }
  );
};

/**
 * @function fetchISSFlyOverTimes - fetch ISS passes for given coordinates.
 * @param {object} coords - the coordinates to get the ISS passes for. Example: { latitude: '49.27670', longitude: '-123.13000' }
 * @param {callback}
 * @returns {array} - (via callback) passes. Example: [{ risetime: 146820455,"duration": 545 },...]
 */

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `${URL_ISS_FLYOVER}lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching flyovers. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  );
};

/**
 * @function printTimes - Prints the time and the duration of the flyover in specific format.
 * @param {array} passTimes - the array of objects to format. Example: [{ risetime: 146820455,"duration": 545 },...]
 */

const printTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

/**
 * @function nextISSTimesForMyLocation - Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * @param {callback} - for handling the resulting data or error.
 * @returns {array} - (via Callback): An error, if any (nullable) or the fly-over times as an array (null if error). Example: [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, passTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  printTimes,
  nextISSTimesForMyLocation,
};
