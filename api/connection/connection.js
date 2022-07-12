const {Pool}= require('pg');

const pool= new Pool({

    host:'localhost',
    user:'postgres',
    password:'dangerous',
    database:'Dos',
    port:'5432'

});


module.exports={
  pool
};
