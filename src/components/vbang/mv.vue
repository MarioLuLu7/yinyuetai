<template>
 	<div id="mv">

 		<div class="champion bottom-bor">
			<div class="time" v-if="mvListGetter[0]">当前打榜{{mvListGetter[0].data.nextDateCode.year}}年 {{mvListGetter[0].data.nextDateCode.periods}}期({{mvListGetter[0].data.nextDateCode.beginDateText}}~{{mvListGetter[0].data.nextDateCode.endDateText}})</div>

 			<div class="shortTap">
 				<mt-navbar v-model="selected" class="ul">
	 				<mt-tab-item v-for="data,index in tapName" :id="index+1+''">
	 					<span class="li">{{data}}</span>
	 				</mt-tab-item>
 				</mt-navbar>
 			</div>
 			
 			<div class="last-count bottom-bor">
 				<mt-tab-container v-model="selected">
					<mt-tab-container-item v-for="data2,index in mvListGetter" :id="index+1+''">
						<div class="tap" v-for="data in toList(index)" @click="detailClick(data.video.videoId)">
							<img :src="data.video.albumImg">
							<span class="number">{{data.video.number}}</span>
							<span class="title">{{data.video.title}}</span>
							<span class="name">{{data.video.artists[0].artistName}}</span>
							<span class="score">{{data.video.score}}</span>
							<span class="trendScore">{{data.video.trendScore}}</span>
						</div>
					</mt-tab-container-item>
 				</mt-tab-container>
 			</div>
 		</div>
 	</div>
</template>

<script>
import { Navbar, TabItem} from 'mint-ui';
import {mapGetters } from "vuex";
import router from "@/router";
export default {

	name: 'mv',

	data () {
		return {
			tapName:["内地","港台","欧美","韩国","日本"],
			selected:"1"
		}
	},

	components:{
		"navbar":Navbar,
		"tab-item":TabItem
	},

	mounted(){
		if(!this.$store.state.mvList){
		  	this.$store.dispatch("getMvList",[
		  			"/vchart/get-trend?area=ML&page=1",
		  			"/vchart/get-trend?area=HT&page=1",
		  			"/vchart/get-trend?area=US&page=1",
		  			"/vchart/get-trend?area=KR&page=1",
		  			"/vchart/get-trend?area=JP&page=1",
		  		]);
		};
	},

	computed:{
	    ...mapGetters([
	    	"mvListGetter"

	    ])
	},

	methods:{
		toList(index){
			if(this.mvListGetter.length > 0){
				return this.mvListGetter[index].data.videos;
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
.time{
	font: 0.10rem/0.16rem "";
	text-align: center;
	position: relative;
	top: 0.1rem;
}
.bottom-bor{
	border-bottom: 0.02rem solid #e3e3e4;
}

.last-count{
	.tap{
		width: 100%;
		height: 1.1rem;
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
		.trendScore{
			padding: 0 0.06rem;
			font: 0.09rem/0.12rem "";
			background: #4b5549;
			color: #fff;
			border-radius: 0.06rem;
			position: absolute;
			bottom: 0.08rem;
			left:0.54rem;
		}
	}

}
</style>