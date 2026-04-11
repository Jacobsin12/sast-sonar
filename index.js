const express = require('express');
const client = require('prom-client');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



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

setInterval(() => {
  const randomUsers = Math.floor(Math.random() * 50) + 10;
  activeUsersGauge.set(randomUsers);
}, 5000);


app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});



app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Sast-Sonar | Welcome',
    ip_servidor: '34.51.110.74' 
  });
});


app.get('/login', (req, res) => {
  res.render('login', { title: 'Acceso Seguro | Sast-Sonar' });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  
  if (email === 'admin@sonar.com' && password === 'sonar123') {
   
    res.redirect('/dashboard');
  } else {
  
    res.redirect('/login');
  }
});

app.get('/dashboard', (req, res) => {

  res.render('dashboard', { 
    title: 'Panel de Control Principal',
    user: 'Ing. Jacobo',
    
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