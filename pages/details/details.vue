<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">订单详情</block>
		</cu-custom>
		<block v-for="(item,index) in jaOrders" :key="index">
			<view class="content">
				<view class="list">
					<view>停车地点</view>
					<view>{{ item.sRoadShort }}</view>
				</view>
				<view class="list">
					<view>订单号</view>
					<view>{{ item.sOrderNo }}</view>
				</view>
				<view class="list">
					<view>泊位号</view>
					<view>{{ item.sSpaceNo }}</view>
				</view>
				<view class="list">
					<view>车牌号码</view>
					<view>{{ item.sPlateNo }}</view>
				</view>
				<view class="list">
					<view>开始计费时间</view>
					<view>{{ item.sOrderTime1 }}</view>
				</view>
				<view class="list">
					<view>结束计费时间</view>
					<view>{{ item.sSpaceTime2 }}</view>
				</view>
				<view class="list">
					<view>车辆驶离时间</view>
					<view>{{ item.sOrderTime2 }}</view>
				</view>
				<view class="list">
					<view>停车时长</view>
					<view>{{ item.sParkedLength }}</view>
				</view>
				<view class="list">
					<view>已收</view>
					<view>{{ item.iPaidMoney/100 }}元</view>
				</view>
				<view class="list last">
					<view>欠费</view>
					<view>{{ item.iDebtMoney/100 }}元</view>
				</view>
			</view>
			<view class="payinfo">
				<view class="head">
					<view>支付记录</view>
					<view>合计：{{ item.iPaidMoney/100 }}元</view>
				</view>
				<view v-if="item.jaPays.length == 0" class="nodata">
					<image src="../../static/images/query.png" mode=""></image>
					<view>暂无支付记录</view>
				</view>
				<view class="payList" v-else v-for="(item2,index) in item.jaPays" :key="index">
					<view>
						<view>支付日期</view>
						<view>{{ item2.sPayTime }}</view>
					</view>
					<view>
						<view>{{ item2.sPayBank }}</view>
						<view>{{item2.iPayItem == 4 ? '退款' : ''}}&nbsp;&nbsp;{{ item2.iPayMoney/100 }}元</view>
					</view>
					<view>
						<view>发票号</view>
						<view>{{ item2.sInvoiceNo}}</view>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				jaOrders: []
			}
		},
		onLoad(options) {
			this.getinfo(options.lOrderId)
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		components: {
			UniNavBar
		},
		methods: {
			getinfo(lOrderId) {
				this.$http.request({
					url: "/wx/jsonOrderDetail",
					data: {
						orderId: lOrderId
					},
					success: (res) => {
						if (res.data.success) {
							this.jaOrders = res.data.result.jaOrders;
						}
					}
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F0F0F0;
	}
</style>

<style scoped>
	.nodata {
		position: relative;
		top: -80upx;
		text-align: center;
	}

	.nodata image {
		transform: scale(0.5);
	}

	.nodata view {
		color: #9AACD5;
		font-size: 40upx;
		font-weight: bolder;
		text-align: center;
		position: relative;
		top: -100upx;
	}

	.payList>view view:first-child {
		margin-left: 15upx;
		font-size: 30upx;
	}

	.payList>view view:nth-child(2) {
		margin-right: 15upx;
		font-size: 30upx;
	}

	.payList {
		background-color: #DBDBDB;
		border-radius: 15upx;
		margin-bottom: 30upx;
	}

	.payList>view {
		display: flex;
		margin-top: 20upx;
		font-size: 30upx;
		justify-content: space-between;
	}

	.content {
		margin-top: 15upx;
		padding: 10upx 30upx;
		background-color: white;
	}

	.list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #E7E7E7;
		color: #7F7F7F;
		margin-top: 15upx;
		padding-bottom: 15upx;
	}

	.list view:first-child {
		color: #565656;
	}

	.list view {
		font-size: 35upx;
	}

	.last {
		border: none;
	}

	.head {
		display: flex;
		justify-content: space-between;
		padding: 20upx 0upx;
	}

	.head view {
		font-size: 35upx;
	}

	.head view:first-child {
		color: #565656;
	}

	.payinfo {
		margin-top: 20upx;
		background-color: white;
		padding: 0upx 30upx;
		color: #7F7F7F;
		padding-bottom: 30upx;
	}
</style>
