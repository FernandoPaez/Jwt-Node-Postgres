const { Router, json } = require('express');
const router = Router();


const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { Field } = require('pg-protocol/dist/messages');

//importar la funcion de la carpeta conecciones
const { pool } = require('../connection/connection');

//consulta a base de datos
const getUser = async (req, res) => {
    const responce = await pool.query("select * from usuario");
    res.status(200).json(responce.rows);

}
//rutas con los metodos http

router.get('/users', getUser);


//login / jwt
router.post('/login', async (req, res) => {
    const { username, pass } = req.body;
    //console.log(username,pass);
    const usuario = await pool.query('select * from usuario where username= $1 and pass= $2',
        [username, pass]);
    // cverifica si hay respuesta de la base de datos
    if (usuario.rowCount > 0) {
        const user = { username, pass }
        const token = jwt.sign(user, 'data');
        res.json({ token });
    }
    else {
        res.json({ mensaje: 'No entro' });
    }
 
});

//ruta de acceso restringido
router.post('/test', verifyToken, (req, res) => {
    res.json('acceso a info');



})
//verificacion de token
//middleware
function verifyToken(req, res, next) {

    if (!req.headers['authorization']) return res.status(403).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if (req.headers.authorization !== '') {
        try{
        const conten = jwt.verify(token, 'data');
        req.data = conten;
        next();}
        catch(error){
            res.status(401).json('token incorrecto')
        }
    } else {
        res.status(403).json('Token vacio');
    }

}


//recibir usuario y contraseña

router.post('/sign', async (req, res) => {
    const { username, pass } = req.body;
    await pool.query('select username, pass from usuario where username= ($1) and pass=($2)',
        [username, pass],
        console.log()
    )
});


//Coneccion al servidor

module.exports = router;
