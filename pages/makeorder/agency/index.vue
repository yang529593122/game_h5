<template>
	<view class="agencyPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				{{titleName}}
			</view>
		</fu-custom>
		
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="false"></fu-empty-ui>
			<view v-else class="agencyPageContent">
				<jyf-parser :html="agencyPageContent"></jyf-parser>
			</view>
		</block>
	</view>
</template>

<script>
	import richText from '@/common/utils/richText.js';
	export default {
		data() {
			return {
				titleName:'中介担保',
				isShowLoading:false,
				agencyPageContent:``
			}
		},
		onLoad(options) {
			this.isShowLoading = true;
			if(options.type == 1) {
				this.titleName = '中介担保'
				// setTimeout(() => {
				// 	this.isShowLoading = false;
				// },700)
				this.postOperationGetColumn(4)
			} else {
				this.titleName = '交易须知'
				// setTimeout(() => {
				// 	this.isShowLoading = false;
				// },700)
				this.postOperationGetColumn(15)
			}
		},
		methods:{
			postOperationGetColumn(id) {
				this.isShowLoading = true
				this.$api.post(global.apiUrls.gamesystemarticleinfo, {
				  article_id: id,
				}).then(res => {
				  this.isShowLoading = false
				  var res = res.data
				  if (res.code == 1) {
				    this.agencyPageContent = richText.format(res.data.content);
				  } else {
				    this.agencyPageContent = ''
				  }
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.agencyPage {
		min-height: 100vh;
		background: #fff;
	}
	
	.agencyPageContent {
		padding: 24rpx;
		font-size: 28rpx;
		color: #36373D;
	}
</style>