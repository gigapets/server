const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

module.exports = {
  add,
  find,
  findBy,
  findById,
  findMain
};

function find() {
  return db('user-info-gigapets').select('id', 'username', 'password');
}

function findMain() {
    return db('gigapetsMain')
}


function findBy(filter) {
  return db('user-info-gigapets').where(filter);
}

async function add(user) {
  const [id] = await db('user-info-gigapets').insert(user);

  return findById(id);
}

function findById(id) {
  return db('user-info-gigapets')
    .where({ id })
    .first();
}