// server.js

const express = require("express"); // Importera Express
const dateModule = require("./dateModule"); // Importera modulen
const app = express(); // Skapa en ny Express-applikation

const PORT = 8080; // Välj en port för servern

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

// Starta servern
app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});



// Din befintliga kod...
console.log("Dagens datum är:", dateModule.getTodayDate()); // Använd modulen