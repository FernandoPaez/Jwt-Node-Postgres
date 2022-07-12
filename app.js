const express= require ('express');
const app= express();
const morgan=require('morgan');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan('dev'));




//importar el modulo de rutas
app.use(require ('./api/router/users'));



app.listen(3000,()=>{
    console.log('server on port 3000')
});
