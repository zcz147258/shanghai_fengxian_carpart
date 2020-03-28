<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="text-xl">道路缴费</block>
		</cu-custom>
		<!-- 泊位号组件 -->
		<view class="bg-white solid padding-buttom-sm">
			<view class="u-f-ac u-f-jsb padding-left-sm padding-right-sm padding-top-sm">
				<view class="text-bold text-xl text-black">请输入地面上标记的5位泊位号</view>
				<view @tap="clikeTips(1)" class="text-orange text-xl text-decoration">收费标准</view>
			</view>
			<view>
				<berth-number :berthNum="scwh.spaceNo" @berthNumChange="spaceNoChange"></berth-number>
			</view>
		</view>

		<!-- 车牌号组件 -->
		<view class="bg-white solid padding-buttom-sm">
			<view class="u-f-ac u-f-jsb padding-left-sm padding-right-sm padding-top-sm">
				<view class="text-bold text-xl text-black">请输入正确的车牌号</view>
				<view class="text-xl text-decoration"></view>
			</view>
			<view>
				<inputPlateNumber :plateNum="scp.plateNo" @plateNumChange="plateNoChange" @isActiveShowChange="isActiveShowChange"
				 :activeShow="scp.activeShow"></inputPlateNumber>
			</view>
			<view>
				<historyPlateNumber :plateNumList="scp.plateNoList" @clikehistoryPlateNum="clikehistoryPlateNo" :activeIndex="scp.plateNoActiveIndex"
				 :gridCol="3" :gridBorder="true"></historyPlateNumber>
			</view>
		</view>

		<!-- 欠费提示 -->
		<view class="bg-white text-red solid padding-left-sm line" v-show="tips.moneyTips0.length > 0">
			{{tips.moneyTips0}}
		</view>
		<!-- 购买提示 -->
		<view class="bg-white text-red solid padding-left-sm line" v-show="tips.moneyTips1.length > 0">
			{{tips.moneyTips1}}
		</view>
		<!-- 继续购买提示 -->
		<view class="bg-white text-red solid padding-left-sm line" v-show="tips.moneyTips2.length > 0">
			{{tips.moneyTips2}}
		</view>

		<!-- 停车时间组件 -->
		<view class="bg-white solid">
			<view class="u-f-ac u-f-jsb padding-left-sm padding-right-sm padding-top-sm">
				<view class="text-bold text-xl text-black"></view>
				<view @tap="clikeTips(2)" class="text-grey text-xl text-decoration">付费方式</view>
			</view>
			<parking-time :parkingTime="stp.parkingTime" @parkingTimeChange="parkingTimeChange" :disableCan="stp.disableCan"></parking-time>
			<parking-time-list :parkingTimeList="stp.parkingTimeList" :activeIndex="stp.parkingTimeActiveIndex"
			 @clikeParkingTime="clikeParkingTime" :gridCol="4" :gridBorder="true" :disableCan="stp.disableCan"></parking-time-list>
		</view>

		<!-- 警告提示框 -->
		<uni-popup ref="showTip0" type="center" :mask-click="true">
			<view class="text-center bg-red text-white showTips">{{tips.showTip0}}</view>
		</uni-popup>
		<!-- 收费标准提示框 -->
		<uni-popup ref="showTip1" type="bottom" :mask-click="true">
			<text class="padding-sm block text-bold bg-white">
				收费标准
			</text>
			<text class="padding-sm block solid-top bg-white text-center">
				{{tips.showTip1}}
			</text>
		</uni-popup>
		<!-- 收费说明提示框 -->
		<uni-popup ref="showTip2" type="bottom" :mask-click="true">
			<text class="padding-sm block text-bold bg-white">
				收费方式说明
			</text>
			<view class="padding-sm block bg-white">
				预付费是指驾车人在奉贤区道路智慧停车泊位进行停车时，在输入泊位号、车牌号和选择购买时长后，车主预先付费，系统会根据购买时长 自动计算应缴金额；驾车人驶离泊位后，系统会自动根据实际停车时长进行结算，<text class="text-bold">多退少补</text>。
			</view>
		</uni-popup>

		<view class="u-bottom flex p-xs mb-sm">
			<view class="flex-twice padding-sm text-red bg-white text-xl">共需支付：
				{{stp.payMoney/100.00}}元</view>
			<view class="flex-sub padding-sm text-center bg-blue text-white text-xxl text-bold" @tap="gopay">支付</view>
		</view>
	</view>
</template>

<script>
	var iSpecial_NO_PLATE = 1;
	// 选择车牌号与泊位号后显示的消息模板
	var INFO_TEMPL_0 = "目前应付%dPayable%元，可停至%sToTime1%，欠费%dNowDebt%元";
	var INFO_TEMPL_1 = "购买%dBuyHours%小时，需支付%dBuyMoney%元，可停至%sToTime2%";
	var INFO_TEMPL_2 = "继续购买%dBuyHours%小时，需支付%dBuyMoney%元，可停至%sToTime2%";

	import berthNumber from "@/components/berth-number/berth-number.vue"
	import inputPlateNumber from '@/components/plate-number/inputPlateNumber/inputPlateNumber.vue'
	import historyPlateNumber from '@/components/plate-number/historyPlateNumber/historyPlateNumber.vue'
	import parkingTime from '@/components/parking-time/parking-time.vue'
	import parkingTimeList from '@/components/parking-time/parking-time-list.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			berthNumber,
			inputPlateNumber,
			historyPlateNumber,
			parkingTime,
			parkingTimeList,
			uniPopup
		},
		data() {
			return {
				// 车牌号选择对象
				scp: {
					plateNo: "        ", //车牌号，默认8个空格
					plateNoList: [], // 历史车牌
					plateNoActiveIndex: -1, // 历史车牌选中的下标,-1表示未选中
					activeShow: true, // 是否开启新能源提示
				},
				// 泊位号选择对象
				scwh: {
					spaceNo: "     " // 泊位号默认5个空格
				},
				// 车牌号与泊位号选择是否是否考虑忽略最后一位，已无效
				ignoreEnd: true,
				// 停车交费时间（时长）选择对象
				stp: {
					parkingTime: 0, // 停车时间
					parkingTimeList: [], // 停车时间列表
					parkingTimeActiveIndex: -1, // 停车时间选中的下标,-1表示未选中
					disableCan: true, // 是否可以操作停车时间
					enable: true, // 是否可以支付
					payMoney: 0, // 支付金额
				},
				//提示对象
				tips: {
					showTip0: '', // 警告文本
					showTip1: '', // 收费规则
					moneyTips0: '', //欠费提示
					moneyTips1: '', //购买提示
					moneyTips2: '' // 继续购买提示
				},
				// 缓存的微信数据
				wxData: {},
				
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			if (this.isSpaceNoFlag(this.spaceNo)) {
				this.runCpcwh(2, this.spaceNo);
			}
		},
		onLoad() {
			this.stp.parkingTimeList = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
			this.getinfo();
		},
		methods: {
			//初始化车牌的方法
			getinfo(){
				this.$http.request({
					url: '/wx/jsonLotparking',
					success:(res)=>{
						if(res.data.success){
							this.debtinfo = res.data.result.jaPlateDebts;
							let plateNoList = [];
							res.data.result.jsPlates.forEach((item,index)=>{
								plateNoList.push(item.sPlateNo);
							})
							this.scp.plateNoList = plateNoList;
						}else{
							this.$api.msg(res.data.result.sErrInfo);
						}
					}
				})
			},
			//打开提示的方法
			openShowTips(type, str) {
				/* type: 
					0 showTips 警告提示框
					1 showTips1 收费标准提示框
					2 showTips2 付费方式提示框 
				str: 提示内容 */

				switch (type) {
					case 0:
						this.tips.showTip0 = str;
						this.$nextTick(() => {
							this.$refs["showTip0"].open();
						})
						break;
					case 1:
						this.tips.showTip1 = str;
						this.$nextTick(() => {
							this.$refs["showTip1"].open();
						})
						break;
					case 2:
						// this.tips.showTip2 = str;
						this.$nextTick(() => {
							this.$refs["showTip2"].open();
						})
						break;
				}
			},
			//泊位号改变时
			spaceNoChange(spaceNo) {
				if (this.scwh.spaceNo == spaceNo) return;
				this.scwh.spaceNo = spaceNo;
				if (this.isSpaceNoFlag(spaceNo)) {
					this.runCpcwh(2, spaceNo);
				}
			},
			//判断泊位号是否输入完整 return true/false
			isSpaceNoFlag(spaceNo) {
				if (!spaceNo) {
					spaceNo = this.scwh.spaceNo;
				}
				if (spaceNo.replace(/\s+/g, "").length > 4) {
					return true;
				} else {
					return false;
				}
			},
			//车牌改变时
			plateNoChange(plateNo) {
				if (this.scp.plateNo == plateNo) return;
				//判断是否是历史车牌，是历史车牌则要选中，不是则改变值
				let plateNoActiveIndex = -1;
				let plateNoList = this.scp.plateNoList;
				for (var i = 0; i < plateNoList.length; i++) {
					if (plateNoList[i] == plateNo.replace(/\s+/g, "")) {
						plateNoActiveIndex = i;
						break;
					}
				}
				if (plateNoActiveIndex != -1) {
					this.clikehistoryPlateNo(plateNoActiveIndex);
				} else {
					this.scp.plateNoActiveIndex = plateNoActiveIndex;
					this.scp.plateNo = plateNo;
					if (this.isPlateNoFlag(plateNo)) {
						this.runCpcwh(1, plateNo);
					}
				}
			},
			//新能源提示框状态改变时
			isActiveShowChange(flag) {
				this.scp.activeShow = flag;
			},
			//当点击历史车牌时
			clikehistoryPlateNo(plateNoActiveIndex) {
				let plateNo = this.scp.plateNoList[plateNoActiveIndex];
				if (plateNo.length != 8) {
					this.scp.activeShow = true;
				} else {
					this.scp.activeShow = false;
				}
				this.scp.plateNo = plateNo;
				this.scp.plateNoActiveIndex = plateNoActiveIndex;
				this.runCpcwh(1, plateNo);
			},
			//判断车牌号号是否输入完整 return true/false
			isPlateNoFlag(plateNo) {
				if (!plateNo) {
					plateNo = this.scp.plateNo;
				}
				let flag = true;
				for (var i = 0; i < 7; i++) {
					if (plateNo.slice(i, i + 1) == " ") {
						flag = false;
						break;
					}
				}
				let str = plateNo.replace(/\s+/g, "");
				if (flag && str.length > 6) {
					//车牌号输入完整时
					return true;
				} else {
					//车牌号没有输入完整时
					return false;
				}
			},

			// 关于停车时间的方法
			//改变时间
			parkingTimeChange(parkingTime) {
				if (this.stp.parkingTime == parkingTime) return;
				this.stp.parkingTime = parkingTime;
				let parkingTimeActiveIndex = -1;
				let parkingTimeList = this.stp.parkingTimeList;
				for (var i = 0; i < parkingTimeList.length; i++) {
					if (parkingTimeList[i] == parkingTime) {
						parkingTimeActiveIndex = i;
						break;
					}
				}
				this.stp.parkingTimeActiveIndex = parkingTimeActiveIndex;
				this.runCpcwh(3, parkingTime);
			},
			//点击时间
			clikeParkingTime(parkingTimeActiveIndex) {
				let parkingTime = this.stp.parkingTimeList[parkingTimeActiveIndex];
				this.parkingTimeChange(parkingTime);
			},
			//点击收费标准或者付费方式时
			clikeTips(index) {
				switch (index) {
					//点击收费标准时
					case 1:
						//判断泊位号是否输入完整
						if (this.isSpaceNoFlag()) {
							// 此处ajax判断车位是否存在,存在的情况下查询返回收费规则,正确返回收费规则，异常信息返回"车位不存在！"
							this.$http.request({
								url: "/wx/findChargingStandard",
								data: {
									spaceNo: this.scwh.spaceNo
								},
								dataType: 'json',
								success: (res) => {
									if (res.data.success) {
										this.openShowTips(1, res.data.chargingStandard);
										return;
									}
								}
							})
						} else {
							this.openShowTips(0, "请输入泊位号后再查询收费规则！");
						}
						break;
						//点击付费方式时
					case 2:
						this.openShowTips(2, null);
						break;
				}
			},
			// 选择车牌号或泊位号或时长时触发的请求数据,参数=1车牌号-车位号,2车位号-车牌号,3时长
			runCpcwh(t, r) {
				if (t == 1) {
					// 1车牌号-车位号
					let plateNo = r ? r : this.scp.plateNo;
					let spaceNo = null;
					if (this.isSpaceNoFlag()) {
						spaceNo = this.scwh.spaceNo;
					}
					// testTips("1车牌号["+plateNo+"]-车位号["+spaceNo+"]");
					this.$http.request({
						url: "/wx/jsonSelectCpcw",
						data: {
							plateNo: plateNo,
							spaceNo: spaceNo,
							priority: 0 //优先级判断
						},
						dataType: 'json',
						success: (res) => {
							let data = res.data;
							if (data.success) {
								// console.log("t: " + t);
								// console.log(data);
								this.applyData(t, data);
							} else {
								this.openShowTips(0, data.errorText);
							}
						},
						fail: (res) => {
							console.log(res);
						}
					})
				} else if (t == 2) {
					// 2车位号-车牌号
					let spaceNo = r ? r : this.scwh.spaceNo;
					let plateNo = null;
					if (this.isPlateNoFlag()) {
						plateNo = this.scp.plateNo;
					}
					this.$http.request({
						url: "/wx/jsonSelectCpcw",
						data: {
							plateNo: plateNo,
							spaceNo: spaceNo,
							priority: 1 //优先级判断
						},
						dataType: 'json',
						success: (res) => {
							let data = res.data;
							if (data.success) {
								// console.log("t: " + t);
								this.applyData(t, data);
							} else {
								this.openShowTips(0, data.errorText);
							}
						},
						fail: (res) => {
							console.log(res);
						}
					})
				} else if (t == 3) {
					// 3时长
					if (this.wxData.lRule1Id != null && this.wxData.lRule1Id != undefined && this.wxData.lRule1Id != "0") {
						this.$http.request({
							url: "/wx/jsonBuyHours",
							data: {
								lRule1Id: this.wxData.lRule1Id,
								lTime1: this.wxData.lTime1,
								lTime2: this.wxData.lTime2,
								lPayTime: this.wxData.lPayTime,
								dBuyHours: r
							},
							dataType: 'json',
							success: (res) => {
								let data = res.data;
								if (data.success) {
									// console.log("t: " + t);
									// console.log(data);
									this.applyData(t, data);
								} else {
									this.openShowTips(0, data.errorText);
								}
							},
							fail: (res) => {
								console.log(res);
							}
						})
					}
				}
			},
			// 根据不同情形处理微信数据wxData，参数t为处理情形，0-进入页面时,1-车牌号-车位号,2-车位号-车牌号,3-时长
			applyData(t, d) {
				// 0-enter
				// 1车牌号-车位号
				// 2车位号-车牌号
				// 3时长
				var dr = d.result;
				// console.log("applyData-result["+t+"] > ");
				// console.log(dr);
				// iErrCode & sErrInfo
				this.wxData.iErrCode = dr.iErrCode;
				this.wxData.sErrInfo = dr.sErrInfo;
				// console.log("this.wxData.sErrInfo:"+this.wxData.sErrInfo);
				if (this.wxData.sErrInfo) {
					this.openShowTips(0, this.wxData.sErrInfo);
				}
				if (this.wxData.iErrCode != 0) {
					// 不处理其他数据
					// console.log("applyData-wxData["+t+"] > ");
					// console.log(wxData);
					return;
				}
				// plates
				if (t == 0) {
					// 0-enter
				}
				// iCustCanOrder
				if (dr.iCustCanOrder != null && dr.iCustCanOrder != undefined) {
					this.wxData.iCustCanOrder = dr.iCustCanOrder;
				}
				// sPlateNo & sSpaceNo
				if (dr.sPlateNo != null && JSON.stringify(dr.sPlateNo) != "{}") {
					this.wxData.sPlateNo = dr.sPlateNo;
					this.plateNoChange(dr.sPlateNo);
				}
				if (dr.sSpaceNo != null && JSON.stringify(dr.sSpaceNo) != "{}") {
					this.wxData.sSpaceNo = dr.sSpaceNo;
					this.spaceNoChange(dr.sSpaceNo);
				}
				// lOrderId & ...
				let bNotAllowOrder = false;
				if (t == 1 || t == 2) {
					// 1车牌号-车位号/2车位号-车牌号
					// if(wxData.sSpaceNo!=null&&wxData.sSpaceNo!=undefined&&wxData.sSpaceNo.length>0) {
					if (this.isSpaceNoFlag()) {
						// 有完整车位号
						if (dr.lRule1Id != null && dr.lRule1Id != undefined && dr.lRule1Id != "0") {
							this.wxData.lOrderId = dr.lOrderId; // 有订单
							this.wxData.iSpecial = dr.iSpecial; // 特殊车牌
							this.wxData.lRule1Id = dr.lRule1Id;
							this.wxData.dPayable = dr.dPayable;
							this.wxData.dNowDebt = dr.dNowDebt;
							this.wxData.dBuyHours = dr.dBuyHours;
							this.wxData.dBuyMoney = dr.dBuyMoney;
							this.wxData.lTime1 = dr.lTime1;
							this.wxData.lTime2 = dr.lTime2;
							this.wxData.lPayTime = dr.lPayTime;
							this.wxData.lToTime1 = dr.lToTime1;
							this.wxData.sToTime1 = dr.sToTime1;
							this.wxData.lToTime2 = dr.lToTime2;
							this.wxData.sToTime2 = dr.sToTime2;
							this.wxData.hisDebt = dr.hisDebt;
						}
						if (this.wxData.iCustCanOrder == 0) {
							// iCustCanOrder=0无订单禁止客户下单
							if (this.wxData.lOrderId != null && this.wxData.lOrderId != undefined) {
								// lOrderId=0表示无订单
								bNotAllowOrder = this.wxData.lOrderId == 0;
							} else if (this.isPlateNoFlag()) {
								// 车牌号也完整
								bNotAllowOrder = true;
							}
						}
					} else {
						// 无完整车位号
						this.fireWhenNoCwh();
					}
				} else if (t == 3 && dr.lRule1Id != null && dr.lRule1Id != undefined && dr.lRule1Id != "0") {
					//3时长:必有计费规则
					this.wxData.lRule1Id = dr.lRule1Id;
					this.wxData.dBuyHours = dr.dBuyHours;
					this.wxData.dBuyMoney = dr.dBuyMoney;
					this.wxData.lTime1 = dr.lTime1;
					this.wxData.lTime2 = dr.lTime2;
					this.wxData.lPayTime = dr.lPayTime;
					this.wxData.lToTime1 = dr.lToTime1;
					this.wxData.sToTime1 = dr.sToTime1;
					this.wxData.lToTime2 = dr.lToTime2;
					this.wxData.sToTime2 = dr.sToTime2;
				}
				if (bNotAllowOrder) {
					// 不能下单
					this.disableCanOrder();
				} else {
					// 可以下单
					this.enableCanOrder(true);
				}
				// console.log("applyData-wxData[" + t + "] > ");
				// console.log(this.wxData);
			},
			// 没有泊位号时触发清除微信数据
			fireWhenNoCwh() {
				delete this.wxData.lOrderId;
				delete this.wxData.iSpecial;
				delete this.wxData.lRule1Id;
				delete this.wxData.dPayable;
				delete this.wxData.dNowDebt;
				delete this.wxData.dBuyHours;
				delete this.wxData.dBuyMoney;
				delete this.wxData.lTime1;
				delete this.wxData.lTime2;
				delete this.wxData.lPayTime;
				delete this.wxData.lToTime1;
				delete this.wxData.sToTime1;
				delete this.wxData.lToTime2;
				delete this.wxData.sToTime2;
			},
			// 使得禁止下单
			disableCanOrder() {
				// 不能下单
				this.stp.enable = false;
				this.stp.disableCan = false;
				this.stp.parkingTime = 0;
				this.stp.parkingTimeActiveIndex = -1;
				this.showOrHideMoneyTips(0, false);
				this.showOrHideMoneyTips(2, false);
			},
			// 使得可以下单
			enableCanOrder(reset_dBuyHours) {
				if (reset_dBuyHours) {
					this.parkingTimeChange(this.wxData.dBuyHours || 0);
					this.stp.disableCan = true;
				}
				this.stp.enable = true;
				if (this.wxData.dPayable != null && this.wxData.dPayable != undefined && this.wxData.dPayable > 0) {
					this.showOrHideMoneyTips(0, true);
				} else {
					this.showOrHideMoneyTips(0, false);
				}
				if (this.wxData.dPayable != null && this.wxData.dPayable != undefined && this.wxData.dPayable == 0 && this.wxData.dBuyHours !=
					null && this.wxData.dBuyHours != undefined && this.wxData.dBuyHours > 0) {
					this.showOrHideMoneyTips(1, true);
				} else {
					this.showOrHideMoneyTips(1, false);
				}

				if (this.wxData.dBuyHours != null && this.wxData.dBuyHours != undefined && this.wxData.dBuyHours > 0 && this.wxData
					.dPayable != null && this.wxData.dPayable != undefined && this.wxData.dPayable != 0) {
					this.showOrHideMoneyTips(2, true);
				} else {
					this.showOrHideMoneyTips(2, false);
				}
				this.stp.payMoney = this.getWxDFee();
			},
			// 针对选择车牌号与泊位号后显示的消息: INFO_TEMPL_0/INFO_TEMPL_1/INFO_TEMPL_2
			showOrHideMoneyTips(type, flag) {
				switch (type) {
					case 0:
						if (flag) {
							this.tips.moneyTips0 = INFO_TEMPL_0.replace("%dPayable%", this.wxData.dPayable / 100.0).replace("%sToTime1%",
								this.wxData.sToTime1).replace("%dNowDebt%", this.wxData.dNowDebt / 100.0);
						} else {
							this.tips.moneyTips0 = '';
						}
						break;
					case 1:
						if (flag) {
							this.tips.moneyTips1 = INFO_TEMPL_1.replace("%dBuyHours%", this.wxData.dBuyHours).replace("%dBuyMoney%", this.wxData
								.dBuyMoney / 100.0).replace("%sToTime2%", this.wxData.sToTime2);
						} else {
							this.tips.moneyTips1 = '';
						}
						break;
					case 2:
						if (flag) {
							this.tips.moneyTips2 = INFO_TEMPL_2.replace("%dBuyHours%", this.wxData.dBuyHours).replace("%dBuyMoney%", this.wxData
								.dBuyMoney / 100.0).replace("%sToTime2%", this.wxData.sToTime2);
						} else {
							this.tips.moneyTips2 = '';
						}
						break;
				}
			},
			// 获取微信支付费用
			getWxDFee() {
				let dFee = this.wxData.dNowDebt;
				if (isNaN(dFee)) {
					dFee = 0;
				}
				if (this.wxData.dBuyMoney != null && this.wxData.dBuyMoney != undefined) {
					if (dFee == null || dFee == undefined) {
						dFee = this.wxData.dBuyMoney;
					} else {
						dFee += this.wxData.dBuyMoney;
					}
				}
				return dFee;
			},
			//点击支付时
			gopay() {
				let plateNo = null;
				if (this.isPlateNoFlag()) {
					plateNo = this.scp.plateNo;
				} else if (this.wxData.iSpecial == iSpecial_NO_PLATE) {
					plateNo = this.wxData.sPlateNo;
				}
				let spaceNo = null;
				if (this.isSpaceNoFlag()) {
					spaceNo = this.scwh.spaceNo;
				}
				if (plateNo == null || spaceNo == null) {
					return false;
				}
				let bNotAllowOrder = false;
				let orderId = null;
				if (this.wxData.lOrderId != null && this.wxData.lOrderId != undefined) {
					// lOrderId=0表示无订单
					// iCustCanOrder=0无订单禁止客户下单
					orderId = this.wxData.lOrderId;
					bNotAllowOrder = orderId == "0" && this.wxData.iCustCanOrder == 0;
				} else {
					// iCustCanOrder=0无订单禁止客户下单
					bNotAllowOrder = this.wxData.iCustCanOrder == 0;
				}
				if (bNotAllowOrder) {
					return false;
				} else if (orderId == null) {
					orderId = 0;
				}
				let dFee = this.getWxDFee();
				if (dFee == null || dFee == undefined || dFee <= 0) {
					return false;
				}
				// console.log("gopay:orderId="+orderId+",dFee="+dFee);
				let params = {
					plateNo: plateNo,
					spaceNo: spaceNo,
					orderId: orderId,
					lRule1Id: this.wxData.lRule1Id,
					amount: dFee
				};
				this.$http.request({
					url: "/wx/jsonPreparePay",
					data: params,
					method: "POST",
					dataType: 'json',
					success: (res) => {
						let data = res.data;
						if (data.success) {
							if (data.useCounter) {
								// 有收银台-页面跳转到支付界面
								let ss = [];
								for (let n in params) {
									if (params[n] != null && params[n] != undefined) {
										ss.push(n + "=" + encodeURIComponent(params[n]));
									}
								}
								ss.push("busicom_name=" + encodeURIComponent(data.busicom_name));
								uni.navigateTo({
									url: 'tingcheCashier?' + ss.join("&") + "&counters=" + JSON.stringify(data.counters) + "&dbuyhours="+this.stp.parkingTime
								})
							} else {
								// 无收银台-直接支付
								// console.log("发起支付");
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: {
										appid: data.prepayInfo.appid,
										noncestr: data.prepayInfo.nonce_str,
										package: data.prepayInfo['package'],
										partnerid: data.prepayInfo.partnerid,
										prepayid: data.prepayInfo.prepayid,
										timestamp: Number(data.prepayInfo.timestamp),
										sign: data.prepayInfo.sign
									},
									success: (res) => {
										this.$api.msg("支付成功");
										uni.navigateBack({
											delta: 1
										})
									},
									fail: (res) => {
										this.$api.msg("支付失败");
									}
								})
							}
						} else {
							this.openShowTips(0, data.errorText);
						}
					},
					fail: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-decoration {
		text-decoration: underline;
	}

	.showTips {
		font-size: 45rpx;
		padding: 15rpx;
		width: 750rpx;
	}

</style>
