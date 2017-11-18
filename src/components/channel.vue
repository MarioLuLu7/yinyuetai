<template>
	<div id="channel">
		<div class="top-banner">
			<div class="short-title">
				<span>{{shorttitle}}</span>
				<i @click="bannerIsShow=!bannerIsShow"></i>
			</div>
		 	<transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
				<div class="sortMenu" v-if="bannerIsShow">
					<ul class="content-banner sortMenu-ul">
						<li v-for="data,index in topBannerListGetter" @click="changesTap(index,data.name)">
							<img :src="data.image">
							<p>{{data.name}}</p>
						</li>
					</ul>
				</div>
			</transition>
		</div>
	 	<div class="main-count">
	 		<mt-tab-container v-model="active">
				<mt-tab-container-item v-for="item,index in bigAllListGetter" :id="index+''">
					<div class="swipe">
						<mt-swipe :show-indicators="false">
						  	<mt-swipe-item v-for="data in toList(index,0)">
						  		<div @click="detailClick(data.url.split('/video/')[1])">
						  			<img :src="data.image"/>
						  			<p>{{data.title}}</p>
						  		</div>
						  	</mt-swipe-item>
						</mt-swipe>
					</div>
				  	<div class="indexTap">
				  		<div class="title">
							<b>MV热榜</b>
							<div class="title-right" @click="changes(index)">
								<i></i><span>换一换</span>
							</div>
						</div>
				  		<div class="contant">
				  			<ul>
				  				<li v-for="data in hotList(toList(index,1),index)">
				  					<a @click="detailClick(data.videoId)">
				  						<img :src="data.image"/>
				  						<div class="text">
				  							<h3 class="over">{{data.title}}</h3>
				  						</div>
				  					</a>
				  				</li>
				  			</ul>
				  		</div>
				  	</div>
				  	<div class="indexTap" v-for="data in toList(index,2)">
		  		  		<div class="title">
		  					<b>{{data.name}}</b>
		  				</div>
		  				<div class="contant">
		  					<div class="bigVideo" v-if="data.priVideo" @click="detailClick(data.priVideo.videoId)">
		  						<img :src="data.priVideo.headImg">
		  						<h3 class="over">{{data.priVideo.title}}</h3>
		  						<p class="over">{{data.priVideo.title}}</p>
		  					</div>
		  					<ul>
		  						<li v-for="data in data.subVideos.slice(1,5)">
		  							<a @click="detailClick(data.videoId)">
		  								<img :src="data.headImg"/>
		  								<div class="text">
		  									<h3 class="over">{{data.title}}</h3>
		  									<p class="over">{{data.description}}</p>
		  								</div>
		  							</a>
		  						</li>
		  					</ul>
		  				</div>
				  	</div>
				</mt-tab-container-item>
	 		</mt-tab-container>
	 		<footer>Copyright © 2016 yinyuetai.com</footer>
	 	</div>
	</div>
</template>

<script>
import {Swipe, SwipeItem, TabContainer, TabContainerItem } from 'mint-ui';
import {mapGetters } from "vuex";
import router from "@/router";

export default {

	name: 'channel',

	data () {
	    return {
	    	selected:1,
	    	bannerIsShow:false,
	    	active:"0",
	    	shorttitle:"韩流频道",
	    	allIndex:{
	    		0:0,
	    		1:0,
	    		2:0,
	    		3:0,
	    		4:0,
	    		5:0
	    	},
	    }
	},
	components:{
	  	swipe:Swipe,
	  	"swipe-item":SwipeItem,
	  	"tab-container":TabContainer,
	  	"tab-container-item":TabContainerItem
	},
	mounted(){
		if(!this.$store.state.topBannerList){
		  	this.$store.dispatch("getTopBannerList","/mvchannel/get-module");
		};

		if(!this.$store.state.hanList){
		  	this.$store.dispatch("getHanList",[
		  			"/mvchannel/get-pic?moduleId=10&size=3",
		  			"/mvchannel/get-hot-video?moduleId=10&size=12",
		  			"/mvchannel/get-sub-module?moduleId=10&size=10"
		  		]);
		};

		if(!this.$store.state.huaList){
		  	this.$store.dispatch("getHuaList",[
		  			"/mvchannel/get-pic?moduleId=8&size=3",
		  			"/mvchannel/get-hot-video?moduleId=8&size=12",
		  			"/mvchannel/get-sub-module?moduleId=8&size=10"
		  		]);
		};

		if(!this.$store.state.ouList){
		  	this.$store.dispatch("getOuList",[
		  			"/mvchannel/get-pic?moduleId=9&size=3",
		  			"/mvchannel/get-hot-video?moduleId=9&size=12",
		  			"/mvchannel/get-sub-module?moduleId=9&size=10"
		  		]);
		};

		if(!this.$store.state.riList){
		  	this.$store.dispatch("getRiList",[
		  			"/mvchannel/get-pic?moduleId=11&size=3",
		  			"/mvchannel/get-hot-video?moduleId=11&size=12",
		  			"/mvchannel/get-sub-module?moduleId=11&size=10"
		  		]);
		};

		if(!this.$store.state.fanList){
		  	this.$store.dispatch("getFanList",[
		  			"/mvchannel/get-pic?moduleId=12&size=3",
		  			"/mvchannel/get-hot-video?moduleId=12&size=12",
		  			"/mvchannel/get-sub-module?moduleId=12&size=10"
		  		]);
		};
	},
	computed:{
	    ...mapGetters([
	    	"topBannerListGetter",
	    	"bigAllListGetter"
	    ])
	},
	methods:{
		changesTap(index,title){
			this.active = index+"";
			this.bannerIsShow = !this.bannerIsShow;
			this.shorttitle = title;
		},

		toList(inx,ind){
			if(this.bigAllListGetter.length>0){
				return this.bigAllListGetter[inx][ind].data.result;
			}
		},

		changes(ind){
			if(this.allIndex[ind] == 2){
				this.allIndex[ind] = 0;
			}
			else{
				this.allIndex[ind]++;
			}
		},

		hotList(x,ind){
			return x?x.slice(this.allIndex[ind]*4,(this.allIndex[ind]+1)*4):"";
		},

		detailClick(id){
			router.push({name:"detail",params:{keyid:id}});
		}
	}
}
</script>

<style src="../assets/animate.css"></style>
<style lang="scss" scoped>
#channel{
	position: absolute;
	top:0.51rem;
	z-index: 50;
}
.top-banner{
	position: fixed;
	top: 0.69rem;
	width: 100%;
	height: 0.28rem;
	z-index: 50;
}
.short-title{
	height: 0.28rem;
	background: #fff;
	position: relative;
	z-index:150;
	border-top: 0.01rem solid #555;
	top: 0.02rem;
	span{
		font: 0.11rem/0.28rem "";
		color:#4b4c4d;
		vertical-align: middle;
		float: left;
		margin-left: 0.15rem;
	}
	i{
		width: 0.17rem;
		height: 0.17rem;
		display: inline-block;
		background: url(../assets/cha.png) no-repeat;
		background-size: 0.17rem 0.17rem;
		vertical-align: middle;
		float: right;
		margin-right: 0.15rem;
		position: relative;
		top: 0.05rem;
	}
}
.content-banner{
	background: #f3f5f7;
	height: 0.82rem;
	display: flex;
	padding:0 0.15rem;
	li{
		padding-right: 0.15rem;
		margin-top: 0.1rem;
		img{
			width: 0.45rem;
			height: 0.45rem;
			display: block;
		}
		p{
			color: #555;
			font: 0.1rem/0.2rem "";
			text-align: center;
		}
	}
}
.aaa{
	background: #f3f5f7;
}
.sortMenu{
	width: 100%; 
	background: #f3f5f7;
	overflow-x: scroll; 
	-webkit-overflow-x: scroll;
	position: relative;
}
	.sortMenu::-webkit-scrollbar{ 
	width: 0; 
	height: 0;   
	background-color: #fff;  
}
.swipe{
	height: 1.77rem;
	width: 3.2rem;
	position: relative;
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

.indexTap{
	width: 3.2rem;
	border-bottom: 0.02rem solid #e3e3e4;
	.title{
		font:700 0.1rem/0.57rem "";
		color:#4b4c4d;
		overflow: hidden;
		b{
			margin-left: 0.14rem;
			float: left;
			font:700 0.12rem/0.57rem "";
		}
		.title-right{
			float: right;
			margin-right: 0.14rem;
			i{
				display: inline-block;
				width: 0.13rem;
				height: 0.13rem;
				background: url(../assets/cbtn.png) no-repeat;
				background-size: 0.13rem 0.13rem;
				position: relative;
				top: 0.02rem;
				right: 0.02rem;
			}
			span{
				font:0.08rem/0.57rem "";
			}
		}
	}
	.contant{
		ul{
			display: flex;
			width: 3.2rem;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 0 0.04rem;
		}
		li{
			width: 1.5rem;
			height: 1.3rem;
			margin:0 0.03rem;
		}
		a{
			display: block;
			font: 0.09rem/0.14rem "";
			h3{
				color:#000;
				width: 1.37rem;
				font-weight: 500;
			}
			p{
				color: #b7b7b7;
			}
			img{
				width: 1.5rem;
			}
		}
		.text{
			padding: 0.04rem 0 0 0.13rem;
		}

	}
}
.bigVideo{
	margin-bottom: 0.1rem;
	img{
		height: 1.87rem;
		width: 100%;
	}
	h3{
		padding: 0 0.1rem;
		color:#000;
		width: 100%;
		font-weight: 500;
		font: 0.11rem/0.2rem "";
	}
	p{
		font: 0.1rem/0.2rem "";
		color: #b7b7b7;
		width:100%;
		padding: 0 0.1rem;
	}
}

footer{
	height: 0.5rem;
	font: 0.11rem/0.5rem "";
	color:#666;
	text-align: center;
}
.main-count{
	margin-top: 0.5rem;
}

</style>