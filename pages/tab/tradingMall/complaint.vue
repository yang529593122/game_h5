<template>
	<view class="content">
		<view class="complaint-content">
			<view class="complaint-title">
				反馈内容
			</view>
			<textarea class="complaint-text" placeholder-style="color:#BFBFBF;" placeholder="问题描述的越详细，有助于我们更快的解决问题" cols="30" rows="10"></textarea>
			<view class="complaint-img">
				<image src="/static/add-img.png" mode="aspectFill"></image>
				<view class="complaint-tips">请上传应用截图，最多上传6张</view>
			</view>
		</view>
		<view class="bold"></view>
		<view class="contact-type">
			<view class="contact-tips">请留下您的联系方式</view>
			<input type="text" placeholder="手机号/邮箱/QQ号">
		</view>
		<button class="submint">提交</button>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	
	.content {
		
		.complaint-content {
			padding: 32rpx;
			
			.complaint-title {
				font-size: 32rpx;
				color: #1A1A1A;
				font-weight: 500;
				margin-bottom: 32rpx;
			}
			
			.complaint-text {
				width: 100%;
				font-size: 28rpx;
			}
			
			.complaint-img {
				image {
					width: 160rpx;
					height: 160rpx;
					margin-bottom: 24rpx;
				}
				view {
					font-size: 24rpx;
					color: #BFBFBF;
				}
			}
		}
		
		.bold {
			width: 100%;
			height: 20rpx;
			background: #F6F7F9;
		}
		
		.contact-type {
			padding: 40rpx 32rpx 0rpx;
			border-bottom: 1px solid #eee;
			.contact-tips {
				font-size: 32rpx;
				color: #1A1A1A;
				font-weight: 500;
			}
			input {
				font-size: 28rpx;
				color: #BFBFBF;
				margin: 20rpx 0;
			}
		}
		
		.submint {
			width: 686rpx;
			line-height: 88rpx;
			position: absolute;
			bottom: 40rpx;
			left: 32rpx;
			background: #295B7B;
			color: #fff;
			font-size: 28rpx;
		}
	}
</style>