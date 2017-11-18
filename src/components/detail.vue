<template>
  <div id="detail">
      <div class="container" v-if="url">
      <div class="bai"></div>
        <embed :src="url" class="video1" />
    </div>
    <div class="infomation" v-if="info">
      <p class="title">{{info.title}} - {{info.artists[0].artistName}}</p>
      <div class="content">
        <span class="sp1" v-if="play">播放：{{play}}</span>
        <span class="sp2">发布时间：{{info.pubDate}}</span>
        <p class="p1">发布者：{{info.personName}}</p>
        <div class="p2" v-html="info.content"></div>
      </div>
    </div>
    <div class="moreplay" v-if="more">
      <p class="title">播放推荐</p>
      <ul>
        <li v-for="data in more" @click="detailClick(data.videoId)">
          <img :src="data.image"/>
          <p class="title2">{{data.title}}</p>
          <p class="bofang">播放：{{data.totalViewsStr}}</p>
        </li>
      </ul>
    </div>

    <div class="ping" v-if="ping">
      <p class="title">评论</p>
      <ul>
        <li v-for="data in ping">
          <img :src="data.userHeadImg">
          <p class="name">{{data.userName}}</p>
          <p class="content">{{data.content}}</p>
          <p class="time">{{data.dateCreated}}</p>
        </li>
      </ul>
    </div>
    <footer>Copyright © 2016 yinyuetai.com</footer>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {

    data () {
        return {
            url:null,
            info:null,
            play:null,
            more:null,
            ping:null
        }
    },
    components: {
       
    },

    mounted(){
        Promise.all([
            axios.get(`/bbb/get-simple-video-info?videoId=${this.$route.params.keyid}`),
            axios.get(`/video/get-relate-videos?videoId=${this.$route.params.keyid}&size=16`),
            axios.get(`/aaa/video-comment-list?&_api=nattyFetch&_mock=false&belongId=${this.$route.params.keyid}&pageSize=10&page=1`)
        ]).then(res=>{
          this.url = res[0].data.videoInfo.videoUrl;
          this.info = res[0].data.videoInfo;
          this.play = res[1].data.videos[0].totalViews;
          this.more = res[1].data.videos.slice(1,16);
          this.ping = res[2].data.data;
          document.documentElement.scrollTop = "0";
        })
    },

    methods:{
      detailClick(id){
        router.push({name:"detail",params:{keyid:id}});
        location.reload();
      }
    }
}

</script>

<style lang="scss" scoped>
#detail{
  position: relative;
  top: -0.34rem;
}
.container{
  width: 3.2rem;
  height: 2.16rem;
  overflow: hidden;
  text-align: center;
  position: relative;
}
.bai{
  width: 3.2rem;
  height: 0.34rem;
  background: #fff;
  position: absolute;
  top: 0;
}
.video1{
  width: 3.2rem;
  height: 2.5rem;
}
.infomation{
  padding: 0.1rem 0.13rem 0.2rem 0.13rem;
  border-bottom: 0.03rem solid #ddd;
  .title{
    font: 0.14rem/0.36rem "";
  }
}
.content{
  font: 0.12rem/0.24rem "";
  color: #777;
  .p2{
    margin-top: 0.08rem;
    font: 0.12rem/0.2rem "";
    color:#000;
  }
  .sp2{
    margin-left: 0.2rem;
  }
}
.moreplay{
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

.ping{
  width: 3.2rem;
  .title{
    font: 0.14rem/0.37rem "";
  }
  ul{

  }
  li{
    width: 3.2rem;
    padding: 0.15rem 0.15rem 0 0.15rem;
    border-top: 0.01rem solid #dddddd;
    position: relative;
    box-sizing: border-box;
  }
  img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 50%;
  }
  .name{
    font: 0.12rem/0.12rem "";
    color: #cfdcbf;
    position: absolute;
    top: 0.17rem;
    left: 0.53rem;
  }
  .time{
    font: 0.12rem/0.12rem "";
    color: #999;
    position: absolute;
    top: 0.35rem;
    left: 0.53rem;
  }
  .content{
    font: 0.12rem/0.14rem "";
    color: #000;
    width: 2.7rem;
    margin: 0.1rem 0 0.1rem 0.13rem;
  }
  .title{
    margin-left: 0.12rem;
  }
}
footer{
  border-top: 0.03rem solid #ddd;
  width: 100%;
  height: 0.5rem;
  font: 0.11rem/0.5rem "";
  color:#666;
  text-align: center;
  background: #fff;
  position: relative;
  top: 0.25rem;
}
</style>