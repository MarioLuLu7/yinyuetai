<template>
  	<div>
	  	<div class="indexTap" v-for="title,ind in titleList">
	  		<div class="title">
				<b>{{title}}</b>
				<div class="title-right" @click="changes(ind)">
					<i></i><span>换一换</span>
				</div>
			</div>
	  		<div class="contant">
	  			<ul>
	  				<li v-for="data in toList(ind)">
	  					<a @click="detailClick(data.videoId)">
	  						<img :src="data.image"/>
	  						<div class="text">
	  							<h3 class="over">{{data.title}}</h3>
	  							<p>{{data.subTitle}}</p>
	  						</div>
	  					</a>
	  				</li>
	  			</ul>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
import {mapGetters } from "vuex";
import router from "@/router";

export default {

  name: 'indexTap',

  data () {
    return {
    	allIndex:{
    		0:0,
    		1:0,
    		2:0,
    		3:0,
    		4:0
    	},
    	titleList:["MV首播","娱乐","热播推荐","音乐现场","猜你喜欢"]

    }
  },
  mounted(){
  	if(!this.$store.state.allList){
  	  	this.$store.dispatch("getList",[
  	  			"/mv/get-first-video?area=all&size=18",
  	  			"/mv/get-rec?recId=8&size=18",
  	  			"/mv/get-rec?recId=9&size=18",
  	  			"/mv/get-rec?withBigImg=true&cataId=4&size=18",
  	  			"/mv/get-guess?size=18"
  	  		]);
  	};
  },

  computed:{
      ...mapGetters([
      	"allListGetter"
      ])
  },

  methods:{
  	changes(ind){
  
  		if(this.allIndex[ind] == 2){
  			this.allIndex[ind] = 0;
  		}
  		else{
  			this.allIndex[ind]++;
  		}
  	},
  	toList(ind){
      	if(this.allListGetter){
      		this.$store.dispatch("loadingIsShow",false);
      	}
      	var data = this.allListGetter[ind]?this.allListGetter[ind].data:"";
      	if(data.videos){
      		return data.videos.slice(this.allIndex[ind]*6,(this.allIndex[ind]+1)*6);
      	}else if(data.details){
      		return data.details.slice(this.allIndex[ind]*6,(this.allIndex[ind]+1)*6);
      	}else if(data.video){
			return data.video.slice(this.allIndex[ind]*6,(this.allIndex[ind]+1)*6);
      	}else{
      		return [];
      	}
     },
     detailClick(id){
			router.push({name:"detail",params:{keyid:id}});
		}
  }
}
</script>

<style lang="scss" scoped>
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

</style>