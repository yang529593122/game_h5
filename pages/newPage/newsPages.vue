<template>
	<view class="content">
		<view class="new-item" @click="handleJump" data-url="/pages/makeorder/platformlist/index">
			<image src="/static/newPage/1.png" mode="aspectFill"></image>
			<view class="new-info">
				<view class="info">
					<text class="new-title">平台公告</text>
					<text class="new-time">13:12</text>
				</view>
				<view class="new-content">双12大放价！</view>
			</view>
		</view>
		<view class="new-item" @click="handleJump" data-url="/pages/newPage/orderNews">
			<image src="/static/newPage/2.png" mode="aspectFill"></image>
			<view class="new-info">
				<view class="info">
					<text class="new-title">订单消息</text>
					<text class="new-time">13:12</text>
				</view>
				<view class="new-content">双12大放价！</view>
			</view>
		</view>
		<view class="new-item" @click="handleJump" data-url="/pages/newPage/systemNews">
			<image src="/static/newPage/3.png" mode="aspectFill"></image>
			<view class="new-info">
				<view class="info">
					<text class="new-title">补货消息</text>
					<text class="new-time">13:12</text>
				</view>
				<view class="new-content">双12大放价！</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page {
		background: #F8F8F8;
	}

	.content {
		background: #fff;

		.new-item {
			padding: 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 90rpx;
				height: 90rpx;
			}

			.new-info {
				width: 576rpx;
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: row;
					width: 100%;

					.new-title {
						font-size: 28rpx;
						color: #333;
						font-weight: 500;
					}

					.new-time {
						font-size: 24rpx;
						color: #BFBFBF;
					}
				}

				.new-content {
					font-size: 24rpx;
					color: #999999;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
				}
			}
		}
	}
</style>
