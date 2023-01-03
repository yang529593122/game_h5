<template>
  <view>
    <fu-custom bgColor="bg-white" :isBack="true">
      <block slot="content"><text class="text-title">{{ i18n['提现'] }}</text></block>
      <block slot="right">
        <view @tap="toLog" class="text-lg">{{ i18n['明细'] }}</view>
      </block>
    </fu-custom>
    <!-- 输入提现金额 start -->
    <view class="tx_cont margin-top-sm padding" :style="[{ top: CustomBar + 'px' }]">
      <text class="text-333 text-lg text-bold">输入提现金额24小时内到账</text>
      <view class="tx_box padding-tb solid-bottom flex align-center justify-between">
        <view class="flex-sub flex align-center">
          <text class="f56 text-333">¥</text>
          <input class="margin-left-sm" type="number" :placeholder="i18n['账户余额']+moeny" v-model="change_money" placeholder-style="font-size: 32rpx; color: #999999;" />
        </view>
        <view class="withAll" @click="total_tx">{{ i18n['全部'] }}</view>
      </view>
      <view class="tx_yue margin-top-sm">
        {{ i18n['提现收取']}}{{withdraw_handling_fee}}%{{ i18n['的手续费'] }}
        <!-- <text class="fu-iconfont tips margin-left-xs" @tap="showRole">&#xe8b0;</text> -->
				<image src="../../static/wenhao.png" @tap="showRole" style="width: 26rpx;height: 26rpx;margin-left: 10rpx;"></image>
      </view>
    </view>
    <!-- 输入提现金额 end -->

    <!-- 选择提现方式 start -->
    <view class="tx_main padding-lr padding-top">
      <text class="tx_choose text-333 text-bold">{{ i18n['请选择提现方式'] }}</text>
	  
	  <view class="flex align-center justify-between" style="margin-top: 24rpx;">
		  <view style="position: relative;width: 219rpx;
height: 127rpx;border-radius: 4rpx;" @click="get_type" :data-index="2">
			  <view :class="[tabCurrentIndex == 2 ? 'meiyigepaymethodsac' : 'meiyigepaymethods']">
			  			  <view class="" style="width: 40rpx;height: 40rpx;">
			  				  <image src="../../static/alipay.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
			  			  </view>
						  <view class="text-center text-sm" style="color: #36373D;margin-top: 8rpx;">支付宝</view>
			  </view>
			  <view style="position: absolute;right: 0;top: 0;" v-if="tabCurrentIndex == 2">
			  						  <image src="../../static/rt.png" style="width: 50rpx;height: 44rpx;" mode="aspectFit"></image>
			  </view>
		  </view>
		  
		  <view style="position: relative;width: 219rpx;
		  height: 127rpx;border-radius: 4rpx;" @click="get_type" :data-index="1">
		  			  <view class="meiyigepaymethods" :class="[tabCurrentIndex == 1? 'meiyigepaymethodsac' : 'meiyigepaymethods']">
		  			  			  <view class="" style="width: 40rpx;height: 40rpx;">
		  			  				  <image src="../../static/login-quick-001.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
		  			  			  </view>
		  						  <view class="text-center text-sm" style="color: #36373D;margin-top: 8rpx;">微信</view>
		  			  </view>
					  <view style="position: absolute;right: 0;top: 0;" v-if="tabCurrentIndex == 1">
					  						  <image src="../../static/rt.png" style="width: 50rpx;height: 44rpx;" mode="aspectFit"></image>
					  </view>
		  		  </view>
				  
		<view style="position: relative;width: 219rpx;
		height: 127rpx;border-radius: 4rpx;" @click="get_type" :data-index="3">
					  <view :class="[tabCurrentIndex == 3 ? 'meiyigepaymethodsac' : 'meiyigepaymethods']">
					  			  <view class="" style="width: 40rpx;height: 40rpx;">
					  				  <image src="../../static/ye.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
					  			  </view>
								  <view class="text-center text-sm" style="color: #36373D;margin-top: 8rpx;">银行卡</view>
					  </view>
					  <view style="position: absolute;right: 0;top: 0;" v-if="tabCurrentIndex == 3">
						  <image src="../../static/rt.png" style="width: 50rpx;height: 44rpx;" mode="aspectFit"></image>
					  </view>
				  </view>
		  <!-- <view class="meiyigepaymethodsac"></view> -->
	  </view>
    </view>
    <!-- 选择提现方式 end -->
	
	<!-- 支付宝 start -->
	<view v-if="tabCurrentIndex == 2">
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">支付宝账号</view>
		<view class="bg-white" style="width: 686rpx;
height: 88rpx;margin-left: 32rpx;">
			<input style="width: 100%;
height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" v-model="account_id" placeholder="请输入您的支付宝账号" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
		</view>
		
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">
			姓名
			<text class="text-sm" style="color: #868686;">（用于核对账号信息，防止款项放错）</text>
		</view>
		
		<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" placeholder="请输入您的姓名" v-model="true_name" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view>
				
		<view style="" style="width: 140rpx;height: 140rpx;margin-top: 32rpx;margin-left: 32rpx;"  @click="selectImg">
			<image :src="qrcode" v-if="qrcode" style="width: 140rpx;height: 140rpx;"></image>
			<image v-else src="../../static/addimg.png" style="width: 140rpx;height: 140rpx;"></image>
		</view>
		
		<view class="text-sm" style="padding: 16rpx 32rpx 0;color: #868686;">上传支付宝收款码</view>
		
		<!-- <view class="text-df" style="padding: 40rpx 32rpx 18rpx;">提现金额</view>
				<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" type="digit" v-model="change_money" placeholder="请输入提现金额" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view> -->
	</view>
	<!-- 支付宝 end -->
	
	<!-- 微信 start -->
	<view v-if="tabCurrentIndex == 1">
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">微信账号</view>
				<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" v-model="account_id" placeholder="请输入您的微信账号" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view>
				
				<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">
					姓名
					<text class="text-sm" style="color: #868686;">（用于核对账号信息，防止款项放错）</text>
				</view>
				
				<view class="bg-white" style="width: 686rpx;
				height: 88rpx;margin-left: 32rpx;">
							<input style="width: 100%;
				height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" placeholder="请输入您的姓名" v-model="true_name" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
						</view>
						
				<view style="" style="width: 140rpx;height: 140rpx;margin-top: 32rpx;margin-left: 32rpx;" @click="selectImg">
					<image :src="qrcode" v-if="qrcode" style="width: 140rpx;height: 140rpx;"></image>
					<image v-else src="../../static/addimg.png" style="width: 140rpx;height: 140rpx;"></image>
					
				</view>
				
				<view class="text-sm" style="padding: 16rpx 32rpx 0;color: #868686;">上传微信收款码</view>
				
<!-- 				<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">提现金额</view>
						<view class="bg-white" style="width: 686rpx;
				height: 88rpx;margin-left: 32rpx;">
							<input style="width: 100%;
				height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" type="digit" v-model="change_money" placeholder="请输入提现金额" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
						</view> -->
	</view>
	<!-- 微信 end -->
	
	<!-- 银行卡 start -->
	<view v-if="tabCurrentIndex == 3">
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">持卡人名称</view>
		<view class="bg-white" style="width: 686rpx;
height: 88rpx;margin-left: 32rpx;">
			<input style="width: 100%;
height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" placeholder="请输入真实姓名" v-model="true_name" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
		</view>
				
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">银行名称</view>
				<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" v-model="cardname" placeholder="请输入银行名称" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view>
		
		<view class="text-df" style="padding: 40rpx 32rpx 18rpx;">银行卡号</view>
				<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" v-model="account_id" placeholder="请输入银行卡号" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view>
		
		<!-- <view class="text-df" style="padding: 40rpx 32rpx 18rpx;">提现金额</view>
				<view class="bg-white" style="width: 686rpx;
		height: 88rpx;margin-left: 32rpx;">
					<input style="width: 100%;
		height: 88rpx;line-height: 88rpx;padding: 0 24rpx;" v-model="change_money" type="digit" placeholder="请输入提现金额" placeholder-style="font-size: 28rpx;color: #B7BAC2;"/>
				</view> -->
		
	</view>
	
	<view style="height: 250rpx;"></view>
	<!-- 银行卡 end -->

    <!-- 立即体现按钮 -->
    <view class="tx_btn" @click="handleSubmit">{{ i18n['提现'] }}</view>
    <!-- 弹窗  -->
    <fu-popup v-model="showPopup" mode="center" width="540rpx" height="700rpx">
      <view class="pop-content padding">
        <view class="text-333 text-bold text-lg text-center">{{ i18n['提现规则'] }}</view>
        <scroll-view class="content-box" scroll-y>
          <view v-for="(item, index) in fast_detaile" :key="index" class="margin-top-sm text-999">{{ index + 1 }} , {{ item.content }}</view>
        </scroll-view>
      </view>
      <view class="padding-top flex align-center justify-center " @tap="closePop">
        <view class="round close-btn flex align-center justify-center"><text class="cuIcon-close text-lg" style="color: #838383;margin-top:4rpx;"></text></view>
      </view>
    </fu-popup>
    <!-- 输入支付密码 -->
    <pay-keyboard :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
    <!-- 断网检测 -->
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
/**
 * @author 刘畅
 */
// @see 引入支付密码组件
import payKeyboard from '../../components/keyboard/keyboard.vue';
  import { UploadImage, validate } from "@/common/utils/index";
export default {
  components: {
    payKeyboard
  },
  data() {
    return {
      withdraw_handling_fee:'', //提现手续费
      CustomBar: this.CustomBar,
      tabCurrentIndex: 2, // {Number} 支付宝还是微信
      moeny: '', // {String} 账户余额
      account_name: '', // {Number} 没啥用，不敢删
      account: '', // {String} 没啥用，不敢删
      change_money: '', // {String} 用户输入的提现金额
      is_click: false, // {Boolean} 按钮的点击状态
      show_key: false, // {Boolean} 支付密码组件是否显示
      min: 1, // {Number} 最小提现金额
      showPopup: false, // {Boolean} 弹窗显示
      fast_detaile: [], // {Object}
	  true_name:'',//真实姓名
	  account_id:'',//账号/银行卡号
	  tixianJine:'',//体现金额
	  cardname:'',//银行名称
	  qrcode:'',
	  statusshenhe:99
    };
  },
  onLoad(options) {
    this.getMoney();
    this.getLimitWithdraw();
	this.isBindAccount(this.tabCurrentIndex);//1微信 2支付宝 3银行卡
  },
	onShow() {
			this.huoqushimingrenzheng();
	},
  methods: {
	  huoqushimingrenzheng() {
	  	this.$api.post(global.apiUrls.huoqushimingrenzheng).then(res => {
	  		if(res.data.code == 1) {
	  			this.statusshenhe = res.data.data.status;
	  			// this.realName = res.data.data.name;
	  			// this.cardID = res.data.data.idcard_no;
	  			// this.idcard_front = res.data.data.idcard_front;
	  		} else {
	  			this.$message.info(res.data.msg);
	  		}
	  	})
	  },
	  selectImg() {
		  let that =this;
		  uni.chooseImage({
		    count: 1,
		    sizeType: ["original", "compressed"],
		    sourceType: ["album", "camera"],
		    success: (res) => {
				const tempFilePaths = res.tempFilePaths;
				// 开始上传
				new UploadImage(tempFilePaths, {
					complete: function(res) {
						// 上传成功 返回数据格式为数组 [ { id: '', path: '' } ]
						console.log(JSON.stringify(res), 'UploadImage')
						// self.images.push(...res);
						// that.logo = res[0].path;
						that.qrcode = res[0].path;
						// self.logo = res.tempFilePaths[0];
					}
				})
			},
		})
	  },
    /**
     * @function
     * @description 支付密码弹窗隐藏
     */
    hideFun() {
      this.show_key = false;
    },
    /**
     * @function
     * @description 判断用户是否设置支付密码
     * @property {Number} pay_money - 订单金额
     */
    isSetPayPassword() {
      return new Promise(resolve => {
        this.$api.post(global.apiUrls.isSetPay).then(res => {
          res = res.data;
          console.log('是否设置支付密码', res);
          if (res.code == 1) {
            if (res.data.falg == 0) {
              setTimeout(() => {
                this.$urouter.navigateTo('/pages/index/setting/change-pay-password/index');
              }, 800);
              resolve(false);
            } else {
              resolve(true);
            }
          } else {
            this.$message.info(res.msg);
            resolve(false);
          }
        });
      });
    },
    filter(type) {
      switch (Number(type)) {
        case 1:
          return this.i18n['请先绑定微信'];
        case 2:
          return this.i18n['请先绑定支付宝'];
        case 3:
          return this.i18n['请先绑定银行卡'];
      }
    },
    // 判断用户是否绑定了提现账户
    isBindAccount(idx) {
		this.$api
		  .get(global.apiUrls.getWithdrawAccount, {
		    account_type: idx})
		  .then(res => {
			  if(res.data.code == 1) {
				 // console.log(e) 
				  if(idx == 1) {
					  // 微信
					  this.true_name = res.data.data.true_name;
					  this.account_id = res.data.data.account_id;
					  this.qrcode = res.data.data.qrcode;
				  }
				  
				  if(idx == 2) {
				  		// 支付宝
						 this.true_name = res.data.data.true_name;
						this.account_id = res.data.data.account_id;
						this.qrcode = res.data.data.qrcode;
				  }
				  
				  if(idx == 3) {
				  		// 银行卡	
					this.true_name = res.data.data.true_name || '';
					this.account_id = res.data.data.account_id || '';
					this.cardname = res.data.data.cardname || '';
				  }
			  } else {
				  // this.$message.info(res.data.msg);
				  this.true_name = '';
				  this.account_id = '';
				  this.qrcode = '';
				  this.cardname = '';
			  }
		  })
         },
    /**
     * @event
     * @description 判断用户是否绑定体现账户,如果绑定就去体现
     * @param {Object} n - 用户输入的支付密码
     * @property {Number} account_type - 【账户类型 1 微信 2 支付宝 3 银行卡】
     * @property {Number} type - 【提现类型 1：微信 2：支付宝】
     * @property {Number} money - 【提现金额】
     * @property {Number} pay_password - 支付密码
     */
    getPassword(n) {
      this.$api
        .post(global.apiUrls.withdraw, {
          type: this.tabCurrentIndex,
          money: this.change_money,
          pay_password: n.password
        })
        .then(res => {
          res = res.data;
          if (res.code == 1) {
            uni.$emit('changeMoney', {
              msg: this.i18n['页面更新']
            });
            this.$urouter.redirectTo({
              url: '/pages/user/wallet/withdraw-success/index',
              params: {
                type: this.filterName(this.tabCurrentIndex),
                money: this.change_money
              }
            });
          } else {
            this.$message.info(res.msg);
          }
        })
        .catch(err => {
          console.log('ERROR', err);
        });
    },
    filterName(type) {
      switch (type) {
        case 1:
          return this.i18n['微信'];
        case 2:
          return this.i18n['支付宝'];
        case 3:
          return this.i18n['银行卡'];
      }
    },
    /**
     * @function
     * @description 开启支付密码组件
     */
    showModal() {
      this.show_key = true;
    },
    /**
     * @event
     * @description 全部提现
     */
    total_tx() {
      if (parseFloat(this.moeny) <= 0) {
        this.$message.info(this.i18n['没有可提现的金额']);
      } else if (parseFloat(this.moeny) < parseFloat(this.min)) {
        this.$message.info(this.i18n['当前余额低于最低提现金额限制']);
      } else {
        this.change_money = this.moeny;
      }
    },
    /**
     * @event
     * @description 用户选择提现到支付宝还是微信
     */
    get_type(e) {
      this.tabCurrentIndex = e.currentTarget.dataset.index;
	  this.isBindAccount(this.tabCurrentIndex);//1微信 2支付宝 3银行卡
	  // this.isBindAccount(2);//1微信 2支付宝 3银行卡
	  // this.isBindAccount(3);//1微信 2支付宝 3银行卡
    },
    /**
     * @function
     * @description 获取用户余额
     */
    getMoney() {
      let _this = this;
      _this.$api
        .get(global.apiUrls.getMyMoney, {})
        .then(res => {
          console.log(res, 'get_my_money');
          if (res.data.code == 1) {
            _this.moeny = res.data.data.user_money;
            _this.withdraw_handling_fee = res.data.data.withdraw_handling_fee
          }
        })
        .catch(err => {
          console.log(err, 'get_my_money');
        });
    },
    /**
     * @function
     * @description 获取最小提现金额限制
     */
    getLimitWithdraw() {
      this.$api
        .post(global.apiUrls.postLimitWithdraw, {
          code: 'user'
        })
        .then(res => {
          if (res.data.code == 1) {
            this.min = res.data.data.min_withdraw_money;
          }
        })
        .catch(err => {});
    },
    /**
     * @event
     * @description 点击立即体现按钮
     * 先判断是否绑定了对应账号
     * 再判断是否设置了支付密码
     * 再提现
     */
    async handleSubmit() {
      // let isBindAccount = await this.isBindAccount();
      // if (!isBindAccount) return;
			
			// 屏蔽实名认证 start
	  // if(this.statusshenhe === 99 || this.statusshenhe === 2) {
		 //  this.$message.info('请先进行实名认证');
		 //  setTimeout(() => {
			//   this.$urouter.navigateTo('/pages/user/user/authentication/index')
		 //  },700)
		 //  return;
	  // }
	  
	  // if(this.statusshenhe === 0) {
		 //  this.$message.info('实名认证通过后再进行体现');
		 //  return;
	  // }
	  // 屏蔽实名认证 end
      console.log('绑定了账号,下一步');
      // let isSetPayPassword = await this.isSetPayPassword();
      // if (!isSetPayPassword) return;
      // console.log('设置了支付密码,下一步');
      if (!this.change_money) {
        this.$message.info(this.i18n['请输入提现金额']);
        return false;
      }
      if (Number(this.change_money) < Number(this.min)) {
        this.$message.info(this.i18n['最小提现金额为'] + this.min + this.i18n['元']);
        return false;
      }
      if (Number(this.change_money) > Number(this.moeny)) {
        this.$message.info(this.i18n['可提现余额不足']);
        return false;
      }
	 let requestParams= {};
	  if(this.tabCurrentIndex == 1) {
		  if(!this.account_id) {
			  this.$message.info('请输入微信账号');
			  return;
		  }
		  if(!this.true_name) {
			  this.$message.info('请输入真实姓名');
			  return;
		  }
		  if(!this.qrcode) {
			  this.$message.info('请上传微信收款码');
			  return;
		  }
		  requestParams = {
			   money:this.change_money,
			    type:1,
				true_name:this.true_name,
				qrcode:this.qrcode,
				account_id:this.account_id,
		  }
	  }
	  
	  if(this.tabCurrentIndex == 2) {
		  if(!this.account_id) {
		  			  this.$message.info('请输入支付宝账号');
		  			  return;
		  }
		  if(!this.true_name) {
		  			  this.$message.info('请输入真实姓名');
		  			  return;
		  }
		  if(!this.qrcode) {
		  			  this.$message.info('请上传支付宝收款码');
		  			  return;
		  }
		  requestParams = {
		  			   money:this.change_money,
		  			    type:2,
		  				true_name:this.true_name,
		  				qrcode:this.qrcode,
		  				account_id:this.account_id,
		  }
	  }
	  if(this.tabCurrentIndex == 3) {
		  if(!this.true_name) {
		  			  this.$message.info('请输入持卡人名称');
		  			  return;
		  }
		  
		  if(!this.cardname) {
			  this.$message.info('请输入银行卡名称');
			  return;
		  }
		  if(!this.account_id) {
		  			  this.$message.info('请输入银行卡卡号');
		  			  return;
		  }
		  requestParams = {
		  			   money:this.change_money,
		  			    type:3,
		  				true_name:this.true_name,
		  				account_id:this.account_id,
						cardname:this.cardname
		  }
	  }
	  // let requestParams= {
	  //  		  qrcode:this.qrcode,
	  //  		  account_id:this.account_id,
	  //  		  cardname:this.cardname
	  //  }
	  this.$api.post(global.apiUrls.moneywithdraw,requestParams).then(res => {
		  if(res.data.code == 1) {
			  this.$urouter.redirectTo({
			    url: '/pages/user/wallet/withdraw-success/index',
			    params: {
			      type: this.filterName(this.tabCurrentIndex),
			      money: this.change_money
			    }
			  });
		  } else {
			  this.$message.info(res.data.msg);
		  }
	  })
	  
	  return;
      this.showModal();
    },
    showRole() {
      let _this = this;
      _this.$api
        .post(global.apiUrls.getWithdrawRule)
        .then(res => {
          if (res.data.code == 1) {
            _this.fast_detaile = res.data.data;
            this.showPopup = true;
          }
        })
        .catch(err => {
          console.log(err, 'get_my_money');
        });
    },
    closePop() {
      this.showPopup = false;
    },
    toLog() {
      this.$urouter.navigateTo('/pages/user/wallet/withdraw-detail/index');
    }
  }
};
</script>

<style lang="scss">
.uni-input-placeholder {
  color: #999;
}
.text-title{
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
}
// 体现按钮 start
.tx_btn {
  width: 686rpx;
  height: 88upx;
  background: #295B7B;
  border-radius: 4upx;
  font-size: 32upx;
  color: white;
  line-height: 88upx;
  text-align: center;
  position: fixed;
  bottom: 40upx;
  left: 32upx;
}

// 提现按钮 end

// 选择提现方式 start
.tx_main {
  width: 100%;
  height: auto;
  overflow: hidden;
  // background: white;
  margin-top: 20upx;

  .tx_choose {
    font-size: 32rpx;
  }

  .ali-img {
    width: 52rpx;
    height: 52rpx;
  }

  .check-img {
    width: 36rpx;
    height: 36rpx;
  }

  .payMain {
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
  }

  .tx_mainBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46%;
    height: auto;
    overflow: hidden;
    border-radius: 10rpx;
    border: 1px solid #999;

    .tx_name {
      display: block;
      line-height: 100upx;
      font-size: 30upx;
      color: #333;
      text-align: center;
    }

    &.act {
      border: 1px solid $theme;
    }

    image {
      width: 50upx;
      height: 50upx;
      margin-right: 20upx;
    }
  }

  .act .icon-yuanquan:before {
    content: '\E655';
    color: $theme;
  }
}

.tx_final {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 30upx;

  text {
    display: block;
    margin-top: 24upx;
    font-size: 24upx;
    color: #999999;

    text {
      color: $theme;
      display: inline-block;
      margin-left: 6upx;
    }
  }
}

// 选择提现方式 end

// 输入体现金额 start
.tx_cont {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: white;

  .tx_box {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: relative;

    .f56 {
      font-size: 56rpx;
      font-weight: Regular;
    }

    .withAll {
      font-size: 32rpx;
      color: #ff6464;
      font-weight: Medium;
    }

    input {
      display: block;
      width: auto;
      height: 70upx;
      font-size: 50upx;
      line-height: 70upx;
    }
  }

  .tx_yue {
    font-size: 24upx;
    color: #999999;

    .tips {
      font-size: 26rpx;
    }
  }
}

// 输入体现金额 end
// 规则弹窗 start
.pop-content {
  width: 540rpx;
  height: 572rpx;
  border-radius: 24rpx;
  background: #ffffff;
  .content-box{
    height: 472rpx;
  }
}

.close-btn {
  width: 54rpx;
  height: 54rpx;
  background-color: rgba(255, 255, 255, 0.6);
}

// 规则弹窗 end


.meiyigepaymethods {
	width: 219rpx;
	background: #FFFFFF;
	height: 127rpx;
	// height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 4px;
}

.meiyigepaymethodsac {
	width: 219rpx;
	background: #FFFFFF;
	height: 127rpx;
	// height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 4px;
	border: 2px solid #295B7B;
}
</style>
