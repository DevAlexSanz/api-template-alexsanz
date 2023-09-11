import initializeServer from './Server/server.js';
import apiRoutes from './Routes/routes.js';

// The api routes are sent as 'callback' to the 'initializeServer' function
const startServer = initializeServer(apiRoutes);

export default startServer;
