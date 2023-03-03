<template>
	<view class="orderListPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我是卖家
			</view>
			<view style="color: #659BC7;" slot="right" @click="gotoFabu">发布</view>
		</fu-custom>
		<fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id"
			:scrollspy="true" size="28" inactive-color="#868686" active-color="#295B7B"></fu-tab>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
			<block v-else>
				<view class="orderItems" v-for="(item,index) in listData"
					:key="index">
					<view class="flex justify-between align-center" style="margin-bottom: 24rpx;">
						<block v-if="current == 1 || current == 3">
							<view class="text-df flex align-center" style="color: #8C9199;">
								订单编号：{{item.goods_no}}
								<view style="width: 24rpx;height: 24rpx;margin-left: 16rpx;"
									@click.stop="copyGoodsNo(item.goods_no)">
									<image src="../static/5.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</block>
						<block v-if="current == 2">
							<view class="text-df flex align-center" style="color: #8C9199;">
								订单编号：{{item.order_no}}
								<view style="width: 24rpx;height: 24rpx;margin-left: 16rpx;"
									@click.stop="copyGoodsNo(item.order_no)">
									<image src="../static/5.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</block>
						<block v-if="current == 1 || current == 3">
							<block v-if="current == 1">
								<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 0">审核中</view>
								<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 1">审核通过</view>
								<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 2">审核驳回</view>
							</block>
							<block v-if="current == 3">
								<view class="text-df" style="color: #36373D;">出售中</view>
							</block>
						</block>
						<block v-if="current == 2 && item.status === 1">
							<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 1">交易成功</view>
							<view class="text-df" style="color: #36373D;" v-if="item.audit_status === 0">支付成功</view>
						</block>
					</view>

					<view class="flex" @click.stop="goodsDetailsInfo(item.goods_id)">
						<view style="width: 200rpx;height: 148rpx;">
							<fu-image :src="item.logo || item.cover_images[0]"></fu-image>
						</view>
						<view style="margin-left: 24rpx;flex: 1;">
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"
								class="text-cut-2 text-df text-weight-500" v-if="current === 1">
								<!-- {{item.is_bao == 1 ? '[包赔]' : ''}} -->
								{{item.game_name}}
							</view>
							<view style="color: #36373D;line-height: 40rpx;max-height: 80rpx;"
								class="text-cut-2 text-df text-weight-500" v-if="current === 2 || current === 3">
								{{item.is_bao == 1 ? '[包赔]' : ''}}
								{{item.goods_name}}
							</view>
							<view class="text-sm text-cut" style="margin-top: 16rpx;color: #868686;width: 430rpx;">
								<!-- 账号属性：{{item.attr_values}} -->
								</view>
							<view class="text-sm text-cut" style="margin-top: 4rpx;color: #868686;width: 430rpx;">
								区服：{{item.area_name}}</view>

							<view style="margin-top: 16rpx;width: 430rpx;" class="flex justify-between algin-center">
								<view style="color: #F55B29;" v-if="current == 1 || current == 3">
									<text class="text-sm text-bold">￥</text>
									<text class="text-lg  text-bold">{{item.price}}</text>
								</view>
								<view style="color: #F55B29;" v-if="current == 2">
									<text class="text-sm text-bold">￥</text>
									<text class="text-lg  text-bold">{{item.sale_price}}</text>
								</view>
								<view class="text-sm" style="color: #868686;" v-if="current == 2">x {{item.count}}</view>
							</view>

						</view>
					</view>

					<view style="height: 1px;width: 100%;background: #DDDDDD;margin-top: 24rpx;margin-bottom: 24rpx;">
					</view>
					<block v-if="current == 2">
						<view class="flex align-center justify-between" style="padding-bottom: 24rpx;">
							<view>售出时间</view>
							<view>{{item.create_time}}</view>
						</view>
						<view style="height: 1px;width: 100%;background: #DDDDDD;margin-bottom: 24rpx;">
						</view>
					</block>
					<view class="flex justify-end algin-center" style="padding: 0 0 24rpx;" v-if="current == 2">
						<view style="font-size: 20rpx;color: #B7BAC2;">共{{item.count}}件商品 实付款</view>
						<view style="margin-left: 8rpx;color: #F02525;">
							<text style="font-size: 20rpx;" class="text-bold">￥</text>
							<text class="text-bold text-lg">{{item.total_price}}</text>
						</view>
					</view>

					<view class="flex align-center justify-between" style="position: relative;">
						<!-- 待审核 按钮 start -->
						<block v-if="current == 1">
							<!-- 审核中 start -->
							<block v-if="item.audit_status === 0">
								<view></view>
								<view class="flex justify-end align-center">
									<view @click.stop="gotoCustom" class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">
										联系客服</view>
									<!-- <view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
									height: 60rpx;margin-left: 60rpx;
									line-height: 60rpx;
									background: #295B7B;">查看商品</view> -->
								</view>
							</block>
							<!-- 审核中 end -->

							<!-- 审核驳回 start -->
							<block v-if="item.audit_status === 2">
								<view></view>
								<view class="flex justify-end align-center">
									<view class="text-sm text-weight-500" style="color: #F02525;"
										@click.stop="showFailResultPopup(item)" v-if="item.reject_info">失败原因
									</view>
									<view @click.stop="gotoCustom" class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">
										联系客服</view>
									<view @click.stop="gotoPlatformDetail(item.id,item)" class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">
										重新编辑</view>
									<!-- <view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
									height: 60rpx;margin-left: 60rpx;
									line-height: 60rpx;
									background: #295B7B;">查看商品</view> -->
								</view>
							</block>
							<!-- 审核驳回 end -->

							<block v-if="item.audit_status === 1">
								<view></view>
								<view class="flex justify-end align-center">
									<view @click.stop="gotoCustom" class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">
										联系客服</view>
									<!-- <view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
									height: 60rpx;margin-left: 60rpx;
									line-height: 60rpx;
									background: #295B7B;">查看商品</view> -->
								</view>
							</block>

						</block>
						<!-- 待审核 按钮 end -->

						<!-- 出售中 start -->
						<block v-if="current == 3">
							<view style="position: absolute;z-index:22;top: 84rpx;left:-24rpx;box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.16);background: #FFFFFF;width: 144rpx;
							height: 192rpx;" v-if="current == 3 && xiajiaindex === index">

								<view style="height: 192rpx;width: 144rpx;" class="flex flex-direction justify-around">
									<view class="text-center text-sm" style="color: #868686;" v-if="item.status === 1" @click.stop="gameuserdowngoods()">下架商品</view>
									<view class="text-center text-sm" style="color: #868686;" @click.stop="clickEditPircePopup(index)">修改价格</view>
									<view class="text-center text-sm" style="color: #868686;" @click.stop="gotoPlatformDetail(item.goods_id)">编辑商品</view>
								</view>
							</view>
							<image src="../static/6.png" @click.stop="changeXiajiaIndex(index)" mode="aspectFit" v-if="current == 3"
								style="height: 30rpx;width: 30rpx;"></image>
							<view class="flex justify-end align-center">
								<!-- <view class="text-sm text-weight-500" style="color: #F02525;" @click="showRules = true">
									失败原因
								</view> -->

								<view class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;" @click.stop="gotoCustom" >联系客服
								</view>
                <view class="text-sm text-weight-500" style="width: 170rpx;
									height: 60rpx;margin-left: 60rpx;
									line-height: 60rpx;
									background: #295B7B; text-align: center;color: #fff;" v-if="!item.is_dicker" @click.stop="participateIn(item)" >参与议价
                </view>
								<!-- <view class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">重新编辑
								</view> -->
								<!-- <view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
													height: 60rpx;margin-left: 60rpx;
													line-height: 60rpx;
													background: #295B7B;">查看商品</view> -->
							</view>
						</block>
						<!-- 出售中 end -->

						<block v-if="current === 2">
							<view></view>
							<view class="flex justify-end align-center">

								<view @click.stop="gotoCustom" class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">
									联系客服</view>
								<!-- <view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
								height: 60rpx;margin-left: 60rpx;
								line-height: 60rpx;
								background: #295B7B;">查看商品</view> -->
							</view>
						</block>
						<!-- <view style="position: absolute;top: 84rpx;left:-24rpx;box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.16);background: #FFFFFF;width: 144rpx;
height: 192rpx;" v-if="current == 3">

							<view style="height: 192rpx;width: 144rpx;" class="flex flex-direction justify-around">
								<view class="text-center text-sm" style="color: #868686;">下架商品</view>
								<view class="text-center text-sm" style="color: #868686;">修改价格</view>
								<view class="text-center text-sm" style="color: #868686;">编辑商品</view>
							</view>
						</view>
						<image src="../static/6.png" mode="aspectFit" v-if="current == 3" style="height: 30rpx;width: 30rpx;"></image>
						<view class="flex justify-end align-center">
							<view class="text-sm text-weight-500" style="color: #F02525;" @click="showRules = true">失败原因
							</view>
							<view class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">联系客服</view>
							<view class="text-sm text-weight-500" style="color: #36373D;margin-left: 60rpx;">重新编辑</view>
							<view class="text-center text-sm text-white text-weight-500" style="width: 170rpx;
						height: 60rpx;margin-left: 60rpx;
						line-height: 60rpx;
						background: #295B7B;">查看详情</view>
						</view> -->
					</view>
				</view>
			</block>
		</block>
		<fu-popup v-model="showRules" mode="center">
			<view class="bg-white" style="width: 580rpx;height: 415rpx;border-radius: 8rpx;">
				<view class="flex align-center justify-between" style="height: 125rpx;padding: 0 35rpx;">
					<view></view>
					<view class="text-lg" style="color: #36373D;font-weight: 500;">失败原因</view>
					<view class="cuIcon-close" @click="closePopup"></view>
				</view>

				<view class="" style="padding: 0 38rpx;height: 249rpx;">
					<scroll-view scroll-y style="width: 100%;height:249rpx;">
						<jyf-parser :html="RulesContent"></jyf-parser>
					</scroll-view>

				</view>
			</view>
		</fu-popup>


		<fu-popup v-model="showEditPricePopup" mode="center" radius="8" zIndex="999">
			<view class="bg-white" style="border-radius: 8rpx;padding: 0 24rpx 24rpx;">
				<view style="padding: 40rpx 0 48rpx;color: #36373D;" class="text-center text-lg text-weight-500">修改价格
				</view>
				<view class="flex align-center">
					<view class="text-sm" style="color: #36373D;width: 120rpx;">修改价格：</view>
					<view class="flex align-center" style="width: 411rpx;
height: 80rpx;
background: #F4F6F8;padding:0 24rpx;">
						<input style="height: 80rpx;line-height: 80rpx;width: 100%;" type="digit" v-model="xiugaihouprice"/>元
					</view>
				</view>

				<view class="flex align-center" style="margin-top: 32rpx;">
					<view class="text-sm text-right" style="color: #36373D;width: 120rpx;">原价：</view>
					<view class="text-lg text-bold">¥{{editPrice}}</view>
				</view>

				<view style="width: 100%;margin-top: 50rpx;" class="flex align-center justify-between">
					<view style="width: 256rpx;
height: 80rpx;
background: #F8F8F8;color: #36373D;border-radius: 4rpx;"
						class="flex align-center justify-center text-df text-weight-500" @click="cancelEditPricePopup">取消</view>
					<view style="width: 256rpx;
height: 80rpx;
background: #295B7B;border-radius: 4rpx;"
						class="flex align-center justify-center text-df text-weight-500 text-weight-500 text-white" @click="confirmEditPricePopup">确认
					</view>
				</view>
			</view>
		</fu-popup>
	</view>
</template>

<script>
	import {CUSTOMER53URL} from '@/common/config.js';
	import pagingList from '@/common/mixin/paging_list.js'
	export default {
		mixins: [pagingList],
		data() {
			return {
				isShowLoading: false,
				showEditPricePopup: false,
				minixPagingListsApi: global.apiUrls.gameusersalelist,
				allowOnloadGetList: false,
				MoreListGame: [{
					name: '待审核',
					id: 1
				}, {
					name: '出售中',
					id: 3
				}, {
					name: '出售订单',
					id: 2
				}],
				current: 1,
				showRules: false,
				RulesContent: ``,
				xiajiaindex:-1,
				priceIndex:-1,
				editPrice:0,
				xiugaihouprice:''
			}
		},
		onLoad(options) {
			this.current = Number(options.current) || 1;
			this.isShowLoading = true;
			this.pagingListToggle();
			uni.$on('updateList',(res) => {
				this.pagingListToggle();
			})
			// setTimeout(() => {
			// 	this.isShowLoading =false;
			// },700)
		},
		onUnload() {
			uni.$off('updateList');
		},
		methods: {
      // 参与议价
      participateIn(item){
        console.log(item,999)

       	this.$urouter.navigateTo('/pages/cyprice/cyprice?goods_id='+item.goods_id);

      },
			gotoPlatformDetail(id,item) {
				// this.current
				if(this.current == 1) {
					this.goodsInfo = {
						game_id:item.game_id,
						game_name:item.game_name,
						game_logo:item.logo,
						area_name:item.area_name,
						area_id:item.area_id,
						service_name: '',
						service_id:item.service_id
					}
					this.$urouter.navigateTo('/pages/makeorder/publishgoods/index?type=2&goodId='+id+'&goodsInfo=' + JSON.stringify(this.goodsInfo));
					// this.$urouter.navigateTo('')
				} else {
					this.$urouter.navigateTo('/pages/order/order-list/editplatformgooddetail?goodId=' + id)
				}
			},
			goodsDetailsInfo(id) {
				if(this.current == 1) {
					// this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id)
				}else {
					this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id)
				}
			},
			// 展示弹窗
			clickEditPircePopup(idx) {
				this.priceIndex = idx;
				this.editPrice = this.listData[this.priceIndex].price;
				this.showEditPricePopup = true;
			},
			cancelEditPricePopup() {
				this.priceIndex = -1;
				this.editPrice = 0;
				this.showEditPricePopup = false;
			},
			confirmEditPricePopup() {

				if(parseFloat(this.xiugaihouprice) < 0) {
					this.$message.info('价格不能小于零');
					this.priceIndex = -1;
					this.editPrice = 0;
					this.xiugaihouprice = '';
					this.showEditPricePopup = false;
					return;
				}

				this.gameuserselleditprice();
			},
			gameuserselleditprice() {
				this.$api.post(global.apiUrls.gameuserselleditprice,{
					goods_id:this.listData[this.priceIndex].goods_id,
					price:this.xiugaihouprice
				}).then(res => {
					if(res.data.code == 1) {
						this.listData[this.priceIndex].price = parseFloat(this.xiugaihouprice).toFixed(2);
						this.priceIndex = -1;
						this.editPrice = 0;
						this.xiugaihouprice = '';
						this.showEditPricePopup = false;
					} else {
						this.priceIndex = -1;
						this.editPrice = 0;
						this.xiugaihouprice = '';
						this.showEditPricePopup = false;
						this.$message.info(res.data.msg);
					}

				})
			},
			gotoCustom() {
				window.location.href = CUSTOMER53URL;
			},
			showFailResultPopup(item) {
				this.RulesContent = item.reject_info;
				this.showRules = true;

			},
			gameuserdowngoods() {
				if(this.xiajiaindex === -1) {
					return;
				}
				let that = this;
				uni.showModal({
					title:'提示',
					content:'确认下架此商品吗?',
					success(result) {
						if(result.confirm) {
							that.$api.post(global.apiUrls.gameuserdowngoods,{
								goods_id:that.listData[that.xiajiaindex].goods_id
							}).then(res => {
								if(res.data.code == 1) {
									this.xiajiaindex === -1;
									this.pagingListToggle();
								} else {
									that.$message.info(res.data.msg);
								}
							})
						}
					}
				})

			},
			changeXiajiaIndex(index) {
				if(this.xiajiaindex === index) {
					this.xiajiaindex = -1;
				} else {

					this.xiajiaindex = index;
				}
			},
			pagingListBeforeResponseData() {
				this.isShowLoading = false;
			},
			copyGoodsNo(goodsno) {
				let that = this;
				uni.setClipboardData({
					data: goodsno,
					success: function() {
						that.$message.info('订单编号已复制')
					}
				});
			},
			closePopup() {
				this.showRules = false;
			},
			changeTab(e) {
				console.log(e.index);
				this.current = e.id;
				this.pagingListToggle();
			},
			gotoFabu() {
				this.$urouter.navigateTo('/pages/account/selectsales');
			},
			gotoDetail() {
				this.$urouter.navigateTo('/pages/order/order-detail/index');
				// /pages/order/order-detail/index
			},
			gotoShenDetail(id) {
				if(this.current == 1){
					this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/shenindex?goods_id=' + id);
				} else {
					this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + id);
				}
			},
			pagingListPostData() {
				return {
					status: this.current
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
</style>
