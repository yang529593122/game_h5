<template>
  <view class="">
    <view class="goodDetailPageSwiper" v-if="details">
    		  <view class="goodDetailPageSwiperR">
    			  <view class="goodDetailPageSwiperL">
    				  <swiper class="goodDetailPageSwiperLs" circular :indicator-dots="false" :autoplay="true" :interval="3000"
    				  				:duration="1000" @change="SwiperChange">
    				  				<swiper-item @click="preveImg(index,swperList)" class="goodDetailPageSwiperLs" v-for="(item,index) in details.images" :key="index">
    				  					<view class="goodDetailPageSwiperLs">
    										<fu-image :src="item" mode=""></fu-image>
    									</view>
    				  				</swiper-item>
    				  </swiper>
    			  </view>
    			  <!-- 数量 -->
    			  <view class="goodDetailPageSwiperLength" v-if="details.images">{{swpercurrent}}/{{details.images.length}}</view>
    		  </view>
    </view>

    <view class="title" v-if="details">
      {{ details.name }}
    </view>
    <view class="price" v-if="details">
      <view class="price-num">
        <text style="padding-right: 10rpx;">{{ details.shop_price }}</text>
        <text style="font-size: 24rpx;">{{ details.market_price }}</text>
      </view>
      <view class="status">
        <text>审核中</text>
      </view>
    </view>

    <view class="shop" v-if="shopDetails">
        <view class="shop-info">
          <image :src="shopDetails.shop_logo" mode=""></image>
          <text>{{ shopDetails.shop_name }}</text>
        </view>
        <view class="shop-text" @click="goShop">
          进入店铺
        </view>
    </view>

    <view class="info" v-if="details">
        <view class="info-title">
         商品详情
        </view>
        <view class="">
          <image :src="item"  mode="aspectFill" v-for="item in details.detail_images"></image>
        </view>
        <view class="info-text">
          {{ details.body }}
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        details: null,
        swpercurrent:1,
        shopDetails:null,
      }
    },
    onLoad(options) {
      this.id = options.id
      this.initData()
    },
    methods: {
      initData() {
        this.$api.post(global.apiUrls.shop_goods_detail, {
          goods_id: this.id
        }).then(res => {
          const result =res.data
          if(result.code === "1"){
            this.details = result.data
            this.getShopDetils(result.data.shop_id)
          }else{
            this.$message.info(result.msg);
          }
        })
      },
      getShopDetils(id){
        this.$api.post(global.apiUrls.shop_get_shop_info, {
          shop_id: id
        }).then(res => {
          const result =res.data
          if(result.code === "1"){
            this.shopDetails = result.data
          }else{
            this.$message.info(result.msg);
          }
        })
      },
      SwiperChange(e) {
        this.swpercurrent = e.detail.current + 1;
      },
      goShop() {
        uni.navigateTo({
          url:'/pages/tab/my/business/index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
  .title{
    font-size: 32rpx;
    padding:  0 30rpx;
     background: #fff;
  }
  .price{
    background: #fff;
    padding:  20rpx 20rpx;
    display: flex;
    justify-content: space-between;
    background: #295979;
    .price-num{
      font-size: 32rpx;
      font-weight: bold;
      color: #fff;
    }
    .status{
      color: #fff;
    }
  }
  .shop{
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    margin: 30rpx 0;
    background: #fff;
    .shop-info{
      display: flex;
      align-items: center;
      image{
        display: block;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
      text{
        padding-left: 20rpx;
      }
    }
    .shop-text{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
    }
  }
  .info{
     background: #fff;
    .info-title{
      padding: 30rpx;
      font-size: 32rpx;
    }
    .info-text{
      padding: 30rpx;
    }
    image{
      width: 100%;
      height: 500rpx;
    }
  }

</style>
