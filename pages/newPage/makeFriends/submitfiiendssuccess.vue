<template>
	<view class="publishSuccessPages">
		<fu-custom isBack bgColor="bg-white">
      <view slot="content" v-if="type==='gj'">
        支付成功
      </view>
			<view slot="content" v-else>
				支付结果
			</view>
		</fu-custom>
    <view class="gj-content" v-if="type==='gj'">
      <view class="">
        sjdf
      </view>
    </view>
    <block v-else>
      <view class="flex align-center justify-center" style="margin-top: 147rpx;">
      	<image src="./static/paysuee.png" style="width: 250rpx;height: 180rpx;"></image>
      </view>

      <view class="text-center" style="margin-top: 40rpx;">
      	<!-- 商品发布成功，等待平台审核 -->
      	支付成功
      </view>

    </block>


		<view class="flex align-center justify-center" style="margin-top: 180rpx;">
			<view class="text-center text-df" style="width: 280rpx;color: #DFE6EB;
height: 72rpx;
background: #295B7B;line-height: 72rpx;" @click="gotoList()">查看发布</view>
		</view>
    <view class="flex align-center justify-center" style="margin-top: 40rpx;">
    			<view class="text-center text-df" style="width: 280rpx;color: #DFE6EB;
    height: 72rpx;
  line-height: 72rpx;border:1rpx solid #295B7B;color: #295B7B;" @click="returnPage">交友列表</view>
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
				this.$urouter.redirectTo('/pages/newPage/makeFriends/publishedSocial');
			},
      returnPage(){
        this.$urouter.redirectTo('/pages/newPage/makeFriends/makeFriends');
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
