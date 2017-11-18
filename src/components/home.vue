<template>
 	<div id="home">
 		<!-- 轮播图 -->
 		<div class="swipe">
 			<mt-swipe :show-indicators="false">
 			  	<mt-swipe-item v-for="data in bigPicListGetter">
 			  		<div @click="detailClick(data.url.split('/video/')[1].split('?')[0])">
 			  			<img :src="data.mobileImg"/>
 			  			<p>{{data.title}}</p>
 			  		</div>
 			  	</mt-swipe-item>
 			</mt-swipe>
 		</div>
		<index-tap></index-tap>
 		
 		<footer>Copyright © 2016 yinyuetai.com</footer>
 	</div>
</template>

<script>
import { Swipe, SwipeItem,Spinner } from 'mint-ui';
import indexTap from "@/components/indexTap";

import {mapGetters } from "vuex";
import router from "@/router";

export default {
	name: 'home',

	data () {
		return {
			
		}
	},

	components:{
	  	swipe:Swipe,
	  	"swipe-item":SwipeItem,
	  	"index-tap":indexTap,
	  	spinner:Spinner
	},

	mounted(){
		if(!this.$store.state.bigPicList){
		  	this.$store.dispatch("getBigPicList","/mv/get-bigpic?source=wap");
		};
	},

	computed:{
	    ...mapGetters([
	    	"bigPicListGetter"
	    ])
	},

	methods:{
      detailClick(id){
        router.push({name:"detail",params:{keyid:id}});
      }
    }
	
}
</script>

<style lang="scss" scoped>
.swipe{
	height: 1.77rem;
	width: 3.2rem;
	img{
		width: 3.2rem;
		display: inline-block;
		text-align: center;
	}
	p{
		position: absolute;
		bottom: 0;
		font: 0.12rem/0.84rem "";
		color: #fff;
		left: 0.15rem;
	}
}

footer{
	height: 0.5rem;
	font: 0.11rem/0.5rem "";
	color:#666;
	text-align: center;
}


</style>