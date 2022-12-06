//creates table
exports.up = function(knex) { //schema commands, add call back function with table parameter, 
  return knex.schema.createTable("critics", (table) => { //knex sequel builder 
      table.increments("critic_id").primary(); //increments, auto increments the id
      table.string("preferred_name"); //.string translates to VARCHAR(255)
      table.string("surname");
      table.string("organization_name");

     

      //GO TO Knex library to understand the method
       // adds created_at and updated_at columns; 
  // true as 1st arg sets columns to timestamp type
  // true as 2nd arg sets columns to non-nullable and default current time    
      table.timestamps(true, true); //common, when it was created and last updated information 
    });
};

//drops table
exports.down = function(knex) {
  return knex.schema.dropTable("critics"); //undo 
};

