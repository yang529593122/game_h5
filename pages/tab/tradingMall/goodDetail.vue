<template>
	<view class="content">
		<view class="goods-info">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/newPage/17.png" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="goods-name">
				<view class="names">
					王者荣耀代练刷排位代打购买全皮肤国标服V10购买全皮肤国标服V10
				</view>
				<view class="Collection">
					<image src="/static/newPage/54.png" mode="aspectFill"></image>
					<view>收藏</view>
				</view>
			</view>
			<view class="goods-price">
				<view class="price">
					<text>￥</text>
					<text>250</text>
					<text>￥250</text>
				</view>
				<view class="goods-num">销量133件</view>
			</view>
			<view class="notice">
				<image src="/static/newPage/43.png" mode="aspectFill"></image>
				<view>平台公告：说无法下单要你缴费的是骗子！说加QQ...</view>
			</view>
		</view>
		<view class="specifications">
			<text class="specifications-tips">规格</text>
			<view class="select-icon">
				<text>请选择规格</text>
				<image src="/static/newPage/55.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="evaluate">
			<view class="evaluate-tips">
				<view class="evaluate-num">
					<text class="bold"></text>
					<text class="commont-num">商品评价(1005)</text>
				</view>
				<view class="favorable-rate" @click="toPath('/pages/tab/tradingMall/allEvaluate')">
					<text>好评率98.4%</text>
					<image src="/static/newPage/55.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="evaluate-list">
				<view class="evaluate-user">
					<view class="evaluate-user-info">
						<image class="user-icon" src="/static/newPage/1.png" mode="aspectFill"></image>
						<view class="user-info">
							<view class="user-name">才才</view>
							<view class="evaluate-star">
								<image src="/static/newPage/26.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="evaluate-time">
						2020-05-20
					</view>
				</view>
				<view class="evaluate-commont">
					确实不错，拿到了V10全场皮肤，达到了人生巅峰。开
					心开心下次继续
				</view>
				<view class="evaluate-image-list">
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
				</view>
				<view class="goods-vip">
					黄金v10
				</view>
			</view>
		</view>
		<!-- 店铺详情 -->
		<view class="shop-info">
			<view class="shop-name">
				<image class="shop-logo" src="/static/newPage/1.png" mode="aspectFill"></image>
				<text class="shop-names">露露</text>
				<image class="shop-type" src="/static/newPage/38.png" mode="aspectFill"></image>
			</view>
			<view class="go-shop">
				<text>进入店铺</text>
				<image src="/static/newPage/55.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="evaluate">
			<view class="evaluate-tips">
				<view class="evaluate-num">
					<text class="bold"></text>
					<text class="commont-num">商品详情</text>
				</view>
			</view>
			<view class="">
				<image src="/static/newPage/17.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 立即购买 -->
		<view class="get-pay">
			<view class="shop">
				<image src="/static/newPage/56.png" mode="aspectFill"></image>
				<view>店铺</view>
			</view>
			<view class="shop">
				<image src="/static/newPage/57.png" mode="aspectFill"></image>
				<view>店铺</view>
			</view>
			<view class="pay">
				立即购买
			</view>
		</view>
		
		
		<!-- 规格 -->
		<fu-popup v-model="show" mode="bottom">
			<view class="spec-content">
				<view class="shop-infos">
					<image class="shop-img" src="/static/newPage/17.png" mode="aspectFill"></image>
					<view class="price">
						<view class="spec-price">
							<text>￥</text>
							<text>900</text>
						</view>
						<view class="select-spec">
							<text>库存：888</text>
							<text>已选择：点券</text>
						</view>
					</view>
					<image class="close" src="/static/newPage/58.png" mode="aspectFill"></image>
				</view>
			</view>
		</fu-popup>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:true
			}
		},
		methods:{
			toPath(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
		.goods-info {
			background: #fff;
			width: 100%;
			padding: 0 24rpx 30rpx;
			.swiper {
				width: 702rpx;
				margin: 0 auto;
				height: 490rpx;
				
				.swiper-item {
					width: 702rpx;
					height: 490rpx;
					
					image{
						width: 702rpx;
						height: 490rpx;
					}
				}
			}
			
			.goods-name {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 52rpx;
				.names {
					font-size: 36rpx;
					color: #19212D;
				}
				
				.Collection {
					width: 80rpx;
					text-align: center;
					image {
						width: 40rpx;
						height: 40rpx;
					}
					view{
						font-size: 24rpx;
						color: #333;
					}
				}
			}
			
			.goods-price {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 15rpx;
				background: rgb(41,90,121);
				margin-top: 24rpx;
				
				.price {
					color: #fff;
					text:nth-child(1) {
						font-size: 24rpx;
						font-weight:bold;
					}
					text:nth-child(2) {
						font-size:48rpx;
					}
					text:nth-child(3) {
						font-size: 20rpx;
						margin-left: 20rpx;
					}
				}
				
				.goods-num {
					font-size: 24rpx;
					color: #B4C5D1;
				}
			}
			
			.notice {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background: rgba(41,91,123,0.2);
				margin-top: 20rpx;
				line-height: 48rpx;
				padding: 0 20rpx;
				image {
					width: 28rpx;
					height: 28rpx;
				}
				view{
					font-size: 24rpx;
					color: #295B7B;
				}
			}
		}
		
		.specifications {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 0;
			background: #fff;
			padding: 32rpx;
			
			.specifications-tips {
				font-size: 28rpx;
				color: #333;
			}
			.select-icon {
				
				image {
					width: 20rpx;
					height: 22rpx;
				}
			}
		}
		
		.evaluate {
			padding: 32rpx;
			background: #fff;
			.evaluate-tips {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.evaluate-num {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.bold {
						display: inline-block;
						width: 8rpx;
						height: 32rpx;
						border-radius: 4rpx;
						background: #295B7B;
						margin-right: 10rpx;
					}
					.commont-num {
						font-size: 32rpx;
						color: #333;
					}
				}
				
				.favorable-rate {
					image {
						width: 12rpx;
						height: 22rpx;
					}
					text {
						font-size: 24rpx;
						color: #333;
						font-weight: 500;
						margin-right: 10rpx;
					}
				}
			}
			
			.evaluate-list {
				
				.evaluate-user {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					margin: 32rpx 0;
					.evaluate-user-info {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.user-icon {
							width: 56rpx;
							height: 56rpx;
						}
						
						.user-info {
							margin-left: 10rpx;
							.user-name {
								font-size: 28rpx;
								color: #333;
							}
							
							.evaluate-star {
								image{
									width: 16rpx;
									height: 16rpx;
								}
							}
						}
					}
				}
				
				.evaluate-commont {
					margin-bottom: 24rpx;
					font-size: 28rpx;
					line-height: 40rpx;
				}
				
				.evaluate-image-list {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					image {
						width: 226rpx;
						height: 226rpx;
						margin-right: 10rpx;
					}
					
					image:last-child{
						margin-right: 0;
					}
				}
				
				.goods-vip {
					margin-top: 32rpx;
					font-size: 24rpx;
					color: #999;
				}
			}
		}
		
		.shop-info {
			background: #fff;
			padding: 24rpx 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 0;
			
			.shop-name {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				.shop-logo {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				
				.shop-names {
					margin: 0 20rpx;
					font-size: 32rpx;
				}
				
				.shop-type {
					width: 40rpx;
					height: 28rpx;
				}
			}
			
			.go-shop {
				text {
					font-size: 24rpx;
					color: #666;
				}
				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
		
		.get-pay {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			padding: 24rpx 10rpx;
			width: 100%;
			.shop {
				text-align: center;
				image {
					width: 32rpx;
					height: 32rpx;
				}
				view {
					font-size: 24rpx;
					color: #36373D;
				}
			}
			
			.pay {
				width: 420rpx;
				line-height: 78rpx;
				background: #295B7B;
				color: #fff;
				text-align: center;
				font-size: 28rpx;
				font-weight: 600;
			}
		}
		
		.uni-scroll-view {
			overflow: visible !important;
		}
		
		.spec-content {
			background: #fff;
			border-radius: 32rpx;
			padding: 0 32rpx;
			overflow: visible;
			.shop-infos {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.shop-img {
					width: 200rpx;
					height: 200rpx;
					position: relative;
					// top: -20rpx;
					left: 0;
				}
				
				.price {
					
				}
				.close {
					width: 26rpx;
					height: 26rpx;
				}
			}
		}
	}
</style>