const db = require("../config/db");
const { jwtSecretKey } = require('../config/jwtSecretKey');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = (req,res) => {
    let { userName, password } = req.body;
    if (!userName || !password) {
        return res.send({ code: 1, message: '用户名或者密码不能为空！' });
    }
    const userSelectSql = 'select * from user where name = ?';
    db.query(userSelectSql,userName,(err,results) => {
        if(err) {
            res.send({
                code:1,
                message: err.message
            });
        }
        if (results.length > 0) {
            return res.send({
                code: 1, 
                message: '该用户名已经存在' 
            });
        }
    })

    const passwordB = bcrypt.hashSync(password, 10);

    const imgList = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg'
    ];
    const index = Math.floor(Math.random() * imgList.length);
    const userInsertSql = 'insert into user(name,pwd,head_img) value (?,?,?)';
    db.query(userInsertSql,[userName,passwordB,imgList[index]],(err,results) => {
        if(err) {
            res.send({
                code:1,
                message: err.message
            });
        }
        res.send({
            code: 0,
            message: '注册成功'
        });
    })
}
exports.login = (req,res) => {
    let {userName,password} = req.body;
    const userSelectSql = 'select * from user where name = ?';
    db.query(userSelectSql,userName,(err,results) => {
        if(err) {
            return res.send({
                code:1,
                message: err.message
            })
        }
        if(results.length === 0){
            return res.send({
                code: 1,
                message: '账号不存在'
            })
        }
        const compareState = bcrypt.compareSync(password,results[0].pwd);
        if(!compareState) {
            return res.send({
                code: 1,
                message: '密码错误'
            })
        }
        const user = {...results[0],pwd:''};
        const token = jwt.sign(user,jwtSecretKey,{ expiresIn: '24h' });

        res.send({
            code:0,
            message:'success',
            data: {
                token: 'Bearer '+ token,
                user: user
            }
        })
    });
    
};
exports.userInfo = (req,res) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token.split('Bearer ')[1],jwtSecretKey);
    res.send({
        code: 0,
        data: {
            user
        }
    })
}