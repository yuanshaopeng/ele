exports.setCookie = (key,value)=>{
	let date = new Date();
	date.setDate(date.getDate()+7);
	document.cookie = key+"="+value+";exprice="+date;
}


exports.getCookie = (key)=>{
	if (document.cookie){
		let cookie = document.cookie;
		let arr = cookie.split(" ;");
		let str = arr.find((item,index)=>{
			let arr = item.split("=");
			if(arr[0] == key){
				return true
			}else{
				return false;
			}
		})
		return str.split('=')[1];
	}else{
		return 
	}
	
}
