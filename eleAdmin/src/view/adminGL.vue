<template>
	<div>
		<button>添加管理员</button>
		<table>
			<tr>
				<td>序号</td>
				<td>管理员名称</td>
				<td>管理员创建日期</td>
				<td>操作</td>
			</tr>
			<tr v-for = "(item,index) in list">
				<td>{{index+1}}</td>
				<td>{{item.adminName}}</td>
				<td>{{item.adminTime}}</td>
				<td><a href="#">查看管理员日志</a><a href="">删除管理员</a></td>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"adminGL",
		data(){
			return {
				list:[]
			}
		},
		mounted(){
			this.$http.get("/api/getAdmin",{params:{tokenId:this.$cookie.getCookie("tokenId")}})
			.then(res=>{
				console.log(res);
				this.list = res.data.data.list;
			})
		}
	}
</script>