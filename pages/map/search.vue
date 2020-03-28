<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar bg-blue search" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="back">
					<text class="cuIcon-back"></text>
				</view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="searchText" :adjust-position="false" type="text" :placeholder="dataType == 1 ? '搜索道路' : '搜索场库'" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="cu-bar bg-white solid-bottom">
				<view class='action'>
					<text class='cuIcon-title text-blue'></text>热门搜索
				</view>
			</view>
			<view class="padding bg-white solid-bottom tag">
				<block v-for="(item,index) in hotroad" :key="index">
					<view class='cu-tag' @tap="inputer(item.title)">{{item.title}}</view>
				</block>
				
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class='action'>
					<text class='cuIcon-title text-blue'></text>历史记录
				</view>
			</view>
			<view class="padding bg-white solid-bottom tag">
				<block v-for="(item,index) in history" :key="index">
					<view class='cu-tag' @tap="inputer(item.title)">{{item.title}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				searchText: '',
				hotroad: [],
				history: [
					{
						title: '菜场路'
					}
				],
				dataType: 1
			}
		},
		computed: {
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
		},
		onLoad(e) {
			this.dataType = e.dataType;
			this.searchText = e.searchText;
			if(e.dataType == 1){
				this.hotroad = [
						{
							title: '菜场路'
						},
						{
							title: '新建中路'
						},
						{
							title: '江南路'
						},
						{
							title: '南中路'
						},
						{
							title: '育秀路'
						}
					];
			}else{
				this.hotroad = [
						{
							title: '古华公园'
						},
						{
							title: '西渡停车场'
						},
						{
							title: '绿庭国际大厦停车场'
						}
					];
			}
		},
		onShow() {
			//判断是否登录
			this.$checkLogin();
			let key = "";
			if(this.dataType == 1){
				key = 'roadHistory';
			}else{
				key = 'lotparkingHistory';
			}
			uni.getStorage({
				key: key,
				success:(res)=>{
					this.history = res.data
				}
			})
		},
		methods: {
			...mapMutations(['changeSearchText']),
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			inputer(item){
				this.searchText = item;
				this.search();
			},
			search(){
				let same = false;
				this.history.forEach((item,idnex)=>{
					if(this.searchText == item.title){
						same = true;
					}
				})
				if(!same){
					let obj = {};
					obj.title = this.searchText;
					this.history.push(obj)
				}
				this.changeSearchText(this.searchText);
				let key = '';
				if(this.dataType == 1){
					key = 'roadHistory';
				}else{
					key = 'lotparkingHistory';
				}
				uni.setStorage({
					key: key,
					data: this.history
				})
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #F0F0F0;
	}
</style>
<style scoped>
	.tag view{
		margin-top: 20upx;
		margin-left: 20upx;
	}
	.content{
	}
	.head1{
		display: flex;
		padding-top: 80upx;
		padding-bottom: 8upx;
		background-color: white;
	}
	.head1>view{
		font-size: 60upx;
		margin-left: 20upx;
	}
 .head1 input{
	 margin-left: 20upx;
	width: 65%;
	height: 80upx;
	border: 1px solid rgba(0,0,0,0.4);
	margin-top: 20upx;
	padding-left: 20upx;
	border-radius: 10upx;
	font-size: 35upx;
	margin-top: 10upx;
}
.head1 button{
	margin-top: 18upx;
	margin-left: 15upx;
}

</style>
