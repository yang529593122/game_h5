<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="item in 10" :key="item">
				<view class="time-item">
					<view class="times">提交日期：2022-09-12 12:00:00</view>
					<view style="status">待审核</view>
				</view>
				<view class="resele">
					<view class="resele-title">
						你在王者累计氪的钱，换到现实能买什么？
					</view>
				</view>
				<view class="btns">
					<button class="apply refuse">去评价</button>
					<button class="look" @click="handleJump"
					data-url="/pages/newPage/makeFriends/socialContactdetail">查看详情</button>
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