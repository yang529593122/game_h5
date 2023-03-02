<template>
	<view class="content">
		<view class="sku-list">
			<view class="sku-name">
				<view class="sku-text"><text>*</text>规格名称</view>
				<input class="sku-input" type="text" placeholder="请输入规则名称">
			</view>
			<view class="sku-item">
				<view class="delete-sku">
					<image src="/static/newPage/68.png" mode="aspectFill"></image>
					<text>规格项</text>
				</view>
				<input type="text" placeholder="请输入规格项">
			</view>
			<view class="add-sku">+添加规格项</view>
		</view>
		<button class="save">保存</button>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content {
		padding-top:24rpx ;
		.sku-list {
			width: 702rpx;
			margin: 0 auto;
			
			.sku-name {
				background: #fff;
				padding: 20rpx 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;
				.sku-text {
					font-size: 28rpx;
					color: #19212D;
					text {
						color: #DA1715;
						margin-right: 10rpx;
					}
				}
				input {
					text-align: right;
					font-size: 28rpx; 
				}
			}
			
			.sku-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				padding: 20rpx 24rpx;
				border-bottom: 1rpx solid #eee;
				.delete-sku {
					image{
						width: 24rpx;
						height: 24rpx;
						margin-right: 16rpx;
						vertical-align: middle;
					}
					text {
						vertical-align: middle;
						font-size: 28rpx;
						color: #19212D;
					}
				}
				input {
					text-align: right;
					font-size: 28rpx; 
				}
			}
			.add-sku {
				padding: 20rpx 24rpx;
				background: #fff;
				color: #3B82CD;
				font-size: 28rpx;
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