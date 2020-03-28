<template>
	<view>
		 <!-- 泊位号查询 -->
		<view class="berth u-f-ajc">
			<view class="berth-input u-f-ajc" @tap="berthInputClick(0)">
				{{berthNum.slice(0,1)}}
				<view class="cursor" v-show="cursorIndex === 0">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="berth-input u-f-ajc" @tap="berthInputClick(1)">
				{{berthNum.slice(1,2)}}
				<view class="cursor" v-show="cursorIndex === 1">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="berth-input u-f-ajc" @tap="berthInputClick(2)">
				{{berthNum.slice(2,3)}}
				<view class="cursor" v-show="cursorIndex === 2">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="berth-input u-f-ajc" @tap="berthInputClick(3)">
				{{berthNum.slice(3,4)}}
				<view class="cursor" v-show="cursorIndex === 3">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="berth-input u-f-ajc" @tap="berthInputClick(4)">
				{{berthNum.slice(4,5)}}
				<view class="cursor" v-show="cursorIndex === 4">
					<image :src="cursor" lazy-load />
				</view>
			</view>
		</view>
		
		<!-- 数字键盘 -->
		<keyboard-package ref="berth" type="berth" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" :disableDot="true"/>
	</view>
</template>


<script>
	import cursor from './cursor.gif'
	import keyboardPackage from "@/components/keyboard-package/keyboard-package.vue"
    export default {
		props:{
			berthNum: String
		},
		mounted() {
			this.cursor = cursor;
		},
		components: {
			keyboardPackage
		},
        data() {
            return {
				cursorIndex: -1,//点击时光标显示的下标位置，-1是不显示
				type: 'berth',//键盘类型
				cursor: '', //输入焦点gif地址
            };
        },
        methods: {
			//点击输入框的方法
			berthInputClick(index){
				this.cursorIndex = index;
				this.$refs[this.type].open();
			},
			//当输入时
			onInput(val){
				switch(this.type){
					case 'berth':
						let cursorIndex = this.cursorIndex;
						if(cursorIndex == -1 || this.type != 'berth') return;
						let str = this.berthNum.substring(0, cursorIndex) + val;
						for (let i = 0; i <  4 - cursorIndex; i++) {
							str += " ";
						}
						this.cursorIndexChange(cursorIndex+1);
						//修改泊位号
						this.berthNumChange(str);
						break;
				}
			},
			//当删除时
			onDelete(){
				let cursorIndex = this.cursorIndex;
				if(cursorIndex == -1) return;
				let str = this.berthNum;
				if(this.berthNum.substring(cursorIndex, cursorIndex + 1) == ' '){
					str = str.substring(0, cursorIndex-1);
					for (let i = 0; i <= 5 - cursorIndex; i++) {
						str += " ";
					}
					this.cursorIndexChange(cursorIndex-1);
				}else{
					str = str.substring(0, cursorIndex);
					for (let i = 0; i < 5 - cursorIndex; i++) {
						str += " ";
					}
				}
				//修改泊位号
				this.berthNumChange(str);
			},
			//当点击完成时
			onConfirm(){
				uni.showToast({
					title:'完成输入！',
					duration:2000,
					icon:'none'
				})
			},
			//当关闭时
			close(){
				this.$refs[this.type].close();
			},
			//当泊位号改变时
			berthNumChange(berthNum){
				this.$emit("berthNumChange",berthNum);
			},
			//修改下标
			cursorIndexChange(cursorIndex){
				if(cursorIndex<0){
					cursorIndex = 0;
				}
				if(cursorIndex>4){
					cursorIndex = -1;
					this.close();
				}
				this.cursorIndex = cursorIndex;
			}
		}
    }
</script>

<style lang="scss">
	.berth{
		padding: 15rpx 20rpx;
	}
	.berth>.berth-input{
		border: 1rpx solid #dbd6e8;
		background: #f0e9ff;
		width: 120rpx;
		height: 100rpx;
		font-size: 48rpx;
	}
	.berth>.berth-input:nth-child(1){
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	.berth>.berth-input:nth-last-child(1){
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	// 输入焦点图片
	.cursor {
	    float: left;
	    width: 2px;
	    height: 52rpx;
	    vertical-align: middle;
	    align-self: center;
	
	    image {
	        width: 2px;
	        display: block;
	        height: 52rpx;
	    }
	}
</style>