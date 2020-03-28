<template>
	<view class="home animated fadeIn slow">
		<view class="head bg-blue">
			<view class="head_pic flex">
				<view>
					<image :src="userInfo.head_img ? userInfo.head_img : '../../static/images/defaultHead.jpg'" lazy-load mode="widthFix" style="border-radius: 100%;"></image>
				</view>
				<view class="margin text-xl text-white">{{userInfo.nick_name}}</view>
			</view>
		</view>
		<view class="location">
			<view v-for="(item,index) in tablist" :key="index">
				<view @tap="turntopay(index)">
					<view class="picpic">
						<image :src="item.url" mode="widthFix" lazy-load></image>
					</view>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view v-for="(item,index) in IconList" :key="index">
				<uni-list-item style="background-color: white;" @tap="turnto(index)" :showExtraIcon="true" :extra-icon="item.extraIcon1"
				 :title="item.title" />
			</view>
		</view>
		<button type="primary" style="width: 80%;margin: 40upx auto;" @tap="exit">退出账号</button>
		<view class="last">
			<view>V 0.9.20</view>
			<view>CopyRight 2019-2020</view>
			<view>上海奉贤停车产业发展有限公司 版权所有</view>
		</view>
	</view>
</template>

<script>
	import UniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				tablist: [{
						url: '../../static/images/tingche.png',
						title: '道路缴费',

					},
					{
						url: '../../static/images/qianfei.png',
						title: '我的补缴',

					},
					{
						url: '../../static/images/lotparking.png',
						title: '场库缴费',

					}
				],
				IconList: [{
						title: '车辆管理',
						extraIcon1: {
							color: '#000',
							size: 22,
							type: 'iconfont icon-maimaiche'
						}
					},
					{
						title: '订单查询',
						extraIcon1: {
							color: '#000',
							size: 22,
							type: 'iconfont icon-dingdan'
						}
					},
					{
						title: '支付查询',
						extraIcon1: {
							color: '#000',
							size: 22,
							type: 'iconfont icon-zhifu'
						}
					},
					{
						title: '建议反馈',
						extraIcon1: {
							color: '#000',
							size: 22,
							type: 'iconfont icon-liuyanjianyi'
						}
					}
				]
			}
		},
		components: {
			UniListItem
		},
		computed: {
			...mapState(['userInfo'])
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		methods: {
			...mapMutations(['logout']),
			exit() {
				this.logout();
				uni.navigateTo({
					url: '../login/login'
				})
			},
			turntopay(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '../tingche/tingche',
						});
						break;
					case 1:
						uni.navigateTo({
							url: '../qianfei/qianfei',
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../lotparking/lotparking',
						});
						break;
				}
			},
			turnto(index) {
				switch (index) {
					case 1:
						uni.navigateTo({
							url: '../orderList/orderList',
						});
						break;
					case 0:
						uni.navigateTo({
							url: '../vehicleManagement/vehicleManagement',
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../payList/payList',
						});
						break;
					case 3:
						uni.navigateTo({
							url: '../tousu/tousu',
						});
						break;
				}
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
	.head_pic {
		padding-top: 100upx;
		margin-left: 70upx;
	}

	.head_pic view:nth-child(1) {
		width: 120upx;
		height: 120upx;
	}

	uni-list-item {
		background-color: white;
	}

	.last>view {
		text-align: center;
		color: #999999;
	}

	.container {
		margin-top: 150upx;
	}

	/* .tablist{
		font-size: 66upx;
		position: relative;
		transform: scale(1.2);
	} */
	.picpic>image {
		margin-top: 30upx;
		width: 65upx;
		height: 65upx;
	}

	.title {
		font-size: 35upx;
	}

	.location>view {
		text-align: center;
		color: #363636;
	}

	.location {
		position: absolute;
		top: 240upx;
		left: 5%;
		width: 90%;
		background-color: white;
		display: flex;
		justify-content: space-around;
		padding-bottom: 15upx;
		border-radius: 7upx;
		box-shadow: 3px 2px 2px 1px rgba(0, 0, 0, 0.2);
	}

	.home {
		position: relative;
	}

	.head {
		height: 300upx;
	}
</style>
