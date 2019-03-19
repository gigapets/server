
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigapets-main').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('gigapets-main').insert([
        {id: 1, 'gigapet-name':'sam',breakfast:'omelette','breakfast-score':8,lunch:'burger','lunch-score':3,dinner:'steak','dinner-score':'5'}
      ]);
    });
};
