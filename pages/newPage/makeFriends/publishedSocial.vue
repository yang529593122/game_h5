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
					<view class="times">提交日期：2022-09-12 12:00:00</view>
					<view style="status">待审核</view>
				</view>
				<view class="resele">
					<image src="/static/logo.png" mode="aspectFill"></image>
					<view class="resele-title">
						你在王者累计氪的钱，换到现实能买什么？
					</view>
				</view>
				<view class="btns">
					<button class="apply" @click="handleJump"
					data-url="/pages/newPage/makeFriends/applicationList">申请列表</button>
					<button class="apply refuse">拒绝原因</button>
					<button class="look" @click="handleJump"
					data-url="/pages/newPage/makeFriends/postingDetails">查看详情</button>
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
					.times {
						font-size: 28rpx;
						color: #8C9199;
					}
					.status {
						font-size: 28rpx;
						color: #36373D;
					}
				}
				.resele {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding-bottom: 24rpx;
					border-bottom: 1rpx solid #DDDDDD;
					image{
						width: 200rpx;
						height: 148rpx;
					}
					.resele-title {
						width: 430rpx;
						font-size: 28rpx;
						color: #36373D;
						font-weight: 500;
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