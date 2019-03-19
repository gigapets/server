
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gigapets', function(tbl){
      tbl.increments();
      tbl.string('username');
      tbl.string('password');
      tbl.text('child');
      tbl.string('pet');
      tbl.string('meal');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('gigapets');
  };
