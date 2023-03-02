<template>
	<view class="content">
		<!-- 标题 -->
		<view class="header">
			<image class="back" src="/static/newPage/25.png" mode="aspectFill"></image>
			<image class="kefu" src="/static/newPage/24.png" mode="aspectFill"></image>
			<image class="background" src="/static/newPage/23.png" mode=""></image>
		</view>
		<view class="shop-info">
			<image class="background" src="/static/newPage/23.png" mode=""></image>
			<view class="shop-user-info">
				<view class="shop-user-infos">
					<image class="shop-icon" src="/static/logo.png" mode="aspectFill"></image>
					<view class="shop-info-tips">
						<view class="shop-info-name">
							<view class="name">小西家店铺</view>
							<view class="pay-num">
								<text>153件商品</text>
								<text>10W+</text>
							</view>
						</view>
						<view class="shop-infos">
							<view class="star">
								<image v-for="item in 5" :key="item" src="/static/newPage/26.png" mode="aspectFill"></image>
							</view>
							<view>信用评分</view>
							<view>在售商品</view>
							<view>交易数量</view>
						</view>
					</view>
				</view>
				<!-- 数据状况 -->
				<view class="data-status">
					<view class="data-tips">
						<view class="data-tips-text">数据概况</view>
						<view class="select-time">
							<text>本年</text>
							<image src="/static/newPage/28.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="data-list">
						<view class="data-item">
							<view>订单数(笔)</view>
							<view>220</view>
						</view>
						<view class="data-item">
							<view>订单总额(元)</view>
							<view>¥8000</view>
						</view>
						<view class="data-item">
							<view>总利润(元)</view>
							<view>¥8000</view>
						</view>
					</view>
				</view>
				<!-- 订单数据 -->
				<view class="order-num-list">
					<view class="order-num-item">
						<view class="num">220</view>
						<view class="status">待发货</view>
					</view>
					<view class="order-num-item">
						<view class="num">220</view>
						<view class="status">待售后</view>
					</view>
					<view class="order-num-item">
						<view class="num">220</view>
						<view class="status">补货提醒</view>
					</view>
					<view class="order-num-item">
						<view class="num">220</view>
						<view class="status">商品审核</view>
					</view>
				</view>
				<!-- 商品管理 -->
				<view class="shop-tips-list">
					<view class="shop-tips-item" @click="handleJump"
					data-url="/pages/newPage/shop/commodityManagement">
						<image class="shop-tips-item-img" src="/static/newPage/29.png" mode=""></image>
						<view class="shop-tips-item-text">商品管理</view>
					</view>
					<view class="shop-tips-item">
						<image class="shop-tips-item-img" src="/static/newPage/30.png" mode=""></image>
						<view class="shop-tips-item-text">订单管理</view>
					</view>
					<view class="shop-tips-item">
						<image class="shop-tips-item-img" src="/static/newPage/31.png" mode=""></image>
						<view class="shop-tips-item-text">财务状况</view>
					</view>
					<view class="shop-tips-item">
						<image class="shop-tips-item-img" src="/static/newPage/32.png" mode=""></image>
						<view class="shop-tips-item-text">推广置顶</view>
					</view>
					<view class="shop-tips-item">
						<image class="shop-tips-item-img" src="/static/newPage/33.png" mode=""></image>
						<view class="shop-tips-item-text">店铺评价</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content{
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			padding: 22rpx 32rpx;
			overflow: hidden;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1024;
			.back{
				width: 19rpx;
				height: 36rpx;
				z-index: 100;
			}
			.kefu{
				width: 40rpx;
				height: 40rpx;
				z-index: 100;
			}
			.background{
				width: 100%;
				height: 480rpx;
				position: absolute;
				top: 0;
				left: 0;
			}
		}
		
		.shop-info {
			
			
			.background{
				width: 100%;
				height: 480rpx;
			}
			
			.shop-user-info {
				width: 686rpx;
				margin: 0 auto;
				position: relative;
				top: -360rpx;
				
				.shop-user-infos {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.shop-icon {
						width: 128rpx;
						height: 128rpx;
						border-radius: 50%;
					}
					.shop-info-tips {
						color: #fff;
						width: 542rpx;
						margin-left: 24rpx;
						
						.shop-info-name {
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							
							.name {
								font-size: 36rpx;
								font-weight: bold;
							}
							
							.pay-num {
								width: 250rpx;
								display: flex;
								justify-content: space-between;
								align-items: center;
								text {
									font-size: 24rpx;
								}
								text:nth-child(){}
							}
						}
						
						.shop-infos {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 15rpx;
							.star {
								width: 140rpx;
								height: 32rpx;
								background: rgba(255, 255, 255, 0.4);
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 16rpx;
								image{
									width: 20rpx;
									height: 20rpx;
									margin-right: 5rpx;
								}
								image:last-child{
									margin-right: 0; 
								}
							}
							view{
								font-size: 24rpx;
							}
						}
					}
				}
				
				.data-status {
					background: #fff;
					border-radius: 4rpx;
					padding: 29rpx 24rpx;
					margin-top: 36rpx;
					
					.data-tips {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 53rpx;
						
						.data-tips-text {
							font-size: 32rpx;
							color: #333333;
							font-weight: bold;
						}
						
						.select-time {
							display: flex;
							justify-content: space-around;
							align-items: center;
							background: #E2ECF4;
							color: #295B7B;
							width: 160rpx;
							line-height: 64rpx;
							image{
								width: 24rpx;
								height: 24rpx;
							}
							text {
								display: inline-block;
								width: 100rpx;
								overflow: hidden;
							}
						}
					}
					
					.data-list {
						display: flex;
						justify-content: space-around;
						align-items: center;
						
						.data-item {
							text-align: center;
							view:nth-child(1){
								font-size: 24rpx;
								color: #666666;
							}
							view:nth-child(2){
								font-size: 32rpx;
								color: #121712;
								font-weight: bold;
								margin-top: 20rpx;
							}
						}
					}
				}
				// 
				.order-num-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 32rpx;
					background: #fff;
					border-radius: 4rpx;
					margin: 24rpx 0;
					
					.order-num-item {
						text-align: center;
						.num {
							font-size: 32rpx;
							color: #121712;
							font-weight: bold;
						}
						.status {
							font-size: 24rpx;
							color: #333333;
							margin-top: 10rpx;
						}
					}
				}
				// 
				.shop-tips-list {
					padding: 32rpx 30rpx;
					background: #fff;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.shop-tips-item {
						text-align: center;
						
						.shop-tips-item-img {
							width: 56rpx;
							height: 56rpx;
						}
						
						.shop-tips-item-text {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>