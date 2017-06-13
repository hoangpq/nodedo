const log = require('util').log;
const express = require('express');
const fs = require('fs');
const router = express.Router();
const config = require('./config');
const storePath = '/Users/home/Library/Application Support/Odoo/filestore/odoo10';

// external configs
Object.assign(config.pool, {
  afterCreate: function (conn, done) {
    // aquires a new connection
    log('Aquires a new connection!');
    done(null, conn);
  }
});

function getImage(res_id, res_model, res_field = 'image') {
  return knex.select('store_fname')
    .from('ir_attachment')
    .where({
      res_id, res_model, res_field,
    })
    .first();
}

const knex = require('knex')(config);
router.get('/', (req, res) => {
  knex.select('product.id as product_id', 'product.name as pname', 'category.name as cname')
    .from('product_template as product')
    .innerJoin('product_category as category', 'product.categ_id', 'category.id')
    .whereNotIn('category.name', ['Saleable', 'Services'])
    .then(data => {
      res.json(data);
    });
});

router.get('/images/:id', (req, res) => {
  const product_id = req.params['id'];
  getImage(product_id, 'product.template')
    .then((attachment) => {
      if (attachment && attachment.store_fname) {
        const path = `${storePath}/${attachment.store_fname}`;
        fs.readFile(path, (err, data) => {
          data = `data:image/png;base64,${data.toString('base64')}`;
          res.send(data);
        });
      } else {
        res.send('https://pbs.twimg.com/profile_images/669574084443942912/jCBYZpcW.jpg');
      }
    });
});

module.exports = router;
