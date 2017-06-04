const express = require('express');
const log = require('util').log;
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const Rx = require('rxjs');

const app = express();
const router = require('./routes/index');
const pubSubServer = require('./connections/rabbit');

app.use('/', router);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

let clients = [];
const wsRequest = new Rx.Subject();
const wsMessage = pubSubServer.redisConnect();

const wsHandler = Rx.Observable.combineLatest(
  wsRequest,
  wsMessage.startWith('Welcome')
);

wsHandler.subscribe(function([client, message]) {
  clients.push(client);
  client.send(message);
});

wss.on('connection', function connection(ws) {
  wsRequest.next(ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

const port = 4444;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => server.close());
