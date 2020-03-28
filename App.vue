<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'
	export default {
		methods: {
			...mapMutations(['checkSession']),
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLaunch: function() {
			/* 登陆验证 */
			Vue.prototype.$checkLogin = () => {
				this.checkSession();
				if (this.hasLogin) {
					console.log('登录成功')
				} else {
					this.$api.msg("未登录");
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
			// let userInfo = uni.getStorageSync('userInfo') || '';
			// if (userInfo.avatarUrl && userInfo.nickName) {
			// 	//更新登陆状态
			// 	uni.getStorage({
			// 		key: 'userInfo',
			// 		success: (res) => {
			// 			this.login(res.data);
			// 		}
			// 	});
			// }
			// 获取坐标地址
			uni.getLocation({
				type: 'wgs84',
				/* 返回gps坐标 */
				success: (res) => {
					// console.log(res.latitude,res.longitude)
					Vue.prototype.$latitude = res.latitude;
					Vue.prototype.$longitude = res.longitude;
					// this.latitude = res.latitude/* 设立原点坐标 */
					// this.longitude = res.longitude/* 设立原点坐标 */
					/* 标记原点坐标 */
					// this.covers[0].latitude = res.latitude
					// this.covers[0].longitude = res.longitude
				}
			});
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.ScreenWidth = e.safeArea.width;
					Vue.prototype.ScreenHeight = e.safeArea.height;
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/*每个页面公共css */
	@import './common/common.css';
	
	/*每个页面公共css */
	@import './common/css/uni.css';
	/* 引入阿里巴巴图标 */
	@import './common/css/iconfont.css';
	@import "colorui/main.css";
	@import "colorui/icon.css";

	@import './common/css/animate.min.css';
	/* #endif*/
	/* 引入动画库 */
</style>
