<template>
	<view class="page-user">
		<!-- 表单 start -->
		<view v-if="!loading" class="pay_main">
			<view class="pay_title">
				{{i18n['第一步：先获取手机验证码']}}
			</view>
			<view class="text-df text-666 margin-bottom">
				{{i18n['绑定的用户手机']}}{{ mobileX || "" }}
			</view>
			<view class="flex align-center margin-bottom">
				<text class="text-df text-666 padding-right-sm">{{i18n['验证码']}}</text>
				<input class="flex-sub input-info" type="number" value="" v-model="code" :placeholder="i18n['请输入验证码']" maxlength="4" placeholder-style="color:#BFBFBF;font-size:28rpx;" />
				<view class="get-code" @click="getCode()">{{ getCodeText }}</view>
			</view>
			<view class="line-1"></view>
			<view class="pay_title">
				{{i18n['第二步：上传微信收款二维码']}}
			</view>
			<view class="load-img">
        <view v-if="qrcode" class="cu-tag delete" @click="delImg" ><text class="cuIcon-close"></text></view>
				<image v-if="qrcode" :src="qrcode" class="uploadImg"   mode="aspectFill"></image>
        <image v-else  @click="ChooseImage"  class="uploadImg" :src="logo" mode=""></image>
				<view class="text-df text-666 margin-tb-sm">{{i18n['上传二维码']}}</view>
			</view>

			<view class="pay_title">
				{{i18n['第三步：填写微信真实姓名']}}
			</view>
			<view class="flex align-center padding-bottom">
				<text class="text-df text-666 padding-right-sm">{{i18n['真实姓名']}}</text>
				<input class="flex-sub input-info" type="text" value="" v-model="name" :placeholder="i18n['请输入真实姓名']" maxlength="4" placeholder-style="color:#BFBFBF;font-size:28rpx;" />
			</view>
		</view>
		<!-- 表单 end -->

		<!-- 提交按钮 -->
		<view v-if="!loading" class="bottom_btn" @click="tijiao">{{i18n['提交']}}</view>
		<!-- 断网检查 -->
		<fu-notwork></fu-notwork>
		<!-- 加载状态 -->
		<!-- <fu-loading v-if="loading"></fu-loading> -->
	</view>
</template>

<script>
	/**
	 * @author LLF
	 */
	// @see 引入上传图片
	import {
		UploadImage
	} from '@/common/utils/index';
	import {
		UPLOAD_IMAGE_URL
	} from '@/common/config.js';
	// @see 引入验证方法
	import {
		validate
	} from "@/common/utils/index.js";
	export default {
		data() {
			return {
				name: '', // {String} 姓名
				is_click: false, // {Boolean} 是否点击
				logo: require('../../static/up02.png') ,
        qrcode:'',//请求回来的二维码
				count: 1, // {Number} 选择几个图片
				images: [], // {Array.<Object>} 上传的图片
				mobile: '', // {String} 手机号
				mobileX: '', //{String} 当前手机号添加*号之后的显示
				loading: true, // {Boolean} 加载中

				code: "", // {String} 验证码
				getCodeText:  global.i18n["获取验证码"], // {String} 获取验证码按钮的文字
				getCodeisWaiting: false, // {Boolean} 获取验证码时的加载状态
				getCodeBtnColor: this.$store.state.themeColor, // {String} 获取验证码按钮的颜色
				code_id: 0, // {Number} 用户是否已获取验证码
			};
		},
		onLoad() {
			this.setNavigationBarTitle(this.i18n['绑定微信']);
			this.getMobile();
			this.Detail();
		},
		methods: {
      /**
       * @description  删除图片
       */
      delImg(){
        this.qrcode = null
        this.logo = require('../../static/up02.png')
      },
			/**
			 * @description 获取手机号
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
			 * @event
			 * @description 获取验证码
			 */
			getCode() {
				uni.hideKeyboard();
				if (this.getCodeisWaiting) return;
				if (!validate(this.mobile, "phone")) {
					this.$message.info(
						!this.mobile ? this.i18n["请输入手机号"] : i18n["请填写正确手机号码"]
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
						type: "7",
						user_id: user_id,
					})
					.then((res) => {
						var res = res.data;
						console.log(res);
						// this.$message.info(res.msg)
						if (res.code == 1) {
							this.code_id = 1;
							this.$message.info(this.i18n["验证码为"] + res.data.code +  this.i18n["请注意查收"]);
							this.setTimer();
						} else {
							this.getCodeText = this.i18n["获取验证码"];
							this.getCodeBtnColor =  this.$store.state.themeColor;
							this.getCodeisWaiting = false;
						}
					});
			},
			/**
			 * @description 获取验证码的倒计时
			 */
			setTimer() {
				let holdTime = 60;
				this.getCodeText = this.i18n["重新获取(60)"];
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor =  this.$store.state.themeColor;
						this.getCodeText = this.i18n["获取验证码"];
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText =this.i18n["重新获取("] + holdTime + ")";
					holdTime--;
				}, 1000);
		},
			/**
			 * @function
			 * @description 校验验证码
			 */
			async verifyCode() {
				// 请求接口时携带的数据
				let data = {
					mobile: this.mobile,
					code: this.code,
					type: 6
				};
				let apiRes = await this.$api.post(global.apiUrls.PostUserCheckVerifyCode, data)
				var res = apiRes.data;
				console.log(res);
				if (res.code == 1) {
					return true;
				} else {
					this.$message.info(res.msg);
					return false;
				}
			},

			/**
			 * @function
			 * @description 从相册中选择图片
			 */
			ChooseImage() {
				let self = this;
				// 从相册中选择图片
				uni.chooseImage({
					count: this.count - this.images.length, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;

						// 开始上传
						new UploadImage(tempFilePaths, {
							complete: function(res) {
								// 上传成功 返回数据格式为数组 [ { id: '', path: '' } ]
								console.log(JSON.stringify(res), 'UploadImage')
								// self.images.push(...res);
								self.logo = res[0].path;
                self.qrcode = res[0].path;
								// self.logo = res.tempFilePaths[0];
							}
						})
					}
				});
			},
			/**
			 * @function
			 * @description 获取用户的绑定信息
			 */
			Detail() {
				let _this = this;
				_this.$api.get(global.apiUrls.getWithdrawAccount, {
					account_type: 1
				}).then(res => {
					if (res.data.code == 1) {
						_this.name = res.data.data.true_name
						_this.qrcode = res.data.data.qrcode || require('../../static/up02.png')
						_this.loading = false
					} else if (res.data.code == 0) {
						_this.loading = false
					}
				}).catch(err => {
					console.log(err, 'get_withdraw_account')
				})
			},
			/**
			 * @event
			 * @description 点击提交按钮请求接口
			 */
			async tijiao() {
				let reg = /^[\u0391-\uFFE5]+$/;
				let _this = this
				let regs = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
				let arrs = /^[0-9]*$/
				//验证微信账号  邮箱或者手机号
				let regAliyun = /^(?:1[2-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/;
				let str = 0
				let num = 0

					// 验证
					if (!_this.code_id) {
					_this.$message.info(this.i18n["请先获取验证码"]);
					return false;
				}
				if (!_this.code) {
					_this.$message.info(this.i18n["请输入验证码"]);
					return false;
				}
				if (!_this.qrcode) {
					_this.$message.info(this.i18n['收款码未上传']);
					return false;
				}
				if (!reg.test(_this.name)) {
					_this.$message.info(this.i18n['姓名输入有误']);
					_this.$message.info(
						!_this.name ? this.i18n["请输入真实姓名"] : this.i18n["真实姓名输入有误"]
					);
					return
				}
				if (!regAliyun.test(_this.mobile)) {
					_this.$message.info(
						!_this.mobile ? this.i18n["请正确输入手机号"] : this.i18n["请填写正确手机号码"]
					);
					return;
				}
				if (_this.is_click) {
					return
				}

				// let hasCode = await this.verifyCode()
				// if( !hasCode ){
					// return;
				// }

				let {
					name,
					mobile,
					qrcode,
					code
				} = this;
				_this.is_click = true;

				_this.$api.post(global.apiUrls.postBindWithdrawAccount, {
					true_name: name,
					qrcode: qrcode,
					account_type: 1,
					is_default: 0,
					account_id: '1',
					code:code
				}).then(res => {
					_this.$message.info(res.data.msg);
					if (res.data.code == 1) {
						uni.navigateBack();
					}
					_this.is_click = false;
				}).catch(err => {
					_this.is_click = false;
					console.log(err, 'bind_withdraw_account')
				})
			}
		}
	};
</script>

<style lang="scss">
	.page-user {
		min-height: 100%;
		// position: relative;
    border-top: 1rpx solid #eee;
	}

	.line-1 {
		display: block;
		height: 1rpx;
		background: #EEEEEE;
	}

	.pay_main {
		padding: 0 32rpx;
		background-color: #FFFFFF;

		.pay_title {
			line-height: 112rpx;
			color: #333;
			font-size: 28rpx;
			font-weight: 500;
		}
	}

	.get-code {
		font-size: 28rpx;
		color: #3B82CD;
	}

	.load-img {
    position: relative;

    .delete{
      height:40rpx;
      width: 40rpx;
      position: absolute;
      left:130rpx;
      z-index: 5;
    }
		.uploadImg {
			width: 160rpx;
			height: 160rpx;
		}
	}

	.bottom_btn {
		width: calc(100% - 64upx);
		height: 88upx;
		// background: $bgtheme;
		border-radius: 44upx;
		font-size: 32upx;
		color: white;
		line-height: 88upx;
		text-align: center;
		position: absolute;
		bottom: 40rpx;
		left: 32rpx;
		background: #295B7B;
	}
	.input-info{
		font-size: 28rpx;
	}
</style>
