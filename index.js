const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Servidor Node.js funcionando y desplegado!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App escuchando en el puertoo ${port}`);
});