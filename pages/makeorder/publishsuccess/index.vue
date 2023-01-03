<template>
	<view class="publishSuccessPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				发布结果
			</view>
		</fu-custom>
		
		<view class="flex align-center justify-center" style="margin-top: 147rpx;">
			<image src="../static/3.png" style="width: 250rpx;height: 180rpx;"></image>
		</view>
		
		<view class="text-center" style="margin-top: 40rpx;">
			商品发布成功，等待平台审核
		</view>
		
		<view class="flex align-center justify-center" style="margin-top: 180rpx;">
			<view class="text-center text-df" style="width: 280rpx;color: #DFE6EB;
height: 72rpx;
background: #295B7B;line-height: 72rpx;" @click="gotoList()">查看发布</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'1'
			}
		},
		onLoad(options) {
			this.type = options.type;
		},
		methods:{
			gotoList() {
				if(this.type == 1) {
					
					this.$urouter.redirectTo('/pages/order/order-list/myrecover');
					// /pages/order/order-list/myrecover
				} else {
					this.$urouter.redirectTo('/pages/order/order-list/saleindex');
				}
			}
		}
	}
</script>

<style scoped lang="scss"> 
.publishSuccessPages {
	min-height: 100vh;
	background: #fff;
}
</style>