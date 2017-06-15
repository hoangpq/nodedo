const log = require('util').log;
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const config = require('./config');
const storePath = require('../const');

const {graphql, buildSchema} = require('graphql');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const Schema = String(
  fs.readFileSync(path.join(__dirname, '../data/schema.graphqls'))
);
const knex = require('knex')(config);

// external configs
Object.assign(config.pool, {
  afterCreate: function (conn, done) {
    // aquires a new connection
    log('Aquire a new connection!');
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
      if (attachment && attachment.store_fname) {
        const path = `${storePath}/${attachment.store_fname}`;
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


let TEAS = [
  {id: 1, name: 'Earl Grey Blue Star', steepingTime: 5, relate: [3, 4, 5]},
  {id: 2, name: 'Milk Oolong', steepingTime: 3, relate: []},
  {id: 3, name: 'Gunpowder Golden Temple', steepingTime: 3, relate: []},
  {id: 4, name: 'Assam Hatimara', steepingTime: 5, relate: []},
  {id: 5, name: 'Bancha', steepingTime: 2, relate: []},
  {id: 6, name: 'Ceylon New Vithanakande', steepingTime: 5, relate: []},
  {id: 7, name: 'Golden Tip Yunnan', steepingTime: 5, relate: []},
  {id: 8, name: 'Jasmine Phoenix Pearls', steepingTime: 3, relate: []},
  {id: 9, name: 'Kenya Milima', steepingTime: 5, relate: []},
  {id: 10, name: 'Pu Erh First Grade', steepingTime: 4, relate: []},
  {id: 11, name: 'Sencha Makoto', steepingTime: 2, relate: []},
];

TEAS = TEAS.map(tea => {
  const relate = tea.relate.map(id => TEAS.find(t => t.id === id));
  Object.assign(tea, { relate });
  return tea;
});

const data = {
  teas: () => TEAS,
  tea: ({name}) => TEAS.find(t => t.name === name),
};

const resolvers = {
  Query: {
    store: () => data,
  }
};

const schema = makeExecutableSchema({
  typeDefs: [Schema],
  resolvers: resolvers
});


router.post('/graphql', bodyParser.json(), graphqlExpress({schema}));
router.get('/graphiql', graphiqlExpress({endpointURL: '/api/graphql'}));

module.exports = router;
