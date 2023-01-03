<template>
  <view class="page">
    <view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
      <view
        class="cu-bar fixed bg-white"
        :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]"
      >
        <view class="action" @tap="back">
          <text class="cuIcon-back"></text>
        </view>
        <view
          class="content text-blod text-black"
          :style="[{ top: StatusBar + 'px' }]"
          >{{ i18n["邀请好友"] }}
        </view>
        <!-- #ifdef APP-PLUS || H5 -->
        <!-- <view class="margin-right"  @click="goRoute">规则</view> -->
        <!-- #endif -->
      </view>
    </view>
    <view class="scancode">
      <fu-image :src="shareCode" mode="aspectFill"></fu-image>
    </view>
    <view class="bottom flex justify-around">
      <view class="desc text-666" @click="hadleCopy(shareInfo.href)">
        <text class="cuIcon-link lg"></text>{{ i18n["复制链接"] }}
      </view>
      <view class="desc text-666" @click="hadleCopy(userInfo.invite_code)">
        <text class="cuIcon-copy lg"></text>{{ i18n["复制邀请码"] }}
      </view>
      <view class="desc text-666" @click="openPopup">
        <text class="cuIcon-share lg"></text> {{ i18n["分享海报"] }}
      </view>
    </view>
    <image src="../../static/new-bg.png" alt="" class="bg"> </image>
    <fu-notwork></fu-notwork>
    <fu-share-invite ref="share" :info="shareInfo"></fu-share-invite>
  </view>
</template>
<script>
import { BASE_URL } from "@/common/config.js";
import fuShareInvite from "./components/fu-share-invite/fu-share-invite.vue";
export default {
  components: {
    fuShareInvite,
  },
  data() {
    return {
      userInfo: {},
      CustomBar: this.CustomBar,
      StatusBar: this.StatusBar,
      ctx: null,
      previewImageUrl: "",
      shareCode: "",
    };
  },
  computed: {
    shareInfo() {
      return {
        title: this.i18n["快来下载app,体验更多快乐"],
        summary:
          this.i18n["你的好友"] +
          this.userInfo.user_nickname +
          this.i18n["邀请你"],
        avatar: "/static/logo.png",
        bg: "../../static/new-bg.jpg",
        href:
          BASE_URL +
          "/h5/registered/index.html?id=" +
          this.userInfo.invite_code,
        code: this.shareCode, // 二维码
      };
    },
  },
  onShow() {
    this.userInfo = global.userInfo || {};
    console.log(this.userInfo, 77777);

    if (global.token) {
      this.getInfo();
    }
    this.getShareCode();
  },
  methods: {
    hadleCopy(content) {
      uni.setClipboardData({
        data: content,
        success: () => {
          this.$message.success(this.i18n["复制成功"]);
        },
      });
    },
    // 打开弹窗
    openPopup() {
      this.$refs.share.open();
    },
    // 返回
    back() {
      uni.navigateBack();
    },
    // 获取二维码
    getShareCode() {
      let url =
        BASE_URL + "/h5/registered/index.html?id=" + this.userInfo.invite_code;
      // #ifdef MP-WEIXIN
      this.$api
        .post(global.apiUrls.inviteFriendCode, {
          url: url,
        })
        .then((res) => {
          console.log("分享二维码", res);
          if (res.data.code == 1) {
            let data = res.data.data.qrcode_url;
            this.shareCode = data;
            // this.$util.base64ToPath(data).then(res => {
            // 	console.log('图片临时路径',res);

            //   // this.$refs.share.init();
            // }).catch(err => {
            // 	console.log('保存临时二维码失败',err);
            //   this.$message.info('保存临时二维码失败');
            // })
          } else {
            this.$message.info(this.i18n["获取分享二维码失败"]);
          }
        })
        .catch((err) => {
          console.log("获取分享二维码失败", err);
        });
      // #endif
      // #ifndef MP-WEIXIN
      this.$api
        .post(global.apiUrls.inviteFriendCode, {
          url: url,
        })
        .then((res) => {
          let data = res.data;
          if (data.code == 1) {
            let url = data.data.qrcode_url;
            console.log("二维码路径", url);
            this.shareCode = url;
            // this.$refs.share.init();
          } else {
            this.$message.info(this.i18n["获取分享二维码失败"]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // #endif
    },

    // 获取用户信息
    getInfo() {
      this.$api
        .post(global.apiUrls.postGetUserInfo, {
          user_id: (global.userInfo && global.userInfo.id) || 0,
        })
        .then((res) => {
          console.log(res);
          res = res.data;
          if (res.code == 1) {
            this.user_level = res.data.user_level;
            this.progressWidth =
              (res.data.empirical / res.data.level_info[this.user_level + 1]) *
              100;
            this.$store.commit("updateUserInfo", res.data);
            this.$forceUpdate();
          }
          uni.stopPullDownRefresh();
        });
    },
    // 保存图片
    saveImage() {
      uni.getImageInfo({
        src: this.shareCode,
        success: (img) => {
          console.log(img);
          uni.saveImageToPhotosAlbum({
            filePath: img.path,
            success: (res) => {
              this.$message.info(this.i18n["保存成功"]);
            },
            fail: (err) => {
              this.$message.info(this.i18n["保存失败"] + JSON.stringify(err));
            },
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .bg {
    display: block;
    width: 100%;
    height: 100vh;
  }
  .scancode {
    padding: 15rpx;
    position: fixed;
    z-index: 2;
    width: 300rpx;
    height: 300rpx;
    border-radius: 10rpx;
    background-color: white;
    left: 50%;
    bottom: 300rpx;
    margin-left: -150rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .bottom {
    position: fixed;
    z-index: 2;
    width: 90%;
    height: 100rpx;
    border-radius: 10rpx;
    background-color: white;
    bottom: 40rpx;
    right: 5%;
    .desc {
      line-height: 100rpx;
    }
  }
}
</style>
