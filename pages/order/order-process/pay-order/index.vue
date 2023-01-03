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
			

			<view class="flex align-center justify-center onlinePayPagePricepay" v-if="false">
				应付首付款
			</view>
		</view>
		
		<view class="onlinePayPageSelectPayMethods">
			<view class="onlinePayPageSelectPayMethodsText">选择支付方式</view>
			<view class="onlinePayPageSelectPayMethodsLine"></view>
			
			<view class="flex align-center justify-between"  :style="{marginTop:index !=0 ? '66rpx' : '0rpx'}" @click="changePayMethods(item.pay_type,item)" v-for="(item,index) in requestList" :key="index">
				<!-- 微信支付 start -->
				<block v-if="item.pay_type == 1">
					<view class="flex align-center">
						
						<img src="../../static/wx.png" class="PayMethodsImgs" alt="">
						<view class="PayMethodsText" >{{item.name}}
						<text class="text-999" v-if="item.is_open == 0"> (未开通)</text>
						<text style="color: #A23C30;" v-if="item.is_open == 1 && item.is_recommend == 1"> (推荐)</text>
						</view>
					</view>
					<view class="PayMethodsRightStatus">
						<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 1" mode=""></image>
						<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
					</view>
				</block>
				<!-- 微信支付 end -->
				
				
				<!-- 支付宝 start -->
				<block v-if="item.pay_type == 2">
						<view class="flex align-center">
							<img src="../../static/zfb.png" class="PayMethodsImgs" alt="">
							<view class="PayMethodsText" >{{item.name}}
								<text class="text-999" v-if="item.is_open == 0"> (未开通)</text>
								<text style="color: #A23C30;" v-if="item.is_open == 1 && item.is_recommend == 1"> (推荐)</text>
								</view>
						</view>
						<view class="PayMethodsRightStatus">
							<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 2" mode=""></image>
							<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
						</view>
					
				</block>
				<!-- 支付宝 end -->
				
				<!-- 余额支付 start -->
				<block v-if="item.pay_type == 3">
						<view class="flex align-center">
							<img src="../../static/ye.png" class="PayMethodsImgs" alt="">
							<view class="PayMethodsText" >
								余额支付
							<text class="text-999" v-if="item.is_open == 0"> (未开通)</text>
							<text style="color: #A23C30;" v-if="item.is_open == 1 && item.is_recommend == 1"> (推荐)</text>
							</view>
						</view>
						<view class="PayMethodsRightStatus">
							<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 3" mode=""></image>
							<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
						</view>
				</block>
				<!-- 余额支付 end -->
				
			</view>
			<!-- <view class="flex align-center justify-between" @click="changePayMethods(1)">
				<view class="flex align-center">
					<img src="../../static/wx.png" class="PayMethodsImgs" alt="">
					<view class="PayMethodsText" >微信支付
					<text style="color: #A23C30;"> (推荐)</text>
					</view>
				</view>
				<view class="PayMethodsRightStatus">
					<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 1" mode=""></image>
					<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
				</view>
			</view>
			
			<view class="flex align-center justify-between" style="margin-top: 66rpx;" @click="changePayMethods(2)">
				<view class="flex align-center">
					<img src="../../static/zfb.png" class="PayMethodsImgs" alt="">
					<view class="PayMethodsText" >支付宝支付
						<text class="text-999"> (未开通)</text>
					</view>
				</view>
				<view class="PayMethodsRightStatus">
					<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 2" mode=""></image>
					<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
				</view>
			</view>
			<view class="flex align-center justify-between" style="margin-top: 66rpx;" @click="changePayMethods(3)">
				<view class="flex align-center">
					<img src="../../static/ye.png" class="PayMethodsImgs" alt="">
					<view class="PayMethodsText" >余额支付</view>
				</view>
				<view class="PayMethodsRightStatus">
					<image src="../../static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 3" mode=""></image>
					<image src="../../static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
				</view>
			</view> -->
		</view>
		<view style="color: #333;padding: 32rpx;" @click="gotoKefushangpin">温馨提示:如遇支付失败请及时
		<text style="color: #4177DD;">联系客服</text>
		手动支付,以免超时扣款或被他人抢购。</view>
		<!-- <view style="color: #333;padding: 32rpx;">温馨提示:如遇支付失败请及时联系客服手动支付,以免超时扣款或被他人抢购。</view> -->
		<fu-popup mode="center" v-model="isShowPopup">
			<view class="bg-white" style="width: 580rpx;height: 341rpx;border-radius: 4rpx;">
				<view class="text-center text-lg text-weight-500" style="padding: 40rpx 0 32rpx;color: #36373D;">温馨提示</view>
				<!-- 全款 -->
				<view style="height: 80rpx;margin-bottom: 40rpx;padding: 0 26rpx;color: #868686;" class="text-df" v-if="isfenqi == 2">订单需等待后台客服审核是否予以通过。若未能通过分期申请号款会自动退回。</view>
				<!-- 分期 -->
				<view style="height: 80rpx;margin-bottom: 40rpx;padding: 0 26rpx;color: #868686;" class="text-df" v-if="isfenqi == 1">分期订单需等待后台客服审核是否予以通过。若未能通过分期申请号款会自动回</view>
				<view class="flex align-center justify-center">
					<view style="width: 188rpx;
height: 64rpx;
background: #659BC7;border-radius: 4rpx;line-height: 64rpx;" @click="gotoBack()" class="text-center text-weight-500 text-white">确认</view>
				</view>
			</view>
		</fu-popup>
		<!-- 支付按钮 -->
		<button type="default" @click="comfirmPay" class="onlinePayBottomBtn" :loading="confirmPayLoading">立即支付</button>
	</view>
</template>

<script>
	import {SHAREURL,CUSTOMER53URL} from '@/common/config.js';
	export default {
		data() {
			return {
				payprice:'0.00',
				paymethod:1,
				confirmPayLoading:false,
				isShowPopup:false,
				orderNo:'',
				isfenqi:'',
				requestList:[],
				timeer:null
			}
		},
		onLoad(options) {
			this.huoquzhifushifoukaitong();
			this.orderNo = options.orderNo || '';
			if(!this.timeer) {
				this.timeer = setInterval(() => {
					console.log('2222');
					// uni.showLoading({
					// 	title:'请求接口中...'})
					this.dingshiqi();
				},1000)
			}
			
			this.gamegetorderprice();
			this.payprice = options.price || '';
			this.isfenqi = uni.getStorageSync('isfenqi') || '';
			let sHref =decodeURIComponent(window.location.href);
			// let sHref = decodeURIComponent('https://zhiyuanhuyu.niurenjianzhan.com/h5/#/pages/makeorder/onlinepaysuccess/index?charset=utf-8&out_trade_no=GH20220707105811953908&method=alipay.trade.wap.pay.return&total_amount=0.01&sign=PPC563hvVxw%2FvkZA8RwmYZp3%2FjGCJOQFVX5cJDMTy83YJWK0rpFrT2NiG0drZwrdaztgnPJ5w4C5KM40TGRXHGiAbB6nMMLTv23pu4WWLTTbPIpRaDhmlmnpyPEYJVIVz759hEwO84hGF8n3uWfT4apYEaqbKc7JKTvoJC%2FQGGAFaanlc0%2BxcEWzyHs1nVIVZyZiTR4JYWugDGdLFnIrOWVsubzzhc9q2LewCjexyBfkAGG3o2ozHy1Ck7mGs1hrVPxkj9bjXO%2FnnYdSatQGM39y%2FPayAqg2AWZuKNgTikQ%2B7I0UcvnXlJLiZ1d4NGt2nIJAFX0vKbTe3gPn02w7EQ%3D%3D&trade_no=2022070722001455061439951179&auth_app_id=2021003130618411&version=1.0&app_id=2021003130618411&sign_type=RSA2&seller_id=2088341254142505&timestamp=2022-07-07%2010%3A58%3A27')
			let sArgName = 'out_trade_no';
			
			if(this.GetArgsFromHref(sHref,sArgName)) {
				this.orderNo = this.GetArgsFromHref(sHref,sArgName);
				this.payprice = this.GetArgsFromHref(sHref,'total_amount');
				// this.gamecheckpaystatus();
			}
			
			
		},
		onShow() {
		},
		methods:{
			dingshiqi() {
				// uni.showLoading({
				// 	title:global.apiUrls.gamecheckpaystatus + '你好',
				// })
				
				this.$api.post(global.apiUrls.gamecheckpaystatus,{
					order_no:this.orderNo
				}).then(res => {
					if(res.data.code == 1) {
						// uni.redirectTo({
						// 	url:'/pages/order/order-process/pay-order/success'
						// })
						 // uni.hideLoading();
						uni.redirectTo({
							url:'/pages/makeorder/yuesuccess/index'
						})
						// uni.showLoading({
						// 	title:'进来了'
						// })
						// setTimeout(() => {
						// 	uni.hideLoading();
						// },500)
						// window.location.href = SHAREURL + 'pages/makeorder/yuesuccess/index';
						clearInterval(this.timeer);
						this.timeer = null;
					} else{
						// uni.showLoading({
						// 	title:this.orderNo
						// })
						// setTimeout(() => {
						// 	uni.hideLoading();
						// },500)
						
					}
					
				})
			},
			gotoKefushangpin() {
					  window.location.href = CUSTOMER53URL;
			},
			huoquzhifushifoukaitong() {
				this.$api.post(global.apiUrls.huoquzhifushifoukaitong,).then(res => {
					if(res.data.code == 1) {
						 let paymethod= 3;
						 
						 for(var i = 0;i < res.data.data.length; i++) {
							 if(res.data.data[i].is_open == 1 && res.data.data[i].is_recommend == 1) {
								 console.log('进来了')
								 paymethod = res.data.data[i].pay_type; 
								 console.log(paymethod);
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
			gamegetorderprice() {
				this.$api.post(global.apiUrls.gamegetorderprice,{
					order_no:this.orderNo
				}).then(res => {
					if(res.data.code == 1) {
						this.payprice = res.data.data.price;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamecheckpaystatus() {
				this.$api.post(global.apiUrls.gamecheckpaystatus,{
					order_no:this.orderNo
				}).then(res => {
					// this.statusCode = res.data.code;
					// if(this.statusCode == 2 || res.data.code == 0) {
						// this.titleName = '支付失败';
					// }
					if(res.data.code == 1) {
						// this.titleName = '支付成功';
						this.isShowPopup = true;
						// this.onlinepaySuccessPageText = res.data.data.estimation_wechat_group_rule;
						// this.estimation_wechat_code = res.data.data.estimation_wechat_code;
					} else {
						// this.$message.info(res.data.msg);
						if(res.data.code == 0 || res.data.code == 2 ) {
							this.$message.info(res.data.msg);
							setTimeout(() => {
									uni.navigateBack({
										delta:1
									})
							},700)
						} else {
							this.$message.info(res.data.msg);
						}
						
						
					}
				})
			},
			GetArgsFromHref(sHref, sArgName)
			{
			      var args    = sHref.split("?");
			      var retval = "";
			     
			      if(args[0] == sHref) /*参数为空*/
			      {
			          return retval; /*无需做任何处理*/
			     }  
			      var str = args[1];
			      args = str.split("&");
			     for(var i = 0; i < args.length; i ++)
			     {
			         str = args[i];
			          var arg = str.split("=");
			         if(arg.length <= 1) continue;
			          if(arg[0] == sArgName) retval = arg[1]; 
			      }
			      return retval;
			},
			changePayMethods(idx,item) {
				// if(idx == 1) {
				// 	this.$message.info('微信支付暂未开通')
				// 	return;
				// }
				if(item.is_open === 0) {
					this.$message.info(item.name + '暂未开通')
					return;
				}
				
				if(idx == this.paymethod) {
					return;
				}
				this.paymethod = idx;
			},
			
			comfirmPay() {
				this.confirmPayLoading = true;
				if(this.paymethod == 1) {
					this.wxPay()
				} else if(this.paymethod == 2) {
					this.zfbPay()
				} else {
					this.yuePay();
				}
			},
			yuePay() {
				this.$api.post(global.apiUrls.gamepayorder,{
					pay_type:3,
					client_type:2,
					order_no:this.orderNo,
				}).then(res => {
					if(res.data.code == 1) {
						// uni.redirectTo({
						// 	url:'/pages/order/order-process/pay-order/success'
						// })
						uni.redirectTo({
							// url:'/pages/makeorder/onlinepaysuccess/index?out_trade_no=' + this.orderNo
							url:'/pages/makeorder/yuesuccess/index'
						})
					} else {
						this.$message.info(res.data.msg);
					}
					this.confirmPayLoading = false;
				})
			},
			wxPay() {
				this.$api.post(global.apiUrls.gamepayorder,{
					pay_type:1,
					client_type:2,
					order_no:this.orderNo,
					return_url:SHAREURL + 'pages/order/order-process/pay-order/success',
					quit_url:SHAREURL + 'pages/order/order-process/pay-order/index?orderNo=' + this.orderNo + '&price=' + this.payprice
				}).then(res => {
					if(res.data.code == 1) {
						// window.location.href = res.data.data.mweb_url;
						window.location.href = res.data.data.expend.wx_h5_pay_url
						 + '&redirect_url=' + encodeURIComponent(SHAREURL + 'pages/order/order-process/pay-order/success');
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
				this.isShowPopup = true;
				// this.$urouter.redirectTo('/pages/makeorder/onlinepaysuccess/index');
			},
			gotoBack() {
				this.isShowPopup = false;
				uni.setStorageSync('isfenqi','');
				// #ifdef H5
				window.history.back(-1);
				// #endif
				return;
				uni.navigateBack({
					delta:1
				})
			},
			zfbPay() {
				this.$api.post(global.apiUrls.gamepayorder,{
					pay_type:2,
					client_type:2,
					order_no:this.orderNo,
					return_url:SHAREURL + 'pages/order/order-process/pay-order/success',
					quit_url:SHAREURL + 'pages/order/order-process/pay-order/index?orderNo=' + this.orderNo + '&price=' + this.payprice
				}).then(res => {
					if(res.data.code == 1) {
						 uni.hideLoading();
						// document.querySelector('body').innerHTML = res.data.data;
						//  document.forms[0].submit();
						// window.location.replace(res.data.data);
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