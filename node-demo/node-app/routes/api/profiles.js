// 
const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const passport = require("passport");

// $route POST api/users/register
// @desc  返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "profiles ...."
    })

})

module.exports = router;