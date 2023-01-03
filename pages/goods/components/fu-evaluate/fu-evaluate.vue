<template>
  <view class="evaluate-box solid-bottom">
    <view class="padding-tb-sm flex justify-between align-center">
      <view class="flex">
        <view class="block-80 round overHidden"><fu-image :src="prop.head_img" mode="aspectFill"></fu-image></view>
        <view class="margin-left-sm flex flex-direction justify-between">
          <view class="text-df text-333">{{ prop.user_nickname }}</view>
          <view>
            <block v-for="(item, index) in 5" :key="index">
              <image class="block-24" :src="index + 1 <= prop.star ? require('./static/stard2.png') : require('./static/star2.png')" mode="aspectFill"></image>
            </block>
          </view>
        </view>
      </view>

      <view class="text-sm text-999">{{ prop.create_time }}</view>
    </view>
    <view class="padding-bottom-sm padding-top-sm text-df text-333 text-cut-english">{{ prop.content }}</view>
    <view class="padding-top-xs padding-bottom-sm">
      <view class="grid col-3">
        <block v-for="(ele, index) in prop.video" :key="index">
          <view class="padding-xs wrap-box" @tap.stop="previewVideo(ele)">
            <view class="square-wrap">
              <view class="square-box">
                <fu-image :src="ele + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_300,h_300'" mode="aspectFill"></fu-image>
                <view class="play-mask"></view>
                <view class="play-btn"><view class="play-arrow"></view></view>
              </view>
            </view>
          </view>
        </block>
        <view v-for="(ele, index) in prop.thumb" :key="index">
          <view class="padding-xs wrap-box" @tap.stop="preview(ele, index)">
            <view class="square-wrap">
              <view class="square-box"><image :src="ele" lazy-load mode="aspectFill"></image></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class=" padding-bottom-sm flex justify-between align-start">
      <view class="text-999 text-sm padding-bottom-sm text-cut-2">{{ prop.key_name }}</view>
      <!-- 回复数 -->
      <view class="flex justify-between">
        <view></view>
        <view class="text-000 comment-text flex">
          <view class="flex align-center" @click.stop="comment(prop)" >
            <text class="" style="font-size: 24rpx;margin-right: 8rpx;">{{i18n['评论']}}</text>

            <!-- <text class="fu-iconfont margin-right-xs" style="font-size: 24rpx;margin-right: 24rpx;">&#xe6f5;</text>  -->
            <!-- {{prop.reply_num || 0}} -->
            <image class="comment-icon" :src="require('./static/comment.png')" style="margin-right: 24rpx;" />
          </view>
          <view @click.stop="fabulous(prop)"  class="flex align-center">
            <text class="" style="font-size: 24rpx;margin-right: 8rpx;" :class="prop.is_likes ? 'active' : ''">{{i18n['点赞']}}</text>
            <image class="fabulous-icon" v-if="!prop.is_likes" :src="require('./static/fabulous-fail.png')" />
            <image class="fabulous-icon" v-else :src="require('./static/fabulous-succ.png')" />
          </view>
          <!-- <text class="fu-iconfont margin-right-xs" style="font-size: 24rpx;">&#xe6f5;</text>  -->
        </view>
      </view>
    </view>

    <view class="video-mask" v-if="videoShow">
      <view class="padding-left flex align-center" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="cuIcon-back text-white" style="font-size: 36rpx;" @click.stop="closeVideo"></view>
      </view>
      <!-- #ifndef MP-WEIXIN -->
      <video :src="videoSrc" class="myVideo" id="myVideo" :show-fullscreen-btn="false" :style="{ height: 'calc(100% - ' + CustomBar + 'px)' }"></video>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <video :src="videoSrc" class="myVideo" id="myVideo" :show-fullscreen-btn="false" :show-mute-btn="true" :style="{ height: 'calc(100% - ' + CustomBar + 'px)' }"></video>
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
/**
 * @author
 * @description 商品评价组件
 * @param {Object} type - 没有用到这个属性，暂定
 * @property {String} temp - 保存当前播放的是哪一个视频的id值+索引
 */
export default {
  props: {
    prop: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      videoContext: null,
      videoShow: false,
      videoSrc: ''
    };
  },
  mounted() {
    // console.log(this.prop)
  },
  methods: {
    comment(val){
      this.$util.actionAuth(() => {
      console.log(val)
      this.$urouter.navigateTo({
        url: '/pages/goods/goodsdetail/comment-detail/index',
        params: val
      });
      });
    },
    fabulous(val) {
      // console.log(val);
      // val.is_likes = !val.is_likes
      this.$api
					.post(global.apiUrls.commentCollection, {
						collect_id: val.id
					})
					.then((res) => {
						this.$message.info(res.data.msg)
						if (res.data.code == 1) {
							val.is_likes = !val.is_likes
              this.$forceUpdate()
							if (val.is_likes) {
								val.likes_num++
							} else {
								val.likes_num--
							}
              this.$emit('change',1);
						}
					})
					.catch((err) => {

						console.log(err);
					});
    },
    /**
     * @event
     * @description 查看大图
     * @param {Object} item - 图片的信息
     * @param {Number} index - 当前图片的索引
     */
    preview(item, index) {
      uni.previewImage({
        current: index,
        urls: this.prop.thumb
      });
    },
    /**
     * @event
     * @description 查看视频
     * @param {String} j - 视频路径
     * @param {Number} index - 是第几个视频
     * @param {String} el - 保存当前播放的是哪一个视频的id值+索引
     */
    previewVideo(ele) {
      console.log('来了', ele);
      this.videoShow = true;
      // 获取 video 上下文 videoContext 对象
      if (this.videoContext) this.videoContext = null;
      this.videoContext = uni.createVideoContext('myVideo', this);
      this.videoSrc = ele;
      // 开始播放
      setTimeout(() => {
        this.videoContext.play();
      }, 200);
    },
    closeVideo() {
      this.videoContext.pause(); //暂停视频播放事件
      this.videoContext.seek(0);
      this.videoShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap-box {
  background-color: #ffffff;

  .square-wrap {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    box-sizing: border-box;
    position: relative;

    .square-box {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 8rpx;

      .play-mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
      }

      .play-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        border: 2rpx solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;

        .play-arrow {
          width: 0;
          height: 0;
          border-top: 18rpx solid transparent;
          border-left: 30rpx solid #ffffff;
          border-bottom: 18rpx solid transparent;
          margin-left: 8rpx;
        }
      }

      image {
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
        position: relative;
        z-index: 98;
      }
    }
  }
}

.block-80 {
  width: 80rpx;
  height: 80rpx;
  min-width: 80rpx;
  min-height: 80rpx;
  background-color: #eeeeee;
  border-radius: 50%;

  image {
    width: 100%;
    height: 100%;
  }
}

.block-24 {
  width: 24rpx;
  height: 24rpx;
  min-width: 24rpx;
  min-height: 24rpx;
}

.text-333 {
  color: #333333;
}

.text-999 {
  color: #999999;
}

.text-cut-english {
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
}

/* 300*225 */
.grid-video image {
  width: 150rpx;
  height: 112rpx;
}

.video-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  z-index: 99999;
}

.myVideo {
  width: 750rpx;
}
.comment-icon {
  width: 26rpx;
  height: 24rpx;
}
.fabulous-icon {
  width: 24rpx;
  height: 26rpx;
}
.text-000 {
  color: #000000;
}
.comment-text {
  width: 200rpx;
}
.active {
  color: #fa2033;
}
</style>
