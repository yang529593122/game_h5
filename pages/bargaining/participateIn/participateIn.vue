<template>
  <view class="applyFor">
    <view class="header">
      <fu-tab :tabs="BARGAINING_PARTICIPATEIN_NAV_DATAS" :current="current" node-title="title" node-key="status" current-key="id" :scrollspy="true"
        size="28" inactive-color="#36373D" active-color="#36373D" @change="changeTab" />

        <fu-empty-ui v-if="!list.length"></fu-empty-ui>
        <view class="list-content" v-else>
            <view class="list-item" v-for="item in list">
              <view class="list-item-top">
                <view class="item-status">
                  <view class="item-num">
                    <view class="item-num-left">
                      <view class="item-bh" >
                        商品编号:{{ item.goods_no }}
                      </view>
                      <view class="copy-num">
                        <!--  <image src="./static/copy.png"></image> -->
                      </view>
                    </view>
                    <view class="item-num-right">
                      <text v-if="item.status == 0">议价中</text>
                      <text v-if="item.status === 2">议价失败</text>
                      <text v-if="item.status === 3">议价失败</text>
                      <text v-if="item.status === 4">已支付</text>
                      <text v-if="item.status === 5">未支付</text>
                      <text v-if="item.status === 6 || item.status === 1 ">议价成功</text>
                    </view>
                  </view>
                 <!-- <view class="item-time">
                    议价时间：2022-02-09 12:00 - 2322-34-34 18:23
                  </view> -->
                </view>
              </view>
              <view class="item-content">
                <view class="item-img">
                  <image :src="item.cover_images[0]" alt="">
                </view>
                <view class="item-info">
                  <view class="item-goods_name">
                   {{ item.goods_name }}
                  </view>
                  <view class="item-text">
                    账号属性:{{ item.attr_values }}
                  </view>
                  <view class="item-text">
                    区服:{{ item.area_name }}
                  </view>
                  <view class="item-price">
                    <view class="item-dicker-deposit">
                      ¥{{ item.price }}
                    </view>
                    <view class="item-dicker-num">
                      x 1
                    </view>
                  </view>
                </view>
              </view>

              <view class="list-item-bottom">
                <view class="list-item-bottom-text" style="justify-content: flex-start;" v-if="item.status === 5">
                 <view class="status6" >
                   超时未支付已扣除定金
                 </view>
                </view>
                <view class="list-item-bottom-text" style="justify-content: flex-start;" v-if="item.status === 1">
                 <view class="status6" >
                   支付倒计时: {{ toHHmmss(item.pay_end_time*1000) }} 超时未支付将扣除定金,请您尽快付款以防账号被其他人抢购
                 </view>
                </view>
                <view class="list-item-bottom-text">
                  <view class="status0" v-if="item.status === 0">
                    议价金额¥{{ item.dicker_price }}
                    议价定金<text> ¥{{ item.dicker_deposit }}</text>
                  </view>
                  <view class="status0" v-if="item.status === 3 || item.status === 1 || item.status === 5 || item.status === 4 ">
                    订单金额¥{{ item.dicker_deposit }}
                    议价金额¥{{ item.dicker_price }}
                    议价定金<text> ¥{{ item.dicker_deposit }}</text>
                  </view>

                </view>
                <view class="list-item-btns">
                  <view class="item-btn" v-if=" item.status===4 || item.status===1" @click="lxkf">
                    联系客服
                  </view>
                  <view v-if="item.status===1" class="item-btn viewbtn" @click="orderPay(item)">
                    去支付
                  </view>
                  <view v-if="item.status===0 || item.status===3 || item.status=== 5 || item.status===6 " @click="lxkf" class="item-btn viewbtn">
                    联系客服
                  </view>
                  <view v-if="item.status===4" class="item-btn viewbtn" @click="goOrderDetail">
                    订单详情
                  </view>
                </view>

              </view>
            </view>
        </view>
    </view>
  </view>
</template>


<script>
   import {CUSTOMER53URL} from '@/common/config.js';
  import { BARGAINING_PARTICIPATEIN_NAV_DATAS } from "../../../common/constStatic.js"
  export default {
    data() {
      return {
        current: 0,
        status: BARGAINING_PARTICIPATEIN_NAV_DATAS[0].status,
        BARGAINING_PARTICIPATEIN_NAV_DATAS,
        list:[

        ],
        curPage:1,
        list_rows:5,
        totalPages:1,
      }
    },
    onLoad() {
      this.getDatas({
        status:this.status,
        page:1,
        list_rows:this.list_rows
      })
    },
    onReachBottom(e) {
    	if(this.curPage < this.totalPages) {
    		this.curPage++;
    		this.getDatas({
          status:this.status,
          page:this.curPage,
          list_rows:this.list_rows
        })
    	}
    },
    methods: {
      toHHmmss (data) {
         var time;
         var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = (data % (1000 * 60)) / 1000;
         time = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
         return time;
      },
      // 支付
      orderPay(item){
        this.$urouter.navigateTo(`/pages/bargaining/confirm/confirm?goodsId=${item.goods_id}&log_id=${item.log_id}`);

      },
      // 联系客服
      lxkf(){
        window.location.href = CUSTOMER53URL;
      },
      // 订单详情
      goOrderDetail(){
        // /pages/order/order-detail/index?orderNo=B20230103150109022685
      },
      // 获取数据源
      getDatas(parames){
        this.$api.post(global.apiUrls.my_dicker_log,parames).then(res => {
          if(res.data.code == 1) {
              const result = res.data.data
              this.list = [...this.list,...result.data]
              this.totalPages = result.last_page
          } else {
        	  this.$message.info(res.data.msg);
          }
        })
      },
      // 选择分类
      changeTab(e) {
        this.list=[]
        this.curPage = 1
        this.status = e.status
        this.getDatas({
          status:this.status,
          page:this.curPage,
          list_rows:this.list_rows
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
       background: #fff;
       margin-bottom: 20rpx;
       .list-item-top{
         .item-status{
           padding-bottom: 20rpx;
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
      .item-content{
        display: flex;
        padding-bottom: 20rpx;
        .item-img{
          width: 204rpx;
          height: 152rpx;
          image{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .item-info{
          flex: 1;
          padding-left: 20rpx;
          .item-goods_name{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .item-text{
            color: #949494;
            font-size: 20rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;

          }
          .item-price{
            padding-top: 20rpx;
            display: flex;
            justify-content: space-between;
            .item-dicker-deposit{
              color: #F55B29;
              font-size: 32rpx;
            }
            .item-dicker-num{
              color: #949494;
            }
          }
        }
      }
      .list-item-bottom{
          border-top: 1rpx solid #EEEEEE;
          padding-top: 20rpx;
          .list-item-bottom-text{
            display: flex;
            justify-content: end;
            padding-bottom: 20rpx;
            font-size: 24rpx;
            .status0{
              color: #C6C8CD;
              text{
                font-size: 28rpx;
                color: #F12525;
              }
            }
            .status6{
              color: #ED9D32;
            }
          }
          .list-item-btns{
            display: flex;
            justify-content: end;
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
  }
</style>
