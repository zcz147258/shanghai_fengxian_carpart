<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">车辆管理</block>
		</cu-custom>
		<view class="content">
			<block>
				<view class="list" v-for="(item,index) in jaBinds1" :key="index">
					<view class="left">
						<view class="iconfont icon-cheliang-"></view>
						<view class="title">{{ item.sPlateNo }}</view>
					</view>
					<view class="right">
						<view class="title title1" @tap="nobindcar(item.sPlateNo)">解绑</view>
					</view>
				</view>
			</block>
		</view>
		<view>
			<button class="addcar" type="primary" @tap="goBindingVehicle">添加车辆</button>
		</view>
		<block>
			<view class="list" v-for="(item,index) in jaBinds0" :key="index">
				<view class="left">
					<view class="iconfont icon-cheliang-"></view>
					<view class="title">{{ item.sPlateNo }}</view>
				</view>
				<view class="right">
					<view class="title" @tap="bindcar(item.sPlateNo)">绑定</view>
					<view class="iconfont icon-lajitong" @tap="delcar(item.sPlateNo)"></view>
				</view>
			</view>
		</block>
		
		<modal :modalName="modalName" :modalContent="modalContent" @modalNameChange="modalNameChange" @sure="sure"></modal>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue';
	export default {
		data() {
			return {
				type: 'center',
				delno: '',
				// 已经绑定的
				jaBinds1:[],
				// 已经解绑的
				jaBinds0:[],
				modalName: null, //提示类型  提示框/确认框，是否打开提示框
				modalContent: '', //提示内容
				plateNo: '',//选中的车牌
				modalType: 0//提示类型，绑定车牌时/解绑车牌时
			}
		},
		components:{
			modal
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		onLoad(){
			this.getinfo();
		},
		methods: {
			//修改提示类型或关闭
			modalNameChange(modalName) {
				this.modalName = modalName;
				this.plateNo = "";
				this.modalType = 0;
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			goBindingVehicle(){
				uni.navigateTo({
					url: "vehicleAdd"
				})
			},
			/* 获取车牌 */
			getinfo(){
				this.$http.request({
					url: "/wx/jsonVehicleManagement",
					success: (res) => {
						if(res && res.data && res.data.success){
							if(res.data.result && res.data.result.iErrCode == 0) {
								this.getinfo();
								this.jaBinds1 = res.data.result.jaBinds1;
								this.jaBinds0 = res.data.result.jaBinds0;
							} else {
								this.$api.msg(res.data.result.sErrInfo);
							}
						}else {
							this.$api.msg(res.data.errorText)
						}
					}
				})
			},
			/* 绑定车牌 */
			bindcar(plateNo){
				this.modalName = "DialogModal1";
				this.modalContent = "是否绑定该("+plateNo+")车牌？";
				this.plateNo = plateNo;
				this.modalType = 1;
			},
			// 解绑车牌
			nobindcar(plateNo){
				this.modalName = "DialogModal1";
				this.modalContent = "是否解绑该("+plateNo+")车牌？";
				this.plateNo = plateNo;
				this.modalType = 2;
			},
			delcar(plateNo){
				this.modalName = "DialogModal1";
				this.modalContent = "是否删除该("+plateNo+")车牌？";
				this.plateNo = plateNo;
				this.modalType = 3;
			},
			// 提示时点击确认
			sure(){
				let plateNo = this.plateNo;
				console.log(this.modalType);
				switch (this.modalType){
					//绑定车牌时
					case 1:
						this.$http.request({
							url: "/wx/addVehicle",
							data: {
								"plateNo": plateNo
							},
							success: (res) => {
								if(res && res.data && res.data.success){
									if(res.data.result && res.data.result.iErrCode == 0) {
										this.getinfo();
									} else {
										this.$api.msg(res.data.result.sErrInfo);
									}
								}else {
									this.$api.msg(res.data.error);
								}
							}
						})
						break;
					// 解绑车牌时
					case 2:
						this.$http.request({
							url: "/wx/jieVehicle",
							data: {
								"plateNo": plateNo
							},
							success: (res) => {
								if(res && res.data && res.data.success){
									if(res.data.result && res.data.result.iErrCode == 0) {
										this.getinfo();
									} else {
										this.$api.msg(res.data.result.sErrInfo);
									}
								}else {
									this.$api.msg(res.data.error);
								}
							}
						})
						break;
					case 3:
						this.$http.request({
							url: "/wx/deleteVehicle",
							data: {
								"plateNo": plateNo
							},
							success: (res) => {
								if(res && res.data && res.data.success){
									if(res.data.result && res.data.result.iErrCode == 0) {
										this.getinfo();
									} else {
										this.$api.msg(res.data.result.sErrInfo);
									}
								}else {
									this.$api.msg(res.data.error);
								}
							}
						})
						break;
				}
			}
		}
	}
</script>
<style>
	page{
		background-color: #F0F0F0;
	}
</style>
<style scoped>
	.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			text-align: center;
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
	.addcar{
		margin-top: 50upx;
		width: 50%;
		margin-bottom: 50upx;
	}
	.left .iconfont{
		color: #0273ED;
		font-size: 40upx;
		margin-left: 20upx;
	}
	.right .iconfont{
		color: #F50057;
		font-size: 40upx;
		margin-right: 40upx;
	}
	.list>view>view{
		line-height: 100upx;
	}
	.title{
		font-size: 30upx;
	}
	.left .title{
		color: #3B3B3B;
		font-size: 33upx;
		margin-left: 25upx;
	}
	.right .title{
		color: #F27D40;
		font-size: 31upx;
		margin-right: 45upx;
	}
	.list{
		display: flex;
		background: white;
		height: 100upx;
		margin-top: 10upx;
		font-size: 40upx;
		justify-content: space-between;
	}
	.left,.right{
		display: flex;
		line-height: 100upx;
	}
	.title1{
		padding-right: 80upx;
	}
</style>
