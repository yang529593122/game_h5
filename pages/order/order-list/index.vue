<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的订单
			</view>
		</fu-custom>
		<fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id" :scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" @click="gotoDetail(item.order_no)" v-for="(item,index) in listData" :key="index">
					<view class="flex justify-between align-center" style="margin-bottom: 24rpx;">
						<view class="text-df" style="color: #8C9199;">订单编号：{{item.order_no}}</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 1 && item.audit_status === 1">交易成功</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 0">订单未支付</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 2">订单已取消</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 3">订单已超时</view>
						<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 2">订单已驳回</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 1 && item.audit_status === 0">支付成功</view>
					</view>
					
					<view class="flex">
						<view style="width: 200rpx;height: 148rpx;">
							<fu-image :src="item.cover_images[0]"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"  class="text-cut-2 text-df text-weight-500">
							 <text v-if="item.is_bao == 1">[包赔]</text>{{item.goods_name}}</view>
<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;" >账号属性：{{item.attr_values}}</view>
<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;" >区服：{{item.area_name}}</view>

<view style="margin-top: 16rpx;width: 430rpx;" class="flex justify-between algin-center">
	<view style="color: #F55B29;">
		<text class="text-sm text-bold">￥</text>
		<text class="text-lg  text-bold">{{item.sale_price}}</text>
	</view>
	<view class="text-sm" style="color: #868686;">x {{item.count}}</view>
</view>

						</view>
					</view>
					
					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
					<view class="flex justify-end algin-center" style="padding: 32rpx 0 24rpx;">
						<view style="font-size: 20rpx;color: #B7BAC2;">共{{item.count}}件商品  实付款</view>
						<view style="margin-left: 8rpx;color: #F02525;">
							<text style="font-size: 20rpx;" class="text-bold">￥</text>
							<text class="text-bold text-lg">{{item.total_price}}</text>
						</view>
					</view>
					<view class="flex justify-end align-center">
						<view class="text-sm text-weight-500" style="color: #36373D;" v-if="item.status === 1 && item.audit_status === 1" @click="gotoCustom">联系售后</view>
						<view class="text-sm text-weight-500" style="color: #36373D;" v-if="item.status === 1 && item.audit_status === 0" @click="gotoCustom">联系客服</view>
						<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
height: 60rpx;margin-left: 60rpx;
line-height: 60rpx;
background: #295B7B;">查看详情</view>
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
					name:'支付成功',
					id:1
				},{
					name:'交易成功',
					id:2
				}],
				current:0,
				minixPagingListsApi: global.apiUrls.gamemyorder,
				allowOnloadGetList: false
			}
		},
		onLoad(options) {
			this.current = Number(options.current) || 0;
			this.isShowLoading =true;
			this.pagingListToggle();
			// setTimeout(() => {
			// },700)
		},
		methods:{
			pagingListBeforeResponseData() {
				this.isShowLoading =false;
			},
			gotoCustom() {
				window.location.href = CUSTOMER53URL;
			},
			changeTab(e) {
				console.log(e.index);
				this.current = e.index;
				this.isShowLoading =true;
				this.pagingListToggle();
			},
			pagingListPostData(){
			        return {
			          status: this.current
			        }
			      },
			gotoDetail(sn) {
				this.$urouter.navigateTo('/pages/order/order-detail/index?orderNo=' + sn);
				// /pages/order/order-detail/index
			},
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