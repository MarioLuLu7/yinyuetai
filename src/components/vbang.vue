<template>
	<div id="vbang">
		<div class="top-banner">
			<ul>
				<router-link to="/vbang/focus" tag="li" activeClass="active">聚焦</router-link>
				<router-link to="/vbang/mv" tag="li" activeClass="active">MV作品榜</router-link>
				<router-link to="/vbang/zhuanji" tag="li" activeClass="active">专辑榜</router-link>
				<router-link to="/vbang/china" tag="li" activeClass="active">China V Chart</router-link>

			</ul>
		</div>
	 	<div class="main-count">
	 		<router-view></router-view>
	 	</div>
	 	<footer>Copyright © 2016 yinyuetai.com</footer>
	</div>
</template>

<script>

export default {

	name: 'vbang',

	data () {
	    return {
	    	
	    }
	},
	
}
</script>

<style src="../assets/animate.css"></style>
<style lang="scss" scoped>
#vbang{
	position: absolute;
	top:0.51rem;
	z-index: 50;
}
.top-banner{
	position: fixed;
	top: 0.7rem;
	width: 100%;
	border-top: 0.01rem solid #666;
	height: 0.24rem;
	z-index: 100;
	background: #fff;
	ul{
		display: flex;
		font: 0.11rem/0.22rem "";
		justify-content: space-between;
		padding: 0 0.15rem;
		border-top: 0.01rem solid #666;
		height: 0.24rem;
	}
	.active{
		border-bottom: 0.02rem solid #000;
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
.main-count{
	margin-top: 0.46rem;
}

</style>