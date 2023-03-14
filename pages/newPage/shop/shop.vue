<template>
  <view class="content">
  <block v-if="shopDetails">
    <view class="header">
      <view class="top">
        <view class="">
          <image style="display: block;width: 40rpx;height: 40rpx;" src="../../../static/newPage/25.png" mode=""></image>
        </view>
        <view class="" style="width: 500rpx;background: #fff;line-height: 64rpx;height: 64rpx;border-radius: 32rpx;padding: 0 32rpx;color: #fff;background: rgba(255,255,255,0.39);">
            搜索游戏名称／商品编号／关键字
        </view>
        <view  style="color: #FFFFFF; font-size: 24rpx; display: flex;flex-direction: column;align-items: center;justify-content: center;" @click="dyFn">
          <image style="display: block;width: 32rpx;height: 32rpx;" src="./static/dy.png" mode=""></image>
          订阅
        </view>
      </view>
      <view class="dp-box">
        <view class="dp-log">
          <image :src="shopDetails.shop_logo" mode=""></image>
        </view>
        <view style="padding-left: 16rpx;padding: 4rpx 0;">
          <view class="" style="font-size: 32rpx;color: #FFFFFF;margin-bottom: 6rpx;">
             {{ shopDetails.shop_name }}  {{ shopDetails.is_official ? '官方' :' ' }}
          </view>
          <view class="" style="font-size: 24rpx;color: #FFFFFF; display: flex;justify-content: center;align-items: center;">
            <view class="" style="display: flex; padding-right: 10rpx;">
              <image v-for="item in shopDetails.star" style="display: block;width: 20rpx;height: 20rpx;" src="./static/xing.png" mode=""></image>
            </view>
              信用评分
          </view>
        </view>
        <view style="flex: 1; display: flex; justify-content: space-around;">
          <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              {{ shopDetails.shop_goods_num }}
            </view>
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              在售商品
            </view>
          </view>
         <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              {{ shopDetails.shop_order_num }}
            </view>
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              交易数量
            </view>
          </view>
          <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              {{ shopDetails.shop_subscribe_num }}
            </view>
            <view class="" style="color: #FFFFFF;font-size: 24rpx;">
              订阅数
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="gg-box" style="padding: 0 24rpx;" v-if="shopDetails.shop_tips">
      <swiper circular :autoplay="autoplay" :vertical='true' :interval="interval" :duration="duration" style="height: 80rpx;" >
        <swiper-item>
          <view style="display: flex;height: 80rpx; justify-content: center;align-items: center;">
            <image style="display: block;width: 28rpx;height: 28rpx;" src="./static/gg.png" mode=""></image>
            <view class="" style="overflow: hidden; display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;color: #5C707E;">
              平台公告：{{ shopDetails.shop_tips }}
            </view>
          </view>
        </swiper-item>
        <!-- <swiper-item>
          <view style="display: flex;height: 80rpx; justify-content: center;align-items: center;">
            <image style="display: block;width: 28rpx;height: 28rpx;" src="./static/gg.png" mode=""></image>
            <view class="" style="overflow: hidden; display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;color: #5C707E;">
              平台公告：说无法下单要你缴费的是骗子！说加QQ刷单的是...
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view style="display: flex;height: 80rpx; justify-content: center;align-items: center;">
            <image style="display: block;width: 28rpx;height: 28rpx;" src="./static/gg.png" mode=""></image>
            <view class="" style="overflow: hidden; display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;color: #5C707E;">
              平台公告：说无法下单要你缴费的是骗子！说加QQ刷单的是...
            </view>
          </view>
        </swiper-item> -->
      </swiper>
    </view>


    <view class="nav-list">
      <view class="nav-item " :class=" curr === 0 ? 'colored' :'' "  @click="selectNav(0)">
        综合
      </view>
      <view class="nav-item" :class=" curr === 3 ? 'colored' :'' " @click="selectNav(3)">
        销量
      </view>
      <view class="nav-item" :class=" curr === 7 ? 'colored' :'' " @click="selectNav(7)">
        价格
      </view>
      <view class="nav-item" :class=" curr === 5 ? 'colored' :'' " @click="selectNav(5)">
        好评率
      </view>
    </view>
    <view class="shop-box">
      <view class="shop-item" v-for="(item,index) in list" @click="goDetails(item)">
        <image :src="item.thumb" mode="aspectFill"></image>
        <view class="" style="padding: 16rpx 0 ;color: #36373D;">
          {{ item.name }}
        </view>
        <view class="">
          <text style="font-size: 32rpx;color: #F55B29;">¥ {{ item.shop_price }}</text>
          <text style="font-size: 24rpx;color: #919191;padding-left: 13rpx;">￥{{ item.market_price }}</text>
        </view>
        <view class=""
          style="display: flex;justify-content: space-between;font-size: 12rpx;color: #868686; padding-top: 20rpx;">
          <text>好评率{{ item.praise_rate }}%</text>
          <text>销量{{ item.sales_sum }}</text>
        </view>
      </view>

    </view>
  </block>
    <view class="bottom-nav">
      <view class="bottom-nav-content">
        <view class="bottom-nav-content-item">
          <image src="./static/sy.png" mode=""></image>
          <text>首页</text>
        </view>
        <view class="bottom-nav-content-item" @click="goPath(`/pages/newPage/shop/shop_prod?id=${id}`)">
          <image src="./static/qbsp.png" mode=""></image>
          <text>全部商品</text>
        </view>
        <view class="bottom-nav-content-item" @click="goPath(`/pages/newPage/shop/shop_type?id=${id}`)">
          <image src="./static/qbfl.png" mode=""></image>
          <text>商品分类</text>
        </view>
        <view class="bottom-nav-content-item" @click="gotoKefushangpin">
          <image src="./static/lxwm.png" mode=""></image>
          <text>联系客服</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id:'',
        curr: 0,
        autoplay: true,
        interval: 2000,
        duration: 500,
        shopDetails:null,
        list:[],
      };
    },
    onLoad(opt) {
      this.id= opt.id
      this.initShop()
      this.initList()
    },
    methods:{
      gotoKefushangpin() {
        window.location.href = CUSTOMER53URL;
      },
      dyFn(){
        this.$api.post(global.apiUrls.shop_add_collection,{
          type:4,
          collect_id:this.id
        }).then(res => {
          if (res.data.code === '1') {
           this.$message.info(res.data.msg);
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      goPath(url){
        uni.navigateTo({
          url:url
        })
      },
      goDetails(item){
        uni.navigateTo({
          url:`/pages/tab/tradingMall/goodDetail?id=${item.id}`
        })
      },
      initShop(){
        this.$api.post(global.apiUrls.shop_get_shop_info,{
          shop_id:this.id
        }).then(res => {
          if (res.data.code === '1') {
           this.shopDetails = res.data.data
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      initList(){

        //  排序方式：0.置顶位（交易商城首页列表）；1.默认（时间倒序）；2.销量倒序；3.销量升序；4.好评率倒序；5.好评率升序；6.价格倒序；7.价格升序
        this.$api.post(global.apiUrls.shop_goods_list,{
          shop_id:this.id,
          order:1
        }).then(res => {
          if (res.data.code === '1') {
            console.log(res.data.data)
           this.list = [...this.list,...res.data.data.data]
          } else {
            this.$message.info(res.data.msg);
          }
        })

      },
      selectNav(type){
        this.curr = type
        this.$api.post(global.apiUrls.shop_goods_list,{
          shop_id:this.id,
          order:type
        }).then(res => {
          if (res.data.code === '1') {
           this.list = [...res.data.data.data]
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    padding-bottom: 90rpx;
    box-sizing: border-box;
  }
  .header{
    padding: 40rpx 32rpx;
    background: url('./static/bg.png') no-repeat;
    background-size: cover;
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40rpx 0;
    }
    .dp-box{
      display: flex;
      .dp-log{
        width: 100rpx;
        height: 100rpx;
        overflow: hidden;
        margin-right: 16rpx;
        image{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .nav-list {
    background: #fff;
    display: flex;
    justify-content: space-around;
    color: #868686;

    .nav-item {
      padding: 24rpx 0;
      &.colored{
        color: #36373D;
      }
    }
  }

  .shop-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20rpx;
    grid-row-gap: 20rpx;
    padding: 24rpx;

    .shop-item {
      padding: 16rpx;
      background: #fff;

      image {
        display: block;
        width: 100%;
        height: 228rpx;
      }
    }

  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .bottom-nav-content {
      width: 100%;
      height: 88rpx;
      background: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .bottom-nav-content-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        image {
          display: block;
          width: 40rpx;
          height: 40rpx;
        }

        text {
          font-size: 24rpx;
          color: #36373D;
        }
      }
    }
  }
</style>
