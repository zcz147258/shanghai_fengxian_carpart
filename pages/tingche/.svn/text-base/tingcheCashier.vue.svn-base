<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">收银台</block>
		</cu-custom>

		<view class="padding-xl text-center text-price text-red text-xxxl">{{wxData.amount}}</view>

		<view class="padding-left-sm padding-right-sm margin-bottom bg-white line">
			<view class="flex justify-between solid-bottom padding-sm">
				<view class="text-gray-black text-xl">泊位号</view>
				<view class="text-black text-xl">{{wxData.spaceNo}}</view>
			</view>
			<view class="flex justify-between solid-bottom padding-sm">
				<view class="text-gray-black text-xl">车牌号</view>
				<view class="text-black text-xl">{{wxData.plateNo}}</view>
			</view>
			<view class="flex justify-between padding-sm">
				<view class="text-gray-black text-xl">收款方</view>
				<view class="text-black text-xl">{{wxData.busicom_name}}</view>
			</view>
		</view>

		<cashier :providerList="providerList" @tapPaymentType="tapPaymentType" @requestPayment="requestPayment"></cashier>
	</view>
</template>

<script>
	import cashier from '@/components/cashier/cashier.vue';
	export default {
		components:{
			cashier
		},
		data() {
			return {
				wxData: { //数据
					plateNo: "",
					spaceNo: "",
					orderId: "",
					lRule1Id: "",
					busicom_name: '',
					amount: 0,
					dbuyhours: "",
					counters: []
				},
				providerList: [] // 支付通道
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		onLoad(wxData) {
			this.wxData = {
				plateNo: wxData.plateNo,
				spaceNo: wxData.spaceNo,
				orderId: wxData.orderId,
				lRule1Id: wxData.lRule1Id,
				busicom_name: wxData.busicom_name,
				amount: wxData.amount/100,
				dbuyhours: wxData.dbuyhours,
				counters: JSON.parse(wxData.counters)
			};
			let counters = this.wxData.counters;
			for (let i in counters) {
				if (counters[i] != null && counters[i] != undefined) {
					if (counters[i].bank_codeWeixin) {
						//微信收银台
						//查找手机里的支付通道
						// #ifdef APP-PLUS
						uni.getProvider({
							service: "payment",
							success: (e) => {
								e.provider.map((value) => {
									switch (value) {
										case 'wxpay':
											this.providerList.push({
												name: '微信',
												id: value,
												img: '../../static/cashier/wxpay.png'
											});
											break;
									}
								})
							},
							fail: (e) => {
								console.log("获取支付通道失败：", e);
							}
						});
						// #endif
					} else if (counters[i].bank_codeZhifubao) {
						//支付宝收银台
						// #ifdef APP-PLUS
						uni.getProvider({
							service: "payment",
							success: (e) => {
								e.provider.map((value) => {
									switch (value) {
										case 'alipay':
											this.providerList.push({
												name: '支付宝',
												id: value,
												img: '../../static/cashier/alipay.png'
											});
											break;
									}
								})
							},
							fail: (e) => {
								console.log("获取支付通道失败：", e);
							}
						});
						// #endif
					} else if(counters[i].bank_codeJhjh) {
						// 建行聚合收银台
						this.providerList.push({
							name: '建行聚合',
							id: 'ccb',
							img: '../../static/cashier/ccbpay.png'
						});
					} else if(counters[i].bank_codeShywt){
						// 一网通收银台
						this.providerList.push({
							name: '一网通',
							id: 'netcom',
							img: '../../static/cashier/netcompay.png'
						});
					}
				}
			}
		},
		methods: {
			// 支付
			requestPayment(pay) {
				if(this.providerList.length == 0){
					this.$api.msg("暂无支付方式");
					return
				}
				let wxData = this.wxData;
				let params = {
					counter_ids: null,
					amountMoneyFloat: wxData.amount,
					dBuyHours: wxData.dbuyhours,
					lRule1Id: wxData.lRule1Id,
					orderId: wxData.orderId,
					plateNo: wxData.plateNo,
					spaceNo: wxData.spaceNo
					// origin: orderMoney_el.data("origin"),//道路缴费不需要
					// reqStr: reqStr
				};
				
				if (pay.id == "wxpay") {
					for(let n in wxData.counters){
						if(wxData.counters[n].bank_codeWeixin){
							params.counter_ids = wxData.counters[n].counter_id;
							break;
						}
					}
				} else if (pay.id == "alipay") {
					for(let n in wxData.counters){
						if(wxData.counters[n].bank_codeZhifubao){
							params.counter_ids = wxData.counters[n].counter_id;
							break;
						}
					}
				} else if (pay.id == "ccb") {
					for(let n in wxData.counters){
						if(wxData.counters[n].bank_codeJhjh){
							params.counter_ids = wxData.counters[n].counter_id;
							break;
						}
					}
				} else if (pay.id == "netcom") {
					for(let n in wxData.counters){
						if(wxData.counters[n].bank_codeShywt){
							params.counter_ids = wxData.counters[n].counter_id;
							break;
						}
					}
				}
				this.$http.request({
					url: "/wx/jsonPreparePayInCounter",
					data: params,
					method: "POST",
					dataType: 'json',
					success: (res) => {
						let data = res.data;
						if(data.success) {
							var sReqNo = data.sReqNo;
							if(data.counter_bank_codeIsWeixin) {
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: {
										appid: data.prepayInfo.appid,
										noncestr: data.prepayInfo.noncestr,
										package: data.prepayInfo['package'],
										partnerid: data.prepayInfo.partnerid,
										prepayid: data.prepayInfo.prepayid,
										timestamp: Number(data.prepayInfo.timestamp),
										sign: data.prepayInfo.sign
									},
									success: (res) => {
										this.$api.msg("支付成功");
										uni.navigateBack({
											delta: 1
										})
									},
									fail: (res) => {
										this.$api.msg("支付失败");
									}
								})
							}else if(data.counter_bank_codeIsZhifubao){
								//支付宝
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: data.alipayReturnStr,
									success: (res) => {
										this.$api.msg("支付成功");
										uni.navigateBack({
											delta: 1
										})
									},
									fail: (res) => {
										this.$api.msg("支付失败");
									}
								})
							}else if(data.counter_bank_codeIsShywt) {
								//一网通支付
								if(data.message){
									uni.navigateTo({
										url: '../netcomCashier/netcomCashier?message=' + data.message
									})
								} else {
									this.$api.msg(data.errorText);
								}
							} else if(data.counter_bank_codeIsJhjh) {
								//建行支付
								this.$api.msg('建行聚合支付失败');
							} else {
								this.$api.msg('暂无该支付方式');
							}
						} else {
							this.$api.msg(data.errorText);
						}
					},
					fail: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	.text-xxxl {
		font-size: 48rpx;
	}
</style>
