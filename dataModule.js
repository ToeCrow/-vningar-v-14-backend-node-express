const fs = require('fs');
const path = require('path');

//funktion som läser json-filen och returnerar data
function getData(callback) {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }
    try {
      const jsonData = JSON.parse(data); //konvertera fårn text till json
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

module.exports = {getData};