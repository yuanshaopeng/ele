<template>
	<div>
		<!--一个根元素-->
		管理员账号：<input type="text" v-model="user" /><br />
		管理员密码：<input type="text" v-model="pass" /><br />
		<button @click="login()">登录</button>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"login",
		data(){
			return {
				user:'',
				pass:"",
			}
		},
		methods:{
			login(){
				const params = {
					adminName:this.user,
					adminPass:this.pass
				}
				this.$http.post("/api/adminLogin",this.$qs.stringify(params),{headers:{
					"content-type":"application/x-www-form-urlencoded"
				}})
				.then(res=>{
					console.log(res);
					if (res.data.status==0) {
						let date = new Date();
						date.setDate(date.getDate()+1);
						document.cookie = "tokenId="+res.data.data.tokenId+";exprice="+date;
						this.$router.push({path:"/"})
					}
				})
			}
		}
	}
</script>