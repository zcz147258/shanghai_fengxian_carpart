<template>
	<view>
		<view class="top bg-blue">
			<view class="text-white">欢迎使用</view>
			<view class="text-white">奉贤停车</view>
		</view>
		<view class="padding-xl">
			<button class="bg-green lg" @tap="loginin">
				<text class="cuIcon-weixin text-white"></text>微信登录
			</button>
		</view>
		<view class="u-bottom line padding-sm">
			<view v-show="version != ''" class="text-gray text-sm text-center">版本 v{{version}}</view>
			<view class="text-gray text-sm text-center">阅读并已同意<text class="text-blue">《停车须知》、服务协议</text></view>
		</view>
		<!-- #ifdef APP-PLUS -->
			<!-- 进度条 -->
			<view class="pro-style" v-if="isproshow">
				<view style="color: white;font-size: 35upx;">正在下载中....</view>
				<view class="cu-progress round margin-top style">
					<view class="bg-red" :style="[{ width:loading? progress : ''}]">{{ progress }}</view>
				</view>
			</view>
		<!-- #endif -->
		<modal :modalName="modalName" hideClose="true" title="更新提示" :modalContent="modalContent" @modalNameChange="modalNameChange" cancelClose="true" sureName="更新" @sure="sure"></modal>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue';
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			modal
		},
		data() {
			return {
				loading: false,
				name: '11',
				Services: {},
				progress: '0%',
				isproshow: false,
				updateState: 0,//是否已经检查更新，0未检查 1不是最新版本 2更新中 3 更新成功未安装 8安装失败 9允许登录
				modalName: null, //提示类型，是否打开提示框
				modalContent: '' ,//提示内容
				res: null,//更新返回的数据
				version: '',//版本号
				file: null//更新apk文件的路径
			}
		},
		onShow() {
			if(this.file != null){
				this.install();
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
				uni.showLoading({
					title: '正在检查更新'
				});
				/* 进度条 */
				let that = this;
				setTimeout(function() {
					that.loading = true
				}, 500)
				this.version = plus.runtime.version;
				/* 版本更新 */
				this.$http.request({
					url: '/app_upgrade/jsonVersion',
					data: {
						"version": this.version,//版本号
						"android": true,
						"flag": false
					},
					success: (res) => {
						if (res.data.success) {
							if (res.data.downloadUrl) {
								// 版本需要更新
								this.updateState = 1;
								this.modalContent = "发现新版本，请您立即更新！";
								this.modalName = "DialogModal1";
								this.res = res;
							}else {
								// 已是最新版本
								this.updateState = 9;
							}
						} else {
							this.updateState = 9;
							this.$api.msg(res.data.errorText);
						}
					},
					fail: (res)=>{
						this.updateState = 9;
						this.$api.msg("检查更新失败");
					},
					complete() {
						uni.hideLoading();
					}
				})
			// #endif
		},
		onBackPress(e) {
			if(e.from == "backbutton") return true;
		},
		methods: {
			...mapMutations(['login']),
			//修改提示类型或关闭
			modalNameChange(modalName) {
				this.modalName = modalName;
			},
			//点击更新时
			sure(){
				let res = this.res;
				this.updateState = 2;
				this.isproshow = true; // 开启下载条
				const downloadTask = this.$http.downloadFile({
					url: res.data.downloadUrl + '?flag=false&android=true',
					success: (res) => {
						this.file = res.tempFilePath;
						if (res.statusCode == 200) {
							this.isproshow = false;
							//安装
							this.install();
						}
					},
					fail: (res) => {
						this.updateState = 9;
						this.$api.msg('下载失败');
					}
				})
				downloadTask.onProgressUpdate((res) => {
					this.progress = res.progress + "%";
					if (res.progress == 100) {
						this.updateState = 3;
						this.isproshow = false;
					}
				})
			},
			getPhone(){
				// 判断是否有手机号
				this.$http.request({
					url: '/wx/isItRegister',
					success: (phone) => {
						/* 请求成功 */
						if (phone.data.config) {
							if (!phone.data.success) {
								/* 如果没有手机号 */
								uni.navigateTo({
									url: '../bindtel/bindtel'
								})
							} else {
								this.login(phone.data.customer);
								uni.navigateBack({
									delta: 1
								})
							}
						} else {
							/* 请求失败 */
							this.$api.msg('手机号注册失败');
						}
						
					}
				})
						
				// if(true){
				// 	/* 如果没有手机号 */
				// 	uni.navigateTo({
				// 		url:'../bindtel/bindtel'
				// 	})
				// }else{
				// 	this.login({
				// 		success: true
				// 	});
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// }
			},
			getUserInfo(code){
				/* 获取用户信息 */
				/* 开始发送请求 */
				this.$http.request({
					url: '/appc/jsonLogin',
					data: {
						"code": code
					},
					success: (res) => {
						/* 判断返回数据是否正确 */
						if (res && res.data && res.data.success) {
							this.getPhone();
						} else {
							this.$api.msg(res.data.errorText);
						}
					}
				})
			},
			loginin() {
				//#ifdef APP-PLUS
					//是否已经检查更新，0未检查 1不是最新版本 2更新中 3 更新成功未安装 8安装失败 9允许登录
					if(this.updateState == 0){
						return this.$api.msg("正在检查更新");
					} else if(this.updateState == 1){
						return this.$api.msg("发现新版本");
					} else if(this.updateState == 2){
						return this.$api.msg("更新中");
					} else if(this.updateState == 3){
						return this.$api.msg("请安装新版本");
					} else if(this.updateState == 8){
						return this.$api.msg("安装失败请重新安装");
					}
					
					let all;
					let Service;
					/* 获取用户信息 */
					// 1.发送请求获取code
					plus.oauth.getServices((Services) => {
						all = Services;
						Object.keys(all).some((key) => {
							if (all[key].id == 'weixin') {
								Service = all[key]
							}
						})
						Service.authorize((e) => {
							this.getUserInfo(e.code);
						}, function(e) {
							this.$api.msg(e.message);
						});
					}, function(err) {
						console.log(err);
					});
				// #endif
				
				// #ifdef MP-WEIXIN
					this.getUserInfo(-1);
					// this.login({});
					// uni.navigateBack({
					// 	delta: 1
					// })
				// #endif
			},
			//安装
			install(){
				plus.runtime.install(this.file, {},
					function() {
						this.$api.msg('安装成功');
						this.updateState = 9;
						this.file = null;
					},
					function(err) {
						this.updateState = 8;
						this.$api.msg('安装失败');
						console.log(err);
					}
				);
			}
		}
	}
</script>

<style scoped>
	.pro-style {
		top: 0;
		position: absolute;
		display: flex;
		justify-content: center;
		height: 100vh;
		width: 100%;
		flex-direction: column;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.style {
		height: 50upx;
		width: 94%;
	}

	.top {
		height: 400upx;
		width: 100%;
	}

	.top view:first-child {
		padding-top: 120upx;
	}

	.top view {
		text-align: center;
		font-size: 40upx;
		font-weight: bold;
	}
</style>
