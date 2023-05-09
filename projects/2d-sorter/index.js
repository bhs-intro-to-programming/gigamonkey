/*
 * Trivial web server that serves the contents of the public/ directory.
 */

import express from 'express';

import { WebSocket, WebSocketServer } from 'ws';

const port = 3000;

const app = express();

app.use(express.static('public'));

const server = app.listen(port, function () {
  console.log(`Listening on port ${this.address().port}`);
});

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data, isBinary) => {
    console.log(`Got message ${data}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request);
  });
});
