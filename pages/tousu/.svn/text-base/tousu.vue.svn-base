<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">建议反馈</block>
		</cu-custom>
		<view class="null-img u-f-ajc" v-if="advise.length < 1">
			<image src="../../static/feedback/nullFeedback.png" mode="widthFix" lazy-load></image>
		</view>
		<view class="margin-top">
			<view v-for="(item,index) in advise" :key="index" class="margin-sm padding-sm bg-white radius">
				<view class="flex justify-between">
					<view>上报类型：{{ item.report_typeText }}</view>
					<view class="text-red">{{item.do_id && item.do_id > 0 ? "处理完成" : "处理中"}}</view>
				</view>
				<view class="flex justify-between">
					<view>上报时间: {{ item.advise_timeText }}</view>
					<view class="text-blue" @tap="adviseIndexChange(index)">详情</view>
				</view>
				<view v-show="adviseIndex == index">
					<view>详情描述：</view>
					<view class="solid padding-sm">{{ item.advise_content }}</view>
					<view>处理时间：{{item.do_timeText}}</view>
					<view>详情描述：</view>
					<view class="solid padding-sm">{{ item.do_content }}</view>
				</view>
			</view>
		</view>
		<view class="input-feedback u-f-ajc" @tap="clikeInputFeedback">填写建议反馈</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				advise: [] ,//异常记录
				adviseIndex: -1//详情描述下标
			}
		},
		methods: {
			clikeInputFeedback() {
				uni.navigateTo({
					url: "./addtousu"
				})
			},
			getinfo(){
				this.$http.request({
					url: '/wx/jsonCustomerAdviseList',
					success: (res) => {
						if(res.data.success){
							this.advise = res.data.result.service
						}else{
							this.$api.msg(res.data.errorText);
						}
					}
				})
			},
			//修改详情描述下标
			adviseIndexChange(index){
				if(this.adviseIndex == index){
					this.adviseIndex = -1;
				}else{
					this.adviseIndex = index;
				}
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			
			this.getinfo();
		},
		//监听原生按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
</script>

<style scoped>
	.null-img {
		padding-top: 50rpx;
		width: 100%;
	}

	.null-img>image {
		width: 350rpx;
	}

	.input-feedback {
		font-size: 36rpx;
		width: 100%;
		color: #FFFFFF;
		bottom: 0;
		left: 0;
		right: 0;
		position: fixed;
		background-color: #007AFF;
		padding: 30rpx 0;
	}
</style>
