const log = require('util').log;
const express = require('express');
const router = express.Router();
const app = express();
const Rx = require('rxjs');
const config = require('./config');

// external configs
Object.assign(config.pool, {
  afterCreate: function (conn, done) {
    // aquires a new connection
    log('Aquires a new connection!');
    done(null, conn);
  }
});

const knex = require('knex')(config);

app.use('/', router);
router.get('/', (req, res) => {
  knex.with('product_list', knex.raw('select * from product_template'))
    .select('*')
    .from('product_list')
    .then(data => {
      res.json(data);
    });
});

const port = 4334 || process.env.PORT;
app.listen(port, () => {
  log(`Server is running on port ${port}`);
});
