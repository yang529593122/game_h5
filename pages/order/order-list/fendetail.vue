<template>
	<view class="fendetailPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				分期详情
			</view>
		</fu-custom>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<view style="padding: 46rpx 0 31rpx;" class="bg-white flex align-center">
				<view style="height: 77rpx;width: 375rpx;" class="flex justify-between flex-direction align-center">
					<view>
						<text class="text-sm text-weight-500">¥</text>
						<text class=" text-weight-500" style="font-size: 40rpx;">{{total_price}}</text>
					</view>
					<view style="color: #868686;" class="text-sm">订单金额</view>
				</view>
				<view style="height: 77rpx;width: 1rpx;background: #707070;"></view>
				<view style="height: 77rpx;width: 374rpx;" class="flex justify-between flex-direction align-center">
					<view>
						<text class="text-sm text-weight-500">¥</text>
						<text class=" text-weight-500" style="font-size: 40rpx;">{{first_price}}</text>
					</view>
					<view style="color: #868686;" class="text-sm">首付款</view>
				</view>
			</view>
			
			<view style="width: 702rpx;margin-left: 24rpx;margin-top: 24rpx;">
				<view style="height: 72rpx;width: 702rpx;background: #659BC7;" class="flex align-center justify-around">
					<view class="text-sm text-white text-center text-cut" style="width: 20%;">分期</view>
					<view class="text-sm text-white text-center text-cut" style="width: 20%;">本期尾款</view>
					<view class="text-sm text-white text-center text-cut" style="width: 20%;">手续费</view>
					<view class="text-sm text-white text-center text-cut" style="width: 20%;">合计</view>
					<view class="text-sm text-white text-center text-cut" style="width: 20%;">还款时间</view>
				</view>
				
				<view style="height: 72rpx;width: 702rpx;background: #fff;" class="flex align-center justify-around" v-for="(item,index) in fen_list" :key="index">
					<view class="text-sm text-center text-cut" style="color: #36373D;width: 20%;">第{{item.periods}}期</view>
					<view class="text-sm  text-center text-cut" style="color: #36373D;width: 20%;">￥{{item.price}}</view>
					<view class="text-sm text-center text-cut" style="color: #36373D;width: 20%;">￥{{item.fee}}</view>
					<view class="text-sm text-center text-cut" style="color: #36373D;width: 20%;">￥{{item.total_price}}</view>
					<view class="text-sm text-center text-cut" style="color: #36373D;width: 20%;">{{item.repayment_date}}</view>
				</view>
			</view>
			
			<view style="margin-top: 40rpx;margin-left: 24rpx;color: #36373D;" class="text-df text-weight-500">分期说明</view>
			<view style="padding:16rpx 24rpx;line-height: 33rpx;color: #868686;" class="text-sm">
				<jyf-parser :html="rulesText"></jyf-parser>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLoading:false,
				rulesText:``,
total_price:'',
first_price:'',
fen_list:[]
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.gamemybystagesdetail();
		},
		methods :{
			gamemybystagesdetail() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gamemybystagesdetail,{
					order_id:this.orderId
				}).then(res => {
					if(res.data.code == 1) {
						this.total_price = res.data.data.total_price;
						this.first_price = res.data.data.first_price;
						this.fen_list = res.data.data.fen_list;
						this.rulesText = res.data.data.fen_detail_explain;
					} else {
						
					}
					this.isShowLoading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.fendetailPages {
		min-height: 100vh;
		background: #FAFAFC;
	}
</style>