<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item" @click="tab=item" :class="{active:tab==item}" v-for="item in 10" :key="item">全部<text></text> </view>
		</view>
		<view style="height: 106rpx;"></view>
		<view class="shop-list">
			<view class="shop-item" v-for="item in 10" :key="item">
				<image src="/static/logo.png" mode="aspectFill"></image>
				<view class="shop-name">
					<text>[包赔] </text>
					王者荣耀王者10颗星纯自己打上去的己王者荣耀王者10颗星纯自己打上去的王颗星己
				</view>
				<view class="shop-num">商品编号：KIJI89686</view>
				<view class="shop-price"><text>￥</text>281.00</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tab:1,
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F2F2F2;
	}
	.content {

		.tab-list {
			width: 100%;
			display: flex;
			overflow-x: scroll;
			line-height: 106rpx;
			background: #FFF;
			position: fixed;
			/* #ifdef h5 */
			top: 88rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			left: 0;
			z-index: 1024;

			.tab-item {
				line-height: 106rpx;
				min-width: 100rpx;
				padding: 0 20rpx;
				text-align: center;
				flex-shrink: 0;
				color: #868686;
				font-size: 24rpx;
			}
			.active{
				color: #295B7B;
				position: relative;
				font-size: 28rpx;
				text{
					display: inline-block;
					width: 40rpx;
					height: 6rpx;
					background: #295B7B;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
		
		.shop-list{
			padding: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			
			.shop-item{
				background: #fff;
				padding: 16rpx;
				width: 341rpx;
				margin-bottom: 20px;
				image{
					width: 309rpx;
					height: 229rpx;
				}
				.shop-name{
					color: #36373D;
					font-size: 28rpx;
					font-weight: 500;
					margin-top: 16rpx;
					text {
						font-size: 28rpx;
						color: #659BC7;
					}
				}
				.shop-num{
					margin-top: 8rpx;
					color: #868686;
					font-size: 20rpx;
				}
				.shop-price{
					font-weight: bold;
					color: #F55B29;
					font-size: 32rpx;
					margin-top: 22rpx;
					text{
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
