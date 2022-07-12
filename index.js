const express= require ('express');
const res = require('express/lib/response');
const app= express();
require('dotenv').config();

const jwt= require('jsonwebtoken');
//midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/api',validarToken,(req,res)=>{
    res.json({
        tuits:
        [
            {
                id:0,
                text:'primer tuit',
                username:'fer'

            },
            {
                id:0,
                text:'segundo tuit',
                username:'flor' 
            }
        ]
    })
})

app.get('/login',(req,res)=>{
    res.send(`<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <form method="POST"action="/auth">
            nombre de usuario:<input type="text" name="text"></input><br>
            Contraseña:<input type="password" name="password"></input><br>
            <input type="submit" value="Iniciar Sesion">

        </form>
    </body>
</html>`   
    )
});

app.post('/auth',(req,res)=>{
    const{username,password}= req.body;
    //validar en base de datos q existan username y password

    const user={username: username};
    const accesToken= generateAccesToken(user);

    res.header('authorization',accesToken).json({
        message: 'Usuario Autorizado',
        token: accesToken
    });

});

function generateAccesToken(user){
    return jwt.sign(user,process.env.SECRET, {expiresIn: '5m'});

}

function validarToken(req,res,next){
    const accesToken= req.header['authorization'];
    if(!accesToken) res.send('Access denied');

    jwt.verify(accesToken, process.env.SECRET, (err, user)=>{
        if(err){
            res.send('access denied, token expired or incorrect')
        }else{
            next();
        }
    })
}

app.listen(3000,()=>{
    console.log('server on port 3000')
});
