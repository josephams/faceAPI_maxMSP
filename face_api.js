const maxApi = require("max-api");
const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const http = require("http");




// face api

function log() {
    console.log(...arguments);
    maxApi.post(...arguments);
  }

const app = express();
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: publicDir });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 7474 });
wss.on("connection", (ws, req) => {
    ws.on("message", message => {
        maxApi.outlet(JSON.parse(message));
        });
});

server.listen(8080, () => {
    log('Server started at http://localhost:8080/');
});

// maxApi.post("Halloo");

