<template>
  <view class="page">
    <!-- 标题栏  start-->
      <fu-custom bgColor="bg-white" :isBack="true" :isBottom="true">
        <block slot="content">{{ i18n['余额明细'] }}</block>
        <block slot="right">
          <!-- <view class="cuIcon-calendar text-theme2" style="font-size: 36rpx" @click="showCalendar"></view> -->
          <image src="../../static/calendar.png"  class="img" @click="showCalendar"/>
        </block>
      </fu-custom>
    <!-- 标题栏  end -->
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view v-for="(item, index) in navList" :key="index" class="cu-item flex-sub" :class="{ cur: tabCurrentIndex === index }" @click="tabClick(index)">
          {{ item.text || '' }}
          <view class="active-line"></view>
        </view>
      </view>
    </scroll-view>

    <!-- 导航栏 end -->
    <view class="margin-top-xl" v-if="isShowLoading"><fu-loading></fu-loading></view>
    <!-- 订单列表 start -->
    <view class="list" v-else>
      <block v-for="(item, index) in lists" :key="index">
        <view class="order-item">
          <view class="i-top justify-between">
            <view class="content">
              <view class="desc ">
                {{ item.remark }}
                <!-- <text class="status-badge" v-if="item.check_status == 0">({{ i18n['待审核'] }})</text>
                <text class="status-badge" v-if="item.check_status == 1">({{ i18n['审核通过'] }})</text>
                <text class="status-badge" v-if="item.check_status == 2">({{ i18n['审核拒绝'] }})</text>
                <text class="status-badge" v-if="item.check_status == 3">({{ i18n['已完成'] }})</text>
                <text class="status-badge" v-if="item.check_status == 4">({{ i18n['转账拒绝'] }})</text> -->
              </view>
              <text class="create_time">{{ item.create_time }}</text>
            </view>

            <view class="flex align-center text-lg">
              <text v-if="item.after_money - item.before_money > 0" class="text-weight-400 margin-left text-red">+{{ item.change_money }}</text>
              <text v-else class="text-weight-400 margin-left">{{ item.change_money }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 订单列表 end -->
    <!-- 日历弹框 start -->
    <fu-popup v-model="isShow" mode="center" :mask-close-able="true" @close="closePopup">
      <view class="calendar-box">
        <fu-calendar @change="change" active-bg-color="#FA2233" range-bg-color="#f7d4d6" :future="true" start-text="" end-text="" mode="range" :isDefaultDay="false" :start-time="start_data" :end-time="end_data"></fu-calendar>
      </view>
    </fu-popup>
    <!-- 日历弹框 end -->
    <!-- 空布局 start -->
    <fu-empty-ui v-if="lists.length == 0 && isInit"></fu-empty-ui>
    <!-- 空布局 end -->
    <!-- 页面加载 start -->

    <!-- 页面加载 end -->
    <!-- 底部数据加载状态  start-->
    <uni-load-more v-if="lists.length > 8" :status="status"></uni-load-more>
    <!-- 底部数据加载状态  end-->
    <!-- 网络监测 start -->
    <fu-notwork></fu-notwork>
    <!-- 网络监测 end -->
  </view>
</template>

<script>
// 定义顶部导航
import calendar from '@/common/mixin/calendar.js';
export default {
  mixins: [calendar],
  data() {
    return {
      isShowLoading: false, //是否显示页面初始化加载loading
      tabCurrentIndex: 0, //顶部导航 选择的第几个
      navList: [
        {
          state: 0,
          text: global.i18n['全部'],
          type: 0
        },
        {
          state: 2,
          text: global.i18n['收入记录'],
          type: 3
        },
        {
          state: 3,
          text: global.i18n['支出记录'],
          type: 4
        }
      ], //冻结顶部导航
      lists: [], //订单列表
      page: 1, //页码说
      size: 10, //一页显示几条数据
      status: 'more', //  加载状态  more:有更多数据  noMore:已加载全部数据  loading:数据加载中
      isInit: false, //是否已经初始化
      type: 0, //请求的订单类别
      isShow: false, //日历弹框
      start_data: '', //开始日期
      end_data: '' //结束日期
    };
  },
  /**
   * @description 获取订单列表
   */
  onShow() {
    this.page = 1;
    this.status = 'more';
    this.getOrderList(true);
  },
  onPullDownRefresh() {
    this.page = 1;
    this.status = 'more';
    this.getOrderList(false);
  },
  onReachBottom() {
    this.getOrderList();
  },
  methods: {
    tabClick(index) {
      this.tabCurrentIndex = index;
      this.type = this.navList[index].type;
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.refreshOrderList();
    },

    /**
     * @description  显示日历
     */
    showCalendar() {
      this.isShow = true;
    },
    /**
     * @description  隐藏日历
     */
    closePopup() {
      this.isShow = false;
    },

    /**
     * @description  获取列表
     * @param {Object} value  用来判断第页码初始化第一次 加载页面loading
     */
    change(value) {
      if (value.isInit) return;
      this.start_data = value.start;
      this.end_data = value.end;
      this.page = 1;
      this.status = 'more';
      setTimeout(() =>{
        this.isShow = false;
      },800)
      this.getOrderList(true);
    },
    getOrderList(value) {
      // this.isShow = false;
      if (this.status != 'more') return;
      this.status = 'loading';
      let data = {
        start_data: this.start_data,
        end_data: this.end_data,
        change_type: this.type,
        page: this.page,
        list_rows: this.size
      };
      console.log('请求的数据', data);
      if (this.page == 1 && value) {
        this.isShowLoading = true;
      }
      this.$api
        .post(global.apiUrls.getMoneyDetail, data)
        .then(res => {
          console.log('积分明细', res);
          this.isShowLoading = false;
          if (res.data.code == 1) {
            var curPageData = res.data.data.data;
            let total = res.data.data.total;
            if (this.page == 1) this.lists = [];
            this.lists = this.lists.concat(curPageData);
            if (this.lists.length < total) {
              this.status = 'more';
              this.page++;
            } else {
              this.status = 'noMore';
            }
          } else {
            this.$message.info(res.data.msg);
          }
          this.isInit = true;
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          this.isShowLoading = false;
          uni.stopPullDownRefresh();
        });
    },

    /**
     * @description  重置列表
     * @param {Object} value 页面是否初始化
     */
    refreshOrderList(value) {
      this.page = 1;
      this.status = 'more';
      if (value) {
        this.getOrderList(true);
      } else {
        this.getOrderList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
}
/deep/ .right{
    display: flex;
    align-items: center;
    .img{
      width: 36rpx;
      height: 36rpx;
    }
  }
.solid-bottom::after {
  z-index: 9999;
}
// 标题栏 start
.nav {
  position: fixed;
  z-index: 999;
  margin-bottom: 20upx;
}
.nav .cu-item {
  position: relative;
  color:#999;
  font-size:32rpx;
  .active-line {
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    width: 50rpx;
    height: 4rpx;
    background: linear-gradient(180deg, #FA2033 0%, #FF6530 100%);
    opacity: 1;
    border-radius: 10rpx;
  }
}
.nav .cu-item.cur {
  color: #333;
  font-weight: 500;
  border-bottom: 0 !important;
  .active-line {
    display: block;
  }
}

.nav .cu-item.cur::after {
  content: '';
  display: none;
}
// 标题栏 end
.list {
  margin-top: 106rpx;
  background: #fff;
}
// 订单列表 start
.list .order-item:first-child {
  // margin-top:16rpx;
}
.order-item {
  display: flex;
  flex-direction: column;
  margin: 0 32rpx;
  justify-content:center;
  .i-top {
    display: flex;
    // height: 174rpx;
    font-size: 28rpx;
    color: #333333;
    padding: 32rpx 0;
    border-bottom: 1rpx solid #eeeeee;
    .content {
      // height: 110rpx;
      width: 60%;

      .desc {
        font-size: 32rpx;
        font-family: PingFang-SC-Regular;
        color: #333333;
        margin-bottom: 24rpx;
      }
      .create_time {
        // position: absolute;
        // bottom: 0rpx;
        font-size: 24rpx;
        font-family: PingFang-SC-Regular;
        color: #bfbfbf;
      }
    }
  }
}

// .i-top:last-child{
//    border-bottom: none;
// }

// 订单列表 end
// 日历弹框 start
.calendar-box {
  background: #ffffff;
  border-radius: 16rpx;
  width: 640rpx;
  padding: 0 24rpx;
  border: 1px solid transparent;
}
// 日历弹框 end
</style>
