<template>
	<view class="content animated fadeIn">
		<cu-custom bgColor="bg-blue" :isBack="false">
			<block slot="backText"></block>
			<block slot="content" class="text-xxl">奉贤停车</block>
		</cu-custom>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 400upx;">
			<swiper-item v-for="(item,index) in imageList" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" mode="widthFix" style="height: 500px;" class="picture"></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="container">
			<view class="list" v-for="(items,index) in list" :key="index" @tap="turnto(index)" :style="{'background': items.color}">
				<view class="iconfont" :class="items.iconUrl"></view>
				<view class="name">{{ items.title }}</view>
				<view class="eng_name">{{ items.eng_name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				imageList: [{
						imgUrl: '../../static/images/pic1.jpg',
						title: '商业道路区域划分'
					},
					{
						imgUrl: '../../static/images/pic2.jpg',
						title: '商业道路区域划分'
					},
					{
						imgUrl: '../../static/images/pic3.jpg',
						title: '商业道路区域划分'
					}
				],
				list: [{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #47E4B5, #3FCCC4)',
						iconUrl: 'icon-huojian',
						title: '道路缴费',
						eng_name: 'ROAD PAEKING'
					},
					{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #91E3F2, #26A7BF)',
						iconUrl: 'icon-qianbao',
						title: '场库缴费',
						eng_name: 'GARAGE PARKING'
					},
					{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #55AAFD, #0776EE)',
						iconUrl: 'icon-wodejiaofei',
						title: '我的补缴',
						eng_name: 'ARREARS PAY'
					},
					{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #47E4B5, #3FCCC4)',
						iconUrl: 'icon-peizhitubiaosvg-',
						title: '共享停车',
						eng_name: 'SHARE PAEKING'
					},
					{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #91E3F2, #26A7BF)',
						iconUrl: 'icon-cheliang-',
						title: '车牌补缴',
						eng_name: 'CAR ARREARS'
					},
					{
						from: '#47E4B5',
						to: '#3FCCC4',
						color: 'linear-gradient(135deg, #7AF8B3, #4BE791)',
						iconUrl: 'icon-zuanshi',
						title: '便民服务',
						eng_name: 'CIVILIAN SERVICE'
					}
				]
			}
		},
		onShow() {
			//判断是否登录
			this.checkSession();
			if (!this.hasLogin){
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['checkSession']),
			turnto(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '../tingche/tingche'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '../lotparking/lotparking'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../qianfei/qianfei'
						});
						break;
					case 3:
						this.$api.msg("敬请期待");
						break;
					case 4:
						uni.navigateTo({
							url: '../overpay/inputOverpay'
						});
						break;
					case 5:
						uni.navigateTo({
							url: '../convin/convin'
						});
						break;
				}
			}
		}
	}
</script>

<style>
	.name {
		position: absolute;
		color: white;
		font-size: 40upx;
		left: 140upx;
		top: 50upx;
	}

	.eng_name {
		position: absolute;
		color: #F5F1F1;
		font-size: 21upx;
		left: 140upx;
		top: 120upx;
	}

	.iconfont {
		position: absolute;
		color: white;
		font-size: 80upx;
		left: 40upx;
		top: 40upx;
	}

	.container {
		padding: 0 15upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.list {
		margin-top: 35upx;
		position: relative;
		width: 340upx;
		height: 220upx;
		border-radius: 10upx;
	}

	.title {
		position: absolute;
		bottom: 10upx;
		left: 30upx;
		color: #D0D0D1;
		font-size: 33upx;
		font-weight: bold;
	}

	.picture {
		width: 100%;
		height: 800upx;
	}
</style>
