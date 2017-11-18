import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);

const BIG_PIC_LIST_MUTATION = "bigPicListMutation";
const GET_LIST_MUTATION = "getListMutation";
const LOADING_IS_SHOW_MUTATION = "loadingIsShowMutation";
const TOP_BANNER_LIST_MUTATION = "topBannerListMutation";

const HAN_LIST_MUTATION = "hanListMutation";
const HUA_LIST_MUTATION = "huaListMutation";
const OU_LIST_MUTATION = "ouListMutation";
const RI_LIST_MUTATION = "riListMutation";
const FAN_LIST_MUTATION = "fanListMutation";

const FOCUS_LIST_MUTATION = "focusListMutation";
const GUAN_LIST_MUTATION = "guanListMutation";

const MV_LIST_MUTATION = "mvListMutation";
const ZHUAN_LIST_MUTATION = "zhuanListMutation";
const CHINA_LIST_MUTATION = "chinaListMutation";

const YUE_LIST_MUTATION = "yueListMutation";
const SEARCH_LIST_MUTATION = "searchListMutation";

const store = new Vuex.Store({

	state:{
		bigPicList:null,
		allList:null,
		loadingIsShow:true,
		topBannerList:null,
		hanList:null,
		huaList:null,
		ouList:null,
		riList:null,
		fanList:null,
		bigAllList:[],

		focusList:null,
		guanList:null,

		mvList:null,
		zhuanList:null,
		chinaList:null,

		yueList:null,
		searchList:null
	},

	getters:{
		bigPicListGetter:function(state){
			return state.bigPicList?state.bigPicList:[];
		},
		allListGetter:function(state){
			return state.allList?state.allList:[];
		},
		loadingIsShowGetter:function(state){
			return state.loadingIsShow;
		},
		topBannerListGetter:function(state){
			return state.topBannerList?state.topBannerList:[];
		},
		bigAllListGetter:function(state){
			if(state.hanList && state.huaList && state.ouList && state.riList && state.fanList){
				state.bigAllList.push(state.hanList);
				state.bigAllList.push(state.huaList);
				state.bigAllList.push(state.ouList);
				state.bigAllList.push(state.riList);
				state.bigAllList.push(state.fanList);
				return state.bigAllList;
			}
			else{
				return [];
			}
		},
		focusListGetter:function(state){
			return state.focusList?state.focusList:[];
		},
		guanListGetter:function(state){
			return state.guanList?state.guanList:[];
		},

		mvListGetter:function(state){
			return state.mvList?state.mvList:[];
		},

		zhuanListGetter:function(state){
			return state.zhuanList?state.zhuanList:[];
		},

		chinaListGetter:function(state){
			return state.chinaList?state.chinaList:[];
		},

		yueListGetter:function(state){
			return state.yueList?state.yueList:[];
		},
		searchListGetter:function(state){
			return state.searchList?state.searchList:[];
		},
	},

	actions:{
		getBigPicList(store,payload){
			axios.get(payload).then(res=>{
				store.commit("bigPicListMutation",res.data.bigPics);
			});
		},

		
		getList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2]),
					axios.get(payload[3]),
					axios.get(payload[4]),
				]).then(res=>{
				store.commit("getListMutation",res);

			})
		},

		loadingIsShow(store,payload){
			store.commit("loadingIsShowMutation",payload);
		},

		getTopBannerList(store,payload){
			axios.get(payload).then(res=>{
				store.commit("topBannerListMutation",res.data.result);
			});
		},

		getHanList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("hanListMutation",res);
			})
		},

		getHuaList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("huaListMutation",res);
			})
		},

		getOuList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("ouListMutation",res);
			})
		},

		getRiList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("riListMutation",res);
			})
		},

		getFanList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("fanListMutation",res);
			})
		},

		getFocusList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2])
				]).then(res=>{
				store.commit("focusListMutation",res);
			})
		},

		getGuanList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2]),
					axios.get(payload[3]),
					axios.get(payload[4])
				]).then(res=>{
				store.commit("guanListMutation",res);
			})
		},

		getMvList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2]),
					axios.get(payload[3]),
					axios.get(payload[4])
				]).then(res=>{
				store.commit("mvListMutation",res);
			})
		},

		getZhuanList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1])
				]).then(res=>{
				store.commit("zhuanListMutation",res);
			})
		},

		getChinaList(store,payload){
			Promise.all([
					axios.get(payload[0]),
					axios.get(payload[1]),
					axios.get(payload[2]),
					axios.get(payload[3])
				]).then(res=>{
				store.commit("chinaListMutation",res);
			})
		},

		getYueList(store,payload){
			axios.get(payload).then(res=>{
				store.commit("yueListMutation",res.data);
			});
		},

		getSearchList(store,payload){
			axios.get(payload).then(res=>{
				store.commit("searchListMutation",res.data);
			});
		},
	},

	mutations:{
		[BIG_PIC_LIST_MUTATION]:function(state,payload){
			state.bigPicList= payload;
		},
		[GET_LIST_MUTATION]:function(state,payload){
			state.allList= payload;
		},
		[LOADING_IS_SHOW_MUTATION]:function(state,payload){
			state.loadingIsShow= payload;
		},
		[TOP_BANNER_LIST_MUTATION]:function(state,payload){
			state.topBannerList= payload;
		},
		//
		[HAN_LIST_MUTATION]:function(state,payload){
			state.hanList= payload;
		},
		[HUA_LIST_MUTATION]:function(state,payload){
			state.huaList= payload;
		},
		[OU_LIST_MUTATION]:function(state,payload){
			state.ouList= payload;
		},
		[RI_LIST_MUTATION]:function(state,payload){
			state.riList= payload;
		},
		[FAN_LIST_MUTATION]:function(state,payload){
			state.fanList= payload;
		},
		//
		[FOCUS_LIST_MUTATION]:function(state,payload){
			state.focusList= payload;
		},
		[GUAN_LIST_MUTATION]:function(state,payload){
			state.guanList= payload;
		},
		[MV_LIST_MUTATION]:function(state,payload){
			state.mvList= payload;
		},
		[ZHUAN_LIST_MUTATION]:function(state,payload){
			state.zhuanList= payload;
		},
		[CHINA_LIST_MUTATION]:function(state,payload){
			state.chinaList= payload;
		},
		//
		[YUE_LIST_MUTATION]:function(state,payload){
			state.yueList= payload;
		},
		[SEARCH_LIST_MUTATION]:function(state,payload){
			state.searchList= payload;
		}
	}
})

export default store;