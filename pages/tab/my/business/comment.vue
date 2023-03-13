<template>
  <view class="content">
    <view class="list">
      <view class="item">
        <!-- view class="header">
          <view class="title">
            置顶时间: 2022-23-23 23-23 - 2022-23-23 23-23
          </view>
          <view class="time">
            排名 1
          </view>
        </view> -->
        <view class="header">
          <view class="user-info">
            <view class="header-img">
              <image src="../../static/bg.png" mode=""></image>
            </view>
            <view class="user-text">
             <view class="user-name">
               nihao
             </view>
             <view class="user-name">
               <uni-rate size="14" readonly activeColor='#669BC7' :value="5" />
             </view>
            </view>
          </view>
          <view class="time">
            2022-09-23
          </view>
        </view>
        <!-- <view class="details">
          <view class="img-box">
            <image src="../../static/bg.png" mode="aspectFill"></image>
          </view>
          <view class="text">
             哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开
          </view>
        </view> -->
        <view class="long-text">
           哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开
        </view>

        <view class="imgs-list">
          <view class="imgs-list-item" v-for="(item,index) in 5" :key="index">
            <image src="../../static/bg.png" mode=""></image>
          </view>
        </view>

        <view class="header">
          <view class="title">
            王者v10
          </view>
          <view class="time">
            回复
          </view>
        </view>

        <view class="text-list">
          <view class="text-list-item">
            回复:卢卡斯降低了空间阿斯利康
          </view>
        </view>

      </view>

    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
.content{
  min-height: 100vh;
  background: #F8F8F8;
  image{
    display: block;
    width: 100%;
    height: 100%;
  }
  .list{
    padding: 20rpx;
    .item{
      background: #fff;
      padding: 20rpx;
      border-bottom: 1rpx solid #A2A2A2;
      .header{
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
        .user-info{
          display: flex;
          .header-img{
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            overflow: hidden;
          }
          .user-text{
            flex: 1;
            padding-left: 10rpx;
          }
        }
        .title{
          color: #363636 ;
          font-size: 24rpx;
           line-height: 40rpx;
        }
        .time{
          font-size: 24rpx;
          color: #A2A2A2;
          line-height: 40rpx;
        }
      }
      .details{
         display: flex;
         background: yellow;
         .img-box{
            width: 140rpx;
            height: 140rpx;
         }
         .text{
           flex: 1;
           padding-top: 10rpx;
           padding-left: 20rpx;
           color: #A2A2A2;
         }
      }
      .mess{
        padding-top: 20rpx;
        font-size: 24rpx;
        color: #A2A2A2;
      }
      .imgs-list{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-column-gap: 10rpx;
        grid-row-gap: 10rpx;
        .imgs-list-item{
          height: 200rpx;
        }
      }
      .long-text{
        padding: 10rpx 0;
      }
      .text-list{
        background: #F8F8F8;
        padding: 10rpx;
        .text-list-item{
          font-size: 24rpx;
        }
      }
    }

  }
}
</style>
