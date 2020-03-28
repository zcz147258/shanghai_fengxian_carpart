<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">便民服务</block>
		</cu-custom>
		<view class="container">
			<view v-for="(item,index) in IconList" :key="index">
				<uni-list-item 
				style="background-color: white;"
				@tap="turnto(index)"
				:showExtraIcon="true"
				 :extra-icon="item.extraIcon1" 
				 :title="item.title" />
			</view>
		</view>
	</view>
</template>

<script>
	import UniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				IconList: [
					{
						title: '公交车',
						extraIcon1: {
							color: '#3895F4',
							size: 22,
							type: 'iconfont icon-yiliaohangyedeICON-'
						}
					},
					{
						title: '自来水',
						extraIcon1: {
							color: '#3895F4',
							size: 22,
							type: 'iconfont icon-water_icon'
						}
					},
					{
						title: '天然气',
						extraIcon1: {
							color: '#3895F4',
							size: 22,
							type: 'iconfont icon-meiqitianranqi'
						}
					}
				]
			}
		},
		components:{
			UniListItem
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		methods: {
			turnto(index){
				this.$api.msg("敬请期待");
			}
		}
	}
</script>

<style>
.container{
	margin-top: 20upx;
}
</style>
