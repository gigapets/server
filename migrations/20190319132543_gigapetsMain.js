
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gigapetsMain', function(tbl){
      tbl.increments();
      tbl.integer('user_id').unsigned().references('id').inTable('user-info-gigapets')
      .onDelete('CASCADE').onUpdate('CASCADE');
      tbl.string('name');
      tbl.text('breakfast');
      tbl.integer('bPoints');
      tbl.string('lunch');
      tbl.integer('lPoints');
      tbl.string('dinner')
      tbl.integer('dPoints');
      tbl.timestamps(true,true);
      tbl.string('snacks');
      tbl.integer('spoints');
      tbl.string('date');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('gigapetsMain');
  };
