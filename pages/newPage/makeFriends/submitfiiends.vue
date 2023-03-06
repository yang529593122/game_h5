<template>
  <view class="submitfiiends">
    <!-- header -->
    <fu-custom isBack bgColor="bg-white">
    	<view slot="content" >
    		交朋友
    	</view>
    </fu-custom>

    <view class="form-content">
      <textarea class="comment-content" v-model="content" placeholder="请输入交友内容" />
     <!-- 上传图片 -->
      <view class="add-img">
      	<view class="add-img-tips">
      		<text>添加照片</text>
      	</view>
      	<view class="img-list">
      		<view class="img-item">
      			<image src="/static/logo.png" mode="aspectFill"></image>
      			<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
      		</view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image src="/static/logo.png" mode="aspectFill"></image>
          	<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
          <view class="img-item">
          	<image class="add-imgs" src="/static/add-img.png" mode=""></image>
          	<image class="delete-icon" v-if="false" src="/static/newPage/13.png" mode="aspectFill"></image>
          </view>
      	</view>
      </view>

      <!-- 联系方式 -->
      <view class="phone">
        <view class="">
          联系方式
        </view>
      </view>
    </view>



  </view>
</template>

<script>

</script>

<style lang="scss" scoped>
.submitfiiends{
  .form-content{
    padding: 20rpx;
    .comment-content{
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
        grid-template-columns: repeat(auto-fill,160rpx);
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
}
</style>
