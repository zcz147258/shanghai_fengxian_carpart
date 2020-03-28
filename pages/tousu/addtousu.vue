<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">意见反馈</block>
		</cu-custom>
		
		<view class="input-feedback">
			<view class="u-f-ac">
				<view class="flex-sub bg-white padding-sm margin-xs radius text-black text-bold">反馈类型</view>
				<view class="flex-treble bg-white padding-sm margin-xs radius u-f-ac u-f-jsb" @tap="openExcType">
					<view class="text-center text-gray">{{excType[excIndex].name}}</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
			</view>
			<view class="flex-sub bg-white padding-sm margin-xs radius solid-bottom">详情描述</view>
			<view class="cu-form-group margin-top">
				<textarea  v-model="feedbackContent" ></textarea>
			</view>
		</view>
		<!-- 确定按钮 -->
		<view class="padding u-f flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="formSubmit">确定</button>
		</view>

		<!-- 异常类型选择控件 -->
		<uni-popup ref="choiceExcType" type="center" maskClick="true" animation="true">
			<view class="uni-list choiceExcType">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd u-f-ac" v-for="(item, index) in excType" :key="item.value">
						<view>
							<radio :value="item.id" :checked="index == excIndex" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</uni-popup>
		
		<!-- 提示 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					请输入详情内容(最少6个字)
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				excType: [], //异常类型
				excIndex: 0, //选择的异常对象的下标
				feedbackContent: '' ,//反馈详情
				modalName: '',//提示框类型
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		methods: {
			//点击反馈类型时
			openExcType() {
				this.$nextTick(() => {
					this.$refs['choiceExcType'].open()
				})
			},
			//改变反馈类型时
			radioChange(evt) {
				for (let i = 0; i < this.excType.length; i++) {
					if (this.excType[i].id == evt.target.value) {
						this.excIndex = i;
						this.$nextTick(() => {
							this.$refs['choiceExcType'].close();
						})
						break;
					}
				}
			},
			// 提交
			formSubmit() {
				let feedbackContent = this.feedbackContent;
				if (feedbackContent.length < 6) {
					return this.modalName = "Modal";//打开提示框
				}
				let excType = this.excType[this.excIndex];
				console.log("excType：" + excType);
				let type = String(excType.id);
				this.$http.request({
					url: '/wx/jsonAddCustomerAdvise',
					data:{
						"report_type": type,
						"advise_content": feedbackContent
					},
					success: (res)=>{
						if(res.data.success){
							uni.navigateBack({
								delta: 1
							})
						}else{
							this.$api.msg(res.data.errorText);
						}
					}
				})
			},
			//关闭提示框
			hideModal(e) {
				this.modalName = null
			},
		},
		onLoad() {
			this.excType = [{
					id: 1,
					name: "异常"
				},
				{
					id: 2,
					name: "不正当收费"
				},
				{
					id: 3,
					name: "其他"
				}
			];
		}
	}
</script>

<style scoped>
	.input-feedback {
		background-color: #FFFFFF;
		padding: 10rpx 20rpx;
	}

	.choiceExcType {
		background-color: #FFFFFF;
		width: 600rpx;
		padding: 20rpx 20rpx;
	}

	label {
		padding: 50rpx;
	}

	label>view:nth-child(1) {
		padding-right: 50rpx;
	}
</style>
