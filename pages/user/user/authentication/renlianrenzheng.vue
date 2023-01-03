<template>
	<view class="renlianrenzhengPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				人脸图片
			</view>
			<view slot="right" style="color: #36373D;">修改</view>
		</fu-custom>
		<view class="text-df text-weight-500 text-center" style="color: #36373D;margin-top: 102rpx;">请将脸部正对蓝色显示框内，并保持光线充足</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods:{}
	}
</script>

<style lang="scss">
	.renlianrenzhengPages {
		min-height: 100vh;
		width: 100vw;
		background: #FFFFFF;
	}
</style>