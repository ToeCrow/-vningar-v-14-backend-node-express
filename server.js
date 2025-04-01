// server.js

const express = require("express"); 
const dateModule = require("./dateModule"); 
const jsonFileModule = require("./jsonFileModule");
const app = express(); // Skapa en ny Express-applikation

const PORT = 8080; 

// Definiera en enkel GET-route
app.get("/", (req, res) => {
    const todayDate = dateModule.getTodayDate(); // Hämta dagens datum
    res.send(`<h1>Välkommen!</h1><p>Dagens datum är: ${todayDate}</p>`);
});

// Route för kontaktuppgifter "/contact"
app.get("/contact", (req, res) => {
  // Skicka en enkel HTML-sida med kontaktuppgifter
  res.send(`
      <h1>Kontaktuppgifter</h1>
      <p>För att kontakta oss, vänligen skicka ett email till: kontakt@exempel.se</p>
      <p>Telefon: 0123-456 789</p>
  `);
});

// Route för kursinformation "/api/info"
app.get("/api/info", (req, res) => {
  // Skicka kursinformation som JSON
  const courseInfo = {
      courseName: "Webbutveckling med Node.js",
      description: "Lär dig skapa webbsidor och API:er med Node.js och Express.",
      startDate: "2025-05-01"
  };
  res.json(courseInfo); // Skicka kursinformationen som JSON
});

// Läs JSON från en fil
app.get("/read-json", (req, res) => {
  const filePath = "data.json"; // Ange sökvägen till din JSON-fil

  jsonFileModule.readJSON(filePath, (err, data) => {
      if (err) {
          return res.status(500).send("Fel vid läsning av fil: " + err.message);
      }
      res.json(data); // Returnera den lästa JSON-datan som svar
  });
});

// Skriv JSON till en fil
app.get("/write-json", (req, res) => {
  const filePath = "data.json"; // Ange sökvägen till din JSON-fil

  const newData = {
      name: "John Doe",
      age: 30,
      profession: "Developer"
  };

  jsonFileModule.writeJSON(filePath, newData, (err) => {
      if (err) {
          return res.status(500).send("Fel vid skrivning till fil: " + err.message);
      }
      res.send("Data har skrivits till filen!");
  });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});



// Din befintliga kod...
console.log("Dagens datum är:", dateModule.getTodayDate()); // Använd modulen