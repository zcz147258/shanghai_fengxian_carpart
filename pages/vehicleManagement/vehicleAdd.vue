<template>
    <view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">添加车辆</block>
		</cu-custom>
		<!-- 车牌号组件 -->
		<view class="item plateNumber">
			<view class="u-f-ajc">
				<view>请绑定真实有效的车牌号码</view>
			</view>
			<view>
				<inputPlateNumber :plateNum="scp.plateNum" @plateNumChange="plateNumChange" @isActiveShowChange="isActiveShowChange"
				 :activeShow="scp.activeShow"></inputPlateNumber>
			</view>
		</view>
		<view class="button-cx">
			<button type="primary" @tap="effective">确定</button>
		</view>
		
		<!-- 提示 -->
		<modal :modalName="modalName" :modalContent="modalContent" @modalNameChange="modalNameChange" @sure="sure"></modal>
    </view>
</template>

<script>
	import modal from '@/components/modal/modal.vue';
	import inputPlateNumber from '@/components/plate-number/inputPlateNumber/inputPlateNumber.vue';
	export default {
		components:{
			inputPlateNumber,
			modal
		},
		data() {
			return {
				// 车牌号选择对象
				scp: {
					plateNum: null, // 车牌号
					activeShow: true, // 是否开启新能源提示
				},
				modalName: null,//提示类型
				modalContent: '', //提示内容
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
			//修改提示类型或关闭
			modalNameChange(modalName) {
				this.modalName = modalName;
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
					this.modalName = "DialogModal2";//打开提示框
					this.modalContent = "请输入真实有效的车牌";
				}else{
					this.modalName = "DialogModal1";
					this.modalContent = "是否绑定该("+this.scp.plateNum+")车牌？";
				}
			},
			// 提示时点击确认
			sure(){
				this.$http.request({
					url: "/wx/addVehicle",
					data: {
						"plateNo": this.scp.plateNum
					},
					success: (res) => {
						if(res && res.data && res.data.success){
							if(res.data.result && res.data.result.iErrCode == 0) {
								uni.navigateBack({
									delta: 1
								})
							} else {
								this.$api.msg(res.data.result.sErrInfo);
							}
						}else {
							this.$api.msg(res.data.errorText);
						}
					}
				})
			}
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
