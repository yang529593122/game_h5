<template>
  <view class="applyFor">
    <view class="header">
      <fu-tab :tabs="BARGAINING_APPLYFOR_NAV_DATAS" :current="current" node-title="title" node-key="status" current-key="id" :scrollspy="true"
        size="28" inactive-color="#36373D" active-color="#36373D" @change="changeTab" />

        <fu-empty-ui v-if="list.length"></fu-empty-ui>
        <view class="list-content" v-else>
            <view class="list-item">
              <view class="list-item-top">
                <view class="item-status">
                  <view class="item-num">
                    <view class="item-num-left">
                      <view class="item-bh" @click="setClipboardData('商品编号','123123')">
                        商品编号:12312312313
                      </view>
                      <view class="copy-num">
                          <image src="./static/copy.png"></image>
                      </view>
                    </view>
                    <view class="item-num-right">
                      审核中
                    </view>
                  </view>
                  <view class="item-time">
                    议价时间：2022-02-09 12:00 - 2322-34-34 18:23
                  </view>
                </view>
              </view>
              <view class="list-item-bottom">
                <view class="item-btn failure">
                  失败原因
                </view>
                <view class="item-btn">
                  联系客服
                </view>
                <view class="item-btn viewbtn">
                  查看商品
                </view>
              </view>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
  import { BARGAINING_APPLYFOR_NAV_DATAS } from "../../../common/constStatic.js"
  export default {
    data() {
      return {
        current: 0,
        status: -1,
        BARGAINING_APPLYFOR_NAV_DATAS,
        list:[]
      }
    },
    onLoad() {
      this.getDatas({
        status:this.status
      })
    },
    methods: {
      // 获取数据源
      getDatas(parames){
        this.$api.post(global.apiUrls.my_dicker_apply,parames).then(res => {
          if(res.data.code == 1) {
              const result = res.data.data
              console.log(result,999)
          } else {
        	  this.$message.info(res.data.msg);
          }
        })
      },
      // 复制商品编号
      setClipboardData(title,content) {
        uni.setClipboardData({
        					data: content,
          success: () => {
            this.$message.info(title + content +'已复制')
          }
        });
      },
      // 选择分类
      changeTab(e) {
        this.getDatas({
          status:e.status
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .applyFor {
    background: #F8F8F8;
    min-height: 100vh;
    .header {
      background: #fff;
    }
    .list-content{
      padding: 40rpx;
      .list-item{
       padding: 20rpx;
       background: #ccc;
       .list-item-top{
         .item-status{
           .item-num{
             display: flex;
             justify-content: space-between;
             .item-num-left{
               display: flex;
               padding: 6rpx 0;
               .item-bh{
                 padding-right: 10rpx;
                 color: #9CA1A9;
               }
               .copy-num{
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 image{
                   width: 28rpx;
                   height: 28rpx;
                 }
               }
             }
           }
           .item-time{
             padding: 10rpx 0;
             font-size: 20rpx;
             color: #EC9B2E ;
           }
         }
       }
      .list-item-bottom{
          display: flex;
          justify-content: end;
          border-top: 1rpx solid #EEEEEE;
          padding-top: 20rpx;
          .item-btn{
            padding: 0 30rpx;
            line-height: 60rpx;
            height: 60rpx;
            &.failure{
              color: #F24B4B;
            }
            &.viewbtn{
              background: #295B7B;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
