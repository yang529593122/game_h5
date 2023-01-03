<template>
  <view class="page">
    <!-- topbar -->
    <fu-custom :isBack="true" bgColor="bg-white">
      <view slot="content">{{i18n['问答']}}</view>
      <!-- #ifndef MP-WEIXIN -->
      <view slot="right" @click="handleJump" data-url="/pages/goods/ask-answer/my-ask-answer/index">{{i18n['我的问答']}}</view>
      <!-- #endif -->
    </fu-custom>
    <view class="content">
      <view class="goods-info flex align-center" @click="navGogoodsDetail(goodsInfo)">
        <view class="goods-img">
          <view class="goods-img">
            <fu-image radius="18rpx" :src="goodsInfo.goods_thumb" mode="aspectFill" />
          </view>
        </view>
        <text class="text-cut-2 text-info">{{ goodsInfo.goods_name }}</text>
      </view>
      <view class="search-form  flex align-center">
        <text class="cuIcon-search"></text>
        <input confirm-type="search" type="text" v-model="searchKey" :adjust-position="false" :hold-keyboard="false" :placeholder="i18n['搜索已有提问']" placeholder-style="font-size: 24rpx;font-weight: 400;color: #999999;" @confirm="searchConfirm" />
        <text v-if="searchKey.length != 0" class="cuIcon-close text-gray padding-right-xs" @tap="searchKey = ''"></text>
      </view>
      <scroll-view class="container" scroll-y @scrolltolower="scrolltolower" :style="{ height: scrollHeight}">
        <view class="questionAnswers-list">
          <view class="item" v-for="(item, index) in listData" @click="navGoDetail(item)" :key="index">
            <view class="ask flex ">
              <view class="image"><image class="image" src="../../static/questions.png" lazy-load="true" mode="aspectFill" /></view>
              <text class="text-cut-2 text-bold text-df text-333">{{ item.question_content }}</text>
            </view>
            <view class="answer">
              <view class="answer-info flex padding-t-16" v-if="item.answer_content">
                <view class="image"><image class="image" src="../../static/answer.png" lazy-load="true" mode="aspectFill" /></view>
                <text class="text-cut-2 text-weight-400 text-df text-333">{{ item.answer_content }}</text>
              </view>

              <view class="praise padding-t-24 flex align-center">
                <text class="padding-l-56 text-red text-df text-weight-400">
                  <!-- 夏夜微凉等6人进行了回答 -->
                  {{i18n['全部']}} {{ item.answer_number }}{{i18n['人进行了回答']}}
                </text>
              </view>
            </view>
          </view>
        </view>
        <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
        <!-- 底部占位 start -->
        <view class="bottom-status"></view>
        <!-- 底部占位 end -->
      </scroll-view>
    </view>
    <button class="bottom-action cu-btn round bg-theme " @tap="navToAsk">
      <!-- <text class="fu-iconfont icon">&#xe8b5;</text> -->
      <image src="../../static/help.png" mode="widthFix" class="img"></image>
      {{i18n['问问买家']}}
    </button>
    <fu-notwork></fu-notwork>
  </view>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js';
export default {
  mixins: [pagingList],
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      goods_id: '', // 商品id
      activity_id: '', // 活动id
      searchKey: '', // 搜索关键字
      listData: [], // 问题列表
      pageingListApiMethod: 'post',
      allowOnloadGetList: false,
      minixPagingListsApi: global.apiUrls.getQuestionList,
      goodsInfo: {} // 商品详情
    };
  },
  computed: {
    scrollHeight() {
      return `calc(100vh - ${this.CustomBar}px - 180rpx)`;
    }
  },
  onLoad(options) {
    const { goods_id, activity_id } = options;
    this.goods_id = goods_id;
    this.activity_id = activity_id;
    this.loadData();
  },
  onShow() {
    this.pagingListToggle();
  },
  methods: {
    // 去商品详情
    navGogoodsDetail(item) {
      this.$urouter.navigateTo({
        url: '/pages/goods/goodsdetail/goods-detail/index',
        params: {
          goods_id: item.goods_id,
          activity_id: item.activity_id
        }
      });
    },
    // 获取商品详情
    loadData() {
      this.$api
        .get(global.apiUrls.getGoodsDetail, {
          goods_id: this.goods_id,
          activity_id: this.activity_id
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log('goods detail', res.data.data);
            let data = res.data.data;
            // 插入临时商品信息
            this.goodsInfo = {
              goods_name: data.name,
              goods_price: data.shop_price,
              goods_thumb: data.thumb,
              goods_id: this.goods_id,
              activity_id: this.activity_id
            };
          }
        });
    },
    // 参数
    pagingListPostData() {
      return {
        goods_id: this.goods_id,
        question_content: this.searchKey
      };
    },
    scrolltolower() {
      this.pagingListGetLists();
      console.log('是否加载全部数据', this.pagingListLoadedAll);
      console.log('到底了');
    },
    searchConfirm() {
      this.pagingListToggle();
    },
    back() {
      uni.navigateBack();
    },
    navGoDetail(item) {
      this.$urouter.navigateTo({
        url: '/pages/goods/ask-answer/problem-detail/index',
        params: {
          goods_id: this.goods_id,
          activity_id: this.activity_id,
          question_id: item.id
        }
      });
    },
    navToAsk() {
      this.$urouter.navigateTo({
        url: '/pages/goods/ask-answer/publish-ask-answer/index',
        params: {
          goods_id: this.goods_id,
          activity_id: this.activity_id
        }
      });
    },
    navGoMyAnswer() {
      this.$urouter.navigateTo({
        url: '/pages/goods/ask-answer/my-ask-answer/index',
        params: {
          goods_id: this.goods_id,
          activity_id: this.activity_id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100%;
  background: #F8F8F8;
}

.bottom-status {
  height: 110rpx;
  height: calc(110rpx + constant(safe-area-inset-bottom));
  height: calc(110rpx + env(safe-area-inset-bottom));
}

.fu-fs32 {
  margin-left: 60rpx;
}

.bottom-action {
  width: 304rpx;
  height: 72rpx;
  background: linear-gradient(90deg, #FA2033 0%, #FF6530 100%);
  border-radius: 36rpx;
  position: fixed;
  left: 50%;
  right: 50%;
  transform: translate(-50%);
  bottom: 48rpx;
  bottom: calc(48rpx + constant(safe-area-inset-bottom));
  bottom: calc(48rpx + env(safe-area-inset-bottom));
  color: #fff;
  font-size: 30rpx;
  font-weight: 400;
  .img{
    width: 32rpx;
    height: 32rpx;
    margin-right: 24rpx;
  }
}

.icon {
  margin-right: 3rpx;
}

.goods-info {
  font-size: 24rpx;
  padding: 24rpx;
  box-sizing: border-box;
  .goods-img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 18rpx;
    margin-right: 24rpx;
  }

  .text-info {
    width: 100%;
    margin-left: 6rpx;
  }
}

.search-form {
  width: 90%;
  background: #fff;
  height: 50rpx;
  padding: 0 10rpx;
  margin: 0 auto;

  input {
    font-size: 24rpx;
    margin-left: 6rpx;
    width: 100%;
  }
}

.padding-l-56 {
  padding-left: 56rpx;
}

.padding-t-24 {
  padding-top: 24rpx;
}
.padding-t-16{
  padding-top: 16rpx;
}

.questionAnswers-list {
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  .item {
    margin-bottom: 20rpx;
    padding: 24rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16rpx;
  }


  .image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 16rpx;
  }

  .praise {
    font-size: 24rpx;
    color: #999;
  }

  .image-list {
    margin-left: 40rpx;

    .image-info {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
    }
  }
}

.bg-border {
  display: inline-block;
  background: #c8c8c8;
  color: #fff;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
}

.font-weight {
  font-weight: 600;
}
.search-form{
  width: 702rpx;
  height: 56rpx;
  background: #FFFFFF;
  border-radius: 28rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
}
.cuIcon-search{
  color: #707070;
}
.text-red{
  color: #FF6464;
}
</style>
