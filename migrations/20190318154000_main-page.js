
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gigapets-main', function(tbl){
      tbl.increments();
      tbl.integer('user_id').unsigned().references('id').inTable('user-info-gigapets')
      .onDelete('CASCADE').onUpdate('CASCADE');
      tbl.string('gigapet-name');
      tbl.text('breakfast');
      tbl.integer('breakfast-score');
      tbl.string('lunch');
      tbl.integer('lunch-score');
      tbl.string('dinner')
      tbl.integer('dinner-score');
      tbl.timestamps(true,true);
      tbl.string('snacks');
      tbl.integer('snacks-score');
      tbl.string('beverages');
      tbl.integer('beverage-score');
      tbl.string('pet-mood');
      tbl.decimal('pet-weight');      
      tbl.integer('rating-goal');
      
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('gigapets-main');
  };
