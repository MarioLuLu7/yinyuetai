<template>
 	<div id="zhuanji">

 		<div class="champion bottom-bor">
		 	<div class="time" v-if="zhuanListGetter[0]">当前打榜周期({{zhuanListGetter[0].data.startDate}}~{{zhuanListGetter[0].data.endDate}})</div> 

 			<div class="shortTap">
 				<mt-navbar v-model="selected" class="ul">
	 				<mt-tab-item v-for="data,index in tapName" :id="index+1+''">
	 					<span class="li">{{data}}</span>
	 				</mt-tab-item>
 				</mt-navbar>
 			</div>
 			
 			<div class="last-count bottom-bor">
 				<mt-tab-container v-model="selected">
					<mt-tab-container-item v-for="data2,index in zhuanListGetter" :id="index+1+''">
						<div class="tap" v-for="data in toList(index)">
							<img :src="data.headImg">
							<span class="number">{{data.rank}}</span>
							<p class="title">
								{{data.title}}
								<span class="name">{{data.artistName}}</span>
							</p>
							<span class="com">发行公司：{{data.com}}</span>
							<span class="date">发行日期：{{data.pubDate}}</span>
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

export default {

	name: 'zhuanji',

	data () {
		return {
			tapName:["内地专辑销量榜","进口专辑销量榜"],
			selected:"1"
		}
	},

	components:{
		"navbar":Navbar,
		"tab-item":TabItem
	},

	mounted(){
		if(!this.$store.state.zhuanList){
		  	this.$store.dispatch("getZhuanList",[
		  			"/album/get-trend?type=ml&start=0&size=30&pb=true",
		  			"/album/get-trend?type=im&start=0&size=30&pb=true"
		  		]);
		};
	},

	computed:{
	    ...mapGetters([
	    	"zhuanListGetter"

	    ])
	},

	methods:{
		toList(index){
			if(this.zhuanListGetter.length > 0){
				 return this.zhuanListGetter[index].data.albums;
			}
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
		height: 1.05rem;
		overflow: hidden;
		position: relative;
		margin-bottom: 0.12rem;
		img{
			width: 1.05rem;
			height: 1.05rem;
			display:block;
			margin-left: 0.1rem;
		}
		.number{
			font:700 0.30rem/1.05rem "";
			font-style: italic;
			color: #4ddfc9;
			position: absolute;
			bottom: 0;
			right: 0.1rem;
		}
		.title{
			font:0.11rem/0.14rem "";
			position: absolute;
			left: 1.22rem;
			top: 0.1rem;
			width: 1.7rem;
		}
		.name{
			font:0.11rem/0.25rem "";
			color: #777;
			display: block;
		}
		.com{
			font:0.08rem/0.12rem "";
			color: #777;
			position: absolute;
			bottom:0.25rem;
			left: 1.22rem;
		}
		.date{
			font:0.08rem/0.12rem "";
			color: #777;
			position: absolute;
			bottom:0.12rem;
			left: 1.22rem;
		}
	}

}
</style>