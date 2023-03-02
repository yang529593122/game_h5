<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的估价
			</view>
		</fu-custom>
		<!-- <fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id" :scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab> -->
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" v-for="(item,index) in listData" :key="index">
					<view class="flex" @click="gotoDetail(item.id)">
						<view style="width: 204rpx;height: 152rpx;">
							<fu-image :src="item.logo"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view class="flex justify-between align-center">
								<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;width: 330rpx;"
									class="text-cut text-df text-weight-500">{{item.game_name}}</view>
                <view style="color: #B7BAC2;" v-if="item.status === 2" class="text-df">草稿</view>
                <block v-else>
                  <view style="color: #B7BAC2;" v-if="item.evaluate_status === 0" class="text-df">评估中</view>
                  <view style="color: #659BC7;" v-else class="text-df">已评估</view>
                </block>

							</view>
							<view class="text-sm text-bold" style="color: #F55B29;margin-top: 19rpx;">¥{{item.price}}</view>
							<view class="text-sm text-cut" style="margin-top: 10rpx;color: #868686;width: 430rpx;">
								评估编号:{{item.order_no}}
							</view>
							<view class="text-sm text-cut" style="margin-top: 2rpx;color: #868686;width: 430rpx;">
								评估时间:{{item.create_time}}
							</view>



						</view>
					</view>


				</view>
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
				minixPagingListsApi: global.apiUrls.gamemyevaluate,
				allowOnloadGetList: false,
				isShowLoading: false,
				MoreListGame: [{
					name: '全部',
					id: 0
				}, {
					name: '支付成功',
					id: 1
				}, {
					name: '交易成功',
					id: 2
				}],
				current: 0
			}
		},
		onLoad() {
			this.isShowLoading = true;
			this.pagingListToggle();
			uni.$on('updatelist',(res) => {
				this.pagingListToggle();
			})
			// setTimeout(() => {
			// 	this.isShowLoading =false;
			// },700)
		},
		onUnload() {
			uni.$off('updatelist')
		},
		methods: {
			pagingListBeforeResponseData() {
				this.isShowLoading = false;
			},
			changeTab(e) {
				console.log(e.index);
				this.current = e.index;
			},
			gotoDetail(id) {
				this.$urouter.navigateTo('/pages/order/order-list/gudetail?id=' + id);
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
