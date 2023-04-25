const { nextISSTimesForMyLocation } = require("./iss_promised");
const { printTimes } = require("./iss");

nextISSTimesForMyLocation().then((response) => {
  printTimes(response);
});
// .catch((error) => {
//   console.log("It didn't work: ", error.message);
// });
