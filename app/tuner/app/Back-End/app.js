const express = require('express');
const { Board, Led } = require('johnny-five');

const app = express();
const board = new Board();

app.get('/api/led/on', (req, res) => {
  // Endpoint pour allumer la LED
  const led = new Led(11);
  led.on();
  res.send('LED allumée');
});

app.get('/api/led/off', (req, res) => {
  // Endpoint pour éteindre la LED
  const led = new Led(11);
  led.off();
  res.send('LED éteinte');
});

board.on('ready', () => {
  // Code Johnny-Five ici si nécessaire lors du démarrage de la carte
  console.log('Carte prête');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
