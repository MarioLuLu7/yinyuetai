<template>
  <div>
  	  <div class="nav">
  	  	<div class="head">
  	  		<div class="logo">
  	  			<router-link to="/home" tag="a"></router-link>
  	  		</div>
  	  		<div class="inputt">
  	  			<input type="text" @focus="result=false" v-model="keyword"/>
  	  		</div>
  	  		<div class="search" @click="search()">搜索</div>
  	  </div>
  	</div>
  	<div class="cont" v-if="!result">
  		<div class="hot">热搜词</div>
  		<div class="ci" v-if="spanSearch">
  			<span v-for="data in toHotList()" @click="spanSearch(data[0])">{{data[0]}}</span>

  		</div>
  	</div>
  	<div class="result" v-if="result">
  		<p class="title">查询结果</p>
  		<ul v-if="list">
  		  <li v-for="data in list" @click="detailClick(data.id)">
  		    <img :src="data.headImg"/>
  		    <p class="title2">{{data.title}}</p>
  		    <p class="bofang">播放：{{data.value}}</p>
  		  </li>
  		</ul>
  		<div class="more" @click="more()">加载更多+</div>
  	</div>
  </div>
</template>

<script>

	import {mapGetters } from "vuex";
	import { Spinner } from 'mint-ui';
	import axios from "axios";
	import router from "@/router";

export default {

	  name: 'search',

	  data () {
	    return {
	      result:false,
	      list:null,
	      page:1,
	      keyword:null
	  }
	},
	computed:{
	    ...mapGetters([
	    	"searchListGetter"

	    ])
	},
	mounted(){
		if(!this.$store.state.searchList){
		  	this.$store.dispatch("getSearchList","/search/get-hotword?_api=get.hotList&_mock=false&pageIndex=1&pageSize=12");
		};
	},
	methods:{
      detailClick(id){
        router.push({name:"detail",params:{keyid:id}});
      },
      toHotList(){
      	if(this.searchListGetter){
      		document.documentElement.scrollTop = "0";
      		return this.searchListGetter.keywords.data;
      	}
      },
      search(){
      	this.result = true;
      	axios.get("/search/video-search",{
			params:{
				_api:'get.videoList',
				keyword:this.keyword,
				pageIndex:this.page,
				pageSize:'20'
			}
		}).then(res=>{
			this.list = res.data.videos.data;
		})
      },
      more(){
      	this.page++;
      	axios.get("/search/video-search",{
			params:{
				_api:'get.videoList',
				keyword:this.keyword,
				pageIndex:this.page,
				pageSize:'20'
			}
		}).then(res=>{
			this.list = [...this.list,...res.data.videos.data];
		})
      },
      spanSearch(x){
      	this.keyword = x;
      	this.result = true;
      	axios.get("/search/video-search",{
			params:{
				_api:'get.videoList',
				keyword:this.keyword,
				pageIndex:this.page,
				pageSize:'20'
			}
		}).then(res=>{
			this.list = res.data.videos.data;
		})
      }
    }
}
</script>

<style lang="scss" scoped>
.nav{
	position: fixed;
	top: 0;
	left: 0;
	height: 0.39rem;
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
				background: url(../assets/logo_new.png) no-repeat;
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
}
.search{
	position: absolute;
	right:0.1rem;
	color: #fff;
	font: 0.12rem/0.39rem "";
}
.inputt{
	margin:0.06rem 0 0 0.15rem;
	input{
		width: 1.6rem;
		height: 0.23rem;
		border-radius: 0.2rem;
		padding: 0 0.1rem;
	}
}
.cont{
	width: 3.2rem;
	background: #FFF;
	height: 11rem;
	position: fixed;
	top: 0.7rem;
	.hot{
		text-align: center;
		font: 0.12rem/0.36rem "";
		border-bottom: 0.01rem solid #e3e3e4;
		margin-bottom: 0.1rem;
	}
	.ci{
		padding: 0 0.18rem;
	}
	span{
		font: 0.12rem/0.3rem "";
		color: #555;
		padding: 0 0.1rem;
		display: block;
	}
}
.result{
	background: #fff;
	border-bottom: 0.03rem solid #ddd;
	padding: 0 0.14rem;
	margin-bottom: 0.2rem;
	.title{
	  font: 0.14rem/0.37rem "";
	}
	img{
	  width: 1.36rem;
	  height: 0.77rem;
	  border-radius: 0.04rem;
	}
	li{
	  position: relative;
	  padding: 0.06rem 0;
	  border-bottom: 0.01rem solid #ddd;
	}
	.title2{
	  position: absolute;
	  left: 1.45rem;
	  top: 0.15rem;
	  font:0.12rem/0.15rem "";
	}
	.bofang{
	  font: 0.11rem/0.4rem "";
	  position: absolute;
	  bottom: 0;
	  right: 0.03rem;
	  color: #888;
	}
}
.more{
	margin-top: 0.2rem;
	text-align: center;
	font: 0.14rem/0.3rem "";
}

</style>