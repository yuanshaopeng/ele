const express = require("express");

const admin = require("./model/admin.js");

const http = express();
http.listen(8080,()=>{
	console.log("server is running and prow is 8080")
})

//添加登录接口
http.post("/adminLogin",admin._adminLogin);
//验证token是否过期
http.post("/token",admin._token);
//获取所有管理员接口
http.get("/getAdmin",admin._getAdmin);
