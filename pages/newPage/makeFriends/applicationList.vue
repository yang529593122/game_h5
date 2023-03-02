<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item" @click="getTab(1)" :class="{active:active==1}">
				全部<span v-if="active==1"></span>
			</view>
			<view class="tab-item" @click="getTab(2)" :class="{active:active==2}">
				待审核<span v-if="active==2"></span>
			</view>
			<view class="tab-item" @click="getTab(3)" :class="{active:active==3}">
				已同意<span v-if="active==3"></span>
			</view>
			<view class="tab-item" @click="getTab(4)" :class="{active:active==4}">
				已拒绝<span v-if="active==4"></span>
			</view>
		</view>
		<view style="height: 110rpx;"></view>
		<view class="list">
			<view class="item" v-for="item in 10" :key="item">
				<view class="time-item">
					<view class="user">
						<image src="/static/newPage/1.png" mode="aspectFill"></image>
						<view class="user-info">
							<view class="user-name">名称</view>
							<view class="user-time">时间</view>
						</view>
					</view>
					<view style="status">待审核</view>
				</view>
				<view class="resele">
					<view class="resele-title">
						你在王者累计氪的钱，换到现实能买什么？
					</view>
					<view class="resele-img">
						<image src="/static/newPage/17.png" mode="aspectFill"></image>
					</view>
					<view class="contact-us">
						<view class="contact-title">
							<text class="vertical-bar"></text>
							<text>联系方式</text>
						</view>
						<view class="contact-item">QQ号码  689897858</view>
						<view class="contact-item">QQ号码  689897858</view>
						<view class="contact-item">QQ号码  689897858</view>
					</view>
				</view>
				<view class="btns">
					<button class="apply">同意</button>
					<button class="look">拒绝</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				active:1,
			}
		},
		methods:{
			getTab(index){
				// 切换tab
				this.active = index;
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
		.tab-list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			position: fixed;
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			left: 0;
			width: 100%;
			z-index: 1024;
			.tab-item {
				font-size: 28rpx;
				color: #868686;
				font-weight: 500;
				line-height: 88rpx;
				position: relative;
				span {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					display: inline-block;
					width: 40rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background: #36373D;
				}
			}
			.active {
				font-size: 32rpx;
				color: #36373D;
				font-weight: 700;
			}
		}
		
		.list {
			padding: 24rpx;
			.item {
				background: #fff;
				border-radius: 4px;
				padding: 24rpx;
				margin-bottom: 24rpx;
				.time-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.user {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 24rpx;
						}
						.user-info{
							view {
								line-height: 40rpx;
							}
							.user-name {
								font-size: 28rpx;
							}
							.user-time{
								font-size: 24rpx;
								color: #999;
							}
						}
					}
					.status {
						font-size: 28rpx;
						color: #36373D;
					}
				}
				.resele {
					// display: flex;
					// justify-content: space-between;
					// align-items: flex-start;
					padding-bottom: 24rpx;
					border-bottom: 1rpx solid #DDDDDD;
					image{
						width: 200rpx;
						height: 148rpx;
					}
					.resele-title {
						font-size: 28rpx;
						color: #36373D;
						font-weight: 500;
					}
					
					.resele-img {
						margin-top: 24rpx;
						image {
							width: 200rpx;
							height: 200rpx;
							margin-right: 13rpx;
						}
					}
					.contact-us {
						margin-top: 24rpx;
						.contact-title {
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
						.contact-item {
							margin-top: 24rpx;
							font-size: 28rpx;
							color: #19212D;
						}
					}
				}
				.btns {
					padding-top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.apply {
						width: 160rpx;
						line-height: 60rpx;
						background: #F8F8F8;
						font-size: 24rpx;
						margin-right: 24rpx;
					}
					.look {
						width: 160rpx;
						line-height: 60rpx;
						background: #295B7B;
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
		}
	}
</style>