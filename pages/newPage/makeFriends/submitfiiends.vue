<template>
  <view class="submitfiiends">
    <!-- header -->
    <fu-custom isBack bgColor="bg-white">
      <view slot="content">
        交朋友
      </view>
    </fu-custom>

    <view class="form-content">
      <textarea class="comment-content" v-model="introduce" placeholder="请输入交友内容" />
      <!-- 上传图片 -->
      <view class="add-img">
        <view class="add-img-tips">
          <text>添加照片</text>
        </view>
        <view class="img-list">
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image src="/static/logo.png" mode="aspectFill"></image>
            <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
            <image class="add-imgs" src="/static/add-img.png" mode=""></image>
            <image class="delete-icon" v-if="false" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
        </view>
      </view>


    </view>

    <!-- 联系方式 -->
    <view class="contact">
      <view class="contact-title">
        联系方式
      </view>
      <view class="contact-list">
        <view class="contact-list-item">
          <view class="contact-list-item-lable">
            QQ号码
          </view>
          <view class="contact-list-item-text">
            <input type="text" placeholder="请输入QQ号码">
          </view>
        </view>
        <view class="contact-list-item">
          <view class="contact-list-item-lable">
            手机号码
          </view>
          <view class="contact-list-item-text">
            <input type="text" placeholder="请输入手机号码">
          </view>
        </view>
        <view class="contact-list-item">
          <view class="contact-list-item-lable">
            微信号码
          </view>
          <view class="contact-list-item-text">
            <input type="text" placeholder="请输入微信号码">
          </view>
        </view>
        <view class="contact-list-item">
          <view class="contact-list-item-lable">
            交友金额
          </view>
          <view class="contact-list-item-text contact-list-item-text-end">
            <input type="text" placeholder="请输入" disabled value="¥ 280.00">
          </view>
        </view>
      </view>
    </view>



    <!-- 支付列表 -->
    <view class="pay">
      <view class="pay-title">
        选择支付方式
      </view>
      <view class="pay-list">
        <view class="pay-list-item">
          <view class="pay-list-item-left">
            <view class="pay-list-item-left-icon">
              <image class="pay-list-item-left-icon-img" src="./static/wx.png" mode="aspectFill"></image>
            </view>
            <view class="pay-list-item-left-title">
              微信支付
            </view>
          </view>
          <view class="pay-list-item-right">
            <view class="pay-list-item-right-img">
              <image src="../../user/static/1.png" mode="aspectFill"></image>
            </view>
          </view>
        </view>
        <view class="pay-list-item">
          <view class="pay-list-item-left">
            <view class="pay-list-item-left-icon">
              <image class="pay-list-item-left-icon-img" src="./static/zfb.png" mode="aspectFill"></image>
            </view>
            <view class="pay-list-item-left-title">
              支付宝支付
            </view>
          </view>
          <view class="pay-list-item-right">
            <view class="pay-list-item-right-img">
              <image src="../../user/static/1.png" mode="aspectFill"></image>
            </view>
          </view>
        </view>
        <view class="pay-list-item">
          <view class="pay-list-item-left">
            <view class="pay-list-item-left-icon">
              <image class="pay-list-item-left-icon-img" src="./static/ye.png" mode="aspectFill"></image>
            </view>
            <view class="pay-list-item-left-title">
              余额支付
            </view>
          </view>
          <view class="pay-list-item-right">
            <view class="pay-list-item-right-img">
              <image src="../../user/static/select.png" mode="aspectFill"></image>
            </view>
          </view>
        </view>
      </view>
      <view class="pay-description">
        哈开始就换个卡就会开始大家更好了卡就很少看个建行卡几乎是个快乐哈
        哈开始就换个卡就会开始大家更好了卡就很少看个建行卡几乎是个快乐哈
      </view>
    </view>


    <view class="pay-btns">
      <view class="pay-btn" @click="submitEventPay">
        立即支付
      </view>
    </view>
  </view>
</template>

<script>
export default {
		data() {
			return {
				introduce:'1'
			}
		},
		onLoad(options) {
			this.type = options.type;
      console.log(options)
		},
		methods:{
			submitEventPay() {
        console.log("立即支付")
        this.$urouter.navigateTo(`/pages/newPage/makeFriends/submitfiiendssuccess`);
        
			}
		}
	}
</script>

<style lang="scss" scoped>
  .submitfiiends {
    .form-content {
      padding: 20rpx;
      background: #fff;
      margin-bottom: 20rpx;
      .comment-content {
        display: block;
        width: 100%;
        height: 200rpx;
        background: #FAFAFC;
        font-size: 28rpx;
        margin-bottom: 30rpx;
      }

      .add-img {
        .add-img-tips {
          margin-bottom: 32rpx;

          text:nth-child(1) {
            font-size: 28rpx;
            font-weight: 600;
          }

          text:nth-child(2) {
            font-size: 24rpx;
            color: #999999;
            margin-left: 24rpx;
          }
        }

        .img-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, 160rpx);
          grid-row-gap: 20rpx;
          grid-column-gap: 22rpx;

          .img-item {
            border: 1rpx solid #DAE2E8;
            position: relative;

            image {
              display: block;
              width: 100%;
              height: 160rpx;
            }

            .delete-icon {
              width: 32rpx;
              height: 32rpx;
              position: absolute;
              top: -10rpx;
              right: -10rpx;
            }
          }

          .add-imgs {
            border: 1rpx solid #DAE2E8;

          }
        }
      }
    }


    // 联系方式
    .contact {
      background: #fff;
      padding: 20rpx;
      margin-bottom: 20rpx;
      .contact-title {
        line-height: 80rpx;
        height: 80rpx;
        font-weight: bold;
      }

      .contact-list {
        .contact-list-item {
          display: flex;
          justify-content: space-between;
          line-height: 80rpx;
          height: 80rpx;
          border-bottom: 1rpx solid #F6F6F6;
          .contact-list-item-text {
            text-align: right;
            input {
              display: block;
              line-height: 80rpx;
              height: 80rpx;
              font-size: 28rpx;
            }
            &.contact-list-item-text-end{
              color: red;

            }
          }
        }
      }
    }


    // 支付
    .pay {
      padding: 20rpx;
      background: #fff;
      .pay-title {
        height: 80rpx;
        line-height: 80rpx;
      }

      .pay-list {
        .pay-list-item {
          display: flex;
          padding: 20rpx 0;
          justify-content: space-between;
          .pay-list-item-left {
            display: flex;
            justify-content: center;
            align-items: center;
            .pay-list-item-left-icon {
              width: 56rpx;
              height: 56rpx;
              border-radius: 50%;

              .pay-list-item-left-icon-img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .pay-list-item-left-title{
              padding-left: 20rpx;
              line-height: 80rpx;
              height: 80rpx;
            }
          }

          .pay-list-item-right {
            display: flex;
            justify-content: center;
            align-items: center;

            .pay-list-item-right-img{
              width: 36rpx;
              height: 36rpx;
              border-radius: 50%;


              image {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

          }
        }
      }

      .pay-description{
        padding: 20rpx 0 140rpx 0;
        font-size: 24rpx;
        color: #999999;
      }
    }


    .pay-btns{
      position: fixed;
      left: 0;
      bottom: 0;
      height: 100rpx;
      padding: 0 20rpx;
      background: #fff;
      width: 100%;
      .pay-btn{
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #fff;
        font-size: 32rpx;
        background: #295B7B;
      }

    }
  }
</style>
