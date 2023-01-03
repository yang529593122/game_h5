<template>
	<view class="onlinePayPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				立即支付
			</view>
		</fu-custom>
		
		<view class="onlinePayPagePrice">
			<view class="flex justify-center align-center">
				<text class="onlinePayPagePriceFu">¥</text>
				<text class="onlinePayPagePricePrice">{{payprice}}</text>
			</view>
			
			<view class="flex align-center justify-center onlinePayPagePricepay">
				应付砍价定金
			</view>
			<view class="flex align-center justify-center onlinePayPagePricepay">
				砍价成功只需支付定金外金额即可
			</view>
		</view>
		
		<view class="onlinePayPageSelectPayMethods">
			<view class="onlinePayPageSelectPayMethodsText">选择支付方式</view>
			<view class="onlinePayPageSelectPayMethodsLine"></view>
			<view class="flex align-center justify-between" @click="changePayMethods(1)">
				<view class="flex align-center">
					<img src="../static/wx.png" class="PayMethodsImgs" alt="">
					<view class="PayMethodsText" >微信支付</view>
				</view>
				<view class="PayMethodsRightStatus">
					<image src="../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 1" mode=""></image>
					<image src="../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
				</view>
			</view>
			
			<view class="flex align-center justify-between" style="margin-top: 66rpx;" @click="changePayMethods(2)">
				<view class="flex align-center">
					<img src="../static/zfb.png" class="PayMethodsImgs" alt="">
					<view class="PayMethodsText" >支付宝支付</view>
				</view>
				<view class="PayMethodsRightStatus">
					<image src="../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 2" mode=""></image>
					<image src="../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
				</view>
			</view>
		</view>
		
		
		<!-- 支付按钮 -->
		<button type="default" @click="comfirmPay" class="onlinePayBottomBtn" :loading="confirmPayLoading">立即支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payprice:'0.00',
				paymethod:1,
				confirmPayLoading:false,
				orderNo:''
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo;
			this.payprice = options.price;
			// this.gamegetgamegoodsinfo();
		},
		methods:{
			gamegetgamegoodsinfo() {
				this.$api.post(global.apiUrls.gamegetgamegoodsinfo,{
					order_no:this.orderNo
				}).then(res => {
					if(res.data.code == 1) {
						
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			changePayMethods(idx) {
				if(idx == this.paymethod) {
					return;
				}
				this.paymethod = idx;
			},
			
			comfirmPay() {
				this.confirmPayLoading = true;
				if(this.paymethod == 1) {
					this.wxPay()
				} else {
					this.zfbPay()
				}
			},
			
			wxPay() {
				this.$api.post(global.apiUrls.gamepayorder,{
					pay_type:1,
					client_type:2,
					order_no:this.orderNo
				}).then(res => {
					if(res.data.code == 1) {
						
					} else {
						this.$message.info(res.data.msg);
					}
					this.confirmPayLoading = false;
				})
				return;
				
				this.paySuccess();
			},
			
			paySuccess() {
				// uni.redirectTo({
					
				// })
				this.$urouter.redirectTo('/pages/makeorder/onlinepaysuccess/index');
			},
			zfbPay() {
				this.$api.post(global.apiUrls.gamepayorder,{
					pay_type:2,
					client_type:2,
					order_no:this.orderNo
				}).then(res => {
					if(res.data.code == 1) {
						document.querySelector('body').innerHTML = res.data.data;
						 document.forms[0].submit();
					} else {
						this.$message.info(res.data.msg);
					}
					this.confirmPayLoading = false;
				})
				return;
				this.paySuccess();
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.onlinePayPage {
		
	}
	
	.onlinePayPagePrice {
		padding: 62rpx 0 77rpx;
		background: #fff;
	}
	
	.onlinePayPagePriceFu {
		font-size: 32rpx;
		font-family: Helvetica Neue;
		font-weight: bold;
		color: #F55B29;
	}
	
	.onlinePayPagePricePrice {
		font-size: 64rpx;
		font-family: Helvetica Neue;
		font-weight: bold;
		color: #F55B29;
		margin-left: 10rpx;
	}
	
	.onlinePayPagePricepay {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		margin-top: 15rpx;
		// line-height: 0px;
		color: #868686;
	}
	
	.onlinePayPageSelectPayMethods {
		margin-top: 20rpx;
		padding: 32rpx;
		background: #fff;
		
		.onlinePayPageSelectPayMethodsText {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #444444;
		}
		
		.onlinePayPageSelectPayMethodsLine {
			width: 686rpx;
			height: 1px;
			background: #EEEEEE;
			margin-top: 32rpx;
			margin-bottom: 32rpx;
		}
	}
	
	.PayMethodsImgs {
		width: 56rpx;
		height: 56rpx;
	}
	
	.PayMethodsText {
		font-size: 32rpx;
		font-family: PingFang SC;
		color: #333333;
		margin-left: 24rpx;
	}
	
	.PayMethodsRightStatus {
		width: 36rpx;
		height: 36rpx;
	}
	
	.onlinePayBottomBtn {
		position: fixed;
		bottom: 40rpx;
		left: 32rpx;
		width: 686rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #295B7B;
		border-radius: 0;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>