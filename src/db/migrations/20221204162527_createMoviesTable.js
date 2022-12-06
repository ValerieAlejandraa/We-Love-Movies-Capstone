exports.up = function (knex) {
    return knex.schema.createTable("movies", (table) => {
      table.increments("movie_id").primary(); //table.string is the column 
      table.string("title");
      table.integer("runtime_in_minutes");
      table.string("rating");
      table.text("description");
      table.string("image_url");
      table.timestamps(true, true); //created_at and updated_at columns, passing true as the first argument sets the columns to be a timestamp , passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("movies");
  };
  
  
//The exports.up and exports.down functions should always return a promise.