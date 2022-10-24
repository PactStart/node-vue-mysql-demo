1、初始化项目
```
    cd server
    npm init
```
2、安装express
```
    cnpm i express@4.17.3 --save
```
3、编写index.js
```
    const express = require('express');
    const app = express();

    app.listen(3000,()=>{
        console.log('server start on http://127.0.0.1:3000');
    })

```
4、启动nodejs项目
```
    node index.js
    
    sudo cnpm install nodemon -g
    nodemon index.js
```
5、编写路由
```
    //controller/userController.js
    exports.register = (req,res) => {
    console.log('register');
    }
    exports.login = (req,res) => {
        console.log('login');
    }
    exports.userInfo = (req,res) => {
        console.log('userInfo');
    }

    //router/user.js
    const express = require('express');
    const router = express.Router();

    const userController = require('../controller/userController')

    router.post('/register',userController.register);
    router.post('/login',userController.login);
    router.get('/userInfo',userController.userInfo);

    module.exports = router;

    //index.js
    const userRouter = require('./router/user');
    app.use('/api/v1/user',userRouter);

```
6、接收请求body的参数
```
    cnpm install body-parser@1.19.2 --save

    //index.js
    const bodyParser = require('body-parser');
    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({extended: false}));
```
7、参数校验
```
    <!-- https://www.npmjs.com/package/joi -->
    cnpm install joi@17.1.1 --save

    <!-- https://www.npmjs.com/package/@escook/express-joi -->
    cnpm install @escook/express-joi@1.1.1 --save

    const expressJoi = require('@escook/express-joi')
    const userSchema = {
        body: {
            userName: Joi.string().alphanum().min(3).max(12).required(),
            password: Joi.string()
            .pattern(/^[\S]{6,15}$/)
            .required()
        }
    }
    router.post('/register',expressJoi(userSchema),userController.register);

```
8、全局错误处理
```
    const joi = require('joi');
    app.use((err, req, res, next) => {
    //joi表单的用户信息校验失败
    if (err instanceof joi.ValidationError) {
        return res.send({
        code: 1,
        message: err.message,
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
        code: 1,
        message: '身份认证失败',
        });
    }
    //其他的错误
    res.send({
        code: 1,
        message: err.message,
    });
    });
```

9、配置mysql
```
    cnpm install mysql@2.8.1 --save
    //config/db.js
    const mysql = require('mysql');
    const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'node_vue_mysql'
    });

    module.exports = db;
```

10、mysql查询与插入
```
    const userSelectSql = 'select * from user where name = ?';
    db.query(userSelectSql,userName,(err,results) => {
        if(err) {
            //...
        } else {
            //...
        }
    });

    const userInsertSql = 'insert into user(name,pwd,head_img) value (?,?,?)';
    db.query(userInsertSql,[userName,password,imgList[index]],(err,results) => {
        if(err) {
            //...
        } else {
            //...
        }
    })

```
11、密码加密
```
    cnpm install bcryptjs@2.4.3 --save

    <!-- https://www.npmjs.com/package/bcryptjs -->
    const passwordB = bcrypt.hashSync(password, 10);

```
12、生成访问凭证jwt token
```
    cnpm install jsonwebtoken@8.5.1 --save
    <!-- https://www.npmjs.com/package/jsonwebtoken -->
    const token = jwt.sign(user,'node_vue_mysql',{ expiresIn: '24h' });

    const user = jwt.verify(token.split('Bearer ')[1],'node_vue_mysql');


```
13、配置跨域
```
    cnpm install cors@2.8.5 --save
    <!-- https://www.npmjs.com/package/cors -->
    const cors = require('cors');
    app.use(cors());

```