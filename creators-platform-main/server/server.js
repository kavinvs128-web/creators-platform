import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import createSocketServer from "./services/socket.js";

// Load env
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const httpServer = http.createServer(app);

// Socket setup
createSocketServer(httpServer);

// Start server
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});