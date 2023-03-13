<template>
  <view class="content">
    <view class="list">
        <view class="item" v-for="(item,index) in 5" >
          <view class="num">
            12312312.00
          </view>
          <view class="title">
            店铺总收入
          </view>
        </view>
    </view>

    <view class="money-list">
      <view class="money-list-item" v-for="(item,index) in 4">
        <view class="money-list-item-title">
          阿克苏结核杆菌
        </view>
        <view class="money-list-item-content" v-for="(item,index) in 7">
          <view class="item-content-left">撒地方</view>
          <view class="item-content-right"> 撒地方</view>
        </view>
      </view>
    </view>
    <view class="btns">
      <view class="btns-item"@click="goToPage('/pages/tab/my/business/withdraw_cash')">
        收益提现
      </view>
    </view>
  </view>
</template>


<script>
  export default {
    data(){
      return {

      }
    },
    onNavigationBarButtonTap(e) {
    	console.log(e)
    	// if(e.index==0){
    	// 	uni.navigateTo({
    	// 		url:'/pages/newPage/shop/addItem'
    	// 	})
    	// }
    },
    methods:{
      goToPage(url){
        uni.navigateTo({url:url})
      },
    },
  }
</script>

<style scoped lang="scss">
  .content{
    min-height: 100vh;
    background: #F8F8F8;
    padding: 20rpx;
    .list{
      padding: 20rpx;
      background: #fff;
      display: grid;
      grid-template-columns: repeat(3,1fr);

      .item{
        padding: 20rpx;
        line-height: 40rpx;
        .num{
          text-align: center;
          font-weight: bold;
        }
        .title{
          text-align: center;
          font-size: 12rpx;
        }
      }
    }
    .money-list{

      .money-list-item{
        margin-top: 20rpx;
        padding: 20rpx;
        background: #fff;
        line-height: 60rpx;
        .money-list-item-title{
          border-bottom: 1rpx solid red;
        }
        .money-list-item-content{
          display: flex;
          justify-content: space-between;
          .item-content-left{

          }
          .item-content-right{

          }
        }
      }
    }

    .btns{
      margin-top: 40rpx;
      padding-bottom: 40rpx;
      .btns-item{
        padding: 26rpx 0;
        background: #295B7B;
        text-align: center;
        font-size: 32rpx;
        color: #fff;
      }
    }
  }
</style>
