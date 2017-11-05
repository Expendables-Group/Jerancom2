
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.text('username').unique().notNull();
        table.string('email').unique()
        table.text('password');
        table.text('phone');
        table.float('longitude');
        table.float('latitude');
    });
 
    
 }
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};