<template>
	<view class="homeWorkPageDetail">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				消息详情
			</view>
		</fu-custom>
		
		<fu-loading v-if="showLoading"></fu-loading>
		<view v-else>
			<view class="homeWorkPageDetailTitle">{{title}}</view>
			<view class="text-sm " style="color: #5C707E;margin-top: 32rpx;padding: 0 24rpx;">{{add_time}}</view>
			<view style="height: 16rpx;"></view>
			<view class="homeWorkPageDetailContent">
				<jyf-parser :html="bodyContent"></jyf-parser>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading:false,
				bodyContent:'',
				title:'',
				add_time:''
			}
		},
		onLoad(options) {
			this.operationgetarticledetail(options.id)
			// setTimeout(() => {
			// 	this.showLoading = false;
			// },700)
		},
		methods:{
			operationgetarticledetail(id) {
				this.showLoading = true;
				this.$api.post(global.apiUrls.operationgetarticledetail, {
				  id:id,
				}).then(res =>{
					if(res.data.code == 1) {
						 this.showLoading = false;
						 this.title = res.data.data.title || '';
						 this.add_time = res.data.data.add_time || '';
						 this.bodyContent = res.data.data.body || '';
					} else {
						this.$message.info(res.data.msg)
					}
					this.showLoading = false;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.homeWorkPageDetail {
		min-height: 100vh;
		background: #fff;
	}
	
	.homeWorkPageDetailTitle {
		padding: 32rpx 24rpx 0;
		color: #36373D;
		font-weight: 500;
		font-size: 36rpx;
	}
	
	.homeWorkPageDetailContent {
		// margin-top: 24rpx;
		padding: 24rpx;
		font-size: 28rpx;
		color: #868686;
		line-height: 40rpx;
	}
</style>