const express = require('express');
const client = require('prom-client');
const path = require('path');
const app = express();
const port = 3000;

app.disable('x-powered-by');

// --- CONFIGURACIÓN DE VISTAS (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- NUEVO: Servir archivos estáticos (CSS, JS, Imágenes) ---
// Esto permite que el HTML cargue /css/style.css desde /public/css/style.css
app.use(express.static(path.join(__dirname, 'public')));

// --- NUEVO: Middleware para leer datos de formularios (POST) ---
app.use(express.urlencoded({ extended: true }));


// --- CONFIGURACIÓN DE MÉTRICAS (Inmune a los cambios de vista) ---
client.collectDefaultMetrics(); 

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

const activeUsersGauge = new client.Gauge({
  name: 'active_users_current',
  help: 'Número actual de usuarios activos simulados'
});

// Simulación de usuarios sigue corriendo de fondo
setInterval(() => {
  const randomUsers = Math.floor(Math.random() * 50) + 10;
  activeUsersGauge.set(randomUsers);
}, 5000);

// Middleware de métricas sigue funcionando
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Ruta de métricas para Prometheus (intocable)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});


// ==========================================
// --- NUEVAS RUTAS DE LA APLICACIÓN WEB ---
// ==========================================

// 1. Ruta Principal (Landing Page con animación de entrada)
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Sast-Sonar | Welcome',
    ip_servidor: '34.51.110.74' 
  });
});

// 2. Ruta de Login (GET: Muestra el formulario esmerilado)
app.get('/login', (req, res) => {
  res.render('login', { title: 'Acceso Seguro | Sast-Sonar' });
});

// 3. Ruta de Login (POST: Procesa las credenciales)
// Por ahora simularemos el login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // LOGIN SIMULADO (Súper inseguro, solo para demo)
  if (email === 'admin@sonar.com' && password === 'sonar123') {
    // Si es correcto, redirigir al dashboard real
    res.redirect('/dashboard');
  } else {
    // Si es incorrecto, recargar login (podrías pasar un error)
    res.redirect('/login');
  }
});

// 4. Ruta del Dashboard Real (Requiere login simulado previo)
// Aquí integraremos los datos que realmente queremos ver (visitas, etc.)
app.get('/dashboard', (req, res) => {
  // En un futuro real, aquí verificaríamos una cookie de sesión
  res.render('dashboard', { 
    title: 'Panel de Control Principal',
    user: 'Ing. Jacobo',
    // Podríamos pasar datos simulados de la base de datos de la ferretería aquí
    productos: [
        {id: 1, nombre: 'Martillo Pro', stock: 15, estado: 'OK'},
        {id: 2, nombre: 'Taladro Percutor', stock: 5, estado: 'BAJO'},
        {id: 3, nombre: 'Tornillos 2"', stock: 1500, estado: 'OK'},
    ]
  });
});


app.listen(port, '0.0.0.0', () => {
  console.log(`App Robusta corriendo en puerto ${port} 🚀`);
});