const querystring = require("querystring");
const db = require("../public/db.js");//引入数据库操作脚本
const jwt = require("../public/jwt.js");//引入token加密脚本
exports._adminLogin = (req,res)=>{
	let str = "";
	req.on("data",function(data){
		str+=data;
	})
	req.on("end",()=>{
		console.log(str);
		let dataObj = querystring.parse(str);
		db.find("adminList",{where:dataObj},(err,result)=>{
			if(err){
				res.send({
					status:"-1",
					statusText:"网络连接错误",
					data:null
				})
			}else{
				if(result.length ==0){
					res.send({
						status:"-2",
						statusText:"用户名与密码不匹配",
						data:null
					})
				}else{
					db.insertOne("adminLog",{
						adminId:result._id,
						msgStatus:"0",
						msgContent:"登录账号",
						time:(new Date()).getTime()
					},(err,insertResult)=>{
						res.send({
							status:"0",
							statusText:"success",
							data:{
								adminName:result[0].adminName,
								tokenId:jwt.setToken({
									adminId:result[0]._id,
									adminName:result[0].adminName},"1h")	
								}
						})
					})
					
				}
			}
		})
	})
}

exports._token=(req,res)=>{
	let str = "";
	req.on("data",(data)=>{
		str+=data
	})
	req.on("end",()=>{
		const tokenId = querystring.parse(str).tokenId;
		jwt.getToken(tokenId,(err,result)=>{
			if(err){
				res.send({
					status:"-2",
					statusText:"身份验证过期",
					data:null
				})
			}else{
				res.send({
					status:"0",
					statusText:"success",
					data:{
						tokenId:jwt.setToken({
							adminId:result.adminId,
							adminName:result.adminName
						},"1h")
					}
				})
			}
		})
	})
}

exports._getAdmin = (req,res)=>{
	let tokenId = req.query.tokenId;
	jwt.getToken(tokenId,(err,result)=>{
			if(err){
				res.send({
					status:"-2",
					statusText:"身份验证过期",
					data:null
				})
			}else{
				db.find("adminList",{},(err,results)=>{
					if(err){
						res.send({
							status:"-1",
							statusText:"网络连接失败",
							data:null
						})
					}else{
						res.send({
							status:"0",
							statusText:"success",
							data:{
								list:results.map((item,index)=>{
									return {
										adminName:item.adminName,
										adminTime:item.adminTime,
										adminId:item._id
									}
								}),
								tokenId:jwt.setToken({
									adminId:result.adminId,
									adminName:result.adminName
								},"1h")
							}
						})
					}
					
				})
			}
		})
}
