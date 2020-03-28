<template>
	<view>
		<view class="parking-time u-f-ajc">
			<view class="text-xxxl margin-xs u-f-ajc" :class="disableCan ? 'text-blue' : 'text-black bg-gray'" @tap="jiaParkingTimeChange">+</view>
			<view class="parking-time-content u-f-ajc">
				<view class="u-f-ajc">{{parkingTime}}</view>
				<view class="u-f-ajc">小时</view>
			</view>
			<view class="text-xxxl margin-xs u-f-ajc" :class="disableCan ? 'text-blue' : 'text-black bg-gray'" @tap="jianParkingTimeChange">—</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			parkingTime: Number,
			disableCan: Boolean
		},
		data() {
			return {
			}
		},
		methods: {
			//增加时间
			jiaParkingTimeChange(){
				if(!this.disableCan) return;
				this.$emit("parkingTimeChange", this.parkingTime + 0.5);
			},
			//减少时间
			jianParkingTimeChange(){
				if(!this.disableCan) return;
				if(this.parkingTime == 0) return;
				this.$emit("parkingTimeChange", this.parkingTime - 0.5);
			}
		}
	}
</script>

<style>
	.text-xxxl{
		font-size: 80rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.parking-time>.parking-time-content{
		width: 180rpx;
	}
	.parking-time>.parking-time-content>view{
		width: 80rpx;
		color: #585858;
		font-size: 38rpx;
	}
	.parking-time>.parking-time-content>view:nth-last-child(1){
		font-weight: bold;
	}
</style>
