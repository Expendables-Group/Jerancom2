var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[env];
var knex = require('knex')({

    connection: {
      host : 'https://jerancoma.herokuapp.com',
      user : 'postgres',
      password : '123456',
      database : 'jerancomdb'
    }
   });
module.exports = knex;


// var env = process.env.NODE_ENV || 'development';
// var config = require('../knexfile')[env];
// var knex = require('knex')({

//     connection: {
//       host : 'https://jerancoma.herokuapp.com',
//       user : 'postgres',
//       password : '123456',
//       database : 'jer2'
//     }
//    });
// module.exports = knex;