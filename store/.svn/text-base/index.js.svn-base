import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,//是否登录
		userInfo: {},//当前用户的数据
		searchText: ''//地图搜索的数据
	},
	mutations: {
		//修改搜索文字
		changeSearchText(state, searchText){
			state.searchText = searchText;
		},
		//登录
		login(state, provider) {
			state.hasLogin = true;
			provider.loginTime = new Date().getTime();//当前登录时间
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
		},
		//退出登录
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		//判断是否登录和session是否过期，默认两小时过期
		checkSession(state){
			if(!state.hasLogin || !state.userInfo || !state.userInfo.loginTime || Number(state.userInfo.loginTime) < Number(new Date().getTime() - (2 * 60 * 60 * 1000)) ){
				//过期退出登录
				state.hasLogin = false;
				state.userInfo = {};
				uni.removeStorage({
				    key: 'userInfo'
				});
			}
		}
	},
	actions: {

	}
})

export default store
