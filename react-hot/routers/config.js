module.exports = {
  client: 'pg',
  version: '9.4',
  connection: {
    host: '127.0.0.1',
    user: 'odoo',
    password: 'odoo',
    database: 'odoo10'
  },
  pool: { min: 0, max: 7 }
};
