<template>
  <div id="app">
      <navbar></navbar>

      <div class="main">
        <router-view></router-view>
      </div>
      

  </div>
</template>

<script>
import navbar from "@/components/common/navbar";

export default {
  name: 'app',
  components:{
    navbar
  },
  methods:{
    
  }
}
</script>

<style>
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select,td,figure{margin:0;padding:0;}
body{font:12px  "宋体"; word-wrap:break-word;}
a,u,s,del{color:#666;text-decoration:none;} 
fieldset ,a img,.bor0 {border:0;}
i,em,b{font-style:normal;font-weight:100;}
li{list-style:none;}
img{vertical-align:middle;}
table{border-collapse:collapse;}
input,textarea{outline:none;}
textarea{resize:none;}
mark{background:none;}
.ind2{text-indent:2em;} 


/*文本溢出出现省略号*/
.over{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/*图片垂直对齐的竖杠*/
.valign:after{content:"";display:inline-block;width:0;height:100%;vertical-align:middle;}
.valign img{vertical-align:middle;}


/*万能清除法*/
.clear{zoom:1;}/*清除ie的浮动*/
.clear:before{content:"";display:table;}
.clear:after{content:"";clear:both;display:block;}


  html,body{
  width:100%;
  height: 100%;
  } 
  .main{
    margin-top: 0.75rem;
    width: 3.2rem;
  }



</style>
