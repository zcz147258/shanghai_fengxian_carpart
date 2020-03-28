<template>
	<view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{title ? title : '温馨提示'}}</view>
					<view v-if="!hideClose" class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalContent}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button v-if="!cancelClose" class="cu-btn line-green text-green" @tap="cancel">{{cancelName ? cancelName : '取消'}}</button>
						<button class="cu-btn bg-green margin-left" @tap="sure">{{sureName ? sureName : '确定'}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{title ? title : '温馨提示'}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalContent}}
				</view>
			</view>
		</view>
	</view>
</template>

	<!-- 
	:modalName 开启什么组件
		"DialogModal1" 确认框
			:title 标题
			:modalContent 内容
			@sure 确定时的事件
			:sureName 确定按钮自定义名称
			@cancel 取消的事件
			:cancelName 取消按钮自定义名称
			:cancelClose 是否关闭，默认false开启，如果true关闭
			@modalNameChange 模态框改变或关闭，必填
			:hideClose 是否取消关闭按钮,默认false
		
		"DialogModal2" 提示框
			:title 标题
			:modalContent 内容
			@modalNameChange 模态框改变或关闭，必填
			:hideClose 是否取消关闭按钮,默认false
	-->

<script>
	export default {
		props: {
			modalName: String,
			title: String,
			modalContent: String,
			sureName: String,
			cancelName: String,
			cancelClose: Boolean,
			hideClose: Boolean
		},
		data() {
			return {

			}
		},
		methods: {
			//关闭
			hideModal(e){
				this.$emit("modalNameChange", null);
			},
			//取消
			cancel(e) {
				this.$emit("cancel");
				this.hideModal();
			},
			//确定
			sure(){
				this.$emit("sure");
				this.hideModal();
			}
		}
	}
</script>

<style>

</style>
