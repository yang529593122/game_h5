<template>
  <view class="page">
    <!-- topbar -->
    <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
        <!-- #ifdef H5 -->
        <view class="fu-fs32" style="color: #000; font-weight: 700">{{i18n['我的问答']}}</view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view class="fu-fs32">{{i18n['我的问答']}}</view>
        <!-- #endif -->
        <view class="action"></view>
      </view>
    </view>
    <view class="tab-box" :style="{ top: CustomBar + 'px' }">
      <view class="tab-box-line"></view>
      <view class="flex ">
        <block v-for="(item, index) in tabs" :key="index">
          <view class="flex-sub flex justify-center">
            <view class="tab-item" :class="{ active: currentTab == index }" @tap="switchTab(index, item.type)">
              <text>{{ item.title }}</text>
              <text v-if="item.num > 0">{{ item.num }}</text>
            </view>
          </view>
        </block>
      </view>
    </view>
    <view class="list-answer-wrap">
      <view class="item" v-for="(item,index) in listData" :key="index" @click="navGoAnswer(item)">
        <view class="goods-info  flex align-center">
          <view class="goods-img ">
            <view class="goods-img">
              <fu-image radius="18rpx" :src="item.goods_thumb" mode="aspectFill" />
            </view>
          </view>
          <text class="text-cut text-info" :style="{ width: type == 'follow' || type == 'likes' ? '100%' : '' }">{{ item.goods_name }}</text>
          <!-- 提问 -->
          <text @click.stop="delQuestion(item)" class="goods-delte" v-if="type == 'question'">
            <text class="fu-iconfont text-sm">&#xe677;</text>
            <text>{{i18n['删除']}}</text>
          </text>
          <!-- 回答 -->
          <text @click.stop="delAnswer(item)" class="goods-delte" v-if="type == 'answer'">
            <text class="fu-iconfont text-sm">&#xe677;</text>
            <text>{{i18n['删除']}}</text>
          </text>
        </view>
        <!-- 提问 -->
        <view class="text-cut text-333 text-bold text-df" style="margin-bottom: 24rpx;">{{ item.question_content }}</view>
        <view class="ask-other-info margin-top-sm" v-if="type == 'question' || type == 'follow'"><text class="text-999 text-sm text-weight-400">{{ item.create_time }}</text>  <text class="text-sm text-weight-400" style="color: #FF6464;margin-left: 24rpx;">{{ item.answer_number }}{{i18n['人回答']}}</text></view>
        <!-- 回答 -->
        <view class="text-cut ask-other-info margin-top-sm" v-if="type == 'answer' || type == 'likes'"><text  class="text-999 text-sm text-weight-400">{{ item.answer_content }}</text></view>
      </view>
    </view>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
  </view>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js';
export default {
  mixins: [pagingList],
  data() {
    return {
      listData: [], // 我的问答列表
      pageingListApiMethod: 'post',
      allowOnloadGetList: false,
      minixPagingListsApi: global.apiUrls.getMyQandA,
      tabs: [
        { title: global.i18n['提问'], type: 'question', num: 0 },
        { title: global.i18n['回答'], type: 'answer', num: 0 },
        { title: global.i18n['关注'], type: 'follow', num: 0 },
        { title: global.i18n['点赞'], type: 'likes', num: 0 }
      ],
      currentTab: 0,
      type: 'question', // 类型 question：提问，answer：回答，follow：关注，likes：点赞。
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  onShow() {
    this.pagingListToggle();
  },
  methods: {
    // 列表数据请求回来之后提前处理
    pagingListBeforeResponseData(res) {
      this.tabs[0].num = res.data.data.title_num.question_num;
      this.tabs[1].num = res.data.data.title_num.answer_num;
      this.tabs[2].num = res.data.data.title_num.follow_num;
      this.tabs[3].num = res.data.data.title_num.likes_num;
      return {
        list: res.data.data.list.data,
        last_page: res.data.data.list.last_page,
        per_page: res.data.data.list.per_page,
        total: res.data.data.list.total,
        current_page: res.data.data.list.current_page
      };
    },
    // 参数
    pagingListPostData() {
      return {
        type: this.type
      };
    },
    // 去回答
    navGoAnswer(item) {
      this.$urouter.navigateTo({
        url: '/pages/goods/ask-answer/problem-detail/index',
        params: {
          goods_id: item.goods_id,
          activity_id: item.activity_id || 0,
          question_id: item.question_id
        }
      });
    },
    // 删除问题
    delQuestion(item) {
      // console.log(1111, item);
      this.$util.showModal({
        title: this.i18n['提示'],
        content: this.i18n['确定删除提问吗？'],
        cancelText: this.i18n['取消'],
        confirmText: this.i18n['确定'],
        success: res => {
          if (res.confirm) {
            this.$api
              .post(global.apiUrls.del_collection, {
                delete_id: item.question_id,
                type: 1 // 类型 1问题 2回答
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.$message.info(res.data.msg);
                  this.pagingListToggle();
                } else {
                  this.$message.info(res.data.msg);
                }
              });
          }
        }
      });

    },
    // 删除回复
    delAnswer(item) {
      // console.log(1111,item)
      this.$util.showModal({
        title: this.i18n['提示'],
        content: this.i18n['确定删除该问题的所有回答吗？'],
        cancelText: this.i18n['取消'],
        confirmText: this.i18n['确定'],
        success: res => {
          if (res.confirm) {
            this.$api
              .post(global.apiUrls.del_collection, {
                delete_id: item.question_id,
                type: 2 // 类型 1问题 2回答
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.$message.info(res.data.msg);
                  this.pagingListToggle();
                } else {
                  this.$message.info(res.data.msg);
                }
              });
          }
        }
      });
    },
    // tab 切换
    switchTab(index, val) {
      console.log(index, val);
      this.currentTab = index;
      this.type = val;
      this.pagingListToggle();
    },
    back() {
      uni.navigateBack();
    }
  }
};
</script>

<style lang="scss" >
  page{
    height: 100%;
  }
.page {
  min-height: 100%;
  background-color: #F8F8F8;
  .tab-box {
    height: 108rpx;
    background-color: #ffffff;
    position: sticky;
    z-index: 9999;
    .tab-item {
      line-height: 100rpx;
      height: 100rpx;
      border-bottom: 4rpx solid #ffffff;
      font-size: 32rpx;
      color: #666;
      font-weight: 500;
    }

    .tab-item.active {
      color: #FF6464;
      border-color: #FF6464;
      font-weight: bold;
    }
  }
}

.navbar {
  display: flex;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: sticky;
  z-index: 99;
  top: 0;
}

.goods-info {
  font-size: 28rpx;
  color: #333333;
  font-weight: 400;
  margin-bottom: 32rpx;
  .goods-img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 18rpx;
    margin-right: 18rpx;
    flex-shrink: 0;
  }

  .text-info {
    // width: 80%;
    // margin-left: 6rpx;
    // margin-right: 6rpx;
  }
  .goods-delte{
    flex-shrink: 0;
    font-size: 22rpx;
    color: #999;
    font-weight: 400;
    margin-left: 36rpx;
  }
}
.list-answer-wrap{
  padding: 24rpx 24rpx 0;
  box-sizing: border-box;
}
.item {
  margin-bottom: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-sizing: border-box;
}

.font-weight {
  font-weight: 600;
}

.text-sm {
  font-size: 24rpx;
}

.ask-other-info {
  color: #858585;
}
.tab-box-line{
  width: 100%;
  height: 8rpx;
  background: #F8F8F8;
}
</style>
