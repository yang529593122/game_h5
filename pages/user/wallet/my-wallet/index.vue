<template>
  <view class="page-user" :style="{'padding-top':'calc( 498rpx + '+StatusBar+'px)'}">
    <view class="user-section" :style="{'height':'calc( 498rpx + '+StatusBar+'px)'}">
      <view class="bg" :style="{'height':'calc( 416rpx + '+StatusBar+'px)'}">
		  <image src="../../static/bg-wallet.png" class="image" mode=""></image>
	  </view>
      <view class="info_box" :style="{'height':'calc( 416rpx + '+StatusBar+'px)'}">
        <view class="flex justify-start align-center text-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
          <view class="header-title">
            <view class="cuIcon-back header-left" @tap="back"></view>
            <view class="header-center">{{ i18n['我的钱包'] }}</view>
            <!-- #ifndef MP-WEIXIN -->
            <view @tap="handleJump" data-url="/pages/user/user/authentication/index" class="header-right">实名认证</view>
            <!-- #endif -->
          </view>
        </view>
        <view class="money-wrap" :style="{ height: 'calc(100% - ' + CustomBar + 'px)' }">
          <!-- #ifdef MP-WEIXIN -->
          <!-- <view @tap="handleJump" data-url="/pages/user/wallet/account-bind/index" class="header-right text-white text-lg mp-wx">{{ i18n['绑定账号'] }}</view> -->
          <!-- #endif -->
          <view class="money-content">
            <!-- <view class="money">{{ money }}</view>
            <view class="desc">{{ i18n['余额（元）'] }}</view> -->
			<view class="flex justify-around algin-center">
				<view class="flex flex-direction justify-center align-center">
					<view class="flex align-center justify-center ">
						<view class="text-999 text-sm">
							冻结余额（元）
						</view>
						<image @click="closePop" src="../../static/wenhao.png" style="width: 16rpx;height: 16rpx;" mode=""></image>
					</view>
					<view class="text-blod" style="color: #F55B29;font-size: 48px;margin-top: 20rpx;">{{freeze_money | formatNumber}}</view>
				</view>
				
				<view class="flex flex-direction justify-center align-center" style="margin-left: 40rpx;">
					<view class="flex align-center justify-center text-999 text-sm ">
						可提现余额（元）
						<!-- <image src="../../static/wenhao.png" style="width: 16rpx;height: 16rpx;" mode=""></image> -->
					</view>
					<view class="text-blod" style="color: #F55B29;font-size: 48px;margin-top: 20rpx;">{{user_money | formatNumber}}</view>
				</view>
			</view>
			
            <view class="money-btn-wrap">
              <view class="money-btn withdraw text-white" style="width: 240rpx;
height: 66rpx;
background: #295B7B;border-radius: 33rpx;" @tap="handleJump" data-url="/pages/user/wallet/withdraw/index">{{ i18n['提现'] }}</view>
              <!-- <view class="money-btn withdraw" @tap="handleJump" data-url="/pages/user/wallet/recharge/index">{{ i18n['充值'] }}</view> -->
            </view>
          </view>
        </view>
      </view>
      
    </view>
	<view class="" style="margin-top: 32rpx;padding: 0 24rpx;">
	  <view class=" flex justify-between">
	    <view class="left_main text-lg text-weight-500" style="color: #36373D;">{{ i18n['近30天记录'] }}</view>
	    <view class="right_main text-sm" style="color: #868686;" @tap="handleJump" data-url="/pages/user/wallet/consumer-detail/index">{{ i18n['查看全部'] }}</view>
	  </view>
	</view>
    <view class="detaiLiat">
      <view v-if="list.length > 0">
        <view class="itemList">
          <view class="ongg" v-for="(item, index) in list" :key="index">
            <view class="buy-left">
              <view class="share-right" style="overflow: hidden">
                <view class="text-cut-2 desc remark">
                  {{ item.remark || '' }}
               <!--   <text class="status-badge" v-if="item.check_status == 0">({{ i18n['待审核'] }})</text>
                  <text class="status-badge" v-if="item.check_status == 1">({{ i18n['审核通过'] }})</text>
                  <text class="status-badge" v-if="item.check_status == 2">({{ i18n['审核拒绝'] }})</text>
                  <text class="status-badge" v-if="item.check_status == 3">({{ i18n['已完成'] }})</text>
                  <text class="status-badge" v-if="item.check_status == 4">({{ i18n['转账拒绝'] }})</text> -->
                </view>
                <view class="create_time">{{ item.create_time || '' }}</view>
              </view>
            </view>
            <view class="price-right">
              <text v-if="item.after_money - item.before_money > 0" class="margin-left text-red">+{{ item.change_money || 0 }}</text>
              <text v-else class="margin-left">{{ item.change_money || 0 }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 空布局 start-->
      <fu-empty-ui v-if="list.length == 0 && isInit"></fu-empty-ui>
      <!-- 空布局 end-->
    </view>
	<fu-popup v-model="showPopup" mode="center" width="540rpx" height="700rpx">
	  <view class="pop-content padding">
	    <view class="text-333 text-bold text-lg text-center">{{ i18n['提现规则'] }}</view>
	    <scroll-view class="content-box" scroll-y>
	      <view class="margin-top-sm text-999">
			  <jyf-parser :html="content"></jyf-parser>
		  </view>
	    </scroll-view>
	  </view>
	  <view class="padding-top flex align-center justify-center " @tap="closePop">
	    <view class="round close-btn flex align-center justify-center"><text class="cuIcon-close text-lg" style="color: #838383;margin-top:4rpx;"></text></view>
	  </view>
	</fu-popup>
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
export default {
  data() {
    return {
      money: '', //余额
      list: [],
      isInit: false,
      page: 1,
      size: 30,
	  user_money:'',
	  freeze_money:'',
	  showPopup:false,
	  content:'',
    };
  },
  onShow() {
    this.getMoney();
    this.getMoneyList();
	this.gamesystemarticleinfo();
  },
  onPullDownRefresh() {
    this.getMoney();
    this.getMoneyList();
  },
  methods: {
	  closePop() {
		  this.showPopup = !this.showPopup;
	  },
	  gamesystemarticleinfo() {
		  this.$api.post(global.apiUrls.gamesystemarticleinfo,{
			  article_id:18
		  }).then(res => {
			  this.content = res.data.data.content;
		  })
	  },
    // 金额明细
    getMoneyList() {
      this.$api
        .post(global.apiUrls.getMoneyDetail, {
          type: 0,
          page: this.page,
          list_rows: this.size
        })
        .then(res => {
          this.isInit = true;
          console.log('消费明细', res);
          if (res.data.code == 1) {
            this.list = res.data.data.data;
          }
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          uni.stopPullDownRefresh();
          console.log(err);
        });
    },
    back() {
      uni.navigateBack();
    },
    getMoney() {
      let _this = this;
      _this.$api
        .get(global.apiUrls.getYonghuxinxi)
        .then(res => {
          if (res.data.code == 1) {
            // _this.money = res.data.data.user_money;
			this.user_money = res.data.data.user_money;
			this.freeze_money = res.data.data.freeze_money;
          }
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          uni.stopPullDownRefresh();
          console.log(err, 'get_my_money');
        });
    }
  }
};
</script>

<style lang="scss">
.page-user {
  // background: #fff;
  padding-top: 498rpx;
  position: relative;
}

//头部 end
.user-section {
  height: 498rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 374rpx;
    // background: $bgtheme;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .look-record {
    position: relative;
    z-index: 100;
  }
  //金额信息 start
  .info_box {
    height: 416rpx;
    position: relative;
    z-index: 99;

    //金额
    .money-wrap {
      width: 100%;
      position: relative;
	 // height: 416rpx;
      .money-content {
		  margin-top: 20rpx;
        width: 702rpx;
		margin-left: 24rpx;
       height: 355rpx;
        display: flex;
		background: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .money {
          width: 100%;
          text-align: center;
          font-size: 48rpx;
          font-family: Arial;
          font-weight: bold;
          color: #ffffff;
          margin-top: 40rpx;
        }

        .desc {
          width: 100%;
          text-align: center;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          height: 53rpx;
          line-height: 55rpx;
        }

        .money-btn-wrap {
          margin: 50rpx 0 0;
          // padding-bottom: 36rpx;
          display: flex;
          justify-content: space-between;

          .money-btn {
            text-align: center;
            width: 184rpx;
            height: 60rpx;
            background: #ffffff;
            border-radius: 50rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            // color: $theme;
            opacity: 1;
            line-height: 60rpx;
            margin: 0 38rpx;
          }
        }
      }
    }
  }
  //金额信息 end
  .box-center {
    width: 100%;
    height: 72rpx;
    background: rgba($theme, 0.08);
    padding: 0 32rpx;
    color: $theme;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
  }
}

//头部 start
.header-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;

  .header-left {
    font-size: 42rpx;
  }

  .header-center {
    text-align: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    color: #ffffff;
    letter-spacing: 1rpx;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  view {
    width: 33.3%;
  }
}
.header-right {
  font-size: 28rpx;
  font-family: PingFang SC;
  color: #ffffff;
  letter-spacing: 1rpx;
  text-align: right;
  &.mp-wx {
    position: absolute;
    right: 32rpx;
    top: 10rpx;
  }
}
.detaiLiat {
  position: relative;
  width: 100%;
  background-color: #fff;
  .itemList {
    .ongg {
      padding: 28upx 0;
      width: calc(100% - 64rpx);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #eee;

      .buy-left {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        image {
          width: 116rpx;
          height: 116rpx;
          border-radius: 10rpx;
          margin-right: 25rpx;
        }

        .share-right {
          line-height: 53rpx;
          flex: 1;

          .desc {
            font-size: 28rpx;
            font-family: 'PingFang SC';
            /* font-weight: bold; */
            flex: 1;
            color: #333333;
            height: 48rpx;
            line-height: 48rpx;
          }

          .create_time {
            font-size: 24rpx;
            font-family: 'PingFang-SC-Regular';
            color: #999999;
            opacity: 1;
            height: 40rpx;
            line-height: 40rpx;
          }
        }
      }

      .price-right {
        font-size: 32rpx;
        font-family: Arial;
        font-weight: 600;
        color: #333;
        // padding-right: 10rpx;
      }
    }
  }
}
.pop-content {
  width: 540rpx;
  height: 572rpx;
  border-radius: 24rpx;
  background: #ffffff;
  .content-box{
    height: 472rpx;
  }
}

.close-btn {
  width: 54rpx;
  height: 54rpx;
  background-color: rgba(255, 255, 255, 0.6);
}

</style>
