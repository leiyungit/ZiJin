// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require("passport");

const User = require("../../models/User");
const SALT_WORK_FACTOR = 10;

// $route POST api/users/register
// @desc  返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "login works"
    })

})

router.post("/register", (req, res) => {
     console.log(req.body);
    // 查询数据库中是否存在邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册！"+req.body.email)
            } else {
                let avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                    if (err) {
                        return next(err)
                    }
                    bcrypt.hash(newUser.password, salt, null, function (err, hash) {
                        if (err) return next(err)
                        //console.log(hash)
                        newUser.password = hash;
                        console.log(`user:${newUser}`);
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));

                    })

                })
                console.log('注册成功！')
            }
        })
})

// $route POST api/users/login
// @desc  返回token jwt passport
// @access public
router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // 查询
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在");
            }
            // 密码匹配
            let isPass = bcrypt.compareSync(password, user.password)
            console.log(`isPass:${isPass}`);
            bcrypt.compare(password, user.password, (err, pass) => {
                // res == true
                if (pass === true) {
                    //jwt.sign("规则", "加密名称", "过期时间","箭头函数");
                    //res.json({msg:"success"});
                    let rule = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        identity: user.identity
                    };
                    jwt.sign(rule, keys.secretOrKey, {
                        expiresIn: 3600*12
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: keys.Bearer + token
                        })
                    });
                } else {
                    return res.status(400).json("密码错误");
                }
            });
        })

})

// $route GET api/users/current
// @desc  return current user  验证token
// @access private
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

// $route GET api/users/
// @desc  return current user  验证token
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    User.find().then(user => {
        if (!user) {
            return res.status(404).json("没有任何内容")
        }
        res.json(user);
    }).catch(err => res.status(404).json(err));
})
module.exports = router;