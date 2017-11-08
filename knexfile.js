// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'postgresql',
  //   connection: "postgres://localhost/jerancomdb"
  // },


  development: {
    client: 'postgresql',
    connection: {
        database: 'jerancomdb',
        user: 'postgres',
        password: '123456'
    },
    debug: true
},

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL 
   //connection: "postgres://xrvqvqxfzlnhzu:e42ad7b1221d8458f567c92678c8a8efcf79029b8c849012b4bd35c10fcefb2e@ec2-54-235-240-92.compute-1.amazonaws.com:5432/d5083pjotv7qfs"
    // connection: {
      
    //   database: "postgres://xrvqvqxfzlnhzu:e42ad7b1221d8458f567c92678c8a8efcf79029b8c849012b4bd35c10fcefb2e@ec2-54-235-240-92.compute-1.amazonaws.com:5432/d5083pjotv7qfs",
      
  } 
  
  
  // ,
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
