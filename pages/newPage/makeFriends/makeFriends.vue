<template>
	<view class="content">
		<view class="header">
			<view class="left" @click="navBack" >
				<image src="@/components/benben-calendar/static/arrow-left.png" mode=""></image>
			</view>
			<view class="title">交U专区</view>
			<view class="right">
				<view class="screen" @click="popupShow=true">
					<image src="/static/newPage/4.png" mode="aspectFill"></image>
					<view>筛选</view>
				</view>
				<view class="screen release" @click="handleJump"
					data-url="/pages/newPage/makeFriends/release">
					<image src="/static/newPage/5.png" mode="aspectFill"></image>
					<view>发布</view>
				</view>
			</view>
		</view>
		<!-- tab切换 -->
		<view class="tab-list">
			<view class="tab-item" @click="getActive(1)" :class="{active:tab==1}">热度</view>
			<view class="tab-item" @click="getActive(2)" :class="{active:tab==2}">
				<text>时间</text>
				<view class="screen-img">
					<image src="/static/newPage/8.png" mode="aspectFill"></image>
					<image src="/static/newPage/6.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item" @click="getActive(3)" :class="{active:tab==3}">
				<text>最新评论</text>
				<view class="screen-img">
					<image src="/static/newPage/8.png" mode="aspectFill"></image>
					<image src="/static/newPage/6.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view style="height: 176rpx;"></view>
		<!-- 列表 -->
		<view class="shop-list" @click.stop="getPath('/pages/newPage/makeFriends/socialContactdetail')">
			<view class="shop-item" v-for="item in 10" :key="item">
				<image src="/static/logo.png" mode="aspectFill"></image>
				<view class="shop-name">
					你在王者累计氪的钱，换到现实能买什么？胡…
				</view>
				<view class="shop-label">
					<view class="label-list">
						<text>王者</text>
					</view>
					<view class="look-num">
						<image src="/static/newPage/10.png" mode="aspectFill"></image>
						<text>10</text>
					</view>
				</view>
				<view class="shop-price">
					<image src="/static/newPage/1.png" mode="aspectFill"></image>
					<text>菜菜很菜</text>
				</view>
			</view>
		</view>

		<!-- 筛选 -->
		<benben-popup v-model="popupShow" mode="bottom">
			<view class="popup">
				<view class="popup-title">
					<text class="cancel" @click.stop="popupShow=false">取消</text>
					<text class="pop-title">选择标签</text>
					<text class="getyes" @click.stop="getYes">确定</text>
				</view>
				<view class="game-type">
					<view class="type-list" v-for="item in 4" :key="item">
						<view class="types-item">
							<text v-for="item in 3" :key="item">王者荣耀</text>
						</view>
						<image @click="getselect(item)" src="/static/newPage/11.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="my-select">
					<text>我的选择</text>
					<text>至少选择1个，最多选择6个</text>
				</view>
				<view class="select-list">
            <view class="select-item" :class="{'select-active':select==item}" v-for="item in 10" :key="item">
            	王者荣耀
              <view class="postimg">
                <image src="/static/newPage/13.png" mode="aspectFill"></image>
              </view>
            </view>
				</view>
			</view>
		</benben-popup>
	</view>
</template>

<script>
	import benbenPopup from '@/components/benben-popup/benben-popup.vue'
	export default {
		components:{benbenPopup},
		data() {
			return {
				tab: 1,
				popupShow:false,
				select:1,
			}
		},
		methods: {
			navBack(){
				// 返回上一页
				uni.navigateBack();
			},
			getActive(index) {
				this.tab = index;
			},
			getYes(e){
				console.log(e);
			},
			// 选择
			getselect(){

			},
			getPath(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 32rpx;
			background: #fff;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1024;

			.left {
				width: 150rpx;

				image {
					width: 40rpx;
					height: 35rpx;
				}
			}

			.title {
				font-size: 36rpx;
				font-weight: 500;
			}

			.right {
				width: 150rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.screen {
					text-align: center;

					image {
						width: 32rpx;
						height: 32rpx;
						vertical-align: top;
					}

					view {
						font-size: 24rpx;
						color: #36373D;
					}
				}

				.release {
					margin-left: 40rpx;
				}
			}
		}

		.tab-list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			position: fixed;
			top: 88rpx;
			left: 0;
			width: 100%;
			z-index: 1024;

			.tab-item {
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 88rpx;
				width: 200rpx;
				color: #868686;
				font-size: 28rpx;

				text {
					margin-right: 16rpx;
				}

				.screen-img {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: column;

					image {
						width: 25rpx;
						height: 12rpx;
					}

					image:nth-child(2) {
						margin-top: 5rpx;
					}
				}
			}

			.active {
				color: #36373D;
				font-weight: 600;
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
				}
				.shop-label{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 24rpx;
					.label-list{
						text{
							display: inline-block;
							line-height: 44rpx;
							padding: 0 10rpx;
							background: rgba(41,91,123,0.3);
							color: #295B7B;
							font-size: 20rpx;
						}
					}
					.look-num{
						display: flex;
						justify-content: flex-end;
						align-items: center;
						image{
							width: 24rpx;
							height: 24rpx;
							margin-right: 5rpx;
						}
						text{
							font-size: 20rpx;
							color: #868686;
						}
					}
				}
				.shop-price{
					font-size: 32rpx;
					margin-top: 22rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					text{
						margin-left: 10rpx;
						font-size: 20rpx;
						color: #868686;
					}
					image{
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
		}

		.popup{
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;

			.popup-title {
				padding: 0 32rpx;
				line-height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #EEEEEE;
				.cancel{
					font-size: 32rpx;
					color: #BFBFBF;
				}
				.pop-title {
					font-size: 32rpx;
					color: #333333;
				}
				.getyes{
					font-size: 32rpx;
					color: #295B7B;
					font-weight: 500;
				}
			}
			.line{
				width: 100%;
				height: 10rpx;
				background: #FAFAFC;
			}
			.game-type{
				padding: 0 32rpx 32rpx;
				.type-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 40rpx;

					.types-item {
						width: 600rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;
						text {
							display: inline-block;
							width: 120rpx;
							color: #333333;
							font-size: 28rpx;
						}
					}

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			.my-select {
				padding: 32rpx 24rpx 0;
				text{
					color: #999999;
					font-size: 28rpx;
				}
				text:nth-child(1){
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
					margin-right: 24rpx;
				}
			}
			.select-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				padding: 32rpx 24rpx;

				.select-item {
					background: #F8F8F8;
					color: #36373D;
					width: 160rpx;
					line-height: 64rpx;
					text-align: center;
					position: relative;
					font-size: 28rpx;
					margin-right: 16rpx;
					margin-bottom: 16rpx;
          .postimg{}
					image{
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						right: -10rpx;
						top: -10rpx;
            background: #fff;
            overflow: hidden;
            border-radius: 50%;
					}
				}
				.select-item:nth-child(4n){
					margin-right: 0;
				}
				.select-active {
					background: #295B7B;
					color: #fff;
				}
			}
		}
	}
</style>
