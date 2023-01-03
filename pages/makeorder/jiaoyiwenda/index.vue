<template>
	<view class="jiaoyiwendaPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				交易必看问答
			</view>
		</fu-custom>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listDateList.length"></fu-empty-ui>
			<block v-for="(item,index) in listDateList" :key="index">
				<view style="padding: 36rpx 32rpx 24rpx;color: #36373D;" class="text-lg text-weight-500">
					<image src="../static/4.png" style="width: 30rpx;height: 30rpx;margin-right: 16rpx;"></image>
					{{item.title}}
					</view>
				<view class="" style="line-height: 52rpx;color: #868686;padding: 0 32rpx;" class="text-df">
					<jyf-parser :html="item.body"></jyf-parser>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLoading:false,
				listDateList:[]
			}
		},
		onShow() {
			this.gamesystemarticleinfo();
			// setTimeout(() => {
			// },700)
		},
		methods:{
			gamesystemarticleinfo() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.huoqujiaoyiwendawenzhang,{
					category_id:21
				}).then(res => {
					if(res.data.code == 1) {
						if(res.data.data.data.length) {
							// res.data.data.data.forEach(i => {
							// 	i.body = '答：' + i.body
							// })
						}
						
						 this.listDateList = res.data.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			}
		},
	}
</script>

<style lang="scss">
	.jiaoyiwendaPage {
		min-height: 100vh;
		background: #fff;
	}
</style>