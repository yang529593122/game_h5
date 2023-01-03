<template>
  <view class="page">
    <!-- main start -->
  	<fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
			<view slot="content">{{title}}</view>
		</fu-custom>
      
    <view class="per">
      <view class="padding fu-flex fu-flex-center ">{{i18n['我们要对您绑定的手机号进行验证']}}: </view>
      <!-- 手机号码 start -->
      <view class="padding fu-flex fu-flex-center"> <text class="">{{ mobileX || "" }}</text> </view>
      <!-- 手机号码 end -->
      <!-- 验证码输入框 start -->
      <view class="main-center">
        <view class="code"  :style="[{ 'margin-left':'-'+ (boxNum/2 * 86)+ 'rpx'}]">
          <view class="code-box" @click="showKeyBoard">
            <block v-for="(item, index) in boxNum" :key="index">
              <view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
            </block>
          </view>
          <!-- <input type="number"  v-model="password" /> -->
        </view>
      </view>
      <!-- 验证码输入框 end -->

      <!-- 获取验证码 start -->
      <view class="padding fu-flex fu-flex-center" @click="getCode()">
        <text class="text-blue2" style="color: #3B82CD;"> {{ getCodeText }}</text>
      </view>
      <!-- 获取验证码 end -->

      <!-- 下一步按钮 start -->
      <view class="btn_cloce">
        <view class="types" @click="submit">{{i18n['下一步']}}</view>
      </view>
      <!-- 下一步按钮 end -->

      <!-- 键盘 start -->
      <view :class="['keyboard', show ? '' : 'active']" class="solid-top">
        <block v-for="(item, index) in 9" :key="index">
          <view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
        </block>
        <view class="keyboard-item hide"></view>
        <view class="keyboard-item" @tap="key(0)"><text>0</text></view>
        <view class="keyboard-item delte" @tap="del()">
          <image class="img" src="../../static/del.png" mode="aspectFill" :lazy-load="true"></image>
        </view>
      </view>
      <!-- 键盘 end -->
    </view>
    <!-- main end -->

    <!-- 断网检测 start -->
    <fu-notwork></fu-notwork>
    <!-- 网络检测  end -->
  </view>
</template>

<script>
  /**
   *
   *  验证手机绑定  -->  修改密码
   */
  // @see 引入验证方法
  import { validate } from "@/common/utils/index.js";
  export default {
    data() {
      return {
        boxNum:4,        //验证码输入框的个数
        type: '',         //判断跳转页面  1 修改支付密码  2修改密码 3绑定手机号
        show: false,    //显示键盘
        password: '',  //输入的验证码
        mobile: "", // {String} 手机号
        mobileX: "", // {String} 当前手机号添加*号之后的显示
        code: "", // {String} 验证码
        getCodeText: global.i18n["获取验证码"], // {String} 获取验证码按钮的文字
        getCodeisWaiting: false, // {Boolean} 获取验证码时的加载状态
        code_id: 0, // {Number} 用户是否已获取验证码
        title:'',
      };
    },
    /**
     * @property {Number} type - 判断跳转页面  1 修改支付密码  2修改密码
     * @property {Object} user - 用户信息
     */
    onLoad(options) {
      // this.title = this.i18n['验证码验证手机号']
      this.type = options.type // 判断跳转页面  1 修改支付密码  2修改密码 3: 修改绑定手机号
      let titleName = ''
      if (this.type==1) {
        titleName = this.i18n['修改支付密码']
      } else if (this.type==2){
        titleName = this.i18n['修改密码']
      } else if (this.type==3){
        titleName = this.i18n['修改绑定手机号']
      }
      this.title =  titleName || this.i18n['修改密码']

      this.getMobile();
    },
    onBackPress() {
      uni.hideKeyboard();
    },
    methods: {
      showKeyBoard() {
        if (!this.code_id) {
          this.$message.info(this.i18n["请先获取验证码"]);
          return false;
        }
        this.show = true
      },
      key(key) {
        if (this.password.length < this.boxNum) {
          this.password += key;
          if (this.password.length == this.boxNum) {
            this.show=false
            //结束
          }
        }
      },
      /**
       * @description 获取手机号
       * @property {String} mobile - 加密后的手机号
       */
      getMobile() {
        this.$api.post(global.apiUrls.postUserGet_user_phone, {}).then((res) => {
          var mobile =
            res.data.data.substr(0, 3) + "****" + res.data.data.substr(7);
          this.mobile = res.data.data;
          this.mobileX = mobile;
        });
      },
      /**
       * @event 点击获取验证码
       * @description 获取验证码
       * @property {Number} user_id - 用户的id值
       */
      getCode() {
        uni.hideKeyboard();
        if (this.getCodeisWaiting) return;
        if (!validate(this.mobile, "phone")) {
          this.$message.info(
            !this.mobile ? this.i18n["请输入手机号"] : this.i18n["请填写正确手机号码"]
          );
          return false;
        }
        this.getCodeText = this.i18n["发送中..."];
        this.getCodeisWaiting = true;
        this.getCodeBtnColor = "#BFBFBF";
        let user_id = uni.getStorageSync("USER_INFO").id;
        this.$api
          .post(global.apiUrls.GetVerifyCode, {
            is_test: global.IS_DEV,
            mobile: this.mobile,
            type: "4",
            user_id: user_id,
          })
          .then((res) => {
            var res = res.data;
            console.log(res);
            // this.$message.info(res.msg)
            if (res.code == 1) {
              this.code_id = 1;
              this.$message.info(this.i18n["验证码为"] + res.data.code + this.i18n["请注意查收"]);
              this.setTimer();
            } else {
              this.getCodeText = this.i18n["获取验证码"];
              this.getCodeBtnColor = "#259B3B";
              this.getCodeisWaiting = false;
              this.$message.info(res.msg)
            }
          });
      },
      /**
       * @description 获取验证码的倒计时
       * @property {Number} holdTime - 验证码倒计时的时间
       */
      setTimer() {
        let holdTime = 60;
        this.getCodeText = "重新获取(60)";
        this.Timer = setInterval(() => {
          if (holdTime <= 0) {
            this.getCodeisWaiting = false;
            this.getCodeBtnColor = "#F74D58";
            this.getCodeText = this.i18n["获取验证码"];
            clearInterval(this.Timer);
            return;
          }
          this.getCodeText = this.i18n["重新获取"]+"(" + holdTime + ")";
          holdTime--;
        }, 1000);
        this.showKeyBoard()
      },
      del() {
      	if (this.password.length > 0) {
      		this.password = this.password.substring(0, this.password.length - 1);
      	}else {
          this.show = false
        }
      },
      /**
       * @event 点击下一步按钮
       * @description 提交
       * @property {Object} data - 请求接口时携带的参数
       */
      submit() {
        const that = this
        // 验证信息 start
        if (!this.code_id) {
          this.$message.info(this.i18n["请先获取验证码"]);
          return false;
        }
        if (!this.password ) {
          this.$message.info(this.i18n["请输入验证码"]);
          return false;
        }
        // 验证信息 end

        // 请求接口时携带的数据
        let data = {
          mobile: this.mobile,
          code: this.password,
          type: 4
        };

        this.$api
          .post(global.apiUrls.postUserCheckVerifyCode, data)
          .then((res) => {
            res = res.data;
            if (res.code == 1) {
              let type = Number(this.type);
              switch(type){
                case 1:
                  // 跳转支付密码
                  this.$urouter.redirectTo({
                    url: '/pages/index/setting/change-pay-password/index',
                    params: {
                      modle: 1,
                      code: that.password,
                      mobile:that.mobile,
                    }
                  });
                break;
                case 2:
                  // 跳转修改密码
                  this.$urouter.redirectTo({
                    url: "/pages/index/setting/modify-change-password/index",
                  });
                break;
                case 3:
                  // 跳转绑定手机号
                  this.$urouter.redirectTo({
                    url: "/pages/index/setting/change-newphone/index",
                  });
                break;
              }
            }else{
               this.$message.info(this.i18n['验证码错误']);
            }

          });
      },
    },
  };
</script>

<style lang="scss">
  .page{
    min-height: 100vh;
    background-color: #FFFFFF;
  }
  // 验证码输入框 start
  .main-center {
    height: 120rpx;
    width: 100%;
  }

  .code {
    float: left;
    position: relative;
    left:50%;
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .code-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #d0d0d0;
  }

  .code-box-item {
    width: 86rpx;
    height: 86rpx;
    background: #fff;
    font-size: 40rpx;
    line-height: 86rpx;
    text-align: center;
  }

  .code-box-item:not(:last-child) {
    border-right: 1px solid #d0d0d0;
  }
  // 验证码输入框 end
  // 键盘 start
  .keyboard {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #EBEBEB;
    display: flex;
    justify-content: center;
    z-index: 2;
    flex-wrap: wrap;
    transition: all 0.2s ease-in 0.2s;
  }

  .active {
    bottom: -400rpx;
    display: none;
  }

  .keyboard-item {
    box-sizing: border-box;
    width: 250rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    font-size: 40rpx;
    color: #333;
    height: 99rpx;
    border: 1rpx solid #EBEBEB;
    border-top: none;
    border-left: none;
  }

  .hide {
    opacity: 0;
  }

  .delte {
    background: none;
    box-shadow: none;
  }

  .delte image {
    width: 60rpx;
    height: 60rpx;
  }
// 键盘 end
  // main start
  .per {
    padding: 110rpx 20upx;
    font-size: 28upx;
    // background-color: #fff;

    .per_row {
      padding: 30upx 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      // border-bottom: 1px solid #ededed;

      .row_right {
        text-align: right;

        .aa {
          color: #999999;
          display: inline-block;
          margin-right: 10upx;
        }
      }
    }

    .get-code {
      position: absolute;
      height: 90upx;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      top: 0;
      color: $fu-main-color;
      // border-left: solid 1upx #fff;
      z-index: 3;

      &:after {
        content: " ";
        width: 1upx;
        height: 50upx;
        // background-color: #fff;
        position: absolute;
        z-index: 3;
        left: 0;
        top: 20upx;
      }
    }
  }

  // main end

  .out_login {
    margin-top: 30%;
    line-height: 88upx;
    background-color: rgb(0, 129, 255);
    color: #fff;
    text-align: center;
    border-radius: 45px;
    margin-left: 25upx;
    margin-right: 25upx;
  }

  // 下一步按钮 start
  .btn_cloce {
		margin: 80rpx 32rpx 0;
		height: 88rpx;
		
		border-radius: 4rpx;
		font-size: 32rpx;
		line-height: 88rpx;
		text-align: center;
		color: #ffffff;
		position: absolute;
		bottom: 40rpx;
		left: 0;
		width: 686rpx;
    // margin-top: 32rpx;
    width: 100%;
    text-align: center;
    .types {
     width: 686rpx;
      height: 88upx;
      color: #ffffff;
      line-height: 88upx;
	  background: #295B7B;
      // background: $bgtheme;
      border-radius: 4rpx;
      // margin: 0 auto;
    }
  }

  // 下一步按钮 end
  .text-blue2{
    color: #3B9DFF;
  }
</style>
