<template>
	<view class="onlinepaySuccessPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				{{titleName}}
			</view>
		</fu-custom>
		
		<block v-if="statusCode == 1">
			<view class="onlinepaySuccessPageContent flex align-center justify-center" style="margin-top: 49rpx;">
				<view class="onlinepaySuccessPageContentImg">
					<image :src="estimation_wechat_code"></image>
				</view>
			</view>
			
			<view class="flex justify-center" style="margin-top: 40rpx;">
				<view class="onlinepaySuccessPageText">
					<jyf-parser :html="onlinepaySuccessPageText"></jyf-parser>
				</view>
			</view>
			
			<view style="height: 300rpx;"></view>
			<button type="default" @click="comfirmPay" class="onlinePayBottomBtn" :loading="confirmPayLoading">查看进度</button>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlinepaySuccessPageText:``,
				confirmPayLoading:false,
				order_no:'',
				statusCode:'',
				titleName:'',
				estimation_wechat_code:''
			}
		},
		onLoad() {
			let sHref =decodeURIComponent(window.location.href);
			// let sHref = decodeURIComponent('https://zhiyuanhuyu.niurenjianzhan.com/h5/#/pages/makeorder/onlinepaysuccess/index?charset=utf-8&out_trade_no=GH20220707105811953908&method=alipay.trade.wap.pay.return&total_amount=0.01&sign=PPC563hvVxw%2FvkZA8RwmYZp3%2FjGCJOQFVX5cJDMTy83YJWK0rpFrT2NiG0drZwrdaztgnPJ5w4C5KM40TGRXHGiAbB6nMMLTv23pu4WWLTTbPIpRaDhmlmnpyPEYJVIVz759hEwO84hGF8n3uWfT4apYEaqbKc7JKTvoJC%2FQGGAFaanlc0%2BxcEWzyHs1nVIVZyZiTR4JYWugDGdLFnIrOWVsubzzhc9q2LewCjexyBfkAGG3o2ozHy1Ck7mGs1hrVPxkj9bjXO%2FnnYdSatQGM39y%2FPayAqg2AWZuKNgTikQ%2B7I0UcvnXlJLiZ1d4NGt2nIJAFX0vKbTe3gPn02w7EQ%3D%3D&trade_no=2022070722001455061439951179&auth_app_id=2021003130618411&version=1.0&app_id=2021003130618411&sign_type=RSA2&seller_id=2088341254142505&timestamp=2022-07-07%2010%3A58%3A27')
			let sArgName = 'out_trade_no';
			this.order_no = this.GetArgsFromHref(sHref,sArgName);
			// this.order_no = 'GH20220630145343145275';
			this.gamecheckpaystatus();
			// console.log(this.GetArgsFromHref(sHref,sArgName));
		},
		methods: {
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
			gamecheckpaystatus() {
				this.$api.post(global.apiUrls.gamecheckpaystatus,{
					order_no:this.order_no
				}).then(res => {
					this.statusCode = res.data.code;
					if(this.statusCode == 2 || res.data.code == 0) {
						this.titleName = '支付失败';
					}
					if(res.data.code == 1) {
						this.titleName = '支付成功';
						this.onlinepaySuccessPageText = res.data.data.estimation_wechat_group_rule;
						this.estimation_wechat_code = res.data.data.estimation_wechat_code;
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
			comfirmPay() {
				// 我的估价订单列表
				this.$urouter.redirectTo('/pages/order/order-list/guindex')
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.onlinepaySuccessPageContent {
		.onlinepaySuccessPageContentImg {
			width: 529rpx;
			height: 694rpx;
			border-radius: 8rpx;
			background: #FFFFFF;
			// border: 1px solid #707070;
		}
	}
	
	.onlinepaySuccessPageText {
		width: 686rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 36rpx;
		color: #868686;
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