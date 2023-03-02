<template>
	<view class="content">
		<view class="contents">
			<view class="tab">
				<view :class="{active:tab==item}" v-for="item in 10" :key="item">王者荣耀</view>
			</view>
			<view class="class-list">
				<view class="class-item" v-for="item in 10" :key="item">
					<view class="class-tips">苹果</view>
					<view class="item-list">
						<view class="item-items" @click="toPath('/pages/tab/tradingMall/productList')" v-for="item in 10" :key="item">
							<image src="/static/newPage/17.png" mode="aspectFill"></image>
							<view>微信15区</view>
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
				tab:1
			}
		},
		methods:{
			// 路由跳转
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
		padding: 24rpx 0;
		
		.contents {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			
			.tab {
				width: 184rpx;
				line-height: 34rpx;
				
				view{
					font-size: 28rpx;
					color: #36373D;
					padding: 32rpx 0;
					text-align: center;
				}
				.active {
					border-left: 8rpx solid #659BC7;
				}
			}
			
			.class-list {
				box-sizing: border-box;
				width: 534rpx;
				margin-right:24rpx;
				height: 100vh;
				overflow-y: scroll;
				// overflow: hidden;
				
				.class-item {
					background: #fff;
					padding: 32rpx;
					margin-bottom: 16rpx;
					
					.class-tips {
						font-size: 28rpx;
						color: #36373D;
					}
					
					.item-list {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						.item-items {
							margin-top: 32rpx;
							image{
								width: 120rpx;
								height: 120rpx;
								vertical-align: top;
							}
							view{
								font-size: 24rpx;
								color: #36373D;
								margin-top: 10rpx;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>