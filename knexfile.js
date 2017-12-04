// Update with your config settings.

var app = require('./vendor/autoload.js');
console.log('Harusnya mysql > '+process.env.DB_CONNECTION);

module.exports = {
    client: process.env.DB_CONNECTION,
    connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
    },
    seeds: {
        directory: process.env.SEEDS_FOLDER
    },
    migrations: {
        directory: process.env.MIGRATIONS_FOLDER
    }
};
