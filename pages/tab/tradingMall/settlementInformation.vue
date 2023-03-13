<template>
	<view class="content">
		<view class="input-item">
			<text>结算账户</text>
			<input type="text" placeholder-class="input-pla" v-model="bank_account" placeholder="请输入银行卡号">
		</view>
		<view class="input-item">
			<text>结算开户行</text>
			<input type="text" placeholder-class="input-pla" v-model="opening" placeholder="请输入银行卡开户名">
		</view>
		<view class="input-item">
			<text>姓名</text>
			<input type="text" placeholder-class="input-pla" v-model="true_name" placeholder="请输入姓名">
		</view>
		<view class="input-item">
			<text>结算开户银行支行名称</text>
			<input type="text" placeholder-class="input-pla" v-model="subbranch" placeholder="请输入银行支行名称">
		</view>
		<view class="input-item">
			<text>结算开户银行所在地</text>
			<input type="text" placeholder-class="input-pla" v-model="bank_address" placeholder="请输入银行所在地">
		</view>
		<view class="btns">
			<view>上一步</view>
			<view class="next" @click="toPath('/pages/tab/tradingMall/storeInfo')">下一步</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
        bank_account:"", // 结算银行卡账号
        opening:"", // 结算开户行
        true_name:"", // 姓名
        subbranch:"", // 	结算开户银行支行名称
        bank_address:"", // 结算开户银行所在地
      }
		},
		methods:{
			// 路由跳转
			toPath(url){

        if(!this.bank_account.trim()) {
          this.$message.info('结算银行卡账号不能为空')
          return;
        }
        if(!this.opening.trim()) {
        	this.$message.info('结算开户行不能为空')
        	return;
        }
        if(!this.true_name.trim()) {
        	this.$message.info('姓名不能为空')
        	return;
        }

        const certification = {
         bank_account:this.bank_account, // 结算银行卡账号
         opening:this.opening, // 结算开户行
         true_name:this.true_name, // 姓名
         subbranch:this.subbranch, // 	结算开户银行支行名称
         bank_address:this.bank_address, // 结算开户银行所在地
        }
        const value = uni.getStorageSync('certification');
        const obj = {
          ...JSON.parse(value),
          ...certification
        }
        uni.setStorageSync('certification',  JSON.stringify(obj));
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.input-item{
			padding: 32rpx;
			background: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text {
				font-size: 28rpx;
				color: #333;
			}
			input{
				text-align: right;
			}
			.input-pla {
				color: #BFBFBF;
			}
		}

		.btns {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 32rpx;
			left: 0;
			width: 100%;
			view{
				width: 280rpx;
				line-height: 88rpx;
				background: #EEEEEE;
				text-align: center;
			}

			.next {
				background: #295B7B;
				color: #fff;
			}
		}
	}
</style>
