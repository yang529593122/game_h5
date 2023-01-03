<template>
  <view class="page">
		<fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
				<view slot="content">实名认证</view>
				<!-- <view slot="right">修改</view> -->
			</fu-custom>
    <!-- 姓名 start -->
    <view class=" flex flex-direction">
      <view class="title text-df text-weight-500" style="padding: 30rpx 32rpx 18rpx;color: #36373D;">{{i18n['真实姓名']}}</view>
      <input v-model="realName" style="background: #F8F8F8;width: 686rpx;
height: 88rpx;border-radius: 4px;padding: 0 24rpx;line-height:88rpx;margin-left:32rpx" :placeholder="'请输入'" placeholder-style="font-size:28rpx"/>
    </view>
    <!-- 姓名 end -->

    <!-- 身份证号 start -->
    <view class="">
      <!-- <view class="title">{{i18n['身份证号']}}</view> -->
	  <view class="title text-df text-weight-500" style="padding: 30rpx 32rpx 18rpx;color: #36373D;">{{i18n['身份证号']}}</view>
      <input type="text" v-model="cardID" style="background: #F8F8F8;width: 686rpx;
height: 88rpx;border-radius: 4px;padding: 0 24rpx;line-height:88rpx;margin-left:32rpx;" :maxlength="18" :placeholder="'请输入'" placeholder-style="font-size:28rpx" />
    </view>
    <!-- 身份证号 end -->
	<!-- 人脸认证 start -->
	<view>
		<view class="title text-df text-weight-500" style="padding: 30rpx 32rpx 36rpx;color: #36373D;">人脸照片</view>
		<view style="padding: 0 32rpx;">
			<image :src="idcard_front" v-if="idcard_front" mode="aspectFit" style="width: 243rpx;height: 243rpx;" @click="gotorenlian"></image>
			<image src="/static/add-img.png" v-else style="width: 243rpx;height: 243rpx;" @click="gotorenlian"></image>
		</view>
	</view>
	<!-- 人脸认证 end -->


    <!-- 提交按钮 start -->
    <view class="submit-btn" @click="submitInfo" v-if="statusshenhe === 2 || statusshenhe === 99">
      <text class="text-xl text-white">确定</text>
    </view>
    <!-- 提交按钮 end -->
  </view>
</template>

<script>
  import { UploadImage, validate } from "@/common/utils/index";
  export default {
    name: "Authentication",
    data() {
      return {
        realName: "",       // {String} 真实姓名
        phone: "",          // {Number} 手机号
        cardID: "",         // {Number} 身份证号
        reverseORfront: 0,  // {Number} 判断用户上传的是正面还是反面，（0：正面；1：反面；）
        reversePic: "",     // {String} 反面URL
        reverseID: "",      // {Number} 反面ID
        frontPic: "",       // {String} 正面URL
        frontID: "",        // {Number} 正面ID
		statusshenhe:99,
		idcard_front:''
      };
    },
	onShow() {
			
	},
    onLoad() { 
		this.huoqushimingrenzheng();
      // this.setNavigationBarTitle(this.i18n['实名认证'])
    },
    onUnload() {
      /**
       * @function
       * @description 页面关闭时停止监听
       */
      // uni.$off("uPicCropper");
    },
    computed: {},
    methods: {
		gotorenlian() {
			if(this.statusshenhe === 2 || this.statusshenhe === 99) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						if(res.tempFiles[0].size > 92160) {
							that.$message.info('请上传小于90KB的人脸图片')
							return;
						}
						new UploadImage(res.tempFilePaths,{
							complete: function(res) {
								// 上传成功 返回数据格式为数组 [ { id: '', path: '' } ]
								console.log(JSON.stringify(res), 'UploadImage')
								// self.images.push(...res);
								// that.logo = res[0].path;
								that.idcard_front = res[0].path;
								// self.logo = res.tempFilePaths[0];
							}
						})
					}
				});
			}
			
			return;
			this.$urouter.navigateTo('/pages/user/user/authentication/renlianrenzheng')
		},
		huoqushimingrenzheng() {
			this.$api.post(global.apiUrls.huoqushimingrenzheng).then(res => {
				if(res.data.code == 1) {
					this.statusshenhe = res.data.data.status;
					this.realName = res.data.data.name;
					this.cardID = res.data.data.idcard_no;
					this.idcard_front = res.data.data.idcard_front;
				} else {
					this.$message.info(res.data.msg);
				}
			})
		},
      /**
       * @event
       * @description 提交信息
       * @property {Object} data - 请求借口的信息
       * @property {String} data.name - 用户真实姓名
       * @property {Number} data.mobile - 用户手机号
       * @property {Number} data.idcard_no - 用户身份证号
       * @property {Number} data.idcard_front - 身份证正面
       * @property {Number} data.idcard_reverse - 身份证反面
       * @property {Boolean} isPass - 用户的输入信息是否通过验证
       */
      async submitInfo() {
        let data = {
          name: this.realName,
          idcard_no: this.cardID,
          idcard_front: this.idcard_front,
          auth_type: 1   // 实名认证
        };
        let isPass = await this.dataExamine(this.realName, this.cardID);
        if (!isPass && this.idcard_front != '') {
			if (!this.idcard_front) {
			  this.$message.info('请上传人脸照片');
			  return false;
			}
          this.$api.post(global.apiUrls.postUserAuthentication, data)
            .then(res => {
              if (res.data.code == 1) {
                // this.$message.info(this.i18n['提交申请成功'])
				this.huoqushimingrenzheng();
                setTimeout(() => {
                  this.$urouter.navigateBack();
                }, 500)
              } else {
                this.$message.info(res.data.msg);
              }
            })
        } else {
          // if (isPass == 'phone') {
          //   this.$message.info(this.i18n['请输入正确的手机号码']);
          //   return false;
          // }
          if (isPass == 'cardID') {
            this.$message.info('请输入正确的身份证号');
            return false;
          }
          if (isPass == 'realName') {
            this.$message.info('请输入姓名');
            return false;
          }
          
          // if (!this.reversePic) {
          //   this.$message.info(this.i18n['请上传身份证反面']);
          //   return false;
          // }
        }
      },
      /**
       * @event
       * @description 裁剪图片
       * @param {Object} type - 需要裁剪的图片信息
       */
      picCut(type) {
        this.reverseORfront = type;
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            uni.navigateTo({
              url:
                '/pages/user/user/avatar-cropping/index?rectWidth=240&rectHeight=151&fileType="jpg"&myImgUrl=' +
                res.tempFilePaths[0],
              animationDuration: 0,
            });
          },
        });
      },
      /**
       * @event
       * @description 删除图片
       * @param {Object} type - 需要删除的图片信息
       */
      cardIDDelete(type) {
        switch (type) {
          case 0:
            this.frontPic = "";
            break;
          case 1:
            this.reversePic = "";
            break;
          default:
            break;
        }
      },
      /**
       * @function
       * @description 上传图片
       * @param {Object} data - 需要上传的图片信息
       */
      uploadCardID(data) {
        console.log("开始上传");
        uni.showLoading();
        let that = this;
        new UploadImage([data], {
          complete: (res) => {
            uni.hideLoading();
            switch (that.reverseORfront) {
              case 0:
                that.frontPic = res[0].path;
                that.frontID = res[0].id;
                break;
              case 1:
                that.reversePic = res[0].path;
                that.reverseID = res[0].id;
                break;
              default:
                break;
            }
          },
        });
      },
      /**
       * @function
       * @description 参数检验
       * @param {String} realName - 用户真实姓名
       * @param {Number} phone - 手机号
       * @param {Number} cardID - 身份证号
       */
      dataExamine(realName, cardID) {
        // console.log('检验结果', !validate(realName, "require"), !validate(phone, "phone"), !validate(cardID, "idcard"))
        if (!validate(realName, "require")) {
          return 'realName'
        } else if (!validate(cardID, "idcard")) {
          return 'cardID'
        }
        else {
          return false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  page {
    background: #fff;
  }

  .page {
    height: calc(100vh - 88rpx);
  }

  .submit-btn {
    position: fixed;
    bottom: 40rpx;
    left: 32rpx;
    // transform: translateX(-50%);
    width: 686rpx;
    height: 88rpx;
    border-radius: 4rpx;
    background: #295B7B;
    text-align: center;
    line-height: 88rpx;
  }
</style>