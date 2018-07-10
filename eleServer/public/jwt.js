const jwt = require("jsonwebtoken");//引入身份验证依赖  jsonwebtoken;
//jwt.sign
//添加秘钥
const key = "callmeYuanSir";

//token值加密方法封装
exports.setToken = (obj,time)=>{
//	jwt.sign(需要加密的数据,加密秘钥,options配置对象设置过期时间)
	return jwt.sign(obj,key,{expiresIn:time})
}

//解析token
exports.getToken = (token,callback)=>{
	jwt.verify(token,key,(err,result)=>{
		if(err){
			callback(err,null);
		}else{
			callback(null,result)
		}
	})
}

