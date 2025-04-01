// Exporterar en funktion som returnerar dagens datum
exports.getTodayDate = function () {
  const today = new Date(); // Skapar ett nytt Date-objekt med dagens datum och tid
  return today.toISOString().split("T")[0]; // Formaterar datumet till YYYY-MM-DD
};