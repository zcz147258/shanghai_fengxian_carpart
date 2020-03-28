<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar bg-blue search" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @tap="tapSearch" v-model="searchText" :adjust-position="false" type="text" :placeholder="dataType == 1 ? '搜索道路' : '搜索场库'" disabled confirm-type="search"></input>
				</view>
				<view class="action">
					<text class="cuIcon-close" @tap="clean"></text>
				</view>
			</view>
		</view>
		
		<view class="animated fadeIn slow">
			<view class="content">
				<map style="width: 100%; height: 100vh;" id="navmap" :scale="scal" :latitude="latitude" :longitude="longitude"
				 :markers="covers" :controls="controls" :polyline="polyline" @tap="tapMap" @controltap="changp" @markertap="clickbj"
				 :show-compass="true">
					<cover-view class="bubble1" v-show="dis"></cover-view>
					<cover-view class="bubble lu" v-show="dis">
						{{ bot_data.id }}
					</cover-view>
					<cover-view class="bubble distance" v-show="dis">
						{{ calcdistance }}
					</cover-view>
					<cover-view class="bubble sum" v-show="dis">
						总车位数:{{ bot_data.total }}
					</cover-view>
					<cover-view class="bubble last" v-show="dis">
						剩余车位数:{{ bot_data.free }}
					</cover-view>
					<cover-image :src="dis ? '../../static/position/turn.png' : ''" @tap="turnapp" class="turnto" style="z-index: 99;"></cover-image>
					<cover-view class="bubble title" v-show="dis">
						(仅供参考)
					</cover-view>

				</map>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				dataType: 1,//1道路2场库
				type: 'center',
				scal: 16,
				dis: false,
				/* 控制显示与隐藏 */
				bot_data: {
					id: '',
					latitude: '',
					longitude: '',
					total: '',
					free: ''
				},
				title: 'map',
				latitude: 39.90,
				longitude: 116.39,
				/* 中心点的地址 */
				centeraddress: '',
				/* 标记点 */
				covers: [],
				myPosition: {
					id: '1',
					latitude: '',
					longitude: '',
					iconPath: '../../static/tabbar/naber1.png',
					label: { //为标记点旁边增加标签
						content: '你的位置', //文本
						color: 'black', //文本颜色
						anchorX: 0, //label的坐标，原点是 marker 对应的经纬度
						anchorY: -80, //label的坐标，原点是 marker 对应的经纬度 
						// 					    x:39.909,//这个组件微信在1.2.0以后就废弃了
						// 					    y:116.39742,
						bgColor: '#fff', //背景色
						padding: 5, //文本边缘留白
						borderWidth: 1, //边框宽度
						borderColor: '#D84C29', //边框颜色							
						textAlign: 'right' //文本对齐方式。
					}
				},
				/* 连接路线 */
				polyline: [],
				/* 控件 */
				controls: [{
						id: 'p',
						position: {
							left: 30,
							top: this.CustomBar + 30,
							width: 40,
							height: 40
						},
						iconPath: '../../static/position/1.png',
						clickable: true
					},
					{
						id: 'jia',
						position: {
							left: this.ScreenWidth - 40,
							top: this.ScreenHeight - this.CustomBar - 165,
							width: 35,
							height: 35
						},
						iconPath: '../../static/position/jia.png',
						clickable: true
					},
					{
						id: 'jian',
						position: {
							left: this.ScreenWidth - 40,
							top: this.ScreenHeight - this.CustomBar - 125,
							width: 35,
							height: 35
						},
						iconPath: '../../static/position/jian.png',
						clickable: true
					}
				],
				mockdata: [],
				setTimeoutFlag: true, //场库停车与道路停车控件的开关
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			if(this.searchText){
				this.getroad(this.searchText);
			}
		},
		onLoad() {
			this.covers.push(this.myPosition);
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				/* 返回gps坐标 */
				success: (res) => {
					this.centeraddress = res.address.poiName;

					this.latitude = res.latitude /* 设立原点坐标 */
					this.longitude = res.longitude /* 设立原点坐标 */
					/* 标记原点坐标 */
					this.myPosition.latitude = res.latitude
					this.myPosition.longitude = res.longitude
				}
			});
			/* 获取数据 */
			this.getinfo()
			/* 将拿到的标点数据放进去 */
		},
		methods: {
			...mapMutations(['changeSearchText']),
			//清除搜索文字
			clean(){
				this.changeSearchText("");
			},
			//点击搜索时
			tapSearch(){
				//让详细弹出层消失
				this.dis = false;
				
				uni.navigateTo({
					url: './search?dataType='+this.dataType+"&searchText="+this.searchText
				})
			},
			//点击地图时
			tapMap() {
				//让详细弹出层消失
				this.dis = false;
			},
			/* 获取路 */
			getroad(searchText) {
				if(this.dataType == 1){
					this.$http.request({
						url: '/wx/jsonQueryPlace',
						data: {
							"longitudef": this.longitude,
							"latitudef": this.latitude,
							"roadName": searchText,
							"pageSize": "100"
						},
						success: (res) => {
							console.log(res)
							if(res.data.success){
								if (res.data.result.jaRoads.length > 0) {
									this.longitude = res.data.result.jaRoads[0].fLng0;
									this.latitude = res.data.result.jaRoads[0].fLat0;
								} else {
									this.$api.msg('未查询相应结果');
								}
							}else{
								this.$api.msg(res.data.errorText);
							}
							
					
						}
					})
				}else{
					// 此处写查询场库的方法
					this.$api.msg('暂时无法搜索');
					// this.$http.request({
					// 	url: '/wx/jsonParkLotList',
					// 	data: {
					// 		"longitudef": this.longitude,
					// 		"latitudef": this.latitude,
					// 		"parkLots": searchText,
					// 		"pageSize": "100"
					// 	},
					// 	success: (res) => {
					// 		console.log(res);
					// 		if (res.data.result.parkLots.length > 0) {
					// 			this.longitude = res.data.result.parkLots[0].fLng0;
					// 			this.latitude = res.data.result.parkLots[0].fLat0;
					// 		} else {
					// 			this.$api.msg('未查询相应结果');
					// 		}
					
					// 	}
					// })
				}
			},
			/* 获取数据信息 */
			getinfo() {
				let url = '';
				if(this.dataType == 1){
					url = '/wx/jsonQueryPlace';
				}else{
					url = '/wx/jsonParkLotList';
				}
				this.$http.request({
					url: url,
					data: {
						"longitudef": this.longitude,
						"latitudef": this.latitude,
						"pageSize": "100"
					},
					success: (res) => {
						if (res.data.success) {
							let mockdata = [];
							let items = [];
							if(this.dataType == 1){
								items = res.data.result.jaRoads;
							}else{
								items = res.data.result.parkLots;
							}
							items.forEach((item, index) => {
								let obj = {};
								if(this.dataType == 1){
									obj.id = item.sRoadName;
									obj.latitude = item.fLat0;
									obj.longitude = item.fLng0;
									obj.free = item.iFreeNum;
									obj.total = item.iTotalNum;
								}else{
									obj.id = item.park_name;
									obj.latitude = item.lat_enter;
									obj.longitude = item.lng_enter;
									obj.free = item.free_num;
									obj.total = item.total_num;
								}
								obj.address = item.address;
								obj.iconPath = '../../static/position/position.png';
								mockdata.push(obj);
							})
							this.mockdata = mockdata;
							/* 把数据放入cover */
							this.covers = mockdata;
							this.covers.push(this.myPosition);
						}else{
							this.$api.msg(res.data.errorText);
						}
					}
				})
			},
			/* 改变p1,p2 */
			changp(e) {
				//让详细弹出层消失
				this.dis = false;
				// this.$refs['showtip'].open();
				/* 控制p的图标变化事件 */
				if (e.controlId == "p") {
					if (this.setTimeoutFlag) {
						
						this.setTimeoutFlag = false;
						setTimeout(() => {
							this.setTimeoutFlag = true;
						}, 3000);
						
						if (this.dataType == 1) {
							this.dataType = 2;
							this.$api.msg("已切换至场库停车");
							this.controls[0].iconPath = '../../static/position/2.png';
						} else {
							this.dataType = 1;
							this.$api.msg("已切换至道路停车");
							this.controls[0].iconPath = '../../static/position/1.png';
						}
						this.getinfo();
					} else {
						this.$api.msg("您点击太快了");
					}
				};
				if (e.controlId == "jia") {
					this.scal++;
					if (this.scal > 18) {
						this.scal = 18;
					}
				}
				if (e.controlId == "jian") {
					this.scal--;
					if (this.scal < 5) {
						this.scal = 5;
					}
				}
			},
			/* 点击标记点触发 */
			turnapp() {
				let bot_data = this.bot_data;
				uni.openLocation({
					latitude: bot_data.latitude,
					longitude: bot_data.longitude,
					name: bot_data.id,
					address: bot_data.address
				})
			},
			clickbj(res) {
				if(res.markerId == '1') return this.dis = false;
				uni.showLoading({
					title: '加载中...',
					success: () => {
						this.dis = false;
					}
				})
				setTimeout(() => {
					uni.hideLoading();
					this.covers.forEach((item, index) => {
						if (res.markerId == item.id) {
							this.bot_data = {
								latitude: item.latitude,
								longitude: item.longitude,
								id: item.id,
								free: item.free,
								total: item.total,
								address: item.address
							}
						}
					})
					if(this.bot_data.id != '1') {
						this.dis = true;
					}
					
				}, 500)
			},
			/* 计算两点之间的距离 */
			distance(lat1, lng1, lat2, lng2) {
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				return s;
			}
		},
		computed: {
			...mapState(['searchText']),
			calcdistance() {
				let distance1 = this.distance(this.myPosition.latitude,
					this.myPosition.longitude, this.bot_data.latitude, this.bot_data.longitude);
				return distance1.toFixed(1) + 'km'
			},
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100vh;
	}

	.turnto {
		position: absolute;
		bottom: calc(var(--window-bottom) + 145px);
		left: 615upx;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		/* display: none; */
		/* background-color: #007AFF; */
	}

	.bubble {
		position: absolute;
	}

	.bubble1 {
		position: absolute;
		background-color: white;
		bottom: calc(var(--window-bottom) + 95px);
		width: 90%;
		margin-left: 5%;
		height: 200upx;
		border-radius: 8upx;
		box-shadow: 0px 0px 8px 3px #000000;
	}

	.lu {
		color: #373737;
		font-size: 36upx;
		bottom: calc(var(--window-bottom) + 145px);
		left: 55upx;
		width: 450upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.distance {
		color: #787878;
		font-size: 30upx;
		bottom: calc(var(--window-bottom) + 145px);
		left: 540upx;
	}

	.sum {
		color: #999999;
		font-size: 33upx;
		bottom: calc(var(--window-bottom) + 110px);
		left: 55upx;
	}

	.last {
		color: #2AC517;
		font-size: 33upx;
		bottom: calc(var(--window-bottom) + 110px);
		left: 290upx;
	}

	.title {
		color: #9F9F9F;
		font-size: 30upx;
		bottom: calc(var(--window-bottom) + 112px);
		left: 530upx;
	}
</style>
