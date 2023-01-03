<template>
	<view class="myrecoverPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的回收
			</view>
		</fu-custom>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<!-- 订单列表 start -->
				<view class="orderItem" v-for="(item,index) in listData" :key="index" @click="handleJump" :data-url="'/pages/order/order-list/mystatusdetail?goodsId=' + item.id">
					<view class="orderItemTop" style="margin-bottom: 24rpx;">
						<view class="orderItemTopLeft"><text>提交时间：{{item.create_time}}</text></view>
						<view class="orderItemTopRight">
							<text style="color: #B7BAC2;" v-if="item.audit_status === 0">审核中</text>
							<text style="color: #F02525;" v-if="item.audit_status === 2">审核失败</text>
							<text style="color: #3EC155;" v-if="item.audit_status === 1">审核成功</text>
						</view>
					</view>
					
					<view class="orderItemGoods">
						<view class="orderItemGoodsImg">
							<fu-image :src="item.cover_images[0]"></fu-image>
						</view>
						<view class="orderItemGoodsContent">
							<view class="orderItemGoodsContentTitle text-cut">
								{{item.goods_name}}
							</view>
							<view class="flex flex-direction">
								<view class="orderItemGoodsContentTop text-cut">账号属性：{{item.attr_values}}</view>
								<view class="orderItemGoodsContentBottom text-cut">区服：{{item.area_name}}</view>
							</view>
						</view>
					</view>
					
					<view class="orderItemBtnset">
						<view class="orderItemBlueColorBtn">查看详情</view>
					</view>
				</view>
				<!-- 订单列表 end -->
			</block>
		</block>
		
		
		
		
		
	</view>
</template>

<script>
	import pagingList from '@/common/mixin/paging_list.js';
	export default {
		mixins: [pagingList],
		data() {
			return {
				isShowLoading:false,
				minixPagingListsApi: global.apiUrls.gameuserrecycle,
				allowOnloadGetList: false,
			}
		},
		onLoad() {
			this.isShowLoading = true;
			// this.isShowLoading = true;
			this.pagingListToggle();
			uni.$on('updatelist',(res) => {
				this.pagingListToggle();
			})
		},
		onUnload() {
			uni.$off('updatelist');
		},
		methods :{
			pagingListBeforeResponseData() {
				this.isShowLoading = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.orderItem {
		background: #fff;
		width: 702rpx;
		padding: 24rpx;
		margin-top: 24rpx;
		margin-left: 24rpx;
		border-radius: 2rpx;
		
		.orderItemTop {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.orderItemTopLeft {
				font-size: 28rpx;
				color: #8C9199;
				display: flex;
				align-items: center;
			}
			
			.orderItemTopRight {
				font-size: 28rpx;
			}
		}
		
		
		.orderItemGoods {
			display: flex;
			align-items: center;
			
			.orderItemGoodsImg {
				height: 194rpx;
				width: 194rpx;
			}
			
			.orderItemGoodsContent {
				margin-left: 24rpx;
				width: 436rpx;
				height: 194rpx;
				// height: 143rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.orderItemGoodsContentTitle {
					width: 436rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #36373D;
				}
				
				.orderItemGoodsContentTop {
					font-size: 24rpx;
					width: 436rpx;
					color: #868686;
					margin-bottom: 16rpx;
				}
				
				.orderItemGoodsContentBottom {
					font-size: 24rpx;
					width: 436rpx;
					color: #868686;
				}
			}
		}
		
		.orderItemBtnset {
			display: flex;
			justify-content: flex-end;
			margin-top: 40rpx;
			.orderItemBlueColorBtn {
				width: 170rpx;
				height: 60rpx;
				background: #295B7B;
				color: #fff;
				text-align: center;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				font-weight: 500;
			}
		}
	}
</style>