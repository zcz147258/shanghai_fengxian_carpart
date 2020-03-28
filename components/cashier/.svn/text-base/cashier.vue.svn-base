<template>
	<view>
		<view class="padding-left-sm padding-right-sm bg-white line text-xl">
			<!-- #ifdef APP-PLUS -->
			<template v-if="providerList.length > 0">
				<view v-for="(item2,index2) in providerOrder" :key="index2">
					<view class="flex justify-between padding-top-sm" v-if="item.id == item2" v-for="(item,index) in providerList" :key="index" @tap="tapPaymentType(index)"
					 :class="item.id != 'netcom' ? 'solid-bottom' : ''">
						<view class="flex">
							<image :src="item.img" lazy-load mode="widthFix" style="width: 50upx;"></image>
							<view class="padding-left-sm text-gray-black text-xl">{{item.name}}支付</view>
						</view>
						<view class=" text-xxxl" :class="providerIndex == index ? 'text-green cuIcon-squarecheckfill' : 'cuIcon-square text-gray-black' "></view>
					</view>
				</view>
			</template>
			<!-- #endif -->
		</view>
		
		<view class="padding-sm">
			<button class="btn-group bg-green lg" @tap="requestPayment">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			providerList: Array
		},
		data() {
			return {
				providerOrder: ['wxpay','alipay','ccb','netcom'],//支付顺序
				providerIndex: 0//支付的下标
			}
		},
		onReady() {
			for (let i = 0; i < this.providerList.length; i++) {
				if(this.providerList[i].id == this.providerOrder[0]){
					this.providerIndex = i;
					break;
				}
			}
		},
		methods: {
			//切换支付方式
			tapPaymentType(index) {
				this.providerIndex = index;
			},
			// 支付
			requestPayment() {
				let pay = this.providerList[this.providerIndex];
				this.$emit('requestPayment',pay);
			}
		}
	}
</script>

<style>

</style>
