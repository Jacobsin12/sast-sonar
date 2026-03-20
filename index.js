const express = require('express');
const client = require('prom-client');
const path = require('path');
const app = express();
const port = 3000;

app.disable('x-powered-by');

// --- CONFIGURACIÓN DE VISTAS (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- CONFIGURACIÓN DE MÉTRICAS ---
client.collectDefaultMetrics(); // Métricas de Node.js (RAM/CPU)

// Métrica 1: Contador de peticiones (Counter)
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

// Métrica 2: Usuarios activos (Gauge) - REQUERIDO POR LAB
const activeUsersGauge = new client.Gauge({
  name: 'active_users_current',
  help: 'Número actual de usuarios activos simulados'
});

// SIMULACIÓN DE USUARIOS: Cambia cada 5 segundos para que veas movimiento en Grafana
setInterval(() => {
  const randomUsers = Math.floor(Math.random() * 50) + 10; // Entre 10 y 60 usuarios
  activeUsersGauge.set(randomUsers);
}, 5000);

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

// --- RUTA PRINCIPAL ---
app.get('/', (req, res) => {
  res.render('index', { 
    status: 'ONLINE', 
    ip_servidor: '34.51.110.74' 
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor de monitoreo corriendo en puerto ${port} 🚀`);
});