const express = require('express');
const log = require('util').log;
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const utils = require('./utils');
const Rx = require('rxjs');
const Consts = require('./consts');
const path = require('path');

const app = express();
const router = require('./routes/index');
const pubSubServer = require('./connections/rabbit');

app.use('/', router);
app.use('/static', express.static('src/static'));

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./app/webpack.config');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/', // Same as `output.publicPath` in most cases.
  hot: true, // Tell the dev-server we're using HMR
  contentBase: path.resolve(__dirname, 'dist'),
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  // custom headers
  stats: {
    colors: true
  },
}));
app.use(require('webpack-hot-middleware')(compiler));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

let clients = [];
const wsMessage = pubSubServer.redisConnect();
const wsJoinRoom = new Rx.Subject();

function sendObjectToWs(ws, data) {
  ws.send(JSON.stringify(data))
}

wsJoinRoom.subscribe(function (message) {
  console.log(message);
});

wsMessage.subscribe(function (message) {
  let payload = {message};
  clients.forEach(client => {
    sendObjectToWs(client, {
      action: 'message',
      payload: payload
    });
  });
});

wss.on('connection', function connection(ws) {

  // make ws specific
  Object.assign(ws, {_id: utils.genId()});
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
