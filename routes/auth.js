const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { login } = require("../controllers/auth");

const router = Router();

router.post('/login',[
    check('correo', 'El correo es requierdo').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
], login );

module.exports = router;