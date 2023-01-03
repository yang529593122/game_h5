<template>
	<view class="homeWorkPageDetail">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				业务详情
			</view>
		</fu-custom>
		
		<fu-loading v-if="showLoading"></fu-loading>
		<view v-else>
			<view class="homeWorkPageDetailTitle">{{title}}</view>
			<view class="homeWorkPageDetailContent">
				<jyf-parser :html="Symicbody"></jyf-parser>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading:false,
				id:'',
				Symicbody:'',
				title:''
			}
		},
		onLoad(options) {
			this.id = options.id || '';
			this.gamearticleinfo();
		},
		methods:{
			gamearticleinfo() {
				this.showLoading = true;
				this.$api.post(global.apiUrls.gamearticleinfo,{
					article_id:this.id
				}).then(res => {
					if(res.data.code == 1) {
						this.title = res.data.data.title || '';
						this.Symicbody = res.data.data.body || '';
					} else {
						this.$message.info(res.data.msg);
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