const amqp = require('amqp');
const log = require('util').log;
const redis = require('redis')
const Rx = require('rxjs');

// make private connection
let _connection = null;
let _redisConnection = null;
let _ready = false;

exports.redisConnect = function redisConnect(callback) {
  let _wsMessage = new Rx.Subject();
  if (!_redisConnection) {
    _redisConnection = redis.createClient();
    _redisConnection.subscribe('test');
    _redisConnection.on('message', function(channel, message) {
      const msg = `Message ${message} on channel ${channel} arrived!`;
      typeof callback === 'function' && callback.call(null, msg);
      _wsMessage.next(msg);
    });
  }
  return _wsMessage;
};

exports.connect = function connect(callback) {
  if (!callback || typeof callback !== 'function') return;
  if (!_connection) {
    _connection = amqp.createConnection({host: '192.168.99.100', port: 5672});
    log('Connection created successfully');
  }
  if (_ready) {
    callback.call(null, _connection);
  } else {
    _connection.on('ready', function() {
      callback.call(null, _connection);
      _ready = true;
    });
  }
};

exports.close = function close() {
  _connection && _connection.disconnect();
  console.log(`Connection closed`);
};
