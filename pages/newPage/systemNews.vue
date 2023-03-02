<template>
	<view class="content">
		<view class="new-item" v-for="item in 10" :key="item">
			<view class="new-title">
				<text class="order-type">卖家已发货</text>
				<text class="new-creat-time">2020-11-12 13:12</text>
			</view>
			<view class="new-info">
				<image src="/static/newPage/1.png" mode="aspectFill"></image>
				<view class="new-text">
					您的订单[王者荣耀v10会员…]买家已确认收货，请耐心等待
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page{
		background: #F8F8F8;
	}
	.content{
		padding: 32rpx 24rpx;
		
		.new-item{
			background: #fff;
			padding: 24rpx 16rpx;
			margin-bottom: 24rpx;
			
			.new-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.order-type {
					font-size: 34rpx;
					color: #333;
					font-weight: 500;
				}
				
				.new-creat-time {
					font-size: 24rpx;
					color: #BFBFBF;
				}
			}
			
			.new-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 24rpx 0 0;
				
				image{
					width:140rpx;
					height: 140rpx;
				}
				
				.new-text {
					height: 140rpx;
					width: 530rpx;
					background: #FAFAFA;
					color: #999999;
					font-size: 28rpx;
					padding: 16rpx;
				}
			}
		}
	}
</style>