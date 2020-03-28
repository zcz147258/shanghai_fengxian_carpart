<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">车牌补缴</block>
		</cu-custom>
		<view class="bg-white title" v-if="jaOrders.length > 0">
			<view class="text-right text-red padding-left-sm padding-right-sm margin-left-sm margin-right-sm">欠费合计: {{ iSumHisDebt/100 }}
				元 订单数：{{ iCountHisDebt }} 笔</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="50" bottom="50" :down="downOption" @down="downCallback"
		 @up="upCallback">
			<!-- 分页的数据 -->
			<view class="bg-white margin-sm padding-sm" style="border-radius: 10px;" v-for="(item,index) in jaOrders" :key="index">
				<view class="flex justify-between padding-left-sm padding-right-sm">
					<view class="flex justify-start">
						<label>
							<checkbox @tap="selected(index)" :checked="item.checkeds" :value="index" :disabled="busicomid != null &&  busicomid != item.lBusicomId ? 'disabled':''" />
							<text class="text-gray padding-left-sm">{{item.sPlateNo}}</text>
						</label>
					</view>
					<view class="text-blue" @tap="todetails(item.lOrderId)">
						查看详情 <text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left-sm padding-right-sm">
					<view>订单时间：{{item.sOrderTime1}}</view>
					<view>已收{{item.iPaidMoney/100}}元</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left-sm padding-right-sm">
					<view>关单时间：{{item.sOrderTime2}}</view>
					<view>欠费<text class="text-red">{{item.iDebtMoney/100}}</text>元</view>
				</view>
			</view>
		</mescroll-body>

		<view class="u-bottom flex bg-white line" style="height: 50px;">
			<view class="flex-treble padding-sm flex text-xl">
				<label @tap="quanxuan()">
					<checkbox color="#757575" :checked="checkedAll" class="margin-left-sm" />
				</label>
				<text @tap="quanxuan()" class="padding-left-sm">全选</text>
				<text class="padding-left-sm">总计：
					<text class="padding-left-sm text-orange"> {{ selectedCount }} 笔</text>
					<text class="padding-left-sm text-red"> {{ selectedSum/100 }} 元</text>
				</text>
			</view>
			<view class="flex-sub">
				<button type="primary" class="cu-btn bg-blue margin-sm" @tap="gopay">补缴</button>
			</view>
		</view>

		<modal :modalName="modalName" :modalContent="modalContent" @modalNameChange="modalNameChange"></modal>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue';
	import MescrollBody from "@/components/mescroll-diy/xinlang/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			MescrollBody,
			modal
		},
		data() {
			return {
				downOption: {
					auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				iSumHisDebt: 0, //总欠费金额
				iCountHisDebt: 0, //总订单数
				jaOrders: [], // 数据列表
				busicomid: null, //选择的经营公司
				checkedAll: '', //全选按钮是否选中
				modalName: null, //提示类型，是否打开提示框
				modalContent: '' ,//提示内容
				plateNo: '',//车牌
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			// 下拉刷新
			this.downCallback();
		},
		onLoad(options) {
			this.plateNo = options.plateNum;
		},
		computed: {
			selectedCount() {
				if (this.busicomid != null) {
					let count = 0;
					this.jaOrders.forEach((item, index) => {
						if (item.lBusicomId == this.busicomid && item.checkeds) {
							count++;
						}
					})
					return count;
				} else {
					return 0;
				}
			},
			selectedSum() {
				if (this.busicomid != null) {
					let sum = 0;
					this.jaOrders.forEach((item, index) => {
						if (item.lBusicomId == this.busicomid && item.checkeds) {
							sum += item.iDebtMoney;
						}
					})
					return sum;
				} else {
					return 0;
				}
			}
		},
		methods: {
			//修改提示类型或关闭
			modalNameChange(modalName) {
				this.modalName = modalName;
			},
			//点击列表按钮
			selected(index) {
				let data = this.jaOrders[index];
				if (this.busicomid != null && data.lBusicomId != this.busicomid) return;
				if (data.checkeds == false) {
					this.busicomid = data.lBusicomId;
					this.jaOrders[index].checkeds = true;
					let checkedAll = true;
					for (let i = 0; i < this.jaOrders.length; i++) {
						if (this.jaOrders[i].lBusicomId == data.lBusicomId && this.jaOrders[i].checkeds != true) {
							checkedAll = false;
							break;
						}
					}
					this.checkedAll = checkedAll;
				} else {
					this.jaOrders[index].checkeds = false;
					let busicomid = null;
					for (let i = 0; i < this.jaOrders.length; i++) {
						if (this.jaOrders[i].lBusicomId == data.lBusicomId && this.jaOrders[i].checkeds) {
							busicomid = this.jaOrders[i].lBusicomId;
							break;
						}
					}
					if (busicomid == null) {
						this.busicomid = busicomid;
					}
					this.checkedAll = false;
				}

			},
			//点击全选按钮
			quanxuan() {
				if (this.checkedAll) {
					this.busicomid = null;
					this.jaOrders.forEach((item,index)=>{
						if (item.checkeds) {
							this.jaOrders[index].checkeds = false;
						}
					})
					this.checkedAll = false;
				} else {
					this.busicomid = this.jaOrders[0].lBusicomId;
					this.jaOrders.forEach((item,index)=>{
						if (item.lBusicomId == this.busicomid) {
							this.jaOrders[index].checkeds = true
						} else {
							this.jaOrders[index].checkeds = false
						}
					})
					this.checkedAll = true;
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.checkedAll = false;//取消全选
				this.busicomid = null;//取消选中的经营公司
				//下拉刷新和上拉加载调同样的接口, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.$http.request({
					url: "/wx/jsonOverpay_query",
					data: {
						plateNo: this.plateNo,
						pageIndex: page.num - 1
					},
					success: (res) => {
						setTimeout(() => {
							//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
							this.mescroll.endSuccess(this.jaOrders.length);
						}, 1000)
						// console.log(res)
						if (res.data.success) {
							this.iSumHisDebt = res.data.result.iSumHisDebt; //总欠费金额
							this.iCountHisDebt = res.data.result.iCountHisDebt; //总订单数
							let jaOrders = res.data.result.jaOrders;
							jaOrders.forEach((item, index) => {
								jaOrders[index].checkeds = false;
							})
							if (page.num == 1) {
								this.jaOrders = jaOrders;
							} else {
								this.jaOrders = this.jaOrders.concat(jaOrders);
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
			// 补缴
			gopay() {
				let selectedCount = this.selectedCount,
					selectedSum = this.selectedSum;
				if (selectedCount == 0 || selectedSum == 0) {
					this.modalContent = "请选择要补缴的记录";
					this.modalName = "DialogModal2";
					return;
				}
				let items = [];
				this.jaOrders.forEach((item, index) => {
					if (this.busicomid == item.lBusicomId && item.checkeds) {
						items.push({
							lOrderId: item.lOrderId,
							dMoney: item.iDebtMoney
						});
					}
				})
				let reqStr = {
					number: selectedCount,
					total: selectedSum,
					busicomid: this.busicomid,
					items: items
				}
				this.$http.request({
					url: "/wx/jaonOverpayPayCounter",
					data: {
						plateNo: this.plateNo,
						reqStr: reqStr
					},
					success: (res) => {
						let data = res.data;
						if (data.success) {
							uni.navigateTo({
								url: 'overpayCashier?plateNo='+this.plateNo+'&reqStr='+JSON.stringify(reqStr)+'&data='+JSON.stringify(data)+"&origin=overpay"
							})
						} else {
							this.$api.msg(data.errorText);
						}
					},
					fail: (res) => {
						console.log(res);
					}
				});
			}
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
