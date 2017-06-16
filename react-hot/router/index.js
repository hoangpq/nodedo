// @flow

const express = require('express');
const fs = require('fs');
const path = require('path');
const {graphql, buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');
const {graphiqlExpress} = require('graphql-server-express');
const router = express.Router();
const config = require('./config');
const storePath = require('../const');
// database utils
const knex: Object = require('knex')(config);
const Schema = String(
  fs.readFileSync(path.join(__dirname, '../data/schema.graphqls'))
);

function getImage(res_id, res_model, res_field = 'image') {
  return knex
    .select('store_fname as fname')
    .from('ir_attachment')
    .where({
      res_id, res_model, res_field,
    })
    .first();
}

function getProducts() {
  return knex.select('product.id as product_id', 'product.name as pname', 'category.name as cname')
    .from('product_template as product')
    .innerJoin('product_category as category', 'product.categ_id', 'category.id')
    .whereNotIn('category.name', ['Saleable', 'Services']);
}

router.get('/', (req, res) => {
  getProducts().then(data => {
    res.json(data);
  });
});

router.get('/images/:id', (req, res) => {
  const product_id = req.params['id'];
  getImage(product_id, 'product.template')
    .then((attachment) => {
      if (attachment && attachment.fname) {
        const path = `${storePath}/${attachment.fname}`;
        fs.readFile(path, (err, data) => {
          if (data) {
            data = `data:image/png;base64,${data.toString('base64')}`;
            res.send(data);
          } else {
            res.send('https://pbs.twimg.com/profile_images/669574084443942912/jCBYZpcW.jpg');
          }
        });
      } else {
        res.send('https://pbs.twimg.com/profile_images/669574084443942912/jCBYZpcW.jpg');
      }
    });
});

let TEAS: Array<Object> = require('../data/store');

TEAS = TEAS.map(tea => {
  Object.assign(tea, {
    _relate: tea.relate.map(id => TEAS.find(t => t.id === id))
  });
  const relate = function ({name}) {
    if (!name) {
      return tea._relate;
    }
    return tea._relate.filter(t => {
      return t.name === name
    });
  };
  Object.assign(tea, {relate});
  return tea;
});

const TIME = 3000;
const data = {
  teas: () => new Promise(resolve => {
    setTimeout(function () {
      resolve(TEAS);
    }, Math.round(Math.random() * TIME));
  }),
  tea: ({name}) => TEAS.find(t => t.name === name),
};

const root = {
  // queries
  store: () => data,
  // mutations
  createTea: ({input}) => {
    return input;
  },
};

const schema = buildSchema(Schema);
// GraphQL server
router.post('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));
// GraphQL UI
router.get('/graphiql', graphiqlExpress({endpointURL: '/api/graphql'}));

module.exports = router;
