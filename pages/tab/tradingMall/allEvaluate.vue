<template>
	<view class="content">
		<view class="options">
			<view class="options-item" :class="{activeOption:tab==item}" v-for="item in 10">选项</view>
		</view>
		<view class="commont-list">
			<view class="commont-item" @click="toPath('/pages/tab/tradingMall/evaluateDetail')" v-for="item in 4">
				<view class="commont-user">
					<view class="user-info">
						<image class="user-icon" src="/static/newPage/17.png" mode="aspectFill"></image>
						<view class="user-name">
							<view class="name">
								敏娜
							</view>
							<view class="commont-star">
								<image v-for="item in 5" src="/static/newPage/26.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="commont-time">2012-12-12</view>
				</view>
				<view class="commont-content">
					确实不错，拿到了V10全场皮肤，达到了人生巅峰。开
					心开心下次继续
				</view>
				<view class="commont-image">
					<image v-for="item in 6" src="/static/newPage/17.png" mode="aspectFill"></image>
				</view>
				<view class="commont-vip">
					黄金10
				</view>
			</view>
			
			<fu-empty-ui v-if="isEmpty" pagingListNoListDataText="暂无评论"></fu-empty-ui>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				tab:1,
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
	.content{
		
		.options {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #fff;
			padding: 32rpx;
			flex-wrap: wrap;
			margin-bottom: 24rpx;
			.options-item {
				line-height: 56rpx;
				padding:0 25rpx;
				font-size: 28rpx;
				color: #36373D;
				background: #F8F8F8;
				text-align: center;
				margin-bottom: 24rpx;
				margin-right: 24rpx;
			}
			
			.activeOption {
				background: rgba(101,155,199,0.2);
				color: #659BC7;
			}
		}
		
		.commont-list {
			padding: 0 32rpx;
			background: #fff;
			
			.commont-item {
				border: 1px solid #eee;
				padding: 32rpx 0;
				
				.commont-user {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					
					.user-info {
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
							}
							
							.commont-star {
								image {
									width: 18rpx;
									height: 18rpx;
								}
							}
						}
					}
					
					.commont-time {
						font-size: 24rpx;
						color: #999999;
					}
				}
				
				.commont-content {
					margin: 24rpx 0;
					font-size: 28rpx;
				}
				
				.commont-image {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					image {
						width:226rpx;
						height: 226rpx;
						margin-right: 4rpx;
						margin-bottom: 4rpx;
					}
					image:last-child {
						margin-right: 0;
					}
				}
				
				.commont-vip {
					margin-top: 24rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
</style>