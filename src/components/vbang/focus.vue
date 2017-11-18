<template>
 	<div id="focus">
 		<div class="swipe">
 			<mt-swipe :show-indicators="false">
 			  	<mt-swipe-item v-for="data in toList(0)">
 			  		<div @click="detailClick(data.url.split('/video/')[1])">
 			  			<img :src="data.mobileImage"/>
 			  			<p>{{data.title}}</p>
 			  		</div>
 			  	</mt-swipe-item>
 			</mt-swipe>
 		</div>
 		<div class="week bottom-bor">
 			<div v-if="toList(1)">
 				<span class="sp1">周榜冠军</span>
 				<span class="sp2">{{toList(1).year}}年 第{{toList(1).periods}}期({{toList(1).beginDateText}}~{{toList(1).endDateText}})</span>
 			</div>
 			<div class="contant" v-if="toList(2)">
 				<ul>
 					<li v-for="data,index in tap">
 						<a @click="detailClick(toList(2)[data].video.videoId)">
 							<img :src="toList(2)[data].image"/>
 							<div class="text">
 								<h3 class="over">{{toList(2)[data].title}}</h3>
 								<p>{{toList(2)[data].artists[0].artistName}}</p>
 								<span>{{toList(2)[data].video.score}}</span>
 							</div>
 							<div class="tap">{{tapName[index]}}</div>
 						</a>
 					</li>
 				</ul>
 			</div>
 		</div>

 		<div class="champion bottom-bor">
 			<span class="sp1">周榜最高记录</span>
 			<div class="shortTap">
 				<mt-navbar v-model="selected" class="ul">
	 				<mt-tab-item v-for="data,index in shotTap" :id="index+1+''">
	 					<span class="li">{{data}}</span>
	 				</mt-tab-item>
 				</mt-navbar>
 			</div>
 			<div class="last-count contant">
 				<mt-tab-container v-model="selected">
					<mt-tab-container-item v-for="data2,index in guanListGetter" :id="index+1+''">
						<ul>
							<li v-for="data,indd in toGuanList(index)" class="myli">
								<a @click="detailClick(data.videoBasic.id)">
									<img :src="data.videoBasic.albumImg"/>
									<div class="text">
										<h3 class="over">{{data.videoBasic.title}}</h3>
										<p class="p1">{{data.artists[0].artistName}}</p>
										<b>移动端播放：{{data.videoField.totalMobileViews}}</b>
										<b>诞生时间：{{data.videoRankWeekDateCodeModel.year}}年第{{data.videoRankWeekDateCodeModel.periods}}期</b>
										<b>已保持{{data.vchartGuinnessLogModel.staytime}}期</b>
									</div>
								</a>
							</li>
						</ul>
					</mt-tab-container-item>
 				</mt-tab-container>
 			</div>
 		</div>
 	</div>
</template>

<script>
import { Swipe, SwipeItem ,Navbar, TabItem} from 'mint-ui';
import {mapGetters } from "vuex";
import router from "@/router";
export default {

	name: 'focus',

	data () {
		return {
			tap:["ML","HT","HY","US","KR","JP"],
			tapName:["内地","港台","华语","欧美","韩国","日本"],
			shotTap:["站内完整播放","站外完整播放","收藏次数","下载次数","移动端播放"],
			selected:"1"
		}
	},

	components:{
		swipe:Swipe,
		"swipe-item":SwipeItem,
		"navbar":Navbar,
		"tab-item":TabItem
	},

	mounted(){
		if(!this.$store.state.focusList){
		  	this.$store.dispatch("getFocusList",[
		  			"/vchart/get-bigpic?type=LB&size=3",
		  			"/vchart/get-current?&_=1510730306021",
		  			"/vchart/get-week-champion?date=20171106&_=1510730306025"
		  		]);
		};
		if(!this.$store.state.guanList){
		  	this.$store.dispatch("getGuanList",[
		  			"/api/gnis-by-cat?year=2017&cat=views",
		  			"/api/gnis-by-cat?year=2017&cat=repastes",
		  			"/api/gnis-by-cat?year=2017&cat=favorites",
		  			"/api/gnis-by-cat?year=2017&cat=downloads",
		  			"/api/gnis-by-cat?year=2017&cat=mobileViews"
		  		]);
		};
	},

	computed:{
	    ...mapGetters([
	    	"focusListGetter",
	    	"guanListGetter"
	    ])
	},

	methods:{
		toList(index){
			if(this.focusListGetter.length > 0){
				if(index == 0){
					return this.focusListGetter[index].data.pics;
				}
				else if(index == 1){
					return this.focusListGetter[index].data.currDateCode;
				}
				else if(index == 2){
					return this.focusListGetter[index].data.videos;
				}
			}
		},
		toGuanList(index){
			if(this.guanListGetter.length > 0){
				return this.guanListGetter[index].data.data;
			}
		},
		detailClick(id){
			router.push({name:"detail",params:{keyid:id}});
		}
	}
}
</script>

<style lang="scss" scoped>
.swipe{
	padding-top: 0.03rem;
	height: 1.82rem;
	width: 3.2rem;
	img{
		width: 3.2rem;
		height: 1.82rem;
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
.week{
	.sp1{
		font:700 0.12rem/0.6rem "";
		margin-left: 0.1rem;
	}
	.sp2{
		font: 0.1rem/0.6rem "";
		margin-left: 0.3rem;
		color: #888;
	}
}
.bottom-bor{
	border-bottom: 0.02rem solid #e3e3e4;
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
		position: relative;
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
		position: absolute;
		span{
			height: 0.16rem;
			background: #db0f3b;
			color: #fff;
			font:0.1rem/0.16rem "";
			font-style: italic;
			padding: 0 0.06rem;
			position: absolute;
			right: 0rem;
			top: 0.06rem;
		}
	}
	.tap{
		position: absolute;
		left: 0;
		top: 0;
		width: 0.22rem;
		height: 0.12rem;
		background: #cf8a3b;
		color: #fff;
		font:0.1rem/0.12rem "";
		text-align: center;
	}

}

.champion{
	.sp1{
		display: block;
		font:700 0.12rem/0.14rem "";
		margin-left: 0.1rem;
		margin-top: 0.2rem;
	}
	.shortTap{
		width: 100%; 
		background-color:#fff;
		overflow-x: scroll; 
		-webkit-overflow-x: scroll;
		.ul{
			display: flex;
			justify-content: flex-start;
			width: 3.2rem;
		}
		.li{
			display: inline-block;
			text-align: center;
			text-overflow: ellipsis;
			word-break: keep-all;
			font: 0.11rem/0.26rem "";
			margin-bottom: 0.1rem;
			color: #777;
			margin: 0 0.1rem;
		}
	}
	.shortTap::-webkit-scrollbar{ 
	  width: 0; 
	  height: 0;   
	  background-color: #fff;  
	}
}

.last-count{
	.myli{
		height: 1.66rem;
		.p1{
			color:#999;
		}
		b{
			display: block;
			color: #222;
		}
	}

}
</style>