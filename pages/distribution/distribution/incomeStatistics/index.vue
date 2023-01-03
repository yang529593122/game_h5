<template>
  <view class="pages">
    <view class="content_height">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				收益统计
			</view>
			<view slot="right" @click="showCalendar">
				<image src="../../static/3.png" style="width: 32rpx;height: 32rpx;" mode=""></image>
			</view>
		</fu-custom>
    </view>
    <!-- <fu-scroll :scrollHeight="scrollHeight" @onRefresh="onRefresh" @onBottom="onBottom" ref="refresh" :isLoad="isLoad" :isData="isData"> -->
	<fu-loading v-if="isShowLoading"></fu-loading>
	<block v-else>
		<fu-empty-ui v-if="!dataList.length"></fu-empty-ui>
		<view class="list-wrap" v-else>
		  <view style="position: relative;" v-for="(item, index) in dataList" :key="index" class="list-item flex justify-between align-center">
		    <!-- <view class="set-text " v-if="item.settlement_text == i18n['未结算']">{{ item.settlement_text }}</view> -->
		    <view class="list-item-left">
		      <view class="list-item-title text-333">{{ item.remark }}</view>
		      <view class="list-item-time text-666">{{ item.create_time }}</view>
		    </view>
		    <view class="list-item-right">+￥{{ item.change_money }}</view>
		  </view>
		</view>
	</block>
      
    <!-- </fu-scroll> -->
	
	<!-- 日历弹框 start -->
	<fu-popup v-model="isCalendar" mode="center" :mask-close-able="true" @close="closePopup">
	  <view class="calendar-box">
	    <fu-calendar @change="change" active-bg-color="#659BC7" range-bg-color="#DFEBF4" :future="true" start-text="" end-text="" mode="range" :isDefaultDay="false" :start-time="start_data" :end-time="end_data"></fu-calendar>
	  </view>
	</fu-popup>
	<!-- 日历弹框 end -->
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
import fuScroll from '../../components/fu-scroll/fu-scroll.vue';
export default {
  components: {
    fuScroll
  },
  data() {
    return {
      commission: 0,
      dataList: [],
      isSearch: true,
      scrollHeight: 0,
      isLoad: false,
      isData: 'more',
      page: 1, // 页数
      size: 10, // 页条数
	  isCalendar:false,//日历弹窗
	  start_data: '', //开始日期
	  end_data: '', //结束日期
	  isShowLoading:false
    };
  },
  mounted() {
    let that = this;
    this.$nextTick(function() {
      new Promise((reslove, reject) => {
        let pageHeight;
        let viewHeight;
        let heightData = {};
        uni
          .createSelectorQuery()
          .in(this)
          .select('.pages')
          .boundingClientRect(function(data) {
            heightData.pageHeight = data.height;
            // console.log(data.height)
          })
          .exec();
        uni
          .createSelectorQuery()
          .in(this)
          .select('.content_height')
          .boundingClientRect(function(data) {
            heightData.viewHeight = data.height;
            // console.log(data.height)
          })
          .exec();

        setTimeout(() => {
          reslove(heightData);
        }, 500);
      }).then(res => {
        // console.log(res);
        that.scrollHeight = Math.floor(res.pageHeight - res.viewHeight);
        // console.log(Math.floor(res.pageHeight - res.viewHeight))
      });
    });
  },
  onLoad() {
    this.handleSearch();
  },
  methods: {
	  change(e) {
		  console.log(e)
		  this.start_data = e.start;
		  this.end_data =e.end;
		  this.handleSearch();
		  this.isCalendar = false;
	  },
	  /**
	   * @description  显示日历
	   */
	  showCalendar() {
		  this.start_data = '';
		  this.end_data ='';
	    this.isCalendar = true;
	  },
	  /**
	   * @description  隐藏日历
	   */
	  closePopup() {
	    this.isCalendar = false;
	  },
    // 查询
    handleSearch() {
      // if (this.isData != 'more') return;
      // this.isData = 'more';
      // this.isLoad = true;
      let data = {
        user_id: global.userInfo.id || 0,
        page: this.page,
        list_rows: this.size,
		start_time:this.start_data,
		end_time:this.end_data
      };
	  if(true) {
		  this.isShowLoading = true;
	  }

      this.$api
        .post(global.apiUrls.postDistributionProfit, data)
        .then(res => {
          console.log('搜索结果', res);
          if (res.data.code == 1) {
            let totalSize = Math.ceil(res.data.data.total / this.size);
            // this.commission = res.data.data.commission;
            let list = res.data.data.data;
            if (this.page == 1) {
              this.dataList = [];
            }
            if (this.page == 1 && list.length == 0) {
              // this.isData = 'noData';
              // this.isLoad = false;
			  this.dataList = [];
			  this.isShowLoading = false;
              // this.$refs.refresh.close();
              return;
            }
            this.dataList = this.dataList.concat(list);
			this.isShowLoading = false;
            if (this.dataList.length >= totalSize) {
              this.isData = 'noMore';
            } else {
              this.isData = 'more';
              this.page++;
            }
          } else {
            this.isData = 'noData';
            this.$message.error(res.data.msg);
          }
         this.isShowLoading = false;
          // this.$refs.refresh.close();
        })
        .catch(err => {
          // this.$refs.refresh.close();
          this.isShowLoading = false;
          // this.$message.error(err);
        });
		
    },
    // 刷新
    onRefresh() {
      console.log('刷新');
      let that = this;
      this.page = 1;
      this.isData = 'more';
      this.handleSearch();
    },
    // 加载
    onBottom() {
      this.handleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.pages {
  background: #ffffff;
  // position: relative;
  // z-index: -2;
  height: 100vh;
}
uni-page-body,
uni-page-refresh {
  height: 100%;
}
.header-wrap {
  height: 320rpx;
  position: relative;
  overflow: hidden;
  .header-bg {
    width: 2000rpx;
    height: 2000rpx;
    position: absolute;
    bottom: 0;
    left: -625rpx;
    background: $theme;
    border-radius: 50%;
    z-index: 1;
  }
  .header-info {
    position: relative;
    z-index: 2;
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #ffffff;
    margin-top: 30rpx;
    .header-money {
      font-size: 60rpx;
    }
    .header-title {
      margin-top: 20rpx;
    }
  }
}
.item-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  margin-top: -120rpx;
  .item-content {
    height: 150rpx;
    border-radius: 24rpx;
    background: #ffffff;
    text-align: center;
    .item-num {
      font-size: 48rpx;
      margin-bottom: 10rpx;
    }
    .item-title {
      font-size: 24rpx;
    }
    .item-line {
      width: 1rpx;
      height: 44rpx;
      background: #eeeeee;
    }
  }
}
.list-wrap {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  .set-text {
    position: absolute;
    top: 15rpx;
    right: 10rpx;
    color: #f68141;
  }
  .list-item {
    padding: 16rpx 0;
    box-sizing: border-box;
    // background: #f4f4f4 !important;
    border-radius: 24rpx;
    margin-top: 20rpx;
	border-bottom: 1px solid #eee;
    .list-item-title {
      font-size: 28rpx;
      line-height: 60rpx;
      height: 60rpx;
    }
    .list-item-time {
      font-size: 24rpx;
      line-height: 48rpx;
      height: 48rpx;
    }
    .list-item-right {
      color: $theme;
      padding-top: 20rpx;
      font-size: 36rpx;
    }
  }
}

.calendar-box {
  background: #ffffff;
  border-radius: 16rpx;
  width: 640rpx;
  padding: 0 24rpx;
}
</style>
