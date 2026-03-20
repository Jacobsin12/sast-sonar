const express = require('express');
const client = require('prom-client'); // Cliente de Prometheus
const app = express();
const port = 3000;

app.disable('x-powered-by');

// --- CONFIGURACIÓN DE MÉTRICAS ---
client.collectDefaultMetrics(); // Métricas de RAM/CPU del contenedor

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

// --- MIDDLEWARE PARA CONTAR PETICIONES ---
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// --- RUTA PARA PROMETHEUS ---
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando y siendo monitoreado! 🚀');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App escuchando en el puerto ${port}`);
});