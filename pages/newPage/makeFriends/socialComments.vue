<template>
	<view class="content">
		<view class="comment-tips">
			你在王者累计氪的钱，换到现实能买什么？你在王者累计氪的钱，换到现实能买什么？
		</view>
		<textarea class="comment-content" v-model="content" placeholder="请输入您的评价" />
		<view class="add-img">
			<view class="add-img-tips">
				<text>添加照片</text>
				<text>最多可上传9张</text>
			</view>
			<view class="img-list">
				<view class="img-item">
					<image src="/static/logo.png" mode="aspectFill"></image>
					<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
				</view>
				<image class="add-imgs" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<button type="default" class="comment-btn">评论</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				content: '', //评价内容
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
	.content {
		padding: 24rpx;
		.comment-tips {
			font-size: 28rpx;
			color: #36373D;
			line-height: 40rpx;
			margin-bottom: 30rpx;
		}
		.comment-content {
			width: 100%;
			height: 200rpx;
			padding: 24rpx;
			background: #FAFAFC;
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}
		.add-img {
			.add-img-tips {
				margin-bottom: 32rpx;
				text:nth-child(1) {
					font-size: 28rpx;
					font-weight: 600;
				}
				text:nth-child(2) {
					font-size: 24rpx;
					color: #999999;
					margin-left: 24rpx;
				}
			}
			
			.img-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.img-item {
					width: 140rpx;
					height: 140rpx;
					margin-right: 24rpx;
					margin-top: 24rpx;
					position: relative;
					image {
						width: 100%;
						height: 100%;
					}
					.delete-icon {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
				.add-imgs {
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
		.comment-btn {
			position: fixed;
			bottom: 32rpx;
			left: 32rpx;
			line-height: 88rpx;
			background: #295B7B;
			color: #fff;
			font-size: 28rpx;
			width: 686rpx;
		}
	}
</style>
