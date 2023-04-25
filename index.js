// require and run the main fetch function

const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  printTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// The code below is test code for the function fetchMyIP() and is temporary
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// The code below is test code for the function fetchCoordsByIP() and is temporary
// fetchCoordsByIP("8.8.4.4", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coordinates);
// });

// The code below is test code for the function fetchISSFlyOverTimes() and is temporary
// fetchISSFlyOverTimes(
//   { latitude: "49.27670", longitude: "-123.13000" },
//   (error, passTimes) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log("It worked! Returned Flyover times:", passTimes);
//   }
// );

// The code below is test code for the function nextISSTimesForMyLocation() and is temporary

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It didn't work! ${error}`);
  }

  printTimes(passTimes);
});
