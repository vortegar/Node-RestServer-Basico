const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async( req, res = response ) => {

    try {
    
        const { password, correo } = req.body;
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg : 'Usuario / Pasword incorrecto - correo'
            });
        }

        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg : 'Usuario / Pasword incorrecto - usuario : false'
            });        
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg : 'Usuario / Pasword incorrecto - contraseña'
            });        
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mgs: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    login
}