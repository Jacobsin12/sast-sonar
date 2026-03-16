const express = require('express');
const app = express();
const port = 3000;

// 1. SEGURIDAD: Deshabilitar la cabecera que revela Express (Fix SonarQube)
app.disable('x-powered-by'); 

// 2. RUTAS
app.get('/', (req, res) => {
  res.send('¡Servidor Node.js funcionando y desplegadoooo!');
});

// 3. INICIO DEL SERVIDOR
app.listen(port, '0.0.0.0', () => {
  console.log(`App escuchando en el puerto ${port}`);
});