<template>
 	<div id="yue">
 		<div class="champion bottom-bor">
 			
 			<div class="last-count bottom-bor">
				<div class="tap" v-for="data,ind in arr">
					<div class="overfloww" @click="detailClick(data.video.videoId)">
						<img :src="data.video.headImg">
						<span class="title">{{data.video.videoTitle}}</span>
						<span class="name">{{data.video.artists[0].artistName}}</span>
						<span class="score">{{data.video.score}}</span>
					</div>
				</div>
 			</div>
 			<div class="more" @click="addPage" v-if="!loading">加载更多+</div>
 			<div class="no" v-if="loading">没有啦~</div>
 		</div>
 		<footer>Copyright © 2016 yinyuetai.com</footer>
 	</div>
</template>

<script>
import {mapGetters } from "vuex";
import axios from "axios";
import router from "@/router";
export default {

	name: 'yue',

	data () {
		return {
			page:1,
			arr:[],
			loading:false
		}
	},

	mounted(){
		axios.get("/vchart/get-billboardv",{
			params:{
				page:this.page
			}
		}).then(res=>{
			this.arr = res.data.videos;
		})
	},

	computed:{
	    ...mapGetters([
	    	"yueListGetter"

	    ])
	},

	methods:{
		toList(){
			if(this.yueListGetter){
				return this.yueListGetter.videos;
			}
		},
		addPage(){
			this.page++;

			axios.get("/vchart/get-billboardv",{
			params:{
			  page:this.page,
			}
			}).then(res=>{
				this.arr = [...this.arr,...res.data.videos];
			})
		},
		detailClick(id){
			router.push({name:"detail",params:{keyid:id}});
		}
	}
}
</script>

<style lang="scss" scoped>

.champion{
	padding-top: 0.2rem;
}

.bottom-bor{
	border-bottom: 0.02rem solid #e3e3e4;
}

.last-count{
	.tap{
		width: 100%;
		height: 1.05rem;
		overflow: hidden;
		position: relative;
		margin-bottom: 0.12rem;
		img{
			width: 1.5rem;
			height: 1.05rem;
			display:block;
			margin-left: 0.1rem;
		}
		.title{
			font:0.11rem/0.14rem "";
			position: absolute;
			left: 1.7rem;
			top: 0.1rem;
			width: 1.4rem;
		}
		.name{
			font:0.11rem/0.25rem "";
			color: #777;
			position: absolute;
			left: 1.7rem;
			top: 0.7rem;
		}
	}

}

footer{
	width: 100%;
	height: 0.5rem;
	font: 0.11rem/0.5rem "";
	color:#666;
	text-align: center;
	background: #fff;
}

.more{
	width: 2.1rem;
	height: 0.3rem;
	background: #000;
	color: #fff;
	border-radius: 0.2rem;
	text-align: center;
	margin: 0 auto;
	font: 0.12rem/0.3rem "";
}
.no{
	text-align: center;
	font: 0.12rem/0.3rem "";
}
</style>