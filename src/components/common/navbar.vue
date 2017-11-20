<template>
  <div class="nav">
  	<div class="head">
  		<div class="logo">
  			<router-link to="/home" tag="a"></router-link>
  		</div>
  		<!-- <div class="loading" v-if="loadingIsShow">
  			<mt-spinner type="triple-bounce" color="#FFF"></mt-spinner>
  		</div> -->
  		<div class="search">
  			<router-link to="/search" tag="div"><img src="../../assets/sbtn.png"></router-link></div>
  	</div>
  	<nav>
  	    <div class="allSort">
  	           <div class="sortMenu">
  	            <ul class="sortMenu-ul" >
  	            	<li v-for="item in sortMenu"  class="cell">
  	            		<router-link :to="item.path" tag="a" activeClass="active">{{item.sortname}}</router-link>
  	            	</li>
  	            </ul>
  	          </div>
  	        </div>
  	</nav>
  </div>
</template>

<script>

	import {mapGetters } from "vuex";
	import { Spinner } from 'mint-ui';

	export default {

	  name: 'navbar',

	  data () {
	    return {
	         sortMenu: [
	           { sortname: '首页',path:'/home' },
	           { sortname: '频道',path:'/channel' },
	           { sortname: 'V榜',path:'/vbang' },
	           { sortname: '悦单',path:'/yue' }
	         ],
	         loadingIsShow:true
	       }
	  },
	  components:{
	  	spinner:Spinner
	  },
	  computed:{
	  	 ...mapGetters([
	    	"loadingIsShowGetter"
	    ])
	  },
	  mounted(){
	  	// var that = this;
	  	// var timer = setInterval(function(){
	  	// 	if(!that.loadingIsShowGetter){
		  // 		that.loadingIsShow = false;
		  // 		clearInterval(timer);
		  // 	}
		  // },10);
	  	
	  }
	}
</script>

<style lang="scss" scoped>
.nav{
	position: fixed;
	top: 0;
	left: 0;
	height: 0.74rem;
	z-index: 200;
	.head{
		height:0.38rem;
		background:#000;
		display: flex;
		width: 3.2rem;
		position: relative;
		.logo{
			margin: 0.08rem 0 0 0.15rem;
			a{
				display: block;
				background: url(../../assets/logo_new.png) no-repeat;
				width: 0.60rem;
				height: 0.22rem;
				background-size: 0.60rem 0.22rem;
			}
		}
		.loading{
			margin:0.15rem 0 0 0.6rem; 
		}
	}
	nav{
		height: 0.36rem;
	}
	.sortMenu{
	  width: 100%; 
	  background-color:#fff; 
	  overflow-x: scroll; 
	  -webkit-overflow-x: scroll;
	}
	.sortMenu::-webkit-scrollbar{ 
	  width: 0; 
	  height: 0;   
	  background-color: #fff;  
	}
	.sortMenu-ul {  
	  display: flex;
	  justify-content: space-between;
	  width: 3.2rem;
	  padding:  0 0.2rem;
	  box-sizing: border-box;
	  .active{
	  	border-bottom: 0.03rem solid #27d5bf;
	  }
	}
	.sortMenu .cell{ 
	  padding:0 0.15rem; 
	  height: 0.33rem;
	  display: inline-block;
	  font:0.12rem/0.3rem "";
	  text-align: center;
	  position: relative;
	  text-overflow: ellipsis;
	  word-break: keep-all;
	  a{
	  	display: block;
	  	color: #000;
	  }
	}
}
.search{
	position: absolute;
	top: 0.1rem;
	right:0.1rem;
	img{
		width: 0.17rem;
		height: 0.17rem;
	}
}

</style>