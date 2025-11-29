require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app"); // 'app' es la instancia de Express
const connectDB = require("./config/db");

// 1. Importar la librería de Prometheus
const promClient = require('prom-client');
// 2. Definir el puerto de la aplicación (3001) y el puerto de métricas (9000)
const PORT = process.env.PORT || 3001;
const METRICS_PORT = 9000; // El puerto 9000 que configuramos en docker-compose

connectDB();

// ===============================================
// 3. CONFIGURACIÓN DE MÉTRICAS DE PROMETHEUS
// ===============================================

// Recolector de métricas predeterminadas (CPU, Memoria de Node.js, etc.)
promClient.collectDefaultMetrics({ prefix: 'todo_app_' }); 

// Definición de la métrica de Latencia (Histograma)
// Esta métrica medirá el tiempo de respuesta de las rutas
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 1, 3, 5, 10] // Buckets de latencia comunes
});

// Definición de una métrica personalizada: estado de la conexión a la base de datos
const dbConnectionStatus = new promClient.Gauge({
    name: 'todo_app_db_connection_status',
    help: 'Status of the MongoDB connection (1=up, 0=down)'
});

// Registrar el estado actual de la conexión a la DB
mongoose.connection.on('connected', () => {
    dbConnectionStatus.set(1);
});
mongoose.connection.on('disconnected', () => {
    dbConnectionStatus.set(0);
});

// ===============================================
// 4. MIDDLEWARE DE REGISTRO DE LATENCIA
// ===============================================
// Usamos el middleware en la instancia 'app' de Express.
app.use((req, res, next) => {
    // Iniciar el temporizador para medir la solicitud
    const end = httpRequestDurationMicroseconds.startTimer(); 

    res.on('finish', () => {
        // Registrar la duración cuando la respuesta es enviada
        // Se usa req.path para simplificar la ruta, evitando query params
        end({ 
            method: req.method,
            route: req.path,
            code: res.statusCode 
        });
    });

    next();
});

// ===============================================
// 5. ENDPOINT DE MÉTRICAS (para que Prometheus haga scrape)
// ===============================================

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});


// ===============================================
// 6. INICIAR SERVIDORES
// ===============================================

// Servidor principal de la aplicación (3001)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Asegúrate de que tu aplicación escuche en el puerto 9000 si usas la configuración de docker-compose
    // En este caso, Express solo necesita responder a /metrics en el puerto principal (3001), 
    // pero si deseas separar, puedes usar un servidor aparte. Para simplificar, usamos el puerto principal.
    console.log(`Metrics endpoint available at /metrics`);
});