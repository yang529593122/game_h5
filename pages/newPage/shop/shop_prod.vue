<template>
  <view class="content">
    <view class="header" style="background: #fff;">
      <view class="top">
        <view class="" @click="uni.navigateTo({  url:`/pages/newPage/shop/shop?id=${id}`})">
          <image style="display: block;width: 40rpx;height: 40rpx;" src="@/static/newPage/59.png" mode=""></image>
        </view>
        <view class="" style="width: 500rpx;line-height: 64rpx;height: 64rpx;border-radius: 32rpx;padding: 0 32rpx;color: #BBBBBB;background: #F9F9F9;">
            搜索游戏名称／商品编号／关键字
        </view>
        <view  style="color: #36373D; font-size: 24rpx; display: flex;align-items: center;justify-content: center;" @click="goPath(`/pages/newPage/shop/shop_type?id=${id}`)">
          <image style="display: block;width: 32rpx;height: 32rpx;" src="./static/fl.png" mode=""></image>
          分类
        </view>
      </view>
    </view>


    <view class="nav-list">
      <view class="nav">
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
      <view class="fl" @click="changeLayout">
        <image style="display: block;width: 30rpx;height: 30rpx;" src="./static/sp.png" mode=""></image>
      </view>

    </view>


    <view class="shop-box" v-if="layout">
      <view class="shop-item" v-for="(item,index) in list" @click="goDetails(item)">
        <image :src="item.thumb" mode="aspectFill"></image>
       <view class="" style="color: #36373D;overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
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

    <view class="sp-box" v-else>
      <view class="shop-item" v-for="(item,index) in list" @click="goDetails(item)">
        <image  :src="item.thumb" mode="aspectFill"></image>
        <view  style="flex: 1;padding-left: 20rpx;">
          <view class="title" style="color: #36373D;">
            {{ item.name }}
          </view>
          <view class=""style="font-size: 12rpx;color: #868686;">
            <text>好评率{{ item.praise_rate }}%</text>
            <text style="padding-left: 40rpx;">销量{{ item.sales_sum }}</text>
          </view>
          <view class="" style="margin-top: 10rpx;">
            <text style="font-size: 32rpx;color: #F55B29;">¥ {{ item.shop_price }}</text>
            <text style="font-size: 24rpx;color: #919191;padding-left: 13rpx;">￥{{ item.market_price }}</text>
          </view>

        </view>
      </view>
    </view>



 <view class="bottom-nav">
      <view class="bottom-nav-content">
        <view class="bottom-nav-content-item" @click="goPath(`/pages/newPage/shop/shop?id=${id}`)">
          <image src="./static/nosy.png" mode=""></image>
          <text>首页</text>
        </view>
        <view class="bottom-nav-content-item" >
          <image src="./static/yesqbsp.png" mode=""></image>
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
  import { CUSTOMER53URL } from "@/common/config.js"
  export default {
    data() {
      return {
        id:'',
        cid:'',
        curr: 0,
        list:[],
        layout:false
      };
    },
    onLoad(opt) {
      this.id= opt.id
      this.cid = opt.cid || ""
      this.initList()
    },
    methods:{
      gotoKefushangpin() {
        window.location.href = CUSTOMER53URL;
      },
      changeLayout(){
        this.layout = !this.layout
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
      initList(){

        //  排序方式：0.置顶位（交易商城首页列表）；1.默认（时间倒序）；2.销量倒序；3.销量升序；4.好评率倒序；5.好评率升序；6.价格倒序；7.价格升序
        this.$api.post(global.apiUrls.shop_goods_list,{
          shop_id:this.id,
          cid:this.cid,
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
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .nav-list {
    background: #fff;
    display: flex;
    justify-content: space-between;
    color: #868686;
    padding: 0 24rpx;
    margin-bottom: 24rpx;
    .nav{
      display: flex;
      .nav-item {
        padding: 0 20rpx;
        &.colored{
          color: #36373D;
        }
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


.sp-box{
  .shop-item{
    display: flex;
    margin-bottom: 24rpx;
    background: #fff;
    padding: 12rpx;
    image{
      display: block;
      width: 204rpx;
      height: 190rpx;
    }
    .title{
      margin-bottom: 24rpx;
      color: #36373D;
       overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
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
