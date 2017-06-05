const express = require('express');
const log = require('util').log;
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const utils = require('./utils');
const Rx = require('rxjs');
const Consts = require('./consts');

const app = express();
const router = require('./routes/index');
const pubSubServer = require('./connections/rabbit');

app.use('/', router);
app.use('/static', express.static('src/static'));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

let clients = [];
const wsMessage = pubSubServer.redisConnect();
const wsJoinRoom = new Rx.Subject();

function sendObjectToWs(ws, data) {
  ws.send(JSON.stringify(data))
}

wsMessage.subscribe(function(message) {
  clients.forEach(client => {
    sendObjectToWs(client, {
      action: 'message',
      payload: {
        message
      }
    });
  });
});

wss.on('connection', function connection(ws) {

  // make ws specific
  Object.assign(ws, { _id: utils.genId() });
  clients.push(ws);
  sendObjectToWs(ws, {
    action: 'registered',
    payload: {
      id: ws._id,
    }
  });

  ws.on('message', function incoming(message) {
    const payload = JSON.parse(message);
    if (payload.action === Consts.JOIN_ROOM) {
      wsJoinRoom.next(payload);
    }
  });

});

const port = process.env.PORT || 4444;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => server.close());
