<template>
  <view class="cyprice">
    <fu-custom isBack bgColor="bg-white">
      <view slot="content">
        参与议价
      </view>
    </fu-custom>
    <view class="cyprice-content">
      <view class="cyprice-item">
        <view class="cyprice-item-left"> 议价日期</view>
        <view class="cyprice-item-right">
          <picker mode="date" @change="dickerDateChange">
            <view class="picker">{{ dicker_date || '请选择' }}</view>
          </picker>
        </view>
      </view>
      <view class="cyprice-item">
        <view class="cyprice-item-left"> 议价时间段</view>
        <view class="cyprice-item-right datestart">
          <view class="">
            <picker mode="time" @change="durationStartChange">
              <view class="picker">{{ duration_start || '开始时间' }}</view>
            </picker>
          </view>
          <view class="datestart-flag">
            至
          </view>
          <view class="">
            <picker mode="time" @change="durationEndChange">
              <view class="picker">{{ duration_end || '结束时间' }}</view>
            </picker>
          </view>
        </view>
      </view>
      <view class="cyprice-item">
        <view class="cyprice-item-left"> 起拍金额</view>
        <view class="cyprice-item-right">
          <input class="qpjg" type="number" v-model="start_price" placeholder="请输入" />
        </view>
      </view>

      <view class="introduce">
        <view class="introduce-title">
          一句话介绍账号
        </view>
        <view class="introduce-text">
          <textarea class="textarea" auto-height v-model="introduce"></textarea>
        </view>
      </view>

      <view class="deposit">
        <view class="deposit">
          议价押金: ¥ {{ dicker_price }}
        </view>
        <view class="deposit-text">
          注:账号议价出售,押金原路退回;账号哈师傅看看粉丝看哈说
        </view>
      </view>
    </view>
    <!-- 支付列表 start -->
    <view class="onlinePayPageSelectPayMethods">
      <view class="onlinePayPageSelectPayMethodsText">选择支付方式</view>
      <view class="onlinePayPageSelectPayMethodsLine"></view>
      <view class="flex align-center justify-between" :style="{marginTop:index !=0 ? '66rpx' : '0rpx'}"
        @click="changePayMethods(item.pay_type,item)" v-for="(item,index) in requestList" :key="index">
        <!-- 微信支付 start -->
        <block v-if="item.pay_type == 1">
          <view class="flex align-center">

            <img src="./static/wx.png" class="PayMethodsImgs" alt="">
            <view class="PayMethodsText">{{item.name}}
              <text class="text-999" v-if="item.is_open == 0"> (未开通)</text>
              <text style="color: #A23C30;" v-if="item.is_open == 1 && item.is_recommend == 1"> (推荐)</text>
            </view>
          </view>
          <view class="PayMethodsRightStatus">
            <image src="./static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 1" mode=""></image>
            <image src="./static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
          </view>
        </block>
        <!-- 微信支付 end -->


        <!-- 支付宝 start -->
        <block v-if="item.pay_type == 2">
          <view class="flex align-center">
            <img src="./static/zfb.png" class="PayMethodsImgs" alt="">
            <view class="PayMethodsText">{{item.name}}
              <text class="text-999" v-if="item.is_open == 0"> (未开通)</text>
              <text style="color: #A23C30;" v-if="item.is_open == 1 && item.is_recommend == 1"> (推荐)</text>
            </view>
          </view>
          <view class="PayMethodsRightStatus">
            <image src="./static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 2" mode=""></image>
            <image src="./static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
          </view>

        </block>
        <!-- 支付宝 end -->

        <!-- 余额支付 start -->
        <block v-if="item.pay_type == 3">
          <view class="flex align-center">
            <img src="./static/ye.png" class="PayMethodsImgs" alt="">
            <view class="PayMethodsText">
              余额支付(¥ {{ user_money }})
            </view>
          </view>
          <view class="PayMethodsRightStatus">
            <image src="./static/xz.png" class="PayMethodsRightStatus" v-if="paymethod == 3" mode=""></image>
            <image src="./static/mxz.png" class="PayMethodsRightStatus" v-else mode=""></image>
          </view>
        </block>
        <!-- 余额支付 end -->
      </view>
      <!-- 支付列表 end -->


    </view>
    <view class="onlinePayBottomBtn" @click="payPrice">
        立即支付
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_id:'',
        dicker_price:'0.00',
        user_money:'0.00',
        dicker_date: '',
        duration_start:'',
        duration_end:'',
        start_price:'',
        paymethod: 1,
        requestList: [],
        introduce:''
      }
    },
    onLoad(opts) {
      this.goods_id = opts.goods_id
      this.init()
      this.huoquzhifushifoukaitong()
    },
    methods: {
      payPrice(){
        if(!this.dicker_date) {
        	this.$message.info('请选择议价日期')
        	return;
        }
        if(!this.duration_start) {
        	this.$message.info('请选择开始时间')
        	return;
        }
        if(!this.duration_end) {
        	this.$message.info('请选择结束时间')
        	return;
        }
        if(!this.start_price) {
        	this.$message.info('请输入起拍价格')
        	return;
        }
        if(!this.introduce) {
        	this.$message.info('请输入账号简介')
        	return;
        }


        let obj = {
          goods_id: this.goods_id, // 商品ID
          dicker_date: this.dicker_date, // 议价日期：如2023-02-28
          duration: this.duration_start+"-"+this.duration_end,// 议价时间段：08:00-20:00
          start_price: this.start_price, // 起拍价
          introduce: this.introduce, // 介绍
          pay_type: 3	,//支付方式：1=微信,2=支付宝,3=账户余额
        }

        this.confirmPayLoading = true;
        this.$api.post(global.apiUrls.dicker_join_dicker, obj).then(res => {
        	if (res.data.code == 1) {
            // 支付
            const result = res.data.data
            this.payMoney(result)
        	} else {
        		this.$message.info(res.data.msg);
        	}
        	this.confirmPayLoading = false;
        })
      },
      payMoney(data){
        this.$api.post(global.apiUrls.game_pay_order, {
          pay_type: 3,
          client_type: 2,
          order_no: data.order_sn,
        }).then(res => {
        	if (res.data.code == 1) {
        		const result = res.data.data
            console.log(result,"支付成功")
            this.$urouter.navigateTo(`/pages/cyprice/pay/pay`);
        	} else {
        		this.$message.info(res.data.msg);
        	}
        })
      },
      init(){
        this.$api.post(global.apiUrls.get_dicker_config, ).then(res => {
        	if (res.data.code == 1) {
        		const result = res.data.data
            console.log(result)
            this.dicker_price = result.dicker_price
            this.user_money = result.user_money
        	} else {
        		this.$message.info(res.data.msg);
        	}
        })
      },
      changePayMethods(idx, item) {
      	console.debug(item, 'item')
      	if (item.is_open === 0) {
      		this.$message.info(item.name + '暂未开通')
      		return;
      	}

      	if (idx == this.paymethod) {
      		return;
      	}
      	this.paymethod = idx;
      },
      dickerDateChange(e){
        this.dicker_date = e.detail.value
      },
      durationStartChange(e){
        this.duration_start = e.detail.value
      },
      durationEndChange(e){
        this.duration_end = e.detail.value
      },
      huoquzhifushifoukaitong() {
      	this.$api.post(global.apiUrls.huoquzhifushifoukaitong, ).then(res => {
      		if (res.data.code == 1) {
      			let paymethod = 3;
      			for (var i = 0; i < res.data.data.length; i++) {
      				if (res.data.data[i].is_open == 1 && res.data.data[i].is_recommend == 1) {
      					paymethod = res.data.data[i].pay_type;
      					break;
      				}
      			}
      			this.paymethod = paymethod;
      			this.requestList = res.data.data;
      		} else {
      			this.$message.info(res.data.msg);
      		}
      	})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .cyprice {
    min-height: 100vh;
    background: #F7F9FA;
    padding-bottom: 40rpx;

    .cyprice-content {
      padding: 20rpx;

      .cyprice-item {
        padding: 0 20rpx;
        height: 80rpx;
        line-height: 80rpx;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
        background: #fff;

        .datestart {
          display: flex;
        }

        .datestart-flag {
          padding: 0 20rpx;
        }

        .qpjg {
          display: block;
          height: 80rpx;
          line-height: 80rpx;
          text-align: right;
          font-size: 28rpx;
        }
      }

      .introduce {
        .introduce-title {
          padding-bottom: 20rpx;
        }

        .introduce-text {
          .textarea {
            width: 100%;
            min-height: 200rpx;
            display: block;
            background: #fff;
          }
        }
      }

      .deposit {
        padding: 20rpx 0;

        .deposit {}

        .deposit-text {
          font-size: 24rpx;
          color: #FE9B5F;
        }
      }

    }



    .onlinePayPageSelectPayMethods {
      margin-top: 20rpx;
      padding: 32rpx;
      background: #fff;

      .onlinePayPageSelectPayMethodsText {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #444444;
      }

      .onlinePayPageSelectPayMethodsLine {
        width: 686rpx;
        height: 1px;
        background: #EEEEEE;
        margin-top: 32rpx;
        margin-bottom: 32rpx;
      }
    }
  }


  .onlinePayPagePriceFu {
  	font-size: 32rpx;
  	font-family: Helvetica Neue;
  	font-weight: bold;
  	color: #F55B29;
  }

  .onlinePayPagePricePrice {
  	font-size: 64rpx;
  	font-family: Helvetica Neue;
  	font-weight: bold;
  	color: #F55B29;
  	margin-left: 10rpx;
  }

  .onlinePayPagePricepay {
  	font-size: 24rpx;
  	font-family: PingFang SC;
  	font-weight: 400;
  	margin-top: 15rpx;
  	// line-height: 0px;
  	color: #868686;
  }

  .onlinePayPageSelectPayMethods {
  	margin-top: 20rpx;
  	padding: 32rpx;
  	background: #fff;

  	.onlinePayPageSelectPayMethodsText {
  		font-size: 28rpx;
  		font-family: PingFang SC;
  		font-weight: 500;
  		color: #444444;
  	}

  	.onlinePayPageSelectPayMethodsLine {
  		width: 686rpx;
  		height: 1px;
  		background: #EEEEEE;
  		margin-top: 32rpx;
  		margin-bottom: 32rpx;
  	}
  }

  .PayMethodsImgs {
  	width: 56rpx;
  	height: 56rpx;
  }

  .PayMethodsText {
  	font-size: 32rpx;
  	font-family: PingFang SC;
  	color: #333333;
  	margin-left: 24rpx;
  }

  .PayMethodsRightStatus {
  	width: 36rpx;
  	height: 36rpx;
  }

  .onlinePayBottomBtn {
  	margin: 20rpx;
  	height: 88rpx;
  	line-height: 88rpx;
  	text-align: center;
  	background: #295B7B;
  	border-radius: 0;
  	font-size: 28rpx;
  	font-family: PingFang SC;
  	font-weight: 500;
  	color: #FFFFFF;
  }
</style>
