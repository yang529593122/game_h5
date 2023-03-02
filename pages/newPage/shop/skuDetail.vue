<template>
	<view class="content">
		<view class="sku-detial">
			<view class="sku-title">规格</view>
			<view class="sku-item" v-for="item in 10">
				<text>划线价</text>
				<text>0.00元</text>
			</view>
		</view>
		<button class="save">保存</button>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content{
		padding: 32rpx 24rpx 0;
		
		.sku-detial {
			padding: 32rpx 24rpx;
			background: #fff;
			font-size: 28rpx;
			color: #36373D;
			
			.sku-title {
				padding-bottom: 32rpx;
				border-bottom: 1rpx solid #eee;
				font-weight: 600;
			}
			.sku-item {
				padding-top: 32rpx ;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				text:nth-child(1){
					font-size: 24rpx;
					color: #36373D;
					display: inline-block;
					width: 200rpx;
				}
				text:nth-child(2){
					font-size: 24rpx;
					color: #868686;
				}
			}
		}
		.save {
			width: 686rpx;
			position: fixed;
			bottom: 40rpx;
			left: 32rpx;
			line-height: 88rpx;
			background: #295B7B;
			color: #fff;
			font-size: 28rpx; 
		}
	}
</style>