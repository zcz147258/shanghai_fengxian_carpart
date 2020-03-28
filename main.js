import Vue from 'vue'
import store from './store'
import App from './App'

import my from "./common/utils/my.js"
const http = my.http;

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.config.productionTip = true
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg};
Vue.prototype.$http = http;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



