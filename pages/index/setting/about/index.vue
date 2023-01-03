<template>
  <view class="page">
    <fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
			<view slot="content">{{i18n["关于我们"]}}</view>
		</fu-custom>
    <!-- 数据加载动画 start -->
    <fu-loading v-if="isShowLoading"></fu-loading>
    <!-- 数据加载动画 end -->
    <!-- 内容 start -->
    <view class="content" v-else>
     <!-- <view class="logo">
        <image :src="SYSTEM_CONFIG.logo" mode="aspectFill"></image>
        <view class="name">{{ SYSTEM_CONFIG.appName }}</view>
        <view class="name">{{i18n['关于我们']}}{{ SYSTEM_CONFIG.appVersion }}</view>
      </view> -->
      <!-- 富文本 start -->
     <view class="container">
        <jyf-parser :html="body"></jyf-parser>
      </view>
      <!-- 富文本 end -->
      <!-- <view class="bottom">{{i18n['中犇科技 版权所有']}}</view> -->
      <view class="bottom-info">
     <!-- <view class="info-top text-cut-2">
        copyright©2018-2019 某某APP
        {{aboutInfo.web_site_copyright}}
      </view> -->
      <!-- <view class="info-bottom">
        All Ringhts Reserved
      </view> -->
      </view>
    </view>
    <!-- 内容 end -->

  </view>
</template>

<script>
	import richText from '@/common/utils/richText.js';
export default {
  data() {
    return {
      isShowLoading: false, //是否开启数据加载动画
      SYSTEM_CONFIG: '', //系统配置变量 logo企业logo appName企业名称
      body: ' ' ,//关于我们介绍内容
      aboutInfo:{
        web_site_copyright:''
      }
    };
  },
  onLoad() {
    // 接收系统配置变量
    // this.SYSTEM_CONFIG = global.SYSTEM_CONFIG;
    // 获取关于我们内容
    this.getData();
    // this.aboutUs();
  },
  onReady() {},
  methods: {
    /**
     * @description 获取关于我们内容]
     */
    getData() {
      // 开启数据加载动画
      this.isShowLoading = true;
      this.$api
        .post(global.apiUrls.postOperationGetColumn, {
          category_id: 3 
        })
        .then(res => {
          // 关闭数据加载动画
          this.isShowLoading = false;
          // console.log('富文本内容',res)
          var res1 = res.data;
          if (res1.code == 1) {
			  console.log('进来了')
            this.body = richText.format(res1.data.content);
          }
        })
        .catch(err => {
          // 关闭数据加载动画
          this.isShowLoading = false;
        });
    },
    aboutUs(){
      this.$api
        .post(global.apiUrls.aboutUs)
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.aboutInfo = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
// 主体 start
.page {
  min-height: 100vh;
  background-color: #fff;
}
// 主体 end
// 内容 start
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 50rpx;
  display: flex;
  flex-direction: column;
  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50rpx 0 100rpx;
    image {
      width: 180upx;
      height: 180upx;
    }
  }
  .name {
    margin-top: 32rpx;
    font-size: 32rpx;
  }
  .bottom {
    text-align: center;
    padding: 50rpx 0;
  }
  .container{
    flex: 1;
  }
  view {
    line-height: 50upx;
  }
}
// 内容 end
.bottom-info{
  position: absolute;
  bottom: 80rpx;
  bottom: calc(80rpx + constant(safe-area-inset-bottom));
  bottom: calc(80rpx + env(safe-area-inset-bottom));
  text-align: center;
  color: #BFBFBF;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  left: 0;
}
</style>
