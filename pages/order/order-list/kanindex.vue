<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的砍价
			</view>
		</fu-custom>
		<fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id"
			:scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" v-for="(item,index) in listData" :key="index">
					<view class="flex justify-between align-center" style="margin-bottom: 24rpx;">
						<view class="text-df flex align-center" style="color: #8C9199;">订单编号：{{item.goods_no}}
							<view style="width: 24rpx;height: 24rpx;margin-left: 16rpx;"
								@click.stop="fuzhiOrder(item.goods_no)">
								<image src="../static/5.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
							</view>
						</view>
						<view class="text-df" style="color: #36373D;" v-if="item.status === 0">待卖家确定</view>
						<view class="text-df" style="color: #36373D;"
							v-if="item.status === 2 || item.status === 3 || item.status === 5">砍价失败</view>
						<view class="text-df" style="color: #36373D;"
							v-if="(item.status === 1 && item.pay_status === 1 )">砍价成功</view>
					</view>

					<view class="flex" @click.stop="gotoDetail(item.goods_id)">
						<view style="width: 200rpx;height: 148rpx;">
							<fu-image :src="item.cover_images[0]"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"
								class="text-cut-2 text-df text-weight-500">

								<text v-if="item.is_bao ==1">[包赔]</text>{{item.goods_name}}
							</view>
							<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;">
								账号属性：{{item.attr_values}}</view>
							<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;">
								区服：{{item.area_name}}</view>

							<view style="margin-top: 16rpx;width: 430rpx;" class="flex justify-between algin-center">
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
						<view class="text-sm" style="color: #36373D;">￥{{item.total_price}}</view>
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
					<view class="lineDDD">
					</view>
					<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;" v-if="item.status === 1"
						class="text-right text-sm flex align-center justify-end">
						提示：请您尽快付款以防账号被他人抢购
					</view>
					<view style="margin-top: 24rpx;margin-bottom: 24rpx;color: #F02525;"
						class="text-right text-sm flex align-center justify-end" v-if="item.status === 1">支付倒计时：<view>
							<uni-countdown :day="item.days" :hour="item.hours" :minute="item.minutes"
								:second="item.seconds"></uni-countdown>
						</view>超时未支付扣除定金</view>
					<view style="margin-bottom: 24rpx;color: #F02525;" class="text-right text-sm"
						v-if="item.status === 5">超时未支付已扣除定金</view>
					<view class="flex justify-end align-center">
						<view class="text-sm text-weight-500" style="color: #36373D;" v-if="item.status === 0" @click="confirmCancelBargain(item.id)">取消砍价</view>
						<view class="text-sm text-weight-500" style="color: #36373D;" v-if="false">联系售后</view>
						<view class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;" @click="gotoCustom" v-else>联系客服
						</view>
						<view class="text-center text-sm text-white text-weight-500 lanseBtn" v-if="item.status !== 0 && item.status !== 5 && item.status !== 2 && item.status !== 3 && item.status !== 1"
							@click.stop="gotoDetail(item.goods_id)">查看详情</view>
						<view class="text-center text-sm text-white text-weight-500 lanseBtn" v-if="item.status === 1" @click.stop="gotoconfirmOrder(item.goods_id)">去支付</view>
						<view class="text-center text-sm text-white text-weight-500 lanseBtn" v-if="item.status === 5 || item.status === 2 || item.status === 3 "
							@click="openClickZhuijiaPrice(2,item,index)">重新砍价</view>

						<view class="text-center text-sm text-white text-weight-500 lanseBtn" style="" v-if="item.status === 0" @click="openClickZhuijiaPrice(1,item,index)">追加砍价</view>
					</view>
				</view>
			</block>
		</block>
		<!-- 追加砍价 start -->
		<fu-popup v-model="kanjiashow" mode="center">
			<view class="bg-white" style="height: 745rpx;width: 580rpx;">
				<view style="padding: 40rpx 32rpx 32rpx;" class="flex align-center justify-between">
					<view class=""></view>
					<view class="text-lg text-weight-500" style="color: #36373D;">{{dijige === 1 ? '追加砍价' : '重新砍价'}}
					</view>
					<view class="cuIcon-close" @click="closeKanjiaShow"></view>
				</view>

				<!-- <view style="padding: 0 26rpx;color: #868686;" class="text-df">砍价介绍：{{kanjiajieshao}}</view> -->
				<view style="padding: 0 26rpx;color: #868686;" class="text-df">
					<!-- 	 <view style="width: 100%;height: 300rpx;">
								 <scroll-view scroll-y="true" style="width: 100%;height: 300rpx;">
									 <view style="width: 100%;height: 300rpx;">
										 <view>砍价介绍:</view>
										 <jyf-parser :html="'砍价介绍:' + kanjiajieshao"></jyf-parser>
										 <view v-for="(item,index) in kanjiajieshao">{{item}}</view>
									 </view>
								 </scroll-view>
							 </view> -->

					<view style="width: 100%;height: 300rpx;">
						<!-- 砍价介绍：{{kanjiajieshao}} -->
						<scroll-view scroll-y="true" style="width: 100%;height: 300rpx;">
							<view style="width: 100%;height: 300rpx;">
								<!-- <jyf-parser :html="'砍价介绍:' + kanjiajieshao"></jyf-parser> -->
								<view class="text-df text-bold text-333">砍价介绍:请下滑阅读全文</view>
								<view v-for="(item,index) in kanjiajieshao">{{item}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view style="margin-top: 26rpx;" class="flex flex-direction">
					<view class="flex align-center" style="padding: 0 24rpx;">
						<view class="text-sm" style="color: #36373D;">您的出价：</view>
						<view class="flex align-center"
							style="height: 80rpx;width: 411rpx;background: #F7F9FA;padding: 0 24rpx;">
							<input v-model="inputkanjiajine" @input="jisuanjiage" type="digit" placeholder="请输入砍价金额"
								placeholder-style="font-size: 28rpx;color: #5C707E;" />
							<view class="text-df" style="color: #36373D;">元</view>
						</view>
					</view>
					<view style="margin-top: 16rpx;color: #F55B29;font-size: 20rpx;margin-left: 144rpx;">
						砍价金额不低于：￥{{minkanjianPrice}}</view>
				</view>

				<view style="margin-top: 34rpx;padding: 0 24rpx;" class="flex algin-center text-sm">
					<text style="color: #36373D;">砍价费用：</text>
					<text style="color: #F55B29;">¥{{dingPrice}}</text>
				</view>

				<view class="flex align-center justify-between" style="padding: 32rpx 26rpx;">
					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 205rpx;
		height: 64rpx;background: #3A495A;border-radius: 4rpx;" @click="closeKanjiaShow">取消</view>
					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 294rpx;
		height: 64rpx;
		background: #659BC7;border-radius: 4rpx;" @click="comfirmZhifuDingjin">确定并支付砍价</view>
				</view>
			</view>
		</fu-popup>

		<!-- 追加砍价 end -->
	</view>
</template>

<script>
	import {
		CUSTOMER53URL
	} from '@/common/config.js';
	import pagingList from '@/common/mixin/paging_list.js';
	export default {
		mixins: [pagingList],
		data() {
			return {
				// gamemybargain
				minixPagingListsApi: global.apiUrls.gamemybargain,
				allowOnloadGetList: false,
				isShowLoading: false,
				MoreListGame: [{
					name: '全部',
					id: -1
				}, {
					name: '砍价成功',
					id: 1
				}, {
					name: '砍价失败',
					id: 3
				}, {
					name: '未回复',
					id: 0
				}],
				current: -1,
				kanjiashow: false,
				inputkanjiajine: '',
				kanjiajieshao: '',
				dingPrice: '0.00',
				minkanjianPrice: '',
				bargain_price: '',
				bargainGoodsId: '',
				bargainIndex: -1,
				dijige: 1,
				bargain_ding: 100,
				bargain_deposit: 0
			}
		},
		onLoad(options) {
			this.current = Number(options.current);
			this.isShowLoading = true;
			this.pagingListToggle();
			// setTimeout(() => {
			// 	this.isShowLoading =false;
			// },700)
			// this.gamebargaininfo();
		},
		methods: {
			// 确认取消砍价
			confirmCancelBargain(bargainId) {
				this.$util.showModal({
					title: '提示',
					content: '确定取消此砍价吗？',
					confirmColor: this.$store.state.themeColor,
					success: result => {
						if(result.confirm) {
							this.$api.post(global.apiUrls.confirmCancelBargain,{
								bargain_id:bargainId
							}).then(res => {
								if(res.data.code == 1) {
									// this.listData.splice()
									this.pagingListToggle();
								} else {
									this.$message.info(res.data.msg);
								}
							})
						}
					}
				})
				
			},
			
			jisuanjiage() {
				if (parseFloat(this.inputkanjiajine) >= parseFloat(this.minkanjianPrice)) {
					// this.dingPrice = (this.inputkanjiajine * (parseFloat(this.bargain_ding) / 100) - parseFloat(this.bargain_deposit)).toFixed(2);
					this.dingPrice = (this.inputkanjiajine * (parseFloat(this.bargain_ding) / 100)).toFixed(2);
					// console.log(this.inputkanjiajine * (parseFloat(this.bargain_ding) / 100));
					// console.log(this.last_bargain_deposit);
				} else {
					this.dingPrice = '0.00';
				}
			},
			closeKanjiaShow() {
				this.kanjiashow = false;
			},
			gotoconfirmOrder(id) {
				this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-comment/index?goodsId=' + id)
			},
			comfirmZhifuDingjin() {
				this.gamecreatebargain();
			},
			gotoCustom() {
				window.location.href = CUSTOMER53URL;
			},
			openClickZhuijiaPrice(curr, item, index) {
				this.dijige = curr;
				this.bargainGoodsId = item.goods_id;
				this.bargainIndex = index;
				this.bargain_price = item.bargain_price;
				this.bargain_deposit = item.bargain_deposit;
				this.gamebargaininfo()
			},
			gamebargaininfo() {
				this.$api.post(global.apiUrls.gamebargaininfo).then(res => {
					if (res.data.code == 1) {
						this.kanjiajieshao = res.data.data.bargain_info;
						// this.minkanjianPrice = parseFloat(this.bargain_price * (parseFloat(res.data.data.bargain_min) / 100)).toFixed(2);
						this.minkanjianPrice = this.bargain_price;
						this.bargain_ding = res.data.data.bargain_ding;
						// this.dingPrice = parseFloat(this.bargain_price * (parseFloat(res.data.data.bargain_ding) / 100)).toFixed(2);
						// this.dingPrice = Math.round(this.bargain_price * (parseFloat(res.data.data.bargain_ding) / 100)).toFixed(2);

						this.kanjiashow = true;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			// 追加砍价
			gamecreatebargain() {
				if (!this.inputkanjiajine) {
					return;
				}

				if (parseFloat(this.inputkanjiajine) < parseFloat(this.minkanjianPrice)) {
					return;
				}
				this.$util.showModal({
					title: '提示',
					content: '确定并支付砍价吗？',
					confirmColor: this.$store.state.themeColor,
					success: result => {
						if (result.confirm) {
							this.$api.post(global.apiUrls.gamecreatebargain, {
								goods_id: this.bargainGoodsId,
								bargain_price: this.inputkanjiajine,
							}).then(res => {
								if (res.data.code == 1) {
									this.kanjiashow = false;
									// this.pagingListToggle();
									if (this.dijige === 1) {
										// this.$urouter.navigateTo('/pages/makeorder/kanpay/index?orderNo=' + res.data.data.order_no + '&price=' + (parseFloat(this.inputkanjiajine).toFixed(2)))
										this.$urouter.navigateTo(
											'/pages/makeorder/kanpay/index?orderNo=' + res.data
											.data.order_no + '&price=' + this.dingPrice)
									}
									if (this.dijige === 2) {
										// this.$urouter.navigateTo('/pages/makeorder/kanpay/index?type=2&orderNo=' + res.data.data.order_no + '&price=' + (parseFloat(this.inputkanjiajine).toFixed(2)))
										this.$urouter.navigateTo(
											'/pages/makeorder/kanpay/index?type=2&orderNo=' + res
											.data.data.order_no + '&price=' + this.dingPrice)
									}
									// this.$set(this.listData[this.bargainIndex],'status',1)
								} else {
									this.kanjiashow = false;
									this.$message.info(res.data.msg);
								}
							})
						}
					}
				})

			},
			fuzhiOrder(sn) {
				let that = this;
				uni.setClipboardData({
					data: sn,
					success() {
						that.$message.info('订单编号已复制')
					}
				})
			},
			pagingListBeforeResponseData(res) {
				this.isShowLoading = false;
				if (res.data.data.data.length) {
					console.log(res.data.data.data)
					res.data.data.data.forEach(i => {
						// i.select = false;
						if (i.status == 1 && i.expire_time) {
							i.days = this.formatDuring(i.expire_time * 1000).days;
							i.hours = this.formatDuring(i.expire_time * 1000).hours;
							i.minutes = this.formatDuring(i.expire_time * 1000).minutes;
							i.seconds = this.formatDuring(i.expire_time * 1000).seconds;
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
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds
				};
			},
			changeTab(e) {
				console.log(e.index);
				this.current = e.id;
				this.isShowLoading = true;
				this.pagingListToggle();
			},
			gotoDetail(id) {
				this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id);
				// /pages/order/order-detail/index
			},
			pagingListPostData() {
				return {
					status: Number(this.current)
				}
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
	
	.lanseBtn {
		width: 170rpx;
		height: 60rpx;
		margin-left: 60rpx;
		line-height: 60rpx;
		background: #295B7B;
	}
	
	.lineDDD {
		height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;margin-bottom: 24rpx;
	}
</style>
