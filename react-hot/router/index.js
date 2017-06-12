const log = require('util').log;
const express = require('express');
const router = express.Router();
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
router.get('/', (req, res) => {

  knex.select('product.id as product_id', 'product.name as pname', 'category.name as cname')
    .from('product_template as product')
    .innerJoin('product_category as category', 'product.categ_id', 'category.id')
    .then(data => {
      res.json(data);
    });
});

module.exports = router;
