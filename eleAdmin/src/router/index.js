import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/admin/login'
import home from "@/view/home"
import adminGL from "@/view/adminGL"


Vue.use(Router)
export default new Router({
  routes: [
    {
    	path:"/",
    	component:home,
    	children:[
    		{path:"/admingl",
    		component:adminGL}
    	]
    },
    {
      path: '/login',
      component: login
    },
  ]
})
