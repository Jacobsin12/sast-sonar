const express = require('express');
const client = require('prom-client');
const path = require('path'); // Requerido para manejar carpetas
const app = express();
const port = 3000;

app.disable('x-powered-by');

// --- CONFIGURACIÓN DE VISTAS (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- CONFIGURACIÓN DE MÉTRICAS ---
client.collectDefaultMetrics();

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

// --- RUTA PRINCIPAL (Ahora renderiza el HTML) ---
app.get('/', (req, res) => {
  // Aquí puedes pasar variables a tu HTML si quieres
  res.render('index', { 
    status: 'ONLINE', 
    ip_servidor: '34.51.110.74' 
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App escuchando en el puerto ${port} con interfaz gráfica 🚀`);
});