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
		<view class="line"></view>
		<view class="make-friends-apply">
			<view class="make-friends-tips">交友申请</view>
			<view class="apply-user">
				<view class="apply-user-info">
					<image src="/static/newPage/49.png" mode="aspectFill"></image>
					<view class="user-info">
						<view class="user-name">住8楼的姐姐</view>
						<view class="release-time">07-15 12:00</view>
					</view>
				</view>
				<view class="apply-status">已同意</view>
			</view>
			<view class="apply-content">
				弱化流暗信很强，并非难以克制！推荐使用这五个英雄
				去针对
			</view>
			<view class="apply-img">
				<image v-for="item in 3" :key="item" src="/static/newPage/1.png" mode=""></image>
			</view>
			<view class="contact-us">
				<view class="contact-tips">
					<text class="vertical-bar"></text>
					<text>联系方式</text>
				</view>
				<view class="apply-item">QQ号码  689897858</view>
				<view class="apply-item">QQ号码  689897858</view>
				<view class="apply-item">QQ号码  689897858</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="commont">
			<view class="commont-num">评论 (1680)</view>
			<view class="commont-list">
				<view class="commont-item" v-for="item in 4" :key="item">
					<image src="/static/newPage/1.png" mode=""></image>
					<view class="commont-info">
						<view class="commont-title">蔡菜菜</view>
						<view class="commont-text">确实不错，很好吃，分量可以。整体来看还是非常实惠的，分享下实拍无滤镜</view>
						<view class="commont-time">2020-05-20</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<view class="btns">
			<!-- <image src="/static/newPage/14.png" mode="aspectFill"></image> -->
			<text @click="handleJump"
					data-url="/pages/newPage/makeFriends/socialComments">去评价</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.content {

		.detail-up {
			padding: 32rpx;

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
		
		.make-friends-apply {
			padding: 32rpx;
			background: #fff;
			.make-friends-tips {
				font-size: 32rpx;
				font-weight: 500;
			}
			.apply-user {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.apply-user-info {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin: 24rpx 0;
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 24rpx;
					}
					.user-info {
						height: 80rpx;
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-direction: column;
						
						.user-name {
							font-size: 28rpx;
							color: #36373D;
						}
						.release-time {
							font-size: 24rpx;
							color: #999999;
						}
					}
				}
				.apply-status {
					color: #36373D;
					font-size: 28rpx;
				}
			}
			
			.apply-content {
				font-size: 28rpx;
				color: #36373D;
				margin-bottom: 32rpx;
			}
			.apply-img {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 32rpx;
				image {
					width: 220rpx;
					height: 220rpx;
					margin-right: 13rpx;
				}
			}
			.contact-us {
				.contact-tips {
					.vertical-bar {
						display: inline-block;
						margin-right: 10rpx;
						width: 6rpx;
						height: 20rpx;
						background: #659BC7;
						border-radius: 3rpx;
					}
					text {
						vertical-align: middle;
						font-size: 28rpx;
						color: #36373D;
						font-weight: 600rpx;
						line-height: 40rpx;
					}
				}
				.apply-item {
					margin-top: 24rpx;
					font-size: 24rpx;
					color: #19212D;
				}
			}
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
