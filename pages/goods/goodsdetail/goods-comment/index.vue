<template>
	<view class="goodsConfirmPage">
		<fu-custom :isBack="true" bgColor="bg-white">
			<view slot="content">确认订单</view>
		</fu-custom>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<view class="goodsConfirmPageGoods">
				<view class="goodsConfirmPageGoodsleft">
					<fu-image :src="shopGoodsinfo.cover_images"></fu-image>
				</view>
				<view class="goodsConfirmPageGoodsright">
					<view class="goodsConfirmPageGoodsrightTop">
						<view class="text-df text-weight-500 text-cut-2" style="color: #19212D; width: 482rpx;">
							<!-- [{{shopGoodsinfo.is_bao == 1 ? '包赔' : '押证包安'}}]{{shopGoodsinfo.goods_name}}</view> -->
							{{shopGoodsinfo.goods_name}}</view>
						<view class="text-cut" style="margin-top: 6rpx;font-size: 20rpx;color: #868686;width: 482rpx;">
							账号属性：{{shopGoodsinfo.attr_values}}</view>
					</view>
					<view class="goodsConfirmPageGoodsrightBottom">
						<view class="text-cut" style="font-size: 20rpx;color: #868686;width: 300rpx;">区服：{{shopGoodsinfo.area_name}}</view>
						<view class="text-bold text-lg" style="color: #F55B29;">¥{{shopGoodsinfo.price}}</view>
					</view>
				</view>
			</view>

			<!-- 填写订单 -->
			<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">填写订单信息</view>
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">手机号码：</text>
				</view>
				<input placeholder="请填写手机号码" maxlength="11" v-model="mobile" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>

			<!-- QQ号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">QQ号码：</text>
				</view>
				<input placeholder="请填写QQ号码"  v-model="qqNum" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>

			<!-- 微信号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">微信号码：</text>
				</view>
				<input placeholder="请填写微信号码" v-model="wechat" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>

			<!-- 微信号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #19212D;">推荐码：</text>
				</view>
				<input placeholder="请填写推荐码(非必填)" class="text-right"
					placeholder-style="color: #B7BAC2;font-size:28rpx" v-model="introducer_no" />
			</view>

			<!-- 押证包安服务介绍 -->
			<block v-if="shopGoodsinfo.is_bao === 0">
				<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">押证包安服务介绍</view>
				<view style="padding: 24rpx;">
					<view class="bg-white" style="border-radius: 4rpx;padding: 24rpx;">
						<view class="text-df text-weight-500" style="color: #19212D;">押证包安服务</view>

						<view class="text-sm" style="margin-top: 16rpx;color: #868686;">
							<jyf-parser :html="shopGoodsinfo.ya_service"></jyf-parser>
						</view>
						<view class="text-df text-weight-500" style="color: #19212D;margin-top: 32rpx;">押证包安规则</view>
						<view class="text-sm" style="margin-top: 16rpx;color: #868686;">
							<jyf-parser :html="shopGoodsinfo.ya_rule"></jyf-parser>
						</view>
						<view style="margin-top: 24rpx;" class="flex justify-between align-center">
							<view class="text-sm" style="color: #B7BAC2;">押证包安（收取{{shopGoodsinfo.ya_service_fee}}%手续费）</view>
							<view class="" style="color: #F55B29;">
								<text class="text-df text-weight-500">￥</text>
								<text class="text-bold" style="font-size: 40rpx;">{{shopGoodsinfo.ya_fee}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 包赔服务介绍 -->

			<block v-if="shopGoodsinfo.is_bao == 1">
				<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">包赔服务介绍</view>
				<view style="padding: 24rpx;">
					<view class="bg-white" style="border-radius: 4rpx;padding: 24rpx;width: 702rpx;">
						<view class="text-df text-weight-500" style="color: #19212D;">包赔服务</view>

						<view class="text-sm" style="margin-top: 16rpx;color: #868686;">
							<jyf-parser :html="shopGoodsinfo.bao_service"></jyf-parser>
						</view>
						<view class="text-df text-weight-500" style="color: #19212D;margin-top: 32rpx;">包赔规则</view>
						<view class="text-sm" style="margin-top: 16rpx;color: #868686;">
							<jyf-parser :html="shopGoodsinfo.bao_rule"></jyf-parser>
						</view>
						<view style="margin-top: 24rpx;" class="flex justify-between align-center">
							<view @click="changeBaopei(index)" style="position: relative;width: 207rpx;height: 96rpx;"
								v-for="(item,index) in baopeiList" :key="index">
								<view :class="baoIndex == index?'isYesSelect' :'isNoSelect'">
									<view class="">
										<text class="text-sm">¥</text>
										<text class="text-df">{{item.fee}}</text>
									</view>
									<view class="text-sm" style="margin-top: 3rpx;">
										{{item.name}}
									</view>
								</view>
								<view style="position: absolute;right: 0;top: 0;" v-if="baoIndex == index">
									<image src="../../static/2.png" style="width: 50rpx;height: 44rpx;" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>

				<block>
					<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">分期服务</view>
									<view style="padding: 24rpx;">
										<view class="bg-white" style="border-radius: 4rpx;padding: 24rpx;width: 702rpx;">
											<view class="flex align-center justify-between">
												<view class="text-df text-weight-500">是否分期</view>
												<view class="flex algin-center">
													<view class="flex align-center" @click="changeFenqi(1)">
														<view style="width: 32rpx;height: 32rpx;margin-right: 16rpx;">
															<image src="../../static/3.png" v-if="isfenqi == 1" style="width: 32rpx;height: 32rpx;"
																mode=""></image>
															<image src="../../static/4.png" v-else style="width: 32rpx;height: 32rpx;" mode="">
															</image>
														</view>
														<view class="text-df" style="color: #19212D;line-height: 32rpx;">是</view>
													</view>
													<view class="flex align-center" style="margin-left: 49rpx;" @click="changeFenqi(2)">
														<view style="width: 32rpx;height: 32rpx;margin-right: 16rpx;"">
								   					   							   <image src="../../static/3.png"  v-if="isfenqi == 2" style="width: 32rpx;height: 32rpx;" mode="">
															</image>
															<image src="../../static/4.png" v-else style="width: 32rpx;height: 32rpx;" mode="">
															</image>
														</view>
														<view class="text-df" style="color: #19212D;line-height: 32rpx;">否</view>
													</view>
												</view>
											</view>
											<view style="padding: 32rpx 0 16rpx;color: #19212D;" class="text-df text-weight-500">分期功能介绍
											</view>
											<view class="text-sm" style="color: #868686;">
												<jyf-parser :html="shopGoodsinfo.fen_info"></jyf-parser>
											</view>
											<block v-if="isfenqi == 1">
												<view style="padding: 32rpx 0 16rpx;color: #19212D;" class="text-df text-weight-500">
													选择分期期数</view>
												<view class="flex algin-center justify-between" style="">
													<view style="position: relative;" @click="changeQishu(index)" v-for="(item,index) in fenqiList">
														<view :class="fenqiOneIndex == index ?'isYesSelect' : 'isNoSelect'" style="height: 64rpx;">
															{{(index + 1) + '期'}}
														</view>
														<view style="position: absolute;right: 0;top: 0;" v-if="fenqiOneIndex == index">
															<image src="../../static/2.png" style="width: 50rpx;height: 44rpx;" mode="">
															</image>
														</view>
													</view>
												</view>
												
												<view class="flex algin-center flex-wrap" style="margin-top: 20rpx;">
													<view class="flex flex-direction justify-center align-center" v-for="(item,index) in fenqiTwoList" :style="{marginBottom:(fenqiTwoList.length > 2 && index == 0) ? '24rpx' : ''}" :key="index" style="background: #FAFAFC;width: 267rpx;border-radius: 4rpx;margin-right: 20rpx;
					height: 105rpx;">
														<view class="text-sm" style="color: #5C707E;">￥{{item.price}}(手续费￥{{item.fee}})</view>
														<view style="font-size: 20rpx;color: #5C707E;">第{{(index + 1)}}期</view>
													</view>
												</view>
											</block>
										</view>
									</view>
				</block>
			</block>
			<!-- 确认订单信息 -->

			<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">确认订单信息</view>
			<view class="" style="padding: 0 24rpx;">
				<view class="bg-white" style="padding: 22rpx 24rpx;">
					<view class="flex align-center justify-between">
						<view class="text-sm " style="color: #19212D;">订单编号</view>
						<view class="text-sm " style="color: #19212D;">{{shopGoodsinfo.order_no}}</view>
					</view>

					<view class="flex align-center justify-between" style="margin-top: 24rpx;">
						<view class="text-sm " style="color: #19212D;">商品金额</view>
						<view class="text-sm " style="color: #19212D;">￥{{shopGoodsinfo.price}}</view>
					</view>

					<view class="flex align-center justify-between" style="margin-top: 24rpx;">
						<view class="text-sm " style="color: #19212D;">手续费</view>
						<view class="text-sm " style="color: #19212D;" v-if="shopGoodsinfo.is_bao === 0">￥{{shopGoodsinfo.ya_fee}}</view>
						<view class="text-sm " style="color: #19212D;" v-if="shopGoodsinfo.is_bao === 1">￥{{baopeiList[baoIndex].fee}}</view>
						<!-- this.baoIndex -->
					</view>
				</view>
			</view>
			
			<view style="padding: 56rpx 24rpx 26rpx;" class="flex align-center" v-if="shopGoodsinfo.is_bao === 1 && shopGoodsinfo.is_sign_contract">
				<view class="" style="width: 28rpx;height: 28rpx;" @click.stop="changeSelect">
					<image src="../../static/3.png" v-if="isSelect" style="width: 28rpx;height: 28rpx;" mode=""></image>
					<image src="../../static/4.png" v-else mode="" style="width: 28rpx;height: 28rpx;"></image>
				</view>
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;">已阅读并同意</view>
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;" @click.stop="gameagreementSinglePage(1)">《购买协议》</view>
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;">与</view>
				<!-- gameagreementSinglePage -->
				<!-- 分期购协议 gotoFenqiXieyi -->
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;" @click.stop="gameagreementSinglePage(3)">《分期购协议》</view>
			</view>
			
			<view style="padding: 56rpx 24rpx 26rpx;" class="flex align-center" v-else>
				<view class="" style="width: 28rpx;height: 28rpx;" @click.stop="changeSelect">
					<image src="../../static/3.png" v-if="isSelect" style="width: 28rpx;height: 28rpx;" mode=""></image>
					<image src="../../static/4.png" v-else mode="" style="width: 28rpx;height: 28rpx;"></image>
				</view>
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;">已阅读并同意</view>
				<view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;" @click.stop="gameagreementSinglePage(1)">《购买协议》</view>
				<!-- <view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;">与</view> -->
				<!-- gameagreementSinglePage -->
				<!-- 分期购协议 gotoFenqiXieyi -->
				<!-- <view style="margin-left: 10rpx;font-size: 20rpx;color: #5C707E;" @click.stop="gameagreementSinglePage(3)">《分期购协议》</view> -->
			</view>
		</block>
		<view style="height: 200rpx;"></view>
		<view class="tools">
			<view class="bottomBtnset">
				<view class="bottomBtnsetLeft text-df">
					<text style="color: #19212D;">总计</text>
					<text style="font-weight: bold;color: #F55B29;">￥</text>
					<text style="font-size: 40rpx;font-weight: bold;color: #F55B29;">{{totalPrice}}</text>
				</view>
				<button type="default" class="bottomBtnsetRight" :loading="isComfirmLoading" @click="comfirmOrder()">提交订单</button>
			</view>
		</view>
		<!-- 网络检测 start -->
		<fu-notwork></fu-notwork>
		<!-- 网络检测 end -->
		
		<!-- 分期购协议 -->
		<fu-popup mode="bottom" v-model="isfenxixieyiShow">
			<view class="bg-white">
				<view style="padding: 40rpx 27rpx 32rpx;" class="flex justify-between align-center">
					<view></view>
					<view class="text-lg text-weight-500" style="color: #36373D;">分期购协议</view>
					<view class="cuIcon-close" @click="closeXiexishow()"></view>
				</view>
				
				<view style="padding: 0 24rpx 35rpx;" class="text-df">
					<scroll-view scroll-y="true" style="width: 702rpx;height: 50vh;color: #868686;line-height: 40rpx;">
						<jyf-parser :html="fenqigoucontent"></jyf-parser>
					</scroll-view>
				</view>
			</view>
		</fu-popup>
	</view>
</template>

<script>
	import {validate} from '@/common/utils/index.js';
	export default {
		components: {

		},
		data() {
			return {
				isShowLoading: false,
				isComfirmLoading: false,
				isfenxixieyiShow:false,
				isSelect:false,
				totalPrice:'',
				baopeiList: [],
				baoIndex: 0,
				shopGoodsinfo:{},
				isfenqi:2,
				fenqiOneIndex:0,
				goods_id:'',
				fenqiTwoList:[],
				fenqiList:[],
				fenqigoucontent:'',
				introducer_no:'',
				qqNum:'',
				mobile:'',
				wechat:'',
			};
		},
		/**
		 * @param {Object} options  goods_id:商品id
		 */
		onLoad(options) {
			let isShifou = options.isShifou || '2';
			if(isShifou == 1) {
				// console.log('')
				this.isfenqi = 1;
			} else {
				this.isfenqi = 2;
			}
			this.goods_id = options.goodsId;
			this.gamebuynoworderinfo();
		},
		onShow() {
		},
		onUnload() {
		},
		
		/**
		 * @description  下拉加载
		 */
		onPullDownRefresh() {

		},

		/**
		 * @description  触底加载
		 */
		onReachBottom() {

		},
		methods: {
			gamesystemarticleinfo() {
				this.$api.post(global.apiUrls.gamesystemarticleinfo,{
					article_id:13
				}).then(res => {
					if(res.data.code == 1) {
						this.fenqigoucontent = res.data.data.content;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			
			gameagreementSinglePage(type) {
				this.$api.post(global.apiUrls.gameagreementSinglePage,{
					type:type
				}).then(res => {
					if(res.data.code == 1) {
						// return;
						window.location.href = res.data.data.url;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamebuynoworderinfo() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gamebuynoworderinfo,{
					goods_id:this.goods_id
				}).then(res => {
					if(res.data.code == 1) {
						this.shopGoodsinfo = {
							cover_images:res.data.data.cover_images[0],
							is_bao:res.data.data.is_bao,
							// is_bao:0,
							goods_name:res.data.data.goods_name,
							attr_values:res.data.data.attr_values,
							area_name:res.data.data.area_name,
							price:res.data.data.price,
							order_no:res.data.data.order_no,
							price:res.data.data.price,
							is_sign_contract:res.data.data.is_sign_contract
						}
						if(res.data.data.is_sign_contract) {
							this.gamesystemarticleinfo();
						}
						if(res.data.data.is_bao === 0) {
							this.shopGoodsinfo.ya_fee = res.data.data.ya_fee;
							this.shopGoodsinfo.ya_rule = res.data.data.ya_rule;
							this.shopGoodsinfo.ya_service = res.data.data.ya_service;
							this.shopGoodsinfo.ya_service_fee = res.data.data.ya_service_fee;
							// this.totalPrice = (parseFloat(res.data.data.price) + parseFloat(res.data.data.ya_fee)).toFixed(2);
							this.totalPrice = res.data.data.price + res.data.data.ya_fee
							console.log('this.totalPrice')
							console.log(res.data.data.price + res.data.data.ya_fee)
						}
						
						// 包赔
						if(res.data.data.is_bao === 1) {
							this.shopGoodsinfo.bao_rule = res.data.data.bao_rule;
							this.shopGoodsinfo.bao_service = res.data.data.bao_service;
							this.baopeiList = res.data.data.bao_fee;
							this.shopGoodsinfo.is_fen = res.data.data.is_fen;
							this.fenqiList = res.data.data.fen_list;
							this.fenqiTwoList = res.data.data.fen_list[0];
							this.shopGoodsinfo.fen_info = res.data.data.fen_info;
							// this.isfenqi = 2;
							this.baoIndex = 0;
							console.log(parseFloat(4.3444))
							// this.totalPrice = (parseFloat(res.data.data.price) + parseFloat(this.baopeiList[0].fee)).toFixed(2)
							this.totalPrice = Math.round((parseFloat(res.data.data.price) + parseFloat(this.baopeiList[0].fee))).toFixed(2)
							if(this.isfenqi == 1) {
								this.changeBaopei(1)
							}
						}
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			comfirmOrder() {
				if(!this.mobile) {
					this.$message.info('请输入手机号码')
					return;
				}
				if(!validate(this.mobile,'phone')) {
					this.$message.info('手机号码格式有误,请重新输入')
					return;
				}
				if(!this.qqNum) {
					this.$message.info('请输入QQ号码');
					return;
				}
				
				if(!this.wechat) {
					this.$message.info('请输入微信号码');
					return;
				}
				if(this.shopGoodsinfo.is_sign_contract && this.shopGoodsinfo.is_bao === 1) {
					if(!this.isSelect) {
						this.$message.info('请阅读并勾选《购买协议》与《分期购协议》');
						return;
					}
 				}
				
				if(this.shopGoodsinfo.is_bao === 0) {
					if(!this.isSelect) {
						this.$message.info('请阅读并勾选《购买协议》');
						return;
					}
				}
				this.isComfirmLoading = true;
				let requestParams = {
					goods_id:this.goods_id,
					order_no:this.shopGoodsinfo.order_no,
					
					introducer_no:this.introducer_no,
					qq:this.qqNum,
					mobile:this.mobile,
					wechat:this.wechat
				}
				console.debug(this.requestParams,'创建订单')
				if(this.shopGoodsinfo.is_bao == 1) {
					requestParams.bao_multiple=this.baopeiList[this.baoIndex].num;
				}
				// is_fen:this.isfenqi == 2 ? 0 : 1,
				// fen_num:
					
					if(this.shopGoodsinfo.is_bao == 1) {
						if(this.shopGoodsinfo.is_fen == 1) {
							if(this.isfenqi == 2) {
								requestParams.is_fen = 0
							}
							if(this.isfenqi == 1) {
								requestParams.is_fen = 1;
								requestParams.fen_num = (this.fenqiOneIndex + 1);	
							}
						}
					}
					
					// if()
					this.$util.throttle(() => {
						this.$api.post(global.apiUrls.gamebuynowcommit,requestParams).then(res => {
							if(res.data.code == 1) {
								console.debug(res.data,'提交订单')
								// setTimeout(() => {
									if(this.shopGoodsinfo.is_bao == 1 && this.isfenqi == 1) {
										uni.setStorageSync('isfenqi',1);
										this.$urouter.redirectTo('/pages/order/order-process/pay-order/index?orderNo=' + this.shopGoodsinfo.order_no + '&price=' + this.totalPrice);
									} else {
										uni.setStorageSync('isfenqi',2);
										this.$urouter.redirectTo('/pages/order/order-process/pay-order/index?orderNo=' + this.shopGoodsinfo.order_no + '&price=' + this.totalPrice);
									}
								// },700)
							} else {
								this.$message.info(res.data.msg);
							}
							this.isComfirmLoading = false;
						})
					},3000)	
			},
			changeSelect() {
				this.isSelect = !this.isSelect;
			},
			//改变期数
			changeQishu(idx) {
				this.fenqiOneIndex = idx;
				this.fenqiTwoList = this.fenqiList[idx];
			},
			
			// 去往分期协议
			gotoFenqiXieyi() {
				this.isfenxixieyiShow = true
			},
			closeXiexishow() {
				this.isfenxixieyiShow = false;
			},
			changeBaopei(idx) {
				this.baoIndex = idx;
				
				if(this.isfenqi == 2) {	
					
					// this.totalPrice = (parseFloat(this.shopGoodsinfo.price) + parseFloat(this.baopeiList[this.baoIndex].fee)).toFixed(2)
					this.totalPrice = Math.round((parseFloat(this.shopGoodsinfo.price) + parseFloat(this.baopeiList[this.baoIndex].fee))).toFixed(2)
				}
				if(this.isfenqi == 1) {
					this.totalPrice = Math.round(((parseFloat(this.shopGoodsinfo.price) * 0.4) + parseFloat(this.baopeiList[this.baoIndex].fee))).toFixed(2)
				}
			},
			
			//改变分期 
			changeFenqi(idx) {
				this.isfenqi = idx;
				if(idx == 2) {
					// this.totalPrice = (parseFloat(this.shopGoodsinfo.price) + parseFloat(this.baopeiList[this.baoIndex].fee)).toFixed(2)
					this.totalPrice = Math.round((parseFloat(this.shopGoodsinfo.price) + parseFloat(this.baopeiList[this.baoIndex].fee))).toFixed(2)
				} 
				if(idx == 1) {
					// this.totalPrice = ((parseFloat(this.shopGoodsinfo.price) * 0.4) + parseFloat(this.baopeiList[idx].fee)).toFixed(2)
					this.totalPrice = Math.round(((parseFloat(this.shopGoodsinfo.price) * 0.4) + parseFloat(this.baopeiList[idx].fee))).toFixed(2)
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.goodsConfirmPage {
		min-height: 100vh;
		background: #FAFAFC;
	}

	.goodsConfirmPageGoods {
		padding: 30rpx 24rpx;
		background: #fff;
		display: flex;
		align-items: center;

		.goodsConfirmPageGoodsleft {
			width: 204rpx;
			height: 152rpx;
		}

		.goodsConfirmPageGoodsright {
			margin-left: 16rpx;
			width: 482rpx;
			height: 152rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goodsConfirmPageGoodsrightBottom {
				display: flex;
				width: 482rpx;
				justify-content: space-between;
				align-items: center;
			}
		}
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
		z-index: 9;
	}

	.bottomBtnset {
		height: 98rpx;
		width: 100%;
		display: flex;
		padding: 0 24rpx;
		align-items: center;
		justify-content: space-between;

		.bottomBtnsetRight {
			width: 200rpx;
			height: 78rpx;
			background: #295B7B;
			border-radius: 0;
			line-height: 78rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			font-weight: 500;
			text-align: center;
		}
	}

	.isNoSelect {
		width: 207rpx;
		height: 96rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #F4F6F8;
		color: #19212D;
		font-weight: 500;
		border-radius: 4rpx;
	}

	.isYesSelect {
		width: 207rpx;
		height: 96rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #295B7B;
		// font-size: 28rpx;
		border-radius: 4rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
