import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Channel from '@/components/channel'
import Vbang from '@/components/vbang'
import Yue from '@/components/yue'
import Detail from '@/components/detail'
import Search from '@/components/search'

import Focus from '@/components/vbang/focus'
import Mv from '@/components/vbang/mv'
import Zhuanji from '@/components/vbang/zhuanji'
import China from '@/components/vbang/china'

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [
		{
		  path: '/home',
		  component: Home
		},
		{
		  path: '/channel',
		  component: Channel
		},
		{
		  path: '/yue',
		  component: Yue
		},
		{
		  path: '/search',
		  component: Search
		},
		{
		  path: '/vbang',
		  component: Vbang,
		  children:[
	            {
	                path:"focus",
	                component:Focus
	            },
	            {
	                path:"mv",
	                component:Mv
	            },
	            {
	                path:"zhuanji",
	                component:Zhuanji
	            },
	            {
	                path:"china",
	                component:China
	            },
	            {
	                path:"/",
	                redirect:"/vbang/focus"
	            },

            ]
		},
		{
		    path:"/detail/:keyid", 
		    component:Detail,
		    name:"detail"
		},

		{
	    	path:"*",  
	    	redirect:"/home"
    	}
	]
})
