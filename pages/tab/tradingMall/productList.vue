<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item">综合</view>
			<view class="tab-item">销量
				<view class="screen">
					<image src="/static/newPage/9.png" mode="aspectFill"></image>
					<image src="/static/newPage/7.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item">价格
				<view class="screen">
					<image src="/static/newPage/9.png" mode="aspectFill"></image>
					<image src="/static/newPage/7.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item">好评率
				<view class="screen">
					<image src="/static/newPage/9.png" mode="aspectFill"></image>
					<image src="/static/newPage/7.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item" @click="tab=5">店铺
				<view class="screen">
					<image src="/static/newPage/9.png" mode="aspectFill"></image>
					<image src="/static/newPage/7.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item" @click="getScreen">
				<image :src="shopType=='transverse'?'/static/newPage/35.png':'/static/newPage/34.png'" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="tab!=5" :class="{'shop-list':shopType=='transverse','shop-list-two':shopType=='portrait'}">
			<view class="shop-item" v-for="item in 10" :key="item">
				<view class="shop-img">
					<image class="shop-cover" src="/static/newPage/17.png" mode="aspectFill"></image>
					<image class="shop-tips-img" src="/static/newPage/37.png" mode="aspectFill"></image>
				</view>
				<view class="shop-info">
					<view class="shop-name">王者荣耀代练刷排位代打购买全皮肤国标服V10</view>
					<view class="shop-good-commont" v-if="shopType=='transverse'">
						<text>好评率98.4%</text>
						<text>销量233</text>
					</view>
					<view class="shop-price">
						<text>￥</text>
						<text>288</text>
						<text>￥1000.00</text>
					</view>
					<view class="shop-good-commont" v-if="shopType=='portrait'">
						<text>好评率98.4%</text>
						<text>销量233</text>
					</view>
					<view class="shop-go-to">
						<text>尚好家旗舰店  进店</text>
						<image src="/static/newPage/18.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="store-list" v-if="tab==5">
			<view class="store-item" @click="toPath('/pages/tab/tradingMall/storeDetail')" v-for="item in 5" :key="item">
				<image class="store-img" src="/static/newPage/1.png" mode="aspectFill"></image>
				<view class="store-info">
					<view class="store-name">
						<text class="naeme">若风网游店</text>
						<image src="/static/newPage/38.png" mode="aspectFill"></image>
						<text class="subscription">订阅数1589</text>
						<view>已订阅</view>
					</view>
					<view class="store-info-list">
						<text>在售商品153件</text>
						<text>交易数量20W+</text>
						<view class="stars">
							<text>信用评分</text>
							<view class="star-list">
								<image v-for="item in 5" :key="item" src="/static/newPage/26.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tab:1, //顶部切换
				shopType:'transverse', //portrait 当前显示内容方向
			}
		},
		methods:{
			// 路由跳转
			toPath(url){
				uni.navigateTo({
					url:url
				})
			},
			// 筛选
			getScreen(){
				if(this.shopType=='transverse'){
					this.shopType = 'portrait';
				}else{
					this.shopType = 'transverse';
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {

		.tab-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx;
			background: #fff;

			.tab-item {
				font-size: 28rpx;
				color: #868686;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				image {
					width: 30rpx;
					height: 28rpx;
				}
			}

			.screen {
				width: 25rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;
				margin-left: 5rpx;

				image {
					width: 13rpx;
					height: 13rpx;
					vertical-align: top;
				}

				image:nth-child(1) {
					margin-bottom: 5rpx;
				}
			}
		}
		
		.shop-list{
			padding: 32rpx 24rpx;
			
			.shop-item {
				background: #fff;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 14rpx 16rpx;
				margin-bottom: 20rpx;
				.shop-img{
					position: relative;
					
					.shop-cover {
						width: 204rpx;
						height: 190rpx;
						vertical-align: top;
					}
					
					.shop-tips-img {
						width: 62rpx;
						height: 32rpx;
						position: absolute;
						top: 0;
						left: 0;
					}
				}
				
				.shop-info {
					width: 449rpx;
					height: 190rpx;
					margin-left: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					flex-direction: column;
					.shop-name {
						font-size: 28rpx;
						color: #36373D;
						font-weight: 600;
					}
					
					.shop-good-commont {
						text {
							font-size: 20rpx;
							color: #868686;
						}
						text:nth-child(1){
							margin-right: 100rpx;
						}
					}
					
					.shop-price {
						text:nth-child(1) {
							font-size: 24rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(2) {
							font-size: 32rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(3) {
							font-size: 24rpx;
							color: #919191;
							text-decoration: line-through;
							margin-left: 16rpx;
						}
					}
					.shop-go-to{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						image{
							width: 24rpx;
							height: 24rpx;
						}
						text {
							font-size: 20rpx;
							color: #868686;
						}
					}
				}
			}
		}
		.shop-list-two{
			padding: 32rpx 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			.shop-item {
				width: 341rpx;
				padding: 16rpx;
				background: #fff;
				margin-bottom: 20rpx;
				
				.shop-img {
					width: 309rpx;
					height: 229rpx;
					position: relative;
					.shop-cover {
						width: 309rpx;
						height: 229rpx;
					}
					
					.shop-tips-img {
						width: 62rpx;
						height: 32rpx;
						position: absolute;
						top: 0;
						left: 0;
					}
				}
				
				.shop-info{
					
					.shop-name {
						height: 80rpx;
						font-size: 28rpx;
						color: #36373D;
						font-weight: bold;
						margin-top: 10rpx;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.shop-price {
						margin: 14rpx 0 15rpx;
						text:nth-child(1) {
							font-size: 24rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(2) {
							font-size: 32rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(3) {
							font-size: 24rpx;
							color: #919191;
							text-decoration: line-through;
							margin-left: 16rpx;
						}
					}
					
					.shop-good-commont {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 8rpx;
						text {
							font-size: 20rpx;
							color: #868686;
						}
						text:nth-child(1){
							margin-right: 100rpx;
						}
					}
					
					.shop-go-to{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						image{
							width: 24rpx;
							height: 24rpx;
						}
						text {
							font-size: 20rpx;
							color: #868686;
						}
					}
				}
			}
		}
		
		.store-list {
			padding: 24rpx;
			
			.store-item {
				padding: 24rpx 16rpx;
				background: #fff;
				display: flex;
				justify-content:flex-start;
				align-items: center;
				margin-bottom: 20rpx;
				
				.store-img {
					width: 96rpx;
					height: 96rpx;
				}
				
				.store-info {
					width: 560rpx;
					margin-left: 20rpx;
					.store-name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 16rpx;
						.naeme {
							font-size: 32rpx;
							color: #36373D;
							font-weight: 500;
						}
						image {
							width: 62rpx;
							height: 32rpx;
						}
						view {
							width: 112rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							border: 1rpx solid #659BC7;
							font-size: 24rpx;
							border-radius: 20rpx;
							color: #659BC7;
						}
					}
					
					.store-info-list {
						display: flex;
						justify-content: space-between;
						align-items: center;
						text {
							font-size: 22rpx;
							color: #666666;
						}
						
						.stars {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.star-list {
								image{
									width: 18rpx;
									height: 18rpx;
									margin-left: 5rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
