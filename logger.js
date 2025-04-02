const fs = require("fs");
const path = require("path");

//skapa en funktion för att logga händelser
function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  //skriv till loggfil
  fs.appendFile(path.join(__dirname, 'log.txt'), logMessage, (err) => {
    if (err) {
      console.error('Fel vid skrivning till loggfil:', err);
    }
  });
}

module.exports = {logEvent};