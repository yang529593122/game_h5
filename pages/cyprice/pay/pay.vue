<template>
	<view class="publishSuccessPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				支付结果
			</view>
		</fu-custom>

		<view class="flex align-center justify-center" style="margin-top: 147rpx;">
			<image src="../static/3.png" style="width: 250rpx;height: 180rpx;"></image>
		</view>

		<view class="text-center" style="margin-top: 40rpx;">
			支付成功
		</view>
    <view class="text-center" style="margin-top: 40rpx;">
    	支付方式: 余额支付
    </view>
   <!-- <view class="text-center" style="margin-top: 40rpx;">
    	支付时间: {{ new Date() }}
    </view> -->

		<view class="flex align-center justify-center" style="margin-top: 100rpx;">
			<view class="text-center text-df" style="width: 280rpx;color: #DFE6EB;
height: 72rpx;
background: #295B7B;line-height: 72rpx;" @click="goDetails">查看申请</view>
		</view>
    <view class="flex align-center justify-center" style="margin-top: 20rpx;">
    			<view class="text-center text-df" style="width: 280rpx;color: #DFE6EB;
    height: 72rpx;
    border:1rpx solid #295B7B; color:#295B7B; line-height: 72rpx;" @click="returnIndex">返回首页</view>
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
      returnIndex(){
        this.$urouter.switchTab('/pages/tab/home/shopindex/index');
      },
			goDetails() {
        this.$urouter.navigateTo('/pages/bargaining/applyFor/applyFor');
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
