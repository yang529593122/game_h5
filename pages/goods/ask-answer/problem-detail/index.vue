<template>
  <view class="page">
    <!-- topbar -->
    <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
        <!-- #ifdef H5 -->
        <view class="fu-fs32" style="color: #000; font-weight: 700">{{i18n['问题详情']}}</view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view class="fu-fs32">{{i18n['问题详情']}}</view>
        <!-- #endif -->
        <view class="action"></view>
      </view>
    </view>
    <view class="content">
      <view class="goods-info padding flex align-center" @click="navGogoodsDetail(goodsInfo)">
        <view class="goods-img">
          <view class="goods-img">
            <fu-image radius="18rpx" :src="goodsInfo.goods_thumb" mode="aspectFill" />
          </view>
        </view>
        <text class=" text-info text-cut-2">{{ goodsInfo.goods_name }}</text>
      </view>
    </view>
    <scroll-view class="container" scroll-y @scrolltolower="scrolltolower" :style="{ height: 'calc(100vh - '+CustomBar+'px - 110rpx)' }">
      <view class="problem">
        <view class="ask  flex justify-between ">
          <view class="flex">
            <view class="image"><image class="image" src="../../static/questions.png" lazy-load="true" mode="aspectFill" /></view>
            <text class="text-333 text-df text-bold" style="line-height: 40rpx;">{{ question_info.question_content }}</text>
          </view>
          <view class="flex align-center justify-between" style="flex-shrink: 0;">
            <!-- <text>
                            {{question_info.create_time}}
                        </text> -->
            <!-- 未购买的他人问题，可关注 -->
            <text @click="collect(question_info)" class="collect w_c text-666 flex justify-end align-center" :class="question_info.is_follow ? 'active' : ''" v-if="question_info.user_id != user_id && isLoadInit">
              <text v-if="question_info.is_follow" class="cuIcon-likefill fu-cred text"></text>
              <text v-else class="cuIcon-like text"></text>
              <text class="text-999 text-sm text-weight-400 ">{{ question_info.is_follow ? i18n['已关注'] : i18n['关注'] }}</text>
            </text>
            <!-- 自己问题，可删除 -->
            <text @click="del(question_info)" class="collect text-666" v-if="question_info.user_id == user_id">
              <text class="cuIcon-delete  text"></text>
              <text class="text-999 text-sm text-weight-400">{{i18n['删除']}}</text>
            </text>
          </view>
        </view>
        <view class="answer-info flex padding-t-30">
          <view class="image"><image class="image" src="../../static/answer.png" lazy-load="true" mode="aspectFill" /></view>
          <text class="text-cut color-red text-df text-weight-400">{{i18n['共']}}{{ answerTotal }}{{i18n['条用户回答']}}</text>
        </view>
        <view class="answer-list">
          <view class="answer-item margin-top" v-for="(item, index) in listData" :key="index">
            <view class="flex  align-center justify-between">
              <view class="user-info flex">
                <view class="user-img" >
                  <fu-image radius="50%" :src="item.head_img" mode="aspectFill" />
                </view>
                <view class="user-text">
                  <view class="title">{{ item.user_nickname }}</view>
                  <text class="text-sm text-weight-400 text-999">{{ item.create_time }}</text>
                </view>
              </view>
              <!-- <text class="fu-iconfont">
                            &#xe8b1;
                          </text> -->
            </view>

            <view class="flex justify-between" style="margin-top: 24rpx;">
              <view class="text-333 text-df text-weight-400">{{ item.answer_content }}</view>
              <view class="" style="flex-shrink: 0;margin-left: 16rpx;">
                <view @click="changeLike(item)" class="collect text-666 flex align-center justify-end" style="margin-top: 4rpx;" :class="item.is_likes ? 'active' : ''">
                  <image v-if="item.is_likes" src="../../static/fabulous-succ.png" mode="widthFix" class="img"></image>
                  <image v-else src="../../static/fabulous-fail.png" mode="widthFix" class="img"></image>
                  <text class="text-000 text-sm text-weight-400" v-if="item.is_likes">{{ item.like_num | formatNumber }}</text>
                  <text class="text-000 text-sm text-weight-400" v-else>{{ i18n['点赞'] }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
      <!-- 底部占位 start -->
      <view class="bottom-status"></view>
      <!-- 底部占位 end -->
    </scroll-view>
    <button class="bottom-action cu-btn round bg-theme " @tap="reply">
      <image src="../../static/message.png" class="img"></image>
      {{i18n['我来回答']}}
    </button>
  </view>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js';
export default {
  mixins: [pagingList],
  data() {
    return {
      user_id: (global.userInfo && global.userInfo.id) || 0, // 用户id
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      question_id: '', // 问题id
      goods_id: '', // 商品id
      activity_id: '', // 活动id
      goodsInfo: {}, // 商品详情
      listData: [], // 问题回答列表
      question_info: {}, // 问题
      pageingListApiMethod: 'post',
      allowOnloadGetList: false,
      minixPagingListsApi: global.apiUrls.getAnswerList,
      answerTotal: null // 回答总数量
    };
  },
  computed: {
    scrollHeight() {
      return `calc(100vh - ${this.CustomBar}px - 110rpx)`;
    }
  },
  onLoad(options) {
    const { goods_id, activity_id, question_id } = options;
    this.goods_id = goods_id;
    this.activity_id = activity_id;
    this.question_id = question_id;
    this.loadData();
  },
  onShow() {
    this.pagingListToggle();
  },
  methods: {
    // 列表数据请求回来之后提前处理
    pagingListBeforeResponseData(res) {
      this.answerTotal = res.data.data.answer_list.total;
      this.question_info = res.data.data.question_info;
      return {
        list: res.data.data.answer_list.data,
        last_page: res.data.data.answer_list.last_page,
        per_page: res.data.data.answer_list.per_page,
        total: res.data.data.answer_list.total,
        current_page: res.data.data.answer_list.current_page
      };
    },
    // 参数
    pagingListPostData() {
      return {
        question_id: this.question_id
      };
    },
    // 去商品详情
    navGogoodsDetail(item) {
      console.log(item);
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
    reply() {
      console.log(222);
      this.$urouter.navigateTo({
        url: '/pages/goods/ask-answer/go-answer/index',
        params: {
          goods_id: this.goods_id,
          activity_id: this.activity_id,
          question_id: this.question_id
        }
      });
    },
    del(item) {
      console.log(1111, item);
      this.$api
        .post(global.apiUrls.del_collection, {
          delete_id: item.id,
          type: 1 // 类型 1问题 2回答
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message.info(res.data.msg);
            setTimeout(() => {
              this.back();
            }, 300);
          } else {
            this.$message.info(res.data.msg);
          }
        });
    },
    // 点赞
    changeLike(item) {
      this.$api
        .post(global.apiUrls.setCollection, {
          collect_id: item.id,
          type: 2 // 类型 1 关注 2点赞
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$set(item, 'is_likes', !item.is_likes);
            this.$message.info(res.data.msg);
            this.pagingListToggle();
          } else {
            this.$message.info(res.data.msg);
          }
        });
    },
    collect(item) {
      console.log(item);
      this.$api
        .post(global.apiUrls.setCollection, {
          collect_id: item.id,
          type: 1 // 类型 1 关注 2点赞
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$set(item, 'is_follow', !item.is_follow);
            this.$message.info(res.data.msg);
          } else {
            this.$message.info(res.data.msg);
          }
        });
    },
    back() {
      uni.navigateBack();
    },
    scrolltolower() {
      this.pagingListGetLists();
      console.log('是否加载全部数据', this.pagingListLoadedAll);
      console.log('到底了');
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100%;
  background: #f8f8f8;
}

.bottom-status {
  height: 110rpx;
  height: calc(110rpx + constant(safe-area-inset-bottom));
  height: calc(110rpx + env(safe-area-inset-bottom));
}

.font-weight {
  font-weight: 600;
}

.goods-info {
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  padding: 24rpx 24rpx 32rpx;
  box-sizing: border-box;
  .goods-img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 18rpx;
  }

  .text-info {
    width: 100%;
    margin-left: 24rpx;
  }
}

.problem {
  margin: 0rpx 24rpx;
  background: #fff;
  padding: 24rpx 24rpx 0;
  border-radius: 16rpx;
  .ask {
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 24rpx;
    padding-bottom: 24rpx;
  align-items: flex-start;
    
  }
}

.image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 16rpx;
}

.color-red {
  color: #ff6464;
}

.icon {
  font-size: 24rpx;
  margin-right: 3rpx;
}
.collect {
  width: 100rpx;
  text-align: right;
  flex-shrink: 0;
  &.w_c{
    width:120rpx;
  }
  .img {
    width: 24rpx;
    height: 26rpx;
    margin-right: 8rpx;
  }
}
.collect .text {
  margin-right: 3rpx;
}

.collect.active {
  color: $theme;
}

.user-img {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  overflow: hidden;
  image {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
  }
}

.user-text {
  margin-left: 16rpx;

  .title {
    font-weight: 400;
    font-size: 24rpx;
    margin-bottom: 1rpx;
    line-height: 32rpx;
  }
}

.answer-item {
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #f1f1f1;
}
.answer-item:last-of-type {
  border: none;
}
.text-2 {
  margin-right: 8rpx;
}

.bottom-action {
  width: 304rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: linear-gradient(90deg, #fa2033 0%, #ff6530 100%);
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
  .img {
    width: 32rpx;
    height: 32rpx;
    margin-right: 24rpx;
  }
}

</style>
