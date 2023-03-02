<template>
	<view class="content">
		<view :style="{paddingTop:StatusBar+'px'}" class="header">
			<image class="back" @click="getBack" src="/static/newPage/25.png" mode="aspectFill"></image>
			<view class="header-search">
				<image src="/static/newPage/42.png" mode="aspectFill"></image>
				<input type="search" placeholder-style="color:#fff;" placeholder="请输入商品名称">
			</view>
			<view class="complaint" @click="toPath('/pages/tab/tradingMall/complaint')">
				<image src="/static/newPage/39.png" mode="aspectFill"></image>
				<view>投诉</view>
			</view>
			<view class="complaint subscribe">
				<image src="/static/newPage/40.png" mode="aspectFill"></image>
				<view>订阅</view>
			</view>
		</view>
		<view style="height: 148rpx;"></view>
		<view class="store-info">
			<image class="background" src="/static/newPage/41.png" mode="aspectFill"></image>
			<view class="store-info-left">
				<image class="store-img" src="/static/newPage/1.png" mode="aspectFill"></image>
				<view class="store-info-text">
					<view class="store-name">
						<text>TABI拍卖店</text>
						<image src="/static/newPage/38.png" mode="aspectFill"></image>
					</view>
					<view class="store-stars">
						<view class="stars-list">
							<image v-for="item in 5" :key="item" src="/static/newPage/26.png" mode="aspectFill"></image>
						</view>
						<text>信用评分</text>
					</view>
				</view>
			</view>
			<view class="store-info-right">
				<view class="store-info-list">
					<view>153件商品</view>
					<view>在售商品</view>
				</view>
				<view class="store-info-list">
					<view>153</view>
					<view>交易数量</view>
				</view>
				<view class="store-info-list">
					<view>153</view>
					<view>订阅数</view>
				</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view class="home" v-if="tab==1">
			<view class="new-list">
				<image class="new-icon" src="/static/newPage/43.png" mode="aspectFill"></image>
				<text class="new-tips">平添公告</text>
				<swiper class="swiper" :vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">说无法下单要你缴费的是骗子！说加QQ刷单的是...</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">说无法下单要你缴费的是骗子！说加QQ刷单的是...</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 筛选内容 -->
			<view class="filter-tab">
				<view class="filter-list">
					<view class="filter-item">
						<text>综合</text>
					</view>
					<view class="filter-item">
						<text>销量</text>
						<view class="arrow">
							<image src="/static/newPage/8.png" mode=""></image>
							<image src="/static/newPage/6.png" mode=""></image>
						</view>
					</view>
					<view class="filter-item">
						<text>价格</text>
						<view class="arrow">
							<image src="/static/newPage/8.png" mode=""></image>
							<image src="/static/newPage/6.png" mode=""></image>
						</view>
					</view>
					<view class="filter-item">
						<text>好评率</text>
						<view class="arrow">
							<image src="/static/newPage/8.png" mode=""></image>
							<image src="/static/newPage/6.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="shop-list">
					<view class="shop-item" v-for="item in 10">
						<image src="/static/newPage/17.png" mode="aspectFill"></image>
						<view class="shop-name">
							王者荣耀代练刷排位代打购买全皮肤国标服V10...
						</view>
						<view class="shop-info">
							<text>销量2333</text>
							<text>好评率98.4%</text>
						</view>
						<view class="shop-price">
							<text>￥</text>
							<text>281.00</text>
							<text>￥1000.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="commont-list" v-if="tab==4">
			<view class="commont-item" v-for="item in 10">
				<view class="commont-user-info">
					<view class="commont-info">
						<image class="user-icon" src="/static/newPage/17.png" mode="aspectFill"></image>
						<view class="user-name">
							<view class="name">才￥￥</view>
							<view class="commont-star">
								<image v-for="item in 5" src="/static/newPage/26.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="commont-time">2022-20-29</view>
				</view>
				<view class="commont-content">
					这里是内容
				</view>
				<view class="commont-image-list">
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
					<image src="/static/newPage/17.png" mode="aspectFill"></image>
				</view>
				<view class="commont-reply">
					回复：感谢您对我们的肯定，我们会继续努力的我们会继续努力的我们会继续努力的
					我们会继续努力的我们会继续努力的我们会继续努力的我们会继续努力的
				</view>
			</view>
		</view>
		<view class="classification-shop" v-if="tab==3">
			<view class="classification-shop-left">
				<view class="classification-shop-left-list">
					<view class="classification-shop-left-item">王者荣耀 <text class="bold"></text></view>
				</view>
			</view>
			<view class="classification-shop-right">
				<view class="classification-shop-right-list">
					<view class="classification-shop-right-item" v-for="item in 4">
						<view class="classification-shop-right-title">苹果</view>
						<view class="classification-shop-right-shop-list">
							<view class="classification-shop-right-shop-item" v-for="item in 10">
								<image src="/static/newPage/17.png" mode="aspectFill"></image>
								<view>qq16区{{tab}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 88rpx;"></view>
		<Footer :tab.sync="tab" @getTab="getTab"></Footer>
	</view>
</template>

<script>
	import Footer from './components/footer.vue'
	export default{
		components:{Footer},
		data(){
			return{
				tab:1,
			}
		},
		methods:{
			getBack(){
				// 返回上一页
				uni.navigateBack()
			},
			getTab(data){
				this.tab = data;
			},
			toPath(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		
		.header {
			background: url(@/static/newPage/41.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 11rpx 32rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1024;
			width: 100%;
			
			.back {
				width: 20rpx;
				height: 32rpx;
			}
			
			.header-search {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background: rgba(255,255,255,0.39);
				padding: 12rpx 32rpx;
				border-radius: 40rpx;
				image{
					width: 38rpx;
					height: 38rpx;
				}
				input {
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}
			
			.complaint {
				text-align: center;
				view{
					font-size: 24rpx;
					color: #fff;
				}
				image{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
		
		.store-info {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0 32rpx;
			
			.background {
				width: 750rpx;
				height: 296rpx;
				position: absolute;
				top: 0;
				left: 0;
			}
			
			.store-info-left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.store-img {
					width: 100rpx;
					height: 100rpx;
				}
				
				.store-info-text {
					z-index: 100;
					margin-left: 20rpx;
					.store-name {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						color: #fff;
						margin-bottom: 20rpx;
						
						text {
							font-size: 32rpx;
							color: #fff;
							font-weight: bold;
						}
						
						image {
							width: 52rpx;
							height: 32rpx;
							margin-left: 16rpx;
						}
					}
					
					.store-stars {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						color: #fff;
						.stars-list {
							border-radius: 10rpx;
							padding: 0 5rpx;
							background: rgba(255,255,255,0.39);
							image{
								width: 20rpx;
								height: 20rpx;
								margin-right: 5rpx;
							}
							image:last-child{
								margin-right: 0;
							}
						}
						text {
							font-size: 24rpx;
							color: #fff;
							margin-left: 20rpx;
						}
					}
				}
			}
			
			.store-info-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				z-index: 100;
				color: #fff;
				width: 330rpx;
				
				.store-info-list {
					text-align: center;
					view:nth-child(1){
						font-size: 24rpx;
						margin-bottom: 18rpx;
					}
					view:nth-child(2){
						font-size: 20rpx;
					}
				}
			}
		}
		
		.home {
			// 首页
			.new-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background: #fff;
				padding: 24rpx;
				
				.new-icon {
					width: 28rpx;
					height: 28rpx;
					vertical-align: middle;
				}
				
				.new-tips {
					font-size: 24rpx;
					color: #5C707E;
					display: inline-block;
					line-height: 30rpx;
					margin: 0 15rpx;
					vertical-align: middle;
				}
				
				.swiper {
					width: 400rpx;
					height: 30rpx;
					
					swiper-item {
						width: 400rpx;
						height: 30rpx;
						
						.swiper-item {
							width: 400rpx;
							height: 30rpx;
							line-height: 30rpx;
							font-size: 24rpx;
							color: #5C707E;
						}
					}
				}
			}
			
			.filter-tab{
				.filter-list {
					display: flex;
					justify-content: space-around;
					align-items: center;
					background: #fff;
					padding: 24rpx 0;
					.filter-item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						line-height: 40rpx;
						text {
							font-size: 28rpx;
							color: #868686;
						}
						.arrow {
							flex-direction: column;
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-left: 10rpx;
							image{
								width: 20rpx;
								height: 12rpx;
							}
							image:nth-child(1){
								margin-bottom: 5rpx;
							}
						}
					}
				}
				.shop-list {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					flex-wrap: wrap;
					margin:24rpx;
					.shop-item {
						padding: 16rpx;
						background: #fff;
						margin-bottom: 20rpx;
						image{
							width: 309rpx;
							height: 229rpx;
						}
						.shop-name {
							width: 309rpx;
							font-size: 28rpx;
							color: #36373D;
							font-weight: 500;
							margin: 16rpx 0;
							line-height: 40rpx;
							height: 80rpx;
						}
						
						.shop-info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 19rpx;
							text {
								font-size: 20rpx;
								color: #868686;
							}
						}
						.shop-price {
							text:nth-child(1){
								font-size: 24rpx;
								color: #F55B29;
								font-weight: bold;
							}
							text:nth-child(2){
								font-size: 32rpx;
								color: #F55B29;
								font-weight: bold;
							}
							text:nth-child(3){
								margin-left: 15rpx;
								font-size: 20rpx;
								color: #919191;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
		
		// 列表
		.commont-list {
			background: #fff;
			.commont-item {
				padding: 24rpx 32rpx;
				border-bottom: 1px solid #eee;
				.commont-user-info {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					
					.commont-info {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						.user-icon {
							width: 56rpx;
							height: 56rpx;
							border-radius: 50%;
						}
						
						.user-name {
							margin-left: 16rpx;
							.name {
								font-size: 28rpx;
								color: #333333;
								line-height: 40rpx;
							}
							
							.commont-star {
								image {
									width: 18rpx;
									height: 18rpx;
									margin-right: 5rpx;
								}
							}
						}
					}
					.commont-time {
						font-size: 24rpx;
						color: #999;
					}
				}
				
				.commont-content {
					margin: 24rpx 0;
					font-size: 28rpx;
					color: #333333;
					line-height: 40rpx;
				}
				
				.commont-image-list {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 24rpx;
					image {
						width: 226rpx;
						height: 226rpx;
						margin-right: 4rpx;
					}
				}
				
				.commont-reply {
					background: #F6F6F6; 
					padding: 20rpx 24rpx;
					color: #999999;
					font-size: 24rpx;
					border-radius: 8rpx;
				}
			}
		}
		
		.classification-shop {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-top: 24rpx;
			.classification-shop-left {
				
				.classification-shop-left-list {
					position: relative;
					width: 193rpx;
					
					.classification-shop-left-item {
						font-size: 28rpx;
						color: #36373D;
						padding:0 24rpx;
						margin: 32rpx 0;
						text-align: center;
						.bold {
							position: absolute;
							display: inline-block;
							width: 8rpx;
							height: 32rpx;
							left: 0;
							bottom: 0;
							background: #659BC7;
							border-radius: 7rpx;
						}
					}
				}
			}
			.classification-shop-right {
				margin-right: 24rpx;
				box-sizing: border-box;
				width: 534rpx;
				
				.classification-shop-right-list {
					
					.classification-shop-right-item {
						background: #fff;
						padding: 32rpx 40rpx 0;
						margin-bottom: 16rpx; 
						
						.classification-shop-right-title {
							font-size: 28rpx;
							color: #36373D;
							margin-bottom: 32rpx;
						}
						
						.classification-shop-right-shop-list {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							flex-wrap: wrap;
							.classification-shop-right-shop-item {
								margin-bottom: 32rpx;
								image{
									width: 120rpx;
									height: 120rpx;
									border-radius: 16rpx;
									margin-bottom: 10rpx;
								}
								view {
									font-size: 24rpx;
									text-align: center;
									width: 120rpx;
								}
							}
						}
					}
				}
			}
		}
		
		.footer{
			height: 88rpx;
		}
	}
</style>