const fs = require("fs"); // Importerar fs-modulen

//funktion för att läsa json från en fil
const readJSON = (filepath, callback) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null); //om det uppstår ett fel, returnera felet
    }
    try {
      const jsonData = JSON.parse(data); //konverterar JSON till objekt
      callback(null, jsonData); //returnerar det lästa objektet
    } catch (parseError) {
      callback(parseError, null); //om json-sträng inte går att parsas
    }
  });
};

//funktion för att skriva json till en fil
const writeJSON = (filePath, data, callback) => {
  const jsonData = JSON.stringify(data, null, 2) //omvandla objektet till json (med indentering för läsbarhet)
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
      return callback(err) //om fel, returnera felet
    }
    callback(null); //när man har skrivit, anropa callback utan fel
  });
};

//exportera funktionerna 
module.exports = {
  readJSON,
  writeJSON
};
