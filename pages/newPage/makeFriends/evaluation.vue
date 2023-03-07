<template>
  <view class="submitfiiends">
    <!-- header -->
    <fu-custom isBack bgColor="bg-white">
      <view slot="content">
        评价
      </view>
    </fu-custom>

    <view class="form-content">
      <view class="">
        {{ details.content }}
      </view>
      <textarea class="comment-content" v-model="content" placeholder="请输入交友内容" />
      <!-- 上传图片 -->
      <view class="add-img">
        <view class="add-img-tips">
          <text>添加照片</text>
          <text>最多可上传9张图片</text>
        </view>
        <view class="img-list">
          <block v-if="images" >
            <view class="img-item" v-for="item in images" >
              <image :src="item" mode="aspectFill"></image>
              <!-- <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image> -->
            </view>
          </block>
          <view class="img-item" @click="updataImg">
            <image class="add-imgs" src="/static/add-img.png" mode=""></image>
            <image class="delete-icon" v-if="false" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>








    <view class="pay-btns">
      <view class="pay-btn" @click="submitEventPay">
        提交
      </view>
    </view>
  </view>
</template>

<script>
import {validate,UploadImage} from '@/common/utils/index.js'
export default {
		data() {
			return {
        id:"",
				content:'',
        images:[],
        details:null,
			}
		},
		onLoad(options) {
			this.id = options.id;
      uni.$on("uPicCropper", (path) => {
        this.uploadUserImg(path);
      });
      this.init()
		},
    onUnload() {
      // 关闭当前页面的监听事件
      uni.$off("uPicCropper");
    },
		methods:{
      async init(){
        const options = {
          id: this.id
        }
        const data = await this.$api.post(global.apiUrls.friends_my_apply_detail, options)
        const result = data.data
        if (result.code == 1) {
          this.details = result.data
        } else {
          this.$message.info(result.msg);
        }
      },
      updataImg(){
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // 跳转到图片裁切页面
            uni.navigateTo({
              url: `/pages/user/user/avatar-cropping/index?rectHeight=200&rectWidth=200&fileType=jpg&myImgUrl=${res.tempFilePaths[0]}`,
              animationDuration: 0,
            });
          },
        });
      },
      uploadUserImg(blob) {
        uni.showLoading();
        let _this = this;
        // 开始上传
        new UploadImage([blob], {
          complete: function (res) {
            uni.hideLoading();
            if (res.length) {
              _this.images =[..._this.images,res[0].path]
              console.log( _this.images,9999)
            }
          },
        });
      },
			async submitEventPay() {
        if(!this.content.trim()) {
        	this.$message.info('请输入交友内容')
        	return;
        }
       const data = await this.$api.post(global.apiUrls.friends_comment,{
          id:this.id,
          content:this.content,
          thumb:this.images.length ? this.images.join() : "",
        })
        const result = data.data
        if (result.code == 1) {
        // 支付
          this.$urouter.navigateTo(`/pages/newPage/makeFriends/socialContactdetail?id=${this.id}&from=myjy`);
        } else {
          this.$message.info(result.msg);
        }
			},
     
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
