<template>
 	<div id="china">

 		<div class="champion bottom-bor">
			<div class="time" v-if="chinaListGetter[0]">当前打榜{{chinaListGetter[0].data.dateCode.year}}年 {{chinaListGetter[0].data.dateCode.periods}}期({{chinaListGetter[0].data.dateCode.beginDateText}}~{{chinaListGetter[0].data.dateCode.endDateText}})</div>

 			<div class="last-count bottom-bor">

					<div v-for="data2,index in chinaListGetter" :id="index+1+''">
						<div class="tap" v-for="data,ind in toList(index)">
							<div class="overfloww" @click="detailClick(data.video.videoId)">
								<img :src="data.video.albumImg">
								<span class="number">{{data.video.number}}</span>
								<span class="title">{{data.video.videoTitle}}</span>
								<span class="name">{{data.video.artists[0].artistName}}</span>
								<span class="score">{{data.video.score}}</span>
								<span class="more">数据详情</span>
							</div>
							<div class="detail">
								<div class="d1">
									<span>站内完整播放：{{data.video.viewsReal}}</span>
									<span>收藏次数：{{data.video.favorites}}</span>
									<span>百度热度：{{data.video.baiduViews
}}</span>
									<span>移动端播放：{{data.video.mobileViews}}</span>
									
								</div>
								<div class="d2">
									<span>站外完整播放：{{data.video.repastesReal}}</span>
									<span>下载次数：{{data.video.downloadsReal}}</span>
									<span>移动端分享：{{data.video.mobileShares}}</span>
									<span>移动端缓存：{{data.video.mobileDownloads}}</span>
								</div>
							</div>
						</div>
					</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import {mapGetters } from "vuex";
import { Navbar, TabItem} from 'mint-ui';
import router from "@/router";
export default {

	name: 'china',

	data () {
		return {
			selected:null
		}
	},

	mounted(){
		if(!this.$store.state.chinaList){
		  	this.$store.dispatch("getChinaList",[
		  			"/vchart/get-billboardv?page=1",
		  			"/vchart/get-billboardv?page=2",
		  			"/vchart/get-billboardv?page=3",
		  			"/vchart/get-billboardv?page=4"
		  		]);
		};
	},
	components:{
		"navbar":Navbar,
		"tab-item":TabItem
	},

	computed:{
	    ...mapGetters([
	    	"chinaListGetter"

	    ])
	},

	methods:{
		toList(index){
			if(this.chinaListGetter.length > 0){
				return this.chinaListGetter[index].data.videos;
			}
		},
		detailClick(id){
			router.push({name:"detail",params:{keyid:id}});
		}

	}
}
</script>

<style lang="scss" scoped>

.champion{
	width: 3.2rem;
}
.time{
	font: 0.1rem/0.3rem "";
	text-align: center;
}
.bottom-bor{
	border-bottom: 0.02rem solid #e3e3e4;
}

.last-count{
	width: 100%;
	.tap{
		width: 100%;
		overflow: hidden;
		position: relative;
		text-align: center;
		margin-bottom: 0.12rem;
		img{
			width: 3rem;
			display:block;
			margin: 0 auto;
		}
		.number{
			font:700 0.36rem/0.9rem "";
			font-style: italic;
			color: #fff;
			position: absolute;
			bottom: 0;
			left: 0.2rem;
		}
		.title{
			font:0.11rem/0.14rem "";
			color: #fff;
			position: absolute;
			right: 0.2rem;
			bottom: 0.2rem;
		}
		.name{
			font:0.11rem/0.14rem "";
			color: #16bf81;
			position: absolute;
			right: 0.2rem;
			bottom: 0.06rem;
		}
		.score{
			position: absolute;
			font:0.12rem/0.3rem "";
			color: #fff;
			left:0.15rem;
			bottom: 0;
		}
		.more{
			width: 0.45rem;
			height: 0.16rem;
			background: #b4b4b4;
			color: #fff;
			text-align: center;
			font: 0.09rem/0.16rem "";
			position: absolute;
			top: 0.1rem;
			right: 0.13rem;
			border-radius: 0.06rem;
		}
	}
	.detail{
		width: 100%;
		height: 1.05rem;
		font: 0.09rem/0.23rem "";
		margin-top: 0.12rem;
		position: relative;
		text-align: left;
		span{
			display: block;
		}
		.d1{
			position: absolute;
			left: 0.36rem;
		}
		.d2{
			position: absolute;
			left: 1.72rem;
		}
	}
	.overfloww{
		overflow: hidden;
		position: relative;
		height: 1.1rem;
	}

}
</style>