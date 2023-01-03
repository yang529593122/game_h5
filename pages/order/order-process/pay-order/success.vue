<template>
	<view>
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				支付结果
			</view>
		</fu-custom>
		<fu-popup mode="center" v-model="isShowPopup">
					<view class="bg-white" style="width: 580rpx;height: 341rpx;border-radius: 4rpx;">
						<view class="text-center text-lg text-weight-500" style="padding: 40rpx 0 32rpx;color: #36373D;">温馨提示</view>
						<!-- 全款 -->
						<view style="height: 80rpx;margin-bottom: 40rpx;padding: 0 26rpx;color: #868686;" class="text-df" v-if="isfenqi == 2">订单需等待后台客服审核是否予以通过。若未能通过分期申请号款会自动退回。</view>
						<!-- 分期 -->
						<view style="height: 80rpx;margin-bottom: 40rpx;padding: 0 26rpx;color: #868686;" class="text-df" v-if="isfenqi == 1">分期订单需等待后台客服审核是否予以通过。若未能通过分期申请号款会自动回</view>
						<view class="flex align-center justify-center">
							<view style="width: 188rpx;
		height: 64rpx;
		background: #659BC7;border-radius: 4rpx;line-height: 64rpx;" @click="gotoBack()" class="text-center text-weight-500 text-white">确认</view>
						</view>
					</view>
				</fu-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowPopup:false,
				isfenqi:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.isfenqi = uni.getStorageSync('isfenqi') || '';
			this.isShowPopup = true;
		},
		methods:{
			gotoBack() {
				this.isShowPopup = false;
				uni.setStorageSync('isfenqi','');
				// #ifdef H5
				window.history.back(-1);
				// #endif
				return;
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
</style>