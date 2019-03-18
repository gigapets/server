// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/gigapets.sqlite3'
    },
    UseNullAsDefault:true,
  },
};
