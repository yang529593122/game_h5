<template>
  <view class="page">
    <!-- 标题栏  start-->
      <fu-custom bgColor="bg-white" :isBack="true" :isBottom="true">
        <block slot="content">{{i18n['提现明细']}}</block>
        <block slot="right">
          <image src="../../static/calendar.png"  class="img"  @click="showCalendar" />
        </block>
      </fu-custom>
    <!-- 充值明细列表 start -->
	<fu-empty-ui v-if="!listData.length"></fu-empty-ui>
	<block v-else>
		<view class="info_list" v-for="(item,index) in listData" :key="index">
		  <view class="info_box">
		    <!-- <image src="../../static/icon.jpg" mode="aspectFill"></image> -->
		    <view class="right-box flex justify-between">
		      <view>
		        <!-- <rich-text class="info_pa" :nodes="item.remark"></rich-text> -->
		        <view>{{i18n['余额提现']}}</view>
		        <text class="info_pb">{{item.create_time}}</text>
		        <!-- <view  class="info_pb" v-if="item.check_status == 2 || item.check_status == 2">
		          {{i18n['拒绝原因：']}}
		          <text>{{item.check_reason}}</text>
		        </view> -->
		      </view>
		      <view>
		         <view class="info_pa_right " >  +{{item.cash_fee}} </view>
		         <view v-if="item.check_status == 0" class="info_pb_right ">{{i18n['审核中']}}</view>
		         <view v-if="item.check_status == 1" class="info_pb_right ">{{i18n['审核通过']}}</view>
		         <view v-if="item.check_status == 2" class="info_pb_right jianfu">{{i18n['审核驳回']}}</view>
		         <view v-if="item.check_status == 3" class="info_pb_right ">{{i18n['已到账']}}</view>
		         <view v-if="item.check_status == 4" class="info_pb_right jianfu">{{i18n['转账拒绝']}}</view>
		      </view>
		    </view>
		  </view>
		</view>
		<!-- 充值明细列表 end -->
		
	</block>
    <!-- 弹窗  -->
    <fu-popup v-model="isShow" mode="center" width="540rpx" height="600rpx">
      <view class="pop-content padding">
        <view class="text-333 text-bold text-lg text-center">{{i18n['提现规则']}}</view>
        <view v-for="(item,index) in ruleDetail" class="margin-top-sm text-999">
        {{index+1}}. {{item.content}}
        </view>
        <!-- <jyf-parser :html="ruleDetail"></jyf-parser> -->
      </view>
      <view class="padding-top flex align-center justify-center" @tap="closePop">
        <view class="round close-btn flex align-center justify-center">
          <text class="cuIcon-close" style="color: #838383;"></text>
        </view>
      </view>
    </fu-popup>
    <!-- 日历弹框 start -->
    <fu-popup v-model="isCalendar" mode="center" :mask-close-able="true" @close="closePopup">
      <view class="calendar-box">
        <fu-calendar @change="change" active-bg-color="#659BC7" range-bg-color="#DFEBF4" :future="true" start-text="" end-text="" mode="range" :isDefaultDay="false" :start-time="start_data" :end-time="end_data"></fu-calendar>
      </view>
    </fu-popup>
    <!-- 日历弹框 end -->
    <!-- 分页组件 start -->
    <fu-empty-ui v-if="pagingListNoListData"></fu-empty-ui>
    <!-- <fu-empty :paging-list-loaded-all="pagingListLoadedAll" :paging-list-no-list-data="pagingListNoListData"
      :list-data-length="listDataLength" :isLoadInit='isLoadInit'></fu-empty> -->
    <!-- 分页组件 end -->
    <!-- 网络监测 start -->
    <fu-notwork></fu-notwork>
    <!-- 网络监测 end -->
  </view>
</template>

<script>
  import pagingList from '@/common/mixin/paging_list.js' //引入混合开发
  export default {
    mixins: [pagingList],
    data() {
      return {
        minixPagingListsApi: global.apiUrls.getWithdrawDetail, //明细请求地址
        pageingListApiMethod: "post", //请求方法
        isShow: false, //规则弹框
        ruleDetail: '', //规则说明
        isCalendar:false,//日历弹窗
        start_data: '', //开始日期
        end_data: '' //结束日期
      }
    },
    onLoad() {
      this.getRules()
    },
    methods: {
      /**
     * @description  显示日历
     */
    showCalendar() {
      this.isCalendar = true;
    },
    /**
     * @description  隐藏日历
     */
    closePopup() {
      this.isCalendar = false;
    },

    /**
     * @description  获取列表
     * @param {Object} value  用来判断第页码初始化第一次 加载页面loading
     */
    change(value) {
      console.log(value)
      if (value.isInit) return;
      this.start_data = value.start;
      this.end_data = value.end;
      setTimeout(() =>{
        this.isCalendar = false;
      },800)
      this.pagingListToggle();
    },
      /**
       * @param {Object} e 提现规则
       */
      getRules() {
        let _this = this;
        _this.$api.post(global.apiUrls.getWithdrawRule).then(res => {
          if (res.data.code == 1) {
            _this.ruleDetail = res.data.data
          }
        }).catch(err => {
          console.log(err, '提现规则')
        })
      },

      showRules() {
        this.isShow = true
      },
      /**
       * @description 关闭规则说明
       */
      closePop() {
        this.isShow = false;
      },
      /**
       * @description  设置要请求的参数
       * 在混入开发时，调用该方法和混入的请求参数合并在一起
       */
      pagingListPostData() {
        return {
          pagesize: 10,
          start_data: this.start_data,
          end_data: this.end_data,
        }
      },
    }
  }
</script>

<style lang="scss">
  .page{
    overflow-y: scroll;
  }
  .solid-bottom::after{
    z-index:9999;
  }
  /deep/ .right{
    display: flex;
    align-items: center;
    .img{
      width: 36rpx;
      height: 36rpx;
    }
  }

  .modes {
    color: $theme !important;
  }
  .jianfu {
    color:#FF6464 !important ;
  }



  // 充值明细列表 start
  .info_list {
    width: 100%;
    background: #FFFFFF;
    &:last-of-type{
      .info_box{
        .right-box {
          border-bottom:none;
        }
      } 
    }
    .info_box {
      margin: 0 32rpx;
      display: flex;

      image {
        margin-top: 36rpx;
        height: 34rpx;
        width: 40rpx;
      }

      .right-box {
        padding: 32rpx 0;
        width: 100%;
        // margin-left: 32rpx;
        border-bottom: 1px #EEEEEE solid;
        
      }
      

      .info_pa {
        font-size: 32rpx;
        font-family: PingFang-SC-Regular;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .info_pb {
        padding-top: 32rpx;
        display: block;
        font-size: 24rpx;
        font-family: PingFang-SC-Regular;
        color: #BFBFBF;
        word-break: break-all;
      }

      .info_pa_right {
        text-align: right;
        font-size: 32rpx;
        font-family: Oswald;
        font-weight: 400;
        color: #2A3948;
      }

      .info_pb_right {
        margin-top: 32rpx;
        text-align: right;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
  }

  // 充值明细列表 end
  // 规则弹窗 start
  .pop-content {
    width: 540rpx;
    height: 472rpx;
    border-radius: 24rpx;
    background: #ffffff;
  }

  .close-btn {
    width: 54rpx;
    height: 54rpx;
    background-color: rgba(255, 255, 255, 0.6);
  }

  // 规则弹窗 end
  // 日历弹框 start
.calendar-box {
  background: #ffffff;
  border-radius: 16rpx;
  width: 640rpx;
  padding: 0 24rpx;
}
// 日历弹框 end
</style>
