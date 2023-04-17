const { response, query } = require('express')

const usuariosGet =  ( req, res = response ) => {
    const query = req.query
    const { hola, nombre } = query
    
    res.json({
        msg: 'Get API - desde controller',
        hola,
        nombre
    })
};

const usuariosPost =  ( req, res = response ) => {
    const body = req.body;

    res.json({
        msg: 'Post API - desde controller',
        body
    })
};
const usuariosPut =  ( req, res = response ) => {
    const {id} = req.params;

    res.json({
        msg: 'Put API - desde controller',
        id
    })
};
const usuariosDelete =  ( req, res = response ) => {
    res.json({
        msg: 'Delete API - desde controller'
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}