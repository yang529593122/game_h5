<template>
  <view class="content">
  <block v-if="shopDetails">
    <view class="header" >
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



    <view class="type-list" v-if="typeData">
      <view class="left-box">
        <view class="item" v-for="(item,index) in typeData" @click="selectLeft(item,index)">
          {{ item.name }}
          <view class="status-item" v-if="index === curr"></view>
        </view>
      </view>

      <view class="right">
        <view style="background: #fff;margin-bottom: 20rpx; padding: 40rpx;" v-for="(item,index) in twoarr">
          <view class="right-title">
            {{ item.name }}
          </view>
          <view class="right-title-box">
            <view class="right-title-box-item" v-for="(it,ind) in item.child" @click="selectType(it)">
              <image style="display: block;width: 120rpx;height: 120rpx;" src="./static/iconty.png" mode=""></image>
              <view class="" style="padding-top: 10rpx;">
                {{ it.name }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>


  </block>
    <view class="bottom-nav">
      <view class="bottom-nav-content">
        <view class="bottom-nav-content-item" @click="goPath(`/pages/newPage/shop/shop?id=${id}`)">
          <image src="./static/nosy.png" mode=""></image>
          <text>首页</text>
        </view>
        <view class="bottom-nav-content-item" @click="goPath(`/pages/newPage/shop/shop_prod?id=${id}`)">
          <image src="./static/qbsp.png" mode=""></image>
          <text>全部商品</text>
        </view>
        <view class="bottom-nav-content-item">
          <image src="./static/yesspfl.png" mode=""></image>
          <text>商品分类</text>
        </view>
        <view class="bottom-nav-content-item" @click="gotoKefushangpin">
          <image src="./static/lxwm.png" mode="" ></image>
          <text>联系客服</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { CUSTOMER53URL } from "@/common/config.js"
  export default {
    data() {
      return {
        id:'',
        curr: 0,
        autoplay: true,
        interval: 2000,
        duration: 500,
        shopDetails:null,
        typeData:null,
        twoarr:[]
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
      selectType(item){
        this.goPath(`/pages/newPage/shop/shop_prod?id=${this.id}&cid=${item.id}`)
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
      selectLeft(item,index){
        console.log(item,index)
        this.curr = index
        this.twoarr = this.typeData[index].child
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
        this.$api.post(global.apiUrls.shop_get_category_list).then(res => {
          if (res.data.code === '1') {
            this.typeData = res.data.data
            this.twoarr = res.data.data[0].child
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
  .type-list{
    display: flex;
    .left-box{
      width: 190rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      .item{
        line-height: 80rpx;
        height: 80rpx;
        text-align: center;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 1;
        font-size: 24rpx;
        position: relative;
        .status-item{
          width: 8rpx;
          height: 34rpx;
          background:#659BC7 ;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

      }
    }
    .right{
     flex: 1;
      padding: 24rpx;
      .right-title{
        color: #36373D;
        padding: 0rpx 0 32rpx 0;
      }
      .right-title-box{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-column-gap: 48rpx;
        grid-row-gap: 48rpx;
        .right-title-box-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #36373D;
          text-align: center;
          font-size: 24rpx;
        }
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
