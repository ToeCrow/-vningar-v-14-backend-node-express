const express = require("express");
const dateModule = require("./dateModule");
const jsonFileModule = require("./jsonFileModule");
const { logEvent } = require("./logger");

const app = express(); // Skapa en ny Express-applikation

const PORT = 8080; // Definiera porten

// Funktion för att generera en navbar
const getNavbar = () => {
    return `
        <nav>
            <ul style="list-style-type: none; padding: 0; display: flex; gap: 20px;">
                <li><a href="/" style="text-decoration: none;">Hem</a></li>
                <li><a href="/contact" style="text-decoration: none;">Kontakt</a></li>
                <li><a href="/api/info" style="text-decoration: none;">Kursinfo</a></li>
                <li><a href="/read-json" style="text-decoration: none;">Läs JSON</a></li>
                <li><a href="/write-json" style="text-decoration: none;">Skriv JSON</a></li>
                <li><a href="/api/users" style="text-decoration: none;">Användare</a></li>
                <li><a href="/log" style="text-decoration: none;">Logg</a></li>
            </ul>
        </nav>
    `;
};

// Middleware för att logga varje inkommande request
app.use((req, res, next) => {
  logEvent(`Request: ${req.method} ${req.url}`);
  next(); // Gå vidare till nästa middleware eller route
});

// En enkel route
app.get("/log", (req, res) => {
  res.send(`
    ${getNavbar()}
    <h1>Logg</h1>
    `);
});

// Definiera en enkel GET-route "/"
app.get("/", (req, res) => {
    const todayDate = dateModule.getTodayDate(); // Hämta dagens datum
    res.send(`
        ${getNavbar()}
        <h1>Välkommen!</h1>
        <p>Dagens datum är: ${todayDate}</p>
    `);
});

// Route för kontaktuppgifter "/contact"
app.get("/contact", (req, res) => {
    res.send(`
        ${getNavbar()}
        <h1>Kontaktuppgifter</h1>
        <p>För att kontakta oss, vänligen skicka ett email till: kontakt@exempel.se</p>
        <p>Telefon: 0123-456 789</p>
    `);
});

// Route för kursinformation "/api/info"
app.get("/api/info", (req, res) => {
    const courseInfo = {
        courseName: "Webbutveckling med Node.js",
        description: "Lär dig skapa webbsidor och API:er med Node.js och Express.",
        startDate: "2025-05-01"
    };
    res.send(`
        ${getNavbar()}
        <h1>Kursinformation</h1>
        <pre>${JSON.stringify(courseInfo, null, 2)}</pre>
    `);
});

// Läs JSON från en fil "/read-json"
app.get("/read-json", (req, res) => {
    const filePath = "data.json"; // Ange sökvägen till din JSON-fil

    jsonFileModule.readJSON(filePath, (err, data) => {
        if (err) {
            return res.status(500).send("Fel vid läsning av fil: " + err.message);
        }
        res.send(`
            ${getNavbar()}
            <h1>Lästa JSON-data</h1>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `);
    });
});

// Skriv JSON till en fil "/write-json"
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
        res.send(`
            ${getNavbar()}
            <h1>Data har skrivits till filen!</h1>
            <p>Här är den nya JSON-datan som har skrivits:</p>
            <pre>${JSON.stringify(newData, null, 2)}</pre>
        `);
    });
});

app.get('/api/users', (req,res) => {
  //skapa en lista med användarnamn
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ];
  res.send(`
    ${getNavbar()}
    <h1>Lista med användare</h1>
    <pre>${JSON.stringify(users, null, 2)}</pre>
    `);
  
  //skicka tillbaka listan som json
  res.json(users);
});

// Starta servern
app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});

// Din befintliga kod...
console.log("Dagens datum är:", dateModule.getTodayDate()); // Använd modulen