<template>
    <view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">车牌补缴</block>
		</cu-custom>
		<!-- 车牌号组件 -->
		<view class="item plateNumber">
			<view class="u-f-ajc">
				<view>请输入真实有效的车牌</view>
			</view>
			<view>
				<inputPlateNumber :plateNum="scp.plateNum" @plateNumChange="plateNumChange" @isActiveShowChange="isActiveShowChange"
				 :activeShow="scp.activeShow"></inputPlateNumber>
			</view>
		</view>
		<view class="button-cx">
			<button type="primary" @tap="effective">查询</button>
		</view>
		
		<!-- 提示 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					请输入真实有效的车牌
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	import inputPlateNumber from '@/components/plate-number/inputPlateNumber/inputPlateNumber.vue';
	export default {
		components:{
			inputPlateNumber
		},
		data() {
			return {
				// 车牌号选择对象
				scp: {
					plateNum: null, // 车牌号
					activeShow: true, // 是否开启新能源提示
				},
				modalName: '',//提示类型
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		onLoad() {
			this.scp.plateNum = "        ";//输入的车牌，默认8个空格
		},
		methods: {
			//车牌改变时
			plateNumChange(plateNum){
				this.scp.plateNum = plateNum;
			},
			//新能源提示框状态改变时
			isActiveShowChange(flag){
				this.scp.activeShow = flag;
			},
			//判断车牌号号是否输入完整 return true/false
			isPlateNumFlag(plateNum){
				if(!plateNum){
					plateNum = this.scp.plateNum;
				}
				let flag = true;
				for (var i = 0; i < 7; i++) {
					if(plateNum.slice(i,i+1) == " "){
						flag = false;
						break;
					}
				}
				let str = plateNum.replace(/\s+/g,"");
				if (flag && str.length > 6) {
					//车牌号输入完整时
					return true;
				}else{
					//车牌号没有输入完整时
					return false;
				}
			},
			//点击查询时
			effective(){
				if(!this.isPlateNumFlag()){
					return this.modalName = "Modal";//打开提示框
				}
				let plateNum = this.scp.plateNum;//车牌
				//在此绑定
				/* 跳转到查询页面 */
				uni.navigateTo({
					url:'../overpay/overpay?plateNum=' + plateNum
				})
			},
			//关闭提示框
			hideModal(e) {
				this.modalName = null;
			},
		}
	}
</script>

<style>
	.item {
		padding-top: 10rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #F6F6F6;
	}
	
	.item>view:nth-child(1) {
		margin: 15rpx;
	}
	
	.item>view:nth-child(1)>view:nth-child(1) {
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.item>view:nth-child(1)>view:nth-child(2) {
		font-size: 36rpx;
		text-decoration: underline;
	}
	.button-cx{
		padding: 20rpx 20rpx;
	}
	.style-tips{
		padding: 15rpx;
	}
	.style-tips>view:nth-child(1),.style-tips>view:nth-child(3){
		color: #8799A3;
	}
	.style-tips>view:nth-child(2){
		padding: 0 15rpx;
		color: #DD514C;
	}
</style>
