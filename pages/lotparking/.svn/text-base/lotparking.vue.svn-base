<template>
    <view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">场库缴费</block>
		</cu-custom>
		<!-- 车牌号组件 -->
		<view class="bg-white padding-top-xl">
			<view class="text-center text-xl text-bold">
				请输入真实有效的车牌号
			</view>
			<view>
				<inputPlateNumber :plateNum="scp.plateNum" @plateNumChange="plateNumChange" @isActiveShowChange="isActiveShowChange"
				 :activeShow="scp.activeShow"></inputPlateNumber>
			</view>
			<view>
				<historyPlateNumber :plateNumList="scp.plateNumList" @clikehistoryPlateNum="clikehistoryPlateNum" :activeIndex="scp.plateNumActiveIndex"
				 :gridCol="3" :gridBorder="true"></historyPlateNumber>
			</view>
		</view>
		<view class="padding-xl">
			<button type="primary" @tap="effective">查询</button>
		</view>
		<view class="text-center text-gray" v-if="data != null">
			查询成功：车牌<text class="padding-left-xs padding-right-xs">{{data.plateNo}}</text>一共欠费<text class="text-red">{{data.result.iDebtMoney/100}}</text>元
		</view>
		<view class="u-f-ajc text-gray">
			温馨提示：请在付款成功后<text class="text-red padding-left-xs padding-right-xs">15分钟</text>内离场
		</view>
		<!-- 提示缴费信息 -->
		<view class="text-center margin-top">
			<view class="text-gray">关注车牌的欠费情况</view>
			<view class="flex justify-center" v-for="(item,index) in debtinfo" :key="index">
				<view v-if="item.sPlateNo && item.iDebtCount && item.iDebtCount > 0 && item.iDebtMoney && item.iDebtMoney > 0" class="flex justify-around text-center text-gray margin-left-sm margin-right-sm">
					{{ item.sPlateNo }}
					<text class="margin-left-sm margin-right-sm">{{ item.iDebtCount }}笔</text>
					欠费<text class="text-red"> {{ item.iDebtMoney/100 }}</text>元
				</view>
			</view>
			<view class="text-gray">详细的欠费信息，请去我的补缴和车牌补缴查看</view>
		</view>
		<view class="margin-xl text-center">
			<button class="cu-btn bg-blue" @tap="goPayBack">去补缴</button>
		</view>
		
		<view class="u-bottom flex p-xs mb-sm">
			<view class="flex-twice padding-sm text-red bg-white text-xl">共需支付：
				{{data != null ? data.result.iDebtMoney/100.00 : 0}}元</view>
			<view class="flex-sub padding-sm text-center bg-blue text-white text-xxl text-bold" @tap="gopay">支付</view>
		</view>
		
		<modal :modalName="modalName" :modalContent="modalContent" @modalNameChange="modalNameChange"></modal>
    </view>
</template>

<script>
	import modal from '@/components/modal/modal.vue';
	import inputPlateNumber from '@/components/plate-number/inputPlateNumber/inputPlateNumber.vue';
	import historyPlateNumber from '@/components/plate-number/historyPlateNumber/historyPlateNumber.vue';
	export default {
		components:{
			inputPlateNumber,
			historyPlateNumber,
			modal
		},
		data() {
			return {
				// 车牌号选择对象
				debtinfo:[],
				scp: {
					plateNum: null, // 车牌号
					plateNumList: [],// 历史车牌
					plateNumActiveIndex: -1, // 历史车牌选中的下标,-1表示未选中
					activeShow: true, // 是否开启新能源提示
				},
				modalName: null,//提示类型
				modalContent: '请输入真实有效的车牌',//提示内容
				data: null//数据
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			this.data = null;
		},
		onLoad() {
			this.scp.plateNum = "        ";//输入的车牌，默认8个空格
			this.getinfo();
		},
		methods: {
			//修改提示类型或关闭
			modalNameChange(modalName) {
				this.modalName = modalName;
			},
			//车牌改变时
			plateNumChange(plateNum){
				//判断是否是历史车牌，是历史车牌则要选中，不是则改变值
				let plateNumActiveIndex = -1;
				let plateNumList = this.scp.plateNumList;
				for (var i = 0; i < plateNumList.length; i++) {
					if(plateNumList[i] == plateNum.replace(/\s+/g,"")){
						plateNumActiveIndex = i;
						break;
					}
				}
				if(plateNumActiveIndex != -1){
					this.clikehistoryPlateNum(plateNumActiveIndex);
				}else{
					this.scp.plateNumActiveIndex = plateNumActiveIndex;
					this.scp.plateNum = plateNum;
				}
			},
			//新能源提示框状态改变时
			isActiveShowChange(flag){
				this.scp.activeShow = flag;
			},
			//当点击历史车牌时
			clikehistoryPlateNum(plateNumActiveIndex){
				let plateNum = this.scp.plateNumList[plateNumActiveIndex];
				if(plateNum.length != 8){
					this.scp.activeShow = true;
				}else{
					this.scp.activeShow = false;
				}
				this.scp.plateNum = plateNum;
				this.scp.plateNumActiveIndex = plateNumActiveIndex;
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
					return this.modalName = "DialogModal2";//打开提示框
				}
				let plateNum = this.scp.plateNum;//车牌
				//在此查询
				this.getexist(plateNum);
				/* 弹出提示框 */
			},
			//关闭提示框
			hideModal(e) {
				this.modalName = null
			},
			//初始化车牌的方法
			getinfo(){
				this.$http.request({
					url: '/wx/jsonLotparking',
					success:(res)=>{
						if(res.data.success){
							this.debtinfo = res.data.result.jaPlateDebts;
							let plateNumList = [];
							res.data.result.jsPlates.forEach((item,index)=>{
								plateNumList.push(item.sPlateNo);
							})
							this.scp.plateNumList = plateNumList;
						}else{
							this.$api.msg(res.data.result.sErrInfo);
						}
					}
				})
			},
			/* 检查停车场有无此车牌 */
			getexist(plateNum){
				this.$http.request({
					url: '/wx/jsonLotparking_query',
					data:{
						 "plateNo": plateNum
					},
					success:(res)=>{
						if(res.data.success){
							if(res.data.result.iErrCode == 0){
								this.data = res.data;
							}else{
								this.$api.msg(res.data.result.sErrInfo);
							}
						}else{
							this.$api.msg(res.data.errorText);
						}
					}
				})
			},
			goPayBack(){
				uni.navigateTo({
					url: '../qianfei/qianfei'
				})
			},
			// 支付
			gopay(){
				if(this.data == null  || this.data.result.iDebtMoney == 0)return;
				let plateNo = this.data.plateNo
				let lParkId = this.data.result.lParkId
				let reqStr = {
					total: this.data.result.iDebtMoney,
					lParkId: lParkId,
					plateNo: plateNo
				}
				this.$http.request({
					url: '/wx/jsonLotparkingPayCounter',
					data: {
						"plateNo": plateNo,
						"lParkId": lParkId,
						"reqStr": reqStr
					},
					success:(res)=>{
						let data = res.data;
						if (data.success) {
							uni.navigateTo({
								url: 'lotparkingCashier?reqStr=' + JSON.stringify(reqStr) + '&data=' + JSON.stringify(data) +
									"&origin=lotparking"
							})
						} else {
							this.$api.msg(data.errorText);
						}
					},
					fail: (e) => {
						console.log(e);
					}
				})
			}
		}
	}
</script>

<style>
</style>
