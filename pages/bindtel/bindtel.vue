<template>
	<view>
		<view class="top">
			<view>绑定手机号</view>
		</view>
		<view class="login">
				<view class="cu-form-group">
					<view class="title">电话号码</view>
					<input placeholder="请输入手机号" name="input" v-model="phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title" v-model="checkpass">验证码</view>
					<input placeholder="请输入验证码" name="input"></input>
					<button class='cu-btn bg-green shadow' @tap="checktime" :disabled="send">{{ info }}</button>
				</view>
			<button type="primary" class="bindit" @tap="submit">绑定</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				checkpass: '',
				send: false,
				info: '发送'
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		methods: {
			/* 发送验证码 */
			checktime(){
				/* 校验手机号 */
				var pass = new RegExp(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/);
				if(pass.test(this.phone)){
					/* 禁用发送按钮 */
					this.send = true;
					// setTimeout(()=>{
						/* 发送请求 */
						this.$http.request({
							url: '/wx/sendCode',
							data:{
								"phone": this.phone
							},
							success:()=>{
								console.log('发送验证码成功！')
							}
						})
						/* 倒计时 */
						let seconds = 5;
						let time = setInterval(()=>{
							seconds--
							if(seconds == 0){
								this.send = false;
								this.info = '发送';
								clearInterval(time);
							}else{
								this.info = seconds
							}
						},1000);
						
					// },1000)
				}else{
					uni.showModal({
						showCancel:false,
						title: '提示',
						content: '手机号为空或者错误'
							
					})
				}
				
			},
			submit(){
				this.$http.request({
					url: '/wx/checkCode',
					data:{
						phone: this.phone,
						"msgCode": "888888",
						"phone_from": 2
					},
					success:(res)=>{
						console.log(res);
						if(res&&res.data){
							if(res.data.success){
								console.log('验证成功')
								uni.navigateTo({
									url: '../login/login'
								})
							}else{
								uni.showModal({								showCancel:false,								title: '提示',								content: '验证码错误'								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bindit{
		margin-top: 50upx;
	}
	.login{
		position: absolute;
		top: 300upx;
		left: 50%;
		width: 660upx;
		background-color: #F0F0F0;
		transform: translateX(-50%);
		border-radius: 5upx;
	}
	.login>view{
		display: flex;
	}
	.top {
		background-color: #1CBBB4;
		height: 400upx;
		width: 100%;
	}

	.top view:first-child {
		padding-top: 120upx;
	}

	.top view {
		text-align: center;
		font-size: 50upx;
		color: white;
		/* font-weight: bold; */
	}
</style>
