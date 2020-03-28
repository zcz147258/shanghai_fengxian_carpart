<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">支付查询</block>
		</cu-custom>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="0" bottom="0" :down="downOption" @down="downCallback"
		 @up="upCallback">
			<!-- 分页的数据 -->
			<view class="bg-white margin-sm padding-sm" style="border-radius: 10px;" v-for="(item,index) in jaPays" :key="index">
				<view class="flex justify-between padding-left-sm padding-right-sm">
					<view>
						{{item.sPayFrom}}
					</view>
					<view class="text-blue" @tap="todetails(item.lOrderId)">
						查看详情 <text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left-sm padding-right-sm">
					<view>时间</view>
					<view>{{item.sPayTime}}</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left-sm padding-right-sm">
					<view>{{item.sPayBank}}</view>
					<view>{{item.iPayItem == 4 ? '退款' : ''}}&nbsp;&nbsp;{{item.iPayMoney/100}} 元</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left-sm padding-right-sm">
					<view>发票号</view>
					<view>{{ item.sInvoiceNo }}</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/xinlang/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			MescrollBody
		},
		data() {
			return {
				downOption: {
					auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				jaPays: [] // 数据列表
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				//下拉刷新和上拉加载调同样的接口, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.$http.request({
					url: "/wx/jsonPayList",
					data: {
						"pageIndex": page.num - 1
					},
					success: (res) => {
						setTimeout(() => {
							//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
							this.mescroll.endSuccess(this.jaPays.length);
						}, 1000)
						// console.log(res)
						if (res.data.success) {
							if (page.num == 1) {
								this.jaPays = res.data.result.jaPays;
							} else {
								this.jaPays = this.jaPays.concat(res.data.result.jaPays);
							}
						} else {
							this.$api.msg(res.data.errorText);
						}
					},
					fail: (e) => {
						console.log(e);
						//联网失败, 结束加载
						this.mescroll.endErr();
					}
				})
			},
			// 详情
			todetails(lOrderId) {
				uni.navigateTo({
					url: '../details/details?lOrderId=' + lOrderId
				})
			},
		}
	}
</script>

<style>
	.title {
		position: fixed;
		top: 200;
		left: 0;
		right: 0;
		z-index: 99;
	}
</style>
