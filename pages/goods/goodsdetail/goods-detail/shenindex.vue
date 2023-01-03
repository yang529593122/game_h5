<template>
  <view class="goodDetailPage">
	  <fu-custom isBack bgColor="bg-white">
		<view slot="right" style="width: 40rpx;height: 40rpx;" @click="confirmCollect(is_collect)">
			<image src="../../static/stard2.png" v-if="is_collect" style="width: 40rpx;height: 40rpx;" alt=""/>
			<image src="../../static/star2.png" v-else style="width: 40rpx;height: 40rpx;" alt=""/>
		</view>
	  </fu-custom>
	  
	 <fu-loading v-if="isShowLoading"></fu-loading>
	 <block v-else>
		 <!-- 轮播图 start -->
		 <view class="goodDetailPageSwiper" v-if="swperList.length">
		 		  <view class="goodDetailPageSwiperR">
		 			  <view class="goodDetailPageSwiperL">
		 				  <swiper class="goodDetailPageSwiperLs" circular :indicator-dots="false" :autoplay="true" :interval="3000"
		 				  				:duration="1000" @change="SwiperChange">
		 				  				<swiper-item @click="preveImg(index,swperList)" class="goodDetailPageSwiperLs" v-for="(item,index) in swperList" :key="index">
		 				  					<view class="goodDetailPageSwiperLs">
		 										<fu-image :src="item" mode="aspectFit"></fu-image>
		 									</view>
		 				  				</swiper-item>
		 				  </swiper>
		 			  </view>
					  
					  <!-- <view class="goodDetailPageSwiperEmpty">已售空</view> -->
		 			  <!-- 数量 -->
		 			  <view class="goodDetailPageSwiperLength" v-if="swperList.length">{{swpercurrent}}/{{swperList.length}}</view>
		 		  </view>
		 </view>
		 <!-- 轮播图 end -->
		 
		<!-- 账号信息 start -->
		<view class="goodDetailPageInfo">
			<view class="goodDetailPageInfo-name">
				<text v-if="is_bao == 1">[包赔]</text>
				<text v-if="is_bao === 0">[押证包安]</text>
				{{goods_name}}
			</view>
			
			<view class="goodDetailPageInfo-price">
				<view class="text-white">
					<text class="text-sm">￥</text>
					<text class="" style="font-size: 48rpx;">{{price}}</text>
				</view>
				
				<view class="text-sm" v-if="false" style="color: #B4C5D1;" @click="setClipboardData('发布时间','2022-02-17')">
					发布时间：2022-02-17
				</view>
				
				<view style="background: #B4C5D1;width: 140rpx;
height: 56rpx;" class="flex justify-center align-center text-sm text-white" v-if="audit_status === 0">审核中</view>
				
				
				<view style="background: #F02525;width: 140rpx;
				height: 56rpx;" class="flex justify-center align-center text-sm text-white" v-if="audit_status === 1">审核失败</view>
			</view>
			
			<view class="goodDetailPageInfo-accountInfo">
				<view class="goodDetailPageInfo-accountInfo-item" v-if="goods_type_name">
					类型：{{goods_type_name}}
				</view>
				<view class="goodDetailPageInfo-accountInfo-item" v-if="game_name">
					名称：{{game_name}}
				</view>
				<view class="goodDetailPageInfo-accountInfo-item" v-if="area_name">
					区服：{{area_name}}
				</view>
			</view>
			
			<view class="flex align-center justify-between" v-if="false">
				<view class="text-sm" style="color: #B7BAC2;">商品编号</view>
				<view class="flex align-center" @click="setClipboardData('商品编号','KPOIP789868663')">
					<view class="text-sm" style="color: #19212D;">KPOIP789868663</view>
					<view style="width: 28rpx;height: 28rpx;margin-left: 12rpx;">
						<image src="../../static/copy.png" style="width: 28rpx;height: 28rpx;"></image>
					</view>
				</view>
			</view>
			
			<view class="flex align-center justify-between" style="margin-top: 24rpx;" v-if="false">
				<view class="text-sm" style="color: #B7BAC2;">服务保障</view>
				<view style="width: 602rpx;" class="flex align-center flex-wrap justify-end" v-if="false">
				
					<view class="flex align-center" style="margin-left: 40rpx;">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">押证包安</view>
					</view>
					
					
					
					<view class="flex align-center" style="margin-left: 40rpx;">
						<view style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/ke.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">专属客服</view>
					</view>
					
				</view>
				
				<view style="width: 602rpx;" class="flex align-center justify-end" v-else>
					
					<view class="flex align-center" style="">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">可包赔</view>
					</view>
					
					
					
					<view class="flex align-center" style="margin-left: 30rpx;">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">专属客服</view>
					</view>
					
					
					
					<view class="flex align-center" style="margin-left: 30rpx;">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">签署合同</view>
					</view>
					
					
					
					<view class="flex align-center" style="margin-left: 30rpx;">
						<view style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="../../static/ke.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">分期购</view>
					</view>
				
				</view>
			</view>
		</view>
		<!-- 账号信息 end -->
		 
		 <!-- 商品详情 交易须知 官方交流群 start -->
		 <view class="bg-white" style="margin-top: 20rpx;">
			 <fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" :scrollspy="true" size="28" inactive-color="#B4C5D1" active-color="#295B7B"></fu-tab>
		 </view>
		 <view class="" style="width: 750rpx;
height: 1px;
background: #DDDDDD;">
		 	
		 </view>
		 <!-- 商品详情 交易须知 官方交流群 end -->
		 <view class="bg-white" v-if="current == 0">
			 <view class="goodDetailPageGoodsTitle">商品信息</view>
			 <view class="flex flex-wrap align-center" style="padding: 0 24rpx;">
			 				 <view class="text-sm" style="min-width: 248rpx;color: #868686;margin-bottom: 16rpx;margin-right: 50rpx;" v-for="(item,index) in attr_values" :key="index">{{item}}</view>
			 				
			 </view>
			 <view class="goodDetailPageGoodsTitle" style="padding: 16rpx 24rpx 24rpx;">商品介绍</view>
			 <view class="text-sm" style="padding: 0 24rpx;color: #36373D;line-height: 40rpx;">
				 <jyf-parser :html="detail"></jyf-parser>
			 </view>
			 <view class="goodDetailPageGoodsTitle" v-if="detail_images.length">商品截图（{{detail_images.length}}张）</view>
			 <view class="" style="padding: 0 24rpx;" v-if="detail_images.length">
				 <block v-for="(item,index) in detail_images" :key="index">
					 <view style="width: 702rpx;height: 388rpx;" >
					 					 <fu-image :src="item" mode="aspectFit"></fu-image>
					 </view>
					 <view class="bg-white" style="height: 24rpx;"></view>
				 </block> 
			 </view>
		 </view>
		 <view class="bg-white" v-if="current == 1">
			 <view class="goodDetailPageGoodsTitle">智远互娱代售账号</view>
			 <view class="text-sm" style="padding: 0 24rpx 24rpx;color: #36373D;line-height: 40rpx;">
			 				 <jyf-parser :html="transaction_info"></jyf-parser>
			 </view>
		 </view>
		 <view class="bg-white" v-if="current == 2">
			 <view class="" style="padding: 32rpx 24rpx;">
				 <view  v-for="(item,index) in qq_group" :key="index" class="flex align-center justify-between" style="height: 128rpx;width: 702rpx;padding: 21rpx;background: #F7F9FA;margin-bottom: 16rpx;">
				 					 <view class="flex align-center" style="height: 88rpx;">
				 						 <view style="height: 88rpx;width: 88rpx;">
				 							 <fu-image :src="item.icon"></fu-image>
				 						 </view>
				 						 <view class="flex flex-direction justify-between" style="height: 88rpx;margin-left: 17rpx;">
				 						 	<view class="text-df" style="color: #36373D;font-weight: 500;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 400rpx;">{{item.group_name}}</view>
				 							<view class="flex align-center" @click="setClipboardData( item.group_name + '的群号',item.group_num)">
				 								<view class="text-sm" style="color: #5C707E;">{{item.group_num}}</view>
				 								<!-- <view style="width: 13rpx;height: 17rpx;"> -->
				 									<image src="../../static/copy.png" style="width: 20rpx;height: 17rpx;margin-left: 19rpx;" mode="aspectFit"></image>
				 								<!-- </view> -->
				 							</view>
				 						 </view>
				 					 </view>
				 					 <view style="height: 48rpx;line-height: 48rpx;background: #659BC7;width: 136rpx;" class="text-center text-sm text-white" @click="clickJoinQun(item.join_url)">点击进群</view>
				 </view>
			 </view>
			 
			 <view class="goodDetailPageGoodsTitle" style="padding: 24rpx;">进群注意：</view>
			 <view class="text-sm" style="padding: 0 24rpx 24rpx;color: #36373D;line-height: 40rpx;">
			 				 <jyf-parser :html="showParserHtml"></jyf-parser>
			 </view>
		 </view>
		 
		 <!-- 去砍价 start -->
		 <fu-popup v-model="kanjiashow" mode="center">
			 <view class="bg-white" style="height: 745rpx;width: 580rpx;">
				 <view style="padding: 40rpx 32rpx 32rpx;" class="flex align-center justify-between">
					 <view class=""></view>
					 <view class="text-lg text-weight-500" style="color: #36373D;">去砍价</view>
					 <view class="cuIcon-close" @click="closeKanjiaShow"></view>
				 </view>
				 
				 <view style="padding: 0 26rpx;color: #868686;" class="text-df">砍价介绍：砍价信息号主24小时 未回复，
直接视为砍价失败，定金原路退回
报价金额不能低于价格的70%，砍价需要
支付出价格金额20%的定金，砍价成功抵
扣商品款，不成功原路退回，砍价成功
了，12个小时 内没有一个人付款，那就都
按照违约算，扣定金。</view>

				<view style="margin-top: 26rpx;" class="flex flex-direction">
					<view class="flex align-center" style="padding: 0 24rpx;">
						<view class="text-sm" style="color: #36373D;">您的出价：</view>
						<view class="flex align-center" style="height: 80rpx;width: 411rpx;background: #F7F9FA;padding: 0 24rpx;">
							<input placeholder="请输入砍价金额" placeholder-style="font-size: 28rpx;color: #5C707E;"/>
							<view class="text-df" style="color: #36373D;">元</view>
						</view>
					</view>
					<view style="margin-top: 16rpx;color: #F55B29;font-size: 20rpx;margin-left: 144rpx;">砍价金额不低于：￥260</view>
				</view>
				
				<view style="margin-top: 34rpx;padding: 0 24rpx;" class="flex algin-center text-sm">
					<text style="color: #36373D;">砍价定金：</text>
					<text style="color: #F55B29;">¥281.00</text>
				</view>
				
				<view class="flex align-center justify-between" style="padding: 32rpx 26rpx;">
					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 205rpx;
height: 64rpx;background: #3A495A;border-radius: 4rpx;">取消</view>
					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 294rpx;
height: 64rpx;
background: #659BC7;border-radius: 4rpx;">确定并支付定金</view>
				</view>
			 </view>
		 </fu-popup>
		 <!-- 去砍价 end -->
		 <view style="height: 200rpx;" class="bg-white"></view>
		 <!-- 底部按钮 start -->
		 <view class="tools" v-if="false">
			 <view class="bottomBtnSet">
				 <view class="bottomBtnSet-left">
					 <view class="bottomBtnSet-leftTop">
						 <image src="../../static/1.png"></image>
					 </view>
					 <view class="bottomBtnSet-leftText">客服</view>
				 </view>
				 
				 <view class="bottomBtnSet-right">
					 
					 <view class="bottomBtnSet-rightItme" style="background: #659BC7;">
					 		分期购
					 </view>
					 <view class="bottomBtnSet-rightItme" style="background: #EA8E12;"  @click="clickShowkanjiagou">
					 		去砍价
					 </view>
					 <view class="bottomBtnSet-rightItme" style="background: #295B7B;" @click="gotoComfirmBuy">
						 立即购买
					 </view>
				 </view>
			 </view>
		 </view>
		 <!-- 底部按钮 end -->
	 </block>
	  
  </view>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
		swperList:[],
		swpercurrent:1,
		isShowLoading:false,
		MoreListGame:[{name:'商品详情'},{name:'交易须知'},{name:'官方交流群'}],
		current:0,
		kanjiashow:false,
		showParserHtml:``,
		is_collect:0,//收藏
		detail_images:[],
		detail:'',//商品介绍
		goods_type_name:'',
		game_name:"",
		area_name:'',
		audit_status:0,
		goods_name:'',
		is_bao:0,
		price:'',
		attr_values:[],
		transaction_info:'',
		qq_group:[]
    };
  },
  
  onLoad(options) {
	  this.goods_id = options.goods_id || '';
	  this.yishouchudetail(true);
  },
  onShow() {
	  this.yishouchudetail(false);
	  // this.isShowLoading = true;
	  // setTimeout(() => {
		 //  this.isShowLoading = false;
	  // },700)
  },
  onReady: function(res) {},
  onHide() {},
  onUnload() {},
  onPageScroll(e) {},
  filters: {},
  computed: {},
  methods: {
	  clickJoinQun(url) {
		  // #ifdef H5
		  window.location.href = url;
		  // #endif
	  },
	  confirmCollect(collect) {
		  this.$message.info('自己不能收藏自己的商品')
		  return;
	  		  console.log(global.userInfo.id)
	  		  let that = this;
	  		  uni.showModal({
	  		  	title:'提示',
	  			content:'确认'+ (collect == 1 ? '取消' : '收藏')+'该商品吗?',
	  			confirmColor:'#295B7B',
	  			success(result) {
	  				if(result.confirm) {
	  					that.$api.post(global.apiUrls.gamegoodscollect,{
	  						goods_id:that.goods_id,
	  						user_id:global.userInfo.id || 0
	  					}).then(res => {
	  						if(res.data.code == 1) {
	  							that.is_collect = that.is_collect == 1 ? 0 : 1;
	  						} else {
	  							this.$message.info(res.data.msg);
	  						}
	  					})
	  				}
	  			}
	  			
	  		  })
	  },
	  yishouchudetail(status) {
	  		  if(status) {
	  			  this.isShowLoading = true;
	  		  }
	  		  this.$api.post(global.apiUrls.gamegamegoodsdetail,{
	  			  goods_id:this.goods_id,
	  			  user_id:global.userInfo.id || 0
	  		  }).then(res => {
	  			  if(res.data.code == 1) {
					  this.audit_status = res.data.data.audit_status;
	  				  this.is_collect = res.data.data.is_collect || 0;
	  				  this.swperList = res.data.data.cover_images || [];
	  				  this.detail_images = res.data.data.detail_images || [];//商品商品截图图集
	  				  this.detail = res.data.data.detail || '';//商品介绍
	  				  this.goods_type_name = res.data.data.goods_type_name || '';//商品类型名称
	  				  this.game_name = res.data.data.game_name || '';
	  				  this.goods_name = res.data.data.goods_name || '';
	  				  // this.is_bargain = res.data.data.is_bargain || 0;
	  				  // if(res.data.data.is_bargain) {
	  					// this.gamebargaininfo();
	  				  // }
	  				  this.showParserHtml = res.data.data.group_warning.replace('\r\n','<br />');
	  				  this.area_name = res.data.data.area_name || '';
	  				  // this.goods_no = res.data.data.goods_no || '';
	  				  this.is_bao = res.data.data.is_bao;
	  				  // this.is_sign_contract = res.data.data.is_sign_contract;
	  				  this.price = res.data.data.price || 0;
	  				  // this.status = res.data.data.status;
	  				  // this.is_fen = res.data.data.is_fen;
	  				  // this.fixture_date = res.data.data.fixture_date || '';
	  				  // this.create_time = res.data.data.create_time || '';
	  				  this.qq_group = res.data.data.qq_group || [];
	  				  this.transaction_info = res.data.data.transaction_info || '';//交易须知
	  				  // this.transaction_price = res.data.data.transaction_price || 0;
	  				  if(res.data.data.attr_values) {
	  					  this.attr_values = res.data.data.attr_values.split(',');//商品附加信息
	  				  } else {
	  					   this.attr_values =[]
	  				  }
	  				  
	  			  } else {
	  				  this.$message.info(res.data.msg);
	  			  }
	  			  this.isShowLoading = false;
	  		  })
	  },
	  SwiperChange(e) {
		  this.swpercurrent = e.detail.current + 1;
		  console.log(e.detail.current)
	  },
	  // 打开砍价
	  clickShowkanjiagou() {
		  this.kanjiashow = true;
	  },
	  
	  // 关闭砍价
	  closeKanjiaShow() {
		  this.kanjiashow = false;
	  },
	  // 确认购买
	  gotoComfirmBuy() {
		  this.$utils.throttle(()=>{
			  this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-comment/index');
		  },5000)
		  
	  },
	  
	  changeTab(e) {
		this.current = e.index;
		  console.log(this.current )
	  },
	  // 复制
	  setClipboardData(title,content) {
		  let that = this;
		  uni.setClipboardData({
		  	data: content,
		  	success: function () {
		  		that.$message.info(title + '已复制')
		  	}
		  });
	  },
	  preveImg(idx,urls) {
		  uni.previewImage({
		  	current:idx,
			urls:urls
		  })
	  },
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom(e) {}
};
</script>

<style lang="scss" scoped>
.goodDetailPage {
	min-height: 100vh;
	background: #FAFAFC;
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


// 轮播图
.goodDetailPageSwiper {
	padding: 0 24rpx 28rpx;
	background: #ffffff;
	
	.goodDetailPageSwiperR {
		position: relative;
		width: 702rpx;
		height: 490rpx;
		
		.goodDetailPageSwiperEmpty {
			position: absolute;
			width: 160rpx;
			height: 160rpx;
			text-align: center;
			line-height: 160rpx;
			font-size: 36rpx;
			color: #ffffff;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			border-radius: 80rpx;
			background: rgba(0, 0, 0, .8);
		}
		.goodDetailPageSwiperL {
			position: absolute;
			width: 702rpx;
			height: 490rpx;
			.goodDetailPageSwiperLs {
				width: 702rpx;
				height: 490rpx;
			}
		}
		.goodDetailPageSwiperLength {
			position: absolute;
			bottom: 20rpx;
			right: 20rpx;
			background: rgba(0, 0, 0, .8);
			padding: 3rpx 16rpx;
			color: #ffffff;
			font-size: 24rpx;
			border-radius: 6rpx;
		}
	}
}

.goodDetailPageInfo {
	padding: 24rpx;
	background: #ffffff;
	
	.goodDetailPageInfo-name {
		font-size: 36rpx;
		font-weight: 500;
		color: #19212D;
		margin-bottom: 24rpx;
	}
	
	.goodDetailPageInfo-price {
		width: 702rpx;
		height: 90rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #285A7A;
		margin-bottom: 24rpx;
	}
	
	.goodDetailPageInfo-accountInfo {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		
		.goodDetailPageInfo-accountInfo-item {
			background: #F4F6F8;
			padding: 8rpx 10rpx;
			margin-right: 30rpx;
			margin-bottom: 16rpx;
			font-size: 24rpx;
			color: #295B7B;
			font-weight: 500;
		}
	}
}


.goodDetailPageGoodsTitle {
	padding: 32rpx 24rpx 24rpx;
	color: #36373D;
	font-size: 28rpx;
	font-weight: 500;
}

.bottomBtnSet {
	width: 100%;
	height: 98rpx;
	display: flex;
	padding: 0 24rpx;
	justify-content: space-between;
	align-items: center;
	
	.bottomBtnSet-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.bottomBtnSet-leftTop {
			width: 32rpx;
			height: 32rpx;
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
		
		.bottomBtnSet-leftText {
			margin-top: 6rpx;
			font-size: 24rpx;
			color: #36373D;
		}
	}
	
	
	.bottomBtnSet-right {
		display: flex;
		align-items: center;
		.bottomBtnSet-rightItme {
			width: 180rpx;
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: 600;
			margin-left: 20rpx;
			color: #ffffff;
		}
	}
}
</style>
