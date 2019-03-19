
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gigapets-main', function(tbl){
      tbl.increments();
      tbl.integer('user_id').unsigned().references('id').inTable('user-info-gigapets')
      .onDelete('CASCADE').onUpdate('CASCADE');
      
      
      
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('gigapets-main');
  };
