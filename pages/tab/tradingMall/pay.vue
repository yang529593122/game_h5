<template>
	<view class="onlinePayPage">
		<view class="onlinePayPagePrice">
			<view class="flex justify-center align-center">
				<text class="onlinePayPagePriceFu">¥</text>
				<text class="onlinePayPagePricePrice">{{payprice}}</text>
			</view>

			<view class="flex align-center justify-center onlinePayPagePricepay">
				应支付订单金额
			</view>
     <!-- <view class="flex align-center justify-center onlinePayPagePricepay">
      	议价成功只需支付定金外金额即可
      </view> -->
		</view>

		<view class="onlinePayPageSelectPayMethods">
			<view class="onlinePayPageSelectPayMethodsText">选择支付方式</view>
			<view class="onlinePayPageSelectPayMethodsLine"></view>
			<view
				class="flex align-center justify-between"
				:style="{marginTop:index !=0 ? '66rpx' : '0rpx'}"
				@click="changePayMethods(item.pay_type,item)"
				v-for="(item,index) in requestList"
				:key="index"
			>
				<!-- 微信支付 start -->
				<block v-if="item.pay_type == 1">
					<view class="flex align-center">

						<img
							src="./static/wx.png"
							class="PayMethodsImgs"
							alt=""
						>
						<view class="PayMethodsText">{{item.name}}
							<text
								class="text-999"
								v-if="item.is_open == 0"
							> (未开通)</text>
							<text
								style="color: #A23C30;"
								v-if="item.is_open == 1 && item.is_recommend == 1"
							> (推荐)</text>
						</view>
					</view>
					<view class="PayMethodsRightStatus">
						<image
							src="./static/xz.png"
							class="PayMethodsRightStatus"
							v-if="paymethod == 1"
							mode=""
						></image>
						<image
							src="./static/mxz.png"
							class="PayMethodsRightStatus"
							v-else
							mode=""
						></image>
					</view>
				</block>
				<!-- 微信支付 end -->


				<!-- 支付宝 start -->
				<block v-if="item.pay_type == 2">
					<view class="flex align-center">
						<img
							src="./static/zfb.png"
							class="PayMethodsImgs"
							alt=""
						>
						<view class="PayMethodsText">{{item.name}}
							<text
								class="text-999"
								v-if="item.is_open == 0"
							> (未开通)</text>
							<text
								style="color: #A23C30;"
								v-if="item.is_open == 1 && item.is_recommend == 1"
							> (推荐)</text>
						</view>
					</view>
					<view class="PayMethodsRightStatus">
						<image
							src="./static/xz.png"
							class="PayMethodsRightStatus"
							v-if="paymethod == 2"
							mode=""
						></image>
						<image
							src="./static/mxz.png"
							class="PayMethodsRightStatus"
							v-else
							mode=""
						></image>
					</view>

				</block>
				<!-- 支付宝 end -->

				<!-- 余额支付 start -->
				<block v-if="item.pay_type == 3">
					<view class="flex align-center">
						<img
							src="./static/ye.png"
							class="PayMethodsImgs"
							alt=""
						>
						<view class="PayMethodsText">
							余额支付
							<text
								class="text-999"
								v-if="item.is_open == 0"
							> (未开通)</text>
							<text
								style="color: #A23C30;"
								v-if="item.is_open == 1 && item.is_recommend == 1"
							> (¥ {{user_money}})</text>
						</view>
					</view>
					<view class="PayMethodsRightStatus">
						<image
							src="./static/xz.png"
							class="PayMethodsRightStatus"
							v-if="paymethod == 3"
							mode=""
						></image>
						<image
							src="./static/mxz.png"
							class="PayMethodsRightStatus"
							v-else
							mode=""
						></image>
					</view>
				</block>
				<!-- 余额支付 end -->

			</view>

		</view>


		<!-- 支付按钮 -->
		<button
			type="default"
			@click="comfirmPay"
			class="onlinePayBottomBtn"
			:loading="confirmPayLoading"
		>立即支付</button>
	</view>
</template>

<script>
	import { SHAREURL, CUSTOMER53URL } from '@/common/config.js';
	export default {
		data() {
			return {
				payprice: '0.00',
        user_money:0,
				paymethod: 3,
				confirmPayLoading: false,
				orderNo: '',
				requestList: [],
				timer: null
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo;
			// this.payprice = options.price;
			// if (!this.timer) {
			// 	clearInterval(this.timer)
			// 	this.timer = setInterval(() => {
			// 		this.dingshiqi();
			// 	}, 2000)
			// }
			this.huoquzhifushifoukaitong();
      this.getPrice()
		},

		methods: {
      // 获取价格
      getPrice(){
        this.$api.post(global.apiUrls.get_order_price, {
        	order_no: this.orderNo
        }).then(res => {
        	if (res.data.code == 1) {
        		const result = res.data.data
            this.payprice = result.price
            this.user_money = result.user_money
        	}
        })
      },
			dingshiqi() {
				this.$api.post(global.apiUrls.gamecheckpaystatus, {
					order_no: this.orderNo
				}).then(res => {
					if (res.data.code == 1) {
						// uni.redirectTo({
						// 	url:'/pages/makeorder/onlinepaysuccess/index?out_trade_no=' + this.orderNo
						// })
						uni.redirectTo({
							url: '/pages/makeorder/yuesuccess/index'
						})
						// window.location.href = SHAREURL + 'pages/makeorder/yuesuccess/index';
						clearInterval(this.timer);
						this.timer = null;
					}
				})
			},
			gotoKefushangpin() {
				window.location.href = CUSTOMER53URL;
			},
			huoquzhifushifoukaitong() {
				this.$api.post(global.apiUrls.huoquzhifushifoukaitong, ).then(res => {
					if (res.data.code == 1) {
						let paymethod = 3;
						for (var i = 0; i < res.data.data.length; i++) {
							if (res.data.data[i].is_open == 1 && res.data.data[i].is_recommend == 1) {
								paymethod = res.data.data[i].pay_type;
								break;
							}
						}
						this.paymethod = paymethod;
						this.requestList = res.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamegetgamegoodsinfo() {
				this.$api.post(global.apiUrls.gamegetgamegoodsinfo, {
					order_no: this.orderNo
				}).then(res => {
					if (res.data.code == 1) {

					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			changePayMethods(idx, item) {
				if (item.is_open === 0) {
					this.$message.info(item.name + '暂未开通')
					return;
				}

				if (idx == this.paymethod) {
					return;
				}
				this.paymethod = idx;
			},

			comfirmPay() {
				this.confirmPayLoading = true;
				if (this.paymethod == 1) {
					this.wxPay()
				} else if (this.paymethod == 2) {
					this.zfbPay()
				} else {
          this.paySuccess()
					// this.yuePay()
				}
			},
			yuePay() {
				this.$api.post(global.apiUrls.game_pay_order, {
					pay_type: 3,
					client_type: 2,
					order_no: this.orderNo,
				}).then(res => {
					if (res.data.code == 1) {
						uni.redirectTo({
							// url:'/pages/makeorder/onlinepaysuccess/index?out_trade_no=' + this.orderNo
							url: '/pages/bargaining/participateIn/participateIn'
						})
					} else {
						this.$message.info(res.data.msg);
					}
					this.confirmPayLoading = false;
				})


			},
			wxPay() {
				this.$api.post(global.apiUrls.gamepayorder, {
					pay_type: 1,
					client_type: 2,
					order_no: this.orderNo,
					return_url: SHAREURL + 'pages/makeorder/onlinepaysuccess/index',
					quit_url: SHAREURL + 'pages/makeorder/onlinepay/index'
				}).then(res => {
					if (res.data.code == 1) {
						// console.log(res.data)
						// return;
						// window.location.href = res.data.data.mweb_url + '&redirect_url=' + encodeURIComponent(
						// 	SHAREURL + 'pages/makeorder/onlinepaysuccess/index?out_trade_no=' + this.orderNo);

						window.location.href = res.data.data.expend.wx_h5_pay_url + '&redirect_url=' +
							encodeURIComponent(
								SHAREURL + 'pages/makeorder/onlinepaysuccess/index?out_trade_no=' + this.orderNo);
					} else {
						this.$message.info(res.data.msg);
					}
					this.confirmPayLoading = false;
				})
				return;

				this.paySuccess();
			},

			paySuccess() {
				this.$urouter.redirectTo('/pages/tab/tradingMall/pay_success');
			},
			zfbPay() {
				this.$api.post(global.apiUrls.gamepayorder, {
					pay_type: 2,
					client_type: 2,
					order_no: this.orderNo,
					return_url: SHAREURL + 'pages/makeorder/onlinepaysuccess/index',
					quit_url: SHAREURL + 'pages/makeorder/onlinepay/index'
				}).then(res => {
					if (res.data.code == 1) {
						// document.querySelector('body').innerHTML = res.data.data;
						//  document.forms[0].submit();
						window.location.href = res.data.data;
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

<style
	lang="scss"
	scoped
>
	.onlinePayPage {}

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
