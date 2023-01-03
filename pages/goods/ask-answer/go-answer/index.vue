<template>
    <view class="page">
        <!-- topbar -->
        <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
            <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
                <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
                <!-- #ifdef H5 -->
                <view class="fu-fs32" style="color: #000; font-weight: 700">{{i18n['我来回答']}}</view>
                <!-- #endif -->
                <!-- #ifndef H5 -->
                <view class="fu-fs32">{{i18n['我来回答']}}</view>
                <!-- #endif -->
                <view class="action text-333" @click="navGoPublish">{{i18n['发布']}}</view>
            </view>
        </view>
        <view>
            <view class="textarea" :style="{height:scrollHeight}">
                <textarea v-model='issue' style="height:100%;" placeholder-style="color:#BFBFBF;font-weight:400;font-size:28rpx;" :placeholder="i18n['我知道，我来答']" maxlength='500' :adjust-position ='false'  />
            </view>
        </view>
        <!-- 发布成功弹框 -->
        <fu-popup v-model="show" mode="center" :safe-area-inset-bottom="true" :border-radius="24" :maskCloseAble='false'>
            <view class="padding bt-white content">
                <view class="text-center">
                    <text  class="fu-iconfont success-icon">
                        &#xe6d2;
                    </text>
                    <view class="text-lg text-weight-500 text-333" >{{i18n['回复成功']}}</view>
                </view>
                <view class="content-info">
                    {{i18n['等待后台审核，审核通过后可以去我的回答里查看已回复的回答']}}
                </view>

                <view  class="affirm-wrap">
                  <view class="affirm" @click='close'>
                       {{i18n['我知道了']}}
                  </view>
                </view>
            </view>
        </fu-popup>
        <!-- 吸键盘布局 -->
        <view class="ask-info-absorb" :style="{bottom:keyboardheight+'px'}">
            <text class="text" @click='goChangeAnonymity()' :class="{'text-theme':isAnonymity}">
                <!-- <text class="fu-iconfont icon" v-if='!isAnonymity' >
                    &#xe7e6;
                </text>
                <text class="fu-iconfont icon" v-if='isAnonymity'>
                    &#xe7e9;
                </text> -->
                <text class="cuIcon-attentionfill" v-if='!isAnonymity'></text>
                <text class="cuIcon-attentionforbidfill" v-if='isAnonymity'></text>
                <text class="text-333 text-df text-weight-500" style="margin-left: 16rpx;">{{isAnonymity?i18n['匿名回答']:i18n['实名回答']}}</text>
            </text>
            <text class="text-999 text-sm text-weight-500" style="margin-left: 16rpx;">
                 {{issue.length}} / 500
            </text>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                issue:'',
                isAnonymity:false,// 是否匿名
                show: false, // 是否显示弹框
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                goods_id: '', // 商品id
                activity_id: '', // 活动id
                keyboardheight: 0, // 键盘高度
                question_id:'' // 问题id
            }
        },
        onLoad(options){
            uni.onKeyboardHeightChange((res) => {
                console.log("键盘监听", res);
                this.keyboardheight = res.height;
            });
            const { goods_id, activity_id ,question_id} = options;
            this.goods_id = goods_id;
            this.activity_id = activity_id;
            this.question_id = question_id;
        },
        computed: {
            scrollHeight() {
                return `calc(100vh - ${this.CustomBar}px - 96rpx)`;
            },

        },
        methods: {
            goChangeAnonymity(){
                this.isAnonymity = !this.isAnonymity
            },
            close(){
                this.show = false
                this.issue = ''
                this.back()
            },
            back() {
                uni.navigateBack();
            },
            navGoPublish() {
               // 判断是否输入内容
               if(!this.issue.trim()){
                    return this.$message.info(this.i18n['请输入内容'])
                }
                this.$api
                    .post(global.apiUrls.goodsAnswer, {
                    content: this.issue.trim(),
                    question_id:this.question_id,
                    is_anonymous: this.isAnonymity ? 1 : 0
                    })
                    .then(res => {
                        console.log('发布结果',res.data)
                    if (res.data.code == 1 ) {
                            this.show = true
                        }
                    });
            }
        },
    }
</script>

<style lang="scss" scoped>
    page{
      height: 100%;
      background:#F8F8F8;
    }
    .page {
        height: 100%;
        background:#F8F8F8;
    }
    .content {
      width: 510rpx;
      height: 502rpx;
      background: #FFFFFF;
      border: 1px solid #707070;
      border-radius: 24rpx;
      position: relative;
    }
    .success-icon {
      font-size: 66rpx;
      color: #5fc59d;
    }

    .affirm-wrap {
      position: absolute;
      bottom: 48rpx;
      width: calc(100% - 60rpx);
      display: flex;
      justify-content: center;
    }

    .affirm {
      text-align: center;
     width: 304rpx;
     height: 72rpx;
     line-height: 72rpx;
     background: linear-gradient(90deg, #FA2033 0%, #FF6530 100%);
     border-radius: 36rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: 400;
    }
    .content-info {
      font-size: 24rpx;
      color: #999;
      margin: 48rpx 0 0;
      padding: 0 40rpx;
      text-align: center;
      line-height: 40rpx;
      font-weight: 500;
    }

    .goods-info {
        font-size: 24rpx;
        .goods-img {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
        }

        .text-info {
            width: 100%;
            margin-left: 6rpx;
        }
    }
    .textarea{
        font-size: 24rpx;
        padding: 24rpx 24rpx 0;
        box-sizing: border-box;
        textarea{
            padding: 24rpx;
            box-sizing: border-box;
            width: 100%;
            font-size: 28rpx;
            background: #fff;
            font-weight: 400;
            border-radius: 16rpx;
        }
    }
    .ask-info-absorb{
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 96rpx;
        height: 96rpx;
        background: #F8F8F8;
        .text-theme{
          text{
            color: #FF6464!important;
          }

        }
        .text{
            margin-left:24rpx;
        }
        .icon{
            font-size: 24rpx;
            margin-right: 6rpx;
        }
    }
    .text-center{
        line-height: 1.5;
    }
</style>
