<template>
	<view class="content">
		<!-- 详情上部分 -->
		<view class="detail-up">
			<view class="title">就这，还要吗？就没怕过</view>
			<view class="user-info">
				<view class="user-info-content">
					<image class="user-icon" src="/static/newPage/1.png" mode="aspectFill"></image>
					<view class="user-info-name">
						<view class="name">
							<text class="user-name">楼的姐姐</text>
							<view class="num">
								<image src="/static/newPage/10.png" mode=""></image>
								<text>累计牵手 10</text>
							</view>
						</view>
						<view class="creat-time">
							<text class="times">07-15 12:00</text>
							<view class="label">
								<text>王者</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="contents">弱化流暗信很强，并非难以克制！推荐使用这五个英雄
				去针对</view>
			<view class="img-list">
				<image v-for="item in 3" :key="item" src="/static/newPage/1.png" mode=""></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	

	.content {

		.detail-up {
			padding: 32rpx;
			background: #fff;

			.title {
				font-size: 32rpx;
				color: #36373D;
				font-weight: 500;
			}

			.user-info {
				margin: 40rpx 0;

				.user-info-content {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.user-icon {
						width: 80rpx;
						height: 80rpx;
					}

					.user-info-name {
						width: 586rpx;
						height: 80rpx;
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-direction: column;

						.name {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 100%;

							.user-name {
								font-size: 28rpx;
								color: #36373D;
							}

							.num {
								display: flex;
								justify-content: flex-start;
								align-items: center;

								image {
									width: 32rpx;
									height: 32rpx;
								}

								text {
									font-size: 20rpx;
									color: #999999;
									margin-left: 10rpx;
								}
							}
						}

						.creat-time {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							width: 100%;

							.times {
								font-size: 24rpx;
								color: #999999;
							}

							.label {
								display: flex;
								justify-content: flex-start;
								align-items: center;

								text {
									display: inline-block;
									width: 60rpx;
									line-height: 34rpx;
									background: rgba(41, 91, 123, 0.39);
									color: #295B7B;
									font-size: 20rpx;
									text-align: center;
									margin-left: 16rpx;
								}
							}
						}
					}
				}
			}

			.contents {
				font-size: 28rpx;
				color: #36373D;
				margin: 32rpx 0;
			}
			
			.img-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				image{
					width: 220rpx;
					height: 220rpx;
				}
				image:nth-child(3n-1){
					margin: 13rpx;
				}
			}
		}
		.line{
			height: 10rpx;
			background-color: #F6F7F9;
		}
		
		.commont{
			padding: 32rpx;
			
			.commont-num {
				font-weight: 500;
				font-size: 32rpx;
				color: #333;
			}
			
			.commont-list {
				
				.commont-item {
					padding: 32rpx 0;
					border-bottom: 1rpx solid #eee;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					
					image{
						width: 56rpx;
						height: 56rpx;
						border-radius: 50%;
					}
					
					.commont-info {
						width: 600rpx;
						margin-left: 24rpx;
						
						.commont-title {
							line-height: 56rpx;
							font-weight: 500;
							color: #333333;
							font-size: 28rpx;
						}
						
						.commont-text {
							margin: 24rpx 0;
							font-size: 28rpx;
							color: #36373D;
						}
						.commont-time {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}
		
		.btns {
			width: 465rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #295B7B;
			color: #fff;
			margin: 0 auto;
			position: fixed;
			bottom: 32rpx;
			left: 142.5rpx;
			border-radius: 40rpx;
			image{
				width: 32rpx;
				height: 32rpx;
				margin-right: 24rpx;
			}
			text {
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
