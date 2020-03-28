<template>
	<view>
		<view class="cu-list grid" :class="['col-' + gridCol]">
			<block v-for="(item,index) in parkingTimeList" :key="index">
				<view class="parking-time">
					<view class="u-f-ajc" @tap="clikeParkingTime(index)" :class="[{'u-active-border' : gridBorder && activeIndex == index},{'u-default-border' : gridBorder && activeIndex != index},{'bg-gray' : !disableCan}]">{{item}}小时</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			parkingTimeList: Array,
			activeIndex: Number,
			gridCol: Number,
			gridBorder: Boolean,
			disableCan: Boolean
		},
		data() {
			return {
			}
		},
		methods: {
			clikeParkingTime(index){
				if(!this.disableCan) return;
				this.$emit("clikeParkingTime",index);
			}
		}
	}
</script>

<style lang="scss">
	.parking-time{
		padding: 10rpx 15rpx;
	}
</style>
