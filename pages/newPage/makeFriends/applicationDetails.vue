<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="item in 10">
				<view class="item-img">
					<image class="item-images" src="/static//newPage/17.png" mode="aspectFill"></image>
					<image class="img-tip" src="/static/cart/sellOut.png" mode="aspectFill"></image>
					<image class="select-icon" src="/static/newPage/11.png" mode="aspectFill"></image>
				</view>
				<view class="item-name">
					<text>[包赔] </text>
					<text>王者荣耀王者10颗星纯自己打上去的</text>
				</view>
				<view class="shop-num">
					商品编号：KIJI89686
				</view>
				<view class="price">
					<text>￥</text>
					<text>200</text>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="delete">
			<view class="all-select">
				<image src="/static/newPage/11.png" mode="aspectFill"></image>
				<text>全选</text>
			</view>
			<button class="delete-btn">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allSelect: false, //是否全选
				allSelectShow:false,//全选显示
			}
		},
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();
			if (e.text == '编辑') {
				webView.setTitleNViewButtonBadge({
					index: 0,
					text: '完成',
				});
				this.allSelectShow = true;
			} else {
				webView.setTitleNViewButtonBadge({
					index: 0,
					text: '编辑',
				});
				this.allSelectShow = false;
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	.content {

		.list {
			padding: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;

			.item {
				background: #fff;
				width: 341rpx;
				padding: 24rpx;
				margin-bottom: 24rpx;

				.item-img {
					position: relative;
					
					.select-icon {
						width: 36rpx;
						height: 36rpx;
						position: absolute;
						right: 20rpx;
						top: 20rpx;
					}

					.item-images {
						width: 310rpx;
						height: 229rpx;
					}

					.img-tip {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 100rpx;
						height: 100rpx;
						z-index: 100;
					}
				}

				.item-name {
					font-size: 28rpx;
					color: #333;
					margin: 16rpx 0;
					line-height: 40rpx;

					text:nth-child(1) {
						color: #659BC7;
					}

					text:nth-child(2) {
						font-weight: 500;
					}
				}

				.shop-num {
					font-size: 20rpx;
					color: #868686;
				}

				.price {
					margin-top: 20rpx;
					color: #F55B29;
					font-weight: bold;
					font-size: 32rpx;

					text:nth-child(1) {
						font-size: 24rpx;
					}
				}
			}
		}

		.delete {
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 14rpx 12rpx 14rpx 32rpx;
			z-index: 100;

			.all-select {
				image {
					width: 36rpx;
					height: 36rpx;
					vertical-align: middle;
				}

				text {
					font-size: 29rpx;
					color: #36373D;
					vertical-align: middle;
					margin-left: 10rpx;
				}
			}

			.delete-btn {
				width: 200rpx;
				height: 72rpx;
				line-height: 72rpx;
				background: #F02525;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>
