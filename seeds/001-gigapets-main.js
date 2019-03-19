
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigapets-main').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('gigapets-main').insert([
        {id: 1, 'gigapet-name':'sam',breakfast:'omelette','breakfast-score':8,lunch:'burger','lunch-score':3,dinner:'steak','dinner-score':'5'},
        {id: 2, 'gigapet-name':'sam',breakfast:'waffles','breakfast-score':3,lunch:'N/A','lunch-score':0,dinner:'ice cream','dinner-score':'1'},
        {id: 3, 'gigapet-name':'sam',breakfast:'omelette','breakfast-score':8,lunch:'burger','lunch-score':3,dinner:'shrimp','dinner-score':'7'}
      ]);
    });
};
