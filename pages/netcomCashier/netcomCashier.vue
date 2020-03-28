<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		// onReady() {
		// 	var pages = getCurrentPages();
		// 	var page = pages[pages.length - 1];
		// 	var currentWebview = page.$getAppWebview();
		// 	var tn = currentWebview.getStyle().titleNView;
		// 	console.log(tn);
		// 	tn.titleText = "一网通";
		// 	currentWebview.setStyle({
		// 	    titleNView: tn
		// 	});
		// },
		onLoad(data) {
			let message = JSON.parse(data.message);
			message.return_url = "http://baidu.com";
			message = JSON.stringify(message);
			this.url = 'http://test.ggzf.sh.gov.cn/UnifiedPayWebFront/consume/consumeService.do?jsonParams=' + message.replace(
				"\"", "%22").replace("{", "%7b").replace("}", "%7d");
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
