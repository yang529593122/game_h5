<template>
	<view class="content">
		<view class="input-item">
			<text>店铺名称</text>
			<input type="text" placeholder-class="input-pla" v-model="shop_name" placeholder="请输入店铺名称">
		</view>
		<view class="input-item">
			<text>店铺logo（72*72）</text>
      <image v-if="shop_logo" :src="shop_logo" mode="aspectFill"></image>
			<image v-else src="/static/add-img.png" mode="aspectFill" @click="updataImg()"></image>
		</view>

		<view class="btns">
			<view>上一步</view>
			<view class="next" @click="toPath('/pages/tab/tradingMall/informationAudit')">下一步</view>
		</view>
	</view>
</template>

<script>
  import { host, SERIAL } from '@/common/config.js'
	export default{
		data(){
			return{
				shop_name:"", // 店铺名称
        shop_logo:"", // 店铺logo
			}
		},
		methods:{
      updataImg(type){
        uni.chooseImage({
        	count: 1, //默认9
        	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        	sourceType: ['album'], //从相册选择
        	success:  (res)=> {
              uni.uploadFile({
                  url:host +'/api'+ global.apiUrls.UPLOAD_IMAGE_URL,
                  filePath: res.tempFilePaths[0],
                  name: 'file',
                  header: {
                      'user-token': global.token || '',
                      'Accept-Language': global.locale,
                      'Accept-Serial': SERIAL,
                  },
                  formData: {
                      'module': '',
                      'dir': ''
                  },
                  success: res => {
                      let data = JSON.parse(res.data);
                      if (data.code == 1) {
                          this.shop_logo = data.data[0].path
                      } else {
                          message.info(global.i18n['图片上传失败，请重试'])
                      }
                  },
                  complete: () => {

                  }
              });
        	}
        });
      },
			async toPath(url){
        if(!this.shop_name.trim()) {
          this.$message.info('店铺名称不能为空')
          return;
        }
        if(!this.shop_logo.trim()) {
        	this.$message.info('店铺logo不能为空')
        	return;
        }
        const certification = {
          shop_name:this.shop_name, // 店铺名称
          shop_logo:this.shop_logo, // 店铺logo
        }
        const value = uni.getStorageSync('certification');
        const obj = {
          ...JSON.parse(value),
          ...certification
        }
       uni.setStorageSync('certification',  JSON.stringify(obj));
       const data = await this.$api.post(global.apiUrls.shop_apply_join,obj)
       const result = data.data
       if (result.code == 1) {
         uni.removeStorageSync('certification');
         uni.navigateTo({
         	url:url
         })
       } else {
         this.$message.info(result.msg);
       }
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
			image{
				width: 160rpx;
				height: 160rpx;
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
