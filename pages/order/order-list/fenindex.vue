<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的分期
			</view>
		</fu-custom>
		<!-- <fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id" :scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab> -->
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" @click="gotoDetail(item.id)" v-for="(item,index) in listData" :key="index">
					<view class="flex  align-center" style="margin-bottom: 24rpx;">
						<view class="text-df flex align-center" style="color: #8C9199;">订单编号：{{item.order_no}}
							<!-- <view style="width: 24rpx;height: 24rpx;margin-left: 16rpx;">
								<image src="../static/5.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
							</view> -->
						</view>
						<!-- <view class="text-df" style="color: #36373D;" v-if="false">交易成功</view>
						<view class="text-df" style="color: #36373D;" v-else>支付成功</view> -->
					</view>
					
					<view class="flex" @click.stop="goodsDetailsInfo(item.goods_id)">
						<view style="width: 200rpx;height: 148rpx;">
							<fu-image :src="item.cover_images[0]"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"  class="text-cut-2 text-df text-weight-500">
								<text v-if="item.is_bao == 1">[包赔]</text>
								{{item.goods_name}}</view>
<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;" >账号属性：{{item.attr_values}}</view>
<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;" >区服：{{item.area_name}}</view>

<view style="margin-top: 16rpx;width: 430rpx;" class="flex justify-between algin-center">
	<view style="color: #F55B29;">
		<text class="text-sm text-bold">￥</text>
		<text class="text-lg  text-bold">{{item.sale_price}}</text>
	</view>
	<view class="text-sm" style="color: #868686;">x 1</view>
</view>

						</view>
					</view>
					
					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
					<view style="margin-top: 24rpx;" class="flex align-center justify-between">
						<view class="text-sm" style="color: #36373D;">订单金额</view>
						<view class="text-sm" style="color: #36373D;">￥{{item.total_price}}</view>
					</view>
					<!-- <view style="margin-top: 24rpx;" class="flex align-center justify-between">
						<view class="text-sm" style="color: #36373D;">砍价金额</view>
						<view class="text-sm" style="color: #36373D;">￥180.0</view>
					</view> -->
					<view style="margin-top: 24rpx;" class="flex align-center justify-between">
						<view class="text-sm" style="color: #36373D;">已支付</view>
						<view class="text-sm" style="color: #36373D;">￥{{item.actual_price}}</view>
					</view>
					<!-- <view class="flex justify-end algin-center" style="padding: 32rpx 0 24rpx;">
						<view style="font-size: 20rpx;color: #B7BAC2;">共1件商品  实付款</view>
						<view style="margin-left: 8rpx;color: #F02525;">
							<text style="font-size: 20rpx;" class="text-bold">￥</text>
							<text class="text-bold text-lg">218.00</text>
						</view>
					</view> -->
				<!-- 	<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
					<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;" class="text-right text-sm" v-if="false">支付倒计时：11:15:12 超时未支付扣除定金</view>
					<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;" class="text-right text-sm" v-if="true">超时未支付已扣除定金</view> -->
					<view class="flex justify-end align-center" style="margin-top: 24rpx;">
						<!-- <view class="text-sm text-weight-500" style="color: #36373D;" v-if="false">联系售后</view> -->
						<view class="text-sm text-weight-500" style="color: #36373D;" @click.stop="gotoCustom">联系客服</view>
						<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
height: 60rpx;margin-left: 60rpx;
line-height: 60rpx;
background: #295B7B;">查看详情</view>

<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
height: 60rpx;margin-left: 60rpx;
line-height: 60rpx;
background: #295B7B;" v-if="false">重新砍价</view>

<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
height: 60rpx;margin-left: 60rpx;
line-height: 60rpx;
background: #295B7B;" v-if="false">追加砍价</view>
					</view>
				</view>
			</block>
		</block>
		
	</view>
</template>

<script>
	import {CUSTOMER53URL} from '@/common/config.js';
	import pagingList from '@/common/mixin/paging_list.js'
	export default {
		mixins: [pagingList],
		data() {
			return {
				isShowLoading:false,
				MoreListGame:[{
					name:'全部',
					id:0
				},{
					name:'砍价成功',
					id:1
				},{
					name:'砍价失败',
					id:2
				},{
					name:'未回复',
					id:3
				}],
				current:0,
				minixPagingListsApi: global.apiUrls.gamemybystages,
				allowOnloadGetList: false
			}
		},
		onLoad() {
			this.isShowLoading =true;
			this.pagingListToggle();
		},
		methods:{
			changeTab(e) {
				console.log(e.index);
				this.current = e.index;
			},
			pagingListBeforeResponseData() {
				this.isShowLoading =false;
			},
			gotoCustom() {
				window.location.href = CUSTOMER53URL;
			},
			gotoDetail(orderId) {
				this.$urouter.navigateTo('/pages/order/order-list/fendetail?orderId=' + orderId);
				// /pages/order/order-detail/index
			},
			goodsDetailsInfo(id) {
				this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderListPage {
		min-height: 100vh;
		background: #f8f8f8;
	}
	
	.orderItems {
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		padding: 24rpx;
		margin-left: 24rpx;
		margin-top: 24rpx;
	}
</style>