<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我收到的砍价
			</view>
			<view slot="right" style="color: #659BC7;" @click="changeShowCaozuo" v-if="listData.length && current === 0">
				{{showDel == 0 ? '批量操作' : '完成'}}</view>
		</fu-custom>
		<fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id"
			:scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" v-for="(item,index) in listData" :key="index">
					<view style="width: 36rpx;height: 36rpx;margin-right: 24rpx;" v-if="showDel == 1" @click.stop="charushangpin(item,index)">
						<image src="../static/xz.png" v-if="item.select" style="width: 36rpx;height: 36rpx;" mode=""></image>
						<image src="../static/mxz.png" v-else style="width: 36rpx;height: 36rpx;" mode=""></image>
					</view>
					<view style="border-radius: 4rpx;padding: 24rpx;width: 702rpx;" class="bg-white">
						<view class="flex justify-between align-center" style="margin-bottom: 24rpx;">
							<view class="text-df flex align-center" style="color: #8C9199;">订单编号：{{item.order_no}}
								<view style="width: 24rpx;height: 24rpx;margin-left: 16rpx;" @click.stop="fuzhiOrder(item.order_no)">
									<image src="../static/5.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
							<!-- <view class="text-df" style="color: #36373D;" v-if="false">交易成功</view> -->
							<view class="text-df" style="color: #36373D;" v-if="current === 0">待审核</view>
							<view class="text-df" style="color: #36373D;" v-if="current === 1">砍价失败</view>
							<view class="text-df" style="color: #36373D;" v-if="current === 2">买家未支付</view>
						</view>

						<view class="flex" @click.stop="gotoDetail(item.goods_id)">
							<view style="width: 200rpx;height: 148rpx;">
								<fu-image :src="item.cover_images[0]"></fu-image>
							</view>
							<view style="margin-left: 24rpx;flex: 1;">
								<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"
									class="text-cut-2 text-df text-weight-500">
									<text v-if="item.is_bao == 1">
										[包赔]
									</text>
									 {{item.goods_name}}
									</view>
								<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;">
									账号属性：{{item.attr_values}}
									</view>
								<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;">
									区服：{{
										item.area_name
									}}</view>

								<view style="margin-top: 16rpx;width: 430rpx;"
									class="flex justify-between algin-center">
									<view style="color: #F55B29;">
										<text class="text-sm text-bold">￥</text>
										<text class="text-lg  text-bold">{{item.price}}</text>
									</view>
									<view class="text-sm" style="color: #868686;">x 1</view>
								</view>

							</view>
						</view>

						<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
						<view style="margin-top: 24rpx;" class="flex align-center justify-between">
							<view class="text-sm" style="color: #36373D;">订单金额</view>
							<view class="text-sm" style="color: #36373D;">￥{{item.price}}</view>
						</view>
						<view style="margin-top: 24rpx;" class="flex align-center justify-between">
							<view class="text-sm" style="color: #36373D;">砍价金额</view>
							<view class="text-sm" style="color: #36373D;">￥{{item.bargain_price}}</view>
						</view>
						<view style="margin-top: 24rpx;" class="flex align-center justify-between">
							<view class="text-sm" style="color: #36373D;">砍价定金</view>
							<view class="text-sm" style="color: #36373D;">￥{{item.bargain_deposit}}</view>
						</view>
						<!-- <view class="flex justify-end algin-center" style="padding: 32rpx 0 24rpx;">
												<view style="font-size: 20rpx;color: #B7BAC2;">共1件商品  实付款</view>
												<view style="margin-left: 8rpx;color: #F02525;">
													<text style="font-size: 20rpx;" class="text-bold">￥</text>
													<text class="text-bold text-lg">218.00</text>
												</view>
											</view> -->
						<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;"></view>
						<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;" class="text-right text-sm flex align-center justify-end"
							v-if="current == 2 && item.status === 1">支付倒计时：<view>
								<uni-countdown :day="item.days" :hour="item.hours" :minute="item.minutes" :second="item.seconds"></uni-countdown>
							</view> 超时未支付扣除定金</view>
						<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;" class="text-right text-sm"
							v-if="current == 2 && item.status === 5">超时未支付已扣除定金</view>
						<view class="flex justify-end align-center" v-if="current === 0 && showDel == 0" style="margin-top: 24rpx;">
												<view class="text-sm text-weight-500" style="color: red;" @click.stop="rejectOrder(1,item,index)">拒绝</view>
												<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
						height: 60rpx;margin-left: 60rpx;
						line-height: 60rpx;
						background: #295B7B;" @click.stop="agreeOrder(1,item,index)">同意</view>
				
											</view>
					</view>
				</view>

				<view class="tools" v-if="listData.length && showDel == 1 && current === 0">
					<view style="width: 100%;height: 100rpx;padding: 0 24rpx;"
						class="flex justify-between align-center">
						<view class="flex align-center"  @click="changeQuanxuan">
							<view class="" style="width: 36rpx;height: 36rpx;">
								<image src="../static/xz.png" v-if="selectLength" mode="" style="width: 36rpx;height: 36rpx;">
								</image>
								<image src="../static/mxz.png" v-else mode="" style="width: 36rpx;height: 36rpx;">
								</image>
							</view>
							<view class="text-df" style="margin-left: 16rpx;color: #36373D;">{{selectLength ? '取消全选' : '全选' }}</view>
						</view>

						<view class="flex align-center justify-end" v-if="bargainId.length">
							<view style="width: 200rpx;
height: 72rpx;
background: #F02525;" class="flex align-center justify-center text-df text-white" @click.stop="rejectOrder(2)" >拒绝</view>
							<view style="width: 200rpx;
height: 72rpx;
background: #659BC7;margin-left: 16rpx;" class="flex align-center justify-center text-df text-white" @click.stop="agreeOrder(2)">同意</view>
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
				isShowLoading: false,
				MoreListGame: [{
					name: '待审核',
					id: 0
				}, {
					name: '砍价失败',
					id: 1
				}, {
					name: '买家未支付',
					id: 2
				}],
				showDel: 0,
				current: 0,
				minixPagingListsApi: global.apiUrls.gamereceivebargain,
				allowOnloadGetList: false,
				bargainId:[]
			}
		},
		onLoad(options) {
			this.current = Number(options.current);
			this.isShowLoading = true;
			this.pagingListToggle();
			// setTimeout(() => {
			// 	this.isShowLoading =false;
			// },700)
		},
		computed:{
			selectLength() {
				// if(this.listData.length) {
					console.log('进来了')
					return this.listData.length == this.bargainId.length
				// }
				
			}
		},
		methods: {
			charushangpin(item,index) {
				this.$set(item,'select',!item.select)
			},
			changeQuanxuan() {
				this.bargainId = [];
				this.listData.forEach((i,idx) => {
					this.$set(this.listData[idx],'select',!this.listData[idx].select);
					if(this.listData[idx].select) {
						this.bargainId.push(i.bargain_id)
					}
				})
			},
			rejectOrder(curr,item,idx) {
				if(curr == 1) {
					this.bargainId = [item.bargain_id];
					this.gamerejectbargain();
				} else {
					let bargainIds = [];
					this.listData.forEach(i => {
						if(i.select) {
							bargainIds.push(i.bargain_id)
						}	
					})
					if(bargainIds.length === 0) {
						this.$message.info('请选择需要拒绝的订单');
						return;
					}
					this.bargainId = bargainIds;
					this.gamerejectbargain();
				}
			},
			agreeOrder(curr,item,idx) {
				
				if(curr == 1) {
					this.bargainId = [item.bargain_id];
					this.gameagreebargain();
				} else {
					let bargainIds = [];
					this.listData.forEach(i => {
						if(i.select) {
							bargainIds.push(i.bargain_id)
						}	
					})
					if(bargainIds.length === 0) {
						this.$message.info('请选择需要同意的订单');
						return;
					}
					this.bargainId = bargainIds;
					this.gameagreebargain();
				}
			},
			fuzhiOrder(ordersn) {
				let that = this;
				uni.setClipboardData({
					data:ordersn,
					success() {
						that.$message.info('订单编号已复制')
					}
				})
			},
			// 同意
			gameagreebargain() {
				// 同意
				if(this.bargainId.length) {
					let that =this;
					uni.showModal({
						title:'提示',
						content:'确认同意'+(this.bargainId.length == 1 ? '该' :'这些' )+'订单吗?',
						success(result) {
							if(result.confirm) {
								that.$api.post(global.apiUrls.gameagreebargain,{
									bargain_id:that.bargainId.join(',')
								}).then(res => {
									if(res.data.code == 1) {
										that.bargainId = [];
										that.pagingListToggle();
									} else {
										that.$message.info(res.data.msg);
									}
								})
							}
						}
					})
					
				}
			},
			// 拒绝
			gamerejectbargain() {
				if(this.bargainId.length) {
					let that =this;
					uni.showModal({
						title:'提示',
						content:'确认拒绝'+(this.bargainId.length == 1 ? '该' :'这些' )+'订单吗?',
						success(result) {
							if(result.confirm) {
								that.$api.post(global.apiUrls.gamerejectbargain,{
									bargain_id:that.bargainId.join(',')
								}).then(res => {
									if(res.data.code == 1) {
										that.bargainId = [];
										that.pagingListToggle();
									} else {
										that.$message.info(res.data.msg);
									}
								})
							}
						}
						
					})
					
				}
				
			},
			formatDuring(millisecond) {
				var days = parseInt(millisecond / (1000 * 60 * 60 * 24));
				var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = (millisecond % (1000 * 60)) / 1000;
				return {
					days:days,
					hours:hours,
					minutes:minutes,
					seconds:seconds
				};
			},
			changeShowCaozuo() {
				this.showDel = this.showDel == 1 ? 0 : 1;
			},
			changeTab(e) {
				console.log(e.index);
				this.current = e.index;
				this.isShowLoading = true;
				this.pagingListToggle();
			},
			gotoDetail(id) {
				// this.$urouter.navigateTo('/pages/order/order-detail/index');
				// /pages/order/order-detail/index
				this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id)
			},
			pagingListPostData() {
				return {
					type: this.current
				}
			},
			pagingListBeforeResponseData(res) {
				this.isShowLoading = false;
				if(res.data.data.data.length) {
					console.log(res.data.data.data)
					res.data.data.data.forEach(i => {
						i.select = false;
						if(i.status == 1 && i.expire_time) {
							i.days =this.formatDuring(i.expire_time * 1000).days;
							i.hours =this.formatDuring(i.expire_time * 1000).hours;
							i.minutes =this.formatDuring(i.expire_time * 1000).minutes;
							i.seconds =this.formatDuring(i.expire_time * 1000).seconds;
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.orderListPage {
		min-height: 100vh;
		background: #f8f8f8;
		overflow-x: hidden;
	}

	.orderItems {
		width: 702rpx;
		// background: #FFFFFF;
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		padding: 24rpx;
		// margin-left: 24rpx;
		// margin-top: 24rpx;
		margin-bottom: 24rpx;
	}

	.tools {
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
