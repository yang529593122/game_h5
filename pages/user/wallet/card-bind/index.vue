<template>
	<view class="page">
		<fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
			<view slot="content">{{i18n["绑定银行卡"]}}</view>
		</fu-custom>
    <view class="wrap ">
      <form>
      	<view class="cu-form-group">
      		<view class="title">{{i18n["持卡人名称"]}}</view>
      		<input :placeholder="i18n['请输入真实姓名']" name="input" placeholder-class="placeholderClass" v-model="cardInfo.username"></input>
      	</view>
		  <view class="cu-form-group">
        	<view class="title">{{i18n["银行名称"]}}</view>
        	<input :placeholder="i18n['请输入银行名称']" name="input" placeholder-class="placeholderClass" v-model="cardInfo.cardname"></input>
        </view>
        <!-- <view class="cu-form-group">
        	<view class="title">银行卡号</view>
        	<input placeholder="请输入银行卡号" name="input" placeholder-class="placeholderClass" v-model="cardInfo.account_id" @blur="blur"></input>
        </view> -->
            <view class="cu-form-group">
        	<view class="title">{{i18n["银行卡号"]}}</view>
        	<input :placeholder="i18n['请输入银行卡号']" name="input" placeholder-class="placeholderClass" v-model="cardInfo.account_id" ></input>
        </view>
      	<view class="cu-form-group">
      		<view class="title">{{i18n["开户行"]}}</view>
      		<input :placeholder="i18n['请输入开户行']" name="input" placeholder-class="placeholderClass" v-model="cardInfo.cardbank"></input>
      	</view>
      </form>
    </view>
    <button class="bottom-btn" @click="handleSubmit">{{i18n["提交"]}}</button>
	</view>
</template>
<script>
  let getCardName = require('./libs/index.js');
	export default {
		data() {
			return {
        cardInfo: {
          username: '',
          cardname: '',
          account_id: '',
          cardbank: '',
        }, // 银行卡信息
				id:'', //银行卡id
			}
		},
		onLoad: function(options) {
      this.get_withdraw_account();
      console.log(getCardName)

		},
		methods: {
      /**
       * @author dengdongfang
       * @date 2021-5-26
       * @description 失焦校验银行卡号是否正确，在正确的情况下获取银行名称
       */
      blur(){
        // #ifndef MP-WEIXIN
        const {username,cardname,account_id,cardbank} = this.cardInfo;
        let that = this;
        if(account_id.trim()){
          getCardName.getBankBin(account_id,(err,res)=>{
            console.log(err)
            if(!res){
              that.$message.info(err);
              that.cardInfo.cardname = '';
            }else{
              that.cardInfo.cardname = res.bankName;
            }
          })
        }
        // #endif
      },
      // 提交绑定信息
      handleSubmit(){
        this.$util.debounce(() => {
          const {username,cardname,account_id,cardbank} = this.cardInfo;
          if(username.trim() == '') return this.$message.info(this.i18n["请输入真实姓名"]);
          if(cardname.trim() == '') return this.$message.info(this.i18n["请输入银行名称"]);
          if(account_id.trim() == '') return this.$message.info(this.i18n["请输入银行卡号"]);
          if(cardbank.trim() == '') return this.$message.info(this.i18n["请输入开户行"]);
          // if(!this.$validate(account_id.trim(),'card')) return this.$message.info("银行卡号格式错误");
          this.$api.post(global.apiUrls.postBindWithdrawAccount,{
            true_name: username.trim(),
            cardname: cardname.trim(),
            account_type: 3,
            is_default: 1,
            account_id: account_id.trim(),
            cardbank:cardbank.trim()
          }).then(res => {
            console.log(res)
            if(res.data.code == 1){
              this.$message.info(this.i18n['绑定成功']);
              setTimeout(()=>{
                uni.navigateBack({
                  delta:1
                })
              })
            }
          }).catch(err => {
            console.log(err)
          })
        },1000,true)
      },

			select_bank(){
				this.$refs.selector.show()
			},
			onCancel(){
				this.$refs.selector.hide()
			},
			onConfirm(item){
				if(item.result=='bank_id') return;
				this.info.bank_name = item.result;
				this.info.bank_id = item.value;
			},
			SwitchA(){
				//选择设为默认
				this.info.is_default = !this.info.is_default;
				// this.info.is_default = this.info.is_default == 0 ? this.info.is_default = 1 : 0 ;
				// console.log(this.info.is_default)
			},
			get_withdraw_account() {	//获取用户已绑定的账户信息
				this.$api.get(global.apiUrls.getWithdrawAccount, {
					account_type: 3
				}).then(res => {
					console.log(res,'请求');
          res = res.data;
					if (res.code == 1) {
						this.cardInfo.username = res.data.true_name;
						this.cardInfo.account_id = res.data.account_id;
						this.cardInfo.cardname = res.data.cardname;
            this.cardInfo.cardbank = res.data.cardbank;


					}
				});
			},
			//获取银行列表
			get_bank_list() {
				this.$Request.get(this.$api.money.get_bank_list, {}).then(res => {
					if (res.code == 1) {
						this.bank_list = res.data
					}else{

					}
				});
			},
			bind_withdraw_account() {	//提交绑定
				let data = this.info;
				if( data.true_name == '' ){
					this.$Common.toast(this.i18n['请输入真实姓名']);
					return false;
				}
				if( data.account_id == '' ){
					this.$Common.toast(this.i18n['请输入银行卡号']);
					return false;
				}
				if( data.bank_id == '' ){
					this.$Common.toast(this.i18n['请选择银行']);
					return false;
				}
				if( data.open_name == '' ){
					this.$Common.toast(this.i18n['请输入开户行']);
					return false;
				}
				if( data.qrcode == '' ){
					this.$Common.toast(this.i18n['请上传银行卡正面照片']);
					return false;
				}
				data.account_type = 3;	//账户类型 1 微信 2 支付宝 3 银行卡
				data.is_default = 1;	//设为默认
				console.log(data,'提交');
				this.$Request.post(this.$api.money.bind_withdraw_account, data).then(res => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					}
				});
			},
			selectImg1: function() {	//选择图片
				this.$Request.uploadImg((res)=>{
					console.log(res,'上传图片');
					if( res.code == '1' ){
						this.info.qrcode = res.data[0].path
					}
					this.$Common.toast(res.msg)
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
  .wrap{
    padding: 0 32rpx;
    box-sizing: border-box;
    background: #FFFFFF;
  }
  .cu-form-group{
    padding-left: 0;
  }
  .cu-form-group .title {
  	min-width: calc(5em + 15px);
  }
  .placeholderClass{
    color: #BFBFBF;
    font-size: 32rpx;
  }
  .bottom-btn {
    position: fixed;
    bottom: 40rpx;
    bottom: calc(40rpx + constant(safe-area-inset-bottom));
    bottom: calc(40rpx + env(safe-area-inset-bottom));
    left: 32rpx;
    right: 32rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 30rpx;
    color: #ffffff;
    background: $bgtheme;
    border-radius: 50rpx;
  }


	.theme_btn{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 18px;
		background-color: #EC5413;
	}

	.img{
		width: 100%;
		height: 242rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.get_code_btn{
		min-width:148rpx;
		height:52rpx;
		line-height: 52rpx;
		text-align: center;
		background:rgba(255,158,62,1);
		border-radius:8rpx;
	}
	.up_down_img{
		width: 12rpx;
		height: 24rpx;
	}
	.line{
		width: 100%;
		height: 24rpx;
		background: #F4F4F4;
	}
</style>
