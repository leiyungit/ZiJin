// 
const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const passport = require("passport");
const Profiles = require("../../models/Profile");

// $route POST api/profiles/test
// @desc  返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "profiles api"
    })
})

// $route POST api/profiles/add
// @desc  返回请求的json数据 pretty
// @access private
router.post("/add",passport.authenticate("jwt", { session: false}), (req, res) => {
    let profileFileds={};
    if(req.body.type) profileFileds.type=req.body.type;
    if(req.body.descride) profileFileds.descride=req.body.descride;
    if(req.body.income) profileFileds.income=req.body.income;
    if(req.body.expend) profileFileds.expend=req.body.expend;
    if(req.body.cash) profileFileds.cash=req.body.cash;
    if(req.body.remark) profileFileds.remark=req.body.remark;
    console.log(profileFileds);
    new Profiles(profileFileds).save().then(profiled=>{
        res.json(profiled);
    }).catch(err=>res.json(err));
})

module.exports = router;