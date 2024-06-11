const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const agregaFecha = require('./middlewares/agrega-fecha.middleware');

// Configurar middleware predeterminado (logger, static, cors y no-cache)
server.use(middlewares);

// Para obtener el request body
server.use(jsonServer.bodyParser);

// Usar middleware personalizado
server.use(agregaFecha);

// Configurar rutas personalizadas
const routes = require('./routes.json');
const rewriter = jsonServer.rewriter(routes);
server.use(rewriter);

// Usar el enrutador json-server
server.use(router);

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
