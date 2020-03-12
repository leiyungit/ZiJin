const express=require("express");
const mongoose=require("mongoose")
const bodyParser = require("body-parser");
const passport =require("passport");
const app = express();

// 引入user.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

// DB config
const db=require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 连接数据库
// mongoose.connect(db)
//         .then(()=>console.log("MongoDB 连接成功"))
//         .catch((err)=> console.log(err));
//mongoose.Promise = global.Promise;  
mongoose.connect(db,{useNewUrlParser:true},(err)=>{
     if(err){
          console.log('Connection Error:'+err) 
     }else{
          console.log("MongoDB 连接成功")
     }
})

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

app.get("/",(req,res)=>{
     res.send("这是一个api接口！");
})

// 使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
     console.log(`Server Runnion on port ${port}`)
 })