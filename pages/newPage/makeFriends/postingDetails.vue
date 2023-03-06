<template>
  <view class="content">
    <!-- 详情上部分 -->
    <fu-loading v-if="!details"></fu-loading>
    <block v-else>
      <view class="detail-up">
        <view class="title">{{ details.title }}</view>
        <view class="user-info">
          <view class="user-info-content">
            <image class="user-icon" :src="details.head_img" mode="aspectFill"></image>
            <view class="user-info-name">
              <view class="name">
                <text class="user-name">{{ details.user_nickname }}</text>
                <view class="num">
                  <image src="/static/newPage/10.png" mode=""></image>
                  <text>累计牵手 {{ details.count }}</text>
                </view>
              </view>
              <view class="creat-time">
                <text class="times">{{ details.create_time }}</text>
                <view class="label">
                  <text v-for="item in details.tabs_name">{{ item }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="contents">{{ details.introduce }}</view>
        <view class="img-list" v-if="details.images">
          <image v-for="item in details.images" :key="item" :src="item" mode=""></image>
        </view>
      </view>
      <!-- 评论 -->
      <view class="pl-contents" v-if="details.total_comment">
        <view class="pl-contents-title">
          评论({{ details.total_comment }})
        </view>
        <view class="pl-contents-list">
          <view class="pl-contents-list-item">
            <view class="pl-contents-list-item-img">
                <image src="./static/1.png" mode="aspectFill"></image>
            </view>
            <view class="pl-contents-list-item-text">
                <view class="pl-contents-list-item-title">
                  你好
                </view>
                <view class="pl-contents-list-item-mess">
                  就被我看见啊还是给大家啥感慨哈萨克就被我看见啊还是给大家啥感慨哈萨克就被我看见啊还是给大家
                  啥感慨哈萨克就被我看见啊还是给大家啥感慨哈萨克就被我看见啊还是给大家啥感慨哈萨克
                </view>
                <view class="pl-contents-list-item-time">
                  2022-02-02 12:22:22
                </view>
            </view>
          </view>

        </view>
      </view>

    </block>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        details: null,
      }
    },
    onLoad(options) {
      this.id = options.id;
      this.init()
    },
    methods: {
      // 初始化数据
      async init() {
        const options = {
          id: this.id
        }
        const data = await this.$api.post(global.apiUrls.friends_friends_detail, options)
        const result = data.data
        if (result.code == 1) {
          console.log(result.data)
          this.details = result.data
        } else {
          this.$message.info(result.msg);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {

    .detail-up {
      padding: 32rpx;
      background: #fff;

      .title {
        font-size: 32rpx;
        color: #36373D;
        font-weight: 500;
      }

      .user-info {
        margin: 40rpx 0;

        .user-info-content {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .user-icon {
            width: 80rpx;
            height: 80rpx;
          }

          .user-info-name {
            width: 586rpx;
            height: 80rpx;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: column;

            .name {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;

              .user-name {
                font-size: 28rpx;
                color: #36373D;
              }

              .num {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                image {
                  width: 32rpx;
                  height: 32rpx;
                }

                text {
                  font-size: 20rpx;
                  color: #999999;
                  margin-left: 10rpx;
                }
              }
            }

            .creat-time {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;

              .times {
                font-size: 24rpx;
                color: #999999;
              }

              .label {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                text {
                  display: inline-block;
                  width: 60rpx;
                  line-height: 34rpx;
                  background: rgba(41, 91, 123, 0.39);
                  color: #295B7B;
                  font-size: 20rpx;
                  text-align: center;
                  margin-left: 16rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box; //作为弹性伸缩盒子模型显示。
                  -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                  -webkit-line-clamp: 1; //显示的行
                }
              }
            }
          }
        }
      }

      .contents {
        font-size: 28rpx;
        color: #36373D;
        margin: 32rpx 0;
      }

      .img-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        image {
          width: 220rpx;
          height: 220rpx;
        }

        image:nth-child(3n-1) {
          margin: 13rpx;
        }
      }
    }

    // 评论
    .pl-contents{
      padding: 20rpx;
      .pl-contents-title{
        font-weight: bold;
        margin-bottom: 40rpx;
      }
      .pl-contents-list{

        .pl-contents-list-item{
          display: flex;
          border-bottom: 1rpx solid #87878A;
          .pl-contents-list-item-img{
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
            overflow: hidden;
            image{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .pl-contents-list-item-text{
            flex: 1;
            padding-left: 20rpx;
            .pl-contents-list-item-title{
              line-height: 60rpx;
              height: 60rpx;
            }
            .pl-contents-list-item-mess{
              line-height: 40rpx;
              color: #444449;
            }
            .pl-contents-list-item-time{
              padding: 30rpx 0;
              font-size: 24rpx;
              color: #87878A;
            }
          }
        }
      }
    }

    .line {
      height: 10rpx;
      background-color: #F6F7F9;
    }

    .commont {
      padding: 32rpx;

      .commont-num {
        font-weight: 500;
        font-size: 32rpx;
        color: #333;
      }

      .commont-list {

        .commont-item {
          padding: 32rpx 0;
          border-bottom: 1rpx solid #eee;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;

          image {
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
          }

          .commont-info {
            width: 600rpx;
            margin-left: 24rpx;

            .commont-title {
              line-height: 56rpx;
              font-weight: 500;
              color: #333333;
              font-size: 28rpx;
            }

            .commont-text {
              margin: 24rpx 0;
              font-size: 28rpx;
              color: #36373D;
            }

            .commont-time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
      }
    }

    .btns {
      width: 465rpx;
      line-height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #295B7B;
      color: #fff;
      margin: 0 auto;
      position: fixed;
      bottom: 32rpx;
      left: 142.5rpx;
      border-radius: 40rpx;

      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 24rpx;
      }

      text {
        font-size: 30rpx;
        color: #fff;
      }
    }
  }
</style>
