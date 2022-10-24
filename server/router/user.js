const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

const expressJoi = require('@escook/express-joi')
const joi = require('joi');

const userSchema = {
    body: {
        userName: joi.string().alphanum().min(3).max(12).required(),
        password: joi.string()
        .pattern(/^[\S]{6,15}$/)
        .required()
    }
}

router.post('/register',expressJoi(userSchema),userController.register);
router.post('/login',userController.login);
router.get('/userInfo',userController.userInfo);

module.exports = router;