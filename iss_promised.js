const request = require("request-promise-native");
const { URL_IPIFY, URL_IPWHO, URL_ISS_FLYOVER } = require("./constants");

/**
 * @function fetchMyIP - fetch the user's IP address.
 * @returns {promise} - Promise to return the IP address of the user.
 */

const fetchMyIP = () => {
  return request(URL_IPIFY);
};

/**
 * @function fetchCoordsByIP - fetch GEO coordinates based on an IP address.
 * @param {string} body - JSON string
 * @returns {promise} - Promise to return the latitude and longitude for given ip.
 */

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`${URL_IPWHO}${ip}?fields=latitude,longitude`);
};

/**
 * @function fetchISSFlyOverTimes - fetch ISS passes for given coordinates.
 * @param {object} coords - the coordinates to get the ISS passes for. Example: { latitude: '49.27670', longitude: '-123.13000' }
 * @returns {promise}  - Promise to return the flyovers data for the given coordinats
 */

const fetchISSFlyOverTimes = (coords) => {
  const { latitude, longitude } = JSON.parse(coords);
  return request(`${URL_ISS_FLYOVER}lat=${latitude}&lon=${longitude}`);
};

/**
 * @function nextISSTimesForMyLocation - Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * @returns {promise} - Promise that returns the next 5 upcoming ISS flyovers in form of an array of objects.
 */

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
