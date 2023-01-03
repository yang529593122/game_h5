<template>
	<view class="">
		<fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
			<view slot="content">{{i18n["修改密码"]}}</view>
		</fu-custom>
		<view class="per">
			<view class="cu-list menu">
				<!-- 旧密码 start -->
				<view class="cu-item " :class="menuArrow?'arrow':''">
					<view class="content flex">
						<text class="left-width">{{i18n['旧密码']}}</text>
						<input class="flex-sub" type="text" maxlength="12" value="" :password="showPassOld" v-model="oldPassworl"
						 :placeholder="i18n['请输入旧密码']" placeholder-style="color:#999;" />
						<!-- <text :class="[showPassOld ? 'cuIcon-attentionforbid' : 'cuIcon-attention']" @click="changeShow('Old')"></text> -->
					</view>
				</view>
				<!-- 旧密码 end -->
				<!-- 新密码 start -->
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content flex">
						<text class="left-width">{{i18n['新密码']}}</text>
						<input class="flex-sub" type="text" maxlength="12" value="" :password="showPassNew" v-model="newPassworl"
						 :placeholder="i18n['请输入新密码']" placeholder-style="color:#999;" />
						<!-- <text :class="[showPassNew ? 'cuIcon-attentionforbid' : 'cuIcon-attention']" @click="changeShow('New')"></text> -->
					</view>
				</view>
				<!-- 新密码 end -->
				<!-- 确认没密  start   -->
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content flex">
						<text class="left-width">{{i18n['确认新密码']}}</text>
						<input class="flex-sub" type="text" maxlength="12" value="" :password="showPassConfirm" v-model="confirmPassworl"
						 :placeholder="i18n['请再次输入新密码']" placeholder-style="color:#999;" />
						<!-- <text :class="[showPassConfirm ? 'cuIcon-attentionforbid' : 'cuIcon-attention']" @click="changeShow('Confirm')"></text> -->
					</view>
				</view>
				<!-- 确认密码 end -->
			</view>
		</view>
		<!-- 提交按钮 start -->
		<!-- <view class="btn_cloce" style="padding:30rpx;">
			<fu-button shape="circle" type="error" class="btn" @click="tappass">{{i18n['完成']}}11111</fu-button>
		</view> -->
		<view class="btn_cloce" @click="tappass">{{i18n['完成']}}</view>
		<!-- 提交按钮 end -->
		<!-- 网络检测 start -->
		<fu-notwork></fu-notwork>
		<!-- 网络检测 end -->
	</view>
</template>

<script>
	import {
		validate
	} from '@/common/utils/index' //引入内容是否合法性方法
	export default {
		data() {
			return {
				menuArrow: false, // 是否显示右边指示图标（>）
				oldPassworl: '', //旧密码
				newPassworl: '', //新密码
				confirmPassworl: '', //确认密码
				showPassOld: true, //是否暗文显示旧密码
				showPassNew: true, //是否暗文显示新密码
				showPassConfirm: true, //是否暗文显示输入的确认密码

			};
		},
		onLoad() {
		},
		methods: {
			tappass() {
				if (!this.oldPassworl) {
					uni.showToast({
						title: this.i18n['请输入旧密码'],
						icon: 'none'
					});
					return false;
				}
				//检测旧密码的合法性
				if (!validate(this.oldPassworl, 'password')) {
					this.$message.info(this.i18n['请输入字母加数字6-12位旧密码']);
					return false;
				}
				if (!this.newPassworl) {
					uni.showToast({
						title: this.i18n['请输入新密码'],
						icon: 'none'
					});
					return false;
				}
				//检测新密码的合法性
				if (!validate(this.newPassworl, 'password')) {
					this.$message.info(this.i18n['请输入字母加数字6-12位新密码']);
					return false;
				}
				//检测旧密码和新密码不能一样
				if (this.oldPassworl === this.newPassworl) {
					uni.showToast({
						title: this.i18n['新密码与旧密码一致，请重新输入'],
						icon: 'none'
					});
					return false;
				}
				if (this.newPassworl != this.confirmPassworl || !this.confirmPassworl) {
					uni.showToast(
						!this.confirmPassworl ? {
							title: this.i18n['请输入确认新密码'],
							icon: 'none'
						} : {
							title: this.i18n['新密码不一致，请重新输入'],
							icon: 'none'
						}
					);
					return false;
				}
				let formData = {
					security_code: this.oldPassworl,
					password: this.newPassworl,
					password_code: this.confirmPassworl
				}
        this.$util.debounce(()=>{
          this.$api.post(global.apiUrls.postForgetPasswordCode, formData).then(res => {
          	this.$message.info(res.data.msg)
          	if (res.data.code == 1) {
          		//修改成功返回上一级
          		uni.clearStorageSync()
          		setTimeout(() => {
                this.$store.commit('logout');
                // uni.navigateBack();
                this.$store.dispatch('getCartList')
          			uni.switchTab({
          				url: '/pages/tab/my/my/index'
          			})
          		}, 1000)
          		// uni.$emit('updateUserInfo')
          	}
          });
        })

			},
			/**
			 * @param {Object} type  判断是否显示明文/暗文 内容
			 */
			changeShow(type) {
				this['showPass' + type] = !this['showPass' + type];
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #F8F8F8;
	}

	// 修改密码 start
	.per {
		padding: 0 20upx;
		font-size: 28upx;
		background-color: #fff;

		.per_row {
			padding: 30upx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #ededed;

			.row_right {
				text-align: right;

				.aa {
					color: #999999;
					display: inline-block;
					margin-right: 10upx;
				}
			}
		}
	}

	// 修改密码 end
	//提交按钮 start
	.btn_cloce {
  margin: 80rpx 32rpx 0;
  height: 88rpx;
  background: #295B7B;
  border-radius: 4rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  text-align: center;
  color: #ffffff;
  position: absolute;
  bottom: 40rpx;
  left: 0;
  width: 686rpx;
}
	.btn{
		/* background: $bgtheme; */
		background: linear-gradient(126deg, #FA2033 0%, #FF6530 100%);
		height: 88rpx;
		line-height:88rpx;
		font-size: 32rpx;
	}
	//提交按钮 end
	.cu-item{
		min-height: 110rpx!important;
	}
	.left-width{
	  width: 160rpx;
	  margin-right: 32rpx;
   }
  .cu-list.menu>.cu-item{
    padding: 0;
  }
</style>
