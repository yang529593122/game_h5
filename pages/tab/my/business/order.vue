<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item" v-for='(item ,index) in BUSINESS_ORDER_NAV_DATAS' :key="index" @click="getTab(item,index)" :class="[active===index ? 'active' :'']">
				{{ item.title }}<span v-if="active===index "></span>
			</view>
		</view>
		<view style="height: 110rpx;"></view>
		<view class="shop-list">
			<view class="shop-item" v-for="item in 10" :key="item">
				<view class="shop-number">
					<view class="number">
						<text>商品编号：ZA83298292839</text>
						<image @click="getCopy(item)" src="/static/newPage/65.png" mode="aspectFill"></image>
					</view>
					<text class="shop-status">审核中</text>
				</view>
				<view class="shop-info">
					<image class="shop-img" src="/static/newPage/17.png" mode="aspectFill"></image>
					<view class="shop-info-other">
						<view class="shop-name">
							王者荣耀代练刷排位代打购买全皮
							肤国标服V10账号
						</view>
						<view class="shop-price">
							<text>￥</text>
							<text>200</text>
							<text>￥300</text>
						</view>
					</view>
				</view>
				<view class="btns">
					<button class="btns1">删除</button>
					<button class="btns2">失败原因</button>
					<button class="btns3">编辑商品</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  import { BUSINESS_ORDER_NAV_DATAS } from "@/common/constStatic.js"
	export default{
		data(){
			return{
        BUSINESS_ORDER_NAV_DATAS,
				active:0,
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/newPage/shop/addItem'
				})
			}
		},
		methods:{
      getTab(item,index){
        this.active = index
      },
			getCopy(url){
				// 复制订单号
				uni.setClipboardData({
					data:url,
					success:()=> {
						console.log('设置成功')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
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
		.shop-list {
			width: 702rpx;
			margin: 0 auto;
			.shop-item {
				background: #fff;
				margin-top: 24rpx;
				padding: 24rpx;
				.shop-number {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.number {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text {
							font-size: 28rpx;
							color:#8C9199 ;
							margin-right: 20rpx;
						}
						image {
							width: 28rpx;
							height: 28rpx;
						}
					}
					.shop-status {
						font-size: 28rpx;
						font-weight: 600;
					}
				}
				.shop-info {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					padding-bottom: 32rpx;
					border-bottom: 1rpx solid #DDDDDD;
					.shop-img {
						width: 200rpx;
						height: 148rpx;
						margin-right: 24rpx;
					}
					.shop-info-other {
						width: 420rpx;
						height: 148rpx;
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-direction: column;
						.shop-name {
							font-size: 28rpx;
							color: #36373D;
							font-weight: 500;
						}
						.shop-price {
							text {
								font-weight: bold;
								color: #F55B29;
							}
							text:nth-child(1){
								font-size: 24rpx;
							}
							text:nth-child(2){
								font-size: 32rpx;
							}
							text:nth-child(3){
								font-size: 24rpx;
								color: #919191;
								font-weight: 400;
								margin-left: 10rpx;
								text-decoration: line-through;
							}
						}
					}
				}

				.btns {
					padding-top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					button {
						height: 60rpx;
						width: 170rpx;
						line-height: 60rpx;
						background: #295B7B;
						color: #fff;
						font-size: 24rpx;
					}
					.btns1,.btns2{
						height: 60rpx;
						line-height: 60rpx;
						background: #F8F8F8;
						color: #333;
						margin-right: 24rpx;
					}
				}
			}
		}
	}
</style>
