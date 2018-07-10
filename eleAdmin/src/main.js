// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import qs from "qs";
import cookie from "./assets/cookie";
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$cookie = cookie;

/* eslint-disable no-new */
router.beforeEach(function(to,from,next){
	console.log(cookie.getCookie("tokenId"));
	if(to.path=="/login"||to.path=="/"){
		next()
	}else{
	if(cookie.getCookie("tokenId")){
		axios.post("/api/token",qs.stringify({tokenId:cookie.getCookie("tokenId")}),{headers:{
					"content-type":"application/x-www-form-urlencoded"
				}}).
		then(res=>{
			if(res.data.status == 0){
				next()
			}else{
				next('/login')
			}
		})
	}else{
		next("/login")
	}
	}
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
