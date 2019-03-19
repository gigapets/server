
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigapetsMain').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('gigapetsMain').insert([
        {id: 1, name:'rex',breakfast:'eggs',bPoints:'2'}
      ]);
    });
};
