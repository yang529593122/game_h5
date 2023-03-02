<template>
  <view class="goodDetailPage">
	  <fu-custom isBack bgColor="bg-white">
		<block slot="right">
			<view class="flex algin-center">
				<view  style="width: 40rpx;height: 40rpx;" @click="confirmCollect(is_collect)">
					<image src="./static/stard2.png" v-if="is_collect" style="width: 40rpx;height: 40rpx;" alt=""/>
					<image src="./static/star2.png" v-else style="width: 40rpx;height: 40rpx;" alt=""/>
				</view>
				<!-- <view style="width: 40rpx;height: 40rpx;margin-left: 20rpx;" @click="gotoHome">
					<image src="./static/9.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view> -->
			</view>
		</block>
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

					  <view class="goodDetailPageSwiperEmpty" v-if="status == 2">已售空</view>
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
			{{goods_name}}</view>

      <!-- 议价处理 -->
      <block v-if="type === 'yj'">
        <view style="padding: 16rpx 24rpx;width: 702rpx;margin-bottom: 24rpx;background: #285A7A;">
        	<view>
        		<text class="text-white text-sm">￥</text>
        		<text class="text-white" style="font-size: 48rpx;">{{max_price}}</text>
            <text style="color: #fff;padding-left: 10rpx;">当前竞拍价</text>
        	</view>
        	<view class="flex align-center justify-between" style="margin-top: 7rpx;">
        		<view>
        			<text class="text-sm" style="color: #B4C5D1;">议价时间:</text>
        			<text class="text-sm" style="color: #B4C5D1;margin-left: 7rpx;">{{ start_time }} - {{ end_time }}</text>
        		</view>
        	</view>
        </view>
      </block>
      <block v-else>
        <view style="padding: 16rpx 24rpx;width: 702rpx;margin-bottom: 24rpx;background: #285A7A;" v-if="status == 2">
        	<view>
        		<text class="text-white text-sm">￥</text>
        		<text class="text-white" style="font-size: 48rpx;">{{transaction_price}}</text>
        	</view>
        	<view class="flex align-center justify-between" style="margin-top: 7rpx;">
        		<view>
        			<text class="text-sm" style="color: #B4C5D1;">售价</text>
        			<text class="text-sm" style="color: #B4C5D1;margin-left: 7rpx;">￥{{price}}</text>
        		</view>
        		<view class="text-sm" style="color: #B4C5D1;" @click="setClipboardData('成交日期',fixture_date)">
        			成交日期：{{fixture_date}}
        		</view>
        	</view>
        </view>
        <view class="goodDetailPageInfo-price" v-else>
        	<view class="text-white">
        		<text class="text-sm">￥</text>
        		<text class="" style="font-size: 48rpx;">{{price}}</text>
        	</view>

        	<view class="text-sm" style="color: #B4C5D1;" @click="setClipboardData('发布时间',create_time)">
        		发布时间：{{create_time}}
        	</view>
        </view>
      </block>




			<view class="goodDetailPageInfo-accountInfo">
				<view class="goodDetailPageInfo-accountInfo-item"  v-if="goods_type_name">
					类型：{{goods_type_name}}
				</view>
				<view class="goodDetailPageInfo-accountInfo-item" v-if="game_name">
					名称：{{game_name}}
				</view>
				<view class="goodDetailPageInfo-accountInfo-item" v-if="area_name">
					区服：{{area_name}}
				</view>
			</view>

			<view class="flex align-center justify-between" v-if="goods_no">
				<view class="text-sm" style="color: #B7BAC2;">商品编号</view>
				<view class="flex align-center" @click="setClipboardData('商品编号',goods_no)">
					<view class="text-sm" style="color: #19212D;">{{goods_no}}</view>
					<view style="width: 28rpx;height: 28rpx;margin-left: 12rpx;">
						<image src="./static/copy.png" style="width: 28rpx;height: 28rpx;"></image>
					</view>
				</view>
			</view>

			<view class="flex align-center justify-between" style="margin-top: 24rpx;">
				<view class="text-sm" style="color: #B7BAC2;">服务保障</view>
				<!-- <view style="width: 602rpx;" class="flex align-center flex-wrap justify-end" v-if="false">
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
				</view> -->

				<view style="width: 602rpx;" class="flex align-center justify-end">
					<!-- 可包赔 start -->
					<view class="flex align-center" style="">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="./static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">{{is_bao == 1 ? '可包赔' : '押证包安'}}</view>
					</view>
					<!-- 可包赔 end -->

					<!-- 专属客服 start -->
					<view class="flex align-center" style="margin-left: 30rpx;">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="./static/ke.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">专属客服</view>
					</view>
					<!-- 专属客服 end -->

					<!-- 签署合同 start -->
					<view class="flex align-center" style="margin-left: 30rpx;" v-if="is_sign_contract == 1">
						<view  style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="./static/bao.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">签署合同</view>
					</view>
					<!-- 签署合同 end -->

					<!-- 分期购 start -->
					<view class="flex align-center" style="margin-left: 30rpx;" v-if="is_fen">
						<view style="width: 24rpx;height: 24rpx;margin-right: 11rpx;">
							<image src="./static/ke.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="text-sm" style="color: #19212D;">分期购</view>
					</view>
					<!-- 分期购 end -->
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
					 <!-- <view style="width: 702rpx;height: 388rpx;" @click="preveImg(index,detail_images)">
					 					 <fu-image :src="item" mode="aspectFit"></fu-image>
					 </view> -->
					 <image :src="item" mode="widthFix" style="width: 702rpx" @click="preveImg(index,detail_images)"></image>
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
				 <view v-for="(item,index) in qq_group" :key="index" class="flex align-center justify-between" style="height: 128rpx;width: 702rpx;padding: 21rpx;background: #F7F9FA;margin-bottom: 16rpx;">
					 <view class="flex align-center" style="height: 88rpx;">
						 <view style="height: 88rpx;width: 88rpx;">
							 <fu-image :src="item.icon"></fu-image>
						 </view>
						 <view class="flex flex-direction justify-between" style="height: 88rpx;margin-left: 17rpx;">
						 	<view class="text-df" style="color: #36373D;font-weight: 500;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 400rpx;">{{item.group_name}}</view>
							<view class="flex align-center" @click="setClipboardData( item.group_name + '的群号',item.group_num)">
								<view class="text-sm" style="color: #5C707E;">{{item.group_num}}</view>
								<!-- <view style="width: 13rpx;height: 17rpx;"> -->
									<image src="./static/copy.png" style="width: 20rpx;height: 17rpx;margin-left: 19rpx;" mode="aspectFit"></image>
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


      <view class="bg-white" v-if="current == 3">
      			 <view class="" style="padding: 32rpx 24rpx;" v-if="bidRecordLists.length">

               <view class="table-header-yj">
                 <view class="table-header-yj-title">
                    出价时间
                 </view>
                 <view class="table-header-yj-title">
                    出价金额
                 </view>
                 <view class="table-header-yj-title">
                    出价定金
                 </view>
               </view>
               <view class="table-header-yj" v-for="item in bidRecordLists">
                 <view class="table-header-yj-title table-header-yj-text">
                    {{ item.create_time }}
                 </view>
                 <view class="table-header-yj-title table-header-yj-text">
                    ¥ {{ item.dicker_price }}
                 </view>
                 <view class="table-header-yj-title table-header-yj-text">
                    ¥ {{ item.dicker_deposit }}
                 </view>
               </view>
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

				 <view style="padding: 0 26rpx;color: #868686;" class="text-df">
					 <view style="width: 100%;height: 300rpx;">
						 <!-- 砍价介绍：{{kanjiajieshao}} -->
						 <scroll-view scroll-y="true" style="width: 100%;height: 300rpx;overflow: scroll!important;" show-scrollbar>
							 <view style="width: 100%;height: 300rpx;">
								 <!-- <jyf-parser :html="'砍价介绍:' + kanjiajieshao"></jyf-parser> -->
								 <view class="text-df text-bold text-333">砍价介绍:请下滑阅读全文</view>
								 <view class="text-df" v-for="(item,index) in kanjiajieshao">{{item}}</view>
							 </view>
						 </scroll-view>
					 </view>
				 </view>

				<view style="margin-top: 26rpx;" class="flex flex-direction">
					<view class="flex align-center" style="padding: 0 24rpx;">
						<view class="text-sm" style="color: #36373D;">您的出价：</view>
						<view class="flex align-center" style="height: 80rpx;width: 411rpx;background: #F7F9FA;padding: 0 24rpx;">
							<input v-model="inputkanjiajine" @input="jisuanjiage" type="digit" placeholder="请输入砍价金额" placeholder-style="font-size: 28rpx;color: #5C707E;"/>
							<view class="text-df" style="color: #36373D;">元</view>
						</view>
					</view>
					<view style="margin-top: 16rpx;color: #F55B29;font-size: 20rpx;margin-left: 144rpx;">砍价金额不低于：￥{{minkanjianPrice}}</view>
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
		 <!-- 去砍价 end -->
		 <view style="height: 200rpx;" class="bg-white"></view>
     <!-- 从议价页面过来详情的底部按钮 start -->
     <view v-if="type === 'yj'">
       <view class="tools">
       			 <view class="bottomBtnSet yj-btns-content">
       				 <view class="bottomBtnSet-left" @click="gotoKefushangpin">
       					 <view class="bottomBtnSet-leftTop">
       						 <image src="./static/1.png"></image>
       					 </view>
       					 <view class="bottomBtnSet-leftText">客服</view>
       				 </view>

       				 <view class="bottomBtnSet-right yj-btns-bottomBtnSet-right">
                 <view class="yj-btns" @click="participate">
                   该账号正在议价中,立即参与
                 </view>
       				 </view>
       			 </view>
       </view>
     </view>
     <!-- 从议价页面过来详情的底部按钮 end -->


		 <!-- 底部按钮 start -->
		 <view class="tools" v-if="status != 2 && type!=='yj'">
			 <view class="bottomBtnSet">
				 <view class="bottomBtnSet-left" @click="gotoKefushangpin">
					 <view class="bottomBtnSet-leftTop">
						 <image src="./static/1.png"></image>
					 </view>
					 <view class="bottomBtnSet-leftText">客服</view>
				 </view>

				 <view class="bottomBtnSet-right">

					 <view class="bottomBtnSet-rightItme" style="background: #659BC7;" v-if="is_fen" @click="gotofenqiGou()">
					 		分期购
					 </view>
					 <view class="bottomBtnSet-rightItme" style="background: #EA8E12;" v-if="is_bargain" @click="clickShowkanjiagou">
					 		去砍价
					 </view>
					 <view class="bottomBtnSet-rightItme" style="background: #295B7B;" @click="gotoComfirmBuy">
						 立即购买
					 </view>
				 </view>
			 </view>
		 </view>
		 <!-- 底部按钮 end -->


     <fu-popup v-model="participateShow" mode="center">
     			 <view class="bg-white">
     				 <view style="padding: 40rpx 32rpx 32rpx;" class="flex align-center justify-between">
     					 <view class=""></view>
     					 <view class="text-lg text-weight-500" style="color: #36373D;">账号议价</view>
     					 <view class="cuIcon-close" @click="closeParticipateShow"></view>
     				 </view>
     				<view style="margin-top: 26rpx;" class="flex flex-direction">
     					<view class="flex align-center" style="padding: 0 24rpx;">
     						<view class="text-sm" style="color: #36373D;">您的议价：</view>
     						<view class="flex align-center" style="height: 80rpx;width: 411rpx;background: #F7F9FA;padding: 0 24rpx;">
     							<input v-model="curNow_price" @input="changeCurNow_price" type="digit" placeholder="请输入议价金额" placeholder-style="font-size: 28rpx;color: #5C707E;"/>
     							<view class="text-df" style="color: #36373D;">元</view>
     						</view>
     					</view>
     					<view style="margin-top: 16rpx;color: #F55B29;font-size: 20rpx;margin-left: 20rpx;" v-if="maxDickerPriceData">议价金额不低于：￥{{ Number(maxDickerPriceData.now_price) +Number(maxDickerPriceData.markup_range)}}</view>
     				</view>
     				<view style="margin-top: 34rpx;padding: 0 24rpx;" class="flex algin-center text-sm">
     					<text style="color: #36373D;">议价定金：</text>
     					<text style="color: #F55B29;" >¥{{ this.depositPrice }}</text>
     				</view>

     				<view class="flex align-center justify-between" style="padding: 32rpx 26rpx;">
     					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 205rpx;
     height: 64rpx;background: #F9F9F9;border-radius: 4rpx; color: #3F4046;" @click="closeParticipateShow">取消</view>
     					<view class="flex align-center justify-center text-white text-df text-weight-500" style="width: 294rpx;
     height: 64rpx;
     background: #295B7B;border-radius: 4rpx;" @click="submitDepositPrice">确定并支付定金</view>
     				</view>
     			 </view>
     		 </fu-popup>
	 </block>

  </view>
</template>

<script>
	import {CUSTOMER53URL} from '@/common/config.js';
export default {
  components: {
  },
  data() {
    return {
		swperList:[],
		swpercurrent:1,
		isShowLoading:false,
		MoreListGame:[{name:'商品详情'},{name:'交易须知'},{name:'官方交流群'},{name:'出价记录'}],
		current:0,
		kanjiashow:false,
		goods_id:'',
		showParserHtml:``,
		is_collect:0,//是否收藏
		detail_images:[],
		detail:'',//商品介绍
		attr_values:[],
		goods_type_name:'',//商品类型名称
		game_name:'',//游戏名称
		goods_type_name:'',//商品类型名称
		area_name:'',//区服名称
		goods_no:'',
		goods_name:'',
		is_bargain:0,
		is_bao:1,
		is_sign_contract:0,
		price:0,
		status:1,
		is_fen:0,
		fixture_date:'',//成交日期
		create_time:'',//发布日期
		qq_group:[],//官方交易列表
		transaction_info:'',//交易须知
		transaction_price:0,//成交价格
		kanjiajieshao:'',
		minkanjianPrice:'',//最低价格
		dingPrice:'0.00',
		inputkanjiajine:'',
		last_bargain_deposit:0,
		last_bargain_price:0,
		bargain_ding:100,
		currentPages:1,
		totalPages:1,
    max_price:'', // 当前竞拍价
    start_time:"", // 竞拍开始时间
    end_time:'', // 竞拍结束时间
    type:'', // 来自哪里的页面类型
    bidRecordLists:[], // 出价记录
    participateShow:false,
    maxDickerPriceData:null,
    curNow_price:'',
    depositPrice:0
    };
  },

  onLoad(options) {
	  this.goods_id = options.goods_id || '';
	  // this.yishouchudetail(true);
	  this.huoqushangpinjietu();
	  this.yishouchudetail(true);
    this.type = options.type
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
  watch:{
	  // inputkanjiajine(val) {
		 //  if(val) {
			//   if()
		 //  }
	  // }
  },
  methods: {
    // 提交
    submitDepositPrice() {
      if(Number(this.curNow_price)< Number(this.maxDickerPriceData.now_price) +Number(this.maxDickerPriceData.markup_range)){
        this.$message.info(`您的议价不能低于${Number(this.maxDickerPriceData.now_price) +Number(this.maxDickerPriceData.markup_range)}`);
      }else{

          this.$api.post(global.apiUrls.dickerQuote,{
            goods_id:this.goods_id,
            price:this.curNow_price
          }).then(res => {
            if(res.data.code == 1) {
                const result = res.data.data
                 console.log(result,999)
                 this.$urouter.navigateTo('/pages/bargaining/pay/pay?orderNo=' + result.order_sn + '&price=' + result.price)
            } else {
          	  this.$message.info(res.data.msg);
            }
          })
      }
    },
    // 输入当前议价个
    changeCurNow_price(){
      if(this.curNow_price){
          this.depositPrice = parseFloat(this.curNow_price*this.maxDickerPriceData.apply_percent/100).toFixed(2)
      }else{
          this.depositPrice = 0
      }

    },
    // 参与议价
    participate(){
      this.$api.post(global.apiUrls.getMaxDickerPrice,{
        goods_id:this.goods_id
      }).then(res => {
        if(res.data.code == 1) {
            const result = res.data.data
             this.maxDickerPriceData = result
             this.participateShow = true
        } else {
      	  this.$message.info(res.data.msg);
        }
      })
    },
    closeParticipateShow(){
      this.participateShow = false
    },
	  huoqushangpinjietu() {
		  this.$api.post(global.apiUrls.huoqushangpinjietu,{
			  page:this.currentPages,
			  list_rows:15,
			  goods_id:this.goods_id
		  }).then(res => {
			  if(res.data.code == 1) {
				  if(this.currentPages == 1) {
					  this.totalPages = res.data.data.last_page;
					  this.detail_images = res.data.data.data || [];//商品商品截图图集
				  } else {
					  this.detail_images.push(...res.data.data.data)
				  }
			  } else {
				  this.$message.info(res.data.msg);
			  }
		  })
	  },
	  gotoHome() {
		  uni.switchTab({
		  	url:'/pages/tab/home/shopindex/index'
		  })
	  },
	  jisuanjiage() {
		  if(parseFloat(this.inputkanjiajine) >= parseFloat(this.minkanjianPrice)) {
			  this.dingPrice = (this.inputkanjiajine * (parseFloat(this.bargain_ding) / 100) - this.last_bargain_deposit).toFixed(2);
			  // console.log(this.inputkanjiajine * (parseFloat(this.bargain_ding) / 100));
			  // console.log(this.last_bargain_deposit);
		  } else {
			  this.dingPrice = '0.00';
		  }
	  },
	  gotoKefushangpin() {
		  window.location.href = CUSTOMER53URL;
	  },
	  // 收藏
	  confirmCollect(collect) {
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
						user_id:(global.userInfo && global.userInfo.id) || 0
					}).then(res => {
						if(res.data.code == 1) {
							that.is_collect = that.is_collect == 1 ? 0 : 1;
						} else {
							that.$message.info(res.data.msg);
						}
					})
				}
			}

		  })
	  },
	  // 确认支付定金
	  comfirmZhifuDingjin() {
		 if(!this.inputkanjiajine) {
			 // this.kanjiashow = false;
			 this.$message.info('请输入您的出价');
			 return;
		 }

		  if(parseFloat(this.inputkanjiajine) < parseFloat(this.minkanjianPrice)) {
			  // this.kanjiashow = false;
			  this.$message.info('砍价金额不得小于' + this.minkanjianPrice);
			  return;
		  }
		  this.$util.showModal({
		  	title: '提示',
		  	content: '确定并支付砍价吗？',
		  	confirmColor: this.$store.state.themeColor,
		  	success: result => {
		  		if (result.confirm) {
		  			this.$api.post(global.apiUrls.gamecreatebargain,{
		  						  goods_id:this.goods_id,
		  						  bargain_price:this.inputkanjiajine
		  			}).then(res => {
		  						  if(res.data.code == 1) {
		  							  this.kanjiashow = false;
		  							  // this.orderNo = options.orderNo;
		  							  // this.payprice = options.price;
		  							  this.$urouter.navigateTo('/pages/makeorder/kanpay/index?orderNo=' + res.data.data.order_no + '&price=' + this.dingPrice)
		  						  } else {
		  							  this.kanjiashow = false;
		  							  this.$message.info(res.data.msg);
		  						  }
		  			})

		  		}
		  	}
		  });

	  },
	  gamebargaininfo() {
		this.$api.post(global.apiUrls.gamebargaininfo).then(res => {
			if(res.data.code == 1) {
				 this.kanjiajieshao = res.data.data.bargain_info;
				 // this.minkanjianPrice = parseFloat(this.last_bargain_price * (parseFloat(res.data.data.bargain_min) / 100)).toFixed(2);
				 this.minkanjianPrice = this.last_bargain_price;
				 // this.minkanjianPrice = Math(parseFloat(this.last_bargain_price * (parseFloat(res.data.data.bargain_min) / 100))).toFixed(2);
				 // this.minkanjianPrice =this.last_bargain_price;
				 this.bargain_ding = res.data.data.bargain_ding;
				 // this.dingPrice = parseFloat(this.price * (parseFloat(res.data.data.bargain_ding) / 100)).toFixed(2) - this.last_bargain_deposit;
				 // this.dingPrice = Math.round(this.price * (parseFloat(res.data.data.bargain_ding) / 100)).toFixed(2) - this.last_bargain_deposit;
				 // this.dingPrice = Math.round(this.price * (parseFloat(res.data.data.bargain_ding) / 100)).toFixed(2) - this.last_bargain_deposit;
			} else {
				this.$message.info(res.data.msg);
			}
		})
	  },
	  clickJoinQun(url) {
		  // #ifdef H5
		  // window.location.href = url;
		  window.open(url)
		  // #endif
	  },
	  yishouchudetail(status) {
		  if(status) {
			  this.isShowLoading = true;
		  }
		  this.$api.post(global.apiUrls.gamegamegoodsdetail,{
			  goods_id:this.goods_id,
			  user_id:(global.userInfo && global.userInfo.id) || 0
		  }).then(res => {
			  if(res.data.code == 1) {
				  this.last_bargain_deposit = res.data.data.last_bargain_deposit;
				  this.last_bargain_price = res.data.data.last_bargain_price;
				  this.is_collect = res.data.data.is_collect || 0;
				  this.swperList = res.data.data.cover_images || [];
				  // this.detail_images = res.data.data.detail_images || [];//商品商品截图图集
				  this.detail = res.data.data.detail || '';//商品介绍
				  this.goods_type_name = res.data.data.goods_type_name || '';//商品类型名称
				  this.game_name = res.data.data.game_name || '';
				  this.goods_name = res.data.data.goods_name || '';
				  this.is_bargain = res.data.data.is_bargain || 0;
          this.max_price = res.data.data.max_price
          this.start_time = res.data.data.start_time
          this.end_time = res.data.data.end_time
				  if(res.data.data.is_bargain) {
					this.gamebargaininfo();
				  }
				  this.showParserHtml = res.data.data.group_warning.replace('\r\n','<br />');
				  this.area_name = res.data.data.area_name || '';
				  this.goods_no = res.data.data.goods_no || '';
				  this.is_bao = res.data.data.is_bao;
				  this.is_sign_contract = res.data.data.is_sign_contract;
				  this.price = res.data.data.price || 0;
				  this.status = res.data.data.status;
				  this.is_fen = res.data.data.is_fen;
				  this.fixture_date = res.data.data.fixture_date || '';
				  this.create_time = res.data.data.create_time || '';
				  this.qq_group = res.data.data.qq_group || [];
				  this.transaction_info = res.data.data.transaction_info || '';//交易须知
				  this.transaction_price = res.data.data.transaction_price || 0;
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
		  this.$util.throttle(()=>{
			  // uni.navigateTo({
			  // 	url:'/pages/goods/goodsdetail/goods-comment/index'
			  // })
			  this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-comment/index?goodsId=' + this.goods_id);
		  },5000)

	  },
	  gotofenqiGou() {
		  this.$util.throttle(()=>{
		  			  // uni.navigateTo({
		  			  // 	url:'/pages/goods/goodsdetail/goods-comment/index'
		  			  // })
		  			  this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-comment/index?isShifou=1&goodsId=' + this.goods_id);
		  },5000)
	  },

	  changeTab(e) {
		this.current = e.index;
		  if(e.index===3){
        this.$api.post(global.apiUrls.bidRecordList,{
          goods_id:this.goods_id,
        }).then(res => {
          if(res.data.code ==='1'){
            const result = res.data.data
            this.max_price = result.price
            this.bidRecordLists = result.list.data
          }else{
            this.$message.info(res.data.msg);
          }
        })
      }
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
  onReachBottom(e) {
	  if(this.currentPages < this.totalPages) {
		  this.currentPages++;
		  this.huoqushangpinjietu();
	  }
  }
};
</script>

<style lang="scss" scoped>
.goodDetailPage {
	min-height: 100vh;
	background: #FAFAFC;
}

.table-header-yj{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr ;
  background: #E7ECF0;
  height: 80rpx;
  line-height: 80rpx;
  color: #446F8B;
  text-align: center;

  .table-header-yj-text{
    background: #fff;
    font-size: 14rpx;
    line-height: 80rpx;
    height: 80rpx;
    color: #535454;
    border-bottom: 1rpx solid #EEEEEE;
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
  z-index: 2;
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
  &.yj-btns-content{
    justify-content:inherit
  }
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
    &.yj-btns-bottomBtnSet-right{
      display: inherit;
      flex: 1;
      padding-left: 20rpx;
    }
    .yj-btns{
      width: 100%;
      background: #659BC7;
      text-align: center;
      color: #fff;
      line-height: 80rpx;
      height: 80rpx;
    }
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
