<template>
	<view class="orderDetailPage">
		<fu-custom isBackText bgColor="orderDetailPageTitle">
			<text class="cuIcon-back text-white" slot="backText" @click="gotoBack"></text>
			<view class="text-white" slot="content">
				订单详情
			</view>
		</fu-custom>

		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<view style="padding: 14rpx 24rpx;background: #295B7B;" class="flex align-center justify-between">
				<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;"
					v-if="status === 1 && audit_status === 0">订单支付成功</view>
				<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;"
					v-if="status === 1 && audit_status === 1">订单交易成功</view>
					<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;"
						v-if="audit_status === 2">订单已驳回</view>
				<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;" v-if="status === 0">订单未支付</view>
				<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;" v-if="status === 2">订单已取消</view>
				<view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;" v-if="status === 3">订单已超时</view>
				<!-- <view style="color: #DFE6EB;font-weight: 600;font-size: 32rpx;" v-if="item.status === 1 && item.audit_status === 1">订单交易成功</view> -->
				<view style="width: 140rpx;height: 140rpx;">
					<image src="../static/4.png" style="width: 140rpx;height: 140rpx;"></image>
				</view>
			</view>

			<view style="padding: 24rpx;">
				<view class="bg-white" style="border-radius: 4rpx;width: 100%;padding: 24rpx;">
					<view class="flex" @click="gotoshangpinxiangqing(goodsInfo.goods_id)">
						<view style="width: 200rpx;height: 148rpx;">
							<fu-image :src="goodsInfo.cover_images"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"
								class="text-cut-2 text-df text-weight-500">
								<text v-if="goodsInfo.is_bao == 1">[包赔]</text>{{goodsInfo.goods_name}}
							</view>
							<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;">
								账号属性：{{goodsInfo.attr_values}}</view>
							<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;">
								区服：{{goodsInfo.area_name}}</view>

							<view style="margin-top: 16rpx;width: 430rpx;" class="flex justify-between algin-center">
								<view style="color: #F55B29;">
									<text class="text-sm text-bold">￥</text>
									<text class="text-lg  text-bold">{{goodsInfo.sale_price}}</text>
								</view>
								<view class="text-sm" style="color: #868686;">x {{goodsInfo.count}}</view>
							</view>

						</view>
					</view>
					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>

					<view style="padding: 34rpx 0 24rpx;" class="flex justify-between align-center">
						<view class="text-sm " style="color: #19212D;">商品总额</view>
						<view class="text-sm " style="color: #19212D;">￥{{goodsInfo.total_price}}</view>
					</view>
					<view style="padding: 34rpx 0 24rpx;" class="flex justify-between align-center" v-if="audit_status === 2">
						<view class="text-sm " style="color: #19212D;">驳回原因</view>
						<view class="text-sm text-right" style="color: #19212D;width: 400rpx;">{{goodsInfo.reject_info}}</view>
					</view>
					
					<view class="flex justify-between align-center">
						<view class="text-sm " style="color: #19212D;">手续费</view>
						<view class="text-sm " style="color: #19212D;">￥{{goodsInfo.service_fee}}</view>
					</view>
					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
					<view class="flex justify-end" style="margin-top: 24rpx;line-height: 40rpx;">
						<view style="font-size: 20rpx;color: #B7BBC2;">实付款</view>
						<view style="color: #F02525;" class="text-bold">
							<text style="font-size: 20rpx;">￥</text>
							<text style="font-size: 32rpx;">{{goodsInfo.actual_price}}</text>
						</view>
					</view>
				</view>
			</view>

			<view style="padding: 0 24rpx;">
				<view class="bg-white" style="border-radius: 4rpx;width: 100%;padding: 24rpx;">
					<view class="text-df text-weight-500" style="color: #36373D;">订单信息</view>
					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
					<!-- 下单编号 -->
					<view style="margin-top: 24rpx;" class="flex align-center">
						<view style="width: 120rpx;font-size: 24rpx;color: #19212D;line-height: 42rpx;">订单编号</view>
						<view class="flex align-center">
							<view class="text-sm" style="color: #19212D;line-height: 42rpx;">{{goodsInfo.order_no}}
							</view>
							<view style="margin-left: 21rpx;color: #3B82CD;line-height: 42rpx;" class="text-sm"
								@click="fuzhiOrder(goodsInfo.order_no)">复制</view>
						</view>
					</view>

					<!-- 下单时间 -->
					<view style="margin-top: 24rpx;" class="flex align-center">
						<view style="width: 120rpx;font-size: 24rpx;color: #19212D;line-height: 42rpx;">下单时间</view>
						<view class="flex align-center">
							<view class="text-sm" style="color: #19212D;line-height: 42rpx;">{{goodsInfo.create_time}}
							</view>
							<!-- <view style="margin-left: 21rpx;color: #3B82CD;line-height: 42rpx;" class="text-sm">复制</view> -->
						</view>
					</view>
				</view>
			</view>

			<view class="bottomBtnset">
				<view style="width: 100%;height: 100rpx;padding: 0 24rpx;" class="flex justify-end align-center">
					<view style="width: 170rpx;
height: 60rpx;
background: #659BC7;" class="flex align-center justify-center text-white text-sm"
						v-if="status === 1 && audit_status === 0" @click="gotoCustom">联系客服</view>

					<view style="width: 170rpx;
height: 60rpx;
background: #659BC7;" class="flex align-center justify-center text-white text-sm"
						v-if="status === 1 && audit_status === 1" @click="gotoCustom">联系售后</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		CUSTOMER53URL
	} from '@/common/config.js';
	export default {
		data() {
			return {
				isShowLoading: false,
				orderNo: '',
				status: '',
				audit_status: '',
				goodsInfo: {}
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo;
			this.gameorderinfo();
		},
		methods: {
			gotoCustom() {
				window.location.href = CUSTOMER53URL;
			},
			gotoshangpinxiangqing(id) {
					this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id)
			},
			gameorderinfo() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gameorderinfo, {
					order_no: this.orderNo
				}).then(res => {
					if (res.data.code == 1) {
						this.status = res.data.data.status;
						this.audit_status = res.data.data.audit_status;
						this.goodsInfo = {
							goods_id: res.data.data.goods_id,
							reject_info:res.data.data.reject_info,
							cover_images: res.data.data.cover_images[0] || '',
							is_bao: res.data.data.is_bao,
							goods_name: res.data.data.goods_name,
							area_name: res.data.data.area_name,
							attr_values: res.data.data.attr_values,
							count: res.data.data.count,
							sale_price: res.data.data.sale_price,
							total_price: res.data.data.total_price,
							service_fee: res.data.data.service_fee,
							order_no: res.data.data.order_no,
							create_time: res.data.data.create_time,
							actual_price: res.data.data.actual_price
						}
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			gotoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			fuzhiOrder(ordersn) {
				let that = this;
				uni.setClipboardData({
					data: ordersn,
					success(res) {
						that.$message.info('订单编号已复制')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderDetailPage {
		min-height: 100vh;
		background: #F8F8F8;
	}

	.bottomBtnset {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #ffffff;
		/* box-shadow: 0px -1px 0px #eeeeee; */
		z-index: 999;
	}
</style>
